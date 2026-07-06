/**
 * Portfolio Type Definitions
 * Strict TypeScript interfaces for all portfolio data structures
 */

// Project-related types
export interface Project {
  id: string;
  title: string;
  clientSector: string;
  businessProblem: string;
  businessOutcome: string;
  technicalArchitecture: string;
  metrics: string[];
  tags: string[];
  imageUrl: string;
  liveUrl: string;
  codeUrl: string;
}

// Experience-related types
export interface Experience {
  role: string;
  company: string;
  location: string;
  period: string;
  description: string[];
}

export interface Education {
  degree: string;
  institution: string;
  period: string;
  description: string;
}

// Site configuration types
export interface SocialLinks {
  github: string;
  linkedin: string;
}

export interface SiteConfig {
  name: string;
  title: string;
  description: string;
  email: string;
  socials: SocialLinks;
  resumeUrl?: string;
}

export interface HeroContent {
  headline: string;
  subHeadline: string;
}

export interface AboutContent {
  bio: string[];
  experience: Experience[];
  education: Education[];
  skills: string[];
}

export interface TechStackItem {
  name: string;
  icon: React.ComponentType<{ className?: string }>;
}

export interface ValuePropositionItem {
  title: string;
  description: string;
  icon: string;
}

export interface ValueProposition {
  title: string;
  subtitle: string;
  pillars: ValuePropositionItem[];
}

export interface HeroCTA {
  primary: {
    text: string;
    href: string;
  };
  secondary: {
    text: string;
    href: string;
  };
}

export interface HeroContent {
  headline: string;
  subHeadline: string;
  cta?: HeroCTA;
}
