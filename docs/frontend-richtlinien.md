Diese Richtlinien sind aus der Arbeit an einer Psychoedukations-Website für Menschen in Belastungssituationen entstanden. Sie sind so formuliert, dass sie auf jedes Projekt übertragbar sind, das Substanz über Show stellt – besonders auf Projekte, bei denen Nutzer*innen mit Aufmerksamkeit, Zeit oder emotionaler Kapazität sparsam umgehen müssen.

Sie sind bewusst eher wenig als viel. Das Ziel ist ein Dokument, das man an einem Vormittag durchliest und danach versteht, warum die eigenen Entscheidungen konsistent bleiben.

---

## Die drei Leitprinzipien

Vor jeder gestalterischen Entscheidung:

**1. Ruhe vor Wirkung.** Jedes Element, das Aufmerksamkeit verlangt, muss diese Aufmerksamkeit verdienen. Im Zweifel: weglassen. Nutzer*innen haben begrenzte kognitive Kapazität, und du weißt nicht, in welchem Zustand sie gerade auf deine Seite kommen.

**2. Menschlichkeit vor Neutralität.** Klinische Kühle erzeugt Distanz. Palette, Typografie und Tonalität dürfen spürbar sein – sie müssen es sogar, wenn das Produkt etwas mit Menschen zu tun hat. Bei Care-Kontexten heißt das: Wärme. Bei anderen Kontexten: Charakter, Haltung, Handschrift. In jedem Fall: kein generisches SaaS-Grau.

**3. Verlässlichkeit vor Überraschung.** Vorhersehbare Strukturen entlasten kognitiv. Konsistenz ist kein Mangel an Kreativität – sie ist Fürsorge. Ein Pattern, das auf der Startseite funktioniert, sollte auf jeder Unterseite identisch funktionieren.

**Kritischer Test für jede Entscheidung:** *Hilft diese Änderung jemandem, der in drei Sekunden finden muss, was er braucht, und sich dabei nicht überfordert fühlen soll?* Wenn die Antwort nicht klar ja ist, braucht die Änderung eine andere Begründung als „sieht besser aus".

---

## Farbsystem

Farben werden strikt über CSS Custom Properties (Tokens) gesteuert. Nie direkt als Hex-Wert in Komponenten.

**Regeln:**

- Neue Farben zuerst als Token definieren, dann referenzieren
- Farb-Abstufungen (Transparenz, Helligkeit, Sättigung) werden bevorzugt aus Tokens abgeleitet, nicht als neue Hex-Werte definiert. Zwei erlaubte Muster:
  1. **Token-Familie mit Abstufungen** (z. B. `--accent-faint`, `--accent-subtle`, `--accent-muted`, `--accent`, `--accent-strong`)
  2. **`color-mix()` mit Token als Basis**: `color-mix(in srgb, var(--accent-primary) 30%, white 70%)` ist zulässig, wenn die Basis ein Token ist. Nicht zulässig: `color-mix(in srgb, #d97706 …)` mit Hex-Basis. Für wiederholte Berechnungen (≥3 Vorkommen) lohnt sich ein vorberechnetes Token.
- Jede Text-/Hintergrund-Kombination erfüllt mindestens WCAG AA (4.5:1 für normalen Text, 3:1 für großen Text)
- Kontrastverhältnisse als Kommentar am Token dokumentieren. Verbindliches Format: `/* <Ratio>:1 auf <Referenz-Surface>, WCAG <AA|AAA> */`, z. B. `/* 10.8:1 auf --surface-page, WCAG AAA */`. Pflicht für alle Text- und Accent-Tokens, die auf Hintergründen erscheinen. Optional für reine Surface-/Border-Tokens ohne Text-Bezug.
- Signal-Farben (Warnung, Gefahr, Erfolg) sind reserviert für tatsächliche Signalisierung – nie als Dekoration. In der Praxis heißt das: `--accent-danger`, `--accent-warning`, ggf. `--accent-secondary` im Erfolgsfall; dekorative Nutzung in Card-Shadows, Hero-Hintergründen oder Divider-Elementen ist verboten.

**Token-Semantik**: Tokens sollten nach *Funktion* benannt sein, nicht nach *Erscheinung*. `--text-primary` statt `--grey-900`, `--surface-elevated` statt `--white`. Das ermöglicht später Theme-Wechsel ohne Umbenennungen und macht den Intent im Code lesbar.

