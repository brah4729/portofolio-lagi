"use client";

import { useRef, useState } from "react";
import { EMAIL } from "../lib/content";

export default function CopyEmail() {
  const [done, setDone] = useState(false);
  const t = useRef<ReturnType<typeof setTimeout>>(undefined);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
    } catch {
      // clipboard blocked (insecure context / permissions): select-and-copy fallback
      const ta = Object.assign(document.createElement("textarea"), { value: EMAIL });
      document.body.append(ta);
      ta.select();
      document.execCommand("copy");
      ta.remove();
    }
    setDone(true);
    clearTimeout(t.current);
    t.current = setTimeout(() => setDone(false), 1800);
  };

  return (
    <div className="copy">
      <button type="button" className="btn btn--solid" onClick={copy} data-magnetic>
        <span className="copy__label" data-done={done}>
          <span>Copy email</span>
          <span aria-hidden="true">Copied</span>
        </span>
      </button>
      <span className="mono copy__addr">{EMAIL}</span>
      <span className="sr-only" role="status">
        {done ? "Email address copied to clipboard" : ""}
      </span>
    </div>
  );
}
