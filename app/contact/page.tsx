import { MapPin } from "lucide-react";
import type { Metadata } from "next";

import { ContactForm } from "@/components/contact/ContactForm";
import { CopyButton } from "@/components/ui/CopyButton";
import { LocalTime } from "@/components/ui/LocalTime";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SocialIcon } from "@/components/ui/SocialIcon";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Md. Sirazul Islam about senior frontend or full-stack roles, freelance projects, or questions about his work.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <section className="container-x">
      <SectionHeading
        as="h1"
        eyebrow="Contact"
        title={
          <>
            Let’s <span className="serif-italic text-accent">talk.</span>
          </>
        }
        description="Whether it’s a role, a project, or a question about something I built, my inbox is open."
      />

      <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
        <div className="space-y-10 lg:col-span-5">
          <Reveal>
            <p className="mono-label">Email</p>
            <a
              href={`mailto:${site.email}`}
              className="link-underline mt-3 inline-block break-all text-2xl tracking-tight sm:text-3xl"
            >
              {site.email}
            </a>
            <div className="mt-4">
              <CopyButton value={site.email} label="Copy address" />
            </div>
          </Reveal>

          <Reveal delay={0.05}>
            <p className="mono-label">Elsewhere</p>
            <ul className="mt-4 divide-y divide-line border-y border-line">
              {site.socials.map((s) => (
                <li key={s.href}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between py-3.5 transition-colors"
                  >
                    <span className="inline-flex items-center gap-3 text-muted transition-colors group-hover:text-fg">
                      <SocialIcon name={s.icon} className="size-4" />
                      {s.label}
                    </span>
                    <span className="font-mono text-xs text-faint">{s.handle}</span>
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="mono-label">Location</p>
            <p className="mt-3 flex flex-wrap items-center gap-x-2 text-muted">
              <MapPin className="size-4" />
              {site.location}
              <span className="text-faint">·</span>
              <LocalTime className="font-mono text-sm" />
            </p>
            <p className="mt-2 text-sm text-faint">I usually reply within a day or two.</p>
          </Reveal>
        </div>

        <Reveal delay={0.1} className="lg:col-span-7">
          <div className="rounded-[2rem] border border-line bg-elevated/60 p-6 sm:p-8">
            <ContactForm />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
