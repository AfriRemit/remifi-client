import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import ThemeToggle from './ThemeToggle';

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
            <Link to="/" className="flex items-center space-x-3 focus:outline-none">
              <img src="/assets/Remifi logo.svg" alt="Remifi Logo" className="w-8 h-8" />
              <h1 className="text-2xl font-bold text-primary">Remifi</h1>
            </Link>
            
            <nav className="flex items-center space-x-8">
              <NavLink 
                to="/dashboard"
                className={({ isActive }) => `text-primary hover:text-accent-green transition-colors duration-200 ${isActive ? 'text-accent-green' : ''}`}
              >
                Dashboard
              </NavLink>
              <NavLink 
                to="/swap"
                className={({ isActive }) => `text-primary hover:text-accent-green transition-colors duration-200 ${isActive ? 'text-accent-green' : ''}`}
              >
                Swap
              </NavLink>
              <NavLink 
                to="/buy-sell"
                className={({ isActive }) => `text-primary hover:text-accent-green transition-colors duration-200 ${isActive ? 'text-accent-green' : ''}`}
              >
                Buy/Sell
              </NavLink>
              <NavLink 
                to="/activity"
                className={({ isActive }) => `text-primary hover:text-accent-green transition-colors duration-200 ${isActive ? 'text-accent-green' : ''}`}
              >
                Activity
              </NavLink>
              <NavLink 
                to="/utilities"
                className={({ isActive }) => `text-primary hover:text-accent-green transition-colors duration-200 ${isActive ? 'text-accent-green' : ''}`}
              >
                Utilities
              </NavLink>
            </nav>
          </div>

          {/* Mobile Logo */}
          <Link
            to="/"
            className="md:hidden flex items-center space-x-3 focus:outline-none"
          >
            <img src="/assets/Remifi logo.svg" alt="Remifi Logo" className="w-8 h-8" />
            <h1 className="text-2xl font-bold text-primary">Remifi</h1>
          </Link>

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
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              className="mt-4 pt-4 border-t border-tertiary md:hidden"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div className="space-y-4">
                {/* Mobile Navigation Links */}
                <nav className="space-y-4">
                  <NavLink 
                    to="/dashboard"
                    onClick={() => setIsMenuOpen(false)}
                    className={({ isActive }) => `block text-left w-full text-primary hover:text-accent-green transition-colors duration-200 py-2 ${isActive ? 'text-accent-green' : ''}`}
                  >
                    Dashboard
                  </NavLink>
                  <NavLink 
                    to="/swap"
                    onClick={() => setIsMenuOpen(false)}
                    className={({ isActive }) => `block text-left w-full text-primary hover:text-accent-green transition-colors duration-200 py-2 ${isActive ? 'text-accent-green' : ''}`}
                  >
                    Swap
                  </NavLink>
                  <NavLink 
                    to="/buy-sell"
                    onClick={() => setIsMenuOpen(false)}
                    className={({ isActive }) => `block text-left w-full text-primary hover:text-accent-green transition-colors duration-200 py-2 ${isActive ? 'text-accent-green' : ''}`}
                  >
                    Buy/Sell
                  </NavLink>
                  <NavLink 
                    to="/activity"
                    onClick={() => setIsMenuOpen(false)}
                    className={({ isActive }) => `block text-left w-full text-primary hover:text-accent-green transition-colors duration-200 py-2 ${isActive ? 'text-accent-green' : ''}`}
                  >
                    Activity
                  </NavLink>
                  <NavLink 
                    to="/utilities"
                    onClick={() => setIsMenuOpen(false)}
                    className={({ isActive }) => `block text-left w-full text-primary hover:text-accent-green transition-colors duration-200 py-2 ${isActive ? 'text-accent-green' : ''}`}
                  >
                    Utilities
                  </NavLink>
                </nav>
                
                {/* Mobile Right side actions */}
                <div className="flex items-center justify-between pt-4 border-t border-tertiary">
                  <ThemeToggle />
                  <button className="px-6 py-2 bg-accent-green hover:bg-accent-green-hover text-white rounded-full font-medium transition-colors duration-200">
                    Connect
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Header;
