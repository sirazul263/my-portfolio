import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

import { ProjectVisual } from "@/components/work/ProjectVisual";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { Tag } from "@/components/ui/Tag";
import type { Project } from "@/content/projects";
import { cn } from "@/lib/utils";

type Props = {
  project: Project;
  wide?: boolean;
  className?: string;
  idPrefix?: string;
  /** Heading level for the title, so the document outline stays sequential. */
  headingLevel?: "h2" | "h3";
};

export function ProjectCard({
  project,
  wide = false,
  className,
  idPrefix,
  headingLevel: Heading = "h3",
}: Props) {
  const shown = project.stack.slice(0, 4);
  const rest = project.stack.length - shown.length;

  return (
    <Link
      href={`/work/${project.slug}`}
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-line bg-elevated/50 transition-all duration-500 ease-expo hover:-translate-y-1 hover:border-fg/20 hover:shadow-2xl hover:shadow-black/10",
        wide && "md:flex-row",
        className,
      )}
    >
      <div
        className={cn(
          "relative shrink-0 overflow-hidden",
          wide ? "aspect-[16/10] md:aspect-auto md:w-[58%]" : "aspect-[16/10]",
        )}
      >
        <ProjectVisual
          project={project}
          idPrefix={idPrefix}
          className="absolute inset-0 h-full w-full transition-transform duration-700 ease-expo group-hover:scale-[1.035]"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      </div>

      <div className="flex flex-1 flex-col justify-between gap-6 p-6 sm:p-7">
        <div>
          <div className="flex items-center justify-between gap-4">
            <StatusBadge status={project.status} />
            <span className="font-mono text-[11px] text-faint">{project.year}</span>
          </div>
          <Heading className="mt-5 text-2xl font-semibold tracking-tight">{project.title}</Heading>
          <p className="mt-1 text-muted">{project.tagline}</p>
          {wide && (
            <p className="mt-4 hidden max-w-md leading-relaxed text-muted md:block">
              {project.summary}
            </p>
          )}
        </div>

        <div className="flex items-end justify-between gap-4">
          <ul className="flex flex-wrap gap-1.5" aria-label="Stack">
            {shown.map((t) => (
              <li key={t}>
                <Tag>{t}</Tag>
              </li>
            ))}
            {rest > 0 && (
              <li>
                <Tag>+{rest}</Tag>
              </li>
            )}
          </ul>
          <span
            aria-hidden
            className="grid size-10 shrink-0 place-items-center rounded-full border border-line text-muted transition-all duration-500 ease-expo group-hover:bg-fg group-hover:text-bg"
          >
            <ArrowUpRight className="size-4 transition-transform duration-500 ease-expo group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </span>
        </div>
      </div>
    </Link>
  );
}
