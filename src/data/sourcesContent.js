// Zentrales Quellen-Register für das gesamte Projekt.
// Jeder Eintrag wird über seine ID von Claims in evidenceContent.js (und anderen Dateien)
// via sourceIds[] referenziert. Quelle: Audit 04 Recherche-Ergebnisse.

/**
 * @typedef {('journal-article'|'book'|'report'|'weblink'|'editorial')} SourceType
 */

/**
 * @typedef {Object} Source
 * @property {string} id - Stabile ID, kebab-case. Konvention: nachname-jahr
 *   oder leadwort-jahr. Wird aus evidenceContent.js via sourceIds[] referenziert.
 * @property {string} author - Vollstaendige Autor:innen-Liste in Zitationsform.
 * @property {number|null} year - Erscheinungsjahr; null wenn unbekannt (z.B.
 *   bei fortlaufend aktualisierten Weblinks).
 * @property {string} title - Titel der Arbeit.
 * @property {string|null} journal - Zeitschriften-Angabe inkl. Jahrgang/Heft/
 *   Seitenzahlen; null bei Buechern, Berichten, Weblinks.
 * @property {string|null} publisher - Verlag oder herausgebende Institution;
 *   null wenn durch journal/DOI ausreichend verankert.
 * @property {SourceType} type - Publikationstyp.
 * @property {string|null} doi - DOI ohne URL-Praefix (z.B. '10.1111/inm.12820');
 *   null wenn keine DOI vergeben.
 * @property {string|null} link - URL zur Quelle; null wenn nicht verfuegbar.
 * @property {boolean} chFocus - true, wenn es sich um eine Schweizer
 *   Primaer- oder Hauptquelle handelt (Audit-04-Pattern). Wichtig fuer die
 *   Sortierung und Hervorhebung in der Evidenz-Ansicht.
 */

