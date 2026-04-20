import { useCallback } from 'react';

/**
 * Druckt ein einzelnes Handout aus dem Material-Tab. Der Browser-Druckdialog
 * erlaubt automatisch auch "Als PDF speichern", sodass dieser Hook beide
 * Faelle abdeckt (Issue #105, Option A).
 *
 * Ansatz: Der Hook bezieht sich auf das Handout via `data-handout-id`. Beim
 * Click fuegt er einen scoped `<style>`-Block in den Head ein, der im
 * @media print alle anderen `.ui-material-handout`-Elemente ausblendet. Das
 * ist zukunftssicher: heute liegt nur der Krisenplan im Grid, aber sobald
 * Tier 2 / Tier 3 dazukommen, druckt der Button weiterhin nur das Ziel-
 * Handout.
 *
 * Komplementaer dazu sind alle umliegenden Material-Sections (Hero, Intro,
 * Index, FAQ-Cluster, ClosingSection) mit `.no-print` markiert, damit beim
 * Druck nur der Handout-Grid uebrig bleibt. Die eigentliche Print-
 * Typografie / Farb-Adjustments stehen im zentralen @media print-Block in
 * app-global.css + primitives.css.
 */
export function useMaterialHandoutPrint() {
  return useCallback((handoutId) => {
    if (typeof window === 'undefined' || typeof document === 'undefined') return;
    if (!handoutId) {
      window.print();
      return;
    }

    const styleId = `material-handout-print-scope-${handoutId}`;
    // Falls der Nutzer zweimal hintereinander klickt, alten Scope entfernen.
    document.getElementById(styleId)?.remove();

    const styleEl = document.createElement('style');
    styleEl.id = styleId;
    styleEl.textContent = `
      @media print {
        .ui-material-handout:not([data-handout-id="${handoutId}"]) {
          display: none !important;
        }
      }
    `;
    document.head.appendChild(styleEl);

    const cleanup = () => {
      document.getElementById(styleId)?.remove();
      window.removeEventListener('afterprint', cleanup);
    };
    window.addEventListener('afterprint', cleanup);

    // rAF, damit der neue Stil garantiert im nächsten Paint-Cycle greift,
    // bevor der Druck-Dialog öffnet (gleiches Muster wie handleToolboxPrint
    // in App.jsx).
    window.requestAnimationFrame(() => {
      window.print();
    });
  }, []);
}
