import '../../styles/landing.css';

const FEATURES = [
  {
    title: 'Automated Workflows',
    description:
      'Build rule-based strategies with strict stop-loss and take-profit bounds, then pause or resume bots with one click.',
    icon: 'bi-cpu',
  },
  {
    title: 'Real-Time Paper Analytics',
    description:
      'Track simulated portfolio balance, 24h P&L, and candlestick momentum without connecting real exchange funds.',
    icon: 'bi-activity',
  },
  {
    title: 'Transparent Order Logs',
    description:
      'Every simulated fill is recorded with timestamps, prices, and strategy attribution, ready for CSV export.',
    icon: 'bi-journal-check',
  },
];

export default function FeatureGrid() {
  return (
    <section id="features" className="py-5">
      <div className="text-center mb-4">
        <span className="text-success text-uppercase fw-semibold small">Core Capabilities</span>
        <h2 className="h2 fw-bold text-white mt-1">Built for Disciplined Traders &amp; Mentors</h2>
      </div>

      <div className="row g-4">
        {FEATURES.map((feature) => (
          <div className="col-md-4" key={feature.title}>
            <div className="h-100 p-4 rounded-4 bg-dark bg-opacity-75 border border-secondary border-opacity-25">
              <div className="mb-3">
                <i className={`bi ${feature.icon} fs-3 text-success`} aria-hidden="true" />
              </div>
              <h3 className="h5 fw-semibold text-white">{feature.title}</h3>
              <p className="text-secondary small mb-0">{feature.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
