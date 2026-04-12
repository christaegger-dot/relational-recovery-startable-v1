# QA Audit Report – Welle 2
**Datum:** 2026-04-12  
**Umgebung:** Lokaler Dev-Server (`http://localhost:5173`, Vite 7.3.1)  
**Browser:** Chromium (Headless, `--no-sandbox`)

---

## 1. Visual QA / Responsive Layout Audit

**Skript:** `scripts/visual-qa.mjs`  
**Artefakte:** `qa-artifacts/{breakpoint}/full.png`, `header.png`, `hero.png`, `metrics.json`

### Ergebnisse

| Breakpoint | innerWidth | horizontalOverflow | Header-Höhe | Befund |
|---|---:|:---:|---:|---|
| mobile-375 | 375 | **nein** | 89px | ✅ Pass |
| tablet-768 | 768 | **nein** | 89px | ✅ Pass mit Beobachtung |
| laptop-1024 | 1024 | **nein** | 89px | ⚠️ Header-Zwischenzustand (bekannt) |
| desktop-1280 | 1280 | **nein** | 90.19px | ✅ Pass mit Beobachtung |
| desktop-1440 | 1440 | **nein** | 90.19px | ✅ Pass |

### Befunde

- **Kein horizontaler Overflow** auf keiner der 5 Breiten – Layout bleibt stabil.
- Header-Höhe springt auf ≥1280px von 89px auf 90.19px (Sub-Pixel-Rendering, kein Bug).
- Der bereits dokumentierte Header-Zwischenzustand bei **1024px** (kompakter Zustand, Navigation wenig präsent) besteht unverändert fort. Kein Regressionsrisiko erkennbar.
- Mobile Menü (375px): `#mobile-nav` und Öffnen-Button vorhanden, Screenshots erzeugt.

---

## 2. Deep-Link QA

**Skript:** `qa/deep_link_qa.cjs`  
**Ergebnisdatei:** `qa/deep-link-qa-result.json`

### Wichtiger Befund: ID-Migration (Legacy vs. Aktuell)

Die App hat seit dem ersten Audit-Lauf die DOM-IDs der Netzwerk-Sektionen **auf Deutsch umgestellt**:

| Alter ID / Hash | Neuer ID / Hash | Router-Alias vorhanden? |
|---|---|:---:|
| `#network` | `#netzwerk` | ✅ ja |
| `#network-directory` | `#netzwerk-fachstellen` | ✅ ja |
| `#network-map` | `#netzwerk-karte` | ✅ ja |

Der Router in `src/utils/appHelpers.js` (TAB_ALIASES) und `src/App.jsx` (sectionAliasMap) **unterstützt beide Varianten** – Legacy-Links bleiben also funktional.

### Testergebnisse

| Test | Hash nach Navigation | directoryPresent | mapPresent | scrollY | Befund |
|---|---|:---:|:---:|---:|---|
| `#network` (direkt) | `#netzwerk` | ✅ | ✅ | 0 | ✅ Tab geöffnet |
| `#network-map` (direkt) | `#network-map` | ✅ | ✅ | 4203 | ✅ Gescrollt zu Karte |
| `#network-directory` (direkt) | `#network-directory` | ✅ | ✅ | 1200 | ✅ Gescrollt zu Fachstellen |
| Klick `a[href="#netzwerk-karte"]` | `#netzwerk-karte` | ✅ | ✅ | 4203 | ✅ Anchor funktioniert |
| `#netzwerk-karte` (direkt) | `#netzwerk-karte` | ✅ | ✅ | 4203 | ✅ Pass |
| `#netzwerk-fachstellen` (direkt) | `#netzwerk-fachstellen` | ✅ | ✅ | 1200 | ✅ Pass |

### Bewertung

Alle Deep-Links funktionieren korrekt. Die Legacy-Aliases (`#network`, `#network-map`, `#network-directory`) werden zuverlässig aufgelöst. Das Scroll-Verhalten ist korrekt: Fachstellen-Anker scrollt auf ~1200px, Karten-Anker auf ~4203px.

**Der erste Audit-Lauf hatte falsch-negative Ergebnisse produziert**, weil er die alten DOM-IDs (`#network-directory`, `#network-map`) prüfte, die in der aktuellen App nicht mehr existieren. Das QA-Skript wurde entsprechend aktualisiert.

---

## 3. Mobile Network QA

**Skript:** `qa/mobile_network_qa.cjs`  
**Ergebnisdatei:** `qa/mobile-artifacts/mobile-network-qa-result.json`  
**Viewport:** 375×812 (iPhone, deviceScaleFactor 2, isMobile + hasTouch)

### Testergebnisse

