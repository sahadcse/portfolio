import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/Button";
import { IdentityName } from "@/components/shared/IdentityName";

/**
 * Homepage hero (user brief §3, refined): two-audience composition.
 * Left — pure business value: editorial two-part headline (quiet opening
 * line, then the platform phrase at full scale with a marker accent),
 * four-verb subhead, CTAs, availability. No identity content here.
 * Right — technical profile: identity header (portrait, accent name,
 * role) and hands-on experience rows with clearly labeled durations.
 * Static server component; the first viewport paints without JavaScript.
 */
const EXPERIENCE_KEYS = ["backend", "devops", "frontend", "ai", "soft"] as const;

export default async function Hero() {
    const t = await getTranslations("home.hero");

    return (
        <section className="py-16 md:py-24">
            <div className="container-content">
                <div className="grid w-full grid-cols-1 lg:grid-cols-[1.3fr_0.7fr] gap-12 lg:gap-16 items-center">
                    {/* Left — business value and conversion (no identity content) */}
                    <div>
                        {/* Editorial headline: quiet opening line, full-scale platform line.
                            The marker accent is decoration on top of real text — the
                            message stays fully readable if styling fails. */}
                        <h1>
                            <span className="block text-2xl md:text-3xl font-medium text-muted-foreground tracking-tight mb-1">
                                {t("headlineStart")}
                            </span>
                            <span className="block text-hero">
                                {t.rich("headlineEnd", {
                                    mark: (chunk) => (
                                        <span className="headline-mark">{chunk}</span>
                                    ),
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

                        {/* Availability line (§5.2 #5) — plainly true state the owner keeps updated */}
                        <p className="mt-8 flex items-center gap-2 text-label text-muted-foreground">
                            <span
                                className="inline-block w-2 h-2 rounded-full bg-success"
                                aria-hidden="true"
                            />
                            {t("availability")}
                        </p>
                    </div>

                    {/* Right — technical profile (identity + hands-on experience) */}
                    <aside
                        aria-label="Technical profile"
                        className="rounded-md border border-border/60 bg-card p-6 md:p-7"
                    >
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
                                <p className="text-body text-muted-foreground mt-1">
                                    {t("panel.role")}
                                </p>
                                <p className="text-mono text-muted-foreground mt-1">
                                    {t("panel.basedIn")}
                                </p>
                            </div>
                        </div>

                        <h2 className="text-label text-muted-foreground uppercase mt-7">
                            {t("panel.experienceTitle")}
                        </h2>

                        <dl className="mt-3 space-y-3.5">
                            {EXPERIENCE_KEYS.map((key) => (
                                <div key={key} className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-0.5">
                                    <dt className="text-label text-foreground font-medium leading-5">
                                        {t(`panel.rows.${key}.label`)}
                                    </dt>
                                    <dd className="text-mono text-primary text-right leading-5 whitespace-nowrap">
                                        {t(`panel.rows.${key}.since`)}
                                    </dd>
                                    <dd className="col-span-2 text-sm text-muted-foreground leading-snug">
                                        {t(`panel.rows.${key}.tools`)}
                                    </dd>
                                </div>
                            ))}
                        </dl>

                        <p className="text-mono text-muted-foreground mt-5 pt-4 border-t border-border/40">
                            {t("panel.experienceNote")}
                        </p>
                    </aside>
                </div>
            </div>
        </section>
    );
}
