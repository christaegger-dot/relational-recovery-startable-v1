import { useMemo, useState } from 'react';
import { MapPin, Search } from 'lucide-react';
import heroIllustration from '../assets/relational-recovery-hero-v3-web.webp';
import {
  NETWORK_FILTERS,
  NETWORK_MAP_LENSES,
  NETWORK_MAP_QUESTIONS,
  NETWORK_MAP_STEPS,
  NETWORK_MAP_TEMPLATE_NODES,
  RESOURCE_DATA,
} from '../data/networkContent';
import NetworkPageTemplate from '../templates/NetworkPageTemplate';
import { getPageHeadingId } from '../utils/appHelpers';
import { useAppState } from '../context/useAppState';

const LENS_SUMMARY = {
  gap: 'Die Karte macht sichtbar, wo Mitwissende, Betreuung oder formelle Absicherung noch fehlen.',
  private: 'Im Fokus stehen tragende persönliche Beziehungen und emotionale Nähe im Alltag.',
  support: 'Im Fokus stehen alltagsnahe Stützen wie Schule, Betreuung und entlastende Aussenbezüge.',
  formal: 'Im Fokus stehen professionelle Kontakte und institutionelle Mitverantwortung.',
  all: 'Das Gesamtbild verbindet private, unterstützende, formelle und noch fehlende Netzwerkbausteine.',
};

const LENS_NEXT_STEP = {
  gap: 'Nächster Schritt: fehlende Mitwissende, Kinderbetreuung und formelle Absicherung zuerst konkret benennen.',
  private: 'Nächster Schritt: klären, wer wirklich informiert ist und in belasteten Phasen kurzfristig mittragen kann.',
  support: 'Nächster Schritt: Tagesstruktur, Schule, Betreuung und entlastende Aussenkontakte verbindlicher verankern.',
  formal: 'Nächster Schritt: Zuständigkeiten, Erreichbarkeit und Rückmeldewege mit Fachstellen konkretisieren.',
  all: 'Nächster Schritt: Mischung, Lücken und Erreichbarkeit gemeinsam lesen und daraus konkrete Absprachen ableiten.',
};

const NODE_COUNTS = NETWORK_MAP_TEMPLATE_NODES.reduce(
  (acc, node) => {
    if (node.tone in acc) acc[node.tone] += 1;
    return acc;
  },
  { private: 0, support: 0, formal: 0, gap: 0 }
);

