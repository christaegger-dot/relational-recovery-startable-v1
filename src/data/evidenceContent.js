// Literatur-Anzeige-Reihenfolge als ID-Liste auf das zentrale SOURCES-Register
// (Audit 04). Die ehemalige LITERATUR-Free-Text-Liste wurde in Audit 12 in diese
// Form ueberfuehrt, damit Studien an einer Stelle gepflegt werden. Reihenfolge
// entspricht der ursprungsgleichen Anzeige-Logik auf der Evidenz-Seite.
//
// Hinweis zur Albermann-/paediatrie-schweiz-Dublette: beide Einträge zeigten
// auf dieselbe Paediatrica-Publikation (DOI 10.35190/d2021.4.5). Der doppelte
// Eintrag wurde bereinigt; 'albermann-mueller-2021' steht hier einmal.
/** @type {string[]} */
export const LITERATUR_IDS = [
  'lenz-2014',
  'koopmann-2025',
  'plass-wiegandgrefe-2012-kohlhammer',
  'albermann-mueller-2021',
  'jones-2016',
  'reupert-2021',
  'stauber-2020',
  'lenz-2019',
  'hoeller-2023',
  'grube-dorn-2007',
  'leijdesdorff-2017',
  'wiegand-grefe-2024',
  'wiegand-grefe-plass-christl-2025',
  'obsan-72-schuler-2016',
];

export const RELEVANCE_STATS = [
  {
    label: 'Erhöhte psychische Belastung',
    value: '18 %',
    note: 'Bei rund 18% der Schweizer Bevölkerung liegt eine erhöhte psychische Belastung vor (5% stark, 13% mittel), was auf das Vorliegen einer psychischen Störung hindeutet (Erhebung 2016; aktuellere OBSAN-Daten von 2024 verfügbar).',
    sourceIds: ['obsan-72-schuler-2016', 'obsan-2024-psychische-gesundheit'],
  },
  {
    label: 'Kinder und Jugendliche mit psychisch erkranktem Elternteil',
    value: "ca. 300'000",
    note: 'Auf die Schweiz übertragene Grössenordnung für unter 18-Jährige (Hochrechnung basierend auf internationaler Prävalenz).',
    sourceIds: ['albermann-mueller-2021', 'leijdesdorff-2017'],
  },
  {
    label: 'Anteil betroffener Minderjähriger',
    value: '15–23 %',
    note: 'Internationale Prävalenzschätzung aus einem narrativen Review.',
    sourceIds: ['leijdesdorff-2017'],
  },
  {
    label: 'Elternschaft im stationären Kontext',
    value: 'ca. 30 %',
    note: 'Rund 30% der stationären psychiatrischen Patient:innen haben minderjährige Kinder (synthetisiert aus mehreren deutschsprachigen Studien).',
    sourceIds: ['plass-wiegandgrefe-2012'],
  },
  {
    label: 'Zusätzlicher Hilfebedarf während des Aufenthalts',
    value: '53 %',
    note: 'In einer deutschen Stichprobe von 100 stationär behandelten psychisch erkrankten Eltern berichteten 53% einen weiteren Unterstützungsbedarf, obwohl 99% bereits Hilfeangebote in Anspruch genommen hatten.',
    sourceIds: ['hoeller-2023'],
  },
  {
    label: 'Elternschaft bei affektiven Störungen',
    value: 'ca. 70 %',
    note: 'Besonders hohe Elternschaftsrate im Vergleich zu anderen Diagnosegruppen (z.B. ~47% bei Schizophrenien, ~18% bei hirnorganischen Erkrankungen).',
    sourceIds: ['grube-dorn-2007'],
  },
];

export const RELEVANCE_POINTS = [
  'Psychische Erkrankungen betreffen nicht nur Einzelpersonen, sondern häufig ganze Familiensysteme. Sie verändern Beziehungen, Routinen und die Entwicklungschancen von Kindern.',
  "Für die Schweiz wird die Zahl betroffener Kinder und Jugendlicher unter 18 Jahren auf rund 300'000 geschätzt. Internationale Studien verorten den Anteil betroffener Minderjähriger bei 15 bis 23 Prozent (Leijdesdorff et al., 2017; Albermann & Müller, 2021).",
  'Gerade im stationären Kontext wird die Relevanz sichtbar: Rund 30 Prozent der Patientinnen und Patienten in der Erwachsenenpsychiatrie haben minderjährige Kinder (Plass & Wiegand-Grefe, 2012).',
  'Elternschaft sollte deshalb von Anfang an mitgedacht werden: bei der Anamnese, bei der Planung der Behandlung und bei der Vorbereitung des Austritts.',
];

// Haltungs-Leitsatz: Ressourcen- statt Defizit-Perspektive auf Elternschaft.
// Stauber et al. (2018), Kap. 4: «Wie eigentlich alle Eltern wollen auch
// psychisch kranke Eltern gute Eltern sein.» Kap. 4.1: Elternschaft als
// Kraft- UND Belastungsquelle. Kap. 4.3: Was Eltern tun können.
export const PARENT_GUIDING_PRINCIPLE = {
  callout:
    'Psychisch belastete Eltern wollen gute Eltern sein — und sie können es, wenn sie die richtige Unterstützung erhalten. Elternschaft stärken heisst Kinderschutz stärken.',
  normalizing:
    'Es gibt keine Eltern, die immer perfekt feinfühlig reagieren. Das gilt mit und ohne psychische Erkrankung. Entscheidend ist nicht Perfektion, sondern die Bereitschaft, hinzuschauen, zu korrigieren und bei Bedarf Hilfe anzunehmen.',
};

