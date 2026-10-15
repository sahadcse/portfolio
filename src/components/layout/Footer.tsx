import { Github, Linkedin, Mail } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { SITE_CONFIG } from "@/data/site-config";
import { Link } from "@/i18n/navigation";

export default async function Footer() {
    const t = await getTranslations("footer");
    return (
        <footer className="border-t border-border/40 bg-background py-8 mt-auto">
            <div className="max-w-7xl mx-auto px-4 flex flex-col items-center gap-4">
                {/* Social Links */}
                <div className="flex items-center space-x-4">
                    <a
                        href={SITE_CONFIG.socials.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-foreground transition-colors"
                        aria-label="GitHub"
                    >
                        <Github className="w-5 h-5" />
                    </a>
                    <a
                        href={SITE_CONFIG.socials.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-foreground transition-colors"
                        aria-label="LinkedIn"
                    >
                        <Linkedin className="w-5 h-5" />
                    </a>
                    <a
                        href={`mailto:${SITE_CONFIG.email}`}
                        className="text-muted-foreground hover:text-foreground transition-colors"
                        aria-label="Email"
                    >
                        <Mail className="w-5 h-5" />
                    </a>
                </div>

                {/* Copyright */}
                <p className="text-sm text-muted-foreground text-center">
                    {t("copyright", { year: new Date().getFullYear(), name: SITE_CONFIG.name })}
                </p>

                {/* Legal Compliance Links */}
                <div className="flex items-center justify-center flex-wrap gap-1">
                    <Link
                        href="/privacy"
                        className="text-xs text-muted-foreground hover:text-primary transition-colors mx-3"
                    >
                        {t("privacy")}
                    </Link>
                    <span className="text-xs text-muted-foreground">•</span>
                    <Link
                        href="/terms"
                        className="text-xs text-muted-foreground hover:text-primary transition-colors mx-3"
                    >
                        {t("terms")}
                    </Link>
                    <span className="text-xs text-muted-foreground">•</span>
                    <Link
                        href="/impressum"
                        className="text-xs text-muted-foreground hover:text-primary transition-colors mx-3"
                    >
                        {t("impressum")}
                    </Link>
                </div>
            </div>
        </footer>
    );
}
