import { Printer } from 'lucide-react';
import ClosingSection from '../components/closing/ClosingSection';
import EditorialIndex from '../components/ui/EditorialIndex';
import EditorialIntro from '../components/ui/EditorialIntro';
import Container from '../components/ui/Container';
import LegalDisclaimer from '../components/ui/LegalDisclaimer';
import PageHero from '../components/ui/PageHero';
import Section from '../components/ui/Section';
import SectionHeader from '../components/ui/SectionHeader';

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
    <Section spacing="tight" surface={surface}>
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

function MaterialHandoutField({ field }) {
  return (
    <section className="ui-material-handout__field">
      <h5 className="ui-material-handout__field-title">{field.title}</h5>
      <p className="ui-material-handout__field-hint">{field.hint}</p>
      {field.example ? (
        <p className="ui-material-handout__field-example">
          <em>Beispiel: {field.example}</em>
        </p>
      ) : null}
      <div aria-hidden="true" className="ui-material-handout__lines">
        <div className="ui-material-handout__line" />
        <div className="ui-material-handout__line" />
        <div className="ui-material-handout__line" />
      </div>
    </section>
  );
}

function MaterialHandoutEmergency({ emergency }) {
  return (
    <section
      className="ui-material-handout__emergency"
      aria-labelledby={`${emergency.titleId || 'handout-emergency'}-title`}
    >
      <h5 id={`${emergency.titleId || 'handout-emergency'}-title`} className="ui-material-handout__emergency-title">
        {emergency.title}
      </h5>
      <p className="ui-material-handout__emergency-intro">{emergency.intro}</p>
      <ul className="ui-material-handout__emergency-list">
        {emergency.items.map((item) => (
          <li key={item.number} className="ui-material-handout__emergency-item">
            <span className="ui-material-handout__emergency-number">{item.number}</span>
            <span className="ui-material-handout__emergency-desc">{item.description}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

function MaterialHandoutCrossRefs({ crossRefs, onNavigate }) {
  if (!crossRefs?.items?.length) return null;

  return (
    <aside className="ui-material-handout__cross-refs" aria-label={crossRefs.title}>
      <p className="ui-fact-card__label">{crossRefs.title}</p>
      <ul className="ui-material-handout__cross-refs-list">
        {crossRefs.items.map((ref) => {
          if (ref.target) {
            return (
              <li key={ref.label}>
                <button
                  type="button"
                  className="ui-link ui-material-handout__cross-ref-link"
                  onClick={() => onNavigate?.(ref.target, { focusTarget: 'heading' })}
                >
                  {ref.label}
                </button>
              </li>
            );
          }
          return (
            <li key={ref.label}>
              <a href={ref.anchor} className="ui-link ui-material-handout__cross-ref-link">
                {ref.label}
              </a>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}

function MaterialCrisisPlan({ handout, onNavigate, onPrintHandout }) {
  return (
    <article id={handout.id} data-handout-id={handout.id} className="ui-material-handout ui-section-anchor-offset">
      <header className="ui-material-handout__head">
        <div className="ui-material-handout__head-text">
          <p className="ui-fact-card__label">{handout.eyebrow}</p>
          <h3 className="ui-material-handout__title">{handout.title}</h3>
          <p className="ui-material-handout__lead">{handout.description}</p>
        </div>
        {onPrintHandout ? (
          <button
            type="button"
            className="ui-material-handout__print-btn no-print"
            data-action="print"
            onClick={() => onPrintHandout(handout.id)}
            aria-label={`${handout.title} drucken oder als PDF speichern`}
          >
            <Printer size={14} aria-hidden="true" />
            <span>Drucken / PDF</span>
          </button>
        ) : null}
      </header>

      <div className="ui-material-handout__usage" aria-label="Hinweise zur Nutzung">
        <div className="ui-material-handout__usage-item">
          <p className="ui-fact-card__label">Wann</p>
          <p>{handout.usage.when}</p>
        </div>
        <div className="ui-material-handout__usage-item">
          <p className="ui-fact-card__label">Mit wem</p>
          <p>{handout.usage.people}</p>
        </div>
        <div className="ui-material-handout__usage-item">
          <p className="ui-fact-card__label">Wie lange gilt er</p>
          <p>{handout.usage.validity}</p>
        </div>
        <div className="ui-material-handout__usage-item">
          <p className="ui-fact-card__label">Wohin damit</p>
          <p>{handout.usage.where}</p>
        </div>
      </div>

      <div className="ui-material-handout__ownership">
        <div className="ui-material-handout__field ui-material-handout__field--inline">
          <h5 className="ui-material-handout__field-title">{handout.header.ownerLabel}</h5>
          <div aria-hidden="true" className="ui-material-handout__lines">
            <div className="ui-material-handout__line" />
          </div>
        </div>
        <div className="ui-material-handout__ownership-meta">
          <div className="ui-material-handout__field ui-material-handout__field--inline">
            <h5 className="ui-material-handout__field-title">{handout.header.dateLabel}</h5>
            <div aria-hidden="true" className="ui-material-handout__lines">
              <div className="ui-material-handout__line" />
            </div>
          </div>
          <div className="ui-material-handout__field ui-material-handout__field--inline">
            <h5 className="ui-material-handout__field-title">{handout.header.revisedLabel}</h5>
            <div aria-hidden="true" className="ui-material-handout__lines">
              <div className="ui-material-handout__line" />
            </div>
          </div>
        </div>
      </div>

      {handout.sections.map((section) => (
        <section key={section.id} id={section.id} className="ui-material-handout__section">
          <h4 className="ui-material-handout__section-title">{section.title}</h4>
          <div className="ui-material-handout__fields">
            {section.fields.map((field) => (
              <MaterialHandoutField key={field.title} field={field} />
            ))}
          </div>
          {section.emergency ? (
            <MaterialHandoutEmergency emergency={{ ...section.emergency, titleId: `${section.id}-emergency` }} />
          ) : null}
        </section>
      ))}

      {handout.footer ? (
        <footer className="ui-material-handout__foot">
          <p>{handout.footer}</p>
        </footer>
      ) : null}

      {handout.disclaimer ? (
        <div className="ui-material-handout__disclaimer" role="note">
          <p>{handout.disclaimer}</p>
        </div>
      ) : null}

      <MaterialHandoutCrossRefs crossRefs={handout.crossRefs} onNavigate={onNavigate} />
    </article>
  );
}

/**
 * Wiederverwendbare Bausteine fuer die Tier-1-Handouts (Issues #112 + #113).
 * MaterialCrisisPlan ist bewusst NICHT auf diese Helper umgestellt -- die
 * existierende DOM-Struktur ist von den Print-Tests + Print-Typografie in
 * app-global.css abhaengig. Refactoring auf gemeinsame Bausteine kommt als
 * separate Welle, sobald das Pattern bei 3+ Handouts stabil ist.
 */
function MaterialHandoutHead({ handout, onPrintHandout }) {
  return (
    <header className="ui-material-handout__head">
      <div className="ui-material-handout__head-text">
        <p className="ui-fact-card__label">{handout.eyebrow}</p>
        <h3 className="ui-material-handout__title">{handout.title}</h3>
        <p className="ui-material-handout__lead">{handout.description}</p>
      </div>
      {onPrintHandout ? (
        <button
          type="button"
          className="ui-material-handout__print-btn no-print"
          data-action="print"
          onClick={() => onPrintHandout(handout.id)}
          aria-label={`${handout.title} drucken oder als PDF speichern`}
        >
          <Printer size={14} aria-hidden="true" />
          <span>Drucken / PDF</span>
        </button>
      ) : null}
    </header>
  );
}

function MaterialHandoutUsage({ usage }) {
  return (
    <div className="ui-material-handout__usage" aria-label="Hinweise zur Nutzung">
      <div className="ui-material-handout__usage-item">
        <p className="ui-fact-card__label">Wann</p>
        <p>{usage.when}</p>
      </div>
      <div className="ui-material-handout__usage-item">
        <p className="ui-fact-card__label">Mit wem</p>
        <p>{usage.people}</p>
      </div>
      <div className="ui-material-handout__usage-item">
        <p className="ui-fact-card__label">Wie lange gilt es</p>
        <p>{usage.validity}</p>
      </div>
      <div className="ui-material-handout__usage-item">
        <p className="ui-fact-card__label">Wohin damit</p>
        <p>{usage.where}</p>
      </div>
    </div>
  );
}

function MaterialHandoutDisclaimer({ disclaimer }) {
  if (!disclaimer) return null;
  return (
    <div className="ui-material-handout__disclaimer" role="note">
      <p>{disclaimer}</p>
    </div>
  );
}

/**
 * Tier-1-Handout (Issue #112): Gespraech-Skript fuer betroffene Eltern.
 * Format B (Conversation Script) -- vorbereiteter Einstieg, fuenf typische
 * Kinder-Fragen mit Antwort-Ankern, Verstehens-Check + Prozess-Notizen.
 */
function MaterialConversationScript({ handout, onNavigate, onPrintHandout }) {
  return (
    <article id={handout.id} data-handout-id={handout.id} className="ui-material-handout ui-section-anchor-offset">
      <MaterialHandoutHead handout={handout} onPrintHandout={onPrintHandout} />
      <MaterialHandoutUsage usage={handout.usage} />

      {handout.opener ? (
        <section className="ui-material-handout__section">
          <h4 className="ui-material-handout__section-title">{handout.opener.title}</h4>
          <blockquote className="ui-material-handout__opener">
            <p className="ui-material-handout__opener-text">{handout.opener.text}</p>
            {handout.opener.note ? <p className="ui-material-handout__opener-note">{handout.opener.note}</p> : null}
          </blockquote>
        </section>
      ) : null}

      {handout.childQuestions?.items?.length ? (
        <section className="ui-material-handout__section">
          <h4 className="ui-material-handout__section-title">{handout.childQuestions.title}</h4>
          {handout.childQuestions.intro ? (
            <p className="ui-material-handout__section-intro">{handout.childQuestions.intro}</p>
          ) : null}
          <ol className="ui-material-handout__qa-list">
            {handout.childQuestions.items.map((item, index) => (
              <li key={item.question} className="ui-material-handout__qa-item">
                <p className="ui-material-handout__qa-question">
                  <span className="ui-material-handout__qa-number">{index + 1}.</span> {item.question}
                </p>
                <p className="ui-material-handout__qa-anchor">{item.anchor}</p>
              </li>
            ))}
          </ol>
        </section>
      ) : null}

      {handout.understandingCheck ? (
        <section className="ui-material-handout__section">
          <h4 className="ui-material-handout__section-title">{handout.understandingCheck.title}</h4>
          {handout.understandingCheck.intro ? (
            <p className="ui-material-handout__section-intro">{handout.understandingCheck.intro}</p>
          ) : null}
          <p className="ui-material-handout__prompt">{handout.understandingCheck.prompt}</p>
          {handout.understandingCheck.note ? (
            <p className="ui-material-handout__section-note">{handout.understandingCheck.note}</p>
          ) : null}
        </section>
      ) : null}

      {handout.process?.items?.length ? (
        <section className="ui-material-handout__section">
          <h4 className="ui-material-handout__section-title">{handout.process.title}</h4>
          <ul className="ui-material-handout__notes">
            {handout.process.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
      ) : null}

      <MaterialHandoutDisclaimer disclaimer={handout.disclaimer} />
      <MaterialHandoutCrossRefs crossRefs={handout.crossRefs} onNavigate={onNavigate} />
    </article>
  );
}

/**
 * Tier-1-Handout (Issue #113): Schwellen-Karte fuer Angehoerige. Format C
 * (Threshold Checklist) -- Reihenfolge in der Krise, Beobachtungs-Items mit
 * klarer Wenn-Dann-Logik, kompakte CH-Anlaufstellen, Selbst-Schwelle als
 * legitimer Anlass.
 */
function MaterialThresholdChecklist({ handout, onNavigate, onPrintHandout }) {
  return (
    <article id={handout.id} data-handout-id={handout.id} className="ui-material-handout ui-section-anchor-offset">
      <MaterialHandoutHead handout={handout} onPrintHandout={onPrintHandout} />
      <MaterialHandoutUsage usage={handout.usage} />

      {handout.priorityRule?.items?.length ? (
        <section className="ui-material-handout__section">
          <h4 className="ui-material-handout__section-title">{handout.priorityRule.title}</h4>
          {handout.priorityRule.intro ? (
            <p className="ui-material-handout__section-intro">{handout.priorityRule.intro}</p>
          ) : null}
          <ol className="ui-material-handout__steps">
            {handout.priorityRule.items.map((step) => (
              <li key={step.step} className="ui-material-handout__step">
                <span className="ui-material-handout__step-number" aria-hidden="true">
                  {step.step}
                </span>
                <div className="ui-material-handout__step-body">
                  <p className="ui-material-handout__step-label">{step.label}</p>
                  <p className="ui-material-handout__step-detail">{step.detail}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>
      ) : null}

      {handout.thresholds?.items?.length ? (
        <section className="ui-material-handout__section">
          <h4 className="ui-material-handout__section-title">{handout.thresholds.title}</h4>
          {handout.thresholds.intro ? (
            <p className="ui-material-handout__section-intro">{handout.thresholds.intro}</p>
          ) : null}
          <ul className="ui-material-handout__thresholds">
            {handout.thresholds.items.map((item) => (
              <li key={item.observation} className="ui-material-handout__threshold">
                <p className="ui-material-handout__threshold-observation">{item.observation}</p>
                <p className="ui-material-handout__threshold-escalate">
                  <span className="ui-fact-card__label">Wenn ja</span>
                  {item.escalate}
                </p>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {handout.contacts?.items?.length ? (
        <section className="ui-material-handout__section">
          <h4 className="ui-material-handout__section-title">{handout.contacts.title}</h4>
          {handout.contacts.intro ? (
            <p className="ui-material-handout__section-intro">{handout.contacts.intro}</p>
          ) : null}
          <ul className="ui-material-handout__contacts">
            {handout.contacts.items.map((c) => (
              <li key={`${c.number || ''}-${c.name || ''}`} className="ui-material-handout__contact">
                {c.number ? <span className="ui-material-handout__contact-number">{c.number}</span> : null}
                <div className="ui-material-handout__contact-body">
                  {c.name ? <p className="ui-material-handout__contact-name">{c.name}</p> : null}
                  {c.detail ? <p className="ui-material-handout__contact-detail">{c.detail}</p> : null}
                </div>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {handout.selfNote ? (
        <aside className="ui-material-handout__callout" aria-label={handout.selfNote.title}>
          <p className="ui-fact-card__label">{handout.selfNote.title}</p>
          <p>{handout.selfNote.text}</p>
        </aside>
      ) : null}

      <MaterialHandoutDisclaimer disclaimer={handout.disclaimer} />
      <MaterialHandoutCrossRefs crossRefs={handout.crossRefs} onNavigate={onNavigate} />
    </article>
  );
}

function MaterialHandoutSwitch({ handout, onNavigate, onPrintHandout }) {
  switch (handout.kind) {
    case 'crisis-plan':
      return <MaterialCrisisPlan handout={handout} onNavigate={onNavigate} onPrintHandout={onPrintHandout} />;
    case 'conversation-script':
      return <MaterialConversationScript handout={handout} onNavigate={onNavigate} onPrintHandout={onPrintHandout} />;
    case 'threshold-checklist':
      return <MaterialThresholdChecklist handout={handout} onNavigate={onNavigate} onPrintHandout={onPrintHandout} />;
    default:
      return null;
  }
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
          <SectionHeader eyebrow={block.eyebrow} title={block.title} description={block.description} />
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
