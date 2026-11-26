# Capstone Project Report: AlgoPulse

**Project Title:** AlgoPulse – Automated Algorithmic Trading & Backtesting Platform  
**Author:** SOW LEE KWAN  
**Date:** November 26, 2026  
**Module:** Module 9: Capstone Project  
**Institution:** BELLS INSTITUTE OF HIGHER LEARNING

-----

## 1\. Executive Summary & Project Overview

**AlgoPulse** is a responsive single-page web application (SPA) designed for retail cryptocurrency and stock traders to visually build, backtest, and manage automated algorithmic trading strategies in real time.

Retail traders frequently suffer from three primary barriers:

1.  **Execution Latency & Time Constraints:** Inability to continuously monitor markets 24/7 due to full-time work commitments.
2.  **Emotional Bias:** Deviation from risk management discipline (e.g., cancelling Stop-Loss orders during market panics).
3.  **Technical Complexity:** High setup overhead required by existing quantitative frameworks (Python scripts, manual database setup, custom API connections).

AlgoPulse solves these challenges by combining an intuitive React frontend with a Node.js/Express backend and a MariaDB relational database for persistent strategy and trade storage.

-----

## 2\. Learning Unit 1: The Empathy Engine (User Research & Problem Definition)

### 2.1 Target Audience & User Persona Profile

  * **Name:** Alex Chen
  * **Age:** 29
  * **Occupation:** Senior Marketing Specialist at a Tech Firm
  * **Trading Background:** 3 years of manual cryptocurrency and equities trading
  * **Goals:**
      * Automate strategy execution to capture trade setups while working full-time.
      * Enforce strict, un-alterable risk limits (Stop-Loss and Take-Profit) to eliminate panic trading.
      * Validate trading ideas against past market data before risking live capital.
  * **Frustrations:**
      * Misses high-probability trade setups during daytime workplace meetings.
      * Overrides stop-loss rules during volatile market drops due to emotional hesitation.
      * Finds existing quant software overwhelming due to complex Python setups and database configurations.

### 2.2 AI-Assisted Empathic Interview Transcript

> **Interviewer:** *"Hi Alex, thanks for joining. Could you walk me through your typical daily trading routine?"*
> 
> **Alex:** *"Sure. I spend an hour or two every night analyzing charts and setting up indicators like 20-period SMAs and RSI. But during the day, I'm stuck in back-to-back work meetings. Crypto markets run 24/7, so by the time I check my phone during lunch, a major breakout has already happened and retraced. I miss the entry completely."*
> 
> **Interviewer:** *"That sounds frustrating. How do you handle risk management when you do enter a position manually?"*
> 
> **Alex:** *"Honestly, that's where I struggle most. I tell myself I'll stick to a 2% stop-loss. But when the price drops sharply while I'm watching, anxiety takes over. I end up moving or cancelling my stop-loss, hoping for a bounce. Instead, the market keeps falling, turning a small loss into a 15% drawdown. My emotions get the better of me."*
> 
> **Interviewer:** *"Have you tried using automated trading or backtesting tools to help with this?"*
> 
> **Alex:** *"I tried\! I downloaded Python quant packages like `backtrader`. But setting up a local database for historical price feeds, managing state, and writing custom scripts for backtesting was way too overwhelming without a CS background. I just want a clean web app where I can set my indicators, define hard risk limits, test the strategy across past data, and run it."*

### 2.3 User Journey Map

