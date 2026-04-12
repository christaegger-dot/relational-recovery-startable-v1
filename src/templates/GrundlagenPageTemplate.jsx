import ClosingSection from '../components/closing/ClosingSection';
import EditorialIndex from '../components/ui/EditorialIndex';
import EditorialIntro from '../components/ui/EditorialIntro';
import Container from '../components/ui/Container';
import PageHero from '../components/ui/PageHero';
import Section from '../components/ui/Section';
import SectionHeader from '../components/ui/SectionHeader';

function GrundlagenFaqItem({ item, index }) {
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

function GrundlagenCluster({ cluster }) {
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
          <div className="grundlagen-faq-grid">
            {cluster.faqs.map((item, index) => (
              <GrundlagenFaqItem key={item.question} item={item} index={index} />
            ))}
          </div>
        ) : null}
      </div>
    </Section>
  );
}

export default function GrundlagenPageTemplate({ hero, pageHeadingId, intro, clusters = [], closingSection = null }) {
  return (
    <div className="ui-stack">
      <Container width="wide">
        <PageHero {...hero} headingId={pageHeadingId} />
      </Container>
      <EditorialIntro intro={intro} />
      <EditorialIndex items={clusters} spacing="tight" surface="subtle" />
      {clusters.map((cluster) => (
        <GrundlagenCluster key={cluster.id} cluster={cluster} />
      ))}
      {closingSection ? (
        <ClosingSection
          section={closingSection}
          sectionId="grundlagen-materials"
          surface="plain"
          className="no-print"
        />
      ) : null}
    </div>
  );
}
