export interface Asset {
  id: string;
  ticker: string;
  holdings: number;
  price: number;
  targetAllocation: number; // Percentage 0-100
}

export interface PortfolioSummary {
  totalValue: number;
  assets: (Asset & {
    currentValue: number;
    currentAllocation: number;
  })[];
}

export enum TradeAction {
  BUY = 'BUY',
  SELL = 'SELL',
  HOLD = 'HOLD',
}

export interface TradeRecommendation {
  ticker: string;
  action: TradeAction;
  units: number;
  value: number;
  reason: string;
}

export interface RebalanceResult {
  trades: TradeRecommendation[];
  summary: string;
  estimatedFees?: number;
}
