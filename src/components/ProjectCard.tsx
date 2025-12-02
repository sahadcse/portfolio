"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

interface ProjectCardProps {
    project: {
        id: string;
        title: string;
        description: string;
        tags: string[];
        link: string;
    };
    index: number;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="group relative flex flex-col p-6 rounded-lg border border-border/50 bg-card hover:border-primary transition-colors h-full"
        >
            <div className="flex items-start justify-between mb-4">
                <h3 className="text-xl font-bold group-hover:underline transition-all">
                    {project.title}
                </h3>
                <Link
                    href={project.link}
                    className="text-muted-foreground hover:text-primary transition-colors"
                    aria-label={`View ${project.title}`}
                >
                    <ArrowUpRight className="w-5 h-5" />
                </Link>
            </div>

            <p className="text-muted-foreground mb-6 flex-grow leading-relaxed">
                {project.description}
            </p>

            <div className="flex flex-wrap gap-2 mt-auto">
                {project.tags.map((tag) => (
                    <span
                        key={tag}
                        className="px-2 py-1 text-xs font-mono rounded-md bg-secondary text-secondary-foreground border border-border/50"
                    >
                        {tag}
                    </span>
                ))}
            </div>
        </motion.div>
    );
}
