import { getTranslations, setRequestLocale } from "next-intl/server";
import Hero from "@/components/home/Hero";
import ProofBand from "@/components/home/ProofBand";
import NeedsGrid from "@/components/home/NeedsGrid";
import Flagships from "@/components/home/Flagships";
import HowIWork from "@/components/home/HowIWork";
import Capabilities from "@/components/home/Capabilities";
import TrustSection from "@/components/home/TrustSection";
import FaqTeaser from "@/components/home/FaqTeaser";
import CtaPanel from "@/components/shared/CtaPanel";
import OnThisPage from "@/components/shared/OnThisPage";

/**
 * Homepage (plan §6.3 + user brief §7/§9): hero → proof band → needs router
 * → selected projects → how I work → capabilities → trust → FAQ teaser →
 * final CTA. Sections bleed backgrounds to the viewport edges and carry
 * their own rhythm (py-16 md:py-24); content constrains via
 * .container-content.
 */
export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("home.onThisPage");

  const sections = [
    { id: "proof", label: t("proof") },
    { id: "needs", label: t("needs") },
    { id: "projects", label: t("projects") },
    { id: "process", label: t("process") },
    { id: "capabilities", label: t("capabilities") },
    { id: "trust", label: t("trust") },
    { id: "faq", label: t("faq") },
  ];

  return (
    <div>
      <Hero />
      <div className="container-content">
        <OnThisPage items={sections} />
      </div>
      <ProofBand />
      <NeedsGrid />
      <Flagships />
      <HowIWork />
      <Capabilities />
      <TrustSection />
      <FaqTeaser />
      <CtaPanel />
    </div>
  );
}
