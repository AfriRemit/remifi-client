export type TokenSymbol = 'NGN' | 'GHS' | 'KES' | 'ZAR' | 'USDT' | 'FLARE';

export interface TokenMeta {
  symbol: TokenSymbol;
  name: string;
  icon: string; // public path to svg/png
  decimals: number;
}

export const TOKENS: Record<TokenSymbol, TokenMeta> = {
  NGN: { symbol: 'NGN', name: 'Nigerian Naira', icon: '/assets/ngn.svg', decimals: 2 },
  GHS: { symbol: 'GHS', name: 'Ghanaian Cedi', icon: '/assets/ghs.svg', decimals: 2 },
  KES: { symbol: 'KES', name: 'Kenyan Shilling', icon: '/assets/kes.svg', decimals: 2 },
  ZAR: { symbol: 'ZAR', name: 'South African Rand', icon: '/assets/zar.svg', decimals: 2 },
  USDT: { symbol: 'USDT', name: 'Tether USD', icon: '/assets/USDT.svg', decimals: 6 },
  FLARE: { symbol: 'FLARE', name: 'Flare', icon: '/assets/flare.svg', decimals: 6 },
};

export const POPULAR_TOKENS: TokenSymbol[] = ['NGN', 'GHS', 'KES', 'ZAR', 'USDT'];

// Very rough mock prices vs USDT for demo purposes
export const MOCK_PRICES_USDT: Record<TokenSymbol, number> = {
  USDT: 1,
  FLARE: 0.25,
  NGN: 1 / 1310,
  GHS: 1 / 15.7,
  KES: 1 / 128,
  ZAR: 1 / 18.3,
};

export function getQuote(amount: number, from: TokenSymbol, to: TokenSymbol): number {
  if (!Number.isFinite(amount) || amount <= 0) return 0;
  const fromInUsdt = amount * (MOCK_PRICES_USDT[from] ?? 0);
  const toPrice = MOCK_PRICES_USDT[to] ?? 0;
  if (toPrice === 0) return 0;
  // apply simple 0.3% fee to mimic AMM
  const amountAfterFee = fromInUsdt * 0.997;
  return amountAfterFee / toPrice;
}

