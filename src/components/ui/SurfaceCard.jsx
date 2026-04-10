export default function SurfaceCard({ as: Tag = 'article', tone = 'default', className = '', children, ...props }) {
  const toneClass =
    tone === 'soft'
      ? 'ui-card ui-card--soft'
      : tone === 'accent'
        ? 'ui-card ui-card--accent'
        : tone === 'strong'
          ? 'ui-card ui-card--strong'
          : 'ui-card';

  const classes = [toneClass, className].filter(Boolean).join(' ');

  return (
    <Tag className={classes} {...props}>
      <div className="ui-card__body">{children}</div>
    </Tag>
  );
}