// Sammelreferenz für E10-E17 (Elternerleben, Familiensystem, Psychoedukation) und E22-E23 (Diagnose/Gefährdung):
// sourceIds: ['wiegand-grefe-plass-christl-2025'] -- Standardlehrbuch 2. Auflage
export const PARENT_EXPERIENCE_PANELS = [
  // Ressourcen-Perspektive zuerst (Stauber Kap. 4.1: Kraft VOR Belastung)
  {
    title: 'Elternschaft als Kraftquelle',
    text: 'Für viele betroffene Eltern ist die Beziehung zum Kind Sinnquelle, Motivation und ein wichtiger Grund, Hilfe anzunehmen und dranzubleiben. Elternschaft kann zu persönlicher Stärke, Stabilität und innerem Halt verhelfen — und das Selbstwirksamkeitsgefühl stärken.',
  },
  {
    title: 'Was Eltern trotz Erkrankung tun können',
    text: 'Nähe und Sicherheit vermitteln. Lob und Anerkennung geben. Kinder bei Problemen begleiten. Soziale Kontakte ausdrücklich erlauben. Hilfe annehmen. Über die Krankheit sprechen. Sechs Handlungsfelder, die auch unter Belastung möglich bleiben.',
  },
  // Belastungs-Perspektive nachgeordnet, aber ehrlich
  {
    title: 'Elternschaft als Belastungsquelle',
    text: 'Gleichzeitig können Symptome wie Erschöpfung, Angst, Reizbarkeit oder innere Leere dazu führen, dass selbst einfache Alltagsaufgaben kaum noch zu bewältigen sind. Das Wegfallen elterlicher Aufgaben kann wiederum den Gesundheitszustand verschlechtern.',
  },
  {
    title: 'Schuld, Scham und hohe Ansprüche',
    text: 'Viele Eltern leiden unter der Diskrepanz zwischen dem eigenen Anspruch, eine gute Mutter oder ein guter Vater zu sein, und dem Erleben, den Kindern aktuell nicht gerecht zu werden. Scham und Angst vor Bewertung können Hilfesuche stark erschweren.',
  },
];

export const PARENT_EXPERIENCE_POINTS = [
  'Psychische Erkrankungen greifen oft genau dort ein, wo Eltern besonders präsent sein müssten: bei Feinfühligkeit, Struktur, Geduld, Verlässlichkeit und emotionaler Resonanz.',
  'Viele Eltern erleben ihre Erkrankung als doppelte Belastung: Sie kämpfen mit Symptomen und zugleich mit der Sorge, dem Kind zu schaden oder als ungenügend wahrgenommen zu werden.',
  'Typisch sind Schuldgefühle, Scham, Rückzug und die Angst, Hilfe könne automatisch zu Kontrolle, Abwertung oder Sorgerechtsfragen führen.',
  'Für die Praxis ist zentral, diese Ambivalenz ernst zu nehmen: Eltern brauchen nicht vorschnelle Urteile, sondern Entlastung, Respekt und konkrete Hilfe im Alltag.',
];

export const PARENT_ROLE_EVIDENCE_POINTS = [
  'Elternschaft ist für viele psychisch belastete Mütter und Väter nicht nur Stressfaktor, sondern auch Identität, Sinnquelle und Motivation, Hilfe anzunehmen und dranzubleiben.',
  'Viele Eltern wünschen sich, dass ihre Elternrolle fachlich gesehen und gestärkt wird, statt nur unter Risikoaspekten betrachtet zu werden.',
  'Stigma, Scham und die Angst, als Mutter oder Vater negativ beurteilt zu werden, können Offenheit und Hilfesuche deutlich erschweren.',
];

export const PARENT_PRACTICE_POINTS = [
  'Elternschaft aktiv ansprechen, ohne moralischen Unterton',
  'Belastung und Ressourcen gleichzeitig erfassen',
  'Scham und Angst vor Bewertung explizit entlasten',
  'konkrete Alltagshilfen vor abstrakte Appelle stellen',
];

// Gesprächsbeispiele für die Beratungspraxis: zeigen, wie eine
// ressourcenorientierte Haltung gegenüber Eltern im Gespräch klingen
// kann. Stauber Kap. 3.2 (Empowerment, Augenhöhe, Mitbestimmung) +
// Kap. 4.3 (Lob, Anerkennung, Selbstwirksamkeit). Eigenständig
// formuliert.
export const PARENT_DIALOGUE_EXAMPLES = [
  {
    label: 'Ressourcen sichtbar machen',
    text: '«Was läuft gerade gut in Ihrem Alltag mit dem Kind — trotz allem?»',
  },
  {
    label: 'Eltern als Kundige anerkennen',
    text: '«Sie kennen Ihr Kind am besten. Was braucht es gerade von Ihnen?»',
  },
  {
    label: 'Kleine Schritte statt grosse Pläne',
    text: '«Was müsste heute passieren, damit der Abend etwas ruhiger wird?»',
  },
  {
    label: 'Hilfe annehmen normalisieren',
    text: '«Es ist in Ordnung, nicht alles alleine schaffen zu wollen. Das zeigt Verantwortung.»',
  },
  {
    label: 'Mitbestimmung stärken',
    text: '«Was würde Ihnen am meisten helfen — und was können Sie selbst gerade leisten?»',
  },
  {
    label: 'Kraft zurückmelden',
    text: '«Ihr Kind spürt, dass Sie sich kümmern. Das zählt.»',
  },
];

