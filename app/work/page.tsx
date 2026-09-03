import type { Metadata } from "next";

import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ExperimentCard } from "@/components/work/ExperimentCard";
import { ProjectCard } from "@/components/work/ProjectCard";
import { experiments, projects } from "@/content/projects";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Projects by Md. Sirazul Islam: multi-tenant SaaS, real-time support desks, AI assistants, e-commerce and more, built with Next.js, React and TypeScript.",
  alternates: { canonical: "/work" },
};

export default function WorkPage() {
  return (
    <>
      <section className="container-x pb-24 sm:pb-32">
        <SectionHeading
          as="h1"
          eyebrow={`${projects.length} projects`}
          title={
            <>
              Things I’ve <span className="serif-italic text-accent">built.</span>
            </>
          }
          description="Product work, side projects and experiments. Every one links to its source, and to a live deployment where there is one."
        />

        <div className="grid gap-5 md:grid-cols-2">
          {projects.map((project, i) => {
            const wide = i === 0;
            return (
              <Reveal
                key={project.slug}
                delay={(i % 2) * 0.08}
                className={cn("h-full", wide && "md:col-span-2")}
              >
                <ProjectCard project={project} wide={wide} headingLevel="h2" />
              </Reveal>
            );
          })}
        </div>
      </section>

      <section className="container-x">
        <SectionHeading
          eyebrow="Experiments"
          title={
            <>
              Smaller builds and <span className="serif-italic text-accent">API work.</span>
            </>
          }
          description="Backends, prototypes and older projects that still say something about how I work."
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {experiments.map((item, i) => (
            <Reveal key={item.title} delay={(i % 3) * 0.06} className="h-full">
              <ExperimentCard item={item} />
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
