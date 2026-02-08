import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { Asset } from '../types';

interface PortfolioChartProps {
  assets: Asset[];
}

const COLORS = ['#6366f1', '#10b981', '#f43f5e', '#f59e0b', '#8b5cf6', '#ec4899', '#06b6d4'];

export const PortfolioChart: React.FC<PortfolioChartProps> = ({ assets }) => {
  const totalValue = assets.reduce((sum, a) => sum + (a.holdings * a.price), 0);
  
  const data = assets.map(a => ({
    name: a.ticker,
    value: a.holdings * a.price,
    percent: totalValue > 0 ? ((a.holdings * a.price) / totalValue) * 100 : 0
  })).filter(d => d.value > 0);

  if (data.length === 0) {
    return (
      <div className="h-64 flex items-center justify-center text-gray-500 border border-dashed border-gray-800 rounded-xl bg-gray-900/50">
        Add assets to visualize allocation
      </div>
    );
  }

  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            paddingAngle={5}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke="rgba(0,0,0,0)" />
            ))}
          </Pie>
          <Tooltip 
            contentStyle={{ backgroundColor: '#111827', borderColor: '#374151', color: '#f3f4f6' }}
            itemStyle={{ color: '#e5e7eb' }}
            formatter={(value: number) => [`$${value.toFixed(2)}`, 'Value']}
          />
          <Legend iconType="circle" />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};
