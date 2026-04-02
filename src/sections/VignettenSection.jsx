import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { VIGNETTEN } from '../data/content';

export default function VignettenSection({ currentIndex, setCurrentIndex, selectedOption, onSelectOption }) {
  const vignette = VIGNETTEN[currentIndex];
  const selectedId = selectedOption[vignette.id];
  const selected = vignette.options.find((option) => option.id === selectedId) ?? null;
  const feedbackId = `${vignette.id}-feedback`;

  return (
    <article className="space-y-16 no-print">
      <header className="max-w-3xl mx-auto text-center">
        <h2 id="page-heading-vignetten" tabIndex={-1} className="text-4xl font-black mb-6 tracking-tight italic uppercase tracking-widest">Training mit Vignetten</h2>
        <p className="text-slate-500 text-lg leading-relaxed font-light">
          Kurze Fallsituationen zur Reflexion zwischen Schutz, Kooperation und systemischer Entlastung – mit Fokus auf Abwägung statt Prüfung.
        </p>
      </header>

      <section className="bg-white rounded-[3rem] border border-slate-200 shadow-sm p-8 md:p-14">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-10">
          <div>
            <div className="text-[10px] font-black uppercase tracking-[0.25em] text-emerald-600 mb-3">
              Fall {currentIndex + 1} von {VIGNETTEN.length}
            </div>
            <h3 className="text-3xl md:text-4xl font-black tracking-tight text-slate-900">{vignette.title}</h3>
          </div>
          <span className="inline-flex items-center rounded-full bg-slate-100 px-5 py-3 text-[11px] font-black uppercase tracking-[0.2em] text-slate-700">
            {vignette.status}
          </span>
        </div>

        <p className="text-lg leading-relaxed text-slate-600 max-w-4xl">{vignette.description}</p>

        <fieldset className="mt-12" aria-describedby={selected ? feedbackId : undefined}>
          <legend className="text-sm font-bold mb-6 text-slate-800">Welche Option ist in dieser Situation fachlich eher angezeigt?</legend>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {vignette.options.map((option) => {
              const isActive = selectedId === option.id;
              const tone = option.isCorrect
                ? 'border-emerald-200 hover:border-emerald-400'
                : 'border-slate-200 hover:border-amber-300';

              return (
                <label key={option.id} className="block cursor-pointer">
                  <input
                    type="radio"
                    name={`${vignette.id}-decision`}
                    className="sr-only"
                    checked={isActive}
                    onChange={() => onSelectOption(vignette.id, option.id)}
                  />
                  <span
                    className={`block rounded-[2rem] border-2 p-6 text-left transition-all haptic-btn ${
                      isActive ? 'bg-slate-900 text-white border-slate-900 shadow-lg' : `bg-slate-50 ${tone}`
                    }`}
                  >
                    <span className="flex items-start justify-between gap-4">
                      <span>
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] opacity-70 mb-3 block">Entscheidungsoption</span>
                        <span className="text-lg font-black leading-snug">{option.label}</span>
                      </span>
                      {isActive && <CheckCircle2 size={22} className="shrink-0" aria-hidden="true" />}
                    </span>
                  </span>
                </label>
              );
            })}
          </div>
        </fieldset>

        {selected && (
          <div
            id={feedbackId}
            role="status"
            aria-live="polite"
            aria-atomic="true"
            className={`mt-10 rounded-[2rem] border p-6 md:p-8 ${selected.isCorrect ? 'bg-emerald-50 border-emerald-200' : 'bg-amber-50 border-amber-200'}`}
          >
            <div className="text-[10px] font-black uppercase tracking-[0.2em] mb-3 text-slate-500">Rückmeldung</div>
            <p className={`text-base leading-relaxed font-medium ${selected.isCorrect ? 'text-emerald-900' : 'text-amber-900'}`}>{selected.feedback}</p>
          </div>
        )}

        <div className="mt-10 flex flex-wrap gap-4 justify-between items-center">
          <div className="text-sm text-slate-500">Du kannst die Option jederzeit ändern und den nächsten Fall aufrufen.</div>
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => setCurrentIndex((prev) => Math.max(prev - 1, 0))}
              disabled={currentIndex === 0}
              className="rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-black text-slate-700 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Vorheriger Fall
            </button>
            <button
              type="button"
              onClick={() => setCurrentIndex((prev) => Math.min(prev + 1, VIGNETTEN.length - 1))}
              disabled={currentIndex === VIGNETTEN.length - 1}
              className="rounded-2xl bg-slate-900 px-5 py-3 text-sm font-black text-white disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Nächster Fall
            </button>
          </div>
        </div>
      </section>
    </article>
  );
}
