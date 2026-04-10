// Design note: Editorial landing composition with warm paper panels, serif-led hierarchy, quieter cards, and high whitespace while preserving the original information architecture.
import { useMemo } from 'react';
import { ChevronRight, ClipboardCheck, ExternalLink, GraduationCap, HeartHandshake, Library, MapPin } from 'lucide-react';
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
    [completedModules.length, progressPercent],
  );

  const overviewCards = [
    { label: 'Module', val: E_MODULE_COUNT, desc: 'kompakte Lernbausteine', icon: GraduationCap, tab: 'elearning' },
    { label: 'Trainingsfälle', val: VIGNETTE_COUNT, desc: 'für Fallreflexion und Dialog', icon: HeartHandshake, tab: 'vignetten' },
    { label: 'Netzwerkstellen', val: NETWORK_RESOURCE_COUNT, desc: 'für Triage und Entlastung', icon: MapPin, tab: 'zuerich' },
    { label: 'Referenzen', val: HOME_REFERENCE_COUNT, desc: 'für fachliche Vertiefung', icon: Library, tab: 'zaesur' },
  ];

  const dashboardRoutes = [
    {
      title: 'Wenn du verstehen willst, was in der Familie passiert',
      desc: 'Belastung, Schutzfaktoren, Elternrolle und kindliche Perspektive fachlich einordnen.',
      target: 'zaesur',
      cta: 'Zu Evidenz',
      icon: Library,
    },
    {
      title: 'Wenn du entscheiden musst, was jetzt prioritär ist',
      desc: 'Assessment, Krisenlogik, Sicherheitsplan und Schutzfragen schrittweise durchgehen.',
      target: 'toolbox',
      cta: 'Zur Toolbox',
      icon: ClipboardCheck,
    },
    {
      title: 'Wenn du triagieren oder weitervermitteln willst',
      desc: 'Offizielle Stellen, Entlastung, Kinderangebote und regionale Hilfen gezielt finden.',
      target: 'zuerich',
      cta: 'Zum Netzwerk',
      icon: MapPin,
    },
    {
      title: 'Wenn du üben oder im Team reflektieren willst',
      desc: 'Mit Lernmodulen und Vignetten Sprache, Einschätzung und Falllogik trainieren.',
      target: 'vignetten',
      cta: 'Zum Training',
      icon: HeartHandshake,
    },
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
    <article className="no-print space-y-10 md:space-y-14 lg:space-y-18">
      <section className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-8 xl:gap-10">
        <div className="editorial-shell relative overflow-hidden rounded-[2.5rem] border border-stone-300/70 bg-[linear-gradient(180deg,rgba(255,252,247,0.96),rgba(248,240,231,0.96))] p-7 shadow-[0_30px_80px_rgba(78,58,42,0.08)] md:p-10 lg:col-span-8 lg:rounded-[3rem] lg:p-12 xl:p-14">
          <div className="absolute inset-x-0 top-0 h-32 bg-[radial-gradient(circle_at_top,rgba(235,138,62,0.12),transparent_70%)]" />
          <div className="relative z-10">
            <div className="mb-6 flex items-center gap-4 md:mb-8">
              <div className="h-px w-12 bg-[#b98967]" />
              <span className="text-[10px] font-extrabold uppercase tracking-[0.34em] text-[#7a4c35]">Systemische Orientierung</span>
            </div>

            <div className="max-w-4xl">
              <h2 id="page-heading-home" tabIndex={-1} className="font-serif text-[2.75rem] font-semibold leading-[0.97] tracking-[-0.04em] text-stone-900 md:text-[4.5rem] xl:text-[5.35rem]">
                Begleitung ist{' '}
                <span className="text-[#a55a42] italic">Beziehungsarbeit</span>.
              </h2>
              <p className="mt-6 max-w-3xl text-lg leading-relaxed text-stone-600 md:text-[1.45rem] md:leading-relaxed">
                Interaktive Fachressourcen für die Begleitung von Eltern mit psychischer Belastung – mit Training,
                systemischer Orientierung, Krisenhilfe, Netzwerk und printfähigen Arbeitshilfen.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap gap-4 md:mt-10 md:gap-5">
              <button
                type="button"
                onClick={() => setActiveTab('elearning')}
                className="haptic-btn inline-flex items-center gap-3 rounded-full bg-[#2f2f28] px-7 py-4 text-[11px] font-extrabold uppercase tracking-[0.18em] text-[#fffaf6] shadow-[0_18px_34px_rgba(47,47,40,0.16)] hover:bg-[#7a4c35]"
              >
                Falllogik trainieren <ChevronRight size={18} />
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('toolbox')}
                className="haptic-btn rounded-full border border-stone-300/80 bg-white/75 px-7 py-4 text-[11px] font-extrabold uppercase tracking-[0.18em] text-stone-800 shadow-[inset_0_1px_0_rgba(255,255,255,0.85)] hover:bg-[#f5ece2]"
              >
                Prioritäten klären
              </button>
            </div>

            <div className="mt-6 rounded-[1.85rem] border border-stone-300/80 bg-white/70 px-5 py-4 lg:hidden">
              <div className="text-[10px] font-extrabold uppercase tracking-[0.24em] text-[#7a4c35]">Lernstand</div>
              <p className="mt-2 text-sm leading-relaxed text-stone-700">
                {completedModules.length} von {E_MODULE_COUNT} Lernmodulen bearbeitet. Das Dashboard unten führt direkt zu den nächsten Arbeitsbereichen.
              </p>
            </div>

            <div className="mt-10 flex justify-center lg:mt-12 lg:justify-end">
              <div className="w-full max-w-[24rem] overflow-hidden rounded-[2rem] border border-stone-300/80 bg-[linear-gradient(180deg,#f6ede2,#efe3d6)] p-3 shadow-[0_24px_50px_rgba(95,69,50,0.10)] sm:max-w-[31rem] sm:p-4 lg:max-w-[35rem] lg:rounded-[2.5rem] lg:p-5">
                <img
                  src={heroIllustration}
                  alt="Minimalistische Illustration eines Familiensystems mit Nähe, Distanz und Unterstützung"
                  className="aspect-[4/3] w-full rounded-[1.65rem] object-contain object-center sm:aspect-[16/10] sm:rounded-[2rem]"
                />
              </div>
            </div>

            <div className="mt-8 rounded-[2rem] border border-[#ddc9b6] bg-[linear-gradient(180deg,rgba(255,248,241,0.95),rgba(246,235,221,0.9))] p-6 md:mt-10 md:p-8">
              <div className="mb-4 text-[10px] font-extrabold uppercase tracking-[0.24em] text-[#7a4c35]">Wichtiger Hinweis zur Einordnung</div>
              <div className="space-y-3 text-sm leading-relaxed text-stone-700 md:text-base">
                <p>
                  Diese Website ist ein ergänzendes psychoedukatives Informationsangebot im Themenfeld Angehörigenarbeit,
                  psychisch belastete Elternschaft und Kinder psychisch erkrankter Eltern. Für offizielle Informationen und Beratung
                  bleibt die Angehörigenberatung der PUK Zürich die zentrale Anlaufstelle.
                </p>
              </div>
              <div className="mt-5 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => setActiveTab('zuerich')}
                  className="inline-flex items-center gap-2 rounded-full border border-[#d9c0a8] bg-white px-4 py-2.5 text-[11px] font-extrabold uppercase tracking-[0.16em] text-stone-800 shadow-[0_10px_24px_rgba(95,69,50,0.06)] transition-colors hover:bg-[#f9f1e7]"
                >
                  Zum Netzwerkbereich mit PUK-Angeboten
                </button>
                <a
                  href="https://www.pukzh.ch/patienten-angehoerige/informationen-fuer-angehoerige/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-[#d9c0a8] bg-white px-4 py-2.5 text-[11px] font-extrabold uppercase tracking-[0.16em] text-stone-800 shadow-[0_10px_24px_rgba(95,69,50,0.06)] transition-colors hover:bg-[#f9f1e7]"
                >
                  Offizielle PUK-Seite öffnen <ExternalLink size={14} />
                </a>
              </div>
            </div>
          </div>
        </div>

        <aside className="hidden lg:flex lg:col-span-4 flex-col justify-between rounded-[3rem] border border-stone-300/70 bg-[linear-gradient(180deg,#3d3128,#262019)] p-8 text-[#fff7ef] shadow-[0_28px_80px_rgba(38,32,25,0.28)] xl:p-10">
          <div>
            <div className="text-center text-[10px] font-extrabold uppercase tracking-[0.34em] text-[#e7d7c6]">Lernfortschritt</div>
            <div className="mt-6 rounded-[2rem] border border-white/10 bg-white/6 p-6 backdrop-blur-sm">
              <div className="text-center">
                <div className="font-serif text-6xl font-semibold tracking-[-0.05em] tabular-nums">{progressPercent}%</div>
                <p className="mx-auto mt-3 max-w-[17rem] text-sm leading-relaxed text-[#efe2d5]">
                  {completedModules.length} von {E_MODULE_COUNT} Lernmodulen sind bereits bearbeitet.
                </p>
              </div>

              <div className="mt-6 space-y-3">
                {progressSummaryItems.map((item) => (
                  <div key={item.label} className="rounded-[1.45rem] border border-white/10 bg-white/6 px-4 py-3">
                    <div className="flex items-center justify-between gap-4">
                      <span className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-[#d9cabb]">{item.label}</span>
                      <span className="text-lg font-extrabold tabular-nums text-white">{item.value}</span>
                    </div>
                    <p className="mt-1 text-xs leading-relaxed text-[#d9cabb]">{item.note}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div>
            <p className="text-center text-xs leading-relaxed text-[#dfd0c1]">
              Die Fortschrittsansicht bleibt bewusst ruhig und textbasiert, damit Orientierung wichtiger ist als reine UI-Inszenierung.
            </p>
            {activeTab !== 'vignetten' && (
              <button
                type="button"
                onClick={() => setActiveTab('vignetten')}
                className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/12 bg-white/8 px-5 py-3 text-[11px] font-extrabold uppercase tracking-[0.18em] text-white transition-colors hover:bg-white/12"
              >
                Zu den Trainingsfällen <ChevronRight size={14} />
              </button>
            )}
          </div>
        </aside>
      </section>

      <section className="rounded-[2.5rem] border border-stone-300/70 bg-[linear-gradient(180deg,rgba(255,251,246,0.96),rgba(247,239,230,0.96))] p-7 shadow-[0_26px_70px_rgba(78,58,42,0.06)] md:p-10 lg:rounded-[3rem] lg:p-12">
        <div className="grid gap-10 xl:grid-cols-[minmax(0,1fr)_18rem] xl:items-start">
          <div>
            <div className="mb-5 flex items-center gap-4 text-[10px] font-extrabold uppercase tracking-[0.24em] text-[#7a4c35]">
              <div className="h-px w-10 bg-[#b98967]" />
              Fachdiagramm
            </div>
            <h3 className="font-serif text-3xl font-semibold tracking-[-0.03em] text-stone-900 md:text-5xl">
              Ein möglicher <span className="text-[#a55a42] italic">Arbeitsweg</span> durch die Website.
            </h3>
            <p className="mt-5 max-w-4xl text-base leading-relaxed text-stone-600 md:text-lg">
              Die Inhalte sind nicht als lose Sammlung gedacht, sondern als fachliche Abfolge: erst verstehen, dann einschätzen,
              daraus konkrete Schritte ableiten und passende Hilfen vernetzen. Das Diagramm bündelt diese Logik auf einer Seite.
            </p>
          </div>
          <aside className="rounded-[1.85rem] border border-stone-300/80 bg-white/70 p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)]">
            <div className="text-[10px] font-extrabold uppercase tracking-[0.24em] text-[#7a4c35]">Einordnung</div>
            <p className="mt-3 text-sm leading-relaxed text-stone-700">
              Kein starres Schema, sondern eine ruhige fachliche Leitstruktur für Orientierung, Triage und Gesprächsplanung.
            </p>
          </aside>
        </div>

        <div className="mt-10 overflow-hidden rounded-[2.2rem] border border-stone-300/80 bg-[linear-gradient(180deg,#f6eee3,#efe3d6)] p-5 md:p-8">
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-4 lg:gap-5">
            {pathwaySteps.map((step, index) => (
              <div key={step.label} className="relative">
                <section className="h-full rounded-[1.8rem] border border-stone-300/80 bg-white/86 p-6 shadow-[0_18px_38px_rgba(93,68,51,0.05)]">
                  <div className="mb-4 inline-flex rounded-full border border-[#e4d2c1] bg-[#fbf2e8] px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-[0.18em] text-[#7a4c35]">
                    {step.label}
                  </div>
                  <h4 className="font-serif text-2xl font-semibold tracking-[-0.03em] text-stone-900">{step.title}</h4>
                  <p className="mt-4 text-sm leading-relaxed text-stone-600">{step.desc}</p>
                </section>

                {index < pathwaySteps.length - 1 && (
                  <>
                    <div className="absolute right-[-0.85rem] top-1/2 hidden h-px w-7 -translate-y-1/2 bg-[#c69f7d] lg:block" />
                    <div className="absolute right-[-0.6rem] top-1/2 hidden h-2.5 w-2.5 -translate-y-1/2 rotate-45 border-r-2 border-t-2 border-[#c69f7d] lg:block" />
                    <div className="mx-auto mt-4 flex h-8 w-8 items-center justify-center rounded-full border border-[#d9c0a8] bg-white text-[#7a4c35] lg:hidden">
                      <ChevronRight size={16} />
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>

          <div className="mt-6 rounded-[1.6rem] border border-[#d9c0a8] bg-white/72 px-5 py-4">
            <p className="text-sm leading-relaxed font-medium text-stone-800">
              Leitidee: Gute Begleitung verbindet systemisches Verstehen, pragmatische Einschätzung, klare nächste Schritte und aktivierte Unterstützung statt isolierter Einzelentscheidungen.
            </p>
          </div>
        </div>
      </section>

      <section className="rounded-[2.5rem] border border-stone-300/70 bg-[linear-gradient(180deg,rgba(248,240,231,0.96),rgba(244,234,223,0.96))] p-7 shadow-[0_26px_70px_rgba(78,58,42,0.06)] md:p-10 lg:rounded-[3rem] lg:p-12">
        <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_18rem] xl:items-start">
          <div>
            <div className="mb-5 flex items-center gap-4 text-[10px] font-extrabold uppercase tracking-[0.24em] text-[#7a4c35]">
              <div className="h-px w-10 bg-[#b98967]" />
              Navigations-Dashboard
            </div>
            <h3 className="font-serif text-3xl font-semibold tracking-[-0.03em] text-stone-900 md:text-5xl">
              Einstieg nach <span className="text-[#a55a42] italic">Fachfrage</span> statt nach Menüpunkt.
            </h3>
            <p className="mt-5 max-w-4xl text-base leading-relaxed text-stone-600 md:text-lg">
              Die Startseite funktioniert am besten, wenn typische Praxisanliegen direkt in den passenden Bereich führen. Die Karten unten übersetzen häufige Arbeitsfragen in klare Einstiegswege.
            </p>
          </div>
          <aside className="rounded-[1.85rem] border border-stone-300/80 bg-white/75 p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)]">
            <div className="text-[10px] font-extrabold uppercase tracking-[0.24em] text-[#7a4c35]">Orientierung</div>
            <p className="mt-3 text-sm leading-relaxed text-stone-700">
              Weniger suchen, schneller einsteigen: Verstehen, entscheiden, triagieren oder trainieren.
            </p>
          </aside>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-5 lg:grid-cols-2">
          {dashboardRoutes.map((route) => (
            <button
              key={route.title}
              type="button"
              onClick={() => setActiveTab(route.target)}
              className="rounded-[2rem] border border-stone-300/80 bg-white/86 p-6 text-left shadow-[0_18px_40px_rgba(93,68,51,0.05)] transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-[0_24px_50px_rgba(93,68,51,0.08)]"
            >
              <div className="flex items-start gap-5">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-[1.2rem] border border-[#e4d2c1] bg-[#fbf2e8] text-[#7a4c35]">
                  <route.icon size={24} strokeWidth={2.1} />
                </div>
                <div className="min-w-0">
                  <h4 className="font-serif text-2xl font-semibold tracking-[-0.03em] text-stone-900">{route.title}</h4>
                  <p className="mt-3 text-sm leading-relaxed text-stone-600">{route.desc}</p>
                  <div className="mt-5 inline-flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-[0.16em] text-[#8d3f32]">
                    {route.cta} <ChevronRight size={14} />
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </section>

      <section className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
        {overviewCards.map((card) => (
          <button
            key={card.label}
            type="button"
            onClick={() => setActiveTab(card.tab)}
            className="rounded-[2rem] border border-stone-300/75 bg-[linear-gradient(180deg,rgba(255,252,247,0.95),rgba(248,240,231,0.95))] p-7 text-left shadow-[0_22px_44px_rgba(93,68,51,0.05)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_26px_54px_rgba(93,68,51,0.08)]"
          >
            <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-[1.2rem] border border-[#e4d2c1] bg-white/90 text-[#7a4c35] shadow-[inset_0_1px_0_rgba(255,255,255,0.82)]">
              <card.icon size={24} strokeWidth={2.1} />
            </div>
            <div className="font-serif text-5xl font-semibold tracking-[-0.05em] text-stone-900 tabular-nums">{card.val}</div>
            <h3 className="mt-3 text-[10px] font-extrabold uppercase tracking-[0.22em] text-[#8a705f]">● {card.label}</h3>
            <p className="mt-4 text-[15px] leading-relaxed text-stone-600">{card.desc}</p>
            <div className="mt-5 inline-flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-[0.16em] text-[#8d3f32]">
              Bereich öffnen <ChevronRight size={14} />
            </div>
          </button>
        ))}
      </section>
    </article>
  );
}
