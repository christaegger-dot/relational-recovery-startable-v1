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

const DEFAULT_TITLE = 'Relational Recovery – Schweizer Fachportal';
const DEFAULT_DESCRIPTION =
  'Psychoedukative Web-App für Angehörige und Fachpersonen mit Fokus auf Elternschaft, psychische Krise, Kindesschutz und regionale Unterstützung in Zürich und der Schweiz.';
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
    title: 'Relational Recovery – Orientierung für Angehörige und Fachpersonen',
    description:
      'Einstieg in das Fachportal mit Training, systemischer Orientierung, Krisenhilfe, Netzwerk und printfähigen Arbeitshilfen.',
    ogTitle: 'Relational Recovery – Begleitung ist Beziehungsarbeit',
    ogDescription:
      'Interaktive Fachressourcen für die Begleitung von Eltern mit psychischer Belastung – mit Training, systemischer Orientierung, Krisenhilfe und Netzwerk.',
  },
  lernmodule: {
    title: 'Lernmodule – Relational Recovery',
    description:
      'Kompakte Lerneinheiten zur systemischen Falllogik, Sprache und Gesprächsführung in belasteten Familiensituationen.',
    ogTitle: 'Lernmodule für die Fachpraxis – Relational Recovery',
    ogDescription:
      'Schrittweise Lernbausteine für Fachpersonen: Sprache, Falllogik und Gesprächsorientierung in der Begleitung psychisch belasteter Eltern.',
  },
  vignetten: {
    title: 'Training – Relational Recovery',
    description:
      'Trainingsfälle zur Fallreflexion und Dialogführung in belasteten Familiensystemen, mit klinisch angelegter Entscheidungslogik.',
    ogTitle: 'Fallvignetten für Reflexion und Dialog – Relational Recovery',
    ogDescription:
      'Typische Entscheidungssituationen aus der Fachpraxis: Belastungsdynamik, Sprache und nächste Schritte konkret üben.',
  },
  glossar: {
    title: 'Glossar – Relational Recovery',
    description:
      'Zentrale Fachbegriffe für die Arbeit mit psychisch belasteten Eltern und ihren Angehörigen, kurz und anwendungsbezogen definiert.',
    ogTitle: 'Glossar – Gemeinsame Sprache für die Fachpraxis',
    ogDescription:
      'Sprache im Kontakt, Schutz und Risiko, Versorgung und Trialog – kompakt definiert und auf typische Arbeitssituationen bezogen.',
  },
  grundlagen: {
    title: 'Grundlagen und häufige Fragen – Relational Recovery',
    description:
      'Orientierende Antworten für Angehörige: Belastung verstehen, Grenzen und Verantwortung sortieren, Zusammenarbeit mit Hilfen strukturieren.',
    ogTitle: 'Grundlagen für Angehörige – Relational Recovery',
    ogDescription:
      'Häufige Fragen in einer klaren, entlastenden Sprache: Belastung verstehen, Grenzen klären, nächste Schritte finden.',
  },
  evidenz: {
    title: 'Evidenzbereich – Relational Recovery',
    description:
      'Kuratierte Einstiegspunkte, Materialien und Referenzen für die systemische Einordnung von Belastung in Elternsystemen.',
    ogTitle: 'Evidenz und Wissensraum – Relational Recovery',
    ogDescription:
      'Familiendynamik, Schutzfaktoren und Psychoedukation – Grundlagen, Vertiefung und Materialien für die Fachpraxis.',
  },
  toolbox: {
    title: 'Toolbox – Orientierung, Schutz und nächste Schritte',
    description:
      'Klinische Gesprächshilfe für Belastungseinschätzung, Triage, Sicherheitsplanung und Kindesschutz – ohne Diagnosefunktion.',
    ogTitle: 'Toolbox – Relational Recovery',
    ogDescription:
      'Strukturierte Einschätzung familiärer Belastung als Gesprächshilfe für Abwägung, Schutz und nächste tragfähige Schritte.',
  },
  netzwerk: {
    title: 'Netzwerk und Fachstellen – Relational Recovery',
    description:
      'Regionale Fachstellen für Krise, Beratung, Entlastung und Weitervermittlung im Kanton Zürich und schweizweit, plus Arbeitskarte.',
    ogTitle: 'Netzwerk – Relational Recovery',
    ogDescription:
      'Fachstellenverzeichnis und Netzwerkkarte für Triage, Entlastung und Weitervermittlung an passende Angebote.',
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
