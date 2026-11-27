import { lazy, Suspense } from 'react';
import PropTypes from 'prop-types';

const ReactApexChart = lazy(() => import('react-apexcharts'));

export default function LazyChart({ options, series, type, height, width }) {
  return (
    <Suspense
      fallback={
        <div
          className="d-flex align-items-center justify-content-center text-secondary small"
          style={{ height: typeof height === 'number' ? `${height}px` : height }}
        >
          Loading chart...
        </div>
      }
    >
      <ReactApexChart
        options={options}
        series={series}
        type={type}
        height={height}
        width={width}
      />
    </Suspense>
  );
}

LazyChart.propTypes = {
  options: PropTypes.object.isRequired,
  series: PropTypes.array.isRequired,
  type: PropTypes.string.isRequired,
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

LazyChart.defaultProps = {
  height: 280,
  width: '100%',
};
