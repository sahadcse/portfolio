import { getTranslations } from "next-intl/server";

/**
 * Tech credibility strip (plan §6.3 #6): compact, monochrome, background
 * signal for technical visitors. Deliberately not an icon wall — every item
 * is evidenced by shipped work in the project inventory.
 */
const TECHNOLOGIES = [
    "TypeScript",
    "JavaScript",
    "Node.js",
    "NestJS",
    "Express.js",
    "Next.js",
    "React",
    "PostgreSQL",
    "MongoDB",
    "Prisma",
    "Redis",
    "Docker",
    "Azure",
    "GitHub Actions",
    "WebRTC",
    "Socket.IO",
];

export default async function TechStrip() {
    const t = await getTranslations("home.tech");

    return (
        <section className="py-16 md:py-24 border-y border-border/40 bg-muted/20">
            <h2 className="text-label text-muted-foreground uppercase mb-6">{t("title")}</h2>
            <ul className="flex flex-wrap gap-x-3 gap-y-2.5">
                {TECHNOLOGIES.map((tech) => (
                    <li
                        key={tech}
                        className="text-mono rounded-sm border border-border/60 bg-background/60 px-2.5 py-1 text-muted-foreground"
                    >
                        {tech}
                    </li>
                ))}
            </ul>
        </section>
    );
}
