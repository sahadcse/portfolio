/**
 * Portfolio Type Definitions
 * Strict TypeScript interfaces for all portfolio data structures
 */

// Project-related types

/**
 * Evidence tier (plan §9.2) — exactly one chip per case study, semantics
 * never blurred. This is the defense against prototype-equals-production.
 */
export type EvidenceTier =
  | "client-system"
  | "client-site"
  | "own-production"
  | "demo"
  | "employment";

/** Curation level (plan §15.2 V2-10): full case study / light entry / off index */
export type ProjectStatus = "flagship" | "supporting" | "archived";

export interface Screenshot {
  src: string;
  alt: string;
  caption: string; // mono caption: "Fig. 01 — ..."
}

export interface EngineeringDecision {
  decision: string;
  because: string; // "chose X over Y because Z" (§9.1)
}

export interface Outcome {
  statement: string;
  basis: string; // how this is known — outcomes without a basis are omitted (§9.1)
}

export interface Project {
  id: string;
  title: string;
  /** Compact display name for cards */
  shortTitle?: string;
  /** Work still in progress — renders a localized "Ongoing" chip on cards */
  ongoing?: boolean;
  clientSector: string;
  /** Normalized sector for index filter chips (§6.4) */
  sectorShort?: string;
  businessProblem: string;
  businessOutcome: string;
  technicalArchitecture: string;
  metrics: string[];
  tags: string[];
  imageUrl: string;
  liveUrl: string;
  codeUrl: string;
  /** Case-study system (plan §9.1/§9.2) */
  status: ProjectStatus;
  evidenceLevel: EvidenceTier;
  role: string; // one line: "Solo engineer — architecture, build, deployment"
  timeframe?: string;
  /** 16:10 card crop + social preview JPEG (V2-12 pipeline output) */
  cardImageUrl?: string;
  ogImageUrl?: string;
  /** One-line outcome for cards */
  oneLineOutcome?: string;
  /** Full case-study fields (flagships) */
  constraints?: string;
  decisions?: EngineeringDecision[];
  screenshots?: Screenshot[];
  outcomes?: Outcome[];
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

export interface AboutContent {
  bio: string[];
  experience: Experience[];
  education: Education[];
  skills: string[];
}
