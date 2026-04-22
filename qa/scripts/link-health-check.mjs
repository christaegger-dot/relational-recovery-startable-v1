#!/usr/bin/env node
/**
 * Link-Health-Check fuer externe URLs im Fachportal.
 *
 * Scannt `src/`, `public/` und `index.html` nach http(s)-URLs, filtert
 * interne, XML-Schema-Namespaces und SVG-Namespaces raus und pruefts
 * den Rest via HEAD-Request (mit GET-Fallback). Timeouts: 15s pro URL.
 * Parallelitaet: 5 concurrent, rate-limited damit wir externe Hosts
 * nicht ueberrennen.
 *
 * Ergebnis landet auf stdout als Markdown + wird nach
 * qa/link-health-check-report.md geschrieben. Das Skript ist idempotent
 * und sollte regelmaessig (z. B. monatlich manuell) gelaufen werden,
 * um URL-Rot fuer externe Quellen fruehzeitig zu erkennen.
 *
 * User-Agent ist bewusst ein echter Browser-String -- Node-Default
 * faengt von vielen Hosts 403.
 */

import { readFileSync, writeFileSync, mkdirSync, readdirSync, statSync } from 'node:fs';
import { join, extname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const REPO_ROOT = join(__dirname, '..', '..');
const REPORT_PATH = join(REPO_ROOT, 'qa', 'link-health-check-report.md');

const SCAN_DIRS = [join(REPO_ROOT, 'src'), join(REPO_ROOT, 'public')];
const SCAN_FILES = [join(REPO_ROOT, 'index.html')];
const INCLUDE_EXT = new Set(['.js', '.jsx', '.css', '.html', '.xml', '.txt', '.json', '.svg']);

const EXCLUDE_HOSTS = new Set([
  'eltern-angehoerige-fa.netlify.app',
  'schema.org',
  'www.sitemaps.org',
  'www.w3.org',
  'localhost',
]);

const URL_REGEX = /https?:\/\/[^\s"'`<>)\]]+/g;
const CONCURRENCY = 5;
const TIMEOUT_MS = 15_000;
const USER_AGENT =
  'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36 qa-link-health-check/1.0';

function walkFiles(startPath) {
  const result = [];
  const stack = [startPath];
  while (stack.length) {
    const current = stack.pop();
    const st = statSync(current, { throwIfNoEntry: false });
    if (!st) continue;
    if (st.isDirectory()) {
      for (const entry of readdirSync(current)) stack.push(join(current, entry));
    } else if (st.isFile() && INCLUDE_EXT.has(extname(current))) {
      result.push(current);
    }
  }
  return result;
}

function cleanUrl(raw) {
  // Strip trailing punctuation that was never part of the URL (z. B. Komma am
  // Satzende, schliessende Klammer, Punkt am Satzende).
  return raw.replace(/[.,;:!?)\]]+$/, '');
}

function collectUrls() {
  const files = [...SCAN_FILES, ...SCAN_DIRS.flatMap((dir) => walkFiles(dir))];
  const byUrl = new Map();
  for (const file of files) {
    let content;
    try {
      content = readFileSync(file, 'utf8');
    } catch {
      continue;
    }
    for (const match of content.matchAll(URL_REGEX)) {
      const url = cleanUrl(match[0]);
      let host;
      try {
        host = new URL(url).hostname;
      } catch {
        continue;
      }
      if (EXCLUDE_HOSTS.has(host)) continue;
      const rel = file.replace(REPO_ROOT + '/', '');
      if (!byUrl.has(url)) byUrl.set(url, new Set());
      byUrl.get(url).add(rel);
    }
  }
  return byUrl;
}

