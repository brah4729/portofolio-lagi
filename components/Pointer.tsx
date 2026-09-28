"use client";

import { useEffect, useRef } from "react";
import { Spring, reduced } from "../lib/spring";

/**
 * Desktop-only pointer extras: a trailing ring cursor (native cursor stays)
 * and subtle magnetic pull on [data-magnetic]. Disabled on touch and under
 * prefers-reduced-motion.
 */
export default function Pointer() {
  const ring = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!matchMedia("(hover: hover) and (pointer: fine)").matches || reduced()) return;
    const el = ring.current!;
    const draw = () => {
      el.style.transform = `translate3d(${sx.x}px,${sy.x}px,0)`;
    };
    const sx = new Spring(-100, draw);
    const sy = new Spring(-100, draw);
    let seen = false;

    type M = { el: HTMLElement; x: Spring; y: Spring };
    const mags = new WeakMap<HTMLElement, M>();
    let cur: M | null = null;
    const magnet = (el: HTMLElement) => {
      let m = mags.get(el);
      if (!m) {
        const set = () => (el.style.transform = `translate3d(${m!.x.x}px,${m!.y.x}px,0)`);
        m = { el, x: new Spring(0, set, 0.05), y: new Spring(0, set, 0.05) };
        mags.set(el, m);
      }
      return m;
    };
    const release = (m: M | null) => {
      m?.x.to(0, { response: 0.35, damping: 0.7 });
      m?.y.to(0, { response: 0.35, damping: 0.7 });
    };

    const move = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      if (!seen) {
        seen = true;
        sx.jump(e.clientX);
        sy.jump(e.clientY);
        el.dataset.on = "";
      }
      sx.to(e.clientX, { response: 0.16 });
      sy.to(e.clientY, { response: 0.16 });

      const t = e.target as HTMLElement;
      if (t.closest("a,button,summary,input,[data-cursor]")) el.dataset.hot = "";
      else delete el.dataset.hot;

      const host = t.closest<HTMLElement>("[data-magnetic]");
      if (host) {
        const m = magnet(host);
        if (cur && cur !== m) release(cur);
        cur = m;
        const r = host.getBoundingClientRect();
        m.x.to((e.clientX - (r.left + r.width / 2)) * 0.22, { response: 0.3 });
        m.y.to((e.clientY - (r.top + r.height / 2)) * 0.22, { response: 0.3 });
      } else if (cur) {
        release(cur);
        cur = null;
      }
    };
    const leave = () => {
      delete el.dataset.on;
      release(cur);
      cur = null;
    };

    addEventListener("pointermove", move, { passive: true });
    document.documentElement.addEventListener("pointerleave", leave);
    return () => {
      removeEventListener("pointermove", move);
      document.documentElement.removeEventListener("pointerleave", leave);
      sx.stop();
      sy.stop();
    };
  }, []);

  return <div ref={ring} className="ring" aria-hidden="true" />;
}
