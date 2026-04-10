import Button from '../components/ui/Button';
import Container from '../components/ui/Container';
import Eyebrow from '../components/ui/Eyebrow';
import PageHero from '../components/ui/PageHero';
import Section from '../components/ui/Section';
import SurfaceCard from '../components/ui/SurfaceCard';

function ContentSection({ section }) {
  return (
    <Section spacing={section.spacing || 'tight'} surface={section.surface || 'plain'}>
      <div className="ui-stack ui-stack--loose">
        {(section.eyebrow || section.title || section.description || section.aside || section.actions?.length) && (
          <div className="ui-split">
            <div className="ui-stack ui-stack--tight">
              {section.eyebrow ? <Eyebrow>{section.eyebrow}</Eyebrow> : null}
              {section.title ? <h2 className="ui-hero__title" style={{ fontSize: 'clamp(1.85rem, 3vw, 3rem)' }}>{section.title}</h2> : null}
              {section.description ? (
                <div className="ui-copy">
                  <p>{section.description}</p>
                </div>
              ) : null}
              {section.actions?.length ? (
                <div className="ui-button-row">
                  {section.actions.map((action) => (
                    <Button
                      key={action.label}
                      as={action.href ? 'a' : 'button'}
                      href={action.href}
                      onClick={action.onClick}
                      variant={action.variant || 'secondary'}
                      target={action.target}
                      rel={action.rel}
                    >
                      {action.label}
                      {action.icon ? <action.icon size={16} /> : null}
                    </Button>
                  ))}
                </div>
              ) : null}
            </div>
            {section.aside ? (
              <SurfaceCard as="aside" tone={section.aside.tone || 'soft'}>
                {section.aside.label ? <p className="ui-fact-card__label">{section.aside.label}</p> : null}
                {section.aside.title ? <h3 className="ui-card__title">{section.aside.title}</h3> : null}
                {section.aside.copy ? <p className="ui-card__copy">{section.aside.copy}</p> : null}
              </SurfaceCard>
            ) : null}
          </div>
        )}

        {section.cards?.length ? (
          <div className="ui-fact-grid">
            {section.cards.map((card) => {
              const CardTag = card.href ? 'a' : card.onClick ? 'button' : 'div';
              const interactiveProps = card.href
                ? { href: card.href, target: card.target, rel: card.rel }
                : card.onClick
                  ? { type: 'button', onClick: card.onClick }
                  : {};

              return (
                <SurfaceCard
                  key={card.title}
                  as={CardTag}
                  tone={card.tone || 'default'}
                  className={card.href || card.onClick ? 'text-left transition-transform duration-200 hover:-translate-y-0.5' : undefined}
                  {...interactiveProps}
                >
                  {card.label ? <p className="ui-fact-card__label">{card.label}</p> : null}
                  <h3 className="ui-card__title">{card.title}</h3>
                  {card.copy ? <p className="ui-card__copy">{card.copy}</p> : null}
                  {card.meta ? <p className="ui-fact-card__meta">{card.meta}</p> : null}
                  {card.actionLabel ? (
                    <div className="mt-5">
                      <span className="ui-button ui-button--secondary">{card.actionLabel}</span>
                    </div>
                  ) : null}
                </SurfaceCard>
              );
            })}
          </div>
        ) : null}
      </div>
    </Section>
  );
}

export default function EditorialPageTemplate({ hero, pageHeadingId, sections = [] }) {
  return (
    <div className="ui-stack">
      <Container width="wide">
        <PageHero {...hero} headingId={pageHeadingId} />
      </Container>
      {sections.map((section) => (
        <ContentSection key={section.title} section={section} />
      ))}
    </div>
  );
}