| Journey Stage              | 1\. Strategy Conception                                         | 2\. Market Execution                                                     | 3\. Volatility Hit                                                      | 4\. Search for Solution                                                  | 5\. AlgoPulse Onboarding                                                 |
| :------------------------: | :-------------------------------------------------------------: | :----------------------------------------------------------------------: | :---------------------------------------------------------------------: | :----------------------------------------------------------------------: | :----------------------------------------------------------------------: |
| **User Action**            | Conducts technical analysis at night; defines entry/exit rules. | Works daytime job; attempts manual mobile trading during meetings.       | Price drops unexpectedly; panic sets in; manually cancels stop-loss.    | Searches for non-technical algorithmic & backtesting web tools.          | Configures strategy on AlgoPulse; runs historical backtest.              |
| **Emotional State**        | Optimistic & Confident 🙂                                        | Anxious & Distracted 😐                                                   | Frustrated & Defeated 😫                                                 | Overwhelmed by Complex Tools 📉                                           | Empowered & Confident 🚀                                                  |
| **Pain Point Encountered** | Hard to track multiple ticker setups across assets.             | Execution latency and missed trade entries due to work commitments.      | Emotional bias overrides risk rules, leading to severe drawdowns.       | Existing platforms require Python, custom DB setups, and API code.       | Needs quick feedback on historical win rate and drawdown before running. |
| **System Opportunity**     | Provide intuitive Strategy Builder with visual SMA/RSI fields.  | Automated execution via Node.js backend connected to persistent storage. | Enforce hardcoded Stop-Loss & Take-Profit parameters at execution time. | Deliver a responsive React SPA backed by MariaDB without setup overhead. | Integrated Backtest Studio with immediate performance metrics summary.   |

### 2.4 Root Cause Analysis (5 Whys)

  * **Symptom:** Retail traders frequently suffer severe drawdowns during market volatility.
    1.  *Why?* They override or remove stop-loss limits during live trades.
    2.  *Why?* They lack confidence in their strategy's long-term historical performance.
    3.  *Why?* They did not thoroughly backtest their trading rules across prior market cycles.
    4.  *Why?* Existing backtesting tools require custom scripting and manual database setups.
    5.  *Why?* Current solutions force a trade-off between user-friendly interfaces and rigorous backtesting infrastructure.
  * **Root Cause:** Retail traders lack an integrated, user-friendly SPA platform to visually construct, backtest with historical data, and run automated strategies with hardcoded risk parameters.

### 2.5 Problem Statement (How Might We)

> **"How might we provide retail traders with a responsive single-page application that enables them to visually configure automated strategies with predefined risk parameters and backtest them against historical data, so they can trade with confidence without managing backend infrastructure?"**

-----

## 3\. Learning Unit 2: From Insight to Impact (Solution Design & Storyboarding)

### 3.1 Solution Scope & Minimum Viable Product (MVP)

AlgoPulse is scoped as a React-based single-page application backed by a Node.js/Express API and MariaDB relational database.

### 3.2 MoSCoW Feature Matrix

| Feature Concept                           | MoSCoW Category | Justification                                                                     |
| :---------------------------------------: | :-------------: | :-------------------------------------------------------------------------------- |
| **Strategy Builder Form**                 | **Must Have**   | Core interface for setting SMA/RSI and Stop-Loss/Take-Profit rules.               |
| **Backtest Studio & Performance Metrics** | **Must Have**   | Directly addresses the root cause by providing historical performance validation. |
| **Live Dashboard & Strategy Controls**    | **Must Have**   | Allows real-time toggling (Pause/Resume/Delete) and tracking of active bots.      |
| **MariaDB Order & Strategy Persistence**  | **Must Have**   | Essential for reliable state management across user sessions.                     |
| **Live Market Ticker Feed (Axios)**       | **Should Have** | Enhances user awareness of real-time prices.                                      |
| **CSV Order Log Export**                  | **Should Have** | Allows off-platform trade analysis for advanced users.                            |
| **Custom Indicator Script Editor**        | **Won't Have**  | Out of scope for v1 to avoid overwhelming non-technical users.                    |

### 3.3 User Storyboard (6-Frame Visual/Narrative Journey)

