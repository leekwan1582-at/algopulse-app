import PropTypes from 'prop-types';
import LazyChart from './LazyChart.jsx';

export default function CandlestickChart({ candles, sma, height }) {
  const series = [
    {
      name: 'BTC/USDT',
      type: 'candlestick',
      data: candles,
    },
    {
      name: 'SMA-10',
      type: 'line',
      data: sma,
    },
  ];

  const options = {
    chart: {
      type: 'candlestick',
      background: 'transparent',
      toolbar: { show: false },
      animations: { enabled: false },
    },
    theme: { mode: 'dark' },
    stroke: {
      width: [1, 2],
      curve: 'smooth',
    },
    colors: ['#10b981', '#38bdf8'],
    plotOptions: {
      candlestick: {
        colors: {
          upward: '#10b981',
          downward: '#ef4444',
        },
      },
    },
    xaxis: {
      type: 'datetime',
      labels: { style: { colors: '#94a3b8' } },
      axisBorder: { color: '#334155' },
    },
    yaxis: {
      tooltip: { enabled: true },
      labels: {
        style: { colors: '#94a3b8' },
        formatter: (val) => `$${Math.round(val).toLocaleString()}`,
      },
    },
    grid: {
      borderColor: 'rgba(148, 163, 184, 0.12)',
    },
    legend: {
      labels: { colors: '#cbd5e1' },
    },
  };

  return (
    <LazyChart
      options={options}
      series={series}
      type="candlestick"
      height={height}
    />
  );
}

CandlestickChart.propTypes = {
  candles: PropTypes.array.isRequired,
  sma: PropTypes.array.isRequired,
  height: PropTypes.number,
};

CandlestickChart.defaultProps = {
  height: 280,
};
