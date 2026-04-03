import React, { useState } from 'react';
import { AlertTriangle, Check, CheckCircle2, ChevronRight, ClipboardCheck, Download, ExternalLink, Printer, RotateCcw, ShieldCheck } from 'lucide-react';
import {
  ACUTE_CRISIS_CONTACTS,
  ACUTE_CRISIS_STEPS,
  ADDICTION_PANELS,
  ADDICTION_TIPS,
  CHILD_PROTECTION_THRESHOLDS,
  CHILD_PROTECTION_TIPS,
  PRACTICE_BLOCKS,
  PRACTICE_BLOCK_FILTERS,
  RIGHTS_FAQ,
  SAFETY_PLAN_POINTS,
  SAFETY_PLAN_TEMPLATE_FIELDS,
} from '../data/toolboxContent';
import { ASSESSMENT_ITEMS } from '../data/learningContent';
import { getRiskLabel, getRiskTone } from '../utils/appHelpers';

export default function ToolboxSection({ score, onToggleAssessment, onResetAssessment, onPrint, onDownloadCrisisPlan, acuteCrisisSectionRef, safetyPlanSectionRef, childProtectionSectionRef, onJumpToPrioritySection }) {
  const [triageAnswers, setTriageAnswers] = useState({});
  const [activePracticeFilter, setActivePracticeFilter] = useState('all');
  const assessmentLiveText = `Aktueller Assessment-Score: ${score.risk}. ${getRiskLabel(score.risk)}. Der Score dient nur als Orientierungshilfe.`;
  const pathwaySteps = [
    {
      label: 'Orientieren',
      title: 'Belastung kurz einordnen',
      desc: 'Welche Faktoren sind aktuell sichtbar, und wo braucht es sofort mehr Aufmerksamkeit?',
    },
    {
      label: 'Sichern',
      title: 'Akute Risiken zuerst klären',
      desc: 'Selbstgefährdung, Kindersicherheit, Versorgung und erreichbare Sofortkontakte priorisieren.',
    },
    {
      label: 'Planen',
      title: 'Krisenvorsorge schriftlich machen',
      desc: 'Warnzeichen, Betreuung, Kontaktkette und Übergaben für belastete Phasen festhalten.',
    },
    {
      label: 'Kooperieren',
      title: 'Freiwillige Hilfe oder Abklärung',
      desc: 'Mit Familie, Netzwerk und Fachstellen den nächsten tragfähigen Schritt bestimmen.',
    },
  ];

  const scoreBands = [
    {
      label: '0–2',
      title: 'tragende Ressourcen genauer sichtbar machen',
      tone: 'border-emerald-200 bg-emerald-50 text-emerald-950',
    },
    {
      label: '3–6',
      title: 'vertiefte Begleitung und Krisenvorsorge prüfen',
      tone: 'border-amber-200 bg-amber-50 text-amber-950',
    },
    {
      label: '7+',
      title: 'Schutz, Sicherung und formelle Abklärung mitdenken',
      tone: 'border-red-200 bg-red-50 text-red-950',
    },
  ];

  const triagePrompts = [
    {
      id: 'acute-danger',
      question: 'Gibt es Hinweise auf akute Selbstgefährdung, Fremdgefährdung oder unmittelbare Unsicherheit für Kinder?',
      yes: {
        title: 'Akute Sicherheit sofort priorisieren',
        text: 'Notruf, Krisendienst oder offizielle Notfallwege gehen vor längerer Abklärung. Kinderbetreuung und Aufsicht sofort mitdenken.',
        target: 'acute-crisis',
        targetLabel: 'Zur Akut-Krise',
        tone: 'border-red-200 bg-red-50 text-red-950',
      },
      no: {
        title: 'Akute Gefährdung aktuell nicht im Vordergrund',
        text: 'Die Einschätzung kann ruhiger in Richtung Krisenvorsorge, Alltag und Kooperation weitergeführt werden.',
        target: 'safety-plan',
        targetLabel: 'Zum Sicherheitsplan',
        tone: 'border-emerald-200 bg-emerald-50 text-emerald-950',
      },
    },
    {
      id: 'care-gap',
      question: 'Sind Aufsicht, Tagesstruktur, Versorgung oder verlässliche Betreuung der Kinder derzeit brüchig?',
      yes: {
        title: 'Schutz und Entlastung konkret prüfen',
        text: 'Wenn Grundversorgung oder Aufsicht nicht verlässlich sind, braucht es rasch konkrete Hilfe und gegebenenfalls eine Kindesschutzabklärung.',
        target: 'child-protection',
        targetLabel: 'Zum Kindeswohl',
        tone: 'border-amber-200 bg-amber-50 text-amber-950',
      },
      no: {
        title: 'Versorgung wirkt aktuell tragfähig',
        text: 'Dann lohnt es sich, tragende Routinen und Schutzfaktoren sichtbar zu halten und nicht nur auf Risiken zu fokussieren.',
        target: 'safety-plan',
        targetLabel: 'Schutzfaktoren absichern',
        tone: 'border-emerald-200 bg-emerald-50 text-emerald-950',
      },
    },
    {
      id: 'crisis-plan',
      question: 'Gibt es bereits einen besprochenen Krisen- oder Sicherheitsplan mit Kinder-Schutzteil?',
      yes: {
        title: 'Bestehende Absprachen aktualisieren',
        text: 'Vorhandene Pläne sind hilfreich, wenn sie überprüft, mit Kontakten ergänzt und in stabileren Phasen gemeinsam geübt werden.',
        target: 'safety-plan',
        targetLabel: 'Plan überprüfen',
        tone: 'border-slate-200 bg-slate-50 text-slate-900',
      },
      no: {
        title: 'Krisenvorsorge schriftlich machen',
        text: 'Ein kurzer Plan zu Warnzeichen, Kinderbetreuung, Kontaktkette und sicheren Orten entlastet in belasteten Phasen deutlich.',
        target: 'safety-plan',
        targetLabel: 'Plan anlegen',
        tone: 'border-emerald-200 bg-emerald-50 text-emerald-950',
      },
    },
    {
      id: 'network',
      question: 'Gibt es mindestens eine mitwissende Bezugsperson oder Fachstelle, die kurzfristig mittragen kann?',
      yes: {
        title: 'Kooperation aktiv nutzen',
        text: 'Bestehende Unterstützung sollte konkret in Absprachen, Übergaben und Rückmeldewegen eingebunden werden.',
        target: 'safety-plan',
        targetLabel: 'Kooperation konkretisieren',
        tone: 'border-slate-200 bg-slate-50 text-slate-900',
      },
      no: {
        title: 'Netzwerk rasch erweitern',
        text: 'Fehlende Mitwissende erhöhen die Belastung. Jetzt sind niedrigschwellige Hilfen, Bezugspersonen und Fachstellen besonders wichtig.',
        target: 'child-protection',
        targetLabel: 'Unterstützung prüfen',
        tone: 'border-amber-200 bg-amber-50 text-amber-950',
      },
    },
  ];

  const answeredPrompts = triagePrompts.filter((prompt) => triageAnswers[prompt.id]);
  const triagePriorities = answeredPrompts.map((prompt) => prompt[triageAnswers[prompt.id]]);
  const primaryPriority =
    triagePriorities.find((item) => item.target === 'acute-crisis') ||
    triagePriorities.find((item) => item.target === 'child-protection') ||
    triagePriorities.find((item) => item.target === 'safety-plan') ||
    null;

  const setTriageAnswer = (id, answer) => {
    setTriageAnswers((current) => ({
      ...current,
      [id]: current[id] === answer ? undefined : answer,
    }));
  };

  const filteredPracticeBlocks = PRACTICE_BLOCKS.filter(
    (item) => activePracticeFilter === 'all' || item.tags.includes(activePracticeFilter)
  );
  const answeredCount = answeredPrompts.length;
  const triageSummaryText =
    answeredCount === 0
      ? 'Noch keine Fragen beantwortet. Die Triage startet mit akuter Sicherheit und endet bei Kooperation und Absicherung.'
      : `${answeredCount} von ${triagePrompts.length} Fragen beantwortet. Die aktuell wichtigste Spur ist ${primaryPriority?.title?.toLowerCase() ?? 'noch offen'}.`;

  return (
    <article className="space-y-16">
      <section className="rounded-[4rem] border border-slate-200 bg-white p-8 shadow-sm md:p-16 no-print">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_24rem] lg:items-start">
          <div>
            <div className="mb-8 flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.35em] text-emerald-700">
              <div className="h-[2px] w-10 bg-emerald-200" />
              Klinische Orientierung
            </div>
            <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-[1.75rem] border border-emerald-100 bg-emerald-50">
              <ClipboardCheck className="text-emerald-700" size={30} />
            </div>
            <h2 id="page-heading-toolbox" tabIndex={-1} className="mb-5 text-4xl font-black tracking-tight text-slate-900 md:text-5xl">
              Orientierung, Schutz und nächste Schritte
            </h2>
            <p className="mb-5 max-w-3xl text-lg leading-relaxed text-slate-600">
              Strukturierte Einschätzung familiärer Belastung als Gesprächshilfe für Abwägung, Schutz und nächste Schritte,
              nicht als Diagnose- oder Urteilsinstrument.
            </p>
            <p className="max-w-3xl text-sm leading-relaxed text-slate-500">
              Hohe Werte bedeuten nicht automatisch Gefährdung. Sie zeigen vor allem an, dass Schutz, Entlastung,
              Krisenvorsorge und gemeinsame Absprachen genauer betrachtet werden sollten.
            </p>
          </div>

          <aside className="rounded-[2.5rem] border border-slate-200 bg-slate-50 p-8">
            <div className="text-[10px] font-black uppercase tracking-[0.24em] text-slate-500">Orientierender Hinweis</div>
            <div className="mt-6 text-6xl font-black leading-none tracking-tight text-slate-900 tabular-nums">{score.risk}</div>
            <div className={`mt-6 inline-block rounded-full px-6 py-3 text-[11px] font-black uppercase tracking-[0.28em] ${getRiskTone(score.risk)}`}>
              {getRiskLabel(score.risk)}
            </div>
            <p id="assessment-score-status" role="status" aria-live="polite" aria-atomic="true" className="sr-only">
              {assessmentLiveText}
            </p>
            <button
              type="button"
              onClick={onResetAssessment}
              className="mt-8 inline-flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.28em] text-slate-500 transition-colors hover:text-slate-900 haptic-btn"
            >
              <RotateCcw size={16} /> Assessment zurücksetzen
            </button>
          </aside>
        </div>

        <div className="mt-12 rounded-[3rem] border border-slate-200 bg-slate-50 p-6 md:p-8">
          <fieldset className="w-full text-left" aria-describedby="assessment-score-status">
            <legend className="mb-5 text-[10px] font-black uppercase tracking-[0.24em] text-slate-500">Assessment-Faktoren</legend>
            <div className="grid w-full grid-cols-1 gap-4 text-left md:grid-cols-2">
              {ASSESSMENT_ITEMS.map((item) => {
                const checked = score.checked.includes(item.id);

                return (
                  <label
                    key={item.id}
                    className={`flex cursor-pointer items-center gap-5 rounded-[2rem] border p-6 transition-all haptic-btn ${
                      checked
                        ? 'border-emerald-200 bg-white shadow-sm'
                        : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    <input
                      type="checkbox"
                      className="sr-only"
                      checked={checked}
                      onChange={() => onToggleAssessment(item.id)}
                    />
                    <div className={`flex h-6 w-6 items-center justify-center rounded-lg border-2 transition-all ${checked ? 'border-emerald-600 bg-emerald-600' : 'border-slate-300 bg-white'}`}>
                      {checked && <Check size={16} className="text-white" strokeWidth={4} aria-hidden="true" />}
                    </div>
                    <div>
                      <div className="text-xs font-black uppercase tracking-widest text-slate-900">{item.label}</div>
                      <div className="mt-2 text-[11px] uppercase tracking-[0.2em] text-slate-500">Hinweisgewicht: {item.val}</div>
                    </div>
                  </label>
                );
              })}
            </div>
          </fieldset>
        </div>
      </section>

      <section className="rounded-[3rem] border border-slate-100 bg-slate-50 p-6 md:p-8 shadow-sm no-print">
        <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_20rem] xl:items-start">
          <div>
            <div className="text-[10px] font-black uppercase tracking-[0.24em] text-slate-400 mb-4">Entscheidungsdiagramm</div>
            <h3 className="text-3xl md:text-4xl font-black tracking-tight text-slate-900">
              Die Toolbox folgt einer <span className="text-emerald-600 italic">klaren Triage-Logik</span>.
            </h3>
            <p className="mt-5 max-w-4xl text-base md:text-lg leading-relaxed text-slate-600">
              Das Assessment ist nicht das Ziel, sondern der Einstieg. Entscheidend ist, wie daraus ein kurzer,
              nachvollziehbarer Weg zu Sicherheit, Krisenvorsorge und den nächsten Absprachen entsteht.
            </p>
          </div>
          <aside className="rounded-[2rem] border border-slate-200 bg-white p-6">
            <div className="text-[10px] font-black uppercase tracking-[0.24em] text-slate-500">Leitidee</div>
            <p className="mt-3 text-sm leading-relaxed text-slate-700">
              Nicht jeder hohe Wert bedeutet automatisch Gefährdung. Aber jeder Wert sollte in einen konkreten nächsten Schritt übersetzt werden.
            </p>
            <div className="mt-5 rounded-[1.5rem] border border-emerald-100 bg-emerald-50/70 p-4">
              <div className="text-[10px] font-black uppercase tracking-[0.18em] text-emerald-800">Arbeitslogik</div>
              <p className="mt-2 text-sm leading-relaxed text-emerald-950">
                Erst Sicherheit, dann Vorsorge, danach Schutz- und Kooperationsfragen. Die Grafik hält diese Reihenfolge sichtbar.
              </p>
            </div>
          </aside>
        </div>

        <div className="mt-8 overflow-hidden rounded-[2.5rem] border border-slate-200 bg-white p-5 md:p-8">
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-4">
            {pathwaySteps.map((step, index) => (
              <div key={step.label} className="relative">
                <section className="h-full rounded-[2rem] border border-slate-200 bg-[#F6F7F3] p-6 shadow-sm">
                  <div className="mb-4 flex items-center justify-between gap-4">
                    <div className="inline-flex rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-emerald-700">
                      Schritt {index + 1}
                    </div>
                    <div className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-400">{step.label}</div>
                  </div>
                  <div className="mb-4 h-[2px] w-12 bg-emerald-200" />
                  <div className="mb-2 text-[10px] font-black uppercase tracking-[0.18em] text-slate-400">Arbeitsfenster</div>
                  <h4 className="text-xl font-black tracking-tight text-slate-900">{step.title}</h4>
                  <p className="mt-4 text-sm leading-relaxed text-slate-600">{step.desc}</p>
                </section>
                {index < pathwaySteps.length - 1 && (
                  <>
                    <div className="absolute right-[-0.85rem] top-1/2 hidden h-[2px] w-7 -translate-y-1/2 bg-emerald-300 lg:block" />
                    <div className="absolute right-[-0.6rem] top-1/2 hidden h-2.5 w-2.5 -translate-y-1/2 rotate-45 border-r-2 border-t-2 border-emerald-400 lg:block" />
                    <div className="mx-auto mt-4 flex h-8 w-8 items-center justify-center rounded-full border border-emerald-200 bg-white text-emerald-700 lg:hidden">
                      <ChevronRight size={16} />
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>

          <div className="mt-6 rounded-[1.75rem] border border-emerald-100 bg-emerald-50/80 px-5 py-4">
            <p className="text-sm leading-relaxed font-medium text-emerald-950">
              Leitidee: Gute Triage hält die Reihenfolge stabil. Akute Sicherheit wird nicht von späteren Kooperationsfragen überlagert.
            </p>
          </div>
        </div>
      </section>

      <section className="rounded-[3rem] border border-slate-100 bg-slate-50 p-6 md:p-8 shadow-sm no-print">
        <div className="text-[10px] font-black uppercase tracking-[0.24em] text-slate-400 mb-4">Von der Einschätzung zum Handeln</div>
        <p className="text-sm md:text-base text-slate-600 leading-relaxed max-w-4xl">
          Die folgenden Arbeitsfenster übersetzen die bisherige Einschätzung in konkrete Praxis: zuerst akute Sicherheit,
          dann Krisenvorsorge und schliesslich Schutz- und Kooperationsfragen im Alltag. So bleibt die Toolbox systemisch,
          aber auch in belasteten Situationen handlungsnah.
        </p>

        <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,1fr)_18rem] lg:items-start">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {scoreBands.map((band) => (
              <div key={band.label} className={`rounded-[1.75rem] border p-5 ${band.tone}`}>
                <div className="text-[10px] font-black uppercase tracking-[0.2em] opacity-80">Score {band.label}</div>
                <p className="mt-3 text-sm leading-relaxed font-medium">{band.title}</p>
              </div>
            ))}
          </div>

          <aside className="rounded-[2rem] border border-slate-200 bg-white p-6">
            <div className="text-[10px] font-black uppercase tracking-[0.24em] text-slate-500">Kurzlesart</div>
            <p className="mt-3 text-sm leading-relaxed text-slate-700">
              Die Score-Bänder ersetzen keine Beurteilung. Sie schärfen nur den Ton der nächsten Schritte: Ressourcen halten,
              Vorsorge ausbauen oder Schutz formeller prüfen.
            </p>
          </aside>
        </div>
      </section>

      <section className="rounded-[3rem] border border-slate-100 bg-white p-6 shadow-sm md:p-8 no-print">
        <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_21rem] xl:items-start">
          <div>
            <div className="mb-4 text-[10px] font-black uppercase tracking-[0.24em] text-slate-400">Interaktive Triage</div>
            <h3 className="text-3xl font-black tracking-tight text-slate-900 md:text-4xl">
              Vier kurze Fragen helfen, den <span className="text-emerald-600 italic">nächsten sinnvollen Schritt</span> zu klären.
            </h3>
            <p className="mt-5 max-w-4xl text-base leading-relaxed text-slate-600 md:text-lg">
              Die Triage ersetzt keine klinische Beurteilung. Sie übersetzt aber typische Praxisfragen rasch in Akut-Sicherung,
              Krisenvorsorge oder Schutzabklärung.
            </p>
          </div>
          <aside className="rounded-[2rem] border border-slate-200 bg-slate-50 p-6">
            <div className="text-[10px] font-black uppercase tracking-[0.24em] text-slate-500">Anwendung</div>
            <p className="mt-3 text-sm leading-relaxed text-slate-700">
              Die Fragen können im Gespräch, in der Fallbesprechung oder zur eigenen Strukturierung genutzt werden. Mehrere
              Antworten können gleichzeitig relevant sein.
            </p>
          </aside>
        </div>

        <div className="mt-8 grid gap-4">
          {triagePrompts.map((prompt, index) => {
            const currentAnswer = triageAnswers[prompt.id];
            const recommendation = currentAnswer ? prompt[currentAnswer] : null;

            return (
              <section key={prompt.id} className="rounded-[2rem] border border-slate-200 bg-slate-50 p-5 md:p-6">
                <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                  <div className="max-w-3xl">
                    <div className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Frage {index + 1}</div>
                    <h4 className="mt-3 text-lg font-black leading-snug text-slate-900 md:text-xl">{prompt.question}</h4>
                  </div>
                  <div className="flex shrink-0 flex-wrap gap-3">
                    <button
                      type="button"
                      onClick={() => setTriageAnswer(prompt.id, 'yes')}
                      aria-pressed={currentAnswer === 'yes'}
                      className={`rounded-full border px-5 py-3 text-[11px] font-black uppercase tracking-[0.18em] transition-colors haptic-btn ${
                        currentAnswer === 'yes'
                          ? 'border-emerald-700 bg-emerald-700 text-white'
                          : 'border-slate-300 bg-white text-slate-900 hover:border-emerald-400 hover:bg-emerald-50'
                      }`}
                    >
                      Ja
                    </button>
                    <button
                      type="button"
                      onClick={() => setTriageAnswer(prompt.id, 'no')}
                      aria-pressed={currentAnswer === 'no'}
                      className={`rounded-full border px-5 py-3 text-[11px] font-black uppercase tracking-[0.18em] transition-colors haptic-btn ${
                        currentAnswer === 'no'
                          ? 'border-slate-900 bg-slate-900 text-white'
                          : 'border-slate-300 bg-white text-slate-900 hover:border-slate-400 hover:bg-slate-100'
                      }`}
                    >
                      Nein
                    </button>
                  </div>
                </div>

                {recommendation && (
                  <div className={`mt-5 rounded-[1.5rem] border p-5 ${recommendation.tone}`}>
                    <div className="text-[10px] font-black uppercase tracking-[0.2em] opacity-80">Einordnung</div>
                    <h5 className="mt-3 text-lg font-black tracking-tight">{recommendation.title}</h5>
                    <p className="mt-3 text-sm leading-relaxed">{recommendation.text}</p>
                    <button
                      type="button"
                      onClick={() => onJumpToPrioritySection(recommendation.target)}
                      className="mt-5 inline-flex items-center gap-2 rounded-full border border-current/20 bg-white/70 px-4 py-2 text-[11px] font-black uppercase tracking-[0.18em] transition-colors hover:bg-white haptic-btn"
                    >
                      {recommendation.targetLabel} <ChevronRight size={14} />
                    </button>
                  </div>
                )}
              </section>
            );
          })}
        </div>

        <div className="mt-6 rounded-[1.75rem] border border-slate-200 bg-slate-50 p-5">
          <div className="text-[10px] font-black uppercase tracking-[0.24em] text-slate-500">Triage-Status</div>
          <p className="mt-3 text-sm leading-relaxed text-slate-700">{triageSummaryText}</p>
        </div>

        {primaryPriority && (
          <div className={`mt-8 rounded-[2rem] border p-6 md:p-7 ${primaryPriority.tone}`}>
            <div className="text-[10px] font-black uppercase tracking-[0.24em] opacity-80">Aktuell wichtigste Spur</div>
            <h4 className="mt-3 text-2xl font-black tracking-tight">{primaryPriority.title}</h4>
            <p className="mt-4 max-w-3xl text-sm leading-relaxed">{primaryPriority.text}</p>
            <button
              type="button"
              onClick={() => onJumpToPrioritySection(primaryPriority.target)}
              className="mt-5 inline-flex items-center gap-2 rounded-full border border-current/20 bg-white/70 px-5 py-3 text-[11px] font-black uppercase tracking-[0.18em] transition-colors hover:bg-white haptic-btn"
            >
              {primaryPriority.targetLabel} <ChevronRight size={14} />
            </button>
          </div>
        )}
      </section>

      <section className="rounded-[3rem] border border-slate-100 bg-slate-50 p-6 shadow-sm md:p-8 no-print">
        <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_21rem] xl:items-start">
          <div>
            <div className="mb-4 text-[10px] font-black uppercase tracking-[0.24em] text-slate-400">Filterbare Praxisbausteine</div>
            <h3 className="text-3xl font-black tracking-tight text-slate-900 md:text-4xl">
              Situationen schneller in <span className="text-emerald-600 italic">konkrete Handlungsfenster</span> übersetzen.
            </h3>
            <p className="mt-5 max-w-4xl text-base leading-relaxed text-slate-600 md:text-lg">
              Die Bausteine bündeln wiederkehrende Praxislagen. So lassen sich Krise, Gespräch, Kinderschutz,
              Elternrolle, Sucht und Vernetzung gezielt filtern, statt die ganze Toolbox durchsuchen zu müssen.
            </p>
          </div>
          <aside className="rounded-[2rem] border border-slate-200 bg-white p-6">
            <div className="text-[10px] font-black uppercase tracking-[0.24em] text-slate-500">Nutzung</div>
            <p className="mt-3 text-sm leading-relaxed text-slate-700">
              Die Filter sind als Einstieg gedacht. Sie ersetzen keine Einschätzung, helfen aber dabei, passende
              Abschnitte schneller zu öffnen.
            </p>
          </aside>
        </div>

        <div className="mt-8 flex flex-wrap gap-2" aria-label="Praxisbausteine filtern">
          {PRACTICE_BLOCK_FILTERS.map((filter) => (
            <button
              key={filter.id}
              type="button"
              onClick={() => setActivePracticeFilter(filter.id)}
              aria-pressed={activePracticeFilter === filter.id}
              className={`rounded-full border px-4 py-2 text-[11px] font-black uppercase tracking-[0.18em] transition-colors haptic-btn ${
                activePracticeFilter === filter.id
                  ? 'border-emerald-200 bg-emerald-50 text-emerald-900'
                  : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-100'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
          {filteredPracticeBlocks.map((item) => (
            <section key={item.title} className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex flex-wrap gap-2">
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-emerald-800"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <h4 className="mt-5 text-xl font-black tracking-tight text-slate-900">{item.title}</h4>
              <p className="mt-4 text-sm leading-relaxed text-slate-600">{item.text}</p>
              <button
                type="button"
                onClick={() => onJumpToPrioritySection(item.target)}
                className="mt-6 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-[11px] font-black uppercase tracking-[0.18em] text-slate-900 transition-colors hover:bg-slate-100 haptic-btn"
              >
                {item.targetLabel} <ChevronRight size={14} />
              </button>
            </section>
          ))}
        </div>
      </section>

      <section
        id="priority-acute-crisis"
        ref={acuteCrisisSectionRef}
        tabIndex={-1}
        className="bg-white p-8 md:p-16 rounded-[4rem] border border-slate-100 shadow-sm no-print scroll-mt-28"
      >
        <div className="text-[10px] font-black uppercase tracking-[0.24em] text-emerald-700 mb-5">Akute Krise und Suizidgefahr</div>
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
          <div className="xl:col-span-7">
            <h3 tabIndex={-1} className="text-3xl md:text-4xl font-black tracking-tight text-slate-900 mb-5">
              In der Krise gilt: <span className="text-emerald-600 italic">schnell, klar und nicht allein</span>.
            </h3>
            <div className="flex flex-wrap gap-3 mb-6">
              <button
                type="button"
                onClick={() => onJumpToPrioritySection('safety-plan')}
                className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-[11px] font-black uppercase tracking-[0.18em] text-emerald-900 hover:bg-emerald-100 transition-colors"
              >
                Zum Sicherheitsplan <ChevronRight size={14} />
              </button>
              <button
                type="button"
                onClick={() => onJumpToPrioritySection('child-protection')}
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-[11px] font-black uppercase tracking-[0.18em] text-slate-900 hover:bg-slate-100 transition-colors"
              >
                Zum Kindeswohl <ChevronRight size={14} />
              </button>
            </div>
            <div className="space-y-4 text-slate-600 leading-relaxed">
              <p>
                Wenn psychische Symptome eskalieren oder Suizidgedanken im Raum stehen, hilft ein kurzer, ruhiger Ablauf
                mehr als langes Abwägen. Sprechen Sie akute Selbstgefährdung offen an, bleiben Sie nach Möglichkeit nicht
                allein damit und nutzen Sie offizielle Zürcher oder schweizerische Notfallwege.
              </p>
              <p>
                Der wichtigste Grundsatz ist: Bei akuter Lebensgefahr geht der Notruf vor jeder längeren Erklärung.
                Für Jugendliche ist das Telefon bei 147 der schnellste Weg; WhatsApp oder E-Mail eignen sich eher,
                wenn nicht jede Minute zählt. Wenn Kinder betroffen sind, gehört ihre unmittelbare Sicherheit immer
                in denselben Handlungsplan.
              </p>
            </div>
          </div>
          <aside className="xl:col-span-5 rounded-[2.5rem] border border-emerald-100 bg-emerald-50/70 p-6 md:p-8">
            <div className="text-[10px] font-black uppercase tracking-[0.24em] text-emerald-900 mb-5">Sofort-Schritte</div>
            <div className="space-y-3">
              {ACUTE_CRISIS_STEPS.map((step) => (
                <div key={step} className="flex items-start gap-3">
                  <AlertTriangle size={18} className="mt-1 shrink-0 text-emerald-700" />
                  <p className="text-sm text-emerald-950 leading-relaxed font-medium">{step}</p>
                </div>
              ))}
            </div>
          </aside>
        </div>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {ACUTE_CRISIS_CONTACTS.map((contact) => {
            const cardClasses =
              'rounded-[2rem] border border-slate-100 bg-slate-50 p-6 shadow-sm transition-colors ' +
              (contact.link ? 'hover:border-emerald-200' : '');

            const content = (
              <>
                <div className="text-[10px] font-black uppercase tracking-[0.24em] text-slate-400 mb-3">Offizielle Anlaufstelle</div>
                <div className="text-xl font-black text-slate-900 mb-2">{contact.name}</div>
                <p className="text-sm text-slate-600 leading-relaxed">{contact.note}</p>
                <div className="mt-5 inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.18em] text-slate-900">
                  {contact.link ? (
                    <>
                      Öffnen <ExternalLink size={14} />
                    </>
                  ) : (
                    <>Nur Nummer merken</>
                  )}
                </div>
              </>
            );

            return contact.link ? (
              <a
                key={contact.name}
                href={contact.link}
                target="_blank"
                rel="noopener noreferrer"
                className={cardClasses}
              >
                {content}
              </a>
            ) : (
              <div key={contact.name} className={cardClasses}>
                {content}
              </div>
            );
          })}
        </div>
      </section>

      <section
        id="priority-safety-plan"
        ref={safetyPlanSectionRef}
        tabIndex={-1}
        className="bg-white p-8 md:p-16 rounded-[4rem] border border-slate-100 shadow-sm no-print scroll-mt-28"
      >
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
          <div>
            <div className="text-[10px] font-black uppercase tracking-[0.24em] text-slate-400 mb-5">Sicherheitsplan / Krisenplan für Angehörige</div>
            <h3 tabIndex={-1} className="text-3xl md:text-4xl font-black tracking-tight text-slate-900 mb-5">
              Eine konkrete <span className="text-emerald-600 italic">1-Seiten-Vorlage</span> für belastete Phasen.
            </h3>
            <p className="text-slate-600 leading-relaxed max-w-4xl">
              Nach der akuten Orientierung hilft ein vorbereiteter Sicherheitsplan, die nächsten Schritte nicht jedes Mal
              neu aushandeln zu müssen. Die Vorlage unten bündelt Warnzeichen, Sofortkontakte, Kinderbetreuung,
              sichere Orte und Kommunikationswege auf einer Seite.
            </p>
          </div>
          <div className="no-print">
            <button
              type="button"
              onClick={onPrint}
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-5 py-3 text-[11px] font-black uppercase tracking-[0.18em] text-slate-900 hover:bg-slate-100 transition-colors"
            >
              Vorlage drucken <Printer size={14} />
            </button>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          {SAFETY_PLAN_POINTS.map((point) => (
            <div key={point} className="rounded-[1.75rem] border border-slate-100 bg-slate-50 p-5">
              <div className="flex items-start gap-3">
                <ShieldCheck size={18} className="mt-1 shrink-0 text-emerald-600" />
                <p className="text-sm text-slate-700 leading-relaxed font-medium">{point}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 rounded-[2.75rem] border border-slate-200 bg-white p-6 md:p-10 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 border-b border-slate-100 pb-6 mb-8">
            <div>
              <div className="text-[10px] font-black uppercase tracking-[0.24em] text-emerald-700 mb-3">1-Seiten-Vorlage</div>
              <h4 className="text-2xl font-black tracking-tight text-slate-900">Sicherheitsplan für belastete Phasen</h4>
            </div>
            <div className="text-sm text-slate-500 leading-relaxed">
              Gemeinsam vorbereitet am: ____________________ &nbsp;&nbsp; Nächste Überprüfung: ____________________
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {SAFETY_PLAN_TEMPLATE_FIELDS.map((field) => (
              <section key={field.title} className="rounded-[2rem] border border-slate-100 bg-slate-50 p-6">
                <div className="text-[10px] font-black uppercase tracking-[0.24em] text-slate-400 mb-3">{field.title}</div>
                <p className="text-sm text-slate-600 leading-relaxed mb-5">{field.hint}</p>
                <div className="space-y-3">
                  <div className="h-8 border-b border-slate-300" />
                  <div className="h-8 border-b border-slate-300" />
                  <div className="h-8 border-b border-slate-300" />
                </div>
              </section>
            ))}
          </div>

          <div className="mt-8 rounded-[2rem] border border-emerald-100 bg-emerald-50/70 p-6">
            <p className="text-sm text-emerald-950 leading-relaxed">
              Diese Vorlage ist bewusst kurz gehalten. Für Familien mit Kindern sollte sie immer einen eigenen
              Kinder-Schutzteil enthalten und in stabileren Phasen gemeinsam vorbereitet werden, damit sie in der
              Krise ohne lange Diskussion verwendet werden kann.
            </p>
          </div>
        </div>
      </section>

      <section
        id="priority-child-protection"
        ref={childProtectionSectionRef}
        tabIndex={-1}
        className="bg-white p-8 md:p-16 rounded-[4rem] border border-slate-100 shadow-sm no-print scroll-mt-28"
      >
        <div className="text-[10px] font-black uppercase tracking-[0.24em] text-slate-400 mb-5">Kindeswohl und Kindesschutz in Zürich</div>
        <h3 tabIndex={-1} className="text-3xl md:text-4xl font-black tracking-tight text-slate-900 mb-5">
          So viel <span className="text-emerald-600 italic">Schutz wie nötig</span>, so wenig Eingriff wie möglich.
        </h3>
        <p className="text-slate-600 leading-relaxed max-w-4xl">
          Nach Krise und Sicherheitsplan stellt sich oft die ruhigere, aber entscheidende Frage: Reicht freiwillige Hilfe
          aus, oder braucht es eine formelle Abklärung? Entscheidend sind beobachtbare Hinweise im Alltag – nicht allein
          die psychiatrische Diagnose.
        </p>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-5">
          {CHILD_PROTECTION_THRESHOLDS.map((item) => (
            <section key={item.title} className="rounded-[2rem] border border-slate-100 bg-slate-50 p-6 shadow-sm">
              <h4 className="text-xl font-black text-slate-900 mb-3 tracking-tight">{item.title}</h4>
              <p className="text-sm text-slate-600 leading-relaxed">{item.text}</p>
            </section>
          ))}
        </div>

        <div className="mt-8 rounded-[2.5rem] border border-slate-200 bg-slate-50 p-6 md:p-8">
          <div className="text-[10px] font-black uppercase tracking-[0.24em] text-slate-500 mb-5">Praktische Leitfragen</div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {CHILD_PROTECTION_TIPS.map((tip) => (
              <div key={tip} className="flex items-start gap-3 rounded-[1.5rem] border border-slate-200 bg-white p-5">
                <CheckCircle2 size={18} className="mt-1 shrink-0 text-emerald-600" />
                <p className="text-sm text-slate-700 leading-relaxed font-medium">{tip}</p>
              </div>
            ))}
          </div>
        </div>
      </section>


      <section id="addiction" className="bg-white p-8 md:p-16 rounded-[4rem] border border-slate-100 shadow-sm no-print scroll-mt-28">
        <div className="text-[10px] font-black uppercase tracking-[0.24em] text-slate-400 mb-5">Sucht und psychische Erkrankung zusammen</div>
        <h3 className="text-3xl md:text-4xl font-black tracking-tight text-slate-900 mb-5">
          Zwischen <span className="text-emerald-600 italic">Sicherheit</span>, Grenzen und Hilfezugang.
        </h3>
        <p className="text-slate-600 leading-relaxed max-w-4xl">
          Nicht jede Familienkrise ist nur psychiatrisch. Wenn Substanzkonsum dazukommt, braucht es oft noch klarere
          Sicherheitsabsprachen: Grenzen setzen, Risiken für Kinder ernst nehmen und gleichzeitig Hilfewege offen halten.
        </p>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-5">
          {ADDICTION_PANELS.map((item) => (
            <section key={item.title} className="rounded-[2rem] border border-slate-100 bg-slate-50 p-6 shadow-sm">
              <h4 className="text-xl font-black text-slate-900 mb-3 tracking-tight">{item.title}</h4>
              <p className="text-sm text-slate-600 leading-relaxed">{item.text}</p>
            </section>
          ))}
        </div>

        <div className="mt-8 rounded-[2.5rem] border border-slate-200 bg-slate-50 p-6 md:p-8">
          <div className="text-[10px] font-black uppercase tracking-[0.24em] text-slate-500 mb-5">Praktische Leitlinien</div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {ADDICTION_TIPS.map((tip) => (
              <div key={tip} className="flex items-start gap-3 rounded-[1.5rem] border border-slate-200 bg-white p-5">
                <CheckCircle2 size={18} className="mt-1 shrink-0 text-emerald-600" />
                <p className="text-sm text-slate-700 leading-relaxed font-medium">{tip}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="rights" className="bg-white p-8 md:p-16 rounded-[4rem] border border-slate-100 shadow-sm no-print scroll-mt-28">
        <div className="text-[10px] font-black uppercase tracking-[0.24em] text-slate-400 mb-5">Rolle, Rechte und Schweigepflicht</div>
        <h3 className="text-3xl md:text-4xl font-black tracking-tight text-slate-900 mb-5">
          Angehörige dürfen <span className="text-emerald-600 italic">mitteilen</span>, auch wenn Teams nicht alles zurückmelden dürfen.
        </h3>
        <p className="text-slate-600 leading-relaxed max-w-4xl">
          Gerade wenn Behandlung, Schutzfragen und Familienalltag zusammenkommen, hilft eine ruhige Orientierung mehr als
          ein juristischer Langtext: Was dürfen Angehörige weitergeben? Was bedeutet Schweigepflicht praktisch? Wozu dienen
          Vorausplanung und eine psychiatrische Patientenverfügung?
        </p>

        <div className="mt-8 space-y-4">
          {RIGHTS_FAQ.map((item) => (
            <section key={item.question} className="rounded-[2rem] border border-slate-100 bg-slate-50 p-6 shadow-sm">
              <h4 className="text-xl font-black text-slate-900 mb-3 tracking-tight">{item.question}</h4>
              <p className="text-sm text-slate-600 leading-relaxed">{item.answer}</p>
            </section>
          ))}
        </div>
      </section>

      <section className="bg-white p-8 md:p-16 rounded-[4rem] border border-slate-100 shadow-sm">
        <h3 className="text-3xl font-black text-slate-900 mb-4 uppercase tracking-[0.25em] italic border-b-8 border-slate-50 pb-10">
          Arbeitsmaterialien
        </h3>
        <p className="mb-12 max-w-3xl text-base leading-relaxed text-slate-600">
          Zwei direkte Arbeitsmittel für Fallgespräch, Supervision oder Krisenvorsorge: eine druckbare
          Gesprächszusammenfassung und eine bearbeitbare Textvorlage. Nichts wird automatisch gespeichert.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 no-print">
          <button type="button" className="group text-left" onClick={onPrint}>
            <div className="bg-slate-50 rounded-[3rem] p-8 md:p-16 border-2 border-slate-100 group-hover:border-emerald-500 transition-all duration-300 mb-6 md:mb-8 flex items-center justify-center relative overflow-hidden haptic-btn shadow-inner">
              <div className="bg-white shadow-2xl w-28 h-40 md:w-36 md:h-52 rounded-xl p-6 md:p-8 flex flex-col gap-3 md:gap-4 group-hover:-translate-y-2 transition-transform duration-300">
                <div className="h-4 w-full bg-slate-100 rounded" />
                <div className="h-2 w-3/4 bg-slate-50 rounded" />
                <div className="h-2 w-full bg-slate-50 rounded" />
                <div className="mt-auto h-10 bg-emerald-600 rounded-xl shadow-lg shadow-emerald-600/30" />
              </div>
            </div>
            <h4 className="text-2xl font-black mb-3 tracking-tight">Anamnese-Protokoll</h4>
            <p className="text-base text-slate-500 font-medium leading-relaxed mb-6">
              Druckbare Gesprächszusammenfassung mit aktuellem Assessment-Stand für Fallnotiz, Übergabe oder Supervision.
            </p>
            <div className="mb-5 flex flex-wrap gap-2 text-[10px] font-black uppercase tracking-[0.22em] text-slate-500">
              <span className="rounded-full border border-slate-200 bg-white px-3 py-2">Printansicht</span>
              <span className="rounded-full border border-slate-200 bg-white px-3 py-2">mit aktuellem Score</span>
              <span className="rounded-full border border-slate-200 bg-white px-3 py-2">keine Speicherung</span>
            </div>
            <div className="flex items-center gap-3 text-emerald-600 font-black text-[11px] uppercase tracking-[0.2em] underline underline-offset-8 decoration-2">
              <Printer size={18} /> Printansicht öffnen
            </div>
          </button>

          <button type="button" className="group text-left" onClick={onDownloadCrisisPlan}>
            <div className="bg-slate-50 rounded-[3rem] p-8 md:p-16 border-2 border-slate-100 group-hover:border-slate-900 transition-all duration-300 mb-6 md:mb-8 flex items-center justify-center relative overflow-hidden haptic-btn shadow-inner">
              <div className="bg-white shadow-2xl w-28 h-40 md:w-36 md:h-52 rounded-xl p-6 md:p-8 flex flex-col gap-3 md:gap-4 group-hover:-translate-y-2 transition-transform duration-300">
                <div className="h-4 w-1/2 bg-slate-900 rounded" />
                <div className="h-2 w-full bg-slate-100 rounded" />
                <div className="h-14 border-2 border-dashed border-slate-200 rounded-2xl mt-6" />
              </div>
            </div>
            <h4 className="text-2xl font-black mb-3 tracking-tight">Krisenplan (Textvorlage)</h4>
            <p className="text-base text-slate-500 font-medium leading-relaxed mb-6">
              Bearbeitbare TXT-Vorlage mit Leitfragen zu Warnzeichen, Kinderbetreuung, Kontaktkette und sicheren Orten.
            </p>
            <div className="mb-5 flex flex-wrap gap-2 text-[10px] font-black uppercase tracking-[0.22em] text-slate-500">
              <span className="rounded-full border border-slate-200 bg-white px-3 py-2">TXT editierbar</span>
              <span className="rounded-full border border-slate-200 bg-white px-3 py-2">für Gespräch und Fallarbeit</span>
              <span className="rounded-full border border-slate-200 bg-white px-3 py-2">keine Speicherung</span>
            </div>
            <div className="flex items-center gap-3 text-slate-900 font-black text-[11px] uppercase tracking-[0.2em] underline underline-offset-8 decoration-2">
              <Download size={18} /> TXT-Vorlage herunterladen
            </div>
          </button>
        </div>

        <div className="print-only space-y-14 p-4 text-slate-700">
          <h1 className="text-4xl font-black uppercase tracking-widest text-slate-900 border-b-8 border-emerald-600 pb-8">
            Klinisches Elternanamnese-Protokoll
          </h1>
          <div className="grid grid-cols-2 gap-10 text-sm font-medium border-b pb-10 border-slate-100">
            <div className="space-y-8">
              <div className="border-b-2 border-slate-200 pb-2 italic">Patient/in: __________________________</div>
              <div className="border-b-2 border-slate-200 pb-2 italic">Eintrittsdatum: ______________________</div>
            </div>
            <div className="space-y-8">
              <div className="border-b-2 border-slate-200 pb-2 italic">Geburtsdatum: ______________________</div>
              <div className="border-b-2 border-slate-200 pb-2 font-black">Fall-Score (RR): {score.risk}</div>
            </div>
          </div>
          <div className="space-y-6">
            <div className="text-sm font-black uppercase tracking-[0.2em] text-slate-500">Gesprächsleitfragen</div>
            <ul className="list-disc pl-6 space-y-3 text-base">
              <li>Wer betreut die Kinder aktuell, und was ist bereits gesichert?</li>
              <li>Welche Bezugspersonen können kurzfristig entlasten?</li>
              <li>Welche Information braucht das Kind heute in altersgerechter Sprache?</li>
              <li>Welche nächsten Schritte sind heute zwingend?</li>
            </ul>
          </div>
          <div className="h-[280px] border-4 border-dashed border-slate-100 rounded-[2rem] p-10 text-slate-300 italic text-lg">
            Notizen zur Obhutssicherung, Vereinbarungen, Netzwerk und nächste Kontaktpunkte.
          </div>
          <footer className="text-[11px] text-slate-400 border-t pt-8 font-medium">
            Generiert via Relational Recovery Fachportal | Lokale Sitzung ohne serverseitige Speicherung in dieser Ansicht.
          </footer>
        </div>
      </section>
    </article>
  );
}
