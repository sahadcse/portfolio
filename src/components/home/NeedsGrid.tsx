import { getTranslations } from "next-intl/server";
import { ArrowRight, Rocket, Wrench, Workflow, Blocks } from "lucide-react";
import { Link } from "@/i18n/navigation";

/**
 * The four needs cards (plan §6.3 #3) — the homepage's primary routing
 * device: plain-language definition, example deliverables, and a link to
 * real proof. Equal height via flex, never fixed text boxes — copy must
 * survive German length (§8.5 need-category card).
 */

const NEED_KEYS = ["launch", "improve", "automate", "build"] as const;

const NEED_ICONS = {
    launch: Rocket,
    improve: Wrench,
    automate: Workflow,
    build: Blocks,
} as const;

export default async function NeedsGrid() {
    const t = await getTranslations("home.needs");

    return (
        <section className="py-16 md:py-24">
            <div className="mb-12 max-w-2xl">
                <h2 className="text-h2 mb-4">{t("title")}</h2>
                <p className="text-lead">{t("subtitle")}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {NEED_KEYS.map((key) => {
                    const Icon = NEED_ICONS[key];
                    return (
                        <Link
                            key={key}
                            href={t(`items.${key}.proofHref`)}
                            className="group flex h-full flex-col rounded-md border border-border/50 bg-card p-6 hover:border-primary/40 transition-colors"
                        >
                            <div className="w-10 h-10 rounded-md bg-primary/10 flex items-center justify-center mb-5">
                                <Icon className="w-5 h-5 text-primary" aria-hidden="true" />
                            </div>

                            <h3 className="text-h3 mb-2">{t(`items.${key}.label`)}</h3>
                            <p className="text-body text-muted-foreground mb-4">
                                {t(`items.${key}.definition`)}
                            </p>
                            <p className="text-mono text-muted-foreground mb-6 mt-auto">
                                {t(`items.${key}.examples`)}
                            </p>

                            <span className="inline-flex items-center gap-1.5 text-label text-primary">
                                {t(`items.${key}.proofLabel`)}
                                <ArrowRight
                                    className="w-3.5 h-3.5 rtl:rotate-180 transition-transform group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5"
                                    aria-hidden="true"
                                />
                            </span>
                        </Link>
                    );
                })}
            </div>
        </section>
    );
}
