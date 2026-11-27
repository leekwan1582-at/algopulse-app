import '../../styles/landing.css';

const GUARDRAIL_COLUMNS = [
  {
    title: 'Does Automatically',
    badgeClass: 'text-success border-success',
    icon: 'bi-check-circle-fill text-success',
    items: [
      'Evaluates your configured entry and exit rules on simulated ticks',
      'Enforces stop-loss and take-profit bounds on every paper order',
      'Logs simulated fills and exports CSV reports on demand',
    ],
  },
  {
    title: 'Asks Approval For',
    badgeClass: 'text-warning border-warning',
    icon: 'bi-shield-exclamation text-warning',
    items: [
      'Deleting a saved strategy or clearing historical order logs',
      'Resetting your simulated paper-trading account balance',
      'Applying updated risk parameters to an active strategy',
    ],
  },
  {
    title: 'Never Does',
    badgeClass: 'text-danger border-danger',
    icon: 'bi-x-octagon-fill text-danger',
    items: [
      'Never connects to real exchange wallets or moves live funds',
      'Never places unvalidated orders outside your configured bounds',
      'Never shares your strategy parameters or order history externally',
    ],
  },
];

export default function GuardrailsSection() {
  return (
    <section id="guardrails" className="py-5">
      <div className="text-center mb-4">
        <span className="text-success text-uppercase fw-semibold small">Safety &amp; Control</span>
        <h2 className="h2 fw-bold text-white mt-1">Clear Guardrails by Design</h2>
        <p className="text-secondary mb-0">
          Know exactly what AlgoPulse automates, what requires confirmation, and what it never touches.
        </p>
      </div>

      <div className="row g-4">
        {GUARDRAIL_COLUMNS.map((col) => (
          <div className="col-md-4" key={col.title}>
            <div className="h-100 p-4 rounded-4 bg-dark bg-opacity-75 border border-secondary border-opacity-25">
              <div className="d-flex align-items-center gap-2 mb-3">
                <i className={`bi ${col.icon} fs-5`} aria-hidden="true" />
                <h3 className="h5 fw-semibold text-white mb-0">{col.title}</h3>
              </div>
              <ul className="list-unstyled mb-0 d-flex flex-column gap-2">
                {col.items.map((text) => (
                  <li key={text} className="text-secondary small d-flex align-items-start gap-2">
                    <span className="text-light">•</span>
                    <span>{text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
