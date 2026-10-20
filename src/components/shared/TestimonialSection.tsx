import { getTranslations } from "next-intl/server";
import { Quote } from "lucide-react";
import { approvedTestimonials } from "@/data/testimonials";

/**
 * Editorial testimonial section (user brief §7, plan §9.4). Renders ONLY
 * from permission-gated data — with zero approved entries the entire
 * section is absent (empty = absent, never placeholder). Each quote shows
 * its evidence class: how it was obtained and when permission was granted.
 */
export default async function TestimonialSection() {
    const testimonials = approvedTestimonials();
    if (testimonials.length === 0) return null;

    const t = await getTranslations("about.working");

    return (
        <section className="py-16 md:py-24">
            <div className="container-content">
            <h2 className="text-h2 mb-12">{t("testimonialsTitle")}</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {testimonials.map((testimonial) => (
                    <figure
                        key={testimonial.id}
                        className="relative rounded-md border border-border/50 bg-card p-8"
                    >
                        <Quote
                            className="w-6 h-6 text-primary/40 mb-4 rtl:-scale-x-100"
                            aria-hidden="true"
                        />
                        <blockquote className="text-body text-foreground leading-relaxed">
                            &ldquo;{testimonial.quote.en}&rdquo;
                        </blockquote>
                        <figcaption className="mt-6 border-t border-border/40 pt-4">
                            <p className="text-label text-foreground">
                                {testimonial.authorName}
                            </p>
                            <p className="text-body text-muted-foreground mt-0.5">
                                {testimonial.authorRole}
                                {testimonial.authorOrg ? ` · ${testimonial.authorOrg}` : ""}
                            </p>
                            <p className="text-mono text-muted-foreground mt-2">
                                {testimonial.relation} · {testimonial.obtainedVia.replace("-", " ")} ·{" "}
                                {testimonial.permission.on}
                            </p>
                        </figcaption>
                    </figure>
                ))}
            </div>
            </div>
        </section>
    );
}
