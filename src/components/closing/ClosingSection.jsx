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
      {paragraphs.map((paragraph, i) => (
        <p key={i}>{paragraph}</p>
      ))}
    </div>
  );
}

function MetaTags({ items = [], tone = 'default' }) {
  if (!items.length) return null;

  const className =
    tone === 'accent' ? 'ui-closing-tag ui-closing-tag--accent' : 'ui-closing-tag';

  return (
    <div className="ui-badge-row ui-closing-tags">
      {items.map((tag, i) => (
        <span key={i} className={className}>
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
          className={[
            'ui-hero__title',
            'ui-closing-header__title',
            section.headingTransform === 'uppercase' ? 'ui-closing-header__title--uppercase' : '',
            section.headingLetterSpacing === '0.12em' ? 'ui-closing-header__title--tracked' : '',
          ]
            .filter(Boolean)
            .join(' ')}
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
            <div className="ui-card__section--spaced ui-stack ui-stack--tight">
              {section.aside.points.map((item, i) => (
                <div key={i} className="ui-bullet-panel__item">
                  <span className="ui-bullet-panel__dot" />
                  <p className="ui-bullet-panel__copy">{item}</p>
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
    <div className="ui-closing-actions-grid no-print">
      {items.map((item) => (
        <button key={item.title} type="button" className="ui-closing-action" onClick={item.onClick} aria-label={item.ariaLabel || item.title}>
          <div
            className={`ui-closing-action__preview ${item.previewClassName || ''}`}
          >
            {item.preview}
          </div>
          <h3 className="ui-closing-action__title">{item.title}</h3>
          {item.description ? <p className="ui-closing-action__copy">{item.description}</p> : null}
          {item.meta?.length ? (
            <div className="ui-badge-row ui-closing-action__meta">
              {item.meta.map((tag, i) => (
                <span key={i} className="ui-badge ui-badge--subtle">
                  {tag}
                </span>
              ))}
            </div>
          ) : null}
          {item.assetMeta ? <p className="ui-closing-item__meta">{item.assetMeta}</p> : null}
          <div className="ui-closing-action__link">
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
      <Button as="a" href={item.href} className="ui-editorial-card__action" variant="secondary" target={item.target} rel={item.rel} download={item.kind === 'download'} aria-label={item.ariaLabel || item.actionLabel || defaultLabel}>
        {item.actionLabel || defaultLabel}
      </Button>
    );
  }

  if (item.onClick) {
    return (
      <Button className="ui-editorial-card__action" variant="secondary" onClick={item.onClick} aria-label={item.ariaLabel || item.actionLabel || defaultLabel}>
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
  return item.id || item.href || item.title || `closing-item-${index + 1}`;
}

function ClosingNavigator({ entries = [], query, setQuery, totalCount, resultCount }) {
  if (!entries.length && totalCount === 0) return null;

  return (
    <div className="ui-closing-navigator no-print">
      <div className="ui-stack ui-stack--tight">
        <div className="ui-split ui-closing-navigator__intro">
          <div className="ui-stack ui-stack--tight ui-closing-navigator__copy">
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
          <div className="ui-closing-navigator__stat">
            <div className="ui-closing-navigator__stat-label">Treffer</div>
            <div className="ui-closing-navigator__stat-value">{resultCount}/{totalCount}</div>
          </div>
        </div>

        <label className="ui-closing-navigator__search">
          <span className="ui-closing-navigator__search-label">Suche in Materialien und Anschlusswegen</span>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="z. B. Krisenplan, Netzwerkkarte, Glossar"
            className="ui-input"
          />
        </label>

        {entries.length ? (
          <div className="ui-chip-row ui-closing-navigator__entries">
            {entries.map((entry) => (
              <a
                key={entry.href}
                href={entry.href}
                className="ui-closing-navigator__entry"
              >
                {entry.label}
                <span className="ui-closing-navigator__entry-count">{entry.count}</span>
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
    <div key={collection.id || collection.eyebrow || collection.title} id={getCollectionAnchorId(collection, index)} className="ui-stack ui-stack--tight no-print ui-anchor-offset-target">
      {collection.eyebrow ? <Eyebrow>{collection.eyebrow}</Eyebrow> : null}
      {collection.title || collection.description ? (
        <div className="ui-copy">
          {collection.title ? (
            <p>
              <strong>{collection.title}</strong>
              {collection.items?.length ? (
                <span className="ui-closing-collection__count">
                  {collection.items.length} Elemente
                </span>
              ) : null}
            </p>
          ) : null}
          {collection.description ? <p>{collection.description}</p> : null}
        </div>
      ) : null}
      <div className="ui-closing-collection-grid">
        {collection.items.map((item, itemIndex) => (
          <SurfaceCard key={getActionItemKey(item, itemIndex)} tone={collection.collectionKind === 'books' ? 'soft' : 'default'} className="ui-closing-collection-card">
            <MetaTags items={item.meta} />
            {item.age || item.type ? <p className="ui-fact-card__label">{item.age || item.type}</p> : null}
            <h3 className="ui-card__title">{item.title}</h3>
            {item.author ? <p className="ui-card__copy">{item.author}</p> : null}
            {item.provider ? <p className="ui-card__copy">{item.provider}</p> : null}
            {item.description ? <p className="ui-card__copy">{item.description}</p> : null}
            {item.assetMeta ? <p className="ui-closing-item__meta">{item.assetMeta}</p> : null}
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
    <div id={relatedLinksId} className="ui-stack ui-stack--tight no-print ui-anchor-offset-target">
      {relatedLinks.eyebrow ? <Eyebrow>{relatedLinks.eyebrow}</Eyebrow> : null}
      <div className="ui-copy">
        {relatedLinks.title ? (
          <p>
            <strong>{relatedLinks.title}</strong>
            <span className="ui-closing-related-links__count">
              {relatedLinks.items.length} Anschlusswege
            </span>
          </p>
        ) : null}
        {relatedLinks.description ? <p>{relatedLinks.description}</p> : null}
      </div>
      <div className="ui-card-grid ui-card-grid--3">
        {relatedLinks.items.map((item, itemIndex) => (
          <SurfaceCard key={getActionItemKey(item, itemIndex)} tone="soft" className="ui-closing-collection-card">
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
      <div className="ui-closing-notes">
        <div className="ui-stack ui-stack--tight">
          {notes.map((note, i) => (
            <p key={i} className="ui-closing-note">
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
          <h2 className="ui-hero__title ui-closing-references__title">
            {references.title}
          </h2>
          <RichCopy paragraphs={references.paragraphs} />
        </div>

        <div className="ui-card-grid ui-card-grid--2">
          {references.items?.map((item) => (
            <div key={`${item.author}-${item.title}`} className="ui-closing-reference-card">
              <p className="ui-fact-card__label">{item.author}</p>
              <h3 className="ui-card__title">{item.title}</h3>
              {item.publisher ? <p className="ui-card__copy">{item.publisher}</p> : null}
              {item.link ? (
                <p className="ui-closing-reference-card__action">
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
            <div className="ui-closing-empty-state no-print">
              <p className="ui-closing-empty-state__copy">
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
