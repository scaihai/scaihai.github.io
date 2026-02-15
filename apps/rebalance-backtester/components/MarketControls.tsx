import React, { useState } from 'react';
import { Play, AlertCircle, FileText } from 'lucide-react';

interface MarketControlsProps {
  onRunSimulation: (csvData: string) => void;
}

export const MarketControls: React.FC<MarketControlsProps> = ({ onRunSimulation }) => {
  const [csvInput, setCsvInput] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const handleRun = () => {
    if (!csvInput.trim()) {
      setError('Please paste CSV data first.');
      return;
    }
    try {
      onRunSimulation(csvInput);
      setError(null);
    } catch (err) {
      setError('Failed to process CSV. Check format.');
    }
  };

  const loadExample = () => {
      const example = `Timestamp,Open,High,Low,Close,Volume,Datetime
1607551200000,18519.8,18609.8,18491.7,18556.2,55.77289182,2020-12-09 22:00:00
1607554800000,18556.3,18635.5,18533.0,18540.1,35.79628697,2020-12-09 23:00:00
1607558400000,18540.0,18552.2,18419.5,18435.6,68.73024461,2020-12-10 00:00:00
1607562000000,18435.6,18466.7,18320.6,18342.3,45.22,2020-12-10 01:00:00
1607565600000,18342.3,18385.0,18280.0,18310.5,30.55,2020-12-10 02:00:00`;
      setCsvInput(example);
      setError(null);
  }

  return (
    <div className="bg-slate-800 p-4 rounded-xl border border-slate-700 shadow-sm mb-6">
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
            <div className="text-sm text-slate-400 font-medium flex items-center gap-2">
                <FileText className="w-4 h-4"/>
                OHLC CSV Input
            </div>
            <button 
                onClick={loadExample}
                className="text-xs text-indigo-400 hover:text-indigo-300 underline"
            >
                Load Example
            </button>
        </div>
        
        <textarea
            value={csvInput}
            onChange={(e) => setCsvInput(e.target.value)}
            placeholder="Paste CSV here: Timestamp,Open,High,Low,Close,Volume,Datetime"
            className="w-full h-32 bg-slate-900 border border-slate-700 rounded-lg p-3 text-xs font-mono text-slate-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none resize-none"
        />

        {error && (
            <div className="flex items-center gap-2 text-red-400 text-xs bg-red-400/10 p-2 rounded">
                <AlertCircle className="w-3 h-3" />
                {error}
            </div>
        )}

        <button
            onClick={handleRun}
            className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-2 px-4 rounded-lg transition-colors"
        >
            <Play className="w-4 h-4" />
            Run Simulation
        </button>
      </div>
    </div>
  );
};