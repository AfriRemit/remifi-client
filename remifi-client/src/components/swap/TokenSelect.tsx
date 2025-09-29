import React, { useState } from 'react';
import { TokenSymbol, TOKENS } from './tokens';
import TokenIcon from './TokenIcon';
import TokenListModal from './TokenListModal';

interface TokenSelectProps {
  symbol: TokenSymbol;
  onChange: (symbol: TokenSymbol) => void;
}

const TokenSelect: React.FC<TokenSelectProps> = ({ symbol, onChange }) => {
  const [open, setOpen] = useState(false);
  const meta = TOKENS[symbol];

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 bg-tertiary rounded-full px-3 py-2 hover:bg-quaternary"
      >
        <TokenIcon symbol={symbol} />
        <span className="text-primary font-medium">{symbol}</span>
        <svg className="w-3.5 h-3.5 text-secondary" viewBox="0 0 24 24" fill="currentColor"><path d="M7 10l5 5 5-5H7z"/></svg>
      </button>

      <TokenListModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onSelect={(s) => onChange(s)}
      />
    </>
  );
};

export default TokenSelect;