**Vorsicht bei semi-transparenten Text-Farben auf farbigen Hintergründen.** Eine Farbe wie `rgba(255,255,255,0.70)` kann auf dunklen Hintergründen wunderbar funktionieren und auf mittelhellen farbigen Hintergründen komplett unter WCAG AA fallen. Solche Tokens brauchen im Kommentar eine klare Einsatzgrenze: *„nur auf Hintergründen mit Luminanz < X."*

---

## Typografie

- Eine Paarung Body-Font + Heading-Font ist der Regelfall. Ein dritter Brand-/Display-Font ist zulässig, wenn (1) er an genau einer Stelle eingesetzt wird (z. B. Brand-Title im Footer oder Hero), (2) er als eigener Token deklariert ist (`--font-display`), (3) die Begründung im Token-Kommentar festgehalten ist. Ein vierter Font ist nicht zulässig.
- Schriftgrößen ausschließlich über Tokens, nie direkt als rem/px. Das erlaubt späteres Re-Scaling ohne Suche-und-Ersetze.
- Zeilenhöhe für Fließtext großzügig (1.6–1.8). Lesbarkeit bei langen Texten ist wichtiger als Platzeffizienz.
- Headings kontrollieren die Dokument-Outline – nicht nur die Optik. Heading-Levels (`h1`–`h6`) folgen der semantischen Hierarchie, nicht der visuellen Gewichtung. Für rein optische Anpassungen gibt es Klassen. In der Praxis: `h1` genau einmal pro Seite (Page-Title), `h2` für Sections, `h3` für Sub-Sections/Cards; keine `h4` ohne echten Inhalts-Grund. Visuelle Anpassung ausschließlich über Klassen (`.ui-hero-title`, `.ui-section-title`), nie durch Heading-Level-Missbrauch.
- Hierarchie-Sprünge sollten deutlich sein. Wenn Badge, Heading und Untertitel auf Mobile alle gleich viel Raum bekommen, verschwimmt die Hierarchie. Differenzierte Abstände (z. B. Badge eng an Heading, deutlicher Bruch zum Untertitel) sind oft wichtiger als differenzierte Schriftgrößen.

---

## Spacing und Layout

Eine feste Spacing-Skala, typischerweise in geometrischer Progression (z. B. 4–8–12–16–24–32–48 px) als Token definiert.

**Regeln:**

- Hardcodierte Pixel- oder Rem-Werte für Layout-, Sektion- und Komponenten-Hauptabstände sind technische Schuld. Ersetze sie durch Token-Referenzen aus der Spacing-Skala.
- **Ausnahmen, die als Literal zulässig sind:** typografisch motivierte Werte, die an eine Schriftgröße gekoppelt sind (z. B. `padding-block: 0.875rem;` passt zu `--font-size-sm`); optische Feinjustierungen unter 0.25rem, wenn sie durch einen Inline-Kommentar begründet sind. Alle anderen Literalwerte werden zu Tokens.
- Sektion-Abstände haben eigene Tokens (z. B. `--section-tight`, `--section-standard`, `--section-wide`), damit sie konsistent über Seitentypen hinweg greifen.
- Maximale Content-Breiten als Tokens (z. B. `--content-width`, `--wide-width`) – nie mit Magic Numbers arbeiten.
- Mobile-Breakpoints: Properties **innerhalb** der Media-Queries nutzen ausnahmslos Tokens. **Breakpoint-Werte selbst** (`48rem`, `64rem`) dürfen als Literale stehen, solange kein Breakpoint-Token-System existiert (`--breakpoint-sm`, `--breakpoint-md`). Sobald solche Tokens eingeführt sind, sind sie verpflichtend zu nutzen.
- Responsive Breakpoints folgen der Tailwind-Konvention (`sm: 40rem`, `md: 48rem`, `lg: 64rem`, `xl: 80rem`, `2xl: 96rem`). Abweichende Werte werden als Token in `tokens.css` deklariert und hier als Ausnahme begründet.

---

## Komponenten-Hierarchie

Ein durchgängiges Button-System mit klar begrenzter Anzahl an Varianten. Vier Kern-Stufen sind der Regelfall:

