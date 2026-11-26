const express = require('express');
const cors = require('cors');
const strategyRoutes = require('./routes/strategyRoutes');
const { testConnection } = require('./config/database');

const app = express();

app.use(cors({ origin: process.env.CORS_ORIGIN || 'http://localhost:5173' }));
app.use(express.json());

app.get('/api/health', async (_req, res) => {
  let db = 'down';
  try {
    if (await testConnection()) db = 'up';
  } catch { /* report as down */ }
  res.status(db === 'up' ? 200 : 503).json({ status: db === 'up' ? 'ok' : 'degraded', db, time: new Date().toISOString() });
});

app.use('/api', strategyRoutes);

// 404 for unknown API routes
app.use('/api', (req, res) => res.status(404).json({ error: `Route ${req.method} ${req.originalUrl} not found` }));

// Central error handler
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, _next) => {
  // Map DB constraint errors to 400
  if (err.code === 'ER_CONSTRAINT_FAILED' || err.code === 'ER_CHECK_CONSTRAINT_VIOLATED') err.status = 400;
  if (err.type === 'entity.parse.failed') err.status = 400;

  const status = err.status || 500;
  if (status >= 500) console.error(err);
  res.status(status).json({
    error: status >= 500 ? 'Internal server error' : err.message,
    ...(err.details && { details: err.details }),
  });
});

module.exports = app;
