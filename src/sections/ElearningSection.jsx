import { useMemo } from 'react';
import heroIllustration from '../assets/relational-recovery-hero-v3-web.png';
import { E_MODULES } from '../data/learningContent';
import LearningPageTemplate from '../templates/LearningPageTemplate';
import { getPageHeadingId } from '../utils/appHelpers';

export default function ElearningSection({ quizState, onAnswer, completedModules }) {
  const completedCount = completedModules.length;
  const totalCount = E_MODULES.length;
  const progressPercent = totalCount ? Math.round((completedCount / totalCount) * 100) : 0;

  const hero = {
    eyebrow: 'Fachliche Kurzformate',
    title: 'Lernen in',
    accent: 'ruhigen Fachsequenzen.',
    lead:
      'Kompakte Module für Gesprächsführung, Sprache und Einschätzung im Klinikalltag. Jedes Modul führt von einer Leitidee zu einer einzelnen Reflexionsfrage und bleibt damit näher an Fallarbeit als an prüfungsartigem Wissenstest.',
    image: heroIllustration,
    imageAlt: 'Illustration eines Familiensystems mit Beziehungslinien und ruhiger Orientierung',
    asideTitle: 'Zuletzt geprüft',
    asideCopy:
      'April 2026. Die Lernmodule sind als psychoedukative Orientierung und für ruhige fachliche Reflexion konzipiert, nicht als Ersatz für Supervision, Behandlung oder Krisenentscheidungen.',
    stats: [
      {
        label: 'Lernfortschritt',
        value: `${progressPercent}%`,
        note: `${completedCount} von ${totalCount} Modulen bearbeitet`,
      },
      {
        label: 'Module',
        value: String(totalCount),
        note: 'kompakte Lerneinheiten für Sprache und Einordnung',
      },
      {
        label: 'Format',
        value: '1 Frage',
        note: 'pro Modul statt längerer Quiz- oder Testlogik',
      },
    ],
  };

  const sequence = {
    eyebrow: 'Didaktische Logik',
    titlePrefix: 'Jedes Modul folgt einer',
    titleAccent: 'klaren Lernbewegung.',
    description:
      'Die neue Seitenstruktur übersetzt die bisherige Elearning-Sektion in eine wiederverwendbare Learning-Architektur. Sie beginnt mit Einordnung und Orientierung, macht dann die didaktische Sequenz sichtbar und führt erst danach in die einzelnen Module.',
    aside: {
      label: 'Einordnung',
      title: 'Ruhig statt prüfungsartig',
      copy: 'Das Format soll Denken, Sprache und fachliche Gewichtung stärken. Eine einzelne Reflexionsfrage reduziert Druck und hält den Fokus auf Anwendung im Arbeitsalltag.',
      tone: 'soft',
    },
    steps: [
      {
        label: 'Schritt 1',
        title: 'Leitidee erfassen',
        copy: 'Zu Beginn wird die fachliche Grundidee sichtbar gemacht, damit das Modul zuerst orientiert und nicht sofort abfragt.',
        tone: 'soft',
      },
      {
        label: 'Schritt 2',
        title: 'Kurz einordnen',
        copy: 'Die sprachliche und systemische Störungslage bleibt in einem kompakten Format lesbar und anschlussfähig an Fallbesprechungen.',
      },
      {
        label: 'Schritt 3',
        title: 'Reflexiv antworten',
        copy: 'Erst dann folgt eine einzelne Antwortentscheidung, die zur fachlich tragfähigeren Perspektive zurückführt.',
        tone: 'accent',
      },
    ],
  };

  const moduleItems = useMemo(
    () =>
      E_MODULES.map((mod) => ({
        id: mod.id,
        kicker: 'Lernmodul',
        title: mod.title,
        description: 'Kompakter Lernimpuls für Sprache, Wahrnehmung und systemische Einordnung im Begleitalltag.',
        duration: mod.duration,
        storyboard: mod.storyboard,
        quiz: mod.quiz,
        quizOptions: mod.quizOptions,
        correctQuizIdx: mod.correctQuizIdx,
        result: quizState[mod.id],
        completed: completedModules.includes(mod.id),
        onAnswer,
      })),
    [quizState, completedModules, onAnswer],
  );

  const modulesSection = {
    eyebrow: 'Lernmodule',
    titlePrefix: 'Die Inhalte sind jetzt als',
    titleAccent: 'eigener Seitentyp organisiert.',
    description:
      'Der Modulbereich trennt wiederkehrende Struktur von konkreten Inhalten. Dadurch lassen sich künftige Lernbausteine, andere Themenfelder oder vertiefende Formate ohne neue Monolith-Sektion auf dieselbe Template-Logik aufsetzen.',
    aside: {
      label: 'Bearbeitungsstand',
      value: `${completedCount}/${totalCount}`,
      copy:
        completedCount === totalCount
          ? 'Alle Module sind aktuell bearbeitet.'
          : `Noch offen: ${Math.max(totalCount - completedCount, 0)} Modul${totalCount - completedCount === 1 ? '' : 'e'} für den nächsten Lernschritt.`,
      tone: completedCount === totalCount ? 'soft' : 'default',
    },
    items: moduleItems,
  };

  return <LearningPageTemplate hero={hero} pageHeadingId={getPageHeadingId('lernmodule')} sequence={sequence} modulesSection={modulesSection} />;
}
