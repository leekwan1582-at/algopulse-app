import PropTypes from 'prop-types';
import LazyChart from './LazyChart.jsx';

export default function MonthlyReturnsChart({ data, categories, height }) {
  const series = [
    {
      name: 'Monthly Return %',
      data,
    },
  ];

  const options = {
    chart: {
      type: 'bar',
      background: 'transparent',
      toolbar: { show: false },
      animations: { enabled: false },
    },
    theme: { mode: 'dark' },
    plotOptions: {
      bar: {
        borderRadius: 4,
        colors: {
          ranges: [
            { from: -100, to: -0.01, color: '#ef4444' },
            { from: 0, to: 100, color: '#10b981' },
          ],
        },
      },
    },
    dataLabels: { enabled: false },
    xaxis: {
      categories,
      labels: { style: { colors: '#94a3b8' } },
      axisBorder: { color: '#334155' },
    },
    yaxis: {
      labels: {
        style: { colors: '#94a3b8' },
        formatter: (val) => `${val}%`,
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
      type="bar"
      height={height}
    />
  );
}

MonthlyReturnsChart.propTypes = {
  data: PropTypes.arrayOf(PropTypes.number).isRequired,
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
  height: PropTypes.number,
};

MonthlyReturnsChart.defaultProps = {
  height: 220,
};
