import { getTranslations } from "next-intl/server";
import { VERIFIED_METRICS } from "@/data/verified-metrics";
import { approvedTestimonials } from "@/data/testimonials";
import type { VerifiedMetric } from "@/data/verified-metrics";

/**
 * Proof band (plan §9.5): the four §9.3-gated personal metrics, each with
 * its counting methodology reachable on hover AND keyboard focus (CSS-only,
 * no JS). Testimonials render only from permission-gated data — with zero
 * approved entries the slot is absent, never placeholder (§9.4).
 */
function MetricStat({
    metric,
    methodologyLabel,
}: {
    metric: VerifiedMetric;
    methodologyLabel: string;
}) {
    return (
        <div className="relative">
            <div className="flex items-baseline gap-1.5">
                <span className="text-3xl md:text-4xl font-bold text-primary tabular-nums">
                    {metric.value}
                </span>
                {metric.asOf && (
                    <span className="text-mono text-muted-foreground">· {metric.asOf}</span>
                )}
            </div>
            <p className="text-label mt-1.5 text-foreground">{metric.label}</p>

            {/* Methodology disclosure (§9.3): reachable by hover AND keyboard focus */}
            <div className="mt-2">
                <span
                    tabIndex={0}
                    aria-label={`${methodologyLabel}: ${metric.methodology}`}
                    className="peer inline-flex cursor-help items-center text-mono text-muted-foreground underline decoration-dotted underline-offset-4 outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
                >
                    {methodologyLabel}
                </span>
                <span
                    role="presentation"
                    className="pointer-events-none absolute start-0 bottom-full z-20 mb-2 w-72 rounded-md border border-border bg-popover text-popover-foreground p-3 text-body text-start opacity-0 shadow-elev-floating transition-opacity duration-150 peer-hover:opacity-100 peer-focus-visible:opacity-100"
                >
                    {metric.methodology}
                </span>
            </div>
        </div>
    );
}

export default async function ProofBand() {
    const t = await getTranslations("home.proof");
    const testimonials = approvedTestimonials();
    const hasTestimonial = testimonials.length > 0;

    return (
        <section className="py-16 md:py-24 border-y border-border/40 bg-muted/20">
            <div>
                <p className="text-lead max-w-3xl mb-12">{t("proofLine")}</p>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
                    {VERIFIED_METRICS.map((metric) => (
                        <MetricStat
                            key={metric.id}
                            metric={metric}
                            methodologyLabel={t("methodologyLabel")}
                        />
                    ))}
                </div>

                <p className="mt-10 text-mono text-muted-foreground">{t("footnote")}</p>

                {/* Testimonials-in-waiting: renders only from permission-gated data (§9.4) */}
                {hasTestimonial && (
                    <blockquote className="mt-10 max-w-2xl border-s-2 border-primary/40 ps-6">
                        <p className="text-body">&ldquo;{testimonials[0].quote.en}&rdquo;</p>
                        <footer className="mt-3 text-label text-muted-foreground">
                            {testimonials[0].authorName} · {testimonials[0].authorRole}
                            {testimonials[0].authorOrg ? ` · ${testimonials[0].authorOrg}` : ""}
                        </footer>
                    </blockquote>
                )}
            </div>
        </section>
    );
}