1. **Primary** – die eine Haupthandlung pro Bildschirm. Hohe visuelle Gewichtung.
2. **Secondary** – unterstützende Handlungen. Klar erkennbar, aber nicht konkurrierend.
3. **Danger** – destruktive oder irreversible Aktionen. Warnfarbe, bewusst seltener Einsatz.
4. **Tertiary / Text-Link / Ghost / Subtle** – Sammelkategorie für nebensächliche und inline-Aktionen, optional in Abstufungen.

**Zusätzliche Stufen sind zulässig**, wenn sie eine fachlich klare Rolle erfüllen, die keine der Kern-Stufen abdeckt (z. B. `Emergency` für Notfall-CTA in einer Care-Anwendung). Jede zusätzliche Stufe muss:

1. im Button-Komponenten-Code mit einem Kommentar zur Begründung versehen sein,
2. hier im Richtliniendokument oder in einem Design-Log aufgeführt sein,
3. dieselbe Token-Basis nutzen wie die Kern-Stufen.

**Gemeinsame Basis**: Alle Buttons teilen `font-family`, `font-size`, `padding`, `border-radius` und eine Mindest-Touch-Target-Größe von 44×44 px (WCAG 2.5.5).

**Vor Einführung eines neuen Button-Typs**: Prüfen, ob er in eine bestehende Stufe passt. Nur wenn wirklich nicht: neue Variante mit Token-basiertem Styling, dokumentiert warum.

**Andere Komponenten** (Karten, Badges, Alerts, Modals, Breadcrumbs) folgen dem gleichen Prinzip: zentral definiert, token-basiert, mit klar begrenzten Varianten. Wenn du dieselbe Komponente an zwei Stellen leicht unterschiedlich definiert findest, ist das fast immer ein Bug, keine Absicht.

---

## Barrierefreiheit – nicht optional

- **Semantisches HTML vor ARIA.** `<nav>`, `<main>`, `<aside>`, `<details>`, `<button>` statt `div`-Suppe. In der Praxis: `<button>` für alles Click-bare, `<a href>` nur bei echter Navigation. `<div role="button">` ist verboten. Backdrop-Dismiss-Elemente werden als `<button>` implementiert, nicht als `<div onClick>`.
- **Skip-Links** zum Hauptinhalt auf jeder Seite.
- **ARIA nur wo nötig**: `aria-label` auf Navigation und ikonischen Buttons, `aria-expanded` auf Toggle-Buttons, `aria-live="polite"` auf dynamisch ersetzten Inhalten.
- **Fokus-Indikatoren**: Jedes interaktive Element hat einen sichtbaren `:focus-visible`-Stil. Auf dunklen Hintergründen: hellere Variante. Standardbrowser-Outlines entfernen ist verboten, es sei denn, ein besserer ersetzt sie.
- **Reduced Motion**: Alle Animationen hinter `@media (prefers-reduced-motion: reduce)` prüfen. IntersectionObserver-Reveals sofort auslösen, wenn Nutzer*innen reduzierte Bewegung bevorzugen.
- **Touch-Targets**: Mindestens 44×44 px für alle interaktiven Elemente.
- **Farbe als Information**: Farbe darf nie das einzige Signal sein. Icons, Text oder Form müssen die Information doppelt tragen. Jeder Status (Error, Warning, Success, Info) trägt mindestens zwei Signale: Farbe + Icon ODER Farbe + Text-Label. Farbe allein (z. B. nur roter Rahmen ohne Icon/Label) ist verboten.
- **Fokus-Management bei dynamischen Inhalten**: Wenn per JavaScript ein Bereich ersetzt wird (z. B. Quiz-Fragen, Wizard-Schritte), muss der Fokus aktiv auf das neue Element gesetzt werden. Sonst verlieren Keyboard- und Screen-Reader-Nutzer*innen die Orientierung.

---

## Animation und Bewegung

**Maxime: Weniger ist mehr.**

- Transition-Dauer: 0.2–0.3 s für Micro-Interaktionen, selten länger als 0.4 s
- Keine horizontalen Marquees, kein Parallax, keine pinned Sections ohne zwingenden Grund
- Animations-Bibliotheken nur, wenn CSS-Transitions wirklich nicht reichen. In 90 % der Fälle reichen sie.
- IntersectionObserver-Reveals (dezentes Einblenden beim Scrollen) sind ok, aber sie sind Dekoration, nicht Inhalt. Nichts darf darauf angewiesen sein.
- Aufwändigere Animationen an genau einer bewussten Stelle pro Produkt, nicht verteilt.

