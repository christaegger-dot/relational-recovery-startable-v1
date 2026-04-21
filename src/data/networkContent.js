// RESOURCE_DATA wurde in Audit 12 zu FACHSTELLEN (src/data/fachstellenContent.js)
// konsolidiert. Neue Eintraege bitte dort pflegen. Siehe docs/content-pflege.md.

// Audit P2 #13: Die 13 Filter-Chips wurden zuvor flach in einer
// einzigen Zeile gerendert, obwohl die Intro-Copy bereits eine
// Gruppierung versprach. Wir sortieren sie nun nach User-Intent
// (Modell A des Cluster-Vorschlags):
//
//   - Erreichbarkeit: wann/wie ist die Stelle ansprechbar
//   - Lebensphase:    fuer welche Altersgruppe gedacht
//   - Schwerpunkt:    welche Profil-/Themenmarker hat die Stelle
//   - Rahmen:         praktische Konditionen (Region, Sprache, Kosten)
//
// "Alle" bleibt als separater Reset-Chip ohne Gruppe (group: null)
// und wird im Template visuell vor den Gruppen platziert.
export const NETWORK_FILTER_GROUPS = [
  { id: 'erreichbarkeit', label: 'Erreichbarkeit' },
  { id: 'lebensphase', label: 'Lebensphase' },
  { id: 'schwerpunkt', label: 'Schwerpunkt' },
  { id: 'rahmen', label: 'Rahmen' },
];

export const NETWORK_FILTERS = [
  { id: 'all', label: 'Alle', group: null },
  { id: 'Krise', label: 'Krise', group: 'erreichbarkeit' },
  { id: '24/7', label: '24/7', group: 'erreichbarkeit' },
  { id: 'anonym', label: 'anonym', group: 'erreichbarkeit' },
  { id: 'Jugendliche', label: 'Jugendliche', group: 'lebensphase' },
  { id: 'Erwachsene', label: 'Erwachsene', group: 'lebensphase' },
  { id: 'Eltern 0–5', label: 'Eltern 0–5', group: 'lebensphase' },
  { id: 'offizielle Stelle', label: 'offizielle Stelle', group: 'schwerpunkt' },
  { id: 'Selbsthilfe', label: 'Selbsthilfe', group: 'schwerpunkt' },
  { id: 'Sucht', label: 'Sucht', group: 'schwerpunkt' },
  { id: 'Entlastung', label: 'Entlastung', group: 'schwerpunkt' },
  { id: 'Zürich', label: 'Zürich', group: 'rahmen' },
  { id: 'mehrsprachig', label: 'mehrsprachig', group: 'rahmen' },
  { id: 'kostenlos', label: 'kostenlos', group: 'rahmen' },
];

export const NETWORK_MAP_STEPS = [
  'zuerst alle wichtigen Personen und Stellen sammeln: Familie, erweiterte Familie, Freunde, Schule, Betreuung, Fachstellen',
  'danach Nähe, Vertrauen und Erreichbarkeit sichtbar machen: Wer ist nah, wer eher randständig, wer aktuell belastbar?',
  'anschliessend Lücken besprechen: Wo fehlt Unterstützung, wer weiss schon Bescheid, wem könnte man sich anvertrauen?',
];

// Leitfragen fuer die Exploration durch die Fachperson -- bewusst in
// Beobachtungsform formuliert ("der/des Betroffenen", "die/der Betroffene"),
// nicht als direkte Du-Anrede an Patient:innen. Konsistent mit
// `primaryAudience: 'fachperson'` des Netzwerk-Tabs (siehe CLAUDE.md
// "Zielgruppen"). Issue #118 hat die frueher hier verbliebene Du-Form
// auf Sie- bzw. Fachperson-Perspektive umgestellt.
export const NETWORK_MAP_QUESTIONS = [
  'Wer gehört zur Kernfamilie der/des Betroffenen, wer zur erweiterten Familie?',
  'Wer hat der/dem Betroffenen oder der Familie bei Schwierigkeiten schon geholfen?',
  'Mit wem kann die/der Betroffene reden oder etwas unternehmen?',
  'Wer weiss über die aktuelle Belastung oder Erkrankung Bescheid?',
  'Gibt es Schule, Verein, Nachbarschaft oder Fachstellen, die eine tragende Rolle spielen?',
  'Wem möchte die/der Betroffene was erzählen, wo braucht es eher Schutz der Privatsphäre?',
];

export const NETWORK_MAP_LENSES = [
  {
    id: 'all',
    label: 'Gesamtbild',
    description: 'Alle tragenden, formellen und noch fehlenden Verbindungen in einer Übersicht.',
  },
  {
    id: 'private',
    label: 'Privates Umfeld',
    description: 'Wer ist emotional nah, im Alltag erreichbar oder als vertraute Person relevant?',
  },
  {
    id: 'support',
    label: 'Alltagsstützen',
    description: 'Welche Personen oder Orte tragen Betreuung, Tagesstruktur und spontane Entlastung mit?',
  },
  {
    id: 'formal',
    label: 'Fachstellen',
    description: 'Welche professionellen oder institutionellen Kontakte sind bereits im Netzwerk verankert?',
  },
  {
    id: 'gap',
    label: 'Lücken',
    description: 'Wo fehlen derzeit Mitwissende, Betreuung oder formelle Absicherung?',
  },
];

