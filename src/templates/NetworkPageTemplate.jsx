import { ExternalLink, MapPin, Search, XCircle } from 'lucide-react';
import Button from '../components/ui/Button';
import Container from '../components/ui/Container';
import Eyebrow from '../components/ui/Eyebrow';
import PageHero from '../components/ui/PageHero';
import Section from '../components/ui/Section';
import SurfaceCard from '../components/ui/SurfaceCard';

function FilterToolbar({ filters = [], activeFilter, onFilterChange, searchTerm, onSearchChange, onReset, searchStatusText, filterStatusText }) {
  return (
    <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_22rem] xl:items-start">
      <div className="ui-stack ui-stack--tight">
        <div>
          <Eyebrow>Filter</Eyebrow>
          <p className="mt-3 text-sm leading-relaxed text-[var(--text-secondary)]">
            Die Filter gruppieren Krisenwege, jugendbezogene Angebote, Entlastung und offizielle Stellen, damit je nach Lage schneller priorisiert werden kann.
          </p>
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
        <label htmlFor="network-resource-search" className="text-[0.7rem] font-black uppercase tracking-[0.18em] text-[var(--text-muted)]">
          Fachstelle suchen
        </label>
        <div className="relative">
          <Search className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" size={18} />
          <input
            id="network-resource-search"
            type="text"
            value={searchTerm}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Name, Schlagwort oder Tag"
            aria-describedby="network-resource-search-status"
            className="ui-input pl-14 pr-5"
          />
        </div>
        <p id="network-resource-search-status" role="status" aria-live="polite" aria-atomic="true" className="sr-only">
          {searchStatusText}
        </p>
        {(searchTerm.trim() || activeFilter !== 'all') && (
          <Button variant="secondary" className="w-fit" onClick={onReset}>
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
            <h2 className="ui-hero__title" style={{ fontSize: 'clamp(1.85rem, 3vw, 3rem)' }}>
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
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {resources.map((resource) => (
              <SurfaceCard key={resource.name} tone="default" className="ui-card--interactive h-full">
                {resource.tags?.length ? (
                  <div className="mb-4 flex flex-wrap gap-2">
                    {resource.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex rounded-full border border-[var(--border-default)] bg-[var(--surface-panel)] px-3 py-1 text-[0.68rem] font-black uppercase tracking-[0.18em] text-[var(--text-muted)]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                ) : null}
                <h3 className="ui-card__title">{resource.name}</h3>
                <p className="ui-card__copy">{resource.info}</p>
                <div className="mt-auto pt-6">
                  <Button href={resource.link} target="_blank" rel="noopener noreferrer" variant="subtle">
                    Webseite öffnen <ExternalLink size={16} />
                  </Button>
                </div>
              </SurfaceCard>
            ))}
          </div>
        ) : (
          <SurfaceCard tone="soft" className="no-print">
            <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
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

function MapNode({ node, highlighted }) {
  const toneClass =
    node.tone === 'private'
      ? 'border-emerald-200 bg-emerald-50 text-emerald-950'
      : node.tone === 'support'
        ? 'border-sky-200 bg-sky-50 text-sky-950'
        : node.tone === 'formal'
          ? 'border-slate-200 bg-white text-slate-900'
          : 'border-amber-200 bg-amber-50 text-amber-950';

  return (
    <div
      className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-[1.25rem] border px-4 py-3 text-center shadow-sm ${toneClass} ${
        highlighted ? 'ring-2 ring-[color-mix(in_srgb,var(--accent-primary)_34%,white_66%)] ring-offset-2 ring-offset-[var(--surface-subtle)]' : ''
      }`}
      style={{ top: node.desktopTop, left: node.desktopLeft }}
    >
      <div className="text-[0.72rem] font-black leading-tight tracking-[0.08em]">{node.label}</div>
    </div>
  );
}

function MobileMapNode({ node, highlighted }) {
  const toneClass =
    node.tone === 'private'
      ? 'border-emerald-200 bg-emerald-50 text-emerald-950'
      : node.tone === 'support'
        ? 'border-sky-200 bg-sky-50 text-sky-950'
        : node.tone === 'formal'
          ? 'border-slate-200 bg-white text-slate-900'
          : 'border-amber-200 bg-amber-50 text-amber-950';

  return (
    <div
      className={`rounded-[1.25rem] border p-4 text-center shadow-sm ${toneClass} ${
        highlighted ? 'ring-2 ring-[color-mix(in_srgb,var(--accent-primary)_34%,white_66%)] ring-offset-2 ring-offset-white' : ''
      }`}
      style={{ gridRow: node.mobileRow, gridColumn: node.mobileCol }}
    >
      <div className="text-[0.72rem] font-black leading-tight">{node.label}</div>
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
            <h2 className="ui-hero__title" style={{ fontSize: 'clamp(1.85rem, 3vw, 3rem)' }}>
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

        <div className="grid gap-4 lg:grid-cols-3">
          {steps.map((step, index) => (
            <SurfaceCard key={step} tone={index === 2 ? 'soft' : 'default'}>
              <p className="ui-fact-card__label">Schritt {index + 1}</p>
              <p className="ui-card__copy">{step}</p>
            </SurfaceCard>
          ))}
        </div>

        <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_20rem] xl:items-start">
          <SurfaceCard tone="default">
            <div className="mb-5 flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
              <div>
                <p className="ui-fact-card__label">Nutzbare Netzwerkkarte</p>
                <p className="ui-card__copy">
                  Die Mitte steht für das Kind oder die Familie. Über die Linsen lässt sich prüfen, ob privates Umfeld, Alltagsstützen, Fachstellen und Versorgungslücken ausreichend sichtbar werden.
                </p>
              </div>
              <MapLensButtons lenses={lenses} activeLens={activeLensId} onLensChange={onLensChange} />
            </div>

            <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_18rem] lg:items-start">
              <div>
                <div className="ui-card--outline relative hidden min-h-[30rem] overflow-hidden rounded-[2rem] bg-[var(--surface-panel)] lg:block">
                  <div className="absolute left-1/2 top-1/2 h-[11rem] w-[11rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[color-mix(in_srgb,var(--accent-primary)_24%,white_76%)] bg-white/90" />
                  <div className="absolute left-1/2 top-1/2 h-[18rem] w-[18rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-[color-mix(in_srgb,var(--accent-primary)_24%,white_76%)]" />
                  <div className="absolute left-1/2 top-1/2 h-[26rem] w-[26rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-[var(--border-default)]" />

                  <div className="absolute left-1/2 top-1/2 flex h-28 w-28 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-[color-mix(in_srgb,white_14%,var(--accent-primary-strong)_86%)] bg-[var(--surface-panel-strong)] text-center shadow-lg">
                    <div>
                      <div className="text-[0.65rem] font-black uppercase tracking-[0.18em] text-white/70">Zentrum</div>
                      <div className="mt-2 text-sm font-black leading-tight text-white">Kind / Familie</div>
                    </div>
                  </div>

                  {visibleNodes.map((node) => (
                    <MapNode key={node.label} node={node} highlighted={highlightedNode?.label === node.label} />
                  ))}
                </div>

                <div className="grid grid-cols-4 gap-3 lg:hidden">
                  <div className="col-span-4 rounded-[1.5rem] border border-[color-mix(in_srgb,white_14%,var(--accent-primary-strong)_86%)] bg-[var(--surface-panel-strong)] p-5 text-center shadow-sm">
                    <div className="text-[0.65rem] font-black uppercase tracking-[0.18em] text-white/70">Zentrum</div>
                    <div className="mt-2 text-sm font-black text-white">Kind / Familie</div>
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
                    <div className="mt-5 rounded-[1.5rem] border border-[color-mix(in_srgb,var(--accent-primary)_18%,white_82%)] bg-[var(--surface-app)] px-4 py-4">
                      <p className="m-0 text-sm font-medium leading-relaxed text-[var(--text-primary)]">{lensSummary}</p>
                    </div>
                  ) : null}
                </SurfaceCard>

                <div className="grid grid-cols-2 gap-3">
                  {counts.map((count) => (
                    <SurfaceCard key={count.label} tone={count.tone || 'default'} className="h-full">
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
            <div className="mb-4 inline-flex items-center gap-3 text-[0.7rem] font-black uppercase tracking-[0.18em] text-[var(--text-muted)]">
              <MapPin size={16} className="text-[var(--accent-primary-strong)]" /> Leitfragen für die Exploration
            </div>
            <div className="space-y-3">
              {questions.map((question) => (
                <div key={question} className="flex items-start gap-3">
                  <span className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full bg-[var(--accent-primary-strong)]" />
                  <p className="m-0 text-sm leading-relaxed text-[var(--text-secondary)]">{question}</p>
                </div>
              ))}
            </div>
          </SurfaceCard>
        </div>

        <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_18rem] xl:items-start">
          <SurfaceCard tone="default">
            <p className="ui-fact-card__label">Arbeitsauswertung</p>
            <p className="ui-card__copy">
              Die Karte wird am nützlichsten, wenn nach dem Visualisieren drei Fragen folgen: Wer trägt schon? Wo ist die Lage brüchig? Was muss als Nächstes konkret abgesprochen werden?
            </p>
          </SurfaceCard>
          <SurfaceCard tone="soft">
            <p className="ui-fact-card__label">Leitfragen danach</p>
            <div className="space-y-2 text-sm leading-relaxed text-[var(--text-secondary)]">
              <p className="m-0">Wer weiss bereits Bescheid?</p>
              <p className="m-0">Wer könnte Kinder kurzfristig übernehmen?</p>
              <p className="m-0">Welche Stelle fehlt noch im Netzwerk?</p>
            </div>
          </SurfaceCard>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {visibleNodes.map((node) => (
            <SurfaceCard key={node.label} tone={node.tone === 'gap' ? 'soft' : 'default'} className="h-full">
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
