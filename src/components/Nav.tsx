import { motion } from 'motion/react';
import { Github, Linkedin, Twitter, Mail } from 'lucide-react';

export default function Nav() {
  return (
    <motion.nav 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-50 px-6 py-6"
    >
      <div className="max-w-6xl mx-auto flex justify-between items-center bg-white/80 backdrop-blur-md px-6 py-3 rounded-full border border-gray-200/50 shadow-sm">
        <div className="font-display font-bold text-lg tracking-tight">Destiny Gogo-fyneface</div>
        
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-500">
          <a href="#about" className="hover:text-black transition-colors">About</a>
          <a href="#projects" className="hover:text-black transition-colors">Projects</a>
          <a href="#experience" className="hover:text-black transition-colors">Experience</a>
        </div>
        
        <div className="flex items-center gap-4">
          <a href="https://github.com/scaihai" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-black transition-colors">
            <Github className="w-5 h-5" />
          </a>
          <a href="https://www.linkedin.com/in/destiny-gogo/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-black transition-colors">
            <Linkedin className="w-5 h-5" />
          </a>
          {/* <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-black transition-colors">
            <Twitter className="w-5 h-5" />
          </a> */}
          <a href="mailto:scaihai@gmail.com" className="text-gray-400 hover:text-black transition-colors">
            <Mail className="w-5 h-5" />
          </a>
        </div>
      </div>
    </motion.nav>
  );
}
