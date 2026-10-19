import { getTranslations } from "next-intl/server";
import { ArrowRight, ChevronDown } from "lucide-react";
import { Link } from "@/i18n/navigation";

/**
 * Engineering capabilities (user brief §5): capability-first presentation —
 * the problems each capability solves and what gets delivered, with tools
 * demoted to supporting detail and proof deep-linked. Rendered as a
 * native <details> accordion: keyboard-accessible and screen-reader
 * friendly with zero JavaScript, one row per capability.
 */
const CAPABILITY_KEYS = [
    "backend",
    "fullstack",
    "data",
    "workflows",
    "frontend",
    "integrations",
] as const;

export default async function Capabilities() {
    const t = await getTranslations("home.capabilities");

    return (
        <section className="py-16 md:py-24 border-y border-border/40 bg-muted/20">
            <div className="max-w-2xl mb-12">
                <h2 className="text-h2 mb-4">{t("title")}</h2>
                <p className="text-lead">{t("subtitle")}</p>
            </div>

            <div className="border-t border-border/60">
                {CAPABILITY_KEYS.map((key, index) => {
                    const proofs = t.raw(`items.${key}.proof`) as { label: string; href: string }[];
                    return (
                        <details key={key} className="group border-b border-border/60">
                            <summary className="flex cursor-pointer items-center gap-4 md:gap-6 py-6 md:py-7 list-none [&::-webkit-details-marker]:hidden hover:bg-background/60 transition-colors rounded-sm px-2 -mx-2">
                                <span className="text-mono text-muted-foreground shrink-0 w-8">
                                    {String(index + 1).padStart(2, "0")}
                                </span>
                                <span className="flex-1 min-w-0">
                                    <span className="block text-h3">{t(`items.${key}.title`)}</span>
                                    <span className="block text-body text-muted-foreground mt-1">
                                        {t(`items.${key}.summary`)}
                                    </span>
                                </span>
                                <ChevronDown
                                    className="w-5 h-5 shrink-0 text-muted-foreground transition-transform duration-200 group-open:rotate-180"
                                    aria-hidden="true"
                                />
                            </summary>

                            <div className="pb-8 ps-12 md:ps-14 pe-2 grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div>
                                    <h3 className="text-label text-muted-foreground uppercase mb-2.5">
                                        {t("deliversLabel")}
                                    </h3>
                                    <p className="text-body text-foreground mb-6">
                                        {t(`items.${key}.delivers`)}
                                    </p>
                                    <h3 className="text-label text-muted-foreground uppercase mb-2.5">
                                        {t("problemsLabel")}
                                    </h3>
                                    <p className="text-body text-muted-foreground">
                                        {t(`items.${key}.problems`)}
                                    </p>
                                </div>

                                <div>
                                    <h3 className="text-label text-muted-foreground uppercase mb-2.5">
                                        {t("toolsLabel")}
                                    </h3>
                                    <p className="text-mono text-muted-foreground leading-relaxed mb-6">
                                        {t(`items.${key}.tools`)}
                                    </p>
                                    <h3 className="text-label text-muted-foreground uppercase mb-2.5">
                                        {t("proofLabel")}
                                    </h3>
                                    <ul className="space-y-2">
                                        {proofs.map((proof) => (
                                            <li key={proof.href}>
                                                <Link
                                                    href={proof.href}
                                                    className="inline-flex items-center gap-1.5 text-label text-primary hover:underline"
                                                >
                                                    {proof.label}
                                                    <ArrowRight
                                                        className="w-3.5 h-3.5 rtl:rotate-180"
                                                        aria-hidden="true"
                                                    />
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </details>
                    );
                })}
            </div>
        </section>
    );
}
