import PropTypes from 'prop-types';
import LazyChart from './LazyChart.jsx';

export default function EquityCurveChart({ data, height }) {
  const series = [
    {
      name: 'Paper Equity',
      data,
    },
  ];

  const options = {
    chart: {
      id: 'backtest-equity',
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
    colors: ['#10b981'],
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
      labels: {
        style: { colors: '#94a3b8' },
        formatter: (val) => `$${Math.round(val).toLocaleString()}`,
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

EquityCurveChart.propTypes = {
  data: PropTypes.array.isRequired,
  height: PropTypes.number,
};

EquityCurveChart.defaultProps = {
  height: 220,
};
