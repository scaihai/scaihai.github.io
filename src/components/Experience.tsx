import { motion } from 'motion/react';

const EXPERIENCES = [
  {
    role: "Transport Engineering Tech Lead",
    company: "Interswitch Limited",
    period: "Jan. 2019 – Aug. 2025",
    description: "Led engineering for the transport ecosystem, delivering end-to-end solutions for air, road, and hotel booking solutions. ",
  },
  {
    role: "Senior Software Developer",
    company: "VAS2Nets Technologies Limited",
    period: "Jun. 2018 – Dec. 2018",
    description: "Maintained and enhanced Lodios, the company’s video streaming solution. Developed USSD applications for enterprise clients.",
  },
  {
    role: "Senior Software Developer",
    company: "Xpress Payment Solutions Limited",
    period: "Jun. 2016 – Apr. 2018",
    description: "Developed a collections platform designed to streamline revenue collection for state governments.  Independently developed a real-time reporting web application for the transaction settlement team and agencies.",
  },
  {
    role: "Software Development Executive",
    company: "Empire Business Solutions",
    period: "Jul. 2014 – Jun. 2016",
    description: "Maintained the company’s enterprise-class financial suite used by Nigeria’s major commercial banks.",
  }
];

export default function Experience() {
  return (
    <section id="experience" className="py-24 px-6 bg-white border-y border-gray-100">
      <div className="max-w-4xl mx-auto">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true, margin: "-100px" }}
           transition={{ duration: 0.6 }}
        >
          <h2 className="font-display text-4xl font-bold tracking-tight mb-16">Experience</h2>
          
          <div className="space-y-12">
            {EXPERIENCES.map((exp, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-8 group"
              >
                <div className="col-span-1 text-gray-400 font-mono text-sm mt-1">
                  {exp.period}
                </div>
                <div className="col-span-3">
                  <h3 className="text-xl font-bold font-display tracking-tight text-gray-900 group-hover:text-blue-600 transition-colors">
                    {exp.role}
                  </h3>
                  <div className="text-gray-500 font-medium mb-4">{exp.company}</div>
                  <p className="text-gray-600 leading-relaxed text-balance">
                    {exp.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
