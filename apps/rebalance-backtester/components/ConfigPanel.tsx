import React from 'react';
import { SimulationConfig } from '../types';
import { Settings, RefreshCw, AlertCircle } from 'lucide-react';

interface ConfigPanelProps {
  config: SimulationConfig;
  onConfigChange: (newConfig: SimulationConfig) => void;
  onReset: () => void;
  isSimulating: boolean;
}

export const ConfigPanel: React.FC<ConfigPanelProps> = ({
  config,
  onConfigChange,
  onReset,
  isSimulating,
}) => {
  const handleChange = (key: keyof SimulationConfig, value: number) => {
    onConfigChange({
      ...config,
      [key]: value,
    });
  };

  return (
    <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 shadow-lg h-full flex flex-col">
      <div className="flex items-center gap-2 mb-6 text-indigo-400">
        <Settings className="w-5 h-5" />
        <h2 className="text-xl font-bold text-white">Bot Configuration</h2>
      </div>

      <div className="space-y-6 flex-grow">
        {/* Initial Capital */}
        <div>
          <label className="block text-sm font-medium text-slate-400 mb-1">
            Initial Capital ($)
          </label>
          <input
            type="number"
            value={config.initialCapital}
            onChange={(e) => handleChange('initialCapital', Number(e.target.value))}
            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all"
            min="100"
            step="1000"
          />
        </div>

        {/* Target Allocation */}
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span className="font-medium text-slate-400">Target Allocation</span>
            <span className="text-white font-mono">{config.targetBtcPercent}% BTC / {100 - config.targetBtcPercent}% USD</span>
          </div>
          <input
            type="range"
            min="5"
            max="95"
            value={config.targetBtcPercent}
            onChange={(e) => handleChange('targetBtcPercent', Number(e.target.value))}
            className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-500"
          />
          <div className="flex justify-between text-xs text-slate-500 mt-1">
            <span>Cash Heavy</span>
            <span>Balanced</span>
            <span>BTC Heavy</span>
          </div>
        </div>

        {/* Rebalance Threshold */}
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span className="font-medium text-slate-400">Rebalance Threshold</span>
            <span className="text-orange-400 font-mono">±{config.rebalanceThreshold}%</span>
          </div>
          <input
            type="range"
            min="0.5"
            max="20"
            step="0.5"
            value={config.rebalanceThreshold}
            onChange={(e) => handleChange('rebalanceThreshold', Number(e.target.value))}
            className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-orange-500"
          />
          <p className="text-xs text-slate-500 mt-2 flex items-start gap-1">
            <AlertCircle className="w-3 h-3 mt-0.5 flex-shrink-0" />
            Triggers a trade when allocation drifts more than {config.rebalanceThreshold}% from target.
          </p>
        </div>
      </div>

      <div className="mt-8 pt-6 border-t border-slate-700">
        <button
          onClick={onReset}
          className="w-full flex items-center justify-center gap-2 bg-slate-700 hover:bg-slate-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200"
        >
          <RefreshCw className="w-4 h-4" />
          Reset Simulation
        </button>
      </div>
    </div>
  );
};
