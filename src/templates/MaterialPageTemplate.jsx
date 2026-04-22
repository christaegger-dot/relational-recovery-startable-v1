import ClosingSection from '../components/closing/ClosingSection';
import EditorialIndex from '../components/ui/EditorialIndex';
import EditorialIntro from '../components/ui/EditorialIntro';
import Container from '../components/ui/Container';
import LegalDisclaimer from '../components/ui/LegalDisclaimer';
import PageHero from '../components/ui/PageHero';
import Section from '../components/ui/Section';
import SectionHeader from '../components/ui/SectionHeader';
import MaterialHandoutSwitch from './MaterialHandouts';
import sectionIllustrationMaterial from '../assets/section-material-icons.webp';

function MaterialFaqItem({ item, index }) {
  return (
    <details className="ui-card ui-card--interactive ui-disclosure-card">
      <summary className="ui-disclosure-card__summary">
        <div className="ui-stack ui-stack--tight">
          <p className="ui-fact-card__label">Frage {index + 1}</p>
          <h3 className="ui-card__title">{item.question}</h3>
        </div>
        <span aria-hidden="true" className="ui-disclosure-card__toggle">
          +
        </span>
      </summary>
      <div className="ui-disclosure-card__content">
        <p className="ui-card__copy">{item.answer}</p>
      </div>
    </details>
  );
}

function MaterialCluster({ cluster, audienceBadge }) {
  return (
    <Section spacing="tight" surface={cluster.surface || 'plain'}>
      <div id={cluster.id} className="ui-stack ui-stack--loose ui-section-anchor-offset">
        {audienceBadge ? (
          <div className="ui-badge-row ui-material-cluster__audience">
            <span className="ui-badge ui-badge--soft" data-audience={cluster.audience}>
              {audienceBadge}
            </span>
          </div>
        ) : null}
        <SectionHeader
          eyebrow={cluster.eyebrow}
          title={cluster.title}
          description={cluster.description}
          aside={cluster.aside}
          headingTag="h3"
        />

        {cluster.faqs?.length ? (
          <div className="material-faq-grid">
            {cluster.faqs.map((item, index) => (
              <MaterialFaqItem key={item.question} item={item} index={index} />
            ))}
          </div>
        ) : null}

        {cluster.legalDisclaimer ? <LegalDisclaimer /> : null}
      </div>
    </Section>
  );
}

/**
 * Block-Header fuer eine Zielgruppen-Gruppe (Issue #103). Trennt die
 * Cluster visuell in "Material fuer Angehoerige" (Cluster 1-3) und
 * "Material fuer betroffene Eltern" (Cluster 4-6). Badge wiederholt den
 * Adressat-Text, den auch die Einzel-Cluster tragen, damit die Zuordnung
 * beim Scrollen nicht verlorengeht.
 */
function MaterialClusterBlockHeader({ audience, surface = 'subtle' }) {
  return (
    <Section spacing="tight" surface={surface} bleed>
      <div className="ui-stack ui-stack--tight ui-material-cluster-block__header">
        <div className="ui-badge-row">
          <span className="ui-badge ui-badge--soft" data-audience={audience.id}>
            {audience.badge}
          </span>
        </div>
        <h2 className="ui-section-title ui-material-cluster-block__title">{audience.title}</h2>
        {audience.description ? (
          <div className="ui-copy">
            <p>{audience.description}</p>
          </div>
        ) : null}
      </div>
    </Section>
  );
}

function MaterialHandoutsSection({ block, handouts, onNavigate, onPrintHandout }) {
  if (!block || !handouts?.length) return null;

  return (
    <Section spacing="tight" surface="plain">
      <div className="ui-stack ui-stack--loose">
        {/* SectionHeader gehoert zum Web-Chrome -- beim Druck eines Handouts
            soll nur das Handout selbst erscheinen, nicht die Rahmung
            "Material zum Ausfuellen..." darueber. */}
        <div className="no-print">
          <div className="ui-split ui-split--illustration">
            <SectionHeader eyebrow={block.eyebrow} title={block.title} description={block.description} />
            <figure className="ui-section-figure">
              <img
                src={sectionIllustrationMaterial}
                alt="Vier Spot-Illustrationen für Handout-Typen: Dokument, Gesprächsblasen, Checkliste und Schutzschild."
                width="900"
                height="600"
                loading="lazy"
                decoding="async"
              />
            </figure>
          </div>
        </div>
        <div className="ui-material-handouts-grid">
          {handouts.map((handout) => (
            <MaterialHandoutSwitch
              key={handout.id}
              handout={handout}
              onNavigate={onNavigate}
              onPrintHandout={onPrintHandout}
            />
          ))}
        </div>
      </div>
    </Section>
  );
}

export default function MaterialPageTemplate({
  hero,
  pageHeadingId,
  intro,
  clusters = [],
  clusterAudiences = [],
  handoutsBlock = null,
  handouts = [],
  onNavigate,
  onPrintHandout,
  closingSection = null,
}) {
  // Zielgruppen-Gruppierung (Issues #102 + #103): sofern clusterAudiences
  // gesetzt ist, werden Cluster pro Audience in einem eigenen Block
  // gerendert (Block-Header + Audience-Badge auf jedem Einzel-Cluster).
  // Fallback: flache Liste, falls keine Audiences uebergeben wurden.
  const audienceLookup = new Map(clusterAudiences.map((a) => [a.id, a]));
  const orderedAudiences = clusterAudiences.length
    ? clusterAudiences
        .map((audience) => ({
          audience,
          items: clusters.filter((c) => c.audience === audience.id),
        }))
        .filter((group) => group.items.length > 0)
    : [];
  const ungroupedClusters = clusterAudiences.length
    ? clusters.filter((c) => !c.audience || !audienceLookup.has(c.audience))
    : clusters;

  return (
    <div className="ui-stack">
      {/* Rahmung (Hero, Intro, Index, FAQ-Cluster) ist Web-Chrome und
          verschwindet beim Handout-Druck. Der Handouts-Grid bleibt
          sichtbar; scoped Styles aus useMaterialHandoutPrint blenden die
          nicht-angewaehlten Handouts aus. */}
      <div className="no-print">
        <Container width="wide">
          <PageHero {...hero} headingId={pageHeadingId} />
        </Container>
        <EditorialIntro intro={intro} />
        <EditorialIndex items={clusters} spacing="tight" surface="subtle" />
        {orderedAudiences.map(({ audience, items }) => (
          <div key={audience.id} className="ui-material-cluster-block" data-audience={audience.id}>
            <MaterialClusterBlockHeader audience={audience} />
            {items.map((cluster) => (
              <MaterialCluster key={cluster.id} cluster={cluster} audienceBadge={audience.badge} />
            ))}
          </div>
        ))}
        {ungroupedClusters.map((cluster) => (
          <MaterialCluster key={cluster.id} cluster={cluster} />
        ))}
      </div>
      <MaterialHandoutsSection
        block={handoutsBlock}
        handouts={handouts}
        onNavigate={onNavigate}
        onPrintHandout={onPrintHandout}
      />
      {closingSection ? (
        <ClosingSection
          section={closingSection}
          sectionId="material-downloads-anchor"
          surface="plain"
          className="no-print"
        />
      ) : null}
    </div>
  );
}
