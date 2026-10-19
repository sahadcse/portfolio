import Image from "next/image";
import { ArrowRight, ArrowUpRight, MapPin, GraduationCap, Briefcase, CircleCheck } from "lucide-react";
import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import PageHero from "@/components/shared/PageHero";
import CtaPanel from "@/components/shared/CtaPanel";
import TestimonialSection from "@/components/shared/TestimonialSection";
import OnThisPage from "@/components/shared/OnThisPage";
import { IdentityName } from "@/components/shared/IdentityName";
import { SITE_CONFIG } from "@/data/site-config";
import { localeAlternates, localePath, type Locale } from "@/i18n/config";

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: string }>;
}): Promise<Metadata> {
    const { locale } = await params;
    return {
        title: "About",
        description:
            "Md Sahaduzzaman — software engineer and founder of Sahad Labs. Full-stack and backend engineering for international clients since 2024.",
        alternates: {
            canonical: localePath(locale as Locale, "/about"),
            languages: localeAlternates("/about"),
        },
    };
}

/** Verified timeline order (plan §15.2 V2-19, data reconciled in R1-CV1). */
const JOURNEY_KEYS = ["education", "taqwa", "rushkat", "fourj", "sahadlabs"] as const;
const PRINCIPLE_KEYS = ["understand", "secure", "performance", "ownership", "handover"] as const;
const WORKING_KEYS = ["timezones", "communication", "plainLanguage", "confidentiality"] as const;
const TOOL_CATEGORY_KEYS = ["ai", "frontend", "backend", "devops", "soft"] as const;
/** Categories carrying an evidence note (AI = assisted-not-shipped; soft = where evidenced). */
const TOOLS_WITH_NOTES: readonly string[] = ["ai", "soft"];

