import { MetadataRoute } from "next";
import { SITE_URL } from "@/data/site-config";

/**
 * Robots.txt configuration for SEO
 * Allows all crawlers and points to the sitemap on the canonical host
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
        sitemap: `${SITE_URL}/sitemap.xml`,
    };
}
