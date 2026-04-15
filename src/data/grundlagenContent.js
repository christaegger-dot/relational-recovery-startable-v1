export const GRUNDLAGEN_HERO = {
  eyebrow: 'Redaktioneller Wissensbereich',
  title: 'Häufige Fragen für',
  accent: 'ruhigere Orientierung im Alltag.',
  lead: 'Der Grundlagenbereich richtet sich primär an Angehörige und beantwortet typische Fragen in klarer, entlastender Sprache. Er soll Unsicherheit reduzieren, Begriffe in Alltagssituationen übersetzen und den Blick auf nächste Schritte öffnen. Fachpersonen können den Bereich ergänzend als Sprach- und Einordnungshilfe für Gespräche mit Angehörigen nutzen.',
  asideTitle: 'Einordnung',
  asideCopy:
    'Die Antworten ersetzen keine individuelle klinische, rechtliche oder kindesschutzbezogene Beurteilung. Sie dienen als tragfähige Erstorientierung für Gespräch, Reflexion und Weitervermittlung.',
  stats: [
    {
      label: 'FAQ-Cluster',
      value: '3',
      note: 'Belastung verstehen, Grenzen klären und Zusammenarbeit strukturieren',
    },
    {
      label: 'Leitfragen',
      value: '12',
      note: 'kurz beantwortet und auf typische Entscheidungssituationen bezogen',
    },
    {
      label: 'Ton',
      value: 'ruhig',
      note: 'nicht paternalistisch, alltagsnah und handlungsorientiert',
    },
  ],
};

export const GRUNDLAGEN_INTRO = {
  eyebrow: 'Aufbau',
  title: 'Der Bereich verbindet Grundlagenwissen mit häufigen Entscheidungsmomenten.',
  description:
    'Statt lose Antworten zu sammeln, ordnet die Seite wiederkehrende Fragen entlang typischer Belastungslagen. So entsteht ein Wissenspfad, der Begriffe, emotionale Entlastung und konkrete Orientierung miteinander verbindet.',
  cards: [
    {
      label: 'Cluster 1',
      title: 'Belastung verstehen',
      copy: 'Fragen zu Schuld, Ambivalenz, Wut, Erschöpfung und der Frage, was eine psychische Krise im Familienalltag bedeuten kann.',
      meta: 'geeignet für Erstorientierung und Psychoedukation',
    },
    {
      label: 'Cluster 2',
      title: 'Grenzen und Verantwortung',
      copy: 'Fragen dazu, was Angehörige tragen können, wo Selbstschutz legitim ist und wie Verantwortung wieder sortiert werden kann.',
      meta: 'geeignet für Entlastung, Grenzklärung und Teamgespräch',
    },
    {
      label: 'Cluster 3',
      title: 'Zusammenarbeit und nächste Schritte',
      copy: 'Fragen zu Helfersystem, Mitsprache, Informationsweitergabe und dem Finden des nächsten realistischen Schritts.',
      meta: 'geeignet für Trialog, Weitervermittlung und Fallkoordination',
    },
  ],
};

