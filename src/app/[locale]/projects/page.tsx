import { CURATED_PROJECTS } from "@/data/projects";
import { Metadata } from "next";
import ProjectsIndex from "@/components/projects/ProjectsIndex";

import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { localeAlternates, localePath, type Locale } from "@/i18n/config";
export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: string }>;
}): Promise<Metadata> {
    const { locale } = await params;

    return {
    title: "Work",
    description: "Case studies of delivered client systems, client websites, an own product, and employment-tier engineering work.",
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
        <div className="px-4 py-16 md:py-24">
            <div className="max-w-2xl mb-12">
                <h1 className="text-hero mb-4">{t("title")}</h1>
                <p className="text-lead">{t("intro")}</p>
            </div>

            <ProjectsIndex projects={CURATED_PROJECTS} />
        </div>
    );
}
