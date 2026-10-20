"use client";

import { useState, useRef } from "react";
import { useTranslations } from "next-intl";
import { Send } from "lucide-react";
import { sendEmail, ActionState } from "@/app/[locale]/contact/actions";
import { Button } from "@/components/ui/Button";

/**
 * Contact form (user brief §4): required name/email/message + an inquiry
 * type the visitor chooses up front, an optional budget/scope field that
 * appears for client-type inquiries, and a honeypot spam trap. All new
 * labels/errors flow through the message layer; the submission action
 * keeps its existing validation and delivery behavior.
 */
const INQUIRY_OPTIONS = ["hiring", "project", "improve", "collaborate"] as const;

export default function ContactForm() {
    const t = useTranslations("contact.form");
    const [isPending, setIsPending] = useState(false);
    const [state, setState] = useState<ActionState>({
        success: false,
        error: "",
    });
    const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
    const [inquiryType, setInquiryType] = useState<string>("project");
    const formRef = useRef<HTMLFormElement>(null);

    /**
     * Server-side validation messages arrive as stable error codes (the
     * server has no locale context); this translates them via the message
     * layer. Unknown codes render as-is so nothing is silently swallowed.
     */
    const localizeError = (code: string) => {
        try {
            return t(`errors.${code}`);
        } catch {
            return code;
        }
    };

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
                setState({ success: false, error: localizeError(result.error) });
                if (result.fieldErrors) {
                    setFieldErrors(
                        Object.fromEntries(
                            Object.entries(result.fieldErrors).map(([field, code]) => [
                                field,
                                localizeError(code),
                            ])
                        )
                    );
                }
            }
        } catch {
            setState({ success: false, error: localizeError("generic") });
        } finally {
            setIsPending(false);
        }
    };

    const inputStyles =
        "w-full px-4 py-3 rounded-sm border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all duration-200";
    const errorInputStyles =
        "border-destructive focus:border-destructive focus:ring-destructive/20";
    const normalInputStyles = "border-input focus:border-primary";

    // Budget is relevant when the visitor brings work, not when they bring a job offer
    const showBudget = inquiryType === "project" || inquiryType === "improve";

    return (
        <form ref={formRef} onSubmit={handleSubmit} className="space-y-6" noValidate>
            {/* Honeypot — zero-size hidden wrapper (direction-safe: no physical
                off-screen offsets that become scrollable overflow in RTL) */}
            <div className="h-0 w-0 overflow-hidden" aria-hidden="true">
                <label htmlFor="website">Website</label>
                <input
                    id="website"
                    name="website"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                />
            </div>

            {/* Inquiry type — radio group styled as selectable chips */}
            <fieldset>
                <legend className="text-label mb-3">{t("inquiryLabel")}</legend>
                <div className="flex flex-wrap gap-2">
                    {INQUIRY_OPTIONS.map((option) => (
                        <label
                            key={option}
                            className={`cursor-pointer text-label rounded-full border px-4 py-2 transition-colors ${
                                inquiryType === option
                                    ? "border-primary bg-primary/10 text-primary"
                                    : "border-border text-muted-foreground hover:text-foreground hover:border-primary/40"
                            }`}
                        >
                            <input
                                type="radio"
                                name="inquiryType"
                                value={option}
                                checked={inquiryType === option}
                                onChange={() => setInquiryType(option)}
                                className="sr-only"
                            />
                            {t(`inquiryOptions.${option}`)}
                        </label>
                    ))}
                </div>
            </fieldset>

            {showBudget && (
                <div className="space-y-2">
                    <label htmlFor="budget" className="text-label">
                        {t("budgetLabel")}
                    </label>
                    <input
                        id="budget"
                        name="budget"
                        type="text"
                        placeholder={t("budgetPlaceholder")}
                        dir="auto"
                        maxLength={200}
                        className={`${inputStyles} ${normalInputStyles}`}
                    />
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label htmlFor="name" className="text-label">
                        {t("nameLabel")}
                    </label>
                    <input
                        id="name"
                        name="name"
                        type="text"
                        placeholder={t("namePlaceholder")}
                        dir="auto"
                        aria-invalid={fieldErrors.name ? true : undefined}
                        aria-describedby={fieldErrors.name ? "name-error" : undefined}
                        className={`${inputStyles} ${fieldErrors.name ? errorInputStyles : normalInputStyles}`}
                        required
                    />
                    {fieldErrors.name && (
                        <p id="name-error" className="text-sm text-destructive">
                            {fieldErrors.name}
                        </p>
                    )}
                </div>
                <div className="space-y-2">
                    <label htmlFor="email" className="text-label">
                        {t("emailLabel")}
                    </label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        placeholder={t("emailPlaceholder")}
                        dir="auto"
                        aria-invalid={fieldErrors.email ? true : undefined}
                        aria-describedby={fieldErrors.email ? "email-error" : undefined}
                        className={`${inputStyles} ${fieldErrors.email ? errorInputStyles : normalInputStyles}`}
                        required
                    />
                    {fieldErrors.email && (
                        <p id="email-error" className="text-sm text-destructive">
                            {fieldErrors.email}
                        </p>
                    )}
                </div>
            </div>

            <div className="space-y-2">
                <label htmlFor="message" className="text-label">
                    {t("messageLabel")}
                </label>
                <textarea
                    id="message"
                    name="message"
                    placeholder={t("messagePlaceholder")}
                    rows={6}
                    dir="auto"
                    aria-invalid={fieldErrors.message ? true : undefined}
                    aria-describedby={fieldErrors.message ? "message-error" : undefined}
                    className={`${inputStyles} resize-none ${fieldErrors.message ? errorInputStyles : normalInputStyles}`}
                    required
                />
                {fieldErrors.message && (
                    <p id="message-error" className="text-sm text-destructive">
                        {fieldErrors.message}
                    </p>
                )}
            </div>

            {state.error && !Object.keys(fieldErrors).length && (
                <div
                    role="alert"
                    className="p-4 text-sm text-destructive bg-destructive/10 rounded-md border border-destructive/30"
                >
                    {state.error}
                </div>
            )}

            {state.success && (
                <div role="status" aria-live="polite" className="p-4 text-sm text-success bg-success/10 rounded-md border border-success/30">
                    {t("success")}
                </div>
            )}

            <Button
                type="submit"
                variant="primary"
                size="md"
                isLoading={isPending}
                icon={<Send className="w-4 h-4 rtl:rotate-180" />}
                iconPosition="right"
                className="w-full md:w-auto"
            >
                {isPending ? t("submitting") : t("submit")}
            </Button>

            <p className="text-mono text-muted-foreground">{t("consentNote")}</p>
        </form>
    );
}
