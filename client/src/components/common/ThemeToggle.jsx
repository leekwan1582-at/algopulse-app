import PropTypes from 'prop-types';
import { useTheme } from '../../hooks/useTheme.js';

const THEME_META = {
  system: { label: 'System', icon: 'bi-circle-half' },
  light: { label: 'Light', icon: 'bi-sun-fill' },
  dark: { label: 'Dark', icon: 'bi-moon-stars-fill' },
};

export default function ThemeToggle({ className, onToggle }) {
  const { theme, cycleTheme } = useTheme();
  const { label, icon } = THEME_META[theme];

  const handleClick = () => {
    cycleTheme();
    if (onToggle) onToggle();
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`btn btn-sm  d-inline-flex align-items-center gap-1 ${className}`}
      aria-label={`Theme: ${label}. Click to switch theme.`}
      title={`Theme: ${label}`}
      style={{ minWidth: 80 }}
    >
      <i className={`bi ${icon}`} aria-hidden="true" />
      <span>{label}</span>
    </button>
  );
}

ThemeToggle.propTypes = {
  className: PropTypes.string,
  onToggle: PropTypes.func,
};

ThemeToggle.defaultProps = {
  className: '',
  onToggle: undefined,
};
