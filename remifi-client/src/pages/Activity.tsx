import React, { useState } from 'react';
import type { TokenSymbol } from '../components/swap/tokens';
import TransactionCard from '../components/activity/TransactionCard';
import LiquidityPoolCard from '../components/activity/LiquidityPoolCard';
import StakingCard from '../components/activity/StakingCard';
import OperationConfirmationModal from '../components/common/OperationConfirmationModal';
type LocalTab = 'transactions' | 'liquidity' | 'staking';

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
  const [activeTab, setActiveTab] = useState<LocalTab>('transactions');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showRemoveModal, setShowRemoveModal] = useState(false);
  const [showClaimConfirm, setShowClaimConfirm] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [selectedPool, setSelectedPool] = useState<LiquidityPool | null>(null);
  const [amountA, setAmountA] = useState('');
  const [amountB, setAmountB] = useState('');
  const [removePercent, setRemovePercent] = useState(25);

  // Transactions data for the Transactions tab
  const transactions: Transaction[] = [
    {
      id: '1',
      type: 'swap',
      fromToken: 'USDT',
      toToken: 'NGN',
      fromAmount: 100,
      toAmount: 130607,
      status: 'completed',
      timestamp: new Date(Date.now() - 1000 * 60 * 30),
      hash: '0x1234...5678'
    },
    {
      id: '2',
      type: 'add-liquidity',
      fromToken: 'USDT',
      toToken: 'NGN',
      fromAmount: 500,
      toAmount: 653035,
      status: 'completed',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
      hash: '0x2345...6789',
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
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4),
      hash: '0x3456...7890',
      apy: 8.2
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
    const pool = liquidityPools.find(p => p.id === poolId) || null;
    setSelectedPool(pool);
    setAmountA('');
    setAmountB('');
    setShowAddModal(true);
  };

  const handleRemoveLiquidity = (poolId: string) => {
    const pool = liquidityPools.find(p => p.id === poolId) || null;
    setSelectedPool(pool);
    setRemovePercent(25);
    setShowRemoveModal(true);
  };

  const handleClaimFees = (poolId: string) => {
    const pool = liquidityPools.find(p => p.id === poolId) || null;
    setSelectedPool(pool);
    setShowClaimConfirm(true);
  };

  const handleClaimRewards = (positionId: string) => {
    console.log('Claim rewards for position:', positionId);
    // Implement claim rewards logic
  };

  const handleStake = (pool: any) => {
    console.log('Stake in pool:', pool);
    // Implement stake logic
  };

  // Transactions list hidden for now

  return (
    <>
    <div className="min-h-screen px-6 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-semibold text-primary mb-2">Activity</h1>
          <p className="text-secondary">Track your transaction history and status</p>
        </div>

        {/* Tabs: Transactions, Liquidity, Staking */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 -mx-1 px-1">
          {[
            { id: 'transactions', label: 'Transactions' },
            { id: 'liquidity', label: 'Liquidity' },
            { id: 'staking', label: 'Staking' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as LocalTab)}
              className={`px-3 py-2 rounded-lg text-xs md:text-sm font-medium transition-colors whitespace-nowrap ${
                activeTab === (tab.id as LocalTab)
                  ? 'bg-accent-green text-white'
                  : 'bg-tertiary text-primary hover:bg-quaternary'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Transactions section */}
        {activeTab === 'transactions' && (
          <div className="mt-6 space-y-3">
            {transactions.map((tx) => (
              <TransactionCard key={tx.id} transaction={tx} />
            ))}
          </div>
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
                <img src="/assets/createicon.svg" alt="Create" className="w-10 h-10 mb-2 inline-block dark:invert" />
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
            />
          </div>
        )}
      </div>
    </div>

    {/* Add Liquidity Modal */}
    {showAddModal && selectedPool && (
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-3 md:p-4" onClick={() => setShowAddModal(false)}>
        <div className="bg-secondary rounded-2xl p-4 md:p-6 w-full max-w-md border border-white/10" onClick={(e) => e.stopPropagation()}>
          <div className="flex items-center justify-between mb-3 md:mb-4">
            <h3 className="text-lg md:text-xl font-semibold text-primary">Add Liquidity</h3>
            <button onClick={() => setShowAddModal(false)} className="w-8 h-8 rounded-full bg-tertiary hover:bg-quaternary flex items-center justify-center">✕</button>
          </div>
          <div className="text-xs md:text-sm text-secondary mb-4">{selectedPool.tokenA}/{selectedPool.tokenB} • Pool #{selectedPool.id}</div>
          <div className="space-y-3 md:space-y-4">
            <div>
              <label className="block text-xs md:text-sm text-secondary mb-2">Amount {selectedPool.tokenA}</label>
              <input value={amountA} onChange={(e)=>setAmountA(e.target.value)} inputMode="decimal" className="w-full px-3 md:px-4 py-2.5 md:py-3 bg-tertiary rounded-lg text-primary outline-none focus:ring-2 focus:ring-accent-green" placeholder="0.00" />
            </div>
            <div>
              <label className="block text-xs md:text-sm text-secondary mb-2">Amount {selectedPool.tokenB}</label>
              <input value={amountB} onChange={(e)=>setAmountB(e.target.value)} inputMode="decimal" className="w-full px-3 md:px-4 py-2.5 md:py-3 bg-tertiary rounded-lg text-primary outline-none focus:ring-2 focus:ring-accent-green" placeholder="0.00" />
            </div>
            <button
              disabled={!amountA || !amountB}
              onClick={() => { setShowAddModal(false); setSuccessMessage(`You added ${amountA} ${selectedPool.tokenA} and ${amountB} ${selectedPool.tokenB} to Pool #${selectedPool.id}.`); }}
              className={`w-full px-5 md:px-6 py-2.5 md:py-3 rounded-xl text-sm md:text-base font-semibold transition-colors ${amountA && amountB ? 'bg-accent-green text-white hover:bg-accent-green-hover' : 'bg-tertiary text-secondary cursor-not-allowed'}`}
            >
              Confirm Add Liquidity
            </button>
          </div>
        </div>
      </div>
    )}

    {/* Remove Liquidity Modal */}
    {showRemoveModal && selectedPool && (
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-3 md:p-4" onClick={() => setShowRemoveModal(false)}>
        <div className="bg-secondary rounded-2xl p-4 md:p-6 w-full max-w-md border border-white/10" onClick={(e) => e.stopPropagation()}>
          <div className="flex items-center justify-between mb-3 md:mb-4">
            <h3 className="text-lg md:text-xl font-semibold text-primary">Remove Liquidity</h3>
            <button onClick={() => setShowRemoveModal(false)} className="w-8 h-8 rounded-full bg-tertiary hover:bg-quaternary flex items-center justify-center">✕</button>
          </div>
          <div className="text-xs md:text-sm text-secondary mb-4">{selectedPool.tokenA}/{selectedPool.tokenB} • Pool #{selectedPool.id}</div>
          <div className="space-y-3 md:space-y-4">
            <div>
              <label className="block text-xs md:text-sm text-secondary mb-2">Remove Percentage</label>
              <div className="flex items-center gap-2">
                {[25, 50, 75, 100].map(p => (
                  <button key={p} onClick={() => setRemovePercent(p)} className={`px-3 py-2 rounded-lg text-sm ${removePercent===p ? 'bg-accent-green text-white' : 'bg-tertiary text-primary hover:bg-quaternary'}`}>{p}%</button>
                ))}
              </div>
            </div>
            <button
              onClick={() => { setShowRemoveModal(false); setSuccessMessage(`You removed ${removePercent}% of your position from Pool #${selectedPool.id}.`); }}
              className="w-full px-5 md:px-6 py-2.5 md:py-3 bg-accent-green text-white rounded-xl text-sm md:text-base font-semibold hover:bg-accent-green-hover transition-colors"
            >
              Confirm Remove
            </button>
          </div>
        </div>
      </div>
    )}

    {/* Success Confirmation */}
    <OperationConfirmationModal
      isOpen={!!successMessage}
      onClose={() => setSuccessMessage(null)}
      title="Transaction confirmed"
      message={successMessage || ''}
      ctaLabel="Close"
    />

    {/* Claim Fees Confirmation */}
    {showClaimConfirm && selectedPool && (
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-3 md:p-4" onClick={() => setShowClaimConfirm(false)}>
        <div className="bg-secondary rounded-2xl p-4 md:p-6 w-full max-w-md border border-white/10" onClick={(e) => e.stopPropagation()}>
          <div className="flex items-center justify-between mb-3 md:mb-4">
            <h3 className="text-lg md:text-xl font-semibold text-primary">Claim Fees?</h3>
            <button onClick={() => setShowClaimConfirm(false)} className="w-8 h-8 rounded-full bg-tertiary hover:bg-quaternary flex items-center justify-center">✕</button>
          </div>
          <p className="text-xs md:text-sm text-secondary mb-4 md:mb-6">You are about to claim your accrued fees from Pool #{selectedPool.id} ({selectedPool.tokenA}/{selectedPool.tokenB}). Continue?</p>
          <div className="flex items-center justify-end gap-2 md:gap-3">
            <button onClick={() => setShowClaimConfirm(false)} className="px-3 md:px-4 py-2 bg-tertiary text-primary rounded-lg hover:bg-quaternary text-sm md:text-base">Cancel</button>
            <button onClick={() => { setShowClaimConfirm(false); setSuccessMessage(`You have successfully claimed fees from Pool #${selectedPool.id}. Your wallet has been updated.`); }} className="px-3 md:px-4 py-2 bg-accent-green text-white rounded-lg hover:bg-accent-green-hover text-sm md:text-base">Confirm</button>
          </div>
        </div>
      </div>
    )}
    </>
  );
};

export default ActivityPage;


