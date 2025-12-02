import { SITE_CONFIG } from "@/lib/data";
import { Metadata } from "next";
import { Mail, Send } from "lucide-react";

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

                    <form className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label htmlFor="name" className="text-sm font-medium">
                                    Name
                                </label>
                                <input
                                    id="name"
                                    type="text"
                                    placeholder="John Doe"
                                    className="w-full px-4 py-3 rounded-md border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="email" className="text-sm font-medium">
                                    Email
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    placeholder="john@example.com"
                                    className="w-full px-4 py-3 rounded-md border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="message" className="text-sm font-medium">
                                Message
                            </label>
                            <textarea
                                id="message"
                                placeholder="Tell me about your project..."
                                rows={6}
                                className="w-full px-4 py-3 rounded-md border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="inline-flex items-center justify-center px-8 py-3 rounded-md bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors w-full md:w-auto"
                        >
                            Send Message
                            <Send className="ml-2 w-4 h-4" />
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
