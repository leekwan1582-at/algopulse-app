const { query } = require('../config/database');
const { userIdOf } = require('./strategyController');

// GET /api/orders?strategy=101&status=FILLED&q=BTC&page=1&limit=10
async function getOrders(req, res) {
  const page = Math.max(1, parseInt(req.query.page, 10) || 1);
  const limit = Math.min(100, Math.max(1, parseInt(req.query.limit, 10) || 10));

  const where = ['s.user_id = ?'];
  const params = [userIdOf(req)];

  if (req.query.strategy) {
    where.push('o.strategy_id = ?');
    params.push(Number(req.query.strategy));
  }
  if (req.query.status) {
    where.push('o.order_status = ?');
    params.push(String(req.query.status).toUpperCase());
  }
  if (req.query.q) {
    where.push('(s.asset_symbol LIKE ? OR s.strategy_name LIKE ?)');
    const like = `%${req.query.q}%`;
    params.push(like, like);
  }

  const from = `FROM orders o JOIN strategies s ON s.strategy_id = o.strategy_id WHERE ${where.join(' AND ')}`;

  const [{ total }] = await query(`SELECT COUNT(*) AS total ${from}`, params);
  const data = await query(
    `SELECT o.*, s.strategy_name, s.asset_symbol ${from} ORDER BY o.executed_at DESC LIMIT ? OFFSET ?`,
    [...params, limit, (page - 1) * limit]
  );

  res.json({ data, page, limit, total, totalPages: Math.max(1, Math.ceil(total / limit)) });
}

module.exports = { getOrders };
