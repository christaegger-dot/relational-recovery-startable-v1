# Audit 17 — Content-Qualität + Sprache (inkl. Audience-Framework)

**Datum:** 2026-04-21
**Branch:** `claude/audit-17-content-sprache`
**Prompt:** `qa/prompts/audit-content-sprache.md`
**Scope:** 10 Content-Module unter `src/data/` (3408 LOC total).

---

## Phase 1 — Inventur

### 1.1 Content-Inventar

| Datei | LOC | Tab(s) | `primaryAudience` |
|---|---:|---|---|
| `appShellContent.js` | 181 | alle (TAB_ITEMS) | Framework-Definition |
| `evidenceContent.js` | 674 | Evidenz | `fachperson` |
| `fachstellenContent.js` | 222 | Netzwerk, Toolbox | `fachperson` |
| `glossaryContent.js` | 317 | Glossar | `fachperson` |
| `learningContent.js` | 92 | Lernmodule, Vignetten | `fachperson` |
| `materialContent.js` | 933 | Material | `weitergabe` |
| `networkContent.js` | 215 | Netzwerk | `fachperson` |
| `routeMeta.js` | 131 | (SEO-Metadaten) | n/a |
| `sourcesContent.js` | 285 | Evidenz (zentrales Register) | `fachperson` |
| `toolboxContent.js` | 358 | Toolbox | `fachperson` |
| **Summe** | **3408** | 8 Tabs | 7× fachperson, 1× weitergabe |

### 1.2 Audience-Konsistenz

**Fachperson-Tabs** (Du/Dein-Suche): 8 Treffer, alle legitim:

