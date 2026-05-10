import { motion } from 'motion/react';
import { Mail, ArrowUpRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer id="contact" className="bg-[#FAFAFA] pt-32 pb-12 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true, margin: "-100px" }}
           transition={{ duration: 0.6 }}
           className="flex flex-col items-center text-center mb-24"
        >
          <h2 className="font-display text-5xl md:text-7xl font-bold tracking-tighter mb-8">
            Let's build the <br/> future of AI.
          </h2>
          <a
            href="mailto:scaihai@gmail.com" target="_blank"
            className="group inline-flex items-center gap-2 px-8 py-5 bg-black text-white rounded-full font-medium text-lg hover:scale-105 transition-all shadow-xl hover:shadow-2xl shadow-black/10"
          >
            <Mail className="w-5 h-5" />
            Get in touch
          </a>
        </motion.div>
        
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-gray-200 text-sm text-gray-500 font-mono">
          <div className="mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Destiny Gogo-fyneface. All rights reserved.
          </div>
          <div className="flex gap-6">
            {/* <a href="#" className="hover:text-black flex items-center gap-1 transition-colors">
              X (Twitter) <ArrowUpRight className="w-3 h-3" />
            </a> */}
            <a href="https://github.com/scaihai" target="_blank" className="hover:text-black flex items-center gap-1 transition-colors">
              GitHub <ArrowUpRight className="w-3 h-3" />
            </a>
            <a href="https://linkedin.com/in/destiny-gogo/" target="_blank" className="hover:text-black flex items-center gap-1 transition-colors">
              LinkedIn <ArrowUpRight className="w-3 h-3" />
            </a>
            {/* <a href="#" className="hover:text-black flex items-center gap-1 transition-colors">
              Hugging Face <ArrowUpRight className="w-3 h-3" />
            </a> */}
          </div>
        </div>
      </div>
    </footer>
  );
}
