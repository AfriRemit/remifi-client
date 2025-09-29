const TetherIcon = '/assets/USDT.svg';
const FrameIcon = '/assets/flare.svg';
const SwapIcon = '/assets/swap-icon.svg';
const NGNFlag = '/assets/ngn.svg';
const GHSFlag = '/assets/ghs.svg';
const KESFlag = '/assets/kes.svg';
const ZARFlag = '/assets/zar.svg';

const HeroSection: React.FC = () => {
  return (
    <section className="relative px-6 py-16 bg-primary overflow-hidden">
      {/* Background gradient effects */}
      <div className="absolute top-80 right-0 md:top-0 w-48 h-48 md:w-96 md:h-96 bg-gradient-radial from-red-500/20 via-orange-500/20 to-transparent rounded-full blur-3xl"></div>
      <div className="absolute top-96 right-20 md:top-20 w-32 h-32 md:w-64 md:h-64 bg-gradient-radial from-green-500/20 via-blue-500/20 to-transparent rounded-full blur-2xl"></div>
      

      <div className="relative max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center z-10">
        {/* Left Content */}
        <div className="space-y-8">
          <div className="space-y-4">
            <h1 className="text-5xl lg:text-6xl font-medium text-primary leading-tight">
              Swap stablecoins instantly
            </h1>
            <p className="text-xl text-secondary">
              Fast, low-fee swaps for every stablecoin
            </p>
          </div>
          
          <div className="space-y-4">
            <p className="text-lg text-secondary">Trusted by communities in</p>
            <div className="flex items-center">
              {/* Horizontally stacked flags with hover expansion */}
              <div className="flex items-center space-x-2">
                <img src={NGNFlag} alt="Nigeria" className="w-12 h-12 rounded-full object-cover border border-white/40 shadow-lg hover:scale-125 hover:z-10 transition-all duration-300 cursor-pointer" />
                <img src={GHSFlag} alt="Ghana" className="w-12 h-12 rounded-full object-cover border border-white/40 shadow-lg hover:scale-125 hover:z-10 transition-all duration-300 cursor-pointer" />
                <img src={KESFlag} alt="Kenya" className="w-12 h-12 rounded-full object-cover border border-white/40 shadow-lg hover:scale-125 hover:z-10 transition-all duration-300 cursor-pointer" />
                <img src={ZARFlag} alt="South Africa" className="w-12 h-12 rounded-full object-cover border border-white/40 shadow-lg hover:scale-125 hover:z-10 transition-all duration-300 cursor-pointer" />
              </div>
            </div>
          </div>
        </div>

        {/* Right Content - Swap Widget */}
        <div>
          {/* You Send Section */}
          <div className="bg-secondary rounded-2xl p-6 space-y-3 -mb-7">
            <div className="flex items-center justify-between">
              <span className="text-sm text-secondary">You send</span>
              <div className="flex space-x-2">
                <button className="px-3 py-1 bg-tertiary hover:bg-quaternary text-primary text-sm rounded-full transition-colors duration-200">
                  25%
                </button>
                <button className="px-3 py-1 bg-tertiary hover:bg-quaternary text-primary text-sm rounded-full transition-colors duration-200">
                  50%
                </button>
                <button className="px-3 py-1 bg-tertiary hover:bg-quaternary text-primary text-sm rounded-full transition-colors duration-200">
                  75%
                </button>
                <button className="px-3 py-1 bg-accent-green text-white text-sm rounded-full transition-colors duration-200">
                  Max
                </button>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold text-primary">0</div>
                <div className="text-sm text-secondary">$0.00</div>
              </div>
              <div className="flex items-center space-x-2 bg-tertiary rounded-full px-3 py-2">
                <img src={FrameIcon} alt="Flare" className="w-6 h-6 rounded-full" />
                <span className="text-primary font-medium">Flare</span>
              </div>
            </div>
          </div>

          {/* Swap Toggle Icon - Floating between sections */}
          <div className="flex justify-center">
            <div className="w-12 h-12 bg-tertiary rounded-full flex items-center justify-center hover:bg-quaternary transition-colors duration-200 cursor-pointer">
              <img 
                src={SwapIcon} 
                alt="Swap toggle" 
                className="w-6 h-6"
                style={{ filter: 'brightness(0) saturate(100%) invert(100%)' }}
              />
            </div>
          </div>

          {/* You Receive Section */}
          <div className="bg-secondary rounded-2xl p-6 space-y-3 -mt-4">
            <span className="text-sm text-secondary">You receive</span>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold text-primary">0</div>
                <div className="text-sm text-secondary">$0.00</div>
              </div>
              <div className="flex items-center space-x-2 bg-tertiary rounded-full px-3 py-2">
                <img src={TetherIcon} alt="USDT" className="w-6 h-6 rounded-full" />
                <span className="text-primary font-medium">USDT</span>
              </div>
            </div>
          </div>

          {/* Connect Wallet Button */}
          <button className="w-full py-4 mt-4 text-accent-green rounded-full font-medium transition-colors duration-200 border-2 border-accent-green hover:bg-accent-green hover:text-white">
            Connect Wallet
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
