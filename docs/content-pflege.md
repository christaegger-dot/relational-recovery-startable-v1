# Content-Pflege – Leitfaden

Dieser Leitfaden begleitet die redaktionelle Pflege der Content-Dateien in `src/data/`. Er ist in Audit 12 entstanden, um die vier dokumentativen Fussangeln aus der Phase-1B-Inventur aufzufangen -- Regeln, die sich aus der Code-Struktur nicht von selbst ergeben, aber bei späterer Arbeit an den Dateien wichtig sind.

Der Leitfaden ist nüchtern gemeint, nicht als Compliance-Dokument. Er soll beim Nachschlagen helfen, wenn neue Quellen, Fachstellen oder Glossar-Einträge hinzukommen oder wenn bei einer Änderung unklar bleibt, ob das Schema eingehalten ist.

Swiss-German-Orthografie gilt durchgehend (`ss` statt `ß`, schweizerische Präferenzen bei Ausdrücken).

---

## Schema-Übersicht der Content-Dateien

| Datei | Schema-Typ (JSDoc) | Zweck |
|---|---|---|
| `appShellContent.js` | `TabItem` | Navigation und Tab-Struktur |
| `routeMeta.js` | `RouteMeta` | Per-Route-Meta für Browser-Tab-Titel und Social-Sharing |
| `sourcesContent.js` | `Source` | Zentrales Quellen-Register |
| `glossaryContent.js` | `GlossaryTerm`, `GlossaryGroup` | Glossar-Einträge |
| `fachstellenContent.js` | `Fachstelle` | Konsolidiertes Fachstellen-Register |
| `evidenceContent.js` | -- | Evidenz-Inhalte, teils über IDs auf Quellen und Fachstellen verwiesen |
| `grundlagenContent.js`, `learningContent.js`, `networkContent.js`, `toolboxContent.js` | -- | Themenspezifische Inhalte, eigene Array-Strukturen |

JSDoc-Typen stehen direkt über den Exports. VSCode zeigt beim Hover den Typ, das ersetzt einen TypeScript-Compiler und hilft bei schnellen Prüfungen.

---

## Neue Quelle zu `SOURCES` hinzufügen

Pflicht-Felder: `id`, `author`, `year`, `title`, `type`, `chFocus`. Jedes andere Feld darf `null` sein, wenn keine Angabe vorliegt. **`null`, nicht leerer String** -- das vermeidet falsche Truthy-Checks.

**ID-Konvention.** Stabile kebab-case-ID nach dem Muster `nachname-jahr` oder `leadwort-jahr`. Beispiele: `lenz-2014`, `obsan-72-schuler-2016`, `wiegand-grefe-plass-christl-2025`. Die ID darf später **nicht mehr verändert** werden, weil sie an mehreren Stellen referenziert wird (`sourceIds[]` in evidenceContent, `LITERATUR_IDS` in evidenceContent).

**`chFocus`.** `true` wenn die Quelle eine Schweizer Primär- oder Hauptquelle ist (Audit-04-Pattern), sonst `false`. Steuert Sortierung und Hervorhebung in der Evidenz-Ansicht. Nicht weglassen.

**`type`.** Eines der erlaubten Werte: `'journal-article'`, `'book'`, `'report'`, `'weblink'`, `'editorial'`. Andere Werte werden im Rendering nicht speziell gewürdigt.

**Wenn die Quelle in der LITERATUR-Anzeige erscheinen soll:** Die ID zusätzlich in `LITERATUR_IDS[]` in `evidenceContent.js` eintragen, in der gewünschten Anzeige-Reihenfolge.

---

## Neue Fachstelle zu `FACHSTELLEN` hinzufügen

Pflicht-Felder: `id`, `name`, `description`, `link`, `tags`. Optional: `audience`, `category`, `official`, `highlight`.

**ID-Konvention.** kebab-case, kein ß. Beispiele: `puk-angehoerigenberatung`, `kjz`, `143-dargebotene-hand`.

**`description`-Länge.** 1-3 Sätze, konkret, ohne Werbe-Sprache. Die Beschreibung erscheint sowohl in der Netzwerk-Suche als auch (bei Einträgen mit `category`) in der Evidenz-Ansicht.

**`tags[]`.** Nur Werte aus der in `networkContent.js` → `NETWORK_FILTERS` deklarierten Enumeration verwenden. Neue Tags müssen **zuerst** in `NETWORK_FILTERS` ergänzt werden, sonst greifen sie beim Filter nicht. Freie Tags werden sichtbar rendern, aber nicht filterbar sein -- das ist eine verlässliche Fehlerquelle.

Aktuell zulässige Tags (Auszug): `Krise`, `24/7`, `kostenlos`, `anonym`, `Zürich`, `mehrsprachig`, `Jugendliche`, `Erwachsene`, `Eltern 0–5`, `Sucht`, `offizielle Stelle`, `Selbsthilfe`, `Entlastung`, `Behörde`, `Klinik`, `National`, `Recht`, `Triage`, `Kindesschutz`, `Kindergruppe`, `Begleitung`, `online`, `Beratung`, `unabhängig`.

