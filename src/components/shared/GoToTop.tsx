"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { ArrowUp } from "lucide-react";

/**
 * Go to Top control (user brief §5): appears after meaningful scrolling,
 * returns to the document start. Smooth scroll honors the user's
 * reduced-motion preference (checked at click time, not mount). Mounted
 * once in the locale layout; sits below the mobile TOC button in the
 * bottom-inline-end stack (no collision: TOC at bottom-[5.25rem], this at
 * bottom-4). Hidden until the threshold — never competes with the hero.
 */
const THRESHOLD = 600;

export default function GoToTop() {
    const t = useTranslations("a11y");
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const onScroll = () => setVisible(window.scrollY > THRESHOLD);
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    if (!visible) return null;

    const scrollToTop = () => {
        const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        window.scrollTo({ top: 0, behavior: reducedMotion ? "auto" : "smooth" });
    };

    return (
        <button
            type="button"
            onClick={scrollToTop}
            aria-label={t("goToTop")}
            className="fixed bottom-4 end-4 z-50 flex h-11 w-11 items-center justify-center rounded-full border border-border bg-background/90 text-foreground shadow-elev-floating backdrop-blur-sm transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
            <ArrowUp className="w-5 h-5" aria-hidden="true" />
        </button>
    );
}
