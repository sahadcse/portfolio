import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function NotFoundPage() {
    const t = useTranslations("notFound");
    return (
        <div className="flex flex-col items-center justify-center py-32 text-center">
            <p className="text-mono text-muted-foreground mb-4">404</p>
            <h1 className="text-hero mb-4">{t("title")}</h1>
            <p className="text-muted-foreground mb-8 max-w-md">{t("body")}</p>
            <Link
                href="/"
                className="inline-flex items-center px-6 py-3 rounded-sm bg-primary text-primary-foreground hover:bg-primary/90 transition-colors font-medium"
            >
                {t("backHome")}
            </Link>
        </div>
    );
}
