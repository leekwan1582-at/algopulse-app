import { useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import { strategiesAtom } from '../atoms/tradingAtoms.js';
import { getOrders, getStrategies } from '../api/strategyApi.js';

export default function OrderHistoryPage() {
  const [strategies, setStrategies] = useAtom(strategiesAtom);
  const [orders, setOrders] = useState([]);
  const [strategyFilter, setStrategyFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (strategies.length > 0) return;
    getStrategies().then(setStrategies).catch(() => {});
  }, [strategies.length, setStrategies]);

  useEffect(() => {
    let cancelled = false;
    async function loadOrders() {
      try {
        setLoading(true);
        const res = await getOrders({
          strategy: strategyFilter || undefined,
          status: statusFilter || undefined,
          q: search.trim() || undefined,
          page,
          limit: 10,
        });
        if (!cancelled) {
          setOrders(res.data || []);
          setTotalPages(res.totalPages || 1);
          setTotal(res.total || 0);
          setError('');
        }
      } catch (err) {
        if (!cancelled) setError(err.response?.data?.error || 'Failed to load orders');
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    loadOrders();
    return () => {
      cancelled = true;
    };
  }, [strategyFilter, statusFilter, search, page]);

  function handleExportCsv() {
    const header = 'Order ID,Strategy Name,Pair,Type,Price,Quantity,P&L ($),Status,Executed At';
    const rows = orders.map((o) =>
      [
        `#ORD-${o.order_id}`,
        `"${o.strategy_name}"`,
        o.asset_symbol,
        o.order_type,
        o.price,
        o.quantity,
        o.pnl_amount,
        o.order_status,
        o.executed_at,
      ].join(',')
    );
    const blob = new Blob([[header, ...rows].join('\n')], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'orders_export.csv';
    link.click();
    URL.revokeObjectURL(url);
  }

  return (
    <section>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1 className="h3 mb-0">Order History &amp; Logs</h1>
        <button
          type="button"
          className="btn btn-outline-secondary btn-sm"
          onClick={handleExportCsv}
          disabled={orders.length === 0}
        >
          <i className="bi bi-download me-1" />
          Export CSV Log
        </button>
      </div>

      <div className="card shadow-sm mb-4">
        <div className="card-body">
          <div className="row g-3">
            <div className="col-md-4">
              <label htmlFor="filter-strategy" className="form-label small fw-semibold">Filter by Strategy</label>
              <select
                id="filter-strategy"
                className="form-select"
                value={strategyFilter}
                onChange={(e) => { setStrategyFilter(e.target.value); setPage(1); }}
              >
                <option value="">All Strategies</option>
                {strategies.map((s) => (
                  <option key={s.strategy_id} value={s.strategy_id}>{s.strategy_name}</option>
                ))}
              </select>
            </div>
            <div className="col-md-4">
              <label htmlFor="filter-status" className="form-label small fw-semibold">Status</label>
              <select
                id="filter-status"
                className="form-select"
                value={statusFilter}
                onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}
              >
                <option value="">All Statuses</option>
                <option value="FILLED">FILLED</option>
                <option value="CANCELLED">CANCELLED</option>
                <option value="EXECUTED">EXECUTED</option>
              </select>
            </div>
            <div className="col-md-4">
              <label htmlFor="filter-search" className="form-label small fw-semibold">Search Ticker</label>
              <input
                id="filter-search"
                type="search"
                className="form-control"
                placeholder="e.g. BTC"
                value={search}
                onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              />
            </div>
          </div>
        </div>
      </div>

      {error && <div className="alert alert-warning">{error}</div>}

      <div className="card shadow-sm">
        <div className="table-responsive">
          <table className="table table-hover mb-0">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Strategy Name</th>
                <th>Pair</th>
                <th>Type</th>
                <th>Price</th>
                <th>Qty</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan="7" className="text-center text-secondary py-4">Loading orders...</td></tr>
              ) : orders.length === 0 ? (
                <tr><td colSpan="7" className="text-center text-secondary py-4">No orders match your filters.</td></tr>
              ) : (
                orders.map((o) => (
                  <tr key={o.order_id}>
                    <td className="font-monospace">#ORD-{o.order_id}</td>
                    <td>{o.strategy_name}</td>
                    <td>{o.asset_symbol}</td>
                    <td>
                      <span className={`badge ${o.order_type === 'BUY' ? 'bg-primary' : 'bg-info text-dark'}`}>
                        {o.order_type}
                      </span>
                    </td>
                    <td>${Number(o.price).toLocaleString('en-US')}</td>
                    <td>{Number(o.quantity).toFixed(2)}</td>
                    <td>
                      <span className={`badge ${o.order_status === 'CANCELLED' ? 'bg-secondary' : 'bg-success'}`}>
                        {o.order_status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <div className="card-footer bg-body-tertiary d-flex justify-content-between align-items-center">
          <span className="small text-secondary">
            Showing {orders.length} of {total} Orders (Page {page} of {totalPages})
          </span>
          <div className="btn-group btn-group-sm">
            <button
              type="button"
              className="btn btn-outline-secondary"
              disabled={page <= 1}
              onClick={() => setPage((p) => p - 1)}
            >
              &lt; Previous
            </button>
            <button
              type="button"
              className="btn btn-outline-secondary"
              disabled={page >= totalPages}
              onClick={() => setPage((p) => p + 1)}
            >
              Next &gt;
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
