import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

type Props = {
  index?: string;
  eyebrow: string;
  title: React.ReactNode;
  description?: string;
  action?: { href: string; label: string };
  className?: string;
  as?: "h1" | "h2";
};

export function SectionHeading({
  index,
  eyebrow,
  title,
  description,
  action,
  className,
  as: Heading = "h2",
}: Props) {
  const isPageTitle = Heading === "h1";
  const wrapperClass = cn(
    "mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between sm:mb-16",
    className,
  );

  const content = (
    <>
      <div className="max-w-2xl">
        <p className="mono-label flex items-center gap-3">
          {index && <span className="text-accent">{index}</span>}
          <span className="h-px w-8 bg-line" aria-hidden />
          {eyebrow}
        </p>
        <Heading
          className={cn(
            "mt-5 font-semibold tracking-[-0.03em]",
            isPageTitle
              ? "text-4xl leading-[1] sm:text-6xl lg:text-7xl"
              : "text-3xl leading-[1.05] sm:text-5xl",
          )}
        >
          {title}
        </Heading>
        {description && (
          <p className="mt-5 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
            {description}
          </p>
        )}
      </div>
      {action && (
        <Link
          href={action.href}
          className="group inline-flex shrink-0 items-center gap-2 text-sm text-muted transition-colors hover:text-fg"
        >
          {action.label}
          <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      )}
    </>
  );

  // Page titles sit above the fold and are usually the LCP element, so they use a
  // CSS entrance that never waits on hydration.
  if (isPageTitle) {
    return <div className={cn(wrapperClass, "animate-rise")}>{content}</div>;
  }
  return <Reveal className={wrapperClass}>{content}</Reveal>;
}
