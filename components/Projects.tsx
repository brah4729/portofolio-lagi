"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { BOOT, CATEGORY_LABEL, PROJECTS, type Category, type Project, type Status } from "../lib/content";
import { SPRING, reduced } from "../lib/spring";
import { useIndicator } from "../lib/use-indicator";
import ProjectSheet from "./ProjectSheet";
import SectionHead from "./SectionHead";

type Filter = "all" | Category;
const FILTERS: { key: Filter; label: string }[] = [
  { key: "all", label: "All" },
  { key: "ai-ml", label: "AI / ML" },
  { key: "fullstack", label: "Fullstack" },
  { key: "systems", label: "Systems" },
];

export function Badge({ s }: { s: Status }) {
  return (
    <span className="badge mono" data-s={s.toLowerCase().replace(" ", "-")}>
      {s === "Submitted" && (
        <svg viewBox="0 0 12 12" width="10" height="10" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="m2.5 6.5 2.3 2.3L9.5 3.5" />
        </svg>
      )}
      {(s === "In Progress" || s === "Complete") && <i aria-hidden="true" />}
      {s}
    </span>
  );
}

const unlift = (el: HTMLElement) => {
  el.classList.remove("is-leaving");
  for (const k of ["top", "left", "width", "height"]) el.style.removeProperty(k);
};

export default function Projects() {
  const [filter, setFilter] = useState<Filter>("all");
  const [sel, setSel] = useState<Project | null>(null);
  const grid = useRef<HTMLDivElement>(null);
  const tabs = useRef<HTMLDivElement>(null);
  const ind = useRef<HTMLSpanElement>(null);
  const trigger = useRef<HTMLElement | null>(null);
  const first = useRef<Map<string, DOMRect>>(new Map());

  useIndicator(tabs, ind, filter);

  const show = (p: Project) => filter === "all" || p.category === filter;

  const pick = (next: Filter) => {
    if (next === filter) return;
    // FIRST: where everything is right now (in-flight transforms included,
    // so an interrupted move starts from what's on screen).
    first.current = new Map();
    grid.current!.querySelectorAll<HTMLElement>("[data-pid]:not([hidden])").forEach((el) =>
      first.current.set(el.dataset.pid!, el.getBoundingClientRect()),
    );
    setFilter(next);
  };

  // LAST / INVERT / PLAY
  useLayoutEffect(() => {
    const g = grid.current!;
    if (!first.current.size) return;
    const cards = [...g.querySelectorAll<HTMLElement>("[data-pid]")];
    cards.forEach((el) => {
      el.getAnimations().forEach((a) => a.cancel());
      if (el.classList.contains("is-leaving")) unlift(el);
    });
    const go = reduced() ? { duration: 160, easing: "linear" } : SPRING.soft;
    const gr = g.getBoundingClientRect();
    let n = 0;

    cards.forEach((el) => {
      const before = first.current.get(el.dataset.pid!);
      if (el.hidden) {
        if (!before) return;
        // leaving: lift out of flow at its old spot and fade
        el.hidden = false;
        el.classList.add("is-leaving");
        Object.assign(el.style, {
          top: `${before.top - gr.top}px`,
          left: `${before.left - gr.left}px`,
          width: `${before.width}px`,
          height: `${before.height}px`,
        });
        el.animate(
          reduced() ? [{ opacity: 1 }, { opacity: 0 }] : [{ opacity: 1, transform: "scale(1)" }, { opacity: 0, transform: "scale(.96)" }],
          { duration: 180, easing: "ease-out", fill: "forwards" },
        ).finished.then(
          () => {
            unlift(el);
            el.hidden = true;
          },
          () => {},
        );
        return;
      }
      const after = el.getBoundingClientRect();
      if (!before) {
        // entering
        el.animate(
          reduced() ? [{ opacity: 0 }, { opacity: 1 }] : [{ opacity: 0, transform: "translate3d(0,16px,0) scale(.98)" }, { opacity: 1, transform: "none" }],
          { ...go, delay: reduced() ? 0 : n++ * 45, fill: "backwards" },
        );
        return;
      }
      const dx = before.left - after.left;
      const dy = before.top - after.top;
      const sx = before.width / after.width;
      const sy = before.height / after.height;
      if (Math.abs(dx) + Math.abs(dy) < 1 && Math.abs(sx - 1) + Math.abs(sy - 1) < 0.005) return;
      el.animate(
        reduced()
          ? [{ opacity: 0.4 }, { opacity: 1 }]
          : [{ transformOrigin: "0 0", transform: `translate3d(${dx}px,${dy}px,0) scale(${sx},${sy})` }, { transformOrigin: "0 0", transform: "none" }],
        go,
      );
    });
    first.current = new Map();
  }, [filter]);

  const open = (p: Project, el: HTMLElement) => {
    trigger.current = el;
    setSel(p);
  };

  const glow = (e: React.PointerEvent<HTMLElement>) => {
    if (e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  const count = PROJECTS.filter(show).length;

  return (
    <section id="projects" className="section" aria-labelledby="projects-title">
      <div className="wrap">
        <div className="projects__head">
          <SectionHead n="03" id="projects" label="projects" title="Projects" />
          <div className="tabs" ref={tabs} role="group" aria-label="Filter projects" data-reveal>
            {FILTERS.map((f) => (
              <button
                key={f.key}
                type="button"
                className="tab mono"
                aria-pressed={filter === f.key}
                data-active={filter === f.key}
                onClick={() => pick(f.key)}
              >
                {f.label}
              </button>
            ))}
            <span ref={ind} className="tabs__ind" aria-hidden="true" />
          </div>
        </div>
        <p className="sr-only" role="status">
          Showing {count} {count === 1 ? "project" : "projects"}
        </p>

        <div className="pgrid" ref={grid}>
          {PROJECTS.map((p, i) => (
            <article
              key={p.id}
              data-pid={p.id}
              hidden={!show(p)}
              className={`pcard pcard--${p.span}${p.featured ? " pcard--feature" : ""}`}
              data-reveal
              style={{ "--i": i } as React.CSSProperties}
              onPointerMove={glow}
            >
              <span className="pcard__glow" aria-hidden="true" />
              <div className="pcard__main">
                <div className="pcard__meta mono">
                  <span>{p.featured ? `Featured · ${CATEGORY_LABEL[p.category]}` : CATEGORY_LABEL[p.category]}</span>
                  <Badge s={p.status} />
                </div>
                <h3 className="pcard__title">
                  <button type="button" className="pcard__hit" aria-haspopup="dialog" onClick={(e) => open(p, e.currentTarget)}>
                    {p.title}
                  </button>
                </h3>
                <p className="pcard__desc">{p.description}</p>
                <ul className="pcard__stack mono">
                  {p.stack.map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ul>
                <span className="pcard__go mono" aria-hidden="true">
                  details <span>→</span>
                </span>
              </div>
              {p.featured && (
                <ol className="boot mono" aria-hidden="true">
                  <li style={{ "--k": 0 } as React.CSSProperties}>MonoOS (Dori) · i686</li>
                  {BOOT.map((b, k) => (
                    <li key={b} style={{ "--k": k + 1 } as React.CSSProperties}>
                      <b>[ ok ]</b> {b}
                    </li>
                  ))}
                  <li className="boot__cursor" style={{ "--k": BOOT.length + 1 } as React.CSSProperties}>
                    &gt;_
                  </li>
                </ol>
              )}
            </article>
          ))}
        </div>
      </div>

      {sel && (
        <ProjectSheet
          project={sel}
          onClose={() => {
            setSel(null);
            trigger.current?.focus();
          }}
        />
      )}
    </section>
  );
}
