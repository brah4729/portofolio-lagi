"use client";

import { useEffect } from "react";

/**
 * Attribute-driven scroll reveal. Any element with [data-reveal] (and an
 * optional --i stagger index) fades/translates in once. No wrappers, so
 * sections can stay Server Components. Styles live in globals.css.
 */
export default function Reveal() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          const el = e.target as HTMLElement;
          el.setAttribute("data-in", "");
          io.unobserve(el);
          // drop the reveal transition afterwards so hover transforms aren't delayed
          setTimeout(() => el.removeAttribute("data-reveal"), 1400);
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
    );
    document.querySelectorAll("[data-reveal]").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
  return null;
}
