// Inventur: Heading-Baum + Landmarks pro Route.
// Zeigt fuer jede Route die vollstaendige Heading-Hierarchie (h1-h6) und die
// direkten Landmark-Children, damit Sprunge und Mehrfach-h1 sofort sichtbar
// sind.

import { chromium } from 'playwright-core';

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
    await page.waitForTimeout(500);

    const data = await page.evaluate(() => {
      const headings = [...document.querySelectorAll('h1, h2, h3, h4, h5, h6')]
        .filter((el) => {
          const r = el.getBoundingClientRect();
          const style = getComputedStyle(el);
          if (style.display === 'none' || style.visibility === 'hidden') return false;
          if (r.width === 0 && r.height === 0) return false;
          return true;
        })
        .map((el) => ({
          level: Number(el.tagName[1]),
          text: (el.textContent || '').trim().slice(0, 80),
          hasId: !!el.id,
          classes: el.className || '',
        }));

      const landmarks = [...document.querySelectorAll('main, nav, header, footer, aside, [role="main"], [role="navigation"], [role="banner"], [role="contentinfo"], [role="complementary"], [role="region"], [role="search"]')]
        .filter((el) => {
          const style = getComputedStyle(el);
          if (style.display === 'none' || style.visibility === 'hidden') return false;
          return true;
        })
        .map((el) => ({
          tag: el.tagName.toLowerCase(),
          role: el.getAttribute('role') || null,
          ariaLabel: el.getAttribute('aria-label') || null,
          ariaLabelledby: el.getAttribute('aria-labelledby') || null,
          classSample: (el.className || '').toString().slice(0, 60),
        }));

      return { headings, landmarks, h1Count: headings.filter((h) => h.level === 1).length };
    });

    console.log(`\n=== ${route} ===`);
    console.log(`H1-Count: ${data.h1Count}${data.h1Count !== 1 ? '  ⚠ sollte genau 1 sein' : ''}`);
    console.log(`Headings (${data.headings.length}):`);
    let lastLevel = 0;
    let jumps = 0;
    for (const h of data.headings) {
      const jump = lastLevel && h.level > lastLevel + 1;
      if (jump) jumps++;
      console.log(`  h${h.level}${jump ? ' ⚠JUMP' : '   '}  ${h.text}${h.hasId ? '  [#' + (h.classes.slice(0, 20) || '') + ']' : ''}`);
      lastLevel = h.level;
    }
    console.log(`  Heading-Sprünge (>1 Stufe): ${jumps}`);
    console.log(`Landmarks (${data.landmarks.length}):`);
    for (const lm of data.landmarks) {
      console.log(`  <${lm.tag}${lm.role ? ' role="' + lm.role + '"' : ''}${lm.ariaLabel ? ' aria-label="' + lm.ariaLabel + '"' : ''}>`);
    }
  }

  await browser.close();
}

main().catch((e) => { console.error(e); process.exit(2); });