``` 
+-----------------------------------------------------------------------------------+
| FRAME 1: The Trigger                                                              |
| [ Image / Sketch: Alex staring at a sharp red price drop chart on his phone ]     |
| Action: Alex is trapped in a work meeting while BTC drops 8%. Panic sets in.      |
| Thought: "I can't move my stop-loss now... I'll just wait for a bounce."         |
| Emotion: Anxious & Panic-Stricken 😫                                              |
+-----------------------------------------------------------------------------------+
                                         │
                                         ▼
+-----------------------------------------------------------------------------------+
| FRAME 2: The Aftermath                                                            |
| [ Image / Sketch: Alex looking at an account loss summary: -$1,450 (-14.5%) ]     |
| Action: The market keeps dropping; Alex suffers a major account drawdown.         |
| Thought: "I let my emotions ruin another trading plan. Manual trading isn't working."|
| Emotion: Defeated & Frustrated 📉                                                 |
+-----------------------------------------------------------------------------------+
                                         │
                                         ▼
+-----------------------------------------------------------------------------------+
| FRAME 3: Discovery of AlgoPulse                                                   |
| [ Image / Sketch: Alex landing on AlgoPulse Strategy Builder Page (/builder) ]    |
| Action: Alex discovers AlgoPulse's web app; opens the clean visual builder form.  |
| Thought: "No Python scripts or database configuration? I can just fill this form!"|
| Emotion: Curious & Hopeful 🤔                                                     |
+-----------------------------------------------------------------------------------+
                                         │
                                         ▼
+-----------------------------------------------------------------------------------+
| FRAME 4: Hardcoding Risk Rules & Strategy Setup                                   |
| [ Image / Sketch: Formik form with SMA: 20, RSI: 30, SL: 2.0%, TP: 5.0% filled ]  |
| Action: Configures BTC MA Crossover strategy with hardcoded Stop-Loss limits.     |
| Thought: "Once I save this, the bot handles execution—no manual overrides."       |
| Emotion: Relieved & In Control 🛡️                                                 |
+-----------------------------------------------------------------------------------+
                                         │
                                         ▼
+-----------------------------------------------------------------------------------+
| FRAME 5: The "Aha!" Moment (Backtest Validation)                                  |
| [ Image / Sketch: Backtest studio showing Total Return +18.4%, Win Rate 64.2% ]   |
| Action: Runs 1-year historical backtest; reviews win rate & max drawdown metrics. |
| Thought: "Aha! This strategy actually survived past crashes! I have proof now."   |
| Emotion: Empowered & Thrilled 💡                                                  |
+-----------------------------------------------------------------------------------+
                                         │
                                         ▼
+-----------------------------------------------------------------------------------+
| FRAME 6: Resolution & Automated Execution                                         |
| [ Image / Sketch: Live Dashboard (/): BTC Strategy [ACTIVE], Balance $10,420 ▲ ]   |
| Action: Activates bot on MariaDB backend; relaxes at work while bot monitors market.|
| Thought: "My strategy is running safely 24/7. No stress, no emotion."             |
| Emotion: Peaceful & Confident 🚀                                                  |
+-----------------------------------------------------------------------------------+ 
```

