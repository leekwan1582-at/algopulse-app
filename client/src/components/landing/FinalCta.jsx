import { Link } from 'wouter';
import '../../styles/landing.css';

export default function FinalCta() {
  return (
    <section className="py-5 my-3 text-center rounded-4 bg-dark bg-opacity-75 border border-secondary border-opacity-25 px-4">
      <h2 className="h2 fw-bold text-white">Ready to Test Your Next Strategy?</h2>
      <p className="text-secondary mb-4">
        Launch the paper-trading dashboard or configure your first rule-based bot in seconds.
      </p>
      <div className="d-flex justify-content-center gap-3 flex-wrap">
        <Link href="/Dashboard" className="btn btn-success btn-lg px-4">
          Open Dashboard
        </Link>
        <Link href="/builder" className="btn btn-outline-light btn-lg px-4">
          Build a Strategy
        </Link>
      </div>
    </section>
  );
}
