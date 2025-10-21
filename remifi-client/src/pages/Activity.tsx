import React, { useState } from 'react';
import type { TokenSymbol } from '../components/swap/tokens';
import TransactionCard from '../components/activity/TransactionCard';
import LiquidityPoolCard from '../components/activity/LiquidityPoolCard';
import StakingCard from '../components/activity/StakingCard';
import ActivityTabs, { type ActivityTab } from '../components/activity/ActivityTabs';

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

interface LiquidityPool {
  id: string;
  tokenA: TokenSymbol;
  tokenB: TokenSymbol;
  liquidity: number;
  apy: number;
  volume24h: number;
  fees24h: number;
  yourShare: number;
  yourFees: number;
}

const ActivityPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ActivityTab>('all');

  // Mock transaction data
  const transactions: Transaction[] = [
    {
      id: '1',
      type: 'swap',
      fromToken: 'USDT',
      toToken: 'NGN',
      fromAmount: 100,
      toAmount: 130607,
      status: 'completed',
      timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
      hash: '0x1234...5678',
      fee: 0.3
    },
    {
      id: '2',
      type: 'add-liquidity',
      fromToken: 'USDT',
      toToken: 'NGN',
      fromAmount: 500,
      toAmount: 653035,
      status: 'completed',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
      hash: '0x2345...6789',
      poolId: 'USDT-NGN',
      apy: 12.5
    },
    {
      id: '3',
      type: 'stake',
      fromToken: 'USDT',
      toToken: 'NGN',
      fromAmount: 1000,
      toAmount: 0,
      status: 'completed',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4), // 4 hours ago
      hash: '0x3456...7890',
      apy: 8.2
    },
    {
      id: '4',
      type: 'claim-rewards',
      fromToken: 'USDT',
      toToken: 'NGN',
      fromAmount: 0,
      toAmount: 25.5,
      status: 'completed',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 6), // 6 hours ago
      hash: '0x4567...8901'
    },
    {
      id: '5',
      type: 'remove-liquidity',
      fromToken: 'USDT',
      toToken: 'GHS',
      fromAmount: 200,
      toAmount: 2500,
      status: 'pending',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 8), // 8 hours ago
      hash: '0x5678...9012',
      poolId: 'USDT-GHS'
    },
    {
      id: '6',
      type: 'swap',
      fromToken: 'KES',
      toToken: 'USDT',
      fromAmount: 15000,
      toAmount: 11.5,
      status: 'completed',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
      hash: '0x6789...0123',
      fee: 0.35
    }
  ];

  // Mock liquidity pools data
  const liquidityPools: LiquidityPool[] = [
    {
      id: 'USDT-NGN',
      tokenA: 'USDT',
      tokenB: 'NGN',
      liquidity: 2500000,
      apy: 12.5,
      volume24h: 150000,
      fees24h: 450,
      yourShare: 0.02,
      yourFees: 9.0
    },
    {
      id: 'USDT-GHS',
      tokenA: 'USDT',
      tokenB: 'GHS',
      liquidity: 1800000,
      apy: 8.7,
      volume24h: 95000,
      fees24h: 285,
      yourShare: 0.015,
      yourFees: 4.3
    },
    {
      id: 'USDT-KES',
      tokenA: 'USDT',
      tokenB: 'KES',
      liquidity: 1200000,
      apy: 6.2,
      volume24h: 75000,
      fees24h: 225,
      yourShare: 0.0,
      yourFees: 0.0
    }
  ];

  // Handler functions for component callbacks
  const handleAddLiquidity = (poolId: string) => {
    console.log('Add liquidity to pool:', poolId);
    // Implement add liquidity logic
  };

  const handleRemoveLiquidity = (poolId: string) => {
    console.log('Remove liquidity from pool:', poolId);
    // Implement remove liquidity logic
  };

  const handleClaimFees = (poolId: string) => {
    console.log('Claim fees from pool:', poolId);
    // Implement claim fees logic
  };

  const handleClaimRewards = (positionId: string) => {
    console.log('Claim rewards for position:', positionId);
    // Implement claim rewards logic
  };

  const handleStake = (pool: any) => {
    console.log('Stake in pool:', pool);
    // Implement stake logic
  };

  const handleUnstake = (positionId: string) => {
    console.log('Unstake position:', positionId);
    // Implement unstake logic
  };

  const filteredTransactions = transactions.filter(tx => {
    if (activeTab === 'all') return true;
    if (activeTab === 'swaps') return tx.type === 'swap';
    if (activeTab === 'transfers') return ['buy', 'sell', 'deposit', 'withdraw'].includes(tx.type);
    if (activeTab === 'liquidity') return ['add-liquidity', 'remove-liquidity'].includes(tx.type) && tx.id !== '2' && tx.id !== '5';
    if (activeTab === 'staking') return ['stake', 'unstake', 'claim-rewards'].includes(tx.type) && tx.id !== '3' && tx.id !== '4';
    return true;
  });

  return (
    <div className="min-h-screen px-6 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-semibold text-primary mb-2">Activity</h1>
          <p className="text-secondary">Track your transaction history and status</p>
        </div>

        {/* Tabs */}
        <ActivityTabs activeTab={activeTab} onTabChange={setActiveTab} />

        {/* Transaction List - Only show for non-liquidity/staking tabs */}
        {(activeTab === 'all' || activeTab === 'swaps' || activeTab === 'transfers') && (
          <>
            <div className="space-y-3">
              {filteredTransactions.length === 0 ? (
                <div className="bg-secondary rounded-xl p-8 text-center border border-white/10">
                  <div className="text-4xl mb-4">📊</div>
                  <h3 className="text-lg font-semibold text-primary mb-2">No transactions yet</h3>
                  <p className="text-secondary">Your transaction history will appear here</p>
                </div>
              ) : (
                filteredTransactions.map((tx) => (
                  <TransactionCard key={tx.id} transaction={tx} />
                ))
              )}
            </div>

            {/* Load More Button */}
            {filteredTransactions.length > 0 && (
              <div className="mt-6 text-center">
                <button className="px-6 py-2 bg-tertiary text-primary rounded-xl hover:bg-quaternary transition-colors duration-200">
                  Load More
                </button>
              </div>
            )}
          </>
        )}

        {/* Liquidity Pools Section */}
        {activeTab === 'liquidity' && (
          <div className="mt-8">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-primary mb-2">Your Liquidity Pools</h2>
              <p className="text-secondary">Manage your liquidity positions and earn fees</p>
            </div>

            {/* Create New Pool - First */}
            <div className="mb-6">
              <button 
                onClick={() => window.location.href = '/create-pool'}
                className="w-full px-6 py-4 bg-tertiary text-primary rounded-xl border-2 border-dashed border-white/20 hover:border-accent-green hover:text-accent-green transition-colors duration-200"
              >
                <div className="text-2xl mb-2">➕</div>
                <div className="font-semibold">Create New Pool</div>
                <div className="text-sm text-secondary">Start earning fees with a new liquidity pool</div>
              </button>
            </div>

            <div className="space-y-4">
              {liquidityPools.map((pool) => (
                <LiquidityPoolCard
                  key={pool.id}
                  pool={pool}
                  onAddLiquidity={handleAddLiquidity}
                  onRemoveLiquidity={handleRemoveLiquidity}
                  onClaimFees={handleClaimFees}
                />
              ))}
            </div>
          </div>
        )}

        {/* Staking Section */}
        {activeTab === 'staking' && (
          <div className="mt-8">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-primary mb-2">Staking Rewards</h2>
              <p className="text-secondary">Stake your tokens and earn passive rewards</p>
            </div>

            <StakingCard
              activePositions={[
                {
                  id: '1',
                  token: 'USDT',
                  stakedAmount: 1000,
                  apy: 8.2,
                  earnedRewards: 25.5,
                  stakingPeriod: 0
                }
              ]}
              availablePools={[
                { token: 'USDT', apy: 8.2, minStake: 100 },
                { token: 'NGN', apy: 12.5, minStake: 50000 },
                { token: 'GHS', apy: 6.8, minStake: 200 }
              ]}
              onClaimRewards={handleClaimRewards}
              onStake={handleStake}
              onUnstake={handleUnstake}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ActivityPage;