export const COLLABORATION_PANELS = [
  {
    title: 'Information und Transparenz',
    text: 'Fachpersonen sollen ihre Beobachtungen, Einschätzungen und nächsten Schritte nachvollziehbar machen. Transparenz senkt Kontrollängste und erleichtert Kooperation.',
  },
  {
    title: 'Anhörung und Mitsprache',
    text: 'Eltern erleben Zusammenarbeit eher als tragfähig, wenn ihre Sicht ernst genommen wird und sie nicht nur Empfängerinnen und Empfänger von Vorgaben bleiben.',
  },
  {
    title: 'Mitbestimmung',
    text: 'Gerade bei Scham, Hilflosigkeit oder Misstrauen ist es wichtig, Ziele und Vorgehen gemeinsam zu entwickeln. Das stärkt Selbstwirksamkeit und reduziert erlebte Ohnmacht.',
  },
  {
    title: 'Auf Augenhöhe',
    text: 'Eltern sind Expertinnen und Experten ihrer Lebenssituation. Gute Zusammenarbeit verbindet fachliche Verantwortung mit Respekt vor ihrem Wissen über Alltag, Beziehung und Belastungsgrenzen.',
  },
];

export const COLLABORATION_FOUR_AS = [
  'Anlass: Was führt Sie heute hierher?',
  'Anliegen: Was möchten Sie für sich, Ihre Kinder oder Ihre Familie erreichen?',
  'Auftrag: Was wünschen Sie konkret von mir oder von dieser Stelle?',
  'Abmachungen: Was ist unser nächster Schritt, und wer übernimmt was?',
];




// Orientierung für Fachpersonen: was sie Eltern als konkrete Handlungsfelder
// aufzeigen können. Ressourcen-orientiert statt rein krisenbezogen.
// Stauber Kap. 4.3 + Lenz & Brockmann 2013.
export const PARENT_SELF_HELP_POINTS = [
  'Feinfühligkeit ist kein Dauerzustand, sondern ein Bemühen. Achtsam sein, korrigieren, wenn nötig Hilfe holen — das reicht.',
  'Eine kleine stabile Routine ist oft hilfreicher als der Versuch, alles wie früher zu schaffen. Verlässlichkeit in kleinen Dingen trägt.',
  'Lob, Anerkennung und ehrliches Zuhören stabilisieren Kinder stärker als grosse Erziehungspläne.',
  'Kinder brauchen die klare Botschaft: Du bist nicht schuld, und Erwachsene kümmern sich.',
  'Soziale Kontakte ausserhalb der Familie ausdrücklich erlauben und fördern — die «innere Erlaubnis» der Eltern ist entscheidend.',
  'Hilfe annehmen ist kein Zeichen von Versagen, sondern von Verantwortung. Gute Eltern holen sich Unterstützung, wenn sie sie brauchen.',
];

export const PARENT_EVERYDAY_SUPPORT_PANELS = [
  {
    title: 'Wenn ein Kind viel weint oder Nähe sucht',
    text: 'Gerade unter Stress kann kindliches Schreien oder Klammern schnell überfordernd wirken. Hilfreich ist, diese Belastung offen anzusprechen, Beruhigungsstrategien zu üben und Entlastung früh mitzudenken, statt sich dafür zu verurteilen.',
  },
  {
    title: 'Lob, Anerkennung und kleine positive Signale',
    text: 'Kinder profitieren von kleinen Momenten der Bestärkung. Ein ehrliches Lob, richtiges Zuhören oder das Ernstnehmen ihrer Meinung kann im Alltag oft mehr stabilisieren als grosse Erziehungspläne.',
  },
  {
    title: 'Probleme in kleinen Schritten lösen',
    text: 'Kinder brauchen Unterstützung, wenn Sorgen oder Alltagsprobleme zu gross werden. Hilfreich ist, gemeinsam ein Problem auszuwählen, Lösungsideen zu sammeln, Vor- und Nachteile zu besprechen und den nächsten kleinen Schritt zu planen.',
  },
  {
    title: 'Soziale Kontakte ausdrücklich erlauben',
    text: 'Kinder psychisch belasteter Eltern brauchen oft verlässliche Beziehungen ausserhalb der Kernfamilie. Entscheidend ist, dass Eltern diese Kontakte innerlich erlauben, fördern und mit dem Kind besprechen, wem es was erzählen möchte.',
  },
];

