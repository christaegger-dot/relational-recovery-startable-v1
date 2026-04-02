import React from 'react';
import {
  Activity,
  AlertTriangle,
  Brain,
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
  CROSS_DIAGNOSIS_POINTS,
  DIAGNOSIS_PROFILES,
  EVIDENCE_PROFILE_ROWS,
  FAMILY_RESILIENCE_PANELS,
  FAMILY_RESILIENCE_POINTS,
  FAMILY_SYSTEM_PANELS,
  FAMILY_SYSTEM_POINTS,
  FAMILY_SYSTEM_PRACTICE_POINTS,
  HELP_BARRIER_PANELS,
  HELP_BARRIER_POINTS,
  HELP_BARRIER_PRACTICE_POINTS,
  LITERATUR,
  MEDIA_BOOKS,
  MEDIA_DIGITAL,
  MEDIA_NOTES,
  PARENT_EXPERIENCE_PANELS,
  PARENT_EXPERIENCE_POINTS,
  PARENT_PRACTICE_POINTS,
  PHRASE_GUIDES,
  PRACTICE_PILLARS,
  PROTECTION_PRACTICE_POINTS,
  PSYCHOEDUCATION_AGE_GROUPS,
  PSYCHOEDUCATION_BENEFITS,
  PSYCHOEDUCATION_PRACTICE_POINTS,
  PUK_CONTEXT_POINTS,
  RELEVANCE_POINTS,
  RELEVANCE_STATS,
  SUPPORT_OFFERS,
  SUPPORT_OFFER_NOTES,
} from '../data/content';

