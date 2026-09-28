import { HERO, STATUS } from "../lib/content";

/**
 * Terminal-boot typing, pure CSS: every character is a span that steps to
 * opacity 1 at its own delay, and carries a caret that is only visible during
 * its slot. The last character's caret keeps blinking. No JS, no layout shift,
 * full text is in the DOM for SEO / screen readers.
 */
function Typed({ text, start, step, blink }: { text: string; start: number; step: number; blink?: boolean }) {
  let i = 0;
  return (
    <>
      {text.split(" ").map((word, w, words) => (
        <span className="word" key={w} aria-hidden="true">
          {[...word, ...(w < words.length - 1 ? [" "] : [])].map((c, k, arr) => {
            const idx = i++;
            const last = blink && w === words.length - 1 && k === arr.length - 1;
            return (
              <span
                key={k}
                className={last ? "ch ch--last" : "ch"}
                style={{ "--d": `${start + idx * step}ms`, "--s": `${step}ms` } as React.CSSProperties}
              >
                {c}
              </span>
            );
          })}
        </span>
      ))}
    </>
  );
}

const PROMPT_START = 250;
const PROMPT_STEP = 45;
const TITLE_START = PROMPT_START + HERO.prompt.length * PROMPT_STEP + 150;
const TITLE_STEP = 55;
const STATUS_START = TITLE_START + HERO.title.length * TITLE_STEP + 250;

export default function Hero() {
  return (
    <section id="top" className="hero" aria-label="Introduction">
      <div className="wrap hero__grid">
        <div className="hero__head">
          <p className="hero__prompt mono" aria-hidden="true">
            <Typed text={HERO.prompt} start={PROMPT_START} step={PROMPT_STEP} />
          </p>
          <h1 aria-label={HERO.title}>
            <Typed text={HERO.title} start={TITLE_START} step={TITLE_STEP} blink />
          </h1>
        </div>

        <p className="hero__lead" style={{ "--d": `${STATUS_START - 200}ms` } as React.CSSProperties}>
          {HERO.lead}
        </p>

        <div className="hero__cta" style={{ "--d": `${STATUS_START}ms` } as React.CSSProperties}>
          <a className="btn btn--solid" href="#projects" data-magnetic>
            View Projects
          </a>
          <a className="btn btn--ghost" href="#contact" data-magnetic>
            Get in touch
          </a>
        </div>

        <div className="term hero__term" role="group" aria-label="Currently">
          <div className="term__bar mono" aria-hidden="true">
            <span className="term__dot" />
            ~/dhiren
          </div>
          <p className="term__cmd mono" style={{ "--d": `${STATUS_START}ms` } as React.CSSProperties}>
            <span aria-hidden="true">$ </span>dhiren --currently
          </p>
          <dl className="term__out mono">
            {STATUS.map((s, i) => (
              <div className="term__row" key={s.k} style={{ "--d": `${STATUS_START + 350 + i * 260}ms` } as React.CSSProperties}>
                <dt>{s.k}</dt>
                <dd>{s.v}</dd>
              </div>
            ))}
          </dl>
          <span className="term__caret" style={{ "--d": `${STATUS_START + 350 + STATUS.length * 260}ms` } as React.CSSProperties} aria-hidden="true" />
        </div>

        <a href="#about" className="hero__scroll mono" aria-label="Scroll to About">
          <span>scroll</span>
          <i aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}