**`audience` und `category` setzen**, wenn die Fachstelle in der Evidenz-Ansicht angezeigt werden soll. Dann die ID zusätzlich in `SUPPORT_OFFER_IDS[]` (am Ende von `fachstellenContent.js`) eintragen.

**`official: true`.** Nur bei institutionell verankerten, offiziellen Stellen (PUK, kjz, kantonale Stellen). Steuert die Hervorhebung.

**`highlight`.** Kurzer Badge-Text, typisch „kostenlos · auch ohne PUK-Hospitalisation". Optional, sparsam einsetzen.

---

## Neuen Glossar-Eintrag zu `GLOSSARY_GROUPS` hinzufügen

Pflicht-Felder pro Term: `id`, `term`, `definition`, `practice`.

**ID-Konvention.** kebab-case, swiss-german-tauglich ohne ß, ohne Klammer-Bestandteile. Bei zusammengesetzten Begriffen Bindestriche statt Spaces. Beispiele: `kesb`, `kindeswohlgefaehrdung`, `melderecht-meldepflicht`.

**`term`.** Anzeigeform mit optionaler Klammer-Ergänzung für Abkürzungen (z. B. `'SPF (Sozialpädagogische Familienbegleitung)'`). In die Klammer gehören Abkürzungs-Auflösungen und gesetzliche Verweise (`'Beistandschaft (Art. 308 ZGB)'`). Nicht zur kosmetischen Verlängerung.

**`definition`.** 1-3 Sätze knappe Arbeitsdefinition. Neutral, ohne Bewertung.

**`practice`.** Praxisnahe Einordnung. Typischerweise: Wann der Begriff relevant wird, was bei der Anwendung wichtig ist. Hier darf die Perspektive spürbar sein (beobachtend, nicht moralisierend).

**Cluster-Zuordnung.** Neue Terme in den passenden Cluster (`glossar-sprache`, `glossar-schutz`, `glossar-netzwerk`) einordnen. Bei Unsicherheit: Cluster 1 (Sprache im Kontakt) ist die neutrale Heimat für Begriffe, die in Gesprächen auftauchen.

**Wenn der Term später via `<GlossarLink>` verlinkt werden soll:** die ID merken. Audit 12 hat die Infrastruktur-Ebene gebaut (IDs + Komponente), aber die Fliesstext-Einbettung ist als Follow-up offen.

---

## VIGNETTEN-Stubs ausfüllen

Aktuell ist `fall1` der einzige aktive Vignetten-Eintrag in `learningContent.js`. Die Stubs V2 und V3 stehen als **Block-Kommentare** über dem Array und enthalten die Audit-05-Spezifikationen:

- Zielbild: Gesprächsimpuls-Format (D2) mit mehreren vertretbaren Optionen
- Thematischer Schwerpunkt
- Repräsentationslücke
- Anonymisierungs-Standard: Alters-Range, max. 2 identifizierende Details, Pseudonym mit Initial

**Wenn ein Stub ausgefüllt wird**, das Block-Kommentar-Format entfernen und einen Vignetten-Eintrag analog zu `fall1` anlegen. Pflicht-Felder: `id` (`fall2`, `fall3`), `title`, `description`, `status`, `options[]` mit `{id, label, isCorrect, feedback}`.

**Anonymisierung bleibt verbindlich**, auch beim Ausfüllen. Die Stubs dokumentieren den Anonymisierungs-Standard bewusst, damit er nicht verloren geht.

Das Print-Verhalten der Vignetten-Seite (Audit 11: V1-Hinweis, dass Vignetten nicht druckbar sind) bleibt unabhängig von der Anzahl der aktiven Fälle gültig.

---

## BASE_URL-Pflege

Die Base-URL der Produktions-Installation lebt an **einer einzigen Stelle**: in der `.env`-Datei im Projekt-Root unter dem Schlüssel `VITE_BASE_URL`. Sie wird zur Build-Zeit in vier Verbraucher-Stellen injiziert:

- `src/data/routeMeta.js` liest `import.meta.env.VITE_BASE_URL`
- `index.html` verwendet Vite-native `%VITE_BASE_URL%`-Substitution
- `public/robots.txt` und `public/sitemap.xml` nutzen den Platzhalter `__VITE_BASE_URL__`, der post-Build durch `scripts/replace-env.mjs` ersetzt wird

**Für Staging- oder Preview-Deploys** genügt es, `VITE_BASE_URL` in der Deploy-Umgebung zu setzen (Netlify: Environment Variables). Keine Code-Änderung nötig.

`.env` ist in `.gitignore` eingeschlossen; `.env.example` ist eingecheckt als Template.

---

## Hash-Aliases für Deep-Links

`src/utils/appHelpers.js` normalisiert einige historische oder alternative Hash-Formen auf die kanonischen Tab-Slugs. Grund: frühere Version der Seite nutzte andere Bezeichnungen, externe Links auf die Alt-Form dürfen nicht brechen.

