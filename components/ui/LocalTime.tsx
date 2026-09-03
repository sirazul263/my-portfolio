"use client";

import { site } from "@/content/site";
import { useZonedTime } from "@/lib/hooks";

type Props = { withSeconds?: boolean; className?: string };

/** Live clock in the site owner's timezone. Renders a placeholder until hydrated. */
export function LocalTime({ withSeconds = true, className }: Props) {
  const time = useZonedTime(site.timezone, withSeconds);
  return (
    <time
      className={className}
      suppressHydrationWarning
      aria-label={`Local time in ${site.location}`}
    >
      {time ?? (withSeconds ? "--:--:--" : "--:--")}
      <span className="ml-1 text-faint">GMT+6</span>
    </time>
  );
}
