// Detail-Variante zu a11y-axe: gibt pro Violation die Target-Selektoren und
// Snippets aus (nur desktop-1280, ein Lauf pro Route).

import { chromium } from 'playwright-core';
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const AXE_SOURCE = readFileSync(require.resolve('axe-core/axe.min.js'), 'utf8');

const BASE_URL = process.argv[2] || 'http://localhost:4180';
const ROUTES = ['start', 'lernmodule', 'vignetten', 'glossar', 'material', 'evidenz', 'toolbox', 'netzwerk'];

async function main() {
  const launchOpts = { headless: true };
  if (process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE) launchOpts.executablePath = process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE;
  const browser = await chromium.launch(launchOpts);
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
  const page = await ctx.newPage();

  for (const route of ROUTES) {
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

    console.log(`\n=== ${route} ===`);
    for (const v of result.violations) {
      console.log(`\n[${v.impact}] ${v.id}: ${v.help}`);
      for (const node of v.nodes) {
        console.log(`  target: ${node.target.join(' >> ')}`);
        console.log(`  html:   ${node.html.slice(0, 160)}`);
        if (node.failureSummary) console.log(`  fail:   ${node.failureSummary.replace(/\n/g, ' | ')}`);
      }
    }
  }

  await browser.close();
}

main().catch((e) => { console.error(e); process.exit(2); });
