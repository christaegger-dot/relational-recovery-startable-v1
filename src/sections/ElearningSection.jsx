import { useMemo } from 'react';
import heroIllustration from '../assets/relational-recovery-hero-v3-web.webp';
import { E_MODULES } from '../data/learningContent';
import LearningPageTemplate from '../templates/LearningPageTemplate';
import { getPageHeadingId } from '../utils/appHelpers';
import { useAppState } from '../context/useAppState';

export default function ElearningSection() {
  const { quizState, completedModules, handleQuizAnswer } = useAppState();
  const completedCount = completedModules.length;
  const totalCount = E_MODULES.length;
  const progressPercent = totalCount ? Math.round((completedCount / totalCount) * 100) : 0;
  const hasStartedLearning = completedCount > 0;

  // Audit P2 #12: vor dem ersten bearbeiteten Modul wirkt eine "0%"-Kachel
  // wie ein leerer Score und damit wie eine negative Erstbegegnung.
  // Stattdessen zeigen wir bei completedCount === 0 einen ruhigen
  // Empty-State ("Bereit") mit einladendem Hinweis statt einer Quote.
  const progressStat = hasStartedLearning
    ? {
        label: 'Lernfortschritt',
        value: `${progressPercent}%`,
        note: `${completedCount} von ${totalCount} Modulen bearbeitet`,
      }
    : {
        label: 'Lernfortschritt',
        value: 'Bereit',
        note: `${totalCount} Module warten auf den ersten Lernschritt.`,
      };

  const hero = {
    eyebrow: 'Fachliche Kurzformate',
    title: 'Lernen in',
    accent: 'ruhigen Fachsequenzen.',
    lead: 'Kompakte Module für Gesprächsführung, Sprache und Einschätzung im Klinikalltag. Jedes Modul führt von einer Leitidee zu einer einzelnen Reflexionsfrage und bleibt damit näher an Fallarbeit als an prüfungsartigem Wissenstest.',
    image: heroIllustration,
    imageAlt: 'Illustration eines Familiensystems mit Beziehungslinien und ruhiger Orientierung',
    asideTitle: 'Zuletzt geprüft',
    asideCopy:
      'April 2026. Die Lernmodule sind als psychoedukative Orientierung und für ruhige fachliche Reflexion konzipiert, nicht als Ersatz für Supervision, Behandlung oder Krisenentscheidungen.',
    stats: [
      progressStat,
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
    eyebrow: 'Aufbau der Module',
    titlePrefix: 'Jedes Modul folgt einer',
    titleAccent: 'klaren Lernbewegung.',
    description:
      'Jedes Modul beginnt mit einer fachlichen Leitidee, führt dann durch eine kurze Einordnung und schliesst mit einer Reflexionsfrage ab.',
    steps: [
      {
        title: 'Leitidee erfassen',
        copy: 'Zu Beginn wird die fachliche Grundidee sichtbar gemacht, damit das Modul zuerst orientiert und nicht sofort abfragt.',
        tone: 'soft',
      },
      {
        title: 'Kurz einordnen',
        copy: 'Die sprachliche und systemische Störungslage bleibt in einem kompakten Format lesbar und anschlussfähig an Fallbesprechungen.',
      },
      {
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
        onAnswer: handleQuizAnswer,
      })),
    [quizState, completedModules, handleQuizAnswer]
  );

  const modulesSection = {
    eyebrow: 'Lernmodule',
    titlePrefix: 'Die Lernmodule im',
    titleAccent: 'Überblick.',
    description:
      'Weitere Module zu anderen Themen können jederzeit ergänzt werden. Das Format bleibt dabei gleich: Leitidee, Einordnung, Reflexionsfrage.',
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

  return (
    <LearningPageTemplate
      hero={hero}
      pageHeadingId={getPageHeadingId('lernmodule')}
      sequence={sequence}
      modulesSection={modulesSection}
    />
  );
}