export default async function AboutPage({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    setRequestLocale(locale);
    const t = await getTranslations("about");

    const sections = [
        { id: "journey", label: t("journey.title") },
        { id: "principles", label: t("principles.title") },
        { id: "working", label: t("working.title") },
        { id: "tools", label: t("tools.title") },
    ];

    return (
        <div>
            <div className="container-content pt-16 md:pt-24">
                <PageHero eyebrow={t("hero.eyebrow")} title={t("hero.title")} lead={t("hero.lead")} />
                <OnThisPage items={sections} />
            </div>

            {/* Introduction — portrait + narrative + facts */}
            <section className="mb-20 md:mb-28">
                <div className="container-content">
                <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.4fr] gap-12 lg:gap-16 items-start">
                    <div>
                        <figure>
                            <div className="overflow-hidden rounded-md border border-border bg-muted max-w-xs">
                                <Image
                                    src="/images/sahad-portrait.webp"
                                    alt={t("intro.portraitAlt")}
                                    width={960}
                                    height={1440}
                                    sizes="(min-width: 1024px) 320px, 70vw"
                                    className="w-full h-auto"
                                    priority
                                />
                            </div>
                        </figure>
                        <p className="mt-6 mb-4 text-label">
                            <IdentityName>Sahaduzzaman (Sahad)</IdentityName>
                        </p>
                        <dl className="space-y-2.5">
                            {(
                                [
                                    ["location", MapPin],
                                    ["education", GraduationCap],
                                    ["experience", Briefcase],
                                    ["status", CircleCheck],
                                ] as const
                            ).map(([key, Icon]) => (
                                <div key={key} className="flex items-center gap-2.5 text-label text-muted-foreground">
                                    <Icon className="w-4 h-4 text-primary shrink-0" aria-hidden="true" />
                                    <dt className="sr-only">{key}</dt>
                                    <dd>{t(`intro.facts.${key}`)}</dd>
                                </div>
                            ))}
                        </dl>
                    </div>

                <div>
                    <div className="space-y-5 max-w-2xl">
                        {t.raw("intro.paragraphs").map((paragraph: string) => (
                            <p key={paragraph.slice(0, 24)} className="text-lead">
                                {paragraph}
                            </p>
                        ))}
                    </div>

                    <div className="flex flex-wrap gap-4 mt-8">
                        <a
                            href={SITE_CONFIG.resumeUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 rounded-sm bg-primary text-primary-foreground hover:bg-primary/90 transition-colors font-semibold px-6 py-2.5"
                        >
                            {t("intro.cv")}
                            <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                        </a>
                        <a
                            href={SITE_CONFIG.socials.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 rounded-sm border-[1.5px] border-input bg-background hover:bg-accent hover:text-accent-foreground transition-colors font-semibold px-6 py-2.5"
                        >
                            {t("intro.linkedin")}
                            <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                        </a>
                    </div>
                </div>
                </div>
                </div>
            </section>

            {/* Professional journey — single-rail timeline */}
            <section id="journey" className="mb-20 md:mb-28">
                <div className="container-content">
                <div className="max-w-2xl mb-12">
                    <h2 className="text-h2 mb-4">{t("journey.title")}</h2>
                    <p className="text-lead">{t("journey.subtitle")}</p>
                </div>

                <ol className="relative border-s-2 border-border/60 ms-3 md:ms-6 space-y-10">
                    {JOURNEY_KEYS.map((key) => (
                        <li key={key} className="relative ps-8 md:ps-10">
                            <span
                                className="absolute -start-[7px] top-1.5 w-3 h-3 rounded-full border-2 border-primary bg-background"
                                aria-hidden="true"
                            />
                            <p className="text-mono text-muted-foreground">{t(`journey.entries.${key}.period`)}</p>
                            <h3 className="text-h3 mt-1.5">{t(`journey.entries.${key}.title`)}</h3>
                            <p className="text-label text-primary mt-0.5">{t(`journey.entries.${key}.org`)}</p>
                            <p className="text-body text-muted-foreground mt-2 max-w-2xl">
                                {t(`journey.entries.${key}.text`)}
                            </p>
                            {key === "rushkat" && (
                                <p className="text-mono text-muted-foreground mt-2">
                                    {t("journey.concurrentNote")}
                                </p>
                            )}
                        </li>
                    ))}
                </ol>
                </div>
            </section>

            {/* Engineering principles — evidence-linked */}
            <section id="principles" className="mb-20 md:mb-28">
                <div className="container-content">
                <div className="max-w-2xl mb-12">
                    <h2 className="text-h2 mb-4">{t("principles.title")}</h2>
                    <p className="text-lead">{t("principles.subtitle")}</p>
                </div>

                <div className="border-t border-border/60">
                    {PRINCIPLE_KEYS.map((key, index) => (
                        <article
                            key={key}
                            className="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-4 md:gap-10 py-8 border-b border-border/60"
                        >
                            <span className="text-mono text-muted-foreground md:w-10 shrink-0 md:pt-1">
                                {String(index + 1).padStart(2, "0")}
                            </span>
                            <div className="max-w-3xl">
                                <h3 className="text-h3 mb-2.5">{t(`principles.items.${key}.title`)}</h3>
                                <p className="text-body text-muted-foreground mb-3">
                                    {t(`principles.items.${key}.text`)}
                                </p>
                                <Link
                                    href={t(`principles.items.${key}.proofHref`)}
                                    className="inline-flex items-center gap-1.5 text-label text-primary hover:underline"
                                >
                                    {t(`principles.items.${key}.proofLabel`)}
                                    <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" aria-hidden="true" />
                                </Link>
                            </div>
                        </article>
                    ))}
                </div>
                </div>
            </section>

            {/* Working with me — the human side */}
            <section id="working" className="mb-20 md:mb-28">
                <div className="container-content">
                <div className="max-w-2xl mb-12">
                    <h2 className="text-h2 mb-4">{t("working.title")}</h2>
                    <p className="text-lead">{t("working.subtitle")}</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {WORKING_KEYS.map((key) => (
                        <div key={key} className="rounded-md border border-border/50 bg-card p-7">
                            <h3 className="text-h3 mb-2.5">{t(`working.items.${key}.title`)}</h3>
                            <p className="text-body text-muted-foreground">
                                {t(`working.items.${key}.text`)}
                            </p>
                        </div>
                    ))}
                </div>
                </div>
            </section>

            {/* Testimonials — renders only from permission-gated data */}
            <TestimonialSection />

            {/* Tools I Reach For — five evidence-backed categories, one row on desktop */}
            <section id="tools" className="py-16 md:py-24 border-y border-border/40 bg-muted/20">
                <div className="container-content">
                    <div className="max-w-2xl mb-12">
                        <h2 className="text-h2 mb-4">{t("tools.title")}</h2>
                        <p className="text-lead">{t("tools.subtitle")}</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
                        {TOOL_CATEGORY_KEYS.map((key) => (
                            <div
                                key={key}
                                className="rounded-md border border-border/50 bg-card p-5 flex flex-col"
                            >
                                <h3 className="text-label uppercase tracking-wide text-foreground mb-3">
                                    {t(`tools.categories.${key}.label`)}
                                </h3>
                                <p className="text-mono text-muted-foreground leading-relaxed">
                                    {t(`tools.categories.${key}.items`)}
                                </p>
                                {TOOLS_WITH_NOTES.includes(key) && (
                                    <p className="text-sm text-muted-foreground mt-3 pt-3 border-t border-border/40">
                                        {t(`tools.categories.${key}.note`)}
                                      </p>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <CtaPanel />
        </div>
    );
}
