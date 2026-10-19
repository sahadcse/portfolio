import { PROJECTS } from "@/data/projects";
import { notFound } from "next/navigation";
import { setRequestLocale, getTranslations } from "next-intl/server";
import ProjectDetails from "@/components/projects/ProjectDetails";
import type { Metadata } from "next";
import { localeAlternates, localePath, type Locale } from "@/i18n/config";

export async function generateStaticParams() {
    return PROJECTS.map((project) => ({
        id: project.id,
    }));
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: string; id: string }>;
}): Promise<Metadata> {
    const { locale, id } = await params;
    const project = PROJECTS.find((p) => p.id === id);

    if (!project) {
        return {
            title: "Project Not Found",
        };
    }

    const t = await getTranslations({ locale, namespace: "meta" });
    const pagePath = `/projects/${id}`;
    const title = `${project.title} | ${t("caseStudySuffix")}`;
    // Description comes from the business outcome (claim-safe by V2-04),
    // not from the metrics array, so unverifiable figures can't leak into
    // search snippets or social previews.
    const description = project.businessOutcome.length > 158
        ? `${project.businessOutcome.slice(0, 155)}...`
        : project.businessOutcome;
    // Social previews use the pipeline's JPEG (WebP is unreliable in some
    // scrapers); summary card fallback when none exists.
    const ogImage = project.ogImageUrl
        ? [{ url: project.ogImageUrl }]
        : undefined;

    return {
        title,
        description,
        openGraph: {
            title,
            description,
            type: "website",
            url: localePath(locale as Locale, pagePath),
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
            canonical: localePath(locale as Locale, pagePath),
            languages: localeAlternates(pagePath),
        },
    };
}

interface ProjectPageProps {
    params: Promise<{
        locale: string;
        id: string;
    }>;
}

export default async function ProjectPage({ params }: ProjectPageProps) {
    const { locale, id } = await params;
    setRequestLocale(locale);

    // Server-side project lookup - executed before rendering
    const project = PROJECTS.find((p) => p.id === id);

    // Call notFound() on the server if project doesn't exist
    if (!project) {
        notFound();
    }

    // Pass the validated project data to the client component
    return <ProjectDetails project={project} />;
}
