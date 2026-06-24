"use client";
const skillGroups = [
  {
    category: "AI / ML",
    skills: ["Python", "TensorFlow", "PyTorch", "scikit-learn", "AI Studio" ],
  },
  {
    category: "Fullstack",
    skills: ["Next.js", "React", "TypeScript", "Express.js", "Laravel", "Prisma", "PostgreSQL", "SQLite", "JWT", "MySQL"],
  },
  {
    category: "Systems / Low Level",
    skills: ["C", "NASM", "x86 Assembly", "Kernel", "NixOS", "Linux"],
  },
  {
    category: "Tools & Other",
    skills: ["Git", "GitHub", "Docker", "QEMU", "VirtualBox", "Nix", "Claude Code"],
  },
];

export default function Skills() {
  return (
    <section
      id="skills"
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
        Skills
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: "1.5rem",
        }}
      >
        {skillGroups.map(({ category, skills }) => (
          <div
            key={category}
            style={{
              background: "var(--bg)",
              border: "1px solid var(--border)",
              borderRadius: "10px",
              padding: "1.5rem",
            }}
          >
            <p
              className="mono"
              style={{
                color: "var(--accent)",
                fontSize: "0.75rem",
                letterSpacing: "0.1em",
                marginBottom: "1rem",
                textTransform: "uppercase",
              }}
            >
              {category}
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
              {skills.map((skill) => (
                <span
                  key={skill}
                  style={{
                    padding: "0.3rem 0.75rem",
                    border: "1px solid var(--border)",
                    borderRadius: "4px",
                    fontSize: "0.82rem",
                    color: "var(--fg-muted)",
                    background: "var(--panel)",
                    transition: "all 0.15s",
                    cursor: "default",
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
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
