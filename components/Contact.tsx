import { EMAIL, LINKS } from "../lib/content";
import CopyEmail from "./CopyEmail";

const ROWS = [
  ["GitHub", LINKS.github],
  ["Codeforces", LINKS.codeforces],
  ["LinkedIn", LINKS.linkedin],
] as const;

export default function Contact() {
  return (
    <section id="contact" className="section contact" aria-labelledby="contact-title">
      <div className="wrap">
        <p className="label mono" data-reveal>
          <span className="label__n">06</span> / contact
        </p>
        <h2 id="contact-title" className="contact__title" data-reveal>
          Let&apos;s talk<span className="contact__dot">.</span>
        </h2>
        <div className="contact__grid">
          <p className="lead" data-reveal>
            I&apos;m open to project collaborations, internship opportunities, and just talking shop about kernels, ML pipelines, or competitive programming. Hit me up.
          </p>
          <div data-reveal style={{ "--i": 1 } as React.CSSProperties}>
            <div className="contact__cta">
              <a className="btn btn--ghost" href={`mailto:${EMAIL}`} data-magnetic>
                Send an email
              </a>
              <CopyEmail />
            </div>
            <ul className="contact__links">
              {ROWS.map(([k, href]) => (
                <li key={k}>
                  <a href={href} target="_blank" rel="noreferrer">
                    <span className="mono" aria-hidden="true">
                      &gt;
                    </span>
                    <span className="contact__k">{k}</span>
                    <span className="contact__arrow" aria-hidden="true">
                      ↗
                    </span>
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
