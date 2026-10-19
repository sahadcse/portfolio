import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/Button";

/**
 * Homepage hero (plan §5.2, §6.3 #1). Static server component — the first
 * viewport paints without JavaScript (V2-09 acceptance: hero static-paints).
 * Hierarchy: identity eyebrow → scope-ladder H1 → four-verb subhead →
 * CTAs → availability line. Portrait: owner-supplied (public/ceo_image.png,
 * processed by the V2-12 pipeline).
 */
export default async function Hero() {
    const t = await getTranslations("home.hero");

    return (
        <section className="py-16 md:py-24 flex flex-col items-start">
            <div className="grid w-full grid-cols-1 lg:grid-cols-[1.25fr_0.75fr] gap-12 lg:gap-16 items-center">
                <div>
                    <p className="text-mono text-muted-foreground mb-6">{t("eyebrow")}</p>

                    <h1 className="text-hero mb-6">{t("title")}</h1>

                    <p className="text-lead max-w-3xl mb-8">{t("subtitle")}</p>

                    <div className="flex flex-col sm:flex-row gap-4">
                        <Link href="/contact" className="inline-flex">
                            <Button size="lg">
                                {t("ctaPrimary")}
                                <ArrowRight className="ms-2 w-5 h-5 rtl:rotate-180" aria-hidden="true" />
                            </Button>
                        </Link>
                        <Link href="/projects" className="inline-flex">
                            <Button variant="outline" size="lg">
                                {t("ctaSecondary")}
                            </Button>
                        </Link>
                    </div>

                    {/* Availability line (§5.2 #5) — plainly true state the owner keeps updated */}
                    <p className="mt-8 flex items-center gap-2 text-label text-muted-foreground">
                        <span
                            className="inline-block w-2 h-2 rounded-full bg-success"
                            aria-hidden="true"
                        />
                        {t("availability")}
                    </p>
                </div>

                {/* Personal portrait — distinctive personal-brand anchor (§8.6) */}
                <figure className="justify-self-center lg:justify-self-end w-full max-w-xs lg:max-w-sm">
                    <div className="overflow-hidden rounded-md border border-border bg-muted">
                        <Image
                            src="/images/sahad-portrait.webp"
                            alt={t("portraitAlt")}
                            width={960}
                            height={1440}
                            sizes="(min-width: 1024px) 384px, (min-width: 640px) 320px, 80vw"
                            className="w-full h-auto"
                            priority
                        />
                    </div>
                    <figcaption className="mt-3 text-mono text-muted-foreground">
                        {t("portraitCaption")}
                    </figcaption>
                </figure>
            </div>
        </section>
    );
}
