import React from 'react';
import { Monitor, Scale, Smartphone } from 'lucide-react';

export default function Footer({ setActiveTab }) {
  return (
    <footer className="bg-slate-900 text-slate-500 py-20 px-6 mt-20 border-t border-white/5 no-print" role="contentinfo">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-16 items-start">
        <div className="space-y-8">
          <h2 className="text-white font-black text-4xl tracking-tighter italic uppercase">
            Relational <br /> Recovery
          </h2>
          <p className="text-sm leading-loose opacity-60 font-light max-w-xs">
            Ergänzendes psychoedukatives Informationsangebot im Kontext von Angehörigenarbeit, Kinderschutz und sozialer Unterstützung.
          </p>
          <div className="flex gap-5 opacity-40">
            <Monitor size={22} />
            <Smartphone size={22} />
            <Scale size={22} />
          </div>
        </div>

        <div className="flex flex-col gap-4 text-[14px] font-black uppercase tracking-[0.24em] text-slate-300">
          <span className="text-white/20 text-[10px] tracking-[0.45em] mb-2 uppercase">Bereiche</span>
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
              className="text-left hover:text-emerald-400 transition-all hover:translate-x-1"
            >
              {label}
            </button>
          ))}
        </div>

        <div className="text-[12px] leading-loose font-medium opacity-50 md:text-right space-y-4">
          <p>© 2026 Relational Recovery Fachportal.</p>
          <div className="space-y-3">
            <p className="italic">Lokale Speicherung nur im Browser • Sitzung kann jederzeit zurückgesetzt werden.</p>
            <p>
              Keine offizielle PUK-Unterseite. Für offizielle Informationen und Beratung nutzen Sie bitte die Angehörigenberatung der PUK Zürich.
            </p>
          </div>
          <div className="pt-6 flex md:justify-end gap-3">
            <div className="w-12 h-1 bg-emerald-600" />
            <div className="w-6 h-1 bg-white/10" />
          </div>
        </div>
      </div>
    </footer>
  );
}
