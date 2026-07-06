import React from "react";
import { Loader2 } from "lucide-react";

/**
 * Premium Button Component with Micro-interactions
 * Features: scale on click, ambient glow on hover, smooth transitions
 */
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "outline" | "ghost";
    size?: "sm" | "md" | "lg";
    isLoading?: boolean;
    icon?: React.ReactNode;
    iconPosition?: "left" | "right";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({
        variant = "primary",
        size = "md",
        isLoading = false,
        icon,
        iconPosition = "left",
        children,
        disabled,
        className = "",
        ...props
    }, ref) => {
        const baseStyles = "inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none disabled:cursor-not-allowed";

        const variantStyles = {
            primary: "bg-primary text-primary-foreground hover:bg-primary/90 ambient-glow-sm micro-interact hover:scale-[1.02]",
            secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80 micro-interact hover:scale-[1.02]",
            outline: "border-2 border-input bg-background hover:bg-accent hover:text-accent-foreground micro-interact",
            ghost: "hover:bg-accent hover:text-accent-foreground micro-interact",
        };

        const sizeStyles = {
            sm: "px-4 py-2 text-sm",
            md: "px-6 py-3 text-base",
            lg: "px-8 py-4 text-lg",
        };

        return (
            <button
                ref={ref}
                disabled={disabled || isLoading}
                className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
                {...props}
            >
                {isLoading ? (
                    <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Loading...
                    </>
                ) : (
                    <>
                        {icon && iconPosition === "left" && <span className="mr-2">{icon}</span>}
                        {children}
                        {icon && iconPosition === "right" && <span className="ml-2">{icon}</span>}
                    </>
                )}
            </button>
        );
    }
);

Button.displayName = "Button";
