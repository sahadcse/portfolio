import { PROJECTS } from "@/lib/data";
import ProjectDetails from "@/components/ProjectDetails";

export async function generateStaticParams() {
    return PROJECTS.map((project) => ({
        id: project.id,
    }));
}

interface ProjectPageProps {
    params: Promise<{
        id: string;
    }>;
}

export default async function ProjectPage({ params }: ProjectPageProps) {
    const { id } = await params;
    return <ProjectDetails id={id} />;
}
