# Audit 23 — SEO + Meta-Completeness

**Datum:** 2026-04-21
**Branch:** `claude/audit-23-seo-meta`
**Scope:** Letzter Release-Check: HTML-Meta, OG-/Twitter-Card, JSON-LD, robots.txt, sitemap.xml, Heading-Hierarchie, lang-Attribut, per-Route-Meta-Updates.

## Warum pre-release-relevant

Nach den Audits 20–22 ist das Haus dicht (Prerender, Content, Resilience). Jetzt geht es darum, dass das, was Suchmaschinen und Social-Link-Preview-Tools sehen, exakt das Signal transportiert, das die redaktionelle Arbeit der letzten Audits gesetzt hat. Ein schlechter Twitter-Preview, eine fehlende Canonical-Angabe oder ein irreführender `<title>` wirft nach dem Launch wochenlang.

## Inventur (Phase 1)

### 1.1 HTML-Meta in `index.html`

| Tag | Vorhanden | Quelle |
| --- | --- | --- |
| `<meta charset>` | ✓ UTF-8 | index.html:4 |
| `<meta viewport>` | ✓ | index.html:5 |
| `<meta theme-color>` | ✓ `#f9f4ee` | index.html:6 |
| `<meta name="apple-mobile-web-app-capable">` | ✓ | index.html:7 |
| `<title>` | ✓ | index.html:9 |
| `<meta name="description">` | ✓ | index.html:10-13 |
| `<link rel="canonical">` | ✓ Root | index.html:14 |
| `og:title`, `og:description`, `og:type`, `og:url`, `og:image`, `og:locale` | ✓ | index.html:15-23 |
| `twitter:card`, `twitter:title`, `twitter:description`, `twitter:image` | ✓ | index.html:24-30 |
| `<link rel="icon">` | ✓ SVG | index.html:31 |
| JSON-LD `@type: Organization` | ✓ mit 3 ContactPoints (144, AERZTEFON, 147) | index.html:45-82 |
| `<html lang="de-CH">` | ✓ | index.html:2 |

### 1.2 Per-Route-Meta-Updates

`src/utils/useDocumentMeta.js` + `src/data/routeMeta.js` liefern pro `activeTab`:
- `document.title`
- `<meta name="description">`
- `<meta property="og:title|description|image|url">`
- `<meta name="twitter:card|title|description|image">`
- `<link rel="canonical">` (bewusst konstant auf Root-URL, weil Fragment-URLs keine getrennten Crawler-Endpunkte sind)

Alle 8 Tabs haben kuratierte Titles + Descriptions. Swiss-German-Orthographie durchgehend (ss statt ß). ✓

### 1.3 robots.txt + sitemap.xml

```
User-agent: *
Allow: /
Sitemap: <base>/sitemap.xml
```

Kein `Disallow`. `<base>` wird zur Build-Zeit durch `scripts/replace-env.mjs` in die Netlify-Produktionsadresse aufgelöst. ✓

Sitemap enthält genau eine URL (Root). Das ist die korrekte Behandlung für hash-basierte SPAs — Crawler indizieren `#material` etc. nicht als separate Dokumente. ✓

### 1.4 Heading-Hierarchie

- `PageHero` rendert pro Route **eine** sichtbare `<h1>` mit stabiler `id="page-heading-{tab}"` (8 Tabs, 8 IDs, `src/utils/appHelpers.js:231-238`).
- `<main>` hat `aria-labelledby={getPageHeadingId(activeTab)}` → deklarative Page-Landmark-Beziehung.

Zwei print-only H1s (ausserhalb des Screen-Outputs):
- `src/templates/VignettenPageTemplate.jsx:169` — in `.print-only`-`<aside>` mit Hinweis „Diese Seite ist nicht zum Ausdrucken vorgesehen" (Audit 11).
- `src/sections/ToolboxSection.jsx:530` — in `toolbox-print-view`-`<div class="print-only" aria-hidden="true">` für Arbeitsansicht-Druck.

Beide sind auf dem Screen via `display: none` unsichtbar **und** per `aria-hidden="true"` vor Screen-Readern verborgen (Audit 13 / F6 explizit dokumentiert in `ClosingSection.jsx:449-457`). Googlebot rendert modernes CSS — die `display: none`-H1s tauchen nicht in der sichtbaren Outline auf. Lighthouse SEO-Score bewertet das Pattern als akzeptabel, weil die Screen-Outline genau eine sichtbare H1 pro Route enthält.

Kein Handlungsbedarf.

