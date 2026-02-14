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

  // Formula derivation:
  // TargetWeight = (H * Ph) / (H * Ph + U * Pu)
  // ... where H is Token B, U is Token A
  // Ph = (TargetWeight * U * Pu) / (H * (1 - TargetWeight))

  // Price to SELL Token B (when allocation hits Upper Limit)
  // We cap upper limit at 0.99 to avoid division by zero
  const safeUpper = Math.min(upperLimitAlloc, 0.99);
  // Avoid division by zero if tokenBAmount is 0
  const sellTokenBPrice = tokenBAmount > 0 
    ? (safeUpper * tokenAAmount * tokenAPrice) / (tokenBAmount * (1 - safeUpper))
    : 0;

  // Price to BUY Token B (when allocation hits Lower Limit)
  // We cap lower limit at 0.01 
  const safeLower = Math.max(lowerLimitAlloc, 0.01);
  const buyTokenBPrice = tokenBAmount > 0
    ? (safeLower * tokenAAmount * tokenAPrice) / (tokenBAmount * (1 - safeLower))
    : 0;

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
    isDrifted: driftDirection !== 'balanced',
    driftDirection
  };
};