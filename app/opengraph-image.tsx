import { ImageResponse } from "next/og";

export const alt = "Saquib Jamil — Communications & Digital Safety";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "#f7f2ea",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 28, fontWeight: 700, color: "#0d6b58", letterSpacing: "-0.02em", marginBottom: 28 }}>
          Saquib Jamil
        </div>
        <div style={{ display: "flex", fontSize: 68, fontWeight: 800, color: "#1a1a1a", letterSpacing: "-0.03em", lineHeight: 1.05, maxWidth: 900 }}>
          Communications, digital safety & product building.
        </div>
        <div style={{ display: "flex", fontSize: 26, color: "#555", marginTop: 36 }}>
          Project Coordinator · Centre for Social Research · New Delhi
        </div>
        <div style={{ display: "flex", marginTop: 48, height: 8, width: 160, background: "#c98a1e", borderRadius: 999 }} />
      </div>
    ),
    { ...size }
  );
}
