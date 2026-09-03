"use client";

import { ArrowUpRight, Command, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { SocialIcon } from "@/components/ui/SocialIcon";
import { nav, site } from "@/content/site";
import { openCommandPalette } from "@/lib/command-palette";
import { useScrolled } from "@/lib/hooks";
import { cn } from "@/lib/utils";

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

export function Navbar() {
  const pathname = usePathname();
  const scrolled = useScrolled(16);
  const [open, setOpen] = useState(false);
  const barRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const pillRef = useRef<HTMLSpanElement>(null);
  const measuredOnce = useRef(false);

  // Reading-progress bar, driven directly from scroll without React state.
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progress = max > 0 ? Math.min(1, window.scrollY / max) : 0;
      if (barRef.current) barRef.current.style.transform = `scaleX(${progress})`;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  // Sliding highlight behind the active link. CSS shows a static highlight until
  // this measures, so there is no flash before hydration.
  useLayoutEffect(() => {
    const navEl = navRef.current;
    const pill = pillRef.current;
    if (!navEl || !pill) return;

    const measure = () => {
      const active = navEl.querySelector<HTMLElement>('[aria-current="page"]');
      if (!active) {
        pill.style.opacity = "0";
        return;
      }
      if (!measuredOnce.current) {
        pill.style.transition = "none";
        measuredOnce.current = true;
        requestAnimationFrame(() => {
          pill.style.transition = "";
        });
      }
      pill.style.opacity = "1";
      pill.style.width = `${active.offsetWidth}px`;
      pill.style.transform = `translateX(${active.offsetLeft}px)`;
      navEl.dataset.pill = "ready";
    };

    measure();
    document.fonts?.ready.then(measure);
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const close = () => setOpen(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        ref={barRef}
        aria-hidden
        className="absolute inset-x-0 top-0 h-0.5 origin-left bg-accent transition-transform duration-150 ease-out"
        style={{ transform: "scaleX(0)" }}
      />
      <div
        className={cn(
          "transition-all duration-500 ease-expo",
          scrolled
            ? "border-b border-line bg-bg/75 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent",
        )}
      >
        <div className="container-x flex h-16 items-center justify-between gap-4 sm:h-[4.5rem]">
          <Link
            href="/"
            onClick={close}
            className="group flex items-center gap-3"
            aria-label="Home"
          >
            <span className="serif-italic grid size-9 place-items-center rounded-full bg-fg text-lg leading-none text-bg transition-transform duration-500 ease-expo group-hover:rotate-[-8deg]">
              S
            </span>
            <span className="hidden text-sm font-medium tracking-tight sm:block">
              {site.firstName} Islam
            </span>
          </Link>

          <nav
            ref={navRef}
            aria-label="Primary"
            className="relative hidden items-center gap-0.5 rounded-full border border-line bg-elevated/60 p-1 backdrop-blur-md md:flex"
          >
            <span
              ref={pillRef}
              aria-hidden
              className="absolute left-0 top-1 h-[calc(100%-0.5rem)] rounded-full bg-accent-soft transition-[transform,width,opacity] duration-500 ease-expo"
              style={{ width: 0, opacity: 0 }}
            />
            {nav.map((item) => {
              const active = isActive(pathname, item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "relative rounded-full px-4 py-1.5 text-sm transition-colors duration-300",
                    active ? "nav-active text-fg" : "text-muted hover:text-fg",
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="hidden items-center gap-2 md:flex">
            <button
              type="button"
              onClick={openCommandPalette}
              className="flex h-9 items-center gap-2 rounded-full border border-line px-3 text-xs text-muted transition-all duration-300 hover:bg-accent-soft hover:text-fg"
              aria-label="Open command palette"
            >
              <Command className="size-3.5" />
              <kbd className="text-[11px]">K</kbd>
            </button>
            <ThemeToggle />
            <a
              href={site.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex h-9 items-center gap-1.5 rounded-full bg-fg pl-4 pr-3 text-sm font-medium text-bg transition-all duration-300 hover:bg-accent hover:text-accent-fg"
            >
              Resume
              <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              className="grid size-9 place-items-center rounded-full border border-line text-fg"
            >
              {open ? <X className="size-4" /> : <Menu className="size-4" />}
            </button>
          </div>
        </div>
      </div>

      {open && (
        <div
          id="mobile-menu"
          className="fade-in fixed inset-0 top-16 z-40 flex flex-col bg-bg md:hidden"
        >
          <nav
            aria-label="Mobile"
            className="container-x flex flex-1 flex-col justify-center gap-2 py-8"
          >
            {nav.map((item, i) => {
              const active = isActive(pathname, item.href);
              return (
                <div
                  key={item.href}
                  className="animate-rise"
                  style={{ animationDelay: `${0.05 + i * 0.05}s` }}
                >
                  <Link
                    href={item.href}
                    onClick={close}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "flex items-baseline gap-4 py-3 text-4xl font-semibold tracking-tight",
                      active ? "text-fg" : "text-muted",
                    )}
                  >
                    <span className="font-mono text-xs text-faint">0{i + 1}</span>
                    {item.label}
                  </Link>
                </div>
              );
            })}
            <div
              className="mt-8 flex animate-rise flex-wrap items-center gap-3"
              style={{ animationDelay: "0.35s" }}
            >
              <a
                href={site.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-11 items-center gap-2 rounded-full bg-fg px-5 text-sm font-medium text-bg"
              >
                Resume <ArrowUpRight className="size-4" />
              </a>
              {site.socials.map((s) => (
                <a
                  key={s.href}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="grid size-11 place-items-center rounded-full border border-line text-muted"
                >
                  <SocialIcon name={s.icon} className="size-4" />
                </a>
              ))}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
