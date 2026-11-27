import { Link } from 'wouter';
import heroImg from '../../assets/hero.png';
import '../../styles/landing.css';

export default function HeroSection() {
  return (
    <section className="hero-banner rounded-4 overflow-hidden my-3">
      <img
        src={heroImg}
        alt="AlgoPulse crypto trading analytics"
        className="hero-banner-img"
      />
      <div className="hero-overlay-card text-center">
        <h1 className="display-5 fw-bold">Elevate Your Crypto Trading</h1>
        <p className="lead mb-4">
          Powerful analytics, automated strategies, and real-time insights for retail traders.
        </p>
        <div className="d-flex justify-content-center gap-3 flex-wrap">
          <Link href="/backtest" className="btn btn-primary btn-lg">
            Try Backtest Demo
          </Link>
          <Link href="/builder" className="btn btn-outline-light btn-lg">
            Get Started
          </Link>
        </div>
      </div>
    </section>
  );
}
