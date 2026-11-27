import PropTypes from 'prop-types';
import LazyChart from './LazyChart.jsx';

export default function RadialGauge({ value, label, height }) {
  const series = [value];

  const options = {
    chart: {
      type: 'radialBar',
      background: 'transparent',
      animations: { enabled: false },
    },
    theme: { mode: 'dark' },
    colors: ['#10b981'],
    plotOptions: {
      radialBar: {
        hollow: { size: '62%' },
        track: { background: 'rgba(148, 163, 184, 0.15)' },
        dataLabels: {
          name: {
            color: '#94a3b8',
            fontSize: '12px',
          },
          value: {
            color: '#f8fafc',
            fontSize: '20px',
            fontWeight: 700,
            formatter: (val) => `${val}%`,
          },
        },
      },
    },
    labels: [label],
  };

  return (
    <LazyChart
      options={options}
      series={series}
      type="radialBar"
      height={height}
    />
  );
}

RadialGauge.propTypes = {
  value: PropTypes.number.isRequired,
  label: PropTypes.string,
  height: PropTypes.number,
};

RadialGauge.defaultProps = {
  label: 'Win Rate',
  height: 200,
};
