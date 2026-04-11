import Button from '../components/ui/Button';
import Container from '../components/ui/Container';
import Eyebrow from '../components/ui/Eyebrow';
import PageHero from '../components/ui/PageHero';
import Section from '../components/ui/Section';
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
      ? 'bg-slate-900 text-white border-slate-800'
      : tone === 'soft'
        ? 'bg-[var(--surface-note)] text-[var(--text-primary)] border-[color-mix(in_srgb,var(--accent-primary)_18%,white_82%)]'
        : 'bg-white text-[var(--text-primary)] border-[var(--border-default)]';

  return (
    <div className={`rounded-[2rem] border p-6 md:p-7 ${toneClass}`}>
      <div className="ui-stack ui-stack--tight">
        {items.map((item) => (
          <div key={item} className="flex items-start gap-3">
            {icon ? <span className="mt-0.5 shrink-0">{icon}</span> : <span className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full bg-current opacity-70" />}
            <p className="m-0 text-sm leading-relaxed md:text-[0.98rem]">{item}</p>
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
      ? 'grid gap-4 md:grid-cols-2'
      : columns === 'four'
        ? 'grid gap-4 md:grid-cols-2 xl:grid-cols-4'
        : 'grid gap-4 md:grid-cols-2 xl:grid-cols-3';

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
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
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
        <div className="ui-split">
          <div className="ui-stack ui-stack--tight">
            {chapterOverview.eyebrow ? <Eyebrow>{chapterOverview.eyebrow}</Eyebrow> : null}
            <h2 className="ui-hero__title ui-section-title">
              {chapterOverview.title}{' '}
              {chapterOverview.accent ? <span className="ui-hero__accent">{chapterOverview.accent}</span> : null}
            </h2>
            <div className="ui-copy">
              <p>{chapterOverview.description}</p>
            </div>
          </div>

          {chapterOverview.aside ? (
            <SurfaceCard as="aside" tone="default">
              {chapterOverview.aside.label ? <p className="ui-fact-card__label">{chapterOverview.aside.label}</p> : null}
              {chapterOverview.aside.title ? <h3 className="ui-card__title">{chapterOverview.aside.title}</h3> : null}
              {chapterOverview.aside.copy ? <p className="ui-card__copy">{chapterOverview.aside.copy}</p> : null}
              {chapterOverview.aside.badges?.length ? (
                <div className="ui-badge-row ui-editorial-card__action">
                  {chapterOverview.aside.badges.map((badge) => (
                    <span key={badge} className="ui-badge">
                      {badge}
                    </span>
                  ))}
                </div>
              ) : null}
            </SurfaceCard>
          ) : null}
        </div>

        {chapterOverview.items?.length ? (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
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

function ZoneSection({ zone }) {
  if (!zone) return null;

  return (
    <Section id={zone.id} spacing={zone.spacing || 'tight'} surface={zone.surface || 'plain'} className={zone.className || 'no-print'}>
      <div className="ui-stack ui-stack--loose">
        <div className="ui-split">
          <div className="ui-stack ui-stack--tight">
            {zone.eyebrow ? <Eyebrow>{zone.eyebrow}</Eyebrow> : null}
            <h2 className="ui-hero__title ui-section-title">
              {zone.title} {zone.accent ? <span className="ui-hero__accent">{zone.accent}</span> : null}
            </h2>
            <RichCopy paragraphs={zone.paragraphs} />
          </div>

          {zone.aside ? (
            <SurfaceCard as="aside" tone={zone.aside.tone || 'soft'}>
              {zone.aside.label ? <p className="ui-fact-card__label">{zone.aside.label}</p> : null}
              {zone.aside.title ? <h3 className="ui-card__title">{zone.aside.title}</h3> : null}
              {zone.aside.copy ? <p className="ui-card__copy">{zone.aside.copy}</p> : null}
              {zone.aside.note ? <p className="ui-card__copy">{zone.aside.note}</p> : null}
            </SurfaceCard>
          ) : null}
        </div>

        {zone.highlightList ? <BulletList items={zone.highlightList.items} tone={zone.highlightList.tone} icon={zone.highlightList.icon} /> : null}
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
    </Section>
  );
}

function MaterialsSection({ closingSection }) {
  if (!closingSection) return null;

  return <ClosingSection section={closingSection} sectionId="evidence-materials" surface="plain" className="no-print" />;
}

export default function EvidencePageTemplate({ hero, pageHeadingId, chapterOverview, zones = [], closingSection }) {
  return (
    <article className="no-print">
      <Section as="header" spacing="wide" surface="plain" className="no-print">
        <Container width="default">
          <PageHero {...hero} headingId={pageHeadingId} />
        </Container>
      </Section>
      <ChapterOverview chapterOverview={chapterOverview} />
      {zones.map((zone) => (
        <ZoneSection key={zone.id || zone.title} zone={zone} />
      ))}
      <MaterialsSection closingSection={closingSection} />
    </article>
  );
}