| Alias (Hash-Input) | Kanonische Form | Hintergrund |
|---|---|---|
| `zuerich` | `netzwerk` | Alt-Hash vor der Umbenennung zur deutschsprachigen Section-Bezeichnung |
| `network-map` | `netzwerk-karte` | Englisches Sub-Anchor aus der Wave-2-Iteration |
| `network-directory` | `netzwerk-fachstellen` | Englisches Sub-Anchor aus der Wave-2-Iteration |
| `training` | `vignetten` | Nav-Label heisst „Training"; interner Code-Name bleibt `vignetten`. Alias für nutzerseitige Deep-Links |
| `trainingsfaelle` | `vignetten` | Zweite Nutzer-Lesart desselben Tabs |
| `zaesur` | `evidenz` | Alt-Name aus frühem Konzeptstand |

**Wann entfernen?** Wenn bestätigt ist, dass keine externen Referenzen mehr auf die Alt-Form zeigen (z. B. via Web-Archiv-Check oder 6+ Monate ohne Traffic auf diese Hashes). Bis dahin bleiben die Aliases — sie sind ~20 Zeilen in einem Map-Objekt und kosten nichts.

Auch in `src/utils/useNavigationFocus.js` existiert eine Scroll-Ziel-Liste, die Alias-Hashes als gültige Scroll-Anchor akzeptiert. Beim Entfernen eines Alias auch dort synchron entfernen.

---

## Automatische Link-Checker: bekannte False-Positives

Einige Domains im `sourcesContent.js`- oder `networkContent.js`-Pool blockieren automatische Link-Checker (`lychee`, `markdown-link-check` etc.) mit HTTP 403, obwohl die Links für Nutzer:innen im Browser problemlos funktionieren. Das ist kein Link-Rot.

Bekannte Fälle:

- **PUK Zürich** (`puk.zh.ch`, `psychiatrie.puk.zh.ch`) — Cloudflare-Bot-Challenge. Liefert 403 an User-Agents ohne JavaScript-Ausführung.
- **Selbsthilfe Zürich** (`selbsthilfe-zuerich.ch`) — Bot-Block.

Wenn ein Link-Checker eingeführt wird (siehe Audit 17 Follow-up: GitHub-Action mit `lychee`), diese Domains per Allow-List oder `--exclude`-Pattern ausnehmen. Sonst liefern sie permanent Fehlalarme.

---

## `primaryAudience`-Konvention

Jeder Tab in `TAB_ITEMS` trägt ein `primaryAudience`-Feld mit einem der drei Werte `'fachpersonen'`, `'angehoerige'`, `'beide'`. Das Feld stammt aus Audit 02, dokumentiert die primäre Zielgruppe und wird bei redaktionellen Entscheidungen konsultiert (z. B. Audit 06 Block 5: „Fachbegriff Desorganisation nur in Angehörigen-Texten verwenden").

Das Feld ist bewusst **ohne Runtime-Konsum**. Die Seite rendert es nicht, filtert nicht darauf. Aber: bei neuen Tabs oder Content-Entscheidungen ist der Wert ein hilfreicher Anker.

Neue Tabs: Feld unbedingt setzen, damit die Konvention lebendig bleibt.

---

## Offene redaktionelle Klärungen

Stand bei Abschluss von Audit 12. Diese Punkte sind in den Daten markiert (als `TODO`-Kommentar oder in entsprechenden Bereichen) und warten auf eine redaktionelle Entscheidung.

### Plass & Wiegand-Grefe (2012) — ✓ geklärt

`sourcesContent.js` enthält zwei Einträge für dasselbe Autor:innen-Paar aus demselben Jahr. **Bestätigt: es sind zwei verschiedene Werke** (PR #160, Issue #121 Punkt 2):

- `plass-wiegandgrefe-2012` — Beltz, „Entwicklungsrisiken erkennen und behandeln" (klinisch)
- `plass-wiegandgrefe-2012-kohlhammer` — Kohlhammer, „Ursachen, Folgen und Hilfen" (breiter)

Beide bleiben als eigenständige Einträge erhalten. Der TODO-Kommentar in `sourcesContent.js` ist aufgelöst.

---

## Schema-Änderungen

Wenn in Zukunft ein Schema erweitert werden muss (z. B. ein neues Feld in `Source`, `Fachstelle` oder `GlossaryTerm`):

1. Den JSDoc-Typ oben in der jeweiligen Datei aktualisieren.
2. Alle bestehenden Einträge um das neue Feld ergänzen oder das Feld als optional markieren (`@property {string=} ...`).
3. Prüfen, ob Verbraucher-Code (Sections, Templates) das neue Feld konsumieren soll.
4. Den Leitfaden hier entsprechend ergänzen.

Das JSDoc-Pattern funktioniert, wenn alle neuen Felder konsistent an einer Stelle dokumentiert sind. Halbvolle Typen, die in der Realität nicht alle Felder beschreiben, schaden mehr als sie nützen.