### 3.4 Detailed User Stories & Acceptance Criteria

  * **US-01: Visual Strategy Configuration (Formik + Yup Validation)**
    
      * **User Story:** *As a retail trader*, I want to configure indicator parameters (SMA, RSI) and risk limits (Stop-Loss, Take-Profit) via a guided form *so that* my trading strategy executes automatically without manual emotion.
      * **Acceptance Criteria:**
          * **Scenario 1.1: Valid Strategy Submission**
              * **Given** I am on the Strategy Builder page (`/builder`),
              * **When** I enter strategy name `"BTC Trend Follower"`, select asset `"BTC/USDT"`, set SMA Period to `20`, RSI Threshold to `30`, Stop-Loss to `2.0%`, and Take-Profit to `5.0%`, and click `"Save & Save to MariaDB"`,
              * **Then** the system should dispatch a `POST /api/strategies` API call, persist the record in MariaDB, display a SweetAlert2 success message, and redirect me to the Dashboard (`/`).
          * **Scenario 1.2: Negative Risk Limit Validation**
              * **Given** I am filling out the Strategy Form,
              * **When** I enter a Stop-Loss value of `-5.0%` or `55.0%` (outside allowed range `0.1%` to `50.0%`),
              * **Then** Formik and Yup should block form submission, highlight the field in red, and render validation error: `"Stop loss must be between 0.1% and 50%"`.

  * **US-02: Historical Backtest Execution & Performance Analysis**
    
      * **User Story:** *As a retail trader*, I want to run my strategy against historical market data *so that* I can evaluate its win rate, return percentage, and max drawdown before risking capital.
      * **Acceptance Criteria:**
          * **Scenario 2.1: Successful Backtest Calculation**
              * **Given** I am on the Backtest Studio page (`/backtest`) with strategy `"BTC Trend Follower"` selected,
              * **When** I select date range `"2026-01-01"` to `"2026-11-20"` with initial capital `$10,000`, and click `"Run Historical Backtest"`,
              * **Then** the backend should execute historical simulation, return performance JSON, populate Total Return (e.g. `+18.4%`), Win Rate (`64.2%`), Max Drawdown (`-4.1%`), and render execution trade logs in the historical table.
          * **Scenario 2.2: Missing Data Boundary Edge Case**
              * **Given** I select a date range with no stored historical price ticks,
              * **When** I click `"Run Historical Backtest"`,
              * **Then** the interface should gracefully handle the empty array and display an informative alert: `"No market price data available for the selected asset and date range."`

  * **US-03: Real-Time Bot Management & State Persistence**
    
      * **User Story:** *As a retail trader*, I want to pause, edit, or delete running strategies from a central dashboard *so that* I retain full control over active market exposure.
      * **Acceptance Criteria:**
          * **Scenario 3.1: Bot Status Toggling**
              * **Given** I am on the Main Dashboard (`/`) viewing an active strategy card with status `"ACTIVE"`,
              * **When** I click the `"Pause"` button,
              * **Then** Jotai state should immediately reflect `"PAUSED"`, an HTTP `PATCH /api/strategies/:id/status` request should update MariaDB, and the bot status badge should update visually.
          * **Scenario 3.2: Destructive Deletion Safeguard**
              * **Given** I click the `"Delete"` button on a strategy card,
              * **When** the action triggers,
              * **Then** a SweetAlert2 confirmation dialog should prompt `"Are you sure you want to delete this strategy?"`, and confirming will issue a `DELETE` request, purge the strategy from MariaDB, and update the dashboard UI.

-----

## 4\. Learning Unit 3: Prototyping (Fidelity Evolution & User Testing)

### 4.1 Prototype Artifacts Across Fidelity Levels

``` 
+-----------------------------------------------------------------------------------+
| FIDELITY LEVEL 1: Low-Fidelity Paper & ASCII Wireframe                            |
| Goal: Map spatial layout and validate core user navigation flow.                 |
| Artifact: Paper sketches & text wireframes for Dashboard and Strategy Form.        |
+-----------------------------------------------------------------------------------+
                                         │
                                         ▼
+-----------------------------------------------------------------------------------+
| FIDELITY LEVEL 2: Medium-Fidelity Component Wireframes (gemini / Web Component)     |
| Goal: Standardize layout structure using Bootstrap Grid and component slots.      |
| Artifact: Interactive wireframes detailing navigation bars, summary metric cards,  |
|           and live market ticker tables.                                          |
+-----------------------------------------------------------------------------------+
                                         │
                                         ▼
+-----------------------------------------------------------------------------------+
| FIDELITY LEVEL 3: High-Fidelity Interactive PoC (Google Antigravity + React/Node Setup)  |
| Goal: Functional code-based Proof of Concept demonstrating real state changes.     |
| Artifact: Live React SPA connected to Express backend & MariaDB connection pool.  |
+-----------------------------------------------------------------------------------+ 
```