---

## CSS-Architektur

Eine flache Dateistruktur nach Verantwortungsbereichen. Die konkrete Aufteilung hängt vom Tooling ab.

**Bei klassischen CSS-Projekten:**

| Datei | Verantwortung |
|---|---|
| `tokens.css` | Custom Properties – keine Selektoren, keine Regeln |
| `base.css` | Globale Defaults (body, typography, reset) |
| `layout.css` | Struktur, Grid, Container, Navigation, Footer |
| `components.css` | Wiederverwendbare Komponenten (Buttons, Karten, Forms) |
| `pages.css` oder thematisch | Seiten- oder feature-spezifische Styles |
| `print.css` | Druck-Overrides |

**Bei Tailwind- oder Utility-First-Projekten:** Eine kleine Zahl gut benannter CSS-Dateien reicht, typischerweise:

| Datei | Verantwortung |
|---|---|
| `tokens.css` | Custom Properties – keine Selektoren, keine Regeln |
| `index.css` oder `globals.css` | Base-Defaults, globale Resets, Tailwind-Import, `::selection` |
| `primitives.css` oder `components.css` | Wiederverwendbare Komponenten-Klassen (`.ui-*`-Namespace) |
| `print.css` oder Print-Block in globals | Druck-Overrides zentralisiert an **einer** Stelle |

**Gemeinsame Regeln, unabhängig vom Tool:**

- Keine `!important`-Deklarationen außerhalb von Print-CSS. Wenn du Specificity-Probleme hast, ist das ein Symptom, nicht die Lösung.
- Neue Styles gehören in die thematisch passende Datei, nicht ans Ende der zuletzt geöffneten Datei.
- Print-Styles werden an **genau einer** Stelle gebündelt, nicht über mehrere Dateien verstreut.
- Datei-Größen über ~2000 Zeilen sind ein Hinweis auf fehlende Gliederung – entweder nach thematischen Sektionen kommentieren oder sauber aufteilen.
- Lesbar formatierter Quellcode im Repo, Minifizierung beim Build.
- Kommentare: Abschnittsüberschriften als Orientierung, Inline-Kommentare für nicht-offensichtliche Entscheidungen (Kontrast-Ratios, Browser-Workarounds, bewusste Abweichungen).
- **Keine Override-Dateien.** Eine separate `overrides.css`, die nach allen anderen geladen wird, ist ein Warnsignal: Sie verschleiert Cascade-Drift und hinterlässt später tote Zwillinge, wenn jemand die Original-Regel ändert, aber die Override vergisst. Besser: Die Ursache der Spezifitäts-Probleme beheben.

**Zusätzlich für Tailwind-Projekte:**

- Tailwind Arbitrary Values (`bg-[…]`, `text-[…]`, `p-[…]`) sind nur zulässig, wenn sie auf Tokens referenzieren: `text-[var(--text-danger)]` ist ok, `bg-[#abc123]` oder `p-[12px]` nicht. Hex-Literale und rohe Zahlen als Arbitrary Values sind verboten und zu Tokens oder Utility-Klassen zu überführen.

---

## Kritische Pfade

Jedes Projekt hat Stellen, an denen Fehler besonders teuer sind. Bei einer Care-Website sind das Notfall-Kontakte. Bei einem Shop ist es der Checkout-Flow. Bei einer Authentifizierung sind es Fehlerzustände und Recovery-Pfade. Bei einem Tool ist es die Haupt-Aktion.

**Regeln für kritische Pfade:**

- Keine Animationen, die die Wahrnehmung verzögern
- Keine Experimente, keine A/B-Tests, kein Refactoring „nebenbei"
- Änderungen immer mit expliziter Verifikation auf der Live- oder Deploy-Preview-Umgebung, nicht nur im Build-Check
- Touch-Targets am oberen Ende (mindestens 44×44 px, gerne mehr)
- Fehlerzustände sind Teil des Designs, nicht des Glücksfalls
- Textfarben und Kontraste werden besonders sorgfältig geprüft, weil Nutzer*innen in diesen Momenten mit reduzierter Aufmerksamkeit lesen
- Telefonnummern, Adressen und andere Kontaktdaten auf kritischen Pfaden sind klickbar (`tel:`, `mailto:`), nicht nur darstellend

