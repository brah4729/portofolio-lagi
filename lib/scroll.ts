/** One shared passive scroll/resize listener, rAF-throttled. */
const subs = new Set<() => void>();
let queued = false;

const run = () => {
  queued = false;
  subs.forEach((f) => f());
};
const on = () => {
  if (!queued) {
    queued = true;
    requestAnimationFrame(run);
  }
};

export function onScroll(fn: () => void) {
  if (!subs.size) {
    addEventListener("scroll", on, { passive: true });
    addEventListener("resize", on);
  }
  subs.add(fn);
  fn();
  return () => {
    subs.delete(fn);
    if (!subs.size) {
      removeEventListener("scroll", on);
      removeEventListener("resize", on);
    }
  };
}
