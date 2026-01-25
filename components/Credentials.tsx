
import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Award, CheckCircle2 } from 'lucide-react';

const EDUCATION = [
  { title: "MSc: Artificial Intelligence", subtitle: "Machine Learning Specialist" },
  { title: "MSc: Web Design and Development", subtitle: "Advanced Interactive Systems" },
  { title: "HND: Computer Science", subtitle: "Foundational Systems & Algorithms" },
];

const CERTIFICATIONS = [
  { title: "Certified Professional for Software Architecture", issuer: "iSAQB" },
  { title: "Oracle Certified Master", issuer: "Java SE Enterprise" },
  { title: "Oracle Certified Professional", issuer: "Java Platform" },
];

const Credentials: React.FC = () => {
  return (
    <section id="credentials" className="relative z-10 py-24 px-4 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Education Section */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="bg-white/5 border border-white/10 rounded-[2.5rem] p-8 md:p-12 backdrop-blur-xl"
        >
          <div className="flex items-center gap-4 mb-10">
            <div className="w-12 h-12 rounded-2xl bg-blue-500/20 flex items-center justify-center">
              <GraduationCap className="text-blue-400 w-6 h-6" />
            </div>
            <h2 className="text-3xl font-display font-bold">Education</h2>
          </div>
          <div className="space-y-8">
            {EDUCATION.map((edu, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="group relative pl-6 border-l border-white/10"
              >
                <div className="absolute -left-[5px] top-1 w-2 h-2 rounded-full bg-blue-500 group-hover:scale-150 transition-transform shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
                <h3 className="text-xl font-bold text-white/90 group-hover:text-blue-400 transition-colors">{edu.title}</h3>
                <p className="text-white/40 text-sm mt-1">{edu.subtitle}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Certifications Section */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="bg-white/5 border border-white/10 rounded-[2.5rem] p-8 md:p-12 backdrop-blur-xl"
        >
          <div className="flex items-center gap-4 mb-10">
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 flex items-center justify-center">
              <Award className="text-indigo-400 w-6 h-6" />
            </div>
            <h2 className="text-3xl font-display font-bold">Certifications</h2>
          </div>
          <div className="grid gap-4">
            {CERTIFICATIONS.map((cert, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center gap-4 p-5 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-indigo-500/30 hover:bg-white/[0.05] transition-all group"
              >
                <CheckCircle2 className="w-5 h-5 text-indigo-400 shrink-0 opacity-50 group-hover:opacity-100 transition-opacity" />
                <div>
                  <h3 className="text-lg font-semibold text-white/80">{cert.title}</h3>
                  <p className="text-xs text-indigo-400/60 font-bold uppercase tracking-wider mt-1">{cert.issuer}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Credentials;