export const FAMILY_SYSTEM_PANELS = [
  {
    title: 'Alltag und Routinen',
    text: 'Wenn ein Elternteil psychisch erkrankt, wird der Familienalltag oft unberechenbarer. Gewohnte Abläufe kippen leichter, Zuständigkeiten werden unsicher und viele Entscheidungen richten sich zunehmend nach dem aktuellen Befinden des erkrankten Elternteils.',
  },
  {
    title: 'Rollen und Verantwortung',
    text: 'In belasteten Phasen verschieben sich Rollen innerhalb der Familie. Kinder übernehmen manchmal mehr Verantwortung, Partnerinnen oder Partner tragen dauerhaft Ausgleichsarbeit, und Grosseltern oder andere Bezugspersonen werden zu zentralen Stützen des Systems.',
  },
  {
    title: 'Kommunikation und Schweigen',
    text: 'Viele Familien versuchen, Belastung nach aussen zu verbergen. Dann entstehen Missverständnisse, Loyalitätskonflikte und ein Klima, in dem Sorgen zwar stark gespürt, aber nicht gut besprochen werden können.',
  },
  {
    title: 'Isolation und Rückzug',
    text: 'Scham, Erschöpfung und Angst vor Bewertung können dazu führen, dass sich Familien sozial zurückziehen. Dadurch fehlen oft genau jene entlastenden Kontakte, die in Krisenzeiten stabilisierend wirken würden.',
  },
];

export const FAMILY_SYSTEM_POINTS = [
  'Psychische Erkrankung betrifft häufig nicht nur die erkrankte Person, sondern die Struktur, Stimmung und Belastungsverteilung der ganzen Familie.',
  'Typische Folgen sind instabilere Routinen, mehr Vorsicht im Alltag, erhöhte Spannungen und eine stärkere Ausrichtung aller auf Krisenverläufe und Symptomschwankungen.',
  'Besonders belastend wird es, wenn Kinder Aufgaben übernehmen, die Erwachsene tragen sollten, oder wenn über die Erkrankung kaum offen gesprochen werden kann.',
  'Gleichzeitig kann die Familie als Ganzes auch Schutz bieten: durch verlässliche Bezugspersonen, klare Regeln, Rituale, offene Sprache und frühe Hilfe von aussen.',
];

export const FAMILY_SYSTEM_PRACTICE_POINTS = [
  'nicht nur Einzelpersonen, sondern Rollen, Beziehungen und Alltag im ganzen Familiensystem erfassen',
  'Fragen nach Routinen, Entlastung, Kommunikation und verfügbaren Bezugspersonen früh stellen',
  'Rollenumkehr, Loyalitätskonflikte und stilles Mittragen von Kindern aktiv mitdenken',
  'Krisenpläne, Netzwerkkarten und klare Zuständigkeiten als Systemhilfe nutzen',
];

export const CHILD_EXPERIENCE_PANELS = [
  {
    title: 'Kinder als Hochrisikogruppe',
    text: 'Kinder psychisch erkrankter Eltern tragen ein deutlich erhöhtes Risiko für emotionale Belastungen und spätere psychische Auffälligkeiten. Entscheidend ist aber nicht nur die Diagnose, sondern wie stark Alltag, Beziehung, Sprache und Schutzfaktoren beeinträchtigt sind.',
  },
  {
    title: 'Parentifizierung',
    text: 'Manche Kinder übernehmen Aufgaben, die eigentlich Erwachsene tragen sollten: Sie trösten den Elternteil, achten auf Stimmungsschwankungen, kümmern sich um Geschwister oder halten den Haushalt mit. Das kann nach aussen kompetent wirken, ist innerlich aber oft überfordernd.',
  },
  {
    title: 'Loyalitätskonflikte',
    text: 'Viele Kinder wollen den erkrankten Elternteil schützen und gleichzeitig ihre eigene Not ausdrücken. Hilfe zu suchen kann sich dann wie Verrat anfühlen. Diese innere Zerrissenheit bindet viel Energie und macht offene Gespräche schwer.',
  },
  {
    title: 'Tabuisierung und Familiengeheimnis',
    text: 'Wenn über die Erkrankung kaum gesprochen werden kann, entstehen leicht Schuldgefühle, Verunsicherung und falsche Erklärungen. Kinder spüren, dass etwas nicht stimmt, haben aber oft zu wenig Worte und zu wenig entlastende Informationen.',
  },
];

export const CHILD_EXPERIENCE_POINTS = [
  'Kinder passen ihr Verhalten häufig sehr genau an die Stimmung und Belastbarkeit des erkrankten Elternteils an.',
  'Belastend sind nicht nur akute Krisen, sondern auch dauerhafte Unsicherheit, inkonsistente Reaktionen und fehlende Sprache für das, was zuhause geschieht.',
  'Für die Entwicklung besonders kritisch wird es, wenn Kinder emotional oder praktisch Verantwortung übernehmen, die ihrem Alter nicht entspricht.',
  'Gute Begleitung fragt deshalb nicht nur nach Symptomen der Eltern, sondern auch danach, wie Kinder Alltag, Beziehung und Sicherheit erleben.',
];

export const CHILD_EXPERIENCE_PRACTICE_POINTS = [
  'nach Mitverantwortung, Sorgeverhalten und stiller Anpassung von Kindern fragen',
  'Loyalitätskonflikte und Familiengeheimnisse aktiv ansprechbar machen',
  'zwischen altersangemessener Mithilfe und überfordernder Rollenumkehr unterscheiden',
  'kindliche Perspektive in Krisenplanung, Entlastung und Gesprächsführung mitdenken',
];





