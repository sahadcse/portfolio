import { MetadataRoute } from "next";

/**
 * Robots.txt configuration for SEO
 * Allows all crawlers and points to the sitemap
 */
export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: "*",
                allow: "/",
                disallow: ["/api/", "/_next/", "/private/"],
            },
        ],
        sitemap: "https://sahad.vercel.app/sitemap.xml",
    };
}
