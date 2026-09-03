import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";

import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Tag } from "@/components/ui/Tag";
import { education, research } from "@/content/experience";
import { site } from "@/content/site";
import { skillGroups } from "@/content/skills";
import { pad2, yearsSince } from "@/lib/utils";

export const metadata: Metadata = {
  title: "About",
  description:
    "Who Md. Sirazul Islam is: a senior software engineer in Dhaka, how he works, and the stack he builds with.",
  alternates: { canonical: "/about" },
};

const principles = [
  {
    title: "Ship, then measure",
    body: "A feature is not done when it merges. It is done when I can watch it working for real users and know what it costs them.",
  },
  {
    title: "Types are documentation",
    body: "End-to-end TypeScript, Zod at the boundaries, and schemas that make the wrong thing hard to write in the first place.",
  },
  {
    title: "Performance is a feature",
    body: "Slow booking pages lose bookings. I profile early, cache deliberately and treat responsiveness as part of the spec.",
  },
  {
    title: "Review is teaching",
    body: "Code review is where a team’s standards actually live. I write the reviews I would want to receive: specific, kind, about the code.",
  },
];

export default function AboutPage() {
  const years = yearsSince(site.careerStart);
  const degree = education[0];

  return (
    <>
      <section className="container-x pb-24 sm:pb-32">
        <SectionHeading
          as="h1"
          eyebrow="About"
          title={
            <>
              Engineer by training, <span className="serif-italic text-accent">product-minded</span> by habit.
            </>
          }
        />

        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal delay={0.1} className="lg:col-span-5">
            <div className="relative mx-auto max-w-sm rotate-2 overflow-hidden rounded-[2rem] border border-line shadow-2xl shadow-black/20 lg:sticky lg:top-28">
              <div className="relative aspect-[4/5]">
                <Image
                  src="/img/portrait.jpg"
                  alt={`Portrait of ${site.name}`}
                  fill
                  sizes="(min-width: 1024px) 420px, 90vw"
                  className="object-cover"
                />
              </div>
            </div>
          </Reveal>

          <div className="space-y-6 text-lg leading-relaxed text-muted lg:col-span-7">
            <Reveal>
              <p>
                I’m Sirazul, a senior software engineer based in Dhaka. I studied
                Computer Science at the University of Asia Pacific, co-authored
                a paper on detecting counterfeit medicine with deep learning, and
                then spent the next {years} years building for the web and, more
                recently, for mobile.
              </p>
            </Reveal>
            <Reveal delay={0.05}>
              <p>
                Today I’m a Senior Software Engineer at {site.current.company},
                where I lead the frontend of Akij Air, a full-scale flight booking
                platform, and built its iOS and Android apps from scratch in React
                Native. Alongside that I build Kicbak and the Direct Booking
                Alliance with a small distributed team. Before that I spent three
                and a half years at Flight Expert, growing from frontend
                developer to senior engineer on another high-traffic travel
                product.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <p>
                Travel booking is a demanding teacher: the interfaces are dense,
                the data changes while you look at it, and a slow page costs
                actual money. It taught me to care about architecture,
                performance, and the unglamorous details that keep a product
                trustworthy. Outside work I go deeper on the full stack:
                multi-tenant SaaS on Postgres and Prisma, real-time systems with
                Pusher and Socket.IO, durable jobs with Inngest, and practical AI
                features on the Vercel AI SDK and local models through Ollama.
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <p>
                I like typed code, small pull requests, code review as a form of
                teaching, and shipping things I can measure.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="flex flex-wrap gap-3 pt-4">
                <Button href="/contact">
                  Say hello
                  <ArrowRight className="size-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                </Button>
                <Button href={site.resumeUrl} variant="outline">
                  Resume (PDF)
                </Button>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="container-x pb-24 sm:pb-32">
        <SectionHeading
          eyebrow="How I work"
          title={
            <>
              Four <span className="serif-italic text-accent">principles</span> I keep coming back to.
            </>
          }
        />
        <div className="grid gap-5 md:grid-cols-2">
          {principles.map((p, i) => (
            <Reveal key={p.title} delay={(i % 2) * 0.08} className="h-full">
              <div className="flex h-full gap-6 rounded-3xl border border-line bg-elevated/50 p-7 transition-colors duration-500 hover:border-fg/20">
                <span className="serif-italic text-3xl leading-none text-accent">{pad2(i + 1)}</span>
                <div>
                  <h3 className="text-xl font-semibold tracking-tight">{p.title}</h3>
                  <p className="mt-2 leading-relaxed text-muted">{p.body}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="container-x pb-24 sm:pb-32">
        <SectionHeading
          eyebrow="Toolkit"
          title={
            <>
              What I <span className="serif-italic text-accent">build</span> with.
            </>
          }
          description="Ordered roughly by how often it shows up in my week."
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((group, i) => (
            <Reveal key={group.title} delay={i * 0.06} className="h-full">
              <div className="h-full rounded-3xl border border-line bg-elevated/50 p-6">
                <h3 className="font-semibold tracking-tight">{group.title}</h3>
                <p className="mt-1 text-sm text-faint">{group.blurb}</p>
                <ul className="mt-5 flex flex-wrap gap-1.5">
                  {group.items.map((item) => (
                    <li key={item}>
                      <Tag>{item}</Tag>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="container-x">
        <Reveal>
          <div className="grid gap-8 rounded-[2rem] border border-line bg-elevated/50 p-8 sm:p-10 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <p className="mono-label">Education</p>
              <h3 className="mt-3 text-2xl font-semibold tracking-tight">{degree.school}</h3>
              <p className="mt-1 text-muted">{degree.degree}</p>
              <p className="mt-3 font-mono text-xs text-faint">
                {degree.detail} · {degree.awards.join(" · ")}
              </p>
            </div>
            <div className="lg:col-span-7">
              <p className="mono-label">Research</p>
              {research.map((r) => (
                <a
                  key={r.href}
                  href={r.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group mt-3 block"
                >
                  <h3 className="link-underline inline text-2xl font-semibold tracking-tight">
                    {r.title}
                  </h3>
                  <p className="mt-1 text-muted">{r.venue}</p>
                  <p className="mt-2 text-sm text-faint">{r.summary}</p>
                </a>
              ))}
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
