import { PROJECTS } from "@/data/projects";
import { notFound } from "next/navigation";
import ProjectDetails from "@/components/projects/ProjectDetails";
import type { Project } from "@/types/portfolio";
import type { Metadata } from "next";

export async function generateStaticParams() {
    return PROJECTS.map((project) => ({
        id: project.id,
    }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
    const { id } = await params;
    const project = PROJECTS.find((p) => p.id === id);

    if (!project) {
        return {
            title: "Project Not Found",
        };
    }

    const title = `${project.title} | Case Study`;
    const description = `Explore how I helped ${project.clientSector} achieve ${project.metrics[0] || 'exceptional results'}. ${project.businessOutcome.slice(0, 120)}...`;

    return {
        title,
        description,
        openGraph: {
            title,
            description,
            type: "website",
            url: `/projects/${id}`,
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
        },
        alternates: {
            canonical: `/projects/${id}`,
        },
    };
}

interface ProjectPageProps {
    params: Promise<{
        id: string;
    }>;
}

export default async function ProjectPage({ params }: ProjectPageProps) {
    const { id } = await params;

    // Server-side project lookup - executed before rendering
    const project = PROJECTS.find((p) => p.id === id);

    // Call notFound() on the server if project doesn't exist
    if (!project) {
        notFound();
    }

    // Pass the validated project data to the client component
    return <ProjectDetails project={project} />;
}
