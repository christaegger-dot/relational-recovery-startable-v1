import { ExternalLink, MapPin, Search, XCircle } from 'lucide-react';
import Button from '../components/ui/Button';
import Container from '../components/ui/Container';
import Eyebrow from '../components/ui/Eyebrow';
import PageHero from '../components/ui/PageHero';
import Section from '../components/ui/Section';
import SectionHeader from '../components/ui/SectionHeader';
import SurfaceCard from '../components/ui/SurfaceCard';

function FilterChipButton({ filter, isActive, onClick }) {
  return (
    <button
      type="button"
      onClick={() => onClick(filter.id)}
      aria-pressed={isActive}
      className={`ui-chip ${isActive ? 'ui-chip--active' : ''}`}
    >
      {filter.label}
    </button>
  );
}

function FilterToolbar({
  filters = [],
  filterGroups = [],
  activeFilter,
  onFilterChange,
  searchTerm,
  onSearchChange,
  onReset,
  searchStatusText,
  filterStatusText,
}) {
  // Audit P2 #13: Filter werden nach Gruppen gerendert (Erreichbarkeit,
  // Lebensphase, Schwerpunkt, Rahmen) statt flach in einer Reihe.
  // "Alle" steht als Reset-Chip vor allen Gruppen.
  const resetFilter = filters.find((filter) => filter.group == null);
  const groupedFilters = filterGroups.map((group) => ({
    ...group,
    items: filters.filter((filter) => filter.group === group.id),
  }));

  return (
    <div className="ui-network-toolbar">
      <div className="ui-stack ui-stack--tight">
        <div className="ui-stack ui-stack--relaxed">
          <Eyebrow>Filter</Eyebrow>
          <div className="ui-copy">
            <p>
              Die Filter sind nach Erreichbarkeit, Lebensphase, Schwerpunkt und Rahmen gruppiert, damit je nach Lage
              schneller priorisiert werden kann.
            </p>
          </div>
        </div>

        <fieldset>
          <legend className="ui-visually-hidden">Fachstellen filtern</legend>
          <div className="ui-network-filter-groups">
            {resetFilter ? (
              <div className="ui-network-filter-reset">
                <FilterChipButton
                  filter={resetFilter}
                  isActive={activeFilter === resetFilter.id}
                  onClick={onFilterChange}
                />
              </div>
            ) : null}
            {groupedFilters.map((group) =>
              group.items.length ? (
                <div
                  key={group.id}
                  className="ui-network-filter-group"
                  role="group"
                  aria-label={`Filter: ${group.label}`}
                >
                  <p className="ui-network-filter-group__label">{group.label}</p>
                  <div className="ui-chip-row">
                    {group.items.map((filter) => (
                      <FilterChipButton
                        key={filter.id}
                        filter={filter}
                        isActive={activeFilter === filter.id}
                        onClick={onFilterChange}
                      />
                    ))}
                  </div>
                </div>
              ) : null
            )}
          </div>
        </fieldset>
        <p className="ui-visually-hidden" role="status" aria-live="polite" aria-atomic="true">
          {filterStatusText}
        </p>
      </div>

      <div className="ui-stack ui-stack--tight">
        <label htmlFor="network-resource-search" className="ui-network-search-label">
          Fachstelle suchen
        </label>
        <div className="ui-network-search">
          <Search className="ui-network-search__icon" size={18} aria-hidden="true" />
          <input
            id="network-resource-search"
            type="text"
            value={searchTerm}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Name, Schlagwort oder Tag"
            aria-describedby="network-resource-search-status"
            className="ui-input ui-network-search__input"
          />
        </div>
        <p
          id="network-resource-search-status"
          role="status"
          aria-live="polite"
          aria-atomic="true"
          className="ui-visually-hidden"
        >
          {searchStatusText}
        </p>
        {(searchTerm.trim() || activeFilter !== 'all') && (
          <Button variant="secondary" className="ui-button--fit-content" onClick={onReset}>
            <XCircle size={14} aria-hidden="true" /> Suche und Filter zurücksetzen
          </Button>
        )}
      </div>
    </div>
  );
}

