import React from 'react';
import NGNFlag from '../assets/ngn.png';
import KESFlag from '../assets/kes.png';
import GHSFlag from '../assets/ghs.png';
import ZARFlag from '../assets/zar.png';

interface CurrencyRate {
  country: string;
  code: string;
  symbol: string;
  rate: string;
  change: number;
  flag: string;
  flagImage: string;
}

const RatesSection: React.FC = () => {
  const currencies: CurrencyRate[] = [
    {
      country: 'Nigerian Naira',
      code: 'NGN',
      symbol: '₦',
      rate: '1,310.00',
      change: 0.5,
      flag: 'NG',
      flagImage: NGNFlag
    },
    {
      country: 'Kenyan Shilling',
      code: 'KES',
      symbol: 'KSh',
      rate: '128.00',
      change: -0.2,
      flag: 'KE',
      flagImage: KESFlag
    },
    {
      country: 'Ghanaian Cedi',
      code: 'GHS',
      symbol: 'GH₵',
      rate: '15.7',
      change: 1.2,
      flag: 'GH',
      flagImage: GHSFlag
    },
    {
      country: 'South African Rand',
      code: 'ZAR',
      symbol: 'R',
      rate: '18.3',
      change: -0.4,
      flag: 'ZA',
      flagImage: ZARFlag
    }
  ];

  return (
    <section className="px-6 py-16 bg-primary">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Content - Rates Card */}
        <div className="bg-secondary rounded-2xl p-6">
          <h3 className="text-xl font-bold text-primary mb-6">Current Rates</h3>
          <div className="space-y-4">
            {currencies.map((currency, index) => (
              <div key={index} className="flex items-center justify-between py-3">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full overflow-hidden flex items-center justify-center">
                    <img 
                      src={currency.flagImage} 
                      alt={`${currency.country} flag`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="text-primary font-medium">{currency.country}</div>
                    <div className="text-sm text-secondary">{currency.code}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-primary font-bold">
                    {currency.symbol}{currency.rate}
                  </div>
                  <div className={`text-sm flex items-center justify-end space-x-1 ${
                    currency.change > 0 ? 'text-accent-green' : 'text-accent-red'
                  }`}>
                    {currency.change > 0 ? (
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                      </svg>
                    ) : (
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 10.293a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l4.293-4.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                    <span>{Math.abs(currency.change)}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Content */}
        <div className="space-y-6">
          <h2 className="text-4xl lg:text-5xl font-medium text-primary leading-tight">
            Know Your Rates in Real-Time
          </h2>
          <p className="text-xl text-secondary leading-relaxed">
            Always updated, always transparent. Track cNGN, cKES, USDT and more before you swap.
          </p>
        </div>
      </div>
    </section>
  );
};

export default RatesSection;
