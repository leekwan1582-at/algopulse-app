import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import StrategyForm from '../components/strategy/StrategyForm.jsx';

describe('StrategyForm', () => {
  it('shows required-field error when strategy name is empty', async () => {
    const onSubmit = vi.fn();
    render(<StrategyForm onSubmit={onSubmit} onCancel={vi.fn()} />);

    fireEvent.click(screen.getByRole('button', { name: /Save Strategy/i }));

    expect(await screen.findByText('Strategy name is required')).toBeInTheDocument();
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it('rejects out-of-range Stop Loss (0.05) and Take Profit (250)', async () => {
    const onSubmit = vi.fn();
    render(<StrategyForm onSubmit={onSubmit} onCancel={vi.fn()} />);

    fireEvent.change(screen.getByLabelText(/Strategy Name/i), {
      target: { value: 'BTC Trend Follower' },
    });
    fireEvent.change(screen.getByLabelText(/Stop Loss/i), {
      target: { value: '0.05' },
    });
    fireEvent.change(screen.getByLabelText(/Take Profit/i), {
      target: { value: '250' },
    });

    fireEvent.click(screen.getByRole('button', { name: /Save Strategy/i }));

    expect(await screen.findByText('Stop loss must be at least 0.1%')).toBeInTheDocument();
    expect(await screen.findByText('Take profit must be at most 200.0%')).toBeInTheDocument();
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it('submits valid values with trimmed name and numeric fields', async () => {
    const onSubmit = vi.fn().mockResolvedValue(undefined);
    render(<StrategyForm onSubmit={onSubmit} onCancel={vi.fn()} />);

    fireEvent.change(screen.getByLabelText(/Strategy Name/i), {
      target: { value: '  ETH Breakout  ' },
    });
    fireEvent.click(screen.getByLabelText('ETH/USDT'));
    fireEvent.change(screen.getByLabelText(/Stop Loss/i), {
      target: { value: '1.5' },
    });
    fireEvent.change(screen.getByLabelText(/Take Profit/i), {
      target: { value: '4.5' },
    });

    fireEvent.click(screen.getByRole('button', { name: /Save Strategy/i }));

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith(
        {
          strategy_name: 'ETH Breakout',
          asset_symbol: 'ETH/USDT',
          sma_period: 20,
          rsi_threshold: 30,
          stop_loss_pct: 1.5,
          take_profit_pct: 4.5,
        },
        expect.any(Object)
      );
    });
  });
});
