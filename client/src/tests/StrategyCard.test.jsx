import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import StrategyCard from '../components/strategy/StrategyCard.jsx';

const sampleStrategy = {
  strategy_id: 101,
  strategy_name: 'BTC MA Crossover',
  asset_symbol: 'BTC/USDT',
  sma_period: 20,
  rsi_threshold: 30,
  stop_loss_pct: 2.5,
  take_profit_pct: 5.0,
  status: 'ACTIVE',
};

describe('StrategyCard', () => {
  it('renders strategy details and ACTIVE badge', () => {
    render(
      <StrategyCard
        strategy={sampleStrategy}
        onToggle={vi.fn()}
        onEdit={vi.fn()}
        onDelete={vi.fn()}
      />
    );

    expect(screen.getByText('BTC MA Crossover')).toBeInTheDocument();
    expect(screen.getByText('ACTIVE')).toBeInTheDocument();
    expect(screen.getByText('BTC/USDT')).toBeInTheDocument();
    expect(screen.getByText('2.5%')).toBeInTheDocument();
    expect(screen.getByText('5.0%')).toBeInTheDocument();
  });

  it('calls onToggle, onEdit, and onDelete when action buttons are clicked', () => {
    const onToggle = vi.fn();
    const onEdit = vi.fn();
    const onDelete = vi.fn();

    render(
      <StrategyCard
        strategy={sampleStrategy}
        onToggle={onToggle}
        onEdit={onEdit}
        onDelete={onDelete}
      />
    );

    fireEvent.click(screen.getByRole('button', { name: /Pause/i }));
    expect(onToggle).toHaveBeenCalledWith(101);

    fireEvent.click(screen.getByRole('button', { name: /Edit/i }));
    expect(onEdit).toHaveBeenCalledWith(101);

    fireEvent.click(screen.getByRole('button', { name: /Delete/i }));
    expect(onDelete).toHaveBeenCalledWith(sampleStrategy);
  });
});
