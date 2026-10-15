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
    // Description comes from the business outcome (claim-safe by V2-04),
    // not from the metrics array, so unverifiable figures can't leak into
    // search snippets or social previews.
    const description = project.businessOutcome.length > 158
        ? `${project.businessOutcome.slice(0, 155)}...`
        : project.businessOutcome;
    const ogImage = project.imageUrl
        ? [{ url: project.imageUrl }]
        : undefined;

    return {
        title,
        description,
        openGraph: {
            title,
            description,
            type: "website",
            url: `/projects/${id}`,
            images: ogImage,
        },
        twitter: {
            // summary_large_image requires an image; fall back to a compact card
            card: project.imageUrl ? "summary_large_image" : "summary",
            title,
            description,
            images: ogImage,
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
