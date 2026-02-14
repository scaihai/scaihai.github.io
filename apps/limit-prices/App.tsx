import React, { useState, useEffect, useMemo } from 'react';
import { RefreshCw, Wallet, TrendingUp, AlertTriangle, ArrowRightLeft, RotateCcw } from 'lucide-react';
import AllocationChart from './components/AllocationChart';
import StatCard from './components/StatCard';
import { PortfolioState, CalculationResult } from './types';
import { calculateRebalancing } from './utils/math';

const DEFAULT_STATE: PortfolioState = {
  tokenAName: 'USDC',
  tokenBName: 'Humanity',
  tokenAAmount: 10000,
  tokenBAmount: 5000,
  tokenAPrice: 1.00,
  tokenBPrice: 2.50,
  targetTokenBPercentage: 60,
  threshold: 5,
};

const App: React.FC = () => {
  // --- State ---
  const [portfolio, setPortfolio] = useState<PortfolioState>(() => {
    try {
      const saved = localStorage.getItem('rebalancer_state');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error("Failed to load state", e);
    }
    return DEFAULT_STATE;
  });

  // --- Effects ---
  useEffect(() => {
    localStorage.setItem('rebalancer_state', JSON.stringify(portfolio));
  }, [portfolio]);

  // --- Calculations ---
  const results: CalculationResult = useMemo(() => {
    return calculateRebalancing(portfolio);
  }, [portfolio]);

  // --- Handlers ---
  const handleInputChange = (field: keyof PortfolioState, value: string | number) => {
    setPortfolio(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleReset = () => {
    if (window.confirm("Reset all settings to default?")) {
      setPortfolio(DEFAULT_STATE);
    }
  };

  // --- Render Helpers ---
  const formatCurrency = (val: number) => 
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(val);
  
  const formatPrice = (val: number) => 
    val < 1 ? val.toFixed(4) : val.toFixed(2);

  const targetTokenA = 100 - portfolio.targetTokenBPercentage;
  const minBand = portfolio.targetTokenBPercentage - portfolio.threshold;
  const maxBand = portfolio.targetTokenBPercentage + portfolio.threshold;

  return (
    <div className="min-h-screen bg-dark-900 text-gray-100 p-6 md:p-10 font-sans selection:bg-brand-500/30">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Header */}
        <div className="lg:col-span-12 flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
          <div>
            <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-emerald-600 flex items-center gap-4">
              <RefreshCw className="text-brand-500" size={48} />
              Rebalancer.ai
            </h1>
            <p className="text-xl text-gray-300 mt-2">
              Target: <span className="text-gray-100 font-medium">{targetTokenA}% {portfolio.tokenAName}</span> / <span className="text-gray-100 font-medium">{portfolio.targetTokenBPercentage}% {portfolio.tokenBName}</span>
            </p>
          </div>
          <div className="mt-6 md:mt-0 flex gap-2">
             <button 
               onClick={handleReset}
               className="p-3 rounded-xl bg-dark-800 hover:bg-dark-700 text-gray-300 transition-colors"
               title="Reset Defaults"
             >
               <RotateCcw size={24} />
             </button>
          </div>
        </div>

        {/* Left Column: Inputs & Stats */}
        <div className="lg:col-span-4 space-y-8">
          
          {/* Input Card */}
          <div className="bg-dark-800 border border-dark-700 rounded-2xl p-6 shadow-xl">
            <h2 className="text-2xl font-semibold mb-6 flex items-center gap-3 text-gray-100">
              <Wallet size={28} className="text-brand-400" />
              Portfolio Configuration
            </h2>
            
            <div className="space-y-6">
              
              {/* Token Names Config */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                   <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Asset 1 Name</label>
                   <input
                      type="text"
                      value={portfolio.tokenAName}
                      onChange={(e) => handleInputChange('tokenAName', e.target.value)}
                      className="w-full bg-dark-900 border border-dark-600 rounded-xl p-3 text-lg font-bold text-center focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-blue-400 transition-all text-gray-200"
                    />
                </div>
                <div className="space-y-1">
                   <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Asset 2 Name</label>
                   <input
                      type="text"
                      value={portfolio.tokenBName}
                      onChange={(e) => handleInputChange('tokenBName', e.target.value)}
                      className="w-full bg-dark-900 border border-dark-600 rounded-xl p-3 text-lg font-bold text-center focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none text-emerald-400 transition-all text-gray-200"
                    />
                </div>
              </div>

              {/* Target Allocation Slider */}
              <div className="space-y-3 pb-4 border-b border-dark-700">
                 <div className="flex justify-between items-center">
                    <label className="text-sm font-medium text-gray-300 uppercase tracking-wider">Target Allocation</label>
                 </div>
                 <div className="flex items-center gap-4">
                    <span className="text-base font-bold text-blue-400 w-12 text-right">{targetTokenA}%</span>
                    <input 
                      type="range" 
                      min="1" 
                      max="99" 
                      value={portfolio.targetTokenBPercentage}
                      onChange={(e) => handleInputChange('targetTokenBPercentage', parseInt(e.target.value))}
                      className="flex-1 h-3 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-lg appearance-none cursor-pointer"
                    />
                    <span className="text-base font-bold text-emerald-400 w-12">{portfolio.targetTokenBPercentage}%</span>
                 </div>
                 <div className="flex justify-between text-xs text-gray-400 px-16 font-medium">
                    <span>{portfolio.tokenAName}</span>
                    <span>{portfolio.tokenBName}</span>
                 </div>
              </div>

              {/* Token A Section */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-blue-400 uppercase tracking-wider">{portfolio.tokenAName} Holdings</label>
                <div className="grid grid-cols-2 gap-3">
                  <div className="relative">
                    <input
                      type="number"
                      value={portfolio.tokenAAmount}
                      onChange={(e) => handleInputChange('tokenAAmount', parseFloat(e.target.value) || 0)}
                      className="w-full bg-dark-900 border border-dark-600 rounded-xl p-3 text-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-gray-200"
                    />
                    <span className="absolute right-3 top-4 text-gray-400 text-sm font-medium">Amt</span>
                  </div>
                   <div className="relative">
                    <input
                      type="number"
                      value={portfolio.tokenAPrice}
                      onChange={(e) => handleInputChange('tokenAPrice', parseFloat(e.target.value) || 0)}
                      className="w-full bg-dark-900 border border-dark-600 rounded-xl p-3 text-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-gray-200"
                    />
                    <span className="absolute right-3 top-4 text-gray-400 text-sm font-medium">$ Price</span>
                  </div>
                </div>
              </div>

              {/* Token B Section */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-emerald-400 uppercase tracking-wider">{portfolio.tokenBName} Holdings</label>
                <div className="grid grid-cols-2 gap-3">
                  <div className="relative">
                    <input
                      type="number"
                      value={portfolio.tokenBAmount}
                      onChange={(e) => handleInputChange('tokenBAmount', parseFloat(e.target.value) || 0)}
                      className="w-full bg-dark-900 border border-dark-600 rounded-xl p-3 text-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all text-gray-200"
                    />
                    <span className="absolute right-3 top-4 text-gray-400 text-sm font-medium">Amt</span>
                  </div>
                   <div className="relative">
                    <input
                      type="number"
                      value={portfolio.tokenBPrice}
                      onChange={(e) => handleInputChange('tokenBPrice', parseFloat(e.target.value) || 0)}
                      className="w-full bg-dark-900 border border-dark-600 rounded-xl p-3 text-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all text-gray-200"
                    />
                    <span className="absolute right-3 top-4 text-gray-400 text-sm font-medium">$ Price</span>
                  </div>
                </div>
              </div>

              {/* Threshold Section */}
              <div className="space-y-3 pt-4 border-t border-dark-700">
                 <div className="flex justify-between items-center">
                    <label className="text-sm font-medium text-gray-300 uppercase tracking-wider">Drift Threshold</label>
                    <span className="text-base font-bold text-brand-400 font-mono">{portfolio.threshold}%</span>
                 </div>
                 <input 
                    type="range" 
                    min="1" 
                    max="15" 
                    step="0.5"
                    value={portfolio.threshold}
                    onChange={(e) => handleInputChange('threshold', parseFloat(e.target.value))}
                    className="w-full h-3 bg-dark-600 rounded-lg appearance-none cursor-pointer accent-brand-500"
                 />
                 <div className="flex justify-between text-xs text-gray-400 font-medium">
                    <span>Stricter (1%)</span>
                    <span>Looser (15%)</span>
                 </div>
              </div>
            </div>
          </div>

          {/* Allocation Stats */}
          <div className="grid grid-cols-2 gap-4">
             <StatCard 
                label="Total Value" 
                value={formatCurrency(results.totalValue)} 
                icon={<TrendingUp size={24} />}
             />
             <StatCard 
                label={`Current ${portfolio.tokenBName}`} 
                value={`${(results.currentTokenBAllocation * 100).toFixed(1)}%`}
                subValue={`Target: ${portfolio.targetTokenBPercentage}% (±${portfolio.threshold}%)`}
                colorClass={results.isDrifted ? 'text-orange-400' : 'text-emerald-400'}
             />
          </div>

        </div>

        {/* Right Column: Visuals & Logic */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Main Chart Area */}
          <div className="bg-dark-800 border border-dark-700 rounded-2xl p-8 shadow-xl relative overflow-hidden">
             <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
                <RefreshCw size={160} />
             </div>
             
             <div className="flex flex-col md:flex-row items-center gap-10">
                <div className="w-full md:w-1/2">
                   <h3 className="text-2xl font-medium text-gray-200 mb-6">Allocation Breakdown</h3>
                   <AllocationChart 
                      tokenAName={portfolio.tokenAName}
                      tokenBName={portfolio.tokenBName}
                      tokenAValue={results.currentTokenAValue} 
                      tokenBValue={results.currentTokenBValue} 
                   />
                </div>
                
                <div className="w-full md:w-1/2 space-y-6">
                   <h3 className="text-2xl font-medium text-gray-200 mb-3">Rebalancing Status</h3>
                   
                   {/* Status Indicator */}
                   <div className={`p-6 rounded-2xl border ${
                      results.driftDirection === 'balanced' 
                      ? 'bg-emerald-900/20 border-emerald-500/30' 
                      : 'bg-orange-900/20 border-orange-500/30'
                   }`}>
                      <div className="flex items-center gap-4">
                        {results.driftDirection === 'balanced' ? (
                           <div className="w-14 h-14 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
                              <RefreshCw size={28} />
                           </div>
                        ) : (
                           <div className="w-14 h-14 rounded-full bg-orange-500/20 flex items-center justify-center text-orange-400 shrink-0">
                              <AlertTriangle size={28} />
                           </div>
                        )}
                        <div>
                           <div className="text-xl font-bold text-gray-100 uppercase tracking-wide">
                              {results.driftDirection === 'balanced' ? 'Portfolio Balanced' : 'Rebalance Needed'}
                           </div>
                           <div className="text-base text-gray-300 mt-1">
                              {results.driftDirection === 'overweight' && `${portfolio.tokenBName} is overweight (> ${maxBand}%)`}
                              {results.driftDirection === 'underweight' && `${portfolio.tokenBName} is underweight (< ${minBand}%)`}
                              {results.driftDirection === 'balanced' && `Within ${minBand.toFixed(1)}% - ${maxBand.toFixed(1)}% band`}
                           </div>
                        </div>
                      </div>
                   </div>

                   {/* Current Price Reference */}
                   <div className="flex items-center justify-between text-base px-2">
                      <span className="text-gray-400 font-medium">Current {portfolio.tokenBName} Price:</span>
                      <span className="text-white text-lg font-mono bg-dark-700 px-3 py-1.5 rounded-lg border border-dark-600">
                        ${formatPrice(portfolio.tokenBPrice)}
                      </span>
                   </div>
                </div>
             </div>
          </div>

          {/* Limit Orders Logic */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* BUY ORDER CARD */}
            <div className={`relative overflow-hidden rounded-2xl p-8 border transition-colors ${
               results.driftDirection === 'underweight' 
               ? 'bg-brand-900/20 border-brand-500 shadow-[0_0_20px_rgba(34,197,94,0.15)]' 
               : 'bg-dark-800 border-dark-700 opacity-80 hover:opacity-100'
            }`}>
               <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center gap-3">
                     <div className="p-3 bg-brand-500/10 rounded-xl text-brand-400">
                        <ArrowRightLeft size={24} />
                     </div>
                     <h4 className="text-xl font-semibold text-gray-100">Lower Band</h4>
                  </div>
                  <span className="text-sm font-mono text-gray-400 mt-1">{minBand.toFixed(1)}% {portfolio.tokenBName}</span>
               </div>
               
               <div className="text-lg text-gray-300 mb-2 font-medium">Buy {portfolio.tokenBName} at</div>
               <div className="text-5xl font-bold text-brand-400 tracking-tight font-mono">
                  ${formatPrice(results.buyTokenBPrice)}
               </div>
               <div className="mt-6 text-sm text-gray-400 border-t border-brand-500/20 pt-4 font-medium">
                  If price drops to this level, allocation falls to {minBand.toFixed(1)}%. Buy to rebalance.
               </div>
            </div>

             {/* SELL ORDER CARD */}
             <div className={`relative overflow-hidden rounded-2xl p-8 border transition-colors ${
               results.driftDirection === 'overweight' 
               ? 'bg-orange-900/10 border-orange-500 shadow-[0_0_20px_rgba(249,115,22,0.15)]' 
               : 'bg-dark-800 border-dark-700 opacity-80 hover:opacity-100'
            }`}>
               <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center gap-3">
                     <div className="p-3 bg-orange-500/10 rounded-xl text-orange-400">
                        <ArrowRightLeft size={24} />
                     </div>
                     <h4 className="text-xl font-semibold text-gray-100">Upper Band</h4>
                  </div>
                  <span className="text-sm font-mono text-gray-400 mt-1">{maxBand.toFixed(1)}% {portfolio.tokenBName}</span>
               </div>
               
               <div className="text-lg text-gray-300 mb-2 font-medium">Sell {portfolio.tokenBName} at</div>
               <div className="text-5xl font-bold text-orange-400 tracking-tight font-mono">
                  ${formatPrice(results.sellTokenBPrice)}
               </div>
               <div className="mt-6 text-sm text-gray-400 border-t border-orange-500/20 pt-4 font-medium">
                  If price rises to this level, allocation hits {maxBand.toFixed(1)}%. Sell to rebalance.
               </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};

export default App;