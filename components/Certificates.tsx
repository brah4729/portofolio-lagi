"use client";
import { useState } from "react";
import Image from "next/image";

// ─── ADD YOUR CERTIFICATES HERE ───────────────────────────────────────────────
// Put your image files in /public/certificates/
// Then add an entry here with the filename and a label
// ──────────────────────────────────────────────────────────────────────────────
const certificates = [
  { src: "/certificates/cert1.png", label: "Certificate 1" },
  { src: "/certificates/cert2.png", label: "Certificate 2" },
  { src: "/certificates/cert3.png", label: "Certificate 3" },
  { src: "/certificates/cert4.png", label: "Certificate 4" },
];
export default function Certificates() {
  const [preview, setPreview] = useState<string | null>(null);

  return (
    <section
      id="certificates"
      style={{
        padding: "6rem 1.5rem",
        maxWidth: "1100px",
        margin: "0 auto",
        borderTop: "1px solid var(--border)",
      }}
    >
      <h2
        className="accent-bar"
        style={{ fontSize: "1.75rem", fontWeight: 700, color: "var(--fg)", marginBottom: "2.5rem" }}
      >
        Certificates
      </h2>

      {/* ── Grid ── */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: "1rem",
        }}
      >
        {certificates.map((cert, i) => (
          <div
            key={i}
            onClick={() => setPreview(cert.src)}
            style={{
              border: "1px solid var(--border)",
              borderRadius: "10px",
              overflow: "hidden",
              cursor: "zoom-in",
              transition: "border-color 0.2s, transform 0.2s",
              background: "var(--bg)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "var(--accent)";
              e.currentTarget.style.transform = "translateY(-3px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "var(--border)";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            <div style={{ position: "relative", width: "100%", aspectRatio: "16/9" }}>
              <Image
                src={cert.src}
                alt={cert.label}
                fill
                style={{ objectFit: "cover" }}
              />
            </div>
            <p
              className="mono"
              style={{
                margin: 0,
                padding: "0.65rem 1rem",
                fontSize: "0.78rem",
                color: "var(--fg-muted)",
                borderTop: "1px solid var(--border)",
              }}
            >
              {cert.label}
            </p>
          </div>
        ))}
      </div>

      {/* ── Lightbox ── */}
      {preview && (
        <div
          onClick={() => setPreview(null)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.85)",
            zIndex: 100,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "2rem",
            cursor: "zoom-out",
          }}
        >
          <div style={{ position: "relative", maxWidth: "900px", width: "100%" }}>
            <Image
              src={preview}
              alt="Certificate preview"
              width={900}
              height={636}
              style={{ width: "100%", height: "auto", borderRadius: "10px" }}
            />
            <button
              onClick={() => setPreview(null)}
              style={{
                position: "absolute",
                top: "-1rem",
                right: "-1rem",
                width: "32px",
                height: "32px",
                borderRadius: "50%",
                background: "var(--accent)",
                border: "none",
                color: "var(--panel)",
                fontWeight: 700,
                fontSize: "1rem",
                cursor: "pointer",
                lineHeight: 1,
              }}
            >
              ×
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
