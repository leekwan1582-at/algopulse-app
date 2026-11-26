import { Link, useLocation } from 'wouter';

const NAV_ITEMS = [
  { href: '/', label: 'Dashboard', icon: 'bi-speedometer2' },
  { href: '/builder', label: 'Builder', icon: 'bi-sliders' },
  { href: '/backtest', label: 'Backtest', icon: 'bi-graph-up-arrow' },
  { href: '/orders', label: 'Orders', icon: 'bi-list-check' },
];

export default function Navbar() {
  const [location] = useLocation();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark border-bottom border-secondary">
      <div className="container">
        <Link href="/" className="navbar-brand fw-bold d-flex align-items-center gap-2">
          <i className="bi bi-activity text-info" />
          <span>AlgoPulse</span>
        </Link>
        <div className="navbar-nav ms-auto flex-row gap-2">
          {NAV_ITEMS.map(({ href, label, icon }) => {
            const isActive = location === href;
            return (
              <Link
                key={href}
                href={href}
                className={`nav-link px-3 rounded ${isActive ? 'active bg-secondary text-white fw-semibold' : ''}`}
              >
                <i className={`bi ${icon} me-1`} />
                {label}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
