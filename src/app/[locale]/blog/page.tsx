import { Link } from "@/i18n/navigation";
import { getSortedPostsData } from "@/lib/blog";
import { Metadata } from "next";
import { ArrowRight } from "lucide-react";

import { setRequestLocale } from "next-intl/server";
import { localeAlternates, localePath, type Locale } from "@/i18n/config";
export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: string }>;
}): Promise<Metadata> {
    const { locale } = await params;
    return {

    title: "Blog",
    description: "Thoughts on software engineering, scalability, and backend architecture.",
        alternates: {
            canonical: localePath(locale as Locale, "/blog"),
            languages: localeAlternates("/blog"),
        },
    };
}

export default async function BlogPage({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    setRequestLocale(locale);
    const posts = getSortedPostsData();

    return (
        <div className="px-4 py-16 md:py-24">
            <div className="max-w-2xl mb-12">
                <h1 className="text-hero mb-4">Blog</h1>
                <p className="text-lead">
                    Insights on building scalable systems, backend architecture, and modern web development.
                </p>
            </div>

            <div className="grid gap-8 max-w-reading">
                {posts.map((post) => (
                    <article key={post.slug} className="group relative flex flex-col space-y-3">
                        <div className="flex items-center gap-3 text-sm text-muted-foreground">
                            <time dateTime={post.date}>{post.date}</time>
                            <span>•</span>
                            <div className="flex flex-wrap gap-1.5">
                                {post.tags.map(tag => (
                                    <span key={tag} className="bg-secondary px-2.5 py-1 rounded-sm text-[11px] md:text-xs text-secondary-foreground whitespace-nowrap">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <h2 className="text-h2 group-hover:text-primary transition-colors">
                            <Link href={`/blog/${post.slug}`}>
                                {post.title}
                            </Link>
                        </h2>

                        <p className="text-muted-foreground leading-relaxed">
                            {post.description}
                        </p>

                        <Link
                            href={`/blog/${post.slug}`}
                            className="inline-flex items-center text-sm font-medium text-primary hover:underline mt-2"
                        >
                            Read more <ArrowRight className="ms-1 w-4 h-4 rtl:rotate-180" />
                        </Link>
                    </article>
                ))}
            </div>
        </div>
    );
}
