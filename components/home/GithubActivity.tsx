import { ArrowUpRight, Star } from "lucide-react";
import Link from "next/link";

import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { projects } from "@/content/projects";
import { site } from "@/content/site";
import { formatRepoSize, languageColor, type GithubProfile, type GithubRepo } from "@/lib/github";
import { timeAgo } from "@/lib/utils";

type Curated = {
  repoName: string;
  repoUrl: string;
  title: string;
  tagline: string;
  caseStudy: string;
};

/** The repositories worth a recruiter's click, in the order they appear in Work. */
function curatedRepos(): Curated[] {
  return projects
    .filter((p) => p.links.repo)
    .map((p) => ({
      repoName: p.links.repo!.split("/").pop()!.toLowerCase(),
      repoUrl: p.links.repo!,
      title: p.title,
      tagline: p.tagline,
      caseStudy: `/work/${p.slug}`,
    }));
}

export function GithubActivity({ profile }: { profile: GithubProfile | null }) {
  const githubUrl = `https://github.com/${site.githubUser}`;
  const languageTotal = profile?.languages.reduce((n, l) => n + l.count, 0) ?? 0;
  const byName = new Map<string, GithubRepo>(
    (profile?.repos ?? []).map((r) => [r.name.toLowerCase(), r]),
  );
  const rows = curatedRepos()
    .map((c) => ({ ...c, live: byName.get(c.repoName) }))
    .slice(0, 6);

  return (
    <section className="container-x pb-8">
      <SectionHeading
        index="03"
        eyebrow="On GitHub"
        title="Repositories worth reading."
        description="The substantial ones, not the newest. Metadata comes from the GitHub API and refreshes hourly."
        action={{ href: githubUrl, label: `github.com/${site.githubUser}` }}
      />

      <div className="grid gap-5 lg:grid-cols-12">
        <Reveal className="flex flex-col gap-5 lg:col-span-4">
          <div className="grid grid-cols-2 gap-5">
            <div className="rounded-3xl border border-line bg-elevated/60 p-6">
              <p className="mono-label">Repositories</p>
              <p className="serif-italic mt-3 text-5xl leading-none">
                {profile ? profile.publicRepos : "50+"}
              </p>
            </div>
            <div className="rounded-3xl border border-line bg-elevated/60 p-6">
              <p className="mono-label">Followers</p>
              <p className="serif-italic mt-3 text-5xl leading-none">
                {profile ? profile.followers : "–"}
              </p>
            </div>
          </div>
          <div className="flex-1 rounded-3xl border border-line bg-elevated/60 p-6">
            <p className="mono-label">Languages across repos</p>
            {profile ? (
              <ul className="mt-4 space-y-3">
                {profile.languages.map((l) => {
                  const pct = languageTotal ? Math.round((l.count / languageTotal) * 100) : 0;
                  return (
                    <li key={l.name}>
                      <div className="flex items-center justify-between text-sm">
                        <span className="inline-flex items-center gap-2">
                          <span
                            className="size-2 rounded-full"
                            style={{ backgroundColor: languageColor(l.name) }}
                          />
                          {l.name}
                        </span>
                        <span className="font-mono text-xs text-faint">{pct}%</span>
                      </div>
                      <div className="mt-1.5 h-1 overflow-hidden rounded-full bg-line">
                        <div
                          className="h-full rounded-full"
                          style={{ width: `${pct}%`, backgroundColor: languageColor(l.name) }}
                        />
                      </div>
                    </li>
                  );
                })}
              </ul>
            ) : (
              <p className="mt-4 text-sm text-faint">
                GitHub is rate-limiting right now. Numbers will be back within the hour.
              </p>
            )}
          </div>
        </Reveal>

        <div className="grid gap-3 sm:grid-cols-2 lg:col-span-8">
          {rows.map((row, i) => (
            <Reveal key={row.repoName} delay={0.05 + i * 0.05} className="h-full">
              <article className="group flex h-full flex-col justify-between rounded-2xl border border-line bg-elevated/40 p-5 transition-all duration-500 ease-expo hover:border-fg/20 hover:bg-elevated/70">
                <div>
                  <div className="flex items-start justify-between gap-3">
                    <a
                      href={row.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="break-all font-mono text-sm hover:text-accent"
                    >
                      {row.repoName}
                    </a>
                    <a
                      href={row.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${row.title} on GitHub`}
                      className="text-faint transition-all duration-300 hover:-translate-y-0.5 hover:translate-x-0.5 hover:text-fg"
                    >
                      <ArrowUpRight className="size-4" />
                    </a>
                  </div>
                  <p className="mt-2 text-sm text-muted">
                    <Link href={row.caseStudy} className="link-underline text-fg">
                      {row.title}
                    </Link>
                    <span className="text-faint"> · </span>
                    {row.tagline}
                  </p>
                </div>
                <div className="mt-5 flex items-center justify-between gap-3 font-mono text-[11px] text-faint">
                  <span className="inline-flex items-center gap-2">
                    <span
                      className="size-2 rounded-full"
                      style={{ backgroundColor: languageColor(row.live?.language ?? "TypeScript") }}
                    />
                    {row.live?.language ?? "TypeScript"}
                    {row.live && row.live.stars > 0 && (
                      <span className="inline-flex items-center gap-1">
                        <Star className="size-3" /> {row.live.stars}
                      </span>
                    )}
                  </span>
                  {row.live && (
                    <span>
                      {formatRepoSize(row.live.size)} · pushed {timeAgo(row.live.pushedAt)}
                    </span>
                  )}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
