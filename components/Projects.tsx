"use client";
import { useState } from "react";

const projects = [
  {
    name: "MonoOS (Dori)",
    description:
      "A 32-bit i686 monolithic kernel built from scratch in C and NASM, with a custom desktop environment (Oki DE), interactive terminal, PS/2 mouse & keyboard, and a waybar-style taskbar.",
    stack: ["C", "NASM", "x86", "VirtualBox"],
    category: "Systems",
    status: "In Progress",
    link: null,
  },
  {
    name: "PPE Compliance Monitor",
    description:
      "AI-powered PPE detection system for AI Open Innovation Challenge 2026. YOLOv8 for real-time detection, Go/Fiber backend, FastAPI ML microservice, SQLite + JWT auth.",
    stack: ["YOLOv8", "Python", "Go", "Fiber", "FastAPI", "SQLite"],
    category: "AI / ML",
    status: "Competition",
    link: null,
  },
  {
    name: "Dapur Pintar",
    description:
      "Smart kitchen assistant using Gemini Vision + Next.js. Identifies ingredients from photos and suggests recipes. Built for the #JuaraVibeCoding Google competition.",
    stack: ["Next.js", "Gemini Vision", "TypeScript"],
    category: "Fullstack",
    status: "Submitted",
    link: null,
  },
  {
    name: "Biscuit Quality Classifier",
    description:
      "MobileNetV2 transfer learning model achieving 88% validation accuracy. Extended with NLP component (DistilBERT + FLAN-T5) for lab parameter analysis. Flask + frontend.",
    stack: ["MobileNetV2", "DistilBERT", "FLAN-T5", "Flask", "Python"],
    category: "AI / ML",
    status: "Complete",
    link: null,
  },
  {
    name: "Toko Keren (E-commerce)",
    description:
      "Full e-commerce platform in Laravel with RBAC, admin routes, Eloquent relationships, Blade layouts, and authentication. Includes security audit findings.",
    stack: ["Laravel", "PHP", "MySQL", "Blade"],
    category: "Fullstack",
    status: "Complete",
    link: null,
  },
  {
    name: "Fullstack TS Monorepo",
    description:
      "Next.js + Express + Prisma 7 + Neon PostgreSQL monorepo with REST APIs, JWT auth via httpOnly cookies, and full CRUD with type safety end-to-end.",
    stack: ["Next.js", "Express", "Prisma", "PostgreSQL", "TypeScript"],
    category: "Fullstack",
    status: "Complete",
    link: null,
  },
];

const categoryColors: Record<string, string> = {
  Systems: "#B85A1A",
  "AI / ML": "#FF8C42",
  Fullstack: "#C4906A",
};

const statusColors: Record<string, string> = {
  "In Progress": "var(--accent)",
  Competition: "#FFD700",
  Submitted: "#4CAF50",
  Complete: "var(--fg-muted)",
};

export default function Projects() {
  const [filter, setFilter] = useState("All");
  const categories = ["All", "AI / ML", "Fullstack", "Systems"];

  const filtered = filter === "All" ? projects : projects.filter((p) => p.category === filter);

  return (
    <section
      id="projects"
      style={{
        padding: "6rem 1.5rem",
        maxWidth: "1100px",
        margin: "0 auto",
        borderTop: "1px solid var(--border)",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          marginBottom: "2rem",
          flexWrap: "wrap",
          gap: "1rem",
        }}
      >
        <h2
          className="accent-bar"
          style={{ fontSize: "1.75rem", fontWeight: 700, color: "var(--fg)", margin: 0 }}
        >
          Projects
        </h2>
        <div style={{ display: "flex", gap: "0.5rem" }}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              style={{
                padding: "0.35rem 0.85rem",
                borderRadius: "4px",
                border: "1px solid",
                borderColor: filter === cat ? "var(--accent)" : "var(--border)",
                background: filter === cat ? "var(--accent)" : "transparent",
                color: filter === cat ? "var(--panel)" : "var(--fg-muted)",
                fontSize: "0.82rem",
                fontWeight: 600,
                cursor: "pointer",
                fontFamily: "inherit",
                transition: "all 0.15s",
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
          gap: "1.25rem",
        }}
      >
        {filtered.map((project) => (
          <div
            key={project.name}
            style={{
              background: "var(--bg)",
              border: "1px solid var(--border)",
              borderRadius: "10px",
              padding: "1.5rem",
              display: "flex",
              flexDirection: "column",
              gap: "0.75rem",
              transition: "border-color 0.2s, transform 0.2s",
              cursor: "default",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "var(--accent-dim)";
              e.currentTarget.style.transform = "translateY(-3px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "var(--border)";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span
                style={{
                  fontSize: "0.72rem",
                  color: categoryColors[project.category] ?? "var(--fg-muted)",
                  fontWeight: 600,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                }}
              >
                {project.category}
              </span>
              <span
                className="mono"
                style={{
                  fontSize: "0.7rem",
                  color: statusColors[project.status] ?? "var(--fg-muted)",
                }}
              >
                {project.status}
              </span>
            </div>

            <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--fg)", margin: 0 }}>
              {project.name}
            </h3>

            <p style={{ fontSize: "0.875rem", color: "var(--fg-muted)", lineHeight: 1.65, margin: 0 }}>
              {project.description}
            </p>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginTop: "auto" }}>
              {project.stack.map((s) => (
                <span
                  key={s}
                  className="mono"
                  style={{
                    fontSize: "0.72rem",
                    padding: "0.2rem 0.55rem",
                    border: "1px solid var(--border)",
                    borderRadius: "3px",
                    color: "var(--fg-muted)",
                  }}
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
