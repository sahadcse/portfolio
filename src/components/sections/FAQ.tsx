"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

/**
 * FAQ accordion (copy lives in the `faq` message namespace so all four
 * locales serve it). Optional title override; optional link target.
 */
const FAQ_KEYS = [
    "technical-knowledge",
    "code-ownership",
    "retainer-model",
    "communication-timezone",
    "project-timeline",
] as const;

export default function FAQ({
    title,
    id,
    linkHref,
    linkLabel,
}: {
    title?: string;
    id?: string;
    linkHref?: string;
    linkLabel?: string;
}) {
    const t = useTranslations("faq");
    const [activeId, setActiveId] = useState<string | null>(null);

    const toggle = (id: string) => {
        setActiveId(activeId === id ? null : id);
    };

    return (
        <section id={id} className="py-16 md:py-24 px-4 bg-muted/30">
            <div className="max-w-reading mx-auto">
                {/* Section Header */}
                {title && (
                    <div className="text-center mb-12">
                        <h2 className="text-h2 text-foreground mb-4">{title}</h2>
                    </div>
                )}

                {/* FAQ Items */}
                <div className="space-y-4">
                    {FAQ_KEYS.map((key) => (
                        <div
                            key={key}
                            className="bg-card border border-border rounded-md overflow-hidden transition-all duration-300 hover:border-primary/20"
                        >
                            {/* Question Button */}
                            <button
                                onClick={() => toggle(key)}
                                className="w-full flex items-center justify-between px-6 py-5 text-start"
                                aria-expanded={activeId === key}
                            >
                                <span className="font-semibold text-foreground pe-4">
                                    {t(`items.${key}.question`)}
                                </span>
                                <svg
                                    className={`flex-shrink-0 w-5 h-5 text-muted-foreground transition-transform duration-200 ${
                                        activeId === key ? "rotate-180" : ""
                                    }`}
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    aria-hidden="true"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M19 9l-7 7-7-7"
                                    />
                                </svg>
                            </button>

                            {/* Answer Panel */}
                            {activeId === key && (
                                <div className="px-6 pb-5 pt-0">
                                    <div className="text-muted-foreground leading-relaxed border-t border-border pt-4 text-body">
                                        {t(`items.${key}.answer`)}
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* Trust Indicator */}
                {linkHref && linkLabel && (
                    <div className="mt-12 text-center">
                        <p className="text-sm text-muted-foreground">
                            <Link
                                href={linkHref}
                                className="text-primary font-medium hover:underline"
                            >
                                {linkLabel}
                            </Link>
                        </p>
                    </div>
                )}
            </div>
        </section>
    );
}
