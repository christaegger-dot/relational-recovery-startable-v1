import React, { useMemo } from 'react';
import { ExternalLink, MapPin, Search, XCircle } from 'lucide-react';
import { NETWORK_FILTERS, NETWORK_MAP_QUESTIONS, NETWORK_MAP_STEPS, RESOURCE_DATA } from '../data/networkContent';

export default function NetworkSection({ searchTerm, setSearchTerm, activeResourceFilter, setActiveResourceFilter }) {
  const networkExampleNodes = [
    { label: 'Partner:in', tone: 'primary', mobileRow: '1 / span 1', mobileCol: '2 / span 2', desktopTop: '22%', desktopLeft: '48%' },
    { label: 'Grosseltern', tone: 'primary', mobileRow: '2 / span 1', mobileCol: '1 / span 2', desktopTop: '48%', desktopLeft: '16%' },
    { label: 'Schule / Kita', tone: 'support', mobileRow: '2 / span 1', mobileCol: '3 / span 2', desktopTop: '49%', desktopLeft: '80%' },
    { label: 'Freund:in des Kindes', tone: 'support', mobileRow: '3 / span 1', mobileCol: '1 / span 2', desktopTop: '76%', desktopLeft: '30%' },
    { label: 'PUK / kjz', tone: 'formal', mobileRow: '3 / span 1', mobileCol: '3 / span 2', desktopTop: '74%', desktopLeft: '69%' },
  ];

  const filteredResources = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();

    return RESOURCE_DATA.filter((res) => {
      const matchesSearch =
        !q ||
        res.name.toLowerCase().includes(q) ||
        res.info.toLowerCase().includes(q) ||
        res.tags.some((tag) => tag.toLowerCase().includes(q));

      const matchesFilter = activeResourceFilter === 'all' || res.tags.includes(activeResourceFilter);
      return matchesSearch && matchesFilter;
    });
  }, [searchTerm, activeResourceFilter]);

  const searchStatusText = searchTerm.trim()
    ? `${filteredResources.length} Treffer für ${searchTerm.trim()}.`
    : `${filteredResources.length} Fachstellen werden angezeigt.`;

  const filterStatusText =
    activeResourceFilter === 'all'
      ? 'Es werden alle Fachstellen angezeigt.'
      : `Filter aktiv: ${activeResourceFilter}.`;

  return (
    <article className="space-y-16 no-print">
      <div className="rounded-[4rem] border border-slate-200 bg-white p-8 shadow-sm md:p-16">
        <header className="mb-16 grid gap-10 border-b border-slate-100 pb-12 xl:grid-cols-[minmax(0,1fr)_22rem] xl:items-end">
          <div className="max-w-3xl">
            <div className="mb-6 flex items-center gap-4 text-[11px] font-black uppercase tracking-[0.45em] text-emerald-700">
              <div className="h-[2px] w-10 bg-emerald-200" /> Triage & Support (CH)
            </div>
            <h2 id="page-heading-zuerich" tabIndex={-1} className="text-4xl font-black leading-none tracking-tight text-slate-900 md:text-6xl">Netzwerk Schweiz</h2>
            <p className="mt-6 text-lg leading-relaxed text-slate-600">
              Fachstellen für Akutunterstützung, Entlastung, Kinder- und Angehörigenberatung sowie längerfristige Orientierung im psychiatrischen Kontext.
            </p>
          </div>
          <aside className="rounded-[2rem] border border-slate-200 bg-slate-50 p-6">
            <div className="text-[10px] font-black uppercase tracking-[0.24em] text-slate-500">Einordnung</div>
            <p className="mt-3 text-sm leading-relaxed text-slate-700">
              Der Bereich ist als fachliche Such- und Filterhilfe gedacht: offizielle Krisenwege, Familienberatung,
              Kinder- und Jugendangebote sowie längerfristige Entlastung in einer ruhigen Übersicht.
            </p>
          </aside>
        </header>

        <div className="mb-10 grid gap-8 xl:grid-cols-[minmax(0,1fr)_26rem] xl:items-start">
          <div>
            <p className="mb-5 max-w-4xl text-sm leading-relaxed text-slate-500">
              Das Netzwerk verbindet offizielle Krisenwege, familienbezogene Beratung, spezialisierte Angebote für Kinder und Jugendliche
              sowie längerfristige Entlastung. Die Filter helfen, je nach Lage schneller zwischen Akutunterstützung, Jugendhilfe,
              Suchtthematik, mehrsprachigen Angeboten oder Selbsthilfe zu unterscheiden.
            </p>
            <div className="mb-4 text-[11px] font-black uppercase tracking-[0.2em] text-slate-400">Filter</div>
            <div className="flex flex-wrap gap-2" aria-label="Netzwerkfilter">
              {NETWORK_FILTERS.map((filter) => (
                <button
                  key={filter.id}
                  type="button"
                  onClick={() => setActiveResourceFilter(filter.id)}
                  className={`rounded-full border px-4 py-2 text-[11px] font-black uppercase tracking-[0.18em] transition-colors ${
                    activeResourceFilter === filter.id
                      ? 'border-emerald-200 bg-emerald-50 text-emerald-900'
                      : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                  }`}
                  aria-pressed={activeResourceFilter === filter.id}
                >
                  {filter.label}
                </button>
              ))}
            </div>
            <p className="sr-only" role="status" aria-live="polite" aria-atomic="true">
              {filterStatusText}
            </p>
          </div>

          <div className="w-full">
            <label htmlFor="resource-search" className="block text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 mb-3">
              Fachstelle suchen
            </label>
            <div className="relative group">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-emerald-600 transition-all duration-300" size={20} strokeWidth={2.5} />
              <input
                id="resource-search"
                type="text"
                placeholder="Name, Schlagwort oder Tag"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-16 pr-6 py-5 bg-slate-50 border-2 border-slate-100 rounded-[2rem] focus:border-emerald-500 focus:outline-none focus:bg-white transition-all font-bold text-base shadow-inner placeholder:text-slate-300"
                aria-describedby="resource-search-status"
              />
            </div>
            <p id="resource-search-status" role="status" aria-live="polite" aria-atomic="true" className="sr-only">
              {searchStatusText}
            </p>
          </div>
        </div>

        <section className="mb-10 rounded-[3rem] border border-emerald-100 bg-emerald-50/70 p-6 md:p-8 shadow-sm">
          <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_24rem] xl:items-start">
            <div>
              <div className="mb-4 flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.24em] text-emerald-900">
                <MapPin size={16} /> Netzwerkkarte als Arbeitshilfe
              </div>
              <p className="max-w-4xl text-sm leading-relaxed text-slate-700">
                Netzwerke werden oft erst sichtbar, wenn sie konkret gesammelt und geordnet werden: Wer gehört dazu,
                wer ist emotional nah, wer ist erreichbar, wer weiss Bescheid und wo fehlen tragende Beziehungen? Eine
                einfache Netzwerkkarte kann diese Klärung deutlich erleichtern.
              </p>

              <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                {NETWORK_MAP_STEPS.map((step) => (
                  <div key={step} className="rounded-[1.5rem] border border-emerald-100 bg-white/90 p-5">
                    <p className="text-sm leading-relaxed font-medium text-slate-800">{step}</p>
                  </div>
                ))}
              </div>
            </div>

            <aside className="rounded-[2rem] border border-emerald-200 bg-white/80 p-6">
              <div className="text-[10px] font-black uppercase tracking-[0.24em] text-emerald-800 mb-4">Leitfragen für die Exploration</div>
              <div className="space-y-3">
                {NETWORK_MAP_QUESTIONS.map((question) => (
                  <div key={question} className="flex items-start gap-3">
                    <span className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-emerald-600" />
                    <p className="text-sm leading-relaxed text-slate-700">{question}</p>
                  </div>
                ))}
              </div>
            </aside>
          </div>

          <div className="mt-8 rounded-[2.5rem] border border-emerald-100 bg-white p-5 md:p-8">
            <div className="mb-5 flex items-center justify-between gap-4">
              <div>
                <div className="text-[10px] font-black uppercase tracking-[0.24em] text-slate-500">Beispiel-Visualisierung</div>
                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-600">
                  Die Mitte steht für das Kind oder die Familie. Je näher ein Kontakt platziert ist, desto tragender oder emotional näher wird er aktuell erlebt.
                </p>
              </div>
              <div className="hidden md:flex flex-wrap justify-end gap-2">
                <span className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-emerald-800">
                  nah
                </span>
                <span className="rounded-full border border-sky-200 bg-sky-50 px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-sky-800">
                  unterstützend
                </span>
                <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-slate-700">
                  formell
                </span>
              </div>
            </div>

            <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_18rem] lg:items-start">
              <div>
                <div className="relative hidden min-h-[30rem] overflow-hidden rounded-[2.25rem] border border-slate-200 bg-[#F6F7F3] lg:block">
                  <div className="absolute left-1/2 top-1/2 h-[11rem] w-[11rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-emerald-200 bg-white/90" />
                  <div className="absolute left-1/2 top-1/2 h-[18rem] w-[18rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-emerald-200/90" />
                  <div className="absolute left-1/2 top-1/2 h-[26rem] w-[26rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-slate-200" />

                  <div className="absolute left-1/2 top-1/2 flex h-28 w-28 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-slate-300 bg-slate-900 text-center shadow-lg">
                    <div>
                      <div className="text-[10px] font-black uppercase tracking-[0.18em] text-white/70">Zentrum</div>
                      <div className="mt-2 text-sm font-black leading-tight text-white">Kind / Familie</div>
                    </div>
                  </div>

                  {networkExampleNodes.map((node) => {
                    const toneClass =
                      node.tone === 'primary'
                        ? 'border-emerald-200 bg-emerald-50 text-emerald-900'
                        : node.tone === 'support'
                          ? 'border-sky-200 bg-sky-50 text-sky-900'
                          : 'border-slate-200 bg-white text-slate-800';

                    return (
                      <div
                        key={node.label}
                        className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-[1.5rem] border px-4 py-3 text-center shadow-sm ${toneClass}`}
                        style={{ top: node.desktopTop, left: node.desktopLeft }}
                      >
                        <div className="text-[11px] font-black leading-tight tracking-[0.08em]">{node.label}</div>
                      </div>
                    );
                  })}
                </div>

                <div className="grid grid-cols-4 gap-3 lg:hidden">
                  <div className="col-span-4 rounded-[1.75rem] border border-slate-300 bg-slate-900 p-5 text-center shadow-sm">
                    <div className="text-[10px] font-black uppercase tracking-[0.18em] text-white/70">Zentrum</div>
                    <div className="mt-2 text-sm font-black text-white">Kind / Familie</div>
                  </div>
                  {networkExampleNodes.map((node) => {
                    const toneClass =
                      node.tone === 'primary'
                        ? 'border-emerald-200 bg-emerald-50 text-emerald-900'
                        : node.tone === 'support'
                          ? 'border-sky-200 bg-sky-50 text-sky-900'
                          : 'border-slate-200 bg-white text-slate-800';

                    return (
                      <div
                        key={node.label}
                        className={`rounded-[1.5rem] border p-4 text-center shadow-sm ${toneClass}`}
                        style={{ gridRow: node.mobileRow, gridColumn: node.mobileCol }}
                      >
                        <div className="text-[11px] font-black leading-tight">{node.label}</div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <aside className="rounded-[2rem] border border-slate-200 bg-slate-50 p-6">
                <div className="text-[10px] font-black uppercase tracking-[0.24em] text-slate-500">Wie man die Visualisierung liest</div>
                <div className="mt-4 space-y-3">
                  <p className="text-sm leading-relaxed text-slate-700">
                    <span className="font-black text-slate-900">Nähe:</span> Innen liegende Kontakte sind oft emotional näher oder im Alltag relevanter.
                  </p>
                  <p className="text-sm leading-relaxed text-slate-700">
                    <span className="font-black text-slate-900">Mischung:</span> Gute Netzwerke bestehen meist aus privaten, unterstützenden und formellen Kontakten.
                  </p>
                  <p className="text-sm leading-relaxed text-slate-700">
                    <span className="font-black text-slate-900">Lücken:</span> Fehlen Schule, Verwandte oder Fachstellen ganz, wird das schnell sichtbar.
                  </p>
                  <p className="text-sm leading-relaxed text-slate-700">
                    <span className="font-black text-slate-900">Dynamik:</span> Eine Netzwerkkarte ist nie endgültig, sondern bildet eine aktuelle Situation ab.
                  </p>
                </div>
              </aside>
            </div>
          </div>
        </section>

        {filteredResources.length === 0 ? (
          <div className="py-28 text-center flex flex-col items-center">
            <XCircle size={72} className="text-slate-100 mb-6" />
            <h3 className="text-2xl font-black text-slate-400 uppercase tracking-widest">Keine Treffer gefunden</h3>
            <button
              type="button"
              onClick={() => setSearchTerm('')}
              className="mt-6 text-emerald-600 font-black uppercase text-[10px] tracking-[0.35em] underline underline-offset-8 decoration-2 haptic-btn"
            >
              Suche zurücksetzen
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {filteredResources.map((res) => (
              <section
                key={res.name}
                className="flex h-full flex-col justify-between rounded-[2.5rem] border border-slate-200 bg-slate-50 p-8 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-emerald-200 hover:bg-white hover:shadow-lg"
              >
                <div>
                  <div className="mb-8 flex flex-wrap gap-2">
                    {res.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[9px] font-black uppercase bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-full border border-emerald-100 shadow-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h4 className="mb-5 text-2xl font-black tracking-tight text-slate-900">{res.name}</h4>
                  <p className="mb-10 text-base leading-relaxed text-slate-600">{res.info}</p>
                </div>
                <a
                  href={res.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] font-black text-slate-900 uppercase tracking-[0.25em] flex items-center justify-between hover:text-emerald-600 transition-all border-t-2 pt-8 border-slate-100"
                >
                  <span>Webseite öffnen</span>
                  <ExternalLink size={22} strokeWidth={2.5} />
                </a>
              </section>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}
