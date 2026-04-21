# Audit 24 — Design-System + Visuelle Qualitaet

**Datum:** 2026-04-21
**Branch:** `claude/audit-24-design-system`
**Scope:** Pre-Release-Absicherung der visuellen Qualitaet. Vier Dimensionen: (a) Design-Token-System (Farben, Spacing, Typografie, Radii, Shadows), (b) Typografie-Skala + Hierarchie, (c) Farbsystem + Kontraste, (d) Spacing-Rhythmus. Methode: Code-Review + echte Screenshots aller 8 Tabs in Desktop (1440×900) und Mobile (390×844) via Playwright.

## Warum pre-release-relevant

Die vorherigen Audits (20–23) haben technische, inhaltliche und SEO-Verlaesslichkeit abgesichert. Visuelle Wirkung ist die erste Ebene, die eine Fachperson wahrnimmt — und sie entscheidet implizit mit ueber die Glaubwuerdigkeit des Angebots. Ein konsistentes, ruhiges Bild traegt den redaktionellen Anspruch (Fachlichkeit, Zurueckhaltung, keine Marketing-Lautheit); visuelle Brueche zwischen Tabs oder inkonsistente Hierarchien wuerden die Substanz verdecken.

## Methode

- **Inventur**: Lesen von `src/styles/tokens.css` (169 LOC), Teil-Review `primitives.css` (4161 LOC), `app-global.css` (614 LOC). Struktur-Check `PageHero.jsx`, `Section.jsx` (reveal-on-scroll-Mechanik).
- **Visuelle Erhebung**: Playwright (`playwright-core` aus `node_modules`) gegen `npm run preview`. Fuer jeden der 8 Tabs: Desktop-ATF, Desktop-Mid-Page, Mobile-ATF, Mobile-Mid-Page, Full-Page mit force-revealed Sections. Gesamt 40+ Screenshots in `/tmp/audit-24-screenshots/`.
- **Kontext-Fallen vermieden**: Zwei Screenshot-Artefakte identifiziert und von realer Design-Qualitaet entkoppelt (siehe 1.3).

## Inventur (Phase 1)

### 1.1 Token-System

`tokens.css` liefert ein **ausgereiftes, thematisches Design-System**:

| Kategorie | Stand |
| --- | --- |
| **Surfaces** | 11 benannte Oberflaechen mit dokumentierter Nutzungshinweis-Kommentierung (`--surface-page`, `--surface-app`, `--surface-subtle`, `--surface-muted`, `--surface-accent-soft`, `--surface-info-soft`, `--surface-danger-soft`, `--surface-elevated`, `--surface-error-soft`, `--surface-warning-strong-soft`, `--surface-danger-strong-soft`). |
| **Inverse Surfaces** | Eigenes Sub-System fuer dunkle Streifen (Emergency-Banner, Footer) mit Gradient-Paar + Border. |
| **Text-Farben** | Fuenf-stufige Hierarchie (`--text-primary/secondary/muted/inverse/link`) + Danger-Varianten + spezielle Inverse-Varianten. |
| **Borders** | Vier Stufen (subtle, default, strong, danger) + Warm-Soft, Inverse, Error-Soft. |
| **Accents** | 8 Brand/Interaction-Tokens mit dokumentiertem Usage-Scope. |
| **Focus** | 4 Tokens (ring, ring-contrast, width 3px, offset 4px, radius 0.875rem). |
| **Typografie** | Font-Familien deklariert (Manrope body, Source Serif 4 heading; mit System-Fallbacks Georgia/ui-sans-serif), 10-stufige Size-Skala, 4 Line-Heights, 3 Letter-Spacings. |
| **Spacing** | 8-stufige Skala + eigene Section-Spacing (`--section-tight/standard/wide`, responsive ueber `@media (max-width: 48rem)`). |
| **Radii** | 6 Stufen (sm/md/lg/xl/2xl/pill). |
| **Shadows** | 4 benannte Schatten (soft/card/elevated/focus). |
| **Motion** | 3 Dauer-Tokens + 1 Curve-Token. |

