import { useMemo } from 'react';
import EquityCurveChart from '../charts/EquityCurveChart.jsx';
import DrawdownChart from '../charts/DrawdownChart.jsx';
import RadialGauge from '../charts/RadialGauge.jsx';
import { generateEquityCurve, computeDrawdown } from '../../utils/chartData.js';
import '../../styles/landing.css';

const SAMPLE_ORDERS = [
  { id: 'ORD-1042', pair: 'BTC/USDT', side: 'BUY', price: '$64,180', pnl: '+$240.00', positive: true },
  { id: 'ORD-1043', pair: 'BTC/USDT', side: 'SELL', price: '$65,420', pnl: '+$310.50', positive: true },
  { id: 'ORD-1044', pair: 'ETH/USDT', side: 'BUY', price: '$3,390', pnl: '-$42.10', positive: false },
  { id: 'ORD-1045', pair: 'SOL/USDT', side: 'SELL', price: '$148.50', pnl: '+$95.20', positive: true },
];

export default function BacktestShowcase() {
  const equityData = useMemo(() => generateEquityCurve(30, 10000, 99), []);
  const drawdownData = useMemo(() => computeDrawdown(equityData), [equityData]);

  return (
    <section id="backtest-showcase" className="py-5">
      <div className="text-center mb-4">
        <span className="text-success text-uppercase fw-semibold small">Backtest Studio</span>
        <h2 className="h2 fw-bold text-white mt-1">Verify Performance Before Going Live</h2>
        <p className="text-secondary mb-0">
          Synchronized equity curve, drawdown, win-rate gauge, and simulated order logs.
        </p>
      </div>

      <div className="row g-4 align-items-stretch">
        <div className="col-lg-8">
          <div className="h-100 p-4 rounded-4 bg-dark bg-opacity-75 border border-secondary border-opacity-25">
            <div className="d-flex justify-content-between align-items-center mb-2">
              <h3 className="h6 text-white mb-0">30-Day Paper Equity Curve</h3>
              <span className="text-success small fw-semibold">+14.8% Simulated Return</span>
            </div>
            <EquityCurveChart data={equityData} height={220} />

            <div className="mt-3">
              <h4 className="h6 text-secondary mb-1">Drawdown (%)</h4>
              <DrawdownChart data={drawdownData} height={150} />
            </div>
          </div>
        </div>

        <div className="col-lg-4 d-flex flex-column gap-4">
          <div className="p-4 rounded-4 bg-dark bg-opacity-75 border border-secondary border-opacity-25 text-center">
            <h3 className="h6 text-white mb-2">Strategy Win Rate</h3>
            <RadialGauge value={64} label="Win Rate" height={190} />
            <p className="text-secondary small mb-0">32 winning / 50 simulated trades</p>
          </div>

          <div className="p-4 rounded-4 bg-dark bg-opacity-75 border border-secondary border-opacity-25 flex-grow-1">
            <h3 className="h6 text-white mb-3">Recent Simulated Orders</h3>
            <div className="table-responsive">
              <table className="table table-dark table-sm align-middle mb-0 small">
                <thead>
                  <tr className="text-secondary">
                    <th>Pair</th>
                    <th>Side</th>
                    <th className="text-end">P&amp;L</th>
                  </tr>
                </thead>
                <tbody>
                  {SAMPLE_ORDERS.map((order) => (
                    <tr key={order.id}>
                      <td className="text-light">{order.pair}</td>
                      <td>
                        <span className={order.side === 'BUY' ? 'text-success' : 'text-info'}>
                          {order.side}
                        </span>
                      </td>
                      <td className={`text-end ${order.positive ? 'text-success' : 'text-danger'}`}>
                        {order.pnl}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
