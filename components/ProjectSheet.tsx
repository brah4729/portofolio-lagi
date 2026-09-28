"use client";

import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
import { BOOT, CATEGORY_LABEL, EXPERIENCE, type Project } from "../lib/content";
import { Spring, project as flick, reduced, rubberband } from "../lib/spring";
import { Badge } from "./Projects";

const DEV = process.env.NODE_ENV !== "production";
const isSide = () => matchMedia("(min-width: 900px)").matches;

/**
 * Bottom sheet on mobile (drag the handle to dismiss), side sheet on desktop.
 * Native <dialog>: focus trap, Esc, inert background for free. Motion is one
 * spring on one axis: 1:1 while dragging, velocity handed to the spring on
 * release, grabbable mid-flight.
 */
export default function ProjectSheet({ project, onClose }: { project: Project; onClose: () => void }) {
  const dlg = useRef<HTMLDialogElement>(null);
  const sheet = useRef<HTMLDivElement>(null);
  const scrim = useRef<HTMLDivElement>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);
  const sp = useRef<Spring | null>(null);
  const closing = useRef(false);
  const drag = useRef<{ y: number; from: number; hist: [number, number][] } | null>(null);

  const size = () => (isSide() ? sheet.current!.offsetWidth : sheet.current!.offsetHeight);

  const finish = () => {
    if (dlg.current?.open) dlg.current.close();
    onClose();
  };

  const close = (v = 0) => {
    if (closing.current) return;
    closing.current = true;
    if (reduced()) {
      sheet.current!.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 120, fill: "forwards" });
      scrim.current!.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 120, fill: "forwards" });
      setTimeout(finish, 120);
      return;
    }
    sp.current!.to(size(), { velocity: v, response: 0.35, damping: 1, done: finish });
  };

  useLayoutEffect(() => {
    const d = dlg.current!;
    const s = sheet.current!;
    d.showModal();
    const apply = (p: number) => {
      s.style.transform = isSide() ? `translate3d(${p}px,0,0)` : `translate3d(0,${p}px,0)`;
      scrim.current!.style.opacity = String(Math.max(0, Math.min(1, 1 - Math.max(p, 0) / size())));
    };
    const spring = (sp.current = new Spring(size(), apply, 0.3));
    apply(size());
    if (reduced()) {
      apply(0);
      s.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 160 });
    } else {
      spring.to(0, { response: 0.4, damping: 1 });
    }
    closeBtn.current?.focus();
    return () => {
      spring.stop();
      if (d.open) d.close();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const down = (e: React.PointerEvent<HTMLDivElement>) => {
    if (isSide() || reduced()) return;
    closing.current = false; // grabbing mid-close cancels it
    drag.current = { y: e.clientY, from: sp.current!.stop(), hist: [[e.timeStamp, e.clientY]] };
    e.currentTarget.setPointerCapture(e.pointerId);
  };
  const move = (e: React.PointerEvent<HTMLDivElement>) => {
    const d = drag.current;
    if (!d) return;
    let p = d.from + (e.clientY - d.y);
    if (p < 0) p = -rubberband(-p, size());
    sp.current!.jump(p);
    d.hist.push([e.timeStamp, e.clientY]);
    while (d.hist.length > 2 && e.timeStamp - d.hist[0][0] > 100) d.hist.shift();
  };
  const up = () => {
    const d = drag.current;
    if (!d) return;
    drag.current = null;
    const [a, b] = [d.hist[0], d.hist[d.hist.length - 1]];
    const v = b[0] > a[0] ? ((b[1] - a[1]) / (b[0] - a[0])) * 1000 : 0;
    const x = sp.current!.x;
    // velocity sign decides direction on a flick; otherwise position (of the projected rest point)
    const dismiss = Math.abs(v) > 300 ? v > 0 : x + flick(v) > size() / 2;
    if (dismiss) close(v);
    else sp.current!.to(0, { velocity: v, response: 0.35, damping: 0.8 });
  };

  const ctx = EXPERIENCE.find((e) => e.projectId === project.id);

  return (
    <dialog
      ref={dlg}
      className="sheet-dlg"
      aria-labelledby="sheet-title"
      onCancel={(e) => {
        e.preventDefault();
        close();
      }}
    >
      <div ref={scrim} className="sheet-scrim" onClick={() => close()} />
      <div ref={sheet} className="sheet">
        <div className="sheet__grab" onPointerDown={down} onPointerMove={move} onPointerUp={up} onPointerCancel={up}>
          <i aria-hidden="true" />
        </div>

        <div className="sheet__scroll">
          <div className="sheet__top">
            <div className="sheet__meta mono">
              <span>{CATEGORY_LABEL[project.category]}</span>
              <Badge s={project.status} />
            </div>
            <button ref={closeBtn} type="button" className="icon-btn" onClick={() => close()} aria-label="Close details">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true">
                <path d="M6 6l12 12M18 6 6 18" />
              </svg>
            </button>
          </div>

          <h2 id="sheet-title" className="sheet__title">
            {project.title}
          </h2>
          <p className="sheet__lead">{project.description}</p>

          {project.featured && (
            <div className="sheet__boot mono" aria-hidden="true">
              {BOOT.map((b) => (
                <span key={b}>
                  <b>[ ok ]</b> {b}
                </span>
              ))}
            </div>
          )}
          {project.featured && (
            <button type="button" className="btn btn--solid sheet__term" data-open-terminal onClick={() => close()}>
              <span aria-hidden="true">&gt;_</span> Try the terminal
            </button>
          )}

          {ctx && (
            <section className="sheet__sec">
              <h3 className="label mono">Context</h3>
              <p className="sheet__ctx">
                <strong>{ctx.role}</strong>
                <span className="mono">
                  {ctx.org} · {ctx.tag} · {ctx.period}
                </span>
              </p>
              <p>{ctx.body}</p>
            </section>
          )}

          <section className="sheet__sec">
            <h3 className="label mono">Stack</h3>
            <ul className="chips mono">
              {project.stack.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </section>

          <section className="sheet__sec">
            <h3 className="label mono">Links</h3>
            <ul className="sheet__links mono">
              {(
                [
                  ["Repository", project.repo],
                  ["Live demo", project.demo],
                ] as const
              ).map(([k, href]) =>
                href ? (
                  <li key={k}>
                    <a className="ulink" href={href} target="_blank" rel="noreferrer">
                      {k} ↗
                    </a>
                  </li>
                ) : DEV ? (
                  <li key={k} className="todo">
                    TODO {k.toLowerCase()} URL, set `{k === "Repository" ? "repo" : "demo"}` on this project in lib/content.ts
                  </li>
                ) : null,
              )}
            </ul>
          </section>

          {project.screenshot ? (
            <div className="sheet__shot">
              <Image src={project.screenshot} alt={`${project.title} screenshot`} fill sizes="(max-width: 900px) 100vw, 704px" />
            </div>
          ) : (
            DEV && <div className="sheet__shot todo">TODO screenshot, set `screenshot` (e.g. /projects/{project.id}.png) in lib/content.ts</div>
          )}
        </div>
      </div>
    </dialog>
  );
}
