import React, { useState } from 'react';
import ThemeToggle from './ThemeToggle';
import Logo from '../assets/Logo.png';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="relative px-6 py-4 bg-secondary">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between">
          {/* Logo and Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <div className="flex items-center space-x-3">
              <img src={Logo} alt="Remifi Logo" className="w-8 h-8" />
              <h1 className="text-2xl font-bold text-primary">Remifi</h1>
            </div>
            
            <nav className="flex items-center space-x-8">
              <a href="#swap" className="text-primary hover:text-accent-green transition-colors duration-200">
                Swap
              </a>
              <a href="#rates" className="text-primary hover:text-accent-green transition-colors duration-200">
                Rates
              </a>
              <a href="#buy" className="text-primary hover:text-accent-green transition-colors duration-200">
                Buy
              </a>
              <a href="#sell" className="text-primary hover:text-accent-green transition-colors duration-200">
                Sell
              </a>
              <a href="#pool" className="text-primary hover:text-accent-green transition-colors duration-200">
                Pool
              </a>
            </nav>
          </div>

          {/* Mobile Logo */}
          <div className="md:hidden flex items-center space-x-3">
            <img src={Logo} alt="Remifi Logo" className="w-8 h-8" />
            <h1 className="text-2xl font-bold text-primary">Remifi</h1>
          </div>

          {/* Desktop Right side actions */}
          <div className="hidden md:flex items-center space-x-4">
            <ThemeToggle />
            <button className="px-6 py-2 bg-accent-green hover:bg-accent-green-hover text-white rounded-full font-medium transition-colors duration-200">
              Connect
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={toggleMenu}
            className="md:hidden p-2 text-primary hover:text-accent-green transition-colors duration-200"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="mt-4 pt-4 border-t border-tertiary md:hidden">
            <div className="space-y-4">
              {/* Mobile Navigation Links */}
              <nav className="space-y-4">
                <a 
                  href="#swap" 
                  className="block text-primary hover:text-accent-green transition-colors duration-200 py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Swap
                </a>
                <a 
                  href="#rates" 
                  className="block text-primary hover:text-accent-green transition-colors duration-200 py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Rates
                </a>
                <a 
                  href="#buy" 
                  className="block text-primary hover:text-accent-green transition-colors duration-200 py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Buy
                </a>
                <a 
                  href="#sell" 
                  className="block text-primary hover:text-accent-green transition-colors duration-200 py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sell
                </a>
                <a 
                  href="#pool" 
                  className="block text-primary hover:text-accent-green transition-colors duration-200 py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Pool
                </a>
              </nav>
              
              {/* Mobile Right side actions */}
              <div className="flex items-center justify-between pt-4 border-t border-tertiary">
                <ThemeToggle />
                <button className="px-6 py-2 bg-accent-green hover:bg-accent-green-hover text-white rounded-full font-medium transition-colors duration-200">
                  Connect
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
