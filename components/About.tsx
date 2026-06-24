"use client";
export default function About() {
  return (
    <section
      id="about"
      style={{
        padding: "6rem 1.5rem",
        maxWidth: "1100px",
        margin: "0 auto",
      }}
    >
      <h2
        className="accent-bar"
        style={{
          fontSize: "1.75rem",
          fontWeight: 700,
          color: "var(--fg)",
          marginBottom: "3rem",
        }}
      >
        About Me
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "3rem",
          alignItems: "start",
        }}
      >
        <div>
          <p style={{ color: "var(--fg-muted)", lineHeight: 1.8, marginBottom: "1.25rem", fontSize: "1rem" }}>
            I&apos;m a Software Engineering student (RPL) at{" "}
            <span style={{ color: "var(--fg)" }}>SMK Plus Pelita Nusantara</span>,
            currently doing freelancing. I build across the full spectrum — from web apps
            to machine learning pipelines to bare-metal kernels.
          </p>
          <p style={{ color: "var(--fg-muted)", lineHeight: 1.8, marginBottom: "1.25rem", fontSize: "1rem" }}>
            I&apos;m the ML Engineer and Project Manager on a team competing in the{" "}
            <span style={{ color: "var(--accent)" }}>AI Open Innovation Challenge 2026</span>,
            building a PPE compliance monitoring system using computer vision.
          </p>
          <p style={{ color: "var(--fg-muted)", lineHeight: 1.8, fontSize: "1rem" }}>
            When I&apos;m not writing Python or Go, I&apos;m probably hacking on{" "}
            <span style={{ color: "var(--fg)" }}>MonoOS (Dori)</span> — a 32-bit i686 monolithic
            kernel I build from scratch in C and NASM. Yes, it has a desktop environment.
          </p>
        </div>

        <div
          style={{
            background: "var(--bg)",
            border: "1px solid var(--border)",
            borderRadius: "10px",
            padding: "1.75rem",
          }}
        >
          <p
            className="mono"
            style={{ color: "var(--accent)", fontSize: "0.8rem", marginBottom: "1.25rem", letterSpacing: "0.05em" }}
          >
            currently
          </p>

          {[
            { label: "Status", value: "Freelancer" },
            { label: "Competing", value: "AI Open Innovation Challenge 2026" },
            { label: "Building", value: "MonoOS (Dori) — 32-bit custom kernel" },
            { label: "Practicing", value: "Codeforces (helloxdlolidc)" },
            { label: "Configuring", value: "NixOS + Hyprland (Tokyo Night → Ember)" },
          ].map(({ label, value }) => (
            <div
              key={label}
              style={{
                display: "flex",
                gap: "1rem",
                marginBottom: "1rem",
                alignItems: "flex-start",
              }}
            >
              <span
                className="mono"
                style={{
                  color: "var(--fg-muted)",
                  fontSize: "0.8rem",
                  minWidth: "90px",
                  paddingTop: "2px",
                }}
              >
                {label}
              </span>
              <span style={{ color: "var(--fg)", fontSize: "0.9rem", lineHeight: 1.5 }}>
                {value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
