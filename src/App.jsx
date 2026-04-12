// Design note: This file preserves the application's information architecture while the visual language is shifted toward a warm editorial interface with calmer surfaces, serif-led hierarchy and lower-arousal accents.
import { lazy, Suspense, memo, useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import './styles/app-global.css';
import { AlertTriangle, ShieldCheck } from 'lucide-react';
import Header from './components/Header';
import Footer from './components/Footer';
import HomeLandingTemplate from './templates/HomeLandingTemplate';
import { SAFETY_PLAN_TEMPLATE_FIELDS } from './data/toolboxContent';
import { downloadTextFile, getPageHeadingId, normalizeHashToTab } from './utils/appHelpers';
import { useAppState } from './context/useAppState';

const ElearningSection = lazy(() => import('./sections/ElearningSection'));
const VignettenSection = lazy(() => import('./sections/VignettenSection'));
const GlossarSection = lazy(() => import('./sections/GlossarSection'));
const GrundlagenSection = lazy(() => import('./sections/GrundlagenSection'));
const ToolboxSection = lazy(() => import('./sections/ToolboxSection'));
const NetworkSection = lazy(() => import('./sections/NetworkSection'));
const EvidenceSection = lazy(() => import('./sections/EvidenceSection'));

const SECTION_ALIAS_MAP = {
  'network-map': 'netzwerk-karte',
  'network-directory': 'netzwerk-fachstellen',
  'netzwerk-karte': 'netzwerk-karte',
  'netzwerk-fachstellen': 'netzwerk-fachstellen',
};

const SectionLoadingFallback = memo(function SectionLoadingFallback() {
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
});

function getFocusableElements(container) {
  if (!container || typeof container.querySelectorAll !== 'function') return [];

  return Array.from(
    container.querySelectorAll(
      'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), summary, [tabindex]:not([tabindex="-1"])'
    )
  ).filter(
    (element) =>
      !element.hasAttribute('disabled') &&
      element.getAttribute('aria-hidden') !== 'true' &&
      element.offsetParent !== null
  );
}

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

  const focusFrameRef = useRef(null);
  const mainContentRef = useRef(null);
  const skipLinkActivatedRef = useRef(false);
  const hasProcessedInitialFocusRef = useRef(false);

  // Toolbox section refs
  const acuteCrisisSectionRef = useRef(null);
  const safetyPlanSectionRef = useRef(null);
  const childProtectionSectionRef = useRef(null);
  const addictionSectionRef = useRef(null);
  const rightsSectionRef = useRef(null);

  // Mobile menu: keyed by activeTab so it auto-closes on navigation without setState in effect
  const [mobileMenuOpenForTab, setMobileMenuOpenForTab] = useState(null);
  const mobileMenuOpen = mobileMenuOpenForTab === activeTab;
  const openMobileMenu = useCallback(() => setMobileMenuOpenForTab(activeTab), [activeTab]);
  const closeMobileMenu = useCallback(() => setMobileMenuOpenForTab(null), []);
  const mobileMenuButtonRef = useRef(null);
  const firstMobileNavItemRef = useRef(null);
  const mobileMenuContainerRef = useRef(null);

  // Pending focus/scroll targets driven by navigation
  const [pendingPriorityFocus, setPendingPriorityFocus] = useState(null);
  const [pendingSectionHash, setPendingSectionHash] = useState(() => {
    if (typeof window === 'undefined') return null;
    const rawHash = String(window.location.hash || '')
      .replace(/^#/, '')
      .trim()
      .toLowerCase();
    return SECTION_ALIAS_MAP[rawHash] ?? null;
  });

  const getExplicitTabHash = () => {
    if (typeof window === 'undefined') return null;
    const rawHash = String(window.location.hash || '').replace(/^#/, '');
    if (!rawHash || rawHash === 'main-content') return null;
    const normalizedHash = normalizeHashToTab(rawHash);
    return normalizedHash === 'start' && rawHash !== 'start' ? null : normalizedHash;
  };

  const getSectionHashTarget = (hashValue) => {
    const cleaned = String(hashValue || '')
      .replace(/^#/, '')
      .trim()
      .toLowerCase();
    return SECTION_ALIAS_MAP[cleaned] ?? null;
  };

  useLayoutEffect(() => {
    if (typeof window !== 'undefined') {
      const explicitTabHash = getExplicitTabHash();
      if (explicitTabHash && explicitTabHash !== activeTab) {
        navigationFocusTargetRef.current = explicitTabHash === 'start' ? 'none' : 'heading';
        setActiveTab(explicitTabHash);
        return undefined;
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

    const frame = window.requestAnimationFrame(() => {
      window.requestAnimationFrame(focusSectionTarget);
    });

    return () => {
      cancelled = true;
      window.cancelAnimationFrame(frame);
    };
  }, [activeTab, pendingSectionHash]);

  useEffect(() => {
    if (activeTab !== 'toolbox' || !pendingPriorityFocus) return;

    const refMap = {
      'acute-crisis': acuteCrisisSectionRef,
      'safety-plan': safetyPlanSectionRef,
      'child-protection': childProtectionSectionRef,
      addiction: addictionSectionRef,
      rights: rightsSectionRef,
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
        closeMobileMenu();
        window.requestAnimationFrame(() => {
          mobileMenuButtonRef.current?.focus();
        });
        return;
      }

      if (event.key !== 'Tab') return;

      const container = mobileMenuContainerRef.current;
      if (!container) return;

      const focusableElements = getFocusableElements(container);

      if (!focusableElements.length) return;

      const first = focusableElements[0];
      const last = focusableElements[focusableElements.length - 1];
      const active = document.activeElement;

      if (!container.contains(active)) {
        event.preventDefault();
        first.focus();
        return;
      }

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
  }, [mobileMenuOpen, closeMobileMenu]);

  const openPriorityToolboxSection = useCallback(
    (section) => {
      navigate('toolbox', { focusTarget: 'heading' });
      setPendingPriorityFocus(section);
    },
    [navigate]
  );

  const handleEmergencyAccess = useCallback(() => {
    openPriorityToolboxSection('acute-crisis');
  }, [openPriorityToolboxSection]);

  const handleDownloadCrisisPlan = useCallback(() => {
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
`;
    downloadTextFile('krisenplan-vorlage.txt', template);
  }, [score.risk]);

  const handleDownloadConversationGuide = () => {
    const template = `Gesprächsleitfaden für Fachpersonen

Einsatz: Erstgespräch, Verlaufsgespräch, Supervision
Aktueller Assessment-Score: ${score.risk}
Hinweis: Kurz halten, beobachtbar bleiben, nächste Schritte konkretisieren.

1. Elternrolle und Alltag
- Wie erleben Sie Ihre Rolle als Mutter oder Vater im Moment?
- Was gelingt im Alltag noch verlässlich?
- Wo ist es derzeit am fragilsten?

2. Versorgung und Sicherheit der Kinder
- Wer betreut die Kinder aktuell?
- Was ist heute und bis morgen verlässlich gesichert?
- Gibt es Anzeichen für Überforderung, Desorganisation oder Versorgungslücken?

3. Kindliche Wahrnehmung
- Was wissen die Kinder bereits?
- Worüber wurde offen gesprochen, worüber noch nicht?
- Gibt es Sorgen, Missverständnisse oder stille Mitverantwortung?

4. Netzwerk und Mitwissende
- Wer weiss Bescheid?
- Wer kann kurzfristig mittragen?
- Welche Fachstelle oder Bezugsperson sollte als Nächstes einbezogen werden?

5. Krisenvorsorge
- Gibt es Warnzeichen, eine Kontaktkette und einen Kinder-Schutzteil?
- Was sollte vor der nächsten Belastungsspitze schriftlich geklärt werden?

6. Nächster Schritt
- Was wird heute vereinbart?
- Wer macht was bis wann?
- Wann wird erneut Kontakt aufgenommen?
`;

    downloadTextFile('gespraechsleitfaden-fachpersonen.txt', template);
  };

  const handleDownloadNetworkMap = () => {
    const template = `Netzwerkkarte - Arbeitsvorlage

Ziel: Tragende Kontakte, Fachstellen und Versorgungslücken sichtbar machen.

1. Kernfamilie
- Wer gehört zum engsten Familiensystem?
- Wer lebt im selben Haushalt?

2. Privates Umfeld
- Verwandte:
- Freundinnen/Freunde:
- Nachbarschaft:
- Weitere vertraute Personen:

3. Alltag und Betreuung
- Kita / Schule:
- Hort / Tagesstruktur:
- Freizeit / Vereine:
- Wer kann Übergaben oder kurzfristige Betreuung übernehmen?

4. Fachstellen
- Hausärztin / Hausarzt:
- Behandlungsteam:
- kjz / Familienberatung:
- Weitere Fachstellen:

5. Mitwissende
- Wer weiss über die aktuelle Belastung Bescheid?
- Wer darf im Krisenfall kontaktiert werden?

6. Versorgungslücken
- Wo fehlt aktuell Unterstützung?
- Welche Zeiten, Aufgaben oder Übergänge sind ungenügend abgesichert?

7. Nächster Schritt
- Welche Person oder Stelle wird als Nächstes konkret angefragt?
`;

    downloadTextFile('netzwerkkarte-vorlage.txt', template);
  };

  const handleDownloadPsychoeducationGuide = () => {
    const template = `Mit Kindern über die psychische Erkrankung eines Elternteils sprechen

Kurzhilfe für Fachpersonen

1. Vorbereitung
- Mit den Eltern klären, was das Kind bereits weiss.
- Ziele des Gesprächs festlegen: entlasten, orientieren, Missverständnisse reduzieren.
- Sprache einfach, konkret und altersgerecht halten.

2. Was im Gespräch meist hilft
- Die Erkrankung benennen, ohne das Kind zu überfordern.
- Klar sagen: Das Kind ist nicht schuld.
- Erklären, was sich im Alltag ändern kann und was gleich bleibt.
- Fragen zulassen und Unsicherheit aushalten.

3. Was eher vermieden werden sollte
- Zu viele Fachbegriffe
- Beschwichtigungen, die das Erleben des Kindes entwerten
- Loyalitätsdruck oder implizite Geheimhaltungsaufträge
- Übertragung von Erwachsenenverantwortung auf das Kind

4. Leitfragen
- Was macht dem Kind im Moment am meisten Sorgen?
- Was muss das Kind verstehen, um den Alltag besser einordnen zu können?
- Wer kann nach dem Gespräch weitere Fragen auffangen?

5. Abschluss
- Eine klare Kernaussage formulieren
- Nächsten Gesprächsanlass vereinbaren
- Mit Eltern und Netzwerk klären, wie offen weiter gesprochen werden soll
`;

    downloadTextFile('psychoedukation-mit-kindern-sprechen.txt', template);
  };

  const handleDownloadProtectionChecklist = () => {
    const template = `Schutzfaktoren-Check und Versorgungsübersicht

Einsatz: Fallreflexion, Verlaufsbeobachtung, Supervision
Aktueller Assessment-Score: ${score.risk}

1. Verlässliche Bezugspersonen
- Gibt es mindestens eine emotional erreichbare erwachsene Person?
- Ist klar, wer in Belastungsspitzen mitträgt?

2. Alltag und Routinen
- Sind Schlafen, Essen, Schule/Kita und Übergaben ausreichend stabil?
- Wo kippt die Struktur zuerst?

3. Sprache und Orientierung
- Wissen die Kinder altersgerecht, was los ist?
- Gibt es Worte für Krisen, Rückzug, Angst oder Klinikaufenthalte?

4. Entlastung und Netzwerk
- Welche private oder professionelle Unterstützung ist bereits aktiv?
- Wo fehlen noch konkrete Mitwissende oder Entlastungsangebote?

5. Krisenvorsorge
- Gibt es Warnzeichen, Kontaktkette, Kinderbetreuung und sichere Orte?
- Ist festgelegt, wer wann informiert wird?

6. Klinische Einordnung
- Was wirkt aktuell tragend?
- Was ist brüchig oder unklar?
- Was ist der nächste sinnvolle Schritt?
`;

    downloadTextFile('schutzfaktoren-check.txt', template);
  };

  const handleDownloadCompactCrisisSheet = () => {
    const template = `Krisenplan kompakt

Kurzblatt für Gespräch, Mitgabe oder Supervision
Aktueller Assessment-Score: ${score.risk}

1. Warnzeichen
- 

2. Sofortkontakt
- 

3. Kinderbetreuung
- 

4. Sicherer Ort / sichere Übergabe
- 

5. Wer informiert wen
- 

6. Nächster Schritt bis zum nächsten Kontakt
- 
`;

    downloadTextFile('krisenplan-kompakt.txt', template);
  };

  const handleToolboxPrint = useCallback(() => {
    if (typeof window === 'undefined') return;
    window.requestAnimationFrame(() => {
      window.print();
    });
  }, []);

  const downloadResources = [
    {
      title: 'Gesprächsleitfaden für Fachpersonen',
      description:
        'Kurzblatt für Erstgespräch, Verlaufsgespräch oder Supervision mit Fokus auf Elternrolle, Versorgung, Netzwerk und nächsten Schritt.',
      meta: ['TXT editierbar', 'Gespräch / Supervision'],
      actionLabel: 'Leitfaden herunterladen',
      onDownload: handleDownloadConversationGuide,
    },
    {
      title: 'Netzwerkkarte als Arbeitsvorlage',
      description:
        'Strukturierte Vorlage für private Kontakte, Alltagsstützen, Fachstellen, Mitwissende und Versorgungslücken.',
      meta: ['TXT editierbar', 'Vernetzung / Mapping'],
      actionLabel: 'Netzwerkkarte herunterladen',
      onDownload: handleDownloadNetworkMap,
    },
    {
      title: 'Psychoedukations-Hilfe',
      description:
        'Kurzhilfe für Fachpersonen zum Sprechen mit Kindern über die psychische Erkrankung eines Elternteils.',
      meta: ['TXT editierbar', 'Gespräch mit Kindern'],
      actionLabel: 'Kurzhilfe herunterladen',
      onDownload: handleDownloadPsychoeducationGuide,
    },
    {
      title: 'Schutzfaktoren-Check',
      description: 'Einseitige Versorgungsübersicht für Fallreflexion, Verlaufsbeobachtung und Supervision.',
      meta: ['TXT editierbar', 'Schutz / Verlauf'],
      actionLabel: 'Check herunterladen',
      onDownload: handleDownloadProtectionChecklist,
    },
    {
      title: 'Krisenplan kompakt',
      description: 'Reduzierte Kurzvorlage für Mitgabe, Besprechung oder schnelle gemeinsame Krisenvorsorge.',
      meta: ['TXT editierbar', 'Krise / Mitgabe'],
      actionLabel: 'Kurzvorlage herunterladen',
      onDownload: handleDownloadCompactCrisisSheet,
    },
  ];

  return (
    <div className="min-h-screen bg-[#f6efe7] flex flex-col font-sans text-stone-900 overflow-x-hidden selection:bg-[#ead8c3] selection:text-[#5f3c2d]">
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
              <ShieldCheck size={16} className="shrink-0 text-[#f0c786]" />
              <span>
                Lokale Speicherung im Browser • auf gemeinsam genutzten Geräten nach der Nutzung zurücksetzen • keine
                serverseitige Falldokumentation in dieser Ansicht
              </span>
            </div>
            <button
              type="button"
              onClick={() => setShowSafeNote(false)}
              className="haptic-btn rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-[0.18em] text-[#f0c786] transition-colors hover:bg-white/10 hover:text-white"
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
            Bei akuter Lebensgefahr: <span className="font-extrabold">144</span>. Im Kanton Zürich bei nicht
            lebensbedrohlichen Situationen:
            <span className="font-extrabold"> AERZTEFON 0800 33 66 55</span>. Für Jugendliche ist{' '}
            <span className="font-extrabold">147 telefonisch</span> der schnellste Weg.
          </div>
          <button
            type="button"
            onClick={handleEmergencyAccess}
            className="haptic-btn inline-flex items-center gap-2 rounded-full border border-[#dec2b2] bg-white/80 px-4 py-2 text-[11px] font-extrabold uppercase tracking-[0.18em] text-[#8d3f32] shadow-[0_10px_24px_rgba(141,63,50,0.06)] transition-colors hover:bg-[#fff0e6]"
          >
            <AlertTriangle size={14} />
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
        <Suspense fallback={<SectionLoadingFallback />}>
          {activeTab === 'start' && <HomeLandingTemplate pageHeadingId={getPageHeadingId('start')} />}

          {activeTab === 'lernmodule' && <ElearningSection />}

          {activeTab === 'vignetten' && <VignettenSection />}

          {activeTab === 'glossar' && <GlossarSection />}

          {activeTab === 'grundlagen' && <GrundlagenSection sharedDownloadResources={downloadResources} />}

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
      </main>

      <Footer />
    </div>
  );
}
