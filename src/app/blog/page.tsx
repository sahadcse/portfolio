import Link from "next/link";
import { getSortedPostsData } from "@/lib/blog";
import { Metadata } from "next";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
    title: "Blog",
    description: "Thoughts on software engineering, scalability, and backend architecture.",
};

export default function BlogPage() {
    const posts = getSortedPostsData();

    return (
        <div className="container mx-auto px-4 py-20">
            <div className="max-w-2xl mb-12">
                <h1 className="text-4xl font-bold mb-4 font-mono">Blog</h1>
                <p className="text-muted-foreground text-lg">
                    Insights on building scalable systems, backend architecture, and modern web development.
                </p>
            </div>

            <div className="grid gap-8 max-w-3xl">
                {posts.map((post) => (
                    <article key={post.slug} className="group relative flex flex-col space-y-3">
                        <div className="flex items-center gap-3 text-sm text-muted-foreground">
                            <time dateTime={post.date}>{post.date}</time>
                            <span>•</span>
                            <div className="flex gap-2">
                                {post.tags.map(tag => (
                                    <span key={tag} className="bg-secondary px-2 py-0.5 rounded text-xs text-secondary-foreground">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <h2 className="text-2xl font-bold group-hover:text-primary transition-colors">
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
                            Read more <ArrowRight className="ml-1 w-4 h-4" />
                        </Link>
                    </article>
                ))}
            </div>
        </div>
    );
}
