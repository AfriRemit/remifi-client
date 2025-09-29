import React from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import RatesSection from './components/RatesSection';
import FeaturesSection from './components/FeaturesSection';
import SecuritySection from './components/SecuritySection';
import FAQSection from './components/FAQSection';
import Footer from './components/Footer';

function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-primary text-primary transition-colors duration-300">
        <Header />
        <main>
          <HeroSection />
          <RatesSection />
          <FeaturesSection />
          <SecuritySection />
          <FAQSection />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;
