
import React, { useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronDown, Globe, Menu, X, ArrowRight, Github, Linkedin, Mail } from 'lucide-react';
import ParticleBackground from './components/ParticleBackground';
import FloatingCards from './components/FloatingCards';
import Credentials from './components/Credentials';

const App: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.9]);
  
  const navItems = [
    { label: 'Skills', href: '#skills' },
    { label: 'Credentials', href: '#credentials' },
    { label: 'Contact', href: '#contact' }
  ];

  return (
    <div className="min-h-screen selection:bg-blue-500 selection:text-white overflow-hidden bg-[#030303] text-white">
      <ParticleBackground />
      
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-8 flex justify-between items-center bg-gradient-to-b from-black/80 to-transparent backdrop-blur-sm md:backdrop-blur-none">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center border border-white/10 shadow-lg shadow-blue-500/20">
            <span className="font-display font-bold text-white text-lg">DG</span>
          </div>
          <div className="hidden sm:block">
            <span className="font-display font-bold text-xl tracking-tight block">DESTINY GOGO</span>
            <span className="text-[10px] text-blue-400 uppercase tracking-widest font-bold">AI Engineer • Liverpool</span>
          </div>
        </div>
        
        <div className="hidden md:flex items-center space-x-8 text-sm font-medium">
          {navItems.map((item) => (
            <a key={item.label} href={item.href} className="text-white/60 hover:text-white transition-colors">
              {item.label}
            </a>
          ))}
          <div className="flex items-center space-x-4 border-l border-white/10 pl-8">
            <a href="https://github.com/scaihai" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors">
              <Github size={18} />
            </a>
            <a href="https://www.linkedin.com/in/destiny-gogo/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors">
              <Linkedin size={18} />
            </a>
            <a href="mailto:scaihai@gmail.com" className="bg-white text-black px-5 py-2 rounded-full font-bold hover:bg-blue-400 hover:text-white transition-all transform hover:scale-105 flex items-center gap-2">
              Connect <Mail size={14} />
            </a>
          </div>
        </div>

        <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X /> : <Menu />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed inset-0 z-[60] bg-black/95 backdrop-blur-2xl p-8 flex flex-col items-center justify-center space-y-8"
        >
          <button className="absolute top-8 right-8" onClick={() => setIsMenuOpen(false)}>
            <X className="w-8 h-8" />
          </button>
          {navItems.map((item) => (
            <a key={item.label} href={item.href} onClick={() => setIsMenuOpen(false)} className="text-4xl font-display font-bold">
              {item.label}
            </a>
          ))}
          <div className="flex gap-8 pt-8 border-t border-white/10 w-full justify-center">
            <a href="https://github.com/scaihai" target="_blank" rel="noopener noreferrer"><Github size={32} /></a>
            <a href="https://www.linkedin.com/in/destiny-gogo/" target="_blank" rel="noopener noreferrer"><Linkedin size={32} /></a>
            <a href="mailto:scaihai@gmail.com"><Mail size={32} /></a>
          </div>
        </motion.div>
      )}

      {/* Hero Section */}
      <header className="relative h-screen flex flex-col items-center justify-center text-center px-4">
        <motion.div style={{ opacity, scale }} className="max-w-4xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block px-4 py-1 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 text-xs font-bold tracking-widest mb-6 uppercase">
              Transitioning: Java Backend ➔ AI Architect
            </span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-6xl md:text-8xl lg:text-9xl font-display font-extrabold mb-8 bg-gradient-to-b from-white to-white/30 bg-clip-text text-transparent leading-[0.9]"
          >
            SOTA<br/>ENGINEER
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-2xl text-white/50 mb-10 max-w-2xl mx-auto leading-relaxed"
          >
            I'm Destiny. I merge enterprise Java reliability with the bleeding edge of Artificial Intelligence. Based in Liverpool, building for the future.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col md:flex-row items-center justify-center gap-4"
          >
            <a href="#contact" className="w-full md:w-auto px-10 py-4 bg-white text-black rounded-full font-bold text-lg hover:shadow-[0_0_40px_rgba(59,130,246,0.5)] transition-all flex items-center justify-center gap-2 group">
              Get in Touch
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <a href="https://github.com/scaihai" target="_blank" rel="noopener noreferrer" className="w-full md:w-auto px-10 py-4 bg-white/5 border border-white/10 text-white rounded-full font-bold text-lg hover:bg-white/10 transition-all backdrop-blur-md">
              View Source
            </a>
          </motion.div>
        </motion.div>

        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10"
        >
          <ChevronDown className="w-8 h-8 text-white/20" />
        </motion.div>

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
      </header>

      {/* Stats Section */}
      <section className="relative z-10 py-32 border-y border-white/5 bg-black/50 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
          {[
            { label: "Java Experience", value: "8+ Yrs" },
            { label: "AI Specialist", value: "SOTA" },
            { label: "Location", value: "Liverpool" },
            { label: "Code Quality", value: "99.9%" },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <h4 className="text-4xl md:text-5xl font-display font-bold text-white mb-2">{stat.value}</h4>
              <p className="text-white/40 text-sm uppercase tracking-widest font-bold">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Skills */}
      <FloatingCards />

      {/* Credentials (Education & Certifications) */}
      <Credentials />

      {/* Footer Contact */}
      <footer id="contact" className="relative z-10 py-24 px-8 border-t border-white/5 bg-gradient-to-b from-transparent to-black">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-display font-bold mb-8">Let's build intelligence together.</h2>
          <p className="text-white/40 text-xl mb-12">I'm currently open to new opportunities in AI Engineering and advanced system architecture.</p>
          
          <div className="flex flex-wrap justify-center gap-6 mb-16">
            <a href="mailto:scaihai@gmail.com" className="flex items-center gap-2 px-8 py-4 bg-white/5 border border-white/10 rounded-full hover:bg-white hover:text-black transition-all">
              <Mail size={20} /> scaihai@gmail.com
            </a>
            <a href="https://linkedin.com/in/destiny-gogo/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-8 py-4 bg-white/5 border border-white/10 rounded-full hover:bg-[#0077b5] hover:text-white transition-all">
              <Linkedin size={20} /> LinkedIn
            </a>
            <a href="https://github.com/scaihai" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-8 py-4 bg-white/5 border border-white/10 rounded-full hover:bg-[#333] hover:text-white transition-all">
              <Github size={20} /> GitHub
            </a>
          </div>

          <div className="flex items-center justify-center space-x-2 text-white/20 text-sm border-t border-white/5 pt-12">
            <span className="font-display font-bold tracking-tighter">DESTINY GOGO-FYNEFACE</span>
            <span>•</span>
            <span>LIVERPOOL, UK</span>
            <span>•</span>
            <span>2024</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