export default function NetworkSection() {
  const { searchTerm, setSearchTerm, activeResourceFilter, setActiveResourceFilter } = useAppState();
  const [networkLens, setNetworkLens] = useState('all');

  const filteredResources = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    return RESOURCE_DATA.filter((resource) => {
      const matchesSearch =
        !query ||
        resource.name.toLowerCase().includes(query) ||
        resource.info.toLowerCase().includes(query) ||
        resource.tags.some((tag) => tag.toLowerCase().includes(query));

      const matchesFilter = activeResourceFilter === 'all' || resource.tags.includes(activeResourceFilter);
      return matchesSearch && matchesFilter;
    });
  }, [searchTerm, activeResourceFilter]);

  const searchStatusText = searchTerm.trim()
    ? `${filteredResources.length} Treffer für ${searchTerm.trim()}.`
    : `${filteredResources.length} Fachstellen werden angezeigt.`;

  const filterStatusText =
    activeResourceFilter === 'all' ? 'Es werden alle Fachstellen angezeigt.' : `Filter aktiv: ${activeResourceFilter}.`;

  const activeLens = NETWORK_MAP_LENSES.find((lens) => lens.id === networkLens) ?? NETWORK_MAP_LENSES[0];
  const visibleMapNodes = NETWORK_MAP_TEMPLATE_NODES.filter(
    (node) => networkLens === 'all' || node.tone === networkLens
  );

  const hero = {
    eyebrow: 'Triage und Support',
    title: 'Netzwerk in',
    accent: 'Zürich und schweizweit lesen.',
    lead: 'Die Seite verbindet zürich-zentrierte Krisenwege, Familienberatung, Kinder- und Jugendangebote sowie wenige schweizweite Ergänzungen. Das neue Seitentyp-System trennt dabei Suchlogik, Fachstellenverzeichnis und Netzwerkkarte sauber voneinander.',
    image: heroIllustration,
    imageAlt: 'Illustration eines Familiensystems mit Beziehungslinien und ruhiger Orientierung',
    asideTitle: 'Einordnung',
    asideCopy:
      'Der Bereich bleibt bewusst Zürich-zentriert: offizielle Krisenwege, Familienberatung, Kinder- und Jugendangebote sowie längerfristige Entlastung in und um Zürich werden durch wenige nationale Stellen für Orientierung und Rechtefragen ergänzt.',
    actions: [
      { label: 'Zu den Fachstellen', href: '#netzwerk-fachstellen', icon: Search },
      { label: 'Zur Netzwerkkarte', href: '#netzwerk-karte', icon: MapPin, variant: 'ghost' },
    ],
    stats: [
      {
        label: 'Fachstellen',
        value: String(RESOURCE_DATA.length),
        note: 'kuratiert für Zürich plus einzelne schweizweite Ergänzungen',
      },
      {
        label: 'Filter',
        value: String(NETWORK_FILTERS.length - 1),
        note: 'für Krise, Jugend, Entlastung, Mehrsprachigkeit und offizielle Stellen',
      },
      {
        label: 'Lesarten',
        value: String(NETWORK_MAP_LENSES.length),
        note: 'Gesamtbild, privates Umfeld, Alltagsstützen, Fachstellen und Lücken',
      },
    ],
  };

  const directory = {
    id: 'netzwerk-fachstellen',
    intro: {
      eyebrow: 'Fachstellenverzeichnis',
      title: 'Schneller in die',
      accent: 'passende Unterstützung.',
      paragraphs: [
        'Das Verzeichnis verbindet offizielle Krisenwege, familienbezogene Beratung, spezialisierte Angebote für Kinder und Jugendliche sowie längerfristige Entlastung. Der Schwerpunkt liegt auf Zürich und Winterthur; einzelne schweizweite Stellen bleiben ergänzend sichtbar.',
        'Die neue Seitenarchitektur löst das bisher monolithische Layout in einen wiederverwendbaren Directory-Baustein auf. Filter, Suche und Trefferlogik können damit künftig auch für weitere regionale Netzwerke genutzt werden.',
      ],
      aside: {
        label: 'Orientierung',
        title: 'Suche erst, entscheide dann',
        copy: 'Die Kombination aus Filter und Freitextsuche hilft, in akuten oder komplexen Lagen zuerst zu sortieren und erst danach einzelne Fachstellen zu öffnen.',
        tone: 'soft',
      },
    },
    filters: NETWORK_FILTERS,
    activeFilter: activeResourceFilter,
    onFilterChange: setActiveResourceFilter,
    searchTerm,
    onSearchChange: setSearchTerm,
    onReset: () => {
      setSearchTerm('');
      setActiveResourceFilter('all');
    },
    searchStatusText,
    filterStatusText,
    resources: filteredResources,
  };

  const mapping = {
    id: 'netzwerk-karte',
    intro: {
      eyebrow: 'Arbeitskarte',
      title: 'Netzwerke als',
      accent: 'lesbare Versorgungslage.',
      paragraphs: [
        'Netzwerke werden oft erst sichtbar, wenn sie konkret gesammelt und geordnet werden: Wer gehört dazu, wer ist emotional nah, wer ist erreichbar, wer weiss Bescheid und wo fehlen tragende Beziehungen?',
        'Die Netzwerkkarte fungiert hier nicht als Grafikspielerei, sondern als Arbeitsoberfläche für Gespräche, Fallreflexion und vorsichtige Krisenvorbereitung.',
      ],
      aside: {
        label: 'Arbeitsprinzip',
        title: 'Von der Sammlung zur Absprache',
        copy: 'Die Karte soll nicht perfekt sein. Sie soll helfen, Mischung, Lücken und konkrete nächste Schritte schneller benennen zu können.',
        tone: 'default',
      },
    },
    steps: NETWORK_MAP_STEPS,
    questions: NETWORK_MAP_QUESTIONS,
    lenses: NETWORK_MAP_LENSES,
    activeLensId: networkLens,
    onLensChange: setNetworkLens,
    activeLens,
    visibleNodes: visibleMapNodes,
    counts: [
      {
        label: 'Privat',
        value: String(NODE_COUNTS.private),
        note: 'emotionale Nähe und Alltag',
        tone: 'soft',
      },
      {
        label: 'Alltag',
        value: String(NODE_COUNTS.support),
        note: 'Schule, Betreuung, Aussenkontakte',
        tone: 'soft',
      },
      {
        label: 'Formal',
        value: String(NODE_COUNTS.formal),
        note: 'professionelle und institutionelle Kontakte',
      },
      {
        label: 'Lücken',
        value: String(NODE_COUNTS.gap),
        note: 'fehlende Mitwissende oder Absicherung',
        tone: 'soft',
      },
    ],
    lensSummary: LENS_SUMMARY[networkLens] ?? LENS_SUMMARY.all,
    nextStepText: LENS_NEXT_STEP[networkLens] ?? LENS_NEXT_STEP.all,
  };

  return (
    <NetworkPageTemplate
      hero={hero}
      pageHeadingId={getPageHeadingId('netzwerk')}
      directory={directory}
      mapping={mapping}
    />
  );
}
