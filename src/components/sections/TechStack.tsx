"use client";

import { TECH_STACK } from "@/data/site-config";
import { motion } from "framer-motion";

export default function TechStack() {
    return (
        <section className="py-16 border-y border-border/40 bg-muted/20">
            <h2 className="text-2xl font-bold mb-8 font-mono">Technologies Mostly Used</h2>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
                    {TECH_STACK.map((tech, index) => (
                        <motion.div
                            key={tech.name}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.05 }}
                            className="flex flex-col items-center justify-center p-4 rounded-lg hover:bg-background/80 hover:shadow-[0_0_22px_-6px_hsl(var(--primary)/0.35)] transition-all duration-300 group border border-transparent hover:border-primary/30"
                        >
                            <tech.icon className="w-10 h-10 mb-3 text-muted-foreground group-hover:text-primary transition-colors" />
                            <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors px-3 py-1 rounded-md bg-background/50 group-hover:bg-primary/10">
                                {tech.name}
                            </span>
                        </motion.div>
                    ))}
                </div>
        </section>
    );
}