### 1.5 OG-Image

`public/og-image.webp` — 1200×800, WebP, VP8.

- Empfehlung Facebook/LinkedIn: 1200×630 (1.91:1).
- Empfehlung Twitter `summary_large_image`: 1200×675 (16:9).
- Tatsächlich: 1200×800 (3:2).

Social-Plattformen croppen 3:2 → 1.91:1 zentriert, ohne fatalen Ausschnitt. Kein Release-Blocker. Re-Export auf 1200×630 wäre eine Asset-Pflegeaufgabe, die ein externes Quelldokument berührt — bewusst nicht in diesem Audit.

### 1.6 Gefundene Lücken (P3, Polish)

Auffälligkeiten, die nicht fehlerhaft, aber ausbaufähig sind:

1. **`og:site_name`** fehlt. Social-Plattformen zeigen dann den reinen Title ohne Brand-Rahmen. Einzeiler.
2. **`og:image:width` + `og:image:height`** fehlen. Ohne sie layouten Crawler den Preview evtl. langsamer oder mit Layout-Shift. Einzeiler.
3. **`og:image:alt`** fehlt. A11y-Gap im Social-Preview; assistive Tools können das OG-Bild nicht beschreiben.

### 1.7 Explizit nicht umgesetzt (out of scope)

- **`apple-touch-icon`**: Mobile-Home-Screen-UX, kein SEO-Signal. Separater PR, wenn gewünscht.
- **`<noscript>`-Fallback**: Robustheit, kein SEO. Prerender (Audit 20) deckt First Paint ohne JS für Start-Route ab; andere Tabs brauchen JS zur Navigation — dokumentierte Architekturentscheidung.
- **Sitemap `<lastmod>`**: Freshness-Signal. Für statisches, monatlich aktualisiertes Fachportal überschaubarer Nutzen.
- **`<meta name="keywords">`**: Von Google seit 2009 ignoriert.
- **hreflang**: Nur DE-CH, keine weiteren Sprachen.

## Triage (Phase 2)

| # | Finding | Aktion |
| --- | --- | --- |
| 1.1 | HTML-Meta-Basis komplett | Kein Handlungsbedarf |
| 1.2 | Per-Route-Meta-Updates funktionieren | Kein Handlungsbedarf |
| 1.3 | robots.txt + sitemap.xml korrekt | Kein Handlungsbedarf |
| 1.4 | Heading-Hierarchie sauber (print-only H1s dokumentiert) | Kein Handlungsbedarf |
| 1.5 | OG-Image-Seitenverhältnis suboptimal | Nicht in Scope (Asset-Arbeit) |
| 1.6 | 4 OG-Tags fehlen für Social-Preview-Polish | **Fix**: einmalig in index.html ergänzen |
| 1.7 | Nice-to-haves ausserhalb SEO-Scope | Nicht handeln |

## Umsetzung (Phase 3)

`index.html` — vier neue `<meta property="og:*">`-Einträge:

```html
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="800" />
<meta property="og:image:alt" content="Fachportal für Orientierung, Triage und Weitervermittlung rund um psychisch belastete Elternsysteme" />
<meta property="og:site_name" content="Eltern im Beratungskontext" />
```

Alle statisch (routeunabhängig), deshalb keine Ergänzung in `useDocumentMeta.js` nötig. Der Hook ändert bei Tab-Wechsel nur Title/Description/OG-Title/Image/URL — die neuen Site-Name- und Image-Dimension-Tags bleiben stabil.

## Verifikation (Phase 4)

- `npm run lint` → grün.
- `npm run format:check` → grün.
- `rm -rf dist && npm run build` → grün (Audit-20-Asset-Guard passiert).
- `grep -E 'og:site_name|og:image:width|og:image:height|og:image:alt' dist/index.html` → alle vier Tags im Build-Output vorhanden.

## Ergebnis

**Clean Bill mit einem Polish-Fix.** Das Meta-Setup war schon vor diesem Audit solide (per-Route-Updates, JSON-LD, Canonical-Strategie, Heading-Landmarks). Vier kleinere OG-Tags ergänzt, um den Social-Preview rund und a11y-freundlich auszuliefern.

## Follow-ups

Optionale Nachzügler für separate, bewusst priorisierte PRs:

- OG-Image 1200×630 (Asset-Re-Export) — falls Relevanz steigt.
- `apple-touch-icon` 180×180 PNG — falls Mobile-Home-Screen-UX zum Thema wird.

Beide sind **nicht** release-blockierend.
