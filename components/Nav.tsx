"use client";

import { useEffect, useRef, useState } from "react";
import { NAV } from "../lib/content";
import { onScroll } from "../lib/scroll";
import { useIndicator } from "../lib/use-indicator";

export default function Nav() {
  const [active, setActive] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [light, setLight] = useState(false);
  const list = useRef<HTMLElement>(null);
  const ind = useRef<HTMLSpanElement>(null);
  const bar = useRef<HTMLDivElement>(null);

  useIndicator(list, ind, active);

  // scroll-spy: the section crossing the 40% line is "current"
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id);
      },
      { rootMargin: "-40% 0px -59% 0px" },
    );
    NAV.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    const hero = document.getElementById("top");
    if (hero) {
      const h = new IntersectionObserver(([e]) => e.isIntersecting && setActive(null), {
        rootMargin: "-40% 0px -59% 0px",
      });
      h.observe(hero);
      return () => {
        io.disconnect();
        h.disconnect();
      };
    }
    return () => io.disconnect();
  }, []);

  // slim progress bar: transform only
  useEffect(
    () =>
      onScroll(() => {
        const max = document.documentElement.scrollHeight - innerHeight;
        bar.current!.style.transform = `scaleX(${max > 0 ? Math.min(1, scrollY / max) : 0})`;
      }),
    [],
  );

  useEffect(() => {
    setLight(document.documentElement.dataset.theme === "light");
  }, []);

  useEffect(() => {
    if (!open) return;
    const k = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    addEventListener("keydown", k);
    return () => removeEventListener("keydown", k);
  }, [open]);

  const toggleTheme = () => {
    const next = light ? "dark" : "light";
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {}
    setLight(!light);
  };

  return (
    <header className="nav">
      <div className="nav__progress" aria-hidden="true">
        <div ref={bar} />
      </div>
      <div className="wrap nav__row">
        <a href="#top" className="nav__logo" aria-label="Dhiren, back to top">
          <span aria-hidden="true">&gt;_</span> dhiren
        </a>

        <nav ref={list} aria-label="Primary" className="nav__links" data-open={open}>
          <ul id="nav-list">
            {NAV.map(({ id, label }, i) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  data-active={active === id}
                  aria-current={active === id ? "true" : undefined}
                  onClick={() => setOpen(false)}
                >
                  <span className="nav__n" aria-hidden="true">
                    0{i + 1}
                  </span>
                  {label}
                </a>
              </li>
            ))}
          </ul>
          <span ref={ind} className="nav__ind" aria-hidden="true" />
        </nav>

        <div className="nav__tools">
          <button
            type="button"
            className="icon-btn"
            onClick={toggleTheme}
            aria-label={light ? "Switch to dark theme" : "Switch to light theme"}
          >
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true">
              {light ? (
                <path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5Z" />
              ) : (
                <>
                  <circle cx="12" cy="12" r="4" />
                  <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
                </>
              )}
            </svg>
          </button>
          <button
            type="button"
            className="nav__menu mono"
            aria-expanded={open}
            aria-controls="nav-list"
            onClick={() => setOpen((o) => !o)}
          >
            {open ? "close" : "menu"}
          </button>
        </div>
      </div>
    </header>
  );
}
