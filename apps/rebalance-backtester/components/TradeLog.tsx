import React from 'react';
import { TradeRecord } from '../types';
import { ArrowLeftRight, CheckCircle2 } from 'lucide-react';

interface TradeLogProps {
  trades: TradeRecord[];
}

export const TradeLog: React.FC<TradeLogProps> = ({ trades }) => {
  const reversedTrades = [...trades].reverse();

  return (
    <div className="bg-slate-800 rounded-xl border border-slate-700 shadow-sm flex flex-col h-[400px] overflow-hidden">
      <div className="p-4 border-b border-slate-700 bg-slate-800/50">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <ArrowLeftRight className="w-5 h-5 text-indigo-400" />
          Bot Activity Log
        </h3>
      </div>
      
      <div className="overflow-y-auto flex-grow p-0">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-900/50 text-slate-400 sticky top-0 backdrop-blur-sm z-10">
            <tr>
              <th className="px-4 py-3 font-medium">Date</th>
              <th className="px-4 py-3 font-medium">Action</th>
              <th className="px-4 py-3 font-medium text-right">Price</th>
              <th className="px-4 py-3 font-medium text-right">Details</th>
              <th className="px-4 py-3 font-medium text-right">Equity</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700/50">
            {reversedTrades.map((trade, idx) => (
              <tr key={reversedTrades.length - idx} className="hover:bg-slate-700/30 transition-colors">
                <td className="px-4 py-3 text-slate-500 text-xs whitespace-nowrap">{trade.date}</td>
                <td className="px-4 py-3">
                  <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-bold uppercase tracking-wide
                    ${trade.type === 'BUY' ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20' : 
                      trade.type === 'SELL' ? 'bg-red-500/10 text-red-500 border border-red-500/20' : 
                      trade.type === 'INIT' ? 'bg-blue-500/10 text-blue-500 border border-blue-500/20' :
                      'bg-slate-700 text-slate-400'}`}>
                    {trade.type}
                  </span>
                </td>
                <td className="px-4 py-3 text-right font-mono text-slate-300">
                  ${trade.btcPrice.toLocaleString()}
                </td>
                <td className="px-4 py-3 text-right text-slate-400">
                  {trade.type === 'HOLD' || trade.type === 'INIT' ? (
                    <span className="text-xs italic opacity-50">{trade.reason}</span>
                  ) : (
                    <div className="flex flex-col items-end">
                      <span className={trade.btcAmountDelta > 0 ? 'text-emerald-400' : 'text-red-400'}>
                        {trade.btcAmountDelta > 0 ? '+' : ''}{trade.btcAmountDelta.toFixed(4)} BTC
                      </span>
                      <span className="text-xs opacity-60">
                         @ {trade.btcAllocation.toFixed(1)}% Alloc
                      </span>
                    </div>
                  )}
                </td>
                <td className="px-4 py-3 text-right font-mono font-medium text-white">
                  ${trade.totalEquity.toLocaleString(undefined, {maximumFractionDigits: 0})}
                </td>
              </tr>
            ))}
            {reversedTrades.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-slate-500 flex flex-col items-center justify-center gap-2">
                  <CheckCircle2 className="w-8 h-8 opacity-20" />
                  No activity recorded yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};