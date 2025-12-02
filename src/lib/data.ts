import { Github, Linkedin, Mail, Server, Database, Cloud, Code, Terminal, Cpu, Globe, Layers } from "lucide-react";

export const SITE_CONFIG = {
  name: "SAHAD",
  title: "Software Engineer | Backend & Real-Time Systems",
  description: "Full-Stack Software Engineer specializing in NestJS, Next.js, and Cloud Infrastructure.",
  email: "sahaduzzaman.cse@gmail.com",
  socials: {
    github: "https://github.com/sahadcse", // Placeholder
    linkedin: "https://linkedin.com/in/sahadcse", // Placeholder
  },
};

export const HERO_CONTENT = {
  headline: "I build scalable E-commerce and Real-Time platforms for growing businesses.",
  subHeadline: "Full-Stack Software Engineer specializing in NodeJS, NestJS, Next.js, and Cloud Infrastructure.",
};

export const ABOUT_CONTENT = {
  bio: "I am a Software Engineer based in Dhaka, serving clients globally. With a BSc in Computer Science and Engineering, I combine academic rigor with practical deployment experience in South Korea and Bangladesh.",
};

export const TECH_STACK = [
  { name: "JavaScript", icon: Code },
  { name: "Python", icon: Terminal },
  { name: "Docker", icon: Layers },
  { name: "Next.js", icon: Globe },
  { name: "TypeScript", icon: Code },
  { name: "Node.js", icon: Server },
  { name: "NestJS", icon: Server },
  { name: "PostgreSQL", icon: Database },
  { name: "Redis", icon: Database },
  { name: "Azure", icon: Cloud },
];

export const PROJECTS = [
  {
    id: "4j-traders",
    title: "4j Traders (E-Commerce)",
    description: "Engineered a scalable, containerized backend using NestJS/PostgreSQL. Managed complex user roles (SuperAdmin, Customer) and ensured 100% transactional integrity. Setup CI/CD with GitHub Actions.",
    tags: ["NestJS", "PostgreSQL", "Docker", "GitHub Actions"],
    link: "4jtraders.com",
  },
  {
    id: "rushkat",
    title: "Rushkat (3D Asset Store)",
    description: "Optimized backend performance for a high-traffic asset store. Implemented Redis caching and improved database queries to handle heavy load.",
    tags: ["NestJS", "Redis", "Performance Optimization"],
    link: "#",
  },
  {
    id: "online-doctor",
    title: "Online Doctor Consultation Platform",
    description: "Built a real-time telemedicine app using WebRTC and Socket.io. Integrated Stripe for secure payments and Azure for hosting.",
    tags: ["WebRTC", "Socket.io", "Stripe", "Azure"],
    link: "odcp.vercel.app",
  },
];
