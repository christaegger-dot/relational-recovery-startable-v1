# Relational Recovery — Projektkontext

Schweizer Fachportal zur Unterstützung von Fachpersonen, die mit Familien arbeiten, in denen ein Elternteil psychisch erkrankt ist. Die Inhalte sind auf Deutsch (de-CH).

## Befehle

- `npm run dev` — Vite Dev-Server starten
- `npm run build` — Production-Build
- `npm run lint` — ESLint
- `npm run lint:fix` — ESLint mit Auto-Fix
- `npm run format` — Prettier
- `npm run test:e2e` — Playwright E2E-Tests

## Workflow für Code-Aufgaben

**Grünes Licht ist Default.** Standard-Ablauf am Ende jeder Aufgabe (Code-Änderungen, Audit-Berichte, Follow-up-Tickets): **Commits pushen → PR eröffnen → Squash-Merge → ggf. zugehöriges Issue closen** — alles in einem Rutsch, ohne dazwischen Bestätigungen einzuholen. Erst stoppen, wenn das Resultat im `main` ist.

Bei fachlicher Mehrdeutigkeit (z. B. mehrere plausible Lösungswege für ein Audit-Finding): **die plausibelste Option wählen, im PR-Body begründen, durchziehen** — nicht stehenbleiben und fragen. Wenn die Entscheidung später revidiert werden muss, ist das ein normaler Folge-PR.

Echte Stopp-Schilder (vorher fragen):
- Force-Push, History-Rewrites, `git reset --hard` auf gepushte Commits, Reverts gemergeter PRs.
- Lösch- oder Datenbank-Migrationen, die nicht trivial reversibel sind.
- Inhaltliche Aussagen zu klinischen/rechtlichen Fragen, die fachliche Verifikation brauchen (KESB-Pfade, medizinische Empfehlungen).

`CLAUDE.md`/`package.json`-Updates dürfen ohne Rückfrage erfolgen, wenn sie zur laufenden Aufgabe gehören (z. B. Konventions-Notiz, neue Abhängigkeit für ein Feature).

PR-Body immer mit aussagekräftigem Titel + kurzer Test-Plan-Checkliste.

## Architektur

Rein clientseitige React 19 SPA ohne Backend. Kein Routing-Library — Hash-basierte Navigation (`#start`, `#toolbox`, `#evidenz` etc.).

### Verzeichnisstruktur

- `src/components/ui/` — Wiederverwendbare UI-Primitives (Button, Section, SectionHeader, AsideCard etc.)
- `src/components/closing/` — ClosingSection-Komponente (wiederverwendbar am Ende jeder Seite)
- `src/sections/` — Sektions-Komponenten: bauen View-Models aus Daten und reichen sie an Templates weiter
- `src/templates/` — Reine Rendering-Komponenten, empfangen Props von Sections
- `src/data/` — Statische Inhaltsdaten (deutsch)
- `src/context/` — AppStateContext (globaler State mit localStorage-Persistenz)
- `src/utils/` — Hilfsfunktionen und Custom Hooks (useMobileMenu, useNavigationFocus, useDownloadHandlers)
- `src/styles/` — CSS: `primitives.css` (UI-Komponentensystem), `app-global.css` (globale Stile)

### Patterns

