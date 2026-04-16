import Container from '../components/ui/Container';
import PageHero from '../components/ui/PageHero';
import Section from '../components/ui/Section';
import SectionHeader from '../components/ui/SectionHeader';
import SurfaceCard from '../components/ui/SurfaceCard';
import ClosingSection from '../components/closing/ClosingSection';

function RichCopy({ paragraphs = [] }) {
  if (!paragraphs.length) return null;

  return (
    <div className="ui-copy">
      {paragraphs.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
    </div>
  );
}

function BulletList({ items = [], tone = 'default', icon }) {
  if (!items.length) return null;

  const toneClass =
    tone === 'strong'
      ? 'ui-bullet-panel ui-bullet-panel--strong'
      : tone === 'soft'
        ? 'ui-bullet-panel ui-bullet-panel--soft'
        : 'ui-bullet-panel';

  return (
    <div className={toneClass}>
      <div className="ui-stack ui-stack--tight">
        {items.map((item) => (
          <div key={item} className="ui-bullet-panel__item">
            {icon ? <span className="ui-bullet-panel__marker">{icon}</span> : <span className="ui-bullet-panel__dot" />}
            <p className="ui-bullet-panel__copy">{item}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function CardGrid({ items = [], columns = 'three', tone = 'default', renderItem }) {
  if (!items.length) return null;

  const gridClass =
    columns === 'two'
      ? 'ui-card-grid ui-card-grid--2'
      : columns === 'four'
        ? 'ui-card-grid ui-card-grid--4'
        : 'ui-card-grid ui-card-grid--3';

  return (
    <div className={gridClass}>
      {items.map((item) =>
        renderItem ? (
          renderItem(item)
        ) : (
          <SurfaceCard key={item.title || item.label} tone={tone} className="h-full">
            {item.label ? <p className="ui-fact-card__label">{item.label}</p> : null}
            {item.title ? <h3 className="ui-card__title">{item.title}</h3> : null}
            {item.text ? <p className="ui-card__copy">{item.text}</p> : null}
            {item.note ? <p className="ui-card__copy">{item.note}</p> : null}
          </SurfaceCard>
        )
      )}
    </div>
  );
}

function MetricGrid({ items = [] }) {
  if (!items.length) return null;

  return (
    <div className="ui-card-grid ui-card-grid--3">
      {items.map((item) => (
        <SurfaceCard key={item.label} tone={item.tone || 'default'} className="h-full">
          <p className="ui-fact-card__label">{item.label}</p>
          <p className="ui-fact-card__value">{item.value}</p>
          {item.note ? <p className="ui-fact-card__note">{item.note}</p> : null}
        </SurfaceCard>
      ))}
    </div>
  );
}

function ChapterOverview({ chapterOverview }) {
  if (!chapterOverview) return null;

  return (
    <Section spacing="tight" surface="subtle" className="no-print">
      <div className="ui-stack ui-stack--loose">
        <SectionHeader
          eyebrow={chapterOverview.eyebrow}
          title={chapterOverview.title}
          titleAccent={chapterOverview.accent}
          description={chapterOverview.description}
          aside={chapterOverview.aside}
          asideTone="default"
        />

        {chapterOverview.items?.length ? (
          <div className="ui-card-grid ui-card-grid--5">
            {chapterOverview.items.map((item) => (
              <a key={item.id} href={`#${item.id}`} className="ui-card ui-card--editorial-link">
                <div className="ui-fact-card__label">{item.label}</div>
                <p className="ui-card__copy">{item.note}</p>
              </a>
            ))}
          </div>
        ) : null}
      </div>
    </Section>
  );
}

function ZoneSection({ zone, defaultOpen = false }) {
  if (!zone) return null;

  return (
    <Section
      id={zone.id}
      spacing={zone.spacing || 'tight'}
      surface={zone.surface || 'plain'}
      className={zone.className || 'no-print'}
    >
      <details className="ui-chapter-disclosure" open={defaultOpen || undefined}>
        <summary className="ui-chapter-disclosure__summary">
          <SectionHeader
            eyebrow={zone.eyebrow}
            title={zone.title}
            titleAccent={zone.accent}
          />
          <span className="ui-chapter-disclosure__indicator" aria-hidden="true" />
        </summary>

        <div className="ui-stack ui-stack--loose ui-chapter-disclosure__body">
          {zone.paragraphs?.length ? <RichCopy paragraphs={zone.paragraphs} /> : null}
          {zone.aside ? (
            <SurfaceCard tone="soft">
              {zone.aside.eyebrow ? <p className="ui-fact-card__label">{zone.aside.eyebrow}</p> : null}
              <h3 className="ui-card__title">{zone.aside.title}</h3>
              {zone.aside.description ? <p className="ui-card__copy">{zone.aside.description}</p> : null}
            </SurfaceCard>
          ) : null}

          {zone.highlightList ? (
            <BulletList items={zone.highlightList.items} tone={zone.highlightList.tone} icon={zone.highlightList.icon} />
          ) : null}
          {zone.metrics?.length ? <MetricGrid items={zone.metrics} /> : null}
          {zone.cards?.length ? <CardGrid items={zone.cards} columns={zone.cardColumns} tone={zone.cardTone} /> : null}

          {zone.subsections?.length ? (
            <div className="ui-stack ui-stack--standard">
              {zone.subsections.map((subsection) => (
                <SurfaceCard key={subsection.title} tone={subsection.tone || 'default'}>
                  {subsection.label ? <p className="ui-fact-card__label">{subsection.label}</p> : null}
                  <h3 className="ui-card__title">{subsection.title}</h3>
                  {subsection.paragraphs?.length ? <RichCopy paragraphs={subsection.paragraphs} /> : null}
                  {subsection.points?.length ? <BulletList items={subsection.points} tone="soft" /> : null}
                </SurfaceCard>
              ))}
            </div>
          ) : null}

          {zone.callout ? (
            <div className={`ui-note-panel ${zone.callout.className || ''}`.trim()}>
              <p className="ui-note-panel__copy">{zone.callout.text}</p>
            </div>
          ) : null}
        </div>
      </details>
    </Section>
  );
}

function MaterialsSection({ closingSection }) {
  if (!closingSection) return null;

  return (
    <ClosingSection section={closingSection} sectionId="evidenz-materialien" surface="plain" className="no-print" />
  );
}

export default function EvidencePageTemplate({ hero, pageHeadingId, chapterOverview, zones = [], closingSection }) {
  return (
    <article>
      <Section as="header" spacing="wide" surface="plain" className="no-print">
        <Container width="default">
          <PageHero {...hero} headingId={pageHeadingId} />
        </Container>
      </Section>
      <ChapterOverview chapterOverview={chapterOverview} />
      {zones.map((zone, index) => (
        <ZoneSection key={zone.id || zone.title} zone={zone} defaultOpen={index === 0} />
      ))}
      <MaterialsSection closingSection={closingSection} />
    </article>
  );
}
