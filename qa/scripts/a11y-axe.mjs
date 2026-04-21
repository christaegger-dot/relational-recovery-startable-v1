// Script E: axe-core WCAG-Auto-Audit
//
// Laedt axe-core in jede Route (3 Viewports) und aggregiert Violations nach
// Impact-Stufe. Ergaenzt die Phase-1-Infrastruktur um die klassische WCAG-
// Dimension, die Script A/B/C nicht abdecken (Farbe, Heading-Struktur, ARIA-
// Semantik, Form-Labels).
//
// Nutzung:
//   PLAYWRIGHT_CHROMIUM_EXECUTABLE=/pfad/zu/chrome \
//   node qa/scripts/a11y-axe.mjs [base-url]
//
// base-url default: http://localhost:4180

import { chromium } from 'playwright-core';
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const axeSourcePath = require.resolve('axe-core/axe.min.js');
const AXE_SOURCE = readFileSync(axeSourcePath, 'utf8');

const BASE_URL = process.argv[2] || 'http://localhost:4180';
const ROUTES = ['start', 'lernmodule', 'vignetten', 'glossar', 'material', 'evidenz', 'toolbox', 'netzwerk'];
const VIEWPORTS = [
  { name: 'mobile-375', width: 375, height: 812 },
  { name: 'tablet-768', width: 768, height: 1024 },
  { name: 'desktop-1280', width: 1280, height: 900 },
];

async function scanRoute(browser, viewport, route) {
  const ctx = await browser.newContext({ viewport: { width: viewport.width, height: viewport.height } });
  const page = await ctx.newPage();
  await page.goto(`${BASE_URL}/#${route}`, { waitUntil: 'networkidle', timeout: 20000 });
  await page.waitForTimeout(600);
  await page.addScriptTag({ content: AXE_SOURCE });
  const result = await page.evaluate(async () => {
    // eslint-disable-next-line no-undef
    return await axe.run(document, {
      resultTypes: ['violations'],
      runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'best-practice'] },
    });
  });
  await ctx.close();
  return result.violations;
}

function summarize(viol) {
  return {
    id: viol.id,
    impact: viol.impact,
    help: viol.help,
    helpUrl: viol.helpUrl,
    count: viol.nodes.length,
    samples: viol.nodes.slice(0, 3).map((n) => ({ target: n.target.join(' '), snippet: n.html.slice(0, 120) })),
  };
}

async function main() {
  const launchOpts = { headless: true };
  if (process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE) launchOpts.executablePath = process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE;
  const browser = await chromium.launch(launchOpts);

  const perRoute = {};
  const perRule = new Map();
  let totalViolations = 0;

  for (const vp of VIEWPORTS) {
    for (const route of ROUTES) {
      const key = `${vp.name}|${route}`;
      try {
        const violations = await scanRoute(browser, vp, route);
        perRoute[key] = violations.map(summarize);
        totalViolations += violations.length;
        for (const v of violations) {
          const prev = perRule.get(v.id) || { id: v.id, impact: v.impact, help: v.help, routes: [], totalNodes: 0 };
          prev.routes.push(key);
          prev.totalNodes += v.nodes.length;
          perRule.set(v.id, prev);
        }
      } catch (err) {
        perRoute[key] = { error: err.message };
      }
    }
  }

  await browser.close();

  console.log('=== axe-core A11y Report ===');
  console.log(`Base URL: ${BASE_URL}`);
  console.log(`Viewports: ${VIEWPORTS.map((v) => v.name).join(', ')}`);
  console.log(`Routen: ${ROUTES.join(', ')}`);
  console.log(`Gesamt-Violations (Summe Routen × Viewports): ${totalViolations}\n`);

  const byImpact = { critical: 0, serious: 0, moderate: 0, minor: 0 };
  for (const [, rule] of perRule) {
    byImpact[rule.impact || 'minor'] = (byImpact[rule.impact || 'minor'] || 0) + 1;
  }
  console.log('--- Eindeutige Regeln nach Impact ---');
  console.log(JSON.stringify(byImpact, null, 2));

  console.log('\n--- Regeln (dedupe ueber alle Routen) ---');
  const sorted = [...perRule.values()].sort((a, b) => {
    const order = { critical: 0, serious: 1, moderate: 2, minor: 3 };
    return (order[a.impact] ?? 4) - (order[b.impact] ?? 4) || b.totalNodes - a.totalNodes;
  });
  for (const rule of sorted) {
    console.log(`\n[${rule.impact || '?'}] ${rule.id}  (${rule.help})`);
    console.log(`  getroffene Routen×VP: ${rule.routes.length},  gesamte DOM-Knoten: ${rule.totalNodes}`);
    console.log(`  Routen: ${rule.routes.join(', ')}`);
  }

  console.log('\n--- Pro Route ---');
  for (const key of Object.keys(perRoute)) {
    const entry = perRoute[key];
    if (entry && entry.error) {
      console.log(`  ${key}: FEHLER ${entry.error}`);
      continue;
    }
    const impacts = entry.map((e) => e.impact || '?').join(',');
    console.log(`  ${key}: ${entry.length} violations [${impacts || '—'}]`);
  }

  // Exit-Code 1 bei critical oder serious, 0 sonst
  process.exit(byImpact.critical + byImpact.serious > 0 ? 1 : 0);
}

main().catch((err) => {
  console.error('[a11y-axe] Fehlgeschlagen:', err.message);
  process.exit(2);
});
