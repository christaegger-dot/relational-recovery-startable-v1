// Prerender-Script fuer Audit 10 / Option 5.
//
// Laedt nach dem Vite-Build die Start-Route einmal in Headless-Chromium,
// wartet auf das gerenderte React-Output und schreibt das hydrierte HTML
// zurueck in dist/index.html. Damit sehen Social-Media-Crawler (ohne JS)
// bei der Standard-URL echten Inhalt statt eines leeren <div id="root">.
//
// Hash-basiertes Routing macht per-sub-route Prerendering nicht sinnvoll:
// Fragment-URLs (#toolbox etc.) werden nicht an den Server gesendet, also
// sehen Crawler bei jeder geteilten URL dieselbe index.html. Deshalb
// wird nur die Start-Route prerendert; alle anderen Routen teilen dieses
// Initial-HTML und hydrieren dann clientseitig in den richtigen Tab.

import fs from 'node:fs/promises';
import path from 'node:path';
import { spawn } from 'node:child_process';
import { chromium } from 'playwright-core';

const projectRoot = path.resolve(import.meta.dirname, '..');
const distDir = path.join(projectRoot, 'dist');
const indexPath = path.join(distDir, 'index.html');
const previewPort = 4173;
const previewUrl = `http://127.0.0.1:${previewPort}/`;
const readyTimeoutMs = 30000;
const renderWaitMs = 800;

function startPreview() {
  return new Promise((resolve, reject) => {
    const child = spawn('npx', ['vite', 'preview', '--port', String(previewPort), '--strictPort'], {
      cwd: projectRoot,
      stdio: ['ignore', 'pipe', 'pipe'],
    });
    const timer = setTimeout(() => {
      child.kill();
      reject(new Error(`Vite-Preview-Server ist nach ${readyTimeoutMs} ms nicht bereit geworden.`));
    }, readyTimeoutMs);
    child.stdout.on('data', (chunk) => {
      const text = chunk.toString();
      if (text.includes(`localhost:${previewPort}`) || text.includes(`${previewPort}/`)) {
        clearTimeout(timer);
        resolve(child);
      }
    });
    child.stderr.on('data', (chunk) => {
      process.stderr.write(`[preview] ${chunk}`);
    });
    child.on('error', (err) => {
      clearTimeout(timer);
      reject(err);
    });
  });
}

async function prerenderStartRoute() {
  const browser = await chromium.launch({ headless: true });
  try {
    const context = await browser.newContext({ viewport: { width: 1280, height: 1000 } });
    const page = await context.newPage();
    await page.goto(previewUrl, { waitUntil: 'networkidle', timeout: readyTimeoutMs });
    // Start-Route: warte auf das Page-Heading (id wird von getPageHeadingId('start') vergeben).
    await page.waitForSelector('#page-heading-start', { timeout: readyTimeoutMs });
    // Kurze Zusatz-Wartezeit, damit Effects und Suspense-Fallbacks abklingen.
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

async function injectPrerenderedHtml(rootInnerHTML) {
  let html = await fs.readFile(indexPath, 'utf8');
  if (!rootInnerHTML || rootInnerHTML.length < 200) {
    throw new Error(`Prerender hat zu wenig HTML geliefert (${rootInnerHTML?.length ?? 0} Zeichen).`);
  }
  const emptyRoot = '<div id="root"></div>';
  if (!html.includes(emptyRoot)) {
    throw new Error(`Konnte ${emptyRoot} in dist/index.html nicht finden.`);
  }
  const filledRoot = `<div id="root" data-prerendered="start">${rootInnerHTML}</div>`;
  html = html.replace(emptyRoot, filledRoot);
  await fs.writeFile(indexPath, html, 'utf8');
  return html.length;
}

async function main() {
  console.log('[prerender] Vite-Preview-Server starten ...');
  const previewProcess = await startPreview();
  let htmlSize;
  try {
    console.log('[prerender] Start-Route in Headless-Chromium rendern ...');
    const rootInnerHTML = await prerenderStartRoute();
    console.log(`[prerender] Gerendert: ${rootInnerHTML.length} Zeichen im #root.`);
    htmlSize = await injectPrerenderedHtml(rootInnerHTML);
    console.log(`[prerender] dist/index.html aktualisiert, neue Groesse: ${htmlSize} Bytes.`);
  } finally {
    previewProcess.kill();
  }
}

main().catch((err) => {
  console.error('[prerender] Fehlgeschlagen:', err.message);
  process.exit(1);
});
