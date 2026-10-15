"use client";

import { useState, useRef } from "react";
import { Send } from "lucide-react";
import { sendEmail, ActionState } from "@/app/[locale]/contact/actions";
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

    const inputStyles = "w-full px-4 py-3 rounded-sm border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all duration-200";
    const errorInputStyles = "border-destructive focus:border-destructive focus:ring-destructive/20";
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
                        <p className="text-sm text-destructive">{fieldErrors.name}</p>
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
                        <p className="text-sm text-destructive">{fieldErrors.email}</p>
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
                    <p className="text-sm text-destructive">{fieldErrors.message}</p>
                )}
            </div>

            {state.error && !Object.keys(fieldErrors).length && (
                <div className="p-4 text-sm text-destructive bg-destructive/10 rounded-md border border-destructive/30">
                    {state.error}
                </div>
            )}

            {state.success && (
                <div className="p-4 text-sm text-success bg-success/10 rounded-md border border-success/30">
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
