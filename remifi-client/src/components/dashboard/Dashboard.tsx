import BalanceCard from './BalanceCard';
import QuickActions from './QuickActions';
import PinSetup from './PinSetup';
import TokensActivity from './TokensActivity';
import BuyReceiveCards from './BuyReceiveCards';

const Dashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-primary">
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-8 md:pt-24">
        <div className="grid grid-cols-1 lg:grid-cols-[940px_1fr] xl:grid-cols-[920px_1fr] gap-8">
          {/* Left column - constrained width */}
          <div className="space-y-8">
            {/* Balance Section */}
            <div>
              <BalanceCard />
            </div>

            {/* Quick Actions */}
            <div>
              <QuickActions />
            </div>

            {/* PIN Setup */}
            <div>
              <PinSetup />
            </div>

            {/* Tokens/Activity Section */}
            <div>
              <TokensActivity />
            </div>

            {/* Buy/Receive Cards */}
            <div>
              <BuyReceiveCards />
            </div>
          </div>

          {/* Right column - intentionally empty to match visual spacing */}
          <div className="hidden lg:block" />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