**Low-Fidelity Wireframes (Fidelity Level 1):**

#### Wireframe 1: Main Dashboard Page (`/`)

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

#### Wireframe 2: Strategy Builder Page (`/builder`)

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

#### Wireframe 3: Backtest Studio Page (`/backtest`)

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

#### Wireframe 4: Order History & Logs Page (`/orders`)

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


### 4.2 Interactive Proof of Concept (PoC) Development with Google Antigravity

The high-fidelity prototype was built using **Google Antigravity** (AI-powered vscode extension) to rapidly generate boilerplate code, state structures, and UI components:

  * **Boilerplate Architecture Generation:** Google Antigravity generated the Vite + React single-page structure, Wouter routing tree, and Express REST API connection logic.
  * **Formik & Yup Validation Prompting:** Prompted Google Antigravity to generate type-safe schema validation rules enforcing valid boundaries for Stop-Loss (`0.1% - 50.0%`) and Take-Profit (`0.5% - 200.0%`).
  * **Jotai State Integration:** Instructed Windsurf to scaffold atomic Jotai state (`tradingAtoms.js`) to manage real-time updates across virtual balance, active bots list, and live trade order feeds.

### 4.3 User Testing Log & Prototype Iterations

Informal user testing was conducted with 3 retail traders using the interactive prototype. Based on observed usability hurdles, **three major iterations** were implemented:

| Iteration \#    | User Feedback / Usability Issue Observed                                                      | Root Usability Barrier                                       | Prototype Refinement Implemented                                                                                                                     |
| :-------------: | :-------------------------------------------------------------------------------------------- | :----------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Iteration 1** | *"I didn't realize deleting a strategy would immediately cancel my open orders."*             | Destructive action lacked explicit warning context.          | Replaced standard browser `confirm()` with a customized **SweetAlert2 modal** explicitly listing active orders that will be cancelled upon deletion. |
| **Iteration 2** | *"When I clicked 'Run Backtest', the page froze for 2 seconds without giving feedback."*      | Lack of visual feedback during heavy historical computation. | Added a Bootstrap loading spinner and animated progress state (`"Simulating 365 days of price data..."`) while backtest calculation executes.        |
| **Iteration 3** | *"On mobile screens, the Strategy Builder table overflowed and forced horizontal scrolling."* | Non-responsive desktop table layout on mobile viewports.     | Refactored form layout using Bootstrap responsive grid system (`col-12 col-md-6`), stacking inputs vertically on smaller mobile displays.            |

-----

## 5\. Learning Unit 4: Generating Mock Data & Test Cases with AI

### 5.1 Structured Mock Data Samples (JSON Format)

To populate the prototype during testing and validation, realistic JSON datasets were generated using AI prompts specifying explicit constraints and referential integrity across Users, Strategies, and Orders:

#### 1\. User Profiles (`mockUsers.json`)

``` json
[
  {
    "user_id": 1,
    "email": "alex.chen@example.com",
    "password_hash": "$2b$10$e8KzGvX9qW1mU7yL6z.O.eOQ2kL4vF8rS2wN9tP1qR5uX3yZ7aB6c",
    "virtual_balance": 10000.00,
    "created_at": "2026-01-15T08:30:00Z"
  },
  {
    "user_id": 2,
    "email": "sarah.jenkins@example.com",
    "password_hash": "$2b$10$k9LzHvY8rX2nV8zM7a.P.fPR3lM5wG9tT3xO0uQ2rS6vY4zAaC7d",
    "virtual_balance": 25000.00,
    "created_at": "2026-03-20T14:15:00Z"
  }
]

```

#### 2\. Active Strategy Configurations (`mockStrategies.json`)

