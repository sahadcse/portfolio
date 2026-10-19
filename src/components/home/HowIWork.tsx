import { getTranslations } from "next-intl/server";
import { ClipboardList, Hammer, Rocket, LifeBuoy, ShieldCheck } from "lucide-react";

/**
 * How I work (plan §6.3 #5): Scope → Build → Launch → Maintain, plus the
 * ownership statement. De-risks contact; solo-model transparency in
 * personal voice.
 */
const STEP_KEYS = ["scope", "build", "launch", "maintain"] as const;

const STEP_ICONS = {
    scope: ClipboardList,
    build: Hammer,
    launch: Rocket,
    maintain: LifeBuoy,
} as const;

export default async function HowIWork() {
    const t = await getTranslations("home.process");

    return (
        <section className="py-16 md:py-24">
            <h2 className="text-h2 mb-12">{t("title")}</h2>

            <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {STEP_KEYS.map((key, index) => {
                    const Icon = STEP_ICONS[key];
                    return (
                        <li
                            key={key}
                            className="relative rounded-md border border-border/50 bg-card p-6"
                        >
                            <span className="text-mono text-muted-foreground">
                                0{index + 1}
                            </span>
                            <div className="mt-3 flex items-center gap-2.5">
                                <Icon className="w-5 h-5 text-primary" aria-hidden="true" />
                                <h3 className="text-h3">{t(`steps.${key}.label`)}</h3>
                            </div>
                            <p className="text-body text-muted-foreground mt-3">
                                {t(`steps.${key}.text`)}
                            </p>
                        </li>
                    );
                })}
            </ol>

            <p className="mt-10 flex items-start gap-3 max-w-2xl rounded-md border border-primary/20 bg-primary/5 p-5">
                <ShieldCheck className="w-5 h-5 shrink-0 text-primary mt-0.5" aria-hidden="true" />
                <span className="text-body">{t("ownership")}</span>
            </p>
        </section>
    );
}
