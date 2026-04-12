import ClosingSection from '../components/closing/ClosingSection';
import EditorialIndex from '../components/ui/EditorialIndex';
import EditorialIntro from '../components/ui/EditorialIntro';
import Container from '../components/ui/Container';
import Eyebrow from '../components/ui/Eyebrow';
import PageHero from '../components/ui/PageHero';
import Section from '../components/ui/Section';
import SurfaceCard from '../components/ui/SurfaceCard';

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
        <div className="ui-split">
          <div className="ui-stack ui-stack--tight">
            {cluster.eyebrow ? <Eyebrow>{cluster.eyebrow}</Eyebrow> : null}
            <h2 className="ui-hero__title ui-section-title">{cluster.title}</h2>
            {cluster.description ? (
              <div className="ui-copy">
                <p>{cluster.description}</p>
              </div>
            ) : null}
          </div>
          {cluster.aside ? (
            <SurfaceCard as="aside" tone={cluster.aside.tone || 'soft'}>
              {cluster.aside.label ? <p className="ui-fact-card__label">{cluster.aside.label}</p> : null}
              {cluster.aside.title ? <h3 className="ui-card__title">{cluster.aside.title}</h3> : null}
              {cluster.aside.copy ? <p className="ui-card__copy">{cluster.aside.copy}</p> : null}
            </SurfaceCard>
          ) : null}
        </div>

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
