import React from 'react';
import { motion } from 'framer-motion';
const NGNFlag = '/assets/ngn.svg';
const KESFlag = '/assets/kes.svg';
const GHSFlag = '/assets/ghs.svg';
const ZARFlag = '/assets/zar.svg';

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
                    {currency.symbol}&nbsp;{currency.rate}
                  </div>
                  <div className={`text-sm flex items-center justify-end space-x-1 ${
                    currency.change > 0 ? 'text-accent-green' : 'text-accent-red'
                  }`}>
                    {currency.change > 0 ? (
                      <img src="/assets/gain.svg" alt="gain" className="w-4 h-4" />
                    ) : (
                      <img src="/assets/loss.svg" alt="loss" className="w-4 h-4" />
                    )}
                    <span>{Math.abs(currency.change)}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Content */}
        <motion.div 
          className="space-y-6"
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl lg:text-4xl font-semibold text-primary leading-tight tracking-tight">
            Know Your Rates in Real-Time
          </h2>
          <p className="text-lg text-secondary leading-relaxed">
            Always updated, always transparent. Track cNGN, cKES, USDT and more before you swap.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default RatesSection;
