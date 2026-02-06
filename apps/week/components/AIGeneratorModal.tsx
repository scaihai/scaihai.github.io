import React, { useState } from 'react';
import Button from './Button';
import { DEFAULT_ACTIVITIES_PROMPT } from '../constants';

interface AIGeneratorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onGenerate: (prompt: string) => Promise<void>;
}

const AIGeneratorModal: React.FC<AIGeneratorModalProps> = ({ isOpen, onClose, onGenerate }) => {
  const [prompt, setPrompt] = useState(DEFAULT_ACTIVITIES_PROMPT);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleGenerate = async () => {
    setLoading(true);
    setError(null);
    try {
      await onGenerate(prompt);
      onClose();
    } catch (e) {
      setError("Failed to generate routine. Please check your API Key and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" role="dialog" aria-modal="true">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 bg-slate-900 bg-opacity-75 transition-opacity" onClick={onClose}></div>
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        
        <div className="inline-block align-bottom bg-white rounded-xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-xl sm:w-full">
          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 px-6 py-4">
             <h3 className="text-lg font-bold text-white flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                AI Routine Generator
             </h3>
             <p className="text-indigo-100 text-sm mt-1">
               Describe your ideal week, and let Gemini build your calendar.
             </p>
          </div>
          
          <div className="p-6">
             <label className="block text-sm font-medium text-slate-700 mb-2">What are your goals?</label>
             <textarea
               className="w-full h-32 p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none bg-white text-slate-900 placeholder-slate-400"
               value={prompt}
               onChange={(e) => setPrompt(e.target.value)}
               placeholder="E.g. I want to learn piano on weekends..."
             />
             
             {error && (
               <div className="mt-3 text-red-600 text-sm bg-red-50 p-2 rounded border border-red-200">
                 {error}
               </div>
             )}

             <div className="mt-6 flex justify-end space-x-3">
               <Button variant="secondary" onClick={onClose} disabled={loading}>
                 Cancel
               </Button>
               <Button onClick={handleGenerate} isLoading={loading} className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 border-none">
                 Generate Schedule
               </Button>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIGeneratorModal;
