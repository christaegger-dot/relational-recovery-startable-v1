import EditorialIndex from '../components/ui/EditorialIndex';
import EditorialIntro from '../components/ui/EditorialIntro';
import Container from '../components/ui/Container';
import PageHero from '../components/ui/PageHero';
import Section from '../components/ui/Section';
import SectionHeader from '../components/ui/SectionHeader';
import SurfaceCard from '../components/ui/SurfaceCard';

function GlossarGroup({ group }) {
  return (
    <Section spacing="tight" surface={group.surface || 'plain'}>
      <div id={group.id} className="ui-stack ui-stack--loose ui-anchor-offset-target">
        <SectionHeader
          eyebrow={group.eyebrow}
          title={group.title}
          description={group.description}
          aside={group.aside}
        />

        <div className="ui-glossary-term-grid">
          {group.terms.map((entry) => (
            <SurfaceCard key={entry.term} tone={entry.tone || 'default'}>
              <p className="ui-fact-card__label">Begriff</p>
              <h3 className="ui-card__title">{entry.term}</h3>
              <p className="ui-card__copy">{entry.definition}</p>
              {entry.practice ? (
                <div className="ui-note-panel ui-editorial-card__action">
                  <p className="ui-note-panel__label">Praxisbezug</p>
                  <p className="ui-note-panel__copy">{entry.practice}</p>
                </div>
              ) : null}
            </SurfaceCard>
          ))}
        </div>
      </div>
    </Section>
  );
}

export default function GlossarPageTemplate({ hero, pageHeadingId, intro, groups = [] }) {
  return (
    <div className="ui-stack">
      <Container width="wide">
        <PageHero {...hero} headingId={pageHeadingId} />
      </Container>
      <EditorialIntro intro={intro} />
      <EditorialIndex items={groups} spacing="compact" surface="muted" />
      {groups.map((group) => (
        <GlossarGroup key={group.id} group={group} />
      ))}
    </div>
  );
}
