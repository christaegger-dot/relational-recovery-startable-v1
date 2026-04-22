import { forwardRef, useCallback, useRef } from 'react';
import Container from './Container';

/**
 * Scroll-Reveal: Jede Section beobachtet sich selbst per
 * IntersectionObserver. Sobald 8 % sichtbar, wird `.is-revealed`
 * gesetzt und der Observer getrennt (einmalig). CSS-Transition in
 * app-global.css. Bei prefers-reduced-motion: CSS-Fallback (sofort
 * sichtbar).
 */
function useRevealRef() {
  const observerRef = useRef(null);

  const refCallback = useCallback((node) => {
    // Cleanup alter Observer
    if (observerRef.current) {
      observerRef.current.disconnect();
      observerRef.current = null;
    }

    if (!node || typeof window === 'undefined' || !window.IntersectionObserver) return;

    const observer = new window.IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
            observer.disconnect();
          }
        }
      },
      // Audit 25 / Sprint 5 (O16): Threshold von 0.08 auf 0.15 angehoben.
      // Bei 0.08 loeste der Reveal schon aus, wenn 8% einer Sektion am
      // unteren Viewport-Rand angeschnitten waren -- die Animation lief
      // oft ausserhalb der Aufmerksamkeit ab. 0.15 wartet bis 15% sichtbar
      // sind, sodass der Uebergang im Blickfeld passiert.
      { threshold: 0.15, rootMargin: '0px 0px 40px 0px' }
    );

    observer.observe(node);
    observerRef.current = observer;
  }, []);

  return refCallback;
}

const Section = forwardRef(function Section(
  {
    as: Tag = 'section',
    width = 'default',
    spacing = 'standard',
    surface = 'plain',
    bleed = false,
    inset = true,
    className = '',
    children,
    ...props
  },
  ref
) {
  const revealRef = useRevealRef();

  // Kombiniere den externen ref (forwardRef) mit dem reveal-ref.
  const combinedRef = useCallback(
    (node) => {
      revealRef(node);
      if (typeof ref === 'function') ref(node);
      else if (ref) ref.current = node;
    },
    [ref, revealRef]
  );

  const spacingClass =
    spacing === 'tight' || spacing === 'compact'
      ? 'ui-section ui-section--tight'
      : spacing === 'wide'
        ? 'ui-section ui-section--wide'
        : 'ui-section';

  const surfaceVariant =
    surface === 'subtle' || surface === 'muted'
      ? '--subtle'
      : surface === 'warm'
        ? '--warm'
        : surface === 'accent'
          ? '--accent'
          : '';

  // Bleed-Modus: Hintergrund auf volle Viewport-Breite, Content im Container.
  // Kein border-radius, kein border, kein box-shadow — wirkt als Band.
  if (bleed) {
    const bleedClass = `ui-section--bleed ui-section--bleed${surfaceVariant || '--plain'}`;
    const sectionClasses = [spacingClass, bleedClass, 'reveal-on-scroll', className].filter(Boolean).join(' ');
    return (
      <Tag ref={combinedRef} className={sectionClasses} {...props}>
        <Container width={width}>{children}</Container>
      </Tag>
    );
  }

  const surfaceClass = `ui-section__surface${surfaceVariant ? ` ui-section__surface${surfaceVariant}` : ''}`;
  const sectionClasses = [spacingClass, 'reveal-on-scroll', className].filter(Boolean).join(' ');
  const content = inset ? <div className={surfaceClass}>{children}</div> : children;

  return (
    <Tag ref={combinedRef} className={sectionClasses} {...props}>
      <Container width={width}>{content}</Container>
    </Tag>
  );
});

export default Section;
