import { GoogleGenAI } from "@google/genai";
import { PortfolioState, CalculationResult } from '../types';

export const generateStrategyReport = async (
  portfolio: PortfolioState, 
  results: CalculationResult
): Promise<string> => {
  if (!process.env.API_KEY) {
    return "API Key is missing. Please check your environment configuration.";
  }

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const targetB = portfolio.targetTokenBPercentage;
  const targetA = 100 - targetB;
  const currentBAlloc = results.currentTokenBAllocation * 100;
  
  const prompt = `
    You are a professional crypto portfolio manager. Analyze this rebalancing strategy.
    
    **Portfolio Configuration:**
    - Token A: ${portfolio.tokenAName} (Target: ${targetA}%)
    - Token B: ${portfolio.tokenBName} (Target: ${targetB}%)
    - Rebalancing Threshold: ${portfolio.threshold}%
    - Target Band for ${portfolio.tokenBName}: ${(targetB - portfolio.threshold).toFixed(1)}% - ${(targetB + portfolio.threshold).toFixed(1)}%

    **Current Holdings:**
    - ${portfolio.tokenAName}: ${portfolio.tokenAAmount.toLocaleString()} tokens @ $${portfolio.tokenAPrice}
    - ${portfolio.tokenBName}: ${portfolio.tokenBAmount.toLocaleString()} tokens @ $${portfolio.tokenBPrice}
    
    **Analysis Results:**
    - Current ${portfolio.tokenBName} Allocation: ${currentBAlloc.toFixed(2)}%
    - Action Required Now: ${results.driftDirection === 'balanced' ? 'None (Hold)' : results.driftDirection === 'overweight' ? `Sell ${portfolio.tokenBName}` : `Buy ${portfolio.tokenBName}`}
    - Limit Order Setup (To maintain band):
      - BUY ${portfolio.tokenBName} if price drops to: $${results.buyTokenBPrice.toFixed(4)}
      - SELL ${portfolio.tokenBName} if price rises to: $${results.sellTokenBPrice.toFixed(4)}

    **Task:**
    Provide a concise, strategic executive summary (max 150 words). 
    1. Confirm current status relative to the custom targets.
    2. Explain the logic of the specific limit order prices calculated.
    3. Give a brief tip on liquidity or volatility considering the gap between current price and trigger prices.
    4. Format with Markdown. Use bolding for key numbers.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });
    return response.text || "Could not generate report.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "An error occurred while generating the strategy report. Please try again later.";
  }
};