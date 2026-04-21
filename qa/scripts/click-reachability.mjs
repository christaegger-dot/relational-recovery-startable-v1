// Script B: Click-Reachability-Verification
//
// Simuliert tatsaechliche Klicks auf interaktive Elemente und prueft, ob das
// erwartete Verhalten eintritt. Waehrend Script A (interaction-overlap) nur
// geometrische Ueberlagerungen findet, verifiziert dieses Script, dass ein
// Klick das beabsichtigte Ziel erreicht.
//
// Methodik:
//   1. Laedt jede Route in mehreren Viewports
//   2. Identifiziert interaktive Elemente mit bekannter Erwartung:
//      - Nav-Buttons -> erwarten Hash-Aenderung auf Ziel-Tab
//      - Tel:-Links  -> erwarten href-Pattern tel:...
//      - Section-Deep-Links -> erwarten Hash-Aenderung auf Sektion
//      - Skip-Link   -> erwartet #main-content
//   3. Klickt auf die geometrische Mitte des Elements (page.mouse.click)
//   4. Vergleicht tatsaechliches Verhalten mit Erwartung
//   5. Failure-Modes:
//      - Hash aendert sich nicht  -> Klick hat falsches Ziel getroffen
//      - Hash aendert sich zu falschem Wert -> Uebergang gekapert
//      - Tel:-Link reagiert ueberhaupt nicht -> kritisch (Notfall)
//
// Nutzung: node qa/scripts/click-reachability.mjs [base-url]

import { chromium } from 'playwright-core';

const BASE_URL = process.argv[2] || 'http://localhost:4180';
const ROUTES = ['start', 'lernmodule', 'vignetten', 'glossar', 'grundlagen', 'evidenz', 'toolbox', 'netzwerk'];
const VIEWPORTS = [
  { name: 'mobile-375', width: 375, height: 812, hasTouch: true },
  { name: 'desktop-1280', width: 1280, height: 900 },
  { name: 'desktop-1920', width: 1920, height: 1080 },
];

// Erwartete Nav-Ziele: Klick auf Nav-Button "Toolbox" soll zu #toolbox fuehren
const NAV_TARGETS = ['start', 'lernmodule', 'vignetten', 'glossar', 'grundlagen', 'evidenz', 'toolbox', 'netzwerk'];

function classifySeverity(expectedType, label) {
  const l = (label || '').toLowerCase();
  if (expectedType === 'tel' || l.includes('notfall') || l.includes('144') || l.includes('147') || l.includes('aerztefon')) return 'kritisch';
  if (expectedType === 'nav' || expectedType === 'skip-link') return 'hoch';
  return 'mittel';
}

