import { cloneElement, isValidElement } from 'react';
import Button from './Button';
import Eyebrow from './Eyebrow';
import SurfaceCard from './SurfaceCard';

function renderActionIcon(icon) {
  if (!icon) return null;

  if (typeof icon === 'function') {
    const Icon = icon;
    return <Icon size={16} />;
  }

  if (isValidElement(icon)) {
    return cloneElement(icon, {
      size: icon.props?.size ?? 16,
      'aria-hidden': icon.props?.['aria-hidden'] ?? true,
    });
  }

  return null;
}

export default function PageHero({
  eyebrow,
  title,
  accent,
  lead,
  headingId,
  actions = [],
  asideTitle,
  asideCopy,
  image,
  imageAlt,
  stats = [],
  headingAriaLabel,
}) {
  return (
    <div className="ui-hero">
      <div className="ui-hero__inner">
        <div className="ui-hero__content">
          {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
          <h1
            id={headingId}
            tabIndex={-1}
            aria-label={headingAriaLabel || (accent ? `${title} ${accent}` : undefined)}
            className="ui-hero__title"
          >
            {title} {accent ? <span className="ui-hero__accent">{accent}</span> : null}
          </h1>
          {lead ? <p className="ui-hero__lead">{lead}</p> : null}

          {actions.length ? (
            <div className="ui-hero__actions">
              {actions.map((action) => (
                <Button
                  key={action.label}
                  as={action.href ? 'a' : 'button'}
                  href={action.href}
                  onClick={action.onClick}
                  variant={action.variant}
                  target={action.target}
                  rel={action.rel}
                  aria-label={action.ariaLabel}
                >
                  {action.label}
                  {renderActionIcon(action.icon)}
                </Button>
              ))}
            </div>
          ) : null}

          {stats.length ? (
            <div className="ui-fact-grid">
              {stats.map((stat) => (
                <SurfaceCard key={stat.label} tone={stat.tone || 'default'}>
                  <p className="ui-fact-card__label">{stat.label}</p>
                  <p className="ui-fact-card__value">{stat.value}</p>
                  {stat.note ? <p className="ui-fact-card__note">{stat.note}</p> : null}
                </SurfaceCard>
              ))}
            </div>
          ) : null}
        </div>

        <div className="ui-hero__media">
          {image ? (
            <div className="ui-hero__figure">
              <img src={image} alt={imageAlt || ''} />
            </div>
          ) : null}

          {(asideTitle || asideCopy) && (
            <div className="ui-hero__aside">
              {asideTitle ? <p className="ui-hero__aside-title">{asideTitle}</p> : null}
              {asideCopy ? <p className="ui-hero__aside-copy">{asideCopy}</p> : null}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
