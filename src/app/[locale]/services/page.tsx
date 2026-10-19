import { ArrowRight, CircleCheck } from "lucide-react";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import PageHero from "@/components/shared/PageHero";
import CtaPanel from "@/components/shared/CtaPanel";
import OnThisPage from "@/components/shared/OnThisPage";
import FAQ from "@/components/sections/FAQ";
import { localeAlternates, localePath, type Locale } from "@/i18n/config";

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: string }>;
}): Promise<Metadata> {
    const { locale } = await params;
    return {
        title: "Services",
        description:
            "What Md Sahaduzzaman can do for your team or business: custom web applications, backend and API engineering, business workflow systems, and production-grade websites.",
        alternates: {
            canonical: localePath(locale as Locale, "/services"),
            languages: localeAlternates("/services"),
        },
    };
}

const SERVICE_KEYS = ["customApps", "backend", "workflows", "websites"] as const;
const PROCESS_KEYS = ["discover", "scope", "build", "launch", "afterwards"] as const;

export default async function ServicesPage({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    setRequestLocale(locale);
    const t = await getTranslations("services");

    const sections = [
        { id: "services", label: t("onThisPage.services") },
        { id: "process", label: t("onThisPage.process") },
        { id: "faq", label: t("onThisPage.faq") },
    ];

    return (
        <div>
            <div className="container-content pt-16 md:pt-24">
                <PageHero
                    eyebrow={t("hero.eyebrow")}
                    title={t("hero.title")}
                    lead={t.rich("hero.lead", {
                        accent: (chunk) => <span className="em-accent">{chunk}</span>,
                    })}
                />
                <OnThisPage items={sections} />
            </div>

            {/* Service sections — alternating editorial rows, full-bleed dividers */}
            <div id="services">
                {SERVICE_KEYS.map((key, index) => {
                    const proofs = t.raw(`items.${key}.proofs`) as { label: string; href: string }[];
                    const delivers = t.raw(`items.${key}.delivers`) as string[];
                    const flip = index % 2 === 1;

                    return (
                        <section
                            key={key}
                            className="border-t border-border/60 py-12 md:py-16"
                        >
                            <div className="container-content">
                            <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-6 md:gap-12">
                            {/* Oversized index numeral — the editorial anchor */}
                            <div
                                className={`text-6xl md:text-8xl font-bold text-primary/15 leading-none select-none ${
                                    flip ? "md:order-2" : ""
                                }`}
                                aria-hidden="true"
                            >
                                {t(`items.${key}.index`)}
                            </div>

                            <div className={flip ? "md:order-1" : ""}>
                                <h2 className="text-h2 mb-3">{t(`items.${key}.title`)}</h2>
                                <p className="text-lead mb-8">{t(`items.${key}.for`)}</p>

                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                                    <div>
                                        <h3 className="text-label text-muted-foreground uppercase mb-2.5">
                                            {t("labels.problem")}
                                        </h3>
                                        <p className="text-body text-muted-foreground mb-8">
                                            {t(`items.${key}.problem`)}
                                        </p>

                                        <h3 className="text-label text-muted-foreground uppercase mb-3">
                                            {t("labels.delivers")}
                                        </h3>
                                        <ul className="space-y-2.5">
                                            {delivers.map((item) => (
                                                <li
                                                    key={item}
                                                    className="flex items-start gap-3 text-body text-foreground"
                                                >
                                                    <CircleCheck
                                                        className="w-4 h-4 shrink-0 text-primary mt-0.5"
                                                        aria-hidden="true"
                                                    />
                                                    {item}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div className="lg:border-s lg:border-border/60 lg:ps-10">
                                        <h3 className="text-label text-muted-foreground uppercase mb-2.5">
                                            {t("labels.whyMe")}
                                        </h3>
                                        <p className="text-body text-muted-foreground mb-8">
                                            {t(`items.${key}.evidence`)}
                                        </p>

                                        <h3 className="text-label text-muted-foreground uppercase mb-3">
                                            {t("labels.proof")}
                                        </h3>
                                        <ul className="space-y-2.5">
                                            {proofs.map((proof) => (
                                                <li key={proof.href}>
                                                    <Link
                                                        href={proof.href}
                                                        className="inline-flex items-center gap-1.5 text-label text-primary hover:underline"
                                                    >
                                                        {proof.label}
                                                        <ArrowRight
                                                            className="w-3.5 h-3.5 rtl:rotate-180"
                                                            aria-hidden="true"
                                                        />
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            </div>
                            </div>
                        </section>
                    );
                })}
            </div>

            {/* Adjacent needs — honest edges */}
            <div className="container-content my-12">
                <section className="rounded-md border border-border/50 bg-card p-8 md:p-10">
                    <h2 className="text-h3 mb-3">{t("notListed.title")}</h2>
                    <p className="text-body text-muted-foreground max-w-3xl mb-5">
                        {t("notListed.text")}
                    </p>
                    <Link
                        href="/contact"
                        className="inline-flex items-center gap-1.5 text-label text-primary hover:underline"
                    >
                        {t("notListed.cta")}
                        <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" aria-hidden="true" />
                    </Link>
                </section>
            </div>

            {/* Engagement process */}
            <section id="process" className="py-16 md:py-24 border-t border-border/60">
                <div className="container-content">
                    <div className="max-w-2xl mb-12">
                        <h2 className="text-h2 mb-4">{t("process.title")}</h2>
                        <p className="text-lead">{t("process.subtitle")}</p>
                    </div>

                    <ol className="border-t border-border/60">
                        {PROCESS_KEYS.map((key, index) => (
                            <li
                                key={key}
                                className="grid grid-cols-1 md:grid-cols-[auto_12rem_1fr] gap-2 md:gap-10 py-7 border-b border-border/60 items-baseline"
                            >
                                <span className="text-mono text-muted-foreground">
                                    {String(index + 1).padStart(2, "0")}
                                </span>
                                <h3 className="text-h3">{t(`process.steps.${key}.label`)}</h3>
                                <p className="text-body text-muted-foreground max-w-2xl">
                                    {t(`process.steps.${key}.text`)}
                                </p>
                            </li>
                        ))}
                    </ol>
                </div>
            </section>

            <FAQ title={t("faqTitle")} id="faq" />

            <CtaPanel />
        </div>
    );
}
