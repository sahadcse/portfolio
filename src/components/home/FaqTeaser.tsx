"use client";

import { useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";

/**
 * FAQ teaser (plan §6.3 #7): ownership, maintenance, timezone — referenced
 * by key from the shared `faq` message namespace (no duplicated copy),
 * with a link to the full FAQ on the services page.
 */
const TEASER_KEYS = ["code-ownership", "retainer-model", "communication-timezone"] as const;

export default function FaqTeaser() {
    const t = useTranslations("home.faqTeaser");
    const f = useTranslations("faq");

    return (
        <section id="faq" className="py-16 md:py-24">
            <div className="container-content">
                <h2 className="text-h2 mb-10">{t("title")}</h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                    {TEASER_KEYS.map((key) => (
                        <div key={key} className="rounded-md border border-border/50 bg-card p-6">
                            <h3 className="text-body font-semibold text-foreground mb-2.5">
                                {f(`items.${key}.question`)}
                            </h3>
                            <p className="text-body text-muted-foreground">
                                {f(`items.${key}.answer`)}
                            </p>
                        </div>
                    ))}
                </div>

                <Link
                    href="/services"
                    className="inline-flex items-center gap-1.5 text-label text-primary hover:underline"
                >
                    {t("link")}
                    <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" aria-hidden="true" />
                </Link>
            </div>
        </section>
    );
}
