import { motion } from 'motion/react';
import { ExternalLink, Github } from 'lucide-react';

const PROJECTS = [
  {
    title: "WildlifeDetect",
    description: "A production-grade wildlife object detection system. Implements a fine-tuned Faster R-CNN model, REST/gRPC inference, and full MLOps observability. Scaled using Docker and TensorFlow Serving for high-accuracy localization.",
    tags: ["Python", "TensorFlow", "MLOps", "Grafana"],
    github: "https://github.com/scaihai/ai-wildlife-detect",
    demo: "https://wildlife-detect.enkwadore.com/"
  },
  {
    title: "MedExpert",
    description: "A clinical question-answering system for medical practitioners, utilizing Retrieval Augmented Generation (RAG). Implements a fine-tuned ClinicalBERT model, Qdrant vector database, and a custom SQuAD dataset.",
    tags: ["Python", "PyTorch", "RAG", "Hugging Face"],
    github: "https://github.com/scaihai/ai-med-expert",
    demo: "https://med-expert.enkwadore.com/"
  },
  // {
  //   title: "Distributed RLHF Platform",
  //   description: "A platform for managing crowdsourced human feedback for reinforcement learning. Features an efficient queuing system, quality scoring via PPO models, and real-time dashboarding.",
  //   tags: ["Next.js", "Redis", "HuggingFace", "AWS ECS"],
  //   github: "#",
  //   demo: "#"
  // },
  // {
  //   title: "Edge Visio",
  //   description: "Real-time computer vision processing pipeline for low-resource edge devices. Utilizes TensorRT optimization and continuous quantization techniques to maintain 60fps on Jetson Nanos.",
  //   tags: ["C++", "CUDA", "TensorRT", "YOLO"],
  //   github: "#",
  //   demo: "#"
  // }
];

export default function Projects() {
  return (
    <section id="projects" className="py-24 px-6 bg-[#FAFAFA]">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="font-display text-4xl font-bold tracking-tight mb-4">Selected Work</h2>
          <p className="text-gray-500 text-lg max-w-2xl">
            A highlighting of my recent engineering projects, focusing on scalable AI infrastructure and applied agentic modeling.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {PROJECTS.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group bg-white p-8 rounded-2xl border border-gray-200 hover:border-black/20 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <div className="flex justify-between items-start mb-6">
                <h3 className="font-display font-bold text-2xl tracking-tight text-balance group-hover:text-blue-600 transition-colors">
                  <a href={project.demo} target="_blank">{project.title}</a>
                </h3>
                <div className="flex gap-3 text-gray-400">
                  <a href={project.github} target="_blank" className="hover:text-black transition-colors">
                    <Github className="w-5 h-5" />
                  </a>
                  <a href={project.demo} target="_blank" className="hover:text-black transition-colors">
                    <ExternalLink className="w-5 h-5" />
                  </a>
                </div>
              </div>
              
              <p className="text-gray-600 mb-8 leading-relaxed">
                {project.description}
              </p>
              
              <div className="flex flex-wrap gap-2 mt-auto">
                {project.tags.map((tag, tagIndex) => (
                  <span 
                    key={tagIndex}
                    className="px-3 py-1 bg-gray-50 text-gray-600 text-xs font-mono rounded-full border border-gray-100"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
