import { useMemo, useState } from 'react';
import Button from '../ui/Button';
import Eyebrow from '../ui/Eyebrow';
import Section from '../ui/Section';
import SurfaceCard from '../ui/SurfaceCard';

function RichCopy({ description, paragraphs = [] }) {
  if (!description && !paragraphs.length) return null;

  return (
    <div className="ui-copy">
      {description ? <p>{description}</p> : null}
      {paragraphs.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
    </div>
  );
}

function MetaTags({ items = [], tone = 'default' }) {
  if (!items.length) return null;

  const className =
    tone === 'accent'
      ? 'inline-flex rounded-full border border-[color-mix(in_srgb,var(--accent-primary)_18%,white_82%)] bg-white px-3 py-1 text-[0.68rem] font-black uppercase tracking-[0.18em] text-[var(--accent-primary-strong)]'
      : 'inline-flex rounded-full border border-[var(--border-default)] bg-[var(--surface-panel)] px-3 py-1 text-[0.68rem] font-black uppercase tracking-[0.18em] text-[var(--text-muted)]';

  return (
    <div className="mb-4 flex flex-wrap gap-2">
      {items.map((tag) => (
        <span key={tag} className={className}>
          {tag}
        </span>
      ))}
    </div>
  );
}

function ClosingHeader({ section }) {
  if (!section) return null;

  return (
    <div className="ui-split">
      <div className="ui-stack ui-stack--tight">
        {section.eyebrow ? <Eyebrow>{section.eyebrow}</Eyebrow> : null}
        <h2
          className="ui-hero__title"
          style={{
            fontSize: 'clamp(1.85rem, 3vw, 3rem)',
            textTransform: section.headingTransform || undefined,
            letterSpacing: section.headingLetterSpacing || undefined,
          }}
        >
          {section.title}
          {section.accent ? (
            <>
              {' '}
              <span className="ui-hero__accent">{section.accent}</span>
            </>
          ) : null}
        </h2>
        <RichCopy description={section.description} paragraphs={section.paragraphs} />
      </div>

      {section.aside ? (
        <SurfaceCard as="aside" tone={section.aside.tone || 'soft'}>
          {section.aside.label ? <p className="ui-fact-card__label">{section.aside.label}</p> : null}
          {section.aside.title ? <h3 className="ui-card__title">{section.aside.title}</h3> : null}
          {section.aside.copy ? <p className="ui-card__copy">{section.aside.copy}</p> : null}
          {section.aside.points?.length ? (
            <div className="mt-5 ui-stack ui-stack--tight">
              {section.aside.points.map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <span className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full bg-current opacity-70" />
                  <p className="m-0 text-sm leading-relaxed md:text-[0.98rem]">{item}</p>
                </div>
              ))}
            </div>
          ) : null}
        </SurfaceCard>
      ) : null}
    </div>
  );
}

function ClosingPrimaryActions({ items = [] }) {
  if (!items.length) return null;

  return (
    <div className="grid gap-6 md:grid-cols-2 no-print">
      {items.map((item) => (
        <button key={item.title} type="button" className="group text-left" onClick={item.onClick} aria-label={item.ariaLabel || item.title}>
          <div
            className={`mb-6 flex min-h-[16rem] items-center justify-center overflow-hidden rounded-[2rem] border-2 p-8 transition-all duration-300 ${item.previewClassName || ''}`}
          >
            {item.preview}
          </div>
          <h3 className="text-2xl font-black tracking-tight text-[var(--text-primary)]">{item.title}</h3>
          {item.description ? <p className="mt-3 text-base font-medium leading-relaxed text-[var(--text-secondary)]">{item.description}</p> : null}
          {item.meta?.length ? (
            <div className="mt-5 flex flex-wrap gap-2 text-[0.65rem] font-black uppercase tracking-[0.2em] text-[var(--text-muted)]">
              {item.meta.map((tag) => (
                <span key={tag} className="rounded-full border border-[var(--border-default)] bg-white px-3 py-2">
                  {tag}
                </span>
              ))}
            </div>
          ) : null}
          {item.assetMeta ? <p className="mt-4 text-[0.68rem] font-medium uppercase tracking-[0.16em] text-[var(--text-muted)]">{item.assetMeta}</p> : null}
          <div className="mt-5 flex items-center gap-3 text-[0.72rem] font-black uppercase tracking-[0.18em] text-[var(--accent-primary-strong)] underline underline-offset-8 decoration-2">
            {item.actionIcon}
            {item.actionLabel}
          </div>
        </button>
      ))}
    </div>
  );
}

