export interface PortfolioState {
  tokenAName: string;
  tokenBName: string;
  tokenAAmount: number;
  tokenBAmount: number;
  tokenAPrice: number;
  tokenBPrice: number;
  targetTokenBPercentage: number; // Target allocation for Token B (0-100)
  threshold: number; // Percentage, e.g., 5 for 5%
}

export interface CalculationResult {
  currentTokenAValue: number;
  currentTokenBValue: number;
  totalValue: number;
  currentTokenBAllocation: number; // 0 to 1
  sellTokenBPrice: number; // Price to hit upper bound
  buyTokenBPrice: number; // Price to hit lower bound
  sellTokenBAmount: number; // Amount to sell to return to target at trigger price
  buyTokenBAmount: number; // Amount to buy to return to target at trigger price
  isDrifted: boolean;
  driftDirection: 'overweight' | 'underweight' | 'balanced';
}

export enum RebalanceAction {
  BUY = 'BUY',
  SELL = 'SELL',
  HOLD = 'HOLD'
}