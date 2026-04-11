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
          <div className="flex flex-wrap items-start justify-between gap-4 border-b border-[var(--border-subtle)] pb-6">
            <div className="ui-stack ui-stack--compact">
              {caseStudy.statusLabel ? <p className="ui-fact-card__label">{caseStudy.statusLabel}</p> : null}
              <h3 className="ui-card__title">{caseStudy.title}</h3>
            </div>
            {caseStudy.badge ? <span className="ui-badge">{caseStudy.badge}</span> : null}
          </div>

          <div className="mt-6 ui-copy">
            <p>{caseStudy.body}</p>
          </div>
        </SurfaceCard>
      </div>
    </Section>
  );
}

function DecisionOption({ option, index, isActive, onSelect }) {
  const toneClass = isActive
    ? option.isCorrect
      ? 'border-[var(--accent-primary-strong)] bg-[var(--surface-panel-strong)] text-[var(--text-inverse)] shadow-sm'
      : 'border-[var(--border-default)] bg-[color-mix(in_srgb,var(--surface-muted)_72%,white_28%)] text-[var(--text-primary)]'
    : 'border-[var(--border-default)] bg-[var(--surface-app)] text-[var(--text-primary)] hover:border-[color-mix(in_srgb,var(--accent-primary)_24%,white_76%)] hover:bg-[var(--surface-note)]';

  return (
    <label className="block cursor-pointer">
      <input type="radio" name={option.groupName} className="sr-only" checked={isActive} onChange={onSelect} />
      <span className={`ui-card--interactive block rounded-[1.5rem] border px-5 py-5 text-left transition-all ${toneClass}`}>
        <span className="flex items-start justify-between gap-4">
          <span className="ui-stack ui-stack--compact">
            <span className="ui-note-panel__label">Option {index + 1}</span>
            <span className="text-base font-black leading-snug">{option.label}</span>
          </span>
          {isActive ? <CheckCircle2 size={18} className="shrink-0 opacity-90" aria-hidden="true" /> : null}
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
            <legend className="mb-6 text-sm font-bold leading-relaxed text-[var(--text-primary)]">{decision.question}</legend>
            <div className="grid gap-4 xl:grid-cols-2">
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
              className={`ui-note-panel mt-6 ${decision.feedback.tone === 'success' ? '' : 'ui-note-panel--muted'}`.trim()}
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
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="ui-stack ui-stack--compact">
            {navigation.eyebrow ? <Eyebrow>{navigation.eyebrow}</Eyebrow> : null}
            <h2 className="ui-card__title">{navigation.title}</h2>
            <p className="ui-card__copy">{navigation.description}</p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
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
