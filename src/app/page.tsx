import Hero from "@/components/sections/Hero";
import TechStack from "@/components/sections/TechStack";
import ProjectCard from "@/components/projects/ProjectCard";
import { PROJECTS } from "@/data/projects";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col gap-20 pb-20">
      <Hero />

      <section>
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-2xl font-bold font-mono">Featured Projects</h2>
          <Link
            href="/projects"
            className="text-sm text-muted-foreground hover:text-primary flex items-center transition-colors"
          >
            View all <ArrowRight className="ml-1 w-4 h-4" />
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
