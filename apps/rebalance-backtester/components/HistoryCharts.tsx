import React, { useState } from 'react';
import { HistoryPoint } from '../types';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface HistoryChartsProps {
  history: HistoryPoint[];
}

export const HistoryCharts: React.FC<HistoryChartsProps> = ({ history }) => {
  const [view, setView] = useState<'equity' | 'price'>('equity');

  if (history.length === 0) return null;

  // Helper to format date ticks (show fewer if many data points)
  const formatXAxis = (tickItem: string) => {
    try {
        const date = new Date(tickItem);
        if (isNaN(date.getTime())) return tickItem.split(' ')[0]; // Fallback to string split if not valid date
        return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
    } catch {
        return tickItem;
    }
  };

  return (
    <div className="bg-slate-800 p-5 rounded-xl border border-slate-700 shadow-sm flex flex-col h-[400px]">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold text-white">Performance History</h3>
        <div className="flex bg-slate-900 rounded-lg p-1 border border-slate-700">
          <button
            onClick={() => setView('equity')}
            className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
              view === 'equity' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Total Equity
          </button>
          <button
            onClick={() => setView('price')}
            className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
              view === 'price' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            BTC Price
          </button>
        </div>
      </div>

      <div className="flex-grow w-full min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={history} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.5} />
            <XAxis 
              dataKey="date" 
              stroke="#94a3b8" 
              tick={{ fontSize: 10 }} 
              tickFormatter={formatXAxis}
              minTickGap={30}
            />
            <YAxis 
              stroke="#94a3b8" 
              tick={{ fontSize: 12 }} 
              domain={['auto', 'auto']}
              tickFormatter={(val) => `$${val.toLocaleString(undefined, { notation: "compact" })}`}
            />
            <Tooltip
              contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#f8fafc' }}
              itemStyle={{ fontSize: 12 }}
              formatter={(value: number) => [`$${value.toLocaleString()}`, '']}
              labelFormatter={(label) => `${label}`}
            />
            <Legend wrapperStyle={{ paddingTop: '10px' }} />
            
            {view === 'equity' ? (
              <>
                <Line 
                  type="monotone" 
                  dataKey="equity" 
                  name="Bot Equity" 
                  stroke="#6366f1" 
                  strokeWidth={2} 
                  dot={false}
                  activeDot={{ r: 4 }} 
                  animationDuration={300}
                />
                <Line 
                  type="monotone" 
                  dataKey="holdEquity" 
                  name="HODL Equity" 
                  stroke="#64748b" 
                  strokeWidth={2} 
                  strokeDasharray="5 5" 
                  dot={false} 
                  animationDuration={300}
                />
              </>
            ) : (
              <Line 
                type="monotone" 
                dataKey="btcPrice" 
                name="BTC Price" 
                stroke="#f59e0b" 
                strokeWidth={2} 
                dot={false} 
                animationDuration={300}
              />
            )}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};