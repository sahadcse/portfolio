"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { List, X } from "lucide-react";

/**
 * "On this page" section navigation (user brief §2, refined):
 * - ≥2xl: fixed labeled panel at the inline-end of the viewport
 * - xl:   footprint-reduced dot rail (labels for screen readers/hover)
 * - <xl:  floating TOC button below the sticky header at the top-inline-end,
 *         opening a compact popover (dialog semantics: Escape dismiss,
 *         focus return, background scroll locked)
 *
 * One IntersectionObserver per mount drives the active indicator. Anchor
 * targets carry scroll-margin-top (global CSS) for the sticky header;
 * smooth scrolling is disabled under prefers-reduced-motion (global CSS).
 * Inline-end positioning mirrors automatically in RTL.
 */
export default function OnThisPage({
    items,
}: {
    items: { id: string; label: string }[];
}) {
    const t = useTranslations("a11y");
    const [activeId, setActiveId] = useState<string>(items[0]?.id ?? "");
    const [open, setOpen] = useState(false);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const panelRef = useRef<HTMLDivElement>(null);

    // One observer for the active-section indicator
    useEffect(() => {
        const sections = items
            .map((item) => document.getElementById(item.id))
            .filter((el): el is HTMLElement => el !== null);
        if (sections.length === 0) return;

        const observer = new IntersectionObserver(
            (entries) => {
                for (const entry of entries) {
                    if (entry.isIntersecting) setActiveId(entry.target.id);
                }
            },
            { rootMargin: "-20% 0px -70% 0px", threshold: 0 }
        );
        sections.forEach((section) => observer.observe(section));
        return () => observer.disconnect();
    }, [items]);

    // Popover: Escape dismiss + focus return + background scroll lock
    useEffect(() => {
        if (!open) return;
        const onKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                setOpen(false);
                buttonRef.current?.focus();
            }
        };
        document.addEventListener("keydown", onKeyDown);
        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        panelRef.current?.querySelector<HTMLAnchorElement>("a")?.focus();
        return () => {
            document.removeEventListener("keydown", onKeyDown);
            document.body.style.overflow = previousOverflow;
        };
    }, [open]);

    const closeAndFocusButton = useCallback(() => {
        setOpen(false);
        buttonRef.current?.focus();
    }, []);

    if (items.length === 0) return null;

    const linkList = (compact: boolean) => (
        <ul className={compact ? "space-y-1" : "space-y-0.5"}>
            {items.map((item) => (
                <li key={item.id}>
                    <a
                        href={`#${item.id}`}
                        aria-current={activeId === item.id ? "true" : undefined}
                        onClick={() => setOpen(false)}
                        className={`flex items-center gap-2 rounded-sm text-label transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                            compact ? "px-2 py-1.5" : "px-2 py-1"
                        } ${activeId === item.id ? "text-primary font-medium" : "text-muted-foreground"}`}
                    >
                        <span
                            className={`shrink-0 rounded-full transition-colors ${
                                activeId === item.id ? "bg-primary" : "bg-border"
                            } ${compact ? "w-2 h-2" : "w-1.5 h-1.5"}`}
                            aria-hidden="true"
                        />
                        {compact ? item.label : <span className="sr-only">{item.label}</span>}
                    </a>
                </li>
            ))}
        </ul>
    );

    return (
        <>
            {/* ≥2xl — labeled fixed panel; xl — dot rail */}
            <nav
                aria-label={t("onThisPage")}
                className="hidden xl:block fixed top-1/2 -translate-y-1/2 end-4 z-40"
            >
                <div className="rounded-md border border-border/50 bg-background/80 backdrop-blur-sm shadow-elev-surface p-2 2xl:pe-3">
                    <p className="text-mono text-muted-foreground px-2 pt-1 pb-2 hidden 2xl:block">
                        {t("onThisPage")}
                    </p>
                    <div className="2xl:hidden">{linkList(false)}</div>
                    <div className="hidden 2xl:block">{linkList(true)}</div>
                </div>
            </nav>

            {/* <xl — floating TOC button + popover (top-inline-end, below header) */}
            <div className="xl:hidden">
                {open && (
                    <>
                        {/* Overlay: catches outside taps, locks background scroll */}
                        <div
                            className="fixed inset-0 z-40 bg-background/50"
                            onClick={() => closeAndFocusButton()}
                            aria-hidden="true"
                        />
                        <div
                            ref={panelRef}
                            role="dialog"
                            aria-modal="true"
                            aria-label={t("onThisPage")}
                            className="fixed top-[4.75rem] end-4 z-50 w-56 rounded-md border border-border bg-popover text-popover-foreground p-3 shadow-elev-floating"
                        >
                            <div className="flex items-center justify-between mb-2 px-2">
                                <p className="text-mono text-muted-foreground">{t("onThisPage")}</p>
                                <button
                                    type="button"
                                    onClick={closeAndFocusButton}
                                    aria-label={t("close")}
                                    className="rounded-sm p-1 text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                                >
                                    <X className="w-4 h-4" aria-hidden="true" />
                                </button>
                            </div>
                            {linkList(true)}
                        </div>
                    </>
                )}
                <button
                    ref={buttonRef}
                    type="button"
                    onClick={() => setOpen((value) => !value)}
                    aria-expanded={open}
                    aria-haspopup="dialog"
                    aria-label={t("onThisPage")}
                    className="xl:hidden fixed top-[4.75rem] end-4 z-40 flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background/90 text-foreground shadow-elev-floating backdrop-blur-sm transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                    {open ? <X className="w-5 h-5" aria-hidden="true" /> : <List className="w-5 h-5" aria-hidden="true" />}
                </button>
            </div>
        </>
    );
}
