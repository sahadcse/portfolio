import type { EvidenceTier } from "@/types/portfolio";

/**
 * Verified personal metrics for the proof band (plan §9.3–§9.5).
 *
 * Publication rules (§9.3): every metric carries its counting methodology;
 * numbers carry a verification date or update on the quarterly cadence;
 * a metric losing its evidence is withdrawn, not defended; demo builds
 * never count as delivered; all counts are personal.
 *
 * Owner-gated slots (clients served, response time) are deliberately
 * absent — reserved, never invented.
 */
export interface VerifiedMetric {
  id: string;
  value: string;
  label: string;
  /** Counting methodology, shown with the metric (§9.3: the transparency IS the trust mechanism) */
  methodology: string;
  /** Verification date, if the metric is time-sensitive */
  asOf?: string;
}

export const VERIFIED_METRICS: VerifiedMetric[] = [
  {
    id: "delivered",
    value: "8",
    label: "Projects delivered",
    methodology:
      "Work that reached a real recipient: client-accepted systems and websites, one own product in production, and shipped employment deliverables. Demo builds are tracked separately and excluded.",
  },
  {
    id: "sectors",
    value: "6",
    label: "Sectors served",
    methodology:
      "Distinct sectors of the delivered set only: disability services, healthcare, telemedicine, real estate, e-commerce, and a digital-asset marketplace.",
  },
  {
    id: "countries",
    value: "4",
    label: "Countries reached",
    methodology:
      "Distinct countries of clients and employers with delivered work: Australia, Germany, South Korea, and Bangladesh.",
  },
  {
    id: "live-systems",
    value: "3",
    label: "Live client systems",
    methodology:
      "Client systems verified reachable and in operation at the verification date. Re-checked every publication cycle; withdrawn if verification fails.",
    asOf: "2026-10",
  },
];

/**
 * Tier chips (§9.2) — semantics never blurred, exactly one per case study.
 * English-only until V2-24/V2-25 run the labels through the review gates;
 * non-English locales fall back to English like all untranslated strings.
 */
const TIER_LABELS: Record<string, string> = {
  "client-system": "Client system",
  "client-site": "Client site",
  "own-production": "Own product",
  demo: "Demo",
  employment: "Employment",
};

export function tierLabel(tier: EvidenceTier | string): string {
  return TIER_LABELS[tier] ?? tier;
}
