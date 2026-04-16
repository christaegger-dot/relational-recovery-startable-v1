import EvidencePageTemplate from '../templates/EvidencePageTemplate';
import {
  ABOUT_THIS_WEBSITE_POINTS,
  CHILD_EXPERIENCE_PANELS,
  CHILD_EXPERIENCE_POINTS,
  CHILD_EXPERIENCE_PRACTICE_POINTS,
  CLINICAL_PRACTICE_PANELS,
  CLINICAL_PRACTICE_POINTS,
  COLLABORATION_FOUR_AS,
  COLLABORATION_PANELS,
  CROSS_DIAGNOSIS_POINTS,
  FAMILY_SYSTEM_PANELS,
  FAMILY_SYSTEM_POINTS,
  FAMILY_SYSTEM_PRACTICE_POINTS,
  HELP_BARRIER_PANELS,
  HELP_BARRIER_POINTS,
  HELP_BARRIER_PRACTICE_POINTS,
  INTERVENTION_PROGRAM_POINTS,
  LITERATUR_IDS,
  MEDIA_BOOKS,
  MEDIA_DIGITAL,
  MEDIA_NOTES,
  PARENT_EVERYDAY_SUPPORT_PANELS,
  PARENT_EXPERIENCE_PANELS,
  PARENT_EXPERIENCE_POINTS,
  PARENT_PRACTICE_POINTS,
  PARENT_ROLE_EVIDENCE_POINTS,
  PARENT_SELF_HELP_POINTS,
  PUK_CONTEXT_POINTS,
  PSYCHOEDUCATION_AGE_GROUPS,
  PSYCHOEDUCATION_BENEFITS,
  PSYCHOEDUCATION_DIFFICULTIES,
  PSYCHOEDUCATION_PRACTICE_POINTS,
  PSYCHOEDUCATION_PREPARATION_POINTS,
  PSYCHOEDUCATION_SETTINGS,
  PARENT_DIALOGUE_EXAMPLES,
  PARENT_GUIDING_PRINCIPLE,
  RELEVANCE_POINTS,
  RELEVANCE_STATS,
  SPECIFIC_PROTECTIVE_FACTORS,
} from '../data/evidenceContent';
import { FACHSTELLEN, SUPPORT_OFFER_IDS } from '../data/fachstellenContent';
import { SOURCES } from '../data/sourcesContent';

const FACHSTELLEN_BY_ID = Object.fromEntries(FACHSTELLEN.map((f) => [f.id, f]));
const SUPPORT_OFFERS = SUPPORT_OFFER_IDS.map((id) => FACHSTELLEN_BY_ID[id]).filter(Boolean);
import { createClosingSectionModel } from '../utils/closingModel';
import { getPageHeadingId } from '../utils/appHelpers';

function panelCards(items = []) {
  return items.map((item) => ({
    label: item.shortLabel || item.label || null,
    title: item.title || item.name,
    text: item.text || item.description || item.focus || item.publisher || '',
    note: item.highlight || item.note || item.audience || item.category || null,
  }));
}

function supportOfferCards(items = []) {
  return items.map((offer) => ({
    title: offer.name,
    description: offer.description,
    meta: [offer.category, offer.audience, offer.highlight].filter(Boolean),
    href: offer.link,
    actionLabel: 'Angebot öffnen',
  }));
}

function formatSourceAsLiteratur(source) {
  // Baut den Anzeige-Satz aus Source-Feldern: Autor:in (Jahr) - Titel - Publisher
  // mit DOI-Suffix, falls vorhanden.
  const yearPart = source.year ? ` (${source.year})` : '';
  const header = `${source.author}${yearPart}`;
  const journalOrPublisher = source.journal || source.publisher || '';
  const doiSuffix = source.doi ? `. DOI: ${source.doi}` : '';
  return {
    title: source.title,
    description: `${header} — ${journalOrPublisher}${doiSuffix}`,
    meta: ['Literaturhinweis'],
    href: source.link || null,
  };
}

function literatureItemsFromIds(ids = []) {
  return ids
    .map((id) => SOURCES[id])
    .filter(Boolean)
    .map(formatSourceAsLiteratur);
}

