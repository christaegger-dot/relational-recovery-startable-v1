// Design note: Editorial footer with warm layered panels, serif brand close, and calmer navigation rhythm that extends the paper-like interface language.
import { ArrowUpRight, Library, ShieldCheck, Users } from 'lucide-react';
import { TAB_ITEMS } from '../data/appShellContent';

export default function Footer({ onNavigateToTab }) {
  const footerRoutes = TAB_ITEMS.filter((route) => route.priority === 'primary').map((route) => ({
    label: route.label,
    tab: route.id,
    note: route.footerNote,
  }));

  return (
    <footer
      className="no-print mt-20 border-t border-stone-300/70 bg-[linear-gradient(180deg,#f5ede2,#eee2d4)] px-6 py-20 text-stone-700"
      role="contentinfo"
    >
      <div className="mx-auto max-w-[86rem]">
        <div className="grid grid-cols-1 gap-8 border-b border-stone-300/70 pb-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.95fr)_minmax(0,1fr)] lg:items-start">
          <div className="rounded-[2.5rem] border border-stone-300/70 bg-[linear-gradient(180deg,rgba(255,252,247,0.92),rgba(248,240,231,0.92))] p-8 shadow-[0_24px_60px_rgba(93,68,51,0.06)] md:p-10">
            <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-[#e4d2c1] bg-white/80 px-4 py-2 text-[10px] font-extrabold uppercase tracking-[0.24em] text-[#7a4c35]">
              <Library size={14} />
              Fachportal Zürich
            </div>
            <h2 className="font-serif text-4xl font-semibold tracking-[-0.05em] text-stone-900 md:text-6xl">
              Relational <br /> Recovery
            </h2>
            <p className="mt-6 max-w-md text-sm leading-loose text-stone-600 md:text-[15px]">
              Ergänzendes psychoedukatives Informationsangebot zu psychisch belasteter Elternschaft, Kinderschutz,
              Angehörigenarbeit und zürich-zentrierter Vernetzung mit punktuellen schweizweiten Ergänzungen.
            </p>
            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              <div className="rounded-[1.5rem] border border-stone-300/70 bg-white/75 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)]">
                <div className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-[#8a705f]">Schwerpunkt</div>
                <p className="mt-2 text-sm font-medium leading-relaxed text-stone-800">systemische Orientierung</p>
              </div>
              <div className="rounded-[1.5rem] border border-stone-300/70 bg-white/75 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)]">
                <div className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-[#8a705f]">Zielgruppe</div>
                <p className="mt-2 text-sm font-medium leading-relaxed text-stone-800">Fachpersonen und Teams</p>
              </div>
              <div className="rounded-[1.5rem] border border-stone-300/70 bg-white/75 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)]">
                <div className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-[#8a705f]">Format</div>
                <p className="mt-2 text-sm font-medium leading-relaxed text-stone-800">Praxis, Evidenz, Tools</p>
              </div>
            </div>
          </div>

          <div className="rounded-[2.25rem] border border-stone-300/70 bg-white/65 p-8 shadow-[0_18px_40px_rgba(93,68,51,0.04)]">
            <div className="mb-4 text-[10px] font-extrabold uppercase tracking-[0.35em] text-[#8a705f]">Bereiche</div>
            <div className="space-y-3">
              {footerRoutes.map((route) => (
                <button
                  key={route.tab}
                  type="button"
                  onClick={() => setActiveTab(route.tab)}
                  className="flex w-full items-start justify-between gap-4 rounded-[1.35rem] border border-transparent px-4 py-4 text-left transition-all hover:border-[#e4d2c1] hover:bg-white/85 hover:shadow-[0_16px_34px_rgba(93,68,51,0.05)]"
                >
                  <div>
                    <div className="text-[13px] font-extrabold uppercase tracking-[0.18em] text-stone-900">{route.label}</div>
                    <p className="mt-2 text-sm leading-relaxed text-stone-600">{route.note}</p>
                  </div>
                  <ArrowUpRight size={16} className="mt-1 shrink-0 text-[#8d3f32]" />
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-[2.5rem] border border-[#3d3128] bg-[linear-gradient(180deg,#3d3128,#262019)] p-8 text-[#fff7ef] shadow-[0_28px_70px_rgba(38,32,25,0.24)]">
            <div className="mb-4 text-[10px] font-extrabold uppercase tracking-[0.35em] text-[#d9cabb]">Arbeitsrahmen</div>
            <div className="space-y-5">
              <div className="flex items-start gap-4">
                <ShieldCheck size={18} className="mt-1 shrink-0 text-[#f0c786]" />
                <p className="text-sm leading-relaxed text-[#f2e6d9]">
                  Zentrale Orientierung für Fachpersonen mit Fokus auf Einordnung, Triage, Gesprächsführung und regionale Weitervermittlung.
                </p>
              </div>
              <div className="flex items-start gap-4">
                <Users size={18} className="mt-1 shrink-0 text-[#f0c786]" />
                <p className="text-sm leading-relaxed text-[#f2e6d9]">
                  Arbeitsstände bleiben lokal im Browser und können jederzeit zurückgesetzt oder neu aufgebaut werden.
                </p>
              </div>
            </div>
            <div className="mt-8 border-t border-white/10 pt-6 text-[12px] font-medium leading-loose text-[#d9cabb]">
              © 2026 Relational Recovery Fachportal.
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 pt-8 md:flex-row md:items-center md:justify-between">
          <p className="text-[11px] font-extrabold uppercase tracking-[0.28em] text-[#8a705f]">
            Fachlich ruhig. Systemisch. Praxisnah.
          </p>
          <div className="flex gap-3">
            <div className="h-1 w-12 bg-[#a55a42]" />
            <div className="h-1 w-8 bg-[#c7a07e]" />
            <div className="h-1 w-4 bg-white/85" />
          </div>
        </div>
      </div>
    </footer>
  );
}