/** @type {Record<string, Source>} */
export const SOURCES = {
  // === Schweizer Primärquellen ===

  'obsan-72-schuler-2016': {
    id: 'obsan-72-schuler-2016',
    author: 'Schuler, D., Tuch, A., Buscher, N. & Camenzind, P.',
    year: 2016,
    title: 'Psychische Gesundheit in der Schweiz. Monitoring 2016',
    journal: null,
    publisher: 'Obsan Bericht 72, Neuchâtel: Schweizerisches Gesundheitsobservatorium',
    type: 'report',
    doi: null,
    link: 'https://www.obsan.admin.ch/sites/default/files/obsan_72_bericht_2.pdf',
    chFocus: true,
  },

  'albermann-mueller-2021': {
    id: 'albermann-mueller-2021',
    author: 'Albermann, K. & Müller, B.',
    year: 2021,
    title: 'Kinder und Jugendliche aus Familien mit einem psychisch erkrankten Elternteil',
    journal: 'Paediatrica, 32(4), 5',
    publisher: 'Pädiatrie Schweiz',
    type: 'journal-article',
    doi: '10.35190/d2021.4.5',
    link: 'https://cdn.paediatrieschweiz.ch/production/uploads/2021/11/32-4-2021_5_all.pdf',
    chFocus: true,
  },

  'stauber-2020': {
    id: 'stauber-2020',
    author: 'Stauber, A., Nyffeler, C. & Gosteli, L.',
    year: 2020,
    title: 'Psychisch kranke Eltern im Beratungskontext. Was stärkt psychisch kranke Eltern und deren Kinder?',
    journal: null,
    publisher: 'Praxisforschung der Erziehungsberatung des Kantons Bern, Band 25. Bern: Erziehungsberatung des Kantons Bern',
    type: 'report',
    doi: null,
    link: 'https://www.eb.bkd.be.ch/content/dam/eb_bkd/bilder/de/themen/praxisforschung/eb-pf-band-25-psychisch-kranke-eltern-im-beratungskontext.pdf',
    chFocus: true,
  },

  'puk-angehoerigenarbeit': {
    id: 'puk-angehoerigenarbeit',
    author: 'Psychiatrische Universitätsklinik Zürich',
    year: null,
    title: 'Informationen für Angehörige -- Fachstelle Angehörigenarbeit',
    journal: null,
    publisher: 'PUK Zürich',
    type: 'weblink',
    doi: null,
    link: 'https://www.pukzh.ch/patienten-angehoerige/informationen-fuer-angehoerige/',
    chFocus: true,
  },

  'kokes-statistik-2024': {
    id: 'kokes-statistik-2024',
    author: 'KOKES',
    year: 2024,
    title: 'Jahresstatistik 2024 -- Kennzahlen Kindes- und Erwachsenenschutz',
    journal: null,
    publisher: 'KOKES',
    type: 'report',
    doi: null,
    link: 'https://www.kokes.ch/download_file/view/ce9f9344-b159-4166-9712-a63b94d0ece9/262',
    chFocus: true,
  },

  // === Internationale Primärquellen ===

  'lenz-2014': {
    id: 'lenz-2014',
    author: 'Lenz, A.',
    year: 2014,
    title: 'Kinder psychisch kranker Eltern',
    journal: null,
    publisher: 'Göttingen: Hogrefe',
    type: 'book',
    doi: null,
    link: null,
    chFocus: false,
  },

  'plass-wiegandgrefe-2012': {
    id: 'plass-wiegandgrefe-2012',
    author: 'Plass, A. & Wiegand-Grefe, S.',
    year: 2012,
    title: 'Kinder psychisch kranker Eltern. Entwicklungsrisiken erkennen und behandeln',
    journal: null,
    publisher: 'Weinheim: Beltz (Neuauflage 2017)',
    type: 'book',
    doi: null,
    link: 'https://www.beltz.de/fileadmin/beltz/leseproben/978-3-621-27914-7.pdf',
    chFocus: false,
  },
  // TODO (Audit 12, redaktionelle Klaerung): Die LITERATUR-Liste zitierte unter
  // demselben Autor:innen-Paar einen Stuttgart/Kohlhammer-Band mit abweichendem
  // Titel ('Ursachen, Folgen und Hilfen fuer Kinder psychisch Kranker'). Bis
  // zur Klaerung durch die Auftraggeberin wird dieser Band als separater
  // Eintrag gefuehrt, damit keine Quelle vorschnell verloren geht. Vermutlich
  // zwei verschiedene Werke. Siehe docs/content-pflege.md -> 'Offene
  // redaktionelle Klaerungen'.
  'plass-wiegandgrefe-2012-kohlhammer': {
    id: 'plass-wiegandgrefe-2012-kohlhammer',
    author: 'Plass, A. & Wiegand-Grefe, S.',
    year: 2012,
    title: 'Ursachen, Folgen und Hilfen für Kinder psychisch Kranker',
    journal: null,
    publisher: 'Stuttgart: Kohlhammer',
    type: 'book',
    doi: null,
    link: null,
    chFocus: false,
  },

  'jones-2016': {
    id: 'jones-2016',
    author: 'Jones, M. et al.',
    year: 2016,
    title: 'Parents with mental illness -- a qualitative study of identities and experiences with support services',
    journal: 'Journal of Psychiatric and Mental Health Nursing, 23(8), 471-478',
    publisher: null,
    type: 'journal-article',
    doi: '10.1111/jpm.12321',
    link: 'https://pubmed.ncbi.nlm.nih.gov/27500507/',
    chFocus: false,
  },

  'reupert-2021': {
    id: 'reupert-2021',
    author: 'Reupert, A. et al.',
    year: 2021,
    title: 'Stigma in relation to families living with parental mental illness: An integrative review',
    journal: 'International Journal of Mental Health Nursing, 30(1), 6-26',
    publisher: null,
    type: 'journal-article',
    doi: '10.1111/inm.12820',
    link: 'https://pubmed.ncbi.nlm.nih.gov/33283387/',
    chFocus: false,
  },

  'lenz-2019': {
    id: 'lenz-2019',
    author: 'Lenz, A.',
    year: 2019,
    title: 'Interventionen bei Kindern psychisch kranker Eltern: Grundlagen, Methoden und Strategien',
    journal: null,
    publisher: 'Kinderschutzkongress 2019, Zürich',
    type: 'editorial',
    doi: null,
    link: null,
    chFocus: false,
  },

  'hoeller-2023': {
    id: 'hoeller-2023',
    author: 'Höller, I., Forkmann, T., Hündlings, A., Specka, M. & Scherbaum, N.',
    year: 2023,
    title: 'Hilfsbedarf und soziale Unterstützung bei psychisch erkrankten Elternteilen mit minderjährigen Kindern',
    journal: 'Psychiatrische Praxis, 50(1), 20-28',
    publisher: null,
    type: 'journal-article',
    doi: '10.1055/a-1704-6391',
    link: 'https://pubmed.ncbi.nlm.nih.gov/35081630/',
    chFocus: false,
  },

  'grube-dorn-2007': {
    id: 'grube-dorn-2007',
    author: 'Grube, M. & Dorn, A.',
    year: 2007,
    title: 'Elternschaft bei psychisch Kranken',
    journal: 'Psychiatrische Praxis, 34(2), 66-71',
    publisher: null,
    type: 'journal-article',
    doi: '10.1055/s-2006-940095',
    link: null,
    chFocus: false,
  },

  'leijdesdorff-2017': {
    id: 'leijdesdorff-2017',
    author: 'Leijdesdorff, S., van Doesum, K., Popma, A., Klaassen, R. & van Amelsvoort, T.',
    year: 2017,
    title: 'Prevalence of psychopathology in children of parents with mental illness and/or addiction: an up to date narrative review',
    journal: 'Current Opinion in Psychiatry, 30(4), 312-317',
    publisher: null,
    type: 'journal-article',
    doi: '10.1097/YCO.0000000000000341',
    link: 'https://pubmed.ncbi.nlm.nih.gov/28441171/',
    chFocus: false,
  },

  'koopmann-2025': {
    id: 'koopmann-2025',
    author: 'Koopmann, A., Hoell, A., Meyer-Lindenberg, A. et al.',
    year: 2025,
    title: 'Elternschaft und psychische Erkrankungen',
    journal: 'Der Nervenarzt, 96(6), 597-599',
    publisher: null,
    type: 'journal-article',
    doi: '10.1007/s00115-024-01781-8',
    link: 'https://pubmed.ncbi.nlm.nih.gov/39592511/',
    chFocus: false,
  },

  'wiegand-grefe-2024': {
    id: 'wiegand-grefe-2024',
    author: 'Wiegand-Grefe, S., Halverscheid, S., Plass-Christl, A. et al.',
    year: 2024,
    title: 'Unterstützung für Familien mit einem psychisch erkrankten Elternteil',
    journal: 'Der Nervenarzt, 95(1), 56-63',
    publisher: null,
    type: 'journal-article',
    doi: '10.1007/s00115-023-01584-3',
    link: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC10808136/',
    chFocus: false,
  },

  'wiegand-grefe-plass-christl-2025': {
    id: 'wiegand-grefe-plass-christl-2025',
    author: 'Wiegand-Grefe, S. & Plass-Christl, A.',
    year: 2025,
    title: 'Kinder psychisch kranker Eltern. Entwicklungsrisiken erkennen und behandeln (2. Auflage)',
    journal: null,
    publisher: 'Weinheim: Beltz',
    type: 'book',
    doi: null,
    link: 'https://www.beltz.de/fachmedien/psychologie/produkte/details/54163-kinder-psychisch-kranker-eltern.html',
    chFocus: false,
  },
};
