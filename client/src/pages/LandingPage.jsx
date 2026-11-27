import Navbar from '../components/common/Navbar.jsx';
import HeroSection from '../components/landing/HeroSection.jsx';
import DashboardMockup from '../components/landing/DashboardMockup.jsx';
import HowItWorks from '../components/landing/HowItWorks.jsx';
import FeatureGrid from '../components/landing/FeatureGrid.jsx';
import GuardrailsSection from '../components/landing/GuardrailsSection.jsx';
import BacktestShowcase from '../components/landing/BacktestShowcase.jsx';
import EducatorSection from '../components/landing/EducatorSection.jsx';
import FaqAccordion from '../components/landing/FaqAccordion.jsx';
import FinalCta from '../components/landing/FinalCta.jsx';
import LandingFooter from '../components/landing/LandingFooter.jsx';
import ScrollToBottomFab from '../components/common/ScrollToBottomFab.jsx';
import '../styles/landing.css';

export default function LandingPage() {
  return (
    <div className="landing">
      <Navbar />
      <main className="container py-4 flex-grow-1">
        <HeroSection />
        <DashboardMockup />
        <HowItWorks />
        <FeatureGrid />
        <GuardrailsSection />
        <BacktestShowcase />
        <EducatorSection />
        <FaqAccordion />
        <FinalCta />
      </main>
      <LandingFooter />
      <ScrollToBottomFab />
    </div>
  );
}
