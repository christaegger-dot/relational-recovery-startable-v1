/**
 * @typedef {Object} GlossaryTerm
 * @property {string} id - Stabile kebab-case ID, swiss-german-tauglich
 *   (kein ß). Wird von <GlossarLink term='id'> referenziert.
 * @property {string} term - Anzeigeform des Begriffs, inklusive optionaler
 *   Klammer-Ergaenzung fuer Abkuerzungen (z.B. 'KESB (Kindes- und
 *   Erwachsenenschutzbehoerde)').
 * @property {string} definition - Knappe Arbeitsdefinition (1-3 Saetze).
 * @property {string} practice - Praxisnahe Einordnung oder Anwendung.
 */

/**
 * @typedef {Object} GlossaryGroup
 * @property {string} id - Cluster-ID fuer Sprung-Links und Aria-Labels.
 * @property {string} eyebrow - Kicker-Text vor dem Titel.
 * @property {string} title
 * @property {string} description
 * @property {GlossaryTerm[]} terms
 */

/** @type {GlossaryGroup[]} */
export const GLOSSARY_GROUPS = [
  {
    id: 'glossar-sprache',
    eyebrow: 'Cluster 1',
    title: 'Sprache im Kontakt mit Eltern, Kindern und Bezugspersonen',
    description:
      'Diese Begriffe helfen, Belastung nicht nur zu benennen, sondern in eine ruhige, arbeitsfähige Sprache zu übersetzen. Sie sind für Gespräche besonders wichtig, in denen Scham, Ambivalenz oder Unsicherheit die Zusammenarbeit erschweren.',
    terms: [
      {
        id: 'belastete-elternschaft',
        term: 'Psychisch belastete Elternschaft',
        definition:
          'Wenn psychische Symptome, Krisen oder anhaltende Instabilität beeinflussen, wie verfügbar Eltern sind, wie der Alltag funktioniert oder wie gut sie auf ihr Kind eingehen können.',
        practice:
          'Der Begriff vermeidet schnelle Schuldzuschreibungen und öffnet den Blick auf Belastung, Ressourcen und Unterstützungsbedarf zugleich.',
      },
      {
        id: 'psychoedukation',
        term: 'Psychoedukation',
        definition:
          'Wissen über Symptome, Belastungen, Schutzfaktoren und Hilfemöglichkeiten verständlich und strukturiert vermitteln -- für Betroffene, Angehörige oder Fachpersonen.',
        practice:
          'Besonders hilfreich, wenn Unsicherheit reduziert und ein gemeinsamer Begriffsrahmen für weitere Schritte aufgebaut werden soll.',
      },
      {
        id: 'parentifizierung',
        term: 'Parentifizierung',
        definition:
          'Wenn Kinder Aufgaben übernehmen, die eigentlich Erwachsene tragen sollten: den Elternteil trösten, auf Stimmungsschwankungen achten, sich um Geschwister kümmern oder den Haushalt organisieren. Das kann nach aussen kompetent wirken, ist innerlich aber oft überfordernd.',
        practice:
          'Im Gespräch aktiv nach stillem Mittragen, Sorgeverhalten und Verantwortungsübernahme von Kindern fragen. Zwischen altersangemessener Mithilfe und überfordernder Rollenumkehr unterscheiden. Wichtig: Bevor das Kind zur Rollenveränderung motiviert wird, braucht es zuerst die Arbeit mit den Eltern — sonst entsteht zusätzlicher Druck statt Entlastung.',
      },
      {
        id: 'loyalitaetskonflikt',
        term: 'Loyalitätskonflikt',
        definition:
          'Wenn Kinder den erkrankten Elternteil schützen wollen und gleichzeitig ihre eigene Not ausdrücken möchten. Hilfe zu suchen kann sich dann wie Verrat anfühlen.',
        practice:
          'Diese innere Zerrissenheit bindet viel Energie und macht offene Gespräche schwer. Im Kontakt mit Kindern aktiv ansprechbar machen, ohne Druck zu erzeugen.',
      },
      {
        id: 'rollenumkehr',
        term: 'Rollenumkehr',
        definition:
          'Wenn Kinder Aufgaben und Verantwortung übernehmen, die eigentlich Erwachsene tragen sollten. Eng verwandt mit Parentifizierung, aber stärker auf die konkrete Verschiebung von Zuständigkeiten im Alltag bezogen.',
        practice:
          'Zwischen altersangemessener Mithilfe und überfordernder Rollenumkehr zu unterscheiden, ist eine der zentralen Fragen in der Arbeit mit belasteten Familien.',
      },
      {
        id: 'mentalisieren',
        term: 'Mentalisieren',
        definition:
          'Die Fähigkeit, eigenes und fremdes Verhalten als Ausdruck innerer Zustände wie Gefühle, Absichten, Stress oder Missverstehen zu begreifen.',
        practice:
          'Wird wichtig, wenn eskalierende Situationen wieder in Beobachtung, Sprache und Beziehung übersetzt werden müssen.',
      },
      {
        id: 'tabuisierung',
        term: 'Tabuisierung',
        definition:
          'Wenn über die psychische Erkrankung innerhalb der Familie oder gegenüber Aussenstehenden nicht gesprochen wird — oft aus Scham, Angst vor Stigmatisierung, Sorge um die Kinder oder dem Wunsch, sie zu schützen.',
        practice:
          'Tabuisierung isoliert Kinder, nimmt ihnen die Sprache für ihre Erlebnisse und verstärkt Schuldgefühle. Im Beratungskontext: das Schweigegebot aktiv und feinfühlig ansprechen, ohne es zu forcieren. Offenheit ist ein spezifischer Schutzfaktor.',
      },
    ],
  },
  {
    id: 'glossar-schutz',
    eyebrow: 'Cluster 2',
    title: 'Schutz, Risiko und fachliche Schwellen',
    description:
      'Diese Begriffe helfen Fachpersonen, zwischen Beobachten, Unterstützen und formeller Schutzabklärung zu unterscheiden. Sie schaffen eine gemeinsame Sprache für begründete Entscheidungen.',
    terms: [
      {
        id: 'kesb',
        term: 'KESB (Kindes- und Erwachsenenschutzbehörde)',
        definition:
          'Die KESB ist die behördliche Stelle, die in der Schweiz für den Schutz von Kindern und schutzbedürftigen Erwachsenen zuständig ist. Sie wird tätig, wenn das Wohl eines Kindes gefährdet erscheint und die Eltern nicht selbst für Abhilfe sorgen können (Art. 307 ZGB). Im Kanton Zürich gibt es 13 KESB.',
        practice:
          'Nicht jede Meldung an die KESB führt zu einer Massnahme -- im Kanton Zürich enden rund zwei Drittel der Meldungen mit einer Abklärung, Beratung oder ohne behördliche Anordnung. Wenn die KESB tätig wird, ist die häufigste Massnahme die Beistandschaft (Art. 308 ZGB): eine Fachperson unterstützt die Familie, das Sorgerecht bleibt bei den Eltern. Eine Fremdplatzierung (Art. 310 ZGB) ist die Ausnahme, nicht die Regel.',
      },
      {
        id: 'kindeswohl',
        term: 'Kindeswohl',
        definition:
          'Die Bedingungen, unter denen ein Kind sicher aufwachsen, sich entwickeln und emotional getragen fühlen kann.',
        practice:
          'Nicht als abstrakter Endzustand denken, sondern als fortlaufende Frage nach Schutz, Bindung, Versorgung und Entwicklungsraum.',
      },
      {
        id: 'kindeswohlgefaehrdung',
        term: 'Kindeswohlgefährdung',
        definition:
          'Eine Situation, in der ernsthafte Hinweise bestehen, dass Schutz, Versorgung oder Entwicklung eines Kindes aktuell oder absehbar erheblich beeinträchtigt sind.',
        practice:
          'Hilft bei der Frage: Reicht aufmerksame Beobachtung, braucht es eine vertiefte Klärung, oder muss eine Schutzstelle einbezogen werden?',
      },
      {
        id: 'schutzfaktor',
        term: 'Schutzfaktor',
        definition:
          'Ein stabilisierendes Element, das Belastung abfedern oder Risiken begrenzen kann, zum Beispiel eine verlässliche Bezugsperson, Tagesstruktur oder erreichbare Hilfe.',
        practice:
          'Schutzfaktoren machen Risiken nicht ungeschehen, helfen aber einzuschätzen, welche Hilfe wirklich nötig ist.',
      },
      {
        id: 'resilienz',
        term: 'Resilienz',
        definition:
          'Erworbene psychische Widerstandsfähigkeit, die es ermöglicht, trotz belastender Lebensumstände eine gesunde Entwicklung zu nehmen. Resilienz ist keine stabile Persönlichkeitseigenschaft, sondern variabel, kontextabhängig und durch Umweltfaktoren beeinflussbar.',
        practice:
          'In der Arbeit mit belasteten Familien: Schutzfaktoren systematisch erfassen und stärken, statt nur Risiken zu dokumentieren. Auch in schwierigen Konstellationen danach fragen, was trägt — nicht nur, was fehlt.',
      },
      {
        id: 'kohaerenzgefuehl',
        term: 'Kohärenzgefühl',
        definition:
          'Die Überzeugung, dass das Leben und die zu bewältigenden Aufgaben sinnvoll, verstehbar und handhabbar sind — auch unter schwierigen Bedingungen. Geht auf Antonovskys Salutogenese-Modell zurück.',
        practice:
          'Bei Kindern psychisch kranker Eltern kann ein starkes Kohärenzgefühl dazu beitragen, Belastungen besser einzuordnen und Handlungsfähigkeit zu bewahren. Förderbar durch verlässliche Strukturen, verständliche Erklärungen und erlebte Wirksamkeit.',
      },
      {
        id: 'triage',
        term: 'Triage',
        definition:
          'Fachlich begründet entscheiden, welche Hilfe, Abklärung oder Weitervermittlung in einer Situation zuerst nötig ist.',
        practice:
          'Im Portal meint Triage nicht nur Dringlichkeit, sondern auch Passung zwischen Bedarf, Sicherheitslage und regionalen Hilfen.',
      },
      {
        id: 'gefaehrdungsmeldung',
        term: 'Gefährdungsmeldung',
        definition:
          'Eine Mitteilung an die KESB, dass ein Kind möglicherweise gefährdet ist. Die meldende Person muss die Gefährdung nicht beweisen -- die Prüfung und Abklärung ist Aufgabe der KESB oder der beauftragten Fachstellen.',
        practice:
          'Eine Gefährdungsmeldung ist kein Urteil und nicht dasselbe wie eine Massnahme. Vor einer formellen Meldung kann man sich anonym beraten lassen, zum Beispiel beim kjz oder bei Pro Mente Sana.',
      },
      {
        id: 'spf',
        term: 'SPF (Sozialpädagogische Familienbegleitung)',
        definition:
          'Eine ambulante Hilfe für Familien, bei der eine Fachperson die Familie im Alltag begleitet und unterstützt. SPF ist kein eigener Massnahmetyp im Gesetz, sondern wird freiwillig oder über Art. 307/308 ZGB begleitet.',
        practice:
          'Im Kanton Zürich ist SPF für Eltern grundsätzlich kostenlos. SPF kann sowohl freiwillig als auch behördlich angeordnet eingesetzt werden und setzt minimale Kooperationsbereitschaft voraus.',
      },
      {
        id: 'komorbiditaet',
        term: 'Komorbidität',
        definition:
          'Wenn bei einer Person zwei oder mehr Erkrankungen gleichzeitig bestehen. Der Begriff beschreibt nur das gleichzeitige Auftreten und sagt nichts darüber aus, ob eine Erkrankung die andere ausgelöst hat.',
        practice:
          'Bei psychischen Erkrankungen ist Komorbidität häufig: zum Beispiel treten Depression und Angststörung oft gemeinsam auf, oder Sucht und Depression. Für die Behandlung bedeutet das, dass mehrere Erkrankungen zugleich berücksichtigt werden müssen.',
      },
      // L2: Beistandschaft (Art. 308 ZGB) – Quelle: Faktenbasis Abschnitt 2
      {
        id: 'beistandschaft',
        term: 'Beistandschaft (Art. 308 ZGB)',
        definition:
          'Die häufigste Kindesschutzmassnahme. Die KESB ernennt eine Fachperson, die die Familie in bestimmten Bereichen unterstützt -- etwa bei Schule, Gesundheit, Alltagsorganisation oder der Koordination von Hilfen. Das Sorgerecht bleibt bei den Eltern. Im Kanton Zürich wird die Beistandschaft in der Regel durch spezialisierte Fachpersonen der kjz (Kinder- und Jugendhilfezentren) geführt.',
        practice:
          'Beistandschaft ist keine Bestrafung und kein automatisches Vorzeichen für eine Fremdplatzierung. Die häufigste Form ist die beratende Begleitung (Abs. 1). Abs. 2 überträgt besondere Befugnisse, Abs. 3 kann die elterliche Sorge in einem bestimmten Bereich einschränken -- dieser Eingriff ist nicht automatisch Teil jeder Beistandschaft. Im Kanton Zürich führen die kjz (bzw. in der Stadt Zürich die Sozialen Dienste) die Mandate. Für Eltern entstehen in der Regel keine Kosten. Hinweis: Die Kindesschutz-Beistandschaft (Art. 308 ZGB) ist strikt von den Erwachsenenschutz-Beistandschaften (Art. 393 ff. ZGB) zu unterscheiden.',
      },
      // L4: Melderecht vs. Meldepflicht – Quelle: Faktenbasis Abschnitt 4
      {
        id: 'melderecht-meldepflicht',
        term: 'Melderecht und Meldepflicht (Art. 314c / 314d ZGB)',
        definition:
          'Das Melderecht (Art. 314c ZGB) erlaubt jeder Person, der KESB eine Gefährdung eines Kindes zu melden. Berufsgeheimnisträgerinnen und -träger (z.B. Ärztinnen, Psychologen) sind meldeberechtigt, wenn die Meldung im Interesse des Kindes liegt -- sie müssen eine Interessenabwägung vornehmen. Die Meldepflicht (Art. 314d ZGB) betrifft bestimmte Fachpersonen, die nicht dem Berufsgeheimnis unterstehen und regelmässig mit Kindern arbeiten.',
        practice:
          'Wichtig für die Praxis: Ärztinnen und Ärzte in öffentlichen Kliniken sind trotz amtlicher Tätigkeit in der Regel meldeberechtigt, nicht meldepflichtig, weil sie dem strafrechtlichen Berufsgeheimnis (Art. 321 StGB) unterstehen. Hilfspersonen von Berufsgeheimnisträgerinnen und -trägern sind von diesem erweiterten Melderecht nicht erfasst. In schweren Gefährdungslagen besteht zusätzlich eine Mitteilungsberechtigung nach Art. 453 ZGB. Die Kantone können weitere Meldepflichten vorsehen (Art. 314d Abs. 3 ZGB).',
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
        id: 'angehoerigenarbeit',
        term: 'Angehörigenarbeit',
        definition:
          'Nahe Bezugspersonen gezielt einbeziehen: informieren, entlasten, orientieren und die Behandlung gemeinsam gestalten.',
        practice:
          'Nicht nur als Zusatz verstehen, sondern als wichtigen Teil davon, Stabilität zu stärken, Gelerntes in den Alltag zu bringen und Warnsignale früh zu erkennen. Angehörigenarbeit ist das Fachkonzept; Angehörigenberatung (z.B. bei der PUK Zürich) ist ein konkretes Angebot.',
      },
      {
        id: 'weitervermittlung',
        term: 'Weitervermittlung',
        definition:
          'Wenn nach einer ersten Klärung oder Behandlung die passende weiterführende Stelle gefunden und der Übergang organisiert wird.',
        practice:
          'Tragfaehig wird Weitervermittlung erst, wenn Ansprechpartner, Schwelle, Erreichbarkeit und nächster Schritt konkret benannt sind.',
      },
      {
        id: 'netzwerkkarte',
        term: 'Netzwerkkarte',
        definition:
          'Eine Übersicht, die zeigt, welche Fachstellen es gibt, wer wofür zuständig ist und wie Hilfewege in der Region zusammenhängen.',
        practice:
          'Hilft zu klären, wer informieren, abklären, entlasten oder in einer Krise eingreifen kann.',
      },
      {
        id: 'trialog',
        term: 'Trialog',
        definition:
          'Ein gleichberechtigtes Gespräch zwischen drei Gruppen: Menschen mit psychiatrischer Erfahrung, Angehörigen und Fachpersonen. Die Idee entstand in den 1980er-Jahren aus der Psychiatrie-Erfahrenen-Bewegung und steht dafür, dass keine Perspektive wichtiger ist als die anderen.',
        practice:
          'In der Praxis finden Trialog-Gespräche in Seminaren, offenen Runden und Fachtagungen statt. Jede Gruppe bringt Wissen und Erfahrung ein, die die anderen nicht haben.',
      },
      {
        id: 'kooperationsfenster',
        term: 'Kooperationsfenster',
        definition:
          'Praktischer Begriff für den Moment, in dem Familien, Fachpersonen und Hilfesystem gleichzeitig erreichbar genug sind, um einen nächsten Schritt verbindlich zu vereinbaren.',
        practice:
          'Gerade in instabilen Verläufen lohnt es sich, dieses Zeitfenster aktiv zu nutzen statt nur lose Hinweise mitzuteilen.',
      },
      {
        id: 'helferkonferenz',
        term: 'Helferkonferenz',
        definition:
          'Strukturiertes Treffen der involvierten Fachpersonen rund um eine belastete Familie. Klärt Verantwortlichkeiten, Ressourcen, zeitliche Grenzen und das weitere Vorgehen.',
        practice:
          'Gelingensbedingungen: gegenseitige Kenntnis der Aufgabenprofile, gleichberechtigter Austausch ohne Statusgefälle, personelle Kontinuität und realistisches Zeitbudget. Frühzeitig die Fallführung klären.',
      },
      // Quelle: Lenz (2014), referenziert in Stauber et al. (2018), Kap. 6.2.
      // Patenschaften als kontextbezogene Strategie zur Ressourcen-Aktivierung.
      {
        id: 'patenschaften',
        term: 'Patenschaften',
        definition:
          'Verlässliche, dauerhafte Beziehungsangebote ausserhalb der Kernfamilie — meist über organisierte Vermittlungsstellen. Patenfamilien oder Einzelpat:innen begleiten Kinder und Jugendliche regelmässig, geben Orientierung, schaffen Ablenkung von der familiären Belastung und können in Krisenphasen intensivere Betreuung übernehmen.',
        practice:
          'Besonders relevant für isolierte Familien und alleinerziehende belastete Eltern. Patenschaften entlasten die Eltern, fördern den Familienzusammenhalt und schützen die Eltern-Kind-Beziehung — gerade weil sie nicht in die elterliche Rolle eingreifen, sondern ergänzend wirken. Im Kanton Zürich u.a. über Patenschafts-Vermittlungen wie «zeitundwir» oder «Patenschaft Plus» zugänglich.',
      },
    ],
  },
];

