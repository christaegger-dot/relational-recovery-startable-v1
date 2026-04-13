# Audit 08 -- Visual-Clutter- und Reduktions-Audit

## Phase 1 -- Inventur

### 1.1 Template-Übersicht: Element-Dichte

| Template | Cards (fest+daten) | Icons | Max Struktur-Ebenen | Max CTA/Sektion | Card-in-Card | Whitespace |
|---|---|---|---|---|---|---|
| **HomeLanding** | 18 | 2 | **5** (alle 3 Sections) | **6** (Orientierung) | Nein | Ausgewogen |
| **Evidence** | **50-80+** | 0 | **5** (alle 5 Zones) | 0 | Nein | Ausgewogen |
| **Toolbox** | **25-40+** | 10 | **5** (7+ Sections) | **12+** (Triage) | Nein | Ausgewogen |
| **Network** | 18+ + N | 6 | **5** (2 Sections) | 2 | **Ja (6-fach!)** | Ausgewogen |
| **Glossar** | N (pro Term) | 0 | **4** (alle Groups) | 0 | Nein | Locker |
| **Grundlagen** | ~5 | 1 (Scale) | **4** (alle Cluster) | 0 | Nein | Locker |
| **Learning** | 8+N | 3 | **4** (2 Sections) | 0 | Nein | Ausgewogen |
| **Vignetten** | 7 | 3 | **4** (2 Sections) | 2 | Nein | Ausgewogen |

### 1.2 Icon-Audit

**Gesamt: 31 Icon-Verwendungen** (inkl. Header, Footer, AppShell)

| Kategorie | Anzahl | Beispiele |
|---|---|---|
| **Semantisch** | 14 | AlertTriangle (Notfall), Check (bestätigt), Scale (Recht), Download, Printer |
| **Navigational** | 12 | ChevronRight/Left, ExternalLink, Menu, X, ArrowUpRight, Search, MapPin |
| **Dekorativ** | 3 | Library (Footer-Badge), ShieldCheck (Footer-Text), Users (Footer-Text) |
| **Redundant** | 2 | ShieldCheck + Users im Footer duplizieren nebenstehenden Text |

**5 Streich-Kandidaten:** Die 3 dekorativen + 2 redundanten Footer-Icons.

### 1.3 Card-in-Card-Befund

**1 kritischer Fund:** NetworkPageTemplate, Netzwerkkarte. Die äussere `SurfaceCard` (Map-Container) enthält **6 innere SurfaceCards**: 1 "Aktive Lesart", 4 Counts, 1 "Nächster Schritt". Das erzeugt visuelles Stacking: Border innerhalb Border, Shadow innerhalb Shadow.

### 1.4 Border/Shadow/Background-Stacking

**~16 CSS-Klassen** mit 3-fachem Stacking (Border + Shadow + Background gleichzeitig):

| Kategorie | Klassen | Empfehlung |
|---|---|---|
| Standard-Cards | `.ui-card`, `.ui-card--outline`, `.ui-section__surface` | Shadow nur bei Hover/Focus |
| Buttons | `.ui-button--primary`, `.ui-button--emergency` | Border redundant (transparent) |
| Header | `.ui-site-header` | Backdrop-filter reicht |
| Footer-Panels | `.footer-panel` (alle) | Shadow auf 1 Variante reduzieren |
| Netzwerk-Karte | `.ui-network-map-center` | Alle 3 nötig (Fokuspunkt) |

**BUG gefunden:** `.ui-hero-shell` (primitives.css Zeile 817) hat `order: 1px solid` statt `border: 1px solid`. Border wird nie gerendert.

### 1.5 Struktur-Ebenen-Redundanz

**Systemischer Befund:** 15+ Sektionen über 4 Templates haben **5 Hierarchie-Ebenen** vor dem eigentlichen Inhalt (Eyebrow + Headline + Accent + Description + Aside). Das ist das dominierende Clutter-Muster im Projekt.

| Template | Sektionen mit 5 Ebenen |
|---|---|
| HomeLanding | 3 von 3 |
| Evidence | 5 von 5 Zones |
| Toolbox | 7+ von 10+ |
| Network | 2 von 3 |

**Sektionen mit 4 Ebenen:** Glossar (alle Groups), Grundlagen (alle Cluster), Learning (2), Vignetten (2).

### 1.6 Akzentfarben-Inventar

**8 benannte Token** + **22 hardcodierte Hex-Werte** in JSX/CSS = Farb-Wildwuchs.

