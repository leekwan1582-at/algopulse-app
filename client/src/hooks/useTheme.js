import { useEffect, useState } from 'react';

const STORAGE_KEY = 'algopulse-theme';
const VALID_THEMES = ['system', 'light', 'dark'];

function getSystemTheme() {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
    return 'light';
  }
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function getInitialTheme() {
  if (typeof window === 'undefined') return 'system';
  const saved = window.localStorage.getItem(STORAGE_KEY);
  return VALID_THEMES.includes(saved) ? saved : 'system';
}

export function useTheme() {
  const [theme, setTheme] = useState(getInitialTheme);
  const [systemTheme, setSystemTheme] = useState(getSystemTheme);

  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
      return undefined;
    }
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (event) => {
      setSystemTheme(event.matches ? 'dark' : 'light');
    };
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const resolvedTheme = theme === 'system' ? systemTheme : theme;

  useEffect(() => {
    const syncTheme = () => {
      setTheme(getInitialTheme());
    };
    window.addEventListener('algopulse-theme-change', syncTheme);
    return () => window.removeEventListener('algopulse-theme-change', syncTheme);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-bs-theme', resolvedTheme);
    window.localStorage.setItem(STORAGE_KEY, theme);
  }, [theme, resolvedTheme]);

  const cycleTheme = () => {
    setTheme((prev) => {
      const idx = VALID_THEMES.indexOf(prev);
      const next = VALID_THEMES[(idx + 1) % VALID_THEMES.length];
      window.localStorage.setItem(STORAGE_KEY, next);
      window.dispatchEvent(new Event('algopulse-theme-change'));
      return next;
    });
  };

  return { theme, resolvedTheme, setTheme, cycleTheme };
}
