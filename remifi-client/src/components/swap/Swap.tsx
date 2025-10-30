import React, { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TokenSelect from './TokenSelect';
import type { TokenSymbol } from './tokens';
import { getQuote, MOCK_PRICES_USDT } from './tokens';
import OperationConfirmationModal from '../common/OperationConfirmationModal';

// Legacy Coin type kept for reference; token selection now uses TokenSymbol

const Swap: React.FC = () => {
  const [sendAmount, setSendAmount] = useState<string>('0');
  const [sendCoin, setSendCoin] = useState<TokenSymbol>('FLARE');
  const [receiveCoin, setReceiveCoin] = useState<TokenSymbol>('USDT');
  const [showSettings, setShowSettings] = useState(false);
  const [slippageTolerance, setSlippageTolerance] = useState('0.5');
  const [deadline, setDeadline] = useState('20');

  

  const setPercent = (p: number) => {
    // Placeholder: in a real app, use balance to compute
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

  const canSwap = parsedSend > 0 && sendCoin !== receiveCoin && Number.isFinite(receiveQuote) && (receiveQuote || 0) > 0;
  const disabledReason = parsedSend <= 0
    ? 'Enter amount'
    : sendCoin === receiveCoin
      ? 'Select different tokens'
      : ((receiveQuote || 0) <= 0 ? 'No quote' : '');
  const [showSuccess, setShowSuccess] = useState(false);
  const handleSwap = () => {
    if (!canSwap) return;
    // Placeholder for real swap flow (e.g., wallet tx)
    setShowSuccess(true);
  };

  return (
    <section className="px-6 py-8">
      <motion.div 
        className="max-w-2xl mx-auto rounded-2xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl md:text-2xl font-semibold text-primary">Swap</h2>
          <button
            type="button"
            onClick={() => setShowSettings(true)}
            className="w-9 h-9 rounded-full bg-tertiary hover:bg-quaternary flex items-center justify-center transition-colors duration-200"
            aria-label="Settings"
          >
            <svg className="w-5 h-5 text-primary" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M19.14,12.94a7.43,7.43,0,0,0,.05-.94,7.43,7.43,0,0,0-.05-.94l2.11-1.65a.5.5,0,0,0,.12-.64L19.9,5.27a.5.5,0,0,0-.6-.22l-2.49,1a7.36,7.36,0,0,0-1.63-.94l-.38-2.65A.5.5,0,0,0,14.32,2H9.68a.5.5,0,0,0-.49.42L8.81,5.07a7.36,7.36,0,0,0-1.63.94l-2.49-1a.5.5,0,0,0-.6.22L2.63,8.77ǎa.5.5,0,0,0,.12.64L4.86,11.06a7.43,7.43,0,0,0-.05.94,7.43,7.43,0,0,0,.05.94L2.75,14.59a.5.5,0,0,0-.12.64l1.46,2.5a.5.5,0,0,0,.6.22l2.49-1a7.36,7.36,0,0,0,1.63.94l.38,2.65a.5.5,0,0,0,.49.42h4.64a.5.5,0,0,0,.49-.42l.38-2.65a7.36,7.36,0,0,0,1.63-.94l2.49,1a.5.5,0,0,0,.6-.22l1.46-2.5a.5.5,0,0,0-.12-.64承担责任M12,15.5 nuances.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z"/>
            </svg>
          </button>
        </div>

        {/* Send card - mirror HeroSection styles */}
        <div className="bg-secondary rounded-xl p-5 space-y-3 -mb-6 border border-white/10">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-secondary">You send</span>
            <div className="flex items-center gap-2">
              {[25, 50, 75, 100].map((p) => (
                <button
                  key={p}
                  onClick={() => setPercent(p)}
                  className={`px-3 py-1 rounded-full text-sm transition-colors duration-200 ${
                    p === 100
                      ? 'bg-accent-green text-white'
                      : 'bg-tertiary hover:bg-quaternary text-primary'
                  }`}
                >
                  {p === 100 ? 'Max' : `${p}%`}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <input
                value={sendAmount}
                onChange={(e) => setSendAmount(e.target.value)}
                inputMode="decimal"
                className="bg-transparent outline-none focus:outline-none text-4xl font-semibold text-primary w-32"
              />
              <div className="text-sm text-secondary">${sendUsd.toFixed(2)}</div>
            </div>

            <TokenSelect symbol={sendCoin} onChange={setSendCoin} />
          </div>

          <div className="text-right text-sm text-secondary mt-3">Balance: 100 {sendCoin}</div>
        </div>

        {/* switch icon - centered and floating */}
        <div className="flex justify-center">
          <motion.button
            type="button"
            onClick={toggleTokens}
            aria-label="Switch tokens"
            className="w-10 h-10 bg-tertiary rounded-full flex items-center justify-center hover:bg-quaternary transition-colors duration-200 cursor-pointer"
            whileHover={{ rotate: 180, scale: 1.1 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <img
              src="/assets/swap-icon.svg"
              alt="swap toggle"
              className="w-5 h-5 filter brightness-0 dark:invert"
            />
          </motion.button>
        </div>

        {/* Receive card - mirror HeroSection styles */}
        <div className="bg-secondary rounded-xl p-5 space-y-3 -mt-3 border border-white/10">
          <span className="text-sm text-secondary">You receive</span>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-4xl font-semibold text-primary">{receiveQuote ? receiveQuote.toFixed(2) : 0}</div>
              <div className="text-sm text-secondary">${receiveUsd.toFixed(2)}</div>
            </div>
            <TokenSelect symbol={receiveCoin} onChange={setReceiveCoin} />
          </div>
        </div>

        {/* Swap button */}
        <div className="mt-6">
          <motion.button
            type="button"
            onClick={handleSwap}
            disabled={!canSwap}
            className={`w-full px-6 py-4 rounded-2xl text-lg font-semibold shadow-lg transition-colors duration-200 ${
              canSwap
                ? 'bg-accent-green text-white hover:bg-accent-green-hover'
                : 'bg-tertiary text-secondary cursor-not-allowed'
            }`}
            title={canSwap ? 'Swap' : disabledReason}
            aria-disabled={!canSwap}
            whileHover={canSwap ? { scale: 1.02 } : {}}
            whileTap={canSwap ? { scale: 0.98 } : {}}
          >
            {canSwap ? 'Swap' : disabledReason}
          </motion.button>
        </div>

        {/* Settings Modal */}
        <AnimatePresence>
          {showSettings && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setShowSettings(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-secondary rounded-2xl p-6 max-w-md w-full border border-white/10"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold text-primary">Transaction Settings</h3>
                  <button
                    onClick={() => setShowSettings(false)}
                    className="w-8 h-8 rounded-full bg-tertiary hover:bg-quaternary flex items-center justify-center transition-colors"
                  >
                    <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                {/* Slippage Tolerance */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-primary">Slippage tolerance</span>
                    <span className="text-sm text-secondary">{slippageTolerance}%</span>
                  </div>
                  <div className="flex gap-2">
                    {['0.1', '0.5', '1.0', '3.0'].map((value) => (
                      <button
                        key={value}
                        onClick={() => setSlippageTolerance(value)}
                        className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                          slippageTolerance === value
                            ? 'bg-accent-green text-white'
                            : 'bg-tertiary text-primary hover:bg-quaternary'
                        }`}
                      >
                        {value}%
                      </button>
                    ))}
                  </div>
                  <input
                    type="number"
                    value={slippageTolerance}
                    onChange={(e) => setSlippageTolerance(e.target.value)}
                    className="w-full px-3 py-2 bg-tertiary border border-white/10 rounded-lg text-primary text-sm outline-none focus:border-accent-green"
                    placeholder="Custom"
                    min="0.1"
                    max="50"
                    step="0.1"
                  />
                  <p className="text-xs text-secondary">
                    {Number.parseFloat(slippageTolerance) < 0.5 && "⚠️ Your transaction may fail"}
                    {Number.parseFloat(slippageTolerance) >= 5 && "⚠️ Your transaction may be frontrun"}
                  </p>
                </div>

                {/* Transaction Deadline */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-primary">Transaction deadline</span>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        value={deadline}
                        onChange={(e) => setDeadline(e.target.value)}
                        className="w-16 px-2 py-1 bg-tertiary border border-white/10 rounded text-primary text-sm outline-none focus:border-accent-green"
                        min="1"
                        max="4320"
                      />
                      <span className="text-sm text-secondary">minutes</span>
                    </div>
                  </div>
                  <p className="text-xs text-secondary">Your transaction will revert if it is pending for more than this period of time.</p>
                </div>

                {/* Save Button */}
                <button
                  onClick={() => setShowSettings(false)}
                  className="w-full mt-6 py-3 bg-accent-green text-white rounded-lg font-medium hover:bg-accent-green-hover transition-colors"
                >
                  Save Settings
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
      <OperationConfirmationModal
        isOpen={showSuccess}
        onClose={() => setShowSuccess(false)}
        title="Transaction confirmed"
        message={
          <>
            You've successfully swapped <span className="text-accent-green font-semibold">{parsedSend} {sendCoin}</span> for approximately <span className="text-accent-green font-semibold">{(receiveQuote || 0).toFixed(2)} {receiveCoin}</span>. Your wallet has been updated.
          </>
        }
        ctaLabel="Close"
      />
    </section>
  );
};

export default Swap;


