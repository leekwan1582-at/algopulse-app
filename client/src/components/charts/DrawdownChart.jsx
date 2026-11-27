import PropTypes from 'prop-types';
import LazyChart from './LazyChart.jsx';

export default function DrawdownChart({ data, height }) {
  const series = [
    {
      name: 'Drawdown %',
      data,
    },
  ];

  const options = {
    chart: {
      id: 'backtest-drawdown',
      group: 'backtest',
      type: 'area',
      background: 'transparent',
      toolbar: { show: false },
      animations: { enabled: false },
    },
    theme: { mode: 'dark' },
    stroke: {
      curve: 'smooth',
      width: 2,
    },
    colors: ['#ef4444'],
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.35,
        opacityTo: 0.02,
      },
    },
    dataLabels: { enabled: false },
    xaxis: {
      type: 'datetime',
      labels: { style: { colors: '#94a3b8' } },
      axisBorder: { color: '#334155' },
    },
    yaxis: {
      max: 0,
      labels: {
        style: { colors: '#94a3b8' },
        formatter: (val) => `${val.toFixed(1)}%`,
      },
    },
    grid: {
      borderColor: 'rgba(148, 163, 184, 0.12)',
    },
  };

  return (
    <LazyChart
      options={options}
      series={series}
      type="area"
      height={height}
    />
  );
}

DrawdownChart.propTypes = {
  data: PropTypes.array.isRequired,
  height: PropTypes.number,
};

DrawdownChart.defaultProps = {
  height: 160,
};
