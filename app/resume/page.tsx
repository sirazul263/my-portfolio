import { ArrowLeft, Download } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

import { PrintButton } from "@/components/resume/PrintButton";
import { Button } from "@/components/ui/Button";
import { companies, education, research } from "@/content/experience";
import { site } from "@/content/site";
import { skillGroups } from "@/content/skills";
import { durationLabel, formatRange, yearsSince } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Resume",
  description: `Resume of ${site.name}, ${site.role} in ${site.location}. Web and mobile engineering with React, Next.js and React Native.`,
  alternates: { canonical: "/resume" },
};

const host = site.url.replace(/^https?:\/\//, "");

export default function ResumePage() {
  const years = yearsSince(site.careerStart);
  const github = site.socials.find((s) => s.icon === "github");
  const linkedin = site.socials.find((s) => s.icon === "linkedin");

  return (
    <div className="container-x">
      <div className="print-hidden mb-10 flex flex-wrap items-center justify-between gap-4">
        <Link
          href="/experience"
          className="group inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-fg"
        >
          <ArrowLeft className="size-4 transition-transform duration-300 group-hover:-translate-x-1" />
          Back to experience
        </Link>
        <div className="flex flex-wrap gap-2">
          <PrintButton />
          <Button href={site.resumeUrl} variant="outline" size="sm">
            <Download className="size-4" />
            Download PDF
          </Button>
        </div>
      </div>

      <article
        id="resume"
        className="mx-auto max-w-3xl rounded-[2rem] border border-line bg-elevated/60 p-6 sm:p-12 print:max-w-none print:rounded-none print:border-0 print:bg-transparent print:p-0"
      >
        <div className="flex flex-col gap-4 border-b border-line pb-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-4xl font-semibold tracking-[-0.03em] sm:text-5xl">{site.name}</h1>
            <p className="mt-2 text-lg text-muted">
              {site.role} · {site.focus}
            </p>
          </div>
          <ul className="font-mono text-xs leading-none text-muted sm:text-right">
            <li className="py-1.5">{site.location}</li>
            <li>
              <a href={`mailto:${site.email}`} className="inline-block py-1.5 hover:text-fg">
                {site.email}
              </a>
            </li>
            <li>
              <a href={site.url} className="inline-block py-1.5 hover:text-fg">
                {host}
              </a>
            </li>
            {github && (
              <li>
                <a href={github.href} className="inline-block py-1.5 hover:text-fg">
                  github.com/{site.githubUser}
                </a>
              </li>
            )}
            {linkedin && (
              <li>
                <a href={linkedin.href} className="inline-block py-1.5 hover:text-fg">
                  linkedin.com/{linkedin.handle}
                </a>
              </li>
            )}
          </ul>
        </div>

        <ResumeSection title="Summary">
          <p className="leading-relaxed text-muted">
            {site.role} with {years} years of experience designing and delivering scalable,
            secure, high-performance web and mobile applications. Specialises in frontend
            engineering with React and Next.js and cross-platform mobile development with React
            Native, backed by hands-on backend work across Node.js, NestJS, Express, Hono and
            Laravel. Published researcher with a track record of delivering complex products end
            to end, owning architecture and delivery, and mentoring engineering teams.
          </p>
        </ResumeSection>

        <ResumeSection title="Experience">
          <div className="space-y-8">
            {companies.map((company) => {
              const latest = company.positions[0];
              const first = company.positions[company.positions.length - 1];
              return (
                <div key={company.name} className="break-inside-avoid">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                    <h3 className="text-lg font-semibold tracking-tight">
                      {company.name}
                      {company.legalName && (
                        <span className="font-normal text-faint"> · {company.legalName}</span>
                      )}
                    </h3>
                    <p className="font-mono text-xs text-faint">
                      {formatRange(first.start, latest.end)} ·{" "}
                      {durationLabel(first.start, latest.end)}
                    </p>
                  </div>
                  <p className="text-sm text-faint">{company.location}</p>
                  <div className="mt-3 space-y-4">
                    {company.positions.map((position) => (
                      <div key={position.title} className="break-inside-avoid">
                        <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                          <p className="font-medium">{position.title}</p>
                          <p className="font-mono text-xs text-faint">
                            {formatRange(position.start, position.end)}
                          </p>
                        </div>
                        <ul className="mt-1.5 space-y-1 text-sm leading-relaxed text-muted">
                          {position.bullets.map((bullet) => (
                            <li key={bullet} className="flex gap-2.5">
                              <span
                                aria-hidden
                                className="mt-[0.6em] size-1 shrink-0 rounded-full bg-accent"
                              />
                              {bullet}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </ResumeSection>

        <ResumeSection title="Skills">
          <dl className="space-y-2 text-sm">
            {skillGroups.map((group) => (
              <div key={group.title} className="flex flex-col gap-0.5 sm:flex-row sm:gap-4">
                <dt className="w-40 shrink-0 font-medium">{group.title}</dt>
                <dd className="text-muted">{group.items.join(", ")}</dd>
              </div>
            ))}
          </dl>
        </ResumeSection>

        <ResumeSection title="Education">
          <div className="space-y-4">
            {education.map((e) => (
              <div key={e.school} className="break-inside-avoid">
                <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                  <h3 className="font-semibold tracking-tight">{e.school}</h3>
                  <p className="font-mono text-xs text-faint">{formatRange(e.start, e.end)}</p>
                </div>
                <p className="text-sm text-muted">
                  {e.degree} · {e.detail}
                </p>
                {e.awards.length > 0 && (
                  <p className="text-sm text-muted">{e.awards.join(", ")}</p>
                )}
              </div>
            ))}
          </div>
        </ResumeSection>

        <ResumeSection title="Research">
          {research.map((r) => (
            <div key={r.href} className="break-inside-avoid">
              <h3 className="font-semibold tracking-tight">
                <a href={r.href} className="hover:text-accent">
                  {r.title}
                </a>
              </h3>
              <p className="text-sm text-muted">{r.venue}</p>
              <p className="mt-1 text-sm text-muted">{r.summary}</p>
            </div>
          ))}
        </ResumeSection>
      </article>
    </div>
  );
}

function ResumeSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-8 grid gap-3 border-b border-line pb-8 last:border-b-0 last:pb-0 sm:grid-cols-[9rem_1fr] sm:gap-6">
      <h2 className="mono-label pt-1">{title}</h2>
      <div>{children}</div>
    </section>
  );
}
