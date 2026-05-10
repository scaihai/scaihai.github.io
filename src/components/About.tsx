import { motion } from 'motion/react';
import { Network, Cpu, Database } from 'lucide-react';

const STACK = [
  { name: 'Java / Spring Boot', expertise: 'Advanced' },
  { name: 'Spring Boot / Spring Cloud / Spring AI', expertise: 'Advanced' },
  { name: 'Python / PyTorch', expertise: 'Intermediate' },
  { name: 'Transformers / Hugging Face', expertise: 'Intermediate' },
  { name: 'LangGraph / LangChain', expertise: 'Intermediate' },
  { name: 'Solidity', expertise: 'Intermediate' }
];

export default function About() {
  return (
    <section id="about" className="py-24 px-6 bg-white border-y border-gray-100">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="font-display text-4xl font-bold tracking-tight mb-6">Bridging AI & Java</h2>
          <div className="space-y-6 text-gray-600 leading-relaxed text-lg text-balance">
            <p>
              The intersection of modern language models and enterprise-grade Java architectures is where I thrive. 
              I specialize in integrating cutting-edge AI capabilities seamlessly into robust, 
              statically typed, and highly concurrent ecosystems.
            </p>
            <p>
              My philosophy centers on <strong>type-safe AI integration</strong>. I don't just script API calls; 
              I build resilient JVM microservices that transform non-deterministic models into predictable enterprise workflows.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-12">
            <div>
              <Network className="w-6 h-6 text-black mb-3" />
              <h3 className="font-semibold text-black mb-1">Agentic Flows</h3>
              <p className="text-sm text-gray-500">Multi-step reasoning and tool use patterns.</p>
            </div>
            <div>
              <Database className="w-6 h-6 text-black mb-3" />
              <h3 className="font-semibold text-black mb-1">RAG Systems</h3>
              <p className="text-sm text-gray-500">Dense retrieval, sparse retrieval, and hybrid search.</p>
            </div>
            <div>
              <Cpu className="w-6 h-6 text-black mb-3" />
              <h3 className="font-semibold text-black mb-1">Inference</h3>
              <p className="text-sm text-gray-500">vLLM, ONNX, TensorRT, and efficient slicing.</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className="bg-[#FAFAFA] rounded-2xl p-8 border border-gray-100"
        >
          <h3 className="font-bold text-xl tracking-tight mb-8">Technical Stack</h3>
          <div className="space-y-6">
            {STACK.map((item, index) => (
              <div key={index}>
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium">{item.name}</span>
                  <span className="text-sm font-mono text-gray-400">{item.expertise}</span>
                </div>
                <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: item.expertise === 'Advanced' ? '85%' : '60%' }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: index * 0.1 + 0.3 }}
                    className="bg-black h-full"
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
