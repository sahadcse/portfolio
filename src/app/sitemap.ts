import { MetadataRoute } from "next";
import { CURATED_PROJECTS } from "@/data/projects";
import { getSortedPostsData } from "@/lib/blog";
import { SITE_URL } from "@/data/site-config";
import { LOCALES, localeAlternates, localePath, type Locale } from "@/i18n/config";

/**
 * Localized sitemap (plan §10.6): one <url> entry per (page × locale),
 * each carrying the full bidirectional hreflang cluster for its path.
 * Generated from the same helpers as the page metadata so the two
 * can never drift apart.
 */
type SitemapEntry = MetadataRoute.Sitemap[number];

function localizedEntries(
    paths: string[],
    extra: Partial<SitemapEntry> = {}
): MetadataRoute.Sitemap {
    const entries: MetadataRoute.Sitemap = [];
    for (const path of paths) {
        for (const locale of LOCALES) {
            entries.push({
                url: `${SITE_URL}${localePath(locale as Locale, path)}`,
                changeFrequency: "monthly",
                alternates: { languages: localeAlternates(path) },
                ...extra,
            });
        }
    }
    return entries;
}

export default function sitemap(): MetadataRoute.Sitemap {
    // Static routes (homepage gets the highest priority; core pages weekly)
    const staticEntries: MetadataRoute.Sitemap = [];
    const staticPaths = [
        "",
        "/about",
        "/projects",
        "/services",
        "/contact",
        "/blog",
        "/privacy",
        "/terms",
        "/impressum",
    ];
    for (const path of staticPaths) {
        for (const locale of LOCALES) {
            staticEntries.push({
                url: `${SITE_URL}${localePath(locale as Locale, path)}`,
                lastModified: new Date(),
                changeFrequency: "weekly",
                priority: path === "" ? 1 : 0.8,
                alternates: { languages: localeAlternates(path) },
            });
        }
    }

    // Dynamic project routes — curated set only; archived demos stay
    // routable but out of the index (plan §15.2 V2-10)
    const projectEntries = localizedEntries(
        CURATED_PROJECTS.map((project) => `/projects/${project.id}`),
        { priority: 0.6, lastModified: new Date() }
    );

    // Dynamic blog routes
    const blogEntries = localizedEntries(
        getSortedPostsData().map((post) => `/blog/${post.slug}`),
        { priority: 0.5 }
    );

    return [...staticEntries, ...projectEntries, ...blogEntries];
}
