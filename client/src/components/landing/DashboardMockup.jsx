import { useMemo } from 'react';
import CandlestickChart from '../charts/CandlestickChart.jsx';
import SparklineChart from '../charts/SparklineChart.jsx';
import {
  generateCandles,
  computeSma,
  generateSparkline,
} from '../../utils/chartData.js';
import '../../styles/landing.css';

const SAMPLE_TICKERS = [
  { symbol: 'BTC/USDT', price: '$65,420', change: '+2.4%', positive: true, seed: 11, start: 63800 },
  { symbol: 'ETH/USDT', price: '$3,410', change: '+1.8%', positive: true, seed: 22, start: 3320 },
  { symbol: 'SOL/USDT', price: '$148.50', change: '-0.6%', positive: false, seed: 33, start: 150 },
];

export default function DashboardMockup() {
  const candles = useMemo(() => generateCandles(40, 64200, 42), []);
  const sma = useMemo(() => computeSma(candles, 10), [candles]);
  const tickers = useMemo(
    () =>
      SAMPLE_TICKERS.map((t) => ({
        ...t,
        sparkline: generateSparkline(16, t.start, t.seed),
      })),
    []
  );

  return (
    <section className="dashboard-mockup my-5 rounded-4 p-4 text-start">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <span className="badge bg-success bg-opacity-25 text-success border border-success border-opacity-50">
          Sample Paper-Trading Preview
        </span>
        <span className="text-secondary small">Simulated data — no live funds</span>
      </div>

      {/* Ticker strip with SparklineCharts */}
      <div className="row g-3 mb-4">
        {tickers.map((t) => (
          <div className="col-md-4" key={t.symbol}>
            <div className="p-3 rounded-3 bg-dark bg-opacity-75 border border-secondary border-opacity-25">
              <div className="d-flex justify-content-between align-items-baseline mb-1">
                <span className="fw-semibold text-light">{t.symbol}</span>
                <span className={t.positive ? 'text-success small' : 'text-danger small'}>
                  {t.change}
                </span>
              </div>
              <div className="fs-5 fw-bold text-white mb-2">{t.price}</div>
              <SparklineChart
                data={t.sparkline}
                color={t.positive ? '#10b981' : '#ef4444'}
                height={38}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Candlestick + SMA-10 Chart */}
      <div className="p-3 rounded-3 bg-dark bg-opacity-75 border border-secondary border-opacity-25">
        <div className="d-flex justify-content-between align-items-center mb-2">
          <h3 className="h6 mb-0 text-light">BTC/USDT — 1H Momentum &amp; SMA-10</h3>
          <span className="text-secondary small">Paper Balance: $10,480.00</span>
        </div>
        <CandlestickChart candles={candles} sma={sma} height={280} />
      </div>
    </section>
  );
}
