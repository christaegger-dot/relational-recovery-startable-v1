import Section from './Section';
import SectionHeader from './SectionHeader';
import SurfaceCard from './SurfaceCard';

export default function EditorialIntro({ intro }) {
  if (!intro) return null;

  return (
    <Section spacing="tight" surface="plain">
      <div className="ui-stack ui-stack--loose">
        <SectionHeader
          eyebrow={intro.eyebrow}
          title={intro.title}
          description={intro.description}
          aside={intro.aside}
        />

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
