import { SiteConfig, HeroContent, TechStackItem, ValueProposition } from "@/types/portfolio";
import { Github, Linkedin, Mail, Server, Database, Cloud, Code, Terminal, Globe, Layers, Zap, Shield, TrendingUp } from "lucide-react";

/**
 * Site-wide configuration and metadata
 */
export const SITE_CONFIG: SiteConfig = {
  name: "SAHAD",
  title: "Software Engineer | Backend & Real-Time Systems",
  description: "Full-Stack Software Engineer specializing in NestJS, Next.js, and Cloud Infrastructure.",
  email: "sahaduzzaman.cse@gmail.com",
  socials: {
    github: "https://github.com/sahadcse",
    linkedin: "https://linkedin.com/in/sahadcse",
  },
  resumeUrl: "/resume/Md-Sahaduzzaman-Resume.pdf",
};

/**
 * Hero section content - Optimized for high-ticket B2B conversion
 */
export const HERO_CONTENT: HeroContent = {
  headline: "Transforming Complex Business Operations into Scalable Software Solutions",
  subHeadline: "I engineer custom backend architectures and full-stack web systems that automate manual processes, eliminate operational bottlenecks, and reduce overhead costs.",
  cta: {
    primary: {
      text: "Discuss a Project",
      href: "/contact",
    },
    secondary: {
      text: "View Case Studies",
      href: "/projects",
    },
  },
};

/**
 * Value proposition - Three core pillars for business decision-makers
 */
export const VALUE_PROPOSITION: ValueProposition = {
  title: "Why Partner With Me",
  subtitle: "I don't just write code—I solve business problems through engineering excellence",
  pillars: [
    {
      title: "Process Automation",
      description: "Reducing manual human hours through robust, automated workflows that scale with your operations",
      icon: "zap",
    },
    {
      title: "Invisible Infrastructure",
      description: "Building ultra-stable, high-performance backend systems that run flawlessly in the background",
      icon: "shield",
    },
    {
      title: "Data-Driven ROI",
      description: "Designing architectures optimized for speed, security, and minimized cloud-hosting costs",
      icon: "trending-up",
    },
  ],
};

/**
 * Icon mapping for value proposition pillars
 */
export const VALUE_PROP_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  zap: Zap,
  shield: Shield,
  "trending-up": TrendingUp,
};

/**
 * Technology stack display items
 */
export const TECH_STACK: TechStackItem[] = [
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
