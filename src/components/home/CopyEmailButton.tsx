"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

/**
 * Click-to-copy email (plan §8.6: a distinctive personal-brand affordance).
 */
export default function CopyEmailButton({
    email,
    copyLabel,
    copiedLabel,
}: {
    email: string;
    copyLabel: string;
    copiedLabel: string;
}) {
    const [copied, setCopied] = useState(false);

    const copy = async () => {
        try {
            await navigator.clipboard.writeText(email);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch {
            // Clipboard unavailable (permissions/insecure context) — the
            // mailto link next to it still works; silently ignore.
        }
    };

    return (
        <button
            type="button"
            onClick={copy}
            className="inline-flex items-center gap-1.5 rounded-sm border border-border bg-background px-2.5 py-1.5 text-mono text-muted-foreground hover:text-foreground hover:border-primary/40 transition-colors"
            aria-live="polite"
        >
            {copied ? (
                <>
                    <Check className="w-3.5 h-3.5 text-success" aria-hidden="true" />
                    {copiedLabel}
                </>
            ) : (
                <>
                    <Copy className="w-3.5 h-3.5" aria-hidden="true" />
                    {copyLabel}
                </>
            )}
        </button>
    );
}
