"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

import { COMMAND_PALETTE_EVENT } from "@/lib/command-palette";

/** Loaded on first use only, so the palette (and Motion) stay out of the initial bundle. */
const CommandPalette = dynamic(
  () => import("@/components/layout/CommandPalette").then((m) => m.CommandPalette),
  { ssr: false },
);

export function CommandPaletteLoader() {
  const [open, setOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const show = () => {
      setLoaded(true);
      setOpen(true);
    };
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setLoaded(true);
        setOpen((v) => !v);
      }
    };
    window.addEventListener(COMMAND_PALETTE_EVENT, show);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener(COMMAND_PALETTE_EVENT, show);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  if (!loaded) return null;
  return <CommandPalette open={open} onClose={() => setOpen(false)} />;
}
