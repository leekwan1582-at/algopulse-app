import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import LandingPage from '../pages/LandingPage.jsx';

vi.mock('react-apexcharts', () => ({
  default: ({ type }) => <div data-testid={`mock-chart-${type}`} />,
}));

describe('LandingPage', () => {
  it('renders hero, workflow, features, guardrails, backtest showcase, educator, FAQ, and footer', () => {
    render(<LandingPage />);

    expect(screen.getByRole('heading', { name: /Elevate Your Crypto Trading/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /How AlgoPulse Works/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Built for Disciplined Traders/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Clear Guardrails by Design/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Verify Performance Before Going Live/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Teach Risk Discipline with Verifiable Logs/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Frequently Asked Questions/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Ready to Test Your Next Strategy/i })).toBeInTheDocument();
  });

  it('toggles FAQ accordion items when clicked', () => {
    render(<LandingPage />);

    const secondQuestion = screen.getByRole('button', {
      name: /How are strategy risk parameters validated/i,
    });
    expect(secondQuestion).toHaveAttribute('aria-expanded', 'false');

    fireEvent.click(secondQuestion);
    expect(secondQuestion).toHaveAttribute('aria-expanded', 'true');
  });
});
