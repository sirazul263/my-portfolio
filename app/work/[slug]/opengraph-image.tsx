import { ImageResponse } from "next/og";

import { getProject, projects } from "@/content/projects";
import { site } from "@/content/site";

export const alt = "Project case study";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

/** Satori is happiest with hex colours, so convert the project hue up front. */
function hsl(h: number, s: number, l: number) {
  const a = (s / 100) * Math.min(l / 100, 1 - l / 100);
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    const c = l / 100 - a * Math.max(-1, Math.min(k - 3, 9 - k, 1));
    return Math.round(255 * c)
      .toString(16)
      .padStart(2, "0");
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}

export default async function ProjectOpenGraphImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  const host = site.url.replace(/^https?:\/\//, "");

  if (!project) {
    return new ImageResponse(
      <div style={{ width: "100%", height: "100%", background: "#0b0b0c" }} />,
      size,
    );
  }

  const from = hsl(project.hue, 45, 11);
  const to = hsl((project.hue + 40) % 360, 55, 27);
  const glow = hsl(project.hue, 90, 66);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: `linear-gradient(135deg, ${from} 0%, ${to} 100%)`,
          color: "#f2eee5",
          fontFamily: "Georgia, 'Times New Roman', serif",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            right: -120,
            top: -160,
            width: 520,
            height: 520,
            borderRadius: 999,
            background: glow,
            opacity: 0.35,
            filter: "blur(80px)",
          }}
        />
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 26,
            color: "rgba(242,238,229,0.7)",
          }}
        >
          <span>Case study · {project.year}</span>
          <span>{host}</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          <div style={{ fontSize: 96, fontWeight: 600, letterSpacing: -4, lineHeight: 1 }}>
            {project.title}
          </div>
          <div style={{ fontSize: 38, fontStyle: "italic", color: "rgba(242,238,229,0.8)" }}>
            {project.tagline}
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 10 }}>
            {project.stack.slice(0, 6).map((tech) => (
              <span
                key={tech}
                style={{
                  fontSize: 20,
                  padding: "8px 16px",
                  borderRadius: 999,
                  border: "1px solid rgba(242,238,229,0.35)",
                  color: "rgba(242,238,229,0.9)",
                }}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 26 }}>
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: 999,
              background: "#f2eee5",
              color: "#0b0b0c",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontStyle: "italic",
              fontSize: 26,
            }}
          >
            S
          </div>
          <span>{site.name}</span>
          <span style={{ color: "rgba(242,238,229,0.6)" }}>· {site.role}</span>
        </div>
      </div>
    ),
    size,
  );
}
