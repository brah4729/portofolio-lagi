import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Dhiren — Software Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "72px 80px",
          background: "#26150A",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* Ambient glow */}
        <div
          style={{
            position: "absolute",
            top: "-100px",
            right: "-100px",
            width: "500px",
            height: "500px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(255,140,66,0.12) 0%, transparent 70%)",
          }}
        />

        {/* Top label */}
        <p
          style={{
            color: "#FF8C42",
            fontSize: "20px",
            letterSpacing: "0.15em",
            margin: "0 0 24px",
            fontWeight: 400,
          }}
        >
          &gt;_ portfolio
        </p>

        {/* Name */}
        <h1
          style={{
            fontSize: "80px",
            fontWeight: 700,
            color: "#FFE6D5",
            margin: "0 0 4px",
            lineHeight: 1.05,
            letterSpacing: "-0.02em",
          }}
        >
          Dhiren
        </h1>

        {/* Accent underline */}
        <div
          style={{
            width: "80px",
            height: "4px",
            background: "#FF8C42",
            borderRadius: "2px",
            margin: "12px 0 28px",
          }}
        />

        {/* Roles */}
        <p
          style={{
            fontSize: "26px",
            color: "#C4906A",
            margin: "0 0 40px",
            fontWeight: 500,
          }}
        >
          ML Engineer · Fullstack Developer · OS Builder
        </p>

        {/* Tech stack tags */}
        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
          {["YOLOv8", "Next.js", "Go", "C / NASM", "Python", "NixOS"].map(
            (tag) => (
              <div
                key={tag}
                style={{
                  padding: "6px 16px",
                  border: "1px solid #5C381E",
                  borderRadius: "4px",
                  color: "#C4906A",
                  fontSize: "16px",
                  background: "#3D2413",
                }}
              >
                {tag}
              </div>
            )
          )}
        </div>

        {/* Bottom domain */}
        <p
          style={{
            position: "absolute",
            bottom: "48px",
            right: "80px",
            color: "#5C381E",
            fontSize: "18px",
            margin: 0,
            letterSpacing: "0.05em",
          }}
        >
          dhiren.dev
        </p>
      </div>
    ),
    size
  );
}
