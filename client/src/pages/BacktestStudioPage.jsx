import { useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import { strategiesAtom } from '../atoms/tradingAtoms.js';
import { getStrategies, runBacktest } from '../api/strategyApi.js';

export default function BacktestStudioPage() {
  const [strategies, setStrategies] = useAtom(strategiesAtom);
  const [strategyId, setStrategyId] = useState('');
  const [startDate, setStartDate] = useState('2026-01-01');
  const [endDate, setEndDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [initialCapital, setInitialCapital] = useState(10000);
  const [running, setRunning] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState(null);

  const selectedStrategyId = strategyId || (strategies[0] ? String(strategies[0].strategy_id) : '');

  useEffect(() => {
    if (strategies.length > 0) return;
    let cancelled = false;
    async function load() {
      try {
        const list = await getStrategies();
        if (!cancelled) setStrategies(list);
      } catch {
        /* handled when user runs backtest */
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, [strategies.length, setStrategies]);

  async function handleRun(e) {
    e.preventDefault();
    if (!selectedStrategyId) {
      setError('Please select a strategy.');
      return;
    }
    try {
      setRunning(true);
      setError('');
      const data = await runBacktest({
        strategy_id: Number(selectedStrategyId),
        start_date: startDate,
        end_date: endDate,
        initial_capital: Number(initialCapital),
      });
      setResult(data);
    } catch (err) {
      setError(err.response?.data?.error || 'Backtest failed');
    } finally {
      setRunning(false);
    }
  }

  return (
    <section>
      <h1 className="h3 mb-3">Backtest Studio</h1>

      <form className="card shadow-sm mb-4" onSubmit={handleRun}>
        <div className="card-body">
          <div className="row g-3 align-items-end">
            <div className="col-md-3">
              <label htmlFor="bt-strategy" className="form-label fw-semibold">Strategy</label>
              <select
                id="bt-strategy"
                className="form-select"
                value={selectedStrategyId}
                onChange={(e) => setStrategyId(e.target.value)}
              >
                {strategies.length === 0 && <option value="">No strategies</option>}
                {strategies.map((s) => (
                  <option key={s.strategy_id} value={s.strategy_id}>
                    {s.strategy_name} ({s.asset_symbol})
                  </option>
                ))}
              </select>
            </div>
            <div className="col-md-2">
              <label htmlFor="bt-start" className="form-label fw-semibold">Start Date</label>
              <input
                id="bt-start"
                type="date"
                className="form-control"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
            <div className="col-md-2">
              <label htmlFor="bt-end" className="form-label fw-semibold">End Date</label>
              <input
                id="bt-end"
                type="date"
                className="form-control"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
            <div className="col-md-2">
              <label htmlFor="bt-capital" className="form-label fw-semibold">Initial Capital ($)</label>
              <input
                id="bt-capital"
                type="number"
                className="form-control"
                value={initialCapital}
                onChange={(e) => setInitialCapital(e.target.value)}
              />
            </div>
            <div className="col-md-3">
              <button type="submit" className="btn btn-primary w-100" disabled={running}>
                {running ? 'Running...' : 'Run Historical Backtest'}
              </button>
            </div>
          </div>
          {error && <div className="alert alert-danger mt-3 mb-0">{error}</div>}
        </div>
      </form>

      {result && (
        <>
          <div className="row g-3 mb-4">
            <div className="col-md-4">
              <div className="card shadow-sm">
                <div className="card-body">
                  <div className="text-secondary small text-uppercase">Total Return</div>
                  <div className={`fs-4 fw-bold ${result.total_return_pct >= 0 ? 'text-success' : 'text-danger'}`}>
                    {result.total_return_pct >= 0 ? '+' : ''}{result.total_return_pct}%
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card shadow-sm">
                <div className="card-body">
                  <div className="text-secondary small text-uppercase">Win Rate</div>
                  <div className="fs-4 fw-bold">{result.win_rate_pct}%</div>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card shadow-sm">
                <div className="card-body">
                  <div className="text-secondary small text-uppercase">Max Drawdown</div>
                  <div className="fs-4 fw-bold text-danger">{result.max_drawdown_pct}%</div>
                </div>
              </div>
            </div>
          </div>

          <div className="card shadow-sm">
            <div className="card-header bg-white fw-bold">
              Historical Trade Logs ({result.trades.length})
            </div>
            <div className="table-responsive">
              <table className="table table-sm table-hover mb-0">
                <thead className="table-light">
                  <tr>
                    <th>Date</th>
                    <th>Type</th>
                    <th>Price</th>
                    <th>Amount</th>
                    <th>P&amp;L ($)</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {result.trades.map((t, idx) => (
                    <tr key={`${t.date}-${t.type}-${idx}`}>
                      <td>{t.date}</td>
                      <td>
                        <span className={`badge ${t.type === 'BUY' ? 'bg-primary' : 'bg-info text-dark'}`}>
                          {t.type}
                        </span>
                      </td>
                      <td>${t.price.toLocaleString('en-US')}</td>
                      <td>{t.amount}</td>
                      <td className={t.pnl > 0 ? 'text-success' : t.pnl < 0 ? 'text-danger' : ''}>
                        {t.pnl === null ? '--' : `${t.pnl >= 0 ? '+' : '-'}$${Math.abs(t.pnl).toFixed(2)}`}
                      </td>
                      <td>{t.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </section>
  );
}
