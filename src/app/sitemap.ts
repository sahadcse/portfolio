import { MetadataRoute } from "next";
import { PROJECTS } from "@/data/projects";
import { getSortedPostsData } from "@/lib/blog";
import { SITE_URL } from "@/data/site-config";

/**
 * Dynamic sitemap generation for SEO
 * Includes all static routes, dynamic project pages, and blog posts,
 * all on the canonical host (SITE_URL)
 */
export default function sitemap(): MetadataRoute.Sitemap {
    // Static routes
    const staticRoutes = [
        "",
        "/about",
        "/projects",
        "/services",
        "/contact",
        "/blog",
        "/privacy",
        "/terms",
        "/impressum",
    ].map((route) => ({
        url: `${SITE_URL}${route}`,
        lastModified: new Date(),
        changeFrequency: "weekly" as const,
        priority: route === "" ? 1 : 0.8,
    }));

    // Dynamic project routes
    const projectRoutes = PROJECTS.map((project) => ({
        url: `${SITE_URL}/projects/${project.id}`,
        lastModified: new Date(),
        changeFrequency: "monthly" as const,
        priority: 0.6,
    }));

    // Dynamic blog routes
    const blogPosts = getSortedPostsData().map((post) => ({
        url: `${SITE_URL}/blog/${post.slug}`,
        lastModified: new Date(post.date),
        changeFrequency: "monthly" as const,
        priority: 0.5,
    }));

    return [...staticRoutes, ...projectRoutes, ...blogPosts];
}