``` json
[
  {
    "strategy_id": 101,
    "user_id": 1,
    "strategy_name": "BTC MA Crossover",
    "asset_symbol": "BTC/USDT",
    "sma_period": 20,
    "rsi_threshold": 30,
    "stop_loss_pct": 2.50,
    "take_profit_pct": 5.00,
    "status": "ACTIVE",
    "created_at": "2026-02-01T10:00:00Z"
  },
  {
    "strategy_id": 102,
    "user_id": 1,
    "strategy_name": "ETH Breakout",
    "asset_symbol": "ETH/USDT",
    "sma_period": 50,
    "rsi_threshold": 40,
    "stop_loss_pct": 1.50,
    "take_profit_pct": 4.00,
    "status": "PAUSED",
    "created_at": "2026-02-10T11:45:00Z"
  }
]

```

#### 3\. Executed Orders & Trade History (`mockOrders.json`)

``` json
[
  {
    "order_id": 982,
    "strategy_id": 101,
    "order_type": "BUY",
    "price": 96100.0000,
    "quantity": 0.050000,
    "pnl_amount": 0.00,
    "order_status": "FILLED",
    "executed_at": "2026-11-20T14:32:10Z"
  },
  {
    "order_id": 983,
    "strategy_id": 101,
    "order_type": "SELL",
    "price": 98500.0000,
    "quantity": 0.050000,
    "pnl_amount": 120.00,
    "order_status": "FILLED",
    "executed_at": "2026-11-22T09:15:45Z"
  }
]

```

-----

### 5.2 Alternate Data Formats (CSV Log Export & SQL Seed Data)

#### CSV Export Log (`orders_export.csv`)

``` csv
Order ID,Strategy Name,Pair,Type,Price,Quantity,P&L ($),Status,Timestamp
#ORD-982,BTC MA Cross,BTC/USDT,BUY,96100.00,0.05,0.00,FILLED,2026-11-20 14:32:10
#ORD-983,BTC MA Cross,BTC/USDT,SELL,98500.00,0.05,120.00,FILLED,2026-11-22 09:15:45
#ORD-984,ETH Breakout,ETH/USDT,SELL,3620.00,1.20,45.50,FILLED,2026-11-24 18:20:00

```

#### SQL Seed Script (`db/seeds.sql`)

``` sql
-- MariaDB Referential Integrity Seed Script
USE algopulse_db;

INSERT INTO users (user_id, email, password_hash, virtual_balance) VALUES
(1, 'alex.chen@example.com', '$2b$10$e8KzGvX9qW1mU7yL6z.O.eOQ2kL4vF8rS2wN9tP1qR5uX3yZ7aB6c', 10000.00);

INSERT INTO strategies (strategy_id, user_id, strategy_name, asset_symbol, sma_period, rsi_threshold, stop_loss_pct, take_profit_pct, status) VALUES
(101, 1, 'BTC MA Crossover', 'BTC/USDT', 20, 30, 2.50, 5.00, 'ACTIVE'),
(102, 1, 'ETH Breakout', 'ETH/USDT', 50, 40, 1.50, 4.00, 'PAUSED');

INSERT INTO orders (order_id, strategy_id, order_type, price, quantity, pnl_amount, order_status) VALUES
(982, 101, 'BUY', 96100.0000, 0.050000, 0.00, 'FILLED'),
(983, 101, 'SELL', 98500.0000, 0.050000, 120.00, 'FILLED');

```

-----

### 5.3 Code-Level Unit Test Automation (Vitest & Testing Library)

To validate core quantitative logic (SMA calculation, P\&L execution, and Stop-Loss triggers), automated unit tests were written using **Vitest**:

#### Unit Test Suite: `src/tests/tradingEngine.test.js`

