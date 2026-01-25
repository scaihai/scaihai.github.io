
import React from 'react';
import { ENGINEER_NAME } from '../constants';

const Navbar: React.FC = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center p-4">
      <div className="glass px-6 py-3 rounded-full flex items-center space-x-8 max-w-4xl w-full justify-between">
        <div className="font-bold text-xl tracking-tighter flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-violet-500 animate-pulse"></div>          
          {/* Abbreviated Name: Visible on mobile, hidden on medium screens and up */}
          <span className="md:hidden">
            {ENGINEER_NAME.split(' ')[0] + ' ' + ENGINEER_NAME.split(' ')[1][0] + '.'}
          </span>
          {/* Full Name: Hidden on mobile, visible on medium screens and up */}
          <span className="hidden md:inline">
            {ENGINEER_NAME}
          </span>
        </div>
        <div className="hidden md:flex items-center space-x-6 text-sm font-medium text-zinc-400">
          <a href="#hero" className="hover:text-white transition-colors">Home</a>
          <a href="#projects" className="hover:text-white transition-colors">Projects</a>
          <a href="#experience" className="hover:text-white transition-colors">Experience</a>
          <a href="#skills" className="hover:text-white transition-colors">Skills</a>
        </div>
        <div>
          <a 
            href="#contact" 
            className="bg-white text-black px-4 py-2 rounded-full text-sm font-bold hover:bg-violet-500 hover:text-white transition-all shadow-lg"
          >
            Hire Me
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
