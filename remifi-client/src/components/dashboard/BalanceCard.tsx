import { useState } from 'react';

const BalanceCard: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-3">
        <div className="text-4xl font-bold text-primary">
          {isVisible ? '$0.00' : '••••••'}
        </div>
        <button
          onClick={() => setIsVisible(!isVisible)}
          className="text-secondary hover:text-primary transition-colors duration-200"
        >
          <div className="relative w-6 h-6">
            <img src="/assets/Eye icons.svg" alt="toggle visibility" className="w-6 h-6" />
            {!isVisible && (
              <span className="absolute left-1/2 top-1/2 block w-7 h-[2px] bg-secondary -translate-x-1/2 -translate-y-1/2 rotate-45"></span>
            )}
          </div>
        </button>
      </div>
      <div className="flex items-center space-x-2">
        <img src="/assets/Vector (1).svg" alt="gain" className="w-4 h-4" />
        <span className="text-accent-green text-lg font-medium">0.00%</span>
      </div>
    </div>
  );
};

export default BalanceCard;
