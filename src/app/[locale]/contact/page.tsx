import { SITE_CONFIG } from "@/data/site-config";
import { Metadata } from "next";
import { Mail } from "lucide-react";
import ContactForm from "@/components/sections/ContactForm";

import { setRequestLocale } from "next-intl/server";
import { localeAlternates, localePath, type Locale } from "@/i18n/config";
export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: string }>;
}): Promise<Metadata> {
    const { locale } = await params;
    return {

    title: "Contact",
    description: "Get in touch for collaboration or inquiries.",
        alternates: {
            canonical: localePath(locale as Locale, "/contact"),
            languages: localeAlternates("/contact"),
        },
    };
}

export default async function ContactPage({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    setRequestLocale(locale);
    return (
        <div className="px-4 py-16 md:py-24">
            <div className="max-w-2xl mx-auto">
                <h1 className="text-hero mb-4">Get in Touch</h1>
                <p className="text-body text-muted-foreground mb-12">
                    Interested in working together? Fill out the form below or send me an email.
                </p>

                <div className="grid gap-12">
                    <div className="flex items-center gap-3 text-lg">
                        <Mail className="w-6 h-6 text-primary" />
                        <a
                            href={`mailto:${SITE_CONFIG.email}`}
                            className="hover:text-primary transition-colors font-medium"
                        >
                            {SITE_CONFIG.email}
                        </a>
                    </div>

                    <ContactForm />
                </div>
            </div>
        </div>
    );
}
