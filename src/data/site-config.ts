import { SiteConfig } from "@/types/portfolio";

/**
 * Canonical site URL — the single source of truth for absolute URLs
 * (metadataBase, robots.txt, sitemap.xml). The fallback matches the
 * production deployment; override via the NEXT_PUBLIC_SITE_URL env var
 * if the domain ever changes.
 */
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://sahadcse.vercel.app";

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
