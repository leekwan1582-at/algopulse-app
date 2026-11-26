const { query } = require('../config/database');
const { userIdOf, httpError, findOwned } = require('./strategyController');

const BASE_PRICE = { 'BTC/USDT': 90000, 'ETH/USDT': 3400, 'SOL/USDT': 200 };
const DAY = 86400000;

// Deterministic pseudo-random generator so the same input gives the same result.
function mulberry32(seed) {
  return () => {
    seed |= 0; seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Generate mock daily close prices (random walk with slight upward drift). */
function generateCandles(symbol, start, end, seed) {
  const rand = mulberry32(seed);
  const candles = [];
  let price = BASE_PRICE[symbol] ?? 100;
  for (let t = start.getTime(); t <= end.getTime(); t += DAY) {
    price *= 1 + (rand() - 0.48) * 0.05;
    candles.push({ date: new Date(t).toISOString().slice(0, 10), close: price });
  }
  return candles;
}

/**
 * Pure SMA-crossover simulation with stop-loss / take-profit exits.
 * Exported for unit testing.
 */
function simulate(strategy, candles, initialCapital) {
  const period = strategy.sma_period;
  const sl = strategy.stop_loss_pct / 100;
  const tp = strategy.take_profit_pct / 100;

  let cash = initialCapital;
  let position = null; // { entry, qty }
  let peak = initialCapital;
  let maxDrawdown = 0;
  const trades = [];
  let wins = 0;
  let closed = 0;

  const fmt = (n, d = 2) => Number(n.toFixed(d));

  const avg = (from, to) => candles.slice(from, to).reduce((s, c) => s + c.close, 0) / period;

  for (let i = period + 1; i < candles.length; i++) {
    const { date, close } = candles[i];
    const sma = avg(i - period, i);
    const prevClose = candles[i - 1].close;
    const prevSma = avg(i - period - 1, i - 1);

    if (!position && prevClose <= prevSma && close > sma) {
      const qty = cash / close;
      position = { entry: close, qty };
      cash = 0;
      trades.push({ date, type: 'BUY', price: fmt(close), amount: fmt(qty, 6), pnl: null, status: 'EXECUTED' });
    } else if (position) {
      const change = (close - position.entry) / position.entry;
      const crossDown = close < sma;
      if (change <= -sl || change >= tp || crossDown) {
        const pnl = (close - position.entry) * position.qty;
        cash = position.qty * close;
        closed += 1;
        if (pnl > 0) wins += 1;
        trades.push({
          date, type: 'SELL', price: fmt(close), amount: fmt(position.qty, 6), pnl: fmt(pnl),
          status: change <= -sl ? 'STOP_LOSS' : change >= tp ? 'TAKE_PROFIT' : pnl > 0 ? 'PROFIT' : 'LOSS',
        });
        position = null;
      }
    }

    const equity = position ? position.qty * close : cash;
    peak = Math.max(peak, equity);
    maxDrawdown = Math.min(maxDrawdown, (equity - peak) / peak);
  }

  const finalEquity = position ? position.qty * candles[candles.length - 1].close : cash;
  return {
    final_equity: fmt(finalEquity),
    total_return_pct: fmt(((finalEquity - initialCapital) / initialCapital) * 100),
    win_rate_pct: closed ? fmt((wins / closed) * 100) : 0,
    max_drawdown_pct: fmt(maxDrawdown * 100),
    trades,
  };
}

// POST /api/backtest  body: { strategy_id, start_date, end_date, initial_capital }
async function runBacktest(req, res) {
  const { strategy_id, start_date, end_date, initial_capital = 10000 } = req.body || {};
  if (!strategy_id) throw httpError(400, 'strategy_id is required');

  const start = new Date(start_date || '2026-01-01');
  const end = new Date(end_date || Date.now());
  const capital = Number(initial_capital);
  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) throw httpError(400, 'Invalid date range');
  if (end < start) throw httpError(400, 'end_date must be on or after start_date');
  if (!(capital > 0)) throw httpError(400, 'initial_capital must be greater than 0');

  const strategy = await findOwned(strategy_id, userIdOf(req));
  const candles = generateCandles(strategy.asset_symbol, start, end, Number(strategy_id) + start.getTime() / DAY);
  if (candles.length <= strategy.sma_period + 1) {
    throw httpError(400, `Date range must cover more than ${strategy.sma_period + 1} days for SMA ${strategy.sma_period}`);
  }

  const result = simulate(strategy, candles, capital);
  const startStr = start.toISOString().slice(0, 10);
  const endStr = end.toISOString().slice(0, 10);

  const saved = await query(
    `INSERT INTO backtest_results (strategy_id, start_date, end_date, initial_capital, total_return_pct, win_rate_pct, max_drawdown_pct, trades_json)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [strategy.strategy_id, startStr, endStr, capital, result.total_return_pct, result.win_rate_pct, result.max_drawdown_pct, JSON.stringify(result.trades)]
  );

  res.status(201).json({
    backtest_id: saved.insertId,
    strategy_id: strategy.strategy_id,
    strategy_name: strategy.strategy_name,
    start_date: startStr,
    end_date: endStr,
    initial_capital: capital,
    ...result,
  });
}

module.exports = { runBacktest, simulate, generateCandles };
