
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import Header from './components/Header';
import HeroSection from './components/home/HeroSection';
import RatesSection from './components/home/RatesSection';
import FeaturesSection from './components/home/FeaturesSection';
import SecuritySection from './components/home/SecuritySection';
import FAQSection from './components/home/FAQSection';
import DashboardPage from './pages/Dashboard';
import SwapPage from './pages/Swap';
import ActivityPage from './pages/Activity';
import Footer from './components/Footer';

function App() {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  const Home = () => (
    <main>
      <HeroSection />
      <RatesSection />
      <FeaturesSection />
      <SecuritySection />
      <FAQSection />
    </main>
  );

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-primary text-primary transition-colors duration-300">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/swap" element={<SwapPage />} />
          <Route path="/activity" element={<ActivityPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        {isHomePage && <Footer />}
      </div>
    </ThemeProvider>
  );
}

export default App;
