import { ChevronLeft, ChevronRight, CheckCircle2 } from 'lucide-react';
import Button from '../components/ui/Button';
import Container from '../components/ui/Container';
import Eyebrow from '../components/ui/Eyebrow';
import PageHero from '../components/ui/PageHero';
import Section from '../components/ui/Section';
import SurfaceCard from '../components/ui/SurfaceCard';

function VignettenCaseSection({ caseStudy }) {
  if (!caseStudy) return null;

  return (
    <Section spacing="tight" surface={caseStudy.surface || 'plain'} className="no-print">
      <div className="ui-stack ui-stack--loose">
        <div className="ui-split">
          <div className="ui-stack ui-stack--tight">
            {caseStudy.eyebrow ? <Eyebrow>{caseStudy.eyebrow}</Eyebrow> : null}
            <h2 className="ui-hero__title ui-section-title">
              {caseStudy.titlePrefix}{' '}
              {caseStudy.titleAccent ? <span className="ui-hero__accent">{caseStudy.titleAccent}</span> : null}
            </h2>
            <div className="ui-copy">
              <p>{caseStudy.description}</p>
            </div>
          </div>
          {caseStudy.aside ? (
            <SurfaceCard as="aside" tone={caseStudy.aside.tone || 'soft'}>
              {caseStudy.aside.label ? <p className="ui-fact-card__label">{caseStudy.aside.label}</p> : null}
              {caseStudy.aside.value ? <p className="ui-fact-card__value">{caseStudy.aside.value}</p> : null}
              {caseStudy.aside.copy ? <p className="ui-fact-card__note">{caseStudy.aside.copy}</p> : null}
            </SurfaceCard>
          ) : null}
        </div>

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
      <input type="radio" name={option.groupName} className="ui-visually-hidden" checked={isActive} onChange={onSelect} />
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
        <div className="ui-split">
          <div className="ui-stack ui-stack--tight">
            {decision.eyebrow ? <Eyebrow>{decision.eyebrow}</Eyebrow> : null}
            <h2 className="ui-hero__title ui-section-title">
              {decision.titlePrefix}{' '}
              {decision.titleAccent ? <span className="ui-hero__accent">{decision.titleAccent}</span> : null}
            </h2>
            <div className="ui-copy">
              <p>{decision.description}</p>
            </div>
          </div>
          {decision.aside ? (
            <SurfaceCard as="aside" tone={decision.aside.tone || 'default'}>
              {decision.aside.label ? <p className="ui-fact-card__label">{decision.aside.label}</p> : null}
              {decision.aside.title ? <h3 className="ui-card__title">{decision.aside.title}</h3> : null}
              {decision.aside.copy ? <p className="ui-card__copy">{decision.aside.copy}</p> : null}
            </SurfaceCard>
          ) : null}
        </div>

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
            <Button
              type="button"
              onClick={navigation.onNext}
              disabled={navigation.disableNext}
              variant="primary"
            >
              {navigation.nextLabel} <ChevronRight size={16} />
            </Button>
          </div>
        </div>
      </SurfaceCard>
    </Section>
  );
}

export default function VignettenPageTemplate({ hero, pageHeadingId, caseStudy, decision, navigation }) {
  return (
    <article className="ui-stack">
      <Container width="wide">
        <PageHero {...hero} headingId={pageHeadingId} />
      </Container>
      <VignettenCaseSection caseStudy={caseStudy} />
      <VignettenDecisionSection decision={decision} />
      <VignettenNavigationSection navigation={navigation} />
    </article>
  );
}
