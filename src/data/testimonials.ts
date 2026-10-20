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
 * Status (2026-10-20): the three clients below approved their testimonial
 * wordings via the owner (drafts + checklist: docs/testimonial-drafts.md).
 * Attribution is organization-level — no individual names/roles were
 * approved, so none are shown. Quotes are kept in the exact approved
 * English wording; UI text around them localizes.
 */
export const TESTIMONIALS: Testimonial[] = [
  {
    id: "cozee-care",
    quote: {
      en: "Sahad took the time to understand our needs and helped translate our requirements into a clear, professional online experience. He paid attention to the details and worked through feedback as the project developed.",
    },
    authorName: "Cozee Care",
    authorRole: "",
    relation: "client",
    projectRef: "cozee-care",
    obtainedVia: "written-statement",
    obtainedOn: "2026-10",
    permission: { written: true, scope: "named-publication", on: "2026-10" },
    displayLocales: ["en"],
  },
  {
    id: "violina-pflegedienst",
    quote: {
      en: "Sahad helped us present our services through a professional online presence. He approached our requirements thoughtfully and paid attention to the details throughout the website project.",
    },
    authorName: "Violina Pflegedienst",
    authorRole: "",
    relation: "client",
    projectRef: "violina-pflegedienst",
    obtainedVia: "written-statement",
    obtainedOn: "2026-10",
    permission: { written: true, scope: "named-publication", on: "2026-10" },
    displayLocales: ["en"],
  },
  {
    id: "taqwa-group",
    quote: {
      en: "Sahad took a practical, structured approach to our website project. He worked to reflect our requirements clearly and paid attention to the details during implementation.",
    },
    authorName: "Taqwa Group",
    authorRole: "",
    relation: "client",
    projectRef: "taqwa-group",
    obtainedVia: "written-statement",
    obtainedOn: "2026-10",
    permission: { written: true, scope: "named-publication", on: "2026-10" },
    displayLocales: ["en"],
  },
];

/** Only entries that pass the written-permission gate may ever render. */
export function approvedTestimonials(): Testimonial[] {
  return TESTIMONIALS.filter((t) => t.permission?.written === true);
}