- `networkContent.js:48–50`: Kommentar, der die Zielgruppen-Regel dokumentiert (Issue #118, historische Du→Sie-Umstellung).
- `fachstellenContent.js:94`, `toolboxContent.js:37`: URL-Pfad `/dein-kontakt-zu-uns/` auf 147.ch — externer Link, unveränderlich.
- `evidenceContent.js:199`, `:335`: zitierte kindgerichtete Sätze ("Du bist nicht schuld"), die die Fachperson an das Kind richten soll. Anrede gehört zum Zitat, nicht zur Portal-Tonalität.
- `evidenceContent.js:535`, `:621`: Buchtitel ("Mama, warum weinst du?", "Lieber Matz, Dein Papa hat 'ne Meise") — unveränderlich.
- `appShellContent.js:31`: JSDoc-Kommentar beschreibt die Weitergabe-Audience-Regel.

**Weitergabe-Tab** (`materialContent.js`): Cluster-Audiences konsistent:
- `material-verstehen`, `material-grenzen`, `material-zusammenarbeit` → `angehoerige`
- `material-kinder`, `material-altersgerecht`, `material-formulierungshilfen` → `eltern`

Handouts (`crisis-plan`, `conversation-script`, `threshold-checklist`, `age-grid`) verwenden pro Handout eindeutige Anrede (Sie- oder Du-Form), kein Mischen.

**Befund:** 0 Audience-Brüche.

### 1.3 Fachjargon-Kreuztabelle

| Begriff | Verwendet in | Im Glossar? | Kommentar |
|---|---|---|---|
| Parentifizierung | Evidenz, Lernmodule, Material | ✅ | Im Material-Tab mit Klammer-Erklärung. |
| Rollenumkehr | Evidenz, Glossar | ✅ | |
| Mentalisieren | Evidenz, Glossar | ✅ | |
| Psychoedukation | Evidenz, Glossar, Lernmodule | ✅ | |
| Resilienz | Evidenz, Glossar, Material | ✅ | |
| Kohärenzgefühl | Evidenz, Glossar | ✅ | |
| Triage | Toolbox, Glossar | ✅ | |
| KESB | durchgehend | ✅ | `KESB (Kindes- und Erwachsenenschutzbehörde)`. |
| Gefährdungsmeldung | Toolbox, Glossar | ✅ | |
| Beistandschaft (Art. 308 ZGB) | Toolbox, Glossar | ✅ | |
| Melderecht/Meldepflicht (Art. 314c/d ZGB) | Toolbox, Glossar | ✅ | |
| Komorbidität | Evidenz, Glossar | ✅ | |
| SPF | Lernmodule, Toolbox, Glossar | ✅ | Volle Form in Glossar. |
| Kooperationsfenster | Evidenz, Glossar | ✅ | |
| Trialog | Glossar | ✅ | |
| Loyalitätskonflikt | Evidenz, Glossar, Material | ✅ | |
| Tabuisierung | Evidenz, Glossar | ✅ | |
| Feinfühligkeit | Evidenz | ⚠️ fehlt | Kontextuell verständlich, kein Sofort-Fix. |
| Selbstwirksamkeit | Evidenz, Lernmodule, Toolbox | ⚠️ fehlt | Verbreiteter Begriff, aber im Fachperson-Frame defensibel. |
| Ambivalenz | Evidenz, Glossar (Einleitung), Material, Toolbox | ⚠️ fehlt als Haupteintrag | In Glossar-Beschreibung erwähnt, nicht definiert. |
| Anamnese | Evidenz | ⚠️ fehlt | Fachperson-Kernvokabular, defensibel. |

**Befund:** 4 Begriffe ohne eigenen Glossar-Eintrag. Alle in Fachperson-Tabs, alle im Kontext der Zielgruppe ohne Erklärung tragfähig. Kein Sofort-Fix nötig — als redaktionelles Folge-Ticket festhalten (Glossar-Erweiterung).

### 1.4 Sprachliche Qualität (Stichprobe)

Geprüft: je ein längerer Textblock pro Tab (Evidenz `RELEVANCE_POINTS`, Material Cluster-Intros, Toolbox FAQs, Lernmodule `E_MODULES`, Glossar `description`-Felder).

- **Satzlängen:** mehrheitlich 10–22 Wörter, keine Ausreisser jenseits 35. Im Zielkorridor.
- **Passiv-Anteil:** sichtbar, aber funktional — Fachperson-Tabs nutzen Passiv bewusst zur Distanzierung ("wird eingesetzt", "können angesprochen werden"). Keine Passiv-Häufung, die Lesbarkeit stört.
- **Nominalstil:** moderate Dichte. Einzelne Häufungen ("Kontaktintensität verändern, strukturelle Bedingungen anpassen" — `evidenceContent.js:457`), aber in Fach-Kontext akzeptabel.
- **Floskeln:** 4× `grundsätzlich` (jeweils rechtlich präzise, nicht Floskel), 0× `ganzheitlich` / `nachhaltig` / `im Sinne von` / `im Rahmen von`. Sauber.
- **Tonalität:** warm-fachlich. Keine behördliche Kälte, kein Coaching-Sprech.

**Befund:** Sprachliche Qualität im Zielkorridor. Kein Handlungsbedarf.

### 1.5 Schweizer Orthografie

`grep -r "ß" src/data/` → 3 Treffer:
- `src/data/glossaryContent.js:4`: JSDoc-Kommentar "kein ß" — dokumentiert die Regel, korrekt.
- `src/data/routeMeta.js:3`: Kommentar "ss statt ß" — dokumentiert die Regel, korrekt.
- **`src/data/networkContent.js:128`**: `'Zeigt soziale Einbindung und entlastende Außenbezüge für das Kind.'` — **Defekt.** `Außenbezüge` → `Aussenbezüge`.

**Befund:** 1 echter `ß`-Defekt. Sofort-Fix.

### 1.6 Quellen-Check

`sourcesContent.js`: 17 Einträge, Jahre 2007–2025.

Quellen älter als 10 Jahre (vor 2016):
- `plass-wiegandgrefe-2012`, `plass-wiegandgrefe-2012-kohlhammer` (2012) — Basiswerk, weiterhin Standard-Referenz für „~30 % stationärer Patient:innen mit minderjährigen Kindern".
- `grube-dorn-2007` (2007) — Basiswerk, Quelle für Elternschaftsraten nach Diagnosegruppen.
- `lenz-2014` (2014) — klassischer Lehrbuch-Band (Hogrefe).

Diese drei Alterungen sind **Basiswerke**, keine veralteten Primärdaten. Keine Aktionspflicht; kennzeichnen als "klassisches Referenzwerk" ist Folge-Ticket.

Quellen ohne Link (`link: null`): 5 Einträge (`lenz-2014`, `koopmann-2025`, `plass-wiegandgrefe-2012-kohlhammer`, `lenz-2019`, `grube-dorn-2007`). Vier davon sind Print-Bücher / Kongress-Editorials ohne stabile Online-Quelle. Audit 13 / F3 hat einen Eintrag bewusst auf `null` gesetzt (Leseprobe 404).

**Claim-Belege:** `RELEVANCE_STATS` verweist für jeden numerischen Claim mit `sourceIds` auf das Quellen-Register. Konsistenz: alle referenzierten IDs existieren (stichproben-geprüft).

**Befund:** Quellenqualität solide. Kein Sofort-Fix.

### 1.7 Link-Rot

Extrahiert: 41 eindeutige URLs (nach `sort -u` aus 48 `http(s)://`-Treffern) in `src/data/`.
HEAD-Check mit `curl -I --max-time 8` durchgeführt.

**Ergebnis: alle 41 URLs → HTTP 403, inklusive der eigenen Netlify-Domain `https://eltern-angehoerige-fa.netlify.app`.**

Das ist kein Link-Rot, sondern Egress-Blockade der Sandbox. Valide Link-Überprüfung braucht manuellen Re-Check aus normaler Netzumgebung oder CI.

Empfehlung: manueller Re-Check gegen `qa/link-check-results.txt`-Pattern bei nächstem Deployment oder als GitHub-Action einrichten. **Nicht als 41 defekte Links im Bericht führen.**

### 1.8 Stigma- und Sensibilitäts-Check

Suchlisten:
- `leidet an`, `die/der Kranke`, `ist psychisch krank`, `psychisch Kranker/Kranken` → **3 Treffer, alle in `sourcesContent.js` als historische Buchtitel** (Plass/Wiegand-Grefe-Kohlhammer-Band; Grube/Dorn 2007). Bibliografische Werktitel, unveränderlich.
- KESB/Kindesschutz-Passagen: durchgehend neutral, faktenorientiert. Explizit entstigmatisierend, z.B. `evidenceContent.js:384`: „86 % aller Massnahmen betreffen eine Beistandschaft" — Kontext für Angst vor KESB.
- Opferperspektive vs. Ressourcenorientierung: Kinder werden durchgehend als Akteure mit Bewältigungsstrategien gerahmt (Resilienz-Cluster, Selbstwirksamkeit, Kooperationsfenster). Keine reine Opferdarstellung.

**Befund:** 0 Stigma-Defekte im redigierbaren Text. 3 Buchtitel sind historisch unveränderlich.

### 1.9 Gesamtbild

| Prüfpunkt | Status |
|---|---|
| Audience-Brüche | 0 |
| Unerklärter Fachjargon | 0 kritisch; 4 Glossar-Ergänzungen als Folge-Ticket |
| Satzlänge / Passiv / Floskeln | im Zielkorridor |
| `ß`-Treffer im redigierbaren Text | **1 Defekt** (`networkContent.js:128`) |
| Veraltete Quellen | 3 Basiswerke; kennzeichnen als Folge-Ticket |
| 4xx/5xx-Links | nicht zuverlässig prüfbar (Sandbox-Egress 403); manueller Re-Check offen |
| Stigma-Flags | 0 im redigierbaren Text |

**Zusammenfassung (Phase 1, 5 Zeilen):**
Content-Qualität insgesamt hoch. Audience-Framework konsistent umgesetzt (7× fachperson, 1× weitergabe), keine Mischadressaten-Brüche. Einziger echter Sofort-Defekt: ein `ß` in `networkContent.js:128` („Außenbezüge" → „Aussenbezüge"). Link-Check in Sandbox nicht zuverlässig (alle 41 URLs → 403 durch Egress-Blockade, nicht Link-Rot). Zwei Folge-Tickets: Glossar-Erweiterung (Feinfühligkeit, Selbstwirksamkeit, Ambivalenz, Anamnese) und Basiswerk-Kennzeichnung bei Quellen vor 2016.

---

## Phase 2 — Triage

| Befund | Schwere | Aufwand | Gruppe | Aktion |
|---|---|---|---|---|
| `ß` in `networkContent.js:128` ("Außenbezüge") | P1 — verletzt verbindliche CH-Orthografie | trivial | Sofort-Fix | Phase 3: Commit |
| Link-Check in Sandbox unzuverlässig | P2 — Blindstelle, kein Defekt | n/a | Redaktionelles Ticket | Folge-Ticket: manueller Re-Check bei Deployment oder GitHub-Action |
| Glossar-Lücken (Feinfühligkeit, Selbstwirksamkeit, Ambivalenz, Anamnese) | P3 — kosmetisch, kontextuell verständlich | redaktionell, mehrere Stunden | Redaktionelles Ticket | Folge-Ticket |
| Quellen vor 2016 als „Basiswerk" kennzeichnen | P3 — Transparenz | redaktionell | Redaktionelles Ticket | Folge-Ticket |
| 3 Buchtitel mit „psychisch Kranker/Kranken" | P4 — unveränderlich (Zitat-Treue) | 0 | Akzeptiert | Kein Fix |

**Phase-3-Umfang:** nur der `ß`-Fix. Alles andere geht als redaktionelle Folge-Tickets weiter (siehe PR-Body).

---

## Phase 3 — Umsetzung

- `audit(content): Aussenbezuege nach Schweizer Orthografie` — `src/data/networkContent.js:128` `Außenbezüge` → `Aussenbezüge`.

## Phase 4 — Verifikation

- `grep -r "ß" src/data/` → nur noch 2 Kommentar-Treffer (`glossaryContent.js:4`, `routeMeta.js:3`), die die Regel selbst dokumentieren.
- Kein Layout- oder Daten-Schema berührt. Keine Build-Auswirkung zu erwarten.
- App-Rendering: Netzwerk-Tab, Node "Freund:in des Kindes", Detail-Text zeigt „Aussenbezüge".
