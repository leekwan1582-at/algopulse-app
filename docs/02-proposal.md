# Project Proposal: AlgoPulse

## 1\. Overview

**AlgoPulse** is a responsive single-page web application (SPA) designed for retail traders to create, backtest, and manage automated algorithmic trading strategies in real time. The app integrates a React frontend with a Node.js/Express backend, using **MariaDB** for persistent storage of user profiles, strategy configurations, market parameters, and trade execution logs.

-----

## 2\. Complete Tech Stack Breakdown

  - **Brand Name**: AlgoPulse
  - **Root Directory Name**: `algopulse-app`
  - **Database**: **MariaDB** (relational storage for user accounts, strategy configurations, backtest logs, and trade history)
  - **Backend API**: Node.js & Express
  - **HTTP Client**: `axios` (for backend REST calls and fetching live market API feeds)
  - **Frontend & Routing**: React & `wouter`
  - **State Management**: `Jotai` (atomic state management for real-time strategy toggles, active trades, and wallet balance)
  - **Form Handling & Validation**: `formik` + `yup`
  - **Type Safety & Component Schema**: `prop-types`
  - **Styling & UI Components**: Vanilla `Bootstrap CSS` + `Bootstrap Icons`
  - **Alerts & Dialogs**: `sweetalert2`
  - **Testing & Quality Assurance**: `vitest`, `@testing-library/react`, `@testing-library/jest-dom`, and `jsdom`

-----

## 3. Project Folder Structure

``` 
algopulse-app/
├── client/                           # Frontend Application
│   ├── public/
│   │   ├── favicon.ico
│   │   └── index.html
│   ├── src/
│   │   ├── api/                      # Axios HTTP API Clients
│   │   │   └── strategyApi.js
│   │   ├── atoms/                    # Jotai State Atoms
│   │   │   └── tradingAtoms.js
│   │   ├── components/               # UI & Layout Components
│   │   │   ├── common/
│   │   │   │   ├── Navbar.jsx
│   │   │   │   └── TickerMarquee.jsx
│   │   │   └── strategy/
│   │   │       ├── StrategyCard.jsx
│   │   │       └── StrategyForm.jsx
│   │   ├── pages/                    # Wouter Route Pages
│   │   │   ├── DashboardPage.jsx
│   │   │   ├── StrategyBuilderPage.jsx
│   │   │   ├── BacktestStudioPage.jsx
│   │   │   └── OrderHistoryPage.jsx
│   │   ├── tests/                    # Vitest Unit & Integration Tests
│   │   │   ├── App.test.jsx
│   │   │   ├── StrategyCard.test.jsx
│   │   │   └── StrategyForm.test.jsx
│   │   ├── App.jsx                   # Main App & Wouter Router setup
│   │   ├── main.jsx                  # Entry point
│   │   └── setupTests.js             # Vitest / Jest-DOM setup configuration
│   ├── index.html
│   ├── vite.config.js                # Vite + Vitest config (jsdom environment)
│   └── package.json
└── server/                           # Express Backend & MariaDB DB Layer
    ├── src/
    │   ├── config/
    │   │   └── database.js           # MariaDB connection pool config
    │   ├── controllers/
    │   │   └── strategyController.js
    │   ├── routes/
    │   │   └── strategyRoutes.js
    │   └── index.js
    ├── db/
    │   └── schema.sql                # MariaDB DDL scripts (strategies, orders, users)
    └── package.json

```

-----

## 4\. Webpage Wireframes

### Wireframe 1: Main Dashboard Page (`/`)

``` 
+-----------------------------------------------------------------------------------+
|  [Logo] AlgoPulse         [ Dashboard ]  [ Builder ]  [ Backtest ]  [ Orders ]    |
+-----------------------------------------------------------------------------------+
| LIVE TICKERS:  BTC/USDT $96,450 ▲ 2.1%  |  ETH/USDT $3,610 ▼ 0.8% | SOL/USDT $230 |
+-----------------------------------------------------------------------------------+
|                                                                                   |
|  [ SUMMARY METRICS CARD ]                                                         |
|  +--------------------+  +--------------------+  +-----------------------------+  |
|  | Virtual Balance    |  | Active Bots        |  | 24h Net P&L                 |  |
|  | $10,000.00 USD     |  | 3 Running          |  | +$420.50 (+4.2%) ▲          |  |
|  +--------------------+  +--------------------+  +-----------------------------+  |
|                                                                                   |
|  +---------------------------------------+  +----------------------------------+  |
|  | ACTIVE STRATEGIES (Jotai State)       |  | LIVE MARKET FEED (Axios)         |  |
|  |                                       |  |                                  |  |
|  | +-----------------------------------+ |  | Pair       Price       Change    |  |
|  | | BTC MA Crossover      [ACTIVE]    | |  | BTC/USDT   $96,450.00  +2.1%     |  |
|  | | Symbol: BTC/USDT | SMA: 20        | |  | ETH/USDT   $3,610.00   -0.8%     |  |
|  | | SL: 2.5% | TP: 5.0%               | |  | SOL/USDT   $230.15     +5.4%     |  |
|  | | [Pause] [Edit] [Delete (SweetAlert)]|  |                                  |  |
|  | +-----------------------------------+ |  | [ Refresh Feed ]                 |  |
|  | +-----------------------------------+ |  |                                  |  |
|  | | ETH Breakout          [PAUSED]    | |  +----------------------------------+  |
|  | | Symbol: ETH/USDT | SMA: 50        | |                                        |
|  | | SL: 1.5% | TP: 4.0%               | |                                        |
|  | | [Start] [Edit] [Delete (SweetAlert)]|                                        |
|  | +-----------------------------------+ |                                        |
|  +---------------------------------------+                                        |
+-----------------------------------------------------------------------------------+

```

