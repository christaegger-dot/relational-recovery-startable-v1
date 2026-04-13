export const VIGNETTEN = [
  {
    id: 'fall1',
    title: 'Fall 1: Begleitung bei depressiven Barrieren',
    description:
      'Frau M. (32) wird aufgrund einer schweren depressiven Episode stationär begleitet. Sie sorgt für zwei Kinder. Ihr Partner zeigt Zeichen von chronischer Erschöpfung. Aktuell besteht eine starke affektive Barriere zu den Kindern.',
    status: 'Aufnahme / Woche 1',
    options: [
      {
        id: 'opt1',
        label: 'Proaktive Gefährdungsmeldung (KESB)',
        isCorrect: false,
        feedback:
          'Ein stark eingreifendes Vorgehen wäre hier verfrüht. Bei vorhandenem Unterstützungssystem sollte zuerst systemische Entlastung und freiwillige Hilfe aktiviert werden.',
      },
      {
        id: 'opt2',
        label: 'Sozialpädagogische Familienbegleitung (SPF) als freiwillige Hilfe',
        isCorrect: true,
        feedback:
          'Korrekt. Eine SPF entlastet das Familiensystem und schützt das Kind. SPF ist kein eigener ZGB-Massnahmetyp, sondern eine ambulante Hilfe, die freiwillig oder über Art. 307/308 ZGB begleitet werden kann. In dieser Situation greift sie als freiwillige Hilfe ohne Einschränkung der elterlichen Sorge. Im Kanton Zürich ist SPF für Eltern grundsätzlich kostenlos.',
      },
    ],
  },
  {
    id: 'fall2',
    title: 'Fall 2: Unterstützung bei psychotischem Erleben',
    description:
      'Herr S. (40), alleinige elterliche Sorge, befindet sich in einer akuten psychotischen Krise. Er verweigert dem Kind seit 24 Stunden Nahrung aufgrund wahnhafter Befürchtungen. Dialogversuche zur freiwilligen Hilfe blieben ohne Ergebnis.',
    status: 'Akutaufnahme',
    options: [
      {
        id: 'opt1',
        label: 'Gefährdungsmeldung an die KESB (Melderecht nach Art. 314c ZGB)',
        isCorrect: true,
        feedback:
          'Korrekt. In dieser zugespitzten Situation reicht der Dialog zur Sicherung des Kindeswohls nicht aus. Art. 314c ZGB regelt das Melderecht -- die Meldung selbst ist noch keine Massnahme. Was danach geschieht, richtet sich nach Art. 307-310 ZGB: Die KESB prüft die Situation und trifft verhältnismässige Massnahmen. Die häufigste ist die Beistandschaft (Art. 308), nicht die Fremdplatzierung.',
      },
      {
        id: 'opt2',
        label: 'Abwarten der Medikamentenwirkung unter Beobachtung',
        isCorrect: false,
        feedback:
          'Kritisch. Das unmittelbare Schutzbedürfnis des Kindes hat hier Vorrang. Reines Zuwarten genügt nicht.',
      },
    ],
  },
];

export const E_MODULES = [
  {
    id: 'mod1',
    title: 'Still-Face & Scham-Regulation',
    duration: '5 Min.',
    storyboard: 'Emotionale Barrieren als biologische Stressreaktion validieren und nicht als Mangel an Liebe deuten.',
    quiz: "Wofür steht das 'Still-Face' hier primär?",
    quizOptions: ['Interessenverlust', 'Biologische Affektbarriere', 'Erziehungsfehler'],
    correctQuizIdx: 1,
  },
  {
    id: 'mod2',
    title: 'Metaphern für Kinder (Kopf-Schnupfen)',
    duration: '4 Min.',
    storyboard: 'Mit kindgerechter Sprache Schuldgefühle entlasten und Gesprächsfähigkeit stärken.',
    quiz: 'Warum können Metaphern hilfreich sein?',
    quizOptions: [
      'Um die Wahrheit zu verbergen',
      'Um altersgerechte Sprache zu schaffen',
      'Um den Klinikaufenthalt zu verlängern',
    ],
    correctQuizIdx: 1,
  },
];

export const ASSESSMENT_ITEMS = [
  { id: 'crisis', label: 'Ungeplanter Eintritt / Krise', val: 2 },
  { id: 'backup', label: 'Backup-System bereits stark gefordert', val: 3 },
  { id: 'shame', label: 'Schambesetzte elterliche Sorgen', val: 2 },
  { id: 'role', label: 'Rollenumkehr im System', val: 3 },
];
