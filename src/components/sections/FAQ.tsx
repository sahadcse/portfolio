"use client";

import { useState } from "react";
import { FAQ_ITEMS } from "@/data/faq";
import { Link } from "@/i18n/navigation";

/**
 * Premium FAQ Accordion Component
 * - Interactive state-based accordion with smooth animations
 * - Premium dark mode styling with arrow rotation
 * - High-impact keyword highlighting
 */
export default function FAQ({ title, id }: { title?: string; id?: string }) {
    const [activeId, setActiveId] = useState<string | null>(null);

    const toggle = (id: string) => {
        setActiveId(activeId === id ? null : id);
    };

    const Highlight = ({ children }: { children: string }) => {
        // Highlight high-impact keywords
        const keywords = [
            "100% intellectual property",
            "zero downtime",
            "3 to 7 business days",
            "entire lifecycle",
            "Remote CTO/Engineer",
            "fixed monthly fee"
        ];

        let highlightedText = children;
        keywords.forEach(keyword => {
            const regex = new RegExp(`(${keyword})`, 'gi');
            highlightedText = highlightedText.replace(regex, '<mark class="bg-primary/20 text-primary px-1 rounded-sm">$1</mark>');
        });

        return <span dangerouslySetInnerHTML={{ __html: highlightedText }} />;
    };

    return (
        <section id={id} className="py-16 md:py-24 px-4 bg-muted/30">
            <div className="max-w-reading mx-auto">
                {/* Section Header */}
                <div className="text-center mb-12">
                    <h2 className="text-h2 text-foreground mb-4">
                        {title ?? "Frequently Asked Questions"}
                    </h2>
                    <p className="text-muted-foreground">
                        Everything you need to know before we start working together
                    </p>
                </div>

                {/* FAQ Items */}
                <div className="space-y-4">
                    {FAQ_ITEMS.map((item) => (
                        <div
                            key={item.id}
                            className="bg-card border border-border rounded-md overflow-hidden transition-all duration-300 hover:border-primary/20"
                        >
                            {/* Question Button */}
                            <button
                                onClick={() => toggle(item.id)}
                                className="w-full flex items-center justify-between px-6 py-5 text-start"
                                aria-expanded={activeId === item.id}
                            >
                                <span className="font-semibold text-foreground pe-4">
                                    {item.question}
                                </span>
                                <svg
                                    className={`flex-shrink-0 w-5 h-5 text-muted-foreground transition-transform duration-200 ${
                                        activeId === item.id ? "rotate-180" : ""
                                    }`}
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M19 9l-7 7-7-7"
                                    />
                                </svg>
                            </button>

                            {/* Answer Panel */}
                            {activeId === item.id && (
                                <div className="px-6 pb-5 pt-0">
                                    <div className="text-muted-foreground leading-relaxed border-t border-border pt-4">
                                        <Highlight>{item.answer}</Highlight>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* Trust Indicator */}
                <div className="mt-12 text-center">
                    <p className="text-sm text-muted-foreground">
                        Still have questions?{" "}
                        <Link
                            href="/contact"
                            className="text-primary font-medium hover:underline"
                        >
                            Get in touch
                        </Link>
                    </p>
                </div>
            </div>
        </section>
    );
}
