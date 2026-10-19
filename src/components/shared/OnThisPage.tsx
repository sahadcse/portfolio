"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

/**
 * "On this page" section navigation (user brief §9). Compact horizontal
 * index under the page hero; active-section tracking via a single
 * IntersectionObserver (cheap: one observer, rootMargin-biased to the top
 * third of the viewport). Anchor targets carry scroll-margin-top (global
 * CSS) for the sticky header; smooth scrolling comes from the html class
 * and is disabled under prefers-reduced-motion (global CSS).
 */
export default function OnThisPage({
    items,
}: {
    items: { id: string; label: string }[];
}) {
    const t = useTranslations("a11y");
    const [activeId, setActiveId] = useState<string>(items[0]?.id ?? "");

    useEffect(() => {
        const sections = items
            .map((item) => document.getElementById(item.id))
            .filter((el): el is HTMLElement => el !== null);
        if (sections.length === 0) return;

        const observer = new IntersectionObserver(
            (entries) => {
                for (const entry of entries) {
                    if (entry.isIntersecting) {
                        setActiveId(entry.target.id);
                    }
                }
            },
            // Top-band bias: a section is "active" while its head is in the
            // upper part of the viewport
            { rootMargin: "-20% 0px -70% 0px", threshold: 0 }
        );
        sections.forEach((section) => observer.observe(section));
        return () => observer.disconnect();
    }, [items]);

    if (items.length === 0) return null;

    return (
        <nav aria-label={t("onThisPage")} className="mb-12 md:mb-16">
            <ul className="flex flex-wrap items-center gap-x-1 gap-y-2 border-y border-border/40 py-3">
                {items.map((item, index) => (
                    <li key={item.id} className="flex items-center">
                        {index > 0 && (
                            <span className="text-mono text-border mx-2.5 select-none" aria-hidden="true">
                                /
                            </span>
                        )}
                        <a
                            href={`#${item.id}`}
                            aria-current={activeId === item.id ? "true" : undefined}
                            className={`text-label rounded-sm px-2 py-1 transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                                activeId === item.id
                                    ? "text-primary font-medium"
                                    : "text-muted-foreground"
                            }`}
                        >
                            {item.label}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    );
}
