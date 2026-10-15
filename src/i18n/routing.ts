import { defineRouting } from "next-intl/routing";
import { DEFAULT_LOCALE, LOCALES } from "./config";

/**
 * Locale negotiation precedence (handled by next-intl's middleware,
 * documented behavior — plan §10.4):
 *   1. explicit path locale  (always respected per-request)
 *   2. NEXT_LOCALE cookie    (saved manual choice — governs ambiguous
 *                              entries like "/" and is refreshed on
 *                              every explicit locale visit)
 *   3. Accept-Language       (browser preference, best-fit match)
 *   4. defaultLocale (en)    (bots and fresh visitors land here;
 *                              never IP-redirected)
 */
export const routing = defineRouting({
    locales: [...LOCALES],
    defaultLocale: DEFAULT_LOCALE,
    localePrefix: "as-needed",
});
