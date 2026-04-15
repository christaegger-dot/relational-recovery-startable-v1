import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { getPageHeadingId, normalizeHashToTab } from './appHelpers';

const SECTION_ALIAS_MAP = {
  'network-map': 'netzwerk-karte',
  'network-directory': 'netzwerk-fachstellen',
  'netzwerk-karte': 'netzwerk-karte',
  'netzwerk-fachstellen': 'netzwerk-fachstellen',
};

function getExplicitTabHash() {
  if (typeof window === 'undefined') return null;
  const rawHash = String(window.location.hash || '').replace(/^#/, '');
  if (!rawHash || rawHash === 'main-content') return null;
  const normalizedHash = normalizeHashToTab(rawHash);
  return normalizedHash === 'start' && rawHash !== 'start' ? null : normalizedHash;
}

function getSectionHashTarget(hashValue) {
  const cleaned = String(hashValue || '')
    .replace(/^#/, '')
    .trim()
    .toLowerCase();
  return SECTION_ALIAS_MAP[cleaned] ?? null;
}

export default function useNavigationFocus({
  activeTab,
  setActiveTab,
  navigationFocusTargetRef,
  mainContentRef,
  toolboxRefs,
}) {
  const focusFrameRef = useRef(null);
  const skipLinkActivatedRef = useRef(false);
  const hasProcessedInitialFocusRef = useRef(false);

  const [pendingPriorityFocus, setPendingPriorityFocus] = useState(null);
  const [pendingSectionHash, setPendingSectionHash] = useState(() => {
    if (typeof window === 'undefined') return null;
    const rawHash = String(window.location.hash || '')
      .replace(/^#/, '')
      .trim()
      .toLowerCase();
    return SECTION_ALIAS_MAP[rawHash] ?? null;
  });

  useLayoutEffect(() => {
    if (typeof window !== 'undefined') {
      // Hash -> activeTab Synchronisation darf NUR beim initial mount
      // passieren. Bei nachfolgenden Renders (z. B. nach einem Nav-Button-
      // Klick, der setActiveTab aufruft) wuerde diese Logik den frischen
      // State faelschlich auf den alten URL-Hash zuruecksetzen, weil
      // window.location.hash zu diesem Zeitpunkt noch nicht aktualisiert
      // ist (der Hash-Sync geschieht erst weiter unten in diesem Effect).
      if (!hasProcessedInitialFocusRef.current) {
        const explicitTabHash = getExplicitTabHash();
        if (explicitTabHash && explicitTabHash !== activeTab) {
          navigationFocusTargetRef.current = explicitTabHash === 'start' ? 'none' : 'heading';
          setActiveTab(explicitTabHash);
          return undefined;
        }
      }

      const rawHash = String(window.location.hash || '')
        .replace(/^#/, '')
        .trim()
        .toLowerCase();
      const currentHashTab = rawHash ? normalizeHashToTab(rawHash) : null;
      const shouldPreserveSectionHash =
        rawHash && rawHash !== activeTab && currentHashTab === activeTab && getSectionHashTarget(rawHash);

      const nextHash = `#${activeTab}`;
      if (!shouldPreserveSectionHash && window.location.hash !== nextHash) {
        window.location.hash = nextHash;
      }
    }

    const focusTarget = navigationFocusTargetRef.current;
    if (!hasProcessedInitialFocusRef.current) {
      hasProcessedInitialFocusRef.current = true;
      if (activeTab === 'start') {
        navigationFocusTargetRef.current = 'none';
        return undefined;
      }
    }

    if (focusTarget === 'none' || skipLinkActivatedRef.current) {
      skipLinkActivatedRef.current = false;
      navigationFocusTargetRef.current = 'none';
      return undefined;
    }

    let remainingAttempts = 60;

    const focusNavigationTarget = () => {
      const headingId = getPageHeadingId(activeTab);
      const heading = typeof document !== 'undefined' ? document.getElementById(headingId) : null;

      if (focusTarget === 'main' && mainContentRef.current && typeof mainContentRef.current.focus === 'function') {
        mainContentRef.current.focus();
        focusFrameRef.current = null;
        navigationFocusTargetRef.current = 'none';
        return;
      }

      if (heading && typeof heading.focus === 'function') {
        heading.focus();
        focusFrameRef.current = null;
        navigationFocusTargetRef.current = 'none';
        return;
      }

      if (remainingAttempts > 0) {
        remainingAttempts -= 1;
        focusFrameRef.current = window.requestAnimationFrame(focusNavigationTarget);
      } else if (mainContentRef.current) {
        mainContentRef.current.focus();
        focusFrameRef.current = null;
        navigationFocusTargetRef.current = 'none';
      }
    };

    focusFrameRef.current = window.requestAnimationFrame(focusNavigationTarget);

    return () => {
      if (focusFrameRef.current !== null) {
        window.cancelAnimationFrame(focusFrameRef.current);
        focusFrameRef.current = null;
      }
    };
    // navigationFocusTargetRef and setActiveTab are stable (ref object and state setter)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleHashChange = () => {
      const rawHash = String(window.location.hash || '').replace(/^#/, '');

      if (rawHash === 'main-content') {
        navigationFocusTargetRef.current = 'main';
        skipLinkActivatedRef.current = true;
        window.requestAnimationFrame(() => {
          if (mainContentRef.current && typeof mainContentRef.current.focus === 'function') {
            mainContentRef.current.focus();
          }
        });
        return;
      }

      const sectionHashTarget = getSectionHashTarget(rawHash);
      const nextTab = normalizeHashToTab(window.location.hash);
      navigationFocusTargetRef.current = sectionHashTarget ? 'none' : 'heading';
      setPendingSectionHash(sectionHashTarget);
      setActiveTab((prev) => (prev === nextTab ? prev : nextTab));
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
    // navigationFocusTargetRef and setActiveTab are stable (ref object and state setter)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!pendingSectionHash) return;

    const targetTab = normalizeHashToTab(pendingSectionHash);
    if (activeTab !== targetTab) return;

    let cancelled = false;

    const focusSectionTarget = () => {
      if (cancelled) return;
      const targetElement = document.getElementById(pendingSectionHash);
      if (!targetElement) return;

      targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      const heading = targetElement.querySelector('h2, h3');
      if (heading && typeof heading.focus === 'function') {
        heading.focus();
      } else if (typeof targetElement.focus === 'function') {
        targetElement.focus();
      }
      setPendingSectionHash(null);
    };

    let innerFrame;
    const frame = window.requestAnimationFrame(() => {
      innerFrame = window.requestAnimationFrame(focusSectionTarget);
    });

    return () => {
      cancelled = true;
      window.cancelAnimationFrame(frame);
      if (innerFrame) window.cancelAnimationFrame(innerFrame);
    };
  }, [activeTab, pendingSectionHash]);

  useEffect(() => {
    if (activeTab !== 'toolbox' || !pendingPriorityFocus) return;

    const refMap = {
      'acute-crisis': toolboxRefs.acuteCrisisSectionRef,
      'safety-plan': toolboxRefs.safetyPlanSectionRef,
      'child-protection': toolboxRefs.childProtectionSectionRef,
      addiction: toolboxRefs.addictionSectionRef,
      rights: toolboxRefs.rightsSectionRef,
    };

    const targetRef = refMap[pendingPriorityFocus];
    const targetElement = targetRef?.current;
    if (!targetElement) return;

    const frame = window.requestAnimationFrame(() => {
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      const heading = targetElement.querySelector('h3, h2');
      if (heading && typeof heading.focus === 'function') {
        heading.focus();
      } else if (typeof targetElement.focus === 'function') {
        targetElement.focus();
      }
    });

    setPendingPriorityFocus(null);

    return () => window.cancelAnimationFrame(frame);
  }, [activeTab, pendingPriorityFocus, toolboxRefs]);

  return {
    skipLinkActivatedRef,
    setPendingPriorityFocus,
  };
}
