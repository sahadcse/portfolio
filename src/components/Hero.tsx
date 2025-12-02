"use client";

import { motion } from "framer-motion";
import { HERO_CONTENT } from "@/lib/data";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Hero() {
    return (
        <section className="py-20 md:py-32 flex flex-col items-start justify-center min-h-[60vh]">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="max-w-3xl"
                >
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 leading-tight">
                        {HERO_CONTENT.headline}
                    </h1>
                    <p className="text-xl text-muted-foreground mb-8 max-w-2xl leading-relaxed">
                        {HERO_CONTENT.subHeadline}
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4">
                        <Link
                            href="/contact"
                            className="inline-flex items-center justify-center px-6 py-3 rounded-md bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
                        >
                            Start a Project
                            <ArrowRight className="ml-2 w-4 h-4" />
                        </Link>
                        <Link
                            href="/projects"
                            className="inline-flex items-center justify-center px-6 py-3 rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground transition-colors font-medium"
                        >
                            View Portfolio
                        </Link>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
