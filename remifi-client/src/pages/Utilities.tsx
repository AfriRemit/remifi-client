import React, { useState } from 'react';

interface Utility {
  id: string;
  name: string;
  type: 'water' | 'electricity' | 'flight';
  icon: string;
  description: string;
  status: 'available' | 'unavailable';
  processingTime: string;
  fee: string;
  popular?: boolean;
}

interface UtilityCardProps {
  utility: Utility;
  onPay: (utility: Utility) => void;
}

const UtilityCard: React.FC<UtilityCardProps> = ({ utility, onPay }) => {
  return (
    <div className={`bg-secondary rounded-xl p-6 border border-white/10 hover:border-white/20 transition-colors duration-200 ${
      utility.status === 'unavailable' ? 'opacity-50' : ''
    }`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-tertiary rounded-full flex items-center justify-center text-2xl">
            {utility.icon}
          </div>
          <div>
            <div className="text-primary font-semibold">{utility.name}</div>
            <div className="text-sm text-secondary">{utility.description}</div>
          </div>
        </div>
        {utility.popular && (
          <div className="px-2 py-1 bg-accent-green text-white text-xs rounded-full">
            Popular
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <div className="text-sm text-secondary">Processing Time</div>
          <div className="text-primary font-medium">{utility.processingTime}</div>
        </div>
        <div>
          <div className="text-sm text-secondary">Service Fee</div>
          <div className="text-accent-green font-medium">{utility.fee}</div>
        </div>
      </div>

      <button
        onClick={() => onPay(utility)}
        disabled={utility.status === 'unavailable'}
        className={`w-full px-4 py-3 rounded-lg font-medium transition-colors ${
          utility.status === 'available'
            ? 'bg-accent-green text-white hover:bg-accent-green-hover'
            : 'bg-tertiary text-secondary cursor-not-allowed'
        }`}
      >
        {utility.status === 'available' ? 'Pay Now' : 'Coming Soon'}
      </button>
    </div>
  );
};

const UtilitiesPage: React.FC = () => {
  const [selectedUtility, setSelectedUtility] = useState<Utility | null>(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const utilities: Utility[] = [
    {
      id: '1',
      name: 'Water Bill Payment',
      type: 'water',
      icon: '💧',
      description: 'Pay your water utility bills instantly',
      status: 'available',
      processingTime: 'Instant',
      fee: 'Free',
      popular: true
    },
    {
      id: '2',
      name: 'Electricity Bill Payment',
      type: 'electricity',
      icon: '⚡',
      description: 'Settle your electricity bills online',
      status: 'available',
      processingTime: 'Instant',
      fee: 'Free',
      popular: true
    },
    {
      id: '3',
      name: 'Flight Booking',
      type: 'flight',
      icon: '✈️',
      description: 'Book domestic and international flights',
      status: 'available',
      processingTime: '2-5 minutes',
      fee: '1% of ticket price'
    },
    {
      id: '4',
      name: 'Internet Bill',
      type: 'electricity',
      icon: '📶',
      description: 'Pay internet service provider bills',
      status: 'unavailable',
      processingTime: 'Coming Soon',
      fee: 'TBD'
    },
    {
      id: '5',
      name: 'Cable TV',
      type: 'electricity',
      icon: '📺',
      description: 'Pay cable and satellite TV bills',
      status: 'unavailable',
      processingTime: 'Coming Soon',
      fee: 'TBD'
    },
    {
      id: '6',
      name: 'Gas Bill',
      type: 'electricity',
      icon: '🔥',
      description: 'Pay natural gas utility bills',
      status: 'unavailable',
      processingTime: 'Coming Soon',
      fee: 'TBD'
    }
  ];

  const handlePay = (utility: Utility) => {
    if (utility.status === 'unavailable') return;
    setSelectedUtility(utility);
    setShowPaymentModal(true);
  };

  const handlePaymentConfirm = () => {
    setShowPaymentModal(false);
    setSelectedUtility(null);
    // Handle payment logic here
    alert(`Payment initiated for ${selectedUtility?.name}`);
  };

  const groupedUtilities = {
    available: utilities.filter(u => u.status === 'available'),
    comingSoon: utilities.filter(u => u.status === 'unavailable')
  };

  return (
    <div className="min-h-screen px-6 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-semibold text-primary mb-2">Utilities</h1>
          <p className="text-secondary">Pay your bills and book services instantly with crypto</p>
        </div>

        {/* Available Utilities */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-primary mb-4">Available Services</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {groupedUtilities.available.map((utility) => (
              <UtilityCard
                key={utility.id}
                utility={utility}
                onPay={handlePay}
              />
            ))}
          </div>
        </div>

        {/* Coming Soon */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-primary mb-4">Coming Soon</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {groupedUtilities.comingSoon.map((utility) => (
              <UtilityCard
                key={utility.id}
                utility={utility}
                onPay={handlePay}
              />
            ))}
          </div>
        </div>

        {/* Payment Modal */}
        {showPaymentModal && selectedUtility && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-secondary rounded-2xl p-6 w-full max-w-md mx-4 border border-white/10 shadow-2xl">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-primary">Pay {selectedUtility.name}</h3>
                <button
                  onClick={() => setShowPaymentModal(false)}
                  className="text-secondary hover:text-primary"
                >
                  ✕
                </button>
              </div>

              <div className="mb-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-tertiary rounded-full flex items-center justify-center text-xl">
                    {selectedUtility.icon}
                  </div>
                  <div>
                    <div className="text-primary font-medium">{selectedUtility.name}</div>
                    <div className="text-sm text-secondary">{selectedUtility.description}</div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="block text-sm text-secondary mb-2">Account Number</label>
                    <input
                      type="text"
                      placeholder="Enter your account number"
                      className="w-full px-4 py-3 bg-tertiary rounded-lg text-primary placeholder-secondary focus:outline-none focus:ring-2 focus:ring-accent-green"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-secondary mb-2">Amount</label>
                    <input
                      type="number"
                      placeholder="Enter amount"
                      className="w-full px-4 py-3 bg-tertiary rounded-lg text-primary placeholder-secondary focus:outline-none focus:ring-2 focus:ring-accent-green"
                    />
                  </div>

                  {selectedUtility.type === 'flight' && (
                    <div>
                      <label className="block text-sm text-secondary mb-2">Flight Details</label>
                      <input
                        type="text"
                        placeholder="Enter flight reference or booking code"
                        className="w-full px-4 py-3 bg-tertiary rounded-lg text-primary placeholder-secondary focus:outline-none focus:ring-2 focus:ring-accent-green"
                      />
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-secondary">Service Fee:</span>
                  <span className="text-accent-green font-medium">{selectedUtility.fee}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-secondary">Processing Time:</span>
                  <span className="text-primary font-medium">{selectedUtility.processingTime}</span>
                </div>
              </div>

              <button
                onClick={handlePaymentConfirm}
                className="w-full px-6 py-3 bg-accent-green text-white rounded-xl font-semibold hover:bg-accent-green-hover transition-colors"
              >
                Confirm Payment
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UtilitiesPage;
