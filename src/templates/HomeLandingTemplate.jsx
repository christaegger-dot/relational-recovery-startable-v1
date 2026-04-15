import { ChevronRight, ExternalLink } from 'lucide-react';
import heroIllustration from '../assets/relational-recovery-hero-v3-web.webp';
import EditorialPageTemplate from './EditorialPageTemplate';
import { E_MODULE_COUNT, NETWORK_RESOURCE_COUNT, VIGNETTE_COUNT } from '../data/appShellContent';
import { useAppState } from '../context/useAppState';

export default function HomeLandingTemplate({ pageHeadingId }) {
  const { navigate, completedModules } = useAppState();
  const progressPercent = E_MODULE_COUNT ? Math.round((completedModules.length / E_MODULE_COUNT) * 100) : 0;

  // Lernfortschritt-Stat nur anzeigen, sobald mindestens ein Modul bearbeitet wurde
  // (0%-Signal fuer neue Nutzende weglassen, Audit-UX-Iteration).
  const progressStat =
    progressPercent > 0
      ? [
          {
            label: 'Lernfortschritt',
            value: `${progressPercent}%`,
            note: `${completedModules.length} von ${E_MODULE_COUNT} Lernmodulen bearbeitet`,
          },
        ]
      : [];

  const hero = {
    eyebrow: 'Eltern mit psychischen Erkrankungen im Beratungskontext',
    title: 'Fachportal für',
    accent: 'Orientierung, Triage und Weitervermittlung.',
    lead: 'Arbeitshilfen für Fachpersonen, die mit Familien mit psychisch belasteten Eltern arbeiten – Toolbox, Trainingsfälle, Wissensraum und regionale Fachstellen.',
    audienceNote: {
      prefix: 'Sie sind Angehörige?',
      label: 'Zur Grundlagen-FAQ',
      onClick: () => navigate('grundlagen', { focusTarget: 'heading' }),
    },
    image: heroIllustration,
    imageAlt: 'Minimalistische Illustration eines Familiensystems mit Nähe, Distanz und Unterstützung',
    asideTitle: 'Wichtiger Hinweis zur Einordnung',
    asideCopy:
      'Dieses Angebot dient der psychoedukativen Orientierung. Für offizielle Informationen und Beratung bleibt die Angehörigenberatung der PUK Zürich die zentrale Anlaufstelle.',
    actions: [
      {
        label: 'Prioritäten klären',
        onClick: () => navigate('toolbox', { focusTarget: 'heading' }),
        variant: 'primary',
        icon: ChevronRight,
      },
      {
        label: 'Hintergrund verstehen',
        onClick: () => navigate('evidenz', { focusTarget: 'heading' }),
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
    // Content-Stats werden pro Karte nur angezeigt, sobald der Count die
    // Signal-Schwelle erreicht (>= 3). Vorher wirken einzelne kleine Werte
    // wie "Trainingsfaelle: 1" eher entmutigend als vertrauensbildend
    // (Verifikation P3 nach PR #40). Sobald Inhalte wachsen, kehrt die
    // jeweilige Karte automatisch zurueck — keine redaktionelle Pflege.
    stats: [
      ...progressStat,
      ...(E_MODULE_COUNT >= 3
        ? [
            {
              label: 'Module',
              value: String(E_MODULE_COUNT),
              note: 'kompakte Lernbausteine für die systemische Einordnung',
            },
          ]
        : []),
      ...(VIGNETTE_COUNT >= 3
        ? [
            {
              label: 'Trainingsfälle',
              value: String(VIGNETTE_COUNT),
              note: 'für Fallreflexion, Sprache und Dialog',
            },
          ]
        : []),
      ...(NETWORK_RESOURCE_COUNT >= 3
        ? [
            {
              label: 'Netzwerkstellen',
              value: String(NETWORK_RESOURCE_COUNT),
              note: 'für Triage, Entlastung und Weitervermittlung',
            },
          ]
        : []),
    ],
  };

  // Startseite traegt genau zwei Orientierungs-Schichten:
  // 1) Zielgruppen-Einstieg (Fachperson / Angehoerige) direkt im Hero als
  //    audienceEntries-Chipleiste nach dem Lead — sichtbar im oberen
  //    Nutzungsfenster (Verifikations-Befund nach PR #38: die frueher
  //    eigene "Zugang waehlen"-Section lag auf allen Viewports unter der
  //    Fold; siehe PR #39 / Verifikation).
  // 2) Phasen-Logik (Verstehen / Einschaetzen / Handeln / Vernetzen) als
  //    Haupt-Gliederung der Content-Sections darunter.
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
  ];

  return <EditorialPageTemplate hero={hero} pageHeadingId={pageHeadingId} sections={sections} />;
}
