import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { changelog, type ChangelogEntry } from "@/content/changelog";
import { cn, formatMonth, shortHash } from "@/lib/utils";

const typeColor: Record<ChangelogEntry["type"], string> = {
  feat: "text-live",
  release: "text-accent",
  perf: "text-accent",
  docs: "text-muted",
  chore: "text-faint",
};

function dateLabel(date: string) {
  return date.includes("-") ? formatMonth(date) : date;
}

function Row({ entry }: { entry: ChangelogEntry }) {
  const hash = shortHash(`${entry.date} ${entry.scope} ${entry.message}`);
  const external = entry.href?.startsWith("http");
  const body = (
    <>
      <span className="shrink-0 text-accent">{hash}</span>
      <span className="min-w-0 flex-1">
        <span className={cn("font-medium", typeColor[entry.type])}>{entry.type}</span>
        <span className="text-faint">({entry.scope}):</span>{" "}
        <span className="text-fg">{entry.message}</span>
        {entry.href && (
          <ArrowUpRight className="ml-1.5 inline size-3 -translate-y-px text-faint opacity-0 transition-opacity group-hover:opacity-100" />
        )}
      </span>
      <span className="shrink-0 text-faint">{dateLabel(entry.date)}</span>
    </>
  );
  const className =
    "group flex items-baseline gap-4 px-4 py-2.5 font-mono text-[13px] leading-relaxed transition-colors sm:px-5";

  if (!entry.href) return <div className={className}>{body}</div>;
  if (external) {
    return (
      <a href={entry.href} target="_blank" rel="noopener noreferrer" className={cn(className, "hover:bg-accent-soft")}>
        {body}
      </a>
    );
  }
  return (
    <Link href={entry.href} className={cn(className, "hover:bg-accent-soft")}>
      {body}
    </Link>
  );
}

export function Changelog() {
  return (
    <section className="container-x pb-24 sm:pb-32">
      <SectionHeading
        index="02"
        eyebrow="Changelog"
        title="Commits to the career."
        description="Milestones, newest first. The hashes are fake; the dates are not."
        action={{ href: "/experience", label: "Full timeline" }}
      />

      <Reveal>
        <div className="overflow-hidden rounded-2xl border border-line bg-elevated/60">
          <div className="flex items-center gap-2 border-b border-line px-4 py-2.5 font-mono text-[11px] text-faint sm:px-5">
            <span className="text-accent">~/sirazul</span>
            <span>$</span>
            <span className="text-muted">git log --oneline --date=short</span>
          </div>
          <div className="divide-y divide-line overflow-x-auto">
            {changelog.map((entry) => (
              <Row key={`${entry.date}-${entry.scope}`} entry={entry} />
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
