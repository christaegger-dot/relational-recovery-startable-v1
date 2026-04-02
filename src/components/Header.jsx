import React from 'react';
import { AlertTriangle, Check, Menu, Trash2, X } from 'lucide-react';
import { TAB_ITEMS } from '../data/content';

export default function Header({ activeTab, setActiveTab, onReset, isResetting, mobileMenuOpen, setMobileMenuOpen, mobileMenuButtonRef, firstMobileNavItemRef, mobileMenuContainerRef, onEmergencyAccess }) {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/90 bg-white/95 shadow-sm backdrop-blur no-print">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 flex items-center justify-between gap-4">
        <button
          type="button"
          onClick={() => {
            setActiveTab('home');
            setMobileMenuOpen(false);
          }}
          className="flex items-center gap-4 text-left group rounded-2xl focus-visible:outline-none"
          aria-label="Zur Startseite wechseln"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-slate-900 font-black text-white shadow-md transition-all duration-300 group-hover:bg-emerald-700">
            RR
          </div>
          <div>
            <h1 className="text-sm font-black uppercase tracking-[0.2em] text-slate-900 leading-none">Relational Recovery</h1>
            <p className="mt-1 text-[10px] font-black uppercase tracking-[0.25em] text-slate-500">Schweizer Fachportal</p>
          </div>
        </button>

        <nav className="hidden lg:flex items-center gap-1 rounded-full border border-slate-200 bg-slate-50/80 p-1.5" aria-label="Hauptnavigation">
          {TAB_ITEMS.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setActiveTab(item.id)}
              className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all haptic-btn ${
                activeTab === item.id ? 'bg-slate-900 text-white shadow-lg' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
              }`}
              aria-current={activeTab === item.id ? 'page' : undefined}
            >
              <item.icon size={14} strokeWidth={2.5} />
              <span>{item.label}</span>
            </button>
          ))}
          <div className="w-px h-6 bg-slate-200 mx-3" />
          <button
            type="button"
              onClick={onReset}
              className={`p-2 rounded-xl transition-all duration-300 haptic-btn ${
                isResetting ? 'text-emerald-600' : 'text-slate-400 hover:text-red-500 hover:bg-slate-50'
            }`}
            title="Sitzung zurücksetzen"
            aria-label="Sitzung zurücksetzen"
          >
            {isResetting ? <Check size={18} /> : <Trash2 size={18} />}
          </button>
        </nav>

        <div className="hidden lg:flex items-center">
          <button
            type="button"
            onClick={onEmergencyAccess}
            className="inline-flex items-center gap-2 rounded-full border border-red-200 bg-white px-4 py-2.5 text-[11px] font-black uppercase tracking-[0.18em] text-red-800 hover:bg-red-50 transition-colors haptic-btn"
            aria-label="Sofortzugang zu Notfall- und Kriseninformationen"
          >
            <AlertTriangle size={16} />
            Notfall / akute Krise
          </button>
        </div>

        <button
          ref={mobileMenuButtonRef}
          type="button"
          className="lg:hidden inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-white p-3 text-slate-700 shadow-sm"
          onClick={() => setMobileMenuOpen((prev) => !prev)}
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-nav"
          aria-label={mobileMenuOpen ? 'Menü schliessen' : 'Menü öffnen'}
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {mobileMenuOpen && (
        <div ref={mobileMenuContainerRef} id="mobile-nav" className="lg:hidden border-t border-slate-200 bg-white px-4 pb-4 pt-3 shadow-sm" aria-label="Mobile Navigation">
          <div className="grid grid-cols-1 gap-2">
            <button
              type="button"
              onClick={() => {
                onEmergencyAccess();
                setMobileMenuOpen(false);
              }}
              className="mb-2 inline-flex items-center justify-center gap-2 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-[11px] font-black uppercase tracking-[0.18em] text-red-800 hover:bg-red-100 transition-colors haptic-btn"
              aria-label="Sofortzugang zu Notfall- und Kriseninformationen"
            >
              <AlertTriangle size={16} />
              Notfall / akute Krise
            </button>
            {TAB_ITEMS.map((item, index) => (
              <button
                key={item.id}
                ref={index === 0 ? firstMobileNavItemRef : undefined}
                type="button"
                onClick={() => {
                  setActiveTab(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-left text-sm font-bold transition-all ${
                  activeTab === item.id ? 'bg-slate-900 text-white' : 'bg-slate-50 text-slate-700'
                }`}
              >
                <item.icon size={18} strokeWidth={2.2} />
                <span>{item.label}</span>
              </button>
            ))}
            <button
              type="button"
              onClick={() => {
                onReset();
                setMobileMenuOpen(false);
              }}
              className="mt-2 flex items-center gap-3 rounded-2xl px-4 py-3 text-left text-sm font-bold bg-red-50 text-red-700"
            >
              <Trash2 size={18} />
              <span>Sitzung zurücksetzen</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
