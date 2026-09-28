export default function SectionHead({ n, id, label, title }: { n: string; id: string; label: string; title: string }) {
  return (
    <header className="sec-head" data-reveal>
      <p className="label mono">
        <span className="label__n">{n}</span> / {label}
      </p>
      <h2 id={`${id}-title`}>{title}</h2>
    </header>
  );
}
