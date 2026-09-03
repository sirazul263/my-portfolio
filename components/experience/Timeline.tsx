import { ArrowUpRight } from "lucide-react";

import { Reveal } from "@/components/ui/Reveal";
import { companies } from "@/content/experience";
import { cn, durationLabel, formatRange } from "@/lib/utils";

export function Timeline() {
  return (
    <div className="space-y-20 sm:space-y-28">
      {companies.map((company) => {
        const latest = company.positions[0];
        const first = company.positions[company.positions.length - 1];
        return (
          <Reveal key={company.name}>
            <article className="grid gap-8 lg:grid-cols-12 lg:gap-12">
              <div className="lg:col-span-4">
                <div className="lg:sticky lg:top-28">
                  {company.url ? (
                    <a
                      href={company.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-2 text-2xl font-semibold tracking-tight sm:text-3xl"
                    >
                      {company.name}
                      <ArrowUpRight className="size-4 text-faint transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-fg" />
                    </a>
                  ) : (
                    <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                      {company.name}
                    </h2>
                  )}
                  {company.legalName && (
                    <p className="mt-1 text-sm text-faint">{company.legalName}</p>
                  )}
                  <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted">
                    {company.summary}
                  </p>
                  <dl className="mt-5 space-y-1.5 font-mono text-xs text-faint">
                    <div className="flex gap-3">
                      <dt className="w-16 shrink-0 uppercase tracking-wider">Tenure</dt>
                      <dd>{durationLabel(first.start, latest.end)}</dd>
                    </div>
                    <div className="flex gap-3">
                      <dt className="w-16 shrink-0 uppercase tracking-wider">Dates</dt>
                      <dd>{formatRange(first.start, latest.end)}</dd>
                    </div>
                    <div className="flex gap-3">
                      <dt className="w-16 shrink-0 uppercase tracking-wider">Where</dt>
                      <dd>{company.location}</dd>
                    </div>
                  </dl>
                </div>
              </div>

              <div className="lg:col-span-8">
                <ol className="relative space-y-10 border-l border-line pl-8">
                  {company.positions.map((position, i) => (
                    <li key={position.title} className="relative">
                      <span
                        aria-hidden
                        className={cn(
                          "absolute top-1.5 size-3 rounded-full border-2 border-bg",
                          "-left-[calc(2rem+6.5px)]",
                          i === 0 ? "bg-accent" : "bg-faint",
                        )}
                      />
                      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                        <h3 className="text-lg font-semibold tracking-tight sm:text-xl">
                          {position.title}
                        </h3>
                        <p className="font-mono text-xs text-faint">
                          {formatRange(position.start, position.end)} ·{" "}
                          {durationLabel(position.start, position.end)}
                        </p>
                      </div>
                      <ul className="mt-4 space-y-2.5 text-muted">
                        {position.bullets.map((bullet) => (
                          <li key={bullet} className="flex gap-3 leading-relaxed">
                            <span
                              aria-hidden
                              className="mt-[0.7em] size-1 shrink-0 rounded-full bg-accent"
                            />
                            {bullet}
                          </li>
                        ))}
                      </ul>
                    </li>
                  ))}
                </ol>
              </div>
            </article>
          </Reveal>
        );
      })}
    </div>
  );
}
