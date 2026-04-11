const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright-core');

const OUT_DIR = '/home/ubuntu/rr-live-fix/qa/mobile-artifacts';
const BASE_URL = 'https://5173-iqwo6k8xgw8jt9sev422q-e09a7634.us2.manus.computer/#network';

async function ensureDir(dir) {
  await fs.promises.mkdir(dir, { recursive: true });
}

async function screenshot(page, name, locator = null, options = {}) {
  const target = locator || page;
  const filePath = path.join(OUT_DIR, name);
  await target.screenshot({ path: filePath, ...options });
  return filePath;
}

async function collectLayoutMetrics(page) {
  return await page.evaluate(() => {
    const doc = document.documentElement;
    const body = document.body;
    const width = doc.clientWidth;
    const fullWidth = Math.max(doc.scrollWidth, body ? body.scrollWidth : 0);
    return {
      innerWidth: window.innerWidth,
      clientWidth: width,
      scrollWidth: fullWidth,
      hasHorizontalOverflow: fullWidth > width + 1,
      hash: window.location.hash,
      documentTitle: document.title,
    };
  });
}

async function visibleTexts(locator, limit = 10) {
  const items = await locator.evaluateAll(
    (nodes, max) =>
      nodes
        .map((node) => (node.textContent || '').replace(/\s+/g, ' ').trim())
        .filter(Boolean)
        .slice(0, max),
    limit,
  );
  return items;
}

(async () => {
  await ensureDir(OUT_DIR);

  const browser = await chromium.launch({
    executablePath: '/usr/bin/chromium',
    headless: true,
  });

  const context = await browser.newContext({
    viewport: { width: 375, height: 812 },
    deviceScaleFactor: 2,
    isMobile: true,
    hasTouch: true,
    userAgent:
      'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1',
  });

  const page = await context.newPage();
  const result = {
    url: BASE_URL,
    viewport: { width: 375, height: 812 },
    checks: {},
    screenshots: {},
    timestamp: new Date().toISOString(),
    steps: [],
  };

  async function step(name, fn) {
    result.steps.push({ name, status: 'started', at: new Date().toISOString() });
    const idx = result.steps.length - 1;
    try {
      const data = await fn();
      result.steps[idx] = { name, status: 'passed', at: new Date().toISOString() };
      return data;
    } catch (error) {
      result.steps[idx] = { name, status: 'failed', at: new Date().toISOString(), message: error.message };
      result.checks[name] = { passed: false, error: error.message };
      return null;
    }
  }

  try {
    await page.goto(BASE_URL, { waitUntil: 'networkidle', timeout: 45000 });
    await page.waitForTimeout(1800);

    result.checks.layout_initial = await collectLayoutMetrics(page);
    result.screenshots.hero = await screenshot(page, 'network-mobile-hero.png');

    const directorySection = page.locator('#network-directory');
    const mapSection = page.locator('#network-map');

    await step('directory_visible', async () => {
      await directorySection.scrollIntoViewIfNeeded();
      await page.waitForTimeout(800);
      result.screenshots.directory = await screenshot(page, 'network-mobile-directory.png');
      const chipButtons = directorySection.locator('fieldset .ui-chip-row button');
      const buttonLabels = await visibleTexts(chipButtons, 20);
      const cards = directorySection.locator('a:has-text("Webseite öffnen")');
      result.checks.directory_visible = {
        passed: true,
        filterButtons: buttonLabels,
        visibleWebsiteLinks: await cards.count(),
      };
    });

    await step('filter_interaction', async () => {
      const chipButtons = directorySection.locator('fieldset .ui-chip-row button');
      const cards = directorySection.locator('a:has-text("Webseite öffnen")');
      const before = await cards.count();
      await chipButtons.nth(1).click();
      await page.waitForTimeout(700);
      const after = await cards.count();
      result.screenshots.filter = await screenshot(page, 'network-mobile-filter.png');
      result.checks.filter_interaction = {
        passed: true,
        beforeCount: before,
        afterCount: after,
        changed: before !== after,
      };
    });

    await step('search_interaction', async () => {
      const searchInput = directorySection.locator('#network-resource-search');
      const cards = directorySection.locator('a:has-text("Webseite öffnen")');
      await searchInput.fill('147');
      await page.waitForTimeout(700);
      result.screenshots.search = await screenshot(page, 'network-mobile-search-147.png');
      result.checks.search_interaction = {
        passed: true,
        query: '147',
        visibleWebsiteLinks: await cards.count(),
        titles: await visibleTexts(directorySection.locator('h3'), 8),
      };

      const resetButton = directorySection.locator('button:has-text("Suche und Filter zurücksetzen")');
      await resetButton.click();
      await page.waitForTimeout(700);
    });

    await step('map_visible', async () => {
      await mapSection.scrollIntoViewIfNeeded();
      await page.waitForTimeout(900);
      result.screenshots.map_overview = await screenshot(page, 'network-mobile-map-overview.png');
      result.checks.map_visible = {
        passed: true,
        lensButtons: await visibleTexts(mapSection.locator('.ui-chip-row button'), 10),
      };
    });

    await step('map_lens_fachstellen', async () => {
      const lensButtons = mapSection.locator('.ui-chip-row button');
      await lensButtons.nth(3).click();
      await page.waitForTimeout(700);
      result.screenshots.map_fachstellen = await screenshot(page, 'network-mobile-map-fachstellen.png');
      result.checks.map_lens_fachstellen = {
        passed: true,
        activeReadingTitle: await mapSection.locator('.ui-stack .ui-card__title').first().textContent(),
        countValues: await visibleTexts(mapSection.locator('.ui-fact-card__value'), 10),
      };
    });

    await step('map_lens_luecken', async () => {
      const lensButtons = mapSection.locator('.ui-chip-row button');
      await lensButtons.nth(4).click();
      await page.waitForTimeout(700);
      result.screenshots.map_luecken = await screenshot(page, 'network-mobile-map-luecken.png');
      result.checks.map_lens_luecken = {
        passed: true,
        activeReadingTitle: await mapSection.locator('.ui-stack .ui-card__title').first().textContent(),
        countValues: await visibleTexts(mapSection.locator('.ui-fact-card__value'), 10),
      };
    });

    result.checks.layout_final = await collectLayoutMetrics(page);
  } catch (error) {
    result.error = {
      message: error.message,
      stack: error.stack,
    };
  } finally {
    await fs.promises.writeFile(path.join(OUT_DIR, 'mobile-network-qa-result.json'), JSON.stringify(result, null, 2));
    await browser.close();
  }
})();