-----

### Wireframe 2: Strategy Builder Page (`/builder`)

``` 
+-----------------------------------------------------------------------------------+
|  [Logo] AlgoPulse         [ Dashboard ]  [*Builder*]  [ Backtest ]  [ Orders ]    |
+-----------------------------------------------------------------------------------+
|                                                                                   |
|  CREATE / EDIT STRATEGY FORM (Formik + Yup Validation)                            |
|  +-----------------------------------------------------------------------------+  |
|  |                                                                             |  |
|  | Strategy Name *                                                             |  |
|  | [ Enter strategy name, e.g. BTC Trend Follower                             ]|  |
|  | (Error Message: Name is required / min 3 chars)                             |  |
|  |                                                                             |  |
|  | Target Asset Symbol *                                                       |  |
|  | (o) BTC/USDT     ( ) ETH/USDT     ( ) SOL/USDT                              |  |
|  |                                                                             |  |
|  | Indicator Parameters                                                        |  |
|  | +-----------------------------------+-------------------------------------+ |  |
|  | | Simple Moving Average (SMA) Period | RSI Threshold                       ||  |
|  | | [ 20                             ] | [ 30                                ]|  |
|  | +-----------------------------------+-------------------------------------+ |  |
|  |                                                                             |  |
|  | Risk Parameters (Yup Validated)                                             |  |
|  | +-----------------------------------+-------------------------------------+ |  |
|  | | Stop Loss (%) *                   | Take Profit (%) *                   | |  |
|  | | [ 2.0                            ] | [ 5.0                               ]|  |
|  | +-----------------------------------+-------------------------------------+ |  |
|  |                                                                             |  |
|  | [ Cancel ]                                        [ Save & Save to MariaDB ]|  |
|  +-----------------------------------------------------------------------------+  |
|                                                                                   |
+-----------------------------------------------------------------------------------+

```

-----

### Wireframe 3: Backtest Studio Page (`/backtest`)

``` 
+-----------------------------------------------------------------------------------+
|  [Logo] AlgoPulse         [ Dashboard ]  [ Builder ]  [*Backtest*]  [ Orders ]    |
+-----------------------------------------------------------------------------------+
|                                                                                   |
|  BACKTEST CONFIGURATION                                                           |
|  +-----------------------------------------------------------------------------+  |
|  | Select Strategy: [ BTC MA Crossover v ] Date Range: 2026-01-01] to [Today]  |  |
|  | Initial Capital: [ $10,000            ] [ Run Historical Backtest ]         |  |
|  +-----------------------------------------------------------------------------+  |
|                                                                                   |
|  BACKTEST PERFORMANCE RESULTS                                                     |
|  +-----------------------------------------------------------------------------+  |
|  |  +------------------+  +------------------+  +------------------+           |  |
|  |  | Total Return     |  | Win Rate         |  | Max Drawdown     |           |  |
|  |  | +18.4%           |  | 64.2%            |  | -4.1%            |           |  |
|  |  +------------------+  +------------------+  +------------------+           |  |
|  |                                                                             |  |
|  |  HISTORICAL TRADE LOGS (Persisted to MariaDB)                               |  |
|  |  +------------+--------+--------+-------------+------------+---------------+|  |
|  |  | Date       | Type   | Price  | Amount      | P&L ($)    | Status        ||  |
|  |  +------------+--------+--------+-------------+------------+---------------+|  |
|  |  | 2026-11-20 | BUY    | 92,100 | 0.1 BTC     | --         | EXECUTED      ||  |
|  |  | 2026-11-22 | SELL   | 95,800 | 0.1 BTC     | +$370.00   | PROFIT        ||  |
|  |  +------------+--------+--------+-------------+------------+---------------+|  |
|  +-----------------------------------------------------------------------------+  |
|                                                                                   |
+-----------------------------------------------------------------------------------+

```

-----

### Wireframe 4: Order History & Logs Page (`/orders`)

``` 
+-----------------------------------------------------------------------------------+
|  [Logo] AlgoPulse         [ Dashboard ]  [ Builder ]  [ Backtest ]  [*Orders*]    |
+-----------------------------------------------------------------------------------+
|                                                                                   |
|  ORDER HISTORY & SYSTEM LOGS                                                      |
|  +-----------------------------------------------------------------------------+  |
|  | Filter by Strategy: [ All Strategies v ]  Status: [ All Statuses v ]        |  |
|  | Search Ticker: [ Search... (e.g. BTC) ]              [ Export CSV Log ]     |  |
|  +-----------------------------------------------------------------------------+  |
|                                                                                   |
|  +-----------------------------------------------------------------------------+  |
|  | Order ID | Strategy Name   | Pair     | Type | Price   | Qty  | Status      |  |
|  +----------+-----------------+----------+------+---------+------+-------------+  |
|  | #ORD-982 | BTC MA Cross    | BTC/USDT | BUY  | $96,100 | 0.05 | FILLED      |  |
|  | #ORD-981 | ETH Breakout    | ETH/USDT | SELL | $3,620  | 1.20 | FILLED      |  |
|  | #ORD-980 | SOL Trend       | SOL/USDT | BUY  | $228.50 | 5.00 | FILLED      |  |
|  | #ORD-979 | BTC MA Cross    | BTC/USDT | SELL | $95,400 | 0.05 | CANCELLED   |  |
|  +-----------------------------------------------------------------------------+  |
|  | Showing 1-4 of 142 Orders                       [ < Previous ] [ Next > ]   |  |
|  +-----------------------------------------------------------------------------+  |
|                                                                                   |
+-----------------------------------------------------------------------------------+

```

-----

Would you like to start building out the MariaDB DDL schema (`db/schema.sql`) or the Express database configuration module (`server/src/config/database.js`) next?
