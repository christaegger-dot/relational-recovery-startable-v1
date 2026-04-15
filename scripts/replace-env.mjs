// Post-Build-Script fuer statische Public-Dateien (Audit 12 / W4).
//
// Vite kopiert public/ unveraendert ins dist/, inklusive Platzhaltern wie
// __VITE_BASE_URL__. Dieses Script ersetzt die Platzhalter in dist/robots.txt
// und dist/sitemap.xml durch die tatsaechliche Umgebungs-Variable.
//
// index.html ist davon nicht betroffen, weil Vite dort %VITE_BASE_URL% nativ
// substituiert. src/data/routeMeta.js liest BASE_URL ueber import.meta.env
// zur Build-Zeit.
//
// Aufruf: Teil von 'npm run build' vor dem Prerender-Script.

import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// Lese die .env-Datei im Projekt-Root, falls vorhanden. Vite laedt .env nicht
// automatisch in Node-Scripts, deshalb manuell.
async function loadDotenv(rootDir) {
  const envPath = path.join(rootDir, '.env');
  try {
    const raw = await fs.readFile(envPath, 'utf8');
    for (const line of raw.split('\n')) {
      const match = line.match(/^([A-Z_][A-Z0-9_]*)=(.*)$/);
      if (!match) continue;
      const [, key, value] = match;
      if (!process.env[key]) {
        process.env[key] = value.trim();
      }
    }
  } catch {
    // keine .env-Datei -- Env-Variablen muessen anderswo gesetzt sein
  }
}

async function replaceInFile(filePath, replacements) {
  let content = await fs.readFile(filePath, 'utf8');
  for (const [placeholder, value] of replacements) {
    content = content.split(placeholder).join(value);
  }
  await fs.writeFile(filePath, content, 'utf8');
}

async function main() {
  const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
  await loadDotenv(rootDir);

  const baseUrl = process.env.VITE_BASE_URL || 'https://eltern-a.netlify.app';
  const distDir = path.join(rootDir, 'dist');
  const replacements = [['__VITE_BASE_URL__', baseUrl]];

  const targets = ['robots.txt', 'sitemap.xml'];
  for (const file of targets) {
    const fullPath = path.join(distDir, file);
    try {
      await replaceInFile(fullPath, replacements);
      console.log(`[replace-env] ${file}: Platzhalter ersetzt durch ${baseUrl}`);
    } catch (err) {
      console.warn(`[replace-env] ${file} konnte nicht verarbeitet werden: ${err.message}`);
    }
  }

  // Fallback-Schutz fuer index.html: Wenn Vite die VITE_BASE_URL-Env nicht
  // sah (typisch bei CI-Umgebungen ohne .env), bleibt der Vite-Platzhalter
  // %VITE_BASE_URL% in der dist/index.html stehen. Hier raeumen wir das
  // nachtraeglich auf, damit die Seite trotz fehlender Env-Variable deploybar
  // bleibt. Bei korrekt gesetzter Env-Variable ist der Platzhalter ohnehin
  // schon durch Vite ersetzt -- dann ist dieser Block ein No-op.
  try {
    const indexPath = path.join(distDir, 'index.html');
    let indexContent = await fs.readFile(indexPath, 'utf8');
    if (indexContent.includes('%VITE_BASE_URL%')) {
      indexContent = indexContent.split('%VITE_BASE_URL%').join(baseUrl);
      await fs.writeFile(indexPath, indexContent, 'utf8');
      console.log(`[replace-env] index.html: Vite-Platzhalter %VITE_BASE_URL% nachtraeglich ersetzt durch ${baseUrl}`);
    }
  } catch (err) {
    console.warn(`[replace-env] index.html-Fallback konnte nicht verarbeitet werden: ${err.message}`);
  }
}

main().catch((err) => {
  console.error('[replace-env] Fehlgeschlagen:', err.message);
  process.exit(1);
});
