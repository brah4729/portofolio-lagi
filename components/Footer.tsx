"use client";
export default function Footer() {
  return (
    <footer
      style={{
        borderTop: "1px solid var(--border)",
        padding: "1.5rem",
        textAlign: "center",
      }}
    >
      <p className="mono" style={{ color: "var(--fg-muted)", fontSize: "0.78rem", margin: 0 }}>
        &gt;_ built by dhiren · next.js · {new Date().getFullYear()}
      </p>
    </footer>
  );
}
