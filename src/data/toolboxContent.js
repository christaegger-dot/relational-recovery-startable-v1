export const ACUTE_CRISIS_STEPS = [
  'Suizidgedanken oder akute Gefährdung ruhig und direkt ansprechen.',
  'Bei akuter Lebensgefahr sofort 144 wählen und nicht erst lange erklären.',
  'Kinder und andere abhängige Personen sofort in Sicherheit bringen.',
  'Parallel eine Vertrauensperson oder professionelle Stelle dazuholen.',
];

export const ACUTE_CRISIS_CONTACTS = [
  {
    name: '144',
    note: 'Schweizer Notruf bei akuter Lebensgefahr',
    link: null,
  },
  {
    name: 'PUK Zürich – Notfall für Eltern',
    note: 'Kinder- und jugendpsychiatrischer Notfall für Eltern',
    link: 'https://www.pukzh.ch/unsere-angebote/kinder-und-jugendpsychiatrie/anmeldung/notfall-fuer-eltern/',
  },
  {
    name: 'PUK Erwachsene',
    note: 'Psychiatrische Notfallkontakte für Erwachsene',
    link: 'https://www.pukzh.ch/zuweiser-fachpersonen/erwachsene/',
  },
  {
    name: 'AERZTEFON',
    note: 'Triage im Kanton Zürich bei nicht lebensbedrohlichen Situationen',
    link: 'https://www.aerztefon.ch/',
  },
  {
    name: '143',
    note: 'Anonyme Krisenhilfe für Erwachsene',
    link: 'https://www.143.ch/',
  },
  {
    name: '147',
    note: 'Jugendhilfe; das Telefon ist in akuten Situationen der schnellste Kontakt, WhatsApp und E-Mail eher bei weniger dringlichen Anliegen.',
    link: 'https://www.147.ch/de/beratung/dein-kontakt-zu-uns/',
  },
];

export const SAFETY_PLAN_POINTS = [
  'Warnzeichen: Woran merken wir früh, dass es kippt?',
  'Selbstberuhigung: Was hilft kurzfristig, ohne die Lage zu verschärfen?',
  'Kontaktkette: Wen rufen wir zuerst, wen danach an?',
  'Kinder-Schutzteil: Wer übernimmt Betreuung, Übergaben und Information?',
  'Risikoreduktion: Was muss vorübergehend sicher verstaut oder reduziert werden?',
  'Nachsorge: Wer kümmert sich um Anschluss an Beratung oder Behandlung?',
];

export const SAFETY_PLAN_TEMPLATE_FIELDS = [
  {
    title: 'Warnzeichen',
    hint: 'Woran merken wir früh, dass es kippt? Zum Beispiel Schlaf, Rückzug, Gereiztheit oder Hoffnungslosigkeit.',
  },
  {
    title: 'Sofortkontakte',
    hint: 'Wer wird zuerst angerufen? In welcher Reihenfolge? Notruf, PUK, AERZTEFON, Vertrauensperson.',
  },
  {
    title: 'Kinderbetreuung',
    hint: 'Wer übernimmt die Kinder sofort? Wo können sie sicher bleiben oder übernachten?',
  },
  {
    title: 'Sichere Orte',
    hint: 'Wo ist es gerade ruhiger, heller und weniger isoliert? Welche Orte helfen kurzfristig?',
  },
  {
    title: 'Wer informiert wen',
    hint: 'Wer informiert Schule, Kita, weitere Bezugspersonen oder Angehörige – und was genau wird gesagt?',
  },
  {
    title: 'Was wird gesichert',
    hint: 'Welche Medikamente, Mittel, Schlüssel oder anderen Risiken müssen vorübergehend sicher weg?',
  },
];

export const CHILD_PROTECTION_THRESHOLDS = [
  {
    title: 'Freiwillige Hilfe zuerst',
    text: 'Wenn Sicherheit und Grundversorgung aktuell gewährleistet sind, ist freiwillige Unterstützung oft der erste sinnvolle Schritt – zum Beispiel über das kjz, Familienberatung oder konkrete Entlastung im Alltag.',
  },
  {
    title: 'Wann es enger wird',
    text: 'Wenn Nahrung, Aufsicht, medizinische Versorgung, Sicherheit oder Schutz vor Gewalt nicht verlässlich gewährleistet sind, braucht es eine vertiefte Kindesschutzabklärung.',
  },
  {
    title: 'Was eine Meldung bedeutet',
    text: 'Eine besorgte Person muss eine Gefährdung nicht beweisen. Die Prüfung und Kindeswohlabklärung ist Aufgabe der KESB oder der beauftragten Fachstellen.',
  },
];

export const CHILD_PROTECTION_TIPS = [
  'Beobachtbare Fakten notieren, nicht vorschnell Diagnosen formulieren.',
  'Bei Unsicherheit zuerst fachlich rückfragen – etwa beim kjz oder einer offiziellen Beratungsstelle.',
  'Leitfrage für den Alltag: Sind Sicherheit, Nahrung, Aufsicht und Schutz auch morgen verlässlich gewährleistet?',
  'Nach einer Meldung weiter kooperieren: Schutz und Beziehung müssen nicht gegeneinander ausgespielt werden.',
  'Vor einer Meldung können Sie sich anonym beraten lassen -- etwa bei Pro Mente Sana (0848 800 858) oder beim kjz.',
];

