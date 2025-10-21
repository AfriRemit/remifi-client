import React from 'react';
import type { TokenSymbol } from '../swap/tokens';

interface Transaction {
  id: string;
  type: 'swap' | 'buy' | 'sell' | 'deposit' | 'withdraw' | 'add-liquidity' | 'remove-liquidity' | 'stake' | 'unstake' | 'claim-rewards';
  fromToken: TokenSymbol;
  toToken: TokenSymbol;
  fromAmount: number;
  toAmount: number;
  status: 'pending' | 'completed' | 'failed';
  timestamp: Date;
  hash?: string;
  fee?: number;
  poolId?: string;
  apy?: number;
}

interface TransactionCardProps {
  transaction: Transaction;
}

const TransactionCard: React.FC<TransactionCardProps> = ({ transaction }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-accent-green';
      case 'pending':
        return 'text-yellow-400';
      case 'failed':
        return 'text-red-400';
      default:
        return 'text-secondary';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return '✓';
      case 'pending':
        return '⏳';
      case 'failed':
        return '✗';
      default:
        return '?';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'swap':
        return '🔄';
      case 'buy':
        return '📈';
      case 'sell':
        return '📉';
      case 'deposit':
        return '⬇️';
      case 'withdraw':
        return '⬆️';
      case 'add-liquidity':
        return '💧';
      case 'remove-liquidity':
        return '💧';
      case 'stake':
        return '🔒';
      case 'unstake':
        return '🔓';
      case 'claim-rewards':
        return '🎁';
      default:
        return '💰';
    }
  };

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 60) {
      return `${diffInMinutes}m ago`;
    } else if (diffInMinutes < 1440) {
      return `${Math.floor(diffInMinutes / 60)}h ago`;
    } else {
      return `${Math.floor(diffInMinutes / 1440)}d ago`;
    }
  };

  return (
    <div className="bg-secondary rounded-xl p-4 border border-white/10 hover:border-white/20 transition-colors duration-200">
      <div className="flex items-center justify-between">
        {/* Left side - Transaction info */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-tertiary rounded-full flex items-center justify-center text-lg">
            {getTypeIcon(transaction.type)}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-primary font-medium capitalize">{transaction.type}</span>
              <span className={`text-xs ${getStatusColor(transaction.status)}`}>
                {getStatusIcon(transaction.status)}
              </span>
            </div>
            <div className="text-sm text-secondary">
              {transaction.fromAmount.toLocaleString()} {transaction.fromToken} → {transaction.toAmount.toLocaleString()} {transaction.toToken}
            </div>
          </div>
        </div>

        {/* Right side - Status and time */}
        <div className="text-right">
          <div className={`text-sm font-medium ${getStatusColor(transaction.status)}`}>
            {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
          </div>
          <div className="text-xs text-secondary">
            {formatTimeAgo(transaction.timestamp)}
          </div>
          {transaction.hash && (
            <div className="text-xs text-accent-green mt-1 font-mono">
              {transaction.hash.slice(0, 6)}...{transaction.hash.slice(-4)}
            </div>
          )}
        </div>
      </div>

      {/* Transaction details */}
      <div className="mt-3 pt-3 border-t border-white/10">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-secondary">From:</span>
            <div className="text-primary font-medium">
              {transaction.fromAmount.toLocaleString()} {transaction.fromToken}
            </div>
          </div>
          <div>
            <span className="text-secondary">To:</span>
            <div className="text-primary font-medium">
              {transaction.toAmount.toLocaleString()} {transaction.toToken}
            </div>
          </div>
          {transaction.fee && (
            <div>
              <span className="text-secondary">Fee:</span>
              <div className="text-primary font-medium">
                {transaction.fee} {transaction.fromToken}
              </div>
            </div>
          )}
          {transaction.apy && (
            <div>
              <span className="text-secondary">APY:</span>
              <div className="text-accent-green font-medium">
                {transaction.apy}%
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TransactionCard;
