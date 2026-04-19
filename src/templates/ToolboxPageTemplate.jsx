import { ChevronRight } from 'lucide-react';
import Container from '../components/ui/Container';
import Eyebrow from '../components/ui/Eyebrow';
import Button from '../components/ui/Button';
import LegalDisclaimer from '../components/ui/LegalDisclaimer';
import PageHero from '../components/ui/PageHero';
import Section from '../components/ui/Section';
import SectionHeader from '../components/ui/SectionHeader';
import SurfaceCard from '../components/ui/SurfaceCard';
import ClosingSection from '../components/closing/ClosingSection';

function AssessmentPanel({ assessment, scoreStatusId }) {
  if (!assessment) return null;

  return (
    <Section spacing="tight" surface="subtle" className="no-print">
      <div className="ui-stack ui-stack--loose">
        <div className="ui-split">
          <div className="ui-stack ui-stack--tight">
            <Eyebrow>{assessment.eyebrow}</Eyebrow>
            <h2 className="ui-hero__title ui-section-title">{assessment.title}</h2>
            <div className="ui-copy">
              <p>{assessment.description}</p>
              {assessment.note ? <p>{assessment.note}</p> : null}
            </div>
          </div>
          {assessment.scoreAside ? (
            <SurfaceCard as="aside" tone="soft">
              {assessment.scoreAside.label ? (
                <p className="ui-fact-card__label">{assessment.scoreAside.label}</p>
              ) : null}
              {assessment.scoreAside.value ? <p className="ui-toolbox-score">{assessment.scoreAside.value}</p> : null}
              {assessment.scoreAside.badge ? (
                <div
                  className={`ui-toolbox-status-badge ui-toolbox-status-badge--spaced ${assessment.scoreAside.badgeClassName || ''}`}
                >
                  {assessment.scoreAside.badge}
                </div>
              ) : null}
              {assessment.scoreAside.liveText ? (
                <p
                  id={scoreStatusId}
                  role="status"
                  aria-live="polite"
                  aria-atomic="true"
                  className="ui-visually-hidden"
                >
                  {assessment.scoreAside.liveText}
                </p>
              ) : null}
              {assessment.scoreAside.action ? (
                <Button
                  variant="subtle"
                  className="ui-editorial-card__action"
                  onClick={assessment.scoreAside.action.onClick}
                  aria-describedby={scoreStatusId}
                >
                  {assessment.scoreAside.action.icon}
                  {assessment.scoreAside.action.label}
                </Button>
              ) : null}
            </SurfaceCard>
          ) : null}
        </div>

        {assessment.items?.length ? (
          <div className="ui-card--outline ui-toolbox-panel">
            <fieldset className="ui-toolbox-checklist" aria-describedby={scoreStatusId}>
              <legend className="ui-form-legend">{assessment.itemsLabel}</legend>
              <div className="ui-card-grid ui-card-grid--2">
                {assessment.items.map((item) => {
                  const checked = Boolean(item.checked);

                  return (
                    <label
                      key={item.id}
                      className={`ui-card--interactive ui-toolbox-check ${checked ? 'ui-toolbox-check--checked' : ''}`}
                    >
                      <input
                        type="checkbox"
                        className="ui-visually-hidden"
                        checked={checked}
                        onChange={item.onChange}
                      />
                      <div className="ui-toolbox-check__box">{item.checkIcon}</div>
                      <div className="ui-toolbox-check__content">
                        <span className="ui-toolbox-check__label">{item.label}</span>
                        {item.meta ? <span className="ui-toolbox-check__meta">{item.meta}</span> : null}
                      </div>
                    </label>
                  );
                })}
              </div>
            </fieldset>
          </div>
        ) : null}
      </div>
    </Section>
  );
}

