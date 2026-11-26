import PropTypes from 'prop-types';

export default function StrategyCard({ strategy, onToggle, onEdit, onDelete }) {
  const isActive = strategy.status === 'ACTIVE';

  return (
    <div className="card mb-3 shadow-sm">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-start mb-2">
          <h3 className="h6 card-title mb-0 fw-bold">{strategy.strategy_name}</h3>
          <span className={`badge ${isActive ? 'bg-success' : 'bg-secondary'}`}>
            {strategy.status}
          </span>
        </div>

        <p className="card-text small text-secondary mb-1">
          Symbol: <strong>{strategy.asset_symbol}</strong> | SMA: <strong>{strategy.sma_period}</strong> | RSI: <strong>{strategy.rsi_threshold}</strong>
        </p>
        <p className="card-text small text-secondary mb-3">
          SL: <strong>{Number(strategy.stop_loss_pct).toFixed(1)}%</strong> | TP: <strong>{Number(strategy.take_profit_pct).toFixed(1)}%</strong>
        </p>

        <div className="d-flex flex-wrap gap-2">
          <button
            type="button"
            className={`btn btn-sm ${isActive ? 'btn-outline-warning' : 'btn-outline-success'}`}
            onClick={() => onToggle(strategy.strategy_id)}
          >
            <i className={`bi ${isActive ? 'bi-pause-fill' : 'bi-play-fill'} me-1`} />
            {isActive ? 'Pause' : 'Start'}
          </button>
          <button
            type="button"
            className="btn btn-sm btn-outline-primary"
            onClick={() => onEdit(strategy.strategy_id)}
          >
            <i className="bi bi-pencil me-1" />
            Edit
          </button>
          <button
            type="button"
            className="btn btn-sm btn-outline-danger"
            onClick={() => onDelete(strategy)}
          >
            <i className="bi bi-trash me-1" />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

StrategyCard.propTypes = {
  strategy: PropTypes.shape({
    strategy_id: PropTypes.number.isRequired,
    strategy_name: PropTypes.string.isRequired,
    asset_symbol: PropTypes.string.isRequired,
    sma_period: PropTypes.number.isRequired,
    rsi_threshold: PropTypes.number.isRequired,
    stop_loss_pct: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    take_profit_pct: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    status: PropTypes.string.isRequired,
  }).isRequired,
  onToggle: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};
