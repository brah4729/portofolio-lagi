export default function Footer() {
  return (
    <footer className="foot">
      <div className="wrap foot__row mono">
        <span>&gt;_ built by dhiren · next.js · 2026</span>
        <button type="button" className="foot__term" data-open-terminal>
          <kbd aria-hidden="true">`</kbd> open terminal
        </button>
      </div>
    </footer>
  );
}
