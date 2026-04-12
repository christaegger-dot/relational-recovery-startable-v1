import Eyebrow from './Eyebrow';
import Section from './Section';

export default function EditorialIndex({ items, spacing = 'compact', surface = 'muted' }) {
  if (!items?.length) return null;

  return (
    <Section spacing={spacing} surface={surface}>
      <div className="ui-stack ui-stack--tight">
        <Eyebrow>Schnellzugriff</Eyebrow>
        <div className="ui-button-row">
          {items.map((item) => (
            <a key={item.id} href={`#${item.id}`} className="ui-button ui-button--secondary">
              {item.shortLabel || item.title}
            </a>
          ))}
        </div>
      </div>
    </Section>
  );
}
