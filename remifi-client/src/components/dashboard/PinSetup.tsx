const PinSetup: React.FC = () => {
  return (
    <div className="bg-secondary rounded-xl p-6 flex items-center space-x-4">
      <div className="flex items-center justify-center flex-shrink-0">
        <img src="/assets/mdi_security-lock.svg" alt="Security Lock"  />
      </div>
      <div className="flex-1">
        <h3 className="text-lg font-semibold text-primary mb-1">
          Set up your Transaction PIN
        </h3>
        <p className="text-secondary text-sm">
          Secure your wallet by creating a 4-digit PIN for every trade, send, or withdrawal.
        </p>
      </div>
      <button className="px-4 py-2 bg-accent-green text-white rounded-lg font-medium hover:bg-green-600 transition-colors duration-200">
        Set PIN
      </button>
    </div>
  );
};

export default PinSetup;