Token-Kommentare enthalten Kontrast-Hinweise („AA+ on --surface-page" etc.) und Trade-off-Dokumentation. Das ist mehr als ein Tailwind-Default — es ist ein **kuratiertes, redaktionell begruendetes System**.

### 1.2 Typografie

- Headline-Serif: „Source Serif 4" deklariert, faellt auf **Georgia** zurueck (kein `@font-face` im Build — dokumentierter Audit-16-Trade-off). Georgia rendert elegant auf allen Mainstream-OS.
- Body-Sans: „Manrope" deklariert, faellt auf **ui-sans-serif / system-ui** zurueck. Mainstream-OS liefern San Francisco (macOS/iOS), Segoe UI (Windows), Roboto (Android). Konsistent lesbar.
- Display-Skala: `clamp(2.25rem, 5vw, 4.75rem)` fuer `.ui-hero__title` — responsive ohne Breakpoint-Sprung, Letter-Spacing `-0.03em` verdichtet display-like.
- **Signature-Move**: In jedem Page-Hero besteht der Title aus dunkelbraunem Roman (`--text-primary #2f2f28`) + rotem Italic-Accent (`.ui-hero__accent` → `--accent-primary #d24136`, `font-style: italic`). Screenshot-belegte Beispiele: „Fachportal fuer *Orientierung, Triage und Weitervermittlung*.", „Toolbox: Orientierung, Schutz und naechste Schritte *in belasteten Familiensituationen*.", „Warum das Thema *frueh in die Behandlung gehoert*". Das Pattern traegt das editoriale Gesicht der Seite.

### 1.3 Screenshot-Artefakte (wichtig, um Fehl-Befunde zu vermeiden)

Zwei Effekte, die in den ersten Screenshots als Design-Probleme erscheinen, sich aber bei Untersuchung als **korrekte Laufzeit-Features** entpuppen:

**A) „Leere" Sektionen zwischen Hero und Footer.**
Anfangs-Screenshots zeigten auf Start- und Lernmodule-Tab 700–1000px Leerraum zwischen sichtbarem Content und Footer. `document.querySelector('main > div.ui-stack').children` bestaetigt: dort steht eine `SECTION.reveal-on-scroll` (722px Hoehe). In `app-global.css:78-89` hat die Klasse initial `opacity: 0; transform: translateY(6px);`, wird per IntersectionObserver zu `.is-revealed` und animiert mit `--motion-fast (0.18s)` ein. Playwrights statischer Screenshot-Modus triggert den Observer **nicht zuverlaessig**. Mit `reducedMotion: 'reduce'` im Browser-Context (CSS-Fallback setzt `.reveal-on-scroll` auf `opacity: 1`) zeigen die Screenshots vollstaendigen Content. **Real-User-Verhalten**: beim Scrollen faden Sektionen sanft ein — das ist die beabsichtigte Mikro-Polish-Animation.

**B) „Dunkelroter Rahmen" um Page-Heroes.**
Anfangs-Screenshots zeigten einen 3px-dunkelroten Rahmen um die `<h1>` auf allen Tabs ausser Start. `getComputedStyle(h1).borderWidth === '0px'` auf allen 8 Elementen der Hero-Chain. Der „Rahmen" ist der **`:focus-visible`-Ring** (`tokens.css: --focus-ring #8d3f32, --focus-ring-width 3px, --focus-outline-radius 0.875rem`). Der H1 hat `tabIndex={-1}` (PageHero.jsx:48) — beim Tab-Wechsel fokussiert die App den H1 programmatisch (A11y-Feature fuer Keyboard + Screen-Reader-User: „Ich bin auf einer neuen Seite"). Playwrights Navigation triggert `:focus-visible`-Heuristik in Chromium. **Real-Mouse-User-Verhalten**: der Ring erscheint nur bei Keyboard-Navigation; Maus-Click zeigt ihn **nicht**.

Beide Effekte sind beabsichtigt und korrekt implementiert. Sie hier zu dokumentieren verhindert, dass spaetere Audits sie als „Bugs" behandeln.

### 1.4 Visuelle Wahrnehmung (aus den Screenshots mit `.is-revealed` forciert)

**Desktop-Start:**

