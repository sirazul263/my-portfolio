"use client";

import { useEffect } from "react";

/**
 * Module-level flag: false during SSR and the very first client render, true
 * for every later client-side navigation. The initial HTML is therefore never
 * hidden behind an entrance animation, while route changes still get one.
 */
let hasNavigated = false;

export default function Template({ children }: { children: React.ReactNode }) {
  const animate = hasNavigated;

  useEffect(() => {
    hasNavigated = true;
  }, []);

  return <div className={animate ? "page-enter" : undefined}>{children}</div>;
}
