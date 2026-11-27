import PropTypes from 'prop-types';
import LazyChart from './LazyChart.jsx';

export default function SparklineChart({ data, color, height }) {
  const series = [{ data }];

  const options = {
    chart: {
      type: 'line',
      sparkline: { enabled: true },
      background: 'transparent',
      animations: { enabled: false },
    },
    stroke: {
      curve: 'smooth',
      width: 2,
    },
    colors: [color],
    tooltip: {
      fixed: { enabled: false },
      x: { show: false },
      y: {
        title: { formatter: () => '' },
      },
      marker: { show: false },
    },
  };

  return (
    <LazyChart
      options={options}
      series={series}
      type="line"
      height={height}
    />
  );
}

SparklineChart.propTypes = {
  data: PropTypes.arrayOf(PropTypes.number).isRequired,
  color: PropTypes.string,
  height: PropTypes.number,
};

SparklineChart.defaultProps = {
  color: '#10b981',
  height: 40,
};