``` javascript
import { describe, it, expect } from 'vitest';
import { calculateSMA, evaluateStopLoss } from '../utils/tradingEngine';

describe('Quantitative Trading Engine Unit Tests', () => {
  // 1. Simple Moving Average (SMA) Calculation Unit Test
  it('should accurately calculate the Simple Moving Average (SMA) for a given price series', () => {
    const prices = [100, 102, 104, 106, 108]; // Sum = 520, Period = 5
    const sma = calculateSMA(prices, 5);
    expect(sma).toBe(104.00);
  });

  it('should return null when price series length is less than SMA period', () => {
    const prices = [100, 102];
    const sma = calculateSMA(prices, 5);
    expect(sma).toBeNull();
  });

  // 2. Stop-Loss Trigger Logic Unit Test
  it('should trigger a Stop-Loss SELL order when price falls below the stop-loss percentage', () => {
    const entryPrice = 100.00;
    const currentPrice = 97.00; // 3% drop
    const stopLossPct = 2.50;  // 2.5% threshold

    const isTriggered = evaluateStopLoss(entryPrice, currentPrice, stopLossPct);
    expect(isTriggered).toBe(true);
  });

  it('should NOT trigger Stop-Loss when price drop is within the acceptable threshold', () => {
    const entryPrice = 100.00;
    const currentPrice = 98.50; // 1.5% drop
    const stopLossPct = 2.50;

    const isTriggered = evaluateStopLoss(entryPrice, currentPrice, stopLossPct);
    expect(isTriggered).toBe(false);
  });
});

```

-----

## 6\. Learning Unit 5: System Architecture & MariaDB Schema

### 6.1 Complete Tech Stack & Project Folder Structure

``` 
algopulse-app/
├── client/                           # Frontend Application (React SPA)
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
│   │   │   ├── StrategyForm.test.jsx
│   │   │   └── tradingEngine.test.js
│   │   ├── App.jsx                   # Main App & Wouter Router setup
│   │   ├── main.jsx                  # Entry point
│   │   └── setupTests.js             # Vitest / Jest-DOM setup configuration
│   ├── index.html
│   ├── vite.config.js                # Vite + Vitest config (jsdom environment)
│   └── package.json
└── server/                           # Express Backend & MariaDB Layer
    ├── src/
    │   ├── config/
    │   │   └── database.js           # MariaDB connection pool config
    │   ├── controllers/
    │   │   └── strategyController.js
    │   ├── routes/
    │   │   └── strategyRoutes.js
    │   └── index.js
    ├── db/
    │   ├── schema.sql                # MariaDB DDL scripts (strategies, orders, users)
    │   └── seeds.sql                 # Data seed scripts
    └── package.json 
```

### 6.2 MariaDB DDL Database Schema (`db/schema.sql`)

``` sql
-- MariaDB DDL Schema for AlgoPulse
CREATE DATABASE IF NOT EXISTS algopulse_db;
USE algopulse_db;

-- Users Table
CREATE TABLE IF NOT EXISTS users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    virtual_balance DECIMAL(15, 2) DEFAULT 10000.00,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Strategy Configurations Table
CREATE TABLE IF NOT EXISTS strategies (
    strategy_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    strategy_name VARCHAR(100) NOT NULL,
    asset_symbol VARCHAR(20) NOT NULL,
    sma_period INT DEFAULT 20,
    rsi_threshold INT DEFAULT 30,
    stop_loss_pct DECIMAL(5, 2) NOT NULL,
    take_profit_pct DECIMAL(5, 2) NOT NULL,
    status ENUM('ACTIVE', 'PAUSED', 'DELETED') DEFAULT 'ACTIVE',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

-- Order History & Trade Logs Table
CREATE TABLE IF NOT EXISTS orders (
    order_id INT AUTO_INCREMENT PRIMARY KEY,
    strategy_id INT NOT NULL,
    order_type ENUM('BUY', 'SELL') NOT NULL,
    price DECIMAL(15, 4) NOT NULL,
    quantity DECIMAL(15, 6) NOT NULL,
    pnl_amount DECIMAL(15, 2) DEFAULT 0.00,
    order_status ENUM('FILLED', 'CANCELLED', 'EXECUTED') DEFAULT 'FILLED',
    executed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (strategy_id) REFERENCES strategies(strategy_id) ON DELETE CASCADE
); 
```

