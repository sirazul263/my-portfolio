import { ImageResponse } from "next/og";

import { site } from "@/content/site";

export const alt = `${site.name} — ${site.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  const host = site.url.replace(/^https?:\/\//, "");
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
          background: "linear-gradient(135deg, #0b0b0c 0%, #17140c 100%)",
          color: "#f2eee5",
          fontFamily: "Georgia, 'Times New Roman', serif",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 26,
            color: "#a5a29b",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: 999,
                background: "#f2eee5",
                color: "#0b0b0c",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontStyle: "italic",
                fontSize: 28,
              }}
            >
              S
            </div>
            <span>{site.name}</span>
          </div>
          <span>{host}</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              fontSize: 92,
              fontWeight: 600,
              letterSpacing: -4,
              lineHeight: 1,
              maxWidth: 1000,
            }}
          >
            <span style={{ marginRight: 24 }}>Building</span>
            <span style={{ marginRight: 24 }}>fast,</span>
            <span style={{ marginRight: 24, color: "#f2c14e", fontStyle: "italic" }}>dependable</span>
            <span style={{ marginRight: 24 }}>software</span>
            <span style={{ marginRight: 24 }}>for</span>
            <span style={{ marginRight: 24 }}>web</span>
            <span style={{ marginRight: 24 }}>and</span>
            <span>mobile.</span>
          </div>
          <div style={{ display: "flex", fontSize: 30, color: "#a5a29b" }}>
            {site.role} · {site.location}
          </div>
        </div>
      </div>
    ),
    size,
  );
}
