import Link from "next/link";
import { Github, Linkedin, Mail } from "lucide-react";
import { SITE_CONFIG } from "@/lib/data";

export default function Footer() {
    return (
        <footer className="border-t border-border/40 bg-background py-8 mt-auto">
            <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="text-center md:text-left">
                    <p className="text-sm text-muted-foreground">
                        &copy; {new Date().getFullYear()} {SITE_CONFIG.name}. All rights reserved.
                    </p>
                </div>

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
            </div>
        </footer>
    );
}
