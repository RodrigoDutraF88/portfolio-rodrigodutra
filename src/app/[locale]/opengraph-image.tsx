import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const alt = "Rodrigo Dutra — Full-stack developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Branded Open Graph card, generated at build time. Shared across locales.
export default function Image() {
  return new ImageResponse(
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        background: "#0c0f14",
        color: "#e7ebf0",
        padding: "80px",
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ display: "flex", fontSize: 30, color: "#58a6ff" }}>~/rodrigo $ whoami</div>
      <div style={{ display: "flex", fontSize: 100, fontWeight: 700, marginTop: 24 }}>
        {site.name}
      </div>
      <div style={{ display: "flex", fontSize: 38, color: "#98a2b3", marginTop: 16 }}>
        Full-stack developer · Software Engineering @ UnB
      </div>
      <div
        style={{ display: "flex", marginTop: 44, height: 12, width: 200, background: "#58a6ff" }}
      />
    </div>,
    size,
  );
}
