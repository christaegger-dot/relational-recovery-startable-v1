import { Component } from 'react';
import { AlertTriangle } from 'lucide-react';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (!this.state.hasError) {
      return this.props.children;
    }

    return (
      <section className="rounded-[2rem] border border-[#e4cbbb] bg-[#fff6ee] px-8 py-12 md:px-12 md:py-16">
        <div className="max-w-2xl mx-auto flex flex-col gap-6">
          <div className="flex items-center gap-3 text-[#8d3f32]">
            <AlertTriangle size={24} aria-hidden="true" />
            <h2 className="text-lg font-bold">Ein Fehler ist aufgetreten</h2>
          </div>
          <p className="text-sm leading-relaxed text-stone-700">
            Dieser Bereich konnte nicht geladen werden. Bitte laden Sie die Seite neu.
            Falls das Problem bestehen bleibt, nutzen Sie die Notfallnummern unten.
          </p>
          <div className="rounded-xl border border-[#dec2b2] bg-white/80 px-5 py-4 text-sm leading-relaxed text-[#6d342c]">
            <p className="mb-2 text-[10px] font-extrabold uppercase tracking-[0.18em] text-[#9a4b3c]">
              Akute Krise
            </p>
            <p>
              Bei akuter Lebensgefahr: <strong>144</strong>.
              Im Kanton Zürich bei nicht lebensbedrohlichen Situationen:{' '}
              <strong>AERZTEFON 0800 33 66 55</strong>.
              Für Jugendliche: <strong>147 telefonisch</strong>.
            </p>
          </div>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="self-start rounded-full border border-stone-300/70 bg-white px-5 py-2.5 text-[11px] font-extrabold uppercase tracking-[0.16em] text-stone-700 shadow-sm"
          >
            Seite neu laden
          </button>
        </div>
      </section>
    );
  }
}