- Dunkler Emergency-Banner oben (warmes Braun statt Alarm-Rot) → funktional, ohne visuelle Hektik.
- App-Header mit Wordmark links, „Notfall" + „Menu" rechts → klare Trias.
- Hero: grosse Serif-Display-Headline, rotes Italic-Accent, ruhiger Lead-Paragraph, zwei CTA-Pills, „Offizielle PUK-Seite oeffnen"-Ghost-Button, Audience-Note „Sie sind Patient:in oder Angehoerige? → Zum Material-Bereich" als Text-Link.
- Rechte Aside-Spalte: Custom-Illustration (stilisierte Figuren-Gruppe, warme Erdtoene) ueber „WICHTIGER HINWEIS ZUR EINORDNUNG"-Card. Bewusster semantischer Kontrapunkt zum Hero.
- Darunter: Stats-Grid („MODULE 3", „NETZWERKSTELLEN 19") — grosse Serif-Zahlen, editorial-monochrom.
- „Ein ruhiger, klarer Weg durch die Inhalte"-Section mit 4 Kategorie-Karten (Fundierte Orientierung / Reflektierte Vertiefung / Psychoedukation / Offene Fachfelder).
- ClosingSection mit Tab-Nav + Identitaets-Block.

Zusammengenommen: **editoriales Fachportal**, nicht SaaS-Tech. Warm, ruhig, lesbar. Kein visuelles Schreien.

**Desktop-Toolbox / Material / Evidenz / Netzwerk / Lernmodule / Glossar:**

- Konsistente Hero-Struktur mit PageHero-Komponente: eyebrow + title + accent (Italic, rot) + lead + stats/actions + aside-Card.
- Section-Rhythmus: `--section-standard 5.5rem` (Desktop) / `4.5rem` (Mobile) — kein gedraengtes Gefuehl.
- Card-Varianten durchgaengig konsistent (Border, Radius, Soft-Shadow, warme Hintergruende).
- Evidenz: 5-Kapitel-Navigation mit gleichhohen Karten, Inline-Kapitel mit eigenen H2 + Italic-Accent — starke hierarchische Lesbarkeit.
- Material: Cluster + Audience-Badges (angehoerige / eltern) — gute Adressaten-Trennung, visuell per Badge + H2-Block-Header markiert.

**Mobile (390px):**

- Emergency-Banner + Acute-Krise-Card im ersten Viewport → bewusst Emergency-First (Audit 22).
- Hero-Headline skaliert ueber `clamp(2.25rem, 5vw, 4.75rem)` auf ~36px Mobile → gut lesbar, kein Overflow.
- Stats, CTAs, Cards stacken vertikal sauber. Keine horizontalen Scroll-Artefakte.
- Serif-Italic-Accent bleibt auch auf 390px wirkungsvoll.

### 1.5 Farbsystem + Kontrast (Sichtpruefung, nicht instrumentiert)

- Primaer-Palette: `#f9f4ee` Creme-Weiss + `#2f2f28` Dunkel-Anthrazit + `#d24136` Ziegelrot als Accent.
- Inverse Surfaces: `#3f322b → #2d241f` Gradient (Emergency-Banner, Footer-Panel).
- Inhaltskarten: `--surface-app #fffaf6` (faelschlich oft mit reinem Weiss verwechselt — ist leicht warm gefaerbt). Border `--border-subtle #e6dacb` hebt Karten ohne harte Kante ab.
- Fokus-Ring-Kontrast: `#8d3f32` auf hellen Surfaces, `#fff8f2` auf dunklen Surfaces → gut sichtbar.
- Kontrast-Kommentare in tokens.css referenzieren AA-Level.

Keine optisch auffaelligen Kontrast-Schwaechen. Instrumentelle Messung waere ein separater A11y-Audit (Scope-crack fuer diesen Design-Audit).

### 1.6 Spacing-Rhythmus

Hierarchie durch drei Ebenen:

- **Section-Spacing** (`5.5rem` Standard) zwischen logischen Bloecken → Luft, nicht Gedraenge.
- **Stack-Gap** (`24px` auf `.ui-stack`-Grids) zwischen verwandten Kacheln.
- **Inline-Spacing** (Token-Skala `space-1…space-8`) innerhalb von Komponenten.

Alle drei Ebenen sichtbar unterschieden — das ist der Hauptgrund, warum die Seite nicht „flach" wirkt.

## Triage (Phase 2)

