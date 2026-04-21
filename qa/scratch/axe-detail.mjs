#!/usr/bin/env node
import { chromium } from 'playwright-core';
import { readFileSync } from 'node:fs';

const BASE = process.argv[2] || 'http://127.0.0.1:4173';
const ROUTE = process.argv[3] || 'material';
const axeSrc = readFileSync(
  new URL('../../node_modules/axe-core/axe.min.js', import.meta.url),
  'utf8',
);

const browser = await chromium.launch({ headless: true });
const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
const page = await ctx.newPage();
await page.goto(`${BASE}/#${ROUTE}`, { waitUntil: 'networkidle' });
await page.waitForTimeout(500);
await page.addScriptTag({ content: axeSrc });
const result = await page.evaluate(async () => {
  return await axe.run(document, {
    runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'best-practice'] },
    resultTypes: ['violations'],
  });
});

for (const v of result.violations) {
  console.log(`\n### ${v.id} — ${v.impact}`);
  console.log(`  help: ${v.help}`);
  console.log(`  nodes: ${v.nodes.length}`);
  for (const n of v.nodes.slice(0, 5)) {
    console.log(`    - ${n.target.join(' ')}`);
    console.log(`      html: ${n.html.slice(0, 120)}`);
    if (n.failureSummary) console.log(`      why:  ${n.failureSummary.replace(/\n/g, ' | ')}`);
  }
}

await browser.close();
