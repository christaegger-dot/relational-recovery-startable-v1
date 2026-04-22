// Per-Route-Meta fuer dynamische document.title-, OG- und canonical-Updates.
// Wird vom Hook useDocumentMeta (src/utils/useDocumentMeta.js) beim Tab-Wechsel gelesen.
// Swiss-German-Orthografie durchgehend (ss statt ß).
//
// BASE_URL zeigt auf die Netlify-Produktionsadresse; canonical referenziert sie
// und bleibt bei hash-basiertem Routing bewusst identisch fuer alle Routen, weil
// Fragment-URLs von Crawlern nicht als separate Ressourcen behandelt werden.

/**
 * @typedef {Object} RouteMeta
 * @property {string} title - document.title pro Route.
 * @property {string} description - meta[name=description].
 * @property {string} ogTitle - og:title und twitter:title.
 * @property {string} ogDescription - og:description und twitter:description.
 * @property {string} ogImage - Absolute URL auf Bild fuer OG/Twitter-Card.
 * @property {string} canonical - Absolute URL fuer <link rel='canonical'>.
 *   Bleibt bei hash-basiertem Routing bewusst fuer alle Routen identisch auf
 *   der Root-URL, weil Fragment-URLs kein separater Crawler-Endpunkt sind.
 */

// Audit 12 / W4: Base-URL kommt ueber eine Vite-Environment-Variable. Der
// Fallback sichert Dev- und Preview-Szenarien, in denen keine .env existiert.
export const BASE_URL = import.meta.env.VITE_BASE_URL || 'https://eltern-angehoerige-fa.netlify.app';

// Offizieller Website-Titel (seit Audience-Cut-Strategie Phase 2):
// Klares Fachportal-Profil. Der frühere Projekt-/Arbeitstitel
// "Relational Recovery" wird in Meta, SEO und sichtbarem Branding durch
// den fachlich präzisen Titel abgelöst. Angehörige sind weiterhin
// erreichbar, aber nicht mehr als gleichrangige Hauptzielgruppe in der
// Portal-Selbstbeschreibung genannt.
const DEFAULT_TITLE = 'Eltern mit psychischen Erkrankungen im Beratungskontext';
const DEFAULT_DESCRIPTION =
  'Fachportal für Orientierung, Triage und Weitervermittlung: Arbeitshilfen für Fachpersonen, die mit Familien mit psychisch belasteten Eltern arbeiten. Schwerpunkt Kanton Zürich, schweizweite Ergänzungen.';
const DEFAULT_OG_IMAGE = `${BASE_URL}/og-image.webp`;

/** @type {RouteMeta} */
export const DEFAULT_META = {
  title: DEFAULT_TITLE,
  description: DEFAULT_DESCRIPTION,
  ogTitle: DEFAULT_TITLE,
  ogDescription: DEFAULT_DESCRIPTION,
  ogImage: DEFAULT_OG_IMAGE,
  canonical: `${BASE_URL}/`,
};

