import { Metadata } from "next";
import { Link } from "@/i18n/navigation";

import { setRequestLocale } from "next-intl/server";
import { localeAlternates, localePath, type Locale } from "@/i18n/config";
export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: string }>;
}): Promise<Metadata> {
    const { locale } = await params;
    return {

    title: "Legal Notice (Impressum) | SAHAD - Software Architect",
    description: "Legal notice and impressum complying with German and EU regulations. Professional contact details for SAHAD, Software Architect based in Dhaka, Bangladesh.",
        alternates: {
            canonical: localePath(locale as Locale, "/impressum"),
            languages: localeAlternates("/impressum"),
        },
    };
}

/**
 * Impressum / Legal Notice Page
 * German/EU Compliant Legal Disclosure
 */
export default async function ImpressumPage({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    setRequestLocale(locale);
    return (
        <main className="min-h-screen bg-background">
            <div className="max-w-reading mx-auto px-4 py-16 md:py-24">
                <h1 className="text-hero text-foreground mb-2">
                    Legal Notice (Impressum)
                </h1>
                <p className="text-muted-foreground mb-8">
                    Angabe gemäß § 5 TMG / German Telemedia Act
                </p>

                <div className="prose prose-slate dark:prose-invert max-w-none">
                    <section className="mb-10">
                        <h2 className="text-2xl font-semibold text-foreground mb-4">Service Provider</h2>
                        <div className="bg-muted/50 rounded-md p-6">
                            <p className="text-muted-foreground space-y-1">
                                <strong>Name:</strong> SAHADUZZAMAN<br />
                                <strong>Profession:</strong> Software Architect & Full-Stack Developer<br />
                                <strong>Location:</strong> Dhaka, Bangladesh<br />
                                <strong>Email:</strong> <a href="mailto:sahaduzzaman.cse@gmail.com" className="text-primary hover:underline">sahaduzzaman.cse@gmail.com</a><br />
                                <strong>GitHub:</strong> <a href="https://github.com/sahadcse" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">github.com/sahadcse</a>
                            </p>
                        </div>
                    </section>

                    <section className="mb-10">
                        <h2 className="text-2xl font-semibold text-foreground mb-4">Services Offered</h2>
                        <p className="text-muted-foreground leading-relaxed">
                            I provide premium software development services including:
                        </p>
                        <ul className="list-disc list-inside text-muted-foreground space-y-2 mt-4">
                            <li>Custom Next.js Websites & High-Converting Landing Pages</li>
                            <li>Enterprise Software & Internal Infrastructure Development</li>
                            <li>Technical Consulting & System Architecture Design</li>
                            <li>Fixed Developer Retainer for ongoing system management</li>
                            <li>Performance Optimization & Technical SEO Implementation</li>
                        </ul>
                    </section>

                    <section className="mb-10">
                        <h2 className="text-2xl font-semibold text-foreground mb-4">Professional Background</h2>
                        <p className="text-muted-foreground leading-relaxed">
                            I am an experienced software architect specializing in Next.js, NestJS, and enterprise-grade web applications. My work serves clients globally, including Australia, Germany, and the United States across healthcare, logistics, and e-commerce sectors.
                        </p>
                        <p className="text-muted-foreground leading-relaxed mt-4">
                            <strong>Technical Specializations:</strong> Full-stack development, database optimization (PostgreSQL, Redis), secure API architecture, and performance engineering.
                        </p>
                    </section>

                    <section className="mb-10">
                        <h2 className="text-2xl font-semibold text-foreground mb-4">Consumer Information / Dispute Resolution</h2>
                        <p className="text-muted-foreground leading-relaxed mb-4">
                            For consumers residing in the European Union, the following information applies:
                        </p>
                        <div className="bg-muted/50 rounded-md p-4">
                            <p className="text-muted-foreground space-y-1">
                                <strong>Platform for Online Dispute Resolution (ODR):</strong><br />
                                <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">https://ec.europa.eu/consumers/odr</a>
                            </p>
                        </div>
                        <p className="text-muted-foreground mt-4">
                            I am not obligated to participate in dispute resolution proceedings before a consumer arbitration board. However, I am committed to resolving any disputes amicably through direct communication.
                        </p>
                    </section>

                    <section className="mb-10">
                        <h2 className="text-2xl font-semibold text-foreground mb-4">Liability for Content</h2>
                        <p className="text-muted-foreground leading-relaxed">
                            As a service provider, I am responsible for my own content on this website according to general laws. I am not obliged to monitor transmitted or stored third-party information or investigate circumstances that indicate illegal activity. Obligations to remove or block the use of information under general laws remain unaffected per § 8-10 TMG.
                        </p>
                    </section>

                    <section className="mb-10">
                        <h2 className="text-2xl font-semibold text-foreground mb-4">Copyright & Licensing</h2>
                        <p className="text-muted-foreground leading-relaxed">
                            All content on this website, including text, images, design elements, and code (unless explicitly stated as open-source), is my intellectual property. Unauthorized reproduction, distribution, or modification is prohibited. Used third-party components (frameworks, libraries, fonts) remain subject to their respective licenses.
                        </p>
                    </section>

                    <section className="mb-10">
                        <h2 className="text-2xl font-semibold text-foreground mb-4">External Links</h2>
                        <p className="text-muted-foreground leading-relaxed">
                            This website may contain links to external websites (GitHub, LinkedIn, project live sites). I have no influence over the content and nature of these external sites. Therefore, I cannot guarantee the accuracy, completeness, or legality of external content. Inclusion of links does not constitute endorsement of linked content.
                        </p>
                    </section>

                    <section className="mb-10">
                        <h2 className="text-2xl font-semibold text-foreground mb-4">Data Privacy (GDPR)</h2>
                        <p className="text-muted-foreground leading-relaxed mb-4">
                            I take data protection seriously. Please refer to my comprehensive <Link href="/privacy" className="text-primary hover:underline font-medium">Privacy Policy</Link> for details on:
                        </p>
                        <ul className="list-disc list-inside text-muted-foreground space-y-1">
                            <li>Data collection practices</li>
                            <li>Your rights under GDPR and Australian Privacy Act</li>
                            <li>Security measures implemented</li>
                            <li>Contact for privacy-related inquiries</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-foreground mb-4">General Inquiries</h2>
                        <p className="text-muted-foreground leading-relaxed">
                            For any questions regarding this legal notice, my services, or other inquiries, please contact:
                        </p>
                        <div className="mt-4 p-4 bg-muted/50 rounded-md">
                            <p className="text-muted-foreground">
                                <strong>Email:</strong> <a href="mailto:sahaduzzaman.cse@gmail.com" className="text-primary hover:underline">sahaduzzaman.cse@gmail.com</a><br />
                                <strong>Response Time:</strong> Typically within 24-48 hours on business days
                            </p>
                        </div>
                    </section>
                </div>
            </div>
        </main>
    );
}
