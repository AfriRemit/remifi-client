import { useState } from 'react';
import { motion } from 'framer-motion';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

type TimeRange = '1D' | '7D' | '30D' | '1Y' | 'ALL';

const PortfolioChart: React.FC = () => {
  const [timeRange, setTimeRange] = useState<TimeRange>('30D');
  
  const portfolioData = {
    current: 3000.00,
    change24h: 45.50,
    change7d: 120.00,
    change30d: 350.00,
    change30dPercent: 12.5,
    totalAssets: 5
  };

  const timeRanges: TimeRange[] = ['1D', '7D', '30D', '1Y', 'ALL'];

  const getDataForRange = (range: TimeRange) => {
    switch (range) {
      case '1D':
        return {
          labels: ['12AM', '4AM', '8AM', '12PM', '4PM', '8PM'],
          data: [2950, 2980, 3000, 3020, 3010, 3000]
        };
      case '7D':
        return {
          labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          data: [2900, 2950, 2980, 3000, 3010, 2990, 3000]
        };
      case '30D':
        return {
          labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
          data: [2650, 2800, 2950, 3000]
        };
      case '1Y':
        return {
          labels: ['Q1', 'Q2', 'Q3', 'Q4'],
          data: [2000, 2400, 2800, 3000]
        };
      default:
        return {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
          data: [2000, 2100, 2250, 2400, 2350, 2500, 2800, 3000]
        };
    }
  };

  const chartData = getDataForRange(timeRange);

  const data = {
    labels: chartData.labels,
    datasets: [
      {
        label: 'Portfolio Value',
        data: chartData.data,
        borderColor: 'rgb(16, 185, 129)',
        backgroundColor: (context: any) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 200);
          gradient.addColorStop(0, 'rgba(16, 185, 129, 0.2)');
          gradient.addColorStop(1, 'rgba(16, 185, 129, 0)');
          return gradient;
        },
        tension: 0.4,
        fill: true,
        pointRadius: 0,
        pointHoverRadius: 6,
        pointHoverBorderWidth: 2,
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        mode: 'index' as const,
        intersect: false,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        padding: 12,
        displayColors: false,
        callbacks: {
          label: function(context: any) {
            return `$${context.parsed.y.toLocaleString()}`;
          }
        }
      }
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: 'rgb(156, 163, 175)',
          font: {
            size: 11
          }
        }
      },
      y: {
        grid: {
          color: 'rgba(255, 255, 255, 0.05)',
          drawBorder: false,
        },
        ticks: {
          color: 'rgb(156, 163, 175)',
          font: {
            size: 11
          },
          callback: function(value: any) {
            return '$' + value.toLocaleString();
          }
        }
      }
    },
    interaction: {
      mode: 'nearest' as const,
      axis: 'x' as const,
      intersect: false
    }
  };

  return (
    <motion.div 
      className="bg-secondary rounded-xl p-4 md:p-6 border border-white/10"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <div className="mb-4 md:mb-6">
        <div>
          <h3 className="text-sm md:text-lg font-semibold text-primary mb-1.5 md:mb-2">Portfolio Value</h3>
          <p className="text-xl md:text-3xl font-bold text-primary">${portfolioData.current.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
          <div className="flex items-center gap-1.5 md:gap-2 mt-1 flex-wrap">
            <p className="text-xs md:text-sm text-accent-green font-medium">
              +${portfolioData.change30d.toFixed(2)}
            </p>
            <p className="text-xs md:text-sm text-accent-green font-medium">
              ({portfolioData.change30dPercent}%)
            </p>
            <span className="text-xs text-secondary">30d</span>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-2 md:gap-4 mb-4 md:mb-6">
        <div className="bg-tertiary/50 rounded-lg p-2 md:p-3 border border-white/5">
          <p className="text-[10px] md:text-xs text-secondary mb-0.5 md:mb-1">24h Change</p>
          <p className="text-xs md:text-lg font-semibold text-accent-green">
            +${portfolioData.change24h.toFixed(2)}
          </p>
        </div>
        <div className="bg-tertiary/50 rounded-lg p-2 md:p-3 border border-white/5">
          <p className="text-[10px] md:text-xs text-secondary mb-0.5 md:mb-1">7d Change</p>
          <p className="text-xs md:text-lg font-semibold text-accent-green">
            +${portfolioData.change7d.toFixed(2)}
          </p>
        </div>
        <div className="bg-tertiary/50 rounded-lg p-2 md:p-3 border border-white/5">
          <p className="text-[10px] md:text-xs text-secondary mb-0.5 md:mb-1">Assets</p>
          <p className="text-xs md:text-lg font-semibold text-primary">
            {portfolioData.totalAssets}
          </p>
        </div>
      </div>

      {/* Time Range Selector */}
      <div className="flex items-center gap-1.5 md:gap-2 mb-4 overflow-x-auto">
        {timeRanges.map((range) => (
          <button
            key={range}
            onClick={() => setTimeRange(range)}
            className={`px-2 md:px-3 py-1 md:py-1.5 rounded-lg text-xs md:text-sm font-medium transition-colors duration-200 whitespace-nowrap ${
              timeRange === range
                ? 'bg-accent-green text-white'
                : 'bg-tertiary text-secondary hover:bg-quaternary hover:text-primary'
            }`}
          >
            {range}
          </button>
        ))}
      </div>

      {/* Chart */}
      <div style={{ height: '150px' }} className="md:min-h-[200px]">
        <Line data={data} options={options} />
      </div>
    </motion.div>
  );
};

export default PortfolioChart;
