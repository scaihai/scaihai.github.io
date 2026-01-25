
import React from 'react';
import { Project } from '../types';

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <div className="group glass rounded-3xl overflow-hidden hover:border-violet-500/50 transition-all duration-500 flex flex-col h-full">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={project.imageUrl} 
          alt={project.title} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
        <div className="absolute bottom-4 left-4 flex gap-2">
          {project.metrics?.map((m, idx) => (
            <div key={idx} className="bg-white/10 backdrop-blur-md px-2 py-1 rounded-md text-[10px] uppercase font-bold tracking-wider">
              {m.label}: {m.value}
            </div>
          ))}
        </div>
      </div>
      
      <div className="p-6 flex-1 flex flex-col">
        <h3 className="text-xl font-bold mb-2 group-hover:text-violet-400 transition-colors">{project.title}</h3>
        <p className="text-zinc-400 text-sm mb-4 line-clamp-2">{project.description}</p>
        
        <div className="flex flex-wrap gap-2 mb-6">
          {project.techStack.map(tech => (
            <span key={tech} className="text-[10px] bg-zinc-800 text-zinc-300 px-2 py-1 rounded font-medium">
              {tech}
            </span>
          ))}
        </div>

        <div className="mt-auto flex items-center justify-between">
          <button className="text-sm font-bold flex items-center gap-1 hover:gap-2 transition-all text-violet-400">
            View Project
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
          </button>
          
          <div className="flex gap-3">
             {project.githubUrl && (
                <a href={project.githubUrl} className="text-zinc-500 hover:text-white transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
                </a>
             )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
