import { Brain, Check, Circle } from 'lucide-react';
import Container from '../components/ui/Container';
import Eyebrow from '../components/ui/Eyebrow';
import PageHero from '../components/ui/PageHero';
import Section from '../components/ui/Section';
import SurfaceCard from '../components/ui/SurfaceCard';

function LearningFlowSection({ sequence }) {
  if (!sequence) return null;

  return (
    <Section spacing="tight" surface={sequence.surface || 'subtle'} className="no-print">
      <div className="ui-stack ui-stack--loose">
        <div className="ui-split">
          <div className="ui-stack ui-stack--tight">
            {sequence.eyebrow ? <Eyebrow>{sequence.eyebrow}</Eyebrow> : null}
            <h2 className="ui-hero__title" style={{ fontSize: 'clamp(1.85rem, 3vw, 3rem)' }}>
              {sequence.titlePrefix} {sequence.titleAccent ? <span className="ui-hero__accent">{sequence.titleAccent}</span> : null}
            </h2>
            <div className="ui-copy">
              <p>{sequence.description}</p>
            </div>
          </div>
          {sequence.aside ? (
            <SurfaceCard as="aside" tone={sequence.aside.tone || 'soft'}>
              {sequence.aside.label ? <p className="ui-fact-card__label">{sequence.aside.label}</p> : null}
              {sequence.aside.title ? <h3 className="ui-card__title">{sequence.aside.title}</h3> : null}
              {sequence.aside.copy ? <p className="ui-card__copy">{sequence.aside.copy}</p> : null}
            </SurfaceCard>
          ) : null}
        </div>

        {sequence.steps?.length ? (
          <div className="grid gap-4 lg:grid-cols-3">
            {sequence.steps.map((step, index) => (
              <SurfaceCard key={step.title} tone={step.tone || 'default'} className="h-full">
                <div className="inline-flex rounded-full border border-[color-mix(in_srgb,var(--accent-primary)_18%,white_82%)] bg-[var(--surface-note)] px-3 py-1.5 text-[0.65rem] font-black uppercase tracking-[0.18em] text-[var(--accent-primary-strong)]">
                  Schritt {index + 1}
                </div>
                {step.label ? <p className="ui-fact-card__label mt-4">{step.label}</p> : null}
                <h3 className="ui-card__title mt-3">{step.title}</h3>
                <p className="ui-card__copy">{step.copy}</p>
              </SurfaceCard>
            ))}
          </div>
        ) : null}
      </div>
    </Section>
  );
}

