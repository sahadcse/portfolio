import { Github, Linkedin, Mail, ArrowRight } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { SITE_CONFIG } from "@/data/site-config";
import { Link } from "@/i18n/navigation";
import { IdentityName } from "@/components/shared/IdentityName";

/**
 * Footer (user brief §6): full-bleed surface with a viewport-spanning top
 * border; inner content on the standard container. Upper invitation band,
 * then identity / site / connect columns, then the legal row — all prior
 * destinations preserved.
 */
export default async function Footer() {
    const t = await getTranslations("footer");
    const year = new Date().getFullYear();

    const siteLinks = [
        { href: "/projects", label: t("projects") },
        { href: "/services", label: t("services") },
        { href: "/about", label: t("about") },
        { href: "/contact", label: t("contact") },
        { href: "/blog", label: t("blog") },
    ];

    return (
        <footer className="border-t border-border/40 bg-muted/30 mt-auto">
            <div className="container-content py-12 md:py-16">
                {/* Invitation band */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5 pb-10 mb-10 border-b border-border/40">
                    <p className="text-h3">{t("ctaTitle")}</p>
                    <Link
                        href="/contact"
                        className="inline-flex shrink-0 items-center gap-2 rounded-sm bg-primary text-primary-foreground hover:bg-primary/90 transition-colors font-semibold px-6 py-2.5"
                    >
                        {t("ctaLabel")}
                        <ArrowRight className="w-4 h-4 rtl:rotate-180" aria-hidden="true" />
                    </Link>
                </div>

                {/* Columns: identity / site / connect */}
                <div className="grid grid-cols-1 md:grid-cols-[1.4fr_1fr_1fr] gap-10 mb-12">
                    <div>
                        <p className="text-h3 mb-3">
                            <IdentityName>Sahaduzzaman (Sahad)</IdentityName>
                        </p>
                        <p className="text-body text-muted-foreground max-w-sm">
                            {t("tagline")}
                        </p>
                    </div>

                    <nav aria-label={t("siteLabel")}>
                        <h2 className="text-label text-muted-foreground uppercase mb-4">{t("siteLabel")}</h2>
                        <ul className="space-y-2.5">
                            {siteLinks.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-body text-muted-foreground hover:text-foreground transition-colors"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    <nav aria-label={t("connectLabel")}>
                        <h2 className="text-label text-muted-foreground uppercase mb-4">{t("connectLabel")}</h2>
                        <ul className="space-y-2.5">
                            <li>
                                <a
                                    href={SITE_CONFIG.socials.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2.5 text-body text-muted-foreground hover:text-foreground transition-colors"
                                >
                                    <Github className="w-4 h-4" aria-hidden="true" />
                                    {t("github")}
                                </a>
                            </li>
                            <li>
                                <a
                                    href={SITE_CONFIG.socials.linkedin}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2.5 text-body text-muted-foreground hover:text-foreground transition-colors"
                                >
                                    <Linkedin className="w-4 h-4" aria-hidden="true" />
                                    {t("linkedin")}
                                </a>
                            </li>
                            <li>
                                <a
                                    href={`mailto:${SITE_CONFIG.email}`}
                                    className="inline-flex items-center gap-2.5 text-body text-muted-foreground hover:text-foreground transition-colors"
                                >
                                    <Mail className="w-4 h-4" aria-hidden="true" />
                                    {t("email")}
                                </a>
                            </li>
                            {SITE_CONFIG.resumeUrl && (
                                <li>
                                    <a
                                        href={SITE_CONFIG.resumeUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2.5 text-body text-muted-foreground hover:text-foreground transition-colors"
                                    >
                                        {t("cv")}
                                    </a>
                                </li>
                            )}
                        </ul>
                    </nav>
                </div>

                {/* Legal row */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pt-8 border-t border-border/40">
                    <p className="text-sm text-muted-foreground">
                        {t("copyright", { year, name: SITE_CONFIG.name })}
                    </p>
                    <nav aria-label={t("legalLabel")} className="flex flex-wrap items-center gap-x-5 gap-y-2">
                        <Link href="/privacy" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                            {t("privacy")}
                        </Link>
                        <Link href="/terms" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                            {t("terms")}
                        </Link>
                        <Link href="/impressum" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                            {t("impressum")}
                        </Link>
                    </nav>
                </div>
            </div>
        </footer>
    );
}
