export const MATERIAL_HERO = {
  eyebrow: 'Für Patient:innen und Angehörige',
  title: 'Häufige Fragen für',
  accent: 'ruhigere Orientierung im Alltag.',
  lead: 'Dieser Bereich bündelt Material, das Fachpersonen im Gespräch mit Patient:innen und Angehörigen einsetzen oder zur Weitergabe verlinken können. Die Cluster beantworten typische Fragen in klarer, entlastender Sprache — sie sollen Unsicherheit reduzieren, Begriffe in Alltagssituationen übersetzen und den Blick auf nächste Schritte öffnen.',
  asideTitle: 'Einordnung',
  asideCopy:
    'Die Antworten ersetzen keine individuelle klinische, rechtliche oder kindesschutzbezogene Beurteilung. Sie dienen als tragfähige Erstorientierung für Gespräch, Reflexion und Weitervermittlung.',
  stats: [
    {
      label: 'FAQ-Cluster',
      value: '6',
      note: 'Belastung, Grenzen, Zusammenarbeit, Kinder-Aufklärung, Alter, Formulierungshilfen',
    },
    {
      label: 'Leitfragen',
      value: '30',
      note: 'kurz beantwortet und auf typische Entscheidungssituationen bezogen',
    },
    {
      label: 'Ton',
      value: 'ruhig',
      note: 'nicht paternalistisch, alltagsnah und handlungsorientiert',
    },
  ],
};

export const MATERIAL_INTRO = {
  eyebrow: 'Aufbau',
  title: 'Der Bereich verbindet praktisches Wissen mit häufigen Entscheidungsmomenten.',
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
    {
      label: 'Cluster 4',
      title: 'Mit Kindern über die Erkrankung sprechen',
      copy: 'Fragen dazu, was Kinder wissen wollen, wie kindgerechte Aufklärung gelingt und warum Offenheit als Schutzfaktor wirkt.',
      meta: 'geeignet für Elternberatung, Psychoedukation und Familiengespräche',
    },
    {
      label: 'Cluster 5',
      title: 'Altersgerecht erklären',
      copy: 'Wie sich Informationsbedürfnis, Verständnis und typische Reaktionen von Kindern je nach Altersstufe unterscheiden — und was das für das Gespräch bedeutet.',
      meta: 'geeignet für Vorbereitung, Teamreflexion und altersdifferenzierte Psychoedukation',
    },
    {
      label: 'Cluster 6',
      title: 'Formulierungshilfen je Störungsbild',
      copy: 'Konkrete, kindgerechte Sätze für das Gespräch über Depression, Manie, Psychose und Angst — als Orientierung, nicht als Vorgabe.',
      meta: 'geeignet für Gesprächsvorbereitung und Psychoedukation mit dem Kind',
    },
  ],
};

// Handout-Block: neue Gliederungsebene unterhalb der FAQ-Cluster, eingefuehrt
// nach Issue #104 (Handout-Offensive) + #107 (Krisenplan als Tier-1). Hybrid-
// Pfad: FAQ-Anker bleibt, Handouts kommen als zweiter Block darunter. Block-
// Rahmung bewusst ruhig, damit das erste Handout (Krisenplan) visuell fuehrt
// und nicht in einer generischen Ueberschrift untergeht.
export const MATERIAL_HANDOUTS_BLOCK = {
  eyebrow: 'Handouts',
  title: 'Material zum Ausfüllen, Mitgeben und Besprechen',
  description:
    'Diese Vorlagen begleiten konkrete Gespräche in der Familie. Sie sind als Struktur gedacht, nicht als Checkliste — und werden am besten gemeinsam ausgefüllt.',
};