export const ROUTE_META = {
  start: {
    title: 'Eltern mit psychischen Erkrankungen im Beratungskontext',
    description:
      'Fachportal für Orientierung, Triage und Weitervermittlung: Einstieg mit Arbeitshilfen, Trainingsfällen, systemischer Einordnung und regionalen Fachstellen.',
    ogTitle: 'Fachportal für Orientierung, Triage und Weitervermittlung',
    ogDescription:
      'Arbeitshilfen für Fachpersonen, die mit Familien mit psychisch belasteten Eltern arbeiten – Toolbox, Trainingsfälle, Wissensraum, regionale Fachstellen.',
  },
  lernmodule: {
    title: 'Lernmodule – Eltern mit psychischen Erkrankungen im Beratungskontext',
    description:
      'Kompakte Lerneinheiten für Fachpersonen: Sprache, Falllogik und Gesprächsführung in der Arbeit mit belasteten Familiensystemen.',
    ogTitle: 'Lernmodule für die Fachpraxis',
    ogDescription:
      'Schrittweise Lernbausteine für Fachpersonen: Sprache, Falllogik und Gesprächsorientierung in der Begleitung psychisch belasteter Eltern.',
  },
  vignetten: {
    title: 'Training – Eltern mit psychischen Erkrankungen im Beratungskontext',
    description:
      'Trainingsfälle für Fachpersonen: Fallreflexion und Dialogführung in belasteten Familiensystemen, mit klinisch angelegter Entscheidungslogik.',
    ogTitle: 'Trainingsfälle für Reflexion und Dialog',
    ogDescription:
      'Typische Entscheidungssituationen aus der Fachpraxis: Belastungsdynamik, Sprache und nächste Schritte konkret üben.',
  },
  glossar: {
    title: 'Glossar – Eltern mit psychischen Erkrankungen im Beratungskontext',
    description:
      'Zentrale Fachbegriffe für die Arbeit mit psychisch belasteten Eltern und ihren Familien, kurz und anwendungsbezogen definiert.',
    ogTitle: 'Glossar – Gemeinsame Sprache für die Fachpraxis',
    ogDescription:
      'Sprache im Kontakt, Schutz und Risiko, Versorgung und Trialog – kompakt definiert und auf typische Arbeitssituationen bezogen.',
  },
  material: {
    title: 'Material – Für Patient:innen und Angehörige',
    description:
      'Handout-Material, das Fachpersonen im Gespräch mit Patient:innen und Angehörigen einsetzen oder zur Weitergabe verlinken können: Belastung verstehen, Grenzen und Verantwortung sortieren, Kinder altersgerecht aufklären.',
    ogTitle: 'Material – Handouts für Patient:innen und Angehörige',
    ogDescription:
      'Häufige Fragen in einer klaren, entlastenden Sprache: Belastung verstehen, Grenzen klären, nächste Schritte finden.',
  },
  evidenz: {
    title: 'Evidenz – Eltern mit psychischen Erkrankungen im Beratungskontext',
    description:
      'Kuratierte Einstiegspunkte, Materialien und Referenzen für die systemische Einordnung von Belastung in Elternsystemen.',
    ogTitle: 'Evidenz und Wissensraum',
    ogDescription:
      'Familiendynamik, Schutzfaktoren und Psychoedukation – Grundlagen, Vertiefung und Materialien für die Fachpraxis.',
  },
  toolbox: {
    title: 'Toolbox – Orientierung, Schutz und nächste Schritte',
    description:
      'Klinische Gesprächshilfe für Fachpersonen: Belastungseinschätzung, Triage, Sicherheitsplanung und Kindesschutz – ohne Diagnosefunktion.',
    ogTitle: 'Toolbox – Arbeitshilfen für die Fachpraxis',
    ogDescription:
      'Strukturierte Einschätzung familiärer Belastung als Gesprächshilfe für Abwägung, Schutz und nächste tragfähige Schritte.',
  },
  netzwerk: {
    title: 'Netzwerk – Weitervermittlung, Triage, regionale Fachstellen',
    description:
      'Fachstellenverzeichnis und Netzwerkkarte für die Arbeit mit Familien mit psychisch belasteten Eltern: Weitervermittlung, Triage, Entlastung – Kanton Zürich und schweizweite Ergänzungen.',
    ogTitle: 'Netzwerk – Fachstellen und Weitervermittlung',
    ogDescription:
      'Regionale Fachstellen für Weitervermittlung, Triage und Entlastung – Zürich-Fokus mit schweizweiten Ergänzungen.',
  },
  impressum: {
    title: 'Impressum – Eltern mit psychischen Erkrankungen im Beratungskontext',
    description: 'Angaben zum Betreiber, zur inhaltlichen Verantwortung und zum Haftungsrahmen des Fachportals.',
    ogTitle: 'Impressum',
    ogDescription: 'Betreiber, inhaltliche Verantwortung und rechtliche Rahmung des Fachportals.',
  },
  datenschutz: {
    title: 'Datenschutzerklärung – Eltern mit psychischen Erkrankungen im Beratungskontext',
    description:
      'Transparenzhinweise zur Datenverarbeitung: lokaler Browser-Speicher, Hosting, keine Cookies, keine Analytics. Grundlage: nDSG.',
    ogTitle: 'Datenschutzerklärung',
    ogDescription:
      'Was die Seite speichert, was sie nicht speichert und welche Rechte Sie nach dem Bundesgesetz über den Datenschutz haben.',
  },
};

/**
 * Liefert das Meta-Objekt fuer eine Route. Unbekannte tabId faellt auf
 * DEFAULT_META zurueck.
 * @param {string} tabId
 * @returns {RouteMeta}
 */
export const getRouteMeta = (tabId) => {
  const routeEntry = ROUTE_META[tabId];
  if (!routeEntry) return { ...DEFAULT_META };

  return {
    ...DEFAULT_META,
    ...routeEntry,
    ogImage: routeEntry.ogImage ?? DEFAULT_META.ogImage,
    // Canonical bleibt bewusst auf der Root-URL, weil Fragment-URLs kein
    // getrennter Crawler-Endpunkt sind.
    canonical: DEFAULT_META.canonical,
  };
};