Primäre Palette: Terrakotta-Rot (`#d24136` / `#8d3f32`) + warme Neutrale.
Problem: 22 Hex-Werte in App.jsx und primitives.css sind Zwischentöne, die nicht als Token definiert sind.

`strong`-Card-Tone definiert aber nie via SurfaceCard verwendet. `accent`-Tone nur in HomeLanding/EditorialPage.

### 1.7 Whitespace-Bilanz

| Bereich | Eindruck |
|---|---|
| Sektionsabstände | Locker (4.5rem standard) — bewusst editorial |
| Card-Body | Ausgewogen (clamp 1-1.75rem) |
| **Card-Grids** | **Etwas dicht** (gap 1rem) vs. sonstige Grosszügigkeit |
| Button-Rows | Dicht (0.875rem) aber funktional |
| Header/Footer | Ausgewogen/Locker |

### 1.8 CTA-Dichte

| Stelle | CTAs | Problem |
|---|---|---|
| HomeLanding Hero | 3 | Grenzwertig |
| HomeLanding "Orientierung" | 2 Actions + 4 Cards = **6** | **Entscheidungsarchitektur bricht** |
| Toolbox Triage | 2×4 Ja/Nein + Empfehlungen = **12+** | Funktional nötig (Quiz-Logik) |
| Toolbox Practice | N Filter + N Card-Buttons | Funktional nötig (Filter-UI) |

### 1.9 Verwaiste Container

**Keine kritischen Funde.** Die Audit-06-Streichungen haben keine leeren Container hinterlassen. ScoreBand-Items (6 Wörter) und Metrik-Cards (5 Wörter) sind funktional als Datenpunkte.

### 1.10 Dekorative Elemente

| Element | Typ | Funktion |
|---|---|---|
| `body::before` Dot-Grid | CSS pseudo | **Dekorativ** — Papier-Textur mit mix-blend-mode (Performance-Problem) |
| `.ui-eyebrow::before` Strich | CSS pseudo | Dekorativ-strukturell — visuelle Hierarchie |
| `.ui-toolbox-step__connector::after` Pfeil | CSS pseudo | Orientierend — Schrittfolge |
| Footer: 3 farbige Balken | HTML divs | **Rein dekorativ** |

### 1.11 Animationen

**Keine dekorativen Animationen.** Alle 12 CSS-Transitions dienen Hover/Focus-Feedback (orientierend). `pageEnter` ist orientierend. Kein framer-motion. `prefers-reduced-motion` korrekt implementiert (Audit #20).

### 1.12 Gesamtbild: Top-5 Hot-Spot-Templates

| Rang | Template | Hauptproblem |
|---|---|---|
| 1 | **Toolbox** | 5 Ebenen in 7+ Sektionen, 25-40+ Cards, 12+ CTAs in Triage |
| 2 | **Evidence** | 50-80+ Cards, 5 Ebenen in allen 5 Zones |
| 3 | **HomeLanding** | 5 Ebenen in allen 3 Sections, 6 CTAs in "Orientierung" |
| 4 | **Network** | 6-faches Card-in-Card, 5 Ebenen in 2 Sections |
| 5 | **Glossar/Grundlagen** | 4 Ebenen überall (mildester Hot-Spot) |

### Top-20 Einzelstellen

| # | Stelle | Typ | Template |
|---|---|---|---|
| 1 | Netzwerkkarte: 6 SurfaceCards in SurfaceCard | Card-in-Card | Network |
| 2 | `.ui-hero-shell` border BUG (order statt border) | Bug | Global |
| 3 | HomeLanding "Orientierung": 6 CTAs in einer Sektion | CTA-Überladung | HomeLanding |
| 4 | `body::before` Dot-Grid mit mix-blend-mode | Deko + Performance | Global |
| 5 | Footer: 3 dekorative Farbbalken | Rein dekorativ | Global |
| 6 | Footer: Library, ShieldCheck, Users Icons | Dekorativ/redundant | Global |
| 7-11 | Evidence Zones 1-5: je 5 Hierarchie-Ebenen | Struktur-Redundanz | Evidence |
| 12-14 | HomeLanding Sections 1-3: je 5 Hierarchie-Ebenen | Struktur-Redundanz | HomeLanding |
| 15-16 | Network Directory + Map: je 5 Hierarchie-Ebenen | Struktur-Redundanz | Network |
| 17-20 | Toolbox Assessment/Pathway/Triage/Practice: je 5 Ebenen | Struktur-Redundanz | Toolbox |

---

*Phase 1 abgeschlossen. Warte auf Freigabe für Phase 2 (Diagnose und Reduktions-Strategie).*
