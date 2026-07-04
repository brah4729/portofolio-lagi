"use client";
import { useState, useEffect } from "react";

const links = ["About", "Skills", "Projects", "Experience", "Certificates", "Contact"];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Detect scroll for background blur effect
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          transition: "all 0.3s ease",
          background:
            scrolled || menuOpen
              ? "rgba(38, 21, 10, 0.97)"
              : "transparent",
          backdropFilter: scrolled || menuOpen ? "blur(12px)" : "none",
          borderBottom:
            scrolled || menuOpen
              ? "1px solid var(--border)"
              : "1px solid transparent",
        }}
      >
        <div
          style={{
            maxWidth: "1100px",
            margin: "0 auto",
            padding: "1rem 2rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {/* Logo */}
          <span
            className="mono"
            style={{ color: "var(--accent)", fontWeight: 500, fontSize: "0.9rem" }}
          >
            &gt;_ dhiren
          </span>

          {/* ── Desktop nav links ── */}
          <ul
            style={{
              display: "flex",
              gap: "2rem",
              listStyle: "none",
              margin: 0,
              padding: 0,
            }}
            className="desktop-nav"
          >
            {links.map((l) => (
              <li key={l}>
                <a
                  href={`#${l.toLowerCase()}`}
                  style={{
                    color: "var(--fg-muted)",
                    textDecoration: "none",
                    fontSize: "0.875rem",
                    fontWeight: 500,
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "var(--fg-muted)")}
                >
                  {l}
                </a>
              </li>
            ))}
          </ul>

          {/* ── Hamburger button (mobile only) ── */}
          <button
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            className="hamburger-btn"
            style={{
              background: "transparent",
              border: "1px solid var(--border)",
              borderRadius: "6px",
              padding: "0.4rem 0.55rem",
              cursor: "pointer",
              display: "none", // shown via CSS media query below
              flexDirection: "column",
              gap: "5px",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/* Three lines that animate into X */}
            <span
              style={{
                display: "block",
                width: "20px",
                height: "2px",
                background: "var(--accent)",
                borderRadius: "2px",
                transition: "transform 0.25s, opacity 0.25s",
                transform: menuOpen ? "translateY(7px) rotate(45deg)" : "none",
              }}
            />
            <span
              style={{
                display: "block",
                width: "20px",
                height: "2px",
                background: "var(--accent)",
                borderRadius: "2px",
                transition: "opacity 0.25s",
                opacity: menuOpen ? 0 : 1,
              }}
            />
            <span
              style={{
                display: "block",
                width: "20px",
                height: "2px",
                background: "var(--accent)",
                borderRadius: "2px",
                transition: "transform 0.25s, opacity 0.25s",
                transform: menuOpen ? "translateY(-7px) rotate(-45deg)" : "none",
              }}
            />
          </button>
        </div>

        {/* ── Mobile dropdown menu ── */}
        <div
          className="mobile-menu"
          style={{
            overflow: "hidden",
            maxHeight: menuOpen ? `${links.length * 60}px` : "0",
            transition: "max-height 0.35s ease",
            borderTop: menuOpen ? "1px solid var(--border)" : "none",
          }}
        >
          <ul
            style={{
              listStyle: "none",
              margin: 0,
              padding: "0.5rem 0",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {links.map((l, i) => (
              <li key={l}>
                <a
                  href={`#${l.toLowerCase()}`}
                  onClick={closeMenu}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.75rem",
                    padding: "0.85rem 1.5rem",
                    color: "var(--fg-muted)",
                    textDecoration: "none",
                    fontSize: "0.95rem",
                    fontWeight: 600,
                    transition: "color 0.15s, background 0.15s",
                    opacity: menuOpen ? 1 : 0,
                    transform: menuOpen ? "translateX(0)" : "translateX(-10px)",
                    // stagger each link in
                    transitionDelay: `${i * 40}ms`,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "var(--accent)";
                    e.currentTarget.style.background = "rgba(255,140,66,0.05)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "var(--fg-muted)";
                    e.currentTarget.style.background = "transparent";
                  }}
                >
                  <span className="mono" style={{ color: "var(--accent)", fontSize: "0.8rem" }}>
                    0{i + 1}.
                  </span>
                  {l}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* ── Media query styles injected as a style tag ── */}
      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .hamburger-btn { display: flex !important; }
        }
        @media (min-width: 769px) {
          .mobile-menu { display: none !important; }
        }
      `}</style>
    </>
  );
}
