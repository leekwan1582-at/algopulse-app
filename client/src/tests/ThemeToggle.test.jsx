import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import ThemeToggle from '../components/common/ThemeToggle.jsx';

describe('ThemeToggle', () => {
  beforeEach(() => {
    window.localStorage.clear();
    document.documentElement.removeAttribute('data-bs-theme');
  });

  it('defaults to system theme and cycles through system -> light -> dark -> system', () => {
    render(<ThemeToggle />);

    const button = screen.getByRole('button', { name: /Theme: System/i });
    expect(button).toBeInTheDocument();
    expect(window.localStorage.getItem('algopulse-theme')).toBe('system');

    fireEvent.click(button);
    expect(screen.getByRole('button', { name: /Theme: Light/i })).toBeInTheDocument();
    expect(window.localStorage.getItem('algopulse-theme')).toBe('light');
    expect(document.documentElement.getAttribute('data-bs-theme')).toBe('light');

    fireEvent.click(button);
    expect(screen.getByRole('button', { name: /Theme: Dark/i })).toBeInTheDocument();
    expect(window.localStorage.getItem('algopulse-theme')).toBe('dark');
    expect(document.documentElement.getAttribute('data-bs-theme')).toBe('dark');

    fireEvent.click(button);
    expect(screen.getByRole('button', { name: /Theme: System/i })).toBeInTheDocument();
    expect(window.localStorage.getItem('algopulse-theme')).toBe('system');
  });
});
