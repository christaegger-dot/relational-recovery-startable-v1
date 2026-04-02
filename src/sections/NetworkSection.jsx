import React from 'react';
import { ExternalLink, Search, XCircle } from 'lucide-react';
import { NETWORK_FILTERS } from '../data/content';

export default function NetworkSection({ searchTerm, setSearchTerm, filteredResources, activeResourceFilter, setActiveResourceFilter }) {
  const searchStatusText = searchTerm.trim()
    ? `${filteredResources.length} Treffer für ${searchTerm.trim()}.`
    : `${filteredResources.length} Fachstellen werden angezeigt.`;

  const filterStatusText =
    activeResourceFilter === 'all'
      ? 'Es werden alle Fachstellen angezeigt.'
      : `Filter aktiv: ${activeResourceFilter}.`;

  return (
    <article className="space-y-16 no-print">
      <div className="bg-white p-8 md:p-16 rounded-[4rem] shadow-sm border border-slate-100">
        <header className="flex flex-col xl:flex-row justify-between xl:items-end mb-16 gap-10 border-b border-slate-50 pb-12">
          <div className="max-w-2xl">
            <div className="text-emerald-600 font-black text-[11px] uppercase tracking-[0.45em] mb-6 flex items-center gap-4">
              <div className="w-10 h-[2px] bg-emerald-200" /> Triage & Support (CH)
            </div>
            <h2 id="page-heading-zuerich" tabIndex={-1} className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight leading-none">Netzwerk Schweiz</h2>
            <p className="text-slate-500 text-lg font-medium mt-6 leading-relaxed">
              Fachstellen für Akutunterstützung, Entlastung, Kinder- und Angehörigenberatung sowie längerfristige Orientierung im psychiatrischen Kontext.
            </p>
          </div>

          <div className="w-full xl:max-w-[420px]">
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
        </header>

        <div className="mb-10">
          <p className="text-sm text-slate-500 leading-relaxed mb-5 max-w-4xl">
            Das Netzwerk verbindet offizielle Krisenwege, familienbezogene Beratung, spezialisierte Angebote für Kinder und Jugendliche
            sowie längerfristige Entlastung. Die Filter helfen, je nach Lage schneller zwischen Akutunterstützung, Jugendhilfe,
            Suchtthematik, mehrsprachigen Angeboten oder Selbsthilfe zu unterscheiden.
          </p>
          <div className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 mb-4">Filter</div>
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
                className="p-8 bg-slate-50 rounded-[2.5rem] border-2 border-transparent hover:border-emerald-200 hover:bg-white transition-all duration-300 shadow-sm hover:shadow-xl flex flex-col justify-between h-full"
              >
                <div>
                  <div className="flex flex-wrap gap-2 mb-8">
                    {res.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[9px] font-black uppercase bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-full border border-emerald-100 shadow-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h4 className="font-black text-slate-900 text-2xl mb-5 tracking-tight">{res.name}</h4>
                  <p className="text-base text-slate-500 leading-relaxed mb-10 font-medium">{res.info}</p>
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
