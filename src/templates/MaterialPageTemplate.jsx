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

function MaterialCluster({ cluster }) {
  return (
    <Section spacing="tight" surface={cluster.surface || 'plain'}>
      <div id={cluster.id} className="ui-stack ui-stack--loose ui-section-anchor-offset">
        <SectionHeader
          eyebrow={cluster.eyebrow}
          title={cluster.title}
          description={cluster.description}
          aside={cluster.aside}
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

function MaterialHandoutSwitch({ handout, onNavigate, onPrintHandout }) {
  switch (handout.kind) {
    case 'crisis-plan':
      return <MaterialCrisisPlan handout={handout} onNavigate={onNavigate} onPrintHandout={onPrintHandout} />;
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
  handoutsBlock = null,
  handouts = [],
  onNavigate,
  onPrintHandout,
  closingSection = null,
}) {
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
        {clusters.map((cluster) => (
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
