import { lazy, Suspense, useCallback, useRef } from 'react';
import './styles/app-global.css';
import { AlertTriangle, ShieldCheck } from 'lucide-react';
import ErrorBoundary from './components/ErrorBoundary';
import Header from './components/Header';
import Footer from './components/Footer';
import HomeLandingTemplate from './templates/HomeLandingTemplate';
import { getPageHeadingId } from './utils/appHelpers';
import { useAppState } from './context/useAppState';
import useMobileMenu from './utils/useMobileMenu';
import useNavigationFocus from './utils/useNavigationFocus';
import useDownloadHandlers from './utils/useDownloadHandlers';

const ElearningSection = lazy(() => import('./sections/ElearningSection'));
const VignettenSection = lazy(() => import('./sections/VignettenSection'));
const GlossarSection = lazy(() => import('./sections/GlossarSection'));
const GrundlagenSection = lazy(() => import('./sections/GrundlagenSection'));
const ToolboxSection = lazy(() => import('./sections/ToolboxSection'));
const NetworkSection = lazy(() => import('./sections/NetworkSection'));
const EvidenceSection = lazy(() => import('./sections/EvidenceSection'));

const SectionLoadingFallback = function SectionLoadingFallback() {
  return (
    <section aria-busy="true" aria-label="Inhalt wird geladen" className="rounded-[3rem] border border-slate-200 bg-white px-8 py-12 shadow-sm md:px-12 md:py-16">
      <p className="ui-visually-hidden">Inhalt wird geladen…</p>
      <div className="max-w-2xl">
        <div className="mb-5 h-2 w-20 rounded-full bg-emerald-100" />
        <div className="mb-4 h-8 w-64 rounded-full bg-slate-100" />
        <div className="mb-3 h-4 w-full max-w-xl rounded-full bg-slate-100" />
        <div className="h-4 w-full max-w-lg rounded-full bg-slate-100" />
      </div>
    </section>
  );
};

