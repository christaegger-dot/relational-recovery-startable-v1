// Diagnose-Script (Phase-2-Werkzeug)
//
// Fuer jeden bekannten Click-Reachability-Failure aus Phase 1: oeffnet das
// Mobile-Menue, lokalisiert das Ziel-Nav-Item, ermittelt seinen
// Mittelpunkt und gibt aus, welches Element dort tatsaechlich oben liegt
// (document.elementFromPoint), inklusive Bounding-Box, computed CSS und
// kompletter Element-Stack ueber elementsFromPoint.
//
// Nutzung: node qa/scripts/click-diagnose.mjs [base-url]

import { chromium } from 'playwright-core';

const BASE_URL = process.argv[2] || 'http://127.0.0.1:4180';

const SCENARIOS = [
  { viewport: { name: 'mobile-375', w: 375, h: 812 }, route: 'vignetten', target: 'start' },
  { viewport: { name: 'mobile-375', w: 375, h: 812 }, route: 'vignetten', target: 'lernmodule' },
  { viewport: { name: 'mobile-375', w: 375, h: 812 }, route: 'glossar', target: 'start' },
  { viewport: { name: 'mobile-375', w: 375, h: 812 }, route: 'glossar', target: 'lernmodule' },
  { viewport: { name: 'desktop-1280', w: 1280, h: 900 }, route: 'start', target: 'material' },
  { viewport: { name: 'desktop-1280', w: 1280, h: 900 }, route: 'vignetten', target: 'material' },
  { viewport: { name: 'desktop-1920', w: 1920, h: 1080 }, route: 'start', target: 'material' },
];

async function diagnose(browser, sc) {
  const ctx = await browser.newContext({ viewport: { width: sc.viewport.w, height: sc.viewport.h } });
  const page = await ctx.newPage();
  await page.goto(`${BASE_URL}/#${sc.route}`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(500);

  await page.click('[aria-controls="mobile-nav"]', { timeout: 2000 });
  await page.waitForTimeout(400);

  const result = await page.evaluate((target) => {
    const nav = document.querySelector('nav.ui-nav--mobile') || document.getElementById('mobile-nav');
    if (!nav) return { error: 'no mobile-nav in DOM' };

    let navButton = null;
    for (const el of nav.querySelectorAll('button')) {
      const label = (el.textContent || '').trim().toLowerCase();
      if (label === target || label.startsWith(target)) { navButton = el; break; }
    }
    if (!navButton) return { error: `no button for "${target}"` };

    const r = navButton.getBoundingClientRect();
    const cx = Math.round(r.left + r.width / 2);
    const cy = Math.round(r.top + r.height / 2);

    const top = document.elementFromPoint(cx, cy);
    const stack = (document.elementsFromPoint(cx, cy) || []).slice(0, 5).map((el) => {
      const sr = el.getBoundingClientRect();
      const cs = getComputedStyle(el);
      return {
        tag: el.tagName,
        cls: (el.className || '').toString().slice(0, 80),
        id: el.id || null,
        text: (el.textContent || '').trim().slice(0, 40),
        rect: { x: Math.round(sr.left), y: Math.round(sr.top), w: Math.round(sr.width), h: Math.round(sr.height) },
        position: cs.position,
        zIndex: cs.zIndex,
        transform: cs.transform === 'none' ? '-' : cs.transform.slice(0, 30),
        padding: cs.padding,
        margin: cs.margin,
        pointerEvents: cs.pointerEvents,
      };
    });

    const isHit = top === navButton || navButton.contains(top);

    return {
      target,
      navButton: {
        rect: { x: Math.round(r.left), y: Math.round(r.top), w: Math.round(r.width), h: Math.round(r.height) },
        cx, cy,
      },
      hit: isHit,
      stack,
      // Kontext: gibt es Geschwister-Buttons direkt darueber?
      siblingsAbove: [...nav.querySelectorAll('button')].slice(0, 3).map((el) => ({
        text: (el.textContent || '').trim().slice(0, 20),
        rect: (() => { const x = el.getBoundingClientRect(); return { y: Math.round(x.top), h: Math.round(x.height) }; })(),
      })),
    };
  }, sc.target);

  await ctx.close();
  return result;
}

async function main() {
  const browser = await chromium.launch({ headless: true });

  for (const sc of SCENARIOS) {
    const res = await diagnose(browser, sc);
    console.log(`\n=== ${sc.viewport.name} | route=${sc.route} | target="${sc.target}" ===`);
    if (res.error) { console.log('  ERROR:', res.error); continue; }
    console.log(`  Nav-Button rect: ${JSON.stringify(res.navButton.rect)}  click@(${res.navButton.cx},${res.navButton.cy})`);
    console.log(`  Hit: ${res.hit}`);
    console.log(`  Element-Stack am Klickpunkt (top -> down):`);
    for (const e of res.stack) {
      console.log(`    ${e.tag.padEnd(8)} z=${e.zIndex.padEnd(5)} pos=${e.position.padEnd(8)} pe=${e.pointerEvents.padEnd(7)} rect=${JSON.stringify(e.rect)} cls="${e.cls.slice(0, 50)}" text="${e.text}"`);
    }
    console.log(`  Erste 3 Nav-Geschwister (zur Position-Referenz):`);
    for (const s of res.siblingsAbove) {
      console.log(`    "${s.text.padEnd(20)}" y=${s.rect.y} h=${s.rect.h}`);
    }
  }

  await browser.close();
}

main().catch((err) => {
  console.error('[click-diagnose]', err.message);
  process.exit(2);
});
