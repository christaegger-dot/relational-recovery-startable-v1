import React, { Suspense, lazy, useEffect, useMemo, useRef, useState } from 'react';
import './styles/app-global.css';
import { AlertTriangle, ShieldCheck } from 'lucide-react';
import Header from './components/Header';
import Footer from './components/Footer';
import HomeSection from './sections/HomeSection';
import {
  APP_BROADCAST_CHANNEL,
  APP_STATE_VERSION,
  DEFAULT_SCORE,
  E_MODULE_COUNT,
  STORAGE_KEYS,
} from './data/appShellContent';
import { ASSESSMENT_ITEMS } from './data/learningContent';
import { SAFETY_PLAN_TEMPLATE_FIELDS } from './data/toolboxContent';
import {
  downloadTextFile,
  getInitialAppState,
  getDefaultAppState,
  getPageHeadingId,
  isValidStoredAppState,
  normalizeAppStateData,
  normalizeHashToTab,
  safeLocalStorageSet,
  safeParse,
} from './utils/appHelpers';

const ElearningSection = lazy(() => import('./sections/ElearningSection'));
const VignettenSection = lazy(() => import('./sections/VignettenSection'));
const ToolboxSection = lazy(() => import('./sections/ToolboxSection'));
const NetworkSection = lazy(() => import('./sections/NetworkSection'));
const EvidenceSection = lazy(() => import('./sections/EvidenceSection'));

function SectionLoadingFallback() {
  return (
    <section className="rounded-[3rem] border border-slate-200 bg-white px-8 py-12 shadow-sm md:px-12 md:py-16">
      <div className="max-w-2xl">
        <div className="mb-5 h-2 w-20 rounded-full bg-emerald-100" />
        <div className="mb-4 h-8 w-64 rounded-full bg-slate-100" />
        <div className="mb-3 h-4 w-full max-w-xl rounded-full bg-slate-100" />
        <div className="h-4 w-full max-w-lg rounded-full bg-slate-100" />
      </div>
    </section>
  );
}

