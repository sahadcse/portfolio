import Link from "next/link";
import { Github, Linkedin, Mail } from "lucide-react";
import { SITE_CONFIG } from "@/data/site-config";

export default function Footer() {
    return (
        <footer className="border-t border-border/40 bg-background py-8 mt-auto">
            <div className="max-w-7xl mx-auto px-4 flex flex-col items-center gap-4">
                {/* Social Links */}
                <div className="flex items-center space-x-4">
                    <a
                        href={SITE_CONFIG.socials.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-foreground transition-colors"
                        aria-label="GitHub"
                    >
                        <Github className="w-5 h-5" />
                    </a>
                    <a
                        href={SITE_CONFIG.socials.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-foreground transition-colors"
                        aria-label="LinkedIn"
                    >
                        <Linkedin className="w-5 h-5" />
                    </a>
                    <a
                        href={`mailto:${SITE_CONFIG.email}`}
                        className="text-muted-foreground hover:text-foreground transition-colors"
                        aria-label="Email"
                    >
                        <Mail className="w-5 h-5" />
                    </a>
                </div>

                {/* Copyright */}
                <p className="text-sm text-muted-foreground text-center">
                    &copy; {new Date().getFullYear()} {SITE_CONFIG.name}. All rights reserved.
                </p>

                {/* Legal Compliance Links */}
                <div className="flex items-center justify-center flex-wrap gap-1">
                    <Link
                        href="/privacy"
                        className="text-xs text-slate-500 hover:text-cyan-500 transition-colors mx-3"
                    >
                        Privacy Policy
                    </Link>
                    <span className="text-xs text-slate-400">•</span>
                    <Link
                        href="/terms"
                        className="text-xs text-slate-500 hover:text-cyan-500 transition-colors mx-3"
                    >
                        Terms of Service
                    </Link>
                    <span className="text-xs text-slate-400">•</span>
                    <Link
                        href="/impressum"
                        className="text-xs text-slate-500 hover:text-cyan-500 transition-colors mx-3"
                    >
                        Legal Notice (Impressum)
                    </Link>
                </div>
            </div>
        </footer>
    );
}