- **Section → Template**: Sections bereiten Daten auf, Templates rendern. Sections sind lazy-loaded, HomeLandingTemplate nicht (bewusst — Startseite).
- **SectionHeader + AsideCard**: Wiederverwendbare Shared Components für das Split-Layout-Pattern (Eyebrow + Title + Description + Aside-Karte).
- **Custom Hooks in utils/**: `useMobileMenu`, `useNavigationFocus`, `useDownloadHandlers` — aus App.jsx extrahiert.

### Material-Handouts: Print / PDF-Export

Jedes einzelne Handout im Material-Tab ist druckbar via Print-Button im Handout-Head. Der Browser-Druckdialog deckt auch "Als PDF speichern" ab (keine separate PDF-Bibliothek nötig).

**Wie ein neues Handout print-ready wird:**

1. Handout-Objekt in `src/data/materialContent.js` unter `MATERIAL_HANDOUTS` anlegen (mit `id`, `kind`, etc.).
2. In `src/templates/MaterialHandouts.jsx` eine Komponente für den neuen `kind` ergänzen. Empfohlen: `<MaterialHandoutShell handout onNavigate onPrintHandout>…</MaterialHandoutShell>` als Wrapper — er liefert Article-Container + Head + Usage + Disclaimer + CrossRefs; die spezifische Komponente liefert nur die mittleren Sections via `children`. Im `MaterialHandoutSwitch` (Default-Export) einen `case`-Branch für den neuen `kind` ergänzen.
3. Print-Typografie: Standardregeln für `.ui-material-handout*` im `@media print`-Block in `src/styles/app-global.css` (Abschnitt 9) greifen automatisch. Handout-spezifische Eigenheiten nur ergänzen, wenn ein Format stark abweicht.
4. Der `useMaterialHandoutPrint`-Hook rendert beim Click einen scoped `<style>`-Block, der beim Druck alle anderen Handouts ausblendet — kein zusätzlicher Code pro Handout-Typ nötig.

Alle Rahmung (Hero, Intro, Index, FAQ-Cluster, ClosingSection) ist im `MaterialPageTemplate` mit `.no-print`-Wrappern versehen, damit beim Druck nur der Handout-Grid übrig bleibt.

**Bekannte Handout-`kind`-Werte und ihre Daten-Schemata:**

- `'crisis-plan'` — Notfallplan-Vorlage mit Eigentumsfeldern, Sektionen, Notfallnummern (`MaterialCrisisPlan`).
- `'conversation-script'` — Tier-1 (Issue #112): Gespräch-Skript für betroffene Eltern. Erwartet `usage`, `opener {title, text, note}`, `childQuestions {title, intro, items[].question, items[].anchor}`, `understandingCheck {title, intro, prompt, note}`, `process {title, items[]}`, `disclaimer`, `crossRefs` (`MaterialConversationScript`).
- `'threshold-checklist'` — Tier-1 (Issue #113): Schwellen-Karte für Angehörige. Erwartet `usage`, `priorityRule {title, intro, items[].step, items[].label, items[].detail}`, `thresholds {title, intro, items[].observation, items[].escalate}`, `contacts {title, intro, items[].number?, items[].name?, items[].detail}`, `selfNote {title, text}`, `disclaimer`, `crossRefs` (`MaterialThresholdChecklist`).
- `'age-grid'` — Tier-2 (Issue #116): Altersdifferenzierte Übersicht für Eltern + Fachpersonen. Vier Karten (Kleinkind, Kindergarten, Schulkind, Jugendliche), je vier Sub-Sektionen. Erwartet `usage`, `ageGroups {title, intro, items[].id, items[].ageRange, items[].label, items[].symptoms {title, items[]}, items[].needs {title, items[]}, items[].parentHelp {title, items[]}, items[].threshold {title, text}}`, `disclaimer`, `crossRefs` (`MaterialAgeGrid`). Layout: 1-Spalten-Stack auf Mobile, 2 Spalten auf Tablet, 4 Spalten auf Desktop. Print: 2×2 auf A4 Portrait (explizite `!important`-Override gegen den Desktop-4-Spalten-Bildschirm). Altersgrenzen entsprechen Cluster 5 (`material-altersgerecht`), damit Handout + FAQ inhaltlich synchron bleiben.

Die Tier-1+ Komponenten nutzen den `MaterialHandoutShell`-Wrapper (Head + Usage am Anfang, Disclaimer + CrossRefs am Ende). `MaterialCrisisPlan` ist bewusst NICHT auf den Shell umgestellt — die existierende DOM-Struktur ist von den Print-Tests + Print-Typografie abhängig. Konsolidierung kommt erst, wenn ein begründeter Anlass besteht (z. B. Label-Vereinheitlichung).

### Material-Cluster: Zielgruppen-Blöcke

Die FAQ-Cluster im Material-Tab adressieren zwei Gruppen: Cluster 1–3 Angehörige, Cluster 4–6 betroffene Eltern. Die Gliederung wird im Template über zwei Eingaben gesteuert:

- **`audience`** pro Cluster in `MATERIAL_CLUSTERS` (`'angehoerige'` | `'eltern'`) — rendert das `.ui-badge--soft`-Label im Cluster-Header.
- **`MATERIAL_CLUSTER_AUDIENCES`** — Array mit einem Eintrag pro Gruppe (`id`, `badge`, `title`, `description`). Jede Gruppe bekommt einen eigenen Block-Header (H2). Cluster-Titel rutschen dadurch auf H3 (Outline-Regel: H1 Page → H2 Block → H3 Cluster).

Neue Cluster hinzufügen: `audience`-Feld nicht vergessen. Wenn eine neue Zielgruppe dazukommt, einen weiteren Eintrag in `MATERIAL_CLUSTER_AUDIENCES` anlegen und ggf. eine Badge-Variante in `primitives.css` unter `.ui-badge[data-audience='…']` ergänzen.

## Zielgruppen (`primaryAudience`-Framework)

Jeder Tab in `TAB_ITEMS` (`src/data/appShellContent.js`) trägt ein **Pflichtfeld `primaryAudience`** mit genau einem von zwei Werten:

| Wert           | Adressat                                                                                         | Tabs                                                              |
| -------------- | ------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------- |
| `'fachperson'` | Fachpersonen in Erwachsenenpsychiatrie + Beratungskontext (Default)                              | Start, Lernmodule, Vignetten, Glossar, Evidenz, Toolbox, Netzwerk |
| `'weitergabe'` | Patient:innen und Angehörige — Material, das Fachpersonen im Gespräch einsetzen oder weitergeben | Material                                                          |

Die JSDoc-Union `PrimaryAudience = FachpersonAudience | WeitergabeAudience` macht den Wertebereich explizit. Ein Dev-Mode-Guard in `appShellContent.js` prüft beim Laden, dass jeder Tab einen gültigen Wert trägt — ohne Test-Framework, ohne Production-Overhead.

### Was `primaryAudience` steuert (redaktionelle Hand)

Der Marker ist kein Layout-Schalter, sondern eine **redaktionelle Selbstverpflichtung**: Er steuert die Sprache, Anrede, Beispiele und Disclaimer-Tonalität für den gesamten Tab.

| Signal               | `'fachperson'`                                                                  | `'weitergabe'`                                           |
| -------------------- | ------------------------------------------------------------------------------- | -------------------------------------------------------- |
| Anrede               | Sie / unpersönlich / passiv                                                     | Sie / Du, situativ — eher direkt an Betroffene           |
| Vokabular            | Fachbegriffe ohne Erklärung erlaubt (Parentifizierung, Schweigepflicht, Triage) | Alltagssprache; Fachbegriffe nur mit Klammer-Erklärung   |
| Beispiele            | klinische Fallrahmungen, Versorgungs-Situationen                                | familiäre Alltags-Situationen, kindbezogene Konkretionen |
| Disclaimer-Tonalität | „nicht als Diagnose-/Urteilsinstrument"                                         | „kein Therapieersatz, bei Belastung Fachstelle X"        |
| Aside / Eyebrow      | „Klinische Orientierung", „Fachpraxis", „Versorgungsalltag"                     | „Handout für Eltern", „Handout für Angehörige"           |

### Entscheidungs-Logik für neue Tabs

Wenn ein neuer Tab dazukommt, beantworte zuerst diese Frage:

> **Wer hält das Material in der Hand, während er es liest — die Fachperson oder die betroffene Person?**

- Liest die **Fachperson**, um daraus eine Einschätzung / ein Gespräch / eine Vermittlung zu bauen → `'fachperson'`.
- Liest die **betroffene Person** (oder ein Angehöriger / ein Kind), möglicherweise allein, möglicherweise nach Übergabe durch eine Fachperson → `'weitergabe'`.

Im Zweifel: `'fachperson'` wählen und das weitergabe-fähige Teilstück als druckbares Handout im Material-Tab bündeln (statt einen Mischtab zu bauen).

### Mischung innerhalb eines Tabs vermeiden

Mischadressaten innerhalb eines Tabs erzeugen Mikro-Brüche, die Lesende verunsichern (plötzliches Du, plötzlicher Fachjargon). Wenn ein Cluster oder ein Block aus dem deklarierten Frame fällt, gibt es zwei legitime Auswege:

1. **Umformulieren** in den Frame des Tabs (z. B. „Wer gehört zur Kernfamilie der/des Betroffenen?" statt „Wer gehört zu deiner Kernfamilie?").
2. **Explizit als Sub-Adressat markieren** mit dem `audience`-Pattern aus dem Material-Tab (Block-Header + Audience-Badge pro Cluster — siehe „Material-Cluster: Zielgruppen-Blöcke" oben). Dieses Pattern ist aktuell nur im Material-Tab im Einsatz und kann bei Bedarf auf andere Tabs übertragen werden.

### Bekannte Mismatches

Aktueller Stand: **keine offenen Mismatches bekannt**.

Historisch behoben:

- **Netzwerk-Tab** (Issue #118, behoben kurz nach PR #117): `NETWORK_MAP_QUESTIONS` in `networkContent.js` sprach Patient:innen mit Du an („deiner Kernfamilie", „kannst du reden"). Die Fragen sind jetzt in Beobachtungsform formuliert („der/des Betroffenen", „die/der Betroffene") und damit konsistent mit dem `'fachperson'`-Frame des Tabs. Das Beispiel oben in „Mischung innerhalb eines Tabs vermeiden" stammt aus diesem Fall.

## Konventionen

- Fachspezifische deutsche Begriffe in Section-/Template-Namen (GlossarSection, VignettenSection), technische Begriffe auf Englisch
- CSS: `ui-`-Prefix im BEM-ähnlichen Stil in `primitives.css`, Tailwind-Utilities in JSX
- Kein `dangerouslySetInnerHTML` — alle Inhalte über JSX
- Alle externen Links: `target="_blank" rel="noopener noreferrer"`
- `prefers-reduced-motion` wird für alle Animationen berücksichtigt

## Wichtig

- Die App enthält Notfallnummern (144, AERZTEFON, 147). Diese müssen immer erreichbar bleiben — ErrorBoundary zeigt sie auch bei Crashes.
- localStorage-Key: `rr_app_state_v5` — enthält keine personenbezogenen Daten
- Kein Backend, keine API-Calls, keine .env-Variablen nötig