function ModuleCard({ module }) {
  const feedbackId = `${module.id}-quiz-feedback`;

  return (
    <SurfaceCard tone={module.completed ? 'soft' : 'default'} className="h-full no-print">
      <div className="flex h-full flex-col gap-6">
        <div className="flex flex-wrap items-start justify-between gap-4 border-b border-[var(--border-subtle)] pb-6">
          <div className="ui-stack ui-stack--tight" style={{ gap: '0.5rem' }}>
            <p className="ui-fact-card__label">{module.kicker}</p>
            <h3 className="ui-card__title">{module.title}</h3>
            {module.description ? <p className="ui-card__copy">{module.description}</p> : null}
          </div>
          <div className="flex flex-wrap items-center gap-3">
            {module.duration ? (
              <span className="rounded-full border border-[var(--border-default)] bg-[var(--surface-panel)] px-4 py-2 text-[0.72rem] font-black uppercase tracking-[0.18em] text-[var(--text-secondary)]">
                {module.duration}
              </span>
            ) : null}
            {module.completed ? (
              <div className="inline-flex items-center gap-2 rounded-full border border-[color-mix(in_srgb,var(--accent-primary)_24%,white_76%)] bg-[var(--surface-note)] px-4 py-2 text-[0.72rem] font-black uppercase tracking-[0.18em] text-[var(--accent-primary-strong)]">
                <Check size={14} /> Bearbeitet
              </div>
            ) : null}
          </div>
        </div>

        <div className="ui-stack ui-stack--tight" style={{ gap: '0.75rem' }}>
          <div className="text-[0.65rem] font-black uppercase tracking-[0.18em] text-[var(--text-muted)]">Leitidee</div>
          <p className="m-0 border-l-2 border-[color-mix(in_srgb,var(--accent-primary)_35%,white_65%)] pl-4 text-[var(--text-secondary)] leading-relaxed">
            „{module.storyboard}“
          </p>
        </div>

        <div className="mt-auto rounded-[1.75rem] border border-[var(--border-default)] bg-[var(--surface-panel)] p-5">
          <div className="mb-4 flex items-center gap-3 text-[0.65rem] font-black uppercase tracking-[0.18em] text-[var(--text-muted)]">
            <Brain size={16} className="text-[var(--accent-primary-strong)]" /> Reflexionsfrage
          </div>
          <fieldset aria-describedby={module.result ? feedbackId : undefined}>
            <legend className="mb-5 text-sm font-bold leading-relaxed text-[var(--text-primary)]">{module.quiz}</legend>
            <div className="grid gap-3">
              {module.quizOptions.map((option, idx) => {
                const isSelected = module.result?.answerIdx === idx;
                const isCorrect = idx === module.correctQuizIdx;

                return (
                  <label key={option} className="block cursor-pointer">
                    <input
                      type="radio"
                      name={`${module.id}-quiz`}
                      className="sr-only"
                      checked={isSelected}
                      onChange={() => module.onAnswer(module.id, idx, module.correctQuizIdx)}
                    />
                    <span
                      className={`flex items-center gap-3 rounded-[1.25rem] border px-4 py-4 text-left text-sm font-bold transition-all ${
                        isSelected
                          ? isCorrect
                            ? 'border-[var(--accent-primary-strong)] bg-[var(--accent-primary-strong)] text-white shadow-sm'
                            : 'border-red-200 bg-red-50 text-red-700'
                          : 'border-[var(--border-default)] bg-white text-[var(--text-primary)] hover:border-[color-mix(in_srgb,var(--accent-primary)_24%,white_76%)] hover:bg-[var(--surface-note)]'
                      }`}
                    >
                      <Circle size={16} className={isSelected ? 'opacity-80' : 'text-[var(--text-muted)]'} />
                      <span>{option}</span>
                    </span>
                  </label>
                );
              })}
            </div>
          </fieldset>
          {module.result ? (
            <div
              id={feedbackId}
              role="status"
              aria-live="polite"
              aria-atomic="true"
              className={`mt-5 rounded-[1.25rem] px-4 py-4 text-sm font-medium ${
                module.result.isCorrect ? 'bg-emerald-50 text-emerald-800' : 'bg-red-50 text-red-700'
              }`}
            >
              {module.result.isCorrect
                ? 'Diese Antwort passt hier fachlich besser. Das Modul gilt als bearbeitet.'
                : 'Diese Antwort wäre hier eher nicht der erste Schritt. Sie können erneut wählen.'}
            </div>
          ) : null}
        </div>
      </div>
    </SurfaceCard>
  );
}

function LearningModulesSection({ modulesSection }) {
  if (!modulesSection) return null;

  return (
    <Section spacing="tight" surface={modulesSection.surface || 'plain'} className="no-print">
      <div className="ui-stack ui-stack--loose">
        <div className="ui-split">
          <div className="ui-stack ui-stack--tight">
            {modulesSection.eyebrow ? <Eyebrow>{modulesSection.eyebrow}</Eyebrow> : null}
            <h2 className="ui-hero__title" style={{ fontSize: 'clamp(1.85rem, 3vw, 3rem)' }}>
              {modulesSection.titlePrefix}{' '}
              {modulesSection.titleAccent ? <span className="ui-hero__accent">{modulesSection.titleAccent}</span> : null}
            </h2>
            <div className="ui-copy">
              <p>{modulesSection.description}</p>
            </div>
          </div>
          {modulesSection.aside ? (
            <SurfaceCard as="aside" tone={modulesSection.aside.tone || 'default'}>
              {modulesSection.aside.label ? <p className="ui-fact-card__label">{modulesSection.aside.label}</p> : null}
              {modulesSection.aside.value ? <p className="ui-fact-card__value">{modulesSection.aside.value}</p> : null}
              {modulesSection.aside.copy ? <p className="ui-fact-card__note">{modulesSection.aside.copy}</p> : null}
            </SurfaceCard>
          ) : null}
        </div>

        <div className="grid gap-4 xl:grid-cols-2">
          {modulesSection.items.map((module) => (
            <ModuleCard key={module.id} module={module} />
          ))}
        </div>
      </div>
    </Section>
  );
}

export default function LearningPageTemplate({ hero, pageHeadingId, sequence, modulesSection }) {
  return (
    <article className="ui-stack">
      <Container width="wide">
        <PageHero {...hero} headingId={pageHeadingId} />
      </Container>
      <LearningFlowSection sequence={sequence} />
      <LearningModulesSection modulesSection={modulesSection} />
    </article>
  );
}
