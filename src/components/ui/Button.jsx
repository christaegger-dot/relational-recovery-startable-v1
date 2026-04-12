const VARIANT_CLASSES = {
  primary: 'ui-button ui-button--primary',
  secondary: 'ui-button ui-button--secondary',
  subtle: 'ui-button ui-button--subtle',
  ghost: 'ui-button ui-button--ghost',
  danger: 'ui-button ui-button--danger',
  emergency: 'ui-button ui-button--emergency',
};

export default function Button({ as, href, variant = 'primary', className = '', children, type = 'button', ...props }) {
  const variantClass = VARIANT_CLASSES[variant] ?? VARIANT_CLASSES.primary;

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
    <Tag className={classes} {...(Tag === 'button' ? { type } : {})} {...props}>
      {children}
    </Tag>
  );
}
