"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import { Menu, X, Download } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { SITE_CONFIG } from "@/data/site-config";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import LocaleSwitcher from "@/components/ui/LocaleSwitcher";
import Logo from "@/components/ui/Logo";
import { Link, usePathname } from "@/i18n/navigation";

export default function Navbar() {
    const t = useTranslations("nav");
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    const navItems = [
        { name: t("projects"), href: "/projects" },
        { name: t("blog"), href: "/blog" },
        { name: t("about"), href: "/about" },
        { name: t("contact"), href: "/contact" },
    ];

    const featuredNavItem = {
        name: t("services"),
        href: "/services",
    };

    return (
        <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-md supports-backdrop-filter:bg-background/60">
            <div className="max-w-content mx-auto px-4 h-16 flex items-center justify-between">
                <Logo className="transition-colors duration-300" />

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-6">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`text-sm font-medium transition-colors hover:text-primary ${pathname === item.href
                                ? "text-foreground"
                                : "text-muted-foreground"
                                }`}
                        >
                            {item.name}
                        </Link>
                    ))}
                    {/* Featured Services Link - High Focus */}
                    <Link
                        href={featuredNavItem.href}
                        className={`border border-primary/30 bg-primary/10 text-primary px-4 py-1.5 rounded-full hover:bg-primary/20 transition-all font-medium ${pathname === featuredNavItem.href
                            ? "ring-2 ring-primary/50"
                            : ""
                            }`}
                    >
                        {featuredNavItem.name}
                    </Link>
                    {SITE_CONFIG.resumeUrl && (
                        <a
                            href={SITE_CONFIG.resumeUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                        >
                            <Download className="w-4 h-4" />
                            {t("cv")}
                        </a>
                    )}
                    <LocaleSwitcher />
                    <ThemeToggle />
                </nav>

                {/* Mobile Menu Button */}
                <div className="flex items-center gap-2 md:hidden">
                    <LocaleSwitcher />
                    <ThemeToggle />
                    <button
                        className="p-2 text-muted-foreground hover:text-foreground"
                        onClick={() => setIsOpen(!isOpen)}
                        aria-label={t("openMenu")}
                        aria-expanded={isOpen}
                    >
                        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Nav */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden border-b border-border/40 bg-background"
                    >
                        <nav className="py-4 flex flex-col space-y-4">
                            {navItems.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={`px-4 text-sm font-medium transition-colors hover:text-primary ${pathname === item.href
                                        ? "text-foreground"
                                        : "text-muted-foreground"
                                        }`}
                                    onClick={() => setIsOpen(false)}
                                >
                                    {item.name}
                                </Link>
                            ))}
                            {/* Featured Services Link - Mobile */}
                            <Link
                                href={featuredNavItem.href}
                                className={`mx-4 text-sm font-medium transition-colors border border-primary/30 bg-primary/10 text-primary rounded-full py-2 text-center ${pathname === featuredNavItem.href
                                    ? "ring-2 ring-primary/50"
                                    : ""
                                    }`}
                                onClick={() => setIsOpen(false)}
                            >
                                {featuredNavItem.name}
                            </Link>
                            {SITE_CONFIG.resumeUrl && (
                                <a
                                    href={SITE_CONFIG.resumeUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-4 inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
                                    onClick={() => setIsOpen(false)}
                                >
                                    <Download className="w-4 h-4" />
                                    {t("downloadCv")}
                                </a>
                            )}
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