export const GRUNDLAGEN_CLUSTERS = [
  {
    id: 'grundlagen-verstehen',
    eyebrow: 'Cluster 1',
    title: 'Belastung verstehen, ohne sich vorschnell schuldig zu machen',
    description:
      'Diese Fragen greifen Situationen auf, in denen Angehörige zwischen Sorge, Loyalität und Überforderung schwanken. Die Antworten sollen entlasten, ohne zu vereinfachen, und schwierige Gefühle in eine verstehbare Sprache übersetzen.',
    aside: {
      label: 'Merksatz',
      title: 'Verstehen entlastet, ohne Probleme kleinzureden',
      copy: 'Eine ruhigere Einordnung bedeutet nicht, dass Belastung unwichtig ist. Sie schafft vielmehr die Voraussetzung dafür, wieder handlungsfähig zu werden.',
      tone: 'soft',
    },
    faqs: [
      {
        question: 'Ist es normal, dass ich gleichzeitig Mitgefühl und Wut spüre?',
        answer:
          'Ja. In belasteten Beziehungen treten häufig mehrere, scheinbar widersprüchliche Gefühle nebeneinander auf. Mitgefühl kann aus Sorge entstehen, Wut oft aus Überforderung, Enttäuschung oder wiederholter Grenzverletzung. Diese Ambivalenz ist meist eher ein Zeichen von Bindung und Belastung als von moralischem Versagen.',
      },
      {
        question: 'Bin ich schuld daran, dass es der anderen Person schlechter geht?',
        answer:
          'Angehörige überschätzen in Krisen oft ihren Einfluss nach innen wie nach aussen. Beziehungserfahrungen wirken zwar mit, aber psychische Krisen entstehen in der Regel aus einem Zusammenspiel vieler Faktoren. Hilfreicher als die Schuldfrage ist oft die Frage, was Sie beobachten, was Sie beeinflussen können und wo Ihre Verantwortung endet.',
      },
      {
        question: 'Warum fühlt sich der Alltag so schnell chaotisch oder unberechenbar an?',
        answer:
          'Psychische Belastungen verändern oft Verfügbarkeit, Reizbarkeit, Belastbarkeit und Verlässlichkeit im Alltag. Dadurch werden Routinen fragiler, Absprachen unsicherer und kleine Veränderungen fühlen sich grösser an, als sie von aussen wirken. Ein Teil der Entlastung besteht darin, dieses Muster als Belastungsdynamik zu erkennen statt nur als persönliches Scheitern.',
      },
      {
        question: 'Hilft es, alles möglichst ruhig zu halten, damit nichts eskaliert?',
        answer:
          'Kurzfristig kann Deeskalation sinnvoll sein. Langfristig führt ein dauerhaftes Ausweichen jedoch oft dazu, dass Angehörige immer mehr Spannung mittragen, während wichtige Themen unbesprechbar werden. Tragfaehiger ist meist eine Kombination aus ruhigem Ton, klaren Grenzen und kleinen, konkret vereinbarten Schritten.',
      },
    ],
  },
  {
    id: 'grundlagen-grenzen',
    eyebrow: 'Cluster 2',
    title: 'Grenzen, Verantwortung und legitimer Selbstschutz',
    description:
      'Diese Fragen sind für Situationen gedacht, in denen Angehörige sich für fast alles zuständig fühlen oder den Eindruck haben, sie dürften die eigene Erschöpfung nicht ernst nehmen. Der Abschnitt sortiert Verantwortung neu und macht Selbstschutz begründbar.',
    aside: {
      label: 'Merksatz',
      title: 'Grenzen sind kein Beziehungsabbruch',
      copy: 'Eine Grenze kann Beziehung schützen, wenn sie Klarheit schafft, Überforderung vermindert und Verantwortung wieder nachvollziehbar verteilt.',
      tone: 'soft',
    },
    faqs: [
      {
        question: 'Darf ich Grenzen setzen, obwohl die andere Person krank ist?',
        answer:
          'Ja. Psychische Belastung erklärt vieles, hebt aber die Belastungsgrenzen von Angehörigen nicht auf. Grenzen können notwendig sein, damit Kontakt überhaupt tragfähig bleibt. Entscheidend ist nicht Härte, sondern nachvollziehbare, ruhige und möglichst konsistente Kommunikation.',
      },
      {
        question: 'Woran merke ich, dass ich zu viel trage?',
        answer:
          'Typische Hinweise sind dauerhafte Alarmbereitschaft, Rückzug aus eigenen Beziehungen, Schlafprobleme, ständige Erreichbarkeit, das Gefühl von Alleinzuständigkeit oder die Angst, ohne Sie würde sofort alles kippen. Solche Muster sprechen oft dafür, Verantwortung neu zu sortieren und Entlastung aktiv zu organisieren.',
      },
      {
        question: 'Ist Distanz manchmal sinnvoller als noch mehr Einsatz?',
        answer:
          'Manchmal ja. Wenn Gespräche nur noch eskalieren, Grenzen fortlaufend überschritten werden oder Angehörige selbst in deutliche Erschöpfung geraten, kann vorübergehende Distanz ein Schutzschritt sein. Distanz bedeutet dann nicht Gleichgültigkeit, sondern den Versuch, wieder in einen arbeitsfähigen Kontakt zu kommen.',
      },
      {
        question: 'Wie kann ich eine Grenze sagen, ohne sofort in Rechtfertigung zu geraten?',
        answer:
          'Hilfreich sind kurze Sätze, die bei Beobachtung und nächstem Schritt bleiben. Zum Beispiel: Ich merke, dass das Gespräch gerade kippt. Ich unterbreche jetzt und melde mich morgen wieder. Je klarer Zeitrahmen, Form und Grund der Grenze sind, desto weniger muss die gesamte Beziehung in diesem Moment verhandelt werden.',
      },
    ],
  },
  {
    id: 'grundlagen-zusammenarbeit',
    legalDisclaimer: true,
    eyebrow: 'Cluster 3',
    title: 'Zusammenarbeit, Mitsprache und der nächste sinnvolle Schritt',
    description:
      'Diese Fragen richten den Blick auf Versorgung, Helfersystem und Trialog. Sie helfen, Ohnmacht in nächste kleine Schritte zu übersetzen und die Rolle von Angehörigen in Behandlung, Begleitung und Schutzfragen besser einzuordnen.',
    aside: {
      label: 'Merksatz',
      title: 'Nicht alles lösen, aber den nächsten Schritt klären',
      copy: 'In komplexen Situationen entsteht Orientierung oft nicht durch die perfekte Gesamtlösung, sondern durch einen realistischen nächsten Kontakt, eine benannte Fachstelle oder eine klarere gemeinsame Sprache.',
      tone: 'soft',
    },
    faqs: [
      {
        question: 'Was kann ich dem Behandlungsteam sagen, auch wenn keine Entbindung vorliegt?',
        answer:
          'Wichtige Beobachtungen zu Alltag, Krisenverlauf, Kindersicherheit, Versorgungslücken oder warnenden Veränderungen können Sie in der Regel immer mitteilen. Schwieriger ist häufig nicht das Mitteilen, sondern was Teams ohne Einwilligung zurückmelden dürfen. Trotzdem kann Ihre Perspektive fachlich sehr relevant sein.',
      },
      {
        question: 'Was ist ein sinnvoller nächster Schritt, wenn gerade alles gleichzeitig wichtig wirkt?',
        answer:
          'Dann hilft oft eine einfache Reihenfolge: zuerst Sicherheit und akute Versorgung, danach der alltagsnächste Engpass, erst dann grössere Grundsatzfragen. Ein kleiner, gut verabredeter Schritt ist meist wirksamer als ein grosser Plan ohne tragende Umsetzung.',
      },
      {
        question: 'Wie finde ich Hilfe, wenn ich nicht weiss, welche Stelle zuständig ist?',
        answer:
          'Statt sofort nach der perfekten Stelle zu suchen, ist es oft hilfreicher, mit einer orientierenden Fachstelle, dem Behandlungskontext oder einer regionalen Anlaufstelle zu beginnen. Dort lässt sich häufig klären, ob es um Krisenhilfe, Angehörigenberatung, Kinderschutz, Sozialberatung oder eine weiterführende Behandlung geht.',
      },
      {
        question: 'Wann sollte ich nicht mehr nur abwarten?',
        answer:
          'Wenn Sicherheit, Versorgung von Kindern, deutliche Auflösung von Routinen, Suizidalität, schwere Eskalationen oder anhaltende Überforderung im Raum stehen, ist reines Hoffen meist zu wenig. Dann braucht es mindestens Rücksprache mit einer Fachstelle wie dem kjz, der Angehörigenberatung oder im Notfall sofortige Krisenhilfe (144 / 147).',
      },
    ],
  },
];
