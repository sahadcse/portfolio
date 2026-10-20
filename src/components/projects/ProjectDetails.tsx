"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight, Globe, Github } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "@/i18n/navigation";
import { useTranslations, useLocale } from "next-intl";
import OnThisPage from "@/components/shared/OnThisPage";
import { tierLabel } from "@/data/verified-metrics";
import type { Project } from "@/types/portfolio";

/**
 * Case-study template (plan §9.1): sector chip + evidence-tier chip +
 * timeframe → title → role line → figure with mono caption → the problem →
 * what I built → how it works (flagships: engineering decisions as
 * "chose X over Y because Z") → outcomes (only with a basis) → stack →
 * next-step CTA. Supporting entries render the light version; archived
 * demos carry an explicit banner (§9.2: semantics never blurred).
 */

/** Mechanism phrases worth scanning for (claim phrases pruned per recorded finding #4). */
const BUSINESS_KEYWORDS = [
    "Automated the scheduling workflow end to end",
    "End-to-end automation of the scheduling workflow",
    "Replaced manual spreadsheet tracking",
    "spreadsheet tracking",
    "structured into a clear digital funnel",
    "Role-based access control",
    "role-based access",
    "Transactional logging",
    "ACID transaction isolation",
    "Redis caching",
    "query optimization",
    "WCAG 2.1 AA",
    "Performance-budgeted",
    "static generation",
    "automated",
    "accessible",
];

const TECH_KEYWORDS = [
    "Next.js Server Components",
    "NestJS Guards",
    "Prisma ORM",
    "Redis caching",
    "ACID transaction",
    "Server Components",
    "RESTful APIs",
    "GitHub Actions",
    "Express.js",
    "Socket.io",
    "PostgreSQL",
    "TypeScript",
    "NestJS",
    "Next.js",
    "WebRTC",
    "Docker",
    "Node.js",
    "Stripe",
    "Azure",
    "MongoDB",
    "Redux",
    "React",
    "WCAG",
    "JWT",
];

