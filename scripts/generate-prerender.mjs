// Lokaler Snapshot-Generator fuer src/prerendered/start-body.html.
//
// Wird nur lokal ausgefuehrt, wenn sich der HomeLanding-Inhalt veraendert
// hat und der committete Snapshot aktualisiert werden soll. Nicht Teil
// der CI-Build-Chain.
//
// Aufruf: npm run refresh-prerender
//
// Voraussetzung: npx playwright install chromium muss lokal erledigt
// sein. Der Script startet vite preview, rendert die Start-Route in
// Headless-Chromium, extrahiert den #root-Body und schreibt ihn in
// src/prerendered/start-body.html.
//
// Nach dem Lauf den aktualisierten Snapshot committen:
//   git add src/prerendered/start-body.html
//   git commit -m "chore: prerender snapshot aktualisiert"

import fs from 'node:fs/promises';
import path from 'node:path';
import { spawn } from 'node:child_process';
import { chromium } from 'playwright-core';

const projectRoot = path.resolve(import.meta.dirname, '..');
const previewPort = 4173;
const previewUrl = `http://127.0.0.1:${previewPort}/`;
const readyTimeoutMs = 90_000;
const healthCheckIntervalMs = 500;
const renderWaitMs = 800;
const snapshotPath = path.join(projectRoot, 'src', 'prerendered', 'start-body.html');

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function isPreviewReady() {
  try {
    const res = await fetch(previewUrl, { method: 'HEAD' });
    return res.ok || (res.status >= 200 && res.status < 500);
  } catch {
    return false;
  }
}

function spawnPreview() {
  const child = spawn('npx', ['vite', 'preview', '--host', '0.0.0.0', '--port', String(previewPort), '--strictPort'], {
    cwd: projectRoot,
    stdio: ['ignore', 'pipe', 'pipe'],
  });
  child.stdout.on('data', (chunk) => process.stdout.write(`[preview] ${chunk}`));
  child.stderr.on('data', (chunk) => process.stderr.write(`[preview] ${chunk}`));
  return child;
}

async function startPreview() {
  const child = spawnPreview();
  const deadline = Date.now() + readyTimeoutMs;
  let exited = false;
  child.__intentionalShutdown = false;
  child.on('exit', () => {
    exited = true;
  });

  while (Date.now() < deadline) {
    if (exited) throw new Error('Vite-Preview-Prozess ist vor Bereitschaft beendet worden.');
    if (await isPreviewReady()) return child;
    await wait(healthCheckIntervalMs);
  }
  child.kill();
  throw new Error(`Vite-Preview-Server ist nach ${readyTimeoutMs} ms nicht bereit geworden.`);
}

async function captureStartBody() {
  const browser = await chromium.launch({ headless: true });
  try {
    const context = await browser.newContext({ viewport: { width: 1280, height: 1000 } });
    const page = await context.newPage();
    await page.goto(previewUrl, { waitUntil: 'networkidle', timeout: readyTimeoutMs });
    await page.waitForSelector('#page-heading-start', { timeout: readyTimeoutMs });
    await page.waitForTimeout(renderWaitMs);
    const rootHTML = await page.evaluate(() => {
      const root = document.getElementById('root');
      return root ? root.innerHTML : '';
    });
    await context.close();
    return rootHTML;
  } finally {
    await browser.close();
  }
}

async function main() {
  console.log('[generate-prerender] Vite-Preview-Server starten ...');
  const previewProcess = await startPreview();
  try {
    console.log('[generate-prerender] Start-Route in Headless-Chromium rendern ...');
    const rootInnerHTML = await captureStartBody();
    if (!rootInnerHTML || rootInnerHTML.length < 200) {
      throw new Error(`Prerender hat zu wenig HTML geliefert (${rootInnerHTML?.length ?? 0} Zeichen).`);
    }
    await fs.writeFile(snapshotPath, rootInnerHTML, 'utf8');
    console.log(`[generate-prerender] Snapshot aktualisiert: ${snapshotPath} (${rootInnerHTML.length} Zeichen).`);
    console.log('[generate-prerender] Bitte die Aenderung committen:');
    console.log('  git add src/prerendered/start-body.html');
    console.log(`  git commit -m "chore: prerender snapshot aktualisiert"`);
  } finally {
    previewProcess.__intentionalShutdown = true;
    previewProcess.kill();
  }
}

main().catch((err) => {
  console.error('[generate-prerender] Fehlgeschlagen:', err.message);
  process.exit(1);
});
