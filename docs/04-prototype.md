Here is a step-by-step guide to implement and execute the **3-Tier Prototyping Strategy (Fidelity Levels 1 to 3)** for your **AlgoPulse** capstone project, following the process outlined in Learning Unit 3.

-----

# Step-by-Step Guide: AlgoPulse Prototyping Across Fidelity Levels

-----

## Level 1: Low-Fidelity Paper & Text Wireframes

### Objective

Quickly conceptualize spatial layouts, map user navigation flows, and validate core interactions without getting bogged down by styling or code.

### Step 1.1: Map out the Key User Flows

Identify the primary navigation paths a retail trader takes:

1.  **Dashboard Flow (`/`)**: View virtual balance $\\rightarrow$ inspect active bots $\\rightarrow$ pause/start a bot.
2.  **Builder Flow (`/builder`)**: Fill strategy parameters $\\rightarrow$ set risk controls (Stop-Loss/Take-Profit) $\\rightarrow$ save strategy.
3.  **Backtest Flow (`/backtest`)**: Select saved strategy $\\rightarrow$ pick date range $\\rightarrow$ execute simulation $\\rightarrow$ review performance metrics.

### Step 1.2: Draw Paper / Text Wireframes

Sketch the layouts on paper or draft text-based structural blocks to define visual hierarchy:

  * **Header / Navigation Bar**: Logo on the left; page route links (`Dashboard`, `Builder`, `Backtest`, `Orders`) on the right.
  * **Hero / Ticker Bar**: Full-width scrolling ticker for live prices (`BTC/USDT`, `ETH/USDT`, `SOL/USDT`).
  * **Main Area Grid**:
      * Left Column (70% width): Active strategies list.
      * Right Column (30% width): Live market feed.

### Step 1.3: Conduct Paper Prototyping Flow Test

Simulate a user session manually:

  * Place the "Strategy Builder" paper sketch in front of a classmate/colleague.
  * Ask them to "create a BTC strategy with 2% stop-loss."
  * Note where their eyes go first and whether field placements make intuitive sense.

-----

## Level 2: Medium-Fidelity Component Wireframes (Figma / Web Component)

### Objective

Standardize responsive layout structures, design reusable component slots, and establish a consistent Bootstrap-based visual system.

### Step 2.1: Set Up Design System & Grid Layout

  * Use a **12-column grid** (Bootstrap standard).
  * Define the primary color scheme: Dark Theme (`#121212` background, `#1e1e1e` cards, `#00d4b1` success green, `#ff4d4d` risk red).
  * Define UI typography and icon set (Bootstrap Icons).

### Step 2.2: Build Reusable UI Component Wireframes

Design digital component mockups in Figma or HTML/CSS placeholders:

1.  **`Navbar.jsx` Wireframe**: Sticky navigation header with brand logo, nav links, and wallet balance badge (`$10,000.00 USD`).
2.  **`TickerMarquee.jsx` Wireframe**: Horizontal scroll bar displaying real-time ticker cards with green/red percentage indicators.
3.  **`StrategyCard.jsx` Wireframe**: Card container featuring strategy title, asset symbol badge, status indicator (`[ACTIVE]` / `[PAUSED]`), indicator details (SMA, RSI), and action buttons (`Pause`, `Edit`, `Delete`).
4.  **`StrategyForm.jsx` Wireframe**: Two-column responsive form structure separating **Indicator Parameters** (SMA Period, RSI Threshold) from **Risk Parameters** (Stop-Loss %, Take-Profit %).

### Step 2.3: Link Screens for Clickable Flow Validation

Connect the screens digitally (e.g., in Figma Prototype mode):

  * Clicking **"Builder"** on the Navbar transitions to the Strategy Builder screen.
  * Clicking **"Save Strategy"** on the form navigates back to the Dashboard with a new Strategy Card added.

-----

## Level 3: High-Fidelity Interactive PoC (React + Express + MariaDB)

### Objective

Build a functional, code-based Proof of Concept (PoC) demonstrating real state management, form validation, REST API routing, and MariaDB database persistence.

### Step 3.1: Initialize Project & Architecture Setup

Scaffold the full-stack repository structure (`algopulse-app/`):

  * **Frontend**: Create Vite + React SPA with Wouter routing and Jotai state management.
  * **Backend**: Initialize Express server with MariaDB connection pool (`mariadb` npm package).
  * **Database**: Execute `db/schema.sql` to establish `users`, `strategies`, and `orders` tables.

### Step 3.2: Implement Formik + Yup Form Validation (`StrategyForm.jsx`)

Bind the Strategy Builder UI to Formik form state and Yup schema rules:

  * Enforce numeric bounds: Stop-Loss must be between `0.1%` and `50.0%`.
  * Prevent empty submissions and render inline validation error messages.

### Step 3.3: Implement State Management & API Communications

1.  **Atomic State (`tradingAtoms.js`)**:
      * Create Jotai atoms for `strategiesAtom`, `activeOrdersAtom`, and `balanceAtom`.
2.  **REST API Controller (`strategyController.js`)**:
      * `POST /api/strategies`: Write new strategy to MariaDB.
      * `GET /api/strategies`: Read active strategies into Jotai state.
      * `PATCH /api/strategies/:id/status`: Update bot status (`ACTIVE` $\\leftrightarrow$ `PAUSED`).
      * `DELETE /api/strategies/:id`: Delete strategy with SweetAlert2 confirmation dialog.

### Step 3.4: Integrate Backtest Calculation Engine (`BacktestStudioPage.jsx`)

1.  Connect the backtesting UI to historical market simulation logic.
2.  Calculate performance metrics dynamically:
    $$\\text{Total Return (%)} = \\frac{\\text{Final Balance} - \\text{Initial Balance}}{\\text{Initial Balance}} \\times 100$$
    $$\\text{Win Rate (%)} = \\frac{\\text{Profitable Trades}}{\\text{Total Executed Trades}} \\times 100$$
3.  Display trade logs dynamically in the orders table.

### Step 3.5: Execute User Testing & Iteration Loop

Run informal usability tests with 3 retail traders on your working PoC and document feedback iterations:

  * **Iteration 1**: Add SweetAlert2 confirmation modals to prevent accidental deletion of strategies.
  * **Iteration 2**: Add a visual loading spinner during backtest calculation for better feedback.
  * **Iteration 3**: Make form layouts fully responsive for mobile screens using Bootstrap grid columns (`col-12 col-md-6`).
