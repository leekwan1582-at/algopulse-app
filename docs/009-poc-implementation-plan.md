# 009 – PoC Implementation Plan: AlgoPulse

> Supports **01-submission.md § 4.2 Interactive Proof of Concept (PoC) Development with Google Antigravity**.
> Based on the folder structure in **02-proposal.md § 3 Project Folder Structure**.

---

## 1. Goal & Scope

Build a working high-fidelity PoC (Fidelity Level 3) that shows:

1. A Vite + React SPA with **Wouter** routing for the 4 wireframed pages (`/`, `/builder`, `/backtest`, `/orders`).
2. **Jotai** atomic state for virtual balance, active bots and live orders.
3. A **Formik + Yup** strategy form with risk limits (Stop-Loss `0.1%–50.0%`, Take-Profit `0.5%–200.0%`).
4. An **Express** REST API using **axios** from the client, saving data to **MariaDB**.
5. **Vitest + Testing Library** tests for the main components.

**Out of scope for the PoC:** real exchange order execution, authentication/JWT, production deployment.

---

## 2. Target Folder Structure

```
algopulse-app/
├── client/
│   ├── public/favicon.ico
│   ├── src/
│   │   ├── api/strategyApi.js
│   │   ├── atoms/tradingAtoms.js
│   │   ├── components/
│   │   │   ├── common/{Navbar.jsx, TickerMarquee.jsx}
│   │   │   └── strategy/{StrategyCard.jsx, StrategyForm.jsx}
│   │   ├── pages/{DashboardPage, StrategyBuilderPage, BacktestStudioPage, OrderHistoryPage}.jsx
│   │   ├── tests/{App, StrategyCard, StrategyForm}.test.jsx
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── setupTests.js
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
└── server/
    ├── src/
    │   ├── config/database.js
    │   ├── controllers/strategyController.js
    │   ├── routes/strategyRoutes.js
    │   └── index.js
    ├── db/schema.sql
    └── package.json
```

> [!NOTE]
> The proposal lists both `client/public/index.html` and `client/index.html`. Vite only uses the **root `client/index.html`**, so the PoC leaves out `public/index.html`.

---

## 3. Implementation Phases

### Phase 0 – Workspace Setup
| Task | Command / Output |
| :-- | :-- |
| Scaffold client | `npm create vite@latest client -- --template react` |
| Client deps | `npm i wouter jotai axios formik yup prop-types bootstrap bootstrap-icons sweetalert2` |
| Client dev deps | `npm i -D vitest jsdom @testing-library/react @testing-library/jest-dom` |
| Scaffold server | `mkdir server && npm init -y` |
| Server deps | `npm i express mariadb cors dotenv` · `npm i -D nodemon` |
| Env | `server/.env` → `DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME, PORT=5000` |

**Antigravity prompt:** *"Scaffold a Vite React client and an Express server using the AlgoPulse folder structure from 02-proposal.md §3."*

### Phase 1 – Database Layer (`server/db`, `server/src/config`)
- `db/schema.sql`: tables `users`, `strategies`, `orders`, `backtest_results` (FKs: `strategies.user_id`, `orders.strategy_id`). Seed using the mock data in submission § 5.2.
- `config/database.js`: `mariadb.createPool({ connectionLimit: 5, ... })` from `.env`; export `query(sql, params)` helper.

### Phase 2 – REST API (`server/src`)
| Method | Route | Controller fn |
| :-- | :-- | :-- |
| GET | `/api/strategies` | `getStrategies` |
| GET | `/api/strategies/:id` | `getStrategyById` |
| POST | `/api/strategies` | `createStrategy` (server-side check of SL/TP ranges) |
| PUT | `/api/strategies/:id` | `updateStrategy` |
| PATCH | `/api/strategies/:id/status` | `toggleStrategy` (ACTIVE ↔ PAUSED) |
| DELETE | `/api/strategies/:id` | `deleteStrategy` |
| GET | `/api/orders` | `getOrders` (filter `strategy`, `status`, `q`, pagination) |
| POST | `/api/backtest` | `runBacktest` (mock SMA crossover on sample candles) |

- `index.js`: `express.json()`, `cors()`, mount routes under `/api`, central error handler, `GET /api/health`.

### Phase 3 – Client Foundation (`client/src`)
- `main.jsx`: import Bootstrap CSS/Icons, wrap `<App/>` in Jotai `<Provider>`.
- `App.jsx`: `<Navbar/>`, `<TickerMarquee/>`, Wouter `<Switch>` with 4 `<Route>`s and a 404 route.
- `api/strategyApi.js`: axios instance (`baseURL: /api`) plus CRUD, orders and backtest functions.
- `vite.config.js`: dev proxy `/api → http://localhost:5000`; `test: { environment: 'jsdom', setupFiles: './src/setupTests.js', globals: true }`.