async function checkOne(url) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);

  const started = Date.now();
  const tryOnce = async (method) => {
    const response = await fetch(url, {
      method,
      redirect: 'follow',
      signal: controller.signal,
      headers: {
        'User-Agent': USER_AGENT,
        Accept: 'text/html,application/xhtml+xml,application/pdf,*/*;q=0.8',
      },
    });
    return {
      status: response.status,
      finalUrl: response.url,
      redirected: response.redirected,
    };
  };

  try {
    let result;
    try {
      result = await tryOnce('HEAD');
      // Einige Hosts (insbesondere Cloudflare hinter PDFs) liefern 403/405/501
      // auf HEAD, obwohl GET sauber geht. Fallback.
      if ([403, 405, 501, 503].includes(result.status)) {
        result = await tryOnce('GET');
      }
    } catch (headErr) {
      // HEAD komplett abgewiesen -> GET-Retry
      result = await tryOnce('GET');
    }
    clearTimeout(timer);
    return {
      url,
      status: result.status,
      finalUrl: result.finalUrl,
      redirected: result.redirected,
      elapsed: Date.now() - started,
      error: null,
    };
  } catch (err) {
    clearTimeout(timer);
    return {
      url,
      status: null,
      finalUrl: null,
      redirected: false,
      elapsed: Date.now() - started,
      error: err.name === 'AbortError' ? `timeout nach ${TIMEOUT_MS}ms` : err.message,
    };
  }
}

async function runInPool(items, concurrency, worker) {
  const results = new Array(items.length);
  let cursor = 0;
  const workers = Array.from({ length: concurrency }, async () => {
    while (true) {
      const idx = cursor++;
      if (idx >= items.length) return;
      results[idx] = await worker(items[idx], idx);
    }
  });
  await Promise.all(workers);
  return results;
}

function categorize(result) {
  if (result.error) return 'network-error';
  if (result.status >= 200 && result.status < 300) return result.redirected ? 'ok-redirected' : 'ok';
  if (result.status >= 300 && result.status < 400) return '3xx';
  if (result.status >= 400 && result.status < 500) return `4xx-${result.status}`;
  if (result.status >= 500) return `5xx-${result.status}`;
  return 'unknown';
}

