"use client";

import { useActionState } from "react";
import { sendEmail } from "@/app/actions/sendEmail";
import { Send, Loader2 } from "lucide-react";
import { useEffect, useRef } from "react";

const initialState = {
    success: false,
    error: "",
};

export default function ContactForm() {
    // @ts-ignore - React 19 types might be slightly different or older types installed, but this signature is standard for useActionState/useFormState
    const [state, formAction, isPending] = useActionState(sendEmail, initialState);
    const formRef = useRef<HTMLFormElement>(null);

    useEffect(() => {
        if (state.success && formRef.current) {
            formRef.current.reset();
        }
    }, [state.success]);

    return (
        <form ref={formRef} action={formAction} className="space-y-6">
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
                    Message sent successfully! I'll get back to you soon.
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
