// Browser-loser Prerender-Inject-Step.
//
// Historisch (Audit 10): scripts/prerender.mjs startete Vite-Preview +
// Headless-Chromium zur Build-Zeit, rendere die Start-Route und schrieb
// den HTML-Output in dist/index.html. Das funktionierte lokal und
// erforderte auf CI einen Playwright-Chromium-Download (~285 MB) plus
// eine robuste Vite-Preview-Bereitschaft.
//
// Das neue Setup entkoppelt den Prerender-Step komplett vom CI:
//   - src/prerendered/start-body.html enthaelt den committed HTML-Body
//     der Start-Route (einmal lokal via scripts/generate-prerender.mjs
//     aktualisierbar).
//   - Dieser Script injiziert den Body in dist/index.html, nachdem Vite
//     und replace-env fertig sind. Kein Browser, keine Netzwerk-Latenzen,
//     keine Build-Plugins noetig.
//
// Wenn sich der HomeLanding-Inhalt aendert, aktualisiert man den Snapshot
// mit 'npm run refresh-prerender'. Dieser Schritt darf offen bleiben,
// bis der Inhalt stabil ist -- der CI-Build kommt auch mit einem
// veralteten Snapshot durch; die Seite rendert dann clientseitig ohnehin
// neu (createRoot, nicht hydrateRoot).

import fs from 'node:fs/promises';
import path from 'node:path';

const projectRoot = path.resolve(import.meta.dirname, '..');
const distDir = path.join(projectRoot, 'dist');
const indexPath = path.join(distDir, 'index.html');
const snapshotPath = path.join(projectRoot, 'src', 'prerendered', 'start-body.html');

async function main() {
  let snapshot;
  try {
    snapshot = await fs.readFile(snapshotPath, 'utf8');
  } catch (err) {
    console.warn(`[inject-prerender] Snapshot ${snapshotPath} nicht gefunden (${err.code}). Ueberspringe Injection.`);
    return;
  }

  if (!snapshot || snapshot.length < 200) {
    console.warn(`[inject-prerender] Snapshot hat zu wenig Inhalt (${snapshot?.length ?? 0} Zeichen). Ueberspringe Injection.`);
    return;
  }

  let html = await fs.readFile(indexPath, 'utf8');
  const emptyRoot = '<div id="root"></div>';
  if (!html.includes(emptyRoot)) {
    if (html.includes('<div id="root" data-prerendered="start">')) {
      console.log('[inject-prerender] dist/index.html ist bereits prerendered -- Ueberspringe.');
      return;
    }
    throw new Error(`Konnte ${emptyRoot} in dist/index.html nicht finden.`);
  }
  const filled = `<div id="root" data-prerendered="start">${snapshot}</div>`;
  html = html.replace(emptyRoot, filled);
  await fs.writeFile(indexPath, html, 'utf8');
  console.log(`[inject-prerender] dist/index.html aktualisiert, ${snapshot.length} Zeichen Snapshot injiziert.`);

  // Stale-Asset-Guard: Der Snapshot referenziert gehashte Vite-Assets (z. B.
  // /assets/relational-recovery-hero-v3-web-f61AzqVV.webp). Wenn jemand das
  // Hero-Bild austauscht oder Vite den Hash-Algorithmus anpasst, ohne den
  // Snapshot via 'npm run refresh-prerender' neu zu bauen, zeigt der erste
  // Paint eine 404-Bildbox. React 'createRoot' ueberschreibt den Snapshot
  // zwar anschliessend, aber die LCP-Regression im First Paint faellt in
  // keinem Test auf. Darum hier fail-fast, wenn ein referenzierter Asset
  // nicht im Build existiert.
  const assetRefs = [...snapshot.matchAll(/\/assets\/([A-Za-z0-9._-]+)/g)].map((m) => m[1]);
  if (assetRefs.length > 0) {
    const assetsDir = path.join(distDir, 'assets');
    let existing;
    try {
      existing = new Set(await fs.readdir(assetsDir));
    } catch {
      existing = new Set();
    }
    const missing = [...new Set(assetRefs)].filter((name) => !existing.has(name));
    if (missing.length > 0) {
      throw new Error(
        `Snapshot referenziert ${missing.length} Asset(s), die nicht in dist/assets/ existieren: ${missing.join(', ')}. ` +
          `Der Snapshot ist stale. Bitte 'npm run refresh-prerender' ausfuehren und das Ergebnis committen.`,
      );
    }
  }
}

main().catch((err) => {
  console.error('[inject-prerender] Fehlgeschlagen:', err.message);
  process.exit(1);
});
