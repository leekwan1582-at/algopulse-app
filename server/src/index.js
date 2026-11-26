require('dotenv').config();
const app = require('./app');
const { closePool } = require('./config/database');

const PORT = Number(process.env.PORT) || 5000;

const server = app.listen(PORT, () => {
  console.log(`🚀 AlgoPulse API listening on http://localhost:${PORT}/api`);
});

const shutdown = () => {
  server.close(async () => {
    await closePool();
    process.exit(0);
  });
};
process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
