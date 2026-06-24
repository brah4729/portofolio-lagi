"use client";
const experiences = [
  {
    period: "2025 – Present",
    title: "ML Engineer & Project Manager",
    org: "AI Open Innovation Challenge 2026",
    orgType: "Competition — TUV Nord / President University",
    description:
      "Leading the ML and engineering effort for Case 2: PPE Compliance Monitoring via computer vision. Managing team of developers as a Project Manager.",
  },
  {
    period: "2025",
    title: "Fullstack Developer",
    org: "#JuaraVibeCoding",
    orgType: "Competition — Google",
    description:
      "Built and submitted Dapur Pintar (Smart Kitchen), an AI-powered cooking assistant using Gemini Vision and Next.js that identifies ingredients from photos and suggests recipes.",
  },
  {
    period: "2024 – Present",
    title: "Kernel Developer",
    org: "MonoOS (Dori) — Personal Project",
    orgType: "Open Source",
    description:
      "Designing and implementing a 32-bit i686 monolithic kernel from scratch in C and NASM. Implemented memory management (heap/VMM), PS/2 drivers, custom desktop environment (Oki DE), and interactive terminal.",
  },
  {
    period: "2025 – Present",
    title: "Competitive Programmer",
    org: "Codeforces (helloxdlolidc)",
    orgType: "CITE UP 2026",
    description:
      "Practicing algorithmic problem solving in Python starting from Codeforces .Participating in CITE UP 2026 competition.",
  },
];

export default function Experience() {
  return (
    <section
      id="experience"
      style={{
        padding: "6rem 1.5rem",
        maxWidth: "1100px",
        margin: "0 auto",
        borderTop: "1px solid var(--border)",
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
        Experience
      </h2>

      <div style={{ position: "relative" }}>
        {/* Vertical timeline line */}
        <div
          style={{
            position: "absolute",
            left: "11px",
            top: "8px",
            bottom: "8px",
            width: "1px",
            background: "linear-gradient(to bottom, var(--accent), transparent)",
          }}
        />

        <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>
          {experiences.map((exp, i) => (
            <div
              key={i}
              style={{ display: "flex", gap: "2rem", alignItems: "flex-start" }}
            >
              {/* Dot */}
              <div
                style={{
                  width: "22px",
                  height: "22px",
                  borderRadius: "50%",
                  border: "2px solid var(--accent)",
                  background: "var(--panel)",
                  flexShrink: 0,
                  marginTop: "2px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <div
                  style={{
                    width: "7px",
                    height: "7px",
                    borderRadius: "50%",
                    background: "var(--accent)",
                  }}
                />
              </div>

              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "0.25rem", marginBottom: "0.35rem" }}>
                  <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "var(--fg)", margin: 0 }}>
                    {exp.title}
                  </h3>
                  <span className="mono" style={{ fontSize: "0.78rem", color: "var(--fg-muted)" }}>
                    {exp.period}
                  </span>
                </div>
                <p style={{ margin: "0 0 0.1rem", color: "var(--accent)", fontSize: "0.88rem", fontWeight: 600 }}>
                  {exp.org}
                </p>
                <p style={{ margin: "0 0 0.65rem", color: "var(--fg-muted)", fontSize: "0.78rem" }}>
                  {exp.orgType}
                </p>
                <p style={{ margin: 0, color: "var(--fg-muted)", fontSize: "0.875rem", lineHeight: 1.7 }}>
                  {exp.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
