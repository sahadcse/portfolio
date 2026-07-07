import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Privacy Policy | SAHAD - Software Architect",
    description: "Privacy Policy detailing data collection, usage, and protection practices in compliance with GDPR and Australian Privacy Act standards.",
};

/**
 * Privacy Policy Page
 * GDPR (Europe) & Privacy Act (Australia) Compliant
 */
export default function PrivacyPage() {
    return (
        <main className="min-h-screen bg-background">
            <div className="max-w-3xl mx-auto px-4 py-20">
                <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white mb-8">
                    Privacy Policy
                </h1>

                <div className="prose prose-slate dark:prose-invert max-w-none">
                    <p className="text-slate-600 dark:text-slate-400 mb-8">
                        Last updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
                    </p>

                    <section className="mb-10">
                        <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-4">1. Information Collection</h2>
                        <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                            I collect minimal personal information necessary to provide my services and communicate with clients. This includes:
                        </p>
                        <ul className="list-disc list-inside text-slate-600 dark:text-slate-400 space-y-2 mb-4">
                            <li>Name (via contact form or direct email)</li>
                            <li>Email address (for project communication and invoicing)</li>
                            <li>Business requirements and project specifications (shared via email or collaboration tools)</li>
                            <li>Optional: Company name, website URL, and social media handles (for portfolio and case studies with prior consent)</li>
                        </ul>
                        <p className="text-slate-600 dark:text-slate-400">
                            I do not collect sensitive personal data such as government IDs, financial information, or health records unless explicitly required for a specific project and with your written consent.
                        </p>
                    </section>

                    <section className="mb-10">
                        <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-4">2. Data Usage</h2>
                        <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                            Any information collected is used solely for:
                        </p>
                        <ul className="list-disc list-inside text-slate-600 dark:text-slate-400 space-y-2 mb-4">
                            <li>Project scoping, requirement gathering, and service delivery</li>
                            <li>Client communication and status updates</li>
                            <li>Invoicing and payment processing</li>
                            <li>Post-launch support and maintenance (if applicable)</li>
                        </ul>
                        <p className="text-slate-600 dark:text-slate-400">
                            Your data is never sold, rented, or shared with third parties for marketing purposes.
                        </p>
                    </section>

                    <section className="mb-10">
                        <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-4">3. Data Protection & Security</h2>
                        <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                            I take data protection seriously and implement reasonable security measures to protect your information:
                        </p>
                        <ul className="list-disc list-inside text-slate-600 dark:text-slate-400 space-y-2 mb-4">
                            <li>All credentials are stored securely using environment variables and secret management systems</li>
                            <li>Source code and sensitive configuration files are never committed to public repositories</li>
                            <li>Third-party services (hosting, databases, APIs) are chosen based on their security and compliance standards</li>
                            <li>Project handover includes complete transfer of all data and access credentials to your ownership</li>
                        </ul>
                        <p className="text-slate-600 dark:text-slate-400">
                            However, please note that no method of transmission or storage is 100% secure. While I strive to protect your data, I cannot guarantee absolute security.
                        </p>
                    </section>

                    <section className="mb-10">
                        <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-4">4. Cookies & Tracking</h2>
                        <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                            My portfolio website may use minimal cookies for essential functionality:
                        </p>
                        <ul className="list-disc list-inside text-slate-600 dark:text-slate-400 space-y-2 mb-4">
                            <li><strong>Essential cookies:</strong> Required for basic site functionality (theme preference, navigation state)</li>
                            <li><strong>Analytics cookies:</strong> May be used to understand site traffic and usage patterns (e.g., Vercel Analytics)</li>
                        </ul>
                        <p className="text-slate-600 dark:text-slate-400">
                            You can disable cookies through your browser settings. Note that this may affect site functionality.
                        </p>
                    </section>

                    <section className="mb-10">
                        <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-4">5. Your Rights (GDPR & Privacy Act)</h2>
                        <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                            Depending on your location, you may have the following rights:
                        </p>
                        <ul className="list-disc list-inside text-slate-600 dark:text-slate-400 space-y-2 mb-4">
                            <li><strong>Right to Access:</strong> Request a copy of your personal data</li>
                            <li><strong>Right to Rectification:</strong> Request correction of inaccurate data</li>
                            <li><strong>Right to Erasure:</strong> Request deletion of your personal data (where legally permissible)</li>
                            <li><strong>Right to Portability:</strong> Request data transfer to another service</li>
                            <li><strong>Right to Object:</strong> Object to processing of your personal data</li>
                        </ul>
                        <p className="text-slate-600 dark:text-slate-400">
                            To exercise these rights, contact me at <a href="mailto:sahaduzzaman.cse@gmail.com" className="text-cyan-600 dark:text-cyan-400 hover:underline">sahaduzzaman.cse@gmail.com</a>.
                        </p>
                    </section>

                    <section className="mb-10">
                        <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-4">6. Data Retention</h2>
                        <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                            I retain your personal information only as long as necessary for the purposes outlined in this policy, or as required by law. Upon project completion and final handover, you may request deletion of any retained communications or data.
                        </p>
                    </section>

                    <section className="mb-10">
                        <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-4">7. International Data Transfers</h2>
                        <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                            As I work with international clients, your information may be processed and stored in countries other than your own. I ensure that any cross-border data transfers comply with applicable data protection laws and implement appropriate safeguards.
                        </p>
                    </section>

                    <section className="mb-10">
                        <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-4">8. Children's Privacy</h2>
                        <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                            My services are not intended for individuals under the age of 16. I do not knowingly collect personal information from children. If you are a parent or guardian and believe your child has provided personal information, please contact me for deletion.
                        </p>
                    </section>

                    <section className="mb-10">
                        <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-4">9. Changes to This Policy</h2>
                        <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                            I may update this privacy policy from time to time. Significant changes will be communicated via email or prominent notice on this website. Your continued use of my services after such changes constitutes acceptance of the updated policy.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-4">10. Contact</h2>
                        <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                            For any questions, concerns, or requests regarding this privacy policy or your personal data, please contact:
                        </p>
                        <div className="mt-4 p-4 bg-slate-50 dark:bg-slate-900/50 rounded-lg">
                            <p className="text-slate-600 dark:text-slate-400">
                                <strong>Name:</strong> SAHAD<br />
                                <strong>Email:</strong> <a href="mailto:sahaduzzaman.cse@gmail.com" className="text-cyan-600 dark:text-cyan-400 hover:underline">sahaduzzaman.cse@gmail.com</a><br />
                                <strong>Location:</strong> Dhaka, Bangladesh
                            </p>
                        </div>
                    </section>
                </div>
            </div>
        </main>
    );
}