**Identifiziere die kritischen Pfade deines Projekts explizit.** Schreib sie auf, idealerweise in die `CONTRIBUTING.md` oder `README.md`. Alles, was diese Pfade berührt, verdient zusätzliche Reviews und hat keine Eile.

---

## Konventionen im Code

Konventionen, die im Code konsistent umgesetzt werden und hier dokumentiert sind, damit sie nicht versehentlich durchbrochen werden. Neue Konventionen werden spätestens nach der dritten Wiederholung hier aufgenommen.

### Hash-Navigation mit Focus-Management

Navigation zwischen Hauptbereichen läuft über URL-Hashes (`#start`, `#toolbox`, …). Nach jedem Wechsel wird der Fokus explizit auf das Ziel-Heading gesetzt, damit Tastatur- und Screen-Reader-Nutzer nicht orientierungslos im neuen Abschnitt landen.

Verankert in: `src/context/AppStateContext.jsx`, `src/utils/useNavigationFocus.js`, aufgerufen via `navigate(tab, { focusTarget: 'heading' })`.

### Zentraler App-State via `AppStateContext`

Globaler Client-State (aktiver Tab, Score, Assessment-Antworten, Vignetten-Index) lebt in einem React-Context mit localStorage-Persistenz (Key `rr_app_state_v5`). Hook `useAppState()` ist der einzige legitime Zugriff. Kein externes State-Management-Framework.

Verankert in: `src/context/AppStateContext.jsx`, `src/context/useAppState.js`.

### Schichtung Section → Template → Content

Daten-orientierte Sections (`src/sections/*.jsx`) bauen View-Models aus Content-Dateien und reichen sie an reine Rendering-Templates (`src/templates/*.jsx`) weiter. Content liegt als statisches JS-Objekt in `src/data/*.js`. Keine Business-Logik im Template, keine Rendering-Details in der Section.

Verankert in: z. B. `src/sections/VignettenSection.jsx` → `src/templates/VignettenPageTemplate.jsx` + `src/data/vignettenContent.js`.

### `focusTarget: 'heading'` für Post-Navigation-Fokus

Standard-Prop für alle `navigate()`-Aufrufe, die Keyboard-Fokus auf das Haupt-Heading der Zielseite setzt. Wenn nicht angegeben, wird der Fokus nicht verändert.

Verankert in: `src/utils/useNavigationFocus.js`.

### `.haptic-btn` Micro-Interaction-Klasse

CSS-Klasse für taktiles Button-Feedback (Scale-Transform auf `:hover`, Scale-Reduktion auf `:active`). Standard-Interaction-Wrapper für primäre Click-Ziele.

Verankert in: `src/styles/app-global.css` (Basis-Transition), `src/styles/primitives.css` (Reduce-Motion-Guard).

### `.ui-visually-hidden` Utility

Screen-Reader-only-Text mit Clip-Path-Technik. Standard-Pattern für redundante Labels, die visuell durch Icon + Kontext getragen werden, semantisch aber explizit sein müssen.

Verankert in: `src/styles/primitives.css` (Klasse `.ui-visually-hidden`).

### `aria-hidden="true"` auf dekorativen Icons + `aria-label` auf Button

Dekorative Lucide-Icons in Buttons/Labels bekommen `aria-hidden="true"`, der begleitende Button hat ein explizites `aria-label` mit dem vollen Kontext. So bekommt der Screen-Reader den Intent ohne Icon-Rauschen.

Verankert in: breites Muster, z. B. `src/App.jsx` (Emergency-Button), `src/components/Header.jsx` (Navigation).

### `primaryAudience`-Metadaten pro Template

Jeder Top-Level-Tab in `TAB_ITEMS` hat ein `primaryAudience`-Feld (`fachpersonen` / `angehoerige` / `beide`) aus Audit 02. Nicht für Routing, sondern für inhaltliche Orientierung und spätere Filter.

Verankert in: `src/data/appShellContent.js`, eingeführt in Audit 02.

---

## Vor jeder Änderung – Checkliste

