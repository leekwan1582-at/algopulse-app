import React from 'react';
import { Link } from 'wouter';
import ThemeToggle from '../common/ThemeToggle.jsx';
import "../../styles/landing.css";

export default function LandingNav() {
  return (
    <nav className="landing-nav navbar navbar-dark bg-dark px-4 py-2">
      <Link href="/" className="navbar-brand fw-bold d-flex align-items-center gap-2">
        <i className="bi bi-activity text-info" aria-hidden="true" />
        <span>AlgoPulse</span>
      </Link>
      <ul className="navbar-nav flex-row ms-auto">
        <li className="nav-item mx-2">
          <Link href="/Dashboard" className="nav-link">
            <i className="bi bi-speedometer2 me-1" aria-hidden="true" />
            Dashboard
          </Link>
        </li>
        <li className="nav-item mx-2">
          <Link href="/builder" className="nav-link">
            <i className="bi bi-sliders me-1" aria-hidden="true" />
            Builder
          </Link>
        </li>
        <li className="nav-item mx-2">
          <Link href="/backtest" className="nav-link">
            <i className="bi bi-graph-up-arrow me-1" aria-hidden="true" />
            Backtest
          </Link>
        </li>
        <li className="nav-item mx-2">
          <Link href="/orders" className="nav-link">
            <i className="bi bi-list-check me-1" aria-hidden="true" />
            Orders
          </Link>
        </li>
        <li className="nav-item ms-2 d-flex align-items-center">
          <ThemeToggle className="text-light border-secondary" />
        </li>
      </ul>
    </nav>
  );
}
