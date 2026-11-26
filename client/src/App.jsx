import { Route, Switch } from 'wouter';
import Navbar from './components/common/Navbar.jsx';
import TickerMarquee from './components/common/TickerMarquee.jsx';
import DashboardPage from './pages/DashboardPage.jsx';
import StrategyBuilderPage from './pages/StrategyBuilderPage.jsx';
import BacktestStudioPage from './pages/BacktestStudioPage.jsx';
import OrderHistoryPage from './pages/OrderHistoryPage.jsx';

export default function App() {
  return (
    <div className="min-vh-100 d-flex flex-column bg-light">
      <Navbar />
      <TickerMarquee />
      <main className="container py-4 flex-grow-1">
        <Switch>
          <Route path="/" component={DashboardPage} />
          <Route path="/builder" component={StrategyBuilderPage} />
          <Route path="/backtest" component={BacktestStudioPage} />
          <Route path="/orders" component={OrderHistoryPage} />
          <Route>
            <div className="alert alert-warning mb-0">
              <strong>404</strong> — Page not found.
            </div>
          </Route>
        </Switch>
      </main>
    </div>
  );
}