// Spezifische Schutzfaktoren nach Stauber et al. (2018), Kap. 2.5 — die
// Resilienzforschung identifiziert genau diese zwei Punkte als evidenzbasiert
// protektiv speziell für Kinder psychisch kranker Eltern (über allgemeine
// Schutzfaktoren hinaus).
export const SPECIFIC_PROTECTIVE_FACTORS = [
  {
    title: 'Krankheitswissen und Krankheitsverstehen',
    text: 'Kinder, die eine altersgerechte Aufklärung über die Erkrankung ihres Elternteils erhalten, können die Situation besser einordnen. Wissen gibt Kontrolle, reduziert Schuldgefühle und ersetzt diffuse Ängste durch benennbare Zusammenhänge.',
  },
  {
    title: 'Offener Umgang mit der Erkrankung in der Familie',
    text: 'Wenn in einer Familie offen über die Erkrankung gesprochen werden darf, können Kinder ihre Fragen stellen, Worte für ihre Erlebnisse finden und ausserfamiliäre Unterstützung leichter annehmen. Offenheit wirkt als Gegenmittel zur Tabuisierung.',
  },
];

export const PSYCHOEDUCATION_BENEFITS = [
  'Wissen reduziert kindliche Schuldgefühle und falsche Selbstzuschreibungen.',
  'Benennbare Zusammenhänge schaffen Orientierung und ein Gefühl von Kontrolle.',
  'Ehrliche, altersgerechte Gespräche stärken Beziehung und Vertrauen langfristig.',
];

export const PSYCHOEDUCATION_AGE_GROUPS = [
  {
    title: 'Kleinkinder bis etwa 3 Jahre',
    shortLabel: 'Sicherheit vor Erklärung',
    text: 'In diesem Alter zählt vor allem die Atmosphäre. Kinder brauchen einfache, beruhigende Sätze wie: „Mama geht es heute nicht gut“ oder „Papa ist gerade sehr müde“. Entscheidend sind Verlässlichkeit, Nähe und wiederkehrende Abläufe.',
  },
  {
    title: 'Vorschulkinder etwa 3 bis 6 Jahre',
    shortLabel: 'Schuld entlasten',
    text: 'Vorschulkinder denken oft magisch und beziehen vieles auf sich. Deshalb ist wichtig zu sagen, dass sie die Krankheit weder verursacht haben noch heilen müssen. Bilder, Metaphern und kurze Wiederholungen helfen mehr als lange Erklärungen.',
  },
  {
    title: 'Schulkinder etwa 6 bis 12 Jahre',
    shortLabel: 'Konkrete Informationen',
    text: 'Schulkinder bemerken Unterschiede zu anderen Familien deutlicher. Sie profitieren von klaren Informationen über Namen der Erkrankung, typische Symptome und Hilfewege. Gleichzeitig brauchen sie Raum für Fragen und ambivalente Gefühle.',
  },
  {
    title: 'Jugendliche ab etwa 13 Jahren',
    shortLabel: 'Einordnen statt beschönigen',
    text: 'Jugendliche möchten meist genauer verstehen, was los ist, und fragen häufiger nach Vererbbarkeit, Verantwortung und eigener Abgrenzung. Hier helfen ehrliche Gespräche auf Augenhöhe, ohne die Jugendlichen zu Erwachsenenrollen zu drängen.',
  },
];


export const PSYCHOEDUCATION_PRACTICE_POINTS = [
  'einfach, ehrlich und entlastend sprechen – nicht beschönigen, aber auch nicht überfordern',
  'wichtige Sätze wiederholen: Du bist nicht schuld. Du bist nicht allein. Erwachsene kümmern sich.',
  'altersgerechte Sprache wählen und an vorhandene Fragen des Kindes anknüpfen',
  'Psychoedukation als fortlaufendes Gespräch verstehen, nicht als einmalige Erklärung',
];

export const PSYCHOEDUCATION_PREPARATION_POINTS = [
  'Vor dem Gespräch mit den Kindern zuerst die Sorgen der Eltern ernst nehmen: Was befürchten sie, wenn das Kind mehr erfährt?',
  'Hilfreich ist die Frage: Was könnte sich für das Kind entlasten, wenn es mehr über die Erkrankung verstehen würde?',
  'Vorbereitung heisst auch klären, wie in der Familie bisher über die Erkrankung gesprochen wurde, was tabu geblieben ist und was das Kind vermutlich schon mitbekommen hat.',
  'Fachlich zentral ist die Botschaft: Nicht die Information selbst überfordert meist, sondern das Fehlen einer verstehbaren Erklärung.',
];

export const PSYCHOEDUCATION_SETTINGS = [
  {
    title: 'Eltern sprechen selbst mit Unterstützung',
    text: 'Wenn Eltern grundsätzlich gesprächsbereit sind, kann es sinnvoll sein, dass sie das Gespräch selbst führen und von einer Fachperson nur in Vorbereitung, Struktur und Sprache unterstützt werden.',
  },
  {
    title: 'Begleitetes Familiengespräch',
    text: 'Bei Tabuisierung, Sprachlosigkeit oder grosser Unsicherheit kann ein professionell moderiertes Familiengespräch entlasten. Die Fachperson unterstützt Offenheit, die Eltern bleiben aber zentrale Gesprächspersonen.',
  },
  {
    title: 'Vorgespräch mit dem Kind',
    text: 'Wenn ein Kind ängstlich, zurückhaltend oder jahrelang an Schweigen gewöhnt ist, kann ein geschütztes Einzelgespräch vor einem Familiengespräch sinnvoll sein. Dort lassen sich Sorgen, Fragen und der bisherige Wissensstand besser erfassen.',
  },
];

