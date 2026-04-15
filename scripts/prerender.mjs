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
// Audit-13-Follow-up (Netlify-Build-Fix): Timeout von 30s auf 90s erhoeht,
// plus aktiver HTTP-Health-Check statt blosser stdout-Beobachtung. CI-
// Umgebungen wie Netlify starten Vite-Preview teils deutlich langsamer
// als lokale Entwickler-Maschinen.
const readyTimeoutMs = 90_000;
const healthCheckIntervalMs = 500;
const renderWaitMs = 800;

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
  // --host 0.0.0.0: in CI-Umgebungen (Netlify u. a.) wichtig, damit der
  // Server auf alle Interfaces bindet. Default 'localhost' kann in
  // Container-Netzwerken zu Bind-Konflikten oder nicht-erreichbaren
  // Endpoints fuehren; 127.0.0.1-Requests gegen einen 'localhost'-Bind
  // klappen nicht zuverlaessig.
  const child = spawn('npx', ['vite', 'preview', '--host', '0.0.0.0', '--port', String(previewPort), '--strictPort'], {
    cwd: projectRoot,
    stdio: ['ignore', 'pipe', 'pipe'],
  });
  // Vite-Preview-Output durchreichen, damit der Netlify-Build-Log
  // sichtbar zeigt, was los ist, falls der Start scheitert.
  child.stdout.on('data', (chunk) => {
    process.stdout.write(`[preview] ${chunk}`);
  });
  child.stderr.on('data', (chunk) => {
    process.stderr.write(`[preview] ${chunk}`);
  });
  return child;
}

async function startPreview() {
  const child = spawnPreview();

  // Aktives Polling des HTTP-Endpoints. So erkennen wir genau dann,
  // wenn der Server tatsaechlich antwortet -- nicht nur wenn er etwas
  // ins stdout schreibt.
  const deadline = Date.now() + readyTimeoutMs;
  let exited = false;
  // Flag, das main() setzt, wenn wir den Prozess selbst beenden wollen
  // -- dann ist ein anschliessender exit kein Fehler, sondern erwartet.
  child.__intentionalShutdown = false;
  child.on('exit', (code, signal) => {
    exited = true;
    if (!child.__intentionalShutdown) {
      console.error(`[prerender] Vite-Preview-Prozess ist frueh beendet (code=${code}, signal=${signal}).`);
    }
  });

  while (Date.now() < deadline) {
    if (exited) {
      throw new Error('Vite-Preview-Prozess ist vor Bereitschaft beendet worden.');
    }
    if (await isPreviewReady()) {
      return child;
    }
    await wait(healthCheckIntervalMs);
  }

  child.kill();
  throw new Error(`Vite-Preview-Server ist nach ${readyTimeoutMs} ms nicht bereit geworden (Health-Check auf ${previewUrl} schlug fehl).`);
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
    previewProcess.__intentionalShutdown = true;
    previewProcess.kill();
  }
}

main().catch((err) => {
  console.error('[prerender] Fehlgeschlagen:', err.message);
  process.exit(1);
});
