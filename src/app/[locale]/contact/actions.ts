// src/app/[locale]/contact/actions.ts

"use server";

import nodemailer from "nodemailer";
import { z } from "zod";

/**
 * Zod schema for contact form validation.
 * Messages are STABLE ERROR CODES — the client form translates them via
 * the message layer (server has no locale context). Unknown codes fall
 * back to the raw string in the UI.
 * inquiryType is a closed set from the form's radio group; budget is an
 * optional free-text field for client-side inquiries.
 */
const INQUIRY_TYPES = ["hiring", "project", "improve", "collaborate"] as const;

const contactFormSchema = z.object({
    name: z.string()
        .min(2, "nameMin")
        .max(100, "nameMax")
        .trim(),
    email: z.string()
        .email("emailInvalid")
        .max(254, "emailTooLong")
        .toLowerCase()
        .trim(),
    message: z.string()
        .min(10, "messageMin")
        .max(2000, "messageMax")
        .trim(),
    inquiryType: z.enum(INQUIRY_TYPES).default("project"),
    budget: z.string().max(200, "budgetTooLong").trim().optional().default(""),
});

/**
 * Result types for the contact form action
 */
interface SuccessResult {
    success: true;
    error: "";
    fieldErrors?: never;
}

interface ErrorResult {
    success: false;
    error: string;
    fieldErrors?: Record<string, string>;
}

export type ActionState = SuccessResult | ErrorResult;

/**
 * HTML escape utility to prevent XSS attacks in email templates
 * Escapes: & < > " '
 */
function escapeHtml(unsafe: string): string {
    return unsafe
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
}

/**
 * Server action to send contact form email via SMTP.
 * Includes input validation, XSS protection, and a honeypot spam trap:
 * bots that fill the hidden "website" field receive a fake success and
 * nothing is sent (standard silent-drop practice — no signal to the bot).
 */
export async function sendEmail(formData: FormData): Promise<ActionState> {
    // Honeypot: human users never see this field, so any value means a bot.
    if ((formData.get("website") as string)?.trim()) {
        return { success: true, error: "" };
    }

    // Extract raw values from FormData
    const rawName = formData.get("name");
    const rawEmail = formData.get("email");
    const rawMessage = formData.get("message");
    const rawInquiryType = formData.get("inquiryType");
    const rawBudget = formData.get("budget");

    // Validate that required fields are present
    if (!rawName || !rawEmail || !rawMessage) {
        return {
            success: false,
            error: "fixErrors",
            fieldErrors: {
                ...(rawName ? {} : { name: "nameRequired" }),
                ...(rawEmail ? {} : { email: "emailRequired" }),
                ...(rawMessage ? {} : { message: "messageRequired" }),
            }
        };
    }

    // Parse and validate using Zod schema
    const validationResult = contactFormSchema.safeParse({
        name: rawName,
        email: rawEmail,
        message: rawMessage,
        inquiryType: rawInquiryType ?? undefined,
        budget: rawBudget ?? undefined,
    });

    if (!validationResult.success) {
        // Extract field-level errors for better UX
        const fieldErrors: Record<string, string> = {};
        validationResult.error.issues.forEach((issue) => {
            if (issue.path.length > 0) {
                const field = issue.path[0] as string;
                fieldErrors[field] = issue.message;
            }
        });

        return {
            success: false,
            error: "fixErrors",
            fieldErrors,
        };
    }

    // Validated data
    const { name, email, message, inquiryType, budget } = validationResult.data;

    try {
        const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_FROM } = process.env;

        if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
            console.error("Missing SMTP environment variables");
            return {
                success: false,
                error: "serverConfig"
            };
        }

        const transporter = nodemailer.createTransport({
            host: SMTP_HOST,
            port: Number(SMTP_PORT) || 587,
            secure: Number(SMTP_PORT) === 465,
            auth: {
                user: SMTP_USER,
                pass: SMTP_PASS,
            },
        });

        // Verify connection configuration
        await transporter.verify();

        // Escape HTML to prevent XSS in email template
        const safeName = escapeHtml(name);
        const safeEmail = escapeHtml(email);
        const safeMessage = escapeHtml(message);
        const safeBudget = escapeHtml(budget || "—");
        const safeInquiry = escapeHtml(inquiryType);

        await transporter.sendMail({
            from: SMTP_FROM || SMTP_USER,
            to: SMTP_USER,
            replyTo: email,
            subject: `[${safeInquiry}] New Contact Form Submission from ${safeName}`,
            text: `Inquiry type: ${inquiryType}\nBudget/scope: ${budget || "—"}\n\n${message}`,
            html: `
                <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
                    <div style="background-color: white; padding: 30px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                        <h2 style="color: #333; margin-top: 0;">New Contact Form Submission</h2>
                        <p style="margin: 10px 0;"><strong>Inquiry type:</strong> ${safeInquiry}</p>
                        <p style="margin: 10px 0;"><strong>Budget / scope:</strong> ${safeBudget}</p>
                        <p style="margin: 10px 0;"><strong>Name:</strong> ${safeName}</p>
                        <p style="margin: 10px 0;"><strong>Email:</strong> <a href="mailto:${safeEmail}">${safeEmail}</a></p>
                        <hr style="margin: 20px 0; border: none; border-top: 1px solid #eee;" />
                        <p style="margin: 10px 0;"><strong>Message:</strong></p>
                        <p style="white-space: pre-wrap; margin: 10px 0; color: #555; line-height: 1.6;">${safeMessage}</p>
                    </div>
                    <p style="text-align: center; color: #999; font-size: 12px; margin-top: 20px;">
                        This message was sent from your portfolio contact form.
                    </p>
                </div>
            `,
        });

        return { success: true, error: "" };
    } catch (error) {
        console.error("Error sending email:", error);
        return { success: false, error: "sendFailed" };
    }
}
