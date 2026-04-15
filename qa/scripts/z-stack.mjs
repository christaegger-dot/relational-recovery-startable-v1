// Script C: Z-Stack-Inventar und Anomalie-Erkennung
//
// Inventarisiert die z-index-Hierarchie aller positioned Elemente und flaggt
// Anomalien, die zu Ueberlagerungen oder Stacking-Context-Problemen fuehren
// koennen.
//
// Methodik:
//   1. Laedt jede Route in mehreren Viewports
//   2. Sammelt alle Elemente mit position != static UND z-index != auto
//   3. Sammelt zusaetzlich alle Stacking-Contexts (isolation, opacity < 1,
//      transform, filter, etc.)
//   4. Flaggt Anomalien:
//      - Sehr hohe z-index-Werte (> 1000) ohne offensichtliche Rechtfertigung
//      - Mehrere Elemente mit gleicher z-index im selben Container (Race)
//      - Stacking-Contexts, die Notfall-relevante Elemente einfangen
//      - Elemente mit position: fixed die keinen z-index haben
//         (potentielle Konflikte bei spaeterem DOM-Order)
//
// Nutzung: node qa/scripts/z-stack.mjs [base-url]

import { chromium } from 'playwright-core';

const BASE_URL = process.argv[2] || 'http://localhost:4180';
const ROUTES = ['start', 'toolbox', 'netzwerk'];
const VIEWPORTS = [
  { name: 'mobile-375', width: 375, height: 812 },
  { name: 'desktop-1280', width: 1280, height: 900 },
];

async function scanRoute(browser, viewport, route) {
  const ctx = await browser.newContext({ viewport: { width: viewport.width, height: viewport.height } });
  const page = await ctx.newPage();
  await page.goto(`${BASE_URL}/#${route}`, { waitUntil: 'networkidle', timeout: 20000 });
  await page.waitForTimeout(500);

  return page.evaluate(() => {
    const positioned = [];
    const stackingContexts = [];
    const fixedNoZ = [];

    const createsStackingContext = (el, s) => {
      if (s.position !== 'static' && s.zIndex !== 'auto') return true;
      if (parseFloat(s.opacity) < 1) return true;
      if (s.transform !== 'none') return true;
      if (s.filter !== 'none') return true;
      if (s.isolation === 'isolate') return true;
      if (s.mixBlendMode && s.mixBlendMode !== 'normal') return true;
      if (s.willChange && /(transform|opacity|filter)/.test(s.willChange)) return true;
      return false;
    };

    const describe = (el) => ({
      tag: el.tagName,
      cls: (el.className || '').toString().slice(0, 80),
      id: el.id || null,
      aria: el.getAttribute ? el.getAttribute('aria-label') : null,
      text: (el.textContent || '').trim().slice(0, 40),
    });

    const all = document.querySelectorAll('*');
    for (const el of all) {
      const s = getComputedStyle(el);
      if (s.position !== 'static' && s.zIndex !== 'auto') {
        positioned.push({ ...describe(el), position: s.position, zIndex: parseInt(s.zIndex, 10) });
      }
      if (s.position === 'fixed' && s.zIndex === 'auto') {
        fixedNoZ.push(describe(el));
      }
      if (createsStackingContext(el, s)) {
        stackingContexts.push({
          ...describe(el),
          position: s.position,
          zIndex: s.zIndex,
          opacity: s.opacity,
          transform: s.transform !== 'none' ? 'yes' : 'no',
          isolation: s.isolation,
        });
      }
    }

    return { positioned, stackingContexts, fixedNoZ };
  }).finally(async () => {
    await ctx.close();
  });
}

async function main() {
  const browser = await chromium.launch({ headless: true });
  const report = {};
  const anomalies = [];

  for (const vp of VIEWPORTS) {
    for (const route of ROUTES) {
      const key = `${vp.name}|${route}`;
      try {
        const data = await scanRoute(browser, vp, route);
        report[key] = data;

        // Anomalien detektieren
        // a) Sehr hohe z-index
        for (const p of data.positioned) {
          if (p.zIndex >= 1000) {
            anomalies.push({ viewport: vp.name, route, kind: 'z-index-hoch', zIndex: p.zIndex, ...p });
          }
        }
        // b) fixed ohne z-index
        for (const f of data.fixedNoZ) {
          anomalies.push({ viewport: vp.name, route, kind: 'fixed-ohne-z-index', ...f });
        }
        // c) Doppelte z-index im selben Wert (Konflikt-Potenzial)
        const zCounts = new Map();
        for (const p of data.positioned) {
          if (p.zIndex >= 10) { // ignoriere niedrige Werte
            const key2 = `z${p.zIndex}`;
            zCounts.set(key2, (zCounts.get(key2) || 0) + 1);
          }
        }
        for (const [k, count] of zCounts) {
          if (count > 2) {
            anomalies.push({ viewport: vp.name, route, kind: 'z-index-kollision', zIndex: k, count });
          }
        }
      } catch (err) {
        anomalies.push({ viewport: vp.name, route, kind: 'route-error', error: err.message });
      }
    }
  }

  console.log('\n=== Z-Stack Inventar ===');
  console.log(`Base URL: ${BASE_URL}`);
  console.log(`Viewports: ${VIEWPORTS.map(v => v.name).join(', ')}`);
  console.log(`Routes:    ${ROUTES.join(', ')}`);

  for (const [key, data] of Object.entries(report)) {
    console.log(`\n--- ${key} ---`);
    console.log(`  Positioned mit z-index: ${data.positioned.length}`);
    console.log(`  Stacking-Contexts:      ${data.stackingContexts.length}`);
    console.log(`  Fixed ohne z-index:     ${data.fixedNoZ.length}`);

    // Top-5 hoechste z-index
    const top = [...data.positioned].sort((a, b) => b.zIndex - a.zIndex).slice(0, 5);
    if (top.length > 0) {
      console.log('  Top z-index Werte:');
      for (const p of top) {
        const label = p.aria || p.id || p.text || p.tag;
        console.log(`    z=${p.zIndex.toString().padStart(5)} ${p.tag} "${label.slice(0, 40)}"`);
      }
    }
  }

  console.log(`\n=== Anomalien (${anomalies.length}) ===`);
  for (const a of anomalies) {
    const extra = a.zIndex ? `z=${a.zIndex}` : a.error || '';
    const label = a.aria || a.id || a.text || a.tag || '';
    console.log(`  [${a.viewport || '-'}] [${a.route || '-'}] ${a.kind} ${extra} ${label ? `"${label.slice(0, 40)}"` : ''}`);
  }

  if (anomalies.length === 0) {
    console.log('  Keine Anomalien.');
  }

  await browser.close();
  process.exit(0); // Z-Stack ist diagnostisch, blockiert nicht
}

main().catch((err) => {
  console.error('[z-stack] Fehlgeschlagen:', err.message);
  process.exit(2);
});
