// Zentrales Fachstellen-Register (Audit 12 Konsolidierung).
// Vereint die frueheren RESOURCE_DATA (networkContent.js) und SUPPORT_OFFERS
// (evidenceContent.js) zu einer einzigen Quelle. Die beiden frueheren Arrays
// hatten ca. acht ueberlappende Eintraege mit divergierenden Feldnamen
// ('info' vs. 'description', 'tags' vs. 'category+audience'). Diese Datei
// harmonisiert die Schemas und haelt pro Angebot einen Eintrag.

/**
 * @typedef {Object} Fachstelle
 * @property {string} id - Stabile kebab-case ID, dient fuer spaetere
 *   Cross-References. Pflichtfeld.
 * @property {string} name - Anzeigename wie er auf der Seite erscheint.
 * @property {string} description - Kurze Beschreibung (1-3 Saetze), enthaelt
 *   die wesentliche Abgrenzung und den primaeren Zielgruppen-Hinweis.
 * @property {string} link - URL zur Fachstelle. Pflichtfeld (kein null).
 * @property {string[]} tags - Fuer den Netzwerk-Filter. Muss aus der in
 *   NETWORK_FILTERS (networkContent.js) deklarierten Enumeration stammen.
 * @property {string=} audience - Zielgruppen-Bezeichnung (optional,
 *   relevant fuer Evidenz-Darstellung).
 * @property {string=} category - Thematische Kategorie (optional, relevant
 *   fuer Evidenz-Darstellung).
 * @property {boolean=} official - true, wenn offizielle/institutionelle
 *   Stelle (PUK, kantonale Stellen). Steuert Hervorhebung in Evidenz.
 * @property {string=} highlight - Kurz-Badge fuer Hervorhebung (optional,
 *   z.B. 'kostenlos · auch ohne PUK-Hospitalisation').
 */