| Schritt | Status | Details |
|---|:---:|---|
| layout_initial | ✅ | kein horizontaler Overflow, Hash: `#netzwerk` |
| directory_visible | ✅ | 14 Filterbuttons, 16 Website-Links sichtbar |
| filter_interaction | ✅ | Chip „Krise" → Einträge 16 → 5 (Filterung funktioniert) |
| search_interaction | ✅ | Suche „147" → 1 Treffer, Titel: „147 – Beratung für Kinder und Jugendliche" |
| map_visible | ✅ | 5 Linsen-Buttons: Gesamtbild, Privates Umfeld, Alltagsstützen, Fachstellen, Lücken |
| map_lens_fachstellen | ✅ | Titel: „Von der Sammlung zur Absprache", Werte: [2, 2, 1, 2] |
| map_lens_luecken | ✅ | Titel: „Von der Sammlung zur Absprache", Werte: [2, 2, 1, 2] |
| layout_final | ✅ | kein horizontaler Overflow |

### Filterbuttons (vollständige Liste)

Alle, Krise, 24/7, kostenlos, anonym, Zürich, mehrsprachig, Jugendliche, Erwachsene, Eltern 0–5, Sucht, offizielle Stelle, Selbsthilfe, Entlastung

### Beobachtungen

- **Filterfunktion**: Chip-Klick reduziert Einträge von 16 auf 5 – funktioniert korrekt.
- **Suche + Reset**: Suche nach „147" findet 1 Eintrag, Reset-Button vorhanden und funktional.
- **Kartenlinsen**: Alle 5 Linsen vorhanden. „Fachstellen" und „Lücken" zeigen identische Kartentitel/Werte (`Von der Sammlung zur Absprache`, [2,2,1,2]) – möglicherweise teilen sich diese beiden Linsen denselben Karteninhalt oder der Unterschied liegt im visuellen Highlighting (Karten-Screenshots vorhanden zur manuellen Prüfung).
- Screenshots in `qa/mobile-artifacts/` für manuelle Sichtprüfung verfügbar.

---

## 4. Link-Check

**Datei:** `qa/link-check-results.txt`

Die Sandbox-Umgebung blockiert ausgehende DNS-Auflösung (EAI_AGAIN). Externe URLs konnten daher nicht erneut maschinell geprüft werden.

### Bekannte Ergebnisse (aus früherem Prüflauf)

| URL | Status |
|---|:---:|
| https://www.aerztefon.ch/ | 200 ✅ |
| https://www.147.ch/de/beratung/dein-kontakt-zu-uns/ | 200 ✅ |
| https://www.pukzh.ch/patienten-angehoerige/informationen-fuer-angehoerige/ | 403 ⚠️ |
| https://www.selbsthilfezuerich.ch/shzh/de.html | 200 ✅ |

### Neu identifizierte URLs (Welle-2 Quellcode-Analyse, 24 URLs)

Folgende URLs wurden aus dem aktuellen Quellcode extrahiert und sind noch nicht extern geprüft (`pending`). Sie sollten auf produktiver Infrastruktur (ohne Sandbox-Einschränkung) geprüft werden:

- caritas-regio.ch, mvb.zh.ch, promentesana.ch, pubmed.ncbi.nlm.nih.gov (×2)
- stadt.winterthur.ch, stiftung-windlicht.ch, www.143.ch
- www.elternnotruf.ch, www.feel-ok.ch (×2), www.gesundheitsfoerderung-zh.ch
- www.kinderseele.ch (×3), www.paediatrieschweiz.ch
- www.pukzh.ch (×3 neue Pfade), www.safezone.ch, www.vaskzuerich.ch
- www.zh.ch (×2)

**Handlungsempfehlung:** Link-Check auf Produktiv- oder CI-Infrastruktur automatisieren (z.B. `linkinator`, `broken-link-checker`) und in die Deploy-Pipeline integrieren.

---

## Gesamtbewertung

| Audit | Status | Kritische Befunde |
|---|:---:|---|
| Visual QA (5 Breakpoints) | ✅ Stabil | Header bei 1024px (bekannt, kein Blocker) |
| Deep-Link QA | ✅ Alle Pass | QA-Skript hatte falsche IDs – jetzt korrigiert |
| Mobile Network QA | ✅ Alle 6 Schritte Pass | Linsen „Fachstellen"/„Lücken" gleiche Inhalte – zur manuellen Prüfung |
| Link-Check | ⚠️ Unvollständig | 24 neue URLs pending, pukzh.ch-Basis 403 bekannt |

### Priorisierte Aktionen

1. **Mittel** – Kartenlinsen „Fachstellen" vs. „Lücken" manuell sichten (Screenshots in `qa/mobile-artifacts/`): Sind unterschiedliche Inhalte intendiert oder zeigen beide dieselbe Ansicht?
2. **Mittel** – Link-Check für 24 neue URLs auf produktiver Infrastruktur nachholen.
3. **Niedrig** – Header bei 1024px Breakpoint weiter beobachten (bekannter Befund aus Welle 1).
