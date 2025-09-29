
import { useState } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import Header from './components/Header';
import HeroSection from './components/home/HeroSection';
import RatesSection from './components/home/RatesSection';
import FeaturesSection from './components/home/FeaturesSection';
import SecuritySection from './components/home/SecuritySection';
import FAQSection from './components/home/FAQSection';
import Dashboard from './components/dashboard/Dashboard';
import Footer from './components/Footer';

function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'dashboard' | 'swap' | 'activity'>('home');

  const handlePageChange = (page: 'home' | 'dashboard' | 'swap' | 'activity') => {
    console.log('Page changing from', currentPage, 'to', page);
    setCurrentPage(page);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'swap':
        return <div className="min-h-screen flex items-center justify-center"><p className="text-2xl">Swap Page Coming Soon</p></div>;
      case 'activity':
        return <div className="min-h-screen flex items-center justify-center"><p className="text-2xl">Activity Page Coming Soon</p></div>;
      default:
        return (
          <main>
            <HeroSection />
            <RatesSection />
            <FeaturesSection />
            <SecuritySection />
            <FAQSection />
          </main>
        );
    }
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-primary text-primary transition-colors duration-300">
        <Header currentPage={currentPage} onPageChange={handlePageChange} />
        {renderPage()}
        {currentPage === 'home' && <Footer />}
      </div>
    </ThemeProvider>
  );
}

export default App;
