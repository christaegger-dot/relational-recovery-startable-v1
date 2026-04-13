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

## Phase 2 -- Diagnose und Reduktions-Strategie

### Nebenbefund (ausserhalb Massnahmenkatalog)

**CSS-Bug `.ui-hero-shell`** (primitives.css Zeile 817): `order:` statt `border:` — als Bug-Fix separat eingereicht (`fix: ui-hero-shell border property typo`), nicht Teil der Audit-Struktur.

---

### 2.1 Gesamtbild

Das Clutter-Problem ist **konzentriert**, nicht systemisch. Die dominierende Einzelursache ist ein **Komponenten-API-Problem**: `SectionHeader` erlaubt alle fünf optionalen Felder gleichzeitig aktiv, und die Template-Daten nutzen sie durchgehend alle. Die anderen Befunde sind Einzelfälle (Card-in-Card, CTA-Überladung) oder Wartbarkeits-Themen (Hex-Werte, Dot-Grid).

Präzisierung zur Ebenen-Zählung: "Headline mit Accent" ist **eine** Ebene (visuell ein h2-Element mit Accent-Span). Die tatsächlichen Ebenen sind also **4**: Eyebrow + Headline + Description/Paragraphs + Aside. Das ändert die Diagnose nicht — auch 4 Ebenen sind zu viel, wenn der Aside inhaltlich leer oder redundant ist.

---

### 2.2 Kategorie A: SectionHeader-Komponenten-Überarbeitung

#### Schritt 1: Komponente überarbeiten

**Option A: Technische Validierung über Props**

Die SectionHeader-Komponente prüft zur Laufzeit (oder via TypeScript/PropTypes), ob mehr als drei Ebenen gleichzeitig aktiv sind. Bei Verstoss: Warning in der Konsole oder Typ-Fehler im Build.

| Pro | Contra |
|---|---|
| Erzwingt die Regel | Erzeugt nur Warnings, keine echte Prävention |
| Gut für TypeScript-Projekte | Projekt nutzt kein TypeScript — PropTypes sind Runtime-only |
| Wartungsfreundlich | Jede zukünftige Änderung muss die Validierung mitführen |

**Option B: Stilistische Konvention + Dokumentation**

Die SectionHeader-Komponente bleibt wie sie ist, aber die Nutzung wird pro Template einheitlich festgelegt. Dokumentation in der Komponente oder in `CLAUDE.md`.

| Pro | Contra |
|---|---|
| Keine Runtime-Kosten | Regel kann ignoriert werden |
| Flexibel für Ausnahmen | Braucht Disziplin bei neuen Sektionen |
| Einfach umsetzbar | |

**Empfehlung Claude Code: Option B + ein zusätzlicher Vorschlag.**

Statt eine Validierung zu erzwingen, wird die Komponente so überarbeitet, dass die "inflationäre" Standardvariante unattraktiver wird: Der `aside` erhält einen klaren Visual-Indikator (z.B. eine Trennlinie oder Label "Weiterführend"), damit klar ist, wann er gerechtfertigt ist. Ausserdem: Ein Kommentar-Block in `SectionHeader.jsx` dokumentiert die Regel "maximal 3 Ebenen pro Sektion, aside nur bei echtem Zusatzinhalt".

Das lässt die API offen für Sonderfälle (Toolbox-Triage braucht vielleicht alle Ebenen), erhöht aber die Hürde für Default-Verwendung aller Felder.

#### Schritt 2: Aufräumen pro Template

**Regel: Maximal 3 Ebenen pro Sektion, priorisiert nach informativem Gehalt.**

| Template | Empfehlung welche 3 Ebenen bleiben | Begründung |
|---|---|---|
| **HomeLanding** | Eyebrow + Headline + Description | Aside wegfallen — die Section-Cards selbst tragen den Zusatzinhalt. Aside ist redundant mit den Cards. |
| **Evidence** (Zones 1-5) | Eyebrow + Headline + Paragraphs | Aside wegfallen — Zonen haben schon Zusatz-Panels (highlightList, metrics, cards). Aside duplicates das. |
| **Evidence** (ChapterOverview) | Eyebrow + Headline + Aside (mit Badges) | Description wegfallen — die Items-Liste (5 Anchor-Links) ersetzt sie. |
| **Toolbox** (Assessment) | Eyebrow + Headline + Aside (scoreAside funktional) | Description wegfallen — scoreAside trägt die Schlüssel-Info. |
| **Toolbox** (Pathway, Triage, Practice) | Eyebrow + Headline + Description | Aside wegfallen — Steps/Prompts/Filter tragen die Struktur. |
| **Toolbox** (Cluster) | Eyebrow + Headline + Description | Aside wegfallen, ausser bei Cluster mit legalDisclaimer — dort bleibt der Disclaimer prominent. |
| **Network** (Directory, Map) | Eyebrow + Headline + Paragraphs | Aside wegfallen — Filter/Karten tragen die Orientierung. |
| **Glossar** (Groups) | Eyebrow + Headline + Description | Aside wegfallen — die Glossar-Terme selbst sind der Inhalt. |
| **Grundlagen** (Cluster) | Eyebrow + Headline + Description | Aside wegfallen — FAQ-Akkordeons sind der Inhalt. |
| **Learning** (Flow, Modules) | Eyebrow + Headline + Description | Aside wegfallen — Steps/Module sind der Inhalt. |
| **Vignetten** (Case, Decision) | Eyebrow + Headline + Description | Aside wegfallen — die Case-Card / Decision-Options sind der Inhalt. |

