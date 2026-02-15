export interface SimulationConfig {
  initialCapital: number;
  targetBtcPercent: number; // 0-100
  rebalanceThreshold: number; // 0-100
}

export interface PortfolioState {
  cash: number;
  btcAmount: number;
  btcPrice: number;
  totalEquity: number;
  day: number;
  date: string; // Added for CSV data
}

export interface TradeRecord {
  day: number;
  date: string; // Added for CSV data
  type: 'BUY' | 'SELL' | 'HOLD' | 'INIT';
  btcPrice: number;
  btcAmountDelta: number; // Positive for Buy, Negative for Sell
  cashDelta: number;      // Negative for Buy, Positive for Sell
  reason: string;
  totalEquity: number;
  btcAllocation: number; // Percentage 0-100
}

export interface HistoryPoint {
  day: number;
  date: string; // Added for CSV data
  equity: number;
  holdEquity: number; // Equity if we just held the initial amount without rebalancing
  btcPrice: number;
}