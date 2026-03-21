/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  User, GraduationCap, Briefcase, Wrench, FolderGit2, Award, MoreHorizontal,
  ChevronDown, ChevronRight, Plus, Trash2, Mail, Phone, MapPin, Globe, Github, Linkedin, Printer, ExternalLink
} from 'lucide-react';

const INITIAL_DATA = {
  personalInfo: {
    name: "ALEXANDER CHEN",
    title: "STAFF SOFTWARE ENGINEER",
    email: "alexander.chen@example.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    website: "alexchen.dev",
    github: "github.com/alexc",
    linkedin: "linkedin.com/in/alexchen",
    summary: "Staff Software Engineer with 8+ years of experience architecting distributed systems and leading high-performance teams. Specialized in cloud-native infrastructure, Go, and React. Proven track record of scaling platforms to handle millions of concurrent users while reducing operational costs."
  },
  experience: [
    {
      id: '1',
      company: "Vercel",
      role: "Staff Software Engineer",
      date: "2022 - Present",
      location: "San Francisco, CA",
      bullets: [
        "Architected and deployed the next-generation edge caching layer, reducing global latency by 45% and saving $1.2M annually in egress costs.",
        "Led a cross-functional team of 6 engineers to migrate the core build pipeline from Node.js to Rust, improving build times by 300%.",
        "Authored 3 RFCs that shaped the company's multi-region database strategy and mentored 4 senior engineers."
      ]
    },
    {
      id: '2',
      company: "Stripe",
      role: "Senior Software Engineer",
      date: "2019 - 2022",
      location: "Seattle, WA",
      bullets: [
        "Designed and implemented a real-time fraud detection microservice processing 50k+ events per second using Kafka and Go.",
        "Reduced false-positive fraud flags by 22% through the integration of a new machine learning model pipeline.",
        "Championed the adoption of GraphQL across the merchant dashboard, reducing initial load times by 1.5 seconds."
      ]
    },
    {
      id: '3',
      company: "Twilio",
      role: "Software Engineer",
      date: "2016 - 2019",
      location: "San Francisco, CA",
      bullets: [
        "Developed core features for the Voice API using Java and Spring Boot, maintaining 99.999% uptime.",
        "Built an internal analytics dashboard in React that was adopted by 300+ employees across 4 departments.",
        "Optimized database queries, reducing average API response time from 120ms to 45ms."
      ]
    }
  ],
  education: [
    {
      id: '1',
      institution: "University of Washington",
      degree: "B.S. in Computer Science",
      date: "2012 - 2016",
      location: "Seattle, WA",
      details: "Cum Laude. Minor in Mathematics. Teaching Assistant for Data Structures & Algorithms."
    }
  ],
  skills: [
    {
      id: '1',
      category: "Languages",
      items: "Go, TypeScript, Rust, Python, Java, SQL"
    },
    {
      id: '2',
      category: "Frameworks & Tools",
      items: "React, Next.js, Node.js, Kubernetes, Docker, Terraform, Kafka, GraphQL"
    },
    {
      id: '3',
      category: "Infrastructure",
      items: "AWS (EC2, S3, RDS, Lambda), GCP, PostgreSQL, Redis, Vercel"
    }
  ],
  projects: [],
  certifications: [],
  additional: ""
};

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-xs font-mono tracking-[0.2em] text-zinc-900 uppercase mb-6 flex items-center gap-4 after:content-[''] after:h-px after:bg-zinc-200 after:flex-grow">
      {children}
    </h2>
  );
}

function AccordionItem({ title, icon: Icon, isOpen, onToggle, children }: any) {
  return (
    <div className="border-b border-zinc-200 last:border-0">
      <button 
        onClick={onToggle}
        className="w-full flex items-center justify-between py-4 px-4 hover:bg-zinc-50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-zinc-100 flex items-center justify-center text-zinc-600">
            <Icon size={16} />
          </div>
          <span className="font-medium text-sm text-zinc-900">{title}</span>
        </div>
        {isOpen ? <ChevronDown size={16} className="text-zinc-400" /> : <ChevronRight size={16} className="text-zinc-400" />}
      </button>
      {isOpen && (
        <div className="px-4 pb-4">
          {children}
        </div>
      )}
    </div>
  );
}

function Input({ label, value, onChange, placeholder = "" }: any) {
  return (
    <div className="mb-3">
      <label className="block text-[10px] font-bold text-zinc-500 mb-1 uppercase tracking-wider">{label}</label>
      <input 
        type="text" 
        value={value} 
        onChange={e => onChange(e.target.value)} 
        placeholder={placeholder}
        className="w-full px-3 py-2 bg-white border border-zinc-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:border-transparent transition-all"
      />
    </div>
  );
}

function Textarea({ label, value, onChange, placeholder = "", rows = 3 }: any) {
  return (
    <div className="mb-3">
      <label className="block text-[10px] font-bold text-zinc-500 mb-1 uppercase tracking-wider">{label}</label>
      <textarea 
        value={value} 
        onChange={e => onChange(e.target.value)} 
        placeholder={placeholder}
        rows={rows}
        className="w-full px-3 py-2 bg-white border border-zinc-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:border-transparent transition-all resize-y"
      />
    </div>
  );
}

export default function App() {
  const [data, setData] = useState(() => {
    const saved = localStorage.getItem('resumeData');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Failed to parse saved resume data", e);
      }
    }
    return INITIAL_DATA;
  });
  const [openSection, setOpenSection] = useState<string | null>('personal');

  useEffect(() => {
    localStorage.setItem('resumeData', JSON.stringify(data));
  }, [data]);

  const updatePersonalInfo = (field: string, value: string) => {
    setData(prev => ({ ...prev, personalInfo: { ...prev.personalInfo, [field]: value } }));
  };

  const updateArrayItem = (arrayName: keyof typeof INITIAL_DATA, id: string, field: string, value: string) => {
    setData(prev => ({
      ...prev,
      [arrayName]: (prev[arrayName] as any[]).map(item => item.id === id ? { ...item, [field]: value } : item)
    }));
  };

  const addArrayItem = (arrayName: keyof typeof INITIAL_DATA, newItem: any) => {
    setData(prev => ({
      ...prev,
      [arrayName]: [...(prev[arrayName] as any[]), { id: Date.now().toString(), ...newItem }]
    }));
  };

  const removeArrayItem = (arrayName: keyof typeof INITIAL_DATA, id: string) => {
    setData(prev => ({
      ...prev,
      [arrayName]: (prev[arrayName] as any[]).filter(item => item.id !== id)
    }));
  };

  const updateExperienceBullet = (expId: string, bulletIndex: number, value: string) => {
    setData(prev => ({
      ...prev,
      experience: prev.experience.map(exp => {
        if (exp.id === expId) {
          const newBullets = [...exp.bullets];
          newBullets[bulletIndex] = value;
          return { ...exp, bullets: newBullets };
        }
        return exp;
      })
    }));
  };

  const addExperienceBullet = (expId: string) => {
    setData(prev => ({
      ...prev,
      experience: prev.experience.map(exp => {
        if (exp.id === expId) {
          return { ...exp, bullets: [...exp.bullets, ""] };
        }
        return exp;
      })
    }));
  };

  const removeExperienceBullet = (expId: string, bulletIndex: number) => {
    setData(prev => ({
      ...prev,
      experience: prev.experience.map(exp => {
        if (exp.id === expId) {
          const newBullets = [...exp.bullets];
          newBullets.splice(bulletIndex, 1);
          return { ...exp, bullets: newBullets };
        }
        return exp;
      })
    }));
  };

  return (
    <div className="flex h-screen overflow-hidden bg-zinc-100 font-sans selection:bg-zinc-200 print:h-auto print:overflow-visible print:block">
      
      {/* Sidebar Builder */}
      <div className="w-full max-w-md bg-white border-r border-zinc-200 flex flex-col h-full print:hidden z-10 shadow-lg">
        <div className="p-4 border-b border-zinc-200 flex justify-between items-center bg-white sticky top-0 z-20">
          <div>
            <h1 className="text-lg font-semibold text-zinc-900">Resume Builder</h1>
            <p className="text-xs text-zinc-500">SOTA Minimal A4 Template</p>
          </div>
          <button 
            onClick={() => window.print()}
            className="flex items-center gap-2 px-3 py-2 bg-zinc-900 text-white text-sm font-medium rounded-md hover:bg-zinc-800 transition-colors shadow-sm"
          >
            <Printer size={16} />
            Print
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto">
          {/* Personal Info */}
          <AccordionItem title="Personal Info" icon={User} isOpen={openSection === 'personal'} onToggle={() => setOpenSection(openSection === 'personal' ? null : 'personal')}>
            <Input label="Full Name" value={data.personalInfo.name} onChange={(v: string) => updatePersonalInfo('name', v)} />
            <Input label="Job Title" value={data.personalInfo.title} onChange={(v: string) => updatePersonalInfo('title', v)} />
            <Input label="Email" value={data.personalInfo.email} onChange={(v: string) => updatePersonalInfo('email', v)} />
            <Input label="Phone" value={data.personalInfo.phone} onChange={(v: string) => updatePersonalInfo('phone', v)} />
            <Input label="Location" value={data.personalInfo.location} onChange={(v: string) => updatePersonalInfo('location', v)} />
            <Input label="Website" value={data.personalInfo.website} onChange={(v: string) => updatePersonalInfo('website', v)} />
            <Input label="GitHub" value={data.personalInfo.github} onChange={(v: string) => updatePersonalInfo('github', v)} />
            <Input label="LinkedIn" value={data.personalInfo.linkedin} onChange={(v: string) => updatePersonalInfo('linkedin', v)} />
            <Textarea label="Professional Summary" value={data.personalInfo.summary} onChange={(v: string) => updatePersonalInfo('summary', v)} rows={5} />
          </AccordionItem>

          {/* Education */}
          <AccordionItem title="Education" icon={GraduationCap} isOpen={openSection === 'education'} onToggle={() => setOpenSection(openSection === 'education' ? null : 'education')}>
            {data.education.map((edu) => (
              <div key={edu.id} className="mb-6 p-4 bg-zinc-50 border border-zinc-200 rounded-lg relative group">
                <button onClick={() => removeArrayItem('education', edu.id)} className="absolute top-3 right-3 text-zinc-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"><Trash2 size={16} /></button>
                <Input label="Institution" value={edu.institution} onChange={(v: string) => updateArrayItem('education', edu.id, 'institution', v)} />
                <Input label="Degree" value={edu.degree} onChange={(v: string) => updateArrayItem('education', edu.id, 'degree', v)} />
                <div className="grid grid-cols-2 gap-3">
                  <Input label="Date" value={edu.date} onChange={(v: string) => updateArrayItem('education', edu.id, 'date', v)} />
                  <Input label="Location" value={edu.location} onChange={(v: string) => updateArrayItem('education', edu.id, 'location', v)} />
                </div>
                <Textarea label="Details" value={edu.details} onChange={(v: string) => updateArrayItem('education', edu.id, 'details', v)} rows={2} />
              </div>
            ))}
            <button onClick={() => addArrayItem('education', { institution: '', degree: '', date: '', location: '', details: '' })} className="w-full py-2 flex items-center justify-center gap-2 text-sm font-medium text-zinc-600 bg-zinc-100 border border-zinc-200 border-dashed hover:bg-zinc-200 hover:border-solid rounded-md transition-all">
              <Plus size={16} /> Add Education
            </button>
          </AccordionItem>

          {/* Experience */}
          <AccordionItem title="Experience" icon={Briefcase} isOpen={openSection === 'experience'} onToggle={() => setOpenSection(openSection === 'experience' ? null : 'experience')}>
            {data.experience.map((exp) => (
              <div key={exp.id} className="mb-6 p-4 bg-zinc-50 border border-zinc-200 rounded-lg relative group">
                <button onClick={() => removeArrayItem('experience', exp.id)} className="absolute top-3 right-3 text-zinc-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"><Trash2 size={16} /></button>
                <Input label="Company" value={exp.company} onChange={(v: string) => updateArrayItem('experience', exp.id, 'company', v)} />
                <Input label="Role" value={exp.role} onChange={(v: string) => updateArrayItem('experience', exp.id, 'role', v)} />
                <div className="grid grid-cols-2 gap-3">
                  <Input label="Date" value={exp.date} onChange={(v: string) => updateArrayItem('experience', exp.id, 'date', v)} />
                  <Input label="Location" value={exp.location} onChange={(v: string) => updateArrayItem('experience', exp.id, 'location', v)} />
                </div>
                <div className="mt-4">
                  <label className="block text-[10px] font-bold text-zinc-500 mb-2 uppercase tracking-wider">Bullets</label>
                  {exp.bullets.map((bullet, bIndex) => (
                    <div key={bIndex} className="flex gap-2 mb-2">
                      <textarea 
                        value={bullet} 
                        onChange={e => updateExperienceBullet(exp.id, bIndex, e.target.value)}
                        className="flex-1 px-3 py-2 bg-white border border-zinc-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:border-transparent transition-all resize-y min-h-[60px]"
                      />
                      <button onClick={() => removeExperienceBullet(exp.id, bIndex)} className="text-zinc-400 hover:text-red-500 shrink-0 self-start mt-2"><Trash2 size={16} /></button>
                    </div>
                  ))}
                  <button onClick={() => addExperienceBullet(exp.id)} className="text-xs font-medium text-zinc-600 hover:text-zinc-900 flex items-center gap-1 mt-2">
                    <Plus size={14} /> Add Bullet
                  </button>
                </div>
              </div>
            ))}
            <button onClick={() => addArrayItem('experience', { company: '', role: '', date: '', location: '', bullets: [''] })} className="w-full py-2 flex items-center justify-center gap-2 text-sm font-medium text-zinc-600 bg-zinc-100 border border-zinc-200 border-dashed hover:bg-zinc-200 hover:border-solid rounded-md transition-all">
              <Plus size={16} /> Add Experience
            </button>
          </AccordionItem>

          {/* Skillsets */}
          <AccordionItem title="Skillsets" icon={Wrench} isOpen={openSection === 'skills'} onToggle={() => setOpenSection(openSection === 'skills' ? null : 'skills')}>
            {data.skills.map((skill) => (
              <div key={skill.id} className="mb-4 p-4 bg-zinc-50 border border-zinc-200 rounded-lg relative group">
                <button onClick={() => removeArrayItem('skills', skill.id)} className="absolute top-3 right-3 text-zinc-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"><Trash2 size={16} /></button>
                <Input label="Category" value={skill.category} onChange={(v: string) => updateArrayItem('skills', skill.id, 'category', v)} placeholder="e.g. Languages" />
                <Textarea label="Items" value={skill.items} onChange={(v: string) => updateArrayItem('skills', skill.id, 'items', v)} placeholder="e.g. JavaScript, TypeScript, React" rows={2} />
              </div>
            ))}
            <button onClick={() => addArrayItem('skills', { category: '', items: '' })} className="w-full py-2 flex items-center justify-center gap-2 text-sm font-medium text-zinc-600 bg-zinc-100 border border-zinc-200 border-dashed hover:bg-zinc-200 hover:border-solid rounded-md transition-all">
              <Plus size={16} /> Add Skill Category
            </button>
          </AccordionItem>

          {/* Projects */}
          <AccordionItem title="Projects" icon={FolderGit2} isOpen={openSection === 'projects'} onToggle={() => setOpenSection(openSection === 'projects' ? null : 'projects')}>
            {data.projects.map((proj) => (
              <div key={proj.id} className="mb-4 p-4 bg-zinc-50 border border-zinc-200 rounded-lg relative group">
                <button onClick={() => removeArrayItem('projects', proj.id)} className="absolute top-3 right-3 text-zinc-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"><Trash2 size={16} /></button>
                <Input label="Project Name" value={proj.name} onChange={(v: string) => updateArrayItem('projects', proj.id, 'name', v)} />
                <Input label="Link (Optional)" value={proj.link} onChange={(v: string) => updateArrayItem('projects', proj.id, 'link', v)} />
                <Textarea label="Description" value={proj.description} onChange={(v: string) => updateArrayItem('projects', proj.id, 'description', v)} rows={3} />
              </div>
            ))}
            <button onClick={() => addArrayItem('projects', { name: '', description: '', link: '' })} className="w-full py-2 flex items-center justify-center gap-2 text-sm font-medium text-zinc-600 bg-zinc-100 border border-zinc-200 border-dashed hover:bg-zinc-200 hover:border-solid rounded-md transition-all">
              <Plus size={16} /> Add Project
            </button>
          </AccordionItem>

          {/* Certifications */}
          <AccordionItem title="Certifications" icon={Award} isOpen={openSection === 'certifications'} onToggle={() => setOpenSection(openSection === 'certifications' ? null : 'certifications')}>
            {data.certifications.map((cert) => (
              <div key={cert.id} className="mb-4 p-4 bg-zinc-50 border border-zinc-200 rounded-lg relative group">
                <button onClick={() => removeArrayItem('certifications', cert.id)} className="absolute top-3 right-3 text-zinc-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"><Trash2 size={16} /></button>
                <Input label="Certification Name" value={cert.name} onChange={(v: string) => updateArrayItem('certifications', cert.id, 'name', v)} />
                <Input label="Issuer" value={cert.issuer} onChange={(v: string) => updateArrayItem('certifications', cert.id, 'issuer', v)} />
                <Input label="Date" value={cert.date} onChange={(v: string) => updateArrayItem('certifications', cert.id, 'date', v)} />
                <Input label="Certificate Link" value={cert.link || ''} onChange={(v: string) => updateArrayItem('certifications', cert.id, 'link', v)} placeholder="https://..." />
              </div>
            ))}
            <button onClick={() => addArrayItem('certifications', { name: '', issuer: '', date: '', link: '' })} className="w-full py-2 flex items-center justify-center gap-2 text-sm font-medium text-zinc-600 bg-zinc-100 border border-zinc-200 border-dashed hover:bg-zinc-200 hover:border-solid rounded-md transition-all">
              <Plus size={16} /> Add Certification
            </button>
          </AccordionItem>

          {/* Additional */}
          <AccordionItem title="Additional" icon={MoreHorizontal} isOpen={openSection === 'additional'} onToggle={() => setOpenSection(openSection === 'additional' ? null : 'additional')}>
            <Textarea label="Additional Information" value={data.additional} onChange={(v: string) => setData(prev => ({ ...prev, additional: v }))} rows={4} placeholder="Languages, interests, awards, etc." />
          </AccordionItem>
          
          <div className="h-12"></div> {/* Bottom padding */}
        </div>
      </div>

      {/* Preview Area */}
      <div className="flex-1 overflow-auto p-4 sm:p-8 bg-zinc-100 print:p-0 print:bg-white print:overflow-visible flex justify-center items-start print:block">
        {/* A4 Container */}
        <div className="bg-white shadow-xl print:shadow-none w-[210mm] min-h-[297mm] p-12 sm:p-16 print:p-0 shrink-0 relative overflow-hidden print:overflow-visible print:w-full print:min-h-0 print:mx-auto">
          
          {/* Header */}
          <header className="mb-10">
            <h1 className="text-4xl sm:text-5xl font-medium tracking-tighter text-zinc-900 mb-2 uppercase">
              {data.personalInfo.name || "YOUR NAME"}
            </h1>
            <p className="text-xs sm:text-sm font-mono tracking-[0.2em] text-zinc-500 uppercase">
              {data.personalInfo.title || "YOUR TITLE"}
            </p>
            
            <div className="flex flex-wrap gap-x-6 gap-y-3 mt-6 text-[11px] font-mono text-zinc-500">
              {data.personalInfo.email && <a href={`mailto:${data.personalInfo.email}`} className="flex items-center gap-2 hover:text-zinc-900 transition-colors"><Mail size={12} /> {data.personalInfo.email}</a>}
              {data.personalInfo.phone && <a href={`tel:${data.personalInfo.phone}`} className="flex items-center gap-2 hover:text-zinc-900 transition-colors"><Phone size={12} /> {data.personalInfo.phone}</a>}
              {data.personalInfo.location && <div className="flex items-center gap-2"><MapPin size={12} /> {data.personalInfo.location}</div>}
              {data.personalInfo.website && <a href={data.personalInfo.website.startsWith('http') ? data.personalInfo.website : `https://${data.personalInfo.website}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-zinc-900 transition-colors"><Globe size={12} /> {data.personalInfo.website}</a>}
              {data.personalInfo.github && <a href={data.personalInfo.github.startsWith('http') ? data.personalInfo.github : `https://${data.personalInfo.github}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-zinc-900 transition-colors"><Github size={12} /> {data.personalInfo.github}</a>}
              {data.personalInfo.linkedin && <a href={data.personalInfo.linkedin.startsWith('http') ? data.personalInfo.linkedin : `https://${data.personalInfo.linkedin}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-zinc-900 transition-colors"><Linkedin size={12} /> {data.personalInfo.linkedin}</a>}
            </div>
          </header>

          {/* Summary */}
          {data.personalInfo.summary && (
            <section className="mb-10">
              <p className="text-[13px] text-zinc-600 leading-relaxed">
                {data.personalInfo.summary}
              </p>
            </section>
          )}

          {/* Education */}
          {data.education.length > 0 && (
            <section className="mb-10">
              <SectionHeading>Education</SectionHeading>
              <div className="space-y-6">
                {data.education.map((edu) => (
                  <div key={edu.id}>
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-1">
                      <h3 className="text-[15px] font-semibold text-zinc-900">{edu.degree}</h3>
                      <span className="text-[11px] font-mono text-zinc-500 mt-1 sm:mt-0">{edu.date}</span>
                    </div>
                    <div className="text-[13px] text-zinc-900 mb-2 font-medium">
                      {edu.institution} {edu.location && <><span className="text-zinc-300 mx-2 font-normal">•</span> <span className="text-zinc-500 font-normal">{edu.location}</span></>}
                    </div>
                    {edu.details && (
                      <p className="text-[13px] text-zinc-600">
                        {edu.details}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Experience */}
          {data.experience.length > 0 && (
            <section className="mb-10">
              <SectionHeading>Experience</SectionHeading>
              <div className="space-y-7">
                {data.experience.map((exp) => (
                  <div key={exp.id}>
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-1">
                      <h3 className="text-[15px] font-semibold text-zinc-900">{exp.role}</h3>
                      <span className="text-[11px] font-mono text-zinc-500 mt-1 sm:mt-0">{exp.date}</span>
                    </div>
                    <div className="text-[13px] text-zinc-900 mb-3 font-medium">
                      {exp.company} {exp.location && <><span className="text-zinc-300 mx-2 font-normal">•</span> <span className="text-zinc-500 font-normal">{exp.location}</span></>}
                    </div>
                    <ul className="list-none space-y-2">
                      {exp.bullets.map((bullet, i) => bullet.trim() && (
                        <li key={i} className="text-[13px] text-zinc-600 leading-relaxed relative pl-4 before:content-[''] before:absolute before:left-0 before:top-[0.6em] before:w-1 before:h-1 before:bg-zinc-300 before:rounded-full">
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Skills */}
          {data.skills.length > 0 && (
            <section className="mb-10">
              <SectionHeading>Skills</SectionHeading>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {data.skills.map((skillGroup) => (
                  <div key={skillGroup.id}>
                    <h3 className="text-[11px] font-mono tracking-widest text-zinc-900 uppercase mb-2">{skillGroup.category}</h3>
                    <p className="text-[13px] text-zinc-600 leading-relaxed">
                      {skillGroup.items}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Projects */}
          {data.projects.length > 0 && (
            <section className="mb-10">
              <SectionHeading>Projects</SectionHeading>
              <div className="space-y-6">
                {data.projects.map((proj) => (
                  <div key={proj.id}>
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-1">
                      <h3 className="text-[15px] font-semibold text-zinc-900">{proj.name}</h3>
                      {proj.link && <span className="text-[11px] font-mono text-zinc-500 mt-1 sm:mt-0">{proj.link}</span>}
                    </div>
                    <p className="text-[13px] text-zinc-600 leading-relaxed">
                      {proj.description}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Certifications */}
          {data.certifications.length > 0 && (
            <section className="mb-10">
              <SectionHeading>Certifications</SectionHeading>
              <div className="space-y-4">
                {data.certifications.map((cert) => (
                  <div key={cert.id} className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline">
                    <div className="text-[13px] text-zinc-900 font-medium">
                      {cert.link ? (
                        <a href={cert.link} target="_blank" rel="noopener noreferrer" className="hover:underline underline-offset-2 inline-flex items-center gap-1">
                          {cert.name}
                          <ExternalLink size={12} className="text-zinc-400" />
                        </a>
                      ) : (
                        cert.name
                      )}
                      {cert.issuer && <><span className="text-zinc-300 mx-2 font-normal">•</span> <span className="text-zinc-500 font-normal">{cert.issuer}</span></>}
                    </div>
                    <span className="text-[11px] font-mono text-zinc-500 mt-1 sm:mt-0">{cert.date}</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Additional */}
          {data.additional && (
            <section className="mb-10">
              <SectionHeading>Additional</SectionHeading>
              <p className="text-[13px] text-zinc-600 leading-relaxed whitespace-pre-wrap">
                {data.additional}
              </p>
            </section>
          )}

        </div>
      </div>
    </div>
  );
}
