import '../../styles/landing.css';

export default function LandingFooter() {
  return (
    <footer className="border-top border-secondary border-opacity-25 py-4 mt-5">
      <div className="container d-flex flex-column flex-md-row justify-content-between align-items-center gap-3 text-secondary small">
        <div>
          <strong className="text-body-emphasis">AlgoPulse</strong> — Paper-trading &amp; strategy
          simulation platform. Sample data only; not financial advice.
        </div>
        <div>Built with React, Vite, Bootstrap 5 &amp; ApexCharts.</div>
      </div>
    </footer>
  );
}
