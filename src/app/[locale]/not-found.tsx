import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ArrowRight } from "lucide-react";

/**
 * Localized Not Found (plan §6.1). Served with HTTP 404 semantics by the
 * App Router. No automatic redirect: auto-forwarding from a 404 undermines
 * the status semantics, harms SEO, and risks loops — the page instead
 * gives an immediate, obvious way home (owner brief §7 permits this
 * trade-off).
 */
export default function NotFoundPage() {
    const t = useTranslations("notFound");
    return (
        <div className="container-content flex flex-col items-center justify-center py-32 text-center">
            <p className="text-mono text-muted-foreground mb-4">404</p>
            <h1 className="text-hero mb-4">{t("title")}</h1>
            <p className="text-lead mb-8 max-w-md">{t("body")}</p>
            <div className="flex flex-col sm:flex-row gap-4">
                <Link
                    href="/"
                    className="inline-flex items-center justify-center gap-2 rounded-sm bg-primary text-primary-foreground hover:bg-primary/90 transition-colors font-semibold px-6 py-3"
                >
                    {t("backHome")}
                </Link>
                <Link
                    href="/projects"
                    className="inline-flex items-center justify-center gap-2 rounded-sm border-[1.5px] border-input bg-background hover:bg-accent hover:text-accent-foreground transition-colors font-semibold px-6 py-3"
                >
                    {t("browse")}
                    <ArrowRight className="w-4 h-4 rtl:rotate-180" aria-hidden="true" />
                </Link>
            </div>
        </div>
    );
}
