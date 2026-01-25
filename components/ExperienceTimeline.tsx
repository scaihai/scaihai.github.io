
import React from 'react';
import { EXPERIENCES } from '../constants';

const ExperienceTimeline: React.FC = () => {
  return (
    <div className="space-y-12 relative before:content-[''] before:absolute before:left-[11px] before:top-2 before:bottom-0 before:w-[2px] before:bg-white/5">
      {EXPERIENCES.map((exp) => (
        <div key={exp.id} className="relative pl-12 group">
          <div className="absolute left-0 top-1.5 w-6 h-6 rounded-full bg-zinc-900 border-2 border-violet-500 group-hover:scale-125 transition-transform duration-300 shadow-[0_0_15px_rgba(139,92,246,0.3)]"></div>
          <div>
            <span className="text-xs font-bold text-violet-500 uppercase tracking-widest block mb-1">{exp.period}</span>
            <h3 className="text-2xl font-bold">{exp.role}</h3>
            <p className="text-lg text-zinc-400 font-medium mb-4">{exp.company}</p>
            <ul className="space-y-3">
              {exp.achievements.map((achievement, i) => (
                <li key={i} className="text-zinc-300 flex items-start gap-3">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-violet-400/50 flex-shrink-0"></span>
                  <span className="text-sm md:text-base">{achievement}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ExperienceTimeline;
