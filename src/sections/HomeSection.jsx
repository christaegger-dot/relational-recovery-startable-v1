import React, { useMemo } from 'react';
import { ChevronRight, ExternalLink, GraduationCap, HeartHandshake, Library, MapPin, Sparkles } from 'lucide-react';
import heroIllustration from '../assets/relational-recovery-hero-v3-web.png';
import { E_MODULE_COUNT, HOME_REFERENCE_COUNT, NETWORK_RESOURCE_COUNT, VIGNETTE_COUNT } from '../data/appShellContent';

export default function HomeSection({ activeTab, setActiveTab, progressPercent, completedModules }) {
  const progressSummaryItems = useMemo(
    () => [
      {
        label: 'Bearbeitet',
        value: `${completedModules.length} von ${E_MODULE_COUNT}`,
        note: 'Lernmodule mit Abschlussstatus',
      },
      {
        label: 'Offen',
        value: `${Math.max(E_MODULE_COUNT - completedModules.length, 0)}`,
        note: 'noch nicht bearbeitete Module',
      },
      {
        label: 'Fortschritt',
        value: `${progressPercent}%`,
        note: 'orientierender Lernstand',
      },
    ],
    [completedModules.length, progressPercent]
  );

  const overviewCards = [
    { label: 'Module', val: E_MODULE_COUNT, desc: 'kompakte Lernbausteine', icon: GraduationCap },
    { label: 'Trainingsfälle', val: VIGNETTE_COUNT, desc: 'für Fallreflexion und Dialog', icon: HeartHandshake },
    { label: 'Netzwerkstellen', val: NETWORK_RESOURCE_COUNT, desc: 'für Triage und Entlastung', icon: MapPin },
    { label: 'Referenzen', val: HOME_REFERENCE_COUNT, desc: 'für fachliche Vertiefung', icon: Library },
  ];

  const pathwaySteps = [
    {
      label: 'Verstehen',
      title: 'Familiendynamik einordnen',
      desc: 'Elternrolle, Belastung, kindliche Perspektive und Schutzfaktoren gemeinsam betrachten.',
    },
    {
      label: 'Einschätzen',
      title: 'Risiken und Ressourcen gewichten',
      desc: 'Krise, Entlastung, Parentifizierung, Routinen und verfügbare Bezugspersonen klären.',
    },
    {
      label: 'Handeln',
      title: 'Nächste Schritte konkret machen',
      desc: 'Psychoedukation, Krisenplan, Gesprächsführung und schriftliche Absprachen alltagstauglich übersetzen.',
    },
    {
      label: 'Vernetzen',
      title: 'Hilfen erreichbar machen',
      desc: 'Offizielle Stellen, Beratung, Kinderangebote und Entlastung passend zur Lage aktivieren.',
    },
  ];

  return (
    <article className="space-y-16 no-print">
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-8 bg-white border border-slate-200 rounded-[3rem] p-8 md:p-16 shadow-sm relative overflow-hidden group">
          <div className="relative z-10">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-10 h-[2px] bg-emerald-500" />
              <span className="text-emerald-600 font-black text-[10px] uppercase tracking-[0.45em]">Systemische Orientierung</span>
            </div>
            <h2 id="page-heading-home" tabIndex={-1} className="text-4xl md:text-7xl font-black mb-8 leading-[1.05] tracking-tight text-slate-900">
              Begleitung ist <span className="text-emerald-600 italic">Beziehungsarbeit</span>.
            </h2>
            <p className="text-lg md:text-2xl text-slate-500 mb-12 leading-relaxed font-light max-w-3xl">
              Interaktive Fachressourcen für die Begleitung von Eltern mit psychischer Belastung – mit Training, systemischer
              Orientierung, Krisenhilfe, Netzwerk und printfähigen Arbeitshilfen.
            </p>
            <div className="flex flex-wrap gap-4 md:gap-6">
              <button
                type="button"
                onClick={() => setActiveTab('elearning')}
                className="bg-slate-900 text-white px-8 py-4 rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-emerald-600 transition-all shadow-xl haptic-btn flex items-center gap-3"
              >
                Training starten <ChevronRight size={18} />
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('toolbox')}
                className="bg-slate-50 text-slate-900 px-8 py-4 rounded-2xl font-black uppercase text-xs tracking-widest border border-slate-200 hover:bg-slate-100 transition-all haptic-btn"
              >
                Toolbox öffnen
              </button>
            </div>

            <div className="mt-10 flex justify-center lg:mt-12 lg:justify-end">
              <div className="w-full max-w-[24rem] overflow-hidden rounded-[2.25rem] border border-slate-200 bg-[#F3F5EF] p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.75)] sm:max-w-[30rem] sm:rounded-[2.5rem] sm:p-4 lg:max-w-[34rem] lg:rounded-[2.75rem] lg:p-6">
                <img
                  src={heroIllustration}
                  alt="Minimalistische Illustration eines Familiensystems mit Nähe, Distanz und Unterstützung"
                  className="aspect-[4/3] w-full rounded-[1.75rem] object-contain object-center sm:aspect-[16/10] sm:rounded-[2rem]"
                />
              </div>
            </div>

            <div className="mt-10 rounded-[2.25rem] border border-emerald-100 bg-emerald-50/70 p-6 md:p-8">
              <div className="text-[10px] font-black uppercase tracking-[0.24em] text-emerald-900 mb-4">Wichtiger Hinweis zur Einordnung</div>
              <div className="space-y-3 text-sm md:text-base text-emerald-950 leading-relaxed">
                <p>
                  Diese Website ist ein ergänzendes psychoedukatives Informationsangebot im Themenfeld Angehörigenarbeit,
                  psychisch belastete Elternschaft und Kinder psychisch erkrankter Eltern. Sie ist keine offizielle
                  Unterseite der Psychiatrischen Universitätsklinik Zürich.
                </p>
                <p>
                  Für offizielle Informationen, Kontaktaufnahme und Beratung ist die Angehörigenberatung der PUK Zürich
                  die primäre Anlaufstelle. Die Website ergänzt diese offizielle Beratung durch vertiefende Orientierung,
                  ersetzt sie aber nicht.
                </p>
              </div>
              <div className="mt-5 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => setActiveTab('zuerich')}
                  className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white px-4 py-2 text-[11px] font-black uppercase tracking-[0.18em] text-emerald-900 hover:bg-emerald-100 transition-colors"
                >
                  Offizielle PUK-Beratung im Angebotsbereich
                </button>
                <a
                  href="https://www.pukzh.ch/patienten-angehoerige/informationen-fuer-angehoerige/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white px-4 py-2 text-[11px] font-black uppercase tracking-[0.18em] text-emerald-900 hover:bg-emerald-100 transition-colors"
                >
                  Offizielle PUK-Seite öffnen <ExternalLink size={14} />
                </a>
              </div>
            </div>
          </div>
          <div className="absolute top-0 right-0 p-8 opacity-[0.04] pointer-events-none group-hover:scale-110 transition-transform duration-1000">
            <Sparkles size={300} />
          </div>
        </div>

        <div className="lg:col-span-4 bg-emerald-900 rounded-[3rem] p-8 md:p-12 text-white flex flex-col justify-center shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-emerald-800/10 mix-blend-overlay" />
          <h4 className="text-[10px] font-black uppercase tracking-[0.35em] mb-6 opacity-70 text-center">Lernfortschritt</h4>
          <div className="rounded-[2rem] bg-white/8 border border-white/10 p-6 mb-6">
            <div className="text-center mb-6">
              <div className="font-black text-5xl tabular-nums tracking-tighter">{progressPercent}%</div>
              <p className="text-sm font-medium leading-relaxed opacity-80 mt-2">
                {completedModules.length} von {E_MODULE_COUNT} Lernmodulen sind bereits bearbeitet.
              </p>
            </div>
            <div className="space-y-3">
              {progressSummaryItems.map((item) => (
                <div key={item.label} className="rounded-[1.25rem] bg-white/8 border border-white/10 px-4 py-3">
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/70">{item.label}</span>
                    <span className="text-lg font-black tabular-nums">{item.value}</span>
                  </div>
                  <p className="text-xs text-white/70 mt-1">{item.note}</p>
                </div>
              ))}
            </div>
          </div>
          <p className="text-xs leading-relaxed opacity-70 text-center">
            Die frühere Kreisgrafik wurde hier bewusst durch eine klarere Textzusammenfassung ersetzt.
          </p>
          {activeTab !== 'vignetten' && (
            <button
              type="button"
              onClick={() => setActiveTab('vignetten')}
              className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-white/10 px-5 py-3 text-[11px] font-black uppercase tracking-[0.2em] hover:bg-white/15"
            >
              Zu den Trainingsfällen <ChevronRight size={14} />
            </button>
          )}
        </div>
      </section>

      <section className="rounded-[3rem] border border-slate-200 bg-white p-8 shadow-sm md:p-12">
        <div className="grid gap-10 xl:grid-cols-[minmax(0,1fr)_18rem] xl:items-start">
          <div>
            <div className="mb-5 flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.24em] text-emerald-700">
              <div className="h-[2px] w-10 bg-emerald-200" />
              Fachdiagramm
            </div>
            <h3 className="text-3xl md:text-4xl font-black tracking-tight text-slate-900">
              Ein möglicher <span className="text-emerald-600 italic">Arbeitsweg</span> durch die Website.
            </h3>
            <p className="mt-5 max-w-4xl text-base md:text-lg leading-relaxed text-slate-600">
              Die Inhalte sind nicht als lose Sammlung gedacht, sondern als fachliche Abfolge: erst verstehen, dann
              einschätzen, daraus konkrete Schritte ableiten und passende Hilfen vernetzen. Das Diagramm bündelt diese
              Logik auf einer Seite.
            </p>
          </div>
          <aside className="rounded-[2rem] border border-slate-200 bg-slate-50 p-6">
            <div className="text-[10px] font-black uppercase tracking-[0.24em] text-slate-500">Einordnung</div>
            <p className="mt-3 text-sm leading-relaxed text-slate-700">
              Kein starres Schema, sondern eine ruhige fachliche Leitstruktur für Orientierung, Triage und Gesprächsplanung.
            </p>
          </aside>
        </div>

        <div className="mt-10 overflow-hidden rounded-[2.5rem] border border-slate-200 bg-[#F6F7F3] p-5 md:p-8">
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-4">
            {pathwaySteps.map((step, index) => (
              <div key={step.label} className="relative">
                <section className="h-full rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
                  <div className="mb-4 inline-flex rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-emerald-700">
                    {step.label}
                  </div>
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
              Leitidee: Gute Begleitung verbindet systemisches Verstehen, pragmatische Einschätzung, klare nächste
              Schritte und aktivierte Unterstützung statt isolierter Einzelentscheidungen.
            </p>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {overviewCards.map((card) => (
          <div
            key={card.label}
            className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
          >
            <div className="text-emerald-600 mb-8 bg-slate-50 w-14 h-14 rounded-2xl flex items-center justify-center shadow-inner">
              <card.icon size={24} strokeWidth={2.3} />
            </div>
            <div className="text-4xl font-black mb-3 text-slate-900 tracking-tighter tabular-nums">{card.val}</div>
            <h3 className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] mb-4">● {card.label}</h3>
            <p className="text-[14px] text-slate-500 leading-relaxed font-medium">{card.desc}</p>
          </div>
        ))}
      </section>
    </article>
  );
}