function PathwaySection({ pathway }) {
  if (!pathway) return null;

  return (
    <Section spacing="tight" surface="subtle" className="no-print">
      <div className="ui-stack ui-stack--loose">
        <SectionHeader
          eyebrow={pathway.eyebrow}
          titlePrefix={pathway.titlePrefix}
          titleAccent={pathway.titleAccent}
          description={pathway.description}
          aside={pathway.aside}
          asideTone="default"
        />

        {pathway.steps?.length ? (
          <div className="ui-card--outline ui-toolbox-panel">
            <div className="ui-toolbox-step-grid">
              {pathway.steps.map((step, index) => (
                <div key={step.label} className="ui-toolbox-step">
                  <SurfaceCard tone="soft" className="ui-card--full-height">
                    <div className="ui-toolbox-step__header">
                      <div className="ui-chip ui-chip--active ui-toolbox-step__chip">Schritt {index + 1}</div>
                      <div className="ui-toolbox-kicker ui-toolbox-step__label">{step.label}</div>
                    </div>
                    <div className="ui-toolbox-step__divider" />
                    <div className="ui-toolbox-kicker ui-toolbox-step__window">Arbeitsfenster</div>
                    <h3 className="ui-card__title ui-toolbox-step__title">{step.title}</h3>
                    <p className="ui-card__copy">{step.desc}</p>
                  </SurfaceCard>
                  {index < pathway.steps.length - 1 ? (
                    <>
                      <div className="ui-toolbox-step__connector" />
                      <div className="ui-toolbox-step__connector-mobile">
                        <ChevronRight size={16} aria-hidden="true" />
                      </div>
                    </>
                  ) : null}
                </div>
              ))}
            </div>
            {pathway.summary ? (
              <div className="ui-note-panel ui-editorial-card__action">
                <p className="ui-note-panel__copy">{pathway.summary}</p>
              </div>
            ) : null}
          </div>
        ) : null}
      </div>
    </Section>
  );
}

function ScoreBandsSection({ scoreBands }) {
  if (!scoreBands) return null;

  return (
    <Section spacing="tight" surface="subtle" className="no-print">
      <div className="ui-stack ui-stack--loose">
        <div className="ui-stack ui-stack--tight">
          <Eyebrow>{scoreBands.eyebrow}</Eyebrow>
          <div className="ui-copy">
            <p>{scoreBands.description}</p>
          </div>
        </div>

        <div className="ui-toolbox-band-layout">
          <div className="ui-card-grid ui-card-grid--3">
            {scoreBands.items.map((band) => (
              <div key={band.label} className={`ui-toolbox-band ${band.className}`}>
                <div className="ui-toolbox-kicker">Score {band.label}</div>
                <p className="ui-card__copy">{band.title}</p>
              </div>
            ))}
          </div>
          {scoreBands.aside ? (
            <SurfaceCard as="aside" tone="default">
              {scoreBands.aside.label ? <p className="ui-fact-card__label">{scoreBands.aside.label}</p> : null}
              {scoreBands.aside.copy ? <p className="ui-card__copy">{scoreBands.aside.copy}</p> : null}
            </SurfaceCard>
          ) : null}
        </div>
      </div>
    </Section>
  );
}

