
import React from 'react';
import Navbar from './components/Navbar';
import ProjectCard from './components/ProjectCard';
import ExperienceTimeline from './components/ExperienceTimeline';
import SkillGrid from './components/SkillGrid';
import { PROJECTS, ENGINEER_NAME, ENGINEER_ROLE, BIO } from './constants';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-black selection:bg-violet-500/30">
      <Navbar />
      
      {/* Hero Section */}
      <section id="hero" className="min-h-screen flex flex-col justify-center items-center px-4 relative overflow-hidden pt-20">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-violet-600/10 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] pointer-events-none"></div>
        
        <div className="max-w-5xl mx-auto text-center z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-bold text-violet-400 mb-8 animate-subtle-float">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-violet-500"></span>
            </span>
            OPEN FOR OPPORTUNITIES
          </div>
          <h1 className="text-5xl md:text-8xl font-bold tracking-tighter mb-6 bg-gradient-to-b from-white via-white to-white/40 bg-clip-text text-transparent leading-none pb-2">
            Architecting<br />Intelligent Systems
          </h1>
          <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            {BIO}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="#projects" className="bg-white text-black px-8 py-4 rounded-full font-bold hover:scale-105 active:scale-95 transition-all">
              View Work
            </a>
            <a href="mailto:scaihai@gmail.com" className="glass text-white px-8 py-4 rounded-full font-bold hover:bg-white/10 active:scale-95 transition-all">
              Get in Touch
            </a>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30 hover:opacity-100 transition-opacity">
          <span className="text-[10px] uppercase tracking-widest font-bold">Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-violet-500 to-transparent"></div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-24 px-4 bg-[#050505]">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
            <div>
              <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">Selected Work</h2>
              <p className="text-zinc-500 max-w-md">Highlighting the intersection of deep learning research and production engineering.</p>
            </div>
            <div className="h-px bg-white/10 flex-1 mx-8 hidden md:block mb-4"></div>
            <div className="text-sm font-mono text-zinc-500 mb-2">01 / PROJECTS</div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PROJECTS.map(project => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      </section>

      {/* Skills & Experience */}
      <section id="experience" className="py-24 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
          <div className="lg:col-span-7">
             <div className="mb-12">
               <h2 className="text-4xl font-bold mb-4">Experience</h2>
               <p className="text-zinc-500">A journey through neural networks and software architectures.</p>
             </div>
             <ExperienceTimeline />
          </div>
          
          <div className="lg:col-span-5 space-y-16" id="skills">
            <div>
              <div className="mb-12">
                <h2 className="text-4xl font-bold mb-4">Stack</h2>
                <p className="text-zinc-500">Tools of the trade.</p>
              </div>
              <SkillGrid />
            </div>
            
            <div className="glass p-8 rounded-3xl space-y-4 glow-purple border-violet-500/20">
              <h3 className="text-xl font-bold flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-violet-400"><path d="m18 16 4-4-4-4"/><path d="m6 8-4 4 4 4"/><path d="m14.5 4-5 16"/></svg>
                Core Philosophy
              </h3>
              <p className="text-zinc-400 text-sm italic">
                "Simple code is reliable code. I believe AI shouldn't just be 'intelligent', but explainable and efficient at its core."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer / Contact */}
      <footer id="contact" className="py-24 px-4 bg-[#0a0a0a] border-t border-white/5 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-px bg-gradient-to-r from-transparent via-violet-500 to-transparent"></div>
        
        <div className="max-w-4xl mx-auto text-center space-y-12 relative z-10">
          <h2 className="text-5xl md:text-7xl font-bold tracking-tighter">Let's build the <span className="text-violet-500">future</span> together.</h2>
          <div className="flex flex-col md:flex-row justify-center items-center gap-8">
            <a href="mailto:scaihai@gmail.com" className="text-2xl md:text-3xl font-medium hover:text-violet-400 transition-colors underline decoration-violet-500 underline-offset-8">
              scaihai@gmail.com
            </a>
            <div className="flex gap-6">
              {[
                { name: 'LinkedIn', url: 'https://www.linkedin.com/in/destiny-gogo/' },
                { name: 'GitHub', url: 'https://github.com/scaihai' },
                { name: 'X', url: 'https://x.com/scaihai' }
              ].map((social) => (
                <a 
                  key={social.name} 
                  href={social.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-zinc-500 hover:text-white transition-colors text-lg"
                >
                  {social.name}
                </a>
              ))}
            </div>
          </div>
          <p className="text-zinc-600 text-sm mt-20 pt-10 border-t border-white/5">
            © 2026 {ENGINEER_NAME}. Built with React, and Tailwind.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;
