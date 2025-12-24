"use client";

import { PROJECTS } from "@/lib/data";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Globe, Github } from "lucide-react";
import { motion } from "framer-motion";

interface ProjectDetailsProps {
    id: string;
}

export default function ProjectDetails({ id }: ProjectDetailsProps) {
    const project = PROJECTS.find((p) => p.id === id);

    if (!project) {
        notFound();
    }

    // Type assertion since we added these fields but TS might infer strictly from the first object if not consistent
    // But since we updated all objects in data.ts, it should be fine.
    // Ideally we would export a Project type from data.ts, but for now I'll trust the inference/props.

    const { title, description, details, features, tags, liveUrl, codeUrl } = project as typeof project & {
        details?: string;
        features?: string[];
        liveUrl?: string;
        codeUrl?: string;
    };

    return (
        <div className="min-h-screen py-20 px-4 max-w-4xl mx-auto">
            <Link
                href="/projects"
                className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors mb-8 group"
            >
                <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                Back to Projects
            </Link>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <h1 className="text-4xl md:text-5xl font-bold mb-6 font-mono tracking-tight">{title}</h1>

                <div className="flex flex-wrap gap-2 mb-8">
                    {tags.map((tag) => (
                        <span
                            key={tag}
                            className="px-3 py-1 text-sm font-mono rounded-md bg-secondary text-secondary-foreground border border-border/50"
                        >
                            {tag}
                        </span>
                    ))}
                </div>

                <p className="text-xl text-muted-foreground leading-relaxed mb-10 border-l-4 border-primary pl-6">
                    {description}
                </p>

                <div className="flex flex-wrap gap-4 mb-16">
                    {liveUrl && (
                        <Link
                            href={liveUrl}
                            target="_blank"
                            className="flex items-center px-6 py-3 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors font-semibold"
                        >
                            <Globe className="w-5 h-5 mr-2" />
                            Live Preview
                        </Link>
                    )}

                    {codeUrl && (
                        <Link
                            href={codeUrl}
                            target="_blank"
                            className="flex items-center px-6 py-3 rounded-md bg-secondary text-secondary-foreground hover:bg-secondary/80 border border-border transition-colors font-semibold"
                        >
                            <Github className="w-5 h-5 mr-2" />
                            View Code
                        </Link>
                    )}
                </div>

                <div className="grid md:grid-cols-3 gap-10">
                    <div className="md:col-span-2 space-y-8">
                        <section>
                            <h2 className="text-2xl font-bold mb-4 flex items-center">
                                <span className="w-8 h-1 bg-primary mr-3 rounded-full"></span>
                                Project Details
                            </h2>
                            <p className="text-muted-foreground leading-loose text-lg">
                                {details || description}
                            </p>
                        </section>
                    </div>

                    <div className="md:col-span-1">
                        {features && features.length > 0 && (
                            <section className="bg-card p-6 rounded-xl border border-border/50 sticky top-24">
                                <h3 className="text-xl font-bold mb-6 font-mono">Key Features</h3>
                                <ul className="space-y-4">
                                    {features.map((feature, i) => (
                                        <li key={i} className="flex items-start text-sm text-muted-foreground">
                                            <span className="mr-3 mt-1.5 w-1.5 h-1.5 bg-primary rounded-full shrink-0" />
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            </section>
                        )}
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