function TriageSection({ triage }) {
  if (!triage) return null;

  return (
    <Section spacing="tight" surface="plain" className="no-print">
      <div className="ui-stack ui-stack--loose">
        <SectionHeader
          eyebrow={triage.eyebrow}
          titlePrefix={triage.titlePrefix}
          titleAccent={triage.titleAccent}
          description={triage.description}
          aside={triage.aside}
        />

        <div className="ui-card-grid">
          {triage.prompts.map((prompt, index) => (
            <section key={prompt.id} className="ui-toolbox-prompt">
              <div className="ui-toolbox-prompt__header">
                <div className="ui-toolbox-prompt__intro">
                  <div className="ui-toolbox-kicker">Frage {index + 1}</div>
                  <h3 className="ui-toolbox-question-title">{prompt.question}</h3>
                </div>
                <div className="ui-button-row ui-toolbox-prompt__actions">
                  <Button
                    variant={prompt.currentAnswer === 'yes' ? 'primary' : 'secondary'}
                    onClick={() => prompt.onAnswer('yes')}
                    aria-pressed={prompt.currentAnswer === 'yes'}
                  >
                    Ja
                  </Button>
                  <Button
                    variant={prompt.currentAnswer === 'no' ? 'primary' : 'secondary'}
                    onClick={() => prompt.onAnswer('no')}
                    aria-pressed={prompt.currentAnswer === 'no'}
                  >
                    Nein
                  </Button>
                </div>
              </div>

              {prompt.recommendation ? (
                <div role="status" aria-live="polite" className={`ui-toolbox-feedback ui-editorial-card__action ${prompt.recommendation.className}`}>
                  <div className="ui-note-panel__label">Einordnung</div>
                  <h4 className="ui-toolbox-feedback__title">{prompt.recommendation.title}</h4>
                  <p className="ui-toolbox-feedback__copy">{prompt.recommendation.text}</p>
                  <Button
                    variant="secondary"
                    className="ui-editorial-card__action"
                    onClick={() => prompt.recommendation.onJump(prompt.recommendation.target)}
                  >
                    {prompt.recommendation.targetLabel}
                    <ChevronRight size={14} aria-hidden="true" />
                  </Button>
                </div>
              ) : null}
            </section>
          ))}
        </div>

        {triage.status ? (
          <SurfaceCard tone="soft">
            {triage.status.label ? <p className="ui-fact-card__label">{triage.status.label}</p> : null}
            {triage.status.copy ? <p className="ui-card__copy">{triage.status.copy}</p> : null}
          </SurfaceCard>
        ) : null}

        {triage.primaryPriority ? (
          <div className={`ui-card--outline ui-toolbox-priority ${triage.primaryPriority.className}`}>
            <div className="ui-note-panel__label">Aktuell wichtigste Spur</div>
            <h3 className="ui-toolbox-priority__title">{triage.primaryPriority.title}</h3>
            <p className="ui-toolbox-priority__copy">{triage.primaryPriority.text}</p>
            <Button
              variant="secondary"
              className="ui-editorial-card__action"
              onClick={() => triage.primaryPriority.onJump(triage.primaryPriority.target)}
            >
              {triage.primaryPriority.targetLabel}
              <ChevronRight size={14} aria-hidden="true" />
            </Button>
          </div>
        ) : null}
      </div>
    </Section>
  );
}

function PracticeBlocksSection({ practice }) {
  if (!practice) return null;

  return (
    <Section spacing="tight" surface="subtle" className="no-print">
      <div className="ui-stack ui-stack--loose">
        <SectionHeader
          eyebrow={practice.eyebrow}
          titlePrefix={practice.titlePrefix}
          titleAccent={practice.titleAccent}
          description={practice.description}
          aside={practice.aside}
          asideTone="default"
        />

        <div className="ui-chip-row" role="group" aria-label={practice.filterAriaLabel}>
          {practice.filters.map((filter) => (
            <Button
              key={filter.id}
              variant={filter.active ? 'primary' : 'secondary'}
              onClick={filter.onSelect}
              aria-pressed={filter.active}
              className="ui-button--compact"
            >
              {filter.label}
            </Button>
          ))}
        </div>

        <div className="ui-card-grid ui-card-grid--2">
          {practice.items.map((item) => (
            <SurfaceCard key={item.title} tone="default">
              <div className="ui-chip-row">
                {item.tags.map((tag) => (
                  <span key={tag} className="ui-toolbox-tag">
                    {tag}
                  </span>
                ))}
              </div>
              <h3 className="ui-card__title ui-editorial-card__action">{item.title}</h3>
              <p className="ui-card__copy">{item.text}</p>
              <Button
                variant="secondary"
                className="ui-editorial-card__action"
                onClick={() => item.onJump(item.target)}
              >
                {item.targetLabel}
                <ChevronRight size={14} aria-hidden="true" />
              </Button>
            </SurfaceCard>
          ))}
        </div>
      </div>
    </Section>
  );
}

