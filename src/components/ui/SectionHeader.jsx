import Eyebrow from './Eyebrow';
import AsideCard from './AsideCard';

// Konvention (Audit 08): Maximal 3 Hierarchie-Ebenen pro Sektion.
// Regel: eyebrow + title (mit optionalem titleAccent) + (description ODER paragraphs).
// Der `aside` ist nur dann gerechtfertigt, wenn er einen echten Zusatzinhalt trägt,
// der nicht durch die umliegenden Cards, Panels oder Listen abgedeckt wird.
// Faustregel: Wenn der Aside nur eine Paraphrase der Description ist, weglassen.

function RichCopy({ description, paragraphs }) {
  if (!description && (!paragraphs || !paragraphs.length)) return null;

  return (
    <div className="ui-copy">
      {description ? <p>{description}</p> : null}
      {paragraphs
        ? paragraphs.map((paragraph, i) => <p key={i}>{paragraph}</p>)
        : null}
    </div>
  );
}

export default function SectionHeader({
  eyebrow,
  title,
  titlePrefix,
  titleAccent,
  description,
  paragraphs,
  aside,
  asideTone = 'soft',
  headingTag: HeadingTag = 'h2',
  headingClassName = 'ui-hero__title ui-section-title',
  children,
}) {
  const hasTitle = title || titlePrefix || titleAccent;

  // Dev-Indikator: Wenn alle optionalen Felder gleichzeitig aktiv sind,
  // eine dezente Konsolen-Warnung ausgeben. Kein harter Fehler -- nur Anstupser.
  if (import.meta.env?.DEV && eyebrow && hasTitle && (description || paragraphs) && aside) {
    console.warn(
      '[SectionHeader] Alle vier Felder aktiv (eyebrow, title, description/paragraphs, aside). ' +
        'Konvention: maximal 3 Ebenen pro Sektion. Prüfen, ob der aside wirklich Zusatzinhalt trägt.',
    );
  }

  // Audit A2: Bisher wurde `title` stillschweigend verworfen, sobald `titleAccent`
  // gesetzt war (ohne `titlePrefix`). Das hinterliess fragmentarische H2 wie
  // "passende Unterstützung." -- schlecht für Screenreader-Outline und SEO.
  // Neue Regel:
  //   - `titlePrefix` (falls gesetzt) wird wörtlich als Prefix verwendet
  //   - sonst dient `title` als Prefix, sobald ein Accent existiert
  //   - ohne Accent bleibt `title` der einzige, vollständige H2-Text
  const prefix = titlePrefix ?? (titleAccent ? title : null);
  const standalone = !titleAccent && !titlePrefix ? title : null;

  return (
    <div className="ui-split">
      <div className="ui-stack ui-stack--tight">
        {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
        {hasTitle ? (
          <HeadingTag className={headingClassName}>
            {prefix ? <>{prefix} </> : null}
            {standalone ? standalone : null}
            {titleAccent ? <span className="ui-hero__accent">{titleAccent}</span> : null}
          </HeadingTag>
        ) : null}
        <RichCopy description={description} paragraphs={paragraphs} />
        {children}
      </div>
      <AsideCard aside={aside} tone={asideTone} />
    </div>
  );
}
