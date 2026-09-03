import Image from "next/image";

import type { Project } from "@/content/projects";
import { cn, initialsOf } from "@/lib/utils";

type Props = {
  project: Pick<Project, "slug" | "title" | "hue" | "image">;
  className?: string;
  priority?: boolean;
  /** Unique prefix for SVG ids when the same project renders twice on a page. */
  idPrefix?: string;
  sizes?: string;
};

/**
 * Cover art for a project. Uses a real screenshot when one is provided,
 * otherwise renders a deterministic generative composition from the hue.
 */
export function ProjectVisual({ project, className, priority, idPrefix, sizes }: Props) {
  if (project.image) {
    return (
      <Image
        src={project.image}
        alt={`${project.title} screenshot`}
        fill
        priority={priority}
        sizes={sizes ?? "(min-width: 1024px) 50vw, 100vw"}
        className={cn("object-cover", className)}
      />
    );
  }

  const id = idPrefix ?? project.slug;
  const h = project.hue;
  const h2 = (h + 40) % 360;
  const initials = initialsOf(project.title);

  return (
    <svg
      viewBox="0 0 800 500"
      preserveAspectRatio="xMidYMid slice"
      className={cn("h-full w-full", className)}
      aria-hidden
      focusable="false"
    >
      <defs>
        <linearGradient id={`${id}-bg`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={`hsl(${h} 45% 11%)`} />
          <stop offset="100%" stopColor={`hsl(${h2} 55% 27%)`} />
        </linearGradient>
        <radialGradient id={`${id}-glow`} cx="0.86" cy="0.12" r="0.75">
          <stop offset="0%" stopColor={`hsl(${h} 90% 66%)`} stopOpacity="0.6" />
          <stop offset="100%" stopColor={`hsl(${h} 90% 66%)`} stopOpacity="0" />
        </radialGradient>
        <pattern id={`${id}-grid`} width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M40 0H0V40" fill="none" stroke="white" strokeOpacity="0.07" />
        </pattern>
        <filter id={`${id}-noise`}>
          <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
      </defs>

      <rect width="800" height="500" fill={`url(#${id}-bg)`} />
      <rect width="800" height="500" fill={`url(#${id}-grid)`} />
      <rect width="800" height="500" fill={`url(#${id}-glow)`} />

      <g fill="none" stroke="white" strokeOpacity="0.14">
        <circle cx="650" cy="110" r="90" />
        <circle cx="650" cy="110" r="175" />
        <circle cx="650" cy="110" r="270" strokeDasharray="3 9" />
      </g>

      <g transform="translate(72 92)">
        <rect width="440" height="304" rx="20" fill="white" fillOpacity="0.06" stroke="white" strokeOpacity="0.16" />
        <circle cx="26" cy="26" r="5" fill="white" fillOpacity="0.35" />
        <circle cx="44" cy="26" r="5" fill="white" fillOpacity="0.25" />
        <circle cx="62" cy="26" r="5" fill="white" fillOpacity="0.18" />
        <rect x="26" y="62" width="176" height="14" rx="7" fill="white" fillOpacity="0.55" />
        <rect x="26" y="94" width="300" height="10" rx="5" fill="white" fillOpacity="0.22" />
        <rect x="26" y="114" width="248" height="10" rx="5" fill="white" fillOpacity="0.16" />
        <rect
          x="26"
          y="154"
          width="388"
          height="112"
          rx="14"
          fill={`hsl(${h} 80% 60%)`}
          fillOpacity="0.2"
          stroke={`hsl(${h} 80% 72%)`}
          strokeOpacity="0.45"
        />
        <polyline
          points="48,244 104,218 154,228 214,182 274,198 334,166 396,178"
          fill="none"
          stroke={`hsl(${h} 90% 78%)`}
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="396" cy="178" r="5" fill={`hsl(${h} 90% 78%)`} />
        <rect x="26" y="280" width="96" height="10" rx="5" fill="white" fillOpacity="0.3" />
        <rect x="134" y="280" width="60" height="10" rx="5" fill="white" fillOpacity="0.18" />
      </g>

      <text
        x="770"
        y="456"
        textAnchor="end"
        fontFamily="var(--font-instrument), Georgia, serif"
        fontStyle="italic"
        fontSize="230"
        fill="white"
        fillOpacity="0.09"
      >
        {initials}
      </text>

      <rect
        width="800"
        height="500"
        filter={`url(#${id}-noise)`}
        opacity="0.1"
        style={{ mixBlendMode: "overlay" }}
      />
    </svg>
  );
}
