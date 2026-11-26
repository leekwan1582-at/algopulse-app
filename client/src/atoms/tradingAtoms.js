import { atom } from 'jotai';

export const balanceAtom = atom(10000);

export const strategiesAtom = atom([]);

export const ordersAtom = atom([]);

export const tickerAtom = atom({
  'BTC/USDT': { price: 96450, change: 2.1 },
  'ETH/USDT': { price: 3610, change: -0.8 },
  'SOL/USDT': { price: 230.15, change: 5.4 },
});

export const activeBotsAtom = atom(
  (get) => get(strategiesAtom).filter((s) => s.status === 'ACTIVE').length
);

export const pnl24hAtom = atom((get) =>
  get(ordersAtom).reduce((sum, order) => sum + (Number(order.pnl_amount) || 0), 0)
);
