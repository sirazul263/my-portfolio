"use client";

import {
  ArrowRight,
  Copy,
  Download,
  FileText,
  Home,
  Layers,
  Mail,
  Moon,
  Search,
  Sun,
  User,
  Briefcase,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { SocialIcon } from "@/components/ui/SocialIcon";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";

type Item = {
  id: string;
  group: "Navigate" | "Actions" | "Elsewhere";
  label: string;
  hint?: string;
  icon: React.ReactNode;
  keywords?: string;
  run: () => void;
};

type Props = { open: boolean; onClose: () => void };

export function CommandPalette({ open, onClose }: Props) {
  const router = useRouter();
  const { resolvedTheme, setTheme } = useTheme();
  const [query, setQuery] = useState("");
  const [cursor, setCursor] = useState(0);
  const [copied, setCopied] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const close = useCallback(() => {
    onClose();
    setQuery("");
    setCursor(0);
  }, [onClose]);

  const items = useMemo<Item[]>(() => {
    const go = (href: string) => () => {
      close();
      router.push(href);
    };
    return [
      { id: "home", group: "Navigate", label: "Home", icon: <Home className="size-4" />, run: go("/") },
      { id: "work", group: "Navigate", label: "Work", hint: "Projects & case studies", icon: <Layers className="size-4" />, keywords: "projects portfolio", run: go("/work") },
      { id: "experience", group: "Navigate", label: "Experience", hint: "Career timeline", icon: <Briefcase className="size-4" />, keywords: "jobs career resume", run: go("/experience") },
      { id: "about", group: "Navigate", label: "About", icon: <User className="size-4" />, keywords: "bio skills", run: go("/about") },
      { id: "contact", group: "Navigate", label: "Contact", icon: <Mail className="size-4" />, keywords: "email hire", run: go("/contact") },
      { id: "resume-page", group: "Navigate", label: "Resume", hint: "Web version, printable", icon: <FileText className="size-4" />, keywords: "cv resume print", run: go("/resume") },
      {
        id: "copy-email",
        group: "Actions",
        label: copied ? "Copied!" : "Copy email address",
        hint: site.email,
        icon: <Copy className="size-4" />,
        run: () => {
          void navigator.clipboard.writeText(site.email).then(() => {
            setCopied(true);
            window.setTimeout(() => setCopied(false), 1500);
          });
        },
      },
      {
        id: "resume",
        group: "Actions",
        label: "Download resume",
        hint: "PDF",
        icon: <Download className="size-4" />,
        keywords: "cv",
        run: () => {
          close();
          window.open(site.resumeUrl, "_blank", "noopener,noreferrer");
        },
      },
      {
        id: "theme",
        group: "Actions",
        label: resolvedTheme === "dark" ? "Switch to light theme" : "Switch to dark theme",
        icon: resolvedTheme === "dark" ? <Sun className="size-4" /> : <Moon className="size-4" />,
        keywords: "dark light mode appearance",
        run: () => setTheme(resolvedTheme === "dark" ? "light" : "dark"),
      },
      ...site.socials.map<Item>((s) => ({
        id: s.icon,
        group: "Elsewhere",
        label: s.label,
        hint: s.handle,
        icon: <SocialIcon name={s.icon} className="size-4" />,
        run: () => {
          close();
          window.open(s.href, "_blank", "noopener,noreferrer");
        },
      })),
    ];
  }, [close, copied, resolvedTheme, router, setTheme]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter((i) =>
      `${i.label} ${i.hint ?? ""} ${i.keywords ?? ""} ${i.group}`.toLowerCase().includes(q),
    );
  }, [items, query]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  useEffect(() => {
    const el = listRef.current?.querySelector<HTMLElement>(`[data-index="${cursor}"]`);
    el?.scrollIntoView({ block: "nearest" });
  }, [cursor]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setCursor((c) => Math.min(c + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setCursor((c) => Math.max(c - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      filtered[cursor]?.run();
    } else if (e.key === "Escape") {
      e.preventDefault();
      close();
    }
  };

  const groups = ["Navigate", "Actions", "Elsewhere"] as const;
  let runningIndex = -1;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          className="fixed inset-0 z-[80] flex items-start justify-center bg-bg/60 px-4 pt-[14vh] backdrop-blur-sm"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) close();
          }}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Command palette"
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-lg overflow-hidden rounded-2xl border border-line bg-elevated shadow-2xl shadow-black/30"
          >
            <div className="flex items-center gap-3 border-b border-line px-4">
              <Search className="size-4 text-faint" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setCursor(0);
                }}
                onKeyDown={onKeyDown}
                placeholder="Where to?"
                aria-label="Search commands"
                className="h-13 flex-1 bg-transparent text-sm outline-none placeholder:text-faint"
              />
              <kbd className="rounded-md border border-line px-1.5 py-0.5 text-[10px] text-faint">
                esc
              </kbd>
            </div>

            <div ref={listRef} className="max-h-[50vh] overflow-y-auto p-2">
              {filtered.length === 0 && (
                <p className="px-3 py-8 text-center text-sm text-faint">
                  Nothing matches “{query}”.
                </p>
              )}
              {groups.map((group) => {
                const groupItems = filtered.filter((i) => i.group === group);
                if (groupItems.length === 0) return null;
                return (
                  <div key={group} className="mb-1">
                    <p className="mono-label px-3 pb-1.5 pt-2">{group}</p>
                    <ul role="listbox" aria-label={group}>
                      {groupItems.map((item) => {
                        runningIndex += 1;
                        const index = runningIndex;
                        const active = index === cursor;
                        return (
                          <li
                            key={item.id}
                            data-index={index}
                            role="option"
                            aria-selected={active}
                            onMouseEnter={() => setCursor(index)}
                            onClick={() => item.run()}
                            className={cn(
                              "flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors",
                              active ? "bg-accent-soft text-fg" : "text-muted",
                            )}
                          >
                            <span
                              className={cn(
                                "grid size-7 place-items-center rounded-lg border border-line",
                                active && "border-accent/40 text-accent",
                              )}
                            >
                              {item.icon}
                            </span>
                            <span className="flex-1">{item.label}</span>
                            {item.hint && (
                              <span className="truncate font-mono text-[11px] text-faint">
                                {item.hint}
                              </span>
                            )}
                            {active && <ArrowRight className="size-3.5 text-faint" />}
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