const totalTerms = GLOSSARY_GROUPS.reduce((sum, group) => sum + group.terms.length, 0);

export const GLOSSARY_HERO = {
  eyebrow: 'Gemeinsame Sprache für die Fachpraxis',
  title: 'Begriffe für',
  accent: 'ruhige fachliche Orientierung.',
  lead: 'Das Glossar sammelt zentrale Begriffe aus der Arbeit mit psychisch belasteten Eltern, Kindesschutz, Angehörigenarbeit und Netzwerkpraxis in einer einheitlichen Sprache. Es soll Fachpersonen helfen, schneller zwischen Einordnung, Gespräch und Weitervermittlung zu wechseln.',
  asideTitle: 'Nutzungshinweis',
  asideCopy:
    'Die Einträge sind als knappe Arbeitsdefinitionen für Praxis, Teamgespräch und Orientierung im Versorgungsalltag formuliert. Sie ersetzen keine institutionellen Richtlinien oder juristische Fachberatung.',
  stats: [
    {
      label: 'Begriffe',
      value: String(totalTerms),
      note: 'kompakte Arbeitsdefinitionen für Praxis und Teamreflexion',
    },
    {
      label: 'Cluster',
      value: String(GLOSSARY_GROUPS.length),
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
  eyebrow: 'Aufbau',
  title: 'Das Glossar ordnet Sprache entlang von Versorgung, Risiko und Beziehung.',
  description:
    'Das Glossar bündelt zentrale Begriffe an einem Ort: knapp definiert und direkt auf typische Arbeitssituationen bezogen.',
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
