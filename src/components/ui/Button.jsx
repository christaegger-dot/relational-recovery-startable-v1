export default function Button({
  as,
  href,
  variant = 'primary',
  className = '',
  children,
  type = 'button',
  ...props
}) {
  const variantClass =
    variant === 'secondary'
      ? 'ui-button ui-button--secondary'
      : variant === 'subtle'
        ? 'ui-button ui-button--subtle'
        : variant === 'ghost'
          ? 'ui-button ui-button--ghost'
          : variant === 'danger'
            ? 'ui-button ui-button--danger'
            : variant === 'emergency'
              ? 'ui-button ui-button--emergency'
              : 'ui-button ui-button--primary';

  const classes = [variantClass, className].filter(Boolean).join(' ');
  const Tag = as || (href ? 'a' : 'button');

  if (Tag === 'a') {
    return (
      <a className={classes} href={href} {...props}>
        {children}
      </a>
    );
  }

  return (
    <Tag className={classes} type={type} {...props}>
      {children}
    </Tag>
  );
}
