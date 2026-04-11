const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright-core');

const OUT_FILE = '/home/ubuntu/rr-live-fix/qa/deep-link-qa-result.json';
const BASE = 'https://5173-iqwo6k8xgw8jt9sev422q-e09a7634.us2.manus.computer';

(async () => {
  const browser = await chromium.launch({ executablePath: '/usr/bin/chromium', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 1200 } });
  const result = { timestamp: new Date().toISOString(), checks: {} };

  async function summarizePage(label) {
    return await page.evaluate((stepLabel) => {
      const heading = document.querySelector('main h1, article h1, h1');
      const networkDirectory = document.getElementById('network-directory');
      const networkMap = document.getElementById('network-map');
      return {
        label: stepLabel,
        hash: window.location.hash,
        title: document.title,
        heading: heading ? heading.textContent.replace(/\s+/g, ' ').trim() : null,
        directoryPresent: Boolean(networkDirectory),
        mapPresent: Boolean(networkMap),
        activeElementText: document.activeElement ? (document.activeElement.textContent || '').replace(/\s+/g, ' ').trim().slice(0, 120) : null,
      };
    }, label);
  }

  try {
    await page.goto(`${BASE}/#network`, { waitUntil: 'networkidle', timeout: 45000 });
    await page.waitForTimeout(1200);
    result.checks.direct_network = await summarizePage('direct_network');

    const mapAction = page.locator('a[href="#network-map"], button[href="#network-map"]').first();
    if (await mapAction.count()) {
      await mapAction.click();
      await page.waitForTimeout(1200);
      result.checks.after_click_map_anchor = await summarizePage('after_click_map_anchor');
    }

    await page.goto(`${BASE}/#network-map`, { waitUntil: 'networkidle', timeout: 45000 });
    await page.waitForTimeout(1200);
    result.checks.direct_network_map = await summarizePage('direct_network_map');

    await page.goto(`${BASE}/#network-directory`, { waitUntil: 'networkidle', timeout: 45000 });
    await page.waitForTimeout(1200);
    result.checks.direct_network_directory = await summarizePage('direct_network_directory');
  } catch (error) {
    result.error = { message: error.message, stack: error.stack };
  } finally {
    fs.writeFileSync(OUT_FILE, JSON.stringify(result, null, 2));
    await browser.close();
  }
})();
