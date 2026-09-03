"use client";

import { useLayoutEffect, useRef, type CSSProperties } from "react";

import { cn } from "@/lib/utils";

type Props = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  once?: boolean;
  /** Fraction of the element that must be visible before it animates. */
  amount?: number;
  /** Rendered element, so lists stay valid HTML. */
  as?: "div" | "li" | "section" | "article";
};

/**
 * Lifts content into view the first time it scrolls on screen.
 *
 * Server-rendered markup is left fully visible: only elements that sit below
 * the fold at hydration are hidden and observed. That keeps first paint, LCP
 * and no-JS rendering intact while still giving scroll-triggered entrances.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 24,
  once = true,
  amount = 0.2,
  as = "div",
}: Props) {
  const ref = useRef<HTMLDivElement & HTMLLIElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const rect = el.getBoundingClientRect();
    const onScreen = rect.top < window.innerHeight && rect.bottom > 0;
    if (onScreen) return;

    el.classList.add("reveal-hidden");
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            el.classList.remove("reveal-hidden");
            el.classList.add("reveal-in");
            if (once) observer.disconnect();
          } else if (!once) {
            el.classList.remove("reveal-in");
            el.classList.add("reveal-hidden");
          }
        }
      },
      { threshold: Math.min(amount, 0.5) },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [amount, once]);

  const style = {
    "--reveal-y": `${y}px`,
    animationDelay: `${delay}s`,
  } as CSSProperties;

  const classes = cn("reveal", className);

  switch (as) {
    case "li":
      return (
        <li ref={ref} className={classes} style={style}>
          {children}
        </li>
      );
    case "section":
      return (
        <section ref={ref} className={classes} style={style}>
          {children}
        </section>
      );
    case "article":
      return (
        <article ref={ref} className={classes} style={style}>
          {children}
        </article>
      );
    default:
      return (
        <div ref={ref} className={classes} style={style}>
          {children}
        </div>
      );
  }
}
