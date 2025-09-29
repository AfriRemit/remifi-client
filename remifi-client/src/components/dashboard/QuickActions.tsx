const QuickActions: React.FC = () => {
  const actions = [
    {
      name: 'Swap',
      icon: <img src="/assets/swap-icon.svg" alt="Swap" className="w-6 h-6" />
    },
    {
      name: 'Fund',
      icon: <img src="/assets/Group.svg" alt="Fund" className="w-6 h-6" />
    },
    {
      name: 'Send',
      icon: <img src="/assets/Icons (1).svg" alt="Send" className="w-6 h-6" />
    },
    {
      name: 'Receive',
      icon: <img src="/assets/Icons.svg" alt="Receive" className="w-6 h-6" />
    },
    
  ];

  return (
    <div className="grid grid-cols-4 gap-4">
      {actions.map((action, index) => (
        <button
          key={index}
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
