import { describe, it, expect } from 'vitest';
import {
  generateCandles,
  computeSma,
  generateSparkline,
  generateEquityCurve,
  computeDrawdown,
} from '../utils/chartData.js';

describe('chartData utilities', () => {
  it('generateCandles produces deterministic OHLC candles', () => {
    const a = generateCandles(15, 64000, 42);
    const b = generateCandles(15, 64000, 42);
    expect(a).toHaveLength(15);
    expect(a).toEqual(b);
    expect(a[0].y).toHaveLength(4);
  });

  it('computeSma calculates moving average for the requested period', () => {
    const candles = generateCandles(20, 64000, 42);
    const sma = computeSma(candles, 10);
    expect(sma).toHaveLength(11);
    expect(typeof sma[0].y).toBe('number');
  });

  it('generateSparkline returns requested number of numeric points', () => {
    const points = generateSparkline(12, 100, 7);
    expect(points).toHaveLength(12);
    expect(points.every((n) => typeof n === 'number')).toBe(true);
  });

  it('generateEquityCurve and computeDrawdown produce valid series', () => {
    const equity = generateEquityCurve(20, 10000, 99);
    const drawdown = computeDrawdown(equity);
    expect(equity).toHaveLength(20);
    expect(drawdown).toHaveLength(20);
    expect(drawdown.every((pt) => pt.y <= 0)).toBe(true);
  });
});
