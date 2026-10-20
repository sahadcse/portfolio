/**
 * Locale constants and URL helpers — the single source of truth for
 * the four-language architecture (plan §10).
 *
 * URL scheme: `localePrefix: "as-needed"` (routing.ts) — English keeps
 * today's unprefixed URLs (/about), other locales are prefixed
 * (/de/about, /fr/about, /ar/about). Arabic renders right-to-left.
 */
export const LOCALES = ["en", "de", "fr", "ar"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "en";

export const LOCALE_DIR: Record<Locale, "ltr" | "rtl"> = {
    en: "ltr",
    de: "ltr",
    fr: "ltr",
    ar: "rtl",
};

/** Native language names — never translated (plan §8.4). */
export const LOCALE_NAMES: Record<Locale, string> = {
    en: "English",
    de: "Deutsch",
    fr: "Français",
    ar: "العربية",
};

/** Path for `path` in `locale` — English unprefixed, others /{locale}-prefixed. */
export function localePath(locale: Locale, path: string): string {
    if (locale === DEFAULT_LOCALE) return path;
    return `/${locale}${path === "/" ? "" : path}`;
}

/**
 * hreflang alternate map for `path`: every locale lists itself plus all
 * others (Google requires bidirectional clusters), x-default → English.
 */
export function localeAlternates(path: string): Record<string, string> {
    const languages: Record<string, string> = {};
    for (const locale of LOCALES) {
        languages[locale] = localePath(locale, path);
    }
    languages["x-default"] = localePath(DEFAULT_LOCALE, path);
    return languages;
}
