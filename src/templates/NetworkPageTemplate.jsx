import { ExternalLink, MapPin, Search, XCircle } from 'lucide-react';
import Button from '../components/ui/Button';
import Container from '../components/ui/Container';
import Eyebrow from '../components/ui/Eyebrow';
import PageHero from '../components/ui/PageHero';
import Section from '../components/ui/Section';
import SurfaceCard from '../components/ui/SurfaceCard';

function FilterToolbar({ filters = [], activeFilter, onFilterChange, searchTerm, onSearchChange, onReset, searchStatusText, filterStatusText }) {
  return (
    <div className="ui-network-toolbar">
      <div className="ui-stack ui-stack--tight">
        <div className="ui-stack ui-stack--relaxed">
          <Eyebrow>Filter</Eyebrow>
          <div className="ui-copy">
            <p>
              Die Filter gruppieren Krisenwege, jugendbezogene Angebote, Entlastung und offizielle Stellen, damit je nach Lage schneller priorisiert werden kann.
            </p>
          </div>
        </div>

        <fieldset>
          <legend className="sr-only">Fachstellen filtern</legend>
          <div className="ui-chip-row">
            {filters.map((filter) => {
              const isActive = activeFilter === filter.id;

              return (
                <button
                  key={filter.id}
                  type="button"
                  onClick={() => onFilterChange(filter.id)}
                  aria-pressed={isActive}
                  className={`ui-chip ${isActive ? 'ui-chip--active' : ''}`}
                >
                  {filter.label}
                </button>
              );
            })}
          </div>
        </fieldset>
        <p className="sr-only" role="status" aria-live="polite" aria-atomic="true">
          {filterStatusText}
        </p>
      </div>

      <div className="ui-stack ui-stack--tight">
        <label htmlFor="network-resource-search" className="ui-network-search-label">
          Fachstelle suchen
        </label>
        <div className="ui-network-search">
          <Search className="ui-network-search__icon" size={18} />
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
        <p id="network-resource-search-status" role="status" aria-live="polite" aria-atomic="true" className="sr-only">
          {searchStatusText}
        </p>
        {(searchTerm.trim() || activeFilter !== 'all') && (
          <Button variant="secondary" className="ui-button--fit-content" onClick={onReset}>
            <XCircle size={14} /> Suche und Filter zurücksetzen
          </Button>
        )}
      </div>
    </div>
  );
}

