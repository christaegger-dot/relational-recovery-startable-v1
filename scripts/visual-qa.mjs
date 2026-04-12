import fs from 'node:fs/promises';
import path from 'node:path';
import { chromium } from 'playwright-core';

const baseUrl = process.argv[2] || 'http://127.0.0.1:5173';
const outDir = process.argv[3] || path.join(import.meta.dirname, '..', 'qa-artifacts');

const breakpoints = [
  { name: 'mobile-375', width: 375, height: 2200, mobileMenu: true },
  { name: 'tablet-768', width: 768, height: 2200, mobileMenu: false },
  { name: 'laptop-1024', width: 1024, height: 2200, mobileMenu: false },
  { name: 'desktop-1280', width: 1280, height: 2200, mobileMenu: false },
  { name: 'desktop-1440', width: 1440, height: 2200, mobileMenu: false },
];

async function ensureDir(dir) {
  await fs.mkdir(dir, { recursive: true });
}

async function dismissEmergencyBanner(page) {
  const closeButton = page.getByRole('button', { name: /schliessen/i });
  if (await closeButton.count()) {
    try {
      await closeButton.first().click({ timeout: 1500 });
      await page.waitForTimeout(150);
    } catch {}
  }
}

async function captureBreakpoint(browser, config) {
  const context = await browser.newContext({
    viewport: { width: config.width, height: config.height },
    deviceScaleFactor: 1,
    isMobile: config.width <= 480,
    hasTouch: config.width <= 480,
  });

  const page = await context.newPage();
  await page.goto(baseUrl, { waitUntil: 'networkidle' });
  await page.waitForTimeout(600);
  await dismissEmergencyBanner(page);

  const targetDir = path.join(outDir, config.name);
  await ensureDir(targetDir);

  await page.screenshot({ path: path.join(targetDir, 'full.png'), fullPage: true });
  await page.locator('header').first().screenshot({ path: path.join(targetDir, 'header.png') });

  if (config.mobileMenu) {
    const menuButton = page.getByRole('button', { name: /menü öffnen/i });
    if (await menuButton.count()) {
      await menuButton.first().click();
      await page.waitForTimeout(250);
      await page.screenshot({ path: path.join(targetDir, 'menu-open.png'), fullPage: true });
      await page.locator('#mobile-nav').screenshot({ path: path.join(targetDir, 'menu-panel.png') });
    }
  }

  const hero = page.locator('main section').first();
  if (await hero.count()) {
    await hero.screenshot({ path: path.join(targetDir, 'hero.png') });
  }

  const metrics = await page.evaluate(() => ({
    innerWidth: window.innerWidth,
    innerHeight: window.innerHeight,
    bodyScrollWidth: document.body.scrollWidth,
    docScrollWidth: document.documentElement.scrollWidth,
    bodyClientWidth: document.body.clientWidth,
    docClientWidth: document.documentElement.clientWidth,
    horizontalOverflow: document.documentElement.scrollWidth > document.documentElement.clientWidth,
    headerHeight: document.querySelector('header')?.getBoundingClientRect().height ?? null,
  }));

  await fs.writeFile(path.join(targetDir, 'metrics.json'), JSON.stringify(metrics, null, 2));
  await context.close();
}

const browser = await chromium.launch({
  executablePath: process.env.CHROMIUM_PATH || '/usr/bin/chromium',
  headless: true,
  args: ['--no-sandbox', '--disable-dev-shm-usage'],
});

await ensureDir(outDir);
for (const config of breakpoints) {
  await captureBreakpoint(browser, config);
}
await browser.close();