function mediaBookItems(items = []) {
  return items.map((item) => ({
    title: item.title,
    description: item.focus,
    meta: [item.age].filter(Boolean),
  }));
}

function digitalMediaItems(items = []) {
  return items.map((item) => ({
    title: item.name,
    description: item.description,
    meta: [item.type].filter(Boolean),
    href: item.link,
    actionLabel: 'Ressource öffnen',
  }));
}

export default function EvidenceSection({ downloadResources = [] }) {
  const hero = {
    eyebrow: 'Evidenz und klinische Orientierung',
    title: 'Einordnen, benennen und',
    accent: 'familienorientiert handeln.',
    lead: 'Knapp 18 % der Schweizer Bevölkerung leben gemäss OBSAN-Analysen mit einer wahrscheinlichen psychischen Störung. Wenn Betroffene Kinder haben, wird die Erkrankung zur Familienangelegenheit.',
    description:
      'Diese Seite bündelt die fachliche Logik dahinter: warum Elternschaft in der Erwachsenenpsychiatrie relevant ist, wie Kinder Belastung erleben und welche Gesprächs- und Unterstützungsformen sich für die Praxis besonders bewähren.',
    supportingPoints: [
      'systemischer Blick statt isolierte Symptomperspektive',
      'kindliche Entlastung durch Sprache, Struktur und verlässliche Erwachsene',
      'praxisnahe Brücke zwischen Evidenz, Gesprächsführung und Vernetzung',
    ],
    badges: ['Verstehen', 'Mit Kindern sprechen', 'Mit Eltern arbeiten', 'Handeln & vernetzen'],
    aside: {
      eyebrow: 'Praxisfokus',
      title: 'Nicht nur Krankheit sehen, sondern Beziehung und Versorgung.',
      description:
        'Die Inhalte übersetzen Forschung und klinische Erfahrung in konkrete Fragen für Anamnese, Gesprächsführung, Entlastung und nächste Schritte im familiären Alltag.',
      meta: ['Psychoedukation', 'Elternarbeit', 'Schutzfaktoren', 'Vernetzung'],
    },
  };

  const chapterOverview = {
    eyebrow: 'Kapitelübersicht',
    title: 'Die fachliche Grundlage für eine',
    accent: 'familienorientierte Praxis',
    aside: {
      label: 'Orientierung',
      title: 'Vom Verstehen zum Handeln',
      copy: 'Jeder Abschnitt übersetzt Forschung, Erfahrungswissen und Versorgungsperspektive in eine kompakte Arbeitslogik für Alltag, Diagnostik, Gespräch und Vernetzung.',
      badges: [
        'Kapitel 1 Relevanz',
        'Kapitel 2 Psychoedukation',
        'Kapitel 3 Elternarbeit',
        'Kapitel 4 Vernetzung',
        'Kapitel 5 Materialien',
      ],
    },
    items: [
      {
        id: 'evidenz-verstehen',
        label: '1 Verstehen',
        note: 'Relevanz, Elternschaft, Familiensystem, kindliches Erleben',
      },
      {
        id: 'evidenz-mit-kindern-sprechen',
        label: '2 Mit Kindern sprechen',
        note: 'Vorbereitung, Alterslogik, Schwierigkeitspunkte und Praxis',
      },
      {
        id: 'evidenz-mit-eltern-arbeiten',
        label: '3 Mit Eltern arbeiten',
        note: 'Barrieren, Kooperation, Scham und alltagsnahe Entlastung',
      },
      {
        id: 'evidenz-handeln-und-vernetzen',
        label: '4 Handeln und vernetzen',
        note: 'Unterstützungsangebote, klinische Schritte und nächste Interventionen',
      },
      { id: 'evidenz-materialien', label: '5 Materialien', note: 'Downloads, Literatur, Medien und externe Hilfen' },
    ],
  };

  const zones = [
    {
      id: 'evidenz-verstehen',
      eyebrow: 'Kapitel 1',
      title: 'Warum das Thema',
      accent: 'früh in die Behandlung gehört',
      paragraphs: RELEVANCE_POINTS,
      metrics: RELEVANCE_STATS.map((item) => ({
        label: item.label,
        value: item.value,
        note: item.note,
      })),
      subsections: [
        {
          label: 'Elterliche Perspektive',
          title: 'Eltern erleben ihre Rolle oft zwischen Sorge, Bindung und Scham.',
          paragraphs: [...PARENT_EXPERIENCE_POINTS, ...PARENT_ROLE_EVIDENCE_POINTS],
        },
        {
          label: 'Familiensystem',
          title: 'Belastung zeigt sich in Beziehungen, Routinen und Verantwortungsverteilungen.',
          paragraphs: [...FAMILY_SYSTEM_POINTS, ...CROSS_DIAGNOSIS_POINTS],
          points: FAMILY_SYSTEM_PRACTICE_POINTS,
        },
        {
          label: 'Kindliche Perspektive',
          title: 'Kinder reagieren oft leise, angepasst und hochsensibel auf familiäre Spannungen.',
          paragraphs: CHILD_EXPERIENCE_POINTS,
          points: CHILD_EXPERIENCE_PRACTICE_POINTS,
        },
      ],
      cards: [
        ...panelCards(PARENT_EXPERIENCE_PANELS),
        ...panelCards(FAMILY_SYSTEM_PANELS),
        ...panelCards(CHILD_EXPERIENCE_PANELS),
      ],
      cardColumns: 'three',
      callout: {
        text: `${PARENT_GUIDING_PRINCIPLE.callout} — ${PARENT_GUIDING_PRINCIPLE.normalizing}`,
      },
    },
    {
      id: 'evidenz-mit-kindern-sprechen',
      eyebrow: 'Kapitel 2',
      title: 'Mit Kindern sprechen –',
      accent: 'klar, altersgerecht und entlastend',
      paragraphs: [
        'Zwei Faktoren gelten als besonders starke Schutzfaktoren speziell für Kinder psychisch kranker Eltern — über allgemeine Resilienzfaktoren hinaus: ein altersgerechtes Krankheitswissen und ein offener Umgang mit der Erkrankung in der Familie.',
        'Psychoedukation hilft Kindern, Verhalten und Belastung eines Elternteils besser einzuordnen. Nicht das Wissen an sich überfordert, sondern meist die Sprachlosigkeit, Unsicherheit und Fantasie ohne Erklärung.',
        'Entscheidend ist eine Haltung, die ehrlich benennt, was los ist, ohne Kinder mit Erwachseneninhalten zu überladen. Gute Gespräche reduzieren Schuldgefühle, schaffen Orientierung und stärken Beziehung.',
      ],
      highlightList: {
        tone: 'soft',
        items: [...PSYCHOEDUCATION_BENEFITS, ...PSYCHOEDUCATION_PREPARATION_POINTS, ...PSYCHOEDUCATION_PRACTICE_POINTS],
      },
      subsections: [
        {
          label: 'Alterslogik',
          title: 'Je jünger das Kind, desto wichtiger sind Sicherheit, Wiederholung und konkrete Alltagssprache.',
          paragraphs: [
            'Die Gesprächsführung orientiert sich am Entwicklungsstand des Kindes. Die vorhandenen Altersgruppen helfen, den Schwerpunkt jeweils zwischen Sicherheit, Erklärung, Mitbestimmung und Nachfragen auszubalancieren.',
          ],
        },
        {
          label: 'Settings',
          title: 'Gespräche können unterschiedlich gerahmt werden – entscheidend ist die Passung.',
          paragraphs: [
            'Manchmal sprechen Eltern selbst mit Unterstützung, manchmal ist ein gemeinsames Familiengespräch sinnvoll. Wichtig ist, dass Vorbereitung, Verantwortung und Nachsorge geklärt sind.',
          ],
        },
        {
          label: 'Schwierige Momente',
          title: 'Stockungen, Abbrüche oder viele Fragen sind kein Scheitern.',
          paragraphs: [
            'Schwierigkeiten im Gespräch sind oft Ausdruck von Schutz, Loyalität oder Überforderung. Sie brauchen Wiederanknüpfen statt Druck.',
          ],
        },
      ],
      cards: [
        ...panelCards(SPECIFIC_PROTECTIVE_FACTORS),
        ...panelCards(PSYCHOEDUCATION_AGE_GROUPS),
        ...panelCards(PSYCHOEDUCATION_SETTINGS),
        ...panelCards(PSYCHOEDUCATION_DIFFICULTIES),
      ],
      cardColumns: 'three',
      callout: {
        text: 'Die Kernbotschaften bleiben über Altersstufen hinweg konstant: Du bist nicht schuld. Du bist nicht allein. Erwachsene kümmern sich.',
      },
    },
    {
      id: 'evidenz-mit-eltern-arbeiten',
      eyebrow: 'Kapitel 3',
      title: 'Mit Eltern arbeiten –',
      accent: 'respektvoll, transparent und alltagsnah',
      paragraphs: [
        'Eltern suchen Hilfe oft nicht zu spät aus Gleichgültigkeit, sondern weil Scham, Erschöpfung, Angst vor Bewertung oder Sorge um Kontrolle den Zugang erschweren.',
        'Fachlich hilfreich sind transparente, kleine und nachvollziehbare Schritte: Was passiert zuerst? Wer macht was? Was bedeutet Hilfe konkret für den Alltag der Kinder und der Eltern?',
      ],
      highlightList: {
        tone: 'soft',
        items: [
          ...HELP_BARRIER_POINTS,
          ...HELP_BARRIER_PRACTICE_POINTS,
          ...PARENT_PRACTICE_POINTS,
          ...COLLABORATION_FOUR_AS,
          ...PARENT_SELF_HELP_POINTS,
        ],
      },
      subsections: [
        {
          label: 'Gesprächseinstieg',
          title: 'Gute Kooperation beginnt mit Anlass, Anliegen, Auftrag und Abmachungen.',
          paragraphs: [
            'Die Vier-A-Logik schafft Orientierung und verhindert, dass Gespräche diffus bleiben. Sie übersetzt Respekt in eine klare Gesprächsstruktur.',
          ],
        },
        {
          label: 'Alltagshilfe',
          title: 'Nicht alles stabilisieren wollen – zuerst das Verlässlichste sichern.',
          paragraphs: [
            'Im Alltag helfen kleine, wiederholbare Schritte oft mehr als grosse Appelle. Versorgung, Übergaben, Schlaf, Essen und Entlastung haben Priorität.',
          ],
        },
        {
          label: 'Gesprächsbeispiele',
          title: 'Wie eine ressourcenorientierte Haltung im Gespräch klingen kann.',
          paragraphs: [
            'Die folgenden Sätze sind keine Skripte, sondern Orientierungshilfen. Sie zeigen, wie Fachpersonen Eltern als handlungsfähige, kompetente Gesprächspartner adressieren können — nicht als Objekte von Massnahmen.',
            ...PARENT_DIALOGUE_EXAMPLES.map((ex) => `${ex.label}: ${ex.text}`),
          ],
        },
      ],
      cards: [
        ...panelCards(HELP_BARRIER_PANELS),
        ...panelCards(COLLABORATION_PANELS),
        ...panelCards(PARENT_EVERYDAY_SUPPORT_PANELS),
      ],
      cardColumns: 'three',
      callout: {
        text: 'Der fachliche Fokus liegt nicht auf moralischer Bewertung, sondern auf der Frage, wie Eltern konkret entlastet und in ihrer Rolle handlungsfähig gehalten werden können.',
      },
    },
    {
      id: 'evidenz-handeln-und-vernetzen',
      eyebrow: 'Kapitel 4',
      title: 'Handeln und vernetzen –',
      accent: 'mit Schutzfaktoren, Angeboten und nächsten Schritten',
      paragraphs: [
        'Familienorientierte Unterstützung wirkt besonders dann plausibel, wenn sie Beziehung, Alltag, Information, Entlastung und soziale Ressourcen gemeinsam betrachtet.',
        'Nicht jede Familie braucht dieselbe Intervention. Hilfreich ist ein passender Mix aus Psychoedukation, Familiengespräch, Vernetzung, alltagsnaher Entlastung und klaren Zuständigkeiten in Belastungsspitzen.',
      ],
      highlightList: {
        tone: 'soft',
        items: [...INTERVENTION_PROGRAM_POINTS, ...PUK_CONTEXT_POINTS, ...ABOUT_THIS_WEBSITE_POINTS],
      },
      subsections: [
        {
          label: 'Klinische Praxis',
          title: 'Die klinische Perspektive verbindet Symptomatik mit Familienalltag.',
          paragraphs: CLINICAL_PRACTICE_POINTS,
        },
        {
          label: 'Unterstützungslandschaft',
          title: 'Angebote gewinnen an Wirkung, wenn sie nach Funktion und Zugänglichkeit sortiert werden.',
          paragraphs: [
            'Für Angehörige, Kinder, Eltern und Fachpersonen ist nicht nur das Vorhandensein von Hilfen entscheidend, sondern die schnelle Übersetzbarkeit in einen konkreten nächsten Schritt.',
          ],
        },
      ],
      cards: [...panelCards(CLINICAL_PRACTICE_PANELS), ...supportOfferCards(SUPPORT_OFFERS)],
      cardColumns: 'three',
      callout: {
        text: 'Die offizielle Angehörigenberatung der PUK Zürich bleibt im Zürcher Kontext eine zentrale Anlaufstelle, besonders wenn Elternschaft, psychische Belastung und kindliche Mitbetroffenheit gemeinsam in den Blick kommen.',
      },
    },
  ];

  const closingSection = createClosingSectionModel({
    id: 'evidenz-materialien',
    eyebrow: 'Kapitel 5',
    title: 'Materialien, Ressourcen und',
    accent: 'Weiterarbeit',
    paragraphs: [
      'Hier sind die direkt nutzbaren Arbeitsmaterialien der Website sowie ausgewählte weiterführende Bücher, digitale Angebote und Literaturhinweise gebündelt.',
      'Die Materialien dienen der Orientierung und Gesprächsvorbereitung. Offizielle Beratung, Anmeldung und Krisenwege laufen weiterhin über die jeweils zuständigen Stellen.',
    ],
    aside: {
      label: 'Hinweis',
      title: 'Orientierung statt Ersatz für Beratung',
      copy: 'Downloads und Medien schaffen Sprache, Struktur und Gesprächsanlässe. Sie ersetzen jedoch keine fachliche Beurteilung, kein Krisenmanagement und keine institutionelle Beratung.',
    },
    primaryActions: downloadResources.map((item) => ({
      title: item.title,
      description: item.description,
      meta: item.meta,
      actionLabel: item.actionLabel,
      onClick: item.onDownload,
    })),
    collections: [
      {
        eyebrow: 'Bücher für Gespräch und Psychoedukation',
        title: 'Kinder- und Familienmedien',
        description: 'Ausgewählte Kinderbücher und altersnahe Gesprächseinstiege.',
        collectionKind: 'custom',
        items: mediaBookItems(MEDIA_BOOKS),
      },
      {
        eyebrow: 'Digitale Ressourcen',
        title: 'Externe Informationsangebote',
        description: 'Vertiefende Webseiten und audiovisuelle Kurzformate.',
        collectionKind: 'custom',
        items: digitalMediaItems(MEDIA_DIGITAL),
      },
      {
        eyebrow: 'Fachstellen und Hilfen',
        title: 'Unterstützungsangebote',
        description: 'Ausgewählte Anlaufstellen für Angehörige, Kinder, Eltern und Fachpersonen.',
        collectionKind: 'custom',
        items: supportOfferCards(SUPPORT_OFFERS),
      },
      {
        eyebrow: 'Literatur',
        title: 'Quellen für Vertiefung',
        description: 'Kompakte Fachliteratur zur weiteren Einordnung.',
        collectionKind: 'custom',
        items: literatureItemsFromIds(LITERATUR_IDS),
      },
    ],
    notes: MEDIA_NOTES,
  });

  return (
    <EvidencePageTemplate
      hero={hero}
      pageHeadingId={getPageHeadingId('evidenz')}
      chapterOverview={chapterOverview}
      zones={zones}
      closingSection={closingSection}
    />
  );
}
