import { ArrowRight, Download, MapPin } from "lucide-react";
import Image from "next/image";

import { Button } from "@/components/ui/Button";
import { LocalTime } from "@/components/ui/LocalTime";
import { Magnetic } from "@/components/ui/Magnetic";
import { SocialIcon } from "@/components/ui/SocialIcon";
import { WordReveal } from "@/components/ui/WordReveal";
import { companies, research } from "@/content/experience";
import { site } from "@/content/site";
import type { GithubProfile } from "@/lib/github";
import { yearsSince } from "@/lib/utils";

const headline = [
  { text: "Building" },
  { text: "fast," },
  { text: "dependable", accent: true },
  { text: "software" },
  { text: "for" },
  { text: "web" },
  { text: "and" },
  { text: "mobile." },
];

/** Inline delay for the CSS entrance animation. */
const rise = (seconds: number) => ({ animationDelay: `${seconds}s` });

export function Hero({ github }: { github: GithubProfile | null }) {
  const years = yearsSince(site.careerStart);
  const stats = [
    { value: String(years), label: "years shipping" },
    {
      value: github ? String(github.publicRepos) : "50+",
      label: "public repositories",
    },
    { value: String(companies.length), label: "companies" },
    { value: String(research.length), label: "published paper" },
  ];

  return (
    <section className="container-x relative pb-16 pt-4 sm:pt-10 lg:pb-24">
      <div className="grid gap-14 lg:grid-cols-12 lg:items-center">
        <div className="lg:col-span-7">
          <div className="animate-rise">
            <span className="inline-flex items-center gap-2.5 rounded-full border border-line bg-elevated/70 py-1.5 pl-2.5 pr-4 text-xs text-muted backdrop-blur">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping-soft rounded-full bg-live" />
                <span className="relative inline-flex size-2 rounded-full bg-live" />
              </span>
              {site.availability.open ? (
                site.availability.label
              ) : (
                <>
                  Currently building <span className="text-fg">{site.current.product}</span> at{" "}
                  {site.current.company}
                </>
              )}
            </span>
          </div>

          <p className="mono-label mt-8 animate-rise" style={rise(0.05)}>
            {site.name} · {site.role} · {site.focus}
          </p>

          <h1 className="mt-5 text-[clamp(2.9rem,7.4vw,6.4rem)] font-semibold leading-[0.95] tracking-[-0.035em]">
            <WordReveal words={headline} delay={0.15} />
          </h1>

          <p
            className="mt-8 max-w-xl animate-rise text-lg leading-relaxed text-muted"
            style={rise(0.45)}
          >
            I’m Sirazul, a senior software engineer in Dhaka. Over the last {years} years I’ve
            shipped production React, Next.js and React Native products, from high-traffic
            flight booking platforms to multi-tenant SaaS, with a bias for clean architecture
            and measurable performance.
          </p>

          <div className="mt-10 flex animate-rise flex-wrap items-center gap-3" style={rise(0.55)}>
            <Magnetic>
              <Button href="/work" size="lg">
                Selected work
                <ArrowRight className="size-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
              </Button>
            </Magnetic>
            <Button href="/contact" variant="outline" size="lg">
              Get in touch
            </Button>
            <Button href={site.resumeUrl} variant="ghost" size="lg">
              <Download className="size-4" />
              Resume
            </Button>
          </div>

          <ul
            className="mt-10 flex animate-rise items-center gap-2"
            style={rise(0.65)}
            aria-label="Social profiles"
          >
            {site.socials.map((s) => (
              <li key={s.href}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  title={s.handle}
                  className="grid size-10 place-items-center rounded-full border border-line text-muted transition-all duration-300 hover:-translate-y-0.5 hover:border-fg/30 hover:bg-accent-soft hover:text-fg"
                >
                  <SocialIcon name={s.icon} className="size-4" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-5">
          <div className="relative mx-auto max-w-sm lg:max-w-none">
            <div
              aria-hidden
              className="absolute -inset-4 -z-10 rounded-full sm:-inset-10 bg-accent/20 blur-3xl"
            />
            <div className="group relative -rotate-2 transition-transform duration-700 ease-expo hover:rotate-0">
              <div
                className="animate-settle overflow-hidden rounded-[2rem] border border-line bg-elevated shadow-2xl shadow-black/20"
                style={rise(0.2)}
              >
              <div className="relative aspect-[4/5]">
                <Image
                  src="/img/portrait.jpg"
                  alt={`Portrait of ${site.name}`}
                  fill
                  priority
                  fetchPriority="high"
                  sizes="(min-width: 1024px) 420px, 90vw"
                  className="object-cover object-top"
                />
              </div>
              <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-black/75 to-transparent px-5 pb-4 pt-12 font-mono text-[11px] text-white/85">
                <span className="inline-flex items-center gap-1.5">
                  <MapPin className="size-3.5" />
                  Dhaka, BD
                </span>
                <LocalTime className="[&>span]:text-white/50" />
              </div>
              </div>
            </div>

            <div
              className="absolute -left-6 top-6 hidden rotate-3 animate-rise rounded-2xl border border-line bg-elevated/95 px-4 py-3 shadow-xl backdrop-blur lg:block"
              style={rise(0.7)}
            >
              <p className="serif-italic text-3xl leading-none">{years}</p>
              <p className="mono-label mt-1.5">years</p>
            </div>
            <div
              className="absolute -right-5 bottom-16 hidden -rotate-3 animate-rise rounded-2xl border border-line bg-elevated/95 px-4 py-3 shadow-xl backdrop-blur lg:block"
              style={rise(0.8)}
            >
              <p className="serif-italic text-3xl leading-none">
                {github ? github.publicRepos : "50+"}
              </p>
              <p className="mono-label mt-1.5">repos</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-20 animate-rise border-y border-line" style={rise(0.6)}>
        <dl className="grid grid-cols-2 sm:grid-cols-4 sm:divide-x sm:divide-line">
          {stats.map((s) => (
            <div key={s.label} className="flex flex-col-reverse py-6 sm:px-6 sm:first:pl-0 sm:last:pr-0">
              <dt className="mono-label mt-3">{s.label}</dt>
              <dd className="serif-italic text-4xl leading-none sm:text-5xl">{s.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
