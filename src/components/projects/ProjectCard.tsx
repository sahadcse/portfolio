"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import type { Project } from "@/types/portfolio";
import { Badge } from "@/components/ui/Badge";

interface ProjectCardProps {
    project: Project;
    index: number;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="group relative flex flex-col p-6 rounded-xl border border-border/50 bg-card hover:border-primary transition-all duration-300 h-full card-elevation hover:card-elevation-hover"
        >
            <div className="flex items-start justify-between mb-4">
                <Link href={`/projects/${project.id}`} className="block flex-grow">
                    <div className="flex items-center gap-2 mb-3">
                        <Badge variant="primary" size="sm">
                            {project.clientSector}
                        </Badge>
                    </div>
                    <h3 className="text-xl font-bold group-hover:underline transition-all">
                        {project.title}
                    </h3>
                </Link>
                {project.liveUrl && (
                    <Link
                        href={project.liveUrl}
                        target="_blank"
                        className="text-muted-foreground hover:text-primary transition-colors"
                        aria-label={`View ${project.title} Live`}
                    >
                        <ArrowUpRight className="w-5 h-5" />
                    </Link>
                )}
            </div>

            <p className="text-muted-foreground mb-6 flex-grow leading-relaxed line-clamp-3">
                {project.businessProblem.slice(0, 150)}...
            </p>

            <div className="flex flex-wrap gap-2 mt-auto">
                {project.tags.slice(0, 4).map((tag) => (
                    <Badge key={tag} variant="outline" size="sm">
                        {tag}
                    </Badge>
                ))}
            </div>
        </motion.div>
    );
}