function ClusterSection({ cluster }) {
  return (
    <Section
      key={cluster.id}
      spacing="tight"
      surface={cluster.surface || 'plain'}
      className={cluster.className || 'no-print'}
      id={cluster.id}
      ref={cluster.sectionRef}
      tabIndex={cluster.tabIndex ?? -1}
    >
      <div className="ui-stack ui-stack--loose">
        <SectionHeader
          eyebrow={cluster.eyebrow}
          title={cluster.title}
          titlePrefix={cluster.titlePrefix}
          titleAccent={cluster.titleAccent}
          description={!Array.isArray(cluster.description) ? cluster.description : undefined}
          paragraphs={Array.isArray(cluster.description) ? cluster.description : undefined}
          aside={cluster.aside}
          asideTone="accent"
        />

        {cluster.actions?.length ? (
          <div className="ui-button-row">
            {cluster.actions.map((action) => (
              <Button
                key={action.label}
                variant={action.variant || 'secondary'}
                onClick={action.onClick}
                href={action.href}
                target={action.target}
                rel={action.rel}
              >
                {action.label}
                {action.icon}
              </Button>
            ))}
          </div>
        ) : null}

        {cluster.gridCards?.length ? (
          <div className={cluster.gridClassName || 'ui-fact-grid'}>
            {cluster.gridCards.map((card) => (
              <SurfaceCard key={card.title} tone={card.tone || 'default'}>
                {card.label ? <p className="ui-fact-card__label">{card.label}</p> : null}
                <h3 className="ui-card__title">{card.title}</h3>
                {card.copy ? <p className="ui-card__copy">{card.copy}</p> : null}
              </SurfaceCard>
            ))}
          </div>
        ) : null}

        {cluster.listCards?.length ? (
          <div className="ui-card-grid ui-card-grid--2">
            {cluster.listCards.map((item) => (
              <div
                key={item.title || item.text}
                className={`ui-card--outline ui-toolbox-list-card ${item.className || 'ui-toolbox-list-card--default'}`}
              >
                <div className="ui-bullet-panel__item">
                  {item.icon ? (
                    <span className="ui-bullet-panel__marker ui-toolbox-inline-icon">{item.icon}</span>
                  ) : null}
                  <div>
                    {item.title ? <h3 className="ui-card__title">{item.title}</h3> : null}
                    {item.text ? (
                      <p className={item.title ? 'ui-card__copy' : 'ui-bullet-panel__copy'}>{item.text}</p>
                    ) : null}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : null}

        {cluster.disclosureItems?.length ? (
          <div className="ui-card-grid">
            {cluster.disclosureItems.map((item) => (
              <details
                key={item.title}
                className={`ui-toolbox-disclosure-group ui-card--outline ui-card--interactive ui-toolbox-disclosure ${item.className || ''}`}
              >
                <summary className="ui-toolbox-disclosure__summary" aria-label={item.summaryAriaLabel || item.title}>
                  <div className="ui-bullet-panel__item">
                    {item.icon ? (
                      <span className="ui-bullet-panel__marker ui-toolbox-inline-icon">{item.icon}</span>
                    ) : null}
                    <div>
                      <span className="ui-card__title ui-display-block">{item.title}</span>
                      {item.meta ? <p className="ui-fact-card__label ui-editorial-card__action">{item.meta}</p> : null}
                    </div>
                  </div>
                  <span className="ui-toolbox-disclosure__toggle" aria-hidden="true">+</span>
                </summary>
                <div className="ui-copy ui-toolbox-disclosure__content">
                  {Array.isArray(item.content) ? (
                    item.content.map((paragraph) => <p key={paragraph}>{paragraph}</p>)
                  ) : (
                    <p>{item.content}</p>
                  )}
                  {item.href ? (
                    <Button
                      variant="secondary"
                      className="ui-editorial-card__action"
                      href={item.href}
                      target={item.target}
                      rel={item.rel}
                    >
                      {item.actionLabel || 'Mehr anzeigen'}
                      {item.actionIcon}
                    </Button>
                  ) : null}
                </div>
              </details>
            ))}
          </div>
        ) : null}

        {cluster.templateFields?.length ? (
          <div className="ui-card--outline ui-toolbox-template">
            <div className="ui-toolbox-template__header">
              <div>
                {cluster.templateMeta?.label ? (
                  <p className="ui-toolbox-template__label">{cluster.templateMeta.label}</p>
                ) : null}
                {cluster.templateMeta?.title ? (
                  <h3 className="ui-card__title ui-toolbox-template__title">{cluster.templateMeta.title}</h3>
                ) : null}
              </div>
              {cluster.templateMeta?.meta ? (
                <p className="ui-toolbox-template__meta">{cluster.templateMeta.meta}</p>
              ) : null}
            </div>
            <div className="ui-toolbox-template__grid">
              {cluster.templateFields.map((field) => (
                <section key={field.title} className="ui-toolbox-template__field">
                  <p className="ui-toolbox-template__label">{field.title}</p>
                  <p className="ui-toolbox-template__hint">{field.hint}</p>
                  <div className="ui-toolbox-template__lines">
                    <div className="ui-toolbox-template__line" />
                    <div className="ui-toolbox-template__line" />
                    <div className="ui-toolbox-template__line" />
                  </div>
                </section>
              ))}
            </div>
            {cluster.templateMeta?.note ? (
              <div className="ui-note-panel ui-editorial-card__action">
                <p className="ui-note-panel__copy">{cluster.templateMeta.note}</p>
              </div>
            ) : null}
          </div>
        ) : null}

        {cluster.legalDisclaimer ? (
          <LegalDisclaimer showCantonalNote={cluster.legalDisclaimerCantonal} />
        ) : null}
      </div>
    </Section>
  );
}

function ResourcesSection({ closingSection }) {
  if (!closingSection) return null;

  return (
    <ClosingSection
      section={{
        ...closingSection,
        headingTransform: 'uppercase',
        headingLetterSpacing: '0.12em',
      }}
      sectionId="toolbox-materials"
      surface="plain"
    />
  );
}

export default function ToolboxPageTemplate({
  hero,
  pageHeadingId,
  assessment,
  pathway,
  scoreBands,
  triage,
  practice,
  clusters = [],
  closingSection,
  scoreStatusId,
}) {
  return (
    <div className="ui-stack">
      <div className="ui-stack">
        <Container width="wide">
          {hero?.actions?.length ? (
            <Section spacing="tight" surface="plain" className="no-print">
              <div className="ui-card--outline ui-toolbox-quick-access">
                <div className="ui-stack ui-stack--tight">
                  <Eyebrow>Schnellzugriff</Eyebrow>
                  <h2 className="ui-hero__title ui-section-title--compact">
                    Krisenplan und Arbeitsansicht
                  </h2>
                  <p className="ui-card__copy">
                    Die wichtigsten Arbeitsaktionen der Toolbox direkt erreichbar — auch für Tastatur- und
                    Screenreader-Nutzung.
                  </p>
                </div>
                <div
                  className="ui-button-row ui-toolbox-quick-access__actions"
                  role="group"
                  aria-label="Primäre Toolbox-Aktionen"
                >
                  {hero.actions.map((action) => (
                    <Button
                      key={`quick-${action.label}`}
                      as={action.href ? 'a' : 'button'}
                      href={action.href}
                      onClick={action.onClick}
                      variant={action.variant}
                      target={action.target}
                      rel={action.rel}
                      aria-label={action.ariaLabel}
                    >
                      {action.label}
                    </Button>
                  ))}
                </div>
              </div>
            </Section>
          ) : null}
          <PageHero {...hero} headingId={pageHeadingId} />
        </Container>
        <AssessmentPanel assessment={assessment} scoreStatusId={scoreStatusId} />
        <PathwaySection pathway={pathway} />
        <ScoreBandsSection scoreBands={scoreBands} />
        <TriageSection triage={triage} />
        <PracticeBlocksSection practice={practice} />
        {clusters.map((cluster) => (
          <ClusterSection key={cluster.id} cluster={cluster} />
        ))}
      </div>
      <ResourcesSection closingSection={closingSection} />
    </div>
  );
}
