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
            <h2 className="ui-hero__title ui-section-title">
              {sequence.titlePrefix}{' '}
              {sequence.titleAccent ? <span className="ui-hero__accent">{sequence.titleAccent}</span> : null}
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
          <div className="learning-flow-grid">
            {sequence.steps.map((step, index) => (
              <SurfaceCard key={step.title} tone={step.tone || 'default'} className="learning-flow-card">
                <div className="ui-badge ui-badge--soft">Schritt {index + 1}</div>
                {step.label ? <p className="ui-fact-card__label learning-flow-card__label">{step.label}</p> : null}
                <h3 className="ui-card__title learning-flow-card__title">{step.title}</h3>
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
    <SurfaceCard tone={module.completed ? 'soft' : 'default'} className="learning-module-card no-print">
      <div className="learning-module-card__inner">
        <div className="learning-module-card__header">
          <div className="ui-stack ui-stack--compact">
            <p className="ui-fact-card__label">{module.kicker}</p>
            <h3 className="ui-card__title">{module.title}</h3>
            {module.description ? <p className="ui-card__copy">{module.description}</p> : null}
          </div>
          <div className="learning-module-card__meta">
            {module.duration ? <span className="ui-badge">{module.duration}</span> : null}
            {module.completed ? (
              <div className="ui-badge ui-badge--soft">
                <Check size={14} /> Bearbeitet
              </div>
            ) : null}
          </div>
        </div>

        <div className="ui-note-panel">
          <p className="ui-note-panel__label">Leitidee</p>
          <p className="ui-note-panel__copy">„{module.storyboard}“</p>
        </div>

        <div className="ui-card__section--push ui-card__section--panel">
          <div className="ui-note-panel__label ui-note-panel__label--with-icon">
            <Brain size={16} /> Reflexionsfrage
          </div>
          <fieldset aria-describedby={module.result ? feedbackId : undefined}>
            <legend className="learning-module-quiz__legend">{module.quiz}</legend>
            <div className="learning-module-quiz__options">
              {module.quizOptions.map((option, idx) => {
                const isSelected = module.result?.answerIdx === idx;
                const isCorrect = idx === module.correctQuizIdx;

                return (
                  <label key={idx} className="learning-module-quiz__option">
                    <input
                      type="radio"
                      name={`${module.id}-quiz`}
                      className="ui-visually-hidden"
                      checked={isSelected}
                      onChange={() => module.onAnswer(module.id, idx, module.correctQuizIdx)}
                    />
                    <span
                      className={[
                        'ui-choice-card',
                        isSelected ? 'ui-choice-card--selected' : '',
                        isSelected ? (isCorrect ? 'ui-choice-card--correct' : 'ui-choice-card--incorrect') : '',
                      ]
                        .filter(Boolean)
                        .join(' ')}
                    >
                      <Circle size={16} className="ui-choice-card__control" />
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
              className={`ui-note-panel ui-note-panel--spaced ${module.result.isCorrect ? '' : 'ui-note-panel--muted'}`.trim()}
            >
              <p className="ui-note-panel__copy">
                {module.result.isCorrect
                  ? 'Diese Antwort passt hier fachlich besser. Das Modul gilt als bearbeitet.'
                  : 'Diese Antwort wäre hier eher nicht der erste Schritt. Sie können erneut wählen.'}
              </p>
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
            <h2 className="ui-hero__title ui-section-title">
              {modulesSection.titlePrefix}{' '}
              {modulesSection.titleAccent ? (
                <span className="ui-hero__accent">{modulesSection.titleAccent}</span>
              ) : null}
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

        <div className="learning-modules-grid">
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
