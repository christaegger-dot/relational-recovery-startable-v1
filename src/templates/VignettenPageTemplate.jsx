import { ChevronLeft, ChevronRight, CheckCircle2 } from 'lucide-react';
import Button from '../components/ui/Button';
import Container from '../components/ui/Container';
import Eyebrow from '../components/ui/Eyebrow';
import LegalDisclaimer from '../components/ui/LegalDisclaimer';
import PageHero from '../components/ui/PageHero';
import Section from '../components/ui/Section';
import SectionHeader from '../components/ui/SectionHeader';
import SurfaceCard from '../components/ui/SurfaceCard';

function VignettenCaseSection({ caseStudy }) {
  if (!caseStudy) return null;

  return (
    <Section spacing="tight" surface={caseStudy.surface || 'plain'} className="no-print">
      <div className="ui-stack ui-stack--loose">
        <SectionHeader
          eyebrow={caseStudy.eyebrow}
          titlePrefix={caseStudy.titlePrefix}
          titleAccent={caseStudy.titleAccent}
          description={caseStudy.description}
          aside={caseStudy.aside}
        />

        <SurfaceCard tone={caseStudy.cardTone || 'default'} className="no-print">
          <div className="ui-card__header">
            <div className="ui-stack ui-stack--compact">
              {caseStudy.statusLabel ? <p className="ui-fact-card__label">{caseStudy.statusLabel}</p> : null}
              <h3 className="ui-card__title">{caseStudy.title}</h3>
            </div>
            {caseStudy.badge ? <span className="ui-badge">{caseStudy.badge}</span> : null}
          </div>

          <div className="ui-card__section--spaced ui-copy">
            <p>{caseStudy.body}</p>
          </div>
        </SurfaceCard>
      </div>
    </Section>
  );
}

function DecisionOption({ option, index, isActive, onSelect }) {
  const toneClass = [
    'ui-choice-card',
    isActive ? 'ui-choice-card--selected' : '',
    isActive ? (option.isCorrect ? 'ui-choice-card--correct' : 'ui-choice-card--incorrect') : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <label className="ui-choice-control">
      <input
        type="radio"
        name={option.groupName}
        className="ui-visually-hidden"
        checked={isActive}
        onChange={onSelect}
      />
      <span className={toneClass}>
        <span className="ui-choice-card__body">
          <span className="ui-choice-card__stack">
            <span className="ui-note-panel__label">Option {index + 1}</span>
            <span className="ui-choice-card__title">{option.label}</span>
          </span>
          {isActive ? <CheckCircle2 size={18} className="ui-choice-card__control" aria-hidden="true" /> : null}
        </span>
      </span>
    </label>
  );
}

function VignettenDecisionSection({ decision }) {
  if (!decision) return null;

  return (
    <Section spacing="tight" surface={decision.surface || 'subtle'} className="no-print">
      <div className="ui-stack ui-stack--loose">
        <SectionHeader
          eyebrow={decision.eyebrow}
          titlePrefix={decision.titlePrefix}
          titleAccent={decision.titleAccent}
          description={decision.description}
          aside={decision.aside}
          asideTone="default"
        />

        <SurfaceCard tone={decision.cardTone || 'default'} className="no-print">
          <fieldset aria-describedby={decision.feedback ? decision.feedback.id : undefined}>
            <legend className="ui-form-legend">{decision.question}</legend>
            <div className="ui-card-grid ui-card-grid--2">
              {decision.options.map((option, index) => (
                <DecisionOption
                  key={option.id}
                  option={option}
                  index={index}
                  isActive={option.isActive}
                  onSelect={option.onSelect}
                />
              ))}
            </div>
          </fieldset>

          {decision.feedback ? (
            <div
              id={decision.feedback.id}
              role="status"
              aria-live="polite"
              aria-atomic="true"
              className={[
                'ui-note-panel',
                'ui-note-panel--spaced',
                decision.feedback.tone === 'success' ? '' : 'ui-note-panel--muted',
              ]
                .filter(Boolean)
                .join(' ')}
            >
              <p className="ui-note-panel__label">Rückmeldung</p>
              <p className="ui-note-panel__copy">{decision.feedback.copy}</p>
            </div>
          ) : null}
        </SurfaceCard>
      </div>
    </Section>
  );
}

function VignettenNavigationSection({ navigation }) {
  if (!navigation) return null;

  return (
    <Section spacing="tight" surface={navigation.surface || 'plain'} className="no-print">
      <SurfaceCard tone={navigation.cardTone || 'soft'}>
        <div className="ui-card-layout">
          <div className="ui-stack ui-stack--compact">
            {navigation.eyebrow ? <Eyebrow>{navigation.eyebrow}</Eyebrow> : null}
            <h2 className="ui-card__title">{navigation.title}</h2>
            <p className="ui-card__copy">{navigation.description}</p>
          </div>

          <div className="ui-button-row">
            <Button
              type="button"
              onClick={navigation.onPrevious}
              disabled={navigation.disablePrevious}
              variant="secondary"
            >
              <ChevronLeft size={16} /> {navigation.previousLabel}
            </Button>
            <Button type="button" onClick={navigation.onNext} disabled={navigation.disableNext} variant="primary">
              {navigation.nextLabel} <ChevronRight size={16} />
            </Button>
          </div>
        </div>
      </SurfaceCard>
    </Section>
  );
}

function VignettenPrintNotice() {
  // Print-only-Hinweis (V1 aus Audit 11). Erscheint ausschliesslich im
  // gedruckten Dokument, weil die Screen-Sections als .no-print markiert
  // sind. Begruendung: Vignetten sind nach Audit 05 die heikelsten Inhalte
  // und stehen in einem inhaltlichen Zusammenhang, der auf Papier nicht
  // mitgeht.
  return (
    <aside className="print-only vignetten-print-notice" aria-hidden="true">
      <h1>Diese Seite ist nicht zum Ausdrucken vorgesehen.</h1>
      <p>
        Diese Fallbeispiele sind ausschliesslich für die digitale Ansicht gedacht. Sie stehen in einem inhaltlichen
        Zusammenhang, der auf Papier nicht mitgeht.
      </p>
      <p>
        Für druckbare Arbeitshilfen finden Sie in der Toolbox konkrete Vorlagen (Krisenplan, Gesprächsleitfaden,
        Netzwerkkarte).
      </p>
    </aside>
  );
}

export default function VignettenPageTemplate({ hero, pageHeadingId, caseStudy, decision, navigation }) {
  return (
    <article className="ui-stack">
      <Container width="wide" className="no-print">
        <PageHero {...hero} headingId={pageHeadingId} />
      </Container>
      <VignettenPrintNotice />
      <Section spacing="tight" surface="plain" className="no-print">
        <LegalDisclaimer text="Die Trainingsfälle zeigen zugespitzte Situationen mit rechtlichen Bezügen (KESB, Melderecht). Im Arbeitsalltag gibt es häufig mehr Spielraum und Abstufungen. Die Darstellung dient der fachlichen Reflexion und ersetzt keine Rechtsberatung." />
      </Section>
      <VignettenCaseSection caseStudy={caseStudy} />
      <VignettenDecisionSection decision={decision} />
      <VignettenNavigationSection navigation={navigation} />
    </article>
  );
}
