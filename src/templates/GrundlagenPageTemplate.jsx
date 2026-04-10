import ClosingSection from '../components/closing/ClosingSection';
import Container from '../components/ui/Container';
import Eyebrow from '../components/ui/Eyebrow';
import PageHero from '../components/ui/PageHero';
import Section from '../components/ui/Section';
import SurfaceCard from '../components/ui/SurfaceCard';

function GrundlagenIntro({ intro }) {
  if (!intro) return null;

  return (
    <Section spacing="tight" surface="plain">
      <div className="ui-stack ui-stack--loose">
        <div className="ui-split">
          <div className="ui-stack ui-stack--tight">
            {intro.eyebrow ? <Eyebrow>{intro.eyebrow}</Eyebrow> : null}
            {intro.title ? (
              <h2 className="ui-hero__title" style={{ fontSize: 'clamp(1.85rem, 3vw, 3rem)' }}>
                {intro.title}
              </h2>
            ) : null}
            {intro.description ? (
              <div className="ui-copy">
                <p>{intro.description}</p>
              </div>
            ) : null}
          </div>
          {intro.aside ? (
            <SurfaceCard as="aside" tone={intro.aside.tone || 'soft'}>
              {intro.aside.label ? <p className="ui-fact-card__label">{intro.aside.label}</p> : null}
              {intro.aside.title ? <h3 className="ui-card__title">{intro.aside.title}</h3> : null}
              {intro.aside.copy ? <p className="ui-card__copy">{intro.aside.copy}</p> : null}
            </SurfaceCard>
          ) : null}
        </div>

        {intro.cards?.length ? (
          <div className="ui-fact-grid">
            {intro.cards.map((card) => (
              <SurfaceCard key={card.title} tone={card.tone || 'default'}>
                {card.label ? <p className="ui-fact-card__label">{card.label}</p> : null}
                <h3 className="ui-card__title">{card.title}</h3>
                {card.copy ? <p className="ui-card__copy">{card.copy}</p> : null}
                {card.meta ? <p className="ui-fact-card__meta">{card.meta}</p> : null}
              </SurfaceCard>
            ))}
          </div>
        ) : null}
      </div>
    </Section>
  );
}

function GrundlagenIndex({ clusters }) {
  if (!clusters?.length) return null;

  return (
    <Section spacing="tight" surface="subtle">
      <div className="ui-stack ui-stack--tight">
        <Eyebrow>Schnellzugriff</Eyebrow>
        <div className="ui-button-row">
          {clusters.map((cluster) => (
            <a key={cluster.id} href={`#${cluster.id}`} className="ui-button ui-button--secondary">
              {cluster.shortLabel || cluster.title}
            </a>
          ))}
        </div>
      </div>
    </Section>
  );
}

function GrundlagenFaqItem({ item, index }) {
  return (
    <details className="group ui-card ui-card--interactive rounded-[1.75rem] bg-[var(--surface-app)]">
      <summary className="flex cursor-pointer list-none items-start justify-between gap-4 px-5 py-4">
        <div className="ui-stack ui-stack--tight">
          <p className="ui-fact-card__label">Frage {index + 1}</p>
          <h3 className="ui-card__title">{item.question}</h3>
        </div>
        <span
          aria-hidden="true"
          className="mt-1 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[var(--border-subtle)] bg-[var(--surface-panel)] text-lg font-semibold text-[var(--text-muted)] transition-transform duration-200 group-open:rotate-45 group-open:border-[var(--border-default)] group-open:bg-[var(--surface-note)] group-open:text-[var(--accent-primary-strong)]"
        >
          +
        </span>
      </summary>
      <div className="border-t border-[var(--border-subtle)] px-5 pb-5 pt-4">
        <p className="ui-card__copy">{item.answer}</p>
      </div>
    </details>
  );
}

function GrundlagenCluster({ cluster }) {
  return (
    <Section spacing="tight" surface={cluster.surface || 'plain'}>
      <div id={cluster.id} className="ui-stack ui-stack--loose scroll-mt-32">
        <div className="ui-split">
          <div className="ui-stack ui-stack--tight">
            {cluster.eyebrow ? <Eyebrow>{cluster.eyebrow}</Eyebrow> : null}
            <h2 className="ui-hero__title" style={{ fontSize: 'clamp(1.85rem, 3vw, 3rem)' }}>
              {cluster.title}
            </h2>
            {cluster.description ? (
              <div className="ui-copy">
                <p>{cluster.description}</p>
              </div>
            ) : null}
          </div>
          {cluster.aside ? (
            <SurfaceCard as="aside" tone={cluster.aside.tone || 'soft'}>
              {cluster.aside.label ? <p className="ui-fact-card__label">{cluster.aside.label}</p> : null}
              {cluster.aside.title ? <h3 className="ui-card__title">{cluster.aside.title}</h3> : null}
              {cluster.aside.copy ? <p className="ui-card__copy">{cluster.aside.copy}</p> : null}
            </SurfaceCard>
          ) : null}
        </div>

        {cluster.faqs?.length ? (
          <div className="grid gap-4 lg:grid-cols-2">
            {cluster.faqs.map((item, index) => (
              <GrundlagenFaqItem key={item.question} item={item} index={index} />
            ))}
          </div>
        ) : null}
      </div>
    </Section>
  );
}

export default function GrundlagenPageTemplate({ hero, pageHeadingId, intro, clusters = [], closingSection = null }) {
  return (
    <div className="ui-stack">
      <Container width="wide">
        <PageHero {...hero} headingId={pageHeadingId} />
      </Container>
      <GrundlagenIntro intro={intro} />
      <GrundlagenIndex clusters={clusters} />
      {clusters.map((cluster) => (
        <GrundlagenCluster key={cluster.id} cluster={cluster} />
      ))}
      {closingSection ? <ClosingSection section={closingSection} sectionId="grundlagen-materials" surface="plain" className="no-print" /> : null}
    </div>
  );
}