function renderReport(urlToSources, results, startedAt) {
  const elapsed = Date.now() - startedAt;
  const buckets = {
    ok: [],
    'ok-redirected': [],
    '3xx': [],
    '4xx-404': [],
    '4xx-other': [],
    '5xx': [],
    'network-error': [],
  };
  for (const r of results) {
    const cat = categorize(r);
    if (cat === 'ok') buckets.ok.push(r);
    else if (cat === 'ok-redirected') buckets['ok-redirected'].push(r);
    else if (cat === '3xx') buckets['3xx'].push(r);
    else if (cat === '4xx-404') buckets['4xx-404'].push(r);
    else if (cat.startsWith('4xx-')) buckets['4xx-other'].push(r);
    else if (cat.startsWith('5xx-')) buckets['5xx'].push(r);
    else buckets['network-error'].push(r);
  }

  const lines = [];
  lines.push('# Link-Health-Check Report');
  lines.push('');
  lines.push(`**Stand:** ${new Date().toISOString().slice(0, 19).replace('T', ' ')} UTC`);
  lines.push(`**Pruefzeit:** ${(elapsed / 1000).toFixed(1)}s`);
  lines.push(`**URLs geprueft:** ${results.length}`);
  lines.push(`**Skript:** \`qa/scripts/link-health-check.mjs\``);
  lines.push('');
  lines.push('## Zusammenfassung');
  lines.push('');
  lines.push('| Kategorie | Count |');
  lines.push('| --- | ---: |');
  lines.push(`| OK (2xx direkt) | ${buckets.ok.length} |`);
  lines.push(`| OK nach Redirect | ${buckets['ok-redirected'].length} |`);
  lines.push(`| 3xx (unaufgeloest) | ${buckets['3xx'].length} |`);
  lines.push(`| 404 | ${buckets['4xx-404'].length} |`);
  lines.push(`| 4xx (andere) | ${buckets['4xx-other'].length} |`);
  lines.push(`| 5xx | ${buckets['5xx'].length} |`);
  lines.push(`| Netzwerk-Fehler / Timeout | ${buckets['network-error'].length} |`);
  lines.push('');

  const needsAttention = buckets['4xx-404'].length + buckets['4xx-other'].length + buckets['5xx'].length + buckets['network-error'].length;
  if (needsAttention > 0) {
    lines.push(`## Handlungsbedarf (${needsAttention} URL(s))`);
    lines.push('');
  } else {
    lines.push('## Handlungsbedarf');
    lines.push('');
    lines.push('Keine broken Links gefunden.');
    lines.push('');
  }

  const renderBucket = (title, bucket, showSources = false) => {
    if (!bucket.length) return;
    lines.push(`### ${title} (${bucket.length})`);
    lines.push('');
    for (const r of bucket) {
      const status = r.error ? `FEHLER: ${r.error}` : `HTTP ${r.status}`;
      const finalNote = r.redirected && r.finalUrl && r.finalUrl !== r.url ? ` -> ${r.finalUrl}` : '';
      lines.push(`- ${status} (${r.elapsed}ms): ${r.url}${finalNote}`);
      if (showSources) {
        const sources = [...(urlToSources.get(r.url) || [])].sort();
        for (const s of sources) lines.push(`  - \`${s}\``);
      }
    }
    lines.push('');
  };

  renderBucket('404 Not Found', buckets['4xx-404'], true);
  renderBucket('5xx Server-Fehler', buckets['5xx'], true);
  renderBucket('4xx andere', buckets['4xx-other'], true);
  renderBucket('Netzwerk-Fehler / Timeout', buckets['network-error'], true);
  renderBucket('3xx unaufgeloest', buckets['3xx'], true);

  lines.push('## Detailprotokoll');
  lines.push('');
  lines.push('| Status | URL | Finaler URL | Quelle(n) |');
  lines.push('| --- | --- | --- | --- |');
  for (const r of results.slice().sort((a, b) => a.url.localeCompare(b.url))) {
    const status = r.error ? `ERR` : String(r.status);
    const final = r.redirected && r.finalUrl && r.finalUrl !== r.url ? r.finalUrl : '—';
    const sources = [...(urlToSources.get(r.url) || [])].sort();
    const firstSrc = sources[0] || '';
    const moreCount = sources.length > 1 ? ` (+${sources.length - 1})` : '';
    lines.push(`| ${status} | ${r.url} | ${final} | \`${firstSrc}\`${moreCount} |`);
  }
  lines.push('');

  return lines.join('\n');
}

async function main() {
  const startedAt = Date.now();
  const urlToSources = collectUrls();
  const urls = [...urlToSources.keys()].sort();
  console.log(`[link-health] ${urls.length} einzigartige URLs gefunden, ${CONCURRENCY} parallel, Timeout ${TIMEOUT_MS}ms.`);

  const results = await runInPool(urls, CONCURRENCY, async (url, idx) => {
    const r = await checkOne(url);
    const status = r.error ? `ERR (${r.error})` : r.status;
    console.log(`[${String(idx + 1).padStart(3, ' ')}/${urls.length}] ${status}  ${r.url}`);
    return r;
  });

  const report = renderReport(urlToSources, results, startedAt);
  mkdirSync(join(REPO_ROOT, 'qa'), { recursive: true });
  writeFileSync(REPORT_PATH, report, 'utf8');
  console.log(`[link-health] Report geschrieben: ${REPORT_PATH}`);

  const broken = results.filter((r) => r.error || (r.status && r.status >= 400)).length;
  if (broken > 0) {
    console.log(`[link-health] ${broken} URL(s) brauchen Aufmerksamkeit -- siehe Report.`);
    process.exit(0); // absichtlich 0: Report existiert, broken links sind Content-Anliegen, kein Build-Fail
  }
}

main().catch((err) => {
  console.error('[link-health] unerwarteter Fehler:', err);
  process.exit(2);
});
