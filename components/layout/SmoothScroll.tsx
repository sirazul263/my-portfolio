"use client";

import type Lenis from "lenis";
import { useEffect } from "react";

/**
 * Inertial scrolling via Lenis, loaded during idle time so it never competes
 * with first paint. Skipped when the user prefers reduced motion.
 */
export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let lenis: Lenis | undefined;
    let cancelled = false;

    const start = () => {
      void import("lenis").then(({ default: LenisCtor }) => {
        if (cancelled) return;
        lenis = new LenisCtor({ autoRaf: true, lerp: 0.12, wheelMultiplier: 0.95 });
      });
    };

    const hasIdle = typeof window.requestIdleCallback === "function";
    const handle = hasIdle
      ? window.requestIdleCallback(start, { timeout: 2000 })
      : window.setTimeout(start, 300);

    return () => {
      cancelled = true;
      if (hasIdle) window.cancelIdleCallback(handle);
      else window.clearTimeout(handle);
      lenis?.destroy();
    };
  }, []);

  return null;
}
