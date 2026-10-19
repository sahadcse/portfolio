import { SERVICES } from "@/data/services";
import { Link } from "@/i18n/navigation";
import { Metadata } from "next";
import FAQ from "@/components/sections/FAQ";

import { setRequestLocale } from "next-intl/server";
import { localeAlternates, localePath, type Locale } from "@/i18n/config";
export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: string }>;
}): Promise<Metadata> {
    const { locale } = await params;
    return {

    title: "Services | Premium Websites & Enterprise Software",
    description: "Custom Next.js websites, high-converting landing pages, and enterprise software development by SAHAD - Software Architect.",
        alternates: {
            canonical: localePath(locale as Locale, "/services"),
            languages: localeAlternates("/services"),
        },
    };
}

/**
 * Services Page - Premium Tier 1 Offering
 * Designed for business stakeholders seeking elite digital solutions
 */
export default async function ServicesPage({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    setRequestLocale(locale);
    return (
        <main className="min-h-screen bg-background">
            {/* Hero Section */}
            <section className="pt-24 pb-16 md:pt-32 md:pb-24 px-4">
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="text-hero text-foreground mb-6">
                        Premium Digital Services
                    </h1>
                    <p className="text-lead max-w-2xl mx-auto">
                        Elite websites that convert and enterprise software that scales.
                        Built for business owners who demand performance, reliability, and results.
                    </p>
                </div>
            </section>

            {/* Services Grid */}
            <section className="pb-16 md:pb-24 px-4">
                <div>
                    <div className="grid md:grid-cols-2 gap-8">
                        {SERVICES.map((service, index) => (
                            <div
                                key={service.id}
                                className="group bg-card border border-border/40 rounded-md p-8 hover:border-primary/30 transition-all duration-300"
                                style={{ animationDelay: `${index * 100}ms` }}
                            >
                                {/* Category Badge */}
                                <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-medium mb-6">
                                    {service.category}
                                </div>

                                {/* Title */}
                                <h2 className="text-h2 text-foreground mb-4">
                                    {service.category.split(" & ")[0]}
                                </h2>

                                {/* Subtitle */}
                                <p className="text-muted-foreground mb-6 leading-relaxed">
                                    {service.subtitle}
                                </p>

                                {/* Core Focus */}
                                <div className="bg-muted/50 rounded-md p-4 mb-6">
                                    <p className="text-sm font-semibold text-foreground mb-2">
                                        Core Focus
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                        {service.coreFocus}
                                    </p>
                                </div>

                                {/* Business Value */}
                                <p className="text-sm text-muted-foreground mb-8 leading-relaxed">
                                    <span className="font-semibold text-foreground">Business Value:</span> {service.businessValue}
                                </p>

                                {/* Features List */}
                                <div className="space-y-4">
                                    <h3 className="text-label text-foreground uppercase">
                                        What&apos;s Included
                                    </h3>
                                    <ul className="space-y-3">
                                        {service.features.map((feature, idx) => (
                                            <li
                                                key={idx}
                                                className="flex items-start gap-3 text-sm text-muted-foreground"
                                            >
                                                <span className="flex-shrink-0 w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                                                    <span className="w-2 h-2 rounded-full bg-primary" />
                                                </span>
                                                <div>
                                                    <span className="font-semibold text-primary">
                                                        {feature.title}
                                                    </span>
                                                    {feature.description && (
                                                        <span className="text-muted-foreground ms-1">
                                                            — {feature.description}
                                                        </span>
                                                    )}
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <FAQ />

            {/* CTA Section */}
            <section className="py-16 md:py-24 px-4 bg-gradient-to-b from-muted/40 to-background dark:from-muted/20 dark:to-background">
                <div className="max-w-reading mx-auto text-center">
                    <h2 className="text-h2 text-foreground mb-6">
                        Ready to Elevate Your Digital Presence?
                    </h2>
                    <p className="text-lead mb-8">
                        Need a high-performance website or a dedicated hand to manage your systems?
                        Let&apos;s talk about your project.
                    </p>
                    <Link
                        href="/contact"
                        className="inline-flex items-center gap-2 px-8 py-4 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-sm transition-all duration-300 shadow-lg hover:shadow-primary/25"
                    >
                        Start a Conversation
                        <svg className="w-5 h-5 rtl:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </Link>
                </div>
            </section>
        </main>
    );
}
