import { useAtomValue } from 'jotai';
import { tickerAtom } from '../../atoms/tradingAtoms.js';

export default function TickerMarquee() {
  const tickers = useAtomValue(tickerAtom);

  return (
    <div className="bg-body-tertiary border-bottom py-2">
      <div className="container d-flex flex-wrap align-items-center gap-4 small">
        <span className="fw-semibold text-uppercase text-secondary">Live Tickers:</span>
        {Object.entries(tickers).map(([pair, { price, change }]) => {
          const isUp = change >= 0;
          return (
            <span key={pair} className="d-inline-flex align-items-center gap-1">
              <strong>{pair}</strong>
              <span>${price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
              <span className={isUp ? 'text-success' : 'text-danger'}>
                {isUp ? '▲' : '▼'} {isUp ? `+${change.toFixed(1)}%` : `${change.toFixed(1)}%`}
              </span>
            </span>
          );
        })}
      </div>
    </div>
  );
}