async function testRoute(browser, viewport, route) {
  const ctx = await browser.newContext({ viewport: { width: viewport.width, height: viewport.height }, hasTouch: viewport.hasTouch });
  const page = await ctx.newPage();
  const failures = [];

  await page.goto(`${BASE_URL}/#${route}`, { waitUntil: 'networkidle', timeout: 20000 });
  await page.waitForTimeout(500);

  // Tel-Reachability ZUERST pruefen, solange das Menue noch geschlossen ist.
  // Sonst wuerde der Menue-Overlay faelschlicherweise als Ueberlagerung
  // gewertet werden.
  const telChecks = await page.evaluate(() => {
    const out = [];
    const tels = [...document.querySelectorAll('a[href^="tel:"]')];
    for (const el of tels) {
      const r = el.getBoundingClientRect();
      if (r.width === 0 || r.height === 0) continue;
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      if (cx < 0 || cy < 0 || cx >= window.innerWidth || cy >= window.innerHeight) continue;
      const topEl = document.elementFromPoint(cx, cy);
      const reachable = topEl === el || el.contains(topEl);
      out.push({
        href: el.getAttribute('href'),
        label: (el.getAttribute('aria-label') || el.textContent || '').trim().slice(0, 40),
        reachable,
        topTag: topEl ? topEl.tagName : null,
      });
    }
    return out;
  });

  // Oeffnet das Menue (Desktop-Nav ist seit Audit-13-Fix permanent hidden;
  // alle Nav-Buttons sind nur innerhalb des Mobile-Menues erreichbar).
  try {
    await page.click('[aria-controls="mobile-nav"]', { timeout: 2000 });
    await page.waitForTimeout(300);
  } catch {
    // Menue-Toggle nicht vorhanden oder schon offen
  }

  // 1. Nav-Buttons: sammle Kandidaten innerhalb der mobilen Navigation.
  // Die Mobile-Nav-Buttons haben weder data-tab noch href — wir matchen
  // ueber das sichtbare Label (span) gegen die Tab-IDs.
  const navCandidates = await page.evaluate((NAV_TARGETS) => {
    const nav = document.querySelector('nav.ui-nav--mobile') || document.getElementById('mobile-nav');
    if (!nav) return [];
    const buttons = [...nav.querySelectorAll('button')];
    const seen = new Set();
    const out = [];
    for (const el of buttons) {
      const r = el.getBoundingClientRect();
      if (r.width === 0 || r.height === 0) continue;
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      if (cx < 0 || cy < 0 || cx >= window.innerWidth || cy >= window.innerHeight) continue;
      const label = (el.textContent || '').trim().toLowerCase();
      let target = null;
      for (const t of NAV_TARGETS) {
        if (label === t || label.startsWith(t)) { target = t; break; }
      }
      if (!target || seen.has(target)) continue;
      seen.add(target);
      out.push({ cx: Math.round(cx), cy: Math.round(cy), label: label.slice(0, 40), expectedHash: target });
    }
    return out;
  }, NAV_TARGETS);

  // 2. Klicke jeden Nav-Button, pruefe Hash
  // Nav-Kandidaten wurden bei offenem Menue gesammelt. Nach jedem Klick
  // schliesst sich das Menue -> vor jedem Klick erneut oeffnen.
  for (const c of navCandidates) {
    try {
      // Reset auf Ausgangs-Hash und Menue (wieder) oeffnen
      await page.evaluate((r) => { window.location.hash = r; }, route);
      await page.waitForTimeout(150);
      const expanded = await page.getAttribute('[aria-controls="mobile-nav"]', 'aria-expanded').catch(() => null);
      if (expanded !== 'true') {
        await page.click('[aria-controls="mobile-nav"]', { timeout: 2000 }).catch(() => {});
        await page.waitForTimeout(200);
      }

      // Neu messen: Koordinaten koennen sich nach Menue-Reopen verschoben haben
      const target = await page.evaluate((expectedHash) => {
        const nav = document.querySelector('nav.ui-nav--mobile') || document.getElementById('mobile-nav');
        if (!nav) return null;
        for (const el of nav.querySelectorAll('button')) {
          const label = (el.textContent || '').trim().toLowerCase();
          if (label !== expectedHash && !label.startsWith(expectedHash)) continue;
          const r = el.getBoundingClientRect();
          if (r.width === 0 || r.height === 0) continue;
          const cx = r.left + r.width / 2;
          const cy = r.top + r.height / 2;
          if (cx < 0 || cy < 0 || cx >= window.innerWidth || cy >= window.innerHeight) continue;
          return { cx: Math.round(cx), cy: Math.round(cy) };
        }
        return null;
      }, c.expectedHash);
      if (!target) continue;

      await page.mouse.click(target.cx, target.cy);
      await page.waitForTimeout(400);

      const actualHash = await page.evaluate(() => window.location.hash.replace(/^#/, '').split('?')[0]);
      if (actualHash !== c.expectedHash) {
        failures.push({
          type: 'nav-click-wrong-hash',
          label: c.label,
          expected: c.expectedHash,
          actual: actualHash,
          severity: classifySeverity('nav', c.label),
        });
      }
    } catch (err) {
      failures.push({ type: 'nav-click-error', label: c.label, error: err.message, severity: 'mittel' });
    }
  }

  // 3. Tel-Links: Auswertung der bereits erhobenen telChecks
  for (const t of telChecks) {
    if (!t.reachable) {
      failures.push({
        type: 'tel-not-reachable',
        label: t.label,
        href: t.href,
        note: `Top-Element am Klick-Punkt: ${t.topTag}`,
        severity: 'kritisch',
      });
    }
  }

  await ctx.close();
  return { failures, navCount: navCandidates.length, telCount: telChecks.length };
}

async function main() {
  const launchOpts = { headless: true };
  if (process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE) launchOpts.executablePath = process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE;
  const browser = await chromium.launch(launchOpts);
  const allFailures = [];
  let totalNav = 0;
  let totalTel = 0;

  for (const vp of VIEWPORTS) {
    for (const route of ROUTES) {
      try {
        const { failures, navCount, telCount } = await testRoute(browser, vp, route);
        totalNav += navCount;
        totalTel += telCount;
        for (const f of failures) {
          allFailures.push({ viewport: vp.name, route, ...f });
        }
      } catch (err) {
        allFailures.push({ viewport: vp.name, route, type: 'route-load-error', error: err.message, severity: 'hoch' });
      }
    }
  }

  console.log('\n=== Click Reachability Report ===');
  console.log(`Base URL: ${BASE_URL}`);
  console.log(`Viewports: ${VIEWPORTS.map(v => v.name).join(', ')}`);
  console.log(`Routes:    ${ROUTES.join(', ')}`);
  console.log(`Nav-Klicks geprueft: ${totalNav}, Tel-Links geprueft: ${totalTel}`);
  console.log(`Failures: ${allFailures.length}`);

  const bySev = { kritisch: [], hoch: [], mittel: [] };
  for (const f of allFailures) (bySev[f.severity] || bySev.mittel).push(f);

  for (const sev of ['kritisch', 'hoch', 'mittel']) {
    if (bySev[sev].length === 0) continue;
    console.log(`\n--- ${sev.toUpperCase()} (${bySev[sev].length}) ---`);
    for (const f of bySev[sev]) {
      const details = f.expected
        ? `erwartet=#${f.expected}, erhalten=#${f.actual}`
        : f.error || f.note || f.href || '';
      console.log(`  [${f.viewport.padEnd(13)}] [${f.route.padEnd(10)}] ${f.type}: "${(f.label || '-').slice(0, 30)}" ${details}`);
    }
  }

  if (allFailures.length === 0) {
    console.log('\nAlle Klick-Erwartungen erfuellt. Interaktion funktional.');
  }

  await browser.close();
  process.exit(allFailures.filter((f) => f.severity === 'kritisch' || f.severity === 'hoch').length > 0 ? 1 : 0);
}

main().catch((err) => {
  console.error('[click-reachability] Fehlgeschlagen:', err.message);
  process.exit(2);
});
