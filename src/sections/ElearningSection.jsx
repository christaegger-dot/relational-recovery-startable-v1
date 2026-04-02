import React from 'react';
import { Brain, Check } from 'lucide-react';
import { E_MODULES } from '../data/learningContent';

export default function ElearningSection({ quizState, onAnswer, completedModules }) {
  return (
    <article className="space-y-16 no-print">
      <header className="rounded-[3rem] border border-slate-200 bg-white px-8 py-10 shadow-sm md:px-12 md:py-14">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_18rem] lg:items-end">
          <div className="max-w-3xl">
            <div className="mb-6 flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.35em] text-emerald-700">
              <div className="h-[2px] w-10 bg-emerald-200" />
              Fachliche Kurzformate
            </div>
            <h2 id="page-heading-elearning" tabIndex={-1} className="text-4xl font-black tracking-tight text-slate-900 md:text-5xl">
              Lernmodule
            </h2>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-600">
              Kompakte Impulse für Gesprächsführung, Sprache und Einschätzung im Klinikalltag. Ruhig aufbereitet,
              schnell erfassbar und auf fachliche Anwendung ausgerichtet.
            </p>
          </div>
          <aside className="rounded-[2rem] border border-emerald-100 bg-emerald-50/70 p-6">
            <div className="text-[10px] font-black uppercase tracking-[0.24em] text-emerald-900">Einordnung</div>
            <p className="mt-3 text-sm leading-relaxed text-emerald-950">
              Kurze Module, klare Leitidee, anschliessend eine einzelne Reflexionsfrage statt eines prüfungsartigen Formats.
            </p>
          </aside>
        </div>
      </header>

      <section className="rounded-[3rem] border border-slate-100 bg-slate-50 p-6 shadow-sm md:p-8">
        <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_18rem] xl:items-start">
          <div>
            <div className="mb-4 text-[10px] font-black uppercase tracking-[0.24em] text-slate-400">Visuelle Leselogik</div>
            <h3 className="text-3xl font-black tracking-tight text-slate-900 md:text-4xl">
              Jedes Modul folgt einer <span className="text-emerald-600 italic">ruhigen Fachsequenz</span>.
            </h3>
            <p className="mt-5 max-w-4xl text-base leading-relaxed text-slate-600 md:text-lg">
              Leitidee, kurze Einordnung, dann eine einzelne Reflexionsfrage. So bleiben die Module näher an
              Fallarbeit und Supervision als an einem quizartigen Lernformat.
            </p>
          </div>
          <aside className="rounded-[2rem] border border-slate-200 bg-white p-6">
            <div className="text-[10px] font-black uppercase tracking-[0.24em] text-slate-500">Hinweis</div>
            <p className="mt-3 text-sm leading-relaxed text-slate-700">
              Die visuelle Überarbeitung reduziert Kontrast und Box-Schichtung, damit die Fachinhalte ruhiger lesbar werden.
            </p>
          </aside>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {E_MODULES.map((mod) => {
          const result = quizState[mod.id];
          const feedbackId = `${mod.id}-quiz-feedback`;

          return (
            <section
              key={mod.id}
              className="flex flex-col overflow-hidden rounded-[3rem] border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
            >
              <div className="flex h-full flex-col p-8 md:p-10">
                <div className="flex items-start justify-between gap-6 border-b border-slate-100 pb-8">
                  <div>
                    <span className="rounded-full border border-emerald-100 bg-emerald-50 px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-emerald-700">
                      Lernmodul
                    </span>
                    <h3 className="mt-5 text-3xl font-black leading-tight tracking-tight text-slate-900">{mod.title}</h3>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-600">
                      {mod.duration}
                    </span>
                    {completedModules.includes(mod.id) && (
                      <div className="rounded-full border border-emerald-200 bg-emerald-50 p-2.5 text-emerald-700" aria-hidden="true">
                        <Check size={18} strokeWidth={4} />
                      </div>
                    )}
                  </div>
                </div>

                <div className="py-8">
                  <div className="text-[10px] font-black uppercase tracking-[0.24em] text-slate-400">Leitidee</div>
                  <p className="mt-4 max-w-2xl border-l-2 border-emerald-200 pl-5 text-base leading-relaxed text-slate-600 md:text-lg">
                    “{mod.storyboard}”
                  </p>
                </div>

                <div className="mt-auto rounded-[2.5rem] border border-slate-200 bg-[#F6F7F3] p-6 md:p-8">
                  <div className="mb-4 flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                    <Brain size={18} className="text-emerald-600" /> Reflexionsfrage
                  </div>
                  <fieldset aria-describedby={result ? feedbackId : undefined}>
                    <legend className="mb-7 text-sm font-bold leading-relaxed text-slate-800">{mod.quiz}</legend>
                    <div className="space-y-3">
                      {mod.quizOptions.map((opt, idx) => {
                        const isSelected = result?.answerIdx === idx;
                        const isCorrect = idx === mod.correctQuizIdx;

                        return (
                          <label key={opt} className="block cursor-pointer">
                            <input
                              type="radio"
                              name={`${mod.id}-quiz`}
                              className="sr-only"
                              checked={isSelected}
                              onChange={() => onAnswer(mod.id, idx, mod.correctQuizIdx)}
                            />
                            <span
                              className={`block w-full rounded-[1.5rem] border px-5 py-4 text-left text-[14px] font-black transition-all duration-300 haptic-btn ${
                                isSelected
                                  ? isCorrect
                                    ? 'border-emerald-600 bg-emerald-600 text-white shadow-sm'
                                    : 'border-red-200 bg-red-50 text-red-700'
                                  : 'border-slate-200 bg-white text-slate-800 hover:border-emerald-200 hover:bg-emerald-50/30'
                              }`}
                            >
                              {opt}
                            </span>
                          </label>
                        );
                      })}
                    </div>
                  </fieldset>
                  {result && (
                    <div
                      id={feedbackId}
                      role="status"
                      aria-live="polite"
                      aria-atomic="true"
                      className={`mt-6 rounded-[1.5rem] px-5 py-4 text-sm font-medium ${
                        result.isCorrect ? 'bg-emerald-50 text-emerald-800' : 'bg-red-50 text-red-700'
                      }`}
                    >
                      {result.isCorrect
                        ? 'Diese Antwort passt hier fachlich besser. Das Modul gilt als bearbeitet.'
                        : 'Diese Antwort wäre hier eher nicht der erste Schritt. Du kannst erneut wählen.'}
                    </div>
                  )}
                </div>
              </div>
            </section>
          );
        })}
      </div>
    </article>
  );
}