function ClosingActionButton({ item, defaultLabel }) {
  if (item.href) {
    return (
      <Button as="a" href={item.href} className="mt-5" variant="secondary" target={item.target} rel={item.rel} download={item.kind === 'download'} aria-label={item.ariaLabel || item.actionLabel || defaultLabel}>
        {item.actionLabel || defaultLabel}
      </Button>
    );
  }

  if (item.onClick) {
    return (
      <Button className="mt-5" variant="secondary" onClick={item.onClick} aria-label={item.ariaLabel || item.actionLabel || defaultLabel}>
        {item.actionLabel || defaultLabel}
      </Button>
    );
  }

  return null;
}

function normalizeSearchText(value) {
  return String(value || '').trim().toLowerCase();
}

function getActionSearchText(item = {}) {
  return normalizeSearchText(
    [
      item.title,
      item.description,
      item.actionLabel,
      item.assetMeta,
      item.author,
      item.provider,
      item.age,
      item.type,
      ...(item.meta || []),
    ].join(' ')
  );
}

function filterActionItems(items = [], query = '') {
  if (!query) return items;
  return items.filter((item) => getActionSearchText(item).includes(query));
}

function slugifyToken(value) {
  return String(value || '')
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function getCollectionAnchorId(collection, index) {
  const derivedId = slugifyToken(collection.id || collection.eyebrow || collection.title);
  return derivedId ? `closing-${derivedId}` : `closing-collection-${index + 1}`;
}

function getActionItemKey(item, index) {
  return item.id || item.href || item.link || item.title || `closing-item-${index + 1}`;
}

function ClosingNavigator({ entries = [], query, setQuery, totalCount, resultCount }) {
  if (!entries.length && totalCount === 0) return null;

  return (
    <div className="rounded-[2rem] border border-[var(--border-default)] bg-white p-5 md:p-7 no-print">
      <div className="ui-stack ui-stack--tight">
        <div className="ui-split" style={{ alignItems: 'flex-start' }}>
          <div className="ui-stack ui-stack--tight" style={{ gap: '0.6rem' }}>
            <Eyebrow>Arbeitsindex</Eyebrow>
            <div className="ui-copy">
              <p>
                <strong>Materialien und Anschlusswege gezielt scannen.</strong>
              </p>
              <p>
                Die Abschlusszone lässt sich jetzt über einen kleinen Index und eine inhaltsnahe Suche schneller lesen. Die Suche prüft Materialtitel,
                Beschreibungen, Metadaten und Aktionslabels über alle sichtbaren Sammlungen hinweg.
              </p>
            </div>
          </div>
          <div className="rounded-[1.5rem] border border-[var(--border-default)] bg-[var(--surface-panel)] px-4 py-3 text-right">
            <div className="text-[0.68rem] font-black uppercase tracking-[0.18em] text-[var(--text-muted)]">Treffer</div>
            <div className="mt-1 text-2xl font-black tracking-tight text-[var(--text-primary)]">{resultCount}/{totalCount}</div>
          </div>
        </div>

        <label className="block">
          <span className="mb-2 block text-[0.72rem] font-black uppercase tracking-[0.18em] text-[var(--text-muted)]">Suche in Materialien und Anschlusswegen</span>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="z. B. Krisenplan, Netzwerkkarte, Glossar"
            className="w-full rounded-[1.25rem] border border-[var(--border-default)] bg-[var(--surface-app)] px-4 py-3 text-sm font-medium text-[var(--text-primary)] outline-none transition focus:border-[var(--accent-primary)] focus:bg-white"
          />
        </label>

        {entries.length ? (
          <div className="flex flex-wrap gap-3">
            {entries.map((entry) => (
              <a
                key={entry.href}
                href={entry.href}
                className="inline-flex items-center rounded-full border border-[var(--border-default)] bg-white px-4 py-2 text-[0.72rem] font-black uppercase tracking-[0.18em] text-[var(--text-primary)] transition hover:border-[var(--accent-primary)] hover:text-[var(--accent-primary-strong)]"
              >
                {entry.label}
                <span className="ml-2 rounded-full bg-[var(--surface-panel)] px-2 py-0.5 text-[0.64rem] text-[var(--text-muted)]">{entry.count}</span>
              </a>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}

function ClosingCollections({ collections = [] }) {
  if (!collections.length) return null;

  return collections.map((collection, index) => (
    <div key={collection.id || collection.eyebrow || collection.title} id={getCollectionAnchorId(collection, index)} className="ui-stack ui-stack--tight no-print scroll-mt-28">
      {collection.eyebrow ? <Eyebrow>{collection.eyebrow}</Eyebrow> : null}
      {collection.title || collection.description ? (
        <div className="ui-copy">
          {collection.title ? (
            <p>
              <strong>{collection.title}</strong>
              {collection.items?.length ? (
                <span className="ml-3 inline-flex rounded-full border border-[var(--border-default)] bg-[var(--surface-panel)] px-3 py-1 text-[0.68rem] font-black uppercase tracking-[0.16em] text-[var(--text-muted)]">
                  {collection.items.length} Elemente
                </span>
              ) : null}
            </p>
          ) : null}
          {collection.description ? <p>{collection.description}</p> : null}
        </div>
      ) : null}
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {collection.items.map((item, itemIndex) => (
          <SurfaceCard key={getActionItemKey(item, itemIndex)} tone={collection.collectionKind === 'books' ? 'soft' : 'default'} className="h-full">
            <MetaTags items={item.meta} />
            {item.age || item.type ? <p className="ui-fact-card__label">{item.age || item.type}</p> : null}
            <h3 className="ui-card__title">{item.title}</h3>
            {item.author ? <p className="ui-card__copy">{item.author}</p> : null}
            {item.provider ? <p className="ui-card__copy">{item.provider}</p> : null}
            {item.description ? <p className="ui-card__copy">{item.description}</p> : null}
            {item.assetMeta ? <p className="mt-4 text-[0.68rem] font-medium uppercase tracking-[0.16em] text-[var(--text-muted)]">{item.assetMeta}</p> : null}
            <ClosingActionButton item={item} defaultLabel={item.kind === 'download' ? 'Material herunterladen' : 'Ressource öffnen'} />
          </SurfaceCard>
        ))}
      </div>
    </div>
  ));
}

function ClosingRelatedLinks({ relatedLinks, relatedLinksId }) {
  if (!relatedLinks?.items?.length) return null;

  return (
    <div id={relatedLinksId} className="ui-stack ui-stack--tight no-print scroll-mt-28">
      {relatedLinks.eyebrow ? <Eyebrow>{relatedLinks.eyebrow}</Eyebrow> : null}
      <div className="ui-copy">
        {relatedLinks.title ? (
          <p>
            <strong>{relatedLinks.title}</strong>
            <span className="ml-3 inline-flex rounded-full border border-[color-mix(in_srgb,var(--accent-primary)_18%,white_82%)] bg-[var(--surface-note)] px-3 py-1 text-[0.68rem] font-black uppercase tracking-[0.16em] text-[var(--accent-primary-strong)]">
              {relatedLinks.items.length} Anschlusswege
            </span>
          </p>
        ) : null}
        {relatedLinks.description ? <p>{relatedLinks.description}</p> : null}
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {relatedLinks.items.map((item, itemIndex) => (
          <SurfaceCard key={getActionItemKey(item, itemIndex)} tone="soft" className="h-full">
            <MetaTags items={item.meta} tone="accent" />
            <h3 className="ui-card__title">{item.title}</h3>
            {item.description ? <p className="ui-card__copy">{item.description}</p> : null}
            <ClosingActionButton item={item} defaultLabel="Seite öffnen" />
          </SurfaceCard>
        ))}
      </div>
    </div>
  );
}

function ClosingNotes({ notes }) {
  if (!notes?.length) return null;

  return (
    <div className="ui-stack ui-stack--tight no-print">
      <div className="rounded-[2rem] border border-[color-mix(in_srgb,var(--accent-primary)_18%,white_82%)] bg-[var(--surface-note)] p-6 md:p-7">
        <div className="ui-stack ui-stack--tight">
          {notes.map((note) => (
            <p key={note} className="m-0 text-sm leading-relaxed md:text-[0.98rem]">
              {note}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}

function ClosingReferences({ references }) {
  if (!references) return null;

  return (
    <Section spacing="tight" surface="subtle" className="no-print">
      <div className="ui-stack ui-stack--loose">
        <div className="ui-stack ui-stack--tight">
          {references.eyebrow ? <Eyebrow>{references.eyebrow}</Eyebrow> : null}
          <h2 className="ui-hero__title" style={{ fontSize: 'clamp(1.75rem, 2.6vw, 2.75rem)' }}>
            {references.title}
          </h2>
          <RichCopy paragraphs={references.paragraphs} />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {references.items?.map((item) => (
            <div key={`${item.author}-${item.title}`} className="rounded-[1.75rem] border border-[var(--border-default)] bg-white p-5">
              <p className="ui-fact-card__label">{item.author}</p>
              <h3 className="ui-card__title">{item.title}</h3>
              {item.publisher ? <p className="ui-card__copy">{item.publisher}</p> : null}
              {item.link ? (
                <p className="mt-5 text-sm font-black text-[var(--accent-primary-strong)]">
                  <a href={item.link} target="_blank" rel="noreferrer">
                    Quelle öffnen
                  </a>
                </p>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

export default function ClosingSection({ section, sectionId, surface = 'plain', className = '' }) {
  const [query, setQuery] = useState('');
  const hasPrintView = Boolean(section?.printView);

  const normalizedQuery = normalizeSearchText(query);
  const relatedLinksId = `${section?.id || sectionId || 'closing'}-related-links`;

  const filteredCollections = useMemo(
    () =>
      (section?.collections || [])
        .map((collection) => ({
          ...collection,
          items: filterActionItems(collection.items, normalizedQuery),
        }))
        .filter((collection) => collection.items.length),
    [normalizedQuery, section?.collections]
  );

  const filteredRelatedLinks = useMemo(() => {
    if (!section?.relatedLinks) return null;

    const items = filterActionItems(section.relatedLinks.items, normalizedQuery);
    if (!items.length) return null;

    return {
      ...section.relatedLinks,
      items,
    };
  }, [normalizedQuery, section?.relatedLinks]);

  const totalCount = useMemo(
    () =>
      (section?.collections || []).reduce((sum, collection) => sum + (collection.items?.length || 0), 0) +
      (section?.relatedLinks?.items?.length || 0),
    [section?.collections, section?.relatedLinks?.items]
  );

  const resultCount = useMemo(
    () =>
      filteredCollections.reduce((sum, collection) => sum + (collection.items?.length || 0), 0) +
      (filteredRelatedLinks?.items?.length || 0),
    [filteredCollections, filteredRelatedLinks]
  );

  const navigatorEntries = useMemo(() => {
    const entries = filteredCollections.map((collection, index) => ({
      href: `#${getCollectionAnchorId(collection, index)}`,
      label: collection.title || collection.eyebrow || `Sammlung ${index + 1}`,
      count: collection.items.length,
    }));

    if (filteredRelatedLinks?.items?.length) {
      entries.push({
        href: `#${relatedLinksId}`,
        label: filteredRelatedLinks.title || filteredRelatedLinks.eyebrow || 'Anschlusswege',
        count: filteredRelatedLinks.items.length,
      });
    }

    return entries;
  }, [filteredCollections, filteredRelatedLinks, relatedLinksId]);

  if (!section) return null;

  return (
    <>
      <Section id={section.id || sectionId} spacing="tight" surface={surface} className={className}>
        <div className={hasPrintView ? 'ui-stack ui-stack--loose no-print' : 'ui-stack ui-stack--loose'}>
          <ClosingHeader section={section} />
          <ClosingPrimaryActions items={section.primaryActions} />
          {(totalCount || navigatorEntries.length) ? (
            <ClosingNavigator entries={navigatorEntries} query={query} setQuery={setQuery} totalCount={totalCount} resultCount={resultCount} />
          ) : null}
          <ClosingCollections collections={filteredCollections} />
          <ClosingRelatedLinks relatedLinks={filteredRelatedLinks} relatedLinksId={relatedLinksId} />
          {normalizedQuery && resultCount === 0 ? (
            <div className="rounded-[1.75rem] border border-dashed border-[var(--border-default)] bg-[var(--surface-panel)] p-6 no-print">
              <p className="m-0 text-sm font-medium leading-relaxed text-[var(--text-secondary)]">
                Für <strong>{query}</strong> wurden in den aktuellen Materialien und Anschlusswegen keine Treffer gefunden. Versuchen Sie einen allgemeineren Begriff.
              </p>
            </div>
          ) : null}
          <ClosingNotes notes={section.notes} />
          {section.printView ? <div className="print-only">{section.printView}</div> : null}
        </div>
      </Section>
      <ClosingReferences references={section.references} />
    </>
  );
}
