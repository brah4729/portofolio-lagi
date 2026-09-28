import { PROJECTS, SKILLS } from "../lib/content";
import SectionHead from "./SectionHead";

/** Which projects use a skill, derived from the stack tags already in the content. */
const usedIn = (tags?: string[]) =>
  tags ? PROJECTS.filter((p) => p.stack.some((s) => tags.includes(s))).map((p) => p.title) : [];

export default function Skills() {
  return (
    <section id="skills" className="section" aria-labelledby="skills-title">
      <div className="wrap">
        <SectionHead n="02" id="skills" label="skills" title="Skills" />
        <div className="skills">
          {SKILLS.map((g, gi) => (
            <div className="skills__group" key={g.title} data-reveal style={{ "--i": gi } as React.CSSProperties}>
              <h3 className="skills__title mono">
                {g.title}
                <span aria-hidden="true">{String(g.skills.length).padStart(2, "0")}</span>
              </h3>
              <ul className="skills__list">
                {g.skills.map((s) => {
                  const used = usedIn(s.tags);
                  const id = `tip-${s.name.replace(/\W/g, "")}`;
                  return (
                    <li
                      key={s.name}
                      className="skill"
                      tabIndex={used.length ? 0 : undefined}
                      aria-describedby={used.length ? id : undefined}
                      data-used={used.length || undefined}
                    >
                      {s.name}
                      {used.length > 0 && (
                        <span className="skill__tip mono" id={id} role="tooltip">
                          used in {used.join(", ")}
                        </span>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
        <p className="skills__hint mono" data-reveal>
          Underlined skills show which projects use them. Hover, focus or tap.
        </p>
      </div>
    </section>
  );
}
