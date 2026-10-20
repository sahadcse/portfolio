import { getTranslations } from "next-intl/server";
import { SITE_CONFIG } from "@/data/site-config";
import { Link } from "@/i18n/navigation";

/**
 * Footer — exact minimal specification (owner brief §4): dot-matrix
 * texture, radial spotlight behind the gradient wordmark, three social
 * pills, one description, one copyright, three legal links. Nothing else.
 * Light/Dark tokens are the owner-specified literal classes (a deliberate
 * standalone surface treatment within the existing theme system).
 */
export default async function Footer() {
    const t = await getTranslations("footer");
    const year = new Date().getFullYear();

    const socials = [
        { label: t("email"), href: `mailto:${SITE_CONFIG.email}`, external: false },
        { label: t("github"), href: SITE_CONFIG.socials.github, external: true },
        { label: t("linkedin"), href: SITE_CONFIG.socials.linkedin, external: true },
    ];

    const legal = [
        { label: t("privacy"), href: "/privacy" },
        { label: t("terms"), href: "/terms" },
        { label: t("impressum"), href: "/impressum" },
    ];

    return (
        <footer className="relative overflow-hidden border-t border-slate-200/80 bg-[#F8FAFC] text-slate-800 dark:border-slate-800/80 dark:bg-[#090D16] dark:text-slate-200 mt-auto">
            {/* Dot-matrix texture — decorative, non-interactive, behind content */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:20px_20px] opacity-50 dark:bg-[radial-gradient(#1e293b_1px,transparent_1px)] dark:opacity-60"
            />

            <div className="container-content relative py-14 md:py-20">
                {/* Band A — description left, social pills right */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
                    <p className="max-w-md text-body text-slate-600 dark:text-slate-400">
                        {t("description")}
                    </p>
                    <ul className="flex flex-wrap items-center gap-3">
                        {socials.map((social) => (
                            <li key={social.label}>
                                <a
                                    href={social.href}
                                    {...(social.external
                                        ? { target: "_blank", rel: "noopener noreferrer" }
                                        : {})}
                                    className="inline-block rounded-full px-5 py-1.5 text-xs font-medium bg-white border border-slate-200 text-slate-800 shadow-2xs hover:border-blue-600 dark:bg-slate-900/80 dark:border-slate-700/80 dark:text-slate-200 dark:hover:border-blue-400 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                                >
                                    {social.label}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Band B — gradient wordmark over the radial spotlight */}
                <div className="relative py-16 md:py-24 text-center">
                    <div
                        aria-hidden="true"
                        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-64 w-[36rem] max-w-full rounded-full bg-gradient-to-r from-blue-500/10 via-indigo-400/20 to-blue-600/10 blur-3xl dark:from-blue-600/20 dark:via-indigo-500/25 dark:to-blue-500/20"
                    />
                    {/* Brand wordmark: LTR by definition, single line at every width.
                        Spec classes with two measured adjustments: (1) clamp max
                        7.75rem — 12 characters at font-black exceed the 1056px
                        container at the spec's 9.25rem cap; (2) letter-spacing as
                        inline style — the Arabic tracking neutralizer strips the
                        tracking- class under [lang=ar], widening the Latin mark.
                        The neutralizer targets Arabic cursive; a Latin lockup is
                        exempt by design. */}
                    <p
                        dir="ltr"
                        style={{ letterSpacing: "-0.04em" }}
                        className="whitespace-nowrap select-none font-black leading-[0.88] text-[clamp(2.25rem,9.6vw,7.75rem)] bg-clip-text text-transparent bg-gradient-to-r from-slate-900 via-[#1e293b] to-blue-600 dark:from-white dark:via-indigo-200 dark:to-blue-500"
                    >
                        SAHADUZZAMAN
                    </p>
                </div>

                {/* Band C — hairline, copyright left, legal right */}
                <div className="h-px bg-slate-200 dark:bg-slate-800/90" />
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-6">
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                        © {year} Sahaduzzaman. {t("rights")}
                    </p>
                    <nav aria-label={t("legalLabel")} className="flex flex-wrap items-center gap-x-5 gap-y-2">
                        {legal.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className="text-sm text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                            >
                                {item.label}
                            </Link>
                        ))}
                    </nav>
                </div>
            </div>
        </footer>
    );
}
