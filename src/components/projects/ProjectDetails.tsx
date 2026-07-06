"use client";

import type { Project } from "@/types/portfolio";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Globe, Github, TrendingUp, Building2, Cpu, DollarSign } from "lucide-react";
import { motion } from "framer-motion";

interface ProjectDetailsProps {
    project: Project;
}

const BUSINESS_KEYWORDS = [
    "automated daily operational workflows",
    "100% transactional integrity",
    "100% data confidentiality",
    "100% data integrity",
    "Sub-100ms inventory",
    "Sub-100ms",
    "Eliminated manual tracking",
    "Eliminated manual",
    "Zero manual scheduling errors",
    "Zero-downtime",
    "Zero-trust",
    "Reduced deployment cycle",
    "Automated scheduling",
    "Cloud-native",
    "Real-time",
    "WCAG 2.1 AA",
    "Granular RBAC",
    "Accelerated",
    "Enhanced",
    "Frictionless",
    "automated",
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
    "MERN",
    "WCAG",
    "JWT",
];

/**
 * Highlight configured keywords inside a string as safe React nodes.
 * Matching runs in a single pass with phrases sorted longest-first, so
 * multi-word terms (e.g. "Next.js Server Components") are wrapped as a unit
 * instead of being fragmented by their sub-words. No dangerouslySetInnerHTML.
 */
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

/**
 * Highlight high-impact business outcomes (emerald) for executive scannability.
 */
function highlightBusinessKeywords(text: string): React.ReactNode {
    return highlight(text, BUSINESS_KEYWORDS, "highlight-biz");
}

/**
 * Highlight core technical architectures (royal blue) for engineering evaluators.
 */
function highlightTechKeywords(text: string): React.ReactNode {
    return highlight(text, TECH_KEYWORDS, "highlight-tech");
}

export default function ProjectDetails({ project }: ProjectDetailsProps) {
    const { title, clientSector, businessProblem, businessOutcome, technicalArchitecture, metrics, tags, liveUrl, codeUrl, imageUrl } = project;

    return (
        <div className="min-h-screen py-20 px-4">
            <div className="max-w-7xl mx-auto">
                {/* Back Navigation */}
                <Link
                    href="/projects"
                    className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors mb-8 group"
                >
                    <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                    Back to Case Studies
                </Link>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    {/* Project Header */}
                    <div className="mb-12">
                        <div className="flex items-center gap-3 mb-4">
                            <span className="px-3 py-1 text-sm font-mono rounded-md bg-primary/10 text-primary border border-primary/20">
                                {clientSector}
                            </span>
                            {tags.slice(0, 3).map((tag) => (
                                <span
                                    key={tag}
                                    className="px-3 py-1 text-sm font-mono rounded-md bg-secondary text-secondary-foreground"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 font-mono tracking-tight">{title}</h1>
                    </div>

                    {/* Project Image */}
                    {imageUrl && (
                        <div className="relative w-full h-[400px] md:h-[500px] rounded-xl overflow-hidden mb-16 bg-muted card-elevation">
                            <Image
                                src={imageUrl}
                                alt={title}
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>
                    )}

                    {/* Two Column Layout */}
                    <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
                        {/* Section A: Executive Summary & Business Impact */}
                        <div className="space-y-8">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                                    <Building2 className="w-5 h-5 text-blue-500" />
                                </div>
                                <h2 className="text-2xl font-bold">Executive Summary</h2>
                            </div>

                            {/* Business Problem */}
                            <div className="bg-card p-6 rounded-xl border border-border/50 card-elevation">
                                <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
                                    <TrendingUp className="w-5 h-5 text-destructive" />
                                    The Challenge
                                </h3>
                                <p className="text-muted-foreground leading-relaxed">{highlightBusinessKeywords(businessProblem)}</p>
                            </div>

                            {/* Business Outcome */}
                            <div className="bg-card p-6 rounded-xl border border-border/50 card-elevation">
                                <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
                                    <DollarSign className="w-5 h-5 text-green-500" />
                                    The Impact
                                </h3>
                                <p className="text-muted-foreground leading-relaxed mb-4">{highlightBusinessKeywords(businessOutcome)}</p>

                                {/* Metrics Grid */}
                                <div className="grid grid-cols-2 gap-3">
                                    {metrics.map((metric, index) => (
                                        <div
                                            key={index}
                                            className="bg-muted/50 p-3 rounded-lg border border-border/30"
                                        >
                                            <p className="text-sm font-semibold text-foreground">{highlightBusinessKeywords(metric)}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Section B: Engineering & Architecture Deep Dive */}
                        <div className="space-y-8">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center">
                                    <Cpu className="w-5 h-5 text-purple-500" />
                                </div>
                                <h2 className="text-2xl font-bold">Technical Deep Dive</h2>
                            </div>

                            {/* Technical Architecture */}
                            <div className="bg-card p-6 rounded-xl border border-border/50 card-elevation">
                                <h3 className="text-lg font-bold mb-4">System Architecture</h3>
                                <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                                    {highlightTechKeywords(technicalArchitecture)}
                                </p>
                            </div>

                            {/* Tech Stack */}
                            <div className="bg-card p-6 rounded-xl border border-border/50 card-elevation">
                                <h3 className="text-lg font-bold mb-4">Technology Stack</h3>
                                <div className="flex flex-wrap gap-2">
                                    {tags.map((tag) => (
                                        <span
                                            key={tag}
                                            className="px-3 py-1.5 text-sm font-mono rounded-md bg-secondary text-secondary-foreground border border-border/50 hover:border-primary/50 transition-colors"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Action Links */}
                            <div className="flex flex-col sm:flex-row gap-4 pt-4">
                                {liveUrl && liveUrl !== "#" && (
                                    <Link
                                        href={liveUrl}
                                        target="_blank"
                                        className="flex items-center justify-center px-6 py-3 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors font-semibold"
                                    >
                                        <Globe className="w-5 h-5 mr-2" />
                                        Live Application
                                    </Link>
                                )}
                                {codeUrl && codeUrl !== "#" && codeUrl !== "https://github.com/sahadcse" && (
                                    <Link
                                        href={codeUrl}
                                        target="_blank"
                                        className="flex items-center justify-center px-6 py-3 rounded-md bg-secondary text-secondary-foreground hover:bg-secondary/80 border border-border transition-colors font-semibold"
                                    >
                                        <Github className="w-5 h-5 mr-2" />
                                        View Source Code
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
