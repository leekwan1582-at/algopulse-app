# 010 – Landing Page UI/UX Design Prompt: AlgoPulse

> A UI/UX prompt written for AlgoPulse, adapted from a generic fintech landing-page prompt.
> Audience comes from **01-submission.md § 2.6 Stakeholder Analysis**; product facts come from the PoC (**009-poc-implementation-plan.md**).
> The build plan is in **011-landing-page-implementation-plan.md**.

---

Act as a senior UI/UX designer and React frontend developer. Design and build a modern,
responsive landing page for **AlgoPulse**, a web app where retail crypto traders build,
backtest and paper-trade automated trading strategies without writing code.

## Audience
- **Primary: Retail Crypto Trader.** Wants to test strategy ideas safely before risking real
  money; put off by bots that need Python or Pine Script, the scripting languages most
  trading bots require.
- **Secondary: Trading Mentor / Educator.** Wants repeatable backtest metrics and exportable
  trade logs to review and coach students.
- Do not market to developers or data providers. A small "Built with" strip in the footer is enough.

## Product facts (use these, do not invent others)
- 4 app pages: Dashboard (`/`), Strategy Builder (`/builder`), Backtest Studio (`/backtest`),
  Order History (`/orders`).
- Paper trading only: every account starts with a **$10,000.00 virtual balance**.
  No real funds, no exchange keys, no custody.
- Strategies use an SMA (simple moving average) period and an RSI threshold on BTC/USDT,
  ETH/USDT or SOL/USDT.
- Every strategy must have a Stop-Loss of **0.1–50%** and a Take-Profit of **0.5–200%**.
  The form, the server and the database all enforce these limits.
- Backtest results show Total Return, Win Rate, Max Drawdown and a trade log.
- Orders can be filtered and exported to CSV.

## Visual style
- Dark navy hero background (`#0A0F1C`), white or very light cards (`#FFFFFF` / `#F8FAFC`),
  emerald (`#10B981`) for gains and calls to action, red (`#EF4444`) for losses,
  electric blue (`#3B82F6`) for links and highlights.
- Font: Inter or Plus Jakarta Sans. Use tabular figures (`font-variant-numeric: tabular-nums`)
  for every price, percentage and balance.
- Subtle glassmorphism on hero cards only.
- **Charts with ApexCharts** (`apexcharts` + `react-apexcharts`), all sharing one dark theme:
  emerald for up candles and gains, red for down candles and losses, blue for the moving-average
  line, Inter font, dark tooltips, light dashed gridlines, no toolbar or zoom.
- Up/down arrows (▲ ▼) next to coloured percentages, matching the app's ticker bar.
- Label every chart as **sample data**; never present it as live market data.

## Page sections
1. **Navigation bar:** AlgoPulse logo (pulse icon); links: Features, How It Works,
   Backtesting, For Educators, FAQ; buttons: "Try the Backtester" (secondary) and
   "Launch App" (primary, links to `/`). Collapses into a menu on mobile.
2. **Hero:**
   - Headline about testing a strategy before risking capital, e.g.
     "Build, backtest and paper-trade crypto strategies. No code, no real money at risk."
   - Subheadline that mentions the $10,000 virtual balance and the built-in risk limits.
   - Primary button "Start Paper Trading"; secondary "See a Sample Backtest".
   - A dashboard mockup that matches the real Dashboard:
     - a ticker strip (BTC/USDT $96,450 ▲2.1%, ETH/USDT $3,610 ▼0.8%, SOL/USDT $230.15 ▲5.4%),
       each with a small **sparkline** trend chart next to it;
     - cards for Virtual Balance $10,000.00, Active Bots 3 Running, 24h Net P&L +$420.50 ▲;
     - a **BTC/USDT candlestick chart** (60 daily candles) with an **SMA 20 line** overlaid and
       ▲ BUY / ▼ SELL markers where the price crosses the moving average;
     - one strategy card "BTC MA Crossover · ACTIVE · SMA 20 · SL 2.5% · TP 5.0%"
       with Pause / Edit / Delete buttons.
