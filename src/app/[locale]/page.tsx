import { setRequestLocale } from "next-intl/server";
import Hero from "@/components/home/Hero";
import ProofBand from "@/components/home/ProofBand";
import NeedsGrid from "@/components/home/NeedsGrid";
import Flagships from "@/components/home/Flagships";
import HowIWork from "@/components/home/HowIWork";
import TechStrip from "@/components/home/TechStrip";
import FaqTeaser from "@/components/home/FaqTeaser";
import FinalCta from "@/components/home/FinalCta";

/**
 * Homepage (plan §6.3): hero → proof band → needs router → selected work →
 * how I work → tech strip → FAQ teaser → final CTA. Sections carry their
 * own rhythm (py-16 md:py-24).
 */
export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <div>
      <Hero />
      <ProofBand />
      <NeedsGrid />
      <Flagships />
      <HowIWork />
      <TechStrip />
      <FaqTeaser />
      <FinalCta />
    </div>
  );
}
