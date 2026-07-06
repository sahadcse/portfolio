import { MetadataRoute } from "next";
import { PROJECTS } from "@/data/projects";
import { getSortedPostsData } from "@/lib/blog";

/**
 * Dynamic sitemap generation for SEO
 * Includes all static routes, dynamic project pages, and blog posts
 */
export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = "https://sahad.vercel.app";

    // Static routes
    const staticRoutes = [
        "",
        "/about",
        "/projects",
        "/contact",
        "/blog",
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: "weekly" as const,
        priority: route === "" ? 1 : 0.8,
    }));

    // Dynamic project routes
    const projectRoutes = PROJECTS.map((project) => ({
        url: `${baseUrl}/projects/${project.id}`,
        lastModified: new Date(),
        changeFrequency: "monthly" as const,
        priority: 0.6,
    }));

    // Dynamic blog routes
    const blogPosts = getSortedPostsData().map((post) => ({
        url: `${baseUrl}/blog/${post.slug}`,
        lastModified: new Date(post.date),
        changeFrequency: "monthly" as const,
        priority: 0.5,
    }));

    return [...staticRoutes, ...projectRoutes, ...blogPosts];
}
