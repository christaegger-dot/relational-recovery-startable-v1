import React from 'react';
import {
  Activity,
  AlertTriangle,
  Brain,
  ChevronDown,
  CheckCircle2,
  ClipboardCheck,
  ExternalLink,
  HeartHandshake,
  Library,
  MapPin,
  ShieldCheck,
  Users,
} from 'lucide-react';
import {
  ABOUT_THIS_WEBSITE_POINTS,
  CHILD_EXPERIENCE_PANELS,
  CHILD_EXPERIENCE_POINTS,
  CHILD_EXPERIENCE_PRACTICE_POINTS,
  CHILD_PROTECTION_PANELS,
  CLINICAL_PRACTICE_PANELS,
  CLINICAL_PRACTICE_POINTS,
  CLINICAL_PRACTICE_STEPS,
  COLLABORATION_FOUR_AS,
  COLLABORATION_PANELS,
  CROSS_DIAGNOSIS_POINTS,
  DIAGNOSIS_PROFILES,
  EVIDENCE_PROFILE_ROWS,
  FAMILY_RESILIENCE_PANELS,
  FAMILY_RESILIENCE_POINTS,
  FAMILY_SYSTEM_PANELS,
  FAMILY_SYSTEM_POINTS,
  FAMILY_SYSTEM_PRACTICE_POINTS,
  FAMILY_WISHES_PANELS,
  FAMILY_WISHES_POINTS,
  HELP_BARRIER_PANELS,
  HELP_BARRIER_POINTS,
  HELP_BARRIER_PRACTICE_POINTS,
  INTERVENTION_PROGRAM_POINTS,
  LITERATUR,
  MEDIA_BOOKS,
  MEDIA_DIGITAL,
  MEDIA_NOTES,
  MENTALIZATION_PANELS,
  MENTALIZATION_REFLECTIVE_QUESTIONS,
  PARENT_EXPERIENCE_PANELS,
  PARENT_EXPERIENCE_POINTS,
  PARENT_EVERYDAY_SUPPORT_PANELS,
  PARENT_PRACTICE_POINTS,
  PARENT_ROLE_EVIDENCE_POINTS,
  PARENT_SELF_HELP_PANELS,
  PARENT_SELF_HELP_POINTS,
  PHRASE_GUIDES,
  PRACTICE_PILLARS,
  PROTECTION_PRACTICE_POINTS,
  PSYCHOEDUCATION_AGE_GROUPS,
  PSYCHOEDUCATION_BENEFITS,
  PSYCHOEDUCATION_DIFFICULTIES,
  PSYCHOEDUCATION_PREPARATION_POINTS,
  PSYCHOEDUCATION_PRACTICE_POINTS,
  PSYCHOEDUCATION_SETTINGS,
  PUK_CONTEXT_POINTS,
  RELEVANCE_POINTS,
  RELEVANCE_STATS,
  SUPPORT_OFFERS,
  SUPPORT_OFFER_NOTES,
} from '../data/evidenceContent';

