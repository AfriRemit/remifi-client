import React from 'react';

export type ActivityTab = 'all' | 'swaps' | 'transfers' | 'liquidity' | 'staking';

interface ActivityTabsProps {
  activeTab: ActivityTab;
  onTabChange: (tab: ActivityTab) => void;
}

const ActivityTabs: React.FC<ActivityTabsProps> = ({ activeTab, onTabChange }) => {
  const tabs = [
    { key: 'all' as ActivityTab, label: 'All' },
    { key: 'swaps' as ActivityTab, label: 'Swaps' },
    { key: 'transfers' as ActivityTab, label: 'Transfers' },
    { key: 'liquidity' as ActivityTab, label: 'Liquidity' },
    { key: 'staking' as ActivityTab, label: 'Staking' }
  ];

  return (
    <div className="flex mb-6 bg-tertiary rounded-xl p-1">
      {tabs.map((tab) => (
        <button
          key={tab.key}
          onClick={() => onTabChange(tab.key)}
          className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
            activeTab === tab.key
              ? 'bg-accent-green text-white'
              : 'text-secondary hover:text-primary'
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default ActivityTabs;