export default function EvidenceSection() {
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


        <section className="mb-20 border-t-2 border-slate-50 pt-16">
          <div className="text-emerald-600 font-black text-[11px] uppercase tracking-[0.5em] mb-8 flex items-center gap-4">
            <div className="w-14 h-[2px] bg-emerald-200" /> Was Eltern erleben
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-12 gap-10 items-start mb-12">
            <div className="xl:col-span-7">
              <h3 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter leading-[0.95] mb-6">
                Zwischen Verantwortung, <span className="text-emerald-600 italic">Erschöpfung</span> und Bindung.
              </h3>
              <div className="space-y-5 text-base md:text-lg text-slate-600 leading-relaxed">
                <p>
                  Elternschaft ist bei psychischer Belastung oft beides zugleich: eine wichtige Kraftquelle und eine
                  erhebliche zusätzliche Belastung. Viele Mütter und Väter erleben ihre Kinder als Sinn, Halt und
                  Motivation. Gleichzeitig können Symptome dazu führen, dass genau jene Aufgaben schwerfallen, die im
                  Familienalltag täglich anstehen.
                </p>
                <p>
                  Besonders quälend ist für viele Eltern nicht nur die Erkrankung selbst, sondern die Diskrepanz zwischen
                  dem eigenen Anspruch und dem tatsächlichen Erleben. Wer spürt, weniger geduldig, weniger verfügbar oder
                  weniger belastbar zu sein als früher, erlebt oft starke Schuldgefühle, Scham und Angst, dem Kind nicht
                  zu genügen.
                </p>
                <p>
                  Gute Begleitung beginnt deshalb nicht mit vorschneller Problemfokussierung, sondern mit einer
                  respektvollen Anerkennung dieser Ambivalenz. Erst wenn Eltern sich nicht primär beurteilt fühlen, können
                  sie Belastung, Sorge und Unterstützungsbedarf offen benennen.
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
        </section>


        <section className="mb-20 border-t-2 border-slate-50 pt-16">
          <div className="text-emerald-600 font-black text-[11px] uppercase tracking-[0.5em] mb-8 flex items-center gap-4">
            <div className="w-14 h-[2px] bg-emerald-200" /> Familie als Ganzes
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-12 gap-10 items-start mb-12">
            <div className="xl:col-span-7">
              <h3 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter leading-[0.95] mb-6">
                Wenn ein Elternteil erkrankt, reagiert oft das <span className="text-emerald-600 italic">ganze Familiensystem</span>.
              </h3>
              <div className="space-y-5 text-base md:text-lg text-slate-600 leading-relaxed">
                <p>
                  Psychische Erkrankungen wirken häufig nicht nur auf einzelne Symptome oder einzelne Beziehungen,
                  sondern auf den Alltag der Familie als Ganzes. Routinen können instabil werden, Zuständigkeiten
                  sich verschieben und alle beginnen, sich stärker am aktuellen Befinden des erkrankten Elternteils
                  zu orientieren.
                </p>
                <p>
                  Für Familien besonders belastend sind dabei nicht nur akute Krisen, sondern auch die langsame
                  Veränderung von Stimmung, Kommunikation und Verlässlichkeit. Kinder, Partnerinnen und Partner
                  sowie weitere Bezugspersonen versuchen oft, das System mitzutragen, ohne dass ihre eigene
                  Belastung früh genug sichtbar wird.
                </p>
                <p>
                  Gerade deshalb ist es wichtig, die Familie nicht nur in Einzelperspektiven zu sehen. Wer die
                  Belastung eines erkrankten Elternteils verstehen will, muss auch auf Beziehungen, Rollen,
                  Kommunikation, Rückzug und Möglichkeiten zur Entlastung im gesamten Familiensystem schauen.
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
        </section>

        <section className="mb-20 border-t-2 border-slate-50 pt-16">
          <div className="text-emerald-600 font-black text-[11px] uppercase tracking-[0.5em] mb-8 flex items-center gap-4">
            <div className="w-14 h-[2px] bg-emerald-200" /> Was Kinder typischerweise erleben
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-12 gap-10 items-start mb-12">
            <div className="xl:col-span-7">
              <h3 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter leading-[0.95] mb-6">
                Zwischen Anpassung, <span className="text-emerald-600 italic">Sorge</span> und stiller Überforderung.
              </h3>
              <div className="space-y-5 text-base md:text-lg text-slate-600 leading-relaxed">
                <p>
                  Kinder psychisch erkrankter Eltern sind keine einheitliche Gruppe. Manche zeigen früh deutliche
                  Belastungszeichen, andere wirken lange unauffällig, übernehmen viel Verantwortung oder passen sich
                  stark an. Für Fachpersonen ist deshalb wichtig, nicht nur nach offenem Problemverhalten zu fragen,
                  sondern auch nach stiller Überforderung und übermässiger Reife.
                </p>
                <p>
                  Viele Kinder entwickeln feine Antennen für Stimmungswechsel, Rückzug, Gereiztheit oder Unruhe zuhause.
                  Sie spüren oft sehr genau, wann sie sich zurücknehmen, wann sie trösten oder wann sie besonders
                  unauffällig bleiben sollten. Diese innere Alarmbereitschaft ist weniger eine Familienstruktur als
                  eine kindliche Anpassungsleistung – und sie bindet langfristig viel emotionale Energie.
                </p>
                <p>
                  Besonders belastend wird es, wenn Kinder Verantwortung übernehmen, die nicht zu ihrem Alter passt,
                  wenn sie sich zwischen Loyalität und eigener Not hin- und hergerissen fühlen oder wenn über die
                  Erkrankung kaum offen gesprochen werden kann. Dann fehlt oft genau die Sprache, die entlasten und
                  Orientierung geben könnte.
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
            <div className="w-14 h-[2px] bg-emerald-200" /> Was Familien und Kinder schützt
          </div>

          <div className="mb-12">
            <h3 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter leading-[0.95] mb-5">
              Was Familien und Kindern <span className="text-emerald-600 italic">Stabilität</span> geben kann.
            </h3>
            <p className="text-base md:text-lg text-slate-600 leading-relaxed max-w-4xl">
              Schutz entsteht in belasteten Familien selten durch einen einzelnen Faktor. Nach dem Blick auf Belastungen von
              Eltern, Familie und Kindern ist deshalb wichtig, die stabilisierenden Gegenkräfte sichtbar zu machen:
              tragfähige Beziehungen, verlässliche Abläufe, ansprechbare Kommunikation und zugängliche Hilfe von
              aussen. Erst darauf aufbauend kommen kindbezogene Stärken wie Selbstwirksamkeit,
              Problemlösefähigkeit und aktive Bewältigung voll zur Geltung.
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





        



        <section className="mb-20 border-t-2 border-slate-50 pt-16">
          <div className="text-emerald-600 font-black text-[11px] uppercase tracking-[0.5em] mb-8 flex items-center gap-4">
            <div className="w-14 h-[2px] bg-emerald-200" /> Psychoedukation mit Kindern
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-12 gap-10 items-start mb-12">
            <div className="xl:col-span-7">
              <h3 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter leading-[0.95] mb-6">
                Wie man mit Kindern <span className="text-emerald-600 italic">darüber sprechen</span> kann.
              </h3>
              <div className="space-y-5 text-base md:text-lg text-slate-600 leading-relaxed">
                <p>
                  Kinder merken meist früh, dass etwas nicht stimmt. Belastend ist oft nicht nur die psychische Erkrankung
                  selbst, sondern auch das Schweigen darum. Wenn Kinder keine verständliche Erklärung bekommen, entstehen
                  leicht Schuldgefühle, diffuse Ängste oder eigene falsche Deutungen.
                </p>
                <p>
                  Psychoedukation bedeutet deshalb nicht, Kinder mit Fachwissen zu überladen. Gemeint ist eine ehrliche,
                  altersgerechte Gesprächsführung, die Orientierung gibt, entlastet und Beziehung stärkt. Entscheidend ist weniger,
                  dass alles perfekt erklärt wird, sondern dass das Kind spürt: Darüber darf gesprochen werden und Fragen sind erlaubt.
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

          <div className="mb-8">
            <div className="text-[10px] font-black uppercase tracking-[0.24em] text-slate-400 mb-4">Formulierungshilfen</div>
            <p className="text-base text-slate-600 leading-relaxed max-w-4xl">
              Eltern und Fachpersonen hilft oft nicht nur Wissen, sondern auch eine konkrete Sprache. Solche Sätze sollen
              keine starre Vorlage sein, sondern eine Richtung: einfach, ehrlich, nicht beschämend und entlastend.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {PHRASE_GUIDES.map((guide) => (
              <section key={guide.title} className="rounded-[2.5rem] border border-slate-100 bg-white p-8 shadow-sm">
                <h4 className="text-2xl font-black tracking-tight text-slate-900 mb-4">{guide.title}</h4>
                <p className="text-slate-600 leading-relaxed">{guide.text}</p>
              </section>
            ))}
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
        </section>


        <section className="mb-20 border-t-2 border-slate-50 pt-16">
          <div className="text-emerald-600 font-black text-[11px] uppercase tracking-[0.5em] mb-8 flex items-center gap-4">
            <div className="w-14 h-[2px] bg-emerald-200" /> Warum Hilfe oft nicht ankommt
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-12 gap-10 items-start mb-12">
            <div className="xl:col-span-7">
              <h3 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter leading-[0.95] mb-6">
                Zwischen <span className="text-emerald-600 italic">Hilfebedarf</span> und Hürden im Alltag.
              </h3>
              <div className="space-y-5 text-base md:text-lg text-slate-600 leading-relaxed">
                <p>
                  Der Bedarf an Unterstützung ist in vielen Familien hoch. Trotzdem nehmen Eltern und Angehörige Hilfe
                  oft erst spät oder nur zögerlich in Anspruch. Das liegt nicht einfach an fehlender Einsicht, sondern
                  häufig an nachvollziehbaren Ängsten, Scham, Stigmatisierung und dem Erleben, unter Druck zu geraten.
                </p>
                <p>
                  Besonders belastend ist die Sorge, durch Offenheit Kontrolle zu verlieren. Wenn Eltern befürchten,
                  als ungenügend wahrgenommen zu werden oder behördliche Schritte auszulösen, wird Schweigen schnell
                  zur vermeintlich sichereren Strategie. Dazu kommt: Gerade depressive oder ängstliche Symptome können
                  die Organisation von Hilfe massiv erschweren.
                </p>
                <p>
                  Gute Versorgung beginnt deshalb nicht erst bei der Empfehlung eines Angebots, sondern bei einer
                  Haltung, die Schwellen reduziert: transparent, nicht moralisierend, konkret und auf Augenhöhe.
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



        <section className="mb-20 border-t-2 border-slate-50 pt-16">
          <div className="text-emerald-600 font-black text-[11px] uppercase tracking-[0.5em] mb-8 flex items-center gap-4">
            <div className="w-14 h-[2px] bg-emerald-200" /> Klinische Praxis und Interventionen
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-12 gap-10 items-start mb-12">
            <div className="xl:col-span-7">
              <h3 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter leading-[0.95] mb-6">
                Von der <span className="text-emerald-600 italic">Einsicht</span> zur konkreten Entlastung im Alltag.
              </h3>
              <div className="space-y-5 text-base md:text-lg text-slate-600 leading-relaxed">
                <p>
                  Gute familienorientierte Praxis erschöpft sich nicht in der Diagnose oder im Benennen von Belastungen.
                  Entscheidend ist, ob sich daraus alltagstaugliche Schritte ableiten lassen: Wer ist erreichbar, wer
                  trägt mit, was passiert in einer Krise, wie bleibt Kontakt möglich und was hilft beim Übergang zurück
                  in den Alltag?
                </p>
                <p>
                  Der Grundlagentext betont dafür besonders die Netzwerkkarte, den Krisenplan, die sensible Arbeit an
                  parentifizierten Beziehungen sowie klare Regelungen bei stationären Aufenthalten und beim Austritt.
                  Diese Instrumente sollen nicht bürokratisch wirken, sondern Beziehungen, Orientierung und
                  Handlungssicherheit stärken.
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
            <div className="w-14 h-[2px] bg-emerald-200" /> Angebote in Zürich und der Schweiz
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





        <section className="mb-20 border-t-2 border-slate-50 pt-16">
          <div className="text-emerald-600 font-black text-[11px] uppercase tracking-[0.5em] mb-8 flex items-center gap-4">
            <div className="w-14 h-[2px] bg-emerald-200" /> Bücher, Medien und Materialien
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
        </section>


<section className="mb-20 border-t-2 border-slate-50 pt-16">
          <div className="text-emerald-600 font-black text-[11px] uppercase tracking-[0.5em] mb-8 flex items-center gap-4">
            <div className="w-14 h-[2px] bg-emerald-200" /> Vertiefung: Unterschiede nach Krankheitsbild
          </div>

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
