import { ArrowLeft, ArrowUpRight, Smartphone } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SocialIcon } from "@/components/ui/SocialIcon";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { Tag } from "@/components/ui/Tag";
import { ProjectCard } from "@/components/work/ProjectCard";
import { ProjectVisual } from "@/components/work/ProjectVisual";
import { getAdjacentProjects, getProject, projects } from "@/content/projects";
import { pad2 } from "@/lib/utils";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.summary,
    alternates: { canonical: `/work/${project.slug}` },
    openGraph: {
      title: `${project.title} — ${project.tagline}`,
      description: project.summary,
      type: "article",
    },
  };
}

export default async function ProjectPage({ params }: Params) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const { prev, next } = getAdjacentProjects(project.slug);
  const index = projects.findIndex((p) => p.slug === project.slug);

  const meta = [
    { label: "Year", value: project.year },
    { label: "Role", value: project.role },
    { label: "Status", value: <StatusBadge status={project.status} /> },
    { label: "Index", value: `${pad2(index + 1)} / ${pad2(projects.length)}` },
  ];

  return (
    <article className="container-x">
      <Reveal>
        <Link
          href="/work"
          className="group inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-fg"
        >
          <ArrowLeft className="size-4 transition-transform duration-300 group-hover:-translate-x-1" />
          All work
        </Link>
      </Reveal>

      <header className="mt-10 grid gap-8 lg:grid-cols-12 lg:items-end">
        <Reveal className="lg:col-span-8">
          <p className="mono-label">
            Case study · {project.year}
          </p>
          <h1 className="mt-5 text-5xl font-semibold leading-[0.98] tracking-[-0.035em] sm:text-7xl">
            {project.title}
          </h1>
          <p className="serif-italic mt-4 text-2xl text-muted sm:text-3xl">{project.tagline}</p>
        </Reveal>
        <Reveal delay={0.1} className="flex flex-wrap gap-3 lg:col-span-4 lg:justify-end">
          {!project.links.repo && (
            <p className="w-full text-sm text-faint lg:text-right">
              {project.note ?? "Proprietary product built as part of my role; source is not public."}
            </p>
          )}
          {project.links.live && (
            <Button href={project.links.live}>
              Visit live site
              <ArrowUpRight className="size-4 transition-transform duration-300 group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5" />
            </Button>
          )}
          {project.links.playStore && (
            <Button href={project.links.playStore} variant="outline">
              <Smartphone className="size-4" />
              Get it on Google Play
            </Button>
          )}
          {project.links.appStore && (
            <Button href={project.links.appStore} variant="outline">
              <Smartphone className="size-4" />
              Download on the App Store
            </Button>
          )}
          {project.links.repo && (
            <Button href={project.links.repo} variant="outline">
              <SocialIcon name="github" className="size-4" />
              Source
            </Button>
          )}
        </Reveal>
      </header>

      <Reveal delay={0.15} y={32} className="mt-12">
        <div className="relative aspect-[16/9] overflow-hidden rounded-[2rem] border border-line sm:aspect-[21/9]">
          <ProjectVisual
            project={project}
            priority
            idPrefix={`detail-${project.slug}`}
            sizes="(min-width: 1280px) 1216px, 100vw"
            className="absolute inset-0 h-full w-full"
          />
        </div>
      </Reveal>

      <div className="mt-16 grid gap-12 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-4">
          <div className="space-y-8 lg:sticky lg:top-28">
            <dl className="divide-y divide-line border-y border-line">
              {meta.map((m) => (
                <div key={m.label} className="flex items-center justify-between gap-6 py-3.5">
                  <dt className="mono-label">{m.label}</dt>
                  <dd className="text-right text-sm">{m.value}</dd>
                </div>
              ))}
            </dl>

            <div>
              <p className="mono-label">Stack</p>
              <ul className="mt-3 flex flex-wrap gap-1.5">
                {project.stack.map((t) => (
                  <li key={t}>
                    <Tag>{t}</Tag>
                  </li>
                ))}
              </ul>
            </div>

            {project.links.extraRepos && project.links.extraRepos.length > 0 && (
              <div>
                <p className="mono-label">Related repositories</p>
                <ul className="mt-3 space-y-2">
                  {project.links.extraRepos.map((r) => (
                    <li key={r.href}>
                      <a
                        href={r.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-fg"
                      >
                        <SocialIcon name="github" className="size-3.5" />
                        {r.label}
                        <ArrowUpRight className="size-3 opacity-0 transition-opacity group-hover:opacity-100" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </Reveal>

        <div className="space-y-14 lg:col-span-8">
          <Reveal delay={0.05}>
            <h2 className="mono-label">Overview</h2>
            <div className="mt-4 space-y-5 text-lg leading-relaxed text-muted">
              {project.description.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <h2 className="mono-label">Highlights</h2>
            <ol className="mt-4 divide-y divide-line border-y border-line">
              {project.highlights.map((h, i) => (
                <li key={h} className="flex gap-6 py-5">
                  <span className="serif-italic shrink-0 text-2xl leading-none text-accent">
                    {pad2(i + 1)}
                  </span>
                  <p className="leading-relaxed text-fg/90">{h}</p>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </div>

      {prev && next && (
        <nav aria-label="More projects" className="mt-24 sm:mt-32">
          <Reveal>
            <p className="mono-label mb-6">Keep exploring</p>
            <div className="grid gap-5 md:grid-cols-2">
              <ProjectCard project={prev} idPrefix={`prev-${prev.slug}`} />
              <ProjectCard project={next} idPrefix={`next-${next.slug}`} />
            </div>
          </Reveal>
        </nav>
      )}
    </article>
  );
}
