# AlgoPulse – Agent & Coding Standards (`AGENTS.md`)

This document defines the JavaScript, React, and Express coding standards for **AlgoPulse**, derived from the course reference materials (`docs/ecom_shop_froont_end/` and `docs/flash_card/`) and aligned with the project's implementation plan (`docs/009-poc-implementation-plan.md`).

---

## 1. Repository & Stack Overview

- **Frontend (`client/`)**: React 19 + Vite, `wouter` (routing), `jotai` (atomic state), `axios` (HTTP), `formik` + `yup` (forms & validation), `prop-types`, Bootstrap 5 + Bootstrap Icons, `sweetalert2` (confirmations/alerts), Vitest + Testing Library.
- **Backend (`server/`)**: Node.js + Express 5 (CommonJS), `mariadb` connection pool, `dotenv`, `cors`.
- **Database (`server/db/`)**: MariaDB (`algopulse_db`).

---

## 2. General JavaScript Style

- **Variables**: Use `const` by default; use `let` only when reassignment is required. Never use `var`.
- **Strings & Semicolons**: Prefer single quotes (`'`) for JS strings and double quotes (`"`) for JSX attributes; use consistent semicolons (or follow `client/eslint.config.js`).
- **Async/Await**: Prefer `async`/`await` with `try`/`catch` over raw `.then()` chains for readability.
- **Immutability**: Never mutate state arrays or objects directly; use spread syntax (`[...arr, item]`, `{ ...obj, key: val }`), `.map()`, or `.filter()`.
- **Environment Variables**:
  - Frontend: `import.meta.env.VITE_*` (never embed secrets in client code).
  - Backend: `process.env.*` loaded via `dotenv` (`server/.env`, never committed).

---

## 3. Frontend Conventions (`client/src/`)

### 3.1 Folder & File Naming
- `api/` — Axios client & endpoint helpers (`strategyApi.js`)
- `atoms/` — Jotai atoms & derived state (`tradingAtoms.js`)
- `components/common/` — Shared UI (`Navbar.jsx`, `TickerMarquee.jsx`)
- `components/strategy/` — Domain components (`StrategyCard.jsx`, `StrategyForm.jsx`)
- `pages/` — Wouter route pages (`DashboardPage.jsx`, `StrategyBuilderPage.jsx`, `BacktestStudioPage.jsx`, `OrderHistoryPage.jsx`)
- `tests/` — Vitest + Testing Library suites (`*.test.jsx`)
- **Extensions**: Use `.jsx` for React components and `.js` for plain modules (API, atoms, utils). Use `PascalCase` for component filenames and `camelCase` for non-component files.

### 3.2 React Components & JSX
- **Component Declarations**: Prefer `export default function ComponentName({ prop1, prop2 })` (or named function + `export default`) with destructured props.
- **PropTypes**: Declare `ComponentName.propTypes = { ... }` using `prop-types` on reusable components.
- **JSX**:
  - Use `className` (never `class`) with Bootstrap 5 utility/grid classes.
  - Always provide a stable, unique `key` (e.g., `strategy.strategy_id`, `order.order_id`) when rendering lists with `.map()`—never use array index if items can be added/reordered/deleted.
  - Use conditional rendering (`condition && <El />` or ternary `cond ? <A /> : <B />`).

### 3.3 State Management (`jotai`)
- Keep shared state in `client/src/atoms/tradingAtoms.js` using `atom(...)` (base atoms) and derived read-only atoms (`atom((get) => ...)`).
- Name atoms with a `*Atom` suffix (e.g., `balanceAtom`, `strategiesAtom`, `activeBotsAtom`, `ordersAtom`).
- Keep ephemeral UI state (form inputs, loading flags, local filters) in component `useState`.

### 3.4 Routing (`wouter`)
- Define routes in `App.jsx` using `<Switch>`, `<Route path="...">`, and `<Link href="...">`.
- Use `useLocation()` for programmatic navigation (e.g., redirecting to `/` after saving a strategy).

### 3.5 Forms & Validation (`formik` + `yup`)
- Use `<Formik>`, `<Form>`, `<Field>`, and `<ErrorMessage>` for multi-field forms (`StrategyForm.jsx`).
- Define a `Yup.object({ ... })` validation schema enforcing domain bounds (e.g., Stop-Loss `0.1–50.0%`, Take-Profit `0.5–200.0%`, Strategy Name min 3 chars).

### 3.6 Data Fetching (`axios` & `useEffect`)
- Centralize API calls in `client/src/api/strategyApi.js` using an `axios.create({ baseURL: '/api' })` instance.
- Fetch initial data inside `useEffect(() => { ... }, [])` with an `async` inner function and `try`/`catch`.

---

## 4. Backend Conventions (`server/src/`)

- **Module System**: CommonJS (`require` / `module.exports`), matching `server/package.json`.
- **Layering**:
  - `routes/` — Express `Router()` mapping HTTP verbs & paths to controllers.
  - `controllers/` — Request parsing, validation, and HTTP responses (`200`, `201`, `204`, `400`, `404`, `500`).
  - `config/database.js` — `mariadb.createPool(...)` with parameterised `?` queries (never string-interpolate user input into SQL).
  - `utils/` — Pure validation/helper functions (`validateStrategy.js`).
- **Error Handling**: Throw or pass errors with `.status` to the central Express error middleware in `app.js`. Validate inputs server-side even when the client validates with Yup.

---

## 5. Testing & Verification

- Place unit/component tests in `client/src/tests/*.test.jsx` using Vitest + `@testing-library/react`.
- Before finishing any change to `client/`, run:
  ```bash
  cd client && npm run lint && npm run test:run && npm run build
  ```
- Before finishing any change to `server/`, verify syntax/smoke checks (and `npm run db:check` when MariaDB is available).
