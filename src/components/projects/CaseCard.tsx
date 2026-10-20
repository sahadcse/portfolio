import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { tierLabel } from "@/data/verified-metrics";
import type { Project } from "@/types/portfolio";

/**
 * Case-study card (plan §8.5): 16:10 screenshot in a 1px frame, tier chip
 * (§9.2) + sector chip, title, one-line outcome, mono tech tags. The whole
 * card is one link; the external-live icon is a separate sibling anchor and
 * renders only for a verified live URL.
 */
export default function CaseCard({ project }: { project: Project }) {
    const t = useTranslations("projectsIndex");
    const title = project.shortTitle ?? project.title;

    return (
        <div className="group relative flex h-full flex-col">
            {/* Image frame — uniform 16:10 crop from the V2-12 pipeline */}
            <div className="relative overflow-hidden rounded-md border border-border bg-muted">
                <Link href={`/projects/${project.id}`} aria-label={title} className="block">
                    {project.cardImageUrl ? (
                        <Image
                            src={project.cardImageUrl}
                            alt={`${title} — ${project.clientSector}`}
                            width={1600}
                            height={1000}
                            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                            className="w-full h-auto aspect-[16/10] object-cover"
                        />
                    ) : (
                        <div className="flex aspect-[16/10] items-center justify-center bg-muted">
                            <span className="text-mono text-muted-foreground">No preview</span>
                        </div>
                    )}
                </Link>
                {project.liveUrl && (
                    <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="absolute end-3 top-3 rounded-sm bg-background/90 p-1.5 text-muted-foreground hover:text-primary transition-colors"
                        aria-label={`View ${title} live (opens in a new tab)`}
                    >
                        <ArrowUpRight className="w-4 h-4 rtl:-scale-x-100" aria-hidden="true" />
                    </a>
                )}
            </div>

            <div className="flex flex-wrap items-center gap-2 mt-4">
                {project.ongoing && (
                    <span className="text-mono rounded-sm border border-success/30 bg-success/10 text-success px-2 py-0.5">
                        {t("ongoingLabel")}
                    </span>
                )}
                <span className="text-mono rounded-sm border border-primary/20 bg-primary/10 text-primary px-2 py-0.5">
                    {tierLabel(project.evidenceLevel)}
                </span>
                <span className="text-mono rounded-sm bg-secondary text-secondary-foreground px-2 py-0.5">
                    {project.clientSector}
                </span>
            </div>

            <h3 className="text-h3 mt-3">
                <Link href={`/projects/${project.id}`} className="group-hover:underline">
                    {title}
                </Link>
            </h3>

            {project.oneLineOutcome && (
                <p className="text-body text-muted-foreground mt-2">{project.oneLineOutcome}</p>
            )}

            <div className="flex flex-wrap gap-1.5 mt-4 mt-auto pt-4">
                {project.tags.slice(0, 4).map((tag) => (
                    <span
                        key={tag}
                        className="text-mono text-muted-foreground rounded-sm border border-border/60 px-1.5 py-0.5"
                    >
                        {tag}
                    </span>
                ))}
            </div>
        </div>
    );
}
