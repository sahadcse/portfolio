import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Terms of Service | SAHAD - Software Architect",
    description: "Terms of Service outlining independent contractor relationship, service delivery timelines, source code ownership, and liability limitations.",
};

/**
 * Terms of Service Page
 * Standard service terms for international clients
 */
export default function TermsPage() {
    return (
        <main className="min-h-screen bg-background">
            <div className="max-w-3xl mx-auto px-4 py-20">
                <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white mb-8">
                    Terms of Service
                </h1>

                <div className="prose prose-slate dark:prose-invert max-w-none">
                    <p className="text-slate-600 dark:text-slate-400 mb-8">
                        Last updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
                    </p>

                    <section className="mb-10">
                        <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-4">1. Acceptance of Terms</h2>
                        <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                            By engaging my services, accessing my portfolio, or requesting a project consultation, you agree to these Terms of Service. If you do not agree with these terms, please refrain from using my services.
                        </p>
                    </section>

                    <section className="mb-10">
                        <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-4">2. Independent Contractor Relationship</h2>
                        <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                            I operate as an <strong>independent contractor</strong>, not as an employee, partner, or agent of your organization. This agreement does not create:
                        </p>
                        <ul className="list-disc list-inside text-slate-600 dark:text-slate-400 space-y-2 mb-4">
                            <li>An employer-employee relationship</li>
                            <li>A joint venture or partnership</li>
                            <li>An agency relationship</li>
                        </ul>
                        <p className="text-slate-600 dark:text-slate-400">
                            You are responsible for all tax withholdings, insurance, and statutory obligations applicable to your jurisdiction. I am responsible for my own tax obligations and business operations in Bangladesh.
                        </p>
                    </section>

                    <section className="mb-10">
                        <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-4">3. Service Delivery & Timelines</h2>
                        <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                            Estimated delivery timelines are provided based on project scope and complexity:
                        </p>
                        <ul className="list-disc list-inside text-slate-600 dark:text-slate-400 space-y-2 mb-4">
                            <li><strong>Premium Websites & Landing Pages:</strong> Typically <span className="text-cyan-600 dark:text-cyan-400">3 to 7 business days</span> from design approval to deployment</li>
                            <li><strong>Custom Enterprise Software:</strong> Timeline calculated based on specific operational requirements, typically 2-8 weeks depending on complexity</li>
                            <li><strong>Fixed Developer Retainer:</strong> Ongoing monthly service with deliverables as defined in the retainer agreement</li>
                        </ul>
                        <p className="text-slate-600 dark:text-slate-400">
                            Timelines are estimates and may vary based on client feedback cycles, content availability, and unforeseen technical challenges. Delays caused by client actions (such as delayed feedback or content provision) are not included in estimated timelines.
                        </p>
                    </section>

                    <section className="mb-10">
                        <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-4">4. Client Responsibilities</h2>
                        <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                            To ensure smooth project delivery, you agree to:
                        </p>
                        <ul className="list-disc list-inside text-slate-600 dark:text-slate-400 space-y-2 mb-4">
                            <li>Provide accurate project requirements and necessary materials (text, images, branding assets) in a timely manner</li>
                            <li>Respond to design mockups, prototypes, and milestone deliverables within 3-5 business days</li>
                            <li>Provide access to third-party services (domain registrars, hosting accounts, APIs) when required</li>
                            <li>Ensure all provided content (images, text, media) complies with copyright and intellectual property laws</li>
                            <li>Provide final approval before production deployment</li>
                        </ul>
                        <p className="text-slate-600 dark:text-slate-400">
                            Delays caused by failure to fulfill these responsibilities may extend project timelines and are not eligible for refund or compensation claims.
                        </p>
                    </section>

                    <section className="mb-10">
                        <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-4">5. Source Code & Intellectual Property Ownership</h2>
                        <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                            Upon <strong>full payment settlement</strong>, you receive:
                        </p>
                        <ul className="list-disc list-inside text-slate-600 dark:text-slate-400 space-y-2 mb-4">
                            <li><strong>100% ownership</strong> of all custom source code developed for your project</li>
                            <li>Complete repository access transferred to your GitHub or preferred cloud account</li>
                            <li>All production assets, design files, and deployment configurations</li>
                            <li>Full intellectual property rights to the custom deliverables</li>
                        </ul>
                        <p className="text-slate-600 dark:text-slate-400">
                            Until full payment is received, all intellectual property remains with me. Third-party libraries, frameworks, and open-source components remain subject to their respective licenses.
                        </p>
                    </section>

                    <section className="mb-10">
                        <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-4">6. Payment Terms</h2>
                        <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                            Payment structures are agreed upon before project commencement:
                        </p>
                        <ul className="list-disc list-inside text-slate-600 dark:text-slate-400 space-y-2 mb-4">
                            <li><strong>Fixed-Price Projects:</strong> Typically 50% upfront, 50% upon delivery</li>
                            <li><strong>Fixed Developer Retainer:</strong> Monthly invoicing, payable in advance of each billing cycle</li>
                            <li><strong>Hourly Consultation:</strong> Invoiced monthly, payable within 14 days of invoice date</li>
                        </ul>
                        <p className="text-slate-600 dark:text-slate-400">
                            Late payments may incur a 2% monthly fee or maximum legal interest rate, whichever is lower. Project delivery may be paused for accounts 30+ days overdue.
                        </p>
                    </section>

                    <section className="mb-10">
                        <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-4">7. Revisions & Changes</h2>
                        <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                            Reasonable revision rounds are included in project scope:
                        </p>
                        <ul className="list-disc list-inside text-slate-600 dark:text-slate-400 space-y-2 mb-4">
                            <li><strong>Design & Layout:</strong> Up to 3 revision rounds on initial mockups</li>
                            <li><strong>Development:</strong> Bug fixes and functionality adjustments included for 30 days post-launch</li>
                            <li><strong>Scope Changes:</strong> Significant changes beyond original scope may incur additional fees</li>
                        </ul>
                        <p className="text-slate-600 dark:text-slate-400">
                            "Scope creep" (continuous addition of new requirements) will be addressed through change orders with adjusted timelines and fees.
                        </p>
                    </section>

                    <section className="mb-10">
                        <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-4">8. Limitation of Liability</h2>
                        <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                            My liability is limited as follows:
                        </p>
                        <ul className="list-disc list-inside text-slate-600 dark:text-slate-400 space-y-2 mb-4">
                            <li>I am not liable for damages resulting from third-party hosting providers, domain registrars, or external service outages</li>
                            <li>I am not responsible for content you provide or post on your website after handover</li>
                            <li>I am not liable for lost profits, revenue, or indirect damages resulting from service interruptions</li>
                            <li>Total liability is limited to the amount paid for the specific service in question</li>
                        </ul>
                        <p className="text-slate-600 dark:text-slate-400">
                            I strive for 100% uptime and performance but cannot guarantee uninterrupted service due to factors beyond my control (internet infrastructure, CDN outages, etc.).
                        </p>
                    </section>

                    <section className="mb-10">
                        <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-4">9. Warranty & Support</h2>
                        <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                            Post-launch support is included as follows:
                        </p>
                        <ul className="list-disc list-inside text-slate-600 dark:text-slate-400 space-y-2 mb-4">
                            <li><strong>30-Day Bug-Free Warranty:</strong> Any bugs or defects discovered within 30 days of launch will be fixed at no additional cost</li>
                            <li><strong>Performance Monitoring:</strong> I will address Core Web Vitals or performance issues reported during warranty period</li>
                            <li><strong>Fixed Retainer Clients:</strong> Ongoing support, security updates, and performance optimization included monthly</li>
                        </ul>
                        <p className="text-slate-600 dark:text-slate-400">
                            Warranty does not cover issues caused by third-party plugin updates, content changes, or external API changes beyond my control.
                        </p>
                    </section>

                    <section className="mb-10">
                        <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-4">10. Termination</h2>
                        <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                            Either party may terminate our engagement with written notice. Upon termination, you will be billed for completed work up to that point. Any prepaid amounts for uncompleted work will be prorated and refunded within 30 days.
                        </p>
                    </section>

                    <section className="mb-10">
                        <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-4">11. Governing Law & Dispute Resolution</h2>
                        <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                            These terms are governed by the laws of Bangladesh. Any disputes shall be resolved through good-faith negotiation. If unresolved, parties agree to mediation in Dhaka, Bangladesh, before pursuing any legal action.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-4">12. Contact</h2>
                        <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                            For questions about these Terms of Service, contact:
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