**Muster:** In 9 von 11 Fällen ist die Empfehlung, den Aside wegfallen zu lassen. Der Aside ist das am häufigsten redundante Element.

**Umsetzung:** Pro Template ein einziger Commit. Die Empfehlung wird durch Entfernen des `aside`-Felds in den jeweiligen Section-Daten umgesetzt. Die SectionHeader-Komponente selbst bleibt unverändert — sie rendert `aside` nur wenn vorhanden.

---

### 2.3 Kategorie B: Einzelfälle

#### Card-in-Card in der Netzwerkkarte

**Kategorie C (Zusammenfassen).** Die äussere SurfaceCard wird zum Container-Div ohne eigenes Card-Styling (Border/Shadow entfernt). Die inneren SurfaceCards behalten ihr Styling. So entsteht eine logische Gruppierung ohne doppelte visuelle Rahmen.

**Alternative:** Die inneren SurfaceCards werden zu `<div>`-Elementen mit nur Padding, kein Border/Shadow. Die äussere Card bleibt der einzige visuelle Container.

**Empfehlung:** Alternative — weil die äussere Card semantisch die "Netzwerkkarte" ist und als Fokuspunkt erkennbar bleiben soll.

#### 6 CTAs in HomeLanding "Orientierung"

Die Sektion hat: 2 Section-Actions ("Zum Evidenzteil", "Zur Toolbox") + 4 Card-Actions (je ein Link pro Karte).

**Kategorie C (Zusammenfassen).** Die 2 Section-Actions entfernen — die Card-Actions reichen, weil jede Karte bereits direkt auf die Zielseite verlinkt. Die Section-Actions sind Duplikate der Card-Actions.

**Vorher/Nachher:**
- Vorher: "Ein ruhiger, fachlich klarer Weg" + Description + [Zum Evidenzteil] [Zur Toolbox] + 4 Karten
- Nachher: "Ein ruhiger, fachlich klarer Weg" + Description + 4 Karten (jede mit eigener Action)

**Hero (3 CTAs):** Bleibt. "Falllogik trainieren" (primary) + "Prioritäten klären" (secondary) + "Offizielle PUK-Seite" (subtle/external) ist eine klare Hierarchie.

---

### 2.4 Dot-Grid-Entscheidung

**Option Dot-1: Vollständig entfernen**

| Dimension | Wert |
|---|---|
| Aufwand | S (10 Zeilen CSS entfernen) |
| Performance-Gewinn | Spürbar (kein mix-blend-mode, kein Vollbild-Pseudo-Element) |
| Visuelle Auswirkung | Ruhigerer Hintergrund, aber Identitäts-Abschwächung — die Papier-Textur verschwindet komplett |
| Risiko | Wenn die Textur ein Marken-Element ist: Identitätsverlust |

**Option Dot-2: Deutlich abschwächen**

| Dimension | Wert |
|---|---|
| Aufwand | S (3-4 Zeilen CSS anpassen) |
| Performance-Gewinn | Mittel (kein mix-blend-mode, weniger häufige Repaints) |
| Visuelle Auswirkung | Charakter bleibt, wirkt ruhiger |
| Konkret | `opacity` von 0.45 auf 0.18, `mix-blend-mode: multiply` entfernen, `background-size` von 18px auf 24px vergrössern |
| Risiko | Gering — die Textur bleibt erkennbar |

**Keine Empfehlung — ästhetische Entscheidung.**

---

### 2.5 Vorgezogene Wartbarkeits-Nachholung aus Audit 09: Hex-Werte zu Tokens

**Hintergrund:** Die 22 hardcodierten Hex-Werte gehören thematisch in Audit 09 (Frontend-Richtlinien-Compliance). Da Audit 08 sie aufgedeckt hat, können sie in einem gebündelten Commit bereinigt werden, bevor Audit 09 läuft.

**Vorgehen:** Pro Hex-Wert prüfen, ob er zu einem der 8 bestehenden Token passt.

