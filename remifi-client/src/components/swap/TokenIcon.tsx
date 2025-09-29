import React from 'react';
import { TOKENS, type TokenSymbol } from './tokens';

interface TokenIconProps {
  symbol: TokenSymbol;
  size?: number;
}

const TokenIcon: React.FC<TokenIconProps> = ({ symbol, size = 20 }) => {
  const meta = TOKENS[symbol];
  return (
    <img src={meta.icon} alt={`${meta.name} icon`} style={{ width: size, height: size }} className="rounded-full" />
  );
};

export default TokenIcon;

