import React from 'react';
import { motion } from 'framer-motion';
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
        <motion.button
          key={index}
          onClick={action.onClick}
          className="w-full h-28 flex flex-col items-start justify-start gap-3 p-5 bg-secondary rounded-lg hover:bg-tertiary transition-colors duration-200 group text-left"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.05 }}
          whileHover={{ y: -4, transition: { duration: 0.2 } }}
          whileTap={{ scale: 0.96 }}
        >
          <motion.div 
            className="w-6 h-6 shrink-0 mb-4"
            whileHover={{ scale: 1.1, rotate: 5 }}
          >
            {action.icon}
          </motion.div>
          <span className="text-sm font-medium text-primary">{action.name}</span>
        </motion.button>
      ))}
    </div>
  );
};

export default QuickActions;