// Tier-1-Handout: Kind-orientierter Krisenplan als Gegenstueck zum fachlichen
// Toolbox-Sicherheitsplan (SAFETY_PLAN_TEMPLATE_FIELDS). Perspektive: Kind
// (Ich-Form), eine Seite, altersgerechte Felder. Inhaltlich fundiert auf
// FAQ 4.8 (Cluster 4 Krisenplan-Empfehlung) und evidenceContent.js (Abschnitt
// "Krisenplan / Notfallplan"). Quellenbindung: Lenz & Brockmann (2010),
// referenziert in Stauber et al. (2018) Kap. 6.2 -- identisch mit der Quellen-
// grundlage des Toolbox-Sicherheitsplans, bewusst geteilt.
export const MATERIAL_HANDOUTS = [
  {
    id: 'material-handout-mein-notfallplan',
    kind: 'crisis-plan',
    eyebrow: 'Handout für Kinder',
    title: 'Mein Notfallplan',
    description:
      'Ein einseitiger Plan für Kinder in Familien, in denen ein Elternteil psychisch erkrankt ist. Er wird gemeinsam in einer stabilen Phase ausgefüllt und bleibt beim Kind.',
    usage: {
      when: 'In einer stabilen Phase — nicht in der Krise. Der Plan ist ein Gespräch, nicht ein Formular.',
      people:
        'Kind + ein betreuender Elternteil oder eine Fachperson + die Vertrauensperson, wenn möglich. Die Vertrauensperson muss vorher wissen und zustimmen.',
      validity:
        'Ein Krisenplan altert. Mindestens einmal pro Jahr gemeinsam durchgehen. Bei wichtigen Veränderungen (Umzug, neue Vertrauensperson, veränderte Erkrankung) sofort anpassen.',
      where:
        'Eine Kopie beim Kind (sichtbar, nicht versteckt). Eine Kopie bei der Vertrauensperson. Optional beim Behandlungsteam des erkrankten Elternteils.',
    },
    header: {
      ownerLabel: 'Dieser Plan gehört',
      dateLabel: 'Datum der Erstellung',
      revisedLabel: 'Zuletzt überarbeitet',
    },
    sections: [
      {
        id: 'material-handout-crisis',
        title: 'Krisenplan',
        fields: [
          {
            title: 'Wer hilft mir, wenn es zu Hause gerade nicht gut ist?',
            hint: 'Eine Vertrauensperson ausserhalb des Haushalts. Jemand, den das Kind gut kennt und ohne Angst anrufen kann. Oft Grossmutter, Tante, Göttin, Nachbarin — nicht immer die «offensichtliche» Person, sondern die, zu der das Kind echten Kontakt hat.',
            example: 'Wenn es zu Hause schwierig wird, kann ich Tante Sara anrufen.',
          },
          {
            title: 'Wie erreiche ich sie?',
            hint: 'Telefonnummer(n), Adresse, wie das Kind dahin kommt. Mehrere Wege, falls einer nicht funktioniert.',
            example:
              'Sara hat die Nummer 079 …. Wenn sie nicht rangeht, schreibe ich ihr eine Nachricht. Ihre Adresse: Musterstrasse 3, das ist zehn Minuten zu Fuss von uns.',
          },
          {
            title: 'Wann rufe ich sie an?',
            hint: 'Konkrete Beispiele, keine abstrakten Regeln. Je jünger das Kind, desto beobachtbarer müssen die Anlässe sein.',
            example:
              'Wenn Mama seit dem Morgen nicht aufsteht und es Mittag ist. Wenn Papa Dinge sagt, die mir Angst machen. Wenn ich alleine bin und nicht weiss, was ich tun soll.',
          },
          {
            title: 'Was tut sie für mich?',
            hint: 'Was wurde mit der Vertrauensperson vorher besprochen? Was darf das Kind erwarten? Nicht offenlassen, sondern vorab klären.',
            example:
              'Sara kommt vorbei oder holt mich ab. Bei ihr kann ich übernachten. Sie ruft Oma an, wenn etwas Wichtiges ist.',
          },
          {
            title: 'Wenn ich meine erste Person nicht erreiche',
            hint: 'Eine zweite Person als Backup. Mindestens eine Ersatz-Option, falls die erste nicht verfügbar ist. Ohne Backup ist der Plan fragil.',
            example: 'Dann rufe ich Oma an: 044 ….',
          },
        ],
        emergency: {
          title: 'Wenn es wirklich dringend ist',
          intro: 'Diese Nummern gelten immer — auch wenn ich niemanden sonst erreiche:',
          items: [
            {
              number: '144',
              description: 'wenn jemand in Lebensgefahr ist. Kommt sofort, wie bei einem schlimmen Unfall.',
            },
            {
              number: '147',
              description: 'wenn ich mit jemandem reden will, der mir zuhört und hilft. Tag und Nacht, gratis.',
            },
          ],
        },
      },
      {
        id: 'material-handout-everyday',
        title: 'Was mir im Alltag hilft',
        fields: [
          {
            title: 'Was die Schule oder der Kindergarten weiss',
            hint: 'Vorab-Absprache: Wer an der Schule oder im Kindergarten weiss, dass das Kind in einer belasteten Familiensituation lebt? An wen darf das Kind sich dort wenden? Darf die Vertrauensperson bei Bedarf dort abholen?',
            example: 'Frau Müller weiss Bescheid. Ich kann zu ihr, wenn etwas ist.',
          },
          {
            title: 'Was mir sonst noch hilft',
            hint: 'Selbstberuhigung. Was macht das Kind, wenn die Situation noch nicht ganz so schlimm ist, aber schwierig? Eigene Ressourcen sichtbar machen.',
            example: 'Ich höre meine Lieblingsmusik. Ich gehe zu meinem Plüschtier. Ich atme dreimal langsam.',
          },
        ],
      },
    ],
    footer:
      'Dieser Plan gehört mir. Ich kann ihn lesen, wann ich will. Er wird manchmal angepasst, wenn sich etwas ändert.',
    disclaimer:
      'Dieser Plan ist eine Orientierungsvorlage. Er ersetzt weder eine individuelle klinische Einschätzung noch eine Kindeswohlabklärung. In akuten Gefährdungssituationen gilt immer zuerst die Notfallnummer 144. Fachliche Begleitung beim Erstellen bieten z. B. das kjz, die PUK Zürich oder Pro Mente Sana.',
    crossRefs: {
      title: 'Verwandte Inhalte',
      items: [
        {
          kind: 'faq',
          label: 'Aus dem FAQ: «Was braucht mein Kind, wenn ich in einer akuten Krankheitsphase bin?»',
          anchor: '#material-kinder',
        },
        {
          kind: 'toolbox',
          label: 'Fachperson-Perspektive: Sicherheitsplan in der Toolbox',
          target: 'toolbox',
          anchor: '#safety-plan',
        },
        {
          kind: 'evidence',
          label: 'Fachlicher Hintergrund: Krisenplan und Schutzfaktoren im Evidenzbereich',
          target: 'evidenz',
        },
      ],
    },
  },
  // Tier-1-Handout (Issue #112): Gespraech-Skript fuer betroffene Eltern.
  // Setzt direkt an Cluster 4 an (Mit Kindern sprechen) und gibt einen
  // vorbereiteten Einstiegssatz, fuenf typische Kinder-Fragen mit moeglichen
  // Antworten + einen Verstehens-Check als druckbares Skript zur Vorbereitung.
  // Quelle: Stauber et al. (2018) Kap. 5.3.1; Lenz (2010) Tab. 2.
  {
    id: 'material-handout-erstes-gespraech',
    kind: 'conversation-script',
    eyebrow: 'Handout für Eltern',
    title: 'Erstes Gespräch mit dem Kind',
    description:
      'Eine vorbereitete Skript-Vorlage fuer das erste Gespraech mit dem eigenen Kind ueber die psychische Erkrankung. Gedacht zur Vorbereitung — nicht als Vorlese-Text. Die Saetze sind Anker, keine Vorgaben.',
    usage: {
      when: 'In einer ruhigen Phase, nicht im akuten Zustand. Vorzugsweise allein vorab durchlesen, dann das Gespräch in eigener Sprache führen.',
      people:
        'Sie selbst (betroffene:r Elternteil) — optional gemeinsam mit der zweiten Bezugsperson, einer Fachperson oder Vertrauensperson zur Vorbereitung.',
      validity:
        'Das Skript altert nicht. Es bleibt nützlich für Folgegespräche, wenn das Kind mit neuen Fragen kommt — denn das wird es.',
      where:
        'Vorbereitung in Ruhe. Beim Gespräch nicht ablesen, sondern in eigener Sprache reden. Optional als Teil des Eltern-Materials beim Behandlungsteam ablegen.',
    },
    opener: {
      title: 'Möglicher Einstiegssatz',
      text: '«Damit du Bescheid weisst und dir nicht unnötig Sorgen machst, möchte ich dir erklären, was mit mir los ist.»',
      note: 'Dieser Satz signalisiert drei Dinge: Offenheit, Fürsorge und die Erlaubnis, Fragen zu stellen. Er funktioniert für Schulkinder und Jugendliche; bei jüngeren Kindern lieber kürzer, beim Alltag ansetzen.',
    },
    childQuestions: {
      title: 'Die fünf typischen Fragen — und mögliche Antwort-Anker',
      intro:
        'Forschungsbefunde zeigen fünf wiederkehrende Themenbereiche. Die Reihenfolge variiert mit Alter und Krankheitsverlauf. Es ist hilfreich, sich auf jede vorbereitet zu haben — die Antworten unten sind Beispiel-Anker, nicht Skripte.',
      items: [
        {
          question: 'Wie soll ich mich gegenüber dir verhalten?',
          anchor:
            'So normal wie möglich. Wenn du dir unsicher bist, frag mich oder unsere Vertrauensperson. Du musst nicht aufpassen — das ist meine Aufgabe.',
        },
        {
          question: 'Wird sich mein Leben verändern?',
          anchor:
            'Manche Dinge bleiben gleich (z. B. dein Schulweg, deine Freundinnen und Freunde). Manche können sich verändern (z. B. wer dich abholt, wenn ich nicht kann). Veränderungen besprechen wir miteinander, du erfährst es nicht plötzlich.',
        },
        {
          question: 'Was ist die Ursache — und werde ich auch krank?',
          anchor:
            'Diese Krankheit hat verschiedene Ursachen, nicht eine einzige. Du hast nichts damit zu tun. Dass auch du krank wirst, ist nicht garantiert — viel hängt davon ab, dass es dir gut geht und du Hilfe bekommst, wenn du sie brauchst.',
        },
        {
          question: 'Was ist der Unterschied zu einer körperlichen Krankheit?',
          anchor:
            'Eine körperliche Krankheit kann man oft sehen oder spüren. Eine psychische Krankheit verändert Gefühle, Gedanken und Verhalten — das macht sie schwerer sichtbar, aber sie ist genauso ernst. Und sie kann behandelt werden.',
        },
        {
          question: 'Kannst du wieder gesund werden?',
          anchor:
            'Vielen Menschen geht es mit der Zeit und mit Hilfe wieder besser. Manche Krankheiten kommen wieder, manche bleiben. Was uns hilft: gute Behandlung, Hilfe von aussen und dass wir miteinander reden.',
        },
      ],
    },
    understandingCheck: {
      title: 'Verstehens-Check',
      intro:
        'Nach dem Gespräch ist es hilfreich zu prüfen, was angekommen ist — nicht als Test, sondern als Einladung.',
      prompt: '«Magst du mir erzählen, was du jetzt verstanden hast?»',
      note: 'Achten Sie nicht nur auf den Inhalt, sondern auch auf Mimik, Tonfall und Körpersprache. Echohaftes Nachsprechen oder Ausweichen können bedeuten: das Kind braucht eine Pause, eine andere Erklärung oder einfach Zeit.',
    },
    process: {
      title: 'Wichtig zu wissen',
      items: [
        'Das ist kein einmaliges Gespräch, sondern ein Prozess. Kinder kommen mit neuen Fragen zurück, wenn sie bereit sind.',
        'Schweigen oder Ausweichen ist keine Ablehnung — manchmal braucht das Kind erst Zeit, das Gehörte zu sortieren.',
        'Es ist okay, etwas nicht zu wissen. Sie können sagen: «Das weiss ich gerade auch nicht — wir können zusammen nachfragen.»',
        'Klären Sie das Kind nicht alleine auf, wenn Sie sich überfordert fühlen — Fachpersonen (kjz, PUK Angehörigenberatung, Pro Mente Sana) begleiten solche Gespräche bei Bedarf.',
      ],
    },
    disclaimer:
      'Dieses Skript ist eine Orientierungshilfe, kein Therapieersatz. Bei akuter Belastung des Kindes oder bei Unsicherheit, was wann gesagt werden soll, sind das kjz, die PUK Angehörigenberatung oder das Institut Kinderseele Schweiz fachliche Anlaufstellen.',
    crossRefs: {
      title: 'Verwandte Inhalte',
      items: [
        {
          kind: 'faq',
          label: 'Aus dem FAQ: Cluster 4 «Mit Kindern über die Erkrankung sprechen»',
          anchor: '#material-kinder',
        },
        {
          kind: 'faq',
          label: 'Aus dem FAQ: Cluster 5 «Altersgerecht erklären»',
          anchor: '#material-altersgerecht',
        },
        {
          kind: 'handout',
          label: 'Komplementär: «Mein Notfallplan» für die akute Krankheitsphase',
          anchor: '#material-handout-mein-notfallplan',
        },
      ],
    },
  },
  // Tier-1-Handout (Issue #113): Schwellen-Karte fuer Angehoerige. Loest die
  // Paralyse-Frage "Ist das schon ernst genug, um Hilfe zu holen?" durch
  // konkrete Beobachtungs-Items + klare Wenn-Dann-Logik + CH-Anlaufstellen
  // mit Notfallnummern. Datenquelle Anlaufstellen: fachstellenContent.js.
  {
    id: 'material-handout-wann-fachstelle',
    kind: 'threshold-checklist',
    eyebrow: 'Handout für Angehörige',
    title: 'Wann ist es Zeit, eine Fachstelle zu kontaktieren?',
    description:
      'Eine Schwellen-Karte fuer Angehoerige psychisch erkrankter Menschen. Sie hilft einzuschaetzen, wann Beobachten reicht und wann eine Fachstelle anzurufen ist — und welche Stelle wofuer zustaendig ist.',
    usage: {
      when: 'Vorab in einer ruhigen Phase ansehen — damit Sie im Belastungsmoment nicht erst suchen müssen.',
      people:
        'Sie selbst (angehörige Person). Optional zur Absprache mit anderen Familienmitgliedern oder dem Behandlungsteam.',
      validity:
        'Die Schwellen sind robust, die Anlaufstellen ändern sich kaum. Notfallnummern (144, 143, 147) gelten national rund um die Uhr.',
      where:
        'In der Nähe des Telefons. Eine Kopie an die Pinnwand, eine ins Portemonnaie. Bei mehreren Bezugspersonen: gleicher Stand für alle.',
    },
    priorityRule: {
      title: 'Reihenfolge in der Krise',
      intro: 'Wenn vieles gleichzeitig wichtig wirkt: nicht alles auf einmal lösen, sondern in dieser Reihenfolge.',
      items: [
        {
          step: '1',
          label: 'Akute Sicherheit zuerst',
          detail:
            'Lebensgefahr → 144. Suizidgedanken, schwere Eskalation, Kindeswohl in Gefahr → sofortige Krisenhilfe (siehe Anlaufstellen unten).',
        },
        {
          step: '2',
          label: 'Versorgung und Alltag',
          detail:
            'Sind Kinder verlässlich versorgt? Mahlzeiten, Schulweg, Aufsicht, Medikamenteneinnahme — was kippt zuerst, wer übernimmt?',
        },
        {
          step: '3',
          label: 'Grundsatzfragen später',
          detail:
            'Diagnostik, Behandlungsentscheidungen, langfristige Versorgung — wenn Sicherheit und Alltag stehen. Nicht in der akuten Phase verhandeln.',
        },
      ],
    },
    thresholds: {
      title: 'Beobachtungen + Schwellen',
      intro:
        'Diese Beobachtungen helfen einzuschätzen, ob eine Fachstelle sinnvoll wird. Mehrere Items gleichzeitig im «jetzt anrufen»-Bereich: nicht weiter abwarten.',
      items: [
        {
          observation: 'Mein:e Angehörige:r spricht von Suizid oder davon, niemandem mehr eine Last sein zu wollen.',
          escalate: 'Sofort: 144 in akuter Lebensgefahr, sonst AERZTEFON (ärztliche Telefonberatung) oder Behandlungsteam.',
        },
        {
          observation: 'Routinen lösen sich auf (Schlaf-Wach-Rhythmus, Essen, Hygiene) seit mehr als einer Woche.',
          escalate: 'Wenn dieser Zustand anhält: AERZTEFON (ärztliche Telefonberatung), Behandlungsteam, ggf. Pro Mente Sana zur Orientierung.',
        },
        {
          observation: 'Kinder sind nicht mehr verlässlich versorgt (Schulweg, Mahlzeiten, Aufsicht).',
          escalate: 'Sofort: kjz oder regionale Kindeswohl-Stelle. Nicht warten, bis es eskaliert.',
        },
        {
          observation: 'Ich selbst kann nicht mehr schlafen, bin dauerhaft alarmiert oder ziehe mich zurück.',
          escalate:
            'Anhaltend: PUK Angehörigenberatung, Pro Mente Sana oder VASK. Eigene Erschöpfung ist ein legitimer Anlass.',
        },
        {
          observation: 'Es gibt Eskalationen, Drohungen, Gewalt im Haushalt.',
          escalate: 'Sofort: 144 (Polizei), Beratungsstelle, ggf. Kinderschutz. Eigene Sicherheit zuerst.',
        },
        {
          observation: 'Wir sind unsicher, ob wir die richtige Stelle ansprechen — und schieben es deshalb auf.',
          escalate: 'Lieber zu früh als zu spät: 143 (Dargebotene Hand) oder Pro Mente Sana zur Orientierung.',
        },
      ],
    },
    contacts: {
      title: 'Anlaufstellen Schweiz',
      intro: 'Notfallnummern gelten rund um die Uhr, kostenlos und auf Wunsch anonym.',
      items: [
        {
          number: '144',
          name: 'Sanität / Lebensgefahr',
          detail: 'Sofort, rund um die Uhr, in akuter Lebensgefahr. Auch bei Suizidversuch.',
        },
        {
          number: '143',
          name: 'Die Dargebotene Hand',
          detail: 'Anonym, kostenlos, 24/7 — auch zur ersten Orientierung, wenn unklar ist, wohin.',
        },
        {
          number: '147',
          name: 'Pro Juventute',
          detail: 'Beratung für Kinder und Jugendliche, anonym, 24/7.',
        },
        {
          number: '0800 33 66 55',
          name: 'AERZTEFON Kanton Zürich',
          detail: 'Medizinische Triage in nicht-lebensbedrohlichen Situationen.',
        },
        {
          name: 'kjz',
          detail: 'Kinder- und Jugendhilfezentren ZH — Beratung, Kindeswohlabklärung, regional.',
        },
        {
          name: 'PUK Angehörigenberatung',
          detail: 'Kostenlos, vertraulich, auch ohne PUK-Hospitalisation.',
        },
        {
          name: 'Pro Mente Sana',
          detail: 'Telefon- und Online-Beratung Schweiz für Angehörige und Betroffene.',
        },
      ],
    },
    selfNote: {
      title: 'Eigene Erschöpfung ist ein legitimer Anlass',
      text: 'Anhaltende Überforderung der angehörigen Person ist selbst ein Grund, Hilfe zu holen — nicht erst, wenn auch andere kippen. Angehörigenberatung ist genau dafür da, und sie kostet im Erstgespräch in der Regel nichts.',
    },
    disclaimer:
      'Diese Karte ist eine Orientierungshilfe, kein klinisches Triage-Werkzeug. In jeder akuten Lebensgefahr gilt zuerst 144. Bei Unsicherheit über Kindeswohl: lieber einmal zu früh beim kjz anrufen als einmal zu spät.',
    crossRefs: {
      title: 'Verwandte Inhalte',
      items: [
        {
          kind: 'faq',
          label: 'Aus dem FAQ: Cluster 3 «Zusammenarbeit und nächste Schritte»',
          anchor: '#material-zusammenarbeit',
        },
        {
          kind: 'faq',
          label: 'Aus dem FAQ: Cluster 2 «Grenzen und Selbstschutz»',
          anchor: '#material-grenzen',
        },
        {
          kind: 'navigation',
          label: 'Vollständiges Fachstellen-Verzeichnis im Netzwerk-Tab',
          target: 'netzwerk',
        },
      ],
    },
  },
  // Tier-2-Handout (Issue #116): Altersgerechte Uebersicht fuer Eltern +
  // Fachpersonen. Vier Altersphasen (Kleinkind bis 3, Kindergarten 3-6,
  // Schulkind 7-12, Jugendliche ab 13), jede Karte in vier Sektionen:
  // was zeigen Kinder, was brauchen sie, was hilft den Eltern, wann eine
  // Fachstelle dazu. Altersgrenzen entsprechen Cluster 5 (material-
  // altersgerecht), damit Handout + FAQ inhaltlich synchron bleiben.
  // Quelle: Stauber et al. (2018), Kap. 5.3.2; Lenz (2010), Tab. 3.
  {
    id: 'material-handout-was-kinder-brauchen',
    kind: 'age-grid',
    eyebrow: 'Handout für Eltern',
    title: 'Was Kinder in welchem Alter brauchen',
    description:
      'Eine altersdifferenzierte Übersicht für Familien, in denen ein Elternteil psychisch erkrankt ist. Vier Altersphasen, je vier Leitfragen — was zeigt das Kind, was braucht es, was hilft Eltern, wann eine Fachstelle.',
    usage: {
      when: 'Zur Vorbereitung eines Gesprächs oder zur Orientierung im Alltag — nicht in der akuten Krise.',
      people:
        'Eltern (betroffen oder unterstützend) zur Selbstlektüre; Fachpersonen als Gesprächsgrundlage in Elternberatung oder Psychoedukation.',
      validity:
        'Die Altersphasen sind Orientierung, kein Raster. Entwicklung verläuft individuell — Karten gelten breit, nicht pro Geburtstag.',
      where:
        'Zur Vorbereitung ausdrucken, am Kühlschrank markieren (aktuelle Phase), gemeinsam mit der zweiten Bezugsperson oder dem Behandlungsteam durchgehen.',
    },
    ageGroups: {
      title: 'Vier Altersphasen — was zeigen Kinder, was brauchen sie',
      intro:
        'Die vier Karten fassen zusammen, was in der jeweiligen Phase besonders wichtig ist. Sie ersetzen keine individuelle Einschätzung — sie geben Orientierung, an welcher Stelle ein Gespräch ansetzen kann und worauf die Beobachtung sich richten sollte.',
      items: [
        {
          id: 'kleinkind',
          ageRange: 'bis 3 Jahre',
          label: 'Kleinkind',
          symptoms: {
            title: 'Was zeigen Kinder',
            items: [
              'Spüren Veränderungen in Atmosphäre und Stimmung, auch ohne zu verstehen, was los ist.',
              'Reagieren mit stärkerem Anklammern, Unruhe, Schlafproblemen oder verändertem Essverhalten.',
              'Können sich schuldig fühlen, ohne das in Worten ausdrücken zu können.',
            ],
          },
          needs: {
            title: 'Was brauchen sie',
            items: [
              'Verlässliche Routinen (Aufwachen, Essen, Schlafen) — der Alltag als Anker.',
              'Ruhigen Ton, warme kurze Sätze — nicht detaillierte Erklärungen.',
              'Eine durchgehend verfügbare Bezugsperson, wenn der erkrankte Elternteil zeitweise nicht da sein kann.',
            ],
          },
          parentHelp: {
            title: 'Was hilft Eltern',
            items: [
              'Benennen, was gerade ist: «Mama ist heute müde, sie schläft jetzt. Ich bin bei dir.»',
              'Signalisieren — auch nonverbal —, dass das Kind nichts dafür kann.',
              'Rituale halten (Gute-Nacht-Lied, Bilderbuch) — Kontinuität wirkt stärker als Worte.',
            ],
          },
          threshold: {
            title: 'Wann eine Fachstelle',
            text: 'Bei anhaltenden Schlaf- oder Essstörungen, plötzlichem Rückzug oder markanten Verhaltensänderungen über mehrere Wochen: kinderärztliche Abklärung und kjz.',
          },
        },
        {
          id: 'kindergarten',
          ageRange: '3–6 Jahre',
          label: 'Kindergartenkind',
          symptoms: {
            title: 'Was zeigen Kinder',
            items: [
              'Grosser Wissensdrang — fragen nach, wollen Unbekanntes einordnen.',
              'Magisches Denken: vermuten, die Erkrankung durch eigenes Verhalten oder Wünsche verursacht zu haben.',
              'Schuldgefühle und Fantasien, die oft bedrohlicher sind als die Wirklichkeit.',
              'Begrenzte Aufmerksamkeitsspanne — Erklärungen müssen kurz bleiben.',
            ],
          },
          needs: {
            title: 'Was brauchen sie',
            items: [
              'Einfache, anschauliche Sprache mit konkreten Alltagsbeispielen.',
              'Aktives Aufgreifen möglicher Schuldgefühle — nicht warten, bis das Kind fragt.',
              'Bilderbücher als Brücke zu schwer greifbaren Themen.',
              'Die Erlaubnis, Fragen zu stellen, auch wiederholt.',
            ],
          },
          parentHelp: {
            title: 'Was hilft Eltern',
            items: [
              'Die Krankheit bei einem Namen nennen («Depression», «Angst»), damit sie greifbar wird.',
              'Den Satz «Du bist nicht schuld» aktiv und mehrfach sagen, nicht nur auf Nachfrage.',
              'Sich auf das Wichtigste beschränken — Details kommen später, wenn Fragen gestellt werden.',
            ],
          },
          threshold: {
            title: 'Wann eine Fachstelle',
            text: 'Wenn Ängste, Schuldgefühle oder Rückfälle in früheres Verhalten (z. B. wieder Einnässen, Babysprache) bleiben: Kita-Leitung, Kinderarzt, kjz oder Institut Kinderseele Schweiz.',
          },
        },
        {
          id: 'schulkind',
          ageRange: '7–12 Jahre',
          label: 'Schulkind',
          symptoms: {
            title: 'Was zeigen Kinder',
            items: [
              'Nehmen Unterschiede zur eigenen Familie und anderen Familien wahr.',
              'Sorgen sich oft still um den erkrankten Elternteil, ohne direkt zu fragen.',
              'Verstecken Informationsbedürfnis hinter sachlich klingenden Fragen («Was ist die Ursache?»).',
              'Geraten in Loyalitätskonflikte, wenn in der Familie über die Krankheit geschwiegen wird.',
            ],
          },
          needs: {
            title: 'Was brauchen sie',
            items: [
              'Sachliche Antworten plus die emotionale Ebene aufnehmen, die oft mitschwingt.',
              'Die Erlaubnis, ausserhalb der Familie zu sprechen (Lehrperson, Vertrauensperson).',
              'Einen Krisenplan mit benannter Vertrauensperson für akute Phasen.',
              'Kontakte und Freizeit ausserhalb des Familiensystems.',
            ],
          },
          parentHelp: {
            title: 'Was hilft Eltern',
            items: [
              'Sprechfenster aktiv öffnen: «Hast du gerade Sorgen, die du mir erzählen magst?»',
              'Eine feste Vertrauensperson benennen und diese vorab einbeziehen.',
              'Schule oder Hort informieren, damit das Kind dort einen sicheren Ort hat.',
              'Darauf achten, dass das Kind nicht zu früh Verantwortung für Eltern oder Geschwister übernimmt (Fachbegriff: Parentifizierung).',
            ],
          },
          threshold: {
            title: 'Wann eine Fachstelle',
            text: 'Wenn die Schulnoten plötzlich sinken, Ihr Kind sich von Freund:innen zurückzieht oder zunehmend im Haushalt mithilft: Schulsozialarbeit, Schulpsychologischer Dienst oder kjz.',
          },
        },
        {
          id: 'jugendliche',
          ageRange: 'ab 13 Jahren',
          label: 'Jugendliche',
          symptoms: {
            title: 'Was zeigen Kinder',
            items: [
              'Verstehen die Situation kognitiv, werden aber wegen des erwachsen wirkenden Auftretens oft überschätzt.',
              'Stehen zwischen Autonomiebedürfnis und Abhängigkeit von der Familie.',
              'Vergleichen sich mit dem erkrankten Elternteil und fragen sich, ob sie selbst erkranken können.',
              'Haben Wissensvorsprung aus dem Internet, der oft unvollständig oder einseitig ist.',
            ],
          },
          needs: {
            title: 'Was brauchen sie',
            items: [
              'Gespräch auf Augenhöhe — keine Vereinfachungen, keine Beschönigung.',
              'Ehrliche Auseinandersetzung mit Vererbbarkeit und Risiko.',
              'Zugang zu Fachpersonen und Peers ausserhalb der Familie.',
              'Raum für eigene Entwicklung — nicht zur Co-Betreuer:in werden.',
            ],
          },
          parentHelp: {
            title: 'Was hilft Eltern',
            items: [
              'Den vorhandenen Wissensstand anerkennen und darauf aufbauen, statt bei Null anzufangen.',
              'Offen über Risiko und Schutzfaktoren sprechen: «Vererbt wird Verletzlichkeit, nicht die Krankheit.»',
              'Materialien wie Broschüren von Pro Juventute oder Kurzfilme von Kinderseele Schweiz anbieten.',
              'Nicht überbehüten — Autonomie und Freund:innen bleiben Schutzfaktoren.',
            ],
          },
          threshold: {
            title: 'Wann eine Fachstelle',
            text: 'Bei Suizidgedanken, riskantem Verhalten, Substanzkonsum oder anhaltender Niedergeschlagenheit: Pro Juventute 147, kjz, PUK Kinder- und Jugendpsychiatrie oder Institut Kinderseele Schweiz.',
          },
        },
      ],
    },
    disclaimer:
      'Die Altersphasen sind Orientierung, nicht Diagnose. Entwicklung verläuft individuell — Mein-Kind-sollte-mit-8-schon-Vergleiche sind nicht das Ziel. Bei akuter Belastung des Kindes oder des Familiensystems ist eine individuelle Fachstelleneinschätzung (kjz, Kinderarzt, Institut Kinderseele Schweiz) wichtiger als die Karte.',
    crossRefs: {
      title: 'Verwandte Inhalte',
      items: [
        {
          kind: 'faq',
          label: 'Aus dem FAQ: Cluster 5 «Altersgerecht erklären» (ausführlicher Text pro Phase)',
          anchor: '#material-altersgerecht',
        },
        {
          kind: 'handout',
          label: 'Komplementär: «Erstes Gespräch mit dem Kind» (Einstiegssätze + typische Fragen)',
          anchor: '#material-handout-erstes-gespraech',
        },
        {
          kind: 'handout',
          label: 'Komplementär: «Wann eine Fachstelle?» (Schwellen-Karte für Angehörige)',
          anchor: '#material-handout-wann-fachstelle',
        },
        {
          kind: 'faq',
          label: 'Aus dem FAQ: Cluster 4 «Mit Kindern über die Erkrankung sprechen»',
          anchor: '#material-kinder',
        },
      ],
    },
  },
  // Tier-2-Handout #5: Psychoedukations-Info fuer Eltern an die Schule.
  // Format E (school-info): Situationsfelder zum Ausfuellen, konkrete
  // Support-Items, Boundary-Callout (was NICHT geteilt werden muss),
  // Notfall-Kontakte. Quelle: Stauber Kap. 4.3 + 5.3 (soziale Kontakte
  // ermoeglichen, Schule als Schutzfaktor, «innere Erlaubnis»).
  {
    id: 'material-handout-schule',
    kind: 'school-info',
    eyebrow: 'Handout für Eltern → Schule',
    title: 'Information an die Lehrperson',
    description:
      'Eine ausfüllbare Vorlage, die Eltern dabei unterstützt, die Lehrperson ihres Kindes über die familiäre Situation zu informieren — sachlich, begrenzt und auf die Bedürfnisse des Kindes fokussiert.',
    usage: {
      when: 'Wenn ein Kind in der Schule auffällt, sich verändert oder Eltern präventiv informieren möchten.',
      people: 'Betroffene Eltern (ggf. mit Fachperson vorbereitet) → Klassenlehrperson.',
      validity: 'Kann jederzeit angepasst oder zurückgezogen werden. Gilt, solange es für die Familie stimmt.',
      where: 'Ausdrucken, gemeinsam ausfüllen, persönlich übergeben oder per Post senden.',
    },
    whyThisSheet: {
      title: 'Warum dieses Blatt?',
      text: 'Kinder verbringen einen grossen Teil ihres Alltags in der Schule. Wenn zu Hause eine besondere Belastung besteht, merken Lehrpersonen oft, dass sich etwas verändert — ohne zu wissen, warum. Dieses Blatt gibt Ihnen als Eltern die Möglichkeit, die Schule sachlich und begrenzt zu informieren, damit Ihr Kind dort die Unterstützung bekommt, die es braucht. Sie entscheiden, was Sie mitteilen — und was nicht.',
    },
    situation: {
      title: 'Über unser Kind',
      intro: 'Diese Angaben helfen der Lehrperson, das Kind besser zu verstehen und zu begleiten.',
      fields: [
        { label: 'Name des Kindes', placeholder: '_______________', type: 'text' },
        { label: 'Klasse / Stufe', placeholder: '_______________', type: 'text' },
        { label: 'Was die Lehrperson wissen sollte', placeholder: 'Beispiel: «In unserer Familie gibt es aktuell eine besondere Belastung. Ein Elternteil ist psychisch erkrankt. Wir möchten, dass die Schule Bescheid weiss, damit unser Kind gut begleitet werden kann.» — Sie können diesen Satz übernehmen oder in eigenen Worten schreiben.', type: 'textarea' },
        { label: 'Was sich beim Kind verändern kann', placeholder: 'Beispiel: «Unser Kind könnte in den nächsten Wochen stiller, müder oder gereizter sein als üblich. Es könnte Konzentrationsprobleme zeigen oder sich aus dem Kontakt zurückziehen.» — Beschreiben Sie, was Sie bei Ihrem Kind beobachten.', type: 'textarea' },
      ],
    },
    supportItems: {
      title: 'Was unserem Kind in der Schule helfen kann',
      intro: 'Bitte ankreuzen oder ergänzen, was auf Ihr Kind zutrifft:',
      items: [
        'Geduld bei Konzentrationsproblemen oder Vergesslichkeit',
        'Verständnis, wenn das Kind stiller oder gereizter ist als üblich',
        'Die Möglichkeit, sich kurz zurückzuziehen, wenn es zu viel wird',
        'Eine verlässliche Ansprechperson in der Schule, an die sich das Kind wenden kann',
        'Keine öffentliche Thematisierung vor der Klasse',
        'Rückmeldung an die Eltern bei auffälligen Veränderungen',
        'Flexibilität bei Hausaufgaben oder Terminen, wenn es zu Hause schwierig ist',
        'Aufmerksamkeit darauf, ob das Kind zu viel Verantwortung für andere übernimmt',
      ],
    },
    schoolDoesNotNeed: {
      title: 'Was die Schule nicht tun muss',
      items: [
        'Die Lehrperson muss keine Therapie ersetzen und kein Beratungsgespräch führen.',
        'Sie muss die Diagnose nicht kennen und keine medizinischen Fragen klären.',
        'Sie muss das Kind nicht anders behandeln — nur aufmerksamer hinschauen.',
        'Wenn die Belastung über das hinausgeht, was die Schule auffangen kann, darf sie an den Schulpsychologischen Dienst oder an die Eltern zurückverweisen.',
      ],
    },
    boundary: {
      title: 'Was Sie als Eltern nicht teilen müssen',
      text: 'Sie müssen der Lehrperson keine Diagnose nennen, keine Behandlungsdetails mitteilen und nichts über die familiäre Situation erzählen, das über die Bedürfnisse des Kindes hinausgeht. Ein Satz wie «Ein Elternteil ist gesundheitlich belastet, unser Kind braucht aktuell etwas mehr Aufmerksamkeit» ist vollkommen ausreichend.',
    },
    contacts: {
      title: 'Notfall-Kontakte',
      intro: 'Falls die Schule Sorgen hat oder das Kind akute Unterstützung braucht:',
      items: [
        { name: 'Erreichbare Bezugsperson', detail: '(Name und Telefonnummer eintragen)', number: null },
        { name: 'Pro Juventute Beratung', detail: 'Für Kinder und Jugendliche, kostenlos und vertraulich', number: '147' },
        { name: 'Elternnotruf', detail: '24h-Beratung für Eltern in Belastungssituationen', number: '0848 35 45 55' },
      ],
    },
    disclaimer:
      'Dieses Informationsblatt ist freiwillig und kann jederzeit zurückgezogen werden. Es ersetzt keine schulpsychologische Abklärung. Bei akuter Gefährdung gilt das schulische Meldeverfahren.',
    crossRefs: [
      { targetId: 'material-kinder', label: 'Cluster 4: Mit Kindern über die Erkrankung sprechen' },
      { targetId: 'material-altersgerecht', label: 'Cluster 5: Altersgerecht erklären' },
      { targetId: 'material-handout-erstes-gespraech', label: 'Handout: Wie sage ich es meinem Kind?' },
    ],
  },
  // Tier-2-Handout #6: Was darf ich vom Behandlungsteam erwarten?
  // Fuer Angehoerige. Aggregiert Glossar-Inhalte (Schweigepflicht, Trialog,
  // Angehoerigenarbeit) + Cluster-3-FAQs. Format F (rights-overview):
  // Rechte / Realitaeten / Grenzen / Trialog-Pfad / Eskalation.
  {
    id: 'material-handout-behandlungsteam',
    kind: 'rights-overview',
    eyebrow: 'Handout für Angehörige',
    title: 'Was darf ich vom Behandlungsteam erwarten?',
    description:
      'Orientierung für Angehörige: was Sie mitteilen dürfen, was Sie erfahren können, wo die Grenzen liegen — und was Sie tun können, wenn die Zusammenarbeit stockt.',
    usage: {
      when: 'Vor oder nach einem Gespräch mit dem Behandlungsteam — zur Vorbereitung oder Einordnung.',
      people: 'Angehörige (Partner:innen, erwachsene Kinder, Eltern) der erkrankten Person.',
      validity: 'Allgemeine Orientierung. Rechtliche Fragen immer mit einer Beratungsstelle klären.',
      where: 'Ausdrucken, markieren was zutrifft, zum Gespräch mitnehmen oder zur Reflexion nutzen.',
    },
    preparation: {
      title: 'Vorbereitung auf das Gespräch',
      intro: 'Gespräche mit dem Behandlungsteam sind oft kurz. Vorbereitung hilft, das Wesentliche zu sagen:',
      items: [
        { task: 'Notieren Sie vorher 2–3 konkrete Beobachtungen', hint: 'Was hat sich verändert? Seit wann? Was macht Ihnen am meisten Sorgen?' },
        { task: 'Formulieren Sie Ihr Anliegen in einem Satz', hint: 'z. B. «Ich möchte wissen, wie ich mein Kind in dieser Phase am besten unterstütze.»' },
        { task: 'Klären Sie: Darf das Team mit Ihnen über Details sprechen?', hint: 'Falls es keine Entbindung von der Schweigepflicht (Erlaubnis zur Weitergabe) gibt: Sie dürfen trotzdem Ihre Beobachtungen mitteilen. Das Team darf nur nicht frei antworten.' },
        { task: 'Nehmen Sie dieses Blatt mit', hint: 'Es kann helfen, die eigenen Rechte und Grenzen im Blick zu behalten, wenn das Gespräch emotional wird.' },
      ],
    },
    conversationStarters: {
      title: 'Mögliche Einstiegssätze',
      intro: 'Nicht als Skript — als Anker, wenn die Worte fehlen:',
      items: [
        '«Ich möchte Ihnen etwas mitteilen, das mir im Alltag aufgefallen ist.»',
        '«Ich mache mir Sorgen um die Kinder. Darf ich Ihnen erzählen, was ich beobachte?»',
        '«Ich weiss, dass Sie mir nicht alles sagen können. Aber ich hätte eine Frage, die mir hilft.»',
        '«Gibt es etwas, das ich zu Hause tun kann, um die Behandlung zu unterstützen?»',
      ],
    },
    rights: {
      title: 'Was Ihnen zusteht',
      intro: 'Auch wenn das Team Ihnen nicht alles sagen darf (Schweigepflicht), haben Sie bestimmte Möglichkeiten:',
      items: [
        { right: 'Eigene Beobachtungen mitteilen', detail: 'Sie dürfen dem Behandlungsteam jederzeit sagen, was Sie im Alltag wahrnehmen — Veränderungen, Krisen, Sorgen um Kinder. Das Team muss Ihnen nichts zurückmelden, aber es darf zuhören.' },
        { right: 'Allgemeine Informationen erhalten', detail: 'Fachpersonen dürfen Ihnen allgemeine Informationen über die Erkrankung, Behandlungsformen und Unterstützungsangebote geben — ohne patientenbezogene Details.' },
        { right: 'An der Angehörigenberatung teilnehmen', detail: 'Die PUK Zürich und viele andere Kliniken bieten eigenständige Angehörigenberatung an. Dort sind Sie die Klient:in, nicht die erkrankte Person.' },
        { right: 'Eine Entbindung anregen', detail: 'Sie können die erkrankte Person bitten, dem Team zu erlauben, mit Ihnen über bestimmte Themen zu sprechen — ganz oder teilweise. Das Team darf das nicht von sich aus tun.' },
      ],
    },
    realities: {
      title: 'Was realistisch ist',
      intro: 'Gute Zusammenarbeit braucht Erwartungen, die der Realität entsprechen:',
      items: [
        'Das Team hat begrenzte Zeit — kurze, konkrete Anliegen werden eher gehört als lange Schilderungen.',
        'Die Schweigepflicht (das Recht der erkrankten Person auf Vertraulichkeit) schützt sie, nicht das Team. Das kann frustrierend sein — aber es ist ein wichtiges Schutzrecht.',
        'Gemeinsame Gespräche (Betroffene + Angehörige + Fachperson, sogenannter «Trialog») gibt es, sie sind aber nicht überall Standard.',
        'Nicht jede Fachperson ist gleich sensibel für Angehörigen-Anliegen. Wenn der Kontakt nicht trägt, ist ein Wechsel der Ansprechperson legitim.',
      ],
    },
    limits: {
      title: 'Wo die Grenzen liegen',
      items: [
        { limit: 'Keine Auskünfte ohne Einwilligung', detail: 'Ohne Entbindung darf das Team Ihnen nichts über Diagnose, Therapie oder Medikation sagen — auch wenn Sie die nächste Bezugsperson sind.' },
        { limit: 'Keine Behandlungsentscheide durch Angehörige', detail: 'Solange die erkrankte Person ihre Entscheidungen selbst treffen kann, bestimmt sie allein über Behandlung, Aufenthalt und was weitergegeben wird.' },
        { limit: 'Keine automatische Einbeziehung', detail: 'Angehörige werden nicht automatisch informiert oder einbezogen — das braucht aktive Schritte von beiden Seiten.' },
      ],
    },
    trialogPath: {
      title: 'Der Weg zum Trialog',
      intro: 'Ein Trialog (wörtlich: «Dreier-Gespräch») ist ein Austausch auf Augenhöhe zwischen der erkrankten Person, Ihnen als Angehörige:r und den Fachpersonen.',
      steps: [
        'Eigenen Wunsch nach einem gemeinsamen Gespräch äussern — gegenüber der erkrankten Person und/oder dem Behandlungsteam.',
        'Wenn die erkrankte Person zustimmt: Zeitpunkt, Rahmen und Themen gemeinsam vereinbaren.',
        'Wenn die erkrankte Person (noch) nicht bereit ist: eigene Angehörigenberatung nutzen und den Wunsch offen halten.',
      ],
    },
    escalation: {
      title: 'Wenn es nicht weitergeht',
      intro: 'Nicht jeder Kontakt mit dem Behandlungsteam funktioniert. Mögliche nächste Schritte:',
      items: [
        { action: 'Ansprechperson wechseln', detail: 'Fragen Sie nach einer anderen Fachperson im Team — das ist kein Affront, sondern Alltag.' },
        { action: 'Ombudsstelle kontaktieren', detail: 'Jede Klinik hat eine Beschwerde- oder Ombudsstelle. Dort können Sie neutral vermittelte Unterstützung bekommen.' },
        { action: 'Pro Mente Sana anrufen', detail: 'Kostenlose Rechtsberatung für Betroffene und Angehörige (0848 800 858).' },
      ],
    },
    disclaimer:
      'Dieses Blatt gibt allgemeine Orientierung. Es ersetzt keine individuelle Rechtsberatung. Bei konkreten Fragen zu Ihrem Fall: Angehörigenberatung der PUK Zürich oder Pro Mente Sana (0848 800 858).',
    crossRefs: [
      { targetId: 'material-zusammenarbeit', label: 'Cluster 3: Zusammenarbeit und nächste Schritte' },
      { targetId: 'material-handout-wann-fachstelle', label: 'Handout: Wann braucht es eine Fachstelle?' },
    ],
  },
];

