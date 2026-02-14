import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

interface AllocationChartProps {
  tokenAName: string;
  tokenBName: string;
  tokenAValue: number;
  tokenBValue: number;
}

const AllocationChart: React.FC<AllocationChartProps> = ({ 
  tokenAName, 
  tokenBName, 
  tokenAValue, 
  tokenBValue 
}) => {
  const data = [
    { name: tokenAName, value: tokenAValue },
    { name: tokenBName, value: tokenBValue },
  ];

  const COLORS = ['#3b82f6', '#22c55e']; // Blue for Token A, Green for Token B

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-dark-800 border border-dark-700 p-3 rounded-lg shadow-xl">
          <p className="text-gray-100 text-lg font-semibold">{`${payload[0].name}`}</p>
          <p className="text-brand-400 text-xl font-bold">
            {`$${payload[0].value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
          </p>
          <p className="text-gray-300 text-sm mt-1">
            {`(${(payload[0].payload.percent * 100).toFixed(1)}%)`}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full h-64">
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
            stroke="none"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{ fontSize: '14px', color: '#cbd5e1' }} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AllocationChart;