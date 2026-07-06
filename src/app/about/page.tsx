import { ABOUT_CONTENT } from "@/data/experience";
import type { Experience, Education } from "@/types/portfolio";
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
                    <div className="space-y-6 mb-12">
                        {ABOUT_CONTENT.bio.map((paragraph: string, index: number) => (
                            <p key={index} className="text-xl leading-relaxed text-muted-foreground">
                                {paragraph}
                            </p>
                        ))}
                    </div>

                    <div className="mt-12">
                        <h3 className="text-2xl font-bold mb-6 font-mono">Professional Experience</h3>
                        <div className="space-y-8">
                            {ABOUT_CONTENT.experience.map((exp: Experience, index: number) => (
                                <div key={index} className="p-6 rounded-lg border border-border/50 bg-card">
                                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                                        <div>
                                            <h4 className="text-xl font-bold">{exp.role}</h4>
                                            <div className="text-lg text-primary">{exp.company}</div>
                                        </div>
                                        <div className="text-right mt-2 md:mt-0">
                                            <div className="text-sm font-medium">{exp.period}</div>
                                            <div className="text-xs text-muted-foreground">{exp.location}</div>
                                        </div>
                                    </div>
                                    <ul className="list-disc list-outside ml-5 space-y-2 text-muted-foreground text-sm">
                                        {exp.description.map((desc: string, i: number) => (
                                            <li key={i}>{desc}</li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
                        <div className="p-6 rounded-lg border border-border/50 bg-card h-full">
                            <h3 className="text-lg font-bold mb-4 font-mono">Education</h3>
                            <ul className="space-y-6">
                                {ABOUT_CONTENT.education.map((edu: Education, index: number) => (
                                    <li key={index}>
                                        <div className="font-bold text-lg">{edu.degree}</div>
                                        <div className="text-primary">{edu.institution}</div>
                                        <div className="text-sm text-muted-foreground mb-2">{edu.period}</div>
                                        <p className="text-sm text-muted-foreground">{edu.description}</p>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="p-6 rounded-lg border border-border/50 bg-card h-full">
                            <h3 className="text-lg font-bold mb-4 font-mono">Skills</h3>
                            <div className="flex flex-wrap gap-2">
                                {ABOUT_CONTENT.skills.map((skill: string, index: number) => (
                                    <span key={index} className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-xs font-medium">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
