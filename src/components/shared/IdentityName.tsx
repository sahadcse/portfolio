import React from "react";

/**
 * Identity element (user brief §4): renders the owner's name with the
 * shared accent treatment (uppercase + primary color via the
 * `.identity-name` utility). Server-safe — no client hooks. Screen readers
 * read the natural case from the source; only the visual is uppercased.
 * Never apply to client or project names.
 */
export function IdentityName({
    children,
    className = "",
}: {
    children: React.ReactNode;
    className?: string;
}) {
    return <span className={`identity-name ${className}`.trim()}>{children}</span>;
}
