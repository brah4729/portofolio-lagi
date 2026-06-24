"use client";
export default function Contact() {
  return (
    <section
      id="contact"
      style={{
        padding: "6rem 1.5rem 8rem",
        maxWidth: "1100px",
        margin: "0 auto",
        borderTop: "1px solid var(--border)",
      }}
    >
      <div style={{ maxWidth: "560px" }}>
        <h2
          className="accent-bar"
          style={{
            fontSize: "1.75rem",
            fontWeight: 700,
            color: "var(--fg)",
            marginBottom: "1rem",
          }}
        >
          Get in Touch
        </h2>

        <p
          style={{
            color: "var(--fg-muted)",
            lineHeight: 1.75,
            marginBottom: "2.5rem",
            fontSize: "1rem",
          }}
        >
          I&apos;m open to project collaborations, internship opportunities, and just talking shop
          about kernels, ML pipelines, or competitive programming. Hit me up.
        </p>

        <a
          href="mailto:e@dhiren.my.id"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.6rem",
            padding: "0.85rem 2rem",
            background: "var(--accent)",
            color: "var(--panel)",
            textDecoration: "none",
            fontWeight: 700,
            borderRadius: "6px",
            fontSize: "0.95rem",
            marginBottom: "2.5rem",
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
          ✉ Send an Email
        </a>

        <div style={{ display: "flex", gap: "1.25rem", flexWrap: "wrap" }}>
          {[
            { label: "GitHub", href: "https://github.com/brah4729" },
            { label: "Codeforces", href: "https://codeforces.com/profile/helloxdlolidc" },
            { label: "LinkedIn", href: "https://www.linkedin.com/in/dhiren-gilson-7aa644412/" },
          ].map(({ label, href }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: "var(--fg-muted)",
                textDecoration: "none",
                fontSize: "0.9rem",
                fontWeight: 600,
                transition: "color 0.2s",
                display: "flex",
                alignItems: "center",
                gap: "0.3rem",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--fg-muted)")}
            >
              <span style={{ color: "var(--accent)", fontFamily: "monospace" }}>&gt;</span> {label}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
