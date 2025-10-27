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
  const [activitiesToShow, setActivitiesToShow] = useState(3);

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
              {/* Desktop Header */}
              <div className="hidden md:grid grid-cols-12 gap-4 p-4 border-b border-white/10 text-xs font-medium text-secondary">
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
                      className="p-4 hover:bg-tertiary/50 transition-colors duration-200 cursor-pointer group"
                    >
                      {/* Mobile Card Layout */}
                      <div className="md:hidden space-y-4">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center space-x-3">
                            <img src={token.icon} alt={token.symbol} className="w-10 h-10 rounded-full" />
                            <div>
                              <div className="font-medium text-primary">{token.symbol}</div>
                              <div className="text-xs text-secondary">{token.name}</div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className={`text-base font-semibold ${isPositive ? 'text-accent-green' : 'text-red-500'}`}>
                              {isPositive ? '+' : ''}{token.change24h.toFixed(2)}%
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <div className="text-xs text-secondary mb-1">Price</div>
                            <div className="font-medium text-primary">${token.price.toFixed(4)}</div>
                          </div>
                          <div className="text-right">
                            <div className="text-xs text-secondary mb-1">Balance</div>
                            <div className="font-medium text-primary">{token.balance.toLocaleString()}</div>
                            <div className="text-xs text-secondary mt-0.5">${(token.balance * token.price).toFixed(2)}</div>
                          </div>
                        </div>

                        <div className="pt-2">
                          <div className="text-xs text-secondary mb-2">24h Price Chart</div>
                          <div style={{ width: '100%', height: '60px' }}>
                            <Line data={getSparklineChart(token.sparklineData, isPositive)} options={sparklineOptions} />
                          </div>
                        </div>
                      </div>

                      {/* Desktop Table Layout */}
                      <div className="hidden md:grid grid-cols-12 gap-4">
                      <div className="col-span-3 flex items-center space-x-3">
                        <img src={token.icon} alt={token.symbol} className="w-8 h-8 rounded-full" />
                        <div>
                          <div className="font-medium text-primary">{token.symbol}</div>
                          <div className="text-xs text-secondary">{token.name}</div>
                        </div>
                      </div>

                      <div className="col-span-2 text-right flex flex-col justify-center">
                        <div className="font-medium text-primary">${token.price.toFixed(4)}</div>
                      </div>

                      <div className="col-span-2 text-right flex flex-col justify-center">
                        <div className={`font-medium ${isPositive ? 'text-accent-green' : 'text-red-500'}`}>
                          {isPositive ? '+' : ''}{token.change24h.toFixed(2)}%
                        </div>
                      </div>

                      <div className="col-span-2 text-right flex flex-col justify-center">
                        <div className="font-medium text-primary">
                          {token.balance.toLocaleString()}
                        </div>
                        <div className="text-xs text-secondary">
                          ${(token.balance * token.price).toFixed(2)}
                        </div>
                      </div>

                      <div className="col-span-3 flex items-center justify-end px-2">
                        <div style={{ width: '100%', height: '50px', maxWidth: '200px' }}>
                          <Line data={getSparklineChart(token.sparklineData, isPositive)} options={sparklineOptions} />
                          </div>
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
            <div className="bg-secondary rounded-xl border border-white/10 overflow-hidden">
              <div className="p-3 md:p-6">
                <h3 className="text-base md:text-lg font-semibold text-primary mb-1">Activity</h3>
                <p className="text-xs md:text-sm text-secondary mb-4 md:mb-6">Track your transaction history and status</p>
                
                <div className="flex items-center gap-1.5 md:gap-2 mb-4 md:mb-6 overflow-x-auto pb-2">
                  {['All', 'Swaps', 'Transfers', 'Liquidity', 'Staking'].map((filter) => (
                    <button
                      key={filter}
                      className="px-3 py-1.5 rounded-lg text-xs md:text-sm font-medium bg-tertiary text-secondary hover:bg-quaternary hover:text-primary transition-colors duration-200 whitespace-nowrap"
                    >
                      {filter}
                    </button>
                  ))}
                </div>

                <div className="space-y-3">
                  {[
                    { network: 'Ethereum', action: 'Swap', fromAmount: '0.24', fromToken: 'ETH', toAmount: '79.91', toToken: 'USDT', usdValue: '$0.239', time: '30s', hash: '0x2A01...9EA9', statusColor: 'text-accent-green' },
                    { network: 'Base', action: 'Swap', fromAmount: '109.41', fromToken: 'DIA', toAmount: '79.91', toToken: 'USDC', usdValue: '$79.91', time: '30s', hash: '0xDc04...d3a1', statusColor: 'text-accent-green' },
                    { network: 'Arbitrum', action: 'Swap', fromAmount: '0.04', fromToken: 'rETH', toAmount: '0.04', toToken: 'ETH', usdValue: '$174.31', time: '30s', hash: '0xae2F...aE13', statusColor: 'text-accent-green' },
                    { network: 'Polygon', action: 'Swap', fromAmount: '505.0K', fromToken: 'TRX', toAmount: '36.29', toToken: 'ETH', usdValue: '$152,686.89', time: '30s', hash: '0x5B43...EFd1', statusColor: 'text-accent-green' },
                    { network: 'OP Mainnet', action: 'Swap', fromAmount: '11.85', fromToken: 'USDC', toAmount: '<0.01', toToken: 'ETH', usdValue: '$11.86', time: '30s', hash: '0xA83E...b111', statusColor: 'text-accent-green' }
                  ].slice(0, activitiesToShow).map((activity, index) => (
                    <div key={index} className="bg-tertiary/50 rounded-lg p-3 md:p-4 border border-white/5 hover:bg-tertiary/70 transition-colors cursor-pointer">
                      <div className="flex items-center justify-between gap-3">
                        {/* Left side - Icon and Transaction info */}
                        <div className="flex items-center gap-2 md:gap-3 flex-1 min-w-0">
                          <div className="w-8 h-8 md:w-10 md:h-10 bg-quaternary rounded-full flex items-center justify-center shrink-0">
                            <span className="text-sm md:text-base">🔄</span>
                          </div>
                          <div className="min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="text-xs md:text-sm font-medium text-primary">{activity.action}</span>
                              <span className={`text-xs ${activity.statusColor} font-medium`}>✓</span>
                            </div>
                            <div className="text-xs text-secondary truncate">
                              {activity.fromAmount} {activity.fromToken} → {activity.toAmount} {activity.toToken}
                            </div>
                          </div>
                        </div>
                        {/* Right side - Value and time */}
                        <div className="text-right shrink-0">
                          <div className="text-xs font-medium text-primary">{activity.usdValue}</div>
                          <div className="text-xs text-secondary">{activity.time}</div>
                        </div>
                      </div>
                      {/* Transaction hash */}
                      <div className="text-xs text-secondary font-mono mt-2 pl-10 md:pl-12 break-all">
                        {activity.hash}
                      </div>
                    </div>
                  ))}
                </div>

                {activitiesToShow < 6 && (
                  <button 
                    onClick={() => setActivitiesToShow(activitiesToShow + 3)}
                    className="w-full mt-6 py-3 text-sm font-medium text-primary bg-tertiary hover:bg-quaternary rounded-lg transition-colors duration-200"
                  >
                    Load More
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TokensActivity;
