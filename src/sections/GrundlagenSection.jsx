import GrundlagenPageTemplate from '../templates/GrundlagenPageTemplate';
import { GRUNDLAGEN_CLUSTERS, GRUNDLAGEN_HERO, GRUNDLAGEN_INTRO } from '../data/grundlagenContent';
import { createClosingSectionModel } from '../utils/closingModel';
import { getPageHeadingId } from '../utils/appHelpers';

function mapGrundlagenDownloads(sharedDownloadResources = []) {
  return sharedDownloadResources
    .filter((item) =>
      ['Gesprächsleitfaden für Fachpersonen', 'Psychoedukations-Hilfe', 'Schutzfaktoren-Check'].includes(item.title)
    )
    .map((item) => ({
      ...item,
      kind: 'download',
    }));
}

export default function GrundlagenSection({ sharedDownloadResources = [], onNavigateToTab = () => {} }) {
  const closingSection = createClosingSectionModel({
    id: 'grundlagen-materials',
    eyebrow: 'Weiterarbeiten',
    title: 'Arbeitsmaterialien und',
    accent: 'nächste Anschlusswege.',
    description:
      'Der FAQ-Bereich endet bewusst nicht bei Antworten. Zum Abschluss führen konkrete Arbeitsmaterialien und anschlussfähige Seitentypen weiter in Gespräch, Einordnung und Versorgung.',
    paragraphs: [
      'Die Materialien unterstützen dabei, Fragen aus dem Alltag in beobachtbare Themen, kindbezogene Sprache und nächste Schritte zu übersetzen.',
      'Die Anschlussnavigation führt von allgemeinen FAQ-Antworten direkt in Begriffe, Arbeitslogik und regionale Weitervermittlung.',
    ],
    aside: {
      label: 'Arbeitslogik',
      title: 'Von FAQ zu handhabbaren Schritten',
      copy: 'Wenn eine Frage hängen bleibt, hilft oft kein weiteres Lesen, sondern ein kleines Arbeitsmittel oder der Wechsel in den nächsten passenden Seitentyp.',
      tone: 'soft',
    },
    collections: mapGrundlagenDownloads(sharedDownloadResources).length
      ? [
          {
            id: 'grundlagen-downloads',
            eyebrow: 'Arbeitsmaterialien',
            title: 'Hilfen für Gespräch, Psychoedukation und Schutzfaktoren',
            description:
              'Diese Vorlagen passen besonders dann, wenn aus allgemeiner Orientierung ein konkretes Gespräch, eine kindbezogene Erklärung oder eine erste Fallsortierung werden soll.',
            collectionKind: 'downloads',
            items: mapGrundlagenDownloads(sharedDownloadResources),
          },
        ]
      : [],
    relatedLinks: {
      eyebrow: 'Das könnte Sie auch interessieren',
      title: 'Passende Anschlussräume für Vertiefung und Weitervermittlung',
      description:
        'Je nach Frage führt der nächste sinnvolle Schritt eher in die Toolbox, ins Glossar oder in den Netzwerkbereich. Diese Links halten den Übergang bewusst niedrigschwellig.',
      items: [
        {
          kind: 'navigation',
          title: 'Toolbox',
          description:
            'Wenn Antworten in Priorisierung, Sicherheitsplanung oder konkrete nächste Schritte übersetzt werden müssen.',
          meta: ['Arbeitsmodus', 'Nächste Schritte'],
          actionLabel: 'Zur Toolbox wechseln',
          onClick: () => onNavigateToTab('toolbox', { focusTarget: 'heading' }),
        },
        {
          kind: 'navigation',
          title: 'Glossar',
          description:
            'Wenn Begriffe wie Parentifizierung, Schweigepflicht oder Kindesperspektive zuerst sprachlich geklärt werden sollen.',
          meta: ['Begriffe', 'Einordnung'],
          actionLabel: 'Zum Glossar wechseln',
          onClick: () => onNavigateToTab('glossar', { focusTarget: 'heading' }),
        },
        {
          kind: 'navigation',
          title: 'Netzwerk',
          description:
            'Wenn aus Orientierung eine konkrete Fachstelle, regionale Hilfe oder Weitervermittlung werden soll.',
          meta: ['Versorgung', 'Weitervermittlung'],
          actionLabel: 'Zum Netzwerk wechseln',
          onClick: () => onNavigateToTab('netzwerk', { focusTarget: 'heading' }),
        },
      ],
    },
  });

  return (
    <GrundlagenPageTemplate
      hero={GRUNDLAGEN_HERO}
      pageHeadingId={getPageHeadingId('grundlagen')}
      intro={GRUNDLAGEN_INTRO}
      clusters={GRUNDLAGEN_CLUSTERS}
      closingSection={closingSection}
    />
  );
}