export default function EvidenceSection() {
  const chapterLinks = [
    { id: 'evidence-understand', label: '1 Verstehen', note: 'Eltern, Familie, Kinder, Schutz' },
    { id: 'evidence-psychoeducation', label: '2 Mit Kindern sprechen', note: 'Psychoedukation und Gesprächsführung' },
    { id: 'evidence-parentwork', label: '3 Mit Eltern arbeiten', note: 'Barrieren, Kooperation, Hilfen' },
    { id: 'evidence-interventions', label: '4 Handeln und vernetzen', note: 'Interventionen, Netzwerk, Angebote' },
    { id: 'evidence-materials', label: '5 Materialien', note: 'Bücher, Medien, Referenzen' },
  ];
  const familyDynamicsNodes = [
    { label: 'elterliche Symptome', top: '14%', left: '50%', tone: 'bg-slate-900 text-white border-slate-300' },
    { label: 'Alltag unter Druck', top: '38%', left: '82%', tone: 'bg-white text-slate-900 border-slate-200' },
    { label: 'kindliche Anpassung', top: '72%', left: '68%', tone: 'bg-emerald-50 text-emerald-950 border-emerald-200' },
    { label: 'mehr familiärer Stress', top: '76%', left: '30%', tone: 'bg-amber-50 text-amber-950 border-amber-200' },
    { label: 'weniger offene Kommunikation', top: '38%', left: '18%', tone: 'bg-sky-50 text-sky-950 border-sky-200' },
  ];
  const psychoeducationPath = [
    {
      label: 'Vorbereiten',
      desc: 'Mit Eltern Sorgen, Tabus, bisherigen Wissensstand und Ziel des Gesprächs klären.',
    },
    {
      label: 'Erklären',
      desc: 'Einfach, ehrlich und altersgerecht benennen, was los ist und was das Kind konkret betrifft.',
    },
    {
      label: 'Nachfragen',
      desc: 'Auf Fragen, Gefühle, Missverständnisse und nonverbale Reaktionen des Kindes eingehen.',
    },
    {
      label: 'Weiterführen',
      desc: 'Psychoedukation als fortlaufendes Gespräch verstehen und bei Verlauf oder Alter anpassen.',
    },
  ];
  const protectionSystemNodes = [
    {
      label: 'verlässliche Bezugsperson',
      note: 'mindestens eine emotional tragende erwachsene Person',
      top: '16%',
      left: '50%',
      tone: 'border-emerald-200 bg-emerald-50 text-emerald-950',
    },
    {
      label: 'Routinen und Alltag',
      note: 'wiederkehrende Abläufe, Übergaben, Schule, Schlaf',
      top: '36%',
      left: '82%',
      tone: 'border-sky-200 bg-sky-50 text-sky-950',
    },
    {
      label: 'offene Sprache',
      note: 'kindgerechte Erklärung statt Tabuisierung',
      top: '73%',
      left: '71%',
      tone: 'border-slate-200 bg-white text-slate-900',
    },
    {
      label: 'Hilfe von aussen',
      note: 'Beratung, Netzwerk, Entlastung, Fachstellen',
      top: '74%',
      left: '29%',
      tone: 'border-amber-200 bg-amber-50 text-amber-950',
    },
    {
      label: 'Kinder-Schutzteil',
      note: 'klare Zuständigkeiten in belasteten Phasen',
      top: '36%',
      left: '18%',
      tone: 'border-emerald-200 bg-white text-emerald-950',
    },
  ];

  const EvidenceDisclosure = ({ eyebrow = 'Vertiefung', title, note, children }) => (
    <details className="group rounded-[3rem] border border-slate-200 bg-slate-50 p-6 shadow-sm md:p-8">
      <summary className="flex cursor-pointer list-none items-start justify-between gap-6">
        <div>
          <div className="text-[10px] font-black uppercase tracking-[0.24em] text-slate-400">{eyebrow}</div>
          <h4 className="mt-3 text-2xl font-black tracking-tight text-slate-900">{title}</h4>
          {note ? <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-600">{note}</p> : null}
        </div>
        <span className="mt-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 transition-transform group-open:rotate-180">
          <ChevronDown size={18} />
        </span>
      </summary>
      <div className="mt-8">{children}</div>
    </details>
  );

  return (
    <article className="space-y-16 no-print">
      <div className="bg-white p-8 md:p-16 rounded-[4rem] shadow-sm border border-slate-100">
        <section className="mb-16 md:mb-20">
          <div className="text-emerald-600 font-black text-[11px] uppercase tracking-[0.5em] mb-8 flex items-center gap-4">
            <div className="w-14 h-[2px] bg-emerald-200" /> Warum das Thema relevant ist
          </div>
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-10 items-start">
            <div className="xl:col-span-7">
              <h2 id="page-heading-zaesur" tabIndex={-1} className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter leading-[0.95] mb-8">
                Elternschaft, psychische Erkrankung und <span className="text-emerald-600 italic">Versorgungsrealität</span>.
              </h2>
              <div className="space-y-6 text-base md:text-lg text-slate-600 leading-relaxed">
                <p>
                  Psychische Erkrankungen betreffen selten nur eine einzelne Person. Sie wirken in Beziehungen hinein,
                  verändern den Familienalltag und können die Entwicklung von Kindern mitprägen. Deshalb braucht gute
                  Versorgung einen systemischen Blick: Patientin oder Patient und gleichzeitig Mutter, Vater oder
                  Bezugsperson.
                </p>
                <p>
                  Im Schweizer Kontext ist das Thema hoch relevant. Ein erheblicher Anteil der Bevölkerung lebt mit einer
                  behandlungsbedürftigen psychischen Störung, und sehr viele Betroffene haben Kinder. Kinder psychisch
                  erkrankter Eltern sind damit keine Randgruppe, sondern eine grosse und im Versorgungssystem häufig
                  übersehene Zielgruppe.
                </p>
                <p>
                  Besonders sichtbar wird dies in der Erwachsenenpsychiatrie: Je nach Setting haben 17 bis 45 Prozent der
                  stationär behandelten Patientinnen und Patienten minderjährige Kinder. Elternschaft gehört deshalb früh in
                  Anamnese, Behandlungsplanung und Austrittsvorbereitung.
                </p>
              </div>
            </div>

            <aside className="xl:col-span-5 bg-slate-900 text-white rounded-[3rem] p-8 md:p-10 shadow-xl border-l-[10px] border-emerald-600">
              <h3 className="text-emerald-400 font-black mb-5 uppercase text-[10px] tracking-[0.35em] flex items-center gap-3">
                <Activity size={18} /> Kernaussagen
              </h3>
              <div className="space-y-4">
                {RELEVANCE_POINTS.map((point) => (
                  <div key={point} className="flex items-start gap-3">
                    <ShieldCheck size={18} className="mt-1 shrink-0 text-emerald-400" />
                    <p className="text-sm md:text-[15px] leading-relaxed text-white/90">{point}</p>
                  </div>
                ))}
              </div>
            </aside>
          </div>
        </section>

        <section className="mb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {RELEVANCE_STATS.map((stat) => (
              <div key={stat.label} className="rounded-[2.5rem] border border-slate-100 bg-slate-50 p-8 shadow-sm">
                <div className="text-[10px] font-black uppercase tracking-[0.24em] text-slate-400 mb-4">{stat.label}</div>
                <div className="text-4xl md:text-5xl font-black tracking-tighter text-slate-900 mb-4 tabular-nums">{stat.value}</div>
                <p className="text-sm text-slate-600 leading-relaxed font-medium">{stat.note}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 rounded-[2rem] border border-emerald-100 bg-emerald-50/70 px-6 py-5">
            <p className="text-sm text-emerald-900 leading-relaxed font-medium">
              Evidenzhinweis: Diese Kennzahlen beruhen auf ausgewählten Fach- und Informationsquellen aus der Schweiz,
              insbesondere auf der in den Referenzen aufgeführten Übersicht von pädiatrie schweiz (2021), und dienen
              hier als orientierende Einordnung für die Website.
            </p>
          </div>
        </section>

        <section className="mb-20 grid grid-cols-1 lg:grid-cols-12 gap-16">
          <section className="lg:col-span-7 space-y-12">
            <div>
              <div className="text-emerald-600 font-black text-[11px] uppercase tracking-[0.5em] mb-8 flex items-center gap-4">
                <div className="w-14 h-[2px] bg-emerald-200" /> Stationärer Kontext
              </div>
              <h3 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter leading-[0.95]">
                Stationäre <br />
                <span className="text-emerald-600 italic">Zäsur</span> als Gesprächsanlass.
              </h3>
            </div>

            <div className="p-8 bg-slate-900 text-white rounded-[3rem] shadow-xl relative border-l-[10px] border-emerald-600">
              <h4 className="text-emerald-400 font-black mb-5 uppercase text-[10px] tracking-[0.35em] flex items-center gap-3">
                <Activity size={18} /> Einordnung
              </h4>
              <p className="text-xl leading-relaxed opacity-95 font-light">
                Stationäre Krisen unterbrechen familiäre Routinen. Gute Begleitung verbindet Schutz, Entlastung,
                Elternrolle und eine respektvolle Sprache über Versorgung, Beziehung und kindliche Sicherheit.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {PRACTICE_PILLARS.map((pillar) => (
                <div key={pillar.title} className="bg-slate-50 p-8 rounded-[2.5rem] border border-slate-100 shadow-inner">
                  <h5 className="font-black text-slate-900 mb-4 uppercase text-[10px] tracking-widest">{pillar.title}</h5>
                  <p className="text-sm text-slate-600 leading-loose">{pillar.text}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="lg:col-span-5 flex flex-col justify-center space-y-6">
            <div className="w-full bg-slate-50 rounded-[3rem] border border-slate-100 shadow-inner p-6 md:p-8">
              <div className="text-[11px] text-slate-400 font-black uppercase tracking-[0.35em] mb-4 italic">Beispielprofil für Fallbesprechung</div>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-left">
                  <thead>
                    <tr className="border-b border-slate-200">
                      <th className="py-3 pr-4 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Bereich</th>
                      <th className="py-3 pr-4 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Wert</th>
                      <th className="py-3 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Einordnung</th>
                    </tr>
                  </thead>
                  <tbody>
                    {EVIDENCE_PROFILE_ROWS.map((row) => (
                      <tr key={row.dimension} className="border-b border-slate-100 last:border-b-0 align-top">
                        <td className="py-4 pr-4">
                          <div className="font-black text-slate-900">{row.dimension}</div>
                        </td>
                        <td className="py-4 pr-4">
                          <span className="inline-flex min-w-[3.25rem] justify-center rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1 text-sm font-black text-emerald-900 tabular-nums">
                            {row.value}
                          </span>
                        </td>
                        <td className="py-4">
                          <div className="text-sm font-medium text-slate-700">{row.meaning}</div>
                          <div className="mt-1 text-sm leading-relaxed text-slate-500">{row.note}</div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="text-center bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl w-full">
              <p className="text-sm text-slate-500 font-medium leading-relaxed px-4">
                Die frühere Radar-Grafik wurde hier bewusst durch eine lesbarere Tabelle ersetzt. So bleibt die Einordnung auch ohne Diagramm verständlich und screenreader-freundlicher.
              </p>
            </div>
          </section>
        </section>

        <section className="mb-20 rounded-[3rem] border border-slate-100 bg-slate-50 p-8 md:p-10 shadow-sm">
          <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_22rem] xl:items-start">
            <div>
              <div className="text-[10px] font-black uppercase tracking-[0.24em] text-slate-400 mb-4">Kapitelübersicht</div>
              <h3 className="text-3xl md:text-4xl font-black tracking-tight text-slate-900 mb-4">
                Der Evidenzteil folgt einer <span className="text-emerald-600 italic">klareren Fachlogik</span>.
              </h3>
              <p className="max-w-4xl text-base leading-relaxed text-slate-600">
                Die Inhalte bleiben fachlich gleich, sind aber klarer gegliedert: verstehen, mit Kindern sprechen,
                mit Eltern arbeiten, dann Interventionen und Netzwerk nutzen.
              </p>
            </div>
            <aside className="rounded-[2rem] border border-slate-200 bg-white p-6">
              <div className="text-[10px] font-black uppercase tracking-[0.24em] text-slate-500 mb-3">Leselogik</div>
              <p className="text-sm leading-relaxed text-slate-700">
                So lässt sich der Bereich kapitelweise statt blockweise lesen.
              </p>
            </aside>
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-4">
            {chapterLinks.map((chapter) => (
              <a
                key={chapter.id}
                href={`#${chapter.id}`}
                className="rounded-[1.75rem] border border-slate-200 bg-white p-5 transition-colors hover:border-emerald-200 hover:bg-emerald-50/40"
              >
                <div className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-700">{chapter.label}</div>
                <p className="mt-3 text-sm leading-relaxed font-medium text-slate-700">{chapter.note}</p>
              </a>
            ))}
          </div>
        </section>


        <section id="evidence-understand" className="mb-20 border-t-2 border-slate-50 pt-16">
          <div className="text-emerald-600 font-black text-[11px] uppercase tracking-[0.5em] mb-8 flex items-center gap-4">
            <div className="w-14 h-[2px] bg-emerald-200" /> 1 Verstehen
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-12 gap-10 items-start mb-12">
            <div className="xl:col-span-7">
              <h3 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter leading-[0.95] mb-6">
                Zwischen Verantwortung, <span className="text-emerald-600 italic">Erschöpfung</span> und Bindung.
              </h3>
              <div className="space-y-5 text-base md:text-lg text-slate-600 leading-relaxed">
                <p>
                  Elternschaft ist bei psychischer Belastung oft beides zugleich: Sinnquelle und zusätzliche
                  Belastung. Viele Eltern erleben ihre Kinder als Halt und Motivation, während Symptome genau jene
                  Aufgaben erschweren, die im Alltag täglich anstehen.
                </p>
                <p>
                  Besonders belastend ist oft die Diskrepanz zwischen Anspruch und aktuellem Erleben. Gute Begleitung
                  beginnt deshalb mit Entlastung und Anerkennung dieser Ambivalenz, nicht mit vorschneller Bewertung.
                </p>
              </div>
            </div>

            <aside className="xl:col-span-5 bg-slate-900 text-white rounded-[3rem] p-8 md:p-10 shadow-xl border-l-[10px] border-emerald-600">
              <h4 className="text-emerald-400 font-black mb-5 uppercase text-[10px] tracking-[0.35em] flex items-center gap-3">
                <HeartHandshake size={18} /> Klinische Grundhaltung
              </h4>
              <div className="space-y-4">
                {PARENT_EXPERIENCE_POINTS.map((point) => (
                  <div key={point} className="flex items-start gap-3">
                    <CheckCircle2 size={18} className="mt-1 shrink-0 text-emerald-400" />
                    <p className="text-sm md:text-[15px] leading-relaxed text-white/90">{point}</p>
                  </div>
                ))}
              </div>
            </aside>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {PARENT_EXPERIENCE_PANELS.map((panel) => (
              <section key={panel.title} className="rounded-[2.5rem] border border-slate-100 bg-slate-50 p-8 shadow-sm">
                <h4 className="text-2xl font-black tracking-tight text-slate-900 mb-4">{panel.title}</h4>
                <p className="text-slate-600 leading-relaxed">{panel.text}</p>
              </section>
            ))}
          </div>

          <div className="mb-12">
            <EvidenceDisclosure
              title="Mentalisieren und familienorientierte Interventionen"
              note="Dieser Block vertieft den Wirkmechanismus familienorientierter Arbeit und konkrete reflexive Fragen."
            >
            <div className="rounded-[3rem] border border-emerald-100 bg-emerald-50/70 p-8 md:p-10 shadow-sm">
            <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_20rem] xl:items-start">
              <div>
                <div className="text-[10px] font-black uppercase tracking-[0.24em] text-emerald-900 mb-4">Evidenz zur Elternrolle</div>
                <p className="max-w-4xl text-base leading-relaxed text-emerald-950">
                  Die Forschung beschreibt Eltern mit psychischer Erkrankung nicht nur als belastet, sondern oft auch als
                  stark an ihrer Elternrolle orientiert. Elternschaft kann Sinn, Zugehörigkeit und Motivation geben.
                  Gleichzeitig sind Scham, Angst vor Bewertung und Befürchtungen rund um Hilfesysteme häufige Gründe,
                  weshalb Sorgen spät angesprochen werden.
                </p>
              </div>
              <aside className="rounded-[2rem] border border-emerald-200 bg-white/80 p-6">
                <div className="text-[10px] font-black uppercase tracking-[0.24em] text-emerald-800 mb-3">Quellenbasis</div>
                <p className="text-sm leading-relaxed text-emerald-950">
                  Jones et al. (2016), Reupert et al. (2021) und pädiatrie schweiz (2021).
                </p>
              </aside>
            </div>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
              {PARENT_ROLE_EVIDENCE_POINTS.map((point) => (
                <div key={point} className="rounded-[1.75rem] border border-emerald-100 bg-white/90 p-5">
                  <p className="text-sm leading-relaxed font-medium text-slate-800">{point}</p>
                </div>
              ))}
            </div>
            </div>
            </EvidenceDisclosure>
          </div>

          <div className="rounded-[3rem] border border-slate-100 bg-white p-8 md:p-10 shadow-sm">
            <div className="text-[10px] font-black uppercase tracking-[0.24em] text-slate-400 mb-6">Für die Praxis</div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {PARENT_PRACTICE_POINTS.map((point) => (
                <div key={point} className="flex items-start gap-3 rounded-[1.5rem] bg-slate-50 border border-slate-100 p-5">
                  <ShieldCheck size={18} className="mt-1 shrink-0 text-emerald-600" />
                  <p className="text-sm text-slate-700 leading-relaxed font-medium">{point}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8">
            <EvidenceDisclosure
              title="Zusammenarbeit mit Eltern"
              note="Diese Vertiefung beschreibt, wie Kooperation, Transparenz und Mitsprache konkret aufgebaut werden können."
            >
            <div className="rounded-[3rem] border border-slate-100 bg-slate-50 p-8 md:p-10 shadow-sm">
            <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_20rem] xl:items-start">
              <div>
                <div className="text-[10px] font-black uppercase tracking-[0.24em] text-slate-400 mb-4">Zusammenarbeit mit Eltern</div>
                <h4 className="text-3xl font-black tracking-tight text-slate-900 mb-4">
                  Kooperation gelingt eher über <span className="text-emerald-600 italic">Transparenz und Mitbestimmung</span>.
                </h4>
                <p className="max-w-4xl text-base leading-relaxed text-slate-600">
                  Hilfreich ist eine Haltung, die Eltern früh in Zieldefinition, Auftragsklärung und nächste Schritte
                  einbezieht. Das reduziert Ohnmacht und stärkt Selbstwirksamkeit gerade dort, wo Scham oder Misstrauen stark sind.
                </p>
              </div>
              <aside className="rounded-[2rem] border border-emerald-100 bg-emerald-50/70 p-6">
                <div className="text-[10px] font-black uppercase tracking-[0.24em] text-emerald-900 mb-3">Quellenbasis</div>
                <p className="text-sm leading-relaxed text-emerald-950">
                  Stauber, Nyffeler & Gosteli sowie die dort referierten Empowerment- und Beratungsansätze.
                </p>
              </aside>
            </div>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              {COLLABORATION_PANELS.map((panel) => (
                <section key={panel.title} className="rounded-[2.25rem] border border-slate-100 bg-white p-6 shadow-sm">
                  <h5 className="text-xl font-black tracking-tight text-slate-900 mb-3">{panel.title}</h5>
                  <p className="text-slate-700 leading-relaxed">{panel.text}</p>
                </section>
              ))}
            </div>

            <div className="mt-8 rounded-[2.5rem] border border-emerald-100 bg-white p-6 md:p-8">
              <div className="text-[10px] font-black uppercase tracking-[0.24em] text-emerald-800 mb-5">Die Vier A&apos;s der Auftragsklärung</div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {COLLABORATION_FOUR_AS.map((point) => (
                  <div key={point} className="flex items-start gap-3 rounded-[1.5rem] border border-emerald-100 bg-emerald-50/60 p-5">
                    <ShieldCheck size={18} className="mt-1 shrink-0 text-emerald-700" />
                    <p className="text-sm leading-relaxed font-medium text-slate-800">{point}</p>
                  </div>
                ))}
              </div>
            </div>
            </div>
            </EvidenceDisclosure>
          </div>

          <div className="mt-8">
            <EvidenceDisclosure
              title="Anliegen und Wünsche von Eltern und Kindern"
              note="Die Verdichtung hilft, Hilfen stärker an realen Anliegen statt an allgemeinen Annahmen auszurichten."
            >
            <div className="rounded-[3rem] border border-slate-100 bg-white p-8 md:p-10 shadow-sm">
            <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_20rem] xl:items-start">
              <div>
                <div className="text-[10px] font-black uppercase tracking-[0.24em] text-slate-400 mb-4">Anliegen und Wünsche</div>
                <h4 className="text-3xl font-black tracking-tight text-slate-900 mb-4">
                  Was Eltern und Kinder häufig <span className="text-emerald-600 italic">konkret wünschen</span>.
                </h4>
                <p className="max-w-4xl text-base leading-relaxed text-slate-600">
                  Der Hilfebedarf ist oft erstaunlich praktisch: Unterstützung beim Erklären der Erkrankung, bei
                  Entlastung, Erziehungsfragen, Organisation und beim Sprechen über Sorgen. Kinder wünschen vor allem
                  Verstehen, Gesprächsmöglichkeiten und mehr Normalität.
                </p>
              </div>
              <aside className="rounded-[2rem] border border-slate-200 bg-slate-50 p-6">
                <div className="text-[10px] font-black uppercase tracking-[0.24em] text-slate-500 mb-3">Praxisnutzen</div>
                <p className="text-sm leading-relaxed text-slate-700">
                  Solche Wunschprofile helfen, Unterstützungsangebote stärker an realen Anliegen auszurichten statt nur an fachlichen Standardannahmen.
                </p>
              </aside>
            </div>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              {FAMILY_WISHES_PANELS.map((panel) => (
                <section key={panel.title} className="rounded-[2.25rem] border border-slate-100 bg-slate-50 p-6 shadow-sm">
                  <h5 className="text-xl font-black tracking-tight text-slate-900 mb-3">{panel.title}</h5>
                  <p className="text-slate-700 leading-relaxed">{panel.text}</p>
                </section>
              ))}
            </div>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
              {FAMILY_WISHES_POINTS.map((point) => (
                <div key={point} className="flex items-start gap-3 rounded-[1.5rem] border border-slate-100 bg-white p-5">
                  <CheckCircle2 size={18} className="mt-1 shrink-0 text-emerald-600" />
                  <p className="text-sm leading-relaxed font-medium text-slate-800">{point}</p>
                </div>
              ))}
            </div>
            </div>
            </EvidenceDisclosure>
          </div>

          <div className="mt-8">
            <EvidenceDisclosure
              eyebrow="Praxisvertiefung"
              title="Direkte Orientierung für Eltern"
              note="Der Abschnitt bleibt bewusst alltagsnah und direkt, ist aber nur bei Bedarf geöffnet."
            >
            <div className="rounded-[3rem] border border-emerald-100 bg-emerald-50/70 p-8 md:p-10 shadow-sm">
            <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_22rem] xl:items-start">
              <div>
                <div className="text-[10px] font-black uppercase tracking-[0.24em] text-emerald-900 mb-4">Direkte Orientierung für Eltern</div>
                <h4 className="text-3xl font-black tracking-tight text-slate-900 mb-4">
                  Was Eltern trotz Erkrankung <span className="text-emerald-700 italic">konkret tun können</span>.
                </h4>
                <p className="max-w-3xl text-base text-slate-700 leading-relaxed">
                  Der Block ist bewusst direkt formuliert. Er ersetzt keine Beratung, kann Eltern aber helfen,
                  ihre Rolle in belasteten Phasen realistischer und handlungsnäher zu sehen.
                </p>
              </div>
              <aside className="rounded-[2rem] border border-emerald-200 bg-white/80 p-6">
                <div className="text-[10px] font-black uppercase tracking-[0.24em] text-emerald-800 mb-3">Leitidee</div>
                <p className="text-sm leading-relaxed text-emerald-950">
                  Nicht Perfektion ist entscheidend, sondern möglichst viel Verlässlichkeit, frühe Entlastung und eine
                  klare Sicherung des Alltags, wenn Symptome stärker werden.
                </p>
              </aside>
            </div>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              {PARENT_SELF_HELP_PANELS.map((panel) => (
                <section key={panel.title} className="rounded-[2.25rem] border border-emerald-100 bg-white p-6 shadow-sm">
                  <h5 className="text-xl font-black tracking-tight text-slate-900 mb-3">{panel.title}</h5>
                  <p className="text-slate-700 leading-relaxed">{panel.text}</p>
                </section>
              ))}
            </div>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
              {PARENT_SELF_HELP_POINTS.map((point) => (
                <div key={point} className="flex items-start gap-3 rounded-[1.5rem] border border-emerald-100 bg-white/90 p-5">
                  <ShieldCheck size={18} className="mt-1 shrink-0 text-emerald-700" />
                  <p className="text-sm leading-relaxed font-medium text-slate-800">{point}</p>
                </div>
              ))}
            </div>

            <div className="mt-8">
              <div className="text-[10px] font-black uppercase tracking-[0.24em] text-emerald-900 mb-4">Weitere alltagsnahe Themen</div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {PARENT_EVERYDAY_SUPPORT_PANELS.map((panel) => (
                  <section key={panel.title} className="rounded-[2.25rem] border border-emerald-100 bg-white p-6 shadow-sm">
                    <h5 className="text-xl font-black tracking-tight text-slate-900 mb-3">{panel.title}</h5>
                    <p className="text-slate-700 leading-relaxed">{panel.text}</p>
                  </section>
                ))}
              </div>
            </div>
            </div>
            </EvidenceDisclosure>
          </div>
        </section>


        <section className="mb-20 border-t-2 border-slate-50 pt-16">
          <div className="text-emerald-600 font-black text-[11px] uppercase tracking-[0.5em] mb-8 flex items-center gap-4">
            <div className="w-14 h-[2px] bg-emerald-200" /> 1 Verstehen
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-12 gap-10 items-start mb-12">
            <div className="xl:col-span-7">
              <h3 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter leading-[0.95] mb-6">
                Wenn ein Elternteil erkrankt, reagiert oft das <span className="text-emerald-600 italic">ganze Familiensystem</span>.
              </h3>
              <div className="space-y-5 text-base md:text-lg text-slate-600 leading-relaxed">
                <p>
                  Psychische Erkrankungen wirken meist nicht nur auf Symptome, sondern auf den Alltag der ganzen
                  Familie. Routinen werden instabiler, Zuständigkeiten verschieben sich und vieles richtet sich stärker
                  nach dem Befinden des erkrankten Elternteils.
                </p>
                <p>
                  Belastend sind dabei nicht nur Krisen, sondern auch langsame Veränderungen von Stimmung,
                  Kommunikation und Verlässlichkeit. Deshalb braucht es einen Blick auf Rollen, Beziehungen,
                  Rückzug und Entlastung im ganzen System.
                </p>
              </div>
            </div>

            <aside className="xl:col-span-5 bg-slate-900 text-white rounded-[3rem] p-8 md:p-10 shadow-xl border-l-[10px] border-emerald-600">
              <h4 className="text-emerald-400 font-black mb-5 uppercase text-[10px] tracking-[0.35em] flex items-center gap-3">
                <Users size={18} /> Systemische Perspektive
              </h4>
              <div className="space-y-4">
                {FAMILY_SYSTEM_POINTS.map((point) => (
                  <div key={point} className="flex items-start gap-3">
                    <CheckCircle2 size={18} className="mt-1 shrink-0 text-emerald-400" />
                    <p className="text-sm md:text-[15px] leading-relaxed text-white/90">{point}</p>
                  </div>
                ))}
              </div>
            </aside>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {FAMILY_SYSTEM_PANELS.map((panel) => (
              <section key={panel.title} className="rounded-[2.5rem] border border-slate-100 bg-slate-50 p-8 shadow-sm">
                <h4 className="text-2xl font-black tracking-tight text-slate-900 mb-4">{panel.title}</h4>
                <p className="text-slate-600 leading-relaxed">{panel.text}</p>
              </section>
            ))}
          </div>

          <div className="rounded-[3rem] border border-slate-100 bg-white p-8 md:p-10 shadow-sm">
            <div className="text-[10px] font-black uppercase tracking-[0.24em] text-slate-400 mb-6">Für die Praxis</div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {FAMILY_SYSTEM_PRACTICE_POINTS.map((point) => (
                <div key={point} className="flex items-start gap-3 rounded-[1.5rem] bg-slate-50 border border-slate-100 p-5">
                  <ShieldCheck size={18} className="mt-1 shrink-0 text-emerald-600" />
                  <p className="text-sm text-slate-700 leading-relaxed font-medium">{point}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 rounded-[3rem] border border-slate-100 bg-slate-50 p-8 md:p-10 shadow-sm">
            <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_20rem] xl:items-start">
              <div>
                <div className="text-[10px] font-black uppercase tracking-[0.24em] text-slate-400 mb-4">Fachdiagramm</div>
                <h4 className="text-3xl font-black tracking-tight text-slate-900 mb-4">
                  Belastung wirkt oft als <span className="text-emerald-600 italic">familiärer Kreislauf</span>.
                </h4>
                <p className="max-w-4xl text-base leading-relaxed text-slate-600">
                  Nicht nur die Erkrankung selbst belastet Kinder und Familie, sondern die wechselseitige Verstärkung
                  zwischen Symptomen, Alltag, Stress und Kommunikation. Genau deshalb greifen gute Hilfen an mehreren
                  Stellen gleichzeitig an.
                </p>
              </div>
              <aside className="rounded-[2rem] border border-slate-200 bg-white p-6">
                <div className="text-[10px] font-black uppercase tracking-[0.24em] text-slate-500 mb-3">Lesart</div>
                <p className="text-sm leading-relaxed text-slate-700">
                  Das Diagramm zeigt keine lineare Ursache, sondern einen zirkulären Prozess mit mehreren Verstärkungen.
                </p>
              </aside>
            </div>

            <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_18rem] lg:items-start">
              <div className="relative min-h-[28rem] overflow-hidden rounded-[2.5rem] border border-slate-200 bg-white">
                <div className="absolute left-1/2 top-1/2 h-[20rem] w-[20rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-emerald-200" />
                <div className="absolute left-1/2 top-1/2 h-[13rem] w-[13rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-slate-200" />

                {familyDynamicsNodes.map((node) => (
                  <div
                    key={node.label}
                    className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-[1.5rem] border px-4 py-3 text-center shadow-sm ${node.tone}`}
                    style={{ top: node.top, left: node.left }}
                  >
                    <div className="text-[11px] font-black uppercase tracking-[0.08em]">{node.label}</div>
                  </div>
                ))}

                <div className="absolute left-[50%] top-[24%] h-[16%] w-[2px] -translate-x-1/2 bg-emerald-300" />
                <div className="absolute left-[62%] top-[30%] h-[2px] w-[16%] bg-emerald-300" />
                <div className="absolute left-[73%] top-[49%] h-[16%] w-[2px] bg-emerald-300" />
                <div className="absolute left-[32%] top-[74%] h-[2px] w-[28%] bg-emerald-300" />
                <div className="absolute left-[18%] top-[46%] h-[16%] w-[2px] bg-emerald-300" />
                <div className="absolute left-[21%] top-[30%] h-[2px] w-[16%] bg-emerald-300" />
              </div>

              <aside className="rounded-[2rem] border border-slate-200 bg-white p-6">
                <div className="text-[10px] font-black uppercase tracking-[0.24em] text-slate-500 mb-4">Wo Interventionen ansetzen</div>
                <div className="space-y-3">
                  <p className="text-sm leading-relaxed text-slate-700">
                    <span className="font-black text-slate-900">bei Symptomen:</span> Behandlung und Krisenintervention
                  </p>
                  <p className="text-sm leading-relaxed text-slate-700">
                    <span className="font-black text-slate-900">im Alltag:</span> Entlastung, Routinen, Betreuung
                  </p>
                  <p className="text-sm leading-relaxed text-slate-700">
                    <span className="font-black text-slate-900">bei Kindern:</span> Schutz, Sprache, Beziehung
                  </p>
                  <p className="text-sm leading-relaxed text-slate-700">
                    <span className="font-black text-slate-900">im System:</span> Netzwerk, Absprachen, Koordination
                  </p>
                </div>
              </aside>
            </div>
          </div>
        </section>

        <section className="mb-20 border-t-2 border-slate-50 pt-16">
          <div className="text-emerald-600 font-black text-[11px] uppercase tracking-[0.5em] mb-8 flex items-center gap-4">
            <div className="w-14 h-[2px] bg-emerald-200" /> 1 Verstehen
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-12 gap-10 items-start mb-12">
            <div className="xl:col-span-7">
              <h3 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter leading-[0.95] mb-6">
                Zwischen Anpassung, <span className="text-emerald-600 italic">Sorge</span> und stiller Überforderung.
              </h3>
              <div className="space-y-5 text-base md:text-lg text-slate-600 leading-relaxed">
                <p>
                  Kinder psychisch erkrankter Eltern sind keine einheitliche Gruppe. Manche zeigen früh Belastungszeichen,
                  andere wirken lange unauffällig, übernehmen viel Verantwortung oder passen sich stark an.
                </p>
                <p>
                  Fachlich wichtig ist deshalb, nicht nur nach offenem Problemverhalten zu fragen, sondern auch nach
                  stiller Überforderung, Parentifizierung, Loyalitätskonflikten und fehlender Sprache für das, was zuhause geschieht.
                </p>
              </div>
            </div>

            <aside className="xl:col-span-5 bg-slate-900 text-white rounded-[3rem] p-8 md:p-10 shadow-xl border-l-[10px] border-emerald-600">
              <h4 className="text-emerald-400 font-black mb-5 uppercase text-[10px] tracking-[0.35em] flex items-center gap-3">
                <AlertTriangle size={18} /> Kindliche Perspektive
              </h4>
              <div className="space-y-4">
                {CHILD_EXPERIENCE_POINTS.map((point) => (
                  <div key={point} className="flex items-start gap-3">
                    <CheckCircle2 size={18} className="mt-1 shrink-0 text-emerald-400" />
                    <p className="text-sm md:text-[15px] leading-relaxed text-white/90">{point}</p>
                  </div>
                ))}
              </div>
            </aside>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {CHILD_EXPERIENCE_PANELS.map((panel) => (
              <section key={panel.title} className="rounded-[2.5rem] border border-slate-100 bg-slate-50 p-8 shadow-sm">
                <h4 className="text-2xl font-black tracking-tight text-slate-900 mb-4">{panel.title}</h4>
                <p className="text-slate-600 leading-relaxed">{panel.text}</p>
              </section>
            ))}
          </div>

          <div className="rounded-[3rem] border border-slate-100 bg-white p-8 md:p-10 shadow-sm">
            <div className="text-[10px] font-black uppercase tracking-[0.24em] text-slate-400 mb-6">Für die Praxis</div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {CHILD_EXPERIENCE_PRACTICE_POINTS.map((point) => (
                <div key={point} className="flex items-start gap-3 rounded-[1.5rem] bg-slate-50 border border-slate-100 p-5">
                  <ShieldCheck size={18} className="mt-1 shrink-0 text-emerald-600" />
                  <p className="text-sm text-slate-700 leading-relaxed font-medium">{point}</p>
                </div>
              ))}
            </div>
          </div>
        </section>


        <section className="mb-20 border-t-2 border-slate-50 pt-16">
          <div className="text-emerald-600 font-black text-[11px] uppercase tracking-[0.5em] mb-8 flex items-center gap-4">
            <div className="w-14 h-[2px] bg-emerald-200" /> 1 Verstehen
          </div>

          <div className="mb-12">
            <h3 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter leading-[0.95] mb-5">
              Was Familien und Kindern <span className="text-emerald-600 italic">Stabilität</span> geben kann.
            </h3>
            <p className="text-base md:text-lg text-slate-600 leading-relaxed max-w-4xl">
              Schutz entsteht selten durch einen einzelnen Faktor. Entscheidend sind meist tragfähige Beziehungen,
              verlässliche Abläufe, ansprechbare Kommunikation und zugängliche Hilfe von aussen.
            </p>
          </div>

          <div className="rounded-[3rem] border border-emerald-100 bg-emerald-50/70 p-8 md:p-10 shadow-sm mb-12">
            <div className="text-[10px] font-black uppercase tracking-[0.24em] text-emerald-800 mb-5">Familiäre Resilienz</div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {FAMILY_RESILIENCE_POINTS.map((point) => (
                <div key={point} className="rounded-[1.75rem] border border-emerald-100 bg-white/80 p-5">
                  <p className="text-sm text-emerald-950 leading-relaxed font-medium">{point}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-12 rounded-[3rem] border border-slate-200 bg-white p-8 md:p-10 shadow-sm">
            <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_20rem] xl:items-start">
              <div>
                <div className="text-[10px] font-black uppercase tracking-[0.24em] text-slate-400 mb-4">Schutzfaktoren- und Versorgungsgrafik</div>
                <h4 className="text-3xl font-black tracking-tight text-slate-900 mb-4">
                  Stabilität entsteht meist durch <span className="text-emerald-600 italic">mehrere kleine tragende Elemente</span>.
                </h4>
                <p className="max-w-4xl text-base leading-relaxed text-slate-600">
                  Nicht ein einzelner Faktor trägt die Familie. Schutz wird eher dann spürbar, wenn Beziehungen,
                  Alltag, Sprache, externe Hilfe und klare Zuständigkeiten zusammenwirken.
                </p>
              </div>
              <aside className="rounded-[2rem] border border-slate-200 bg-slate-50 p-6">
                <div className="text-[10px] font-black uppercase tracking-[0.24em] text-slate-500">Lesart</div>
                <p className="mt-3 text-sm leading-relaxed text-slate-700">
                  Die Mitte steht für die Versorgung des Kindes im Alltag. Je mehr Elemente aktiviert sind, desto tragfähiger
                  wird die familiäre Schutzebene in belasteten Phasen.
                </p>
              </aside>
            </div>

            <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_18rem] lg:items-start">
              <div>
                <div className="relative hidden min-h-[31rem] overflow-hidden rounded-[2.5rem] border border-slate-200 bg-[#F6F7F3] lg:block">
                  <div className="absolute left-1/2 top-1/2 h-[10rem] w-[10rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-slate-300 bg-slate-900 text-white shadow-lg" />
                  <div className="absolute left-1/2 top-1/2 h-[17rem] w-[17rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-emerald-200" />
                  <div className="absolute left-1/2 top-1/2 h-[24rem] w-[24rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-slate-200" />

                  <div className="absolute left-1/2 top-1/2 flex h-28 w-28 -translate-x-1/2 -translate-y-1/2 items-center justify-center text-center">
                    <div>
                      <div className="text-[10px] font-black uppercase tracking-[0.18em] text-white/65">Zentrum</div>
                      <div className="mt-2 text-sm font-black leading-tight text-white">tragfähige Versorgung</div>
                    </div>
                  </div>

                  {protectionSystemNodes.map((node) => (
                    <div
                      key={node.label}
                      className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-[1.5rem] border px-4 py-4 text-center shadow-sm ${node.tone}`}
                      style={{ top: node.top, left: node.left }}
                    >
                      <div className="text-[11px] font-black leading-tight tracking-[0.08em]">{node.label}</div>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-1 gap-4 lg:hidden">
                  <div className="rounded-[1.75rem] border border-slate-300 bg-slate-900 p-5 text-center shadow-sm">
                    <div className="text-[10px] font-black uppercase tracking-[0.18em] text-white/70">Zentrum</div>
                    <div className="mt-2 text-sm font-black text-white">tragfähige Versorgung</div>
                  </div>
                  {protectionSystemNodes.map((node) => (
                    <div key={node.label} className={`rounded-[1.5rem] border p-4 text-center shadow-sm ${node.tone}`}>
                      <div className="text-[11px] font-black leading-tight">{node.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              <aside className="rounded-[2rem] border border-slate-200 bg-slate-50 p-6">
                <div className="text-[10px] font-black uppercase tracking-[0.24em] text-slate-500">Versorgungsbausteine</div>
                <div className="mt-4 space-y-3">
                  {protectionSystemNodes.map((node) => (
                    <div key={node.label} className="rounded-[1.25rem] border border-slate-200 bg-white p-4">
                      <h5 className="text-sm font-black tracking-tight text-slate-900">{node.label}</h5>
                      <p className="mt-2 text-sm leading-relaxed text-slate-600">{node.note}</p>
                    </div>
                  ))}
                </div>
              </aside>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {FAMILY_RESILIENCE_PANELS.map((panel) => (
              <section key={panel.title} className="rounded-[2.5rem] border border-slate-100 bg-slate-50 p-8 shadow-sm">
                <div className="text-[10px] font-black uppercase tracking-[0.24em] text-slate-400 mb-4">Familienebene</div>
                <h4 className="text-2xl font-black tracking-tight text-slate-900 mb-4">{panel.title}</h4>
                <p className="text-slate-600 leading-relaxed">{panel.text}</p>
              </section>
            ))}
          </div>

          <div className="mb-8">
            <div className="text-[10px] font-black uppercase tracking-[0.24em] text-slate-400 mb-4">Kindbezogene Schutzfaktoren</div>
            <p className="text-base text-slate-600 leading-relaxed max-w-4xl">
              Kinder bringen unterschiedliche persönliche Ressourcen mit. Diese Schutzfaktoren sind wichtig, sollten
              aber nie so gelesen werden, als müssten Kinder sich selbst stabilisieren. Sie wirken vor allem dann,
              wenn die familiäre Umgebung tragfähig genug ist und Unterstützung zugänglich bleibt.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {CHILD_PROTECTION_PANELS.map((panel) => (
              <section key={panel.title} className="rounded-[2.5rem] border border-slate-100 bg-white p-8 shadow-sm">
                <div className="text-[10px] font-black uppercase tracking-[0.24em] text-slate-400 mb-4">Kinderebene</div>
                <h4 className="text-2xl font-black tracking-tight text-slate-900 mb-4">{panel.title}</h4>
                <p className="text-slate-600 leading-relaxed">{panel.text}</p>
              </section>
            ))}
          </div>

          <div className="rounded-[3rem] border border-slate-100 bg-slate-900 p-8 md:p-10 shadow-sm">
            <div className="text-[10px] font-black uppercase tracking-[0.24em] text-emerald-400 mb-6">Für die Praxis</div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {PROTECTION_PRACTICE_POINTS.map((point) => (
                <div key={point} className="flex items-start gap-3 rounded-[1.5rem] bg-white/5 border border-white/10 p-5">
                  <ShieldCheck size={18} className="mt-1 shrink-0 text-emerald-400" />
                  <p className="text-sm text-white/90 leading-relaxed font-medium">{point}</p>
                </div>
              ))}
            </div>
          </div>
        </section>





        



        <section id="evidence-psychoeducation" className="mb-20 border-t-2 border-slate-50 pt-16">
          <div className="text-emerald-600 font-black text-[11px] uppercase tracking-[0.5em] mb-8 flex items-center gap-4">
            <div className="w-14 h-[2px] bg-emerald-200" /> 2 Mit Kindern sprechen
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-12 gap-10 items-start mb-12">
            <div className="xl:col-span-7">
              <h3 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter leading-[0.95] mb-6">
                Wie man mit Kindern <span className="text-emerald-600 italic">darüber sprechen</span> kann.
              </h3>
              <div className="space-y-5 text-base md:text-lg text-slate-600 leading-relaxed">
                <p>
                  Kinder merken meist früh, dass etwas nicht stimmt. Entlastend ist deshalb nicht möglichst viel
                  Information, sondern eine ehrliche, altersgerechte Erklärung, die Orientierung gibt und Fragen erlaubt.
                </p>
              </div>
            </div>

            <aside className="xl:col-span-5 bg-slate-900 text-white rounded-[3rem] p-8 md:p-10 shadow-xl border-l-[10px] border-emerald-600">
              <h4 className="text-emerald-400 font-black mb-5 uppercase text-[10px] tracking-[0.35em] flex items-center gap-3">
                <ShieldCheck size={18} /> Warum Wissen entlastet
              </h4>
              <div className="space-y-4">
                {PSYCHOEDUCATION_BENEFITS.map((point) => (
                  <div key={point} className="flex items-start gap-3">
                    <CheckCircle2 size={18} className="mt-1 shrink-0 text-emerald-400" />
                    <p className="text-sm md:text-[15px] leading-relaxed text-white/90">{point}</p>
                  </div>
                ))}
              </div>
            </aside>
          </div>

          <div className="mb-8">
            <div className="text-[10px] font-black uppercase tracking-[0.24em] text-slate-400 mb-4">Altersgerechte Gesprächsführung</div>
            <p className="text-base text-slate-600 leading-relaxed max-w-4xl">
              Was Kinder verstehen können und was sie brauchen, verändert sich mit dem Alter. Gute Psychoedukation
              orientiert sich deshalb am Entwicklungsstand und nicht an dem, was Erwachsene gerne alles auf einmal
              erklären würden.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {PSYCHOEDUCATION_AGE_GROUPS.map((group) => (
              <section key={group.title} className="rounded-[2.5rem] border border-slate-100 bg-slate-50 p-8 shadow-sm">
                <div className="inline-flex items-center rounded-full border px-4 py-2 text-[10px] font-black uppercase tracking-[0.24em] mb-5 bg-white border-slate-200 text-slate-700">
                  {group.shortLabel}
                </div>
                <h4 className="text-2xl font-black tracking-tight text-slate-900 mb-4">{group.title}</h4>
                <p className="text-slate-600 leading-relaxed">{group.text}</p>
              </section>
            ))}
          </div>

          <div className="mb-12 rounded-[3rem] border border-emerald-100 bg-emerald-50/70 p-8 md:p-10 shadow-sm">
            <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_22rem] xl:items-start">
              <div>
                <div className="text-[10px] font-black uppercase tracking-[0.24em] text-emerald-900 mb-4">Vorbereitung mit den Eltern</div>
                <h4 className="text-3xl font-black tracking-tight text-slate-900 mb-4">
                  Vor dem Gespräch zuerst die <span className="text-emerald-700 italic">Befürchtungen der Eltern</span> klären.
                </h4>
                <p className="max-w-4xl text-base leading-relaxed text-slate-700">
                  Viele Eltern sind nicht gegen Information, sondern unsicher, was ein offenes Gespräch beim Kind auslösen könnte.
                  Deshalb ist Vorbereitung ein eigener Schritt und nicht nur ein Nebensatz vor dem Familiengespräch.
                </p>
              </div>
              <aside className="rounded-[2rem] border border-emerald-200 bg-white/80 p-6">
                <div className="text-[10px] font-black uppercase tracking-[0.24em] text-emerald-800 mb-3">Kernaussage</div>
                <p className="text-sm leading-relaxed text-emerald-950">
                  Häufig ist nicht die Information selbst belastender, sondern das Fehlen einer verstehbaren, ehrlichen Erklärung.
                </p>
              </aside>
            </div>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
              {PSYCHOEDUCATION_PREPARATION_POINTS.map((point) => (
                <div key={point} className="flex items-start gap-3 rounded-[1.5rem] border border-emerald-100 bg-white/90 p-5">
                  <ShieldCheck size={18} className="mt-1 shrink-0 text-emerald-700" />
                  <p className="text-sm leading-relaxed font-medium text-slate-800">{point}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-12">
            <EvidenceDisclosure
              title="Gesprächssettings und Formulierungshilfen"
              note="Diese Vertiefung eignet sich für konkrete Gesprächsvorbereitung mit Eltern oder Kindern."
            >
              <div className="mb-8">
                <div className="text-[10px] font-black uppercase tracking-[0.24em] text-slate-400 mb-4">Mögliche Settings</div>
                <p className="text-base text-slate-600 leading-relaxed max-w-4xl">
                  Psychoedukation ist kein Einheitsformat. Je nach Tabuisierung, Alter und Sicherheit des Kindes können
                  unterschiedliche Gesprächssettings hilfreich sein.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                {PSYCHOEDUCATION_SETTINGS.map((setting) => (
                  <section key={setting.title} className="rounded-[2.5rem] border border-slate-100 bg-white p-8 shadow-sm">
                    <h4 className="text-2xl font-black tracking-tight text-slate-900 mb-4">{setting.title}</h4>
                    <p className="text-slate-600 leading-relaxed">{setting.text}</p>
                  </section>
                ))}
              </div>

              <div className="mb-8">
                <div className="text-[10px] font-black uppercase tracking-[0.24em] text-slate-400 mb-4">Formulierungshilfen</div>
                <p className="text-base text-slate-600 leading-relaxed max-w-4xl">
                  Eltern und Fachpersonen hilft oft nicht nur Wissen, sondern auch eine konkrete Sprache. Solche Sätze sollen
                  keine starre Vorlage sein, sondern eine Richtung: einfach, ehrlich, nicht beschämend und entlastend.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {PHRASE_GUIDES.map((guide) => (
                  <section key={guide.title} className="rounded-[2.5rem] border border-slate-100 bg-white p-8 shadow-sm">
                    <h4 className="text-2xl font-black tracking-tight text-slate-900 mb-4">{guide.title}</h4>
                    <p className="text-slate-600 leading-relaxed">{guide.text}</p>
                  </section>
                ))}
              </div>
            </EvidenceDisclosure>
          </div>

          <div className="mb-12 rounded-[3rem] border border-slate-100 bg-white p-8 md:p-10 shadow-sm">
            <div className="text-[10px] font-black uppercase tracking-[0.24em] text-slate-400 mb-6">Typische Schwierigkeiten im Gespräch</div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {PSYCHOEDUCATION_DIFFICULTIES.map((item) => (
                <section key={item.title} className="rounded-[2rem] border border-slate-100 bg-slate-50 p-6">
                  <h4 className="text-xl font-black tracking-tight text-slate-900 mb-3">{item.title}</h4>
                  <p className="text-slate-600 leading-relaxed">{item.text}</p>
                </section>
              ))}
            </div>
          </div>

          <div className="rounded-[3rem] border border-slate-100 bg-slate-50 p-8 md:p-10 shadow-sm">
            <div className="text-[10px] font-black uppercase tracking-[0.24em] text-slate-400 mb-6">Für die Praxis</div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {PSYCHOEDUCATION_PRACTICE_POINTS.map((point) => (
                <div key={point} className="flex items-start gap-3 rounded-[1.5rem] bg-white border border-slate-100 p-5">
                  <Brain size={18} className="mt-1 shrink-0 text-emerald-600" />
                  <p className="text-sm text-slate-700 leading-relaxed font-medium">{point}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8">
            <EvidenceDisclosure
              title="Prozesslogik der Psychoedukation"
              note="Das Diagramm ergänzt den Haupttext als Arbeitslogik und bleibt standardmässig eingeklappt."
            >
            <div className="rounded-[3rem] border border-emerald-100 bg-emerald-50/70 p-8 md:p-10 shadow-sm">
            <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_18rem] xl:items-start">
              <div>
                <div className="text-[10px] font-black uppercase tracking-[0.24em] text-emerald-900 mb-4">Fachdiagramm</div>
                <h4 className="text-3xl font-black tracking-tight text-slate-900 mb-4">
                  Psychoedukation ist eher ein <span className="text-emerald-700 italic">Prozess</span> als ein Einzelgespräch.
                </h4>
                <p className="max-w-4xl text-base leading-relaxed text-slate-700">
                  Das Diagramm übersetzt den Abschnitt in einen nachvollziehbaren Ablauf: vorbereiten, erklären,
                  nachfragen und später wieder aufnehmen. So wird klarer, warum gute Psychoedukation nicht mit einem
                  einzigen Informationsmoment abgeschlossen ist.
                </p>
              </div>
              <aside className="rounded-[2rem] border border-emerald-200 bg-white/80 p-6">
                <div className="text-[10px] font-black uppercase tracking-[0.24em] text-emerald-800 mb-3">Leitidee</div>
                <p className="text-sm leading-relaxed text-emerald-950">
                  Wissen entlastet am meisten, wenn es vorbereitet, dialogisch vermittelt und später wieder aufgenommen wird.
                </p>
              </aside>
            </div>

            <div className="mt-8 overflow-hidden rounded-[2.5rem] border border-emerald-100 bg-white p-5 md:p-8">
              <div className="grid grid-cols-1 gap-4 lg:grid-cols-4">
                {psychoeducationPath.map((step, index) => (
                  <div key={step.label} className="relative">
                    <section className="h-full rounded-[2rem] border border-emerald-100 bg-emerald-50/40 p-6 shadow-sm">
                      <div className="mb-4 inline-flex rounded-full border border-emerald-200 bg-white px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-emerald-700">
                        {step.label}
                      </div>
                      <p className="text-sm leading-relaxed text-slate-700">{step.desc}</p>
                    </section>
                    {index < psychoeducationPath.length - 1 && (
                      <>
                        <div className="absolute right-[-0.85rem] top-1/2 hidden h-[2px] w-7 -translate-y-1/2 bg-emerald-300 lg:block" />
                        <div className="absolute right-[-0.6rem] top-1/2 hidden h-2.5 w-2.5 -translate-y-1/2 rotate-45 border-r-2 border-t-2 border-emerald-400 lg:block" />
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>
            </div>
            </EvidenceDisclosure>
          </div>
        </section>


        <section id="evidence-parentwork" className="mb-20 border-t-2 border-slate-50 pt-16">
          <div className="text-emerald-600 font-black text-[11px] uppercase tracking-[0.5em] mb-8 flex items-center gap-4">
            <div className="w-14 h-[2px] bg-emerald-200" /> 3 Mit Eltern arbeiten
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-12 gap-10 items-start mb-12">
            <div className="xl:col-span-7">
              <h3 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter leading-[0.95] mb-6">
                Zwischen <span className="text-emerald-600 italic">Hilfebedarf</span> und Hürden im Alltag.
              </h3>
              <div className="space-y-5 text-base md:text-lg text-slate-600 leading-relaxed">
                <p>
                  Der Bedarf an Unterstützung ist oft hoch, trotzdem wird Hilfe häufig spät gesucht. Dahinter stehen
                  meist nicht fehlende Einsicht, sondern Angst, Scham, Stigmatisierung und das Erleben, unter Druck zu geraten.
                </p>
                <p>
                  Besonders belastend ist die Sorge, durch Offenheit Kontrolle zu verlieren. Gute Versorgung beginnt
                  deshalb mit einer Haltung, die Schwellen reduziert: transparent, konkret und nicht moralisierend.
                </p>
              </div>
            </div>

            <aside className="xl:col-span-5 bg-slate-900 text-white rounded-[3rem] p-8 md:p-10 shadow-xl border-l-[10px] border-emerald-600">
              <h4 className="text-emerald-400 font-black mb-5 uppercase text-[10px] tracking-[0.35em] flex items-center gap-3">
                <AlertTriangle size={18} /> Typische Hürden
              </h4>
              <div className="space-y-4">
                {HELP_BARRIER_POINTS.map((point) => (
                  <div key={point} className="flex items-start gap-3">
                    <CheckCircle2 size={18} className="mt-1 shrink-0 text-emerald-400" />
                    <p className="text-sm md:text-[15px] leading-relaxed text-white/90">{point}</p>
                  </div>
                ))}
              </div>
            </aside>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {HELP_BARRIER_PANELS.map((panel) => (
              <section key={panel.title} className="rounded-[2.5rem] border border-slate-100 bg-slate-50 p-8 shadow-sm">
                <h4 className="text-2xl font-black tracking-tight text-slate-900 mb-4">{panel.title}</h4>
                <p className="text-slate-600 leading-relaxed">{panel.text}</p>
              </section>
            ))}
          </div>

          <div className="rounded-[3rem] border border-slate-100 bg-white p-8 md:p-10 shadow-sm">
            <div className="text-[10px] font-black uppercase tracking-[0.24em] text-slate-400 mb-6">Für die Praxis</div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {HELP_BARRIER_PRACTICE_POINTS.map((point) => (
                <div key={point} className="flex items-start gap-3 rounded-[1.5rem] bg-slate-50 border border-slate-100 p-5">
                  <ShieldCheck size={18} className="mt-1 shrink-0 text-emerald-600" />
                  <p className="text-sm text-slate-700 leading-relaxed font-medium">{point}</p>
                </div>
              ))}
            </div>
          </div>
        </section>



        <section id="evidence-interventions" className="mb-20 border-t-2 border-slate-50 pt-16">
          <div className="text-emerald-600 font-black text-[11px] uppercase tracking-[0.5em] mb-8 flex items-center gap-4">
            <div className="w-14 h-[2px] bg-emerald-200" /> 4 Handeln und vernetzen
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-12 gap-10 items-start mb-12">
            <div className="xl:col-span-7">
              <h3 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter leading-[0.95] mb-6">
                Von der <span className="text-emerald-600 italic">Einsicht</span> zur konkreten Entlastung im Alltag.
              </h3>
              <div className="space-y-5 text-base md:text-lg text-slate-600 leading-relaxed">
                <p>
                  Gute familienorientierte Praxis erschöpft sich nicht in Diagnose oder Problembenennung. Entscheidend
                  ist, ob daraus alltagstaugliche Schritte entstehen: Wer ist erreichbar, wer trägt mit, was gilt in
                  der Krise und was hilft beim Übergang zurück in den Alltag?
                </p>
              </div>
            </div>

            <aside className="xl:col-span-5 bg-slate-900 text-white rounded-[3rem] p-8 md:p-10 shadow-xl border-l-[10px] border-emerald-600">
              <h4 className="text-emerald-400 font-black mb-5 uppercase text-[10px] tracking-[0.35em] flex items-center gap-3">
                <ClipboardCheck size={18} /> Praxislogik
              </h4>
              <div className="space-y-4">
                {CLINICAL_PRACTICE_POINTS.map((point) => (
                  <div key={point} className="flex items-start gap-3">
                    <CheckCircle2 size={18} className="mt-1 shrink-0 text-emerald-400" />
                    <p className="text-sm md:text-[15px] leading-relaxed text-white/90">{point}</p>
                  </div>
                ))}
              </div>
            </aside>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {CLINICAL_PRACTICE_PANELS.map((panel) => (
              <section key={panel.title} className="rounded-[2.5rem] border border-slate-100 bg-slate-50 p-8 shadow-sm">
                <h4 className="text-2xl font-black tracking-tight text-slate-900 mb-4">{panel.title}</h4>
                <p className="text-slate-600 leading-relaxed">{panel.text}</p>
              </section>
            ))}
          </div>

          <div className="mb-12 rounded-[3rem] border border-emerald-100 bg-emerald-50/70 p-8 md:p-10 shadow-sm">
            <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_20rem] xl:items-start">
              <div>
                <div className="text-[10px] font-black uppercase tracking-[0.24em] text-emerald-900 mb-4">Mentalisieren und familienorientierte Interventionen</div>
                <h4 className="text-3xl font-black tracking-tight text-slate-900 mb-4">
                  Verhalten besser verstehen, statt nur Symptome <span className="text-emerald-700 italic">abzuarbeiten</span>.
                </h4>
                <p className="max-w-4xl text-base leading-relaxed text-slate-700">
                  Albert Lenz beschreibt Mentalisierung als wichtigen Wirkmechanismus familienorientierter Arbeit:
                  Gedanken, Gefühle, Bedürfnisse und Absichten hinter Verhalten besser zu erfassen. Das unterstützt
                  Perspektivwechsel, entlastet Beziehung und hilft bei der Bearbeitung von Parentifizierung,
                  Kommunikationsabbrüchen und belasteten Interaktionen.
                </p>
              </div>
              <aside className="rounded-[2rem] border border-emerald-200 bg-white/80 p-6">
                <div className="text-[10px] font-black uppercase tracking-[0.24em] text-emerald-800 mb-3">Interventionsrahmen</div>
                <p className="text-sm leading-relaxed text-emerald-950">
                  Basale Interventionen sind laut Lenz vor allem Psychoedukation, begleitende Familientherapie und bindungsbezogene Interventionen.
                </p>
              </aside>
            </div>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
              {MENTALIZATION_PANELS.map((panel) => (
                <section key={panel.title} className="rounded-[2.25rem] border border-emerald-100 bg-white p-6 shadow-sm">
                  <h5 className="text-xl font-black tracking-tight text-slate-900 mb-3">{panel.title}</h5>
                  <p className="text-slate-700 leading-relaxed">{panel.text}</p>
                </section>
              ))}
            </div>

            <div className="mt-8 rounded-[2.5rem] border border-emerald-100 bg-white p-6 md:p-8">
              <div className="text-[10px] font-black uppercase tracking-[0.24em] text-emerald-800 mb-5">Reflexive Fragen für Gespräche</div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {MENTALIZATION_REFLECTIVE_QUESTIONS.map((question) => (
                  <div key={question} className="flex items-start gap-3 rounded-[1.5rem] border border-emerald-100 bg-emerald-50/60 p-5">
                    <Brain size={18} className="mt-1 shrink-0 text-emerald-700" />
                    <p className="text-sm leading-relaxed font-medium text-slate-800">{question}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
              {INTERVENTION_PROGRAM_POINTS.map((point) => (
                <div key={point} className="flex items-start gap-3 rounded-[1.5rem] border border-emerald-100 bg-white/90 p-5">
                  <CheckCircle2 size={18} className="mt-1 shrink-0 text-emerald-700" />
                  <p className="text-sm leading-relaxed font-medium text-slate-800">{point}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[3rem] border border-slate-100 bg-white p-8 md:p-10 shadow-sm">
            <div className="text-[10px] font-black uppercase tracking-[0.24em] text-slate-400 mb-6">Konkrete nächste Schritte</div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {CLINICAL_PRACTICE_STEPS.map((step) => (
                <div key={step} className="flex items-start gap-3 rounded-[1.5rem] bg-slate-50 border border-slate-100 p-5">
                  <ShieldCheck size={18} className="mt-1 shrink-0 text-emerald-600" />
                  <p className="text-sm text-slate-700 leading-relaxed font-medium">{step}</p>
                </div>
              ))}
            </div>
          </div>
        </section>



        <section className="mb-20 border-t-2 border-slate-50 pt-16">
          <div className="text-emerald-600 font-black text-[11px] uppercase tracking-[0.5em] mb-8 flex items-center gap-4">
            <div className="w-14 h-[2px] bg-emerald-200" /> 4 Handeln und vernetzen
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-12 gap-10 items-start mb-12">
            <div className="xl:col-span-7">
              <h3 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter leading-[0.95] mb-6">
                Unterstützung, die <span className="text-emerald-600 italic">unterschiedliche Zugänge</span> erlaubt.
              </h3>
              <div className="space-y-5 text-base md:text-lg text-slate-600 leading-relaxed">
                <p>
                  Familien brauchen nicht alle dieselbe Form von Hilfe. Manche benötigen rasch Orientierung in einer
                  Krise, andere längerfristige Begleitung, ein Kinderangebot, eine Patenschaft oder einen Ort für
                  Austausch mit ähnlich Betroffenen. Deshalb ist es hilfreich, Unterstützungsangebote nicht nur nach
                  Institutionen, sondern auch nach ihrer Funktion zu betrachten.
                </p>
                <p>
                  Der Grundlagentext beschreibt für Zürich und die Schweiz ein bereits gut ausgebautes Netz mit
                  klinischen Angeboten, kantonaler Beratung, Kindergruppen, Patenschaften, Selbsthilfe und
                  Krisenberatung. Für die Website geht es dabei nicht um Vollständigkeit, sondern um eine erste,
                  verständliche Orientierung. 
                </p>
              </div>
            </div>

            <aside className="xl:col-span-5 bg-slate-900 text-white rounded-[3rem] p-8 md:p-10 shadow-xl border-l-[10px] border-emerald-600">
              <h4 className="text-emerald-400 font-black mb-5 uppercase text-[10px] tracking-[0.35em] flex items-center gap-3">
                <MapPin size={18} /> Orientierung
              </h4>
              <div className="space-y-4">
                {SUPPORT_OFFER_NOTES.map((point) => (
                  <div key={point} className="flex items-start gap-3">
                    <CheckCircle2 size={18} className="mt-1 shrink-0 text-emerald-400" />
                    <p className="text-sm md:text-[15px] leading-relaxed text-white/90">{point}</p>
                  </div>
                ))}
              </div>
            </aside>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {SUPPORT_OFFERS.map((offer) => (
              <section
                key={offer.name}
                className={`rounded-[2.5rem] p-8 shadow-sm flex flex-col h-full ${
                  offer.official
                    ? 'border border-emerald-200 bg-emerald-50/70'
                    : 'border border-slate-100 bg-slate-50'
                }`}
              >
                <div className="flex flex-wrap gap-2 mb-5">
                  <span className={`text-[10px] font-black uppercase tracking-[0.24em] px-3 py-1 rounded-full border ${
                    offer.official
                      ? 'text-emerald-900 bg-white border-emerald-200'
                      : 'text-emerald-800 bg-emerald-50 border-emerald-100'
                  }`}>
                    {offer.category}
                  </span>
                  <span className="text-[10px] font-black uppercase tracking-[0.24em] text-slate-500 bg-white border border-slate-200 px-3 py-1 rounded-full">
                    {offer.audience}
                  </span>
                  {offer.highlight && (
                    <span className="text-[10px] font-black uppercase tracking-[0.24em] text-slate-700 bg-white border border-slate-200 px-3 py-1 rounded-full">
                      {offer.highlight}
                    </span>
                  )}
                </div>
                <h4 className="text-2xl font-black tracking-tight text-slate-900 mb-4">{offer.name}</h4>
                <p className="text-slate-600 leading-relaxed mb-8">{offer.description}</p>
                {offer.official && (
                  <p className="text-sm text-slate-700 leading-relaxed font-medium mb-8">
                    Diese Karte verweist bewusst auf die offizielle Beratungsstelle der PUK Zürich und dient hier als
                    primäre institutionelle Anlaufstelle. Die übrigen Inhalte dieser Website bleiben davon klar getrennt.
                  </p>
                )}
                <a
                  href={offer.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-auto inline-flex items-center gap-3 text-[11px] font-black uppercase tracking-[0.24em] text-slate-900 hover:text-emerald-600 transition-colors"
                >
                  Webseite öffnen <ExternalLink size={16} />
                </a>
              </section>
            ))}
          </div>

          <div className="mt-10 rounded-[3rem] border border-slate-100 bg-white p-8 md:p-10 shadow-sm">
            <div className="text-[10px] font-black uppercase tracking-[0.24em] text-slate-400 mb-6">Über diese Website</div>
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
              <div className="xl:col-span-7 space-y-4 text-slate-600 leading-relaxed">
                <p>
                  Diese Website will orientieren, erklären und entlasten. Sie bündelt psychoedukative Inhalte zu
                  Elternschaft, Familiendynamik, Kinderperspektive, Schutzfaktoren und Unterstützungsangeboten.
                </p>
                <p>
                  Sie ersetzt keine offizielle Beratung und ist keine offizielle PUK-Unterseite. Sie versteht sich als
                  ergänzende Vertiefung zu bestehenden Angeboten wie der Angehörigenberatung der PUK Zürich sowie zu
                  weiteren Unterstützungsstrukturen in Zürich und der Schweiz.
                </p>
              </div>
              <div className="xl:col-span-5 space-y-4">
                {ABOUT_THIS_WEBSITE_POINTS.map((point) => (
                  <div key={point} className="flex items-start gap-3 rounded-[1.5rem] bg-slate-50 border border-slate-100 p-5">
                    <CheckCircle2 size={18} className="mt-1 shrink-0 text-emerald-600" />
                    <p className="text-sm text-slate-700 leading-relaxed font-medium">{point}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>





        <section id="evidence-materials" className="mb-20 border-t-2 border-slate-50 pt-16">
          <div className="text-emerald-600 font-black text-[11px] uppercase tracking-[0.5em] mb-8 flex items-center gap-4">
            <div className="w-14 h-[2px] bg-emerald-200" /> 5 Materialien
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-12 gap-10 items-start mb-12">
            <div className="xl:col-span-7">
              <h3 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter leading-[0.95] mb-6">
                Materialien, die <span className="text-emerald-600 italic">Sprache und Entlastung</span> ermöglichen.
              </h3>
              <div className="space-y-5 text-base md:text-lg text-slate-600 leading-relaxed">
                <p>
                  Bücher, Geschichten, Comics und digitale Angebote können Familien helfen, Worte für schwierige
                  Erfahrungen zu finden. Sie ersetzen kein Gespräch und keine fachliche Begleitung, sind aber oft
                  ein guter Einstieg, wenn Kinder Fragen stellen, Eltern verunsichert sind oder gemeinsame Sprache
                  noch fehlt.
                </p>
                <p>
                  Der Grundlagentext empfiehlt Materialien für verschiedene Altersstufen sowie digitale Ressourcen,
                  die Orientierung und Psychoedukation erleichtern. Für die Website ist entscheidend, diese Hilfen
                  nicht als Pflichtlektüre, sondern als entlastende Werkzeuge sichtbar zu machen.
                </p>
              </div>
            </div>

            <aside className="xl:col-span-5 bg-slate-900 text-white rounded-[3rem] p-8 md:p-10 shadow-xl border-l-[10px] border-emerald-600">
              <h4 className="text-emerald-400 font-black mb-5 uppercase text-[10px] tracking-[0.35em] flex items-center gap-3">
                <Library size={18} /> Orientierung
              </h4>
              <div className="space-y-4">
                {MEDIA_NOTES.map((point) => (
                  <div key={point} className="flex items-start gap-3">
                    <CheckCircle2 size={18} className="mt-1 shrink-0 text-emerald-400" />
                    <p className="text-sm md:text-[15px] leading-relaxed text-white/90">{point}</p>
                  </div>
                ))}
              </div>
            </aside>
          </div>

          <EvidenceDisclosure
            title="Bücher und digitale Materialien"
            note="Die Materialsammlung ist als Nachschlageblock gedacht und bleibt standardmässig kompakt."
          >
            <div className="mb-6">
              <div className="text-[10px] font-black uppercase tracking-[0.24em] text-slate-400 mb-4">Empfohlene Bücher</div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              {MEDIA_BOOKS.map((book) => (
                <section key={book.title} className="rounded-[2.5rem] border border-slate-100 bg-slate-50 p-8 shadow-sm">
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="text-[10px] font-black uppercase tracking-[0.24em] text-emerald-800 bg-emerald-50 border border-emerald-100 px-3 py-1 rounded-full">
                      {book.age}
                    </span>
                  </div>
                  <h4 className="text-2xl font-black tracking-tight text-slate-900 mb-4">{book.title}</h4>
                  <p className="text-slate-600 leading-relaxed">{book.focus}</p>
                </section>
              ))}
            </div>

            <div className="mb-6">
              <div className="text-[10px] font-black uppercase tracking-[0.24em] text-slate-400 mb-4">Digitale Ressourcen</div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {MEDIA_DIGITAL.map((item) => (
                <section key={item.name} className="rounded-[2.5rem] border border-slate-100 bg-white p-8 shadow-sm flex flex-col h-full">
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="text-[10px] font-black uppercase tracking-[0.24em] text-slate-500 bg-slate-50 border border-slate-200 px-3 py-1 rounded-full">
                      {item.type}
                    </span>
                  </div>
                  <h4 className="text-2xl font-black tracking-tight text-slate-900 mb-4">{item.name}</h4>
                  <p className="text-slate-600 leading-relaxed mb-8">{item.description}</p>
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-auto inline-flex items-center gap-3 text-[11px] font-black uppercase tracking-[0.24em] text-slate-900 hover:text-emerald-600 transition-colors"
                  >
                    Webseite öffnen <ExternalLink size={16} />
                  </a>
                </section>
              ))}
            </div>
          </EvidenceDisclosure>
        </section>


<section className="mb-20 border-t-2 border-slate-50 pt-16">
          <div className="text-emerald-600 font-black text-[11px] uppercase tracking-[0.5em] mb-8 flex items-center gap-4">
            <div className="w-14 h-[2px] bg-emerald-200" /> Vertiefung: Unterschiede nach Krankheitsbild
          </div>
          <EvidenceDisclosure
            title="Unterschiede nach Krankheitsbild"
            note="Diese Diagnoseperspektive ist bewusst als spätere fachliche Vertiefung angelegt und nicht Teil des ersten Lesepfads."
          >
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-10 items-start mb-12">
            <div className="xl:col-span-7">
              <h3 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter leading-[0.95] mb-6">
                Wie sich familiäre Belastungen je nach <span className="text-emerald-600 italic">Krankheitsbild</span> unterscheiden können.
              </h3>
              <div className="space-y-5 text-base md:text-lg text-slate-600 leading-relaxed">
                <p>
                  Psychische Erkrankungen wirken sich nicht alle gleich auf den Familienalltag aus. Nach dem Blick auf Belastungen,
                  Schutzfaktoren, Gesprächsführung, Hilfebarrieren und Unterstützungsangebote folgt hier bewusst eine
                  fachliche Vertiefung. Manche Krankheitsbilder führen eher zu Rückzug und emotionaler Unerreichbarkeit,
                  andere eher zu Überbehütung, starker Unruhe, instabilen Beziehungen oder desorientierenden Krisen.
                </p>
                <p>
                  Für die Praxis ist deshalb entscheidend, die Diagnose nicht zu überschätzen. Wichtiger ist, welche typischen
                  Muster sich im Zusammenleben zeigen: Wie verlässlich ist der Alltag? Wie gut gelingt emotionale Resonanz?
                  Gibt es Erwachsene, die mittragen können? Und braucht es Schutz- oder Krisenabsprachen?
                </p>
              </div>
            </div>

            <aside className="xl:col-span-5 bg-slate-900 text-white rounded-[3rem] p-8 md:p-10 shadow-xl border-l-[10px] border-emerald-600">
              <h4 className="text-emerald-400 font-black mb-5 uppercase text-[10px] tracking-[0.35em] flex items-center gap-3">
                <AlertTriangle size={18} /> Klinische Einordnung
              </h4>
              <div className="space-y-4">
                {CROSS_DIAGNOSIS_POINTS.map((point) => (
                  <div key={point} className="flex items-start gap-3">
                    <CheckCircle2 size={18} className="mt-1 shrink-0 text-emerald-400" />
                    <p className="text-sm md:text-[15px] leading-relaxed text-white/90">{point}</p>
                  </div>
                ))}
              </div>
            </aside>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {DIAGNOSIS_PROFILES.map((profile) => (
              <section key={profile.id} className="rounded-[2.5rem] border border-slate-100 bg-white p-8 shadow-sm">
                <div className={`inline-flex items-center rounded-full border px-4 py-2 text-[10px] font-black uppercase tracking-[0.24em] mb-6 ${profile.accent}`}>
                  {profile.shortLabel}
                </div>
                <h4 className="text-2xl font-black tracking-tight text-slate-900 mb-4">{profile.title}</h4>
                <p className="text-slate-600 leading-relaxed mb-6">{profile.description}</p>
                <div className="space-y-3 mb-6">
                  {profile.bullets.map((bullet) => (
                    <div key={bullet} className="flex items-start gap-3">
                      <Brain size={18} className="mt-1 shrink-0 text-emerald-600" />
                      <p className="text-sm text-slate-600 leading-relaxed">{bullet}</p>
                    </div>
                  ))}
                </div>
                <div className="rounded-[2rem] bg-slate-50 border border-slate-100 p-5">
                  <div className="text-[10px] font-black uppercase tracking-[0.24em] text-slate-400 mb-3">Für die Praxis</div>
                  <p className="text-sm text-slate-700 leading-relaxed font-medium">{profile.practice}</p>
                </div>
              </section>
            ))}
          </div>
          </EvidenceDisclosure>
        </section>
        <footer className="mt-24 pt-16 border-t-2 border-slate-50">
          <h4 className="text-2xl font-black mb-4 flex items-center gap-4 text-slate-900 italic tracking-tight">
            <Library className="text-emerald-600" size={28} /> Literatur & Referenzen
          </h4>
          <p className="text-sm text-slate-500 leading-relaxed mb-10 max-w-4xl">
            Die Liste verbindet klassische Fachliteratur mit ausgewählten offiziellen Online-Quellen, die in dieser
            Website als Orientierung für Angebote, Beratung und weiterführende Informationen dienen.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {LITERATUR.map((lit) => (
              <div key={`${lit.author}-${lit.title}`} className="text-sm text-slate-500 leading-loose border-l-4 border-slate-100 pl-8 py-2 hover:border-emerald-500 transition-colors">
                <span className="font-black text-slate-900 block mb-2 uppercase text-[10px] tracking-widest">{lit.author}</span>
                <span className="font-medium">{lit.title}</span> <span className="opacity-60">{lit.publisher}</span>
                {lit.link && (
                  <a
                    href={lit.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.18em] text-slate-700 hover:text-emerald-600 transition-colors"
                  >
                    Quelle öffnen <ExternalLink size={14} />
                  </a>
                )}
              </div>
            ))}
          </div>
        </footer>
      </div>
    </article>
  );
}
