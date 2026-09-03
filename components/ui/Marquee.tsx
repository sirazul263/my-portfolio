import { cn } from "@/lib/utils";

type Props = {
  items: string[];
  className?: string;
  /** Seconds per full loop. */
  duration?: number;
  reverse?: boolean;
};

/** Infinite horizontal ticker. Pauses on hover; static when motion is reduced. */
export function Marquee({ items, className, duration = 48, reverse = false }: Props) {
  const row = [...items, ...items];
  return (
    <div className={cn("group mask-x relative flex w-full overflow-hidden", className)}>
      <div
        className="flex shrink-0 animate-marquee items-center gap-3 pr-3 group-hover:[animation-play-state:paused] motion-reduce:animate-none"
        style={{
          animationDuration: `${duration}s`,
          animationDirection: reverse ? "reverse" : "normal",
        }}
      >
        {row.map((item, i) => (
          <span
            key={`${item}-${i}`}
            aria-hidden={i >= items.length}
            className="whitespace-nowrap rounded-full border border-line bg-elevated/60 px-4 py-2 font-mono text-xs text-muted"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
