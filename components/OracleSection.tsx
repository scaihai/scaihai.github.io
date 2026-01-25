
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Loader2, User, Bot } from 'lucide-react';
import { getCosmicInsight } from '../services/geminiService';
import { OracleMessage } from '../types';

const OracleSection: React.FC = () => {
  const [messages, setMessages] = useState<OracleMessage[]>([
    { text: "Hello! I'm Destiny's AI representative. Want to know about his transition from Java to AI, or his favorite tech stack?", timestamp: Date.now(), author: 'oracle' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMsg: OracleMessage = { text: input, timestamp: Date.now(), author: 'user' };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    const responseText = await getCosmicInsight(input);
    const oracleMsg: OracleMessage = { text: responseText, timestamp: Date.now(), author: 'oracle' };
    setMessages(prev => [...prev, oracleMsg]);
    setLoading(false);
  };

  return (
    <section id="assistant" className="relative z-10 max-w-4xl mx-auto py-24 px-4">
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="text-center mb-12"
      >
        <span className="text-blue-400 font-bold tracking-widest uppercase text-xs">Interactive Intelligence</span>
        <h2 className="text-4xl md:text-5xl font-display font-bold mt-2 text-white">Ask My Portfolio</h2>
        <p className="text-white/40 mt-4">A SOTA AI agent trained on my professional journey.</p>
      </motion.div>

      <div className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden backdrop-blur-2xl shadow-2xl flex flex-col h-[500px]">
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 scroll-smooth">
          <AnimatePresence>
            {messages.map((m) => (
              <motion.div
                key={m.timestamp}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className={`flex ${m.author === 'user' ? 'justify-end' : 'justify-start'} items-end gap-3`}
              >
                {m.author === 'oracle' && <Bot className="w-6 h-6 text-blue-400 mb-1" />}
                <div 
                  className={`max-w-[85%] px-5 py-3 rounded-2xl ${
                    m.author === 'user' 
                      ? 'bg-blue-600/30 border border-blue-500/30 text-blue-50 rounded-br-none' 
                      : 'bg-white/5 border border-white/10 text-white/80 rounded-bl-none'
                  }`}
                >
                  <p className="text-sm md:text-base leading-relaxed">{m.text}</p>
                </div>
                {m.author === 'user' && <User className="w-6 h-6 text-white/40 mb-1" />}
              </motion.div>
            ))}
          </AnimatePresence>
          {loading && (
            <div className="flex justify-start items-center space-x-3">
              <Bot className="w-6 h-6 text-blue-400/50" />
              <div className="bg-white/5 border border-white/10 px-5 py-3 rounded-2xl flex items-center space-x-2">
                <Loader2 className="w-4 h-4 animate-spin text-blue-400" />
                <span className="text-xs text-white/30">Thinking...</span>
              </div>
            </div>
          )}
        </div>

        <div className="p-4 bg-black/40 border-t border-white/10">
          <div className="relative flex items-center">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask about my Java background or AI skills..."
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 pr-12 text-white focus:outline-none focus:border-blue-500/50 transition-all placeholder:text-white/20"
            />
            <button
              onClick={handleSend}
              disabled={loading || !input.trim()}
              className="absolute right-2 p-2 bg-blue-600 rounded-lg hover:bg-blue-500 disabled:opacity-50 transition-all group"
            >
              <Send className="w-4 h-4 text-white group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OracleSection;
