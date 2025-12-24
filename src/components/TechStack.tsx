"use client";

import { TECH_STACK } from "@/lib/data";
import { motion } from "framer-motion";

export default function TechStack() {
    return (
        <section className="py-16 border-y border-border/40 bg-muted/20">
            <div className="container mx-auto px-4">
                <h2 className="text-2xl font-bold mb-8 font-mono">Technologies Mostly Used</h2>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
                    {TECH_STACK.map((tech, index) => (
                        <motion.div
                            key={tech.name}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.05 }}
                            className="flex flex-col items-center justify-center p-4 rounded-lg hover:bg-background/80 hover:shadow-sm transition-all duration-300 group"
                        >
                            <tech.icon className="w-10 h-10 mb-3 text-muted-foreground group-hover:text-primary transition-colors" />
                            <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground">
                                {tech.name}
                            </span>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
