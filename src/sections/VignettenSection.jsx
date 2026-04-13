import VignettenPageTemplate from '../templates/VignettenPageTemplate';
import { VIGNETTEN } from '../data/learningContent';
import { getPageHeadingId } from '../utils/appHelpers';
import { useAppState } from '../context/useAppState';

export default function VignettenSection() {
  const { currentVignette: currentIndex, setCurrentVignette: setCurrentIndex, selectedOption, handleSelectVignetteOption: onSelectOption } = useAppState();
  const vignette = VIGNETTEN[currentIndex];

  if (!vignette) return null;

  const selectedId = selectedOption[vignette.id];
  const selected = vignette.options.find((option) => option.id === selectedId) ?? null;
  const feedbackId = `${vignette.id}-feedback`;

  const hero = {
    eyebrow: 'Fallreflexion',
    title: 'Training mit',
    accent: 'Vignetten',
    lead: 'Kurze Fallprüfungen zur fachlichen Einschätzung von Entscheidungssituationen zwischen Schutz, Kooperation und systemischer Entlastung. Die Darstellung bleibt bewusst fachlich und abwägend.',
    asideTitle: 'Format',
    asideCopy:
      'Ein Fall, zwei Optionen, direkte fachliche Rückmeldung. Ziel ist eine begründete Einschätzung, nicht ein Wissenstest.',
    stats: [
      {
        label: 'Aktueller Fall',
        value: `${currentIndex + 1}/${VIGNETTEN.length}`,
        note: vignette.status,
      },
      {
        label: 'Bearbeitungsstand',
        value: `${Object.keys(selectedOption).filter((id) => VIGNETTEN.some((v) => v.id === id)).length}`,
        note: 'Fälle mit gewählter Option',
      },
    ],
  };

  const caseStudy = {
    eyebrow: 'Fallsituation',
    titlePrefix: 'Aktueller',
    titleAccent: 'Kontext',
    description:
      'Jede Vignette verdichtet eine typische Entscheidungssituation aus Familie und Versorgungskontext. Ziel ist eine fachlich nachvollziehbare Einschätzung, nicht eine perfekte Antwort.',
    aside: {
      label: 'Status',
      value: `Fall ${currentIndex + 1} von ${VIGNETTEN.length}`,
      copy: 'Die Reihenfolge kann jederzeit vor und zurück durchlaufen werden.',
      tone: 'soft',
    },
    statusLabel: 'Fallsituation',
    title: vignette.title,
    badge: vignette.status,
    body: vignette.description,
  };

  const decision = {
    eyebrow: 'Einordnung',
    titlePrefix: 'Fachlich eher',
    titleAccent: 'angezeigt',
    description:
      'Wählen Sie die Option, die in dieser Situation im Sinne von Schutz, Kooperation und systemischer Entlastung eher priorisiert wäre.',
    question: 'Welche Option ist in dieser Situation fachlich eher angezeigt?',
    options: vignette.options.map((option) => ({
      ...option,
      groupName: `${vignette.id}-decision`,
      isActive: selectedId === option.id,
      onSelect: () => onSelectOption(vignette.id, option.id),
    })),
    feedback: selected
      ? {
          id: feedbackId,
          tone: selected.isCorrect ? 'success' : 'caution',
          copy: selected.feedback,
        }
      : null,
  };

  const navigation = {
    eyebrow: 'Navigation',
    title: 'Nächsten Fall vorbereiten',
    description: 'Sie können die aktuelle Wahl beibehalten, später anpassen oder direkt zum nächsten Fall wechseln.',
    previousLabel: 'Vorheriger Fall',
    nextLabel: 'Nächster Fall',
    disablePrevious: currentIndex === 0,
    disableNext: currentIndex === VIGNETTEN.length - 1,
    onPrevious: () => setCurrentIndex((prev) => Math.max(prev - 1, 0)),
    onNext: () => setCurrentIndex((prev) => Math.min(prev + 1, VIGNETTEN.length - 1)),
  };

  return (
    <VignettenPageTemplate
      hero={hero}
      pageHeadingId={getPageHeadingId('vignetten')}
      caseStudy={caseStudy}
      decision={decision}
      navigation={navigation}
    />
  );
}
