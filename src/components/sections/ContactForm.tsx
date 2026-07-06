"use client";

import { useState, useRef } from "react";
import { Send } from "lucide-react";
import { sendEmail, ActionState } from "@/app/contact/actions";
import { Button } from "@/components/ui/Button";

export default function ContactForm() {
    const [isPending, setIsPending] = useState(false);
    const [state, setState] = useState<ActionState>({
        success: false,
        error: "",
    });
    const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
    const formRef = useRef<HTMLFormElement>(null);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsPending(true);
        setState({ success: false, error: "" });
        setFieldErrors({});

        const formData = new FormData(e.currentTarget);

        try {
            const result = await sendEmail(formData);

            if (result.success) {
                setState({ success: true, error: "" });
                if (formRef.current) {
                    formRef.current.reset();
                }
            } else {
                setState({ success: false, error: result.error });
                if (result.fieldErrors) {
                    setFieldErrors(result.fieldErrors);
                }
            }
        } catch (error) {
            setState({ success: false, error: "Something went wrong. Please try again." });
        } finally {
            setIsPending(false);
        }
    };

    const inputStyles = "w-full px-4 py-3 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all duration-200";
    const errorInputStyles = "border-red-500 focus:border-red-500 focus:ring-red-500/20";
    const normalInputStyles = "border-input focus:border-primary";

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
                        className={`${inputStyles} ${fieldErrors.name ? errorInputStyles : normalInputStyles}`}
                        required
                    />
                    {fieldErrors.name && (
                        <p className="text-sm text-red-500">{fieldErrors.name}</p>
                    )}
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
                        className={`${inputStyles} ${fieldErrors.email ? errorInputStyles : normalInputStyles}`}
                        required
                    />
                    {fieldErrors.email && (
                        <p className="text-sm text-red-500">{fieldErrors.email}</p>
                    )}
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
                    className={`${inputStyles} resize-none ${fieldErrors.message ? errorInputStyles : normalInputStyles}`}
                    required
                />
                {fieldErrors.message && (
                    <p className="text-sm text-red-500">{fieldErrors.message}</p>
                )}
            </div>

            {state.error && !Object.keys(fieldErrors).length && (
                <div className="p-4 text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
                    {state.error}
                </div>
            )}

            {state.success && (
                <div className="p-4 text-sm text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                    Message sent successfully!
                </div>
            )}

            <Button
                type="submit"
                variant="primary"
                size="md"
                isLoading={isPending}
                icon={<Send className="w-4 h-4" />}
                iconPosition="right"
                className="w-full md:w-auto"
            >
                Send Message
            </Button>


        </form>
    );
}