export const PSYCHOEDUCATION_DIFFICULTIES = [
  {
    title: 'Das Kind will scheinbar nicht sprechen',
    text: 'Rückzug oder Abwehr bedeuten nicht automatisch Desinteresse. Dahinter können Angst vor schlimmen Informationen, alte Sprachlosigkeit oder Loyalitätskonflikte stehen.',
  },
  {
    title: 'Das Gespräch bricht ab',
    text: 'Ein Abbruch kann ein gesunder Schutzmechanismus sein, wenn Aufmerksamkeit oder emotionale Aufnahmekapazität erschöpft sind. Dann hilft eher ein späteres Wiederanknüpfen als Drängen.',
  },
  {
    title: 'Das Kind stellt sehr viele Fragen',
    text: 'Viele Fragen können Ausdruck von Neugier, Angst, Verunsicherung oder Misstrauen sein. Dann ist nicht nur Sachinformation, sondern auch das Nachfragen nach Gefühlen und Sorgen wichtig.',
  },
];

export const HELP_BARRIER_PANELS = [
  {
    title: 'Scham und Stigmatisierung',
    text: 'Viele Eltern befürchten, als ungenügend oder unfähig wahrgenommen zu werden, wenn sie offen über psychische Belastungen in der Familie sprechen. Diese Scham kann dazu führen, dass Probleme lange verborgen bleiben.',
  },
  {
    title: 'Angst vor Eingriffen',
    text: 'Eine zentrale Hürde ist die Sorge, Hilfe könnte automatisch zu Kontrolle oder Meldungen führen. In der Praxis sind die meisten Kindesschutzmassnahmen unterstützend, nicht trennend (im Kanton Zürich betreffen 86% aller Massnahmen eine Beistandschaft). Trotzdem kann die Angst vor behördlichen Eingriffen Familien davon abhalten, früh Unterstützung anzunehmen.',
    sourceIds: ['kokes-statistik-2024'],
  },
  {
    title: 'Symptome erschweren Hilfe',
    text: 'Depression, Angst, Erschöpfung, Antriebsmangel oder chaotische Krisenverläufe rauben oft genau die Kraft, die es bräuchte, um Angebote zu suchen, Termine zu organisieren oder Unterstützung verlässlich wahrzunehmen.',
  },
  {
    title: 'Informationslücken',
    text: 'Viele Familien wissen nicht, welche spezifischen Angebote es gibt, wer wofür zuständig ist oder wie niedrigschwellig erste Hilfe aussehen kann. Ohne Orientierung bleibt selbst vorhandene Unterstützung oft ungenutzt.',
  },
];

export const HELP_BARRIER_POINTS = [
  'Nicht nur fehlende Einsicht, sondern auch Angst, Scham und Erschöpfung können erklären, weshalb Hilfe spät gesucht wird.',
  'Je grösser die Sorge vor Bewertung oder Kontrollverlust, desto eher werden Belastungen verborgen oder verharmlost.',
  'Gute Fachpraxis macht Hilfen transparent, respektiert Ambivalenz und reduziert Schwellen statt zusätzlichen Druck aufzubauen.',
];

export const HELP_BARRIER_PRACTICE_POINTS = [
  'Ängste vor KESB, Bewertung oder Sorgerechtsverlust ansprechbar machen statt zu bagatellisieren',
  'Hilfen konkret, klein und nachvollziehbar erklären: Wer macht was, was passiert zuerst, was nicht?',
  'symptombedingte Hürden mitdenken und Unterstützung so organisieren, dass sie tatsächlich erreichbar bleibt',
  'mit Eltern auf Augenhöhe arbeiten und Selbstwirksamkeit stärken statt vorschnell zu moralisieren',
];

export const CLINICAL_PRACTICE_PANELS = [
  {
    title: 'Netzwerkkarte',
    text: 'Eine Netzwerkkarte hilft sichtbar zu machen, welche Personen und Stellen im Alltag tatsächlich tragen können: Kernfamilie, Verwandte, Schule, Betreuung, Nachbarschaft, Fachstellen. So wird Unterstützung konkreter und weniger abstrakt.',
  },
  {
    title: 'Krisenplan / Notfallplan',
    text: 'Ein schriftlicher Krisenplan entlastet Familien in akuten Phasen. Er klärt vorab, wer die Kinder betreut, wo sie schlafen können, wie wichtige Informationen weitergegeben werden und wie der Kontakt zum Elternteil gehalten wird.',
  },
  {
    title: 'Parentifizierte Beziehungen',
    text: 'Wenn Kinder zu viel Verantwortung übernehmen, braucht es eine sensible therapeutische Arbeit an Rollenumkehr und innerer Erlaubnis. Ziel ist nicht Schuldzuweisung, sondern eine schrittweise Rückgabe von Verantwortung an Erwachsene.',
  },
  {
    title: 'Stationärer Aufenthalt',
    text: 'Bei einer Aufnahme sollten Elternschaft, Sorgearrangements und Kontaktmöglichkeiten systematisch geklärt werden. Kindgerechte Besuchsregelungen, Telefonate oder Videoanrufe können helfen, Beziehung und Orientierung zu erhalten.',
  },
  {
    title: 'Übergangsmanagement',
    text: 'Die Zeit rund um Austritt und Rückkehr in den Alltag ist oft besonders sensibel. Gute Übergänge brauchen klare Absprachen, aktivierte Bezugspersonen und eine realistische Planung der ersten Tage zuhause. Das Kooperationsfenster -- der Moment, in dem Familie, Fachpersonen und Hilfestellen gleichzeitig erreichbar sind -- ist dann besonders wertvoll.',
  },
];

