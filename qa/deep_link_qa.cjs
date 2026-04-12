const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright-core');

const OUT_FILE = path.join(__dirname, 'deep-link-qa-result.json');
const BASE = process.env.BASE_URL || 'http://localhost:5173';

// DOM IDs in the current app:
//   #netzwerk-fachstellen  (was: #network-directory)
//   #netzwerk-karte        (was: #network-map)
// Hash aliases resolved by the router:
//   #network           → netzwerk tab
//   #network-directory → netzwerk tab + scroll to #netzwerk-fachstellen
//   #network-map       → netzwerk tab + scroll to #netzwerk-karte
//   #netzwerk-fachstellen → same
//   #netzwerk-karte       → same

(async () => {
  const browser = await chromium.launch({
    executablePath: '/usr/bin/chromium',
    headless: true,
    args: ['--no-sandbox', '--disable-dev-shm-usage'],
  });
  const page = await browser.newPage({ viewport: { width: 1440, height: 1200 } });
  const result = { timestamp: new Date().toISOString(), checks: {} };

  async function summarizePage(label) {
    return await page.evaluate((stepLabel) => {
      const heading = document.querySelector('main h1, article h1, h1');
      const fachstellen = document.getElementById('netzwerk-fachstellen');
      const karte = document.getElementById('netzwerk-karte');
      const fachstellenVisible = fachstellen ? fachstellen.getBoundingClientRect().top < window.innerHeight : false;
      const karteVisible = karte ? karte.getBoundingClientRect().top < window.innerHeight : false;
      return {
        label: stepLabel,
        hash: window.location.hash,
        title: document.title,
        heading: heading ? heading.textContent.replace(/\s+/g, ' ').trim() : null,
        directoryPresent: Boolean(fachstellen),
        mapPresent: Boolean(karte),
        directoryVisible: fachstellenVisible,
        mapVisible: karteVisible,
        activeElementText: document.activeElement
          ? (document.activeElement.textContent || '').replace(/\s+/g, ' ').trim().slice(0, 120)
          : null,
        scrollY: window.scrollY,
      };
    }, label);
  }

  try {
    await page.goto(`${BASE}/#network`, { waitUntil: 'networkidle', timeout: 45000 });
    await page.waitForTimeout(1500);
    result.checks.direct_network = await summarizePage('direct_network');

    await page.goto(`${BASE}/#network-map`, { waitUntil: 'networkidle', timeout: 45000 });
    await page.waitForTimeout(1800);
    result.checks.direct_network_map = await summarizePage('direct_network_map');

    await page.goto(`${BASE}/#network-directory`, { waitUntil: 'networkidle', timeout: 45000 });
    await page.waitForTimeout(1800);
    result.checks.direct_network_directory = await summarizePage('direct_network_directory');

    await page.goto(`${BASE}/#netzwerk`, { waitUntil: 'networkidle', timeout: 45000 });
    await page.waitForTimeout(1200);
    const mapAnchor = page.locator('a[href="#netzwerk-karte"], a[href="#network-map"]').first();
    if (await mapAnchor.count()) {
      await mapAnchor.click();
      await page.waitForTimeout(1200);
      result.checks.after_click_map_anchor = await summarizePage('after_click_map_anchor');
    } else {
      result.checks.after_click_map_anchor = { skipped: true, reason: 'No map anchor link found in DOM' };
    }

    await page.goto(`${BASE}/#netzwerk-karte`, { waitUntil: 'networkidle', timeout: 45000 });
    await page.waitForTimeout(1800);
    result.checks.direct_netzwerk_karte = await summarizePage('direct_netzwerk_karte');

    await page.goto(`${BASE}/#netzwerk-fachstellen`, { waitUntil: 'networkidle', timeout: 45000 });
    await page.waitForTimeout(1800);
    result.checks.direct_netzwerk_fachstellen = await summarizePage('direct_netzwerk_fachstellen');
  } catch (error) {
    result.error = { message: error.message, stack: error.stack };
  } finally {
    fs.writeFileSync(OUT_FILE, JSON.stringify(result, null, 2));
    await browser.close();
  }
})();
