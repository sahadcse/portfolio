"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import CaseCard from "@/components/projects/CaseCard";
import type { Project } from "@/types/portfolio";

/**
 * Projects index (plan §6.4, V2-11): curated grid (~8), uniform image
 * cards, sector chip filter. Client component because the filter is
 * interactive; the curated dataset arrives serializable from the server.
 */
export default function ProjectsIndex({ projects }: { projects: Project[] }) {
    const t = useTranslations("projectsIndex");
    const [activeSector, setActiveSector] = useState<string | null>(null);

    const sectors = useMemo(() => {
        const unique = new Set(
            projects.map((p) => p.sectorShort).filter((s): s is string => Boolean(s))
        );
        return Array.from(unique);
    }, [projects]);

    const visible = activeSector
        ? projects.filter((p) => p.sectorShort === activeSector)
        : projects;

    return (
        <div>
            {/* Sector filter chips */}
            <div className="flex flex-wrap items-center gap-2 mb-10" role="group" aria-label={t("filterLabel")}>
                <button
                    type="button"
                    onClick={() => setActiveSector(null)}
                    aria-pressed={activeSector === null}
                    className={`text-mono rounded-full border px-3.5 py-1.5 transition-colors ${
                        activeSector === null
                            ? "border-primary bg-primary/10 text-primary"
                            : "border-border text-muted-foreground hover:text-foreground hover:border-primary/40"
                    }`}
                >
                    {t("filterAll")} ({projects.length})
                </button>
                {sectors.map((sector) => (
                    <button
                        key={sector}
                        type="button"
                        onClick={() => setActiveSector(activeSector === sector ? null : sector)}
                        aria-pressed={activeSector === sector}
                        className={`text-mono rounded-full border px-3.5 py-1.5 transition-colors ${
                            activeSector === sector
                                ? "border-primary bg-primary/10 text-primary"
                                : "border-border text-muted-foreground hover:text-foreground hover:border-primary/40"
                        }`}
                    >
                        {sector}
                    </button>
                ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {visible.map((project) => (
                    <CaseCard key={project.id} project={project} />
                ))}
            </div>

            {visible.length === 0 && (
                <p className="text-body text-muted-foreground py-16 text-center">
                    {t("empty")}
                </p>
            )}
        </div>
    );
}