export default function App() {
  const initialAppStateRef = useRef(null);
  const focusFrameRef = useRef(null);

  if (!initialAppStateRef.current) {
    initialAppStateRef.current = getInitialAppState(STORAGE_KEYS.appState);
  }

  const initialAppState = initialAppStateRef.current;
  const [activeTab, setActiveTab] = useState(initialAppState.activeTab);
  const [currentVignette, setCurrentVignette] = useState(initialAppState.currentVignette);
  const [selectedOption, setSelectedOption] = useState(initialAppState.selectedOption);
  const [searchTerm, setSearchTerm] = useState(initialAppState.searchTerm);
  const [activeResourceFilter, setActiveResourceFilter] = useState(initialAppState.activeResourceFilter);
  const [quizState, setQuizState] = useState(initialAppState.quizState);
  const [showSafeNote, setShowSafeNote] = useState(initialAppState.showSafeNote);
  const [isResetting, setIsResetting] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [pendingPriorityFocus, setPendingPriorityFocus] = useState(null);
  const mainContentRef = useRef(null);
  const acuteCrisisSectionRef = useRef(null);
  const safetyPlanSectionRef = useRef(null);
  const childProtectionSectionRef = useRef(null);
  const mobileMenuButtonRef = useRef(null);
  const firstMobileNavItemRef = useRef(null);
  const mobileMenuContainerRef = useRef(null);
  const tabInstanceIdRef = useRef(
    typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : `tab-${Date.now()}-${Math.random().toString(16).slice(2)}`
  );
  const latestAppliedTimestampRef = useRef(0);
  const skipNextPersistRef = useRef(false);
  const broadcastChannelRef = useRef(null);

  const [score, setScore] = useState(initialAppState.score);
  const [completedModules, setCompletedModules] = useState(initialAppState.completedModules);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const storedAppState = safeParse(STORAGE_KEYS.appState, null, (value) => isValidStoredAppState(value));
    if (storedAppState?.updatedAt) {
      latestAppliedTimestampRef.current = storedAppState.updatedAt;
    }
  }, []);

  const applyAppState = (nextState, options = {}) => {
    const normalized = normalizeAppStateData(nextState);
    const { preserveSearchTerm = false } = options;

    setActiveTab(normalized.activeTab);
    setCurrentVignette(normalized.currentVignette);
    setSelectedOption(normalized.selectedOption);
    if (!preserveSearchTerm) {
      setSearchTerm(normalized.searchTerm);
    }
    setActiveResourceFilter(normalized.activeResourceFilter);
    setQuizState(normalized.quizState);
    setShowSafeNote(normalized.showSafeNote);
    setScore(normalized.score);
    setCompletedModules(normalized.completedModules);
    setMobileMenuOpen(false);
  };

  const publishAppState = (nextState) => {
    if (typeof window === 'undefined') return;

    const payload = {
      version: APP_STATE_VERSION,
      updatedAt: Date.now(),
      sourceId: tabInstanceIdRef.current,
      data: normalizeAppStateData(nextState),
    };

    latestAppliedTimestampRef.current = payload.updatedAt;
    safeLocalStorageSet(STORAGE_KEYS.appState, JSON.stringify(payload));

    if (broadcastChannelRef.current) {
      broadcastChannelRef.current.postMessage(payload);
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const nextHash = `#${activeTab}`;
      if (window.location.hash !== nextHash) {
        window.location.hash = nextHash;
      }
    }

    setMobileMenuOpen(false);

    let remainingAttempts = 60;

    const focusActiveHeading = () => {
      const headingId = getPageHeadingId(activeTab);
      const heading = typeof document !== 'undefined' ? document.getElementById(headingId) : null;

      if (heading && typeof heading.focus === 'function') {
        heading.focus();
        focusFrameRef.current = null;
        return;
      }

      if (remainingAttempts > 0) {
        remainingAttempts -= 1;
        focusFrameRef.current = window.requestAnimationFrame(focusActiveHeading);
      } else if (mainContentRef.current) {
        mainContentRef.current.focus();
        focusFrameRef.current = null;
      }
    };

    focusFrameRef.current = window.requestAnimationFrame(focusActiveHeading);

    return () => {
      if (focusFrameRef.current !== null) {
        window.cancelAnimationFrame(focusFrameRef.current);
        focusFrameRef.current = null;
      }
    };
  }, [activeTab]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleHashChange = () => {
      const nextTab = normalizeHashToTab(window.location.hash);
      setActiveTab((prev) => (prev === nextTab ? prev : nextTab));
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  useEffect(() => {
    if (activeTab !== 'toolbox' || !pendingPriorityFocus) return;

    const refMap = {
      'acute-crisis': acuteCrisisSectionRef,
      'safety-plan': safetyPlanSectionRef,
      'child-protection': childProtectionSectionRef,
    };

    const targetRef = refMap[pendingPriorityFocus];
    const targetElement = targetRef?.current;
    if (!targetElement) return;

    window.requestAnimationFrame(() => {
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      const heading = targetElement.querySelector('h3, h2');
      if (heading && typeof heading.focus === 'function') {
        heading.focus();
      } else if (typeof targetElement.focus === 'function') {
        targetElement.focus();
      }
    });

    setPendingPriorityFocus(null);
  }, [activeTab, pendingPriorityFocus]);

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const focusTarget = firstMobileNavItemRef.current;
    if (focusTarget) {
      focusTarget.focus();
    }

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setMobileMenuOpen(false);
        window.requestAnimationFrame(() => {
          mobileMenuButtonRef.current?.focus();
        });
        return;
      }

      if (event.key !== 'Tab') return;

      const container = mobileMenuContainerRef.current;
      if (!container) return;

      const focusableElements = Array.from(
        container.querySelectorAll(
          'button:not([disabled]), a[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
        )
      ).filter((element) => element.offsetParent !== null);

      if (!focusableElements.length) return;

      const first = focusableElements[0];
      const last = focusableElements[focusableElements.length - 1];
      const active = document.activeElement;

      if (event.shiftKey) {
        if (active === first) {
          event.preventDefault();
          last.focus();
        }
      } else if (active === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  const persistedAppState = useMemo(
    () => ({
      activeTab,
      currentVignette,
      selectedOption,
      activeResourceFilter,
      quizState,
      showSafeNote,
      score,
      completedModules,
    }),
    [activeTab, currentVignette, selectedOption, activeResourceFilter, quizState, showSafeNote, score, completedModules]
  );

  useEffect(() => {
    if (typeof window === 'undefined') return;

    if (!broadcastChannelRef.current && 'BroadcastChannel' in window) {
      broadcastChannelRef.current = new BroadcastChannel(APP_BROADCAST_CHANNEL);
    }

    const applyIncomingPayload = (payload) => {
      if (!isValidStoredAppState(payload)) return;
      if (payload.sourceId === tabInstanceIdRef.current) return;
      if (payload.updatedAt <= latestAppliedTimestampRef.current) return;

      latestAppliedTimestampRef.current = payload.updatedAt;
      skipNextPersistRef.current = true;
      applyAppState(payload.data, { preserveSearchTerm: true });
    };

    const handleStorage = (event) => {
      if (event.storageArea !== window.localStorage) return;
      if (event.key !== STORAGE_KEYS.appState || !event.newValue) return;

      try {
        applyIncomingPayload(JSON.parse(event.newValue));
      } catch {
        // ignore invalid sync payloads
      }
    };

    const handleBroadcast = (event) => {
      applyIncomingPayload(event.data);
    };

    window.addEventListener('storage', handleStorage);
    if (broadcastChannelRef.current) {
      broadcastChannelRef.current.addEventListener('message', handleBroadcast);
    }

    return () => {
      window.removeEventListener('storage', handleStorage);
      if (broadcastChannelRef.current) {
        broadcastChannelRef.current.removeEventListener('message', handleBroadcast);
        broadcastChannelRef.current.close();
        broadcastChannelRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    if (skipNextPersistRef.current) {
      skipNextPersistRef.current = false;
      return;
    }

    publishAppState(persistedAppState);
  }, [persistedAppState]);

  const progressPercent = E_MODULE_COUNT ? Math.round((completedModules.length / E_MODULE_COUNT) * 100) : 0;

  const handleQuizAnswer = (modId, answerIdx, correctIdx) => {
    setQuizState((prev) => ({
      ...prev,
      [modId]: { answerIdx, isCorrect: answerIdx === correctIdx },
    }));

    if (answerIdx === correctIdx) {
      setCompletedModules((prev) => (prev.includes(modId) ? prev : [...prev, modId]));
    }
  };

  const handleScoreChange = (itemId) => {
    setScore((prev) => {
      const checked = prev.checked.includes(itemId)
        ? prev.checked.filter((entry) => entry !== itemId)
        : [...prev.checked, itemId];

      const risk = ASSESSMENT_ITEMS.filter((item) => checked.includes(item.id)).reduce((sum, item) => sum + item.val, 0);
      return { risk, checked };
    });
  };

  const openPriorityToolboxSection = (section) => {
    setActiveTab('toolbox');
    setPendingPriorityFocus(section);
  };

  const handleEmergencyAccess = () => {
    openPriorityToolboxSection('acute-crisis');
  };

  const clearSession = () => {
    setIsResetting(true);

    const resetState = getDefaultAppState();

    setTimeout(() => {
      publishAppState(resetState);
      skipNextPersistRef.current = true;
      applyAppState(resetState);
      setIsResetting(false);
    }, 250);
  };

  const handleSelectVignetteOption = (vignetteId, optionId) => {
    setSelectedOption((prev) => ({
      ...prev,
      [vignetteId]: optionId,
    }));
  };

  const handleDownloadCrisisPlan = () => {
    const sections = SAFETY_PLAN_TEMPLATE_FIELDS.map(
      (field, index) => `${index + 1}. ${field.title}
Leitfrage: ${field.hint}
-
-
-
`
    ).join('\n');

    const template = `Krisenplan – Relational Recovery Fachportal

Bearbeitbare Textvorlage fuer Gespraech, Fallarbeit oder gemeinsame Krisenvorsorge.
Aktueller Assessment-Score: ${score.risk}
Hinweis: Diese Vorlage speichert nichts automatisch und ersetzt keine fachliche Absprache.

${sections}
Naechster gemeinsamer Schritt
Leitfrage: Was wird bis zum naechsten Kontakt konkret vereinbart?
-
-
-
`;
    downloadTextFile('krisenplan-vorlage.txt', template);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans text-slate-900 overflow-x-hidden selection:bg-emerald-100 selection:text-emerald-900">
      <a href="#main-content" className="skip-link">
        Zum Inhalt springen
      </a>

      {showSafeNote && (
        <div className="bg-slate-900 text-white p-3 no-print border-b border-white/10 relative z-[100]">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 px-2 md:px-6">
            <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest">
              <ShieldCheck size={16} className="text-emerald-400 shrink-0" />
              <span>Lokale Speicherung im Browser • auf gemeinsam genutzten Geräten nach der Nutzung zurücksetzen • keine serverseitige Falldokumentation in dieser Ansicht</span>
            </div>
            <button
              type="button"
              onClick={() => setShowSafeNote(false)}
              className="text-emerald-400 hover:text-white transition-colors text-[10px] font-black haptic-btn px-2 py-1"
            >
              Schliessen
            </button>
          </div>
        </div>
      )}

      <div className="no-print border-b border-red-100 bg-red-50/70">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-3 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
          <div className="text-sm text-red-950 leading-relaxed">
            <span className="font-black uppercase tracking-[0.18em] text-[10px] mr-3">Akute Krise</span>
            Bei akuter Lebensgefahr: <span className="font-black">144</span>. Im Kanton Zürich bei nicht lebensbedrohlichen Situationen:
            <span className="font-black"> AERZTEFON 0800 33 66 55</span>. Für Jugendliche ist <span className="font-black">147 telefonisch</span> der schnellste Weg.
          </div>
          <button
            type="button"
            onClick={handleEmergencyAccess}
            className="inline-flex items-center gap-2 rounded-full border border-red-200 bg-white px-4 py-2 text-[11px] font-black uppercase tracking-[0.18em] text-red-800 hover:bg-red-100 transition-colors haptic-btn"
          >
            <AlertTriangle size={14} />
            Zu Notfallinformationen
          </button>
        </div>
      </div>

      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onReset={clearSession}
        isResetting={isResetting}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        mobileMenuButtonRef={mobileMenuButtonRef}
        firstMobileNavItemRef={firstMobileNavItemRef}
        mobileMenuContainerRef={mobileMenuContainerRef}
        onEmergencyAccess={handleEmergencyAccess}
      />

      <main
        id="main-content"
        ref={mainContentRef}
        aria-labelledby={getPageHeadingId(activeTab)}
        tabIndex={-1}
        className="flex-grow max-w-7xl mx-auto w-full px-4 md:px-6 py-8 md:py-10 outline-none page-enter"
      >
        {activeTab === 'home' ? (
          <HomeSection activeTab={activeTab} setActiveTab={setActiveTab} progressPercent={progressPercent} completedModules={completedModules} />
        ) : (
          <Suspense fallback={<SectionLoadingFallback />}>
            {activeTab === 'elearning' && (
              <ElearningSection quizState={quizState} onAnswer={handleQuizAnswer} completedModules={completedModules} />
            )}

            {activeTab === 'vignetten' && (
              <VignettenSection
                currentIndex={currentVignette}
                setCurrentIndex={setCurrentVignette}
                selectedOption={selectedOption}
                onSelectOption={handleSelectVignetteOption}
              />
            )}

            {activeTab === 'toolbox' && (
              <ToolboxSection
                score={score}
                onToggleAssessment={handleScoreChange}
                onResetAssessment={() => setScore(DEFAULT_SCORE)}
                onPrint={() => window.print()}
                onDownloadCrisisPlan={handleDownloadCrisisPlan}
                acuteCrisisSectionRef={acuteCrisisSectionRef}
                safetyPlanSectionRef={safetyPlanSectionRef}
                childProtectionSectionRef={childProtectionSectionRef}
                onJumpToPrioritySection={openPriorityToolboxSection}
              />
            )}

            {activeTab === 'zuerich' && (
              <NetworkSection
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                activeResourceFilter={activeResourceFilter}
                setActiveResourceFilter={setActiveResourceFilter}
              />
            )}

            {activeTab === 'zaesur' && <EvidenceSection />}
          </Suspense>
        )}
      </main>

      <Footer setActiveTab={setActiveTab} />
    </div>
  );
}
