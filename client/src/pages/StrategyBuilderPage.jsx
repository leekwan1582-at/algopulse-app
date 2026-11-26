import { useEffect, useState } from 'react';
import { useSetAtom } from 'jotai';
import { useLocation, useSearch } from 'wouter';
import Swal from 'sweetalert2';
import { strategiesAtom } from '../atoms/tradingAtoms.js';
import { createStrategy, getStrategyById, updateStrategy } from '../api/strategyApi.js';
import StrategyForm from '../components/strategy/StrategyForm.jsx';

export default function StrategyBuilderPage() {
  const [, setLocation] = useLocation();
  const search = useSearch();
  const editId = new URLSearchParams(search).get('id');
  const setStrategies = useSetAtom(strategiesAtom);

  const [initialValues, setInitialValues] = useState(undefined);
  const [loading, setLoading] = useState(Boolean(editId));
  const [error, setError] = useState('');

  useEffect(() => {
    if (!editId) return;
    let cancelled = false;
    async function loadStrategy() {
      try {
        setLoading(true);
        const data = await getStrategyById(editId);
        if (!cancelled) setInitialValues(data);
      } catch (err) {
        if (!cancelled) setError(err.response?.data?.error || 'Failed to load strategy');
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    loadStrategy();
    return () => {
      cancelled = true;
    };
  }, [editId]);

  async function handleSubmit(values) {
    try {
      if (editId) {
        const updated = await updateStrategy(editId, values);
        setStrategies((prev) => prev.map((s) => (s.strategy_id === Number(editId) ? updated : s)));
        await Swal.fire('Updated', `"${updated.strategy_name}" saved.`, 'success');
      } else {
        const created = await createStrategy(values);
        setStrategies((prev) => [created, ...prev]);
        await Swal.fire('Created', `"${created.strategy_name}" saved to MariaDB.`, 'success');
      }
      setLocation('/');
    } catch (err) {
      Swal.fire('Error', err.response?.data?.error || 'Failed to save strategy', 'error');
    }
  }

  return (
    <section className="mx-auto" style={{ maxWidth: '720px' }}>
      <h1 className="h3 mb-3">{editId ? 'Edit Strategy' : 'Strategy Builder'}</h1>
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="card shadow-sm">
        <div className="card-body">
          {loading ? (
            <p className="text-secondary mb-0">Loading strategy...</p>
          ) : (
            <StrategyForm
              initialValues={initialValues}
              onSubmit={handleSubmit}
              onCancel={() => setLocation('/')}
              submitLabel={editId ? 'Update Strategy' : 'Save & Deploy to MariaDB'}
            />
          )}
        </div>
      </div>
    </section>
  );
}
