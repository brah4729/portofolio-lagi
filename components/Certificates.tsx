"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { CERTIFICATES } from "../lib/content";
import { reduced } from "../lib/spring";
import SectionHead from "./SectionHead";

const DEV = process.env.NODE_ENV !== "production";
const N = CERTIFICATES.length;
const label = (i: number) => CERTIFICATES[i].title || `Certificate ${i + 1}`;

export default function Certificates() {
  const rail = useRef<HTMLDivElement>(null);
  const dlg = useRef<HTMLDialogElement>(null);
  const back = useRef<HTMLElement | null>(null);
  const [cur, setCur] = useState<number | null>(null);
  const [pos, setPos] = useState(0);
  const drag = useRef({ on: false, moved: false, x: 0, left: 0, hist: [] as [number, number][], raf: 0 });

  /* ---- mouse drag-to-scroll with momentum (touch/trackpad already scroll natively) ---- */
  const down = (e: React.PointerEvent<HTMLDivElement>) => {
    const d = drag.current;
    d.moved = false;
    if (e.pointerType !== "mouse" || e.button !== 0) return;
    cancelAnimationFrame(d.raf);
    Object.assign(d, { on: true, x: e.clientX, left: rail.current!.scrollLeft, hist: [[e.timeStamp, e.clientX]] });
  };
  const move = (e: React.PointerEvent<HTMLDivElement>) => {
    const d = drag.current;
    if (!d.on) return;
    const dx = e.clientX - d.x;
    if (!d.moved && Math.abs(dx) > 5) {
      d.moved = true;
      rail.current!.setAttribute("data-drag", "");
      rail.current!.setPointerCapture(e.pointerId);
    }
    if (!d.moved) return;
    rail.current!.scrollLeft = d.left - dx;
    d.hist.push([e.timeStamp, e.clientX]);
    while (d.hist.length > 2 && e.timeStamp - d.hist[0][0] > 100) d.hist.shift();
  };
  const up = () => {
    const d = drag.current;
    if (!d.on) return;
    d.on = false;
    const el = rail.current!;
    el.removeAttribute("data-drag");
    if (!d.moved) return;
    setTimeout(() => (d.moved = false), 0); // after the click that follows pointerup
    const [a, b] = [d.hist[0], d.hist[d.hist.length - 1]];
    const v = b[0] > a[0] ? ((b[1] - a[1]) / (b[0] - a[0])) * 1000 : 0; // px/s, pointer
    if (reduced()) return;
    let vel = -v;
    let last = performance.now();
    const step = (t: number) => {
      const dt = Math.min((t - last) / 1000, 0.05);
      last = t;
      vel *= Math.pow(0.998, dt * 1000); // per-ms decay, the curve project() integrates
      el.scrollLeft += vel * dt;
      if (Math.abs(vel) > 8 && el.scrollLeft > 0 && el.scrollLeft < el.scrollWidth - el.clientWidth) d.raf = requestAnimationFrame(step);
    };
    d.raf = requestAnimationFrame(step);
  };

  useEffect(() => {
    const el = rail.current!;
    const on = () => setPos(Math.round(el.scrollLeft / (el.scrollWidth / N)));
    el.addEventListener("scroll", on, { passive: true });
    return () => el.removeEventListener("scroll", on);
  }, []);

  const by = (dir: 1 | -1) => {
    const el = rail.current!;
    el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: reduced() ? "auto" : "smooth" });
  };

  /* ---- lightbox: native modal <dialog> = focus trap + Esc ---- */
  useEffect(() => {
    const d = dlg.current!;
    if (cur === null) return;
    if (!d.open) d.showModal();
    d.querySelector<HTMLElement>("[data-af]")?.focus();
  }, [cur]);

  const openAt = (i: number, el: HTMLElement) => {
    if (drag.current.moved) return;
    back.current = el;
    setCur(i);
  };
  const shut = () => {
    dlg.current?.close();
    setCur(null);
    back.current?.focus();
  };
  const step = (dir: 1 | -1) => setCur((c) => (c === null ? c : (c + dir + N) % N));
  const key = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") step(1);
    else if (e.key === "ArrowLeft") step(-1);
  };

  return (
    <section id="certificates" className="section" aria-labelledby="certificates-title">
      <div className="wrap certs__head">
        <SectionHead n="05" id="certificates" label="certificates" title="Certificates" />
        <div className="certs__ctl mono" data-reveal>
          <span aria-hidden="true">
            {String(Math.min(pos + 1, N)).padStart(2, "0")} / {String(N).padStart(2, "0")}
          </span>
          <button type="button" className="icon-btn" onClick={() => by(-1)} aria-label="Scroll certificates left">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="m15 6-6 6 6 6" />
            </svg>
          </button>
          <button type="button" className="icon-btn" onClick={() => by(1)} aria-label="Scroll certificates right">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="m9 6 6 6-6 6" />
            </svg>
          </button>
        </div>
      </div>

      <div className="rail" ref={rail} onPointerDown={down} onPointerMove={move} onPointerUp={up} onPointerCancel={up} role="list" aria-label="Certificates">
        {CERTIFICATES.map((c, i) => (
          <figure className="cert" key={c.src} role="listitem">
            <button type="button" className="cert__img" onClick={(e) => openAt(i, e.currentTarget)} aria-haspopup="dialog" aria-label={`Open ${label(i)}`}>
              <Image src={c.src} alt={`${label(i)}${c.issuer ? `, ${c.issuer}` : ""}`} fill sizes="(max-width: 640px) 80vw, 420px" draggable={false} />
            </button>
            <figcaption>
              <span className="mono cert__n">{String(i + 1).padStart(2, "0")}</span>
              <span className="cert__t">{label(i)}</span>
              {c.issuer || c.year ? (
                <span className="mono cert__i">{[c.issuer, c.year].filter(Boolean).join(" · ")}</span>
              ) : (
                DEV && <span className="mono cert__i todo">TODO title, issuer, year in lib/content.ts</span>
              )}
            </figcaption>
          </figure>
        ))}
      </div>

      <dialog ref={dlg} className="lb" aria-label="Certificate viewer" onKeyDown={key} onCancel={(e) => {
          e.preventDefault();
          shut();
        }} onClick={(e) => e.target === dlg.current && shut()}>
        {cur !== null && (
          <div className="lb__in">
            <div className="lb__img" key={cur}>
              <Image src={CERTIFICATES[cur].src} alt={label(cur)} fill sizes="(max-width: 1280px) 92vw, 1280px" priority />
            </div>
            <div className="lb__bar mono">
              <span aria-live="polite">
                {String(cur + 1).padStart(2, "0")} / {String(N).padStart(2, "0")} · {label(cur)}
                {CERTIFICATES[cur].issuer ? ` · ${CERTIFICATES[cur].issuer}` : ""}
              </span>
              <span className="lb__btns">
                <button type="button" className="icon-btn" onClick={() => step(-1)} aria-label="Previous certificate">
                  ←
                </button>
                <button type="button" className="icon-btn" onClick={() => step(1)} aria-label="Next certificate">
                  →
                </button>
                <button type="button" className="icon-btn" onClick={shut} aria-label="Close viewer" data-af>
                  ✕
                </button>
              </span>
            </div>
          </div>
        )}
      </dialog>
    </section>
  );
}
