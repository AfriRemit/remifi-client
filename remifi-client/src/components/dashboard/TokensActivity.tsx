import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler
);

interface Token {
  symbol: string;
  name: string;
  price: number;
  change24h: number;
  volume24h: number;
  balance: number;
  icon: string;
  sparklineData: number[];
}

const TokensActivity: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'tokens' | 'activity'>('tokens');

  const tokens: Token[] = [
   
    { 
      symbol: 'NGN', 
      name: 'Nigerian Naira', 
      price: 0.00076, 
      change24h: -1.23, 
      volume24h: 450000, 
      balance: 750, 
      icon: '/assets/ngn.svg',
      sparklineData: [0.00078, 0.00076, 0.00075, 0.00074, 0.00076, 0.00077, 0.00076, 0.00075, 0.00076, 0.00077, 0.00076, 0.00075, 0.00074, 0.00076, 0.00076]
    },
    { 
      symbol: 'GHS', 
      name: 'Ghanaian Cedi', 
      price: 0.064, 
      change24h: 0.85, 
      volume24h: 320000, 
      balance: 450, 
      icon: '/assets/ghs.svg',
      sparklineData: [0.063, 0.064, 0.065, 0.064, 0.063, 0.064, 0.065, 0.064, 0.063, 0.064, 0.065, 0.064, 0.063, 0.064, 0.064]
    },
    { 
      symbol: 'KES', 
      name: 'Kenyan Shilling', 
      price: 0.0078, 
      change24h: -0.45, 
      volume24h: 280000, 
      balance: 300, 
      icon: '/assets/kes.svg',
      sparklineData: [0.0079, 0.0078, 0.0077, 0.0078, 0.0079, 0.0078, 0.0077, 0.0078, 0.0079, 0.0078, 0.0077, 0.0078, 0.0079, 0.0078, 0.0078]
    },
    
  ];

  const getSparklineChart = (data: number[], isPositive: boolean) => ({
    labels: data.map(() => ''),
    datasets: [
      {
        label: 'Price',
        data: data,
        borderColor: isPositive ? 'rgb(16, 185, 129)' : 'rgb(239, 68, 68)',
        backgroundColor: (context: any) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 50);
          if (isPositive) {
            gradient.addColorStop(0, 'rgba(16, 185, 129, 0.2)');
            gradient.addColorStop(1, 'rgba(16, 185, 129, 0)');
          } else {
            gradient.addColorStop(0, 'rgba(239, 68, 68, 0.2)');
            gradient.addColorStop(1, 'rgba(239, 68, 68, 0)');
          }
          return gradient;
        },
        fill: true,
        tension: 0.5,
        pointRadius: 0,
        borderWidth: 2,
        borderJoinStyle: 'round' as const,
        borderCapStyle: 'round' as const,
      }
    ]
  });

  const sparklineOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { tooltip: { enabled: false }, legend: { display: false } },
    scales: {
      x: { display: false, grid: { display: false } },
      y: { display: false, grid: { display: false } }
    },
    interaction: {
      intersect: false,
      mode: 'index' as const
    },
    elements: {
      point: {
        radius: 0
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Tabs */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => setActiveTab('tokens')}
          className={`px-5 py-2 rounded-full text-sm font-medium transition-colors duration-200 focus:outline-none hover:bg-tertiary ${
            activeTab === 'tokens' ? 'bg-tertiary text-primary' : 'text-secondary'
          }`}
        >
          Tokens
        </button>
        <button
          onClick={() => setActiveTab('activity')}
          className={`px-5 py-2 rounded-full text-sm font-medium transition-colors duration-200 focus:outline-none hover:bg-tertiary ${
            activeTab === 'activity' ? 'bg-tertiary text-primary' : 'text-secondary'
          }`}
        >
          Activity
        </button>
      </div>

      {/* Content */}
      <AnimatePresence mode="wait">
        {activeTab === 'tokens' ? (
          <motion.div
            key="tokens"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            <div className="bg-secondary rounded-xl border border-white/10 overflow-hidden">
              {/* Header */}
              <div className="grid grid-cols-12 gap-4 p-4 border-b border-white/10 text-xs font-medium text-secondary">
                <div className="col-span-3">Asset</div>
                <div className="col-span-2 text-right">Price</div>
                <div className="col-span-2 text-right">24h Change</div>
                <div className="col-span-2 text-right">Balance</div>
                <div className="col-span-3 text-right">24h Price Chart</div>
              </div>

              {/* Token List */}
              <div className="divide-y divide-white/10">
                {tokens.map((token, index) => {
                  const isPositive = token.change24h >= 0;
                  return (
                    <motion.div
                      key={token.symbol}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="grid grid-cols-12 gap-4 p-4 hover:bg-tertiary/50 transition-colors duration-200 cursor-pointer group"
                    >
                      {/* Asset */}
                      <div className="col-span-3 flex items-center space-x-3">
                        <img src={token.icon} alt={token.symbol} className="w-8 h-8 rounded-full" />
                        <div>
                          <div className="font-medium text-primary">{token.symbol}</div>
                          <div className="text-xs text-secondary">{token.name}</div>
                        </div>
                      </div>

                      {/* Price */}
                      <div className="col-span-2 text-right flex flex-col justify-center">
                        <div className="font-medium text-primary">${token.price.toFixed(4)}</div>
                      </div>

                      {/* 24h Change */}
                      <div className="col-span-2 text-right flex flex-col justify-center">
                        <div className={`font-medium ${isPositive ? 'text-accent-green' : 'text-red-500'}`}>
                          {isPositive ? '+' : ''}{token.change24h.toFixed(2)}%
                        </div>
                      </div>

                      {/* Balance */}
                      <div className="col-span-2 text-right flex flex-col justify-center">
                        <div className="font-medium text-primary">
                          {token.balance.toLocaleString()}
                        </div>
                        <div className="text-xs text-secondary">
                          ${(token.balance * token.price).toFixed(2)}
                        </div>
                      </div>

                      {/* Sparkline Chart */}
                      <div className="col-span-3 flex items-center justify-end px-2">
                        <div style={{ width: '100%', height: '50px', maxWidth: '200px' }}>
                          <Line data={getSparklineChart(token.sparklineData, isPositive)} options={sparklineOptions} />
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="activity"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            <div className="bg-secondary rounded-xl p-8 text-center border border-white/10">
              <p className="text-secondary">No recent activity</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TokensActivity;
