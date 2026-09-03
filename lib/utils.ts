import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Years elapsed since an ISO date, rounded to the nearest whole year (how résumés count). */
export function yearsSince(iso: string, now = new Date()) {
  const start = new Date(iso);
  const months =
    (now.getFullYear() - start.getFullYear()) * 12 + (now.getMonth() - start.getMonth());
  return Math.max(0, Math.round(months / 12));
}

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

/** "2024-01" -> "Jan 2024"; "present" -> "Present". */
export function formatMonth(ym: string) {
  if (ym === "present") return "Present";
  const [y, m] = ym.split("-").map(Number);
  return `${MONTHS[(m ?? 1) - 1]} ${y}`;
}

export function formatRange(start: string, end: string) {
  return `${formatMonth(start)} — ${formatMonth(end)}`;
}

/** Human duration between two YYYY-MM values (end may be "present"). */
export function durationLabel(start: string, end: string, now = new Date()) {
  const [sy, sm] = start.split("-").map(Number);
  const [ey, em] =
    end === "present"
      ? [now.getFullYear(), now.getMonth() + 1]
      : end.split("-").map(Number);
  const months = (ey - sy) * 12 + (em - sm) + 1;
  const y = Math.floor(months / 12);
  const m = months % 12;
  const parts: string[] = [];
  if (y) parts.push(`${y} yr${y > 1 ? "s" : ""}`);
  if (m) parts.push(`${m} mo${m > 1 ? "s" : ""}`);
  return parts.join(" ") || "1 mo";
}

/** Two-digit section index, e.g. 1 -> "01". */
export function pad2(n: number) {
  return String(n).padStart(2, "0");
}

const RELATIVE_UNITS: [Intl.RelativeTimeFormatUnit, number][] = [
  ["year", 31536000],
  ["month", 2592000],
  ["week", 604800],
  ["day", 86400],
  ["hour", 3600],
  ["minute", 60],
];

/** "3 days ago", "last month", etc. */
export function timeAgo(iso: string, now = Date.now()) {
  const seconds = Math.max(0, (now - new Date(iso).getTime()) / 1000);
  const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });
  for (const [unit, size] of RELATIVE_UNITS) {
    if (seconds >= size) return rtf.format(-Math.floor(seconds / size), unit);
  }
  return "just now";
}

/** Deterministic 7-hex-char pseudo commit hash for a string. */
export function shortHash(input: string) {
  let h = 5381;
  for (let i = 0; i < input.length; i++) h = ((h << 5) + h + input.charCodeAt(i)) >>> 0;
  return h.toString(16).padStart(8, "0").slice(0, 7);
}

/** Initials for a title, max two letters. */
export function initialsOf(title: string) {
  return title
    .split(/\s+/)
    .filter(Boolean)
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}
