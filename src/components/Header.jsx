// Design note: Warm editorial header with softer material transitions, restrained navigation pills and calmer utility surfaces to reduce the remaining tool-like impression.
import { AlertTriangle, Check, Menu, Trash2, X } from 'lucide-react';
import { TAB_ITEMS } from '../data/appShellContent';

export default function Header({ activeTab, setActiveTab, onReset, isResetting, mobileMenuOpen, setMobileMenuOpen, mobileMenuButtonRef, firstMobileNavItemRef, mobileMenuContainerRef, onEmergencyAccess }) {
  return (
    <header className="sticky top-0 z-50 border-b border-stone-300/60 bg-[rgba(250,244,236,0.9)] backdrop-blur-xl no-print shadow-[0_10px_36px_rgba(76,55,39,0.06)]">
      <div className="mx-auto flex max-w-[86rem] items-center justify-between gap-4 px-4 py-4 md:px-6 lg:px-8">
        <button
          type="button"
          onClick={() => {
            setActiveTab('home');
            setMobileMenuOpen(false);
          }}
          className="group flex items-center gap-4 rounded-[1.75rem] text-left focus-visible:outline-none"
          aria-label="Zur Startseite wechseln"
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-[1.1rem] border border-[#4a3a30] bg-[#332822] text-[0.9rem] font-extrabold tracking-[0.08em] text-[#fffaf6] shadow-[0_12px_30px_rgba(47,47,40,0.14)] transition-all duration-300 group-hover:-translate-y-0.5 group-hover:bg-[#7a4c35]">
            RR
          </div>
          <div>
            <h1 className="font-serif text-[1rem] font-semibold uppercase tracking-[0.22em] leading-none text-stone-900">Relational Recovery</h1>
            <p className="mt-1 text-[0.62rem] font-semibold uppercase tracking-[0.26em] text-[#8a705f]">Schweizer Fachportal</p>
          </div>
        </button>

        <nav
          className="hidden items-center gap-1 rounded-full border border-stone-300/70 bg-[linear-gradient(180deg,rgba(255,252,247,0.82),rgba(244,235,224,0.82))] px-1.5 py-1.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.85),0_10px_24px_rgba(76,55,39,0.04)] lg:flex"
          aria-label="Hauptnavigation"
        >
          {TAB_ITEMS.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setActiveTab(item.id)}
              className={`haptic-btn flex items-center gap-2.5 rounded-full px-4 py-2.5 text-[10px] font-extrabold uppercase tracking-[0.18em] transition-all ${
                activeTab === item.id
                  ? 'bg-[#3a2d25] text-[#fffaf6] shadow-[0_12px_24px_rgba(58,45,37,0.16)]'
                  : 'text-stone-600 hover:bg-[#f5ede4] hover:text-stone-900'
              }`}
              aria-current={activeTab === item.id ? 'page' : undefined}
            >
              <item.icon size={14} strokeWidth={2.2} />
              <span>{item.label}</span>
            </button>
          ))}
          <div className="mx-2 h-6 w-px bg-stone-300/80" />
          <button
            type="button"
            onClick={onReset}
            className={`haptic-btn rounded-full p-2.5 transition-all duration-300 ${
              isResetting ? 'bg-[#efe7d7] text-[#7a4c35]' : 'text-stone-400 hover:bg-[#f5ede4] hover:text-[#b04f3d]'
            }`}
            title="Sitzung zurücksetzen"
            aria-label="Sitzung zurücksetzen"
          >
            {isResetting ? <Check size={18} /> : <Trash2 size={18} />}
          </button>
        </nav>

        <div className="hidden items-center lg:flex">
          <button
            type="button"
            onClick={onEmergencyAccess}
            className="haptic-btn inline-flex items-center gap-2 rounded-full border border-[#dec2b2] bg-[linear-gradient(180deg,#fff8f2,#f8ebe0)] px-4 py-2.5 text-[11px] font-extrabold uppercase tracking-[0.16em] text-[#8d3f32] shadow-[0_10px_24px_rgba(141,63,50,0.06)] hover:bg-[#fdf0e7]"
            aria-label="Sofortzugang zu Notfall- und Kriseninformationen"
          >
            <AlertTriangle size={16} />
            Notfall / akute Krise
          </button>
        </div>

        <button
          ref={mobileMenuButtonRef}
          type="button"
          className="inline-flex items-center justify-center rounded-[1.25rem] border border-stone-300/70 bg-white/78 p-3 text-stone-700 shadow-[0_10px_24px_rgba(76,55,39,0.06)] lg:hidden"
          onClick={() => setMobileMenuOpen((prev) => !prev)}
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-nav"
          aria-label={mobileMenuOpen ? 'Menü schliessen' : 'Menü öffnen'}
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {mobileMenuOpen && (
        <nav
          ref={mobileMenuContainerRef}
          id="mobile-nav"
          className="border-t border-stone-300/70 bg-[rgba(250,244,236,0.96)] px-4 pb-4 pt-3 shadow-[0_16px_34px_rgba(76,55,39,0.08)] lg:hidden"
          aria-label="Mobile Navigation"
        >
          <div className="grid grid-cols-1 gap-2">
            <button
              type="button"
              onClick={() => {
                onEmergencyAccess();
                setMobileMenuOpen(false);
              }}
              className="haptic-btn mb-2 inline-flex items-center justify-center gap-2 rounded-[1.25rem] border border-[#dec2b2] bg-[#fff3ec] px-4 py-3 text-[11px] font-extrabold uppercase tracking-[0.16em] text-[#8d3f32]"
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
                className={`flex items-center gap-3 rounded-[1.25rem] px-4 py-3 text-left text-sm font-bold transition-all ${
                  activeTab === item.id ? 'bg-[#3a2d25] text-[#fffaf6]' : 'bg-white/82 text-stone-700'
                }`}
              >
                <item.icon size={18} strokeWidth={2.1} />
                <span>{item.label}</span>
              </button>
            ))}
            <button
              type="button"
              onClick={() => {
                onReset();
                setMobileMenuOpen(false);
              }}
              className="mt-2 flex items-center gap-3 rounded-[1.25rem] bg-[#fff3ec] px-4 py-3 text-left text-sm font-bold text-[#8d3f32]"
            >
              <Trash2 size={18} />
              <span>Sitzung zurücksetzen</span>
            </button>
          </div>
        </nav>
      )}
    </header>
  );
}
