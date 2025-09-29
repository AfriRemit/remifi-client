const BuyReceiveCards: React.FC = () => {
  const cards = [
    {
      title: 'Buy Coins',
      description: 'Purchase with a debit card or bank account.',
      icon: (
        <img src="/assets/Vector.svg" alt="Buy" className="w-8 h-8" />
      )
    },
    {
      title: 'Receive Coins',
      description: 'Transfer from another wallet or account.',
      icon: (
        <img src="/assets/Icons (1).svg" alt="Receive" className="w-8 h-8" />
      )
    }
  ];

  return (
    <div className="grid grid-cols-1 gap-4">
      {cards.map((card, index) => (
        <button
          key={index}
          className="bg-secondary rounded-xl p-8 text-center hover:bg-tertiary transition-colors duration-200 group"
        >
          <div className="flex items-center justify-center mx-auto mb-3 group-hover:scale-105 transition-transform duration-200">
            {card.icon}
          </div>
          <h3 className="text-xl font-semibold text-primary mb-2">{card.title}</h3>
          <p className="text-secondary text-base max-w-xl mx-auto">{card.description}</p>
        </button>
      ))}
    </div>
  );
};

export default BuyReceiveCards;
