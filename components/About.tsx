import { ABOUT } from "../lib/content";
import SectionHead from "./SectionHead";

export default function About() {
  return (
    <section id="about" className="section" aria-labelledby="about-title">
      <div className="wrap split">
        <SectionHead n="01" id="about" label="about" title="About Me" />
        <div className="prose">
          {ABOUT.map((p, i) => (
            <p key={i} className={i === 0 ? "lead" : undefined} data-reveal style={{ "--i": i + 1 } as React.CSSProperties}>
              {p}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
