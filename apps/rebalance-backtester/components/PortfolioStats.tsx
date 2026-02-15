import React from 'react';
import { PortfolioState, SimulationConfig } from '../types';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { TrendingUp, TrendingDown, DollarSign, Wallet } from 'lucide-react';

interface PortfolioStatsProps {
  portfolio: PortfolioState;
  config: SimulationConfig;
  initialCapital: number;
}

export const PortfolioStats: React.FC<PortfolioStatsProps> = ({ portfolio, config, initialCapital }) => {
  const btcValue = portfolio.btcAmount * portfolio.btcPrice;
  const currentBtcPercent = (btcValue / portfolio.totalEquity) * 100;
  const currentCashPercent = 100 - currentBtcPercent;

  const data = [
    { name: 'BTC', value: btcValue },
    { name: 'Cash', value: portfolio.cash },
  ];

  const COLORS = ['#f59e0b', '#10b981']; // Amber-500, Emerald-500

  const drift = currentBtcPercent - config.targetBtcPercent;
  const isBreached = Math.abs(drift) > config.rebalanceThreshold;
  
  const totalReturn = ((portfolio.totalEquity - initialCapital) / initialCapital) * 100;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      {/* Total Equity Card */}
      <div className="bg-slate-800 p-5 rounded-xl border border-slate-700 shadow-sm flex flex-col justify-between">
        <div>
          <p className="text-slate-400 text-sm font-medium mb-1">Total Equity</p>
          <h3 className="text-3xl font-bold text-white flex items-center gap-1">
            <DollarSign className="w-6 h-6 text-slate-500" />
            {portfolio.totalEquity.toLocaleString(undefined, { maximumFractionDigits: 0 })}
          </h3>
        </div>
        <div className={`flex items-center gap-1 text-sm font-medium mt-2 ${totalReturn >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
          {totalReturn >= 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
          <span>{totalReturn > 0 ? '+' : ''}{totalReturn.toFixed(2)}% All Time</span>
        </div>
      </div>

      {/* Allocation Status Card */}
      <div className="bg-slate-800 p-5 rounded-xl border border-slate-700 shadow-sm flex items-center gap-4 relative overflow-hidden">
        {/* Warning Pulse if Rebalance Needed */}
        {isBreached && (
          <div className="absolute top-0 right-0 p-2">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-orange-500"></span>
            </span>
          </div>
        )}
        
        <div className="w-24 h-24 flex-shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                innerRadius={30}
                outerRadius={45}
                paddingAngle={5}
                dataKey="value"
                stroke="none"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value: number) => `$${value.toLocaleString(undefined, {maximumFractionDigits: 0})}`}
                contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#f8fafc' }}
                itemStyle={{ color: '#f8fafc' }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="flex-grow">
          <div className="flex justify-between items-end mb-1">
            <p className="text-slate-400 text-sm">Allocation Drift</p>
            <p className={`text-sm font-mono font-bold ${isBreached ? 'text-orange-400' : 'text-slate-200'}`}>
              {drift > 0 ? '+' : ''}{drift.toFixed(2)}%
            </p>
          </div>
          
          <div className="w-full bg-slate-700 rounded-full h-2.5 mb-2 relative">
             {/* Target Marker */}
            <div className="absolute top-0 bottom-0 w-0.5 bg-white z-10" style={{ left: `${config.targetBtcPercent}%` }}></div>
            {/* Current Fill */}
            <div className="bg-amber-500 h-2.5 rounded-full transition-all duration-500" style={{ width: `${Math.min(currentBtcPercent, 100)}%` }}></div>
          </div>

          <div className="flex justify-between text-xs text-slate-500">
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-500"></span> Cash {currentCashPercent.toFixed(1)}%</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-amber-500"></span> BTC {currentBtcPercent.toFixed(1)}%</span>
          </div>
        </div>
      </div>

       {/* Holdings Card */}
       <div className="bg-slate-800 p-5 rounded-xl border border-slate-700 shadow-sm flex flex-col justify-center">
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2 text-slate-300">
              <div className="p-1.5 bg-amber-500/10 rounded-lg">
                <span className="text-amber-500 text-xs font-bold">₿</span>
              </div>
              <span className="text-sm">Bitcoin</span>
            </div>
            <div className="text-right">
              <div className="font-mono text-white">{portfolio.btcAmount.toFixed(4)} BTC</div>
              <div className="text-xs text-slate-500">${portfolio.btcPrice.toLocaleString()}</div>
            </div>
          </div>

          <div className="w-full h-px bg-slate-700/50"></div>

          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2 text-slate-300">
              <div className="p-1.5 bg-emerald-500/10 rounded-lg">
                <Wallet className="w-3.5 h-3.5 text-emerald-500" />
              </div>
              <span className="text-sm">Cash</span>
            </div>
            <div className="text-right">
              <div className="font-mono text-white">${portfolio.cash.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
