
import React from 'react';
import { SKILLS } from '../constants';

const SkillGrid: React.FC = () => {
  const categories = Array.from(new Set(SKILLS.map(s => s.category)));

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {categories.map(cat => (
        <div key={cat} className="space-y-6">
          <h3 className="text-lg font-bold border-l-4 border-violet-500 pl-4 uppercase tracking-tighter">{cat}</h3>
          <div className="space-y-4">
            {SKILLS.filter(s => s.category === cat).map(skill => (
              <div key={skill.name}>
                <div className="flex justify-between text-sm mb-2">
                  <span className="font-medium text-zinc-300">{skill.name}</span>
                  <span className="text-zinc-500">{skill.level}%</span>
                </div>
                <div className="h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-violet-500 transition-all duration-1000 ease-out"
                    style={{ width: `${skill.level}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SkillGrid;
