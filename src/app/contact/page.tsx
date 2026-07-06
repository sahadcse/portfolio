import { SITE_CONFIG } from "@/data/site-config";
import { Metadata } from "next";
import { Mail } from "lucide-react";
import ContactForm from "@/components/sections/ContactForm";

export const metadata: Metadata = {
    title: "Contact",
    description: "Get in touch for collaboration or inquiries.",
};

export default function ContactPage() {
    return (
        <div className="container mx-auto px-4 py-20">
            <div className="max-w-2xl mx-auto">
                <h1 className="text-4xl font-bold mb-4 font-mono">Get in Touch</h1>
                <p className="text-muted-foreground mb-12">
                    Interested in working together? Fill out the form below or send me an email.
                </p>

                <div className="grid gap-12">
                    <div className="flex items-center space-x-3 text-lg">
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