// Zielgruppen-Blöcke fuer die Material-Cluster (Issues #102 + #103). Die sechs
// FAQ-Cluster adressieren zwei verschiedene Lesergruppen — Cluster 1-3
// richten sich an Angehoerige (Partner:innen / Familie der erkrankten Person),
// Cluster 4-6 an betroffene Eltern selbst (Ich-Form-Fragen zum Gespraech mit
// dem Kind). Frueher lagen alle sechs Cluster in einer linearen Liste;
// inzwischen wird die Grenze im Template durch einen Block-Header mit H2 +
// Audience-Badge sichtbar gemacht. Die Meta-Texte hier (title / description)
// steuern diesen Block-Header, der `badge`-Text wird zusaetzlich auf jedem
// einzelnen Cluster angezeigt, damit die Adressat-Zuordnung auch beim Scrollen
// erhalten bleibt.
export const MATERIAL_CLUSTER_AUDIENCES = [
  {
    id: 'angehoerige',
    badge: 'Für Angehörige',
    title: 'Material für Angehörige',
    description:
      'Die nächsten drei Cluster richten sich an Partner:innen und Familie der erkrankten Person — mit Fragen zu Belastung, Grenzen und Zusammenarbeit im Helfersystem.',
  },
  {
    id: 'eltern',
    badge: 'Für betroffene Eltern',
    title: 'Material für betroffene Eltern',
    description:
      'Die folgenden drei Cluster richten sich an psychisch erkrankte Eltern selbst — mit Fragen zum Gespräch mit dem Kind: was sagen, wie altersgerecht erklären und mit welchen Formulierungen je Störungsbild.',
  },
];

