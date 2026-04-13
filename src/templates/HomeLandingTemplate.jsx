import { ChevronRight, ExternalLink } from 'lucide-react';
import heroIllustration from '../assets/relational-recovery-hero-v3-web.webp';
import EditorialPageTemplate from './EditorialPageTemplate';
import { E_MODULE_COUNT, HOME_REFERENCE_COUNT, NETWORK_RESOURCE_COUNT, VIGNETTE_COUNT } from '../data/appShellContent';
import { useAppState } from '../context/useAppState';

export default function HomeLandingTemplate({ pageHeadingId }) {
  const { navigate, completedModules } = useAppState();
  const progressPercent = E_MODULE_COUNT ? Math.round((completedModules.length / E_MODULE_COUNT) * 100) : 0;
  const hero = {
    eyebrow: 'Systemische Orientierung',
    title: 'Begleitung ist',
    accent: 'Beziehungsarbeit.',
    lead: 'Interaktive Fachressourcen für die Begleitung von Eltern mit psychischer Belastung – mit Training, systemischer Orientierung, Krisenhilfe, Netzwerk und printfähigen Arbeitshilfen.',
    image: heroIllustration,
    imageAlt: 'Minimalistische Illustration eines Familiensystems mit Nähe, Distanz und Unterstützung',
    asideTitle: 'Wichtiger Hinweis zur Einordnung',
    asideCopy:
      'Dieses Angebot dient der psychoedukativen Orientierung. Für offizielle Informationen und Beratung bleibt die Angehörigenberatung der PUK Zürich die zentrale Anlaufstelle.',
    actions: [
      {
        label: 'Falllogik trainieren',
        onClick: () => navigate('lernmodule', { focusTarget: 'heading' }),
        variant: 'primary',
        icon: ChevronRight,
      },
      {
        label: 'Prioritäten klären',
        onClick: () => navigate('toolbox', { focusTarget: 'heading' }),
        variant: 'secondary',
      },
      {
        label: 'Offizielle PUK-Seite öffnen',
        href: 'https://www.pukzh.ch/patienten-angehoerige/informationen-fuer-angehoerige/',
        variant: 'subtle',
        target: '_blank',
        rel: 'noopener noreferrer',
        icon: ExternalLink,
      },
    ],
    stats: [
      {
        label: 'Lernfortschritt',
        value: `${progressPercent}%`,
        note: `${completedModules.length} von ${E_MODULE_COUNT} Lernmodulen bearbeitet`,
      },
      {
        label: 'Module',
        value: String(E_MODULE_COUNT),
        note: 'kompakte Lernbausteine für die systemische Einordnung',
      },
      {
        label: 'Trainingsfälle',
        value: String(VIGNETTE_COUNT),
        note: 'für Fallreflexion, Sprache und Dialog',
      },
      {
        label: 'Netzwerkstellen',
        value: String(NETWORK_RESOURCE_COUNT),
        note: 'für Triage, Entlastung und Weitervermittlung',
      },
    ],
  };

  const sections = [
    {
      eyebrow: 'Orientierung',
      title: 'Ein ruhiger, fachlich klarer Weg durch die Inhalte.',
      description:
        'Die Inhalte folgen einer Abfolge: zuerst verstehen, dann einschätzen, daraus konkrete Schritte ableiten und passende Hilfen finden.',
      cards: [
        {
          label: 'Verstehen',
          title: 'Familiendynamik einordnen',
          copy: 'Elternrolle, Belastung, kindliche Perspektive und Schutzfaktoren gemeinsam betrachten.',
          onClick: () => navigate('evidenz', { focusTarget: 'heading' }),
          actionLabel: 'Zum Wissensbereich',
        },
        {
          label: 'Einschätzen',
          title: 'Risiken und Ressourcen gewichten',
          copy: 'Krise, Entlastung, Parentifizierung, Routinen und verfügbare Bezugspersonen zusammenführen.',
          onClick: () => navigate('toolbox', { focusTarget: 'heading' }),
          actionLabel: 'Zur Priorisierung',
        },
        {
          label: 'Handeln',
          title: 'Nächste Schritte konkret machen',
          copy: 'Psychoedukation, Sicherheitsplanung und Gesprächsführung in den Alltag übersetzen.',
          onClick: () => navigate('toolbox', { focusTarget: 'heading' }),
          actionLabel: 'Zu den Arbeitsinstrumenten',
        },
        {
          label: 'Vernetzen',
          title: 'Hilfen erreichbar machen',
          copy: 'Offizielle Stellen, Beratungsangebote und regionale Hilfen passend zur Lage aktivieren.',
          onClick: () => navigate('netzwerk', { focusTarget: 'heading' }),
          actionLabel: 'Zum Netzwerk',
        },
      ],
    },
    {
      eyebrow: 'Direkte Einstiege',
      title: 'Von hier aus erreichen Sie alle Bereiche direkt.',
      description:
        'Jeder Bereich ist direkt erreichbar -- mit kurzer Beschreibung, was Sie dort finden und wann er besonders hilfreich ist.',
      surface: 'subtle',
      cards: [
        {
          label: 'Training',
          title: 'Mit Lernmodulen üben',
          copy: `${E_MODULE_COUNT} kompakte Lerneinheiten helfen, Sprache, Falllogik und Gesprächsorientierung schrittweise aufzubauen.`,
          tone: 'soft',
          onClick: () => navigate('lernmodule', { focusTarget: 'heading' }),
          actionLabel: 'Zum E-Learning',
        },
        {
          label: 'Wissensraum',
          title: 'Familiendynamik vertiefen',
          copy: `Der Evidenzbereich bündelt aktuell ${HOME_REFERENCE_COUNT} kuratierte Einstiegspunkte, Materialien und Referenzen in einer ruhigeren Leselogik.`,
          tone: 'accent',
          onClick: () => navigate('evidenz', { focusTarget: 'heading' }),
          actionLabel: 'Zum Evidenzteil',
        },
        {
          label: 'Versorgung',
          title: 'Regionale Hilfen aufrufen',
          copy: `${NETWORK_RESOURCE_COUNT} Netzwerkstellen unterstützen bei Triage, Entlastung und der Weitervermittlung an passende Angebote.`,
          onClick: () => navigate('netzwerk', { focusTarget: 'heading' }),
          actionLabel: 'Zum Netzwerk',
        },
        {
          label: 'Fallarbeit',
          title: 'Dialoge und Entscheidungssituationen reflektieren',
          copy: `${VIGNETTE_COUNT} Trainingsfälle machen Belastungsdynamiken, Sprache und nächste Schritte konkreter als rein abstrakte Wissensvermittlung.`,
          onClick: () => navigate('vignetten', { focusTarget: 'heading' }),
          actionLabel: 'Zu den Vignetten',
        },
      ],
    },
    {
      eyebrow: 'Vertrauen und Orientierung',
      title: 'Wofür ist dieses Angebot gedacht -- und was passt zu Ihrem Anliegen?',
      description:
        'Für sensible Themen braucht es nicht nur Information, sondern auch erkennbare Einordnung. Hier erfahren Sie, wofür das Angebot gedacht ist und welche nächsten Wege je nach Anliegen sinnvoll sind.',
      aside: {
        label: 'Für wen gedacht',
        title: 'Psychoedukative Orientierung statt Ersatzversorgung',
        copy: 'Die Website unterstützt beim Verstehen, Strukturieren und Vorbereiten. Offizielle Beratung, Krisenhilfe und Behandlung bleiben eigenständige Versorgungsleistungen.',
        tone: 'soft',
      },
      cards: [
        {
          label: 'Wenn Sie zuerst verstehen möchten',
          title: 'Im Evidenzbereich beginnen',
          copy: 'Geeignet, wenn Familiendynamik, kindliche Perspektive, Psychoedukation oder Schutzfaktoren zunächst fachlich eingeordnet werden sollen.',
          onClick: () => navigate('evidenz', { focusTarget: 'heading' }),
          actionLabel: 'Wissensseite öffnen',
        },
        {
          label: 'Wenn Sie rasch priorisieren müssen',
          title: 'Mit der Toolbox starten',
          copy: 'Geeignet, wenn akute Belastung, Sicherheitsfragen, Kindeswohl oder nächste Schritte im Vordergrund stehen.',
          onClick: () => navigate('toolbox', { focusTarget: 'heading' }),
          actionLabel: 'Toolbox öffnen',
        },
        {
          label: 'Wenn Sie üben oder lehren möchten',
          title: 'Lernmodule und Vignetten kombinieren',
          copy: 'Geeignet für Selbststudium, Weiterbildung oder Teams, die Sprache und Falllogik anhand konkreter Situationen vertiefen möchten.',
          onClick: () => navigate('lernmodule', { focusTarget: 'heading' }),
          actionLabel: 'Zum Training',
        },
      ],
    },
  ];

  return <EditorialPageTemplate hero={hero} pageHeadingId={pageHeadingId} sections={sections} />;
}
