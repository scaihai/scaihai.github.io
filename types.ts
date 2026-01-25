
export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  techStack: string[];
  imageUrl: string;
  githubUrl?: string;
  demoUrl?: string;
  metrics?: { label: string; value: string }[];
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  period: string;
  achievements: string[];
}

export interface Skill {
  name: string;
  level: number;
  category: 'ML/DL' | 'Engineering' | 'Tools' | 'Soft Skills';
}

export interface Message {
  role: 'user' | 'assistant';
  content: string;
}