export default function App() {
  const {
    activeTab,
    setActiveTab,
    navigate,
    showSafeNote,
    setShowSafeNote,
    score,
    navigationFocusTargetRef,
    resetAppState,
  } = useAppState();

  const mainContentRef = useRef(null);

  // Toolbox section refs
  const acuteCrisisSectionRef = useRef(null);
  const safetyPlanSectionRef = useRef(null);
  const childProtectionSectionRef = useRef(null);
  const addictionSectionRef = useRef(null);
  const rightsSectionRef = useRef(null);

  const toolboxRefs = {
    acuteCrisisSectionRef,
    safetyPlanSectionRef,
    childProtectionSectionRef,
    addictionSectionRef,
    rightsSectionRef,
  };

  const {
    mobileMenuOpen,
    openMobileMenu,
    closeMobileMenu,
    mobileMenuButtonRef,
    firstMobileNavItemRef,
    mobileMenuContainerRef,
  } = useMobileMenu(activeTab);

  const { skipLinkActivatedRef, setPendingPriorityFocus } = useNavigationFocus({
    activeTab,
    setActiveTab,
    navigationFocusTargetRef,
    mainContentRef,
    toolboxRefs,
  });

  const {
    handleDownloadCrisisPlan,
    downloadResources,
  } = useDownloadHandlers(score.risk);

  const openPriorityToolboxSection = useCallback(
    (section) => {
      navigate('toolbox', { focusTarget: 'heading' });
      setPendingPriorityFocus(section);
    },
    [navigate, setPendingPriorityFocus]
  );

  const handleEmergencyAccess = useCallback(() => {
    openPriorityToolboxSection('acute-crisis');
  }, [openPriorityToolboxSection]);

  const handleToolboxPrint = useCallback(() => {
    if (typeof window === 'undefined') return;
    window.requestAnimationFrame(() => {
      window.print();
    });
  }, []);

  return (
    <div className="min-h-screen bg-[#f6efe7] flex flex-col font-sans text-stone-900 overflow-x-hidden selection:bg-[var(--selection-background)] selection:text-[var(--selection-foreground)]">
      <a
        href="#main-content"
        className="skip-link"
        onClick={(event) => {
          event.preventDefault();
          skipLinkActivatedRef.current = true;
          navigationFocusTargetRef.current = 'main';
          if (mainContentRef.current && typeof mainContentRef.current.focus === 'function') {
            mainContentRef.current.focus();
          }
        }}
      >
        Zum Inhalt springen
      </a>

      {activeTab === 'toolbox' && (
        <div className="no-print border-b border-stone-300/60 bg-white/80 px-4 py-3 shadow-[0_8px_20px_rgba(76,55,39,0.04)]">
          <div className="mx-auto flex max-w-[86rem] flex-col gap-3 md:px-2">
            <h2 className="text-base font-semibold text-stone-900">Orientierung, Schutz und nächste Schritte</h2>
            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={handleDownloadCrisisPlan}
                className="haptic-btn inline-flex items-center gap-2 rounded-full border border-stone-300/70 bg-white px-4 py-2.5 text-[11px] font-extrabold uppercase tracking-[0.16em] text-stone-700 shadow-[0_10px_24px_rgba(76,55,39,0.06)]"
                aria-label="Krisenplan herunterladen"
              >
                Krisenplan herunterladen
              </button>
              <button
                type="button"
                onClick={handleToolboxPrint}
                className="haptic-btn inline-flex items-center gap-2 rounded-full border border-stone-300/70 bg-white px-4 py-2.5 text-[11px] font-extrabold uppercase tracking-[0.16em] text-stone-700 shadow-[0_10px_24px_rgba(76,55,39,0.06)]"
                aria-label="Arbeitsansicht drucken"
              >
                Arbeitsansicht drucken
              </button>
            </div>
          </div>
        </div>
      )}

      {showSafeNote && (
        <div className="relative z-[100] border-b border-[#4b392f] bg-[linear-gradient(180deg,#3f322b,#2d241f)] px-3 py-3 text-[#f6efe7] no-print">
          <div className="mx-auto flex max-w-[86rem] flex-col items-start justify-between gap-3 px-2 md:flex-row md:items-center md:px-6">
            <div className="flex items-center gap-3 text-[10px] font-extrabold uppercase tracking-[0.24em] text-[#eadfce]">
              <ShieldCheck size={16} className="shrink-0 text-[#f0c786]" aria-hidden="true" />
              <span>
                Lokale Speicherung im Browser • auf gemeinsam genutzten Geräten nach der Nutzung zurücksetzen • keine
                serverseitige Falldokumentation in dieser Ansicht
              </span>
            </div>
            <button
              type="button"
              onClick={() => setShowSafeNote(false)}
              className="haptic-btn rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-[0.18em] text-[#f0c786] transition-colors hover:bg-white/10 hover:text-white"
              aria-label="Datenschutzhinweis schliessen"
            >
              Schliessen
            </button>
          </div>
        </div>
      )}

      <div className="no-print border-b border-[#e4cbbb] bg-[linear-gradient(180deg,#fff6ee,#f4e4d6)]">
        <div className="mx-auto flex max-w-[86rem] flex-col items-start justify-between gap-3 px-4 py-3 md:flex-row md:items-center md:px-6">
          <div className="text-sm leading-relaxed text-[#6d342c]">
            <span className="mr-3 text-[10px] font-extrabold uppercase tracking-[0.18em] text-[#9a4b3c]">
              Akute Krise
            </span>
            Bei akuter Lebensgefahr:{' '}
            <a
              href="tel:144"
              aria-label="Sanitätsnotruf 144 anrufen"
              className="font-extrabold underline decoration-2 underline-offset-2 hover:no-underline"
            >
              144
            </a>
            . Im Kanton Zürich bei nicht lebensbedrohlichen Situationen:{' '}
            <a
              href="tel:+41800336655"
              aria-label="AERZTEFON 0800 33 66 55 anrufen"
              className="font-extrabold underline decoration-2 underline-offset-2 hover:no-underline"
            >
              AERZTEFON 0800 33 66 55
            </a>
            . Für Jugendliche ist{' '}
            <a
              href="tel:147"
              aria-label="Beratungstelefon 147 von Pro Juventute anrufen"
              className="font-extrabold underline decoration-2 underline-offset-2 hover:no-underline"
            >
              147
            </a>
            {' '}telefonisch der schnellste Weg.
          </div>
          <button
            type="button"
            onClick={handleEmergencyAccess}
            className="haptic-btn inline-flex items-center gap-2 rounded-full border border-[#dec2b2] bg-white/80 px-4 py-2 text-[11px] font-extrabold uppercase tracking-[0.18em] text-[var(--accent-primary-strong)] shadow-[0_10px_24px_rgba(141,63,50,0.06)] transition-colors hover:bg-[#fff0e6]"
            aria-label="Zu Notfallinformationen wechseln"
          >
            <AlertTriangle size={14} aria-hidden="true" />
            Zu Notfallinformationen
          </button>
        </div>
      </div>

      <Header
        mobileMenuOpen={mobileMenuOpen}
        openMobileMenu={openMobileMenu}
        closeMobileMenu={closeMobileMenu}
        mobileMenuButtonRef={mobileMenuButtonRef}
        firstMobileNavItemRef={firstMobileNavItemRef}
        mobileMenuContainerRef={mobileMenuContainerRef}
        onEmergencyAccess={handleEmergencyAccess}
        onReset={resetAppState}
      />

      <main
        id="main-content"
        ref={mainContentRef}
        aria-labelledby={getPageHeadingId(activeTab)}
        tabIndex={-1}
        className="flex-grow max-w-7xl mx-auto w-full px-4 md:px-6 py-8 md:py-10 outline-none page-enter"
      >
        <ErrorBoundary>
        <Suspense fallback={<SectionLoadingFallback />}>
          {activeTab === 'start' && (
            <HomeLandingTemplate pageHeadingId={getPageHeadingId('start')} />
          )}

          {activeTab === 'lernmodule' && <ElearningSection />}

          {activeTab === 'vignetten' && <VignettenSection />}

          {activeTab === 'glossar' && <GlossarSection />}

          {activeTab === 'grundlagen' && (
            <GrundlagenSection sharedDownloadResources={downloadResources} />
          )}

          {activeTab === 'toolbox' && (
            <ToolboxSection
              onPrint={handleToolboxPrint}
              onDownloadCrisisPlan={handleDownloadCrisisPlan}
              acuteCrisisSectionRef={acuteCrisisSectionRef}
              safetyPlanSectionRef={safetyPlanSectionRef}
              childProtectionSectionRef={childProtectionSectionRef}
              addictionSectionRef={addictionSectionRef}
              rightsSectionRef={rightsSectionRef}
              onJumpToPrioritySection={openPriorityToolboxSection}
            />
          )}

          {activeTab === 'netzwerk' && <NetworkSection />}

          {activeTab === 'evidenz' && <EvidenceSection downloadResources={downloadResources} />}
        </Suspense>
        </ErrorBoundary>
      </main>

      <Footer />
    </div>
  );
}