### Phase 4 – State (`atoms/tradingAtoms.js`)
```js
balanceAtom          // 10000
strategiesAtom       // Strategy[]
activeBotsAtom       // derived: strategies.filter(s => s.status === 'ACTIVE').length
ordersAtom           // Order[]
tickerAtom           // { 'BTC/USDT': { price, change } , ... }
pnl24hAtom           // derived from ordersAtom
```

### Phase 5 – Components & Pages (mapped to the wireframes in § 4.1)
| Wireframe | Page | Key components / behaviour |
| :-- | :-- | :-- |
| 1 Dashboard | `DashboardPage.jsx` | Metric cards (balance, active bots, 24h P&L); `StrategyCard` list with Pause/Start, Edit, Delete (SweetAlert2 confirm); live market table that refreshes via axios. |
| 2 Builder | `StrategyBuilderPage.jsx` | `StrategyForm` (Formik + Yup): name ≥ 3 chars, symbol radio, SMA period, RSI 1–100, SL 0.1–50, TP 0.5–200; save goes to POST/PUT, then SweetAlert success and redirect to `/`. |
| 3 Backtest | `BacktestStudioPage.jsx` | Strategy select, date range, capital → `POST /api/backtest`; result cards (Return, Win Rate, Max DD) and a trade log table. |
| 4 Orders | `OrderHistoryPage.jsx` | Filters (strategy, status, ticker search), paginated table, client-side **Export CSV**. |

- All components declare `propTypes`.
- `TickerMarquee` polls the ticker every 5 s (mock or public price API through axios).

### Phase 6 – Testing (`client/src/tests`)
| File | Assertions |
| :-- | :-- |
| `App.test.jsx` | Navbar renders; each route renders the right page heading. |
| `StrategyCard.test.jsx` | Renders name/symbol/SL/TP; status badge; Pause button calls `onToggle`. |
| `StrategyForm.test.jsx` | Required-field errors; SL `0.05` and TP `250` rejected; a valid submit calls `onSubmit` with typed values. |

Run with `npx vitest run`. Target ≥ 80 % coverage on `components/`.

### Phase 7 – Integration & Demo
1. `mysql -u root -p < server/db/schema.sql`
2. `cd server && npm run dev` · `cd client && npm run dev`
3. Demo script: create strategy → appears on dashboard → pause → run backtest → view orders → export CSV → delete with confirm.
4. Capture screenshots for submission § 4.2 / § 4.3.

---

## 4. Antigravity Prompt Log (for § 4.2 evidence)

| # | Phase | Prompt summary | Output files |
| :-: | :-- | :-- | :-- |
| 1 | 0 | Scaffold client/server from folder structure | `client/*`, `server/*` |
| 2 | 1 | Generate MariaDB DDL + pool config | `schema.sql`, `database.js` |
| 3 | 2 | Generate Express CRUD routes/controllers | `strategyRoutes.js`, `strategyController.js` |
| 4 | 4 | Scaffold Jotai atoms with derived state | `tradingAtoms.js` |
| 5 | 5 | Formik + Yup form with SL/TP limits | `StrategyForm.jsx` |
| 6 | 5 | Pages from ASCII wireframes in § 4.1 | `pages/*.jsx` |
| 7 | 6 | Vitest suites for App/Card/Form | `tests/*.test.jsx` |

---

## 5. Milestones

| Day | Deliverable |
| :-: | :-- |
| 1 | Phases 0–1: setup, schema, DB connection verified |
| 2 | Phase 2: API working (tested with curl/Postman) |
| 3 | Phases 3–4: routing, axios client, atoms |
| 4–5 | Phase 5: 4 pages built to match the wireframes |
| 6 | Phase 6: tests passing |
| 7 | Phase 7: end-to-end demo, screenshots, update submission |

---

## 6. Acceptance Criteria
- [ ] All 4 routes render and navigate without full page reloads.
- [ ] Strategy CRUD saves to MariaDB and survives a server restart.
- [ ] Yup blocks out-of-range SL/TP; the server rejects them too.
- [ ] Jotai metric cards update right away on pause/start/delete.
- [ ] Delete asks for confirmation with SweetAlert2.
- [ ] `npx vitest run` passes.

> [!WARNING]
> Submission § 4.2 mentions **"Windsurf"** in the Jotai bullet. Change it to **"Google Antigravity"** to match the rest of the section.
