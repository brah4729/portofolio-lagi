/**
 * Tiny critically-damped/under-damped spring, integrated in rAF.
 * Params follow Apple's model: `response` (seconds, lower = snappier) and
 * `damping` ratio (1 = no overshoot). Retargeting keeps the current value AND
 * velocity, so every animation is interruptible without a jump.
 */
export type SpringTo = {
  velocity?: number;
  response?: number;
  damping?: number;
  done?: () => void;
};

export class Spring {
  x: number;
  v = 0;
  private target: number;
  private raf = 0;
  private last = 0;
  private response = 0.4;
  private damping = 1;
  private done?: () => void;

  constructor(
    x: number,
    private apply: (x: number) => void,
    private precision = 0.01,
  ) {
    this.x = this.target = x;
  }

  to(target: number, o: SpringTo = {}) {
    if (reduced()) return this.jump(target, o.done);
    this.target = target;
    this.v = o.velocity ?? this.v;
    this.response = o.response ?? 0.4;
    this.damping = o.damping ?? 1;
    this.done = o.done;
    if (!this.raf) {
      this.last = performance.now();
      this.raf = requestAnimationFrame(this.tick);
    }
  }

  /** Set the value now (no animation), e.g. while a finger is dragging. */
  jump(x: number, done?: () => void) {
    this.stop();
    this.x = this.target = x;
    this.v = 0;
    this.apply(x);
    done?.();
  }

  /** Stop and return the live value (the "presentation" value). */
  stop() {
    cancelAnimationFrame(this.raf);
    this.raf = 0;
    this.done = undefined;
    return this.x;
  }

  private tick = (now: number) => {
    const dt = Math.min((now - this.last) / 1000, 0.05);
    this.last = now;
    const w = (2 * Math.PI) / this.response;
    const k = w * w;
    const c = 2 * this.damping * w;
    const n = Math.max(1, Math.ceil(dt * 240));
    const h = dt / n;
    for (let i = 0; i < n; i++) {
      this.v += (-k * (this.x - this.target) - c * this.v) * h;
      this.x += this.v * h;
    }
    if (Math.abs(this.v) < this.precision && Math.abs(this.x - this.target) < this.precision) {
      const d = this.done;
      this.raf = 0;
      this.done = undefined;
      this.x = this.target;
      this.v = 0;
      this.apply(this.x);
      d?.();
      return;
    }
    this.apply(this.x);
    this.raf = requestAnimationFrame(this.tick);
  };
}

export const reduced = () =>
  typeof matchMedia !== "undefined" && matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Where a flick with `v` px/s comes to rest (Apple's deceleration projection). */
export const project = (v: number, rate = 0.998) => ((v / 1000) * rate) / (1 - rate);

/** Progressive resistance past an edge. */
export const rubberband = (over: number, dim: number, c = 0.55) =>
  (over * dim * c) / (dim + c * Math.abs(over));

/** CSS linear() spring curves for WAAPI (same values as --spring-* in globals.css). */
export const SPRING = {
  soft: {
    duration: 620,
    easing:
      "linear(0, 0.0226, 0.0778, 0.1515, 0.2336, 0.3177, 0.3995, 0.4764, 0.547, 0.6106, 0.6672, 0.7169, 0.7602, 0.7977, 0.8299, 0.8573, 0.8807, 0.9005, 0.9171, 0.9312, 0.9429, 0.9527, 0.9609, 0.9678, 0.9734, 0.9781, 0.982, 0.9852, 0.9879, 0.9901, 0.9919, 0.9933, 0.9946, 0.9955, 1)",
  },
};
