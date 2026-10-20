import { getTranslations } from "next-intl/server";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { FLAGSHIP_PROJECTS } from "@/data/projects";
import CaseCard from "@/components/projects/CaseCard";

/**
 * Selected work (plan §6.3 #4): the three flagship case cards — evidence
 * that the scope ladder's top end is real.
 */
export default async function Flagships() {
    const t = await getTranslations("home.work");

    return (
        <section id="projects" className="py-16 md:py-24 bg-muted/30 border-y border-border/40">
            <div className="container-content">
            <div className="flex flex-wrap items-end justify-between gap-4 mb-12">
                <div className="max-w-2xl">
                    <h2 className="text-h2 mb-4">{t("title")}</h2>
                    <p className="text-lead">{t("subtitle")}</p>
                </div>
                <Link
                    href="/projects"
                    className="inline-flex items-center gap-1.5 text-label text-primary hover:underline"
                >
                    {t("viewAll")}
                    <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" aria-hidden="true" />
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {FLAGSHIP_PROJECTS.map((project) => (
                    <CaseCard key={project.id} project={project} />
                ))}
            </div>
            </div>
        </section>
    );
}
