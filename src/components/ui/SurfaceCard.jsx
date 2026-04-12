const TONE_CLASSES = {
  soft: 'ui-card ui-card--soft',
  accent: 'ui-card ui-card--accent',
  strong: 'ui-card ui-card--strong',
};

export default function SurfaceCard({ as: Tag = 'article', tone = 'default', className = '', children, ...props }) {
  const toneClass = TONE_CLASSES[tone] ?? 'ui-card';

  const classes = [toneClass, className].filter(Boolean).join(' ');

  return (
    <Tag className={classes} {...props}>
      <div className="ui-card__body">{children}</div>
    </Tag>
  );
}