/** @type {Fachstelle[]} */
export const FACHSTELLEN = [
  {
    id: 'puk-angehoerigenberatung',
    name: 'PUK Zürich – offizielle Angehörigenberatung',
    // Audit-Folge A5 (PUK-Karte): description war 270 Zeichen / drei Saetze und
    // verdoppelte Info, die ohnehin in `audience` (Zielgruppen-Aufzaehlung) und
    // `highlight` ("auch ohne PUK-Hospitalisation") sichtbar ist. Die Karte
    // wuchs dadurch auf ~518px Hoehe und fiel im 3-spaltigen Grid (ab >=1152px)
    // visuell aus der Reihe. Gekuerzt auf einen Satz / ~175 Zeichen, semantisch
    // identisch (kostenlos+vertraulich bleibt erhalten, Hospitalisation-Hinweis
    // wandert vollstaendig in den `highlight`-Badge).
    description:
      'Kostenlose, vertrauliche Beratung der Fachstelle Angehörigenarbeit für Angehörige und Bezugspersonen psychisch erkrankter Menschen — auch für betroffene Eltern und ihre Kinder.',
    link: 'https://www.pukzh.ch/patienten-angehoerige/informationen-fuer-angehoerige/',
    tags: ['Klinik', 'Zürich', 'offizielle Stelle'],
    audience: 'Angehörige, Eltern, Kinder, Fachpersonen',
    category: 'Offizielles Angebot',
    official: true,
    highlight: 'kostenlos · auch ohne PUK-Hospitalisation',
  },
  {
    id: 'iks',
    name: 'Institut Kinderseele Schweiz (iks)',
    description:
      'Nationale Anlaufstelle mit Beratung, Präventionsangeboten, Mediathek und Suchfunktion für Hilfen. Besonders hilfreich als erste Orientierung und für verständliche Materialien.',
    link: 'https://www.kinderseele.ch',
    tags: ['National', 'Beratung'],
    audience: 'Familien, Fachpersonen, Schulen',
    category: 'Schweizweite Kompetenzstelle',
  },
  {
    id: 'puk-notfall-eltern',
    name: 'PUK Zürich – Notfall für Eltern',
    description:
      'Rund um die Uhr erreichbares Krisen-, Abklärungs-, Notfall- und Triagezentrum für Kinder und Jugendliche.',
    link: 'https://www.pukzh.ch/unsere-angebote/kinder-und-jugendpsychiatrie/anmeldung/notfall-fuer-eltern/',
    tags: ['24/7', 'Jugendliche', 'Krise', 'Zürich', 'offizielle Stelle'],
  },
  {
    id: 'puk-erwachsene',
    name: 'PUK Erwachsene – Kontakt- und Notfallnummer',
    description:
      'Offizielle PUK-Kontakt- und Notfallnummer für Erwachsene; für nicht lebensbedrohliche Situationen im Kanton Zürich ergänzt das AERZTEFON die medizinische Triage.',
    link: 'https://www.pukzh.ch/zuweiser-fachpersonen/erwachsene/',
    tags: ['24/7', 'Erwachsene', 'Krise', 'Zürich'],
  },
  {
    id: 'aerztefon',
    name: 'AERZTEFON Kanton Zürich',
    description: 'Telefonische medizinische Triage für nicht lebensbedrohliche Situationen im Kanton Zürich.',
    link: 'https://www.aerztefon.ch/',
    tags: ['24/7', 'Triage', 'Zürich', 'Krise'],
  },
  {
    id: '143-dargebotene-hand',
    name: '143 – Die Dargebotene Hand',
    description: 'Anonyme und vertrauliche Krisenhilfe für Erwachsene per Telefon, Chat oder Mail.',
    link: 'https://www.143.ch/',
    tags: ['24/7', 'Erwachsene', 'Krise', 'anonym'],
  },
  {
    id: '147-pro-juventute',
    name: '147 – Beratung für Kinder und Jugendliche',
    description:
      'Kostenlose und vertrauliche Hilfe für Kinder und Jugendliche; das Telefon ist in akuten Situationen der schnellste Kontaktweg.',
    link: 'https://www.147.ch/de/beratung/dein-kontakt-zu-uns/',
    tags: ['24/7', 'Jugendliche', 'Krise', 'anonym'],
  },
  {
    id: 'kjz',
    name: 'kjz – Kinder- und Jugendhilfezentren Zürich',
    description:
      'Flächendeckende Beratung im Kanton Zürich bei Erziehungsfragen, Belastungen und Krisen. Vertrauliche Unterstützung durch Fachpersonen in verschiedenen Regionen des Kantons.',
    link: 'https://www.zh.ch/de/familie/angebote-fuer-familien-mit-kindern/kinder-und-jugendhilfezentren.html',
    tags: ['Behörde', 'Begleitung', 'kostenlos', 'Zürich'],
    audience: 'Familien mit Kindern',
    category: 'Kanton Zürich / kostenlose Beratung',
  },
  {
    id: 'kindeswohlabklaerung-zh',
    name: 'Kindeswohlabklärung Kanton Zürich',
    description:
      'Offizielle Übersicht zur Gefährdungsmeldung, Kindeswohlabklärung und Rolle von KESB und kjz im Kanton Zürich.',
    link: 'https://www.zh.ch/de/familie/kindes-und-erwachsenenschutz/kindeswohlabklaerung.html',
    tags: ['Kindesschutz', 'Behörde', 'Zürich', 'offizielle Stelle'],
  },
  {
    id: 'safezone',
    name: 'SafeZone',
    description: 'Kostenlose und anonyme Online-Suchtberatung für Betroffene, Angehörige und Nahestehende.',
    link: 'https://www.safezone.ch/de/',
    tags: ['Sucht', 'anonym', 'kostenlos'],
  },
  {
    id: 'stiftung-windlicht',
    name: 'Stiftung Windlicht',
    description:
      'Geschützter Raum in Winterthur und Zürich für Kinder psychisch erkrankter Eltern. Gruppentreffen sollen Entlastung, Zugehörigkeit und kindgerechte Stabilisierung ermöglichen.',
    link: 'https://stiftung-windlicht.ch',
    tags: ['Zürich', 'Kindergruppe'],
    audience: 'Kinder von 6 bis 14 Jahren',
    category: 'Kindergruppe',
  },
  {
    id: 'mvb-zh',
    name: 'Mütter- und Väterberatung Kanton Zürich',
    description: 'Kostenlose, vertrauliche und mehrsprachige Beratung für Familien mit Kindern von 0 bis 5 Jahren.',
    link: 'https://mvb.zh.ch/beratungsangebot/',
    tags: ['Eltern 0–5', 'kostenlos', 'mehrsprachig', 'offizielle Stelle', 'Zürich'],
  },
  {
    id: 'pro-mente-sana',
    name: 'Pro Mente Sana',
    description:
      'Unabhängige psychosoziale und rechtliche Beratung für Betroffene und Angehörige. Besonders sinnvoll als ergänzende nationale Stelle für Rechtefragen und allgemeine Orientierung.',
    link: 'https://promentesana.ch/angebote/beratung/beratung-fuer-betroffene-nahestehende',
    tags: ['kostenlos', 'Recht', 'Beratung', 'unabhängig'],
    audience: 'Betroffene, Angehörige, Nahestehende',
    category: 'Schweizweite Orientierung / Rechte',
  },
  {
    id: 'feel-ok',
    name: 'feel-ok.ch',
    description:
      'Schweizer Jugendportal mit Informationen, Hilfsangeboten und Orientierung für psychische Gesundheit und Krisen.',
    link: 'https://www.feel-ok.ch/de_CH/jugendliche/uebersicht.cfm',
    tags: ['Jugendliche', 'kostenlos'],
  },
  {
    id: 'selbsthilfe-zh',
    name: 'Selbsthilfe Zürich',
    description:
      'Vermittlung zu Selbsthilfegruppen und Austauschmöglichkeiten für Betroffene und Angehörige in der Region Zürich.',
    link: 'https://www.selbsthilfezuerich.ch/shzh/de.html',
    tags: ['Selbsthilfe', 'Zürich'],
  },
  {
    id: 'caritas-mit-mir',
    name: 'Caritas «mit mir»-Patenschaften',
    description:
      'Patenschaftsangebot mit verlässlichen erwachsenen Bezugspersonen ausserhalb der Familie. Kann Kinder entlasten und Eltern zusätzliche Luft im Alltag verschaffen.',
    link: 'https://caritas-regio.ch/angebote/familie/mit-mir-patenschaften',
    tags: ['Entlastung', 'Zürich'],
    audience: 'Kinder und Familien',
    category: 'Entlastung im Alltag',
  },
  {
    id: 'vask-zh',
    name: 'VASK Zürich',
    description:
      'Selbsthilfegruppen und Treffpunkte für Angehörige psychisch erkrankter Menschen. Besonders geeignet, wenn Austausch mit ähnlich Betroffenen im Vordergrund steht.',
    link: 'https://www.vaskzuerich.ch/de/Angebote-der-VASK/Treffpunkte',
    tags: ['Selbsthilfe', 'Zürich'],
    audience: 'Angehörige und erwachsene Kinder',
    category: 'Selbsthilfe / Angehörige',
  },
  {
    id: 'elternnotruf',
    name: 'Elternnotruf',
    description:
      'Niederschwellige Beratung für Eltern in Krisen. Geeignet, wenn rasch Orientierung, Entlastung und erste nächste Schritte gebraucht werden.',
    link: 'https://www.elternnotruf.ch/angebot/beratung',
    tags: ['Krise', 'Beratung', 'Erwachsene'],
    audience: 'Eltern in akuten Belastungssituationen',
    category: 'Krisenberatung',
  },
  {
    id: 'zebra-winterthur',
    name: 'Zebra Winterthur',
    description:
      'Beratung für Kinder aus suchtbelasteten Familien. Wichtig, wenn psychische Belastung und Suchtthematik in der Familie zusammenkommen.',
    link: 'https://stadt.winterthur.ch/themen/leben-in-winterthur/alter-gesundheit-und-soziales/sucht/zebra',
    tags: ['Sucht', 'Jugendliche', 'Zürich'],
    audience: 'Kinder und Jugendliche',
    category: 'Suchtbelastete Familien',
  },
];

/**
 * IDs der Fachstellen, die in der Evidenz-Ansicht unter 'SUPPORT_OFFERS'
 * erscheinen sollen. Alle haben category und audience gesetzt.
 * @type {string[]}
 */
export const SUPPORT_OFFER_IDS = [
  'puk-angehoerigenberatung',
  'iks',
  'kjz',
  'stiftung-windlicht',
  'caritas-mit-mir',
  'vask-zh',
  'elternnotruf',
  'pro-mente-sana',
  'zebra-winterthur',
];
