import React, { useState, useMemo, useEffect } from 'react';
import { Plus, Trash2, AlertCircle, TrendingUp, Settings2, ArrowRightLeft, Loader2 } from 'lucide-react';
import { Asset, RebalanceResult, TradeAction } from './types';
import { calculateOptimalRebalance } from './services/geminiService';
import { Card, Button, Badge } from './components/ui';

export default function App() {
  // State with LocalStorage Initialization
  const [assets, setAssets] = useState<Asset[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('portfolio_assets');
        if (saved) {
          return JSON.parse(saved);
        }
      } catch (e) {
        console.error("Failed to load assets from storage", e);
      }
    }
    // Default fallback if no storage
    return [
      { id: '1', ticker: 'BTC', holdings: 0.5, price: 65000, targetAllocation: 50 },
      { id: '2', ticker: 'ETH', holdings: 5, price: 3500, targetAllocation: 30 },
      { id: '3', ticker: 'SOL', holdings: 100, price: 150, targetAllocation: 20 },
    ];
  });

  const [threshold, setThreshold] = useState<number>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('portfolio_threshold');
        if (saved) return Number(saved);
      } catch (e) {
        console.error("Failed to load threshold from storage", e);
      }
    }
    return 10;
  });

  const [isCalculating, setIsCalculating] = useState(false);
  const [result, setResult] = useState<RebalanceResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Persistence Effects
  useEffect(() => {
    localStorage.setItem('portfolio_assets', JSON.stringify(assets));
  }, [assets]);

  useEffect(() => {
    localStorage.setItem('portfolio_threshold', String(threshold));
  }, [threshold]);

  // Derived State
  const portfolioSummary = useMemo(() => {
    const totalValue = assets.reduce((sum, a) => sum + (a.holdings * a.price), 0);
    const totalTarget = assets.reduce((sum, a) => sum + a.targetAllocation, 0);
    
    const enrichedAssets = assets.map(a => {
      const currentValue = a.holdings * a.price;
      const currentAllocation = totalValue > 0 ? (currentValue / totalValue) * 100 : 0;
      const deviation = currentAllocation - a.targetAllocation;
      
      return {
        ...a,
        currentValue,
        currentAllocation,
        deviation
      };
    });

    return { totalValue, totalTarget, assets: enrichedAssets };
  }, [assets]);

  // Handlers
  const addAsset = () => {
    const newAsset: Asset = {
      id: Math.random().toString(36).substr(2, 9),
      ticker: '',
      holdings: 0,
      price: 0,
      targetAllocation: 0
    };
    setAssets([...assets, newAsset]);
  };

  const removeAsset = (id: string) => {
    setAssets(assets.filter(a => a.id !== id));
  };

  const updateAsset = (id: string, field: keyof Asset, value: string | number) => {
    setAssets(assets.map(a => {
      if (a.id === id) {
        return { ...a, [field]: value };
      }
      return a;
    }));
    // Reset result when data changes
    if (result) setResult(null);
  };

  const handleRebalance = async () => {
    if (Math.abs(portfolioSummary.totalTarget - 100) > 0.01) {
      setError("Total target allocation must equal 100%");
      return;
    }
    setError(null);
    setIsCalculating(true);
    setResult(null);

    try {
      const data = await calculateOptimalRebalance(assets, threshold);
      setResult(data);
    } catch (err) {
      setError("Failed to generate rebalancing strategy. Please check your inputs or try again.");
    } finally {
      setIsCalculating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 font-sans p-2 md:p-4">
      <div className="w-full max-w-[98%] mx-auto space-y-10">
        
        {/* Header */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-8 border-b border-gray-800 pb-10">
          <div>
            <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-cyan-400 tracking-tight">
              Portfolio Rebalancer
            </h1>
            <p className="text-xl text-gray-400 mt-3 flex items-center gap-2">
              <TrendingUp className="w-6 h-6" /> Algorithmic Allocation Optimization
            </p>
          </div>
          
          <div className="flex items-center gap-6 bg-gray-900 p-5 rounded-2xl border border-gray-800 shadow-xl">
             <div className="flex flex-col">
                <span className="text-base text-gray-500 uppercase tracking-wider font-semibold">Total Value</span>
                <span className="text-4xl font-mono font-bold text-white tracking-tight">
                  ${portfolioSummary.totalValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
             </div>
          </div>
        </header>

        {/* Main Content: Vertical Stack for Full Width */}
        <div className="flex flex-col gap-12">
          
          {/* Asset Table Section */}
          <div className="w-full">
            <Card className="p-0 overflow-hidden">
              <div className="p-6 md:p-8 border-b border-gray-800 flex flex-col sm:flex-row sm:items-center justify-between gap-8 bg-gray-900">
                <div className="flex items-center gap-4">
                  <h2 className="text-3xl font-semibold text-gray-100 tracking-tight">Assets & Allocation</h2>
                  <span className="bg-gray-800 text-gray-400 text-base px-3 py-1 rounded-full border border-gray-700 font-medium">
                    {assets.length}
                  </span>
                </div>
                
                <div className="flex items-center gap-6">
                   <div className="flex items-center gap-4 bg-gray-950 px-5 py-3 rounded-xl border border-gray-800">
                      <Settings2 className="w-6 h-6 text-gray-400" />
                      <span className="text-lg text-gray-400 hidden sm:inline">Threshold:</span>
                      <input 
                        type="number" 
                        value={threshold} 
                        onChange={(e) => setThreshold(Number(e.target.value))}
                        className="w-16 bg-transparent text-right font-mono text-xl outline-none focus:text-indigo-400 font-bold"
                      />
                      <span className="text-lg text-gray-500">%</span>
                   </div>
                   <Button variant="secondary" onClick={addAsset} className="gap-3 px-8 text-lg">
                     <Plus className="w-6 h-6" /> 
                     <span className="hidden sm:inline">Add Asset</span>
                     <span className="sm:hidden">Add</span>
                   </Button>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="text-base text-gray-500 uppercase bg-gray-950/50 border-b border-gray-800">
                    <tr>
                      <th className="px-4 py-5 min-w-[120px]">Asset</th>
                      <th className="px-4 py-5 text-right min-w-[140px]">Holdings</th>
                      <th className="px-4 py-5 text-right min-w-[140px]">Price ($)</th>
                      <th className="px-4 py-5 text-right text-gray-400 min-w-[140px]">Value</th>
                      <th className="px-4 py-5 text-right min-w-[120px]">Target %</th>
                      <th className="px-4 py-5 text-right text-gray-400 min-w-[120px]">Current %</th>
                      <th className="px-4 py-5 text-right text-gray-400 min-w-[120px]">Drift</th>
                      <th className="px-4 py-5 w-[80px]"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-800 bg-gray-950/20 text-xl">
                    {assets.length === 0 ? (
                      <tr>
                        <td colSpan={8} className="px-4 py-20 text-center text-xl text-gray-500">
                          No assets added. Click "Add Asset" to begin.
                        </td>
                      </tr>
                    ) : (
                      portfolioSummary.assets.map((asset) => (
                        <tr key={asset.id} className="hover:bg-gray-900/40 transition-colors group">
                          <td className="px-4 py-4">
                            <input
                              type="text"
                              placeholder="SYM"
                              value={asset.ticker}
                              onChange={(e) => updateAsset(asset.id, 'ticker', e.target.value.toUpperCase())}
                              className="w-full bg-transparent font-bold text-xl text-gray-100 placeholder-gray-700 outline-none uppercase focus:text-indigo-400 transition-colors"
                            />
                          </td>
                          <td className="px-4 py-4">
                            <input
                              type="number"
                              placeholder="0"
                              value={asset.holdings || ''}
                              onChange={(e) => updateAsset(asset.id, 'holdings', parseFloat(e.target.value))}
                              className="w-full bg-transparent text-right text-gray-300 placeholder-gray-700 outline-none focus:text-indigo-400 transition-colors text-xl"
                            />
                          </td>
                          <td className="px-4 py-4">
                            <input
                              type="number"
                              placeholder="0.00"
                              value={asset.price || ''}
                              onChange={(e) => updateAsset(asset.id, 'price', parseFloat(e.target.value))}
                              className="w-full bg-transparent text-right text-gray-300 placeholder-gray-700 outline-none focus:text-indigo-400 transition-colors text-xl"
                            />
                          </td>
                          <td className="px-4 py-4 text-right font-mono text-gray-500 text-xl">
                            ${asset.currentValue.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                          </td>
                          <td className="px-4 py-4">
                            <div className="flex justify-end items-center gap-1">
                              <input
                                type="number"
                                placeholder="0"
                                value={asset.targetAllocation || ''}
                                onChange={(e) => updateAsset(asset.id, 'targetAllocation', parseFloat(e.target.value))}
                                className={`w-24 bg-transparent text-right outline-none font-medium focus:text-indigo-400 transition-colors text-xl ${
                                  Math.abs(portfolioSummary.totalTarget - 100) > 0.01 ? 'text-rose-400' : 'text-indigo-400'
                                }`}
                              />
                            </div>
                          </td>
                          <td className="px-4 py-4 text-right font-mono text-gray-500 text-xl">
                            {asset.currentAllocation.toFixed(1)}%
                          </td>
                          <td className="px-4 py-4 text-right">
                             <span className={`font-mono text-base px-3 py-1.5 rounded-lg ${
                                Math.abs(asset.deviation) > threshold 
                                  ? (asset.deviation > 0 ? 'bg-rose-900/20 text-rose-400' : 'bg-emerald-900/20 text-emerald-400')
                                  : 'text-gray-600'
                              }`}>
                                {asset.deviation > 0 ? '+' : ''}{asset.deviation.toFixed(1)}%
                              </span>
                          </td>
                          <td className="px-4 py-4 text-right">
                            <button 
                              onClick={() => removeAsset(asset.id)}
                              className="text-gray-600 hover:text-rose-400 transition-colors p-3 opacity-0 group-hover:opacity-100 focus:opacity-100 rounded-lg hover:bg-rose-900/10"
                              aria-label="Delete asset"
                            >
                              <Trash2 className="w-6 h-6" />
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              {/* Footer Validation */}
              <div className="flex items-center justify-between p-8 border-t border-gray-800 bg-gray-900/50">
                <div className="text-lg flex items-center gap-6">
                  <div className="bg-gray-950 px-5 py-3 rounded-lg border border-gray-800 flex items-center">
                    <span className="text-gray-500 mr-3">Total Target:</span>
                    <span className={`${Math.abs(portfolioSummary.totalTarget - 100) <= 0.01 ? 'text-emerald-400' : 'text-rose-400'} font-mono text-2xl font-bold`}>
                      {portfolioSummary.totalTarget.toFixed(1)}%
                    </span>
                  </div>
                  {error && (
                    <span className="text-rose-400 flex items-center gap-2 text-base font-medium">
                       <AlertCircle className="w-6 h-6" /> {error}
                    </span>
                  )}
                </div>
                <Button onClick={handleRebalance} isLoading={isCalculating} disabled={assets.length === 0} className="px-10 py-5 text-xl font-bold">
                  Calculate Swaps
                </Button>
              </div>
            </Card>
          </div>

          {/* Results Section */}
          <div className="w-full">
            {result ? (
              <Card className="p-10 border-indigo-500/30 ring-1 ring-indigo-500/20 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-10">
                  <ArrowRightLeft className="w-48 h-48 text-indigo-500" />
                </div>
                
                <h2 className="text-4xl font-bold text-white mb-4 flex items-center gap-4">
                  <span className="w-4 h-4 rounded-full bg-indigo-500 shadow-[0_0_20px_rgba(99,102,241,0.6)]"></span>
                  Swap Details
                </h2>
                
                <p className="text-gray-400 text-xl mb-10 leading-relaxed border-b border-gray-800 pb-8 max-w-5xl">
                  {result.summary}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {result.trades.length === 0 ? (
                    <div className="col-span-full text-center py-24 text-gray-500 bg-gray-950/50 rounded-2xl border border-gray-800">
                      <p className="text-3xl font-medium text-gray-400 mb-3">Balanced</p>
                      <p className="text-xl">Portfolio is within the {threshold}% threshold. No swaps required.</p>
                    </div>
                  ) : (
                    result.trades.map((trade, idx) => (
                      <div key={idx} className="flex flex-col gap-5 p-8 rounded-2xl bg-gray-950 border border-gray-800 hover:border-gray-700 transition-all group relative overflow-hidden shadow-lg">
                        <div className={`absolute top-0 left-0 w-2 h-full ${trade.action === TradeAction.BUY ? 'bg-emerald-500' : 'bg-rose-500'}`}></div>
                        <div className="flex items-center justify-between">
                           <div className="flex items-center gap-4">
                             <Badge color={trade.action === TradeAction.BUY ? 'green' : 'red'}>
                               {trade.action}
                             </Badge>
                             <span className="font-bold text-3xl text-gray-100">{trade.ticker}</span>
                           </div>
                           <div className="text-right">
                              <div className="text-2xl font-mono font-medium text-gray-200">
                                {trade.units.toLocaleString()} <span className="text-base text-gray-500">units</span>
                              </div>
                           </div>
                        </div>
                        <div className="flex items-center justify-between pt-4 border-t border-gray-800/50">
                            <span className="text-base text-gray-500 font-mono">
                              Val: ${trade.value.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                            </span>
                            <span className="text-sm text-gray-600 uppercase tracking-wider font-bold">
                               Target Restoration
                            </span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </Card>
            ) : (
              <div className="py-24 rounded-2xl border-2 border-dashed border-gray-800 flex flex-col items-center justify-center text-gray-600 gap-8 bg-gray-900/20">
                {isCalculating ? (
                  <>
                    <Loader2 className="w-12 h-12 animate-spin text-indigo-500" />
                    <p className="text-xl animate-pulse">Calculating optimal swaps...</p>
                  </>
                ) : (
                  <>
                    <ArrowRightLeft className="w-16 h-16 opacity-20" />
                    <p className="text-xl text-center px-6">
                      Results will appear here after calculation
                    </p>
                  </>
                )}
              </div>
            )}
          </div>
          
        </div>
      </div>
    </div>
  );
}