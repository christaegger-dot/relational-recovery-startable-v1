import React from 'react';
import { ArrowUpRight, Library, ShieldCheck, Users } from 'lucide-react';

export default function Footer({ setActiveTab }) {
  const footerRoutes = [
    { label: 'Start', tab: 'home', note: 'Dashboard und Orientierung' },
    { label: 'Lernmodule', tab: 'elearning', note: 'Kurzformate für Fachpraxis' },
    { label: 'Training', tab: 'vignetten', note: 'Fallreflexion und Dialog' },
    { label: 'Toolbox', tab: 'toolbox', note: 'Triage, Schutz, nächste Schritte' },
    { label: 'Netzwerk', tab: 'zuerich', note: 'Hilfen, Stellen, Weitervermittlung' },
    { label: 'Evidenz', tab: 'zaesur', note: 'Grundlagen, Vertiefung, Materialien' },
  ];

  return (
    <footer className="mt-20 border-t border-slate-200 bg-[#EEF2EA] px-6 py-20 text-slate-600 no-print" role="contentinfo">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-10 border-b border-slate-200/80 pb-12 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.9fr)_minmax(0,1fr)] lg:items-start">
          <div className="rounded-[2.75rem] border border-white/70 bg-white/70 p-8 shadow-sm">
            <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-emerald-100 bg-emerald-50 px-4 py-2 text-[10px] font-black uppercase tracking-[0.24em] text-emerald-800">
              <Library size={14} />
              Schweizer Fachportal
            </div>
            <h2 className="text-4xl font-black uppercase italic tracking-tighter text-slate-900 md:text-5xl">
              Relational <br /> Recovery
            </h2>
            <p className="mt-6 max-w-md text-sm leading-loose text-slate-600">
              Ergänzendes psychoedukatives Informationsangebot zu psychisch belasteter Elternschaft, Kinderschutz,
              Angehörigenarbeit und alltagsnaher Vernetzung im Versorgungskontext.
            </p>
            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              <div className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-4">
                <div className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-400">Schwerpunkt</div>
                <p className="mt-2 text-sm font-medium leading-relaxed text-slate-700">systemische Orientierung</p>
              </div>
              <div className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-4">
                <div className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-400">Zielgruppe</div>
                <p className="mt-2 text-sm font-medium leading-relaxed text-slate-700">Fachpersonen und Teams</p>
              </div>
              <div className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-4">
                <div className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-400">Format</div>
                <p className="mt-2 text-sm font-medium leading-relaxed text-slate-700">Praxis, Evidenz, Tools</p>
              </div>
            </div>
          </div>

          <div className="rounded-[2.5rem] border border-white/70 bg-white/50 p-8">
            <div className="mb-4 text-[10px] font-black uppercase tracking-[0.35em] text-slate-400">Bereiche</div>
            <div className="space-y-3">
              {footerRoutes.map((route) => (
                <button
                  key={route.tab}
                  type="button"
                  onClick={() => setActiveTab(route.tab)}
                  className="flex w-full items-start justify-between gap-4 rounded-[1.5rem] border border-transparent px-4 py-4 text-left transition-all hover:border-emerald-100 hover:bg-white hover:shadow-sm"
                >
                  <div>
                    <div className="text-[13px] font-black uppercase tracking-[0.18em] text-slate-800">{route.label}</div>
                    <p className="mt-2 text-sm leading-relaxed text-slate-500">{route.note}</p>
                  </div>
                  <ArrowUpRight size={16} className="mt-1 shrink-0 text-slate-400" />
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-[2.5rem] border border-slate-200 bg-slate-900 p-8 text-white shadow-sm">
            <div className="mb-4 text-[10px] font-black uppercase tracking-[0.35em] text-white/55">Einordnung</div>
            <div className="space-y-5">
              <div className="flex items-start gap-4">
                <ShieldCheck size={18} className="mt-1 shrink-0 text-emerald-300" />
                <p className="text-sm leading-relaxed text-white/85">
                  Keine offizielle PUK-Unterseite. Für offizielle Informationen und Beratung nutzen Sie bitte die Angehörigenberatung der PUK Zürich.
                </p>
              </div>
              <div className="flex items-start gap-4">
                <Users size={18} className="mt-1 shrink-0 text-emerald-300" />
                <p className="text-sm leading-relaxed text-white/85">
                  Lokale Speicherung nur im Browser. Sitzung und Lernstand können jederzeit zurückgesetzt werden.
                </p>
              </div>
            </div>
            <div className="mt-8 border-t border-white/10 pt-6 text-[12px] font-medium leading-loose text-white/60">
              © 2026 Relational Recovery Fachportal.
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 pt-8 md:flex-row md:items-center md:justify-between">
          <p className="text-[11px] font-black uppercase tracking-[0.28em] text-slate-400">
            Fachlich ruhig. Systemisch. Praxisnah.
          </p>
          <div className="flex gap-3">
            <div className="h-1 w-12 bg-emerald-600" />
            <div className="h-1 w-8 bg-slate-300" />
            <div className="h-1 w-4 bg-white" />
          </div>
        </div>
      </div>
    </footer>
  );
}
