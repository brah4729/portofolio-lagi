import { RefObject, useEffect, useRef } from "react";
import { Spring } from "./spring";

/**
 * Slides a 100px-wide, 1px-tall element under whichever child of `list` has
 * data-active="true". Only transform is animated (translate + scaleX).
 */
export function useIndicator(
  list: RefObject<HTMLElement | null>,
  ind: RefObject<HTMLElement | null>,
  key: string | null,
) {
  const s = useRef<{ x: Spring; w: Spring; ready: boolean } | null>(null);

  useEffect(() => {
    const L = list.current;
    const I = ind.current;
    if (!L || !I) return;

    if (!s.current) {
      const draw = () => {
        I.style.transform = `translate3d(${s.current!.x.x}px,0,0) scaleX(${s.current!.w.x / 100})`;
      };
      s.current = { x: new Spring(0, draw, 0.05), w: new Spring(0, draw, 0.05), ready: false };
    }
    const st = s.current;

    const place = (instant: boolean) => {
      const a = L.querySelector<HTMLElement>('[data-active="true"]');
      I.style.opacity = a ? "1" : "0";
      if (!a) return;
      if (instant || !st.ready) {
        st.x.jump(a.offsetLeft);
        st.w.jump(a.offsetWidth);
        st.ready = true;
      } else {
        st.x.to(a.offsetLeft);
        st.w.to(a.offsetWidth);
      }
    };

    place(false);
    let first = true; // ResizeObserver fires once on observe; that's not a resize
    const ro = new ResizeObserver(() => {
      if (first) return void (first = false);
      place(true);
    });
    ro.observe(L);
    return () => ro.disconnect();
  }, [list, ind, key]);
}
