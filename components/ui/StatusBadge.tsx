import type { ProjectStatus } from "@/content/projects";
import { cn } from "@/lib/utils";

const config: Record<ProjectStatus, { label: string; dot: string; pulse: boolean }> = {
  production: { label: "In production", dot: "bg-live", pulse: true },
  live: { label: "Live", dot: "bg-live", pulse: true },
  "in-progress": { label: "In progress", dot: "bg-accent", pulse: true },
  source: { label: "Source available", dot: "bg-faint", pulse: false },
  shipped: { label: "Shipped", dot: "bg-muted", pulse: false },
};

export function StatusBadge({ status, className }: { status: ProjectStatus; className?: string }) {
  const c = config[status];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.12em] text-muted",
        className,
      )}
    >
      <span className="relative flex size-1.5">
        {c.pulse && (
          <span className={cn("absolute inline-flex size-full animate-ping-soft rounded-full", c.dot)} />
        )}
        <span className={cn("relative inline-flex size-1.5 rounded-full", c.dot)} />
      </span>
      {c.label}
    </span>
  );
}
