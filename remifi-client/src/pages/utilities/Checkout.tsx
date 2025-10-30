import React, { useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import OperationConfirmationModal from '../../components/common/OperationConfirmationModal';

type Stablecoin = 'USDT' | 'USDC';
type Network = 'Ethereum' | 'Base' | 'Arbitrum' | 'Polygon' | 'OP Mainnet';

interface CheckoutState {
  utilityType: 'water' | 'electricity' | 'flight';
  summaryTitle: string;
  summaryDetails: Record<string, string | number>;
  amount: number; // fiat or quote amount to be paid in stablecoin equivalent
  currency?: string; // optional currency label
}

const UtilityCheckoutPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = (location.state || {}) as Partial<CheckoutState>;

  const [stablecoin, setStablecoin] = useState<Stablecoin>('USDT');
  const [network, setNetwork] = useState<Network>('Base');

  const canConfirm = useMemo(() => !!state.utilityType && (state.amount ?? 0) > 0, [state.utilityType, state.amount]);

  const [showSuccess, setShowSuccess] = useState(false);

  const handleConfirm = () => {
    if (!canConfirm) return;
    // TODO: integrate on-chain payment or payment request creation
    setShowSuccess(true);
  };

  return (
    <>
    <div className="min-h-screen px-6 py-8">
      <div className="max-w-3xl mx-auto bg-secondary rounded-2xl p-6 md:p-8 border border-white/10">
        <h1 className="text-2xl md:text-3xl font-semibold text-primary mb-1">Checkout</h1>
        <p className="text-secondary mb-6">Review details and pay with your stablecoin.</p>

        {/* Summary */}
        <div className="bg-tertiary rounded-xl p-4 md:p-5 border border-white/5 mb-6">
          <div className="flex items-center justify-between mb-3">
            <div className="text-primary font-medium capitalize">{state.summaryTitle || state.utilityType || 'Utility'}</div>
            {state.amount != null && (
              <div className="text-primary font-semibold">{state.currency ? `${state.currency} ` : ''}{state.amount}</div>
            )}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {Object.entries(state.summaryDetails || {}).map(([k, v]) => (
              <div key={k} className="flex items-center justify-between text-sm">
                <span className="text-secondary capitalize">{k.replace(/([A-Z])/g,' $1').trim()}</span>
                <span className="text-primary font-medium">{String(v)}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Payment options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm text-secondary mb-2">Stablecoin</label>
            <select value={stablecoin} onChange={(e)=>setStablecoin(e.target.value as Stablecoin)} className="w-full px-4 py-3 bg-tertiary rounded-lg text-primary focus:outline-none focus:ring-2 focus:ring-accent-green">
              <option value="USDT">USDT</option>
              <option value="USDC">USDC</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-secondary mb-2">Network</label>
            <select value={network} onChange={(e)=>setNetwork(e.target.value as Network)} className="w-full px-4 py-3 bg-tertiary rounded-lg text-primary focus:outline-none focus:ring-2 focus:ring-accent-green">
              <option>Base</option>
              <option>Ethereum</option>
              <option>Arbitrum</option>
              <option>Polygon</option>
              <option>OP Mainnet</option>
            </select>
          </div>
        </div>

        <button
          onClick={handleConfirm}
          disabled={!canConfirm}
          className={`w-full px-6 py-3 rounded-xl font-semibold transition-colors ${canConfirm ? 'bg-accent-green text-white hover:bg-accent-green-hover' : 'bg-tertiary text-secondary cursor-not-allowed'}`}
        >
          Confirm and Pay
        </button>
      </div>
    </div>
    <OperationConfirmationModal
      isOpen={showSuccess}
      onClose={() => navigate('/dashboard')}
      title="Transaction confirmed"
      message={
        <>
          You've successfully paid <span className="text-accent-green font-semibold">{state.amount} {state.currency || ''}</span> with <span className="text-accent-green font-semibold">{stablecoin}</span> on {network}. Your request has been received and will be processed shortly.
        </>
      }
      ctaLabel="Go to Dashboard"
    />
    </>
  );
};

export default UtilityCheckoutPage;


