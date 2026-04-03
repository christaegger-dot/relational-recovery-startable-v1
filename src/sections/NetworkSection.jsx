import React, { useMemo, useState } from 'react';
import { ExternalLink, MapPin, Search, XCircle } from 'lucide-react';
import {
  NETWORK_FILTERS,
  NETWORK_MAP_LENSES,
  NETWORK_MAP_QUESTIONS,
  NETWORK_MAP_STEPS,
  NETWORK_MAP_TEMPLATE_NODES,
  RESOURCE_DATA,
} from '../data/networkContent';

export default function NetworkSection({ searchTerm, setSearchTerm, activeResourceFilter, setActiveResourceFilter }) {
  const [networkLens, setNetworkLens] = useState('all');

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

  const activeLens = NETWORK_MAP_LENSES.find((lens) => lens.id === networkLens) ?? NETWORK_MAP_LENSES[0];
  const visibleMapNodes = NETWORK_MAP_TEMPLATE_NODES.filter((node) => networkLens === 'all' || node.tone === networkLens);
  const privateCount = NETWORK_MAP_TEMPLATE_NODES.filter((node) => node.tone === 'private').length;
  const supportCount = NETWORK_MAP_TEMPLATE_NODES.filter((node) => node.tone === 'support').length;
  const formalCount = NETWORK_MAP_TEMPLATE_NODES.filter((node) => node.tone === 'formal').length;
  const gapCount = NETWORK_MAP_TEMPLATE_NODES.filter((node) => node.tone === 'gap').length;

  const getNodeToneClass = (tone) => {
    if (tone === 'private') return 'border-emerald-200 bg-emerald-50 text-emerald-900';
    if (tone === 'support') return 'border-sky-200 bg-sky-50 text-sky-900';
    if (tone === 'formal') return 'border-slate-200 bg-white text-slate-800';
    return 'border-amber-200 bg-amber-50 text-amber-950';
  };

  const lensSummary =
    networkLens === 'gap'
      ? 'Die Karte macht sichtbar, wo Mitwissende, Betreuung oder formelle Absicherung noch fehlen.'
      : networkLens === 'private'
        ? 'Im Fokus stehen tragende persönliche Beziehungen und emotionale Nähe im Alltag.'
        : networkLens === 'support'
          ? 'Im Fokus stehen alltagsnahe Stützen wie Schule, Betreuung und entlastende Außenbezüge.'
          : networkLens === 'formal'
            ? 'Im Fokus stehen professionelle Kontakte und institutionelle Mitverantwortung.'
            : 'Das Gesamtbild verbindet private, unterstützende, formelle und noch fehlende Netzwerkbausteine.';

  const nextStepText =
    networkLens === 'gap'
      ? 'Nächster Schritt: fehlende Mitwissende, Kinderbetreuung und formelle Absicherung zuerst konkret benennen.'
      : networkLens === 'private'
        ? 'Nächster Schritt: klären, wer wirklich informiert ist und in belasteten Phasen kurzfristig mittragen kann.'
        : networkLens === 'support'
          ? 'Nächster Schritt: Tagesstruktur, Schule, Betreuung und entlastende Außenkontakte verbindlicher verankern.'
          : networkLens === 'formal'
            ? 'Nächster Schritt: Zuständigkeiten, Erreichbarkeit und Rückmeldewege mit Fachstellen konkretisieren.'
            : 'Nächster Schritt: Mischung, Lücken und Erreichbarkeit gemeinsam lesen und daraus konkrete Absprachen ableiten.';

  const highlightedNode = visibleMapNodes[0] ?? null;

  return (
    <article className="space-y-16 no-print">
      <div className="rounded-[4rem] border border-slate-200 bg-white p-8 shadow-sm md:p-16">
        <header className="mb-16 grid gap-10 border-b border-slate-100 pb-12 xl:grid-cols-[minmax(0,1fr)_22rem] xl:items-end">
          <div className="max-w-3xl">
            <div className="mb-6 flex items-center gap-4 text-[11px] font-black uppercase tracking-[0.45em] text-emerald-700">
              <div className="h-[2px] w-10 bg-emerald-200" /> Triage & Support (Zürich + CH)
            </div>
            <h2 id="page-heading-zuerich" tabIndex={-1} className="text-4xl font-black leading-none tracking-tight text-slate-900 md:text-6xl">Netzwerk Zürich mit schweizweiten Ergänzungen</h2>
            <p className="mt-6 text-lg leading-relaxed text-slate-600">
              Zürich-zentrierte Fachstellen für Akutunterstützung, Entlastung, Kinder- und Angehörigenberatung sowie einige schweizweite Ergänzungen für Orientierung und Rechtefragen.
            </p>
          </div>
          <aside className="rounded-[2rem] border border-slate-200 bg-slate-50 p-6">
            <div className="text-[10px] font-black uppercase tracking-[0.24em] text-slate-500">Einordnung</div>
            <p className="mt-3 text-sm leading-relaxed text-slate-700">
              Der Bereich ist bewusst Zürich-zentriert angelegt: offizielle Krisenwege, Familienberatung,
              Kinder- und Jugendangebote sowie längerfristige Entlastung in und um Zürich, ergänzt um wenige nationale Stellen.
            </p>
          </aside>
        </header>

        <div className="mb-10 grid gap-8 xl:grid-cols-[minmax(0,1fr)_26rem] xl:items-start">
          <div>
            <p className="mb-5 max-w-4xl text-sm leading-relaxed text-slate-500">
              Das Netzwerk verbindet offizielle Krisenwege, familienbezogene Beratung, spezialisierte Angebote für Kinder und Jugendliche
              sowie längerfristige Entlastung. Der Schwerpunkt liegt auf Zürich und Winterthur; einzelne schweizweite Stellen
              bleiben ergänzend sichtbar. Die Filter helfen, je nach Lage schneller zwischen Akutunterstützung, Jugendhilfe,
              Suchtthematik, mehrsprachigen Angeboten oder Selbsthilfe zu unterscheiden.
            </p>
            <fieldset>
              <legend className="mb-4 text-[11px] font-black uppercase tracking-[0.2em] text-slate-400">Filter</legend>
              <div className="flex flex-wrap gap-2">
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
            </fieldset>
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

        <div className="mb-8 rounded-[2rem] border border-slate-200 bg-slate-50 p-5 lg:hidden">
          <div className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Direkter Einstieg</div>
          <p className="mt-2 text-sm leading-relaxed text-slate-700">
            Die Trefferliste folgt direkt nach diesem Block. Die Netzwerkkarte darunter dient als ergänzende Arbeitshilfe für Gespräche und Fallreflexion.
          </p>
        </div>

        {filteredResources.length === 0 ? (
          <div className="py-20 text-center flex flex-col items-center">
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
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {filteredResources.map((res) => (
              <section
                key={res.name}
                className="flex h-full flex-col justify-between rounded-[2.5rem] border border-slate-200 bg-slate-50 p-6 md:p-8 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-emerald-200 hover:bg-white hover:shadow-lg"
              >
                <div>
                  <div className="mb-6 flex flex-wrap gap-2">
                    {res.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[9px] font-black uppercase bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-full border border-emerald-100 shadow-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h4 className="mb-4 text-2xl font-black tracking-tight text-slate-900">{res.name}</h4>
                  <p className="mb-8 text-base leading-relaxed text-slate-600">{res.info}</p>
                </div>
                <a
                  href={res.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] font-black text-slate-900 uppercase tracking-[0.25em] flex items-center justify-between hover:text-emerald-600 transition-all border-t-2 pt-6 border-slate-100"
                >
                  <span>Webseite öffnen</span>
                  <ExternalLink size={22} strokeWidth={2.5} />
                </a>
              </section>
            ))}
          </div>
        )}

        <section className="mb-10 mt-10 rounded-[3rem] border border-emerald-100 bg-emerald-50/70 p-6 md:p-8 shadow-sm">
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
              <div className="mb-5 flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
              <div>
                <div className="text-[10px] font-black uppercase tracking-[0.24em] text-slate-500">Nutzbare Netzwerkkarte</div>
                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-600">
                  Die Mitte steht für das Kind oder die Familie. Über die Linsen lässt sich prüfen, ob privates Umfeld,
                  Alltagsstützen, Fachstellen und Versorgungslücken ausreichend sichtbar werden.
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                {NETWORK_MAP_LENSES.map((lens) => (
                  <button
                    key={lens.id}
                    type="button"
                    onClick={() => setNetworkLens(lens.id)}
                    aria-pressed={networkLens === lens.id}
                    className={`rounded-full border px-4 py-2 text-[10px] font-black uppercase tracking-[0.18em] transition-colors haptic-btn ${
                      networkLens === lens.id
                        ? 'border-emerald-200 bg-emerald-50 text-emerald-900'
                        : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-white'
                    }`}
                  >
                    {lens.label}
                  </button>
                ))}
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

                  {visibleMapNodes.map((node) => {
                    return (
                      <div
                        key={node.label}
                        className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-[1.5rem] border px-4 py-3 text-center shadow-sm transition-all ${
                          highlightedNode?.label === node.label ? 'ring-2 ring-emerald-300 ring-offset-2 ring-offset-[#F6F7F3]' : ''
                        } ${getNodeToneClass(node.tone)}`}
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
                  {visibleMapNodes.map((node) => {
                    return (
                      <div
                        key={node.label}
                        className={`rounded-[1.5rem] border p-4 text-center shadow-sm ${
                          highlightedNode?.label === node.label ? 'ring-2 ring-emerald-300 ring-offset-2 ring-offset-white' : ''
                        } ${getNodeToneClass(node.tone)}`}
                        style={{ gridRow: node.mobileRow, gridColumn: node.mobileCol }}
                      >
                        <div className="text-[11px] font-black leading-tight">{node.label}</div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <aside className="rounded-[2rem] border border-slate-200 bg-slate-50 p-6">
                <div className="text-[10px] font-black uppercase tracking-[0.24em] text-slate-500">Aktive Lesart</div>
                <h4 className="mt-3 text-lg font-black tracking-tight text-slate-900">{activeLens.label}</h4>
                <p className="mt-3 text-sm leading-relaxed text-slate-700">{activeLens.description}</p>
                <div className="mt-4 rounded-[1.5rem] border border-emerald-100 bg-emerald-50/70 p-4">
                  <div className="text-[10px] font-black uppercase tracking-[0.18em] text-emerald-800">Fokus dieser Linse</div>
                  <p className="mt-2 text-sm leading-relaxed text-emerald-950">{lensSummary}</p>
                </div>
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

                <div className="mt-6 grid grid-cols-2 gap-3">
                  <div className="rounded-[1.25rem] border border-emerald-200 bg-emerald-50 p-4">
                    <div className="text-[10px] font-black uppercase tracking-[0.18em] text-emerald-800">Privat</div>
                    <div className="mt-2 text-xl font-black text-emerald-950">{privateCount}</div>
                  </div>
                  <div className="rounded-[1.25rem] border border-sky-200 bg-sky-50 p-4">
                    <div className="text-[10px] font-black uppercase tracking-[0.18em] text-sky-800">Alltag</div>
                    <div className="mt-2 text-xl font-black text-sky-950">{supportCount}</div>
                  </div>
                  <div className="rounded-[1.25rem] border border-slate-200 bg-white p-4">
                    <div className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-600">Formal</div>
                    <div className="mt-2 text-xl font-black text-slate-900">{formalCount}</div>
                  </div>
                  <div className="rounded-[1.25rem] border border-amber-200 bg-amber-50 p-4">
                    <div className="text-[10px] font-black uppercase tracking-[0.18em] text-amber-800">Lücken</div>
                    <div className="mt-2 text-xl font-black text-amber-950">{gapCount}</div>
                  </div>
                </div>

                <div className="mt-6 rounded-[1.5rem] border border-slate-200 bg-white p-4">
                  <div className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-500">Nächster Schritt</div>
                  <p className="mt-2 text-sm leading-relaxed text-slate-700">{nextStepText}</p>
                </div>
              </aside>
            </div>

            <div className="mt-6 rounded-[2rem] border border-slate-200 bg-slate-50 p-5">
              <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_18rem] xl:items-start">
                <div>
                  <div className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-400">Arbeitsauswertung</div>
                  <p className="mt-3 text-sm leading-relaxed text-slate-700">
                    Die Karte wird am nützlichsten, wenn nach dem Visualisieren drei Fragen folgen:
                    Wer trägt schon? Wo ist die Lage brüchig? Was muss als Nächstes konkret abgesprochen werden?
                  </p>
                </div>
                <div className="rounded-[1.5rem] border border-white bg-white p-4 shadow-sm">
                  <div className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-500">Leitfragen danach</div>
                  <div className="mt-3 space-y-2">
                    <p className="text-sm leading-relaxed text-slate-700">Wer weiss bereits Bescheid?</p>
                    <p className="text-sm leading-relaxed text-slate-700">Wer könnte Kinder kurzfristig übernehmen?</p>
                    <p className="text-sm leading-relaxed text-slate-700">Welche Stelle fehlt noch im Netzwerk?</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {visibleMapNodes.map((node) => (
                <section
                  key={node.label}
                  className={`rounded-[1.75rem] border p-5 shadow-sm transition-all ${
                    highlightedNode?.label === node.label ? 'border-emerald-300 shadow-md' : ''
                  } ${getNodeToneClass(node.tone)}`}
                >
                  <div className="text-[10px] font-black uppercase tracking-[0.18em] opacity-80">
                    {node.zone === 'near' ? 'nahe Ebene' : node.zone === 'mid' ? 'tragende Ebene' : node.zone === 'outer' ? 'äussere Ebene' : 'Versorgungslücke'}
                  </div>
                  <h4 className="mt-3 text-base font-black tracking-tight">{node.label}</h4>
                  <p className="mt-3 text-sm leading-relaxed">{node.detail}</p>
                </section>
              ))}
            </div>
          </div>
        </section>

      </div>
    </article>
  );
}
