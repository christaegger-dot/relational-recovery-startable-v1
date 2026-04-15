// Script A: Interaction-Overlap-Detection
//
// Prueft systematisch, ob klickbare Elemente von anderen Elementen ueberlagert
// werden, sodass Klicks das falsche Ziel treffen. Entstanden als Antwort auf
// den Audit-13-Notfall-Span-Bug (Notfall-Button ueberlagerte Netzwerk-Button
// im Header auf Desktop-Breiten).
//
// Methodik:
//   1. Laedt jede Route in mehreren Viewports
//   2. Fuer jedes sichtbare, interaktive Element:
//      - Bestimmt die geometrische Mitte (cx, cy)
//      - document.elementFromPoint(cx, cy) gibt das oberste Element am Punkt
//      - Wenn das zurueckgegebene Element NICHT das geprueft Element ist
//        (und auch kein Kindelement), liegt eine Ueberlagerung vor
//   3. Schwere-Einstufung basierend auf Aria-Label und href-Zweck:
//      - kritisch: Notfall-relevant (tel:-Links, Emergency-Banner-Buttons)
//      - hoch: Primaere Navigation, Haupt-CTAs
//      - mittel: Sekundaere Aktionen (Form-Submits, Filter)
//      - niedrig: Dekoration oder redundante Links
//
// Nutzung: node qa/scripts/interaction-overlap.mjs [base-url]
//   base-url default: http://localhost:4180
//   Beispiel: node qa/scripts/interaction-overlap.mjs https://eltern-angehoerige-fa.netlify.app

import { chromium } from 'playwright-core';

const BASE_URL = process.argv[2] || 'http://localhost:4180';
const ROUTES = ['start', 'lernmodule', 'vignetten', 'glossar', 'grundlagen', 'evidenz', 'toolbox', 'netzwerk'];
const VIEWPORTS = [
  { name: 'mobile-375', width: 375, height: 812, hasTouch: true },
  { name: 'tablet-768', width: 768, height: 1024, hasTouch: true },
  { name: 'laptop-1024', width: 1024, height: 768 },
  { name: 'desktop-1280', width: 1280, height: 900 },
  { name: 'desktop-1440', width: 1440, height: 900 },
  { name: 'desktop-1920', width: 1920, height: 1080 },
];

function classifySeverity(aria, href, text) {
  const label = (aria || text || '').toLowerCase();
  const hrefL = (href || '').toLowerCase();
  if (hrefL.startsWith('tel:') || label.includes('notfall') || label.includes('144') || label.includes('147') || label.includes('aerztefon')) return 'kritisch';
  if (label.includes('toolbox') || label.includes('akute krise') || label.includes('zum inhalt')) return 'hoch';
  if (hrefL.startsWith('#') || label.includes('start') || label.includes('lernmodule') || label.includes('vignetten') || label.includes('glossar') || label.includes('grundlagen') || label.includes('evidenz') || label.includes('netzwerk')) return 'hoch';
  if (hrefL.startsWith('http')) return 'mittel';
  return 'mittel';
}

async function scanRoute(browser, viewport, route) {
  const ctx = await browser.newContext({ viewport: { width: viewport.width, height: viewport.height }, hasTouch: viewport.hasTouch });
  const page = await ctx.newPage();
  await page.goto(`${BASE_URL}/#${route}`, { waitUntil: 'networkidle', timeout: 20000 });
  await page.waitForTimeout(800);

  const findings = await page.evaluate(() => {
    const interactive = [...document.querySelectorAll('a[href], button, [role="button"], input, select, textarea')];
    const results = [];
    for (const el of interactive) {
      const r = el.getBoundingClientRect();
      if (r.width === 0 || r.height === 0) continue; // unsichtbar / display:none
      // Punkt innerhalb Viewport?
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      if (cx < 0 || cy < 0 || cx >= window.innerWidth || cy >= window.innerHeight) continue; // ausserhalb
      // Style-Check: opacity 0 oder pointer-events: none = nicht klickbar
      const s = getComputedStyle(el);
      if (parseFloat(s.opacity) < 0.01 || s.pointerEvents === 'none') continue;

      const topEl = document.elementFromPoint(cx, cy);
      if (!topEl) continue;
      const hit = topEl === el || el.contains(topEl);
      if (!hit) {
        // Ueberlagerung
        results.push({
          tag: el.tagName,
          cls: (el.className || '').toString().slice(0, 60),
          text: (el.textContent || '').trim().slice(0, 40),
          aria: el.getAttribute('aria-label'),
          href: el.getAttribute('href'),
          rect: { x: Math.round(r.left), y: Math.round(r.top), w: Math.round(r.width), h: Math.round(r.height) },
          overlapBy: {
            tag: topEl.tagName,
            cls: (topEl.className || '').toString().slice(0, 60),
            text: (topEl.textContent || '').trim().slice(0, 40),
            aria: topEl.getAttribute ? topEl.getAttribute('aria-label') : null,
          },
        });
      }
    }
    return results;
  });

  await ctx.close();
  return findings.map((f) => ({ ...f, severity: classifySeverity(f.aria, f.href, f.text) }));
}

async function main() {
  const browser = await chromium.launch({ headless: true });
  const allFindings = [];
  let totalChecked = 0;

  for (const vp of VIEWPORTS) {
    for (const route of ROUTES) {
      const findings = await scanRoute(browser, vp, route);
      for (const f of findings) {
        allFindings.push({ viewport: vp.name, route, ...f });
      }
      totalChecked += findings.length;
    }
  }

  console.log('\n=== Interaction Overlap Report ===');
  console.log(`Base URL: ${BASE_URL}`);
  console.log(`Viewports: ${VIEWPORTS.map(v => v.name).join(', ')}`);
  console.log(`Routes:    ${ROUTES.join(', ')}`);
  console.log(`Overlaps gefunden: ${allFindings.length}`);

  // Gruppiere nach Schwere
  const bySev = { kritisch: [], hoch: [], mittel: [], niedrig: [] };
  for (const f of allFindings) bySev[f.severity].push(f);

  for (const sev of ['kritisch', 'hoch', 'mittel', 'niedrig']) {
    if (bySev[sev].length === 0) continue;
    console.log(`\n--- ${sev.toUpperCase()} (${bySev[sev].length}) ---`);
    for (const f of bySev[sev]) {
      const label = f.aria || f.text || '-';
      const overlapLabel = f.overlapBy.aria || f.overlapBy.text || f.overlapBy.tag;
      console.log(`  [${f.viewport.padEnd(13)}] [${f.route.padEnd(10)}] ${f.tag} "${label.slice(0, 35).padEnd(35)}" ueberlagert von ${f.overlapBy.tag} "${overlapLabel.slice(0, 30)}"`);
    }
  }

  if (allFindings.length === 0) {
    console.log('\nKeine Overlap-Befunde. Interaction-Layer clean.');
  }

  await browser.close();
  process.exit(allFindings.filter((f) => f.severity === 'kritisch' || f.severity === 'hoch').length > 0 ? 1 : 0);
}

main().catch((err) => {
  console.error('[interaction-overlap] Fehlgeschlagen:', err.message);
  process.exit(2);
});
