import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import ThemeToggle from './ThemeToggle.jsx';
import { useTheme } from '../../hooks/useTheme.js';

const NAV_ITEMS = [
  { href: '/', label: 'Welcome', icon: 'bi-house' },
  { href: '/Dashboard', label: 'Dashboard', icon: 'bi-speedometer2' },
  { href: '/builder', label: 'Builder', icon: 'bi-sliders' },
  { href: '/backtest', label: 'Backtest', icon: 'bi-graph-up-arrow' },
  { href: '/orders', label: 'Orders', icon: 'bi-list-check' },
];

export default function Navbar() {
  const [location] = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  return (
    <nav
      className={`navbar navbar-expand-lg sticky-top border-bottom ${
        isDark ? 'navbar-dark bg-dark border-secondary' : 'navbar-light bg-body-tertiary border-light-subtle'
      }`}
    >
      <div className="container">
        <Link
          href="/"
          className="navbar-brand fw-bold d-flex align-items-center gap-2"
          onClick={() => setIsMenuOpen(false)}
        >
          <i className="bi bi-activity text-info" aria-hidden="true" />
          <span>AlgoPulse</span>
        </Link>

        <button
          type="button"
          className="navbar-toggler"
          aria-controls="main-navbar-nav"
          aria-expanded={isMenuOpen}
          aria-label="Toggle navigation"
          onClick={() => setIsMenuOpen((prev) => !prev)}
        >
          <i className="bi bi-list fs-4" aria-hidden="true" />
        </button>

        <div
          id="main-navbar-nav"
          className={`collapse navbar-collapse ${isMenuOpen ? 'show' : ''}`}
        >
          <div className="navbar-nav ms-auto align-items-lg-center gap-2 py-2 py-lg-0">
            {NAV_ITEMS.map(({ href, label, icon }) => {
              const isActive = location === href;
              return (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`nav-link px-3 rounded ${
                    isActive ? 'active bg-secondary text-white fw-semibold' : ''
                  }`}
                >
                  <i className={`bi ${icon} me-1`} aria-hidden="true" />
                  {label}
                </Link>
              );
            })}
            <ThemeToggle
              className={`ms-lg-2 ${isDark ? 'text-light border-secondary' : ''}`}
              onToggle={() => setIsMenuOpen(false)}
            />
          </div>
        </div>
      </div>
    </nav>
  );
}