// STUB L1: Stufenfolge der Kindesschutzmassnahmen (Art. 307-310 ZGB)
// INHALT AUSSTEHEND – juristische Validierung erforderlich, siehe qa/audit-03-juristische-validierung.md
// Vorgesehene Platzierung: Toolbox-Cluster "Kindeswohl", als eigene Karte nach CHILD_PROTECTION_THRESHOLDS
// Geschätzter Umfang: ~150-200 Wörter
// Outline:
//   1. Ermahnung und Weisung (Art. 307 Abs. 3) – Sorgerecht bleibt
//   2. Beistandschaft (Art. 308) – häufigste Massnahme, Sorgerecht bleibt
//   3. Aufhebung Aufenthaltsbestimmungsrecht (Art. 310) – Fremdplatzierung, Sorgerecht bleibt
//   4. Sorgerechtsentzug (Art. 311/312) – schwerste Massnahme, in der Praxis selten
export const CHILD_PROTECTION_MEASURES_STUB = {
  _status: 'STUB_PENDING_LEGAL_REVIEW',
  _see: 'qa/audit-03-juristische-validierung.md',
  title: 'Was nach einer Meldung passieren kann',
  steps: [
    { article: 'Art. 307 Abs. 3', label: 'Ermahnung und Weisung', description: '' },
    { article: 'Art. 308', label: 'Beistandschaft', description: '' },
    { article: 'Art. 310', label: 'Aufhebung Aufenthaltsbestimmungsrecht', description: '' },
    { article: 'Art. 311/312', label: 'Sorgerechtsentzug', description: '' },
  ],
};

// STUB L5: Anonyme Beratung vor einer Meldung
// Direkt umsetzbar (keine juristische Validierung nötig)
// Wird in Phase 3 als Ergänzung zu CHILD_PROTECTION_TIPS eingefügt

export const ADDICTION_PANELS = [
  {
    title: 'Psychische Erkrankung und Substanzkonsum zusammen denken',
    text: 'Alkohol, Medikamente, Cannabis oder andere Substanzen können psychische Symptome verstärken, Krisen verschärfen und Behandlung erschweren. Für Familien ist wichtig, Moral und Sicherheit auseinanderzuhalten.',
  },
  {
    title: 'Grenzen ohne Beschämung',
    text: 'Hilfreich sind klare Sicherheitsregeln: keine Kinderbetreuung unter starkem Einfluss, kein Fahren unter Einfluss, keine Beschaffung von Substanzen. Gleichzeitig sollten Hilfewege offen bleiben.',
  },
  {
    title: 'Niederschwelliger Einstieg',
    text: 'Gerade bei Scham, Rückzug oder Ambivalenz kann anonyme Online-Beratung ein realistischer erster Schritt sein – auch für Angehörige und Nahestehende.',
  },
];

export const ADDICTION_TIPS = [
  'über Auswirkungen im Alltag sprechen, nicht über Schuld',
  'Sicherheitsregeln für Kinderbetreuung, Autofahren, Geld und Medikamente festlegen',
  'bei Intoxikation, Entzug oder Impulsivität Suizid- und Gewaltrisiken mitdenken',
  'anonyme und kostenlose Suchtberatung wie SafeZone als Einstieg nutzen',
];

export const RIGHTS_FAQ = [
  {
    question: 'Was dürfen Angehörige dem Behandlungsteam mitteilen?',
    answer:
      'Relevante Beobachtungen zu Alltag, Kindersicherheit, Krisenverlauf oder Versorgung dürfen Angehörige immer weitergeben. Schweigepflicht verhindert meist eher das Zurückmelden als das Zuhören.',
  },
  {
    question: 'Was dürfen Teams ohne Einwilligung oft nicht zurückmelden?',
    answer:
      'Ohne Zustimmung der betroffenen Person dürfen Teams meist keine detaillierten Behandlungsinformationen herausgeben. Trotzdem können sie Informationen aufnehmen und allgemeine Orientierung geben.',
  },
  {
    question: 'Wozu dient eine psychiatrische Patientenverfügung?',
    answer:
      'Sie hilft, Wünsche für Krisen oder Phasen eingeschränkter Urteilsfähigkeit früh festzuhalten – zum Beispiel zu Behandlung, Kontakten oder wichtigen Bezugspersonen.',
  },
  {
    question: 'Wo gibt es unabhängige Beratung?',
    answer:
      'Die Angehörigenberatung der PUK Zürich und Pro Mente Sana bieten Orientierung auf unterschiedlichen Ebenen. Pro Mente Sana berät kostenlos zu psychosozialen und rechtlichen Fragen.',
  },
  // STUB L3: Rechte der Betroffenen – 4 neue FAQ-Fragen
  // INHALT AUSSTEHEND – juristische Validierung erforderlich, siehe qa/audit-03-juristische-validierung.md
  // Geschätzter Umfang: ~200 Wörter (4 × ~50 Wörter)
  // Outline:
  //   - "Kann ich mich selbst an die KESB wenden?" (Selbstmeldung, ZGB Art. 314 Abs. 1)
  //   - "Habe ich Recht auf Akteneinsicht?" (ZGB Art. 449b)
  //   - "Kann ich gegen einen KESB-Entscheid vorgehen?" (ZGB Art. 450, 30-Tage-Frist prüfen)
  //   - "Habe ich Anspruch auf Rechtsbeistand?" (BV Art. 29 Abs. 3)
];

