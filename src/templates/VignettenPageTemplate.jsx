import { ChevronLeft, ChevronRight, CheckCircle2 } from 'lucide-react';
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
            <h2 className="ui-hero__title" style={{ fontSize: 'clamp(1.85rem, 3vw, 3rem)' }}>
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
            <div className="ui-stack ui-stack--tight" style={{ gap: '0.5rem' }}>
              {caseStudy.statusLabel ? <p className="ui-fact-card__label">{caseStudy.statusLabel}</p> : null}
              <h3 className="ui-card__title">{caseStudy.title}</h3>
            </div>
            {caseStudy.badge ? (
              <span className="rounded-full border border-[var(--border-default)] bg-[var(--surface-panel)] px-4 py-2 text-[0.72rem] font-black uppercase tracking-[0.18em] text-[var(--text-secondary)]">
                {caseStudy.badge}
              </span>
            ) : null}
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
      ? 'border-[var(--accent-primary-strong)] bg-[var(--accent-primary-strong)] text-white shadow-sm'
      : 'border-amber-300 bg-amber-50 text-amber-900'
    : 'border-[var(--border-default)] bg-white text-[var(--text-primary)] hover:border-[color-mix(in_srgb,var(--accent-primary)_24%,white_76%)] hover:bg-[var(--surface-note)]';

  return (
    <label className="block cursor-pointer">
      <input type="radio" name={option.groupName} className="sr-only" checked={isActive} onChange={onSelect} />
      <span className={`block rounded-[1.5rem] border px-5 py-5 text-left transition-all ${toneClass}`}>
        <span className="flex items-start justify-between gap-4">
          <span className="ui-stack ui-stack--tight" style={{ gap: '0.45rem' }}>
            <span className="text-[0.65rem] font-black uppercase tracking-[0.18em] opacity-70">Option {index + 1}</span>
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
            <h2 className="ui-hero__title" style={{ fontSize: 'clamp(1.75rem, 2.7vw, 2.7rem)' }}>
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
              className={`mt-6 rounded-[1.5rem] border px-5 py-5 text-sm leading-relaxed ${
                decision.feedback.tone === 'success'
                  ? 'border-emerald-200 bg-emerald-50 text-emerald-900'
                  : 'border-amber-200 bg-amber-50 text-amber-900'
              }`}
            >
              <div className="mb-2 text-[0.65rem] font-black uppercase tracking-[0.18em] opacity-70">Rückmeldung</div>
              <p className="m-0 font-medium">{decision.feedback.copy}</p>
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
          <div className="ui-stack ui-stack--tight" style={{ gap: '0.45rem' }}>
            {navigation.eyebrow ? <Eyebrow>{navigation.eyebrow}</Eyebrow> : null}
            <h2 className="ui-card__title">{navigation.title}</h2>
            <p className="ui-card__copy">{navigation.description}</p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={navigation.onPrevious}
              disabled={navigation.disablePrevious}
              className="inline-flex items-center gap-2 rounded-[999px] border border-[var(--border-default)] bg-white px-5 py-3 text-sm font-black text-[var(--text-primary)] transition-colors hover:bg-[var(--surface-note)] disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ChevronLeft size={16} /> {navigation.previousLabel}
            </button>
            <button
              type="button"
              onClick={navigation.onNext}
              disabled={navigation.disableNext}
              className="inline-flex items-center gap-2 rounded-[999px] bg-[var(--text-primary)] px-5 py-3 text-sm font-black text-white transition-opacity disabled:cursor-not-allowed disabled:opacity-40"
            >
              {navigation.nextLabel} <ChevronRight size={16} />
            </button>
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
