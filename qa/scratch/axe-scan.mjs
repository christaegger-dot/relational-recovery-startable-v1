#!/usr/bin/env node
// One-shot axe-core scan across all 8 Hash-Routen for audit-15.
// Intentionally written as a temp script under qa/scratch/ (not committed).

import { chromium } from 'playwright-core';
import { readFileSync } from 'node:fs';

const BASE = process.argv[2] || 'http://127.0.0.1:4173';
const ROUTES = [
  'start',
  'lernmodule',
  'vignetten',
  'glossar',
  'material',
  'evidenz',
  'toolbox',
  'netzwerk',
];
const VIEWPORTS = [
  { name: 'mobile-375', w: 375, h: 812 },
  { name: 'desktop-1280', w: 1280, h: 900 },
];

const axeSrc = readFileSync(
  new URL('../../node_modules/axe-core/axe.min.js', import.meta.url),
  'utf8',
);

const browser = await chromium.launch({ headless: true });
const summary = [];

for (const vp of VIEWPORTS) {
  for (const route of ROUTES) {
    const ctx = await browser.newContext({ viewport: { width: vp.w, height: vp.h } });
    const page = await ctx.newPage();
    await page.goto(`${BASE}/#${route}`, { waitUntil: 'networkidle' });
    await page.waitForTimeout(400);
    await page.addScriptTag({ content: axeSrc });
    const result = await page.evaluate(async () => {
      // eslint-disable-next-line no-undef
      return await axe.run(document, {
        runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'best-practice'] },
        resultTypes: ['violations'],
      });
    });
    const byImpact = { critical: 0, serious: 0, moderate: 0, minor: 0 };
    for (const v of result.violations) byImpact[v.impact] = (byImpact[v.impact] || 0) + v.nodes.length;
    summary.push({ vp: vp.name, route, violations: result.violations.length, ...byImpact, rules: result.violations.map((v) => `${v.id}[${v.nodes.length}]`).join(', ') });
    await ctx.close();
  }
}

await browser.close();

console.log('=== axe-core WCAG 2.1 AA Summary ===');
console.log(JSON.stringify(summary, null, 2));
console.log('\n=== Pro Viewport|Route ===');
for (const r of summary) {
  console.log(
    `${r.vp.padEnd(12)} | ${r.route.padEnd(12)} | violations=${r.violations} (crit=${r.critical} ser=${r.serious} mod=${r.moderate} min=${r.minor}) | ${r.rules}`,
  );
}
