"use client";

import { useEffect, useRef } from "react";
import { EXPERIENCE } from "../lib/content";
import { onScroll } from "../lib/scroll";
import SectionHead from "./SectionHead";

/**
 * Timeline that draws itself: the line is one element scaled on Y by scroll
 * progress; each entry's node lights up once the line passes it. Entries are
 * native <details name="exp"> (keyboard, no-JS, one open at a time).
 */
export default function Experience() {
  const list = useRef<HTMLOListElement>(null);
  const line = useRef<HTMLSpanElement>(null);

  useEffect(
    () =>
      onScroll(() => {
        const L = list.current!;
        const r = L.getBoundingClientRect();
        const front = innerHeight * 0.6;
        const p = Math.max(0, Math.min(1, (front - r.top) / r.height));
        line.current!.style.transform = `scaleY(${p})`;
        L.querySelectorAll<HTMLElement>("li").forEach((li) => {
          li.toggleAttribute("data-on", li.getBoundingClientRect().top < front);
        });
      }),
    [],
  );

  return (
    <section id="experience" className="section" aria-labelledby="experience-title">
      <div className="wrap">
        <SectionHead n="04" id="experience" label="experience" title="Experience" />
        <ol className="tl" ref={list}>
          <span className="tl__rail" aria-hidden="true">
            <span ref={line} className="tl__line" />
          </span>
          {EXPERIENCE.map((e, i) => (
            <li key={e.role + e.org} className="tl__item" data-reveal style={{ "--i": 0 } as React.CSSProperties}>
              <details name="exp" open={i === 0}>
                <summary>
                  <span className="tl__period mono">{e.period}</span>
                  <span className="tl__node" aria-hidden="true" />
                  <span className="tl__head">
                    <h3>{e.role}</h3>
                    <span className="tl__org">{e.org}</span>
                  </span>
                  <svg className="tl__chev" viewBox="0 0 16 16" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="m4 6 4 4 4-4" />
                  </svg>
                </summary>
                <div className="tl__body">
                  <p className="tl__tag mono">{e.tag}</p>
                  <p>{e.body}</p>
                </div>
              </details>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
