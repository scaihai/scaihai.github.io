import React, { InputHTMLAttributes, ButtonHTMLAttributes } from 'react';
import { Loader2 } from 'lucide-react';

export const Card: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <div className={`bg-gray-900 border border-gray-800 rounded-xl shadow-xl overflow-hidden ${className}`}>
    {children}
  </div>
);

export const Input: React.FC<InputHTMLAttributes<HTMLInputElement> & { label?: string }> = ({ label, className = '', ...props }) => (
  <div className="flex flex-col gap-2 w-full">
    {label && <label className="text-base font-medium text-gray-400 uppercase tracking-wider">{label}</label>}
    <input
      className={`bg-gray-950 border border-gray-800 text-gray-100 rounded-lg px-5 py-4 text-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all placeholder-gray-600 ${className}`}
      {...props}
    />
  </div>
);

export const Button: React.FC<ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'secondary' | 'danger' | 'ghost', isLoading?: boolean }> = ({ 
  children, 
  variant = 'primary', 
  isLoading,
  className = '', 
  ...props 
}) => {
  const baseStyles = "inline-flex items-center justify-center px-6 py-4 rounded-xl text-lg font-medium transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-indigo-600 hover:bg-indigo-500 text-white focus:ring-indigo-500 shadow-lg shadow-indigo-900/20",
    secondary: "bg-gray-800 hover:bg-gray-700 text-gray-200 focus:ring-gray-500 border border-gray-700",
    danger: "bg-rose-900/50 hover:bg-rose-900/80 text-rose-200 border border-rose-800 focus:ring-rose-500",
    ghost: "bg-transparent hover:bg-gray-800 text-gray-400 hover:text-white"
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${className}`}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading && <Loader2 className="w-6 h-6 mr-3 animate-spin" />}
      {children}
    </button>
  );
};

export const Badge: React.FC<{ children: React.ReactNode; color?: 'green' | 'red' | 'gray' | 'blue' }> = ({ children, color = 'gray' }) => {
  const colors = {
    green: "bg-emerald-900/30 text-emerald-400 border-emerald-800",
    red: "bg-rose-900/30 text-rose-400 border-rose-800",
    blue: "bg-blue-900/30 text-blue-400 border-blue-800",
    gray: "bg-gray-800 text-gray-400 border-gray-700"
  };
  
  return (
    <span className={`px-3.5 py-1.5 rounded-lg text-base font-medium border ${colors[color]}`}>
      {children}
    </span>
  );
};