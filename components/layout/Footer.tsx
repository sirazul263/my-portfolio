import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

import { LocalTime } from "@/components/ui/LocalTime";
import { SocialIcon } from "@/components/ui/SocialIcon";
import { nav, site } from "@/content/site";

const commit = process.env.NEXT_PUBLIC_COMMIT_SHA ?? "local";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="container-x mt-32 border-t border-line pb-10 pt-16 sm:mt-40 sm:pt-24">
      <div className="grid gap-14 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <p className="mono-label">Contact</p>
          <h2 className="mt-5 text-4xl font-semibold leading-[1.02] tracking-[-0.03em] sm:text-6xl">
            Say <span className="serif-italic text-accent">hello.</span>
          </h2>
          <p className="mt-5 max-w-md text-muted">
            Roles, projects, or a question about something on this site. I read everything and
            reply to most of it.
          </p>
          <a
            href={`mailto:${site.email}`}
            className="link-underline mt-6 inline-block text-xl tracking-tight sm:text-2xl"
          >
            {site.email}
          </a>
        </div>

        <div className="grid grid-cols-2 gap-8 lg:col-span-5 lg:pl-8">
          <div>
            <p className="mono-label">Pages</p>
            <ul className="mt-5 space-y-2.5">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-muted transition-colors hover:text-fg"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/resume" className="text-sm text-muted transition-colors hover:text-fg">
                  Resume
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <p className="mono-label">Elsewhere</p>
            <ul className="mt-5 space-y-2.5">
              {site.socials.map((s) => (
                <li key={s.href}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-fg"
                  >
                    <SocialIcon name={s.icon} className="size-3.5" />
                    {s.label}
                    <ArrowUpRight className="size-3 opacity-0 transition-all group-hover:opacity-100" />
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={site.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted transition-colors hover:text-fg"
                >
                  Resume (PDF)
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="mt-16 flex flex-col gap-3 border-t border-line pt-6 font-mono text-[11px] text-faint sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {year} {site.name}. No template, no page builder.
        </p>
        <div className="flex flex-wrap items-center gap-x-5 gap-y-1">
          <span className="inline-flex items-center gap-2">
            <span className="relative flex size-1.5">
              <span className="absolute inline-flex size-full animate-ping-soft rounded-full bg-live" />
              <span className="relative inline-flex size-1.5 rounded-full bg-live" />
            </span>
            Dhaka <LocalTime withSeconds={false} />
          </span>
          <span>
            next 16 · react 19 · build{" "}
            <a
              href={`https://github.com/${site.githubUser}/my-portfolio`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted underline decoration-line underline-offset-2 transition-colors hover:text-fg"
            >
              {commit}
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}
