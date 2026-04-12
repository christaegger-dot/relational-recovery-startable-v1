import Eyebrow from './Eyebrow';
import AsideCard from './AsideCard';

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

  return (
    <div className="ui-split">
      <div className="ui-stack ui-stack--tight">
        {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
        {hasTitle ? (
          <HeadingTag className={headingClassName}>
            {titlePrefix ? <>{titlePrefix} </> : null}
            {titleAccent ? (
              <span className="ui-hero__accent">{titleAccent}</span>
            ) : !titlePrefix ? (
              title
            ) : null}
          </HeadingTag>
        ) : null}
        <RichCopy description={description} paragraphs={paragraphs} />
        {children}
      </div>
      <AsideCard aside={aside} tone={asideTone} />
    </div>
  );
}
