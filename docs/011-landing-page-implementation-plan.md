# 011 – Landing Page Implementation Plan: AlgoPulse

> Builds the landing page described in **010-landing-page-ui-prompt.md**.
> Follows the coding standards in **AGENTS.md** and the existing client set up in **009-poc-implementation-plan.md** (Phases 3–6).
> **Charts:** [ApexCharts](https://apexcharts.com/) through the `react-apexcharts` wrapper, for candlestick, equity-curve, drawdown, sparkline, gauge and bar charts.

---

## 1. Goal & Scope

Add a marketing landing page to the existing React client. It introduces AlgoPulse to retail traders and educators and sends them into the app. Interactive financial charts make the product feel real.

**In scope**
- One new route with 11 sections (nav, hero, trust strip, how it works, features, guardrails, backtest showcase, educators, FAQ, final call to action, footer).
- 6 ApexCharts components built on one shared theme, loaded only when the page needs them (lazy-loaded).
- Static, repeatable sample data only, no API calls.
- Responsive, accessible, themed to the 010 prompt.
- Vitest tests and a lint/test/build pass.

**Out of scope:** real sign-up or auth, pricing/payments, analytics, SEO server rendering, live market data in charts.
*Future (not this plan):* reuse the chart components inside Backtest Studio and the Dashboard (see § 8).

---

## 2. Key Design Decisions

| # | Decision | Choice | Reason |
| :-: | :-- | :-- | :-- |
| D1 | **Route** ✅ *confirmed* | Landing page at **`/welcome`**; the Dashboard stays at `/` | Keeps the 4 wireframed routes, `App.test.jsx` and the Navbar unchanged. "Launch App" links to `/`. *Alternative considered:* landing at `/`, Dashboard moved to `/dashboard` (see the closing note). |
| D2 | **Layout** | The landing page renders **without** the app `Navbar` and `TickerMarquee` | It has its own nav and dark hero. `App.jsx` gets an outer `<Switch>`: `/welcome` → `LandingPage`, everything else → the existing app shell. |
| D3 | **Mobile menu & FAQ accordion** | Controlled with React `useState` and Bootstrap classes | `main.jsx` only imports Bootstrap **CSS**, not its JS. This avoids a second DOM-controlling library and stays testable. |
| D4 | **Chart library** | **`apexcharts` + `react-apexcharts`** | Built-in candlestick charts, mixed candle + line charts (moving-average overlays), sparklines, radial gauges, linked tooltips across charts, dark mode and responsive breakpoints. Draws SVG, so charts stay sharp and are inspectable in DevTools. |
| D5 | **Bundle size** | Charts are **lazy-loaded** with `React.lazy` + `<Suspense>`, each behind a `LazyChart` wrapper that shows a placeholder while loading | ApexCharts is large (≈ 130 KB gzip). Lazy loading keeps it out of the main app bundle, so Dashboard, Builder and other pages load no faster or slower. The build must show a **separate chunk** for it. |
| D6 | **Chart theme** | One `chartTheme.js` holding the palette, fonts and a shared base options function `baseOptions({ reducedMotion })` | Every chart looks the same; theme colours match `landing.css`. ApexCharts options take literal colours, not CSS variables, so the hex values live in JS and are mirrored in CSS. |
| D7 | **Chart data** | Pure helper functions in `utils/chartData.js` (seeded price-candle generator, SMA, drawdown, sparkline) plus hand-written equity points in `landingContent.js` | Same output every render, easy to unit test, and figures match the headline numbers (+18.4% / −4.1%) exactly. The seeded generator mirrors the server's `mulberry32` so landing and backtest data feel the same. |
| D8 | **Font** | `@fontsource-variable/inter` (self-hosted); also passed to ApexCharts `chart.fontFamily` | Works offline and in tests, with no Google Fonts request. Chart labels use the same font as the page. |
| D9 | **Theming scope** | `landing.css` scoped under a `.landing` root class with CSS custom properties | Prevents the dark theme from leaking into the existing light app pages. |
| D10 | **Content** | All copy and sample numbers live in `landingContent.js` | Components stay presentational; copy edits don't touch JSX, and tests can import the same data. |

---

## 3. Chart Inventory

| # | Chart | ApexCharts type | Section | Data | Key options |
| :-: | :-- | :-- | :-- | :-- | :-- |
| C1 | **BTC/USDT candlestick + SMA-20 overlay** | `candlestick` + `line` (mixed) | Hero → `DashboardMockup` | 60 daily candles from `generateOhlc(seed=101)`; SMA from `sma(closes, 20)` | Up candles emerald, down candles red; `annotations.points` for ▲ BUY / ▼ SELL markers; zoom and toolbar off; tooltip shows open/high/low/close |
| C2 | **Ticker sparklines** (×3) | `area` with sparkline mode | Hero → mockup ticker strip | 24 points per pair from `sparkline(seed)` | `chart.sparkline.enabled`; line colour follows the sign of the change; ~80×28 px |
| C3 | **Equity curve** | `area` | Backtest showcase | Hand-written `BACKTEST.equity` (10,000 → 11,840) | Gradient fill; markers on trade dates; `chart.group: 'backtest'` so the cursor moves with C4 |
| C4 | **Drawdown ("underwater") chart** | `area` | Backtest showcase (below C3) | `drawdownSeries(BACKTEST.equity)` | Red fill below 0; y-axis max 0; same `group` as C3 for a shared tooltip; lowest point = −4.1% |
| C5 | **Win-rate gauge** | `radialBar` | Backtest showcase metric card | `[64.2]` | Half-circle gauge, emerald track; label shows "64.2%" |
| C6 | **Monthly returns** | `bar` | For Educators | 11 monthly % values in `landingContent.js` | Each bar coloured green or red by sign; x-axis Jan–Nov; supports the coaching story |

> [!NOTE]
> C1–C5 are **must-have**. C6 is **nice-to-have** and can be dropped if time is short; the Educators section still works with its text and quote alone.

---

## 4. Target File Structure

```
client/src/
├── pages/
│   └── LandingPage.jsx                 # Puts all sections together, wraps in .landing
├── components/landing/
│   ├── LandingNav.jsx                  # Logo, anchor links, buttons, mobile menu toggle
│   ├── HeroSection.jsx                 # Headline, buttons, <DashboardMockup/>
│   ├── DashboardMockup.jsx             # Ticker strip (C2), metric cards, C1, strategy card
│   ├── TrustStrip.jsx                  # 4 honest trust claims
│   ├── HowItWorks.jsx                  # 4 steps mapped to the app pages
│   ├── FeatureGrid.jsx                 # 3 feature cards
│   ├── GuardrailsSection.jsx           # Does / Asks / Never columns
│   ├── BacktestShowcase.jsx            # C3 + C4 (linked), C5, trade log
│   ├── EducatorSection.jsx             # Mentor value, quote, C6
│   ├── FaqAccordion.jsx                # useState-controlled accordion
│   ├── FinalCta.jsx                    # Closing call to action
│   └── LandingFooter.jsx               # Disclaimers, links, "Built with"
├── components/charts/                  # Reusable, not landing-specific (§ 8)
│   ├── LazyChart.jsx                   # React.lazy(react-apexcharts) + Suspense placeholder + <figure>
│   ├── CandlestickChart.jsx            # C1 (propTypes: candles, sma, signals, height)
│   ├── SparklineChart.jsx              # C2 (propTypes: points, positive)
│   ├── EquityCurveChart.jsx            # C3 (propTypes: points, trades, group)
│   ├── DrawdownChart.jsx               # C4 (propTypes: points, group)
│   ├── RadialGauge.jsx                 # C5 (propTypes: value, label)
│   └── ReturnsBarChart.jsx             # C6 (propTypes: categories, values)
├── charts/
│   └── chartTheme.js                   # AP_COLORS, baseOptions({ reducedMotion }) (D6)
├── hooks/
│   └── usePrefersReducedMotion.js      # matchMedia listener → turns chart animations off
├── utils/
│   └── chartData.js                    # mulberry32, generateOhlc, sma, drawdownSeries, sparkline (D7)
├── data/
│   └── landingContent.js               # All copy and sample figures (D10)
├── styles/
│   └── landing.css                     # .landing-scoped theme (D9)
└── tests/
    ├── LandingPage.test.jsx
    ├── chartData.test.js
    └── charts.test.jsx
```

Edits to existing files: `App.jsx` (route, D1/D2), `main.jsx` (font import), `package.json` (3 new dependencies).

---

## 5. Implementation Phases

### Phase L0 – Setup
- Install the dependencies:
  ```bash
  cd client && npm i apexcharts react-apexcharts @fontsource-variable/inter
  ```
  Confirm that the installed `react-apexcharts` version supports React 19; if npm reports a peer-dependency conflict, choose the newest compatible release (do **not** use `--force`).
- Create `styles/landing.css` with these theme variables:
  ```css
  .landing {
    --ap-navy: #0A0F1C; --ap-surface: #F8FAFC; --ap-card: #FFFFFF;
    --ap-emerald: #10B981; --ap-red: #EF4444; --ap-blue: #3B82F6; --ap-muted: #94A3B8;
    font-family: 'Inter Variable', system-ui, sans-serif;
  }
  .landing .num { font-variant-numeric: tabular-nums; }
  .landing .glass { background: rgba(255,255,255,.06); backdrop-filter: blur(12px);
                    border: 1px solid rgba(255,255,255,.12); }
  .landing .chart-skeleton { background: linear-gradient(90deg,#1e293b 25%,#273449 50%,#1e293b 75%);
                             background-size: 200% 100%; animation: ap-shimmer 1.2s infinite; border-radius: .5rem; }
  @keyframes ap-shimmer { to { background-position: -200% 0; } }
  @media (prefers-reduced-motion: reduce) { .landing * { transition: none !important; animation: none !important; } }
  ```
- Add the extra Bootstrap button styles `.btn-ap-primary` (emerald) and `.btn-ap-outline`, with visible `:focus-visible` outlines.

### Phase L1 – Content, Chart Foundation & Routing
- **`data/landingContent.js`:** export `NAV_LINKS`, `TICKERS`, `METRICS`, `SAMPLE_STRATEGY`, `TRUST_ITEMS`, `STEPS`, `FEATURES`, `GUARDRAILS`, `BACKTEST` (`metrics`, `equity` as `[{ x: 'YYYY-MM-DD', y }]`, `trades`), `MONTHLY_RETURNS`, `EDUCATOR_QUOTE`, `FAQS`, `DISCLAIMERS`. Values must match **010 § Product facts** exactly.
- **`utils/chartData.js`** (pure, no React):
  ```js
  mulberry32(seed)                        // same PRNG as server backtestController
  generateOhlc({ seed, days, start, startPrice }) // → [{ x: Date, y: [o, h, l, c] }]
  sma(values, period)                     // → (number|null)[], null until the window is full
  drawdownSeries(equity)                  // → [{ x, y: % below running peak }] (≤ 0)
  sparkline({ seed, points, drift })      // → number[]
  ```
- **`charts/chartTheme.js`:**
  ```js
  export const AP_COLORS = { navy: '#0A0F1C', emerald: '#10B981', red: '#EF4444', blue: '#3B82F6', muted: '#94A3B8' };
  export function baseOptions({ reducedMotion = false } = {}) {
    return {
      chart: { fontFamily: 'Inter Variable, system-ui, sans-serif', foreColor: AP_COLORS.muted,
               background: 'transparent', toolbar: { show: false }, zoom: { enabled: false },
               animations: { enabled: !reducedMotion } },
      theme: { mode: 'dark' },
      grid: { borderColor: 'rgba(148,163,184,.15)', strokeDashArray: 4 },
      tooltip: { theme: 'dark' },
      dataLabels: { enabled: false },
    };
  }
  ```
- **`hooks/usePrefersReducedMotion.js`:** `useSyncExternalStore` over `matchMedia('(prefers-reduced-motion: reduce)')`. This avoids calling setState inside an effect, which the `react-hooks/set-state-in-effect` lint rule flags.
- **`components/charts/LazyChart.jsx`:**
  ```jsx
  const ReactApexChart = lazy(() => import('react-apexcharts'));
  export default function LazyChart({ type, series, options, height, width = '100%', title, summary }) {
    return (
      <figure className="m-0" aria-label={title}>
        <Suspense fallback={<div className="chart-skeleton" style={{ height }} aria-hidden="true" />}>
          <ReactApexChart type={type} series={series} options={options} height={height} width={width} />
        </Suspense>
        {summary && <figcaption className="visually-hidden">{summary}</figcaption>}
      </figure>
    );
  }
  ```
  Each chart component merges `baseOptions()` with its own options, wrapped in `useMemo` so options aren't rebuilt (and the chart redrawn) on every render.
- **Routing:** in `App.jsx`, wrap the current shell in an outer `<Switch>` and add `<Route path="/welcome" component={LandingPage} />`. Stub `LandingPage.jsx` and confirm the route works.

### Phase L2 – Top of Page (sections 1–3) + C1, C2
- **LandingNav:** sticky dark bar. Anchor links (`#features`, `#how-it-works`, `#backtesting`, `#educators`, `#faq`) are plain `<a>` tags for in-page scrolling. "Launch App" uses wouter `<Link href="/">`; "Try the Backtester" uses `<Link href="/backtest">`. A hamburger button toggles `isOpen` and sets `aria-expanded` / `aria-controls`.
- **HeroSection:** `<h1>` headline, subheadline, two buttons, and `<DashboardMockup/>` on a two-column grid (`col-lg-6`) that stacks on mobile.
- **DashboardMockup:** glass card that repeats the real Dashboard's look.
  - **Ticker strip** with a **SparklineChart (C2)** next to each pair (▲/▼ colours).
  - 3 metric cards (Virtual Balance, Active Bots, 24h P&L).
  - **CandlestickChart (C1):** a mixed chart with two series:
    ```js
    series: [
      { name: 'BTC/USDT', type: 'candlestick', data: candles },
      { name: 'SMA 20',   type: 'line',        data: smaPoints },
    ]
    plotOptions: { candlestick: { colors: { upward: AP_COLORS.emerald, downward: AP_COLORS.red } } }
    stroke: { width: [1, 2] }, colors: [AP_COLORS.emerald, AP_COLORS.blue]
    annotations: { points: signals.map(s => ({ x: s.x, y: s.price, marker: { size: 5 },
                   label: { text: s.type === 'BUY' ? '▲ BUY' : '▼ SELL' } })) }
    ```
    The BUY/SELL signals come from where the closing price crosses the SMA, the same rule as the server backtest, so the hero tells the product story.
  - Strategy card "BTC MA Crossover · ACTIVE" with disabled Pause/Edit/Delete buttons.
  - The mockup's text parts are `aria-hidden`; the charts carry their own `figcaption` summaries.
- **TrustStrip:** 4 icon + text items in a row (`row-cols-2 row-cols-lg-4`), no logos.

### Phase L3 – Product Story (sections 4–7) + C3, C4, C5
- **HowItWorks:** 4 numbered steps with Bootstrap Icons (`bi-sliders`, `bi-graph-up-arrow`, `bi-speedometer2`, `bi-list-check`, matching the Navbar), each linking to its page.
- **FeatureGrid:** `row-cols-1 row-cols-md-3` cards with an icon, title, 2-line description and a small preview (e.g., the Stop-Loss 0.1–50% range).
- **GuardrailsSection:** 3 columns with colour-coded headers (emerald *Does automatically* / blue *Asks you to confirm* / red *Never does*), using `bi-check-circle`, `bi-question-circle` and `bi-x-octagon`.
- **BacktestShowcase** (`id="backtesting"`), laid out as:
  ```
  ┌──────────────────────────────────────────┬──────────────┐
  │ EquityCurveChart (C3)  height 260        │ Total Return │
  │──────────────────────────────────────────│ RadialGauge  │
  │ DrawdownChart (C4)     height 120        │  (C5) 64.2%  │
  │                                          │ Max Drawdown │
  └──────────────────────────────────────────┴──────────────┘
  │ Trade log table (2 rows, matches Wireframe 3)            │
  ```
  - C3 and C4 share `chart.group: 'backtest'`, each with its own `chart.id`, so hovering one moves the cursor and tooltip on both.
  - C3 shows emerald markers on BUY dates and blue markers on SELL dates (`discrete` markers taken from `BACKTEST.trades`).
  - C4's y-axis runs from the lowest drawdown up to 0, with a red gradient fill; a dashed y-axis line marks the −4.1% maximum drawdown.
  - On mobile, the gauge column stacks under the charts (`col-12 col-lg-3`).

### Phase L4 – Trust & Close (sections 8–11) + C6
- **EducatorSection:** two columns, with value bullets (CSV export, repeatable backtests, Max Drawdown) and a `<blockquote>` / `<figcaption>` mentor quote, plus **ReturnsBarChart (C6):** `plotOptions.bar.colors.ranges` = `[{ from: -100, to: 0, color: red }, { from: 0, to: 100, color: emerald }]`.
- **FaqAccordion:** keeps `openIndex` state; each header is a `<button>` with `aria-expanded` and `aria-controls`; only one panel is open at a time. Add an FAQ item: *"Are the charts live?"* → "No. Landing-page charts use sample data; the app's Backtest Studio uses your own strategy."
- **FinalCta:** full-width emerald band with a single "Launch App" button.
- **LandingFooter:** disclaimers ("Educational paper-trading tool, not financial advice", "Past performance does not predict future results", "Charts show sample data"), Privacy/Terms links, "Built with React · Express · MariaDB · ApexCharts".

### Phase L5 – Responsive, Performance & Accessibility Pass
- **Responsive:** check at 360, 768, 1024 and 1440 px with no horizontal scroll. Use ApexCharts' `responsive` setting `[{ breakpoint: 576, options: { chart: { height: 220 }, xaxis: { labels: { show: false } } } }]` on C1 and C3. The mockup stacks under the hero copy, and the nav collapses below `lg`.
- **Performance:**
  - `npm run build` shows a separate chunk for ApexCharts; the main entry chunk does not grow by more than ~10 KB gzip.
  - Chart option objects are wrapped in `useMemo`; data series are worked out once at module level from `landingContent`.
  - Optionally delay rendering C3–C6 until they scroll into view, using an `IntersectionObserver` hook.
- **Accessibility:**
  - Every chart is a `<figure>` with a visually hidden `<figcaption>`, e.g. "BTC/USDT 60-day candlestick chart; closed at $96,450, up 7.2%; 2 buy and 2 sell signals."
  - Colour is never the only signal: candles use ▲/▼ labels, the drawdown is always negative, and the bar tooltips show signed values.
  - Contrast: white on `#0A0F1C` and dark text on emerald buttons meet AA; chart axis text (`#94A3B8` on navy) meets AA for large text, so use at least 12 px.
  - Headings go in order: one `<h1>`, `<h2>` per section, `<h3>` for cards; each section is a `<section id aria-labelledby>`.
  - Keyboard: Tab order follows the visual order, focus rings are visible, and the FAQ and menu work with Enter/Space.
  - `prefers-reduced-motion`: chart animations are off (`baseOptions({ reducedMotion })`), and smooth scroll, hover transitions and the placeholder shimmer are disabled.

### Phase L6 – Tests & Verification

> [!IMPORTANT]
> ApexCharts needs real SVG layout (`getBBox`, `ResizeObserver`), which **jsdom doesn't provide**. Component tests **mock `react-apexcharts`** and check the props passed to it. The chart maths is tested directly through the pure `chartData.js` functions.

```js
// in LandingPage.test.jsx and charts.test.jsx
vi.mock('react-apexcharts', () => ({
  default: ({ type, series, options }) => (
    <div data-testid="apexchart" data-type={type}
         data-series={JSON.stringify(series)} data-group={options?.chart?.group ?? ''} />
  ),
}));
```

**`chartData.test.js`** (pure unit tests)

| Test | Assertion |
| :-- | :-- |
| Repeatable | `generateOhlc({ seed: 101, ... })` returns the same output twice; a different seed gives different output |
| Valid candles | Every candle has `high ≥ max(open, close)` and `low ≤ min(open, close)`, with all values > 0 |
| SMA | `sma([1,2,3,4,5], 3)` → `[null, null, 2, 3, 4]` |
| Drawdown | Every value ≤ 0; `drawdownSeries([100,110,99,120])` has its minimum at −10% |
| **Headline truth** | `BACKTEST.equity` gives +18.4% total return, and `min(drawdownSeries(...))` rounds to −4.1%, matching `BACKTEST.metrics` |

**`charts.test.jsx`** (props checks with the mocked chart)

| Test | Assertion |
| :-- | :-- |
| CandlestickChart | Renders 2 series, of types `candlestick` and `line`; the line series has `null` for the first 19 points |
| Equity + Drawdown linked | Both charts receive the same `chart.group` value |
| RadialGauge | Series is `[64.2]` |
| Reduced motion | With `matchMedia` mocked to `reduce: true`, `options.chart.animations.enabled === false` |
| Accessible figure | Every chart is wrapped in a `figure` with a non-empty summary |

**`LandingPage.test.jsx`** (render inside wouter `memoryLocation` at `/welcome`)

| Test | Assertion |
| :-- | :-- |
| Renders hero | One `<h1>` with the headline; "Launch App" links to `/` |
| No app shell | The app `Navbar` brand link and "Live Tickers:" bar are **not** rendered |
| Charts mount | After `findAllByTestId('apexchart')` (the lazy charts finish loading), at least 5 charts render, including types `candlestick`, `area` and `radialBar` |
| Honest product facts | "$10,000.00", "0.1", "50", "paper" and "sample data" text present; no "SOC 2" / "insurance" text |
| Guardrails | The 3 column headings render |
| FAQ accordion | Clicking a question toggles `aria-expanded` and shows its answer; opening another closes the first |
| Mobile nav | Clicking the toggle switches `aria-expanded` from `false` to `true` |
| Existing routes | `App.test.jsx` keeps passing unchanged (guards D1) |

Run:
```bash
cd client && npm run lint && npm run test:run && npm run build
```
In the build output, confirm there's a separate `apexcharts-*.js` (or `react-apexcharts-*.js`) chunk.

**Manual check in a browser (charts can't be checked visually in jsdom):** hover C1 to see the price tooltip; hover C3 and confirm C4's cursor follows; resize to 360 px; turn on reduced motion in the OS or DevTools and confirm no animation; take screenshots for submission § 4.2.

---

## 6. Milestones

| Step | Deliverable | Est. |
| :-: | :-- | :-: |
| L0–L1 | Dependencies, theme CSS, content file, `chartData.js` + tests, `chartTheme.js`, `LazyChart`, `/welcome` route | 1 day |
| L2 | Nav, Hero + mockup with **candlestick + SMA (C1)** and **sparklines (C2)**, Trust strip | 1 day |
| L3 | How it works, Features, Guardrails, **Backtest showcase (C3 + C4 linked, C5 gauge)** | 1 day |
| L4 | Educators + **monthly returns (C6)**, FAQ, final call to action, Footer | 0.5 day |
| L5–L6 | Responsive/performance/accessibility pass, tests, bundle chunk check, browser check, screenshots | 0.5 day |

---

## 7. Acceptance Criteria
- [ ] `/welcome` renders all 11 sections; the 4 existing routes are unchanged.
- [ ] The landing page shows no app Navbar or TickerMarquee, and its styles don't leak into other pages.
- [ ] **C1–C5 render with ApexCharts** (C6 optional): candlestick + SMA overlay with BUY/SELL markers, sparklines, equity curve and drawdown with linked tooltips, win-rate gauge.
- [ ] All charts use `chartTheme.js` (emerald up / red down, Inter font, dark tooltip) and turn animations off under `prefers-reduced-motion`.
- [ ] ApexCharts is **lazy-loaded into its own chunk**; other app pages' bundle size is unchanged.
- [ ] Every figure matches 010 § Product facts, and the equity series really produces +18.4% / −4.1% (tested). There are no fake compliance badges, partners or custody claims, and charts are labelled as sample data.
- [ ] "Launch App" → `/`, "Try the Backtester" → `/backtest`, with no full page reload.
- [ ] No horizontal scroll at 360 px; charts resize; the nav collapses on mobile.
- [ ] AA contrast, a single `<h1>`, keyboard-usable menu and FAQ, and every chart has a text summary.
- [ ] New dependencies are limited to `apexcharts`, `react-apexcharts` and `@fontsource-variable/inter`.
- [ ] `npm run lint && npm run test:run && npm run build` all pass.

---

## 8. Future Reuse (beyond this plan)
The `components/charts/` folder is deliberately not tied to the landing page:

| App page | Chart to reuse | Data source |
| :-- | :-- | :-- |
| Backtest Studio (`/backtest`) | `EquityCurveChart` + `DrawdownChart` + `RadialGauge` | `POST /api/backtest` response (`trades`, `win_rate_pct`); needs the API to also return the equity series |
| Dashboard (`/`) | `SparklineChart` in the Live Market Feed table; `CandlestickChart` for the selected strategy's pair | `tickerAtom` history / a future market-data endpoint |
| Order History (`/orders`) | `ReturnsBarChart` (P&L per day or month) | Group `GET /api/orders` results by `executed_at` |

> [!NOTE]
> **Decision D1 confirmed: `/welcome`.** If this is ever changed so the landing page is at `/` and the Dashboard moves to `/dashboard`, the extra work is updating `App.jsx`, `Navbar.jsx` links/active state, `App.test.jsx`, the Builder's redirect after saving (`setLocation('/')`), and the route references in 009 and the submission wireframes.
