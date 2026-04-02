import React from 'react';
import { AlertTriangle, Check, CheckCircle2, ChevronRight, ClipboardCheck, Download, ExternalLink, Printer, RotateCcw, ShieldCheck } from 'lucide-react';
import {
  ACUTE_CRISIS_CONTACTS,
  ACUTE_CRISIS_STEPS,
  ADDICTION_PANELS,
  ADDICTION_TIPS,
  ASSESSMENT_ITEMS,
  CHILD_PROTECTION_THRESHOLDS,
  CHILD_PROTECTION_TIPS,
  RIGHTS_FAQ,
  SAFETY_PLAN_POINTS,
  SAFETY_PLAN_TEMPLATE_FIELDS,
} from '../data/content';
import { getRiskLabel, getRiskTone } from '../utils/appHelpers';

export default function ToolboxSection({ score, onToggleAssessment, onResetAssessment, onPrint, onDownloadCrisisPlan, acuteCrisisSectionRef, safetyPlanSectionRef, childProtectionSectionRef, onJumpToPrioritySection }) {
  const assessmentLiveText = `Aktueller Assessment-Score: ${score.risk}. ${getRiskLabel(score.risk)}. Der Score dient nur als Orientierungshilfe.`;

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
        <div className="text-[10px] font-black uppercase tracking-[0.24em] text-slate-400 mb-4">Von der Einschätzung zum Handeln</div>
        <p className="text-sm md:text-base text-slate-600 leading-relaxed max-w-4xl">
          Die folgenden Arbeitsfenster übersetzen die bisherige Einschätzung in konkrete Praxis: zuerst akute Sicherheit,
          dann Krisenvorsorge und schliesslich Schutz- und Kooperationsfragen im Alltag. So bleibt die Toolbox systemisch,
          aber auch in belasteten Situationen handlungsnah.
        </p>
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


      <section className="bg-white p-8 md:p-16 rounded-[4rem] border border-slate-100 shadow-sm no-print">
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

      <section className="bg-white p-8 md:p-16 rounded-[4rem] border border-slate-100 shadow-sm no-print">
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
        <h3 className="text-3xl font-black text-slate-900 mb-14 uppercase tracking-[0.25em] italic border-b-8 border-slate-50 pb-10">
          Klinische Dokumente
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 no-print">
          <button type="button" className="group text-left" onClick={onPrint}>
            <div className="bg-slate-50 rounded-[3rem] p-16 border-2 border-slate-100 group-hover:border-emerald-500 transition-all duration-300 mb-8 flex items-center justify-center relative overflow-hidden haptic-btn shadow-inner">
              <div className="bg-white shadow-2xl w-36 h-52 rounded-xl p-8 flex flex-col gap-4 group-hover:-translate-y-2 transition-transform duration-300">
                <div className="h-4 w-full bg-slate-100 rounded" />
                <div className="h-2 w-3/4 bg-slate-50 rounded" />
                <div className="h-2 w-full bg-slate-50 rounded" />
                <div className="mt-auto h-10 bg-emerald-600 rounded-xl shadow-lg shadow-emerald-600/30" />
              </div>
            </div>
            <h4 className="text-2xl font-black mb-3 tracking-tight">Anamnese-Protokoll</h4>
            <p className="text-base text-slate-500 font-medium leading-relaxed mb-6">
              Druckansicht mit aktuellem Assessment-Stand für Gespräch, Fallnotiz oder Supervision.
            </p>
            <div className="flex items-center gap-3 text-emerald-600 font-black text-[11px] uppercase tracking-[0.2em] underline underline-offset-8 decoration-2">
              <Printer size={18} /> Druckansicht öffnen
            </div>
          </button>

          <button type="button" className="group text-left" onClick={onDownloadCrisisPlan}>
            <div className="bg-slate-50 rounded-[3rem] p-16 border-2 border-slate-100 group-hover:border-slate-900 transition-all duration-300 mb-8 flex items-center justify-center relative overflow-hidden haptic-btn shadow-inner">
              <div className="bg-white shadow-2xl w-36 h-52 rounded-xl p-8 flex flex-col gap-4 group-hover:-translate-y-2 transition-transform duration-300">
                <div className="h-4 w-1/2 bg-slate-900 rounded" />
                <div className="h-2 w-full bg-slate-100 rounded" />
                <div className="h-14 border-2 border-dashed border-slate-200 rounded-2xl mt-6" />
              </div>
            </div>
            <h4 className="text-2xl font-black mb-3 tracking-tight">Krisenplan (Textvorlage)</h4>
            <p className="text-base text-slate-500 font-medium leading-relaxed mb-6">
              Lädt eine echte Textvorlage herunter, die im Gespräch oder in der Fallarbeit weiterbearbeitet werden kann.
            </p>
            <div className="flex items-center gap-3 text-slate-900 font-black text-[11px] uppercase tracking-[0.2em] underline underline-offset-8 decoration-2">
              <Download size={18} /> Vorlage herunterladen
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
