import ProjectCard from "@/components/projects/ProjectCard";
import { PROJECTS } from "@/data/projects";
import { Metadata } from "next";

import { setRequestLocale } from "next-intl/server";
import { localeAlternates, localePath, type Locale } from "@/i18n/config";
export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: string }>;
}): Promise<Metadata> {
    const { locale } = await params;
    return {

    title: "Projects",
    description: "A showcase of my technical projects and engineering solutions.",
        alternates: {
            canonical: localePath(locale as Locale, "/projects"),
            languages: localeAlternates("/projects"),
        },
    };
}

export default async function ProjectsPage({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    setRequestLocale(locale);
    return (
        <div className="px-4 py-16 md:py-24">
            <div className="max-w-2xl mb-12">
                <h1 className="text-hero mb-4">Projects</h1>
                <p className="text-lead">
                    A selection of scalable backends, real-time applications, and cloud infrastructure projects I&apos;ve engineered.
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
