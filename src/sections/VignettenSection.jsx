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
    title: 'Training',
    accent: 'mit Fallvignetten',
    lead: 'Kurze Fallprüfungen zur fachlichen Einschätzung von Entscheidungssituationen zwischen Schutz, Kooperation und systemischer Entlastung. Die Darstellung bleibt bewusst fachlich und abwägend.',
    asideTitle: 'Format',
    asideCopy:
      'Ein Fall, zwei Optionen, direkte fachliche Rückmeldung. Ziel ist eine begründete Einschätzung, nicht ein Wissenstest.',
    stats: [
      ...(VIGNETTEN.length > 1
        ? [
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
          ]
        : []),
    ],
  };

  // Audit P3 #18: 'Fall 1 von 1' liest sich als ausgereizter Zähler
  // (alles abgearbeitet, nichts mehr da) und entwertet die einzige
  // verfügbare Vignette unbeabsichtigt. Solange nur ein Fall existiert,
  // zeigen wir stattdessen einen ruhigen Empty-State-Hinweis: der
  // aktuelle Fall ist bewusst ausgewählt, weitere sind in Vorbereitung.
  const isSingleCase = VIGNETTEN.length === 1;
  const caseStudyAside = isSingleCase
    ? {
        label: 'Bestand',
        value: 'Ausgewählter Fall',
        copy:
          'Aktuell steht eine vertieft ausgearbeitete Vignette zur Reflexion bereit. Weitere Fälle zu anderen Entscheidungssituationen werden schrittweise ergänzt.',
        tone: 'soft',
      }
    : {
        label: 'Status',
        value: `Fall ${currentIndex + 1} von ${VIGNETTEN.length}`,
        copy: 'Die Reihenfolge kann jederzeit vor und zurück durchlaufen werden.',
        tone: 'soft',
      };

  // Audit A3: `statusLabel: 'Fallsituation'` wiederholte den Eyebrow der
  // umgebenden Section eins zu eins -- im DOM standen zwei identische Labels
  // direkt untereinander. Der Eyebrow setzt den Kontext bereits, im Card
  // genuegen Titel + Badge (z. B. "Aufnahme / Woche 1"). Das Template
  // rendert `statusLabel` weiterhin konditional -- spaetere Vignetten
  // koennten es fuer abweichende Subkontexte re-aktivieren.
  const caseStudy = {
    eyebrow: 'Fallsituation',
    titlePrefix: 'Aktueller',
    titleAccent: 'Kontext',
    description:
      'Jede Vignette verdichtet eine typische Entscheidungssituation aus Familie und Versorgungskontext. Ziel ist eine fachlich nachvollziehbare Einschätzung, nicht eine perfekte Antwort.',
    aside: caseStudyAside,
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

  // Navigations-Section nur anzeigen, wenn es mehr als 1 Fall gibt.
  // Bei nur 1 Vignette wären beide Buttons disabled — sinnlos und
  // für Nutzende irritierend (Nutzer-Audit N4).
  const navigation =
    VIGNETTEN.length > 1
      ? {
          eyebrow: 'Navigation',
          title: 'Nächsten Fall vorbereiten',
          description:
            'Sie können die aktuelle Wahl beibehalten, später anpassen oder direkt zum nächsten Fall wechseln.',
          previousLabel: 'Vorheriger Fall',
          nextLabel: 'Nächster Fall',
          disablePrevious: currentIndex === 0,
          disableNext: currentIndex === VIGNETTEN.length - 1,
          onPrevious: () => setCurrentIndex((prev) => Math.max(prev - 1, 0)),
          onNext: () => setCurrentIndex((prev) => Math.min(prev + 1, VIGNETTEN.length - 1)),
        }
      : null;

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
