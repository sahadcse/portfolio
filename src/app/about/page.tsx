import { ABOUT_CONTENT } from "@/lib/data";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "About",
    description: "About Md Sahaduzzaman - Software Engineer.",
};

export default function AboutPage() {
    return (
        <div className="container mx-auto px-4 py-20">
            <div className="max-w-3xl mx-auto">
                <h1 className="text-4xl font-bold mb-8 font-mono">About Me</h1>

                <div className="prose prose-neutral dark:prose-invert max-w-none">
                    <p className="text-xl leading-relaxed text-muted-foreground mb-8">
                        {ABOUT_CONTENT.bio}
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
                        <div className="p-6 rounded-lg border border-border/50 bg-card">
                            <h3 className="text-lg font-bold mb-4 font-mono">Education</h3>
                            <ul className="space-y-4">
                                <li>
                                    <div className="font-medium">BSc in Computer Science</div>
                                    <div className="text-sm text-muted-foreground">Graduating Jan 2025</div>
                                </li>
                            </ul>
                        </div>

                        <div className="p-6 rounded-lg border border-border/50 bg-card">
                            <h3 className="text-lg font-bold mb-4 font-mono">Experience</h3>
                            <ul className="space-y-4">
                                <li>
                                    <div className="font-medium">Practical Deployment</div>
                                    <div className="text-sm text-muted-foreground">South Korea & Bangladesh</div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