| # | Befund | Kategorie | Aktion |
| --- | --- | --- | --- |
| 1.1 | Token-System ausgereift, dokumentiert, kuratiert | Staerke | Kein Handlungsbedarf |
| 1.2 | Typografie-Hierarchie konsistent, Signature-Accent (Serif + rotes Italic) klar | Staerke | Kein Handlungsbedarf |
| 1.3-A | Reveal-on-scroll-Sektionen wirken in Screenshots leer | Artefakt, nicht real | Dokumentiert, damit Folge-Audits nicht stolpern |
| 1.3-B | Page-Hero zeigt Focus-Ring in Screenshots | Artefakt, nicht real | Dokumentiert; A11y-Feature, korrekt |
| 1.4 | Hero-Pattern konsistent ueber 8 Tabs, Custom-Illustration auf Start | Staerke | Kein Handlungsbedarf |
| 1.5 | Farbsystem warm, hoher Kontrast, AA-Kommentare in Tokens | Staerke | Kein Handlungsbedarf |
| 1.6 | Dreistufiger Spacing-Rhythmus | Staerke | Kein Handlungsbedarf |

**Keine P1/P2/P3-Findings.** Das Design-System ist vor diesem Audit bereits das Ergebnis mehrerer redaktioneller Durchgaenge (sichtbar an den dokumentierten Trade-offs in `tokens.css` und den Nutzungshinweisen je Token).

## Umsetzung (Phase 3)

**Keine Code-Aenderungen.** Ein Audit, dessen ehrliches Ergebnis ein Clean Bill ist, sollte nicht kuenstlich einen Fix produzieren, um „Ertrag" auszuweisen — das waere Scope-Creep und wuerde ein ausgereiftes System destabilisieren. Dieser Audit produziert Dokumentation.

## Verifikation (Phase 4)

- `npm run lint` → keine Aenderungen, nicht notwendig.
- `npm run format:check` → keine Aenderungen, nicht notwendig.
- `npm run build` vor Audit: gruen (Audit-20-Asset-Guard passiert). Build nach Audit: identisch, keine Aenderungen.
- Screenshot-Inventur (40+ Bilder in `/tmp/audit-24-screenshots/`) als Referenz fuer kuenftige Audits archivierbar, wird aber **nicht** im Repo committet — das waeren mehrere MB Binaer-Dateien ohne langfristigen Code-Nutzen.

## Ergebnis

**Clean Bill ohne Fix.** Die Website wirkt modern und ansprechend im editorialen Sinn: warmes Creme-Anthrazit-Ziegelrot-Dreiklang, grosse Serif-Display-Typografie mit rotem Italic-Accent als Signature, grosszuegiger Spacing-Rhythmus, durchgaengige Card-Struktur, Custom-Hero-Illustration statt Stock, sauberes Mobile-Layout. Sie versucht bewusst nicht, wie ein Tech-SaaS-Produkt zu wirken — und trifft fuer die Zielgruppe (Fachpersonen in Beratungskontext) damit genau den richtigen Ton.

Die zwei Beobachtungen, die in Screenshots zunaechst als Design-Probleme erscheinen (leere Sektionen, dunkelroter Rahmen um H1), sind **Screenshot-Artefakte** (reveal-on-scroll Race, `:focus-visible`-Ring bei programmatischem H1-Focus nach Tab-Wechsel) und in echter User-Wahrnehmung korrekt implementiert.

## Follow-ups

Keine releasekritischen. Optionale redaktionelle Entscheidungen fuer separate, klar priorisierte PRs (nicht Teil dieses Audits):

- **Webfont-Self-Hosting** (Manrope / Source Serif 4): Audit-16-Trade-off. Auf schnelleren Verbindungen und unterstuetzenden Gerade-Systemen rendert Georgia/System-Sans bereits elegant. Ein Self-Hosted-Font-Pipeline (woff2 + `font-display: swap`) waere ein redaktioneller Qualitaets-Entscheid mit Performance-Kosten — kein Design-Defekt.
- **OG-Image-Re-Export 1200×630** (Audit 23 Follow-up): Asset-Pflege, nicht Design-System.
- **Logo-Verfeinerung** (aktuell „EB"-Monogramm in Header): Falls Markenbildung zum Thema wird — nicht Pre-Release-Blocker.

Die genannten Punkte sind **nicht** Pre-Release-Blocker.
