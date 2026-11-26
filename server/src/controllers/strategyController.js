const { query } = require('../config/database');
const { validateStrategy } = require('../utils/validateStrategy');

// PoC: single demo user (no auth yet). Override with X-User-Id header.
const userIdOf = (req) => Number(req.get('X-User-Id')) || 1;

const FIELDS = ['strategy_name', 'asset_symbol', 'sma_period', 'rsi_threshold', 'stop_loss_pct', 'take_profit_pct'];

const httpError = (status, message, details) => Object.assign(new Error(message), { status, details });

async function findOwned(id, userId) {
  const rows = await query(
    "SELECT * FROM strategies WHERE strategy_id = ? AND user_id = ? AND status <> 'DELETED'",
    [id, userId]
  );
  if (!rows.length) throw httpError(404, `Strategy ${id} not found`);
  return rows[0];
}

// GET /api/strategies?status=ACTIVE
async function getStrategies(req, res) {
  const params = [userIdOf(req)];
  let sql = "SELECT * FROM strategies WHERE user_id = ? AND status <> 'DELETED'";
  if (req.query.status) {
    sql += ' AND status = ?';
    params.push(String(req.query.status).toUpperCase());
  }
  res.json(await query(`${sql} ORDER BY created_at DESC`, params));
}

// GET /api/strategies/:id
async function getStrategyById(req, res) {
  res.json(await findOwned(req.params.id, userIdOf(req)));
}

// POST /api/strategies
async function createStrategy(req, res) {
  const errors = validateStrategy(req.body);
  if (errors.length) throw httpError(400, 'Validation failed', errors);

  const b = req.body;
  const result = await query(
    `INSERT INTO strategies (user_id, strategy_name, asset_symbol, sma_period, rsi_threshold, stop_loss_pct, take_profit_pct, status)
     VALUES (?, ?, ?, ?, ?, ?, ?, 'ACTIVE')`,
    [userIdOf(req), b.strategy_name.trim(), b.asset_symbol, b.sma_period ?? 20, b.rsi_threshold ?? 30, b.stop_loss_pct, b.take_profit_pct]
  );
  res.status(201).json(await findOwned(result.insertId, userIdOf(req)));
}

// PUT /api/strategies/:id
async function updateStrategy(req, res) {
  const userId = userIdOf(req);
  await findOwned(req.params.id, userId);

  const errors = validateStrategy(req.body, { partial: true });
  if (errors.length) throw httpError(400, 'Validation failed', errors);

  const updates = FIELDS.filter((f) => req.body[f] !== undefined);
  if (!updates.length) throw httpError(400, 'No updatable fields supplied');

  await query(
    `UPDATE strategies SET ${updates.map((f) => `${f} = ?`).join(', ')} WHERE strategy_id = ? AND user_id = ?`,
    [...updates.map((f) => (f === 'strategy_name' ? req.body[f].trim() : req.body[f])), req.params.id, userId]
  );
  res.json(await findOwned(req.params.id, userId));
}

// PATCH /api/strategies/:id/status  body: { status?: 'ACTIVE'|'PAUSED' } (omit to toggle)
async function toggleStrategy(req, res) {
  const userId = userIdOf(req);
  const current = await findOwned(req.params.id, userId);
  const next = req.body?.status ?? (current.status === 'ACTIVE' ? 'PAUSED' : 'ACTIVE');
  if (!['ACTIVE', 'PAUSED'].includes(next)) throw httpError(400, 'status must be ACTIVE or PAUSED');

  await query('UPDATE strategies SET status = ? WHERE strategy_id = ? AND user_id = ?', [next, req.params.id, userId]);
  res.json({ ...current, status: next });
}

// DELETE /api/strategies/:id  (soft delete keeps order history intact)
async function deleteStrategy(req, res) {
  const userId = userIdOf(req);
  await findOwned(req.params.id, userId);
  await query("UPDATE strategies SET status = 'DELETED' WHERE strategy_id = ? AND user_id = ?", [req.params.id, userId]);
  res.status(204).end();
}

module.exports = {
  userIdOf,
  httpError,
  findOwned,
  getStrategies,
  getStrategyById,
  createStrategy,
  updateStrategy,
  toggleStrategy,
  deleteStrategy,
};
