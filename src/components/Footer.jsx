import React from 'react';
import { Monitor, Scale, Smartphone } from 'lucide-react';

export default function Footer({ setActiveTab }) {
  return (
    <footer className="mt-20 border-t border-slate-200 bg-[#EEF2EA] px-6 py-20 text-slate-600 no-print" role="contentinfo">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-16 items-start">
        <div className="space-y-8">
          <h2 className="text-slate-900 font-black text-4xl tracking-tighter italic uppercase">
            Relational <br /> Recovery
          </h2>
          <p className="max-w-xs text-sm leading-loose text-slate-600">
            Ergänzendes psychoedukatives Informationsangebot im Kontext von Angehörigenarbeit, Kinderschutz und sozialer Unterstützung.
          </p>
          <div className="flex gap-5 text-slate-400">
            <Monitor size={22} />
            <Smartphone size={22} />
            <Scale size={22} />
          </div>
        </div>

        <div className="flex flex-col gap-4 text-[14px] font-black uppercase tracking-[0.24em] text-slate-700">
          <span className="mb-2 text-[10px] uppercase tracking-[0.45em] text-slate-400">Bereiche</span>
          {[
            ['Start', 'home'],
            ['Lernmodule', 'elearning'],
            ['Dialogtraining', 'vignetten'],
            ['Netzwerk Schweiz', 'zuerich'],
          ].map(([label, tab]) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className="text-left transition-all hover:translate-x-1 hover:text-emerald-700"
            >
              {label}
            </button>
          ))}
        </div>

        <div className="space-y-4 text-[12px] font-medium leading-loose text-slate-500 md:text-right">
          <p>© 2026 Relational Recovery Fachportal.</p>
          <div className="space-y-3">
            <p className="italic">Lokale Speicherung nur im Browser • Sitzung kann jederzeit zurückgesetzt werden.</p>
            <p>
              Keine offizielle PUK-Unterseite. Für offizielle Informationen und Beratung nutzen Sie bitte die Angehörigenberatung der PUK Zürich.
            </p>
          </div>
          <div className="pt-6 flex md:justify-end gap-3">
            <div className="w-12 h-1 bg-emerald-600" />
            <div className="w-6 h-1 bg-slate-300" />
          </div>
        </div>
      </div>
    </footer>
  );
}
