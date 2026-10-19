import { CURATED_PROJECTS } from "@/data/projects";
import { Metadata } from "next";
import ProjectsIndex from "@/components/projects/ProjectsIndex";
import PageHero from "@/components/shared/PageHero";

import { setRequestLocale, getTranslations } from "next-intl/server";
import { localeAlternates, localePath, type Locale } from "@/i18n/config";
export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: string }>;
}): Promise<Metadata> {
    const { locale } = await params;

    return {
    title: "Selected Projects",
    description: "Case studies of delivered work — client systems, client websites, an own product, and employment-tier engineering.",
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
    const t = await getTranslations("projectsIndex");

    return (
        <div className="container-content py-16 md:py-24">
            <PageHero
                title={t("title")}
                lead={t("intro")}
            />

            <ProjectsIndex projects={CURATED_PROJECTS} />
        </div>
    );
}
