import '../../styles/landing.css';

const STEPS = [
  {
    step: '01',
    title: 'Define Strategy Rules',
    description:
      'Set entry indicators, stop-loss, and take-profit bounds with validated guardrails.',
    icon: 'bi-sliders',
  },
  {
    step: '02',
    title: 'Backtest & Validate',
    description:
      'Simulate historical performance, drawdown, and win rate before risking a single paper dollar.',
    icon: 'bi-graph-up-arrow',
  },
  {
    step: '03',
    title: 'Paper-Trade Live',
    description:
      'Run strategies against simulated market feeds with instant pause and resume controls.',
    icon: 'bi-play-circle',
  },
  {
    step: '04',
    title: 'Review & Export',
    description:
      'Inspect every simulated order and export clean CSV logs for mentoring or post-trade review.',
    icon: 'bi-file-earmark-spreadsheet',
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-5">
      <div className="text-center mb-4">
        <span className="text-success text-uppercase fw-semibold small">Workflow</span>
        <h2 className="h2 fw-bold text-white mt-1">How AlgoPulse Works</h2>
        <p className="text-secondary mb-0">
          Four structured steps from strategy idea to verifiable paper-trading logs.
        </p>
      </div>

      <div className="row g-4">
        {STEPS.map((item) => (
          <div className="col-md-6 col-lg-3" key={item.step}>
            <div className="h-100 p-4 rounded-4 bg-dark bg-opacity-75 border border-secondary border-opacity-25">
              <div className="d-flex align-items-center justify-content-between mb-3">
                <i className={`bi ${item.icon} fs-4 text-success`} aria-hidden="true" />
                <span className="text-secondary fw-bold small">{item.step}</span>
              </div>
              <h3 className="h5 fw-semibold text-white">{item.title}</h3>
              <p className="text-secondary small mb-0">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