export const CLINICAL_PRACTICE_POINTS = [
  'Praxis heisst hier: nicht nur Symptome behandeln, sondern Beziehungen, Zuständigkeiten und alltägliche Entlastung mitdenken.',
  'Frühe Fragen nach Kindern, Betreuung, Routinen und erreichbaren Bezugspersonen verbessern oft schon die Qualität der Versorgung.',
  'Krisen- und Übergangssituationen brauchen schriftliche, einfache und alltagstaugliche Absprachen statt nur guter Absichten.',
];




export const INTERVENTION_PROGRAM_POINTS = [
  'Familienorientierte Interventionen wirken besonders dann plausibel, wenn sie nicht nur Symptome, sondern Kommunikation, Beziehung, Alltag und soziale Ressourcen gemeinsam betrachten.',
  'Das Vortragsmaterial von Lenz verweist auf multimodale Programme wie Beardslee, CHIMPs, Kindergruppen und mentalisierungsorientierte Elternprogramme als anschlussfähige Interventionsmodelle.',
  'Nicht jede Familie braucht dasselbe Format, aber viele profitieren davon, wenn Psychoedukation, Familiengespräche, Entlastung und die Stärkung vorhandener Ressourcen zusammenkommen.',
];

// SUPPORT_OFFERS wurde in Audit 12 zu FACHSTELLEN (src/data/fachstellenContent.js)
// konsolidiert. Die Evidenz-Ansicht leitet ihre Teil-Liste ueber SUPPORT_OFFER_IDS
// ab (dort definiert). Siehe docs/content-pflege.md.


export const PUK_CONTEXT_POINTS = [
  'Diese Website ist ein ergänzendes psychoedukatives Informationsangebot und keine offizielle Unterseite der PUK Zürich.',
  'Für offizielle Informationen und Angehörigenberatung im PUK-Kontext ist die Angehörigenberatung der PUK Zürich eine zentrale Anlaufstelle.',
  'Die offizielle PUK-Beratung ist kostenlos, institutionell verankert und kann auch ohne Hospitalisation in der PUK genutzt werden.',
];

export const ABOUT_THIS_WEBSITE_POINTS = [
  'Die Website will orientieren, erklären und entlasten – nicht institutionelle Beratung ersetzen.',
  'Sie ergänzt die Angehörigenberatung der PUK Zürich sowie weitere Stellen in Zürich, Winterthur und punktuell schweizweit.',
  'Offizielle Informationen, Anmeldung, Krisenwege und konkrete Beratung laufen über die jeweils zuständigen Institutionen.',
];

