import MonthlyReturnsChart from '../charts/MonthlyReturnsChart.jsx';
import '../../styles/landing.css';

const MONTHS = ['Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov'];
const MONTHLY_RETURNS = [3.2, -1.4, 4.8, 2.6, -0.8, 5.4];

export default function EducatorSection() {
  return (
    <section id="educators" className="py-5">
      <div className="row g-4 align-items-center">
        <div className="col-lg-6">
          <span className="text-success text-uppercase fw-semibold small">For Trading Mentors</span>
          <h2 className="h2 fw-bold text-white mt-1">Teach Risk Discipline with Verifiable Logs</h2>
          <blockquote className="blockquote text-light my-3 border-start border-success border-3 ps-3">
            <p className="mb-2 fs-6">
              &ldquo;Students learn twice as fast when they can test stop-loss rules in a realistic
              sandbox and export their simulated order logs for weekly review.&rdquo;
            </p>
            <footer className="blockquote-footer text-secondary mt-1">
              Marcus Chen, Quantitative Trading Mentor
            </footer>
          </blockquote>
        </div>

        <div className="col-lg-6">
          <div className="p-4 rounded-4 bg-dark bg-opacity-75 border border-secondary border-opacity-25">
            <div className="d-flex justify-content-between align-items-center mb-2">
              <h3 className="h6 text-white mb-0">Sample Cohort Monthly Returns (%)</h3>
              <span className="text-secondary small">Simulated 6-Month Window</span>
            </div>
            <MonthlyReturnsChart data={MONTHLY_RETURNS} categories={MONTHS} height={220} />
          </div>
        </div>
      </div>
    </section>
  );
}
