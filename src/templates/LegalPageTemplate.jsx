import Container from '../components/ui/Container';
import Eyebrow from '../components/ui/Eyebrow';
import PageHero from '../components/ui/PageHero';
import Section from '../components/ui/Section';

/**
 * Rendert einen Paragraphen mit einfacher `**bold**`-Syntax. Wir nehmen
 * absichtlich keine Markdown-Library dazu -- die Legal-Inhalte sind rein
 * redaktionell und brauchen nur fette Hervorhebungen fuer Platzhalter
 * wie "(ZU ERSETZEN: ...)".
 */
function RichParagraph({ text }) {
  const parts = String(text).split(/(\*\*[^*]+\*\*)/g);
  return (
    <p>
      {parts.map((part, i) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return (
            <strong key={i} className="ui-legal-emphasis">
              {part.slice(2, -2)}
            </strong>
          );
        }
        return <span key={i}>{part}</span>;
      })}
    </p>
  );
}

function LegalSection({ section }) {
  return (
    <section id={section.id} aria-labelledby={`${section.id}-heading`} className="ui-legal-section">
      <h2 id={`${section.id}-heading`} className="ui-legal-section__heading">
        {section.heading}
      </h2>
      {section.paragraphs?.length ? (
        <div className="ui-copy">
          {section.paragraphs.map((text, i) => (
            <RichParagraph key={i} text={text} />
          ))}
        </div>
      ) : null}
      {section.note ? <p className="ui-legal-section__note">{section.note}</p> : null}
    </section>
  );
}

export default function LegalPageTemplate({ content, pageHeadingId, standNotice }) {
  return (
    <div className="ui-stack">
      <Container width="wide">
        <PageHero eyebrow={content.eyebrow} title={content.title} lead={content.lead} headingId={pageHeadingId} />
      </Container>
      <Section spacing="tight" surface="plain">
        <div className="ui-legal-body">
          {standNotice ? (
            <div className="ui-legal-stand">
              <Eyebrow>Hinweis</Eyebrow>
              <p className="ui-legal-stand__copy">{standNotice}</p>
            </div>
          ) : null}
          {content.sections.map((section) => (
            <LegalSection key={section.id} section={section} />
          ))}
        </div>
      </Section>
    </div>
  );
}
