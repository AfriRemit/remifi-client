import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import TokenSelect from '../swap/TokenSelect';
import type { TokenSymbol } from '../swap/tokens';
import { getQuote, MOCK_PRICES_USDT } from '../swap/tokens';

const SwapIcon = '/assets/swap-icon.svg';
const NGNFlag = '/assets/ngn.svg';
const GHSFlag = '/assets/ghs.svg';
const KESFlag = '/assets/kes.svg';
const ZARFlag = '/assets/zar.svg';

const HeroSection: React.FC = () => {
  const [sendAmount, setSendAmount] = useState<string>('0');
  const [sendCoin, setSendCoin] = useState<TokenSymbol>('FLARE');
  const [receiveCoin, setReceiveCoin] = useState<TokenSymbol>('USDT');

  const setPercent = (p: number) => {
    const base = 100;
    setSendAmount(String(Math.floor((base * p) / 100)));
  };

  const parsedSend = useMemo(() => Number.parseFloat(sendAmount || '0') || 0, [sendAmount]);
  const receiveQuote = useMemo(() => getQuote(parsedSend, sendCoin, receiveCoin), [parsedSend, sendCoin, receiveCoin]);
  const sendUsd = useMemo(() => {
    const price = MOCK_PRICES_USDT[sendCoin] ?? 0;
    const usd = parsedSend * price;
    return Number.isFinite(usd) ? usd : 0;
  }, [parsedSend, sendCoin]);
  const receiveUsd = useMemo(() => {
    const price = MOCK_PRICES_USDT[receiveCoin] ?? 0;
    const usd = (receiveQuote || 0) * price;
    return Number.isFinite(usd) ? usd : 0;
  }, [receiveQuote, receiveCoin]);

  const toggleTokens = () => {
    const prevSend = sendCoin;
    const prevReceive = receiveCoin;
    const nextSendAmount = receiveQuote && Number.isFinite(receiveQuote) ? String(Number(receiveQuote.toFixed(6))) : sendAmount;
    setSendCoin(prevReceive);
    setReceiveCoin(prevSend);
    setSendAmount(nextSendAmount);
  };

  return (
    <section className="relative px-6 py-16 bg-primary overflow-hidden">
      {/* Background gradient effects */}
      <div className="absolute top-80 right-0 md:top-0 w-48 h-48 md:w-96 md:h-96 bg-gradient-radial from-red-500/20 via-orange-500/20 to-transparent rounded-full blur-3xl"></div>
      <div className="absolute top-96 right-20 md:top-20 w-32 h-32 md:w-64 md:h-64 bg-gradient-radial from-green-500/20 via-blue-500/20 to-transparent rounded-full blur-2xl"></div>
      

      <div className="relative max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center z-10">
        {/* Left Content */}
        <motion.div 
          className="space-y-8"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="space-y-4">
            <h1 className="text-5xl lg:text-6xl font-medium text-primary leading-tight">
              Swap stablecoins instantly
            </h1>
            <p className="text-xl text-secondary">
              Fast, low-fee swaps for every stablecoin
            </p>
          </div>
          
          <div className="space-y-4">
            <p className="text-lg text-secondary">Trusted by communities in</p>
            <div className="flex items-center">
              {/* Horizontally stacked flags with hover expansion */}
              <motion.div 
                className="flex items-center space-x-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                <motion.img 
                  src={NGNFlag} 
                  alt="Nigeria" 
                  className="w-12 h-12 rounded-full object-cover border border-white/40 shadow-lg cursor-pointer"
                  whileHover={{ scale: 1.2, y: -5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                />
                <motion.img 
                  src={GHSFlag} 
                  alt="Ghana" 
                  className="w-12 h-12 rounded-full object-cover border border-white/40 shadow-lg cursor-pointer"
                  whileHover={{ scale: 1.2, y: -5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                />
                <motion.img 
                  src={KESFlag} 
                  alt="Kenya" 
                  className="w-12 h-12 rounded-full object-cover border border-white/40 shadow-lg cursor-pointer"
                  whileHover={{ scale: 1.2, y: -5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                />
                <motion.img 
                  src={ZARFlag} 
                  alt="South Africa" 
                  className="w-12 h-12 rounded-full object-cover border border-white/40 shadow-lg cursor-pointer"
                  whileHover={{ scale: 1.2, y: -5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                />
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Right Content - Swap Widget */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* You Send Section */}
          <div className="bg-secondary rounded-2xl p-6 space-y-3 -mb-7">
            <div className="flex items-center justify-between">
              <span className="text-sm text-secondary">You send</span>
              <div className="flex space-x-2">
                <button 
                  onClick={() => setPercent(25)}
                  className="px-3 py-1 bg-tertiary hover:bg-quaternary text-primary text-sm rounded-full transition-colors duration-200"
                >
                  25%
                </button>
                <button 
                  onClick={() => setPercent(50)}
                  className="px-3 py-1 bg-tertiary hover:bg-quaternary text-primary text-sm rounded-full transition-colors duration-200"
                >
                  50%
                </button>
                <button 
                  onClick={() => setPercent(75)}
                  className="px-3 py-1 bg-tertiary hover:bg-quaternary text-primary text-sm rounded-full transition-colors duration-200"
                >
                  75%
                </button>
                <button 
                  onClick={() => setPercent(100)}
                  className="px-3 py-1 bg-accent-green text-white text-sm rounded-full transition-colors duration-200"
                >
                  Max
                </button>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <input
                  value={sendAmount}
                  onChange={(e) => setSendAmount(e.target.value)}
                  inputMode="decimal"
                  className="bg-transparent outline-none focus:outline-none text-3xl font-bold text-primary w-32"
                />
                <div className="text-sm text-secondary">${sendUsd.toFixed(2)}</div>
              </div>
              <TokenSelect symbol={sendCoin} onChange={setSendCoin} />
            </div>
          </div>

          {/* Swap Toggle Icon - Floating between sections */}
          <div className="flex justify-center">
            <motion.button
              onClick={toggleTokens}
              className="w-12 h-12 bg-tertiary rounded-full flex items-center justify-center hover:bg-quaternary transition-colors duration-200 cursor-pointer"
              whileHover={{ rotate: 180, scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <img 
                src={SwapIcon} 
                alt="Swap toggle" 
                className="w-6 h-6 filter brightness-0 dark:invert"
              />
            </motion.button>
          </div>

          {/* You Receive Section */}
          <div className="bg-secondary rounded-2xl p-6 space-y-3 -mt-4">
            <span className="text-sm text-secondary">You receive</span>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold text-primary">{receiveQuote ? receiveQuote.toFixed(2) : '0'}</div>
                <div className="text-sm text-secondary">${receiveUsd.toFixed(2)}</div>
              </div>
              <TokenSelect symbol={receiveCoin} onChange={setReceiveCoin} />
            </div>
          </div>

          {/* Connect Wallet Button */}
          <motion.button 
            className="w-full py-4 mt-4 text-accent-green rounded-full font-medium transition-colors duration-200 border-2 border-accent-green hover:bg-accent-green hover:text-white"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Connect Wallet
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
