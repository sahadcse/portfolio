import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/Button";
import { IdentityName } from "@/components/shared/IdentityName";

/**
 * Homepage hero (user brief §3): two-audience composition.
 * Left — business value: scope-ladder headline, four-verb subhead (accent
 * emphasis via t.rich), CTAs, availability line.
 * Right — technical identity: compact portrait + editorial expertise panel.
 * Static server component; the first viewport paints without JavaScript.
 */

export default async function Hero() {
    const t = await getTranslations("home.hero");
    const expertise = t.raw("panel.expertise") as string[];

    return (
        <section className="py-16 md:py-24">
            <div className="container-content">
                <div className="grid w-full grid-cols-1 lg:grid-cols-[1.3fr_0.7fr] gap-12 lg:gap-16 items-center">
                    {/* Left — business value and conversion */}
                    <div>
                        <p className="text-mono text-muted-foreground mb-6">
                            Md <IdentityName>Sahaduzzaman (Sahad)</IdentityName>
                            <span aria-hidden="true"> · </span>Software Engineer · Founder, Sahad Labs
                        </p>

                        <h1 className="text-hero mb-6">{t("title")}</h1>

                        <p className="text-lead max-w-2xl mb-8">
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

                    {/* Right — technical identity and expertise panel */}
                    <aside
                        aria-label="Engineering identity"
                        className="rounded-md border border-border/60 bg-card p-6 md:p-7"
                    >
                        <div className="flex items-center gap-4">
                            <div className="w-20 h-20 md:w-24 md:h-24 shrink-0 overflow-hidden rounded-md border border-border bg-muted">
                                <Image
                                    src="/images/sahad-portrait.webp"
                                    alt={t("portraitAlt")}
                                    width={960}
                                    height={1440}
                                    sizes="96px"
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

                        <h2 className="text-label text-muted-foreground uppercase mt-7 mb-3">
                            {t("panel.expertiseTitle")}
                        </h2>
                        <ul className="space-y-2.5">
                            {expertise.map((item) => (
                                <li
                                    key={item}
                                    className="flex items-start gap-2.5 text-body text-foreground"
                                >
                                    <span
                                        className="mt-[0.55rem] w-1.5 h-1.5 shrink-0 rounded-full bg-primary/70"
                                        aria-hidden="true"
                                    />
                                    {item}
                                </li>
                            ))}
                        </ul>

                        <Link
                            href="/projects"
                            className="inline-flex items-center gap-1.5 text-label text-primary hover:underline mt-6"
                        >
                            {t("panel.linkLabel")}
                            <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" aria-hidden="true" />
                        </Link>
                    </aside>
                </div>
            </div>
        </section>
    );
}
