import { getTranslations } from "next-intl/server";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/Button";
import { SITE_CONFIG } from "@/data/site-config";
import CopyEmailButton from "@/components/home/CopyEmailButton";

/**
 * Shared closing CTA (plan §6.3 #8) — the "Tell me what you're trying to
 * do." panel used at the end of the homepage, About, and Services.
 */
export default async function CtaPanel() {
    const t = await getTranslations("cta.shared");

    return (
        <section className="py-16 md:py-24">
            <div className="rounded-lg border border-primary/20 bg-primary/5 p-8 md:p-14 text-center">
                <h2 className="text-h2 mb-4">{t("title")}</h2>
                <p className="text-lead max-w-2xl mx-auto mb-8">{t("body")}</p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link href="/contact" className="inline-flex">
                        <Button size="lg">
                            {t("button")}
                            <ArrowRight className="ms-2 w-5 h-5 rtl:rotate-180" aria-hidden="true" />
                        </Button>
                    </Link>
                </div>

                <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                    <span className="text-label text-muted-foreground">{t("emailLabel")}</span>
                    <a
                        href={`mailto:${SITE_CONFIG.email}`}
                        className="text-body font-medium text-primary hover:underline"
                    >
                        {SITE_CONFIG.email}
                    </a>
                    <CopyEmailButton
                        email={SITE_CONFIG.email}
                        copyLabel={t("copy")}
                        copiedLabel={t("copied")}
                    />
                </div>
            </div>
        </section>
    );
}
