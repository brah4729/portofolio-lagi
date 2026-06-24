"use client";
import { useState, useEffect } from "react";

const roles = [
  "ML Engineer",
  "Fullstack Developer",
  "OS Builder",
  "Solo Developer",
  "Software Engineering Student",
];

export default function Hero() {
  const [roleIdx, setRoleIdx] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const target = roles[roleIdx];
    if (!deleting && displayed.length < target.length) {
      const t = setTimeout(() => setDisplayed(target.slice(0, displayed.length + 1)), 70);
      return () => clearTimeout(t);
    }
    if (!deleting && displayed.length === target.length) {
      const t = setTimeout(() => setDeleting(true), 2200);
      return () => clearTimeout(t);
    }
    if (deleting && displayed.length > 0) {
      const t = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 40);
      return () => clearTimeout(t);
    }
    if (deleting && displayed.length === 0) {
      setDeleting(false);
      setRoleIdx((i) => (i + 1) % roles.length);
    }
  }, [displayed, deleting, roleIdx]);

  return (
    <section
      id="hero"
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "0 1.5rem",
        maxWidth: "1100px",
        margin: "0 auto",
        position: "relative",
      }}
    >
      {/* Ambient glow background */}
      <div
        style={{
          position: "fixed",
          top: "20%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "600px",
          height: "600px",
          background: "radial-gradient(circle, rgba(255,140,66,0.06) 0%, transparent 70%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      <div style={{ position: "relative", zIndex: 1 }}>
        <p
          className="mono"
          style={{
            color: "var(--accent)",
            fontSize: "0.9rem",
            marginBottom: "1rem",
            letterSpacing: "0.1em",
          }}
        >
          &gt;_ hello, world
        </p>

        <h1
          style={{
            fontSize: "clamp(2.8rem, 8vw, 5.5rem)",
            fontWeight: 700,
            lineHeight: 1.05,
            color: "var(--fg)",
            marginBottom: "1rem",
            letterSpacing: "-0.02em",
          }}
        >
          I&apos;m{" "}
          <span style={{ color: "var(--accent)" }}>Dhiren</span>
          <span style={{ display: "block", color: "var(--fg)" }}>
            Gilson
          </span>
        </h1>

        <div
          style={{
            fontSize: "clamp(1.1rem, 3vw, 1.6rem)",
            color: "var(--fg-muted)",
            marginBottom: "2.5rem",
            minHeight: "2.4rem",
            fontWeight: 500,
          }}
        >
          <span>{displayed}</span>
          <span className="cursor-blink" style={{ fontWeight: 300 }}>
            |
          </span>
        </div>

        <p
          style={{
            fontSize: "1.05rem",
            color: "var(--fg-muted)",
            maxWidth: "520px",
            lineHeight: 1.7,
            marginBottom: "2.5rem",
          }}
        >
          Building things, focused on performance — kernels, models, and web apps.
          Currently still learning and want to explore more 
        </p>

        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
          <a
            href="#projects"
            style={{
              display: "inline-block",
              padding: "0.75rem 1.75rem",
              background: "var(--accent)",
              color: "var(--panel)",
              textDecoration: "none",
              fontWeight: 700,
              borderRadius: "6px",
              fontSize: "0.95rem",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "var(--fg)";
              e.currentTarget.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "var(--accent)";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            View Projects
          </a>
          <a
            href="#contact"
            style={{
              display: "inline-block",
              padding: "0.75rem 1.75rem",
              border: "1px solid var(--border)",
              color: "var(--fg-muted)",
              textDecoration: "none",
              fontWeight: 600,
              borderRadius: "6px",
              fontSize: "0.95rem",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "var(--accent)";
              e.currentTarget.style.color = "var(--accent)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "var(--border)";
              e.currentTarget.style.color = "var(--fg-muted)";
            }}
          >
            Get in touch
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        style={{
          position: "absolute",
          bottom: "2rem",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.5rem",
          color: "var(--fg-muted)",
          opacity: 0.5,
        }}
      >
        <span className="mono" style={{ fontSize: "0.7rem", letterSpacing: "0.1em" }}>
          scroll
        </span>
        <div
          style={{
            width: "1px",
            height: "40px",
            background: "linear-gradient(to bottom, var(--accent), transparent)",
          }}
        />
      </div>
    </section>
  );
}
