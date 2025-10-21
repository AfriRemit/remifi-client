import React from 'react';
import type { TokenSymbol } from '../swap/tokens';

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

interface LiquidityPoolCardProps {
  pool: LiquidityPool;
  onAddLiquidity?: (poolId: string) => void;
  onRemoveLiquidity?: (poolId: string) => void;
  onClaimFees?: (poolId: string) => void;
}

const LiquidityPoolCard: React.FC<LiquidityPoolCardProps> = ({ 
  pool, 
  onAddLiquidity, 
  onRemoveLiquidity, 
  onClaimFees 
}) => {
  return (
    <div className="bg-secondary rounded-xl p-6 border border-white/10 hover:border-white/20 transition-colors duration-200">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="flex -space-x-2">
            <div className="w-8 h-8 bg-tertiary rounded-full flex items-center justify-center text-sm font-medium">
              {pool.tokenA}
            </div>
            <div className="w-8 h-8 bg-tertiary rounded-full flex items-center justify-center text-sm font-medium">
              {pool.tokenB}
            </div>
          </div>
          <div>
            <div className="text-primary font-semibold">
              {pool.tokenA}/{pool.tokenB}
            </div>
            <div className="text-sm text-secondary">
              Pool #{pool.id}
            </div>
          </div>
        </div>
        <div className="text-right">
          <div className="text-accent-green font-semibold">
            {pool.apy}% APY
          </div>
          <div className="text-sm text-secondary">
            Current Rate
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
        <div>
          <div className="text-sm text-secondary">Total Liquidity</div>
          <div className="text-primary font-medium">
            ${pool.liquidity.toLocaleString()}
          </div>
        </div>
        <div>
          <div className="text-sm text-secondary">24h Volume</div>
          <div className="text-primary font-medium">
            ${pool.volume24h.toLocaleString()}
          </div>
        </div>
        <div>
          <div className="text-sm text-secondary">Your Share</div>
          <div className="text-primary font-medium">
            {(pool.yourShare * 100).toFixed(2)}%
          </div>
        </div>
        <div>
          <div className="text-sm text-secondary">Your Fees</div>
          <div className="text-accent-green font-medium">
            ${pool.yourFees.toFixed(2)}
          </div>
        </div>
      </div>

      <div className="flex gap-3">
        <button 
          onClick={() => onAddLiquidity?.(pool.id)}
          className="flex-1 px-4 py-2 bg-accent-green text-white rounded-lg font-medium hover:bg-accent-green-hover transition-colors"
        >
          Add Liquidity
        </button>
        <button 
          onClick={() => onRemoveLiquidity?.(pool.id)}
          className="flex-1 px-4 py-2 bg-tertiary text-primary rounded-lg font-medium hover:bg-quaternary transition-colors"
        >
          Remove
        </button>
        <button 
          onClick={() => onClaimFees?.(pool.id)}
          className="px-4 py-2 bg-tertiary text-primary rounded-lg font-medium hover:bg-quaternary transition-colors"
        >
          Claim Fees
        </button>
      </div>
    </div>
  );
};

export default LiquidityPoolCard;
