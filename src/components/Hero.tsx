import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center pt-24 pb-12 px-6 relative overflow-hidden">
      {/* Background grid */}
      <div className="absolute inset-0 z-0 bg-[url('data:image/svg+xml,%3Csvg width=\'40\' height=\'40\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M0 0h40v40H0z\' fill=\'none\'/%3E%3Cpath d=\'M39 0v40M0 39h40\' stroke=\'%23e5e7eb\' stroke-width=\'1\'/%3E%3C/svg%3E')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
      
      <div className="max-w-4xl mx-auto w-full z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className="flex flex-col items-start gap-6"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-100 border border-gray-200 text-sm font-mono text-gray-600">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            Available for new opportunities
          </div>
          
          <h1 className="font-display font-bold text-6xl md:text-8xl tracking-tighter leading-[1.1] text-balance">
            Building reliable <span className="text-gray-400">agentic</span> systems.
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 max-w-2xl text-balance leading-relaxed">
            I'm an AI & Java Engineer specializing in applied LLM architectures, 
            RAG pipelines, and efficient inference at scale.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center gap-4 mt-8">
            <a 
              href="#projects"
              className="group inline-flex items-center gap-2 px-6 py-4 bg-black text-white rounded-full font-medium hover:scale-105 transition-transform"
            >
              View my work
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <a 
              href="mailto:scaihai@gmail.com" target="_blank"
              className="inline-flex items-center px-6 py-4 bg-white text-black border border-gray-200 rounded-full font-medium hover:bg-gray-50 transition-colors"
            >
              Contact me
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
