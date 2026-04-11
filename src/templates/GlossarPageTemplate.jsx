import Container from '../components/ui/Container';
import Eyebrow from '../components/ui/Eyebrow';
import PageHero from '../components/ui/PageHero';
import Section from '../components/ui/Section';
import SurfaceCard from '../components/ui/SurfaceCard';

function GlossarIntro({ intro }) {
  if (!intro) return null;

  return (
    <Section spacing="tight" surface="plain">
      <div className="ui-stack ui-stack--loose">
        <div className="ui-split">
          <div className="ui-stack ui-stack--tight">
            {intro.eyebrow ? <Eyebrow>{intro.eyebrow}</Eyebrow> : null}
            {intro.title ? (
              <h2 className="ui-hero__title ui-section-title">
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

function GlossarIndex({ groups }) {
  if (!groups?.length) return null;

  return (
    <Section spacing="compact" surface="muted">
      <div className="ui-stack ui-stack--tight">
        <Eyebrow>Schnellzugriff</Eyebrow>
        <div className="ui-button-row">
          {groups.map((group) => (
            <a key={group.id} href={`#${group.id}`} className="ui-button ui-button--secondary">
              {group.shortLabel || group.title}
            </a>
          ))}
        </div>
      </div>
    </Section>
  );
}

function GlossarGroup({ group }) {
  return (
    <Section spacing="tight" surface={group.surface || 'plain'}>
      <div id={group.id} className="ui-stack ui-stack--loose ui-anchor-offset-target">
        <div className="ui-split">
          <div className="ui-stack ui-stack--tight">
            {group.eyebrow ? <Eyebrow>{group.eyebrow}</Eyebrow> : null}
            <h2 className="ui-hero__title ui-section-title">
              {group.title}
            </h2>
            {group.description ? (
              <div className="ui-copy">
                <p>{group.description}</p>
              </div>
            ) : null}
          </div>
          {group.aside ? (
            <SurfaceCard as="aside" tone={group.aside.tone || 'soft'}>
              {group.aside.label ? <p className="ui-fact-card__label">{group.aside.label}</p> : null}
              {group.aside.title ? <h3 className="ui-card__title">{group.aside.title}</h3> : null}
              {group.aside.copy ? <p className="ui-card__copy">{group.aside.copy}</p> : null}
            </SurfaceCard>
          ) : null}
        </div>

        <div className="ui-glossary-term-grid">
          {group.terms.map((entry) => (
            <SurfaceCard key={entry.term} tone={entry.tone || 'default'}>
              <p className="ui-fact-card__label">Begriff</p>
              <h3 className="ui-card__title">{entry.term}</h3>
              <p className="ui-card__copy">{entry.definition}</p>
              {entry.practice ? (
                <div className="ui-note-panel ui-editorial-card__action">
                  <p className="ui-note-panel__label">Praxisbezug</p>
                  <p className="ui-note-panel__copy">{entry.practice}</p>
                </div>
              ) : null}
            </SurfaceCard>
          ))}
        </div>
      </div>
    </Section>
  );
}

export default function GlossarPageTemplate({ hero, pageHeadingId, intro, groups = [] }) {
  return (
    <div className="ui-stack">
      <Container width="wide">
        <PageHero {...hero} headingId={pageHeadingId} />
      </Container>
      <GlossarIntro intro={intro} />
      <GlossarIndex groups={groups} />
      {groups.map((group) => (
        <GlossarGroup key={group.id} group={group} />
      ))}
    </div>
  );
}
