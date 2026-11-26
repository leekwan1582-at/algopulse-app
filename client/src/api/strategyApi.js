import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export async function checkHealth() {
  const { data } = await api.get('/health');
  return data;
}

export async function getStrategies(status) {
  const { data } = await api.get('/strategies', {
    params: status ? { status } : undefined,
  });
  return data;
}

export async function getStrategyById(id) {
  const { data } = await api.get(`/strategies/${id}`);
  return data;
}

export async function createStrategy(payload) {
  const { data } = await api.post('/strategies', payload);
  return data;
}

export async function updateStrategy(id, payload) {
  const { data } = await api.put(`/strategies/${id}`, payload);
  return data;
}

export async function toggleStrategyStatus(id, status) {
  const { data } = await api.patch(`/strategies/${id}/status`, status ? { status } : {});
  return data;
}

export async function deleteStrategy(id) {
  await api.delete(`/strategies/${id}`);
}

export async function getOrders(params = {}) {
  const { data } = await api.get('/orders', { params });
  return data;
}

export async function runBacktest(payload) {
  const { data } = await api.post('/backtest', payload);
  return data;
}

export default api;
