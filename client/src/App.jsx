import { Route, Switch, useLocation } from 'wouter';
import LandingPage from './pages/LandingPage.jsx';
import Navbar from './components/common/Navbar.jsx';
import TickerMarquee from './components/common/TickerMarquee.jsx';
import DashboardPage from './pages/DashboardPage.jsx';
import StrategyBuilderPage from './pages/StrategyBuilderPage.jsx';
import BacktestStudioPage from './pages/BacktestStudioPage.jsx';
import OrderHistoryPage from './pages/OrderHistoryPage.jsx';
import LandingFooter from './components/landing/LandingFooter.jsx';
import ScrollToBottomFab from './components/common/ScrollToBottomFab.jsx';

export default function App() {
  const [location] = useLocation();

  if (location === '/') {
    return <LandingPage />;
  }

  return (
    <div className="min-vh-100 d-flex flex-column bg-body text-body">
      <Navbar />
      <TickerMarquee />
      <main className="container py-4 flex-grow-1">
        <Switch>
          <Route path="/Welcome" component={LandingPage} />
          <Route path="/Dashboard" component={DashboardPage} />
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
      <LandingFooter />
      <ScrollToBottomFab />
    </div>
  );
}
