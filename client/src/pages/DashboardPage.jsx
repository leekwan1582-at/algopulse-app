import { useEffect, useState } from 'react';
import { useAtom, useAtomValue } from 'jotai';
import { Link, useLocation } from 'wouter';
import Swal from 'sweetalert2';
import {
  activeBotsAtom,
  balanceAtom,
  ordersAtom,
  pnl24hAtom,
  strategiesAtom,
  tickerAtom,
} from '../atoms/tradingAtoms.js';
import {
  deleteStrategy,
  getOrders,
  getStrategies,
  toggleStrategyStatus,
} from '../api/strategyApi.js';
import StrategyCard from '../components/strategy/StrategyCard.jsx';

export default function DashboardPage() {
  const [, setLocation] = useLocation();
  const balance = useAtomValue(balanceAtom);
  const activeBots = useAtomValue(activeBotsAtom);
  const pnl24h = useAtomValue(pnl24hAtom);
  const [strategies, setStrategies] = useAtom(strategiesAtom);
  const [, setOrders] = useAtom(ordersAtom);
  const [tickers, setTickers] = useAtom(tickerAtom);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelled = false;
    async function loadDashboard() {
      try {
        setLoading(true);
        const [strats, ordRes] = await Promise.all([
          getStrategies(),
          getOrders({ limit: 50 }),
        ]);
        if (!cancelled) {
          setStrategies(strats);
          setOrders(ordRes.data || []);
          setError('');
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.response?.data?.error || 'Could not load dashboard data from server.');
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    loadDashboard();
    return () => {
      cancelled = true;
    };
  }, [setStrategies, setOrders]);

  async function handleToggle(id) {
    try {
      const updated = await toggleStrategyStatus(id);
      setStrategies((prev) => prev.map((s) => (s.strategy_id === id ? updated : s)));
    } catch (err) {
      Swal.fire('Error', err.response?.data?.error || 'Failed to update strategy status', 'error');
    }
  }

  function handleEdit(id) {
    setLocation(`/builder?id=${id}`);
  }

  async function handleDelete(strategy) {
    const result = await Swal.fire({
      title: `Delete "${strategy.strategy_name}"?`,
      text: 'This removes the strategy from your active list while preserving order history.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#dc3545',
      confirmButtonText: 'Yes, delete it',
    });

    if (!result.isConfirmed) return;

    try {
      await deleteStrategy(strategy.strategy_id);
      setStrategies((prev) => prev.filter((s) => s.strategy_id !== strategy.strategy_id));
      Swal.fire('Deleted', 'Strategy has been removed.', 'success');
    } catch (err) {
      Swal.fire('Error', err.response?.data?.error || 'Failed to delete strategy', 'error');
    }
  }

  function handleRefreshFeed() {
    setTickers((prev) => {
      const next = {};
      for (const [pair, info] of Object.entries(prev)) {
        const delta = (Math.random() - 0.48) * 0.6;
        const price = Number((info.price * (1 + delta / 100)).toFixed(2));
        const change = Number((info.change + delta).toFixed(2));
        next[pair] = { price, change };
      }
      return next;
    });
  }

  return (
    <section>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1 className="h3 mb-0">Dashboard</h1>
        <Link href="/builder" className="btn btn-primary btn-sm">
          <i className="bi bi-plus-lg me-1" />
          New Strategy
        </Link>
      </div>

      {error && <div className="alert alert-warning">{error}</div>}

      <div className="row g-3 mb-4">
        <div className="col-md-4">
          <div className="card shadow-sm h-100">
            <div className="card-body">
              <div className="text-secondary small text-uppercase">Virtual Balance</div>
              <div className="fs-4 fw-bold">
                ${balance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} USD
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card shadow-sm h-100">
            <div className="card-body">
              <div className="text-secondary small text-uppercase">Active Bots</div>
              <div className="fs-4 fw-bold">{activeBots} Running</div>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card shadow-sm h-100">
            <div className="card-body">
              <div className="text-secondary small text-uppercase">24h Net P&amp;L</div>
              <div className={`fs-4 fw-bold ${pnl24h >= 0 ? 'text-success' : 'text-danger'}`}>
                {pnl24h >= 0 ? '+' : '-'}${Math.abs(pnl24h).toFixed(2)} {pnl24h >= 0 ? '▲' : '▼'}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row g-4">
        <div className="col-lg-7">
          <h2 className="h5 mb-3">Active Strategies</h2>
          {loading ? (
            <p className="text-secondary">Loading strategies...</p>
          ) : strategies.length === 0 ? (
            <div className="card card-body text-secondary">
              No strategies yet. <Link href="/builder">Create your first strategy</Link>.
            </div>
          ) : (
            strategies.map((strategy) => (
              <StrategyCard
                key={strategy.strategy_id}
                strategy={strategy}
                onToggle={handleToggle}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))
          )}
        </div>

        <div className="col-lg-5">
          <div className="card shadow-sm">
            <div className="card-header d-flex justify-content-between align-items-center bg-white">
              <h2 className="h6 mb-0 fw-bold">Live Market Feed</h2>
              <button type="button" className="btn btn-sm btn-outline-secondary" onClick={handleRefreshFeed}>
                <i className="bi bi-arrow-clockwise me-1" />
                Refresh Feed
              </button>
            </div>
            <div className="table-responsive">
              <table className="table table-hover mb-0">
                <thead className="table-light">
                  <tr>
                    <th>Pair</th>
                    <th>Price</th>
                    <th>Change</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(tickers).map(([pair, { price, change }]) => (
                    <tr key={pair}>
                      <td className="fw-semibold">{pair}</td>
                      <td>${price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                      <td className={change >= 0 ? 'text-success' : 'text-danger'}>
                        {change >= 0 ? `+${change.toFixed(2)}%` : `${change.toFixed(2)}%`}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
