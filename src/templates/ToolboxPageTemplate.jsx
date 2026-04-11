import { ChevronRight } from 'lucide-react';
import Container from '../components/ui/Container';
import Eyebrow from '../components/ui/Eyebrow';
import Button from '../components/ui/Button';
import PageHero from '../components/ui/PageHero';
import Section from '../components/ui/Section';
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
            <h2 className="ui-hero__title ui-section-title">
              {assessment.title}
            </h2>
            <div className="ui-copy">
              <p>{assessment.description}</p>
              {assessment.note ? <p>{assessment.note}</p> : null}
            </div>
          </div>
          {assessment.scoreAside ? (
            <SurfaceCard as="aside" tone="soft">
              {assessment.scoreAside.label ? <p className="ui-fact-card__label">{assessment.scoreAside.label}</p> : null}
              {assessment.scoreAside.value ? (
                <p className="ui-toolbox-score">{assessment.scoreAside.value}</p>
              ) : null}
              {assessment.scoreAside.badge ? (
                <div className={`ui-toolbox-status-badge mt-4 ${assessment.scoreAside.badgeClassName || ''}`}>
                  {assessment.scoreAside.badge}
                </div>
              ) : null}
              {assessment.scoreAside.liveText ? (
                <p id={scoreStatusId} role="status" aria-live="polite" aria-atomic="true" className="sr-only">
                  {assessment.scoreAside.liveText}
                </p>
              ) : null}
              {assessment.scoreAside.action ? (
                <Button
                  variant="subtle"
                  className="mt-5"
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
              <legend className="ui-fact-card__label mb-5">{assessment.itemsLabel}</legend>
              <div className="grid gap-4 md:grid-cols-2">
                {assessment.items.map((item) => {
                  const checked = Boolean(item.checked);

                  return (
                    <label
                      key={item.id}
                      className={`ui-card--interactive ui-toolbox-check ${checked ? 'ui-toolbox-check--checked' : ''}`}
                    >
                      <input type="checkbox" className="sr-only" checked={checked} onChange={item.onChange} />
                      <div
                        className="ui-toolbox-check__box"
                      >
                        {item.checkIcon}
                      </div>
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
        <div className="ui-split">
          <div className="ui-stack ui-stack--tight">
            <Eyebrow>{pathway.eyebrow}</Eyebrow>
            <h2 className="ui-hero__title ui-section-title">
              {pathway.titlePrefix} <span className="ui-hero__accent">{pathway.titleAccent}</span>
            </h2>
            <div className="ui-copy">
              <p>{pathway.description}</p>
            </div>
          </div>
          {pathway.aside ? (
            <SurfaceCard as="aside" tone="default">
              {pathway.aside.label ? <p className="ui-fact-card__label">{pathway.aside.label}</p> : null}
              {pathway.aside.title ? <h3 className="ui-card__title">{pathway.aside.title}</h3> : null}
              {pathway.aside.copy ? <p className="ui-card__copy">{pathway.aside.copy}</p> : null}
              {pathway.aside.note ? <p className="ui-card__copy">{pathway.aside.note}</p> : null}
            </SurfaceCard>
          ) : null}
        </div>

        {pathway.steps?.length ? (
          <div className="ui-card--outline ui-toolbox-panel">
            <div className="ui-toolbox-step-grid">
              {pathway.steps.map((step, index) => (
                <div key={step.label} className="ui-toolbox-step">
                  <SurfaceCard tone="soft" className="h-full">
                    <div className="ui-toolbox-step__header">
                      <div className="ui-chip ui-chip--active ui-toolbox-step__chip">
                        Schritt {index + 1}
                      </div>
                      <div className="ui-toolbox-kicker ui-toolbox-step__label">{step.label}</div>
                    </div>
                    <div className="ui-toolbox-step__divider" />
                    <div className="ui-toolbox-kicker ui-toolbox-step__window">Arbeitsfenster</div>
                    <h3 className="ui-card__title mt-3">{step.title}</h3>
                    <p className="ui-card__copy">{step.desc}</p>
                  </SurfaceCard>
                  {index < pathway.steps.length - 1 ? (
                    <>
                      <div className="ui-toolbox-step__connector" />
                      <div className="ui-toolbox-step__connector-mobile">
                        <ChevronRight size={16} />
                      </div>
                    </>
                  ) : null}
                </div>
              ))}
            </div>
            {pathway.summary ? (
              <div className="ui-toolbox-note mt-6">
                <p>{pathway.summary}</p>
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

        <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_18rem] lg:items-start">
          <div className="grid gap-4 md:grid-cols-3">
            {scoreBands.items.map((band) => (
              <div key={band.label} className={`ui-toolbox-band ${band.className}`}>
                <div className="ui-toolbox-kicker" style={{ opacity: 0.8 }}>Score {band.label}</div>
                <p className="mt-3 text-sm font-medium leading-relaxed">{band.title}</p>
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
        <div className="ui-split">
          <div className="ui-stack ui-stack--tight">
            <Eyebrow>{triage.eyebrow}</Eyebrow>
            <h2 className="ui-hero__title ui-section-title">
              {triage.titlePrefix} <span className="ui-hero__accent">{triage.titleAccent}</span>
            </h2>
            <div className="ui-copy">
              <p>{triage.description}</p>
            </div>
          </div>
          {triage.aside ? (
            <SurfaceCard as="aside" tone="soft">
              {triage.aside.label ? <p className="ui-fact-card__label">{triage.aside.label}</p> : null}
              {triage.aside.copy ? <p className="ui-card__copy">{triage.aside.copy}</p> : null}
            </SurfaceCard>
          ) : null}
        </div>

        <div className="grid gap-4">
          {triage.prompts.map((prompt, index) => (
            <section key={prompt.id} className="ui-toolbox-prompt">
              <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                <div className="max-w-3xl">
                  <div className="ui-toolbox-kicker">Frage {index + 1}</div>
                  <h3 className="ui-toolbox-question-title">{prompt.question}</h3>
                </div>
                <div className="flex shrink-0 flex-wrap gap-3">
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
                <div className={`ui-toolbox-feedback mt-5 ${prompt.recommendation.className}`}>
                  <div className="text-[0.65rem] font-black uppercase tracking-[0.18em] opacity-80">Einordnung</div>
                  <h4 className="mt-3 text-lg font-black tracking-tight">{prompt.recommendation.title}</h4>
                  <p className="mt-3 text-sm leading-relaxed">{prompt.recommendation.text}</p>
                  <Button variant="secondary" className="mt-5" onClick={() => prompt.recommendation.onJump(prompt.recommendation.target)}>
                    {prompt.recommendation.targetLabel}
                    <ChevronRight size={14} />
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
            <div className="text-[0.65rem] font-black uppercase tracking-[0.18em] opacity-80">Aktuell wichtigste Spur</div>
            <h3 className="mt-3 text-2xl font-black tracking-tight">{triage.primaryPriority.title}</h3>
            <p className="mt-4 max-w-3xl text-sm leading-relaxed">{triage.primaryPriority.text}</p>
            <Button variant="secondary" className="mt-5" onClick={() => triage.primaryPriority.onJump(triage.primaryPriority.target)}>
              {triage.primaryPriority.targetLabel}
              <ChevronRight size={14} />
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
        <div className="ui-split">
          <div className="ui-stack ui-stack--tight">
            <Eyebrow>{practice.eyebrow}</Eyebrow>
            <h2 className="ui-hero__title ui-section-title">
              {practice.titlePrefix} <span className="ui-hero__accent">{practice.titleAccent}</span>
            </h2>
            <div className="ui-copy">
              <p>{practice.description}</p>
            </div>
          </div>
          {practice.aside ? (
            <SurfaceCard as="aside" tone="default">
              {practice.aside.label ? <p className="ui-fact-card__label">{practice.aside.label}</p> : null}
              {practice.aside.copy ? <p className="ui-card__copy">{practice.aside.copy}</p> : null}
            </SurfaceCard>
          ) : null}
        </div>

        <div className="ui-chip-row" aria-label={practice.filterAriaLabel}>
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

        <div className="grid gap-4 md:grid-cols-2">
          {practice.items.map((item) => (
            <SurfaceCard key={item.title} tone="default">
              <div className="flex flex-wrap gap-2">
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className="ui-toolbox-tag"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <h3 className="ui-card__title mt-5">{item.title}</h3>
              <p className="ui-card__copy">{item.text}</p>
              <Button variant="secondary" className="mt-5" onClick={() => item.onJump(item.target)}>
                {item.targetLabel}
                <ChevronRight size={14} />
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
        <div className="ui-split">
          <div className="ui-stack ui-stack--tight">
            {cluster.eyebrow ? <Eyebrow>{cluster.eyebrow}</Eyebrow> : null}
            {cluster.title ? (
              <h2 className="ui-hero__title ui-section-title">
                {cluster.titlePrefix ? <>{cluster.titlePrefix} </> : null}
                {cluster.titleAccent ? <span className="ui-hero__accent">{cluster.titleAccent}</span> : cluster.title}
              </h2>
            ) : null}
            {cluster.description ? (
              <div className="ui-copy">
                {Array.isArray(cluster.description)
                  ? cluster.description.map((paragraph) => <p key={paragraph}>{paragraph}</p>)
                  : <p>{cluster.description}</p>}
              </div>
            ) : null}
          </div>
          {cluster.aside ? (
            <SurfaceCard as="aside" tone={cluster.aside.tone || 'accent'}>
              {cluster.aside.label ? <p className="ui-fact-card__label">{cluster.aside.label}</p> : null}
              {cluster.aside.title ? <h3 className="ui-card__title">{cluster.aside.title}</h3> : null}
              {cluster.aside.copy ? <p className="ui-card__copy">{cluster.aside.copy}</p> : null}
              {cluster.aside.items?.length ? (
                <div className="ui-stack ui-stack--tight mt-4">
                  {cluster.aside.items.map((item, index) => (
                    <div key={`${cluster.id}-aside-${index}`} className="flex items-start gap-3">
                      {item.icon ? <span className="mt-1 shrink-0 text-[var(--accent-primary-strong)]">{item.icon}</span> : null}
                      <p className="m-0 text-sm font-medium leading-relaxed text-[inherit]">{item.text}</p>
                    </div>
                  ))}
                </div>
              ) : null}
            </SurfaceCard>
          ) : null}
        </div>

        {cluster.actions?.length ? (
          <div className="flex flex-wrap gap-3">
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
          <div className="grid gap-4 md:grid-cols-2">
            {cluster.listCards.map((item) => (
              <div
                key={item.title || item.text}
                className={`ui-card--outline ui-toolbox-list-card ${item.className || 'bg-[var(--surface-app)]'}`}
              >
                <div className="flex items-start gap-3">
                  {item.icon ? <span className="mt-1 shrink-0 text-[var(--accent-primary-strong)]">{item.icon}</span> : null}
                  <div>
                    {item.title ? <h3 className="ui-card__title">{item.title}</h3> : null}
                    {item.text ? <p className={item.title ? 'ui-card__copy' : 'm-0 text-sm font-medium leading-relaxed text-[var(--text-primary)]'}>{item.text}</p> : null}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : null}

        {cluster.disclosureItems?.length ? (
          <div className="grid gap-4">
            {cluster.disclosureItems.map((item) => (
              <details
                key={item.title}
                className={`group ui-card--outline ui-card--interactive ui-toolbox-disclosure ${item.className || ''}`}
              >
                <summary
                  className="ui-toolbox-disclosure__summary"
                  aria-label={item.summaryAriaLabel || item.title}
                >
                  <div className="flex items-start gap-3">
                    {item.icon ? <span className="mt-1 shrink-0 text-[var(--accent-primary-strong)]">{item.icon}</span> : null}
                    <div>
                      <span className="ui-card__title block">{item.title}</span>
                      {item.meta ? <p className="mt-2 text-xs font-black uppercase tracking-[0.18em] text-[var(--text-muted)]">{item.meta}</p> : null}
                    </div>
                  </div>
                  <span className="ui-toolbox-disclosure__toggle">
                    +
                  </span>
                </summary>
                <div className="ui-copy mt-4 border-t border-[var(--border-subtle)] pt-4">
                  {Array.isArray(item.content)
                    ? item.content.map((paragraph) => <p key={paragraph}>{paragraph}</p>)
                    : <p>{item.content}</p>}
                  {item.href ? (
                    <Button variant="secondary" className="mt-5" href={item.href} target={item.target} rel={item.rel}>
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
                {cluster.templateMeta?.label ? <p className="ui-fact-card__label mb-3">{cluster.templateMeta.label}</p> : null}
                {cluster.templateMeta?.title ? <h3 className="ui-card__title ui-toolbox-template__title">{cluster.templateMeta.title}</h3> : null}
              </div>
              {cluster.templateMeta?.meta ? <p className="ui-toolbox-template__meta">{cluster.templateMeta.meta}</p> : null}
            </div>
            <div className="mt-6 grid gap-6 md:grid-cols-2">
              {cluster.templateFields.map((field) => (
                <section key={field.title} className="ui-toolbox-template__field">
                  <p className="ui-fact-card__label mb-3">{field.title}</p>
                  <p className="m-0 text-sm leading-relaxed text-[var(--text-secondary)]">{field.hint}</p>
                  <div className="ui-toolbox-template__lines">
                    <div className="ui-toolbox-template__line" />
                    <div className="ui-toolbox-template__line" />
                    <div className="ui-toolbox-template__line" />
                  </div>
                </section>
              ))}
            </div>
            {cluster.templateMeta?.note ? (
              <div className="ui-toolbox-note mt-6">
                <p>{cluster.templateMeta.note}</p>
              </div>
            ) : null}
          </div>
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
  hasPrintView = false,
}) {
  const heroTitleText = [hero?.title, hero?.accent].filter(Boolean).join(' ').trim();

  return (
    <div className="ui-stack" role="region" aria-labelledby={pageHeadingId}>
      <div className={hasPrintView ? 'ui-stack no-print' : 'ui-stack'}>
        <Container width="wide">
          {hero?.actions?.length ? (
            <Section spacing="tight" surface="plain" className="no-print">
              <div className="ui-card--outline ui-toolbox-quick-access">
                <div className="ui-stack ui-stack--tight">
                  <Eyebrow>Schnellzugriff</Eyebrow>
                  <h2 className="ui-hero__title ui-section-title--compact">
                    {heroTitleText || 'Orientierung, Schutz und nächste Schritte'}
                  </h2>
                  <p className="ui-card__copy">
                    Die wichtigsten Arbeitsaktionen der Toolbox sind hier zusätzlich direkt erreichbar, damit Tastatur- und Screenreader-Nutzung ohne Umwege in den zentralen Handlungsbereich gelangen.
                  </p>
                </div>
                <div className="ui-button-row ui-toolbox-quick-access__actions" role="group" aria-label="Primäre Toolbox-Aktionen">
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
