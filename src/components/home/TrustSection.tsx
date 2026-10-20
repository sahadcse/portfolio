import { getTranslations } from "next-intl/server";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { IdentityName } from "@/components/shared/IdentityName";
import { approvedTestimonials, type Testimonial } from "@/data/testimonials";

/**
 * Client-trust section (user brief §7). Honest by construction: no
 * purchased quotes and no "Testimonials" label while none are permissioned.
 * Shows verifiable evidence instead (live systems, verified counts,
 * ownership policy); approved testimonials render here automatically once
 * entries with written permission exist in src/data/testimonials.ts.
 *
 * DRAFT PREVIEW: building with TESTIMONIAL_PREVIEW=1 renders the unapproved
 * drafts from docs/testimonial-drafts.json with a mandatory DRAFT label.
 * The drafts live OUTSIDE src/ and are read via fs only inside the flag
 * gate, so production bundles contain neither the quotes nor the data —
 * verified by grepping the built output.
 */
async function loadPreviewDrafts(): Promise<Testimonial[]> {
    if (process.env.TESTIMONIAL_PREVIEW !== "1") return [];
    try {
        const { readFileSync } = await import("node:fs");
        const { join } = await import("node:path");
        const raw = JSON.parse(
            readFileSync(join(process.cwd(), "docs", "testimonial-drafts.json"), "utf8")
        );
        return raw as Testimonial[];
    } catch {
        return [];
    }
}

export default async function TrustSection() {
    const t = await getTranslations("home.trust");
    const testimonials = approvedTestimonials();
    const previewDrafts =
        testimonials.length === 0 ? await loadPreviewDrafts() : [];
    const shown: Testimonial[] =
        testimonials.length > 0 ? testimonials : previewDrafts;

    const cardKeys = ["live", "verified", "ownership"] as const;

    return (
        <section id="trust" className="py-16 md:py-24 border-y border-border/40 bg-muted/20">
            <div className="container-content">
                <div className="max-w-2xl mb-12">
                    <h2 className="text-h2 mb-4">{t("title")}</h2>
                    <p className="text-lead">{t("subtitle")}</p>
                </div>

                {/* Permissioned testimonials render here the moment they exist;
                    the TESTIMONIAL_PREVIEW=1 build flag swaps in labelled drafts */}
                {shown.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                        {shown.map((testimonial) => {
                            const isDraft = !testimonials.includes(testimonial);
                            return (
                                <figure
                                    key={testimonial.id}
                                    className={`rounded-md border p-7 flex flex-col ${
                                        isDraft
                                            ? "border-dashed border-warning/50 bg-warning/5"
                                            : "border-border/50 bg-card"
                                    }`}
                                >
                                    {isDraft && (
                                        <span className="self-start text-mono rounded-sm border border-warning/40 bg-warning/10 text-warning px-2 py-0.5 mb-4">
                                            {t("draftLabel")}
                                        </span>
                                    )}
                                    <blockquote className="text-body text-foreground leading-relaxed">
                                        &ldquo;{testimonial.quote.en}&rdquo;
                                    </blockquote>
                                    <figcaption className="mt-auto pt-4 text-label text-muted-foreground">
                                        {testimonial.authorName}
                                        {testimonial.authorRole ? ` · ${testimonial.authorRole}` : ""}
                                        {testimonial.authorOrg ? ` · ${testimonial.authorOrg}` : ""}
                                    </figcaption>
                                </figure>
                            );
                        })}
                    </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {cardKeys.map((key) => (
                        <div
                            key={key}
                            className="flex flex-col rounded-md border border-border/50 bg-card p-7"
                        >
                            <span className="inline-flex items-center gap-1.5 self-start text-mono rounded-sm border border-primary/20 bg-primary/10 text-primary px-2 py-0.5 mb-5">
                                <ShieldCheck className="w-3.5 h-3.5" aria-hidden="true" />
                                {t(`cards.${key}.tag`)}
                            </span>
                            <p className="text-body text-muted-foreground mb-6">
                                {t(`cards.${key}.text`)}
                            </p>
                            {key === "live" ? (
                                <a
                                    href={t("cards.live.linkHref")}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1.5 text-label text-primary hover:underline mt-auto"
                                >
                                    {t("cards.live.linkLabel")}
                                    <ArrowRight className="w-3.5 h-3.5 rtl:-scale-x-100" aria-hidden="true" />
                                </a>
                            ) : (
                                <Link
                                    href={t(`cards.${key}.linkHref`)}
                                    className="inline-flex items-center gap-1.5 text-label text-primary hover:underline mt-auto"
                                >
                                    {t(`cards.${key}.linkLabel`)}
                                    <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" aria-hidden="true" />
                                </Link>
                            )}
                        </div>
                    ))}
                </div>

                <p className="mt-10 text-mono text-muted-foreground">
                    — <IdentityName>Sahad</IdentityName>, personally
                </p>
            </div>
        </section>
    );
}
