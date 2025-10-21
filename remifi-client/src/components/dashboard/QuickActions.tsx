import React from 'react';
import { useNavigate } from 'react-router-dom';

const QuickActions: React.FC = () => {
  const navigate = useNavigate();

  const actions = [
    {
      name: 'Swap',
      icon: <img src="/assets/swap-icon.svg" alt="Swap" className="w-6 h-6" />,
      onClick: () => navigate('/swap')
    },
    {
      name: 'Utilities',
      icon: <img src="/assets/utility.svg" alt="Utilities" className="w-6 h-6" />,
      onClick: () => navigate('/utilities')
    },
    {
      name: 'Deposit',
      icon: <img src="/assets/Group.svg" alt="Deposit" className="w-6 h-6" />,
      onClick: () => navigate('/buy-sell')
    },
    {
      name: 'Send/Receive',
      icon: <img src="/assets/Icons (1).svg" alt="Send/Receive" className="w-6 h-6" />,
      onClick: () => {
        // Placeholder for send/receive functionality
        alert('Send/Receive feature coming soon!');
      }
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {actions.map((action, index) => (
        <button
          key={index}
          onClick={action.onClick}
          className="w-full h-28 flex flex-col items-start justify-start gap-3 p-5 bg-secondary rounded-lg hover:bg-tertiary transition-colors duration-200 group text-left"
        >
          <div className="w-6 h-6 shrink-0 mb-4 group-hover:scale-105 transition-transform duration-200">
            {action.icon}
          </div>
          <span className="text-sm font-medium text-primary">{action.name}</span>
        </button>
      ))}
    </div>
  );
};

export default QuickActions;
