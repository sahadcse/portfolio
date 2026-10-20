import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { ArrowRight, CircleCheck, Sparkles } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/Button";
import { IdentityName } from "@/components/shared/IdentityName";

/**
 * Homepage hero — Canva-reference composition (owner brief):
 * Left (~60%): availability line, editorial two-part headline (green
 * "First", lavender marker under the platform phrase), description with
 * accent verbs, CTAs, check-marked proof points. No identity content.
 * Right (~35%): tall bordered technical profile card — identity header,
 * hands-on experience rows (label left, mono duration right), AI detail,
 * engineering standards, divider + monospaced closing statement.
 * Static server component; the first viewport paints without JavaScript.
 */
const EXPERIENCE_KEYS = ["backend", "frontend", "devops", "systems", "ai"] as const;

export default async function Hero() {
    const t = await getTranslations("home.hero");
    const proofPoints = t.raw("proofPoints") as string[];

    return (
        <section className="py-16 md:py-24">
            <div className="container-content">
                <div className="grid w-full grid-cols-1 lg:grid-cols-[1.7fr_1fr] gap-12 lg:gap-16 items-center">
                    {/* Left — business value (no identity content) */}
                    <div>
                        {/* Availability line */}
                        <p className="flex items-center gap-2 text-label text-muted-foreground mb-7">
                            <span
                                className="inline-block w-2 h-2 rounded-full bg-success"
                                aria-hidden="true"
                            />
                            {t("availability")}
                        </p>

                        {/* Editorial headline: quiet first line with green accent,
                            full-scale second line with lavender marker sweep */}
                        <h1>
                            <span className="block text-2xl md:text-[2rem] font-medium text-foreground/80 tracking-tight mb-1 leading-snug">
                                {t.rich("headlineStart", {
                                    green: (chunk) => <span className="headline-green">{chunk}</span>,
                                })}
                                <Sparkles
                                    className="inline w-5 h-5 ms-2 mb-2 text-primary/50 align-baseline"
                                    aria-hidden="true"
                                />
                            </span>
                            <span className="block text-hero">
                                {t.rich("headlineEnd", {
                                    mark: (chunk) => <span className="headline-mark">{chunk}</span>,
                                })}
                            </span>
                        </h1>

                        <p className="text-lead max-w-2xl mt-6 mb-8">
                            {t.rich("subtitle", {
                                accent: (chunk) => <span className="em-accent">{chunk}</span>,
                            })}
                        </p>

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

                        {/* Proof-point line — secondary to the CTAs */}
                        <ul className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2">
                            {proofPoints.map((point, index) => (
                                <li
                                    key={point}
                                    className="flex items-center gap-2 text-label text-muted-foreground"
                                >
                                    {index > 0 && (
                                        <span
                                            className="text-border me-3 select-none"
                                            aria-hidden="true"
                                        >
                                            ·
                                        </span>
                                    )}
                                    <CircleCheck
                                        className="w-4 h-4 text-success shrink-0"
                                        aria-hidden="true"
                                    />
                                    {point}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Right — technical profile card */}
                    <aside
                        aria-label="Technical profile"
                        className="rounded-t-md rounded-b-md border border-border/70 bg-card p-6 md:p-7 lg:self-stretch flex flex-col"
                    >
                        {/* Identity header */}
                        <div className="flex items-center gap-4">
                            <div className="w-16 h-16 md:w-20 md:h-20 shrink-0 overflow-hidden rounded-md border border-border bg-muted">
                                <Image
                                    src="/images/sahad-portrait.webp"
                                    alt={t("portraitAlt")}
                                    width={960}
                                    height={1440}
                                    sizes="80px"
                                    className="w-full h-full object-cover object-top"
                                    priority
                                />
                            </div>
                            <div className="min-w-0">
                                <p className="text-label leading-snug">
                                    <IdentityName>Sahaduzzaman (Sahad)</IdentityName>
                                </p>
                                <p className="text-body text-foreground mt-1">{t("panel.role")}</p>
                                <p className="text-body text-muted-foreground">{t("panel.org")}</p>
                                <p className="text-mono text-muted-foreground mt-1.5">
                                    {t("panel.basedIn")}
                                </p>
                            </div>
                        </div>

                        {/* Experience rows */}
                        <h2 className="text-label text-muted-foreground uppercase mt-8 mb-3">
                            {t("panel.experienceTitle")}
                        </h2>
                        <dl>
                            {EXPERIENCE_KEYS.map((key) => (
                                <div
                                    key={key}
                                    className="flex items-baseline justify-between gap-4 py-2 border-b border-border/40 last:border-b-0"
                                >
                                    <dt className="text-body font-medium text-foreground">
                                        {t(`panel.rows.${key}.label`)}
                                    </dt>
                                    <dd className="text-mono text-primary whitespace-nowrap">
                                        {t(`panel.rows.${key}.since`)}
                                    </dd>
                                </div>
                            ))}
                        </dl>

                        {/* AI detail — smaller, muted, directly under the AI row */}
                        <p className="text-sm text-muted-foreground mt-1 -mb-1">
                            {t("panel.aiDetail")}
                        </p>

                        {/* Engineering standards */}
                        <h2 className="text-label text-muted-foreground uppercase mt-7 mb-2">
                            {t("panel.standardsTitle")}
                        </h2>
                        <p className="text-body text-muted-foreground">{t("panel.standards")}</p>

                        {/* Divider + closing technical statement */}
                        <div className="mt-auto pt-6">
                            <div className="h-px bg-border/60 mb-4" />
                            <p className="text-mono text-muted-foreground leading-relaxed">
                                {t("panel.sla")}
                            </p>
                        </div>
                    </aside>
                </div>
            </div>
        </section>
    );
}
