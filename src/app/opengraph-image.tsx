import { ImageResponse } from "next/og";

export const alt = "Sonar Studio. Get found when your customers ask AI.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(<div style={{ width: "100%", height: "100%", display: "flex", background: "#0B1F1C", color: "#F6F9F8", padding: "72px", flexDirection: "column", justifyContent: "space-between", fontFamily: "Space Grotesk, sans-serif" }}><div style={{ display: "flex", alignItems: "center", gap: 18, fontSize: 30, fontWeight: 700 }}><span style={{ width: 34, height: 12, background: "#14B8A6" }} />SONAR STUDIO</div><div style={{ display: "flex", flexDirection: "column" }}><div style={{ fontSize: 84, lineHeight: .95, letterSpacing: "-4px", maxWidth: 880, fontWeight: 700 }}>Get found when your customers ask AI.</div><div style={{ width: 320, height: 2, background: "#6FE3CE", marginTop: 52 }} /></div></div>, size);
}
