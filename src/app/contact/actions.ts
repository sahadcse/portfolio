// src/app/contact/actions.ts

"use server";

import nodemailer from "nodemailer";

interface ActionState {
    success: boolean;
    error: string;
}

export async function sendEmail(formData: FormData): Promise<ActionState> {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const message = formData.get("message") as string;

    if (!name || !email || !message) {
        return { success: false, error: "Missing required fields" };
    }

    try {
        const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_FROM } = process.env;

        if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
            console.error("Missing SMTP environment variables");
            return {
                success: false,
                error: "Server configuration error. Please contact the administrator."
            };
        }

        const transporter = nodemailer.createTransport({
            host: SMTP_HOST,
            port: Number(SMTP_PORT) || 587,
            secure: Number(SMTP_PORT) === 465, // true for 465, false for other ports
            auth: {
                user: SMTP_USER,
                pass: SMTP_PASS,
            },
        });

        // Verify connection configuration
        await transporter.verify();

        await transporter.sendMail({
            from: SMTP_FROM || SMTP_USER, // sender address
            to: SMTP_USER, // send to self
            replyTo: email, // reply to user
            subject: `New Contact Form Submission from ${name}`,
            text: message,
            html: `
                <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2>New Contact Form Submission</h2>
                    <p><strong>Name:</strong> ${name}</p>
                    <p><strong>Email:</strong> ${email}</p>
                    <hr />
                    <p><strong>Message:</strong></p>
                    <p style="white-space: pre-wrap;">${message}</p>
                </div>
            `,
        });

        return { success: true, error: "" };
    } catch (error) {
        console.error("Error sending email:", error);
        return { success: false, error: "Failed to send email. Please try again later." };
    }
}
