"use client";

import { useEffect, useRef, useState } from "react";
import { ABOUT, BOOT, EMAIL, EXPERIENCE, LINKS, PROJECTS, SKILLS } from "../lib/content";
import { reduced } from "../lib/spring";

type Line = { t: string; cmd?: boolean };

const BOOT_LINES: string[] = [
  "MonoOS (Dori): 32-bit i686, C + NASM",
  ...BOOT.map((b) => `[ ok ] ${b}`),
  "",
  "type 'help' for commands.",
];

const run = (raw: string): string[] | "clear" | "exit" => {
  const [cmd] = raw.trim().toLowerCase().split(/\s+/);
  switch (cmd) {
    case "":
      return [];
    case "help":
      return ["about       who I am", "skills      what I work with", "projects    things I've built", "experience  where I've worked", "contact     how to reach me", "clear       clear the screen", "exit        close the terminal (or press Esc)"];
    case "about":
      return ABOUT;
    case "skills":
      return SKILLS.map((g) => `${g.title.padEnd(20)}${g.skills.map((s) => s.name).join(", ")}`);
    case "projects":
      return PROJECTS.map((p) => `${p.title.padEnd(28)}${p.status}`);
    case "experience":
      return EXPERIENCE.map((e) => `${e.period.padEnd(16)}${e.role}, ${e.org}`);
    case "contact":
      return [`email     ${EMAIL}`, `github    ${LINKS.github}`, `codeforces ${LINKS.codeforces}`, `linkedin  ${LINKS.linkedin}`];
    case "clear":
      return "clear";
    case "exit":
    case "quit":
      return "exit";
    default:
      return [`command not found: ${cmd}. try 'help'`];
  }
};

/** A pretend MonoOS shell. Open with ` (backtick) or any [data-open-terminal] button. */
export default function Terminal() {
  const [open, setOpen] = useState(false);
  const [lines, setLines] = useState<Line[]>([]);
  const dlg = useRef<HTMLDialogElement>(null);
  const input = useRef<HTMLInputElement>(null);
  const log = useRef<HTMLDivElement>(null);
  const hist = useRef<string[]>([]);
  const hi = useRef(-1);
  const back = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const show = () => {
      back.current = document.activeElement as HTMLElement;
      setOpen(true);
    };
    const key = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement;
      if (e.key === "`" && !e.metaKey && !e.ctrlKey && !/INPUT|TEXTAREA/.test(t.tagName)) {
        e.preventDefault();
        show();
      }
    };
    const click = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest("[data-open-terminal]")) show();
    };
    addEventListener("keydown", key);
    document.addEventListener("click", click);
    return () => {
      removeEventListener("keydown", key);
      document.removeEventListener("click", click);
    };
  }, []);

  // open + fake boot
  useEffect(() => {
    if (!open) return;
    const d = dlg.current!;
    d.showModal();
    input.current?.focus();
    setLines([]);
    let i = 0;
    const push = () => setLines((l) => [...l, { t: BOOT_LINES[i++] }]);
    if (reduced()) {
      setLines(BOOT_LINES.map((t) => ({ t })));
      return;
    }
    const id = setInterval(() => {
      push();
      if (i >= BOOT_LINES.length) clearInterval(id);
    }, 110);
    return () => clearInterval(id);
  }, [open]);

  useEffect(() => {
    log.current?.scrollTo({ top: log.current.scrollHeight });
  }, [lines]);

  const close = () => {
    dlg.current?.close();
    setOpen(false);
    back.current?.focus?.();
  };

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const v = input.current!.value;
    input.current!.value = "";
    if (v.trim()) hist.current.unshift(v);
    hi.current = -1;
    const out = run(v);
    if (out === "clear") return setLines([]);
    if (out === "exit") return close();
    setLines((l) => [...l, { t: v, cmd: true }, ...out.map((t) => ({ t }))]);
  };

  const onKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "ArrowUp" && e.key !== "ArrowDown") return;
    e.preventDefault();
    hi.current = Math.max(-1, Math.min(hist.current.length - 1, hi.current + (e.key === "ArrowUp" ? 1 : -1)));
    input.current!.value = hi.current < 0 ? "" : hist.current[hi.current];
  };

  return (
    <dialog
      ref={dlg}
      className="tdlg"
      aria-label="Terminal"
      onClose={() => {
        setOpen(false);
        back.current?.focus?.();
      }}
      onClick={(e) => e.target === dlg.current && close()}
    >
      {open && (
        <div className="twin mono" onClick={() => input.current?.focus()}>
          <div className="twin__bar">
            <span>guest@dori:~</span>
            <button type="button" className="tw-x" onClick={close} aria-label="Close terminal">
              esc
            </button>
          </div>
          <div className="twin__log" ref={log} role="log" aria-live="polite">
            {lines.map((l, i) => (
              <pre key={i} className={l.cmd ? "is-cmd" : undefined}>
                {l.cmd ? `$ ${l.t}` : l.t}
              </pre>
            ))}
          </div>
          <form className="twin__in" onSubmit={submit}>
            <label htmlFor="tin" aria-hidden="true">
              $
            </label>
            <input id="tin" ref={input} onKeyDown={onKey} autoComplete="off" autoCapitalize="off" spellCheck={false} aria-label="Terminal input" />
          </form>
        </div>
      )}
    </dialog>
  );
}
