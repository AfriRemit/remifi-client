import { useState } from 'react';

const TokensActivity: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'tokens' | 'activity'>('tokens');

  return (
    <div className="space-y-6">
      {/* Tabs - subtle gray hover buttons */}
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

      {/* Content (empty for now, per request) */}
      {activeTab === 'tokens' ? (
        <div />
      ) : (
        <div />
      )}
    </div>
  );
};

export default TokensActivity;