// Kinder- und Jugendbuch-Empfehlungen nach Alter und Störungsbild.
// Kuratierte Auswahl aus Stauber et al. (2018), Anhang A, ergänzt um
// neuere und CH-spezifische Titel. Die Liste erhebt keinen Anspruch
// auf Vollständigkeit. Aktualität und Verfügbarkeit der Titel vor
// einer Empfehlung prüfen.
export const MEDIA_BOOKS = [
  // Bilderbücher (ab ca. 3 Jahre)
  {
    title: 'Mama, warum weinst du?',
    author: 'Wunderer, S. (2010). Mabuse Verlag',
    age: 'ab 3 Jahren',
    disorder: 'allgemein',
    focus: 'Vorlesebuch für Kinder mit einem psychisch erkrankten Elternteil',
  },
  {
    title: 'Papas Seele hat Schnupfen',
    author: 'Gliemann, C. (2017). Monterosa Verlag',
    age: 'ab 3 Jahren',
    disorder: 'depression',
    focus: 'Kindgerechte Metapher für Depression, mit behutsamer Sprache und Hoffnung',
  },
  {
    title: 'Fufu und der grüne Mantel',
    author: 'Eggermann, V. & Janggen, L. (2005). Inthera',
    age: 'ab 4 Jahren',
    disorder: 'psychose',
    focus: 'Erzählerischer Zugang zu Psychose und Wahn',
  },
  {
    title: 'Mama, Mia und das Schleuderprogramm',
    author: 'Tilly, C. & Offermann, A. (2013). Balance Verlag',
    age: 'ab 4 Jahren',
    disorder: 'bipolar',
    focus: 'Stimmungsschwankungen und Unberechenbarkeit kindgerecht erklärt',
  },
  // Kinderbücher (ab ca. 6 Jahre)
  {
    title: 'Sonnige Traurigtage',
    author: 'Homeier, S. (2008). Mabuse Verlag',
    age: 'ab 6 Jahren',
    disorder: 'allgemein',
    focus: 'Kinderfachbuch mit Erklärungen und begleitendem Ratgeberteil',
  },
  {
    title: 'Annikas andere Welt',
    author: 'Eder, S., Rebhandl, P. & Gasser, E. (2013). Edition Riedenburg',
    age: 'ab 7 Jahren',
    disorder: 'allgemein',
    focus: 'Sachinformationen und Entlastung für Kinder psychisch erkrankter Eltern',
  },
  {
    title: 'Was ist bloss mit Mama los?',
    author: 'Glistrup, K. (2014). Kösel',
    age: 'ab 6 Jahren',
    disorder: 'angst / depression',
    focus: 'Angst, Depression, Stress und Trauma in verständlicher Sprache',
  },
  {
    title: 'ZiegenHundeKrähenMama',
    author: 'Tanner, K. & Jacob, L. (2016). Atlantis Verlag',
    age: 'ab 6 Jahren',
    disorder: 'allgemein',
    focus: 'Schweizer Bilderbuch über Veränderung und Verunsicherung im Familienalltag',
  },
  {
    title: 'Flaschenpost nach irgendwo',
    author: 'Homeier, S. & Schrappe, A. (2012). Mabuse Verlag',
    age: 'ab 8 Jahren',
    disorder: 'sucht',
    focus: 'Standardwerk zu Sucht in der Familie, mit Erklärungen und Mitmachteil',
  },
  {
    title: 'Der beste Vater der Welt',
    author: 'Trostmann, K. & Jahn, R. (2010). Balance Verlag',
    age: 'ab 6 Jahren',
    disorder: 'psychose',
    focus: 'Kindern Psychose erklären, mit Gesprächsimpulsen',
  },
  // Jugendbücher (ab ca. 11 Jahre)
  {
    title: 'Schoko- und Zitronentage',
    author: 'Wartenweiler, M. & Kiener, A. (2017). Rex Verlag / Kinderheim Titlisblick',
    age: 'ab 10 Jahren',
    disorder: 'allgemein',
    focus: 'Schweizer Jugendbuch, alltagsnah und auf Erfahrungen von Betroffenen bezogen',
  },
  {
    title: 'Das Gegenteil von fröhlich',
    author: 'Stehle, K. (2011). Thienemann',
    age: 'ab 12 Jahren',
    disorder: 'depression',
    focus: 'Jugendliche Perspektive auf elterliche Depression und Familienalltag',
  },
  {
    title: 'Lieber Matz, Dein Papa hat \'ne Meise',
    author: 'Schlösser, S. (2012). Ullstein',
    age: 'ab 12 Jahren',
    disorder: 'depression',
    focus: 'Ein Vater schreibt Briefe über seine Zeit in der Psychiatrie — offen und enttabuisierend',
  },
];

export const MEDIA_DIGITAL = [
  {
    name: 'Feel-ok.ch',
    type: 'Jugendportal',
    description: 'Informationsportal für Jugendliche rund um psychische Gesundheit und Belastungen.',
    link: 'https://www.feel-ok.ch/de_CH/jugendliche/jugendliche.cfm',
  },
  {
    name: 'Institut Kinderseele Schweiz – Kurzfilme',
    type: 'Video / Psychoedukation',
    description:
      'Kurze edukative Videos zu Themen wie Suizidalität von Eltern, Suchterkrankung oder psychischer Krise.',
    link: 'https://www.kinderseele.ch/kurzfilme/',
  },
  {
    name: 'AdoASSIP',
    type: 'Jugendliche nach Suizidversuch',
    description: 'Spezifisches Angebot für Jugendliche nach Suizidversuchen im Umfeld der PUK.',
    link: 'https://www.pukzh.ch/unsere-angebote/kinder-und-jugendpsychiatrie/behandlungsschwerpunkte/suizidversuch/adoassip-fuer-jugendliche/',
  },
  {
    name: 'Hilfe finden',
    type: 'Suchhilfe / Orientierung',
    description: 'Digitale Such- und Orientierungshilfe, um passende Angebote in der Region schneller zu finden.',
    link: 'https://www.kinderseele.ch/hilfe-finden',
  },
  {
    name: 'Pro Juventute – Broschüren für Kinder und Jugendliche',
    type: 'Broschüre / Print',
    description:
      'Informationshefte für Kinder (8–12) und Jugendliche (12–18) mit psychisch belasteten Eltern. Auch Eltern-Broschüre verfügbar. Kostenlos bestellbar.',
    link: 'https://www.projuventute.ch',
  },
];

export const MEDIA_NOTES = [
  'Materialien ersetzen kein Gespräch, können aber Sprache schaffen und Schuldgefühle entlasten.',
  'Hilfreich sind Medien besonders dann, wenn sie zum Alter des Kindes und zur aktuellen Belastung passen.',
  'Bücher und digitale Ressourcen wirken oft am besten als Gesprächseinstieg, nicht als alleinige Lösung.',
];


export const CROSS_DIAGNOSIS_POINTS = [
  'Nicht jede psychische Erkrankung führt automatisch zu einer Kindeswohlgefährdung. Entscheidend ist, wie stark Symptome den Alltag, die Verlässlichkeit und die Versorgung beeinflussen.',
  'Für Kinder zählt weniger die Diagnose als das, was sie im Alltag erleben: Ist der Elternteil erreichbar? Ist der Alltag vorhersagbar? Wird über die Erkrankung gesprochen? Gibt es Unterstützung?',
  'Die Praxis braucht deshalb keine vereinfachenden Urteile, sondern eine differenzierte Einschätzung nach Symptombelastung, Ressourcen, Schutzfaktoren und Netzwerk.',
];


