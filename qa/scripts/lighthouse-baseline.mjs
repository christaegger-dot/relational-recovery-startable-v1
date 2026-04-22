#!/usr/bin/env node
/**
 * Lighthouse-Baseline-Runner fuer das Fachportal.
 *
 * Laeuft Lighthouse via npx gegen die Produktions-URL (oder eine
 * alternative Base-URL als Argument) in beiden Form-Factors (mobile
 * + desktop) und schreibt eine kompakte Markdown-Zusammenfassung
 * nach qa/lighthouse-baseline.md.
 *
 * Lighthouse selbst wird ueber `npx lighthouse@13` geladen -- nicht als
 * Dev-Dependency, weil die Binary gross ist (~300 MB mit Chrome) und
 * der Check nicht bei jedem Build laufen soll. Einsatz: manuell pro
 * Release, automatisiert via workflow_dispatch.
 *
 * Ausgabe enthaelt die vier Top-Scores (Performance, Accessibility,
 * Best Practices, SEO) + die Core-Web-Vitals (LCP, TBT, CLS). Das
 * Markdown-Format ist bewusst grep-freundlich, damit Scores zwischen
 * Runs diff-bar sind.
 *
 * Nutzung:
 *   node qa/scripts/lighthouse-baseline.mjs
 *   node qa/scripts/lighthouse-baseline.mjs https://staging.example.com
 */

import { execSync } from 'node:child_process';
import { mkdirSync, writeFileSync, readFileSync, unlinkSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { tmpdir } from 'node:os';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const REPO_ROOT = join(__dirname, '..', '..');
const REPORT_PATH = join(REPO_ROOT, 'qa', 'lighthouse-baseline.md');

const DEFAULT_URL = 'https://eltern-angehoerige-fa.netlify.app/';
const targetUrl = process.argv[2] || DEFAULT_URL;

const FORM_FACTORS = [
  { name: 'mobile', preset: 'mobile' },
  { name: 'desktop', preset: 'desktop' },
];

const CHROME_FLAGS = ['--headless=new', '--no-sandbox', '--disable-gpu'];

function runLighthouse(preset) {
  const outputFile = join(tmpdir(), `lh-${preset}-${Date.now()}.json`);
  const args = [
    targetUrl,
    `--preset=${preset}`,
    `--chrome-flags="${CHROME_FLAGS.join(' ')}"`,
    '--output=json',
    `--output-path=${outputFile}`,
    '--quiet',
    '--only-categories=performance,accessibility,best-practices,seo',
  ];
  console.log(`[lighthouse] Starte ${preset} gegen ${targetUrl}`);
  execSync(`npx --yes lighthouse@13 ${args.join(' ')}`, { stdio: 'inherit' });
  const raw = readFileSync(outputFile, 'utf8');
  unlinkSync(outputFile);
  return JSON.parse(raw);
}

function pickScore(report, category) {
  const cat = report.categories?.[category];
  return cat ? Math.round(cat.score * 100) : null;
}

function pickAuditValue(report, auditId) {
  const audit = report.audits?.[auditId];
  if (!audit) return null;
  return {
    displayValue: audit.displayValue || '—',
    numericValue: audit.numericValue ?? null,
    score: audit.score ?? null,
  };
}

function formatScore(score) {
  if (score === null) return '—';
  const emoji = score >= 90 ? '🟢' : score >= 50 ? '🟡' : '🔴';
  return `${emoji} ${score}`;
}

function renderReport(results) {
  const lines = [];
  lines.push('# Lighthouse-Baseline');
  lines.push('');
  lines.push(`**Stand:** ${new Date().toISOString().slice(0, 19).replace('T', ' ')} UTC`);
  lines.push(`**Ziel-URL:** ${targetUrl}`);
  lines.push(`**Skript:** \`qa/scripts/lighthouse-baseline.mjs\``);
  lines.push('');
  lines.push('Scores sind das Ergebnis eines einzelnen Runs — Lighthouse-Werte schwanken');
  lines.push('im Bereich ±3 zwischen Runs (Netzwerk, Throttling-Jitter, CPU-Variation).');
  lines.push('Als Baseline reicht ein Run; fuer Regressions-Tracking am selben Commit');
  lines.push('empfiehlt sich Medianbildung ueber 3–5 Runs.');
  lines.push('');

  lines.push('## Scores');
  lines.push('');
  lines.push('| Kategorie | Mobile | Desktop |');
  lines.push('| --- | :---: | :---: |');
  for (const cat of ['performance', 'accessibility', 'best-practices', 'seo']) {
    const label = cat === 'best-practices' ? 'Best Practices' : cat[0].toUpperCase() + cat.slice(1);
    const mobile = formatScore(pickScore(results.mobile, cat));
    const desktop = formatScore(pickScore(results.desktop, cat));
    lines.push(`| ${label} | ${mobile} | ${desktop} |`);
  }
  lines.push('');

  lines.push('## Core Web Vitals');
  lines.push('');
  lines.push('| Metric | Mobile | Desktop | Schwelle gruen |');
  lines.push('| --- | ---: | ---: | --- |');
  const vitals = [
    { id: 'largest-contentful-paint', label: 'LCP', green: '≤ 2.5 s' },
    { id: 'total-blocking-time', label: 'TBT', green: '≤ 200 ms' },
    { id: 'cumulative-layout-shift', label: 'CLS', green: '≤ 0.1' },
    { id: 'first-contentful-paint', label: 'FCP', green: '≤ 1.8 s' },
    { id: 'speed-index', label: 'Speed Index', green: '≤ 3.4 s' },
  ];
  for (const v of vitals) {
    const m = pickAuditValue(results.mobile, v.id);
    const d = pickAuditValue(results.desktop, v.id);
    lines.push(`| ${v.label} | ${m?.displayValue ?? '—'} | ${d?.displayValue ?? '—'} | ${v.green} |`);
  }
  lines.push('');

  lines.push('## Hinweis zur Reproduktion');
  lines.push('');
  lines.push('```bash');
  lines.push(`node qa/scripts/lighthouse-baseline.mjs${targetUrl === DEFAULT_URL ? '' : ' ' + targetUrl}`);
  lines.push('```');
  lines.push('');
  lines.push('Benoetigt outbound HTTPS + lokales Chrome/Chromium (Lighthouse bringt seines');
  lines.push('via `chrome-launcher` mit). Fuer Sandbox-Umgebungen ohne Internet: via');
  lines.push('GitHub-Actions-Workflow `qa-baseline.yml` (workflow_dispatch-Trigger).');
  lines.push('');

  return lines.join('\n');
}

async function main() {
  const results = {};
  for (const ff of FORM_FACTORS) {
    results[ff.name] = runLighthouse(ff.preset);
  }

  mkdirSync(join(REPO_ROOT, 'qa'), { recursive: true });
  writeFileSync(REPORT_PATH, renderReport(results), 'utf8');
  console.log(`[lighthouse] Report geschrieben: ${REPORT_PATH}`);
}

main().catch((err) => {
  console.error('[lighthouse] Fehler:', err.message || err);
  process.exit(2);
});
