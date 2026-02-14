import React from 'react';

interface StatCardProps {
  label: string;
  value: string;
  subValue?: string;
  icon?: React.ReactNode;
  highlight?: boolean;
  colorClass?: string;
}

const StatCard: React.FC<StatCardProps> = ({ label, value, subValue, icon, highlight, colorClass = "text-white" }) => {
  return (
    <div className={`p-5 rounded-xl border ${highlight ? 'bg-brand-900/20 border-brand-500/50' : 'bg-dark-800 border-dark-700'} flex flex-col justify-between`}>
      <div className="flex justify-between items-start mb-3">
        <span className="text-gray-300 text-base font-medium">{label}</span>
        {icon && <span className="text-gray-300">{icon}</span>}
      </div>
      <div>
        <div className={`text-4xl font-bold tracking-tight ${colorClass}`}>{value}</div>
        {subValue && <div className="text-sm text-gray-400 mt-2">{subValue}</div>}
      </div>
    </div>
  );
};

export default StatCard;