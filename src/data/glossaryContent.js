export const GLOSSARY_HERO = {
  eyebrow: 'Redaktioneller Wissensbereich',
  title: 'Begriffe für',
  accent: 'ruhige fachliche Orientierung.',
  lead: 'Das Glossar sammelt zentrale Begriffe aus relationaler Recovery, Kindesschutz, Angehörigenarbeit und Netzwerkpraxis in einer einheitlichen Sprache. Es soll Fachpersonen helfen, schneller zwischen Einordnung, Gespräch und Weitervermittlung zu wechseln.',
  asideTitle: 'Nutzungshinweis',
  asideCopy:
    'Die Einträge sind als knappe Arbeitsdefinitionen für Praxis, Teamgespräch und Orientierung im Versorgungsalltag formuliert. Sie ersetzen keine institutionellen Richtlinien oder juristische Fachberatung.',
  stats: [
    {
      label: 'Begriffe',
      value: '12',
      note: 'kompakte Arbeitsdefinitionen für Praxis und Teamreflexion',
    },
    {
      label: 'Cluster',
      value: '3',
      note: 'Sprache, Schutz und Zusammenarbeit im Versorgungssystem',
    },
    {
      label: 'Format',
      value: 'Kurz',
      note: 'definiert, eingeordnet und auf Anwendung bezogen',
    },
  ],
};

export const GLOSSARY_INTRO = {
  eyebrow: 'Arbeitslogik',
  title: 'Das Glossar ordnet Sprache entlang von Versorgung, Risiko und Beziehung.',
  description:
    'Die neue Glossar-Seite führt einen statisch-redaktionellen Wissensbereich in die Seitentyp-Architektur ein. Statt verstreuter Begriffe werden hier tragende Ausdrücke gebündelt, knapp beschrieben und direkt an typische Handlungssituationen im Arbeitsalltag angeschlossen.',
  aside: {
    label: 'Ziel',
    title: 'Gemeinsame Sprache entlastet',
    copy: 'Wenn Teams dieselben Kernbegriffe ähnlich verwenden, werden Fallbesprechungen ruhiger, Rückfragen klarer und Überleitungen zwischen Fachstellen verständlicher.',
    tone: 'soft',
  },
  cards: [
    {
      label: 'Cluster 1',
      title: 'Sprache im Kontakt',
      copy: 'Begriffe für Beziehung, Gespräch und alltagsnahe Einordnung psychischer Belastung.',
      meta: 'relevant für Erstkontakt, Verlauf und Psychoedukation',
    },
    {
      label: 'Cluster 2',
      title: 'Schutz und Risiko',
      copy: 'Begriffe für Gefährdungseinschätzung, Belastungssignale und Handlungsgrenzen.',
      meta: 'relevant für Triage, Schutzplanung und Schwellenentscheidungen',
    },
    {
      label: 'Cluster 3',
      title: 'Netzwerk und Koordination',
      copy: 'Begriffe für Zusammenarbeit, Übergaben und verbindliche Weitervermittlung.',
      meta: 'relevant für Zusammenarbeit zwischen Klinik, Gemeinde und Hilfesystem',
    },
  ],
};

export const GLOSSARY_GROUPS = [
  {
    id: 'glossar-sprache',
    eyebrow: 'Cluster 1',
    title: 'Sprache im Kontakt mit Eltern, Kindern und Bezugspersonen',
    description:
      'Diese Begriffe helfen, Belastung nicht nur zu benennen, sondern in eine ruhige, arbeitsfähige Sprache zu übersetzen. Sie sind für Gespräche besonders wichtig, in denen Scham, Ambivalenz oder Unsicherheit die Zusammenarbeit erschweren.',
    terms: [
      {
        term: 'Relationale Recovery',
        definition:
          'Ein Arbeitsverständnis, das Erholung nicht nur als individuelle Symptomveränderung versteht, sondern als Wiedergewinn von tragfähigen Beziehungen, Orientierung und Handlungsfähigkeit im sozialen Alltag.',
        practice:
          'Hilfreich, wenn Behandlung, Elternrolle und Umfeld zusammen gedacht werden müssen statt nur einzelne Symptome zu betrachten.',
      },
      {
        term: 'Psychisch belastete Elternschaft',
        definition:
          'Eine familiäre Situation, in der psychische Symptome, Krisen oder langandauernde Instabilität die elterliche Verfügbarkeit, Alltagsstruktur oder Feinabstimmung mit dem Kind mitbeeinflussen können.',
        practice:
          'Der Begriff vermeidet schnelle Schuldzuschreibungen und öffnet den Blick auf Belastung, Ressourcen und Unterstützungsbedarf zugleich.',
      },
      {
        term: 'Psychoedukation',
        definition:
          'Strukturierte, verständliche Vermittlung von Wissen über Symptome, Belastungsdynamiken, Schutzfaktoren und Hilfemöglichkeiten für Betroffene, Angehörige oder Fachpersonen.',
        practice:
          'Besonders hilfreich, wenn Unsicherheit reduziert und ein gemeinsamer Begriffsrahmen für weitere Schritte aufgebaut werden soll.',
      },
      {
        term: 'Mentalisieren',
        definition:
          'Die Fähigkeit, eigenes und fremdes Verhalten als Ausdruck innerer Zustände wie Gefühle, Absichten, Stress oder Missverstehen zu begreifen.',
        practice:
          'Wird wichtig, wenn eskalierende Situationen wieder in Beobachtung, Sprache und Beziehung übersetzt werden müssen.',
      },
    ],
  },
  {
    id: 'glossar-schutz',
    eyebrow: 'Cluster 2',
    title: 'Schutz, Risiko und fachliche Schwellen',
    description:
      'Diese Begriffe strukturieren Situationen, in denen Fachpersonen zwischen Beobachtung, Unterstützung und formeller Schutzabklärung unterscheiden müssen. Sie schaffen eine gemeinsame Sprache für begründete Entscheidungen.',
    terms: [
      {
        term: 'Kindeswohl',
        definition:
          'Zusammenfassender Begriff für Bedingungen, unter denen ein Kind hinreichend sicher, entwicklungsförderlich und emotional tragfähig aufwachsen kann.',
        practice:
          'Nicht als abstrakter Endzustand denken, sondern als fortlaufende Frage nach Schutz, Bindung, Versorgung und Entwicklungsraum.',
      },
      {
        term: 'Kindeswohlgefährdung',
        definition:
          'Eine Situation, in der ernsthafte Hinweise bestehen, dass Schutz, Versorgung oder Entwicklung eines Kindes aktuell oder absehbar erheblich beeinträchtigt sind.',
        practice:
          'Wichtig für die Schwelle zwischen beobachtender Sorge, vertiefter Klärung und formeller Einbeziehung von Schutzinstanzen.',
      },
      {
        term: 'Schutzfaktor',
        definition:
          'Ein stabilisierendes Element, das Belastung abfedern oder Risiken begrenzen kann, zum Beispiel eine verlässliche Bezugsperson, Tagesstruktur oder erreichbare Hilfe.',
        practice:
          'Schutzfaktoren ersetzen Risiken nicht, sind aber entscheidend für differenzierte Triage und tragfähige Hilfeplanung.',
      },
      {
        term: 'Triage',
        definition:
          'Geordnete fachliche Entscheidung darüber, welche Form von Unterstützung, Abklärung oder Weitervermittlung in einer Situation zuerst notwendig ist.',
        practice:
          'Im Portal meint Triage nicht nur Dringlichkeit, sondern auch Passung zwischen Bedarf, Sicherheitslage und regionalen Hilfen.',
      },
    ],
  },
  {
    id: 'glossar-netzwerk',
    eyebrow: 'Cluster 3',
    title: 'Netzwerk, Koordination und verbindliche Zusammenarbeit',
    description:
      'Diese Begriffe betreffen die Zusammenarbeit über Institutionsgrenzen hinweg. Sie helfen, Verantwortung, Übergaben und regionale Anschlussfähigkeit klarer zu beschreiben.',
    terms: [
      {
        term: 'Angehörigenarbeit',
        definition:
          'Geplante Einbeziehung von nahen Bezugspersonen in Information, Entlastung, Orientierung und kooperative Behandlungsgestaltung.',
        practice:
          'Nicht nur als Zusatzangebot verstehen, sondern als wichtigen Teil von Stabilisierung, Alltagstransfer und Früherkennung.',
      },
      {
        term: 'Weitervermittlung',
        definition:
          'Übergang von einer ersten Klärung oder Behandlungssituation in ein passendes, weiterführendes Unterstützungsangebot innerhalb des Hilfesystems.',
        practice:
          'Tragfaehig wird Weitervermittlung erst, wenn Ansprechpartner, Schwelle, Erreichbarkeit und nächster Schritt konkret benannt sind.',
      },
      {
        term: 'Netzwerkkarte',
        definition:
          'Strukturierte Darstellung von Fachstellen, Rollen und möglichen Anschlusspfaden innerhalb eines regionalen Versorgungssystems.',
        practice:
          'Hilfreich bei der Frage, wer für Information, Abklärung, Entlastung oder Krisenintervention sinnvoll zuständig ist.',
      },
      {
        term: 'Kooperationsfenster',
        definition:
          'Praktischer Begriff für den Moment, in dem Familien, Fachpersonen und Hilfesystem gleichzeitig erreichbar genug sind, um einen nächsten Schritt verbindlich zu vereinbaren.',
        practice:
          'Gerade in instabilen Verläufen lohnt es sich, dieses Zeitfenster aktiv zu nutzen statt nur lose Hinweise mitzuteilen.',
      },
    ],
  },
];
