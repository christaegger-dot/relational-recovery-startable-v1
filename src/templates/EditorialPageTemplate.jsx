import Button from '../components/ui/Button';
import Container from '../components/ui/Container';
import PageHero from '../components/ui/PageHero';
import Section from '../components/ui/Section';
import SectionHeader from '../components/ui/SectionHeader';
import SurfaceCard from '../components/ui/SurfaceCard';

function ContentSection({ section }) {
  return (
    <Section spacing={section.spacing || 'tight'} surface={section.surface || 'plain'}>
      <div className="ui-stack ui-stack--loose">
        {(section.eyebrow || section.title || section.description || section.aside || section.actions?.length) && (
          <SectionHeader
            eyebrow={section.eyebrow}
            title={section.title}
            description={section.description}
            aside={section.aside}
          >
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
                    {action.icon ? <action.icon size={16} aria-hidden="true" /> : null}
                  </Button>
                ))}
              </div>
            ) : null}
          </SectionHeader>
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
                  className={card.href || card.onClick ? 'ui-card--editorial-link' : undefined}
                  {...interactiveProps}
                >
                  {card.label ? <p className="ui-fact-card__label">{card.label}</p> : null}
                  <h3 className="ui-card__title">{card.title}</h3>
                  {card.copy ? <p className="ui-card__copy">{card.copy}</p> : null}
                  {card.meta ? <p className="ui-fact-card__meta">{card.meta}</p> : null}
                  {card.actionLabel ? (
                    <div className="ui-editorial-card__action">
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
