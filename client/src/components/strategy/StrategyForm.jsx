import PropTypes from 'prop-types';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';

const SYMBOLS = ['BTC/USDT', 'ETH/USDT', 'SOL/USDT'];

const DEFAULT_VALUES = {
  strategy_name: '',
  asset_symbol: 'BTC/USDT',
  sma_period: 20,
  rsi_threshold: 30,
  stop_loss_pct: 2.0,
  take_profit_pct: 5.0,
};

const validationSchema = Yup.object({
  strategy_name: Yup.string()
    .trim()
    .min(3, 'Strategy name must be at least 3 characters')
    .max(100, 'Strategy name must be at most 100 characters')
    .required('Strategy name is required'),
  asset_symbol: Yup.string()
    .oneOf(SYMBOLS, 'Select a valid asset symbol')
    .required('Target asset symbol is required'),
  sma_period: Yup.number()
    .typeError('SMA period must be a number')
    .integer('SMA period must be a whole number')
    .min(1, 'SMA period must be at least 1')
    .max(500, 'SMA period must be at most 500')
    .required('SMA period is required'),
  rsi_threshold: Yup.number()
    .typeError('RSI threshold must be a number')
    .integer('RSI threshold must be a whole number')
    .min(1, 'RSI threshold must be between 1 and 100')
    .max(100, 'RSI threshold must be between 1 and 100')
    .required('RSI threshold is required'),
  stop_loss_pct: Yup.number()
    .typeError('Stop loss must be a number')
    .min(0.1, 'Stop loss must be at least 0.1%')
    .max(50.0, 'Stop loss must be at most 50.0%')
    .required('Stop loss is required'),
  take_profit_pct: Yup.number()
    .typeError('Take profit must be a number')
    .min(0.5, 'Take profit must be at least 0.5%')
    .max(200.0, 'Take profit must be at most 200.0%')
    .required('Take profit is required'),
});

export default function StrategyForm({ initialValues, onSubmit, onCancel, submitLabel = 'Save Strategy' }) {
  const mergedValues = { ...DEFAULT_VALUES, ...initialValues };

  return (
    <Formik
      enableReinitialize
      initialValues={mergedValues}
      validationSchema={validationSchema}
      onSubmit={async (values, helpers) => {
        await onSubmit({
          ...values,
          strategy_name: values.strategy_name.trim(),
          sma_period: Number(values.sma_period),
          rsi_threshold: Number(values.rsi_threshold),
          stop_loss_pct: Number(values.stop_loss_pct),
          take_profit_pct: Number(values.take_profit_pct),
        }, helpers);
      }}
    >
      {({ isSubmitting }) => (
        <Form noValidate>
          <div className="mb-3">
            <label htmlFor="strategy_name" className="form-label fw-semibold">
              Strategy Name <span className="text-danger">*</span>
            </label>
            <Field
              id="strategy_name"
              name="strategy_name"
              type="text"
              className="form-control"
              placeholder="e.g. BTC Trend Follower"
            />
            <ErrorMessage name="strategy_name" component="div" className="text-danger small mt-1" />
          </div>

          <div className="mb-3">
            <span className="form-label fw-semibold d-block">
              Target Asset Symbol <span className="text-danger">*</span>
            </span>
            <div className="d-flex flex-wrap gap-3">
              {SYMBOLS.map((sym) => (
                <div key={sym} className="form-check">
                  <Field
                    id={`sym-${sym}`}
                    type="radio"
                    name="asset_symbol"
                    value={sym}
                    className="form-check-input"
                  />
                  <label htmlFor={`sym-${sym}`} className="form-check-label">
                    {sym}
                  </label>
                </div>
              ))}
            </div>
            <ErrorMessage name="asset_symbol" component="div" className="text-danger small mt-1" />
          </div>

          <div className="row g-3 mb-3">
            <div className="col-md-6">
              <label htmlFor="sma_period" className="form-label fw-semibold">
                Simple Moving Average (SMA) Period
              </label>
              <Field id="sma_period" name="sma_period" type="number" className="form-control" />
              <ErrorMessage name="sma_period" component="div" className="text-danger small mt-1" />
            </div>
            <div className="col-md-6">
              <label htmlFor="rsi_threshold" className="form-label fw-semibold">
                RSI Threshold
              </label>
              <Field id="rsi_threshold" name="rsi_threshold" type="number" className="form-control" />
              <ErrorMessage name="rsi_threshold" component="div" className="text-danger small mt-1" />
            </div>
          </div>

          <div className="row g-3 mb-4">
            <div className="col-md-6">
              <label htmlFor="stop_loss_pct" className="form-label fw-semibold">
                Stop Loss (%) <span className="text-danger">*</span>
              </label>
              <Field
                id="stop_loss_pct"
                name="stop_loss_pct"
                type="number"
                step="0.1"
                className="form-control"
              />
              <ErrorMessage name="stop_loss_pct" component="div" className="text-danger small mt-1" />
            </div>
            <div className="col-md-6">
              <label htmlFor="take_profit_pct" className="form-label fw-semibold">
                Take Profit (%) <span className="text-danger">*</span>
              </label>
              <Field
                id="take_profit_pct"
                name="take_profit_pct"
                type="number"
                step="0.1"
                className="form-control"
              />
              <ErrorMessage name="take_profit_pct" component="div" className="text-danger small mt-1" />
            </div>
          </div>

          <div className="d-flex justify-content-between">
            <button type="button" className="btn btn-outline-secondary" onClick={onCancel}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
              {isSubmitting ? 'Saving...' : submitLabel}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}

StrategyForm.propTypes = {
  initialValues: PropTypes.shape({
    strategy_name: PropTypes.string,
    asset_symbol: PropTypes.string,
    sma_period: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    rsi_threshold: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    stop_loss_pct: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    take_profit_pct: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  }),
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  submitLabel: PropTypes.string,
};
