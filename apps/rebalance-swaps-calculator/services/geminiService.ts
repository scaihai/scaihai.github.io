import { Asset, RebalanceResult, TradeAction } from "../types";

/**
 * Calculates optimal trades to rebalance portfolio locally without AI.
 * Strategy:
 * 1. Check if any asset's deviation exceeds the threshold.
 * 2. If yes, calculate trades to restore all assets to their exact target allocation.
 * 3. If no, recommend no trades (Hold).
 */
export const calculateOptimalRebalance = async (
  assets: Asset[],
  threshold: number
): Promise<RebalanceResult> => {
  // Simulate a short delay for UI consistency (optional, feels more "processed")
  await new Promise((resolve) => setTimeout(resolve, 600));

  const totalValue = assets.reduce((sum, a) => sum + (a.holdings * a.price), 0);

  if (totalValue === 0) {
    return {
      trades: [],
      summary: "Total portfolio value is zero. Add assets with price and holdings to calculate rebalancing."
    };
  }

  // 1. Calculate Allocations and Deviations
  const analysis = assets.map((asset) => {
    const currentValue = asset.holdings * asset.price;
    const currentAllocation = (currentValue / totalValue) * 100;
    const deviation = currentAllocation - asset.targetAllocation;
    const targetValue = totalValue * (asset.targetAllocation / 100);
    const diffValue = targetValue - currentValue; // Positive means Buy, Negative means Sell

    return {
      asset,
      currentValue,
      currentAllocation,
      deviation,
      targetValue,
      diffValue,
    };
  });

  // 2. Check Global Threshold
  // If ALL assets are within the threshold (e.g., +/- 10%), do nothing.
  const maxDeviation = Math.max(...analysis.map((a) => Math.abs(a.deviation)));
  const isBalanced = maxDeviation <= threshold;

  if (isBalanced) {
    return {
      trades: [],
      summary: `Your portfolio is balanced. The maximum asset deviation (${maxDeviation.toFixed(1)}%) is within your ${threshold}% threshold. No swaps required.`
    };
  }

  // 3. Generate Trades
  // Since we are outside threshold, we rebalance to target.
  // We filter out extremely small trades (e.g. less than $1) to avoid "dust" trades.
  const trades = analysis
    .filter((item) => Math.abs(item.diffValue) > 1) 
    .map((item) => {
      const isBuy = item.diffValue > 0;
      const amount = Math.abs(item.diffValue);
      const units = amount / item.asset.price;

      return {
        ticker: item.asset.ticker,
        action: isBuy ? TradeAction.BUY : TradeAction.SELL,
        units: Number(units.toFixed(6)), // Standard precision
        value: Number(amount.toFixed(2)),
        reason: `Allocation is ${item.currentAllocation.toFixed(1)}% (Target: ${item.asset.targetAllocation}%)`
      };
    });

  // Sort trades: Sells first (to free up cash), then Buys. Or just by value.
  // Let's sort by Value Descending to show biggest moves first.
  trades.sort((a, b) => b.value - a.value);

  return {
    trades,
    summary: `Portfolio deviation (${maxDeviation.toFixed(1)}%) exceeds the ${threshold}% threshold. Optimization strategy: Rebalance assets to target allocations.`
  };
};
