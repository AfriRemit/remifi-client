import React, { useState } from 'react';
import ThemeToggle from './ThemeToggle';

interface HeaderProps {
  currentPage?: 'home' | 'dashboard' | 'swap' | 'activity';
  onPageChange?: (page: 'home' | 'dashboard' | 'swap' | 'activity') => void;
}

const Header: React.FC<HeaderProps> = ({ currentPage = 'home', onPageChange }) => {
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
            <button
              type="button"
              onClick={() => onPageChange?.('home')}
              className="flex items-center space-x-3 focus:outline-none"
            >
              <img src="/assets/Logo.png" alt="Remifi Logo" className="w-8 h-8" />
              <h1 className="text-2xl font-bold text-primary">Remifi</h1>
            </button>
            
            <nav className="flex items-center space-x-8">
              <button 
                onClick={() => {
                  console.log('Dashboard clicked');
                  onPageChange?.('dashboard');
                }}
                className={`text-primary hover:text-accent-green transition-colors duration-200 ${
                  currentPage === 'dashboard' ? 'text-accent-green' : ''
                }`}
              >
                Dashboard
              </button>
              <button 
                onClick={() => {
                  console.log('Swap clicked');
                  onPageChange?.('swap');
                }}
                className={`text-primary hover:text-accent-green transition-colors duration-200 ${
                  currentPage === 'swap' ? 'text-accent-green' : ''
                }`}
              >
                Swap
              </button>
              <button 
                onClick={() => {
                  console.log('Activity clicked');
                  onPageChange?.('activity');
                }}
                className={`text-primary hover:text-accent-green transition-colors duration-200 ${
                  currentPage === 'activity' ? 'text-accent-green' : ''
                }`}
              >
                Activity
              </button>
            </nav>
          </div>

          {/* Mobile Logo */}
          <button
            type="button"
            onClick={() => onPageChange?.('home')}
            className="md:hidden flex items-center space-x-3 focus:outline-none"
          >
            <img src="/assets/Logo.png" alt="Remifi Logo" className="w-8 h-8" />
            <h1 className="text-2xl font-bold text-primary">Remifi</h1>
          </button>

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
                <button 
                  onClick={() => {
                    console.log('Dashboard clicked (mobile)');
                    onPageChange?.('dashboard');
                    setIsMenuOpen(false);
                  }}
                  className={`block text-left w-full text-primary hover:text-accent-green transition-colors duration-200 py-2 ${
                    currentPage === 'dashboard' ? 'text-accent-green' : ''
                  }`}
                >
                  Dashboard
                </button>
                <button 
                  onClick={() => {
                    console.log('Swap clicked (mobile)');
                    onPageChange?.('swap');
                    setIsMenuOpen(false);
                  }}
                  className={`block text-left w-full text-primary hover:text-accent-green transition-colors duration-200 py-2 ${
                    currentPage === 'swap' ? 'text-accent-green' : ''
                  }`}
                >
                  Swap
                </button>
                <button 
                  onClick={() => {
                    console.log('Activity clicked (mobile)');
                    onPageChange?.('activity');
                    setIsMenuOpen(false);
                  }}
                  className={`block text-left w-full text-primary hover:text-accent-green transition-colors duration-200 py-2 ${
                    currentPage === 'activity' ? 'text-accent-green' : ''
                  }`}
                >
                  Activity
                </button>
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
