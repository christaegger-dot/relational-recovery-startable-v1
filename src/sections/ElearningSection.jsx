import React from 'react';
import { Brain, Check } from 'lucide-react';
import { E_MODULES } from '../data/content';

export default function ElearningSection({ quizState, onAnswer, completedModules }) {
  return (
    <article className="space-y-16 no-print">
      <header className="max-w-2xl mx-auto text-center">
        <h2 id="page-heading-elearning" tabIndex={-1} className="text-4xl font-black mb-6 tracking-tight italic uppercase tracking-widest">Lernmodule</h2>
        <p className="text-slate-500 text-lg leading-relaxed font-light">
          Kompakte Impulse zur Stärkung der elterlichen Selbstwirksamkeit im Klinikalltag.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {E_MODULES.map((mod) => {
          const result = quizState[mod.id];
          const feedbackId = `${mod.id}-quiz-feedback`;

          return (
            <section
              key={mod.id}
              className="bg-white rounded-[3rem] p-1 shadow-sm border border-slate-200 transition-all duration-300 hover:shadow-xl flex flex-col overflow-hidden"
            >
              <div className="p-8 md:p-12 flex flex-col h-full">
                <div className="flex justify-between items-center mb-10">
                  <span className="bg-emerald-50 text-emerald-700 px-5 py-2 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] shadow-sm">
                    {mod.duration}
                  </span>
                  {completedModules.includes(mod.id) && (
                    <div className="bg-emerald-500 text-white p-2.5 rounded-full shadow-lg" aria-hidden="true">
                      <Check size={18} strokeWidth={4} />
                    </div>
                  )}
                </div>
                <h3 className="text-3xl font-black mb-6 leading-tight tracking-tight text-slate-900">{mod.title}</h3>
                <p className="text-lg text-slate-600 italic mb-10 leading-relaxed border-l-8 border-emerald-50 pl-8 font-light">
                  “{mod.storyboard}”
                </p>

                <div className="bg-slate-50 p-8 rounded-[2.5rem] border border-slate-200 mt-auto">
                  <div className="text-[10px] font-black uppercase mb-4 flex items-center gap-4 text-slate-400 tracking-[0.2em]">
                    <Brain size={18} className="text-emerald-600" /> Reflexionsfrage
                  </div>
                  <fieldset aria-describedby={result ? feedbackId : undefined}>
                    <legend className="text-sm font-bold mb-8 text-slate-800">{mod.quiz}</legend>
                    <div className="space-y-4">
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
                              className={`block w-full text-left p-5 rounded-2xl text-[14px] font-black transition-all duration-300 border-2 haptic-btn ${
                                isSelected
                                  ? isCorrect
                                    ? 'bg-emerald-600 border-emerald-600 text-white shadow-lg'
                                    : 'bg-red-50 border-red-200 text-red-700'
                                  : 'bg-white border-slate-100 hover:border-emerald-200'
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
                      className={`mt-6 rounded-2xl px-5 py-4 text-sm font-medium ${
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
