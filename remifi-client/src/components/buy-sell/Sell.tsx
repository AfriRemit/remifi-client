import React, { useMemo, useState } from 'react';
import TokenSelect from '../swap/TokenSelect';
import CountrySelect, { type CountryCode, COUNTRIES } from './CountrySelect';
import TransactionConfirmationModal from './TransactionConfirmationModal';
import type { TokenSymbol } from '../swap/tokens';
import { getQuote, MOCK_PRICES_USDT } from '../swap/tokens';

interface SellProps {}

const Sell: React.FC<SellProps> = () => {
  const [amount, setAmount] = useState<string>('0');
  const [stablecoin, setStablecoin] = useState<TokenSymbol>('USDT');
  const [country, setCountry] = useState<CountryCode>('NG');
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showBankTransferModal, setShowBankTransferModal] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  // Get currency from country
  const currency = COUNTRIES[country].currency as TokenSymbol;

  const setPercent = (p: number) => {
    const base = 1000; // Mock stablecoin balance
    setAmount(String(Math.floor((base * p) / 100)));
  };

  const parsedAmount = useMemo(() => Number.parseFloat(amount || '0') || 0, [amount]);
  const receiveQuote = useMemo(() => getQuote(parsedAmount, stablecoin, currency), [parsedAmount, stablecoin, currency]);
  
  const exchangeRate = useMemo(() => {
    if (parsedAmount <= 0) return 0;
    return receiveQuote / parsedAmount;
  }, [parsedAmount, receiveQuote]);

  const canProceed = parsedAmount > 0 && currency !== stablecoin && Number.isFinite(receiveQuote) && (receiveQuote || 0) > 0;

  const handleProceed = () => {
    if (!canProceed) return;
    setShowPaymentModal(true);
  };

  const handlePaymentMethodSelect = (method: string) => {
    setShowPaymentModal(false);
    if (method === 'bank-transfer') {
      setShowBankTransferModal(true);
    } else if (method === 'momo-agent') {
      // Handle momo agent payment
      setShowConfirmationModal(true);
    }
  };

  const handleBankTransferConfirm = () => {
    setShowBankTransferModal(false);
    setShowConfirmationModal(true);
  };

  const handleGoToDashboard = () => {
    setShowConfirmationModal(false);
    // Navigate to dashboard
    window.location.href = '/dashboard';
  };

  return (
    <div>
      {/* Main card */}
      <div className="bg-secondary rounded-xl p-6 space-y-6 border border-white/10">
          <p className="text-sm text-secondary text-left">
            Real-time rates powered by AfricaDex Oracle Feed.
          </p>

          {/* You are selling section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-secondary">You are selling</span>
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
              <div className="flex-1">
                <input
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  inputMode="decimal"
                  className="bg-transparent outline-none focus:outline-none text-4xl font-semibold text-primary w-full"
                  placeholder="0"
                />
                <div className="text-sm text-secondary mt-2">
                  Balance: {stablecoin} {Number(1000).toLocaleString()}
                </div>
              </div>
              <TokenSelect symbol={stablecoin} onChange={setStablecoin} />
            </div>

            <div className="text-sm text-secondary">
              1 {stablecoin} ≈ {exchangeRate.toFixed(2)} {currency}
            </div>
          </div>

          {/* Country selection */}
          <div className="space-y-2">
            <span className="text-sm text-secondary">Select your country</span>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img src={COUNTRIES[country].icon} alt={COUNTRIES[country].name} className="w-6 h-6" />
                <span className="text-primary font-medium">{COUNTRIES[country].name}</span>
              </div>
              <CountrySelect country={country} onChange={setCountry} />
            </div>
          </div>

          {/* You will receive */}
          <div className="bg-tertiary rounded-xl p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-secondary">You will receive</span>
              <div className="text-right">
                <div className="text-2xl font-semibold text-primary">
                  {receiveQuote ? receiveQuote.toFixed(2) : '0'} {currency}
                </div>
                <div className="text-sm text-secondary">
                  ≈ ${((receiveQuote || 0) * (MOCK_PRICES_USDT[currency] || 0)).toFixed(2)}
                </div>
              </div>
            </div>
          </div>

          {/* Proceed button */}
          <button
            type="button"
            onClick={handleProceed}
            disabled={!canProceed}
            className={`w-full px-6 py-4 rounded-2xl text-lg font-semibold shadow-lg transition-colors duration-200 ${
              canProceed
                ? 'bg-accent-green text-white hover:bg-accent-green-hover'
                : 'bg-tertiary text-secondary cursor-not-allowed'
            }`}
          >
            Proceed
          </button>
        </div>

        {/* Payment Method Selection Modal */}
        {showPaymentModal && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-secondary/95 backdrop-blur-md rounded-2xl p-6 w-full max-w-md mx-4 border border-white/10 shadow-2xl">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-primary">Select how you want to receive</h3>
                <button
                  onClick={() => setShowPaymentModal(false)}
                  className="text-secondary hover:text-primary"
                >
                  ✕
                </button>
              </div>
              
              <p className="text-sm text-secondary mb-6">
                We'll process your transaction instantly and send the funds to your selected method.
              </p>

              <div className="space-y-3">
                <button
                  onClick={() => handlePaymentMethodSelect('momo-agent')}
                  className="w-full flex items-center gap-3 p-4 bg-tertiary rounded-xl hover:bg-quaternary transition-colors"
                >
                  <div className="w-8 h-8 bg-accent-green rounded-full flex items-center justify-center">
                    📱
                  </div>
                  <span className="text-primary font-medium">Momo Agent</span>
                </button>

                <button
                  onClick={() => handlePaymentMethodSelect('bank-transfer')}
                  className="w-full flex items-center gap-3 p-4 bg-tertiary rounded-xl hover:bg-quaternary transition-colors"
                >
                  <div className="w-8 h-8 bg-accent-green rounded-full flex items-center justify-center">
                    🏦
                  </div>
                  <span className="text-primary font-medium">Bank Transfer</span>
                </button>
              </div>

              <button
                onClick={() => setShowPaymentModal(false)}
                className="w-full mt-6 px-6 py-3 bg-accent-green text-white rounded-xl font-semibold hover:bg-accent-green-hover transition-colors"
              >
                Continue to Payment
              </button>
            </div>
          </div>
        )}

        {/* Bank Transfer Modal */}
        {showBankTransferModal && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-secondary/95 backdrop-blur-md rounded-2xl p-6 w-full max-w-md mx-4 border border-white/10 shadow-2xl">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-primary">Receive via Bank Transfer</h3>
                <button
                  onClick={() => setShowBankTransferModal(false)}
                  className="text-secondary hover:text-primary"
                >
                  ✕
                </button>
              </div>
              
              <p className="text-sm text-secondary mb-6">
                We'll transfer <span className="text-accent-green font-semibold">{currency} {Number(receiveQuote || 0).toLocaleString()}</span> to your bank account. The transfer will be processed within 24 hours.
              </p>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-secondary">Amount:</span>
                  <span className="text-accent-green font-medium">{currency} {Number(receiveQuote || 0).toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-secondary">Processing Time:</span>
                  <span className="text-accent-green font-medium">24 hours</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-secondary">Fee:</span>
                  <span className="text-accent-green font-medium">Free</span>
                </div>
              </div>

              <button
                onClick={handleBankTransferConfirm}
                className="w-full px-6 py-3 bg-accent-green text-white rounded-xl font-semibold hover:bg-accent-green-hover transition-colors"
              >
                Confirm Transfer
              </button>
            </div>
          </div>
        )}

        {/* Transaction Confirmation Modal */}
        <TransactionConfirmationModal
          isOpen={showConfirmationModal}
          onClose={handleGoToDashboard}
          transactionType="sell"
          amount={parsedAmount}
          fromCurrency={stablecoin}
          toCurrency={currency}
          toAmount={receiveQuote || 0}
        />
    </div>
  );
};

export default Sell;
