"use client";

import { useState, useRef } from "react";
import { Send, Loader2 } from "lucide-react";

const initialState = {
    success: false,
    error: "",
};

export default function ContactForm() {
    const [isPending, setIsPending] = useState(false);
    const [state, setState] = useState<{ success: boolean; error: string }>({
        success: false,
        error: "",
    });
    const formRef = useRef<HTMLFormElement>(null);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsPending(true);
        setState({ success: false, error: "" });

        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries());

        // Simulate network delay
        await new Promise((resolve) => setTimeout(resolve, 1500));

        // For static portfolio, we'll just log to console and show success
        // In a real static site, you'd use Formspree, EmailJS, or similar
        console.log("Form submitted:", data);

        setIsPending(false);
        setState({ success: true, error: "" });

        if (formRef.current) {
            formRef.current.reset();
        }
    };

    return (
        <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium">
                        Name
                    </label>
                    <input
                        id="name"
                        name="name"
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
                        name="email"
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
                    name="message"
                    placeholder="Tell me about your project..."
                    rows={6}
                    className="w-full px-4 py-3 rounded-md border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none"
                    required
                />
            </div>

            {state.error && (
                <div className="p-3 text-sm text-red-500 bg-red-50 dark:bg-red-900/20 rounded-md">
                    {state.error}
                </div>
            )}

            {state.success && (
                <div className="p-3 text-sm text-green-500 bg-green-50 dark:bg-green-900/20 rounded-md">
                    Message sent successfully! (Demo mode)
                </div>
            )}

            <button
                type="submit"
                disabled={isPending}
                className="inline-flex items-center justify-center px-8 py-3 rounded-md bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors w-full md:w-auto disabled:opacity-70 disabled:cursor-not-allowed"
            >
                {isPending ? (
                    <>
                        Sending...
                        <Loader2 className="ml-2 w-4 h-4 animate-spin" />
                    </>
                ) : (
                    <>
                        Send Message
                        <Send className="ml-2 w-4 h-4" />
                    </>
                )}
            </button>
        </form>
    );
}
