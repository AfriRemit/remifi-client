import React, { useState } from 'react';

type Coin = 'Flare' | 'USDT' | 'Select';

const Swap: React.FC = () => {
  const [sendAmount, setSendAmount] = useState<string>('0');
  const [sendCoin] = useState<Coin>('Flare');
  const [receiveCoin] = useState<Coin>('Select');

  const setPercent = (p: number) => {
    // Placeholder: in a real app, use balance to compute
    const base = 100;
    setSendAmount(String(Math.floor((base * p) / 100)));
  };

  return (
    <section className="px-6 py-8">
      <div className="max-w-2xl mx-auto rounded-2xl">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl md:text-2xl font-semibold text-primary">Swap</h2>
          <button
            type="button"
            className="w-9 h-9 rounded-full bg-tertiary hover:bg-quaternary flex items-center justify-center transition-colors duration-200"
            aria-label="Settings"
          >
            <svg className="w-5 h-5 text-primary" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M19.14,12.94a7.43,7.43,0,0,0,.05-.94,7.43,7.43,0,0,0-.05-.94l2.11-1.65a.5.5,0,0,0,.12-.64L19.9,5.27a.5.5,0,0,0-.6-.22l-2.49,1a7.36,7.36,0,0,0-1.63-.94l-.38-2.65A.5.5,0,0,0,14.32,2H9.68a.5.5,0,0,0-.49.42L8.81,5.07a7.36,7.36,0,0,0-1.63.94l-2.49-1a.5.5,0,0,0-.6.22L2.63,8.77a.5.5,0,0,0,.12.64L4.86,11.06a7.43,7.43,0,0,0-.05.94,7.43,7.43,0,0,0,.05.94L2.75,14.59a.5.5,0,0,0-.12.64l1.46,2.5a.5.5,0,0,0,.6.22l2.49-1a7.36,7.36,0,0,0,1.63.94l.38,2.65a.5.5,0,0,0,.49.42h4.64a.5.5,0,0,0,.49-.42l.38-2.65a7.36,7.36,0,0,0,1.63-.94l2.49,1a.5.5,0,0,0,.6-.22l1.46-2.5a.5.5,0,0,0-.12-.64ZM12,15.5A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z"/>
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
                className="bg-transparent outline-none text-4xl font-semibold text-primary w-32"
              />
              <div className="text-sm text-secondary">$0.00</div>
            </div>

            <div className="flex items-center gap-2 bg-tertiary rounded-full px-3 py-1.5 cursor-pointer">
              <img src="/assets/Frame.png" alt="coin" className="w-5 h-5 rounded-full" />
              <span className="text-primary font-medium">{sendCoin}</span>
              <svg className="w-3.5 h-3.5 text-secondary" viewBox="0 0 24 24" fill="currentColor"><path d="M7 10l5 5 5-5H7z"/></svg>
            </div>
          </div>

          <div className="text-right text-sm text-secondary mt-3">Balance: 100 {sendCoin}</div>
        </div>

        {/* switch icon - centered and floating */}
        <div className="flex justify-center">
          <div className="w-10 h-10 bg-tertiary rounded-full flex items-center justify-center hover:bg-quaternary transition-colors duration-200 cursor-pointer">
            <img
              src="/assets/swap-icon.svg"
              alt="swap toggle"
              className="w-5 h-5 dark:invert"
              style={{ filter: 'brightness(0) saturate(100%)' }}
            />
          </div>
        </div>

        {/* Receive card - mirror HeroSection styles */}
        <div className="bg-secondary rounded-xl p-5 space-y-3 -mt-3 border border-white/10">
          <span className="text-sm text-secondary">You receive</span>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-4xl font-semibold text-primary">0</div>
              <div className="text-sm text-secondary">$0.00</div>
            </div>
            {receiveCoin === 'Select' ? (
              <button className="px-4 py-2.5 bg-accent-green text-white rounded-full font-medium hover:bg-accent-green-hover transition-colors duration-200 text-sm">
                Select Coin
              </button>
            ) : (
              <div className="flex items-center gap-2 bg-tertiary rounded-full px-3 py-2">
                <img src="/assets/Tether.png" alt="recv coin" className="w-5 h-5 rounded-full" />
                <span className="text-primary font-medium">{receiveCoin}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Swap;


