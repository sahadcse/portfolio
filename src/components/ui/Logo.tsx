import React from "react";
import Link from "next/link";
import { Montserrat } from "next/font/google";

const LaunchMontserrat = Montserrat({
    subsets: ["latin"],
    weight: ["700", "800"],
    variable: "--font-montserrat",
});

interface LogoProps {
    className?: string;
}

/**
 * Premium "Elite Wordmark" Logo Component
 * - Montserrat font for premium typography
 * - Main name: SAHAD with accent dot
 * - Subtitle: SOFTWARE ARCHITECT with 70% dynamic offset
 * - Fully responsive and dark-mode compatible
 */
export default function Logo({ className = "" }: LogoProps) {
    return (
        <Link
            href="/"
            className={`flex flex-col items-start w-max ${className}`}
        >
            {/* Main Name Row */}
            <div className={`${LaunchMontserrat.className} text-3xl md:text-4xl font-bold transition-colors duration-300 flex items-center`}>
                SAHAD
                <span className="text-cyan-500 font-extrabold ml-0.5 transition-colors duration-300">
                    .
                </span>
            </div>

            {/* Subtitle with 70% offset */}
            <p className="ml-[70%] whitespace-nowrap text-[9px] md:text-[10px] tracking-[0.25em] text-slate-500 dark:text-slate-400 font-medium transition-colors duration-300 mt-0.5 uppercase">
                Software Architect
            </p>
        </Link>
    );
}
