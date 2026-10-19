import Hero from "@/components/sections/Hero";
import TechStack from "@/components/sections/TechStack";
import ProjectCard from "@/components/projects/ProjectCard";
import { PROJECTS } from "@/data/projects";
import { Link } from "@/i18n/navigation";
import { ArrowRight } from "lucide-react";
import { setRequestLocale } from "next-intl/server";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <div className="flex flex-col gap-16 md:gap-24 pb-16 md:pb-24">
      <Hero />

      <section>
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-h2">Featured Projects</h2>
          <Link
            href="/projects"
            className="text-sm text-muted-foreground hover:text-primary flex items-center transition-colors"
          >
            View all <ArrowRight className="ms-1 w-4 h-4 rtl:rotate-180" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PROJECTS.slice(0, 3).map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </section>

      <TechStack />

    </div>
  );
}