function ResourceDirectorySection({ directory }) {
  if (!directory) return null;

  const { intro, filters, activeFilter, onFilterChange, searchTerm, onSearchChange, onReset, searchStatusText, filterStatusText, resources = [] } = directory;

  return (
    <Section id={directory.id || 'network-directory'} spacing="tight" surface={directory.surface || 'plain'} className="no-print">
      <div className="ui-stack ui-stack--loose">
        <div className="ui-split">
          <div className="ui-stack ui-stack--tight">
            {intro?.eyebrow ? <Eyebrow>{intro.eyebrow}</Eyebrow> : null}
            <h2 className="ui-hero__title ui-section-title">
              {intro?.title} {intro?.accent ? <span className="ui-hero__accent">{intro.accent}</span> : null}
            </h2>
            <div className="ui-copy">
              {intro?.paragraphs?.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>

          {intro?.aside ? (
            <SurfaceCard as="aside" tone={intro.aside.tone || 'soft'}>
              {intro.aside.label ? <p className="ui-fact-card__label">{intro.aside.label}</p> : null}
              {intro.aside.title ? <h3 className="ui-card__title">{intro.aside.title}</h3> : null}
              {intro.aside.copy ? <p className="ui-card__copy">{intro.aside.copy}</p> : null}
            </SurfaceCard>
          ) : null}
        </div>

        <FilterToolbar
          filters={filters}
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
                <p className="ui-card__copy">{resource.info}</p>
                <div className="ui-editorial-card__action">
                  <Button href={resource.link} target="_blank" rel="noopener noreferrer" variant="subtle">
                    Webseite öffnen <ExternalLink size={16} />
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
                <p className="ui-card__copy">Prüfen Sie Schreibweise, entfernen Sie einzelne Filter oder setzen Sie Suche und Auswahl gemeinsam zurück.</p>
              </div>
              <Button type="button" onClick={onReset} variant="secondary">
                <XCircle size={16} /> Zurücksetzen
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
    <div className="ui-chip-row">
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

function getNodePositionKey(label) {
  switch (label) {
    case 'Partner:in':
      return 'partner-in';
    case 'Grosseltern':
      return 'grosseltern';
    case 'Schule / Kita':
      return 'schule-kita';
    case 'Freund:in des Kindes':
      return 'freund-in-des-kindes';
    case 'PUK / kjz':
      return 'puk-kjz';
    case 'Kinderbetreuung im Notfall':
      return 'kinderbetreuung-im-notfall';
    case 'Mitwissende Vertrauensperson':
      return 'mitwissende-vertrauensperson';
    default:
      return null;
  }
}

function MapNode({ node, highlighted }) {
  return (
    <div
      className={[
        'ui-network-map-node',
        'ui-network-map-node--desktop',
        getNodeToneClass(node.tone),
        getNodePositionKey(node.label) ? `ui-network-map-node--${getNodePositionKey(node.label)}` : '',
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
        getNodePositionKey(node.label) ? `ui-network-map-node--mobile-${getNodePositionKey(node.label)}` : '',
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

  const { intro, steps = [], questions = [], lenses = [], activeLensId, onLensChange, visibleNodes = [], activeLens, counts = [], lensSummary, nextStepText } = mapping;
  const highlightedNode = visibleNodes[0] ?? null;

  return (
    <Section id={mapping.id || 'network-map'} spacing="tight" surface={mapping.surface || 'subtle'} className="no-print">
      <div className="ui-stack ui-stack--loose">
        <div className="ui-split">
          <div className="ui-stack ui-stack--tight">
            {intro?.eyebrow ? <Eyebrow>{intro.eyebrow}</Eyebrow> : null}
            <h2 className="ui-hero__title ui-section-title">
              {intro?.title} {intro?.accent ? <span className="ui-hero__accent">{intro.accent}</span> : null}
            </h2>
            <div className="ui-copy">
              {intro?.paragraphs?.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>

          {intro?.aside ? (
            <SurfaceCard as="aside" tone={intro.aside.tone || 'default'}>
              {intro.aside.label ? <p className="ui-fact-card__label">{intro.aside.label}</p> : null}
              {intro.aside.title ? <h3 className="ui-card__title">{intro.aside.title}</h3> : null}
              {intro.aside.copy ? <p className="ui-card__copy">{intro.aside.copy}</p> : null}
            </SurfaceCard>
          ) : null}
        </div>

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
                  Die Mitte steht für das Kind oder die Familie. Über die Linsen lässt sich prüfen, ob privates Umfeld, Alltagsstützen, Fachstellen und Versorgungslücken ausreichend sichtbar werden.
                </p>
              </div>
              <MapLensButtons lenses={lenses} activeLens={activeLensId} onLensChange={onLensChange} />
            </div>

            <div className="ui-network-map-shell">
              <div>
                <div className="ui-card--outline ui-network-map-stage is-desktop">
                  <div className="ui-network-map-center-shell" />
                  <div className="ui-network-map-center-orbit" />
                  <div className="ui-network-map-ring" />

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

              <div className="ui-stack ui-stack--tight">
                <SurfaceCard as="aside" tone="soft">
                  <p className="ui-fact-card__label">Aktive Lesart</p>
                  {activeLens?.label ? <h3 className="ui-card__title">{activeLens.label}</h3> : null}
                  {activeLens?.description ? <p className="ui-card__copy">{activeLens.description}</p> : null}
                  {lensSummary ? (
                    <div className="ui-network-map-summary">
                      <p>{lensSummary}</p>
                    </div>
                  ) : null}
                </SurfaceCard>

                <div className="ui-network-count-grid">
                  {counts.map((count) => (
                    <SurfaceCard key={count.label} tone={count.tone || 'default'} className="ui-card--full-height">
                      <p className="ui-fact-card__label">{count.label}</p>
                      <p className="ui-fact-card__value">{count.value}</p>
                      {count.note ? <p className="ui-fact-card__note">{count.note}</p> : null}
                    </SurfaceCard>
                  ))}
                </div>

                <SurfaceCard tone="default">
                  <p className="ui-fact-card__label">Nächster Schritt</p>
                  <p className="ui-card__copy">{nextStepText}</p>
                </SurfaceCard>
              </div>
            </div>
          </SurfaceCard>

          <SurfaceCard as="aside" tone="default">
            <div className="ui-note-panel__label ui-note-panel__label--with-icon">
              <MapPin size={16} /> Leitfragen für die Exploration
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
              Die Karte wird am nützlichsten, wenn nach dem Visualisieren drei Fragen folgen: Wer trägt schon? Wo ist die Lage brüchig? Was muss als Nächstes konkret abgesprochen werden?
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
            <SurfaceCard key={node.label} tone={node.tone === 'gap' ? 'soft' : 'default'} className="ui-card--full-height">
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