| Hex-Wert (in JSX) | Matching Token | Aktion |
|---|---|---|
| `#f6efe7` | `--background` / `--surface-page` | → CSS-Variable |
| `#ead8c3` | `--surface-panel` | → CSS-Variable |
| `#5f3c2d` | `--text-primary` (Variante) | → CSS-Variable |
| `#4b392f`, `#3f322b`, `#2d241f` | Footer dunkel — passt zu `#3d3128`/`#262019` | → neuer Token `--surface-dark` nötig (Audit 09) |
| `#eadfce`, `#f0c786` | Gold-Töne ohne Token | → neuer Token `--accent-gold` nötig (Audit 09) |
| `#e4cbbb`, `#fff6ee`, `#f4e4d6` | Warm-Banner | → neuer Token `--surface-warm` nötig (Audit 09) |
| `#6d342c`, `#9a4b3c` | Zwischen `--accent-primary` und `--accent-primary-strong` | → neuer Token oder `color-mix()` |
| `#8d3f32` | **Exakt `--accent-primary-strong`** | → CSS-Variable |
| `#fff0e6` | Hover-Variante | → `color-mix()` |
| `#dec2b2` | `--border-default` (Variante) | → CSS-Variable |

**Bilanz:** 
- **Direkt ersetzbar** (Token existiert): ~5 Stellen
- **Neuer Token nötig** (Audit 09): ~15 Stellen  
- **color-mix() möglich**: ~2 Stellen

**Umsetzung in Phase 3:** Nur die 5 direkt ersetzbaren Stellen werden zu Tokens migriert. Die anderen 17 bleiben unverändert mit einer Notiz im Bericht für Audit 09. Das hält den Audit-08-Scope sauber.

---

### 2.6 Footer-Dekoration: 3 farbige Balken + 3 dekorative Icons

**Kategorie A (Weglassen).**

- 3 farbige Balken (`footer-bottom__bar--primary/secondary/tertiary`): Rein dekorativ, keine semantische Funktion. Entfernen.
- 3 dekorative/redundante Icons (`Library`, `ShieldCheck`, `Users` im Footer): Duplizieren Text. Entfernen.

---

### 2.7 Reduktions-Prinzipien

1. Eine Abgrenzung pro Element reicht (Border oder Shadow, nicht beides)
2. Maximal 2 Akzentfarben pro Template (ist schon erfüllt)
3. Maximal 3 Struktur-Ebenen pro Sektion
4. Aside nur bei echtem Zusatzinhalt (nicht als Dekor)
5. Eine primäre CTA pro Sektion
6. Dekorative Icons sind erste Streich-Kandidaten

### 2.8 Was Phase 3 nicht darf

- Keine Text-Änderungen (Inhalt ist heilig)
- Keine A11y-Verschlechterung (Focus-Indikatoren, Kontraste bleiben)
- Keine Reduktion der Audit-07-Verlinkungsmarker
- Keine Reduktion des Rechts-Disclaimers
- Keine Entfernung des `strong` SurfaceCard-Tones (wird im CSS noch referenziert)
- Keine Layout-Reduktionen, die Responsive-Verhalten brechen

### 2.9 Reihenfolge für Phase 3

| # | Block | Risiko | Sichtkontrolle nötig? |
|---|---|---|---|
| 1 | SectionHeader-Komponente überarbeiten (Kommentar-Block + dezenter Aside-Indikator) | Niedrig | Nein |
| 2 | Pro Template: `aside` in den Section-Daten entfernen (9 Templates × 1 Commit = 9 Commits) | Mittel | **Ja** (jedes Template kurz sichten) |
| 3 | Card-in-Card Netzwerkkarte auflösen | Mittel | **Ja** (Netzwerkseite visuell prüfen) |
| 4 | HomeLanding "Orientierung": 2 Section-Actions entfernen | Niedrig | Nein |
| 5 | Dot-Grid-Entscheidung umsetzen (Dot-1 oder Dot-2) | Niedrig | **Ja** (Gesamteindruck) |
| 6 | Footer: 3 Balken + 3 Icons entfernen | Niedrig | **Ja** (Footer-Ansicht) |
| 7 | 5 direkt ersetzbare Hex-Werte zu Tokens (Audit-09-Vorgriff) | Niedrig | Nein |

### 2.10 Risikoeinschätzung

**Vor Release zwingend:**
Keine. Alle Reduktionen sind verbesserungen, kein Release-Blocker. Audit 08 ist ein Qualitäts-Audit, kein Bug-Audit.

**Heikel:**
- Schritt 2 (Aside entfernen pro Template) — 9 Commits, jeder mit eigener Sichtkontrolle. Wenn eine Sektion ohne Aside zu leer wirkt, zurücknehmen.
- Schritt 3 (Card-in-Card) — erfordert visuelle Prüfung, ob die Gruppierung noch erkennbar ist.

**Safe:**
- Schritt 1, 4, 6, 7 — geringes Regressionsrisiko.

### 2.11 Entscheidungen, die bei dir liegen

1. **SectionHeader-Überarbeitung:** Option A (Validierung) oder Option B (Konvention + Aside-Indikator)?
2. **Dot-Grid:** Dot-1 (entfernen) oder Dot-2 (abschwächen)?

---

*Phase 2 abgeschlossen. Warte auf Freigabe und die beiden Entscheidungen.*