/** Highlight configured keywords inside a string as safe React nodes. */
function highlight(text: string, keywords: string[], highlightClass: string): React.ReactNode {
    const escaped = keywords
        .slice()
        .sort((a, b) => b.length - a.length)
        .map((k) => k.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
    const pattern = new RegExp(`(${escaped.join("|")})`, "gi");
    const matchSet = new Set(keywords.map((k) => k.toLowerCase()));

    return text.split(pattern).map((part, i) => {
        if (!part) return null;
        if (matchSet.has(part.toLowerCase())) {
            return (
                <span key={i} className={highlightClass}>
                    {part}
                </span>
            );
        }
        return <span key={i}>{part}</span>;
    });
}

const highlightBusiness = (text: string) => highlight(text, BUSINESS_KEYWORDS, "highlight-biz");
const highlightTech = (text: string) => highlight(text, TECH_KEYWORDS, "highlight-tech");

export default function ProjectDetails({ project }: { project: Project }) {
    const t = useTranslations("caseStudy");
    const locale = useLocale();
    const { title, clientSector, businessProblem, technicalArchitecture, metrics, tags, liveUrl, codeUrl } = project;

    const [imageLoading, setImageLoading] = useState(!!project.screenshots?.[0]?.src);
    const [imageError, setImageError] = useState(false);
    const figure = project.screenshots?.[0];

    const isFlagship = project.status === "flagship";
    const isArchived = project.status === "archived";
    const showCodeUrl = Boolean(codeUrl && codeUrl !== "https://github.com/sahadcse");

    const sections = [
        { id: "problem", label: t("problemLabel") },
        { id: "built", label: t("builtLabel") },
        { id: "how", label: t("howLabel") },
        ...(isFlagship && project.outcomes?.length ? [{ id: "outcomes", label: t("outcomesLabel") }] : []),
    ];

    return (
        <div className="container-content py-16 md:py-24">
            <div>
                <OnThisPage items={sections} />
                {/* Back Navigation */}
                <Link
                    href="/projects"
                    className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors mb-8 group"
                >
                    <ArrowLeft className="w-4 h-4 me-2 rtl:rotate-180 group-hover:-translate-x-1 rtl:group-hover:translate-x-1 transition-transform" />
                    {t("back")}
                </Link>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    {/* Header: chips → title → role line (§9.1) */}
                    <header className="mb-12">
                        <div className="flex flex-wrap items-center gap-2 mb-4">
                            <span className="text-mono rounded-sm bg-secondary text-secondary-foreground px-2 py-0.5">
                                {clientSector}
                            </span>
                            <span className="text-mono rounded-sm border border-primary/20 bg-primary/10 text-primary px-2 py-0.5">
                                {tierLabel(project.evidenceLevel)}
                            </span>
                            {project.timeframe && (
                                <span className="text-mono text-muted-foreground px-1">
                                    {project.timeframe}
                                </span>
                            )}
                        </div>

                        <h1 className="text-hero mb-4">{title}</h1>
                        <p className="text-label text-muted-foreground">
                            {t("roleLabel")}: {project.role}
                        </p>
                    </header>

                    {isArchived && (
                        <div
                            role="note"
                            className="mb-10 rounded-md border border-warning/30 bg-warning/10 p-4 text-body text-foreground"
                        >
                            {t("archivedNote")}
                        </div>
                    )}

                    {/* §10.5: long-form case-study bodies may remain English behind
                        a visible localized notice until the translation track lands */}
                    {locale !== "en" && (
                        <div
                            role="note"
                            className="mb-10 rounded-md border border-border/50 bg-muted/30 p-4 text-body text-muted-foreground"
                        >
                            {t("englishBodyNote")}
                        </div>
                    )}

                    {/* Context (flagships) */}
                    {project.constraints && (
                        <section className="mb-12 max-w-reading">
                            <h2 className="text-label text-muted-foreground uppercase mb-2">
                                {t("constraintsLabel")}
                            </h2>
                            <p className="text-body text-muted-foreground">{project.constraints}</p>
                        </section>
                    )}

                    {/* Figure 01 with mono caption */}
                    {figure && !imageError && (
                        <figure className="max-w-4xl mb-12">
                            <div className="relative overflow-hidden rounded-md border border-border bg-muted">
                                {imageLoading && (
                                    <div className="absolute inset-0 flex items-center justify-center bg-muted">
                                        <p className="text-mono text-muted-foreground">{t("loadingImage")}</p>
                                    </div>
                                )}
                                <Image
                                    src={figure.src}
                                    alt={figure.alt}
                                    width={1600}
                                    height={1000}
                                    sizes="(min-width: 1024px) 896px, 100vw"
                                    className="w-full h-auto"
                                    priority
                                    onLoad={() => setImageLoading(false)}
                                    onError={() => {
                                        setImageLoading(false);
                                        setImageError(true);
                                    }}
                                />
                            </div>
                            <figcaption className="mt-2.5 text-mono text-muted-foreground">
                                {figure.caption}
                            </figcaption>
                        </figure>
                    )}

                    <div className="max-w-reading space-y-12">
                        {/* The problem (business language) */}
                        <section id="problem">
                            <h2 className="text-h2 mb-4">{t("problemLabel")}</h2>
                            <p className="text-body text-muted-foreground">
                                {highlightBusiness(businessProblem)}
                            </p>
                        </section>

                        {/* What I built (business language bullets) */}
                        <section id="built">
                            <h2 className="text-h2 mb-4">{t("builtLabel")}</h2>
                            <ul className="space-y-2.5">
                                {metrics.map((metric) => (
                                    <li key={metric} className="flex items-start gap-3 text-body text-muted-foreground">
                                        <span
                                            className="mt-2.5 w-1.5 h-1.5 shrink-0 rounded-full bg-primary"
                                            aria-hidden="true"
                                        />
                                        <span>{highlightBusiness(metric)}</span>
                                    </li>
                                ))}
                            </ul>
                        </section>

                        {/* How it works: flagship = decisions ("chose X over Y because Z"),
                            light = architecture paragraph */}
                        <section id="how">
                            <h2 className="text-h2 mb-4">{t("howLabel")}</h2>
                            {isFlagship && project.decisions ? (
                                <ul className="space-y-4">
                                    {project.decisions.map((d) => (
                                        <li key={d.decision} className="border-s-2 border-primary/30 ps-4">
                                            <p className="text-body font-medium text-foreground">
                                                {highlightTech(d.decision)}
                                            </p>
                                            <p className="text-body text-muted-foreground mt-1">
                                                — {highlightTech(d.because)}
                                            </p>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-body text-muted-foreground">
                                    {highlightTech(technicalArchitecture)}
                                </p>
                            )}
                        </section>

                        {/* Outcomes — only statements with a stated basis (§9.1) */}
                        {isFlagship && project.outcomes && project.outcomes.length > 0 && (
                            <section id="outcomes">
                                <h2 className="text-h2 mb-4">{t("outcomesLabel")}</h2>
                                <ul className="space-y-3">
                                    {project.outcomes.map((outcome) => (
                                        <li key={outcome.statement} className="text-body text-foreground">
                                            {highlightBusiness(outcome.statement)}
                                            <span className="text-muted-foreground">
                                                {" "}
                                                — {outcome.basis}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </section>
                        )}

                        {/* Stack + links */}
                        <section>
                            <h2 className="text-label text-muted-foreground uppercase mb-3">
                                {t("stackLabel")}
                            </h2>
                            <div className="flex flex-wrap gap-1.5">
                                {tags.map((tag) => (
                                    <span
                                        key={tag}
                                        className="text-mono text-muted-foreground rounded-sm border border-border/60 px-2 py-0.5"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4 mt-8">
                                {liveUrl && (
                                    <a
                                        href={liveUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center justify-center gap-2 rounded-sm bg-primary text-primary-foreground hover:bg-primary/90 transition-colors font-semibold px-6 py-3"
                                    >
                                        <Globe className="w-5 h-5" aria-hidden="true" />
                                        {project.evidenceLevel === "client-site" ? "Live website" : "Live application"}
                                    </a>
                                )}
                                {showCodeUrl && (
                                    <a
                                        href={codeUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center justify-center gap-2 rounded-sm bg-secondary text-secondary-foreground hover:bg-secondary/80 border border-border transition-colors font-semibold px-6 py-3"
                                    >
                                        <Github className="w-5 h-5" aria-hidden="true" />
                                        View Source Code
                                    </a>
                                )}
                            </div>
                        </section>

                        {/* Next-step CTA (§9.1 constant) */}
                        {!isArchived && (
                            <section className="rounded-md border border-primary/20 bg-primary/5 p-6 md:p-8">
                                <p className="text-h3 mb-4">{t("nextStep")}</p>
                                <Link
                                    href="/contact"
                                    className="inline-flex items-center gap-2 rounded-sm bg-primary text-primary-foreground hover:bg-primary/90 transition-colors font-semibold px-6 py-3"
                                >
                                    {t("nextCta")}
                                    <ArrowRight className="w-4 h-4 rtl:rotate-180" aria-hidden="true" />
                                </Link>
                            </section>
                        )}
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
