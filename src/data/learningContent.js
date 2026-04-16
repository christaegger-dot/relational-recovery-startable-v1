export const VIGNETTEN = [
  {
    id: 'fall1',
    title: 'Fall 1: Begleitung bei depressiven Barrieren',
    description:
      'Frau M. (Anfang 30) wird aufgrund einer depressiven Episode stationär begleitet. Sie sorgt für zwei Kinder. Ihr Partner ist anwesend und kooperationsbereit, zeigt aber Zeichen von Erschöpfung. Frau M. findet aktuell kaum emotionalen Zugang zu den Kindern. Die ältere Tochter (Schulkind) zeigt sich still und zurückhaltend.',
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
  // STUB V2: Neue Vignette – ambulante Alltagssituation
  // INHALT AUSSTEHEND – redaktionelle Ausarbeitung durch Auftraggeberin erforderlich
  // Zielbild: Gesprächsimpuls-Format (D2) mit mehreren vertretbaren Optionen
  // Thematischer Schwerpunkt: Ambulanter Kontext, Alltagsmanagement, Frage "ab wann professionelle Entlastung?"
  // Repräsentationslücke: Kein stationärer Akut-Moment, sondern Alltag mit Belastung
  // Anonymisierungs-Standard: Alters-Range, max. 2 identifizierende Details, Pseudonym mit Initial
  // Vorgänger V2 (Herr S., Psychose/Nahrungsverweigerung) entfernt wegen:
  //   - fachlich falscher Handlungsbeschreibung ("verweigert" = Agentivität statt Symptom)
  //   - Inkohärenz mit Relational Recovery (reines Defizit-Objekt)
  //   - Re-Identifikations-Risiko (seltene Konstellation)

  // STUB V3: Neue Vignette – Langzeitbegleitung
  // INHALT AUSSTEHEND – redaktionelle Ausarbeitung durch Auftraggeberin erforderlich
  // Zielbild: Gesprächsimpuls-Format (D2) mit mehreren vertretbaren Optionen
  // Thematischer Schwerpunkt: Rückkehr in den Alltag nach stationärem Aufenthalt, Langzeitperspektive
  // Repräsentationslücke: Kein binärer Entscheidungsmoment, sondern Begleitungsprozess
  // Anonymisierungs-Standard: Alters-Range, max. 2 identifizierende Details, Pseudonym mit Initial
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
  {
    // Vier-A-Modell nach Von Schlippe & Schweitzer (2009), referenziert
    // in Stauber et al. (2018), Kap. 3.2. Empowerment-orientierte
    // Auftragsklärung als Gesprächsgerüst für den Beziehungsaufbau mit
    // psychisch belasteten Eltern.
    id: 'mod3',
    title: 'Die Vier A — Auftragsklärung im Erstgespräch',
    duration: '4 Min.',
    storyboard:
      'Anlass, Anliegen, Auftrag und Abmachungen klären — ein strukturiertes Gesprächsgerüst, das psychisch belastete Eltern als Kundige ihrer Situation ernst nimmt und Selbstwirksamkeit stärkt, statt Hilflosigkeit zu vertiefen.',
    quiz: 'Was ist das Hauptziel der Vier-A-Auftragsklärung?',
    quizOptions: [
      'Die Fachperson legt das Vorgehen fest',
      'Eltern werden in Zieldefinition und Prozessgestaltung einbezogen',
      'Der Auftrag wird durch die KESB formuliert',
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
