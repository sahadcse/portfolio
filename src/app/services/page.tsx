import { SERVICES } from "@/data/services";
import Link from "next/link";
import { Metadata } from "next";
import FAQ from "@/components/sections/FAQ";

export const metadata: Metadata = {
    title: "Services | Premium Websites & Enterprise Software",
    description: "Custom Next.js websites, high-converting landing pages, and enterprise software development by SAHAD - Software Architect.",
};

/**
 * Services Page - Premium Tier 1 Offering
 * Designed for business stakeholders seeking elite digital solutions
 */
export default function ServicesPage() {
    return (
        <main className="min-h-screen bg-background">
            {/* Hero Section */}
            <section className="pt-32 pb-20 px-4">
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-slate-900 dark:text-white mb-6">
                        Premium Digital Services
                    </h1>
                    <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
                        Elite websites that convert and enterprise software that scales.
                        Built for business owners who demand performance, reliability, and results.
                    </p>
                </div>
            </section>

            {/* Services Grid */}
            <section className="pb-20 px-4">
                <div className="max-w-6xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-8">
                        {SERVICES.map((service, index) => (
                            <div
                                key={service.id}
                                className="group bg-card border border-border/40 rounded-2xl p-8 hover:border-cyan-500/30 transition-all duration-300"
                                style={{ animationDelay: `${index * 100}ms` }}
                            >
                                {/* Category Badge */}
                                <div className="inline-flex items-center px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-600 dark:text-cyan-400 text-xs font-medium mb-6">
                                    {service.category}
                                </div>

                                {/* Title */}
                                <h2 className="text-2xl md:text-3xl font-bold tracking-wide text-slate-900 dark:text-white mb-4">
                                    {service.category.split(" & ")[0]}
                                </h2>

                                {/* Subtitle */}
                                <p className="text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
                                    {service.subtitle}
                                </p>

                                {/* Core Focus */}
                                <div className="bg-slate-50 dark:bg-slate-900/50 rounded-lg p-4 mb-6">
                                    <p className="text-sm font-semibold text-slate-700 dark:text-slate-200 mb-2">
                                        Core Focus
                                    </p>
                                    <p className="text-sm text-slate-600 dark:text-slate-400">
                                        {service.coreFocus}
                                    </p>
                                </div>

                                {/* Business Value */}
                                <p className="text-sm text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
                                    <span className="font-semibold text-slate-900 dark:text-slate-200">Business Value:</span> {service.businessValue}
                                </p>

                                {/* Features List */}
                                <div className="space-y-4">
                                    <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100 uppercase tracking-wide">
                                        What's Included
                                    </h3>
                                    <ul className="space-y-3">
                                        {service.features.map((feature, idx) => (
                                            <li
                                                key={idx}
                                                className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-400"
                                            >
                                                <span className="flex-shrink-0 w-5 h-5 rounded-full bg-cyan-500/10 flex items-center justify-center mt-0.5">
                                                    <span className="w-2 h-2 rounded-full bg-cyan-500" />
                                                </span>
                                                <div>
                                                    <span className="font-semibold text-cyan-600 dark:text-cyan-400">
                                                        {feature.title}
                                                    </span>
                                                    {feature.description && (
                                                        <span className="text-slate-500 dark:text-slate-500 ml-1">
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
            <section className="py-20 px-4 bg-gradient-to-b from-slate-50 to-white dark:from-slate-900/50 dark:to-background">
                <div className="max-w-3xl mx-auto text-center">
                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 dark:text-white mb-6">
                        Ready to Elevate Your Digital Presence?
                    </h2>
                    <p className="text-lg text-slate-600 dark:text-slate-300 mb-8">
                        Need a high-performance website or a dedicated hand to manage your systems?
                        Let's talk about your project.
                    </p>
                    <Link
                        href="/contact"
                        className="inline-flex items-center gap-2 px-8 py-4 bg-cyan-500 hover:bg-cyan-600 text-white font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-cyan-500/25"
                    >
                        Start a Conversation
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </Link>
                </div>
            </section>
        </main>
    );
}
