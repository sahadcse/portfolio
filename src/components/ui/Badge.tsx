import React from "react";

/**
 * Premium Badge Component
 * Features: subtle animations, premium visual hierarchy
 */
interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
    variant?: "default" | "primary" | "secondary" | "success" | "outline";
    size?: "sm" | "md";
}

export const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
    ({ variant = "default", size = "md", className = "", children, ...props }, ref) => {
        const baseStyles = "inline-flex items-center font-mono rounded-md transition-all duration-200";

        const variantStyles = {
            default: "bg-secondary text-secondary-foreground border border-border/50",
            primary: "bg-primary/10 text-primary border border-primary/20",
            secondary: "bg-secondary text-secondary-foreground",
            success: "bg-green-500/10 text-green-600 dark:text-green-400 border border-green-500/20",
            outline: "border-2 border-border bg-transparent text-foreground",
        };

        const sizeStyles = {
            sm: "px-2 py-0.5 text-xs",
            md: "px-3 py-1 text-sm",
        };

        return (
            <div
                ref={ref}
                className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
                {...props}
            >
                {children}
            </div>
        );
    }
);

Badge.displayName = "Badge";
