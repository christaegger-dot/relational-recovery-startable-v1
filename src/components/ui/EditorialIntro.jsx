import Eyebrow from './Eyebrow';
import Section from './Section';
import SurfaceCard from './SurfaceCard';

export default function EditorialIntro({ intro }) {
  if (!intro) return null;

  return (
    <Section spacing="tight" surface="plain">
      <div className="ui-stack ui-stack--loose">
        <div className="ui-split">
          <div className="ui-stack ui-stack--tight">
            {intro.eyebrow ? <Eyebrow>{intro.eyebrow}</Eyebrow> : null}
            {intro.title ? <h2 className="ui-hero__title ui-section-title">{intro.title}</h2> : null}
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
