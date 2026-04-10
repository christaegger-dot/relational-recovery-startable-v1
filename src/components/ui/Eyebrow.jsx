export default function Eyebrow({ as: Tag = 'p', className = '', children, ...props }) {
  const classes = ['ui-eyebrow', className].filter(Boolean).join(' ');

  return (
    <Tag className={classes} {...props}>
      {children}
    </Tag>
  );
}