3. **Trust strip (honest, no fake logos):** "Paper trading only: no real funds",
   "No exchange API keys required", "Stop-loss limits checked in the form, on the server
   and in the database", "Export every trade to CSV".
4. **How it works (4 steps, mapped to the app pages):** Build (Strategy Builder) →
   Backtest (Backtest Studio) → Deploy & Monitor (Dashboard) → Review & Export (Order History).
5. **Core features (3 columns):** No-code Strategy Builder with risk limits;
   Backtest Studio with Return / Win Rate / Max Drawdown; Order History with filters
   and CSV export. Each with a Bootstrap Icon and a small UI preview.
6. **Guardrails section (3 columns, builds trust):**
   - *Does automatically:* follows your SMA/RSI rules on paper, applies your Stop-Loss and
     Take-Profit, logs every order.
   - *Asks you to confirm:* deleting a strategy (confirmation dialog), saving changes to a
     live strategy.
   - *Never does:* touches real funds, connects to your exchange, or allows
     Stop-Loss / Take-Profit values outside the safe limits.
7. **Backtest showcase:**
   - an **equity-curve area chart** (10,000 → 11,840) with markers on buy and sell dates;
   - directly below it, a **drawdown ("underwater") chart** whose lowest point is −4.1%.
     Link the two so hovering one moves the cursor and tooltip on both;
   - metric cards for Total Return +18.4% and Max Drawdown −4.1%, plus a **half-circle gauge**
     showing Win Rate 64.2%;
   - a 2-row trade log.
   The chart data must really produce these numbers.
8. **For Educators:** the CSV export and repeatable backtests support coaching; show a
   short quote from a mentor persona and a **monthly returns bar chart** (Jan–Nov, green bars
   for gains and red for losses).
9. **FAQ (accordion):** Does AlgoPulse hold my money? (No, virtual balance only.) Which coins
   are supported? Why can't I set a 0% stop-loss? How is the backtest calculated?
   Can I export my trades? Are the charts live? (No, the landing page uses sample data; your
   own backtests run in Backtest Studio.) Is this financial advice? (No.)
10. **Final call to action:** "Your first strategy takes under 2 minutes." → "Launch App".
11. **Footer:** a "not financial advice / educational paper-trading tool" disclaimer, a note
    that past performance does not predict future results, a "charts show sample data" note,
    Privacy, Terms, and a "Built with React · Express · MariaDB · ApexCharts" note.

## Technical requirements
- React 19 + Vite, written as JSX (`client/src/pages/LandingPage.jsx`) with smaller section
  components in `client/src/components/landing/`.
- Serve the landing page at **`/welcome`**, without the app's own Navbar and ticker bar. The
  Dashboard stays at `/`, so "Launch App" links to `/`.
- Charts: `apexcharts` + `react-apexcharts`, as reusable components in
  `client/src/components/charts/` that read colours and fonts from one shared theme file.
  - **Lazy-load** the chart library (`React.lazy` + `Suspense`) with a placeholder while it
    loads, so other app pages don't get heavier.
  - Wrap each chart in a `<figure>` with a text summary for screen readers.
  - Turn chart animations off when the user prefers reduced motion.
  - Resize charts on small screens.
- Style with **Bootstrap 5** grid and utilities plus **Bootstrap Icons**; add a small custom
  CSS file for theme colours. No Tailwind.
- Use `wouter`'s `<Link>` for internal navigation. Add `propTypes` to reusable components.
  Follow the repository's `AGENTS.md` coding standards.
- Mobile-first layout at 360, 768, 1024 and 1440 px. WCAG AA contrast, semantic headings,
  visible focus states, and respect `prefers-reduced-motion`.
- Use static sample data only: no API calls on the landing page. Generate chart data with a
  seeded generator so it's the same on every load.
