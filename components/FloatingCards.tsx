
import React from 'react';
import { motion } from 'framer-motion';
import { Code2, BrainCircuit, Globe2, Layers } from 'lucide-react';

const SKILLS = [
  { icon: Code2, title: "Java Legacy", desc: "Expertise in enterprise-scale backend systems, Spring Boot, and high-concurrency Java architectures." },
  { icon: BrainCircuit, title: "AI Integration", desc: "Developing SOTA applications using LLMs, Vector Databases, and Agentic workflows." },
  { icon: Layers, title: "Full-Stack SOTA", desc: "Crafting beautiful, high-performance interfaces using React, Tailwind, and Framer Motion." },
  { icon: Globe2, title: "Cloud Strategy", desc: "Deploying intelligent systems across AWS and GCP with a focus on scalability and security." },
];

const FloatingCards: React.FC = () => {
  return (
    <div id="skills" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-4 py-20 relative z-10 max-w-7xl mx-auto">
      {SKILLS.map((s, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1, type: "spring", stiffness: 100 }}
          whileHover={{ y: -10, scale: 1.02 }}
          className="group p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl hover:bg-white/10 transition-all duration-300 cursor-default"
        >
          <div className="w-12 h-12 rounded-lg bg-blue-500/20 flex items-center justify-center mb-6 group-hover:bg-blue-500/40 transition-colors">
            <s.icon className="w-6 h-6 text-blue-400" />
          </div>
          <h3 className="text-xl font-bold font-display mb-3 text-white/90">{s.title}</h3>
          <p className="text-sm text-white/50 leading-relaxed">{s.desc}</p>
        </motion.div>
      ))}
    </div>
  );
};

export default FloatingCards;
