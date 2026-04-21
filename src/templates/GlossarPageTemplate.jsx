import EditorialIndex from '../components/ui/EditorialIndex';
import EditorialIntro from '../components/ui/EditorialIntro';
import Container from '../components/ui/Container';
import GlossarLetterIndex from '../components/ui/GlossarLetterIndex';
import PageHero from '../components/ui/PageHero';
import Section from '../components/ui/Section';
import SectionHeader from '../components/ui/SectionHeader';
import { buildGlossarLetterIndex } from '../utils/glossarLetterIndex';

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
            // Audit 25 / Sprint 5 (O11): Term-id als Scroll-Anker fuer die
            // Letter-Index-Jumps. Klick auf "P" in der Alphabet-Navigation
            // springt via `#glossar-term-{id}` auf den ersten Term, dessen
            // Anfangsbuchstabe (nach Umlaut-Faltung) passt.
            <details id={`glossar-term-${entry.id}`} key={entry.term} className="ui-disclosure-card">
              <summary className="ui-disclosure-card__summary">
                <div>
                  <p className="ui-fact-card__label">Begriff</p>
                  <h3 className="ui-card__title">{entry.term}</h3>
                </div>
                <span className="ui-disclosure-card__toggle" aria-hidden="true">
                  +
                </span>
              </summary>
              <div className="ui-disclosure-card__content">
                <p className="ui-card__copy">{entry.definition}</p>
                {entry.practice ? (
                  <div className="ui-note-panel" style={{ marginTop: 'var(--space-3)' }}>
                    <p className="ui-note-panel__label">Praxisbezug</p>
                    <p className="ui-note-panel__copy">{entry.practice}</p>
                  </div>
                ) : null}
              </div>
            </details>
          ))}
        </div>
      </div>
    </Section>
  );
}

export default function GlossarPageTemplate({ hero, pageHeadingId, intro, groups = [] }) {
  const letterIndex = buildGlossarLetterIndex(groups);

  return (
    <div className="ui-stack">
      <Container width="wide">
        <PageHero {...hero} headingId={pageHeadingId} />
      </Container>
      <EditorialIntro intro={intro} />
      <EditorialIndex items={groups} spacing="compact" surface="muted" />
      {/* Audit 25 / Sprint 5 (O11): Alphabet-Navigation unter der Cluster-Nav.
          Cluster-Nav beantwortet "welches Thema?", Letter-Nav beantwortet
          "welcher Begriff?". Beide im schmalen Stack, um die Seite nicht
          mit doppelten Orientierungsbaendern aufzubauschen. Die schmale
          Section (spacing="compact") haelt das Band visuell nahe an der
          Cluster-Nav. */}
      <Section spacing="compact" surface="plain">
        <GlossarLetterIndex entries={letterIndex} />
      </Section>
      {groups.map((group) => (
        <GlossarGroup key={group.id} group={group} />
      ))}
    </div>
  );
}