export const MATERIAL_CLUSTERS = [
  {
    id: 'material-verstehen',
    audience: 'angehoerige',
    surface: 'plain',
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
          'Kurzfristig kann Deeskalation sinnvoll sein. Langfristig führt ein dauerhaftes Ausweichen jedoch oft dazu, dass Angehörige immer mehr Spannung mittragen, während wichtige Themen unbesprechbar werden. Tragfähiger ist meist eine Kombination aus ruhigem Ton, klaren Grenzen und kleinen, konkret vereinbarten Schritten.',
      },
    ],
  },
  {
    id: 'material-grenzen',
    audience: 'angehoerige',
    surface: 'subtle',
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
    id: 'material-zusammenarbeit',
    audience: 'angehoerige',
    surface: 'warm',
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
        question:
          'Was kann ich dem Behandlungsteam sagen, auch wenn ich nicht offiziell von der Schweigepflicht entbunden bin?',
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
  {
    // Cluster 4 basiert auf dem Transfer-Audit (2026-05-Content), Primärquelle:
    // Stauber, A., Nyffeler, C. & Gosteli, L. (2018). Psychisch kranke Eltern
    // im Beratungskontext. Praxisforschung Band 25, Erziehungsdirektion Kanton
    // Bern. Insbesondere Tabelle 1 (Lenz, 2010, S. 187) und Kapitel 2.5
    // (spezifische Schutzfaktoren: Krankheitswissen + offener Umgang).
    id: 'material-kinder',
    audience: 'eltern',
    surface: 'plain',
    eyebrow: 'Cluster 4',
    title: 'Mit Kindern über die Erkrankung sprechen',
    description:
      'Kinder nehmen Veränderungen im Verhalten ihrer Eltern genau wahr, auch wenn darüber nicht gesprochen wird. Studien zeigen, dass altersgerechtes Krankheitswissen und ein offener Umgang in der Familie zu den stärksten Schutzfaktoren gehören. Dieser Abschnitt greift die häufigsten Fragen auf, die Angehörige und Eltern zum Gespräch mit dem Kind bewegen. Bilderbücher, Kinderbücher und Jugendbücher, die das Gespräch unterstützen können, finden sich im Evidenz-Materialbereich.',
    aside: {
      label: 'Merksatz',
      title: 'Nicht das Wissen überfordert, sondern das Nichtwissen',
      copy: 'Wenn Kinder keine Erklärung für die Veränderung ihrer Eltern erhalten, füllen sie die Lücke mit eigenen Fantasien — die oft bedrohlicher sind als die Wirklichkeit.',
      tone: 'soft',
    },
    faqs: [
      {
        question: 'Was möchten Kinder über die Erkrankung ihrer Eltern wissen?',
        answer:
          'Studien zeigen fünf wiederkehrende Themenbereiche: Wie soll ich mich gegenüber Mama oder Papa verhalten? Wird sich mein Leben verändern? Was ist die Ursache der Erkrankung und werde ich auch krank? Was ist der Unterschied zwischen psychischer und körperlicher Krankheit? Und: Kann Mama oder Papa wieder gesund werden? Die Reihenfolge und Dringlichkeit dieser Fragen verändern sich je nach Alter, Entwicklungsstand und Krankheitsverlauf.',
      },
      {
        question: 'Darf ich meinem Kind sagen, was los ist, oder belastet das zu sehr?',
        answer:
          'Forschungsbefunde zeigen klar, dass Krankheitswissen und Krankheitsverstehen zu den wichtigsten spezifischen Schutzfaktoren für Kinder psychisch kranker Eltern gehören. Wissen gibt Kindern ein Gefühl von Kontrolle und reduziert Schuldgefühle. Diffuse Vorstellungen dagegen lösen oft Angst, Verunsicherung und Hilflosigkeit aus. Ehrlichkeit und Offenheit stabilisieren die Eltern-Kind-Beziehung langfristig.',
      },
      {
        question: 'Wie erkläre ich meinem Kind, was psychisch krank heisst?',
        answer:
          'Am hilfreichsten sind einfache, kurze Sätze, die beim Alltag des Kindes ansetzen: «Mama hat eine Krankheit, die macht, dass sie oft sehr traurig ist und fast nichts mehr schaffen kann.» Oder: «Papa hat so viel Angst, dass er manche Dinge nicht mehr tun kann.» Das Kind braucht zu Beginn nicht alle Details — wichtig ist, dass die Erkrankung einen Namen bekommt und das Kind weiss, dass darüber gesprochen werden darf.',
      },
      {
        question: 'Wie beginne ich das Gespräch mit meinem Kind?',
        answer:
          'Ein möglicher Einstieg: «Damit du Bescheid weisst und dir nicht unnötig Sorgen machst, möchte ich dir erklären, was mit mir los ist.» Dieser Satz signalisiert drei Dinge: Offenheit, Fürsorge und die Erlaubnis, Fragen zu stellen. Das Kind braucht zu Beginn nicht alle Details — wichtig ist, dass die Erkrankung benannt wird, dass sich Veränderungen im Alltag ergeben können und dass das Kind nicht schuld ist.',
      },
      {
        question: 'Wie merke ich, ob mein Kind das Gesagte wirklich verstanden hat?',
        answer:
          'Am hilfreichsten ist, das Kind zu bitten, das Gehörte in eigenen Worten wiederzugeben — nicht als Test, sondern als Einladung: «Magst du mir erzählen, was du jetzt verstanden hast?» Dabei nicht nur auf den Inhalt achten, sondern auch auf Mimik, Tonfall und Körpersprache. Wenn das Kind echohaft nachspricht oder ausweicht, braucht es vielleicht eine Pause oder eine andere Erklärung. Wichtig: Psychoedukation ist kein einmaliges Gespräch, sondern ein fortlaufender Prozess — Kinder kommen mit neuen Fragen zurück, wenn sie bereit sind.',
      },
      {
        question: 'Was tue ich, wenn mein Kind sich für meine Erkrankung schuldig fühlt?',
        answer:
          'Viele Kinder vermuten, dass sie durch ihr Verhalten die Erkrankung verursacht oder verschlimmert haben — insbesondere jüngere Kinder mit stark magischem Denken. Es ist wichtig, dem Kind klar zu sagen, dass es nicht schuld ist. Auch wenn es sich schlecht benommen hat, einen Streit ausgelöst hat oder zu wenig geholfen hat: die Krankheit hat andere Ursachen.',
      },
      {
        question: 'Was sage ich, wenn mein Kind fragt, ob es selbst auch krank werden kann?',
        answer:
          'Die Frage nach der Vererbbarkeit beschäftigt vor allem Jugendliche und sollte ehrlich beantwortet werden. Die Wissenschaft zeigt: nicht die Krankheit selbst wird vererbt, sondern eine erhöhte Verletzlichkeit. Ob daraus eine Erkrankung entsteht, hängt stark von Umweltfaktoren, Beziehungen und Unterstützung ab. Das Kind darf wissen, dass es selbst viel tun kann und dass es Hilfe gibt, wenn es sie braucht.',
      },
      {
        question: 'Was braucht mein Kind, wenn ich in einer akuten Krankheitsphase bin?',
        answer:
          'Einen Krisenplan: Wer ist die Vertrauensperson, an die sich das Kind wenden kann? Wie kann das Kind diese Person erreichen? Welche Unterstützung kann die Person leisten — kurzfristig und über längere Zeit? Verbindliche Abmachungen geben dem Kind das Gefühl, selbst etwas tun zu können, und entlasten Eltern von Sorgen um die Versorgung in instabilen Phasen.',
      },
    ],
  },
  {
    // Cluster 5 basiert auf Stauber et al. (2018), Kap. 5.3.2
    // «Altersspezifische Aspekte bei der Psychoedukation». Schliesst direkt
    // an Cluster 4 an, das Grundlagen der Kinder-Aufklärung behandelt.
    id: 'material-altersgerecht',
    audience: 'eltern',
    surface: 'subtle',
    eyebrow: 'Cluster 5',
    title: 'Altersgerecht erklären — was Kinder in welchem Alter brauchen',
    description:
      'Der Informationsbedarf und das Verständnis von Kindern sind je nach Alter und Entwicklungsstand unterschiedlich. Dieser Abschnitt fasst zusammen, was in welcher Phase besonders wichtig ist — von Kleinkindern bis zu Jugendlichen.',
    aside: {
      label: 'Merksatz',
      title: 'Das Gespräch beginnt nicht bei einem bestimmten Alter',
      copy: 'Auch sehr junge Kinder spüren Veränderungen. Es ist nicht die Frage ob, sondern wie man mit ihnen spricht — und in welcher Form.',
      tone: 'soft',
    },
    faqs: [
      {
        question: 'Ab welchem Alter kann man mit Kindern über die Erkrankung sprechen?',
        answer:
          'Das Sprechen mit dem Kind ist nicht an ein bestimmtes Alter gebunden. Auch Kleinkinder reagieren auf die Atmosphäre in der Familie und spüren Veränderungen. Was sich unterscheidet, ist die Form: bei ganz jungen Kindern zählt der Ton mehr als der Inhalt, bei Schulkindern wird Sachinformation wichtiger, bei Jugendlichen steht das Gespräch auf Augenhöhe im Vordergrund. Entscheidend ist, dem Kind zu signalisieren, dass es Fragen stellen darf.',
      },
      {
        question: 'Wie erkläre ich es einem Kleinkind (bis ca. 3 Jahre)?',
        answer:
          'Kleinkinder brauchen keine detaillierten Erklärungen — sie würden diese nicht einordnen können. Wichtig ist die Art, wie gesprochen wird: ruhig, warm und in kurzen Sätzen. Zum Beispiel: «Mama geht es heute nicht gut, sie ist müde und traurig und möchte schlafen. Wenn es ihr wieder besser geht, spielt sie wieder mit dir.» Auch Kleinkinder können sich schuldig fühlen, ohne das ausdrücken zu können. Es lohnt sich, ihnen zu vermitteln, dass sie nichts dafür können.',
      },
      {
        question: 'Was ist bei Kindergartenkindern (ca. 3 bis 6 Jahre) besonders?',
        answer:
          'Kinder in diesem Alter haben einen grossen Wissensdrang und möchten Unbekanntes verstehen. Gleichzeitig spielt das magische Denken eine wichtige Rolle: Kinder sind häufig überzeugt, Ereignisse durch eigene Handlungen oder Wünsche verursacht zu haben — zum Beispiel: «Wenn ich braver gewesen wäre, wäre Papa nicht krank geworden.» Diese Fantasien sind oft bedrohlicher als die Wirklichkeit. Eltern sollten mögliche Schuldgefühle aktiv aufgreifen und die Erkrankung in einfacher, anschaulicher Sprache erklären. Bilderbücher können dabei helfen. Die Aufmerksamkeitsspanne ist begrenzt — sich auf das Wichtigste beschränken.',
      },
      {
        question: 'Wie gehe ich mit Schulkindern (ca. 7 bis 12 Jahre) um?',
        answer:
          'Schulkinder nehmen Unterschiede zwischen ihrer Familie und anderen Familien wahr und sorgen sich oft still um den erkrankten Elternteil. Es fällt ihnen aber meist noch schwer, direkt nach Informationen zu fragen. Stattdessen verstecken sie ihr Informationsbedürfnis manchmal hinter sachlich klingenden Fragen wie «Was ist die Ursache der Krankheit?». Hinter solchen Fragen können Angst oder Sorge stehen — es hilft, neben der Sachantwort auch die emotionale Ebene aufzunehmen. Wenn in der Familie ein stilles Einvernehmen besteht, nicht über die Krankheit zu sprechen, kann das Kind in einen Loyalitätskonflikt geraten, weil es eigentlich mit jemandem darüber reden möchte.',
      },
      {
        question: 'Worauf achte ich bei Jugendlichen (ab ca. 13 Jahre)?',
        answer:
          'Jugendliche haben kognitiv meist ein Verständnis für die Situation, werden aber aufgrund ihres erwachsen wirkenden Auftretens oft überschätzt. Emotional stehen sie vor der Herausforderung, Autonomie und Ablösung mit der Abhängigkeit von der Familie zu vereinbaren. Viele Jugendliche vergleichen sich mit dem erkrankten Elternteil und beschäftigen sich stark mit der Frage, ob sie selbst erkranken könnten — dieses Thema sollte offen angesprochen werden. Jugendliche haben häufig einen Wissensvorsprung aus dem Internet, der aber nicht immer korrekt oder vollständig ist. Es ist hilfreich, von ihrem Wissensstand auszugehen und darauf aufzubauen. Hilfreich sind auch Materialien wie die Broschüren von Pro Juventute oder die Kurzfilme des Instituts Kinderseele Schweiz.',
      },
    ],
  },
  {
    // Cluster 6 ergänzt die Kinder-Trilogie (Cluster 4: was sagen,
    // Cluster 5: wie, je nach Alter) um konkrete Formulierungshilfen pro
    // Störungsbild. Inhaltlich orientiert an Stauber et al. (2018),
    // Kap. 5.3.1 / Tabelle 2 (Lenz 2010, S. 207–208) und Wunderer (2008).
    // Eigenständig formuliert, keine wörtliche Übernahme.
    id: 'material-formulierungshilfen',
    audience: 'eltern',
    surface: 'warm',
    eyebrow: 'Cluster 6',
    title: 'Formulierungshilfen — psychische Erkrankungen kindgerecht erklären',
    description:
      'Wenn Eltern oder Fachpersonen mit einem Kind über die elterliche Erkrankung sprechen, helfen einfache, anschauliche Sätze. Dieser Abschnitt bietet Formulierungsbeispiele für verschiedene Störungsbilder — als Orientierung, nicht als Vorgabe. Jedes Kind, jede Familie und jede Situation ist anders.',
    aside: {
      label: 'Merksatz',
      title: 'Die Krankheit bekommt einen Namen',
      copy: 'Wenn die Erkrankung benannt wird, wird sie für das Kind greifbarer. Das reduziert diffuse Ängste und gibt dem Kind eine Sprache, die es auch gegenüber Vertrauenspersonen verwenden kann.',
      tone: 'soft',
    },
    faqs: [
      {
        question: 'Wie erkläre ich allgemein, was eine psychische Erkrankung ist?',
        answer:
          'Eine psychische Erkrankung ist eine Krankheit wie andere Krankheiten auch — wie eine Allergie oder eine Erkältung. Wenn jemand psychisch erkrankt, können sich Verhalten, Gefühle oder Gedanken verändern. Manche Menschen werden sehr traurig und schaffen fast nichts mehr. Andere haben vor vielem Angst. Wieder andere sind sehr unruhig oder verwirrt. Ein Zeichen kann sein, dass es schwierig wird, mit der erkrankten Person richtig in Kontakt zu kommen. Wichtig für das Kind: Diese Krankheiten haben einen Namen, sie können behandelt werden, und sie sind nicht ansteckend.',
      },
      {
        question: 'Wie erkläre ich eine Depression?',
        answer:
          'Mögliche Formulierung: «Mama/Papa hat eine Krankheit, die heisst Depression. Das bedeutet, dass sie/er so traurig ist, dass fast gar nichts mehr geht — aufstehen, sich anziehen, kochen, essen. Alles fühlt sich furchtbar anstrengend an, obwohl sie/er gar nichts Schlimmes getan hat. Das ist nicht, weil du etwas falsch gemacht hast. Das ist die Krankheit. Und es gibt Hilfe dafür.»',
      },
      {
        question: 'Wie erkläre ich eine Manie oder bipolare Erkrankung?',
        answer:
          'Mögliche Formulierung: «Mama/Papa hat eine Krankheit, bei der sich die Stimmung sehr stark verändert. Manchmal ist sie/er ganz aufgedreht, redet ganz viel, kann nicht stillsitzen und nicht schlafen, weil zu viele Gedanken im Kopf sind. Dann wieder kommt eine Phase, in der sie/er sehr traurig und müde ist. Dieser Wechsel gehört zur Krankheit. Er hat nichts mit dir zu tun.»',
      },
      {
        question: 'Wie erkläre ich eine Psychose oder Schizophrenie?',
        answer:
          'Mögliche Formulierung: «Mama/Papa hat eine Krankheit, die macht, dass ihr/sein Kopf manchmal durcheinandergerät. Sie/er hört oder sieht dann Dinge, die andere nicht hören oder sehen. Manchmal sagt oder tut sie/er Dinge, die komisch wirken oder die dir Angst machen. Das liegt an der Krankheit, nicht daran, dass sie/er dich nicht mehr lieb hat. Es gibt Ärzte, die dabei helfen können.»',
      },
      {
        question: 'Wie erkläre ich eine Angststörung?',
        answer:
          'Mögliche Formulierung: «Mama/Papa hat eine Krankheit, die heisst Angststörung. Das bedeutet, dass sie/er vor bestimmten Dingen so viel Angst hat, dass sie/er sie nicht mehr tun kann — zum Beispiel Bus fahren, einkaufen gehen oder Leute treffen. Die Angst fühlt sich riesengross an, auch wenn andere sagen, es sei nicht schlimm. Das ist nicht, weil sie/er nicht will. Das ist die Krankheit. Und es gibt Hilfe dafür.»',
      },
    ],
  },
];
