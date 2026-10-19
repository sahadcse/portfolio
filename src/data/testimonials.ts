import type { Locale } from "@/i18n/config";

/**
 * Testimonial system (plan §9.4) — the data model ships in V2; content is
 * gated by verification. Nothing renders without written permission, and
 * with zero approved entries the section is absent entirely (empty =
 * absent, never placeholder).
 *
 * Content classes, never conflated (§9.4): client reviews (public and
 * verifiable), direct testimonials (written for this site with
 * permission), and professional recommendations (labeled by relation).
 */
export interface Testimonial {
  id: string;
  /** Per-locale approved text; fallback rules per §10.5 */
  quote: Partial<Record<Locale, string>> & { en: string };
  authorName: string;
  authorRole: string;
  /** Never shown without the author's permission */
  authorOrg?: string;
  relation: "client" | "employer" | "colleague" | "collaborator";
  projectRef?: string;
  obtainedVia: "written-statement" | "linkedin-recommendation" | "email";
  obtainedOn: string;
  /** Hard gate — entries without this do not render */
  permission: { written: true; scope: "named-publication"; on: string };
  /** Language versions the author approved for publication */
  displayLocales: Locale[];
}

/**
 * Status (plan §9.4): zero verified testimonial entries exist today, so
 * V2 ships with the section hidden. Add a fully-permissioned entry here
 * and it appears — no code change needed.
 */
export const TESTIMONIALS: Testimonial[] = [];

/** Only entries that pass the written-permission gate may ever render. */
export function approvedTestimonials(): Testimonial[] {
  return TESTIMONIALS.filter((t) => t.permission?.written === true);
}
