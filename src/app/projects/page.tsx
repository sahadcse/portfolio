import ProjectCard from "@/components/ProjectCard";
import { PROJECTS } from "@/lib/data";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Projects",
    description: "A showcase of my technical projects and engineering solutions.",
};

export default function ProjectsPage() {
    return (
        <div className="container mx-auto px-4 py-20">
            <div className="max-w-2xl mb-12">
                <h1 className="text-4xl font-bold mb-4 font-mono">Projects</h1>
                <p className="text-muted-foreground text-lg">
                    A selection of scalable backends, real-time applications, and cloud infrastructure projects I've engineered.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {PROJECTS.map((project, index) => (
                    <ProjectCard key={project.id} project={project} index={index} />
                ))}
            </div>
        </div>
    );
}
