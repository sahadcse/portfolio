import { CURATED_PROJECTS } from "@/data/projects";
import { VERIFIED_METRICS } from "@/data/verified-metrics";
import { Metadata } from "next";
import ProjectsIndex from "@/components/projects/ProjectsIndex";
import PageHero from "@/components/shared/PageHero";
import CtaPanel from "@/components/shared/CtaPanel";
import { FolderLock } from "lucide-react";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { localeAlternates, localePath, type Locale } from "@/i18n/config";

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: string }>;
}): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "meta.projects" });
    return {
        title: t("title"),
        description: t("description"),
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
    const delivered = VERIFIED_METRICS.find((m) => m.id === "delivered");
    const publicCount = VERIFIED_METRICS.find((m) => m.id === "public");

    return (
        <div>
            <div className="container-content py-16 md:py-24">
                <PageHero title={t("title")} lead={t("intro")} />

                {/* Work summary — same verified figures as the homepage proof band */}
                <section
                    aria-label={t("summaryTitle")}
                    className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-14 max-w-3xl"
                >
                    <div className="rounded-md border border-border/50 bg-card p-5">
                        <p className="text-2xl font-bold text-primary tabular-nums">
                            {delivered?.value}
                        </p>
                        <p className="text-label text-muted-foreground mt-1">
                            {t("summaryDelivered")}
                        </p>
                    </div>
                    <div className="rounded-md border border-border/50 bg-card p-5">
                        <p className="text-2xl font-bold text-primary tabular-nums">
                            {publicCount?.value}
                        </p>
                        <p className="text-label text-muted-foreground mt-1">
                            {t("summaryPublic")}
                        </p>
                    </div>
                </section>

                <ProjectsIndex projects={CURATED_PROJECTS} />

                {/* Private/internal-work context */}
                <section className="mt-14 rounded-md border border-border/50 bg-muted/30 p-6 md:p-8">
                    <h2 className="text-h3 mb-3 flex items-center gap-2.5">
                        <FolderLock className="w-5 h-5 text-primary" aria-hidden="true" />
                        {t("privateTitle")}
                    </h2>
                    <p className="text-body text-muted-foreground max-w-3xl">
                        {t("privateText")}
                    </p>
                </section>
            </div>

            <CtaPanel />
        </div>
    );
}
