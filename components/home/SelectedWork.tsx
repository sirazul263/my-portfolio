import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProjectCard } from "@/components/work/ProjectCard";
import { featuredProjects } from "@/content/projects";
import { cn } from "@/lib/utils";

export function SelectedWork() {
  return (
    <section className="container-x py-24 sm:py-32">
      <SectionHeading
        index="01"
        eyebrow="Selected work"
        title="Selected work."
        description="Production products first, side projects after. Each one opens a short case study with the stack, the decisions and the links."
        action={{ href: "/work", label: "All 12 projects" }}
      />

      <div className="grid gap-5 md:grid-cols-2">
        {featuredProjects.map((project, i) => {
          // Rhythm of one wide card followed by two regular ones.
          const wide = i % 3 === 0;
          return (
            <Reveal
              key={project.slug}
              delay={(i % 2) * 0.08}
              className={cn("h-full", wide && "md:col-span-2")}
            >
              <ProjectCard project={project} wide={wide} idPrefix={`home-${project.slug}`} />
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
