"use client";

import { useRef, useState } from "react";
import { useTranslations } from "next-intl";

/**
 * "Tools I Reach For" as an accessible tabbed component (owner brief §3):
 * ARIA tablist/tab/tabpanel, roving focus with Arrow keys (direction-aware
 * for RTL via the document direction), aria-selected wiring, visible
 * focus, and a scrollable tab bar on narrow screens. Panels swap in place
 * — no route change, no page reload.
 */
const TAB_KEYS = ["ai", "frontend", "backend", "devops", "soft"] as const;

type TabKey = (typeof TAB_KEYS)[number];

export default function ToolsTabs() {
    const t = useTranslations("about.tools");
    const [active, setActive] = useState<TabKey>("ai");
    const tabRefs = useRef<Partial<Record<TabKey, HTMLButtonElement | null>>>({});

    const move = (current: TabKey, direction: 1 | -1) => {
        const index = TAB_KEYS.indexOf(current);
        const next = TAB_KEYS[(index + direction + TAB_KEYS.length) % TAB_KEYS.length];
        setActive(next);
        tabRefs.current[next]?.focus();
    };

    const onKeyDown = (event: React.KeyboardEvent, key: TabKey) => {
        const rtl = document.documentElement.dir === "rtl";
        const nextDir = rtl ? -1 : 1;
        if (event.key === "ArrowRight") {
            event.preventDefault();
            move(key, nextDir);
        } else if (event.key === "ArrowLeft") {
            event.preventDefault();
            move(key, -nextDir as 1 | -1);
        } else if (event.key === "Home") {
            event.preventDefault();
            setActive("ai");
            tabRefs.current.ai?.focus();
        } else if (event.key === "End") {
            event.preventDefault();
            setActive("soft");
            tabRefs.current.soft?.focus();
        }
    };

    return (
        <div>
            {/* Tab bar — one horizontal row on desktop, scrollable on mobile */}
            <div
                role="tablist"
                aria-label={t("tabsLabel")}
                className="flex gap-1 overflow-x-auto border-b border-border/60 -mx-1 px-1"
            >
                {TAB_KEYS.map((key) => {
                    const selected = active === key;
                    return (
                        <button
                            key={key}
                            ref={(el) => {
                                tabRefs.current[key] = el;
                            }}
                            role="tab"
                            id={`tools-tab-${key}`}
                            aria-selected={selected}
                            aria-controls={`tools-panel-${key}`}
                            tabIndex={selected ? 0 : -1}
                            onClick={() => setActive(key)}
                            onKeyDown={(event) => onKeyDown(event, key)}
                            className={`whitespace-nowrap px-4 py-2.5 text-label -mb-px border-b-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-t-sm ${
                                selected
                                    ? "border-primary text-primary font-medium"
                                    : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
                            }`}
                        >
                            {t(`categories.${key}.label`)}
                        </button>
                    );
                })}
            </div>

            {/* Panel — swaps in place per selected tab */}
            {TAB_KEYS.map((key) => (
                <div
                    key={key}
                    role="tabpanel"
                    id={`tools-panel-${key}`}
                    aria-labelledby={`tools-tab-${key}`}
                    hidden={active !== key}
                    tabIndex={0}
                    className="rounded-md border border-border/50 bg-card p-6 md:p-8 mt-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                    <h3 className="text-h3 mb-1.5">{t(`categories.${key}.tagline`)}</h3>
                    <p className="text-body text-foreground leading-relaxed max-w-3xl">
                        {t(`categories.${key}.items`)}
                    </p>
                    <p className="text-mono text-muted-foreground mt-4 pt-4 border-t border-border/40">
                        {t(`categories.${key}.note`)}
                    </p>
                </div>
            ))}
        </div>
    );
}
