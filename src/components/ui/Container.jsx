export default function Container({ as: Tag = 'div', width = 'default', className = '', children, ...props }) {
  const widthClass = width === 'wide' ? 'page-shell--wide' : width === 'narrow' ? 'page-shell--narrow' : 'page-shell';
  const classes = [widthClass, className].filter(Boolean).join(' ');

  return (
    <Tag className={classes} {...props}>
      {children}
    </Tag>
  );
}
