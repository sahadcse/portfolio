"use client";

import { useLocale, useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";
import { Check, Languages } from "lucide-react";
import { usePathname, useRouter } from "@/i18n/navigation";
import { LOCALES, LOCALE_NAMES, type Locale } from "@/i18n/config";

/**
 * Language switcher (plan §10.4): switching replaces the current path in
 * the selected locale — explicit navigation, so the middleware records
 * the NEXT_LOCALE cookie and the choice governs later ambiguous entries
 * ("/"). Names are shown in their native language, never translated.
 */
export default function LocaleSwitcher() {
    const locale = useLocale();
    const pathname = usePathname();
    const router = useRouter();
    const t = useTranslations("language");
    const [open, setOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    // Close on outside click or Escape
    useEffect(() => {
        if (!open) return;
        const onClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setOpen(false);
            }
        };
        const onKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") setOpen(false);
        };
        document.addEventListener("mousedown", onClickOutside);
        document.addEventListener("keydown", onKeyDown);
        return () => {
            document.removeEventListener("mousedown", onClickOutside);
            document.removeEventListener("keydown", onKeyDown);
        };
    }, [open]);

    return (
        <div ref={containerRef} className="relative">
            <button
                type="button"
                onClick={() => setOpen((value) => !value)}
                aria-expanded={open}
                aria-haspopup="listbox"
                aria-label={t("label")}
                className="inline-flex items-center gap-1.5 px-2.5 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
                <Languages className="w-4 h-4" aria-hidden="true" />
                <span className="uppercase">{locale}</span>
            </button>

            {open && (
                <ul
                    role="listbox"
                    aria-label={t("label")}
                    className="absolute end-0 mt-2 z-50 min-w-[9rem] rounded-md border border-border bg-popover text-popover-foreground shadow-elev-floating py-1"
                >
                    {LOCALES.map((value) => (
                        <li key={value} role="option" aria-selected={value === locale}>
                            <button
                                type="button"
                                onClick={() => {
                                    setOpen(false);
                                    if (value !== locale) {
                                        router.replace(pathname, { locale: value as Locale });
                                    }
                                }}
                                className={`w-full flex items-center justify-between px-3 py-2 text-sm text-start hover:bg-accent hover:text-accent-foreground transition-colors ${
                                    value === locale ? "font-semibold" : ""
                                }`}
                            >
                                {LOCALE_NAMES[value]}
                                {value === locale && (
                                    <Check className="w-3.5 h-3.5 text-primary" aria-hidden="true" />
                                )}
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
