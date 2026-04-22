import { createContext, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { APP_BROADCAST_CHANNEL, APP_STATE_VERSION, DEFAULT_SCORE, STORAGE_KEYS } from '../data/appShellContent';
import { ASSESSMENT_ITEMS } from '../data/learningContent';
import {
  getDefaultAppState,
  getInitialAppState,
  isValidStoredAppState,
  normalizeAppStateData,
  safeLocalStorageSet,
} from '../utils/appHelpers';

const AppStateContext = createContext(null);

export { AppStateContext };

// Module-scope helper so impure calls (Date.now / Math.random) live outside
// the component render path — keeps react-hooks/purity happy.
function generateTabInstanceId() {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return `tab-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

export function AppStateProvider({ children }) {
  const initialAppStateRef = useRef(null);
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
  const [score, setScore] = useState(initialAppState.score);
  const [completedModules, setCompletedModules] = useState(initialAppState.completedModules);
  const [isResetting, setIsResetting] = useState(false);

  // Ref shared with App for focus management: updated by navigate() before setActiveTab
  const navigationFocusTargetRef = useRef(initialAppState.activeTab === 'start' ? 'none' : 'heading');

  // Sync/persistence internals: lazy-initialized, stable across renders.
  // The impure ID generation lives in a module-scope helper so the
  // react-hooks/purity rule sees only a normal function call here.
  const tabInstanceIdRef = useRef(null);
  if (tabInstanceIdRef.current === null) {
    tabInstanceIdRef.current = generateTabInstanceId();
  }
  const latestAppliedTimestampRef = useRef(null);
  if (latestAppliedTimestampRef.current === null) {
    let ts = 0;
    if (typeof window !== 'undefined') {
      try {
        const raw = window.localStorage.getItem(STORAGE_KEYS.appState);
        const parsed = raw ? JSON.parse(raw) : null;
        if (typeof parsed?.updatedAt === 'number') ts = parsed.updatedAt;
      } catch {
        // ignore storage read errors
      }
    }
    latestAppliedTimestampRef.current = ts;
  }
  const skipNextPersistRef = useRef(false);
  const broadcastChannelRef = useRef(null);

  // Apply a full normalized state object (used by sync + reset)
  const applyAppState = (nextState) => {
    const normalized = normalizeAppStateData(nextState);
    navigationFocusTargetRef.current = 'none';
    setActiveTab(normalized.activeTab);
    setCurrentVignette(normalized.currentVignette);
    setSelectedOption(normalized.selectedOption);
    setSearchTerm(normalized.searchTerm);
    setActiveResourceFilter(normalized.activeResourceFilter);
    setQuizState(normalized.quizState);
    setShowSafeNote(normalized.showSafeNote);
    setScore(normalized.score);
    setCompletedModules(normalized.completedModules);
  };

  const applyAppStateRef = useRef(applyAppState);
  applyAppStateRef.current = applyAppState;

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

  // Navigate to a tab with an optional focus target (sets navigationFocusTargetRef for App)
  // Audit 25 / Sprint 6 (O11): Bei Browsern mit View Transition API wird der
  // Tab-Wechsel als Cross-Fade gerendert (Chromium 111+, Safari 18+). Das
  // macht den SPA-Wechsel als sanfte Uebergabe erfahrbar statt als
  // instantaner DOM-Austausch. Fallback fuer Firefox / aeltere Browser:
  // direkter State-Update (Verhalten wie vor Sprint 6). prefers-reduced-motion
  // bypasst die Transition bewusst -- Nutzer mit Motion-Aversion sollen
  // keine crossfade-Bewegung bekommen, auch keine sanfte.
  const navigate = useCallback((nextTab, options = {}) => {
    const { focusTarget = 'heading' } = options;
    navigationFocusTargetRef.current = focusTarget;

    const applyUpdate = () => setActiveTab((prev) => (prev === nextTab ? prev : nextTab));

    const supportsViewTransition =
      typeof document !== 'undefined' && typeof document.startViewTransition === 'function';
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (supportsViewTransition && !prefersReducedMotion) {
      document.startViewTransition(applyUpdate);
    } else {
      applyUpdate();
    }
  }, []);

  // Reset all persisted state to defaults
  const resetAppState = useCallback(() => {
    setIsResetting(true);
    const resetState = getDefaultAppState();
    window.setTimeout(() => {
      try {
        publishAppState(resetState);
      } catch {
        // continue with local reset even if persistence fails
      }
      skipNextPersistRef.current = true;
      applyAppStateRef.current(resetState);
      setIsResetting(false);
    }, 250);
  }, []);

  const handleQuizAnswer = useCallback((modId, answerIdx, correctIdx) => {
    setQuizState((prev) => ({
      ...prev,
      [modId]: { answerIdx, isCorrect: answerIdx === correctIdx },
    }));
    if (answerIdx === correctIdx) {
      setCompletedModules((prev) => (prev.includes(modId) ? prev : [...prev, modId]));
    } else {
      setCompletedModules((prev) => prev.filter((id) => id !== modId));
    }
  }, []);

  const handleScoreChange = useCallback((itemId) => {
    setScore((prev) => {
      const checked = prev.checked.includes(itemId)
        ? prev.checked.filter((entry) => entry !== itemId)
        : [...prev.checked, itemId];
      const risk = ASSESSMENT_ITEMS.filter((item) => checked.includes(item.id)).reduce(
        (sum, item) => sum + item.val,
        0
      );
      return { risk, checked };
    });
  }, []);

  const resetScore = useCallback(() => {
    setScore(DEFAULT_SCORE);
  }, []);

  const handleSelectVignetteOption = useCallback((vignetteId, optionId) => {
    setSelectedOption((prev) => ({
      ...prev,
      [vignetteId]: optionId,
    }));
  }, []);

  // Collect all persisted state for the persistence effect
  const persistedAppState = useMemo(
    () => ({
      activeTab,
      currentVignette,
      selectedOption,
      searchTerm,
      activeResourceFilter,
      quizState,
      showSafeNote,
      score,
      completedModules,
    }),
    [
      activeTab,
      currentVignette,
      selectedOption,
      searchTerm,
      activeResourceFilter,
      quizState,
      showSafeNote,
      score,
      completedModules,
    ]
  );

  // BroadcastChannel + cross-tab storage sync
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (!broadcastChannelRef.current && 'BroadcastChannel' in window) {
      broadcastChannelRef.current = new BroadcastChannel(APP_BROADCAST_CHANNEL);
    }

    const applyIncomingPayload = (payload) => {
      if (!isValidStoredAppState(payload)) return;
      if (payload.sourceId === tabInstanceIdRef.current) return;
      if (payload.updatedAt <= latestAppliedTimestampRef.current) return;

      // Preserve the current tab if it was explicitly set via URL hash
      const rawHash = typeof window !== 'undefined' ? String(window.location.hash || '').replace(/^#/, '') : '';
      const explicitTabHash = rawHash && rawHash !== 'main-content' ? rawHash : null;

      latestAppliedTimestampRef.current = payload.updatedAt;
      skipNextPersistRef.current = true;
      applyAppStateRef.current(explicitTabHash ? { ...payload.data, activeTab: explicitTabHash } : payload.data);
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

  // Persist state to localStorage whenever it changes
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (skipNextPersistRef.current) {
      skipNextPersistRef.current = false;
      return;
    }
    publishAppState(persistedAppState);
  }, [persistedAppState]);

  const value = useMemo(
    () => ({
      // State
      activeTab,
      currentVignette,
      selectedOption,
      searchTerm,
      activeResourceFilter,
      quizState,
      showSafeNote,
      score,
      completedModules,
      isResetting,
      // Refs shared with App
      navigationFocusTargetRef,
      // Actions
      navigate,
      setActiveTab,
      setCurrentVignette,
      setSearchTerm,
      setActiveResourceFilter,
      setShowSafeNote,
      handleQuizAnswer,
      handleScoreChange,
      resetScore,
      handleSelectVignetteOption,
      resetAppState,
    }),
    [
      activeTab,
      currentVignette,
      selectedOption,
      searchTerm,
      activeResourceFilter,
      quizState,
      showSafeNote,
      score,
      completedModules,
      isResetting,
      navigate,
      setActiveTab,
      setCurrentVignette,
      setSearchTerm,
      setActiveResourceFilter,
      setShowSafeNote,
      handleQuizAnswer,
      handleScoreChange,
      resetScore,
      handleSelectVignetteOption,
      resetAppState,
    ]
  );

  return <AppStateContext.Provider value={value}>{children}</AppStateContext.Provider>;
}
