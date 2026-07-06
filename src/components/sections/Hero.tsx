"use client";

import { motion } from "framer-motion";
import { HERO_CONTENT, VALUE_PROPOSITION, VALUE_PROP_ICONS } from "@/data/site-config";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";

const variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
    },
  }),
};

export default function Hero() {
  return (
    <section className="py-20 md:py-32 flex flex-col items-start justify-center min-h-[60vh]">
      {/* Main Hero Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl"
      >
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 leading-tight">
          {HERO_CONTENT.headline}
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-3xl leading-relaxed">
          I engineer custom backend architectures and full-stack web systems that{" "}
          <span className="highlight-biz">automate manual processes</span>,{" "}
          <span className="highlight-biz">eliminate operational bottlenecks</span>, and{" "}
          <span className="highlight-biz">reduce overhead costs</span>.
        </p>

        {/* Updated CTAs using premium Button component */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Link href={HERO_CONTENT.cta?.primary.href || "/contact"} className="inline-flex">
            <Button
              variant="primary"
              size="lg"
              icon={<ArrowRight className="w-5 h-5" />}
              iconPosition="right"
            >
              {HERO_CONTENT.cta?.primary.text || "Discuss a Project"}
            </Button>
          </Link>
          <Link href={HERO_CONTENT.cta?.secondary.href || "/projects"} className="inline-flex">
            <Button
              variant="outline"
              size="lg"
            >
              {HERO_CONTENT.cta?.secondary.text || "View Case Studies"}
            </Button>
          </Link>
        </div>
      </motion.div>

      {/* Value Proposition Section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="mt-20 md:mt-32"
      >
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 font-mono">{VALUE_PROPOSITION.title}</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{VALUE_PROPOSITION.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {VALUE_PROPOSITION.pillars.map((pillar, index) => {
            const IconComponent = VALUE_PROP_ICONS[pillar.icon];
            return (
              <motion.div
                key={pillar.title}
                custom={index}
                initial="hidden"
                animate="visible"
                variants={variants}
                className="group p-8 rounded-xl border border-border/50 bg-card hover:border-primary/50 card-elevation transition-all duration-300"
              >
                {IconComponent && (
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                    <IconComponent className="w-6 h-6 text-primary" />
                  </div>
                )}
                <h3 className="text-xl font-bold mb-3 font-mono">{pillar.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{pillar.description}</p>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}
