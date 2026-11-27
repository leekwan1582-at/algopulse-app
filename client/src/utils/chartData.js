/**
 * Deterministic PRNG (mulberry32) so sample chart data is reproducible across renders.
 */
function mulberry32(seed) {
  let a = seed;
  return function next() {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * Generate deterministic OHLC candlestick data for the landing page mockup.
 * @param {number} count
 * @param {number} startPrice
 * @param {number} seed
 * @returns {Array<{ x: number, y: [number, number, number, number] }>}
 */
export function generateCandles(count = 40, startPrice = 64200, seed = 42) {
  const rand = mulberry32(seed);
  const candles = [];
  let price = startPrice;
  const baseTime = Date.UTC(2026, 10, 1, 0, 0, 0);
  const hourMs = 3600 * 1000;

  for (let i = 0; i < count; i += 1) {
    const delta = (rand() - 0.48) * 650;
    const open = Math.round(price);
    const close = Math.round(price + delta);
    const high = Math.round(Math.max(open, close) + rand() * 320);
    const low = Math.round(Math.min(open, close) - rand() * 320);
    candles.push({
      x: baseTime + i * hourMs,
      y: [open, high, low, close],
    });
    price = close;
  }

  return candles;
}

/**
 * Compute a simple moving average series from OHLC candles.
 * @param {Array<{ x: number, y: [number, number, number, number] }>} candles
 * @param {number} period
 * @returns {Array<{ x: number, y: number }>}
 */
export function computeSma(candles, period = 10) {
  const sma = [];
  for (let i = 0; i < candles.length; i += 1) {
    if (i < period - 1) continue;
    let sum = 0;
    for (let j = 0; j < period; j += 1) {
      sum += candles[i - j].y[3];
    }
    sma.push({
      x: candles[i].x,
      y: Math.round(sum / period),
    });
  }
  return sma;
}

/**
 * Generate deterministic sparkline values.
 * @param {number} count
 * @param {number} start
 * @param {number} seed
 * @returns {number[]}
 */
export function generateSparkline(count = 16, start = 100, seed = 7) {
  const rand = mulberry32(seed);
  const points = [];
  let val = start;
  for (let i = 0; i < count; i += 1) {
    val += (rand() - 0.45) * (start * 0.03);
    points.push(Number(val.toFixed(2)));
  }
  return points;
}

/**
 * Generate deterministic equity curve data (C3).
 * @param {number} count
 * @param {number} startBalance
 * @param {number} seed
 * @returns {Array<{ x: number, y: number }>}
 */
export function generateEquityCurve(count = 30, startBalance = 10000, seed = 99) {
  const rand = mulberry32(seed);
  const series = [];
  let equity = startBalance;
  const baseTime = Date.UTC(2026, 9, 1, 0, 0, 0);
  const dayMs = 24 * 3600 * 1000;

  for (let i = 0; i < count; i += 1) {
    const pct = (rand() - 0.38) * 0.032;
    equity = Math.max(8500, equity * (1 + pct));
    series.push({
      x: baseTime + i * dayMs,
      y: Math.round(equity),
    });
  }
  return series;
}

/**
 * Compute percentage drawdown series from an equity curve (C4).
 * @param {Array<{ x: number, y: number }>} equitySeries
 * @returns {Array<{ x: number, y: number }>}
 */
export function computeDrawdown(equitySeries) {
  let peak = -Infinity;
  return equitySeries.map((pt) => {
    if (pt.y > peak) peak = pt.y;
    const dd = peak > 0 ? ((pt.y - peak) / peak) * 100 : 0;
    return {
      x: pt.x,
      y: Number(dd.toFixed(2)),
    };
  });
}