function ResourceDirectorySection({ directory }) {
  if (!directory) return null;

  const {
    intro,
    filters,
    filterGroups,
    activeFilter,
    onFilterChange,
    searchTerm,
    onSearchChange,
    onReset,
    searchStatusText,
    filterStatusText,
    resources = [],
  } = directory;

  return (
    <Section
      id={directory.id || 'netzwerk-fachstellen'}
      spacing="tight"
      surface={directory.surface || 'plain'}
      className="no-print"
    >
      <div className="ui-stack ui-stack--loose">
        <SectionHeader
          eyebrow={intro?.eyebrow}
          title={intro?.title}
          titleAccent={intro?.accent}
          paragraphs={intro?.paragraphs}
          aside={intro?.aside}
        />

        <FilterToolbar
          filters={filters}
          filterGroups={filterGroups}
          activeFilter={activeFilter}
          onFilterChange={onFilterChange}
          searchTerm={searchTerm}
          onSearchChange={onSearchChange}
          onReset={onReset}
          searchStatusText={searchStatusText}
          filterStatusText={filterStatusText}
        />

        {resources.length ? (
          <div className="ui-network-resource-grid">
            {resources.map((resource) => (
              <SurfaceCard key={resource.name} tone="default" className="ui-card--interactive ui-card--full-height">
                {resource.tags?.length ? (
                  <div className="ui-network-tag-row">
                    {resource.tags.map((tag) => (
                      <span key={tag} className="ui-network-tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                ) : null}
                <h3 className="ui-card__title">{resource.name}</h3>
                <p className="ui-card__copy">{resource.description}</p>
                <div className="ui-editorial-card__action">
                  <Button
                    href={resource.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="subtle"
                    aria-label={`${resource.name} – Webseite öffnen (neues Fenster)`}
                  >
                    Webseite öffnen <ExternalLink size={16} aria-hidden="true" />
                  </Button>
                </div>
              </SurfaceCard>
            ))}
          </div>
        ) : (
          <SurfaceCard tone="soft" className="no-print">
            <div className="ui-network-empty">
              <div>
                <p className="ui-fact-card__label">Keine Treffer</p>
                <h3 className="ui-card__title">Zur aktuellen Kombination wurden keine Fachstellen gefunden.</h3>
                <p className="ui-card__copy">
                  Prüfen Sie Schreibweise, entfernen Sie einzelne Filter oder setzen Sie Suche und Auswahl gemeinsam
                  zurück.
                </p>
              </div>
              <Button type="button" onClick={onReset} variant="secondary">
                <XCircle size={16} aria-hidden="true" /> Zurücksetzen
              </Button>
            </div>
          </SurfaceCard>
        )}
      </div>
    </Section>
  );
}

function MapLensButtons({ lenses = [], activeLens, onLensChange }) {
  return (
    <div className="ui-chip-row" role="group" aria-label="Netzwerkkarte Lesart wählen">
      {lenses.map((lens) => {
        const isActive = activeLens === lens.id;

        return (
          <button
            key={lens.id}
            type="button"
            onClick={() => onLensChange(lens.id)}
            aria-pressed={isActive}
            className={`ui-chip ${isActive ? 'ui-chip--active' : ''}`}
          >
            {lens.label}
          </button>
        );
      })}
    </div>
  );
}

function getNodeToneClass(tone) {
  switch (tone) {
    case 'private':
      return 'ui-network-map-node--private';
    case 'support':
      return 'ui-network-map-node--support';
    case 'gap':
      return 'ui-network-map-node--gap';
    case 'formal':
    default:
      return 'ui-network-map-node--formal';
  }
}

function getNodePositionKey(node) {
  return node.positionKey ?? null;
}

function MapNode({ node, highlighted }) {
  return (
    <div
      className={[
        'ui-network-map-node',
        'ui-network-map-node--desktop',
        getNodeToneClass(node.tone),
        getNodePositionKey(node) ? `ui-network-map-node--${getNodePositionKey(node)}` : '',
        highlighted ? 'ui-network-map-node--highlighted' : '',
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <div className="ui-network-map-node__label">{node.label}</div>
    </div>
  );
}

function MobileMapNode({ node, highlighted }) {
  return (
    <div
      className={[
        'ui-network-map-node',
        'ui-network-map-node--mobile',
        getNodeToneClass(node.tone),
        getNodePositionKey(node) ? `ui-network-map-node--mobile-${getNodePositionKey(node)}` : '',
        highlighted ? 'ui-network-map-node--highlighted' : '',
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <div className="ui-network-map-node__label">{node.label}</div>
    </div>
  );
}

function NetworkMapSection({ mapping }) {
  if (!mapping) return null;

  const {
    intro,
    steps = [],
    questions = [],
    lenses = [],
    activeLensId,
    onLensChange,
    visibleNodes = [],
    activeLens,
    counts = [],
    lensSummary,
    nextStepText,
  } = mapping;
  const highlightedNode = visibleNodes[0] ?? null;

  return (
    <Section
      id={mapping.id || 'netzwerk-karte'}
      spacing="tight"
      surface={mapping.surface || 'subtle'}
      className="no-print"
    >
      <div className="ui-stack ui-stack--loose">
        <SectionHeader
          eyebrow={intro?.eyebrow}
          title={intro?.title}
          titleAccent={intro?.accent}
          paragraphs={intro?.paragraphs}
          aside={intro?.aside}
          asideTone="default"
        />

        <div className="ui-network-steps-grid">
          {steps.map((step, index) => (
            <SurfaceCard key={step} tone={index === 2 ? 'soft' : 'default'}>
              <p className="ui-fact-card__label">Schritt {index + 1}</p>
              <p className="ui-card__copy">{step}</p>
            </SurfaceCard>
          ))}
        </div>

        <div className="ui-network-analysis-grid">
          <SurfaceCard tone="default">
            <div className="ui-network-map-header">
              <div>
                <p className="ui-fact-card__label">Nutzbare Netzwerkkarte</p>
                <p className="ui-card__copy">
                  Die Mitte steht für das Kind oder die Familie. Über die Linsen lässt sich prüfen, ob privates Umfeld,
                  Alltagsstützen, Fachstellen und Versorgungslücken ausreichend sichtbar werden.
                </p>
              </div>
              <MapLensButtons lenses={lenses} activeLens={activeLensId} onLensChange={onLensChange} />
            </div>

            <div className="ui-network-map-shell">
              <div>
                <div
                  className="ui-card--outline ui-network-map-stage is-desktop"
                  role="img"
                  aria-label="Netzwerkkarte: visuelle Darstellung der Bezugspersonen rund um Kind und Familie"
                >
                  <div className="ui-network-map-center-shell" aria-hidden="true" />
                  <div className="ui-network-map-center-orbit" aria-hidden="true" />
                  <div className="ui-network-map-ring" aria-hidden="true" />

                  <div className="ui-network-map-center">
                    <div>
                      <div className="ui-network-map-center__label">Zentrum</div>
                      <div className="ui-network-map-center__title">Kind / Familie</div>
                    </div>
                  </div>

                  {visibleNodes.map((node) => (
                    <MapNode key={node.label} node={node} highlighted={highlightedNode?.label === node.label} />
                  ))}
                </div>

                <div className="ui-network-map-mobile">
                  <div className="ui-network-map-mobile__center">
                    <div className="ui-network-map-center__label">Zentrum</div>
                    <div className="ui-network-map-center__title">Kind / Familie</div>
                  </div>
                  {visibleNodes.map((node) => (
                    <MobileMapNode key={node.label} node={node} highlighted={highlightedNode?.label === node.label} />
                  ))}
                </div>
              </div>

              <div className="ui-stack ui-stack--tight ui-network-map-side">
                {/* Audit 15 A-2: <div>, nicht <aside> -- Side-Panel zur Map,
                    kein page-level Landmark. */}
                <div className="ui-network-map-side__block">
                  <p className="ui-fact-card__label">Aktive Lesart</p>
                  {activeLens?.label ? <h3 className="ui-card__title">{activeLens.label}</h3> : null}
                  {activeLens?.description ? <p className="ui-card__copy">{activeLens.description}</p> : null}
                  {lensSummary ? (
                    <div className="ui-network-map-summary">
                      <p>{lensSummary}</p>
                    </div>
                  ) : null}
                </div>

                <div className="ui-network-count-grid">
                  {counts.map((count) => (
                    <div key={count.label} className="ui-network-map-count">
                      <p className="ui-fact-card__label">{count.label}</p>
                      <p className="ui-fact-card__value">{count.value}</p>
                      {count.note ? <p className="ui-fact-card__note">{count.note}</p> : null}
                    </div>
                  ))}
                </div>

                <div className="ui-network-map-side__block">
                  <p className="ui-fact-card__label">Nächster Schritt</p>
                  <p className="ui-card__copy">{nextStepText}</p>
                </div>
              </div>
            </div>
          </SurfaceCard>

          {/* Audit 15 A-2: as="div" statt as="aside" -- Leitfragen-Karte
              kontextuell zur Map-Sektion, kein eigener Landmark. */}
          <SurfaceCard as="div" tone="default">
            <div className="ui-note-panel__label ui-note-panel__label--with-icon">
              <MapPin size={16} aria-hidden="true" /> Leitfragen für die Exploration
            </div>
            <div className="ui-network-question-list">
              {questions.map((question) => (
                <div key={question} className="ui-network-question-item">
                  <span className="ui-network-question-item__bullet" />
                  <p className="ui-network-question-item__text">{question}</p>
                </div>
              ))}
            </div>
          </SurfaceCard>
        </div>

        <div className="ui-network-reflection-grid">
          <SurfaceCard tone="default">
            <p className="ui-fact-card__label">Arbeitsauswertung</p>
            <p className="ui-card__copy">
              Die Karte wird am nützlichsten, wenn nach dem Visualisieren drei Fragen folgen: Wer trägt schon? Wo ist
              die Lage brüchig? Was muss als Nächstes konkret abgesprochen werden?
            </p>
          </SurfaceCard>
          <SurfaceCard tone="soft">
            <p className="ui-fact-card__label">Leitfragen danach</p>
            <div className="ui-network-followup-list">
              <p className="ui-network-question-item__text">Wer weiss bereits Bescheid?</p>
              <p className="ui-network-question-item__text">Wer könnte Kinder kurzfristig übernehmen?</p>
              <p className="ui-network-question-item__text">Welche Stelle fehlt noch im Netzwerk?</p>
            </div>
          </SurfaceCard>
        </div>

        <div className="ui-network-node-grid">
          {visibleNodes.map((node) => (
            <SurfaceCard
              key={node.label}
              tone={node.tone === 'gap' ? 'soft' : 'default'}
              className="ui-card--full-height"
            >
              <p className="ui-fact-card__label">
                {node.zone === 'near'
                  ? 'Nahe Ebene'
                  : node.zone === 'mid'
                    ? 'Tragende Ebene'
                    : node.zone === 'outer'
                      ? 'Aeussere Ebene'
                      : 'Versorgungslücke'}
              </p>
              <h3 className="ui-card__title">{node.label}</h3>
              <p className="ui-card__copy">{node.detail}</p>
            </SurfaceCard>
          ))}
        </div>
      </div>
    </Section>
  );
}

export default function NetworkPageTemplate({ hero, pageHeadingId, directory, mapping }) {
  return (
    <article className="ui-stack">
      <Container width="wide">
        <PageHero {...hero} headingId={pageHeadingId} />
      </Container>
      <ResourceDirectorySection directory={directory} />
      <NetworkMapSection mapping={mapping} />
    </article>
  );
}