export const NETWORK_MAP_TEMPLATE_NODES = [
  {
    label: 'Partner:in',
    positionKey: 'partner-in',
    tone: 'private',
    zone: 'near',
    detail: 'Oft wichtigste Person für Alltag, Mitwissen und frühe Krisenwahrnehmung.',
    mobileRow: '1 / span 1',
    mobileCol: '2 / span 2',
    desktopTop: '22%',
    desktopLeft: '48%',
  },
  {
    label: 'Grosseltern',
    positionKey: 'grosseltern',
    tone: 'private',
    zone: 'mid',
    detail: 'Kann Betreuung, Entlastung oder emotionale Stabilität mittragen.',
    mobileRow: '2 / span 1',
    mobileCol: '1 / span 2',
    desktopTop: '48%',
    desktopLeft: '16%',
  },
  {
    label: 'Schule / Kita',
    positionKey: 'schule-kita',
    tone: 'support',
    zone: 'mid',
    detail: 'Wichtig für Tagesstruktur, Rückmeldungen und abgestimmte Beobachtung.',
    mobileRow: '2 / span 1',
    mobileCol: '3 / span 2',
    desktopTop: '49%',
    desktopLeft: '80%',
  },
  {
    label: 'Freund:in des Kindes',
    positionKey: 'freund-in-des-kindes',
    tone: 'support',
    zone: 'outer',
    detail: 'Zeigt soziale Einbindung und entlastende Aussenbezüge für das Kind.',
    mobileRow: '3 / span 1',
    mobileCol: '1 / span 2',
    desktopTop: '76%',
    desktopLeft: '30%',
  },
  {
    label: 'PUK / kjz',
    positionKey: 'puk-kjz',
    tone: 'formal',
    zone: 'outer',
    detail: 'Steht für klinische oder jugendhilfliche Mitverantwortung im Netzwerk.',
    mobileRow: '3 / span 1',
    mobileCol: '3 / span 2',
    desktopTop: '74%',
    desktopLeft: '69%',
  },
  {
    label: 'Kinderbetreuung im Notfall',
    positionKey: 'kinderbetreuung-im-notfall',
    tone: 'gap',
    zone: 'gap',
    detail: 'Wenn hier niemand benannt werden kann, ist die Krisenvorsorge lückenhaft.',
    mobileRow: '4 / span 1',
    mobileCol: '1 / span 2',
    desktopTop: '15%',
    desktopLeft: '82%',
  },
  {
    label: 'Mitwissende Vertrauensperson',
    positionKey: 'mitwissende-vertrauensperson',
    tone: 'gap',
    zone: 'gap',
    detail: 'Fehlt eine informierte Person, steigt die Belastung oft deutlich an.',
    mobileRow: '4 / span 1',
    mobileCol: '3 / span 2',
    desktopTop: '84%',
    desktopLeft: '12%',
  },
];

// Rechtsberatungs-Linkliste (Audit 03)
// Kategorien und Einträge kuratiert; gepflegte Liste mit realen Fachstellen.
// Neue Einträge ergänzen bestehende Kategorien oder neue Kategorie oben anhängen.
export const LEGAL_COUNSELING_CATEGORIES = [
  { id: 'psychosozial', label: 'Unabhängige psychosoziale Rechtsberatung' },
  { id: 'ombudsstelle', label: 'Ombudsstelle Kindesschutz' },
  { id: 'rechtspflege', label: 'Unentgeltliche Rechtspflege' },
  { id: 'elternberatung', label: 'Elternberatung Kindesschutz' },
  { id: 'angehoerige', label: 'Angehörigen-spezifische Rechtsberatung' },
];

export const LEGAL_COUNSELING_RESOURCES = [
  // Quelle: Juristische Faktenbasis Abschnitte 2, 3, 5
  {
    name: 'Pro Mente Sana',
    category: 'psychosozial',
    info: 'Kostenlose Beratung zu psychosozialen und rechtlichen Fragen im Kindes- und Erwachsenenschutz. Unabhängig von Kanton und Institution.',
    phone: '0848 800 858',
    link: 'https://www.promentesana.ch',
  },
  {
    name: 'Pro Juventute Elternberatung',
    category: 'elternberatung',
    info: 'Kostenlose, anonyme Beratung für Eltern, 24/7 erreichbar. Niederschwellige psychosoziale Orientierung, nicht primär rechtsberatend.',
    phone: '058 261 61 61',
    link: 'https://www.projuventute.ch/de/elternberatung',
  },
  {
    name: 'kjz Kanton Zürich -- Einzelfallberatung Kindesschutz',
    category: 'elternberatung',
    info: 'Anonyme Fallberatung in Kindesschutzfragen für Fachpersonen und Angehörige. 14 Standorte im Kanton Zürich. Die Anonymität der Betroffenen wird gewahrt.',
    link: 'https://www.zh.ch/de/familie/angebote-fuer-familien-mit-kindern/kinder-und-jugendhilfezentren.html',
  },
  {
    name: 'Verfahren und Rechtsschutz bei der KESB (Stadt Zürich)',
    category: 'rechtspflege',
    info: 'Offizielle Information zu Verfahrensrechten, Akteneinsicht, Beschwerde und unentgeltlicher Rechtspflege im KESB-Verfahren.',
    link: 'https://www.stadt-zuerich.ch/de/lebenslagen/kindes-und-erwachsenenschutz/verfahren-rechtsschutz.html',
  },
  {
    name: '147 -- Beratung für Kinder und Jugendliche',
    category: 'elternberatung',
    info: 'Kostenloses und vertrauliches Angebot von Pro Juventute für Kinder und Jugendliche. Auch per Chat und SMS erreichbar.',
    phone: '147',
    link: 'https://www.147.ch/',
  },
];
