// Server-side mirror of the client Yup schema (defence in depth).
const SYMBOLS = ['BTC/USDT', 'ETH/USDT', 'SOL/USDT'];

const RULES = {
  strategy_name: (v) => typeof v === 'string' && v.trim().length >= 3 && v.trim().length <= 100 || 'strategy_name must be 3-100 characters',
  asset_symbol: (v) => SYMBOLS.includes(v) || `asset_symbol must be one of ${SYMBOLS.join(', ')}`,
  sma_period: (v) => Number.isInteger(Number(v)) && v >= 1 && v <= 500 || 'sma_period must be an integer 1-500',
  rsi_threshold: (v) => Number.isInteger(Number(v)) && v >= 1 && v <= 100 || 'rsi_threshold must be an integer 1-100',
  stop_loss_pct: (v) => Number(v) >= 0.1 && Number(v) <= 50 || 'stop_loss_pct must be between 0.1 and 50.0',
  take_profit_pct: (v) => Number(v) >= 0.5 && Number(v) <= 200 || 'take_profit_pct must be between 0.5 and 200.0',
};

/**
 * @param {object} body
 * @param {{partial?: boolean}} opts - partial: only validate supplied fields (PUT/PATCH)
 * @returns {string[]} list of error messages (empty if valid)
 */
function validateStrategy(body = {}, { partial = false } = {}) {
  const errors = [];
  for (const [field, rule] of Object.entries(RULES)) {
    const value = body[field];
    if (value === undefined || value === null || value === '') {
      if (!partial && !['sma_period', 'rsi_threshold'].includes(field)) errors.push(`${field} is required`);
      continue;
    }
    const result = rule(value);
    if (result !== true) errors.push(result);
  }
  return errors;
}

module.exports = { validateStrategy, SYMBOLS };
