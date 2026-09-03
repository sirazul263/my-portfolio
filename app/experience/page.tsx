import { ArrowUpRight, GraduationCap, ScrollText } from "lucide-react";
import type { Metadata } from "next";

import { Timeline } from "@/components/experience/Timeline";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { education, research } from "@/content/experience";
import { site } from "@/content/site";
import { formatRange, yearsSince } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Experience",
  description:
    "Career timeline of Md. Sirazul Islam: Senior Software Engineer at Flight Expert, earlier roles, education and published research.",
  alternates: { canonical: "/experience" },
};

export default function ExperiencePage() {
  const years = yearsSince(site.careerStart);

  return (
    <>
      <section className="container-x pb-24 sm:pb-32">
        <SectionHeading
          as="h1"
          eyebrow="Experience"
          title={
            <>
              Where I’ve <span className="serif-italic text-accent">worked.</span>
            </>
          }
          description={`${years} years in production, most of it on flight booking platforms where the pages are dense, the data is live, and slow costs money.`}
          action={{ href: "/resume", label: "View printable resume" }}
        />
        <Timeline />
      </section>

      <section className="container-x pb-24 sm:pb-32">
        <SectionHeading
          eyebrow="Education"
          title={
            <>
              Computer science, <span className="serif-italic text-accent">by training.</span>
            </>
          }
        />
        <div className="grid gap-5 md:grid-cols-2">
          {education.map((e, i) => (
            <Reveal key={e.school} delay={i * 0.08} className="h-full">
              <div className="flex h-full flex-col justify-between rounded-3xl border border-line bg-elevated/50 p-7">
                <div>
                  <span className="grid size-10 place-items-center rounded-full border border-line text-muted">
                    <GraduationCap className="size-4" />
                  </span>
                  <h3 className="mt-6 text-xl font-semibold tracking-tight">{e.school}</h3>
                  <p className="mt-1 text-muted">{e.degree}</p>
                </div>
                <ul className="mt-6 space-y-1.5 font-mono text-xs text-faint">
                  <li>{formatRange(e.start, e.end)}</li>
                  <li>{e.detail}</li>
                  <li>{e.location}</li>
                  {e.awards.length > 0 && (
                    <li className="pt-2 text-accent">{e.awards.join(" · ")}</li>
                  )}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="container-x">
        <SectionHeading
          eyebrow="Research"
          title={
            <>
              One <span className="serif-italic text-accent">published</span> paper.
            </>
          }
        />
        {research.map((r) => (
          <Reveal key={r.href}>
            <a
              href={r.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col gap-6 rounded-3xl border border-line bg-elevated/50 p-7 transition-all duration-500 ease-expo hover:border-fg/20 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="flex gap-5">
                <span className="grid size-10 shrink-0 place-items-center rounded-full border border-line text-muted">
                  <ScrollText className="size-4" />
                </span>
                <div>
                  <h3 className="text-xl font-semibold tracking-tight">{r.title}</h3>
                  <p className="mt-1 text-muted">{r.venue}</p>
                  <p className="mt-2 max-w-xl text-sm text-faint">{r.summary}</p>
                </div>
              </div>
              <span className="inline-flex shrink-0 items-center gap-2 text-sm text-muted transition-colors group-hover:text-fg">
                Read on Springer
                <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </span>
            </a>
          </Reveal>
        ))}
      </section>
    </>
  );
}
