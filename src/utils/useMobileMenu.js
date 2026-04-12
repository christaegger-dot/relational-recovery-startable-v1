import { useCallback, useEffect, useRef, useState } from 'react';

function getFocusableElements(container) {
  if (!container || typeof container.querySelectorAll !== 'function') return [];

  return Array.from(
    container.querySelectorAll(
      'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), summary, [tabindex]:not([tabindex="-1"])'
    )
  ).filter(
    (element) =>
      !element.hasAttribute('disabled') &&
      element.getAttribute('aria-hidden') !== 'true' &&
      element.offsetParent !== null
  );
}

export default function useMobileMenu(activeTab) {
  const [mobileMenuOpenForTab, setMobileMenuOpenForTab] = useState(null);
  const mobileMenuOpen = mobileMenuOpenForTab === activeTab;
  const openMobileMenu = useCallback(() => setMobileMenuOpenForTab(activeTab), [activeTab]);
  const closeMobileMenu = useCallback(() => setMobileMenuOpenForTab(null), []);
  const mobileMenuButtonRef = useRef(null);
  const firstMobileNavItemRef = useRef(null);
  const mobileMenuContainerRef = useRef(null);

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const focusTarget = firstMobileNavItemRef.current;
    if (focusTarget) {
      focusTarget.focus();
    }

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        closeMobileMenu();
        window.requestAnimationFrame(() => {
          mobileMenuButtonRef.current?.focus();
        });
        return;
      }

      if (event.key !== 'Tab') return;

      const container = mobileMenuContainerRef.current;
      if (!container) return;

      const focusableElements = getFocusableElements(container);

      if (!focusableElements.length) return;

      const first = focusableElements[0];
      const last = focusableElements[focusableElements.length - 1];
      const active = document.activeElement;

      if (!container.contains(active)) {
        event.preventDefault();
        first.focus();
        return;
      }

      if (event.shiftKey) {
        if (active === first) {
          event.preventDefault();
          last.focus();
        }
      } else if (active === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen, closeMobileMenu]);

  return {
    mobileMenuOpen,
    openMobileMenu,
    closeMobileMenu,
    mobileMenuButtonRef,
    firstMobileNavItemRef,
    mobileMenuContainerRef,
  };
}