1. **Welche Datei?** Token → Token-Datei. Layout → Layout-Datei. Komponente → Components-Datei. Seitenspezifisch → Seitendatei. Nicht einfach ans Ende der letzten geöffneten Datei schreiben.
2. **Gibt es schon ein Pattern?** Prüfe bestehende Klassen und Utilities. Kein Duplikat-CSS.
3. **Tokens statt Hardcode?** Farben, Spacing, Radien, Schriftgrößen, Schatten – immer über Variablen.
4. **Kontrast geprüft?** Jede neue Text-/Hintergrund-Kombination gegen WCAG AA prüfen und dokumentieren.
5. **Mobile getestet?** Jeder relevante Breakpoint. Besonders die kleinste Ziel-Viewport-Größe.
6. **Reduced Motion respektiert?** Neue Animationen hinter Media-Query.
7. **Touch-Target erreicht?** 44×44 px Minimum für alles Interaktive.
8. **Kritischer Pfad?** Falls ja: Review-Prozess entsprechend verschärfen.

---

## Arbeitsweise

Die Regeln oben sind *was*, nicht *wie*. Zur Arbeitsweise gehören drei Gewohnheiten, die den Unterschied zwischen „Code geschrieben" und „Site wird besser" ausmachen:

**Phase 1 vor Phase 2.** Vor jedem nicht-trivialen Eingriff: Inventur. Was ist da, wie viel, was funktioniert, was nicht. Erst dann entscheiden, was geändert wird. Die meisten schlechten Commits entstehen, weil jemand anfängt zu fixen, bevor er oder sie verstanden hat, was eigentlich kaputt ist. Ein 15-minütiger Audit-Report, der zum Schluss „bereits erledigt" sagt, ist wertvoller als ein schneller Fix an der falschen Stelle.

**Commits sind Kommunikation.** Eine Commit-Message ist nicht „was ich getippt habe", sondern „warum sich das in einem Jahr noch lohnt zu wissen". Wenn du in sechs Monaten diesen Commit wiederfindest: Würdest du verstehen, warum er existiert? Wenn nicht, ist die Message zu kurz. Referenzen auf andere Commits (`Refs abc123d`) sind billig und machen die Git-History zu einer durchsuchbaren Chronik.

**Review vor Merge, auch bei trivialen Fixes.** Der Branch-per-Feature/PR-Workflow ist kein Overhead, sondern der Ort, an dem „sieht gut aus" durch „ist gut" ersetzt wird. Direkt-Pushes auf den Haupt-Branch umgehen diesen Ort – auch wenn sie von dir selbst kommen, auch wenn der Fix trivial ist, auch wenn es spät abends ist und du „nur noch eines schnell" machen willst. Branch Protection auf dem Haupt-Branch ist die strukturelle Form dieser Disziplin. Sie schützt nicht vor Böswilligkeit, sondern vor Müdigkeit.

**Eine vierte Gewohnheit, die sich im Lauf der Zeit aufdrängt:** Wenn ein Bug nach einem Fix „weg" wirkt, aber kurz darauf derselbe Bug wieder auftaucht, ist selten der Fix falsch – meist ist die Verifikationsmethode falsch. Finde heraus, unter welchen Bedingungen der Bug tatsächlich sichtbar wird, und verifiziere genau unter diesen Bedingungen. Ein Fix, der im Dev-Modus mit installierten Fonts funktioniert, aber in der Deploy-Preview mit Fallback-Fonts versagt, ist kein Fix, sondern eine Illusion.

---

## Was diese Richtlinien nicht sind

Sie sind kein vollständiges Design-System. Sie sind keine Code-Convention. Sie sind keine Ersatz für Pattern-Libraries wie shadcn, Radix oder Tailwind.

Sie sind eine Haltung, auf der ein Projekt aufgebaut werden kann, unabhängig davon, welche Tools dazu verwendet werden. Ein Projekt, das diese Prinzipien ernst nimmt, kann mit handgeschriebenem CSS genauso entstehen wie mit Tailwind oder einer Komponenten-Library. Was in allen Fällen gleich bleibt: die Fragen, die man vor jeder Entscheidung stellt.

Die einzige verlässliche Qualitätskontrolle ist ein Mensch, der die Seite im Zweifelsfall aus der Perspektive der schwächsten Nutzerin anschaut und fragt: *Kommt sie hier in drei Sekunden an, was sie braucht – und fühlt sie sich dabei gesehen, nicht überfordert?*
