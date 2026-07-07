"use client";

import { useState } from "react";
import { FAQ_ITEMS } from "@/data/faq";

/**
 * Premium FAQ Accordion Component
 * - Interactive state-based accordion with smooth animations
 * - Premium dark mode styling with arrow rotation
 * - High-impact keyword highlighting
 */
export default function FAQ() {
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
            highlightedText = highlightedText.replace(regex, '<mark class="bg-cyan-500/20 text-cyan-600 dark:text-cyan-400 px-1 rounded">$1</mark>');
        });

        return <span dangerouslySetInnerHTML={{ __html: highlightedText }} />;
    };

    return (
        <section className="py-20 px-4 bg-slate-50/50 dark:bg-slate-900/30">
            <div className="max-w-3xl mx-auto">
                {/* Section Header */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 dark:text-white mb-4">
                        Frequently Asked Questions
                    </h2>
                    <p className="text-slate-600 dark:text-slate-400">
                        Everything you need to know before we start working together
                    </p>
                </div>

                {/* FAQ Items */}
                <div className="space-y-4">
                    {FAQ_ITEMS.map((item, index) => (
                        <div
                            key={item.id}
                            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden transition-all duration-300 hover:border-cyan-500/20"
                        >
                            {/* Question Button */}
                            <button
                                onClick={() => toggle(item.id)}
                                className="w-full flex items-center justify-between px-6 py-5 text-left"
                                aria-expanded={activeId === item.id}
                            >
                                <span className="font-semibold text-slate-900 dark:text-white pr-4">
                                    {item.question}
                                </span>
                                <svg
                                    className={`flex-shrink-0 w-5 h-5 text-slate-500 transition-transform duration-200 ${
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
                                    <div className="text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-800 pt-4">
                                        <Highlight>{item.answer}</Highlight>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* Trust Indicator */}
                <div className="mt-12 text-center">
                    <p className="text-sm text-slate-500 dark:text-slate-500">
                        Still have questions?{" "}
                        <a
                            href="/contact"
                            className="text-cyan-600 dark:text-cyan-400 font-medium hover:underline"
                        >
                            Get in touch
                        </a>
                    </p>
                </div>
            </div>
        </section>
    );
}
