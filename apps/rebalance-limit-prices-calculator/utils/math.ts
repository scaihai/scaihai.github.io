import { PortfolioState, CalculationResult } from '../types';

export const calculateRebalancing = (portfolio: PortfolioState): CalculationResult => {
  const { 
    tokenAAmount, 
    tokenBAmount, 
    tokenAPrice, 
    tokenBPrice, 
    threshold,
    targetTokenBPercentage
  } = portfolio;
  
  const currentTokenAValue = tokenAAmount * tokenAPrice;
  const currentTokenBValue = tokenBAmount * tokenBPrice;
  const totalValue = currentTokenAValue + currentTokenBValue;
  
  // Avoid division by zero
  if (totalValue === 0) {
    return {
      currentTokenAValue: 0,
      currentTokenBValue: 0,
      totalValue: 0,
      currentTokenBAllocation: 0,
      sellTokenBPrice: 0,
      buyTokenBPrice: 0,
      sellTokenBAmount: 0,
      buyTokenBAmount: 0,
      isDrifted: false,
      driftDirection: 'balanced'
    };
  }

  const currentTokenBAllocation = currentTokenBValue / totalValue;

  // Target Allocation
  const targetAlloc = targetTokenBPercentage / 100;
  const thresholdDecimal = threshold / 100;
  
  const upperLimitAlloc = targetAlloc + thresholdDecimal; 
  const lowerLimitAlloc = targetAlloc - thresholdDecimal; 

  // Formula derivation for Prices:
  // TargetWeight = (H * Ph) / (H * Ph + U * Pu)
  // ... where H is Token B, U is Token A
  // Ph = (TargetWeight * U * Pu) / (H * (1 - TargetWeight))

  // Price to SELL Token B (when allocation hits Upper Limit)
  // We cap upper limit at 0.99 to avoid division by zero
  const safeUpper = Math.min(upperLimitAlloc, 0.99);
  const sellTokenBPrice = tokenBAmount > 0 
    ? (safeUpper * tokenAAmount * tokenAPrice) / (tokenBAmount * (1 - safeUpper))
    : 0;

  // Price to BUY Token B (when allocation hits Lower Limit)
  // We cap lower limit at 0.01 
  const safeLower = Math.max(lowerLimitAlloc, 0.01);
  const buyTokenBPrice = tokenBAmount > 0
    ? (safeLower * tokenAAmount * tokenAPrice) / (tokenBAmount * (1 - safeLower))
    : 0;

  // Calculate Quantities to trade to return to Target Allocation
  // At the trigger price, Total Value changes. We calculate the amount of Token B needed to equal Target Allocation.
  
  // 1. Sell Scenario (Price goes UP to sellTokenBPrice)
  let sellTokenBAmount = 0;
  if (sellTokenBPrice > 0) {
    const totalValueAtTrigger = (tokenAAmount * tokenAPrice) + (tokenBAmount * sellTokenBPrice);
    // At this point, we are at UpperLimit. We want to get back to TargetAlloc.
    const targetValueB = totalValueAtTrigger * targetAlloc;
    const targetAmountB = targetValueB / sellTokenBPrice;
    sellTokenBAmount = Math.max(0, tokenBAmount - targetAmountB);
  }

  // 2. Buy Scenario (Price goes DOWN to buyTokenBPrice)
  let buyTokenBAmount = 0;
  if (buyTokenBPrice > 0) {
    const totalValueAtTrigger = (tokenAAmount * tokenAPrice) + (tokenBAmount * buyTokenBPrice);
    // At this point, we are at LowerLimit. We want to get back to TargetAlloc.
    const targetValueB = totalValueAtTrigger * targetAlloc;
    const targetAmountB = targetValueB / buyTokenBPrice;
    buyTokenBAmount = Math.max(0, targetAmountB - tokenBAmount);
  }

  let driftDirection: 'overweight' | 'underweight' | 'balanced' = 'balanced';
  if (currentTokenBAllocation > upperLimitAlloc) driftDirection = 'overweight';
  if (currentTokenBAllocation < lowerLimitAlloc) driftDirection = 'underweight';

  return {
    currentTokenAValue,
    currentTokenBValue,
    totalValue,
    currentTokenBAllocation,
    sellTokenBPrice,
    buyTokenBPrice,
    sellTokenBAmount,
    buyTokenBAmount,
    isDrifted: driftDirection !== 'balanced',
    driftDirection
  };
};