import { forwardRef } from 'react';
import Container from './Container';

const Section = forwardRef(function Section(
  {
    as: Tag = 'section',
    width = 'default',
    spacing = 'standard',
    surface = 'plain',
    inset = true,
    className = '',
    children,
    ...props
  },
  ref,
) {
  const spacingClass =
    spacing === 'tight' || spacing === 'compact'
      ? 'ui-section ui-section--tight'
      : spacing === 'wide'
        ? 'ui-section ui-section--wide'
        : 'ui-section';
  const surfaceClass =
    surface === 'subtle' || surface === 'muted'
      ? 'ui-section__surface ui-section__surface--subtle'
      : surface === 'warm'
        ? 'ui-section__surface ui-section__surface--warm'
        : surface === 'accent'
          ? 'ui-section__surface ui-section__surface--accent'
          : 'ui-section__surface';

  const sectionClasses = [spacingClass, className].filter(Boolean).join(' ');
  const content = inset ? <div className={surfaceClass}>{children}</div> : children;

  return (
    <Tag ref={ref} className={sectionClasses} {...props}>
      <Container width={width}>{content}</Container>
    </Tag>
  );
});

export default Section;
