import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Provider } from 'jotai';
import { Router } from 'wouter';
import { memoryLocation } from 'wouter/memory-location';
import App from '../App.jsx';

vi.mock('../api/strategyApi.js', () => ({
  getStrategies: vi.fn().mockResolvedValue([]),
  getOrders: vi.fn().mockResolvedValue({ data: [], total: 0, totalPages: 1 }),
  getStrategyById: vi.fn(),
  createStrategy: vi.fn(),
  updateStrategy: vi.fn(),
  toggleStrategyStatus: vi.fn(),
  deleteStrategy: vi.fn(),
  runBacktest: vi.fn(),
}));

function renderAt(path) {
  const { hook } = memoryLocation({ path, static: true });
  return render(
    <Provider>
      <Router hook={hook}>
        <App />
      </Router>
    </Provider>
  );
}

describe('App', () => {
  it('renders the Navbar and Dashboard heading at /', async () => {
    renderAt('/');
    expect(screen.getByText('AlgoPulse')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Dashboard' })).toBeInTheDocument();
  });

  it('renders Strategy Builder at /builder', () => {
    renderAt('/builder');
    expect(screen.getByRole('heading', { name: 'Strategy Builder' })).toBeInTheDocument();
  });

  it('renders Backtest Studio at /backtest', () => {
    renderAt('/backtest');
    expect(screen.getByRole('heading', { name: 'Backtest Studio' })).toBeInTheDocument();
  });

  it('renders Order History & Logs at /orders', () => {
    renderAt('/orders');
    expect(screen.getByRole('heading', { name: /Order History/i })).toBeInTheDocument();
  });
});
