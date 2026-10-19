import { Github, Linkedin, Mail } from "lucide-react";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Metadata } from "next";
import PageHero from "@/components/shared/PageHero";
import ContactForm from "@/components/sections/ContactForm";
import CopyEmailButton from "@/components/home/CopyEmailButton";
import { SITE_CONFIG } from "@/data/site-config";
import { localeAlternates, localePath, type Locale } from "@/i18n/config";

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: string }>;
}): Promise<Metadata> {
    const { locale } = await params;
    return {
        title: "Contact",
        description:
            "Get in touch with Md Sahaduzzaman about software-engineering roles, new projects, improving an existing system, or a collaboration.",
        alternates: {
            canonical: localePath(locale as Locale, "/contact"),
            languages: localeAlternates("/contact"),
        },
    };
}

const AUDIENCE_KEYS = ["hiring", "project", "improve", "collaborate"] as const;

export default async function ContactPage({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    setRequestLocale(locale);
    const t = await getTranslations("contact");

    return (
        <div className="px-4 py-16 md:py-24">
            <PageHero
                eyebrow={t("hero.eyebrow")}
                title={t("hero.title")}
                lead={t("hero.lead")}
            />

            <div className="grid grid-cols-1 lg:grid-cols-[0.85fr_1.15fr] gap-12 lg:gap-16 items-start">
                {/* Invitation column */}
                <div className="space-y-10 lg:sticky lg:top-24">
                    <div>
                        <h2 className="text-h3 mb-5">{t("audience.title")}</h2>
                        <ul className="space-y-3">
                            {AUDIENCE_KEYS.map((key) => (
                                <li
                                    key={key}
                                    className="flex items-start gap-3 text-body text-muted-foreground"
                                >
                                    <span
                                        className="mt-2 w-1.5 h-1.5 shrink-0 rounded-full bg-primary"
                                        aria-hidden="true"
                                    />
                                    {t(`audience.items.${key}`)}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="rounded-md border border-border/50 bg-card p-7 space-y-6">
                        <div>
                            <h3 className="text-label text-muted-foreground uppercase mb-2">
                                {t("details.emailLabel")}
                            </h3>
                            <div className="flex flex-wrap items-center gap-3">
                                <a
                                    href={`mailto:${SITE_CONFIG.email}`}
                                    className="inline-flex items-center gap-2 text-body font-medium text-primary hover:underline"
                                >
                                    <Mail className="w-4 h-4" aria-hidden="true" />
                                    {SITE_CONFIG.email}
                                </a>
                                <CopyEmailButton
                                    email={SITE_CONFIG.email}
                                    copyLabel={t("details.copy")}
                                    copiedLabel={t("details.copied")}
                                />
                            </div>
                        </div>

                        <div>
                            <h3 className="text-label text-muted-foreground uppercase mb-2">
                                {t("details.socialsLabel")}
                            </h3>
                            <div className="flex items-center gap-4">
                                <a
                                    href={SITE_CONFIG.socials.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 text-body text-muted-foreground hover:text-foreground transition-colors"
                                >
                                    <Github className="w-4 h-4" aria-hidden="true" />
                                    GitHub
                                </a>
                                <a
                                    href={SITE_CONFIG.socials.linkedin}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 text-body text-muted-foreground hover:text-foreground transition-colors"
                                >
                                    <Linkedin className="w-4 h-4" aria-hidden="true" />
                                    LinkedIn
                                </a>
                            </div>
                        </div>

                        <div className="border-t border-border/40 pt-5">
                            <p className="text-mono text-muted-foreground">
                                {t("details.availabilityLabel")}: {t("details.availability")}
                            </p>
                            <p className="text-mono text-muted-foreground mt-1.5">
                                {t("details.privacyNote")}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Form column */}
                <div className="rounded-lg border border-border/50 bg-card p-7 md:p-10">
                    <h2 className="text-h2 mb-8">{t("form.title")}</h2>
                    <ContactForm />
                </div>
            </div>
        </div>
    );
}
