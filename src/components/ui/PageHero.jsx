import { cloneElement, isValidElement } from 'react';
import Button from './Button';
import Eyebrow from './Eyebrow';
import SurfaceCard from './SurfaceCard';

function renderActionIcon(icon) {
  if (!icon) return null;

  if (typeof icon === 'function') {
    const Icon = icon;
    return <Icon size={16} aria-hidden="true" />;
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
  accentColor,
  lead,
  headingId,
  icon,
  actions = [],
  asideTitle,
  asideCopy,
  image,
  imageAlt,
  stats = [],
  headingAriaLabel,
  audienceEntries = [],
  audienceLabel,
  audienceNote,
}) {
  const HeroIcon = icon || null;
  const heroStyle = accentColor ? { '--hero-accent-color': accentColor } : undefined;
  return (
    <div className="ui-hero" style={heroStyle}>
      <div className="ui-hero__inner">
        <div className="ui-hero__content">
          {HeroIcon ? (
            <span className="ui-hero__icon" aria-hidden="true">
              <HeroIcon size={28} strokeWidth={1.6} />
            </span>
          ) : null}
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

          {audienceEntries.length ? (
            <div className="ui-hero__audience" role="group" aria-label={audienceLabel || 'Zugang nach Rolle wählen'}>
              {audienceEntries.map((entry) => (
                <button
                  key={entry.label}
                  type="button"
                  className="ui-hero__audience-entry haptic-btn"
                  onClick={entry.onClick}
                  aria-label={entry.ariaLabel || `${entry.label}: ${entry.destination}`}
                >
                  <span className="ui-hero__audience-label">{entry.label}</span>
                  <span className="ui-hero__audience-destination">
                    <span aria-hidden="true">→ </span>
                    {entry.destination}
                  </span>
                </button>
              ))}
            </div>
          ) : null}

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

          {audienceNote ? (
            <p className="ui-hero__audience-note">
              {audienceNote.prefix ? (
                <span className="ui-hero__audience-note-prefix">{audienceNote.prefix}</span>
              ) : null}
              {audienceNote.href ? (
                <a
                  className="ui-hero__audience-note-link"
                  href={audienceNote.href}
                  target={audienceNote.target}
                  rel={audienceNote.rel}
                  aria-label={audienceNote.ariaLabel}
                >
                  {audienceNote.label}
                </a>
              ) : (
                <button
                  type="button"
                  className="ui-hero__audience-note-link"
                  onClick={audienceNote.onClick}
                  aria-label={audienceNote.ariaLabel}
                >
                  {audienceNote.label}
                </button>
              )}
            </p>
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
              {/* Audit 16 P1-3: fetchpriority + decoding als LCP-Hinweise.
                  Das Hero-<img> ist auf der Start-Route der LCP-Kandidat;
                  'high' schiebt es in die Priority-Queue und spart typ.
                  100-300 ms LCP gegenueber Default. decoding='async'
                  verhindert, dass die Bilddekodierung den Main-Thread
                  blockiert. width/height bleiben gesetzt (CLS-Schutz). */}
              <img src={image} alt={imageAlt || ''} width={1200} height={800} fetchpriority="high" decoding="async" />
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
