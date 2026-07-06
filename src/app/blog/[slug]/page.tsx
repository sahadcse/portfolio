import { getPostData, getSortedPostsData } from "@/lib/blog";
import { MDXRemote } from "next-mdx-remote/rsc";
import CallToAction from "@/components/sections/CallToAction";
import { notFound } from "next/navigation";
import { Metadata } from "next";

type Props = {
    params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const post = getPostData(slug);

    if (!post) {
        return {
            title: "Post Not Found",
        };
    }

    return {
        title: post.title,
        description: post.description,
    };
}

export async function generateStaticParams() {
    const posts = getSortedPostsData();
    return posts.map((post) => ({
        slug: post.slug,
    }));
}

export default async function BlogPost({ params }: Props) {
    const { slug } = await params;
    const post = getPostData(slug);

    if (!post) {
        notFound();
    }

    return (
        <article className="container mx-auto px-4 py-20 max-w-3xl">
            <header className="mb-10 border-b border-border/40 pb-10">
                <div className="flex items-center gap-3 text-sm text-muted-foreground mb-4">
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
                <h1 className="text-3xl md:text-5xl font-bold tracking-tight leading-tight">
                    {post.title}
                </h1>
            </header>

            <div className="prose prose-neutral dark:prose-invert max-w-none prose-headings:font-mono prose-a:text-primary prose-a:no-underline hover:prose-a:underline">
                <MDXRemote source={post.content} />
            </div>

            <div className="mt-16 border-t border-border/40 pt-10">
                <CallToAction />
            </div>
        </article>
    );
}
