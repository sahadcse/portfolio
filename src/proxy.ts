import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

/**
 * Next 16 proxy (the renamed middleware convention) — the ONLY place
 * locale negotiation happens (plan §10.4). Behavior:
 *  - explicit locale paths are always respected and 307-cleaned
 *    ("/en/about" → "/about" in as-needed mode)
 *  - NEXT_LOCALE cookie (manual choice) governs ambiguous entries
 *  - Accept-Language is the next signal; default locale last
 *  - no IP/country redirects (the country header may only preselect the
 *    language picker once it exists — never a redirect)
 * The matcher excludes internal paths, route handlers, static files, and
 * the private owner area (own standalone root layout, no locale routing).
 */
export default createMiddleware(routing);

export const config = {
    matcher: ["/((?!api|trpc|_next|_vercel|owner|.*\\..*).*)"],
};
