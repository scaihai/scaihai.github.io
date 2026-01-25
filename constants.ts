
import { Project, Experience, Skill } from './types';

export const ENGINEER_NAME = "Destiny Gogo-fyneface";
export const ENGINEER_ROLE = "Senior AI & Machine Learning Engineer";
export const BIO = "Architecting the next generation of intelligent systems. Specialized in Large Language Models, Multi-agent workflows, and Scalable MLOps. Currently pushing boundaries at the intersection of Generative AI and production engineering.";

export const PROJECTS: Project[] = [
  {
    id: "1",
    title: "NeuroFlow LLM Gateway",
    description: "Enterprise-grade orchestrator for multi-provider LLM deployments with semantic caching.",
    longDescription: "Built a high-performance gateway that manages traffic across OpenAI, Anthropic, and Gemini. Implemented vector-based semantic caching which reduced API costs by 35% and improved latency by 200ms for repetitive queries.",
    techStack: ["Python", "FastAPI", "Redis", "Pinecone", "Docker", "Kubernetes"],
    imageUrl: "https://picsum.photos/seed/ai1/800/600",
    metrics: [
      { label: "Cost Savings", value: "35%" },
      { label: "Latency", value: "80ms" }
    ]
  },
  {
    id: "2",
    title: "VisionScan Pro",
    description: "Real-time edge computing vision model for quality control in manufacturing.",
    longDescription: "Developed a custom YOLOv8-based model for micro-defect detection in semiconductor manufacturing. Optimized for deployment on NVIDIA Jetson devices with TensorRT.",
    techStack: ["PyTorch", "OpenCV", "TensorRT", "C++", "React"],
    imageUrl: "https://picsum.photos/seed/ai2/800/600",
    metrics: [
      { label: "Accuracy", value: "99.4%" },
      { label: "FPS", value: "120" }
    ]
  },
  {
    id: "3",
    title: "Agentic Workspace",
    description: "An autonomous agent framework for developer productivity automation.",
    longDescription: "A framework that allows developers to define complex multi-step workflows executed by autonomous LLM agents with tool-use capabilities. Features an interactive visualization of agent reasoning chains.",
    techStack: ["TypeScript", "LangChain", "Node.js", "Gemini API", "PostgreSQL"],
    imageUrl: "https://picsum.photos/seed/ai3/800/600",
    metrics: [
      { label: "Tasks Autom.", value: "5k+" },
      { label: "Success Rate", value: "92%" }
    ]
  }
];

export const EXPERIENCES: Experience[] = [
  {
    id: "e1",
    company: "NeuralDynamics Inc.",
    role: "Lead Machine Learning Engineer",
    period: "2021 - Present",
    achievements: [
      "Led a team of 5 engineers to deploy a company-wide recommendation engine scaling to 10M+ users.",
      "Architected the MLOps pipeline using Kubeflow, reducing deployment time from weeks to hours.",
      "Implemented RAG systems for internal knowledge bases using hybrid search techniques."
    ]
  },
  {
    id: "e2",
    company: "QuantLabs AI",
    role: "Machine Learning Researcher",
    period: "2018 - 2021",
    achievements: [
      "Published 2 papers in NeurIPS on efficient transformer architectures.",
      "Optimized deep learning models for low-latency high-frequency trading applications.",
      "Collaborated with data scientists to clean and preprocess TB-scale financial datasets."
    ]
  }
];

export const SKILLS: Skill[] = [
  { name: "PyTorch / TensorFlow", level: 95, category: "ML/DL" },
  { name: "LLM Fine-tuning", level: 90, category: "ML/DL" },
  { name: "Computer Vision", level: 85, category: "ML/DL" },
  { name: "Python / C++", level: 95, category: "Engineering" },
  { name: "Docker / Kubernetes", level: 80, category: "Engineering" },
  { name: "Distributed Training", level: 85, category: "Engineering" },
  { name: "SQL / NoSQL", level: 85, category: "Tools" },
  { name: "Cloud (GCP/AWS)", level: 90, category: "Tools" },
  { name: "Technical Writing", level: 90, category: "Soft Skills" }
];