export const PRACTICE_BLOCK_FILTERS = [
  { id: 'all', label: 'Alle' },
  { id: 'Krise', label: 'Krise' },
  { id: 'Gespräch', label: 'Gespräch' },
  { id: 'Kinderschutz', label: 'Kinderschutz' },
  { id: 'Elternrolle', label: 'Elternrolle' },
  { id: 'Sucht', label: 'Sucht' },
  { id: 'Vernetzung', label: 'Vernetzung' },
];

export const PRACTICE_BLOCKS = [
  {
    title: 'Akute Sicherheit zuerst ordnen',
    text: 'Suizidgedanken, Desorganisation, Intoxikation oder fehlende Aufsicht der Kinder verlangen zuerst einen klaren Sicherheits- und Notfallfokus.',
    tags: ['Krise', 'Kinderschutz'],
    target: 'acute-crisis',
    targetLabel: 'Zur Akut-Krise',
  },
  {
    title: 'Das Gespräch kurz und konkret halten',
    text: 'In belasteten Situationen helfen direkte Fragen nach Sicherheit, Betreuung, Mitwissenden und nächstem Schritt meist mehr als lange Exploration.',
    tags: ['Gespräch', 'Krise'],
    target: 'acute-crisis',
    targetLabel: 'Zu den Sofort-Schritten',
  },
  {
    title: 'Elternrolle entlastend ansprechen',
    text: 'Nicht moralisch bewerten, sondern klären, was heute verlässlich bleiben muss und wo Eltern früh Unterstützung annehmen können.',
    tags: ['Elternrolle', 'Gespräch'],
    target: 'safety-plan',
    targetLabel: 'Zum Sicherheitsplan',
  },
  {
    title: 'Kinder-Schutzteil immer mitdenken',
    text: 'Wer übernimmt Betreuung, Übergaben, Information an Schule oder Kita und sichere Orte für Kinder, wenn Symptome eskalieren?',
    tags: ['Kinderschutz', 'Krise', 'Vernetzung'],
    target: 'safety-plan',
    targetLabel: 'Zum Kinder-Schutzteil',
  },
  {
    title: 'Freiwillige Hilfe vor formeller Eskalation prüfen',
    text: 'Wenn Sicherheit noch tragfähig ist, sind kjz, Familienberatung, Entlastung oder konkrete Alltagshilfe oft der erste passende Schritt.',
    tags: ['Kinderschutz', 'Vernetzung'],
    target: 'child-protection',
    targetLabel: 'Zu den Schutzschwellen',
  },
  {
    title: 'Beobachtungen statt Diagnosen dokumentieren',
    text: 'Für Schutzfragen zählen beobachtbare Hinweise zu Versorgung, Aufsicht, Gewalt, Rückzug oder Krisenverlauf mehr als vorschnelle Deutungen.',
    tags: ['Kinderschutz'],
    target: 'child-protection',
    targetLabel: 'Zu den Leitfragen',
  },
  {
    title: 'Sucht und psychische Erkrankung zusammen betrachten',
    text: 'Substanzkonsum verändert oft Sicherheit, Impulsivität und Kinderbetreuung. Darum nicht nur die Diagnose, sondern auch Intoxikation und Entzug mitdenken.',
    tags: ['Sucht', 'Krise'],
    target: 'addiction',
    targetLabel: 'Zum Sucht-Block',
  },
  {
    title: 'Klare Grenzen ohne Beschämung setzen',
    text: 'Keine Kinderbetreuung unter starkem Einfluss, kein Fahren unter Einfluss und klare Regeln zu Geld, Medikamenten und Erreichbarkeit.',
    tags: ['Sucht', 'Elternrolle'],
    target: 'addiction',
    targetLabel: 'Zu den Leitlinien',
  },
  {
    title: 'Mitwissende aktiv einbinden',
    text: 'Eine tragende Bezugsperson oder Fachstelle sollte wissen, was aktuell schwierig ist, was sie konkret übernehmen kann und wann sie alarmiert wird.',
    tags: ['Vernetzung', 'Gespräch'],
    target: 'safety-plan',
    targetLabel: 'Zu den Absprachen',
  },
  {
    title: 'Rechte und Schweigepflicht pragmatisch erklären',
    text: 'Angehörige dürfen Beobachtungen mitteilen. Teams dürfen oft nicht alles zurückmelden, können aber Orientierung geben und Informationen aufnehmen.',
    tags: ['Gespräch', 'Vernetzung'],
    target: 'rights',
    targetLabel: 'Zu Rolle und Rechten',
  },
];
