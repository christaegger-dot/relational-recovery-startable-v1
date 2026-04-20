export const GRUNDLAGEN_HERO = {
  eyebrow: 'Für Angehörige',
  title: 'Häufige Fragen für',
  accent: 'ruhigere Orientierung im Alltag.',
  lead: 'Der Grundlagenbereich richtet sich an Angehörige und beantwortet typische Fragen in klarer, entlastender Sprache. Er soll Unsicherheit reduzieren, Begriffe in Alltagssituationen übersetzen und den Blick auf nächste Schritte öffnen.',
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
          'Kurzfristig kann Deeskalation sinnvoll sein. Langfristig führt ein dauerhaftes Ausweichen jedoch oft dazu, dass Angehörige immer mehr Spannung mittragen, während wichtige Themen unbesprechbar werden. Tragfähiger ist meist eine Kombination aus ruhigem Ton, klaren Grenzen und kleinen, konkret vereinbarten Schritten.',
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
  {
    // Cluster 4 basiert auf dem Transfer-Audit (2026-05-Content), Primärquelle:
    // Stauber, A., Nyffeler, C. & Gosteli, L. (2018). Psychisch kranke Eltern
    // im Beratungskontext. Praxisforschung Band 25, Erziehungsdirektion Kanton
    // Bern. Insbesondere Tabelle 1 (Lenz, 2010, S. 187) und Kapitel 2.5
    // (spezifische Schutzfaktoren: Krankheitswissen + offener Umgang).
    id: 'grundlagen-kinder',
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
    id: 'grundlagen-altersgerecht',
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
    id: 'grundlagen-formulierungshilfen',
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
