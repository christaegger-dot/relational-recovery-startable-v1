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

## `primaryAudience`-Konvention

Jeder Tab in `TAB_ITEMS` trägt ein `primaryAudience`-Feld mit einem der drei Werte `'fachpersonen'`, `'angehoerige'`, `'beide'`. Das Feld stammt aus Audit 02, dokumentiert die primäre Zielgruppe und wird bei redaktionellen Entscheidungen konsultiert (z. B. Audit 06 Block 5: „Fachbegriff Desorganisation nur in Angehörigen-Texten verwenden").

Das Feld ist bewusst **ohne Runtime-Konsum**. Die Seite rendert es nicht, filtert nicht darauf. Aber: bei neuen Tabs oder Content-Entscheidungen ist der Wert ein hilfreicher Anker.

Neue Tabs: Feld unbedingt setzen, damit die Konvention lebendig bleibt.

---

## Offene redaktionelle Klärungen

Stand bei Abschluss von Audit 12. Diese Punkte sind in den Daten markiert (als `TODO`-Kommentar oder in entsprechenden Bereichen) und warten auf eine redaktionelle Entscheidung.

### Plass & Wiegand-Grefe (2012)

`sourcesContent.js` enthält aktuell **zwei Einträge** für dasselbe Autor:innen-Paar aus demselben Jahr:

- `plass-wiegandgrefe-2012` -- Beltz-Verlag, Weinheim, Titel „Kinder psychisch kranker Eltern. Entwicklungsrisiken erkennen und behandeln"
- `plass-wiegandgrefe-2012-kohlhammer` -- Kohlhammer-Verlag, Stuttgart, Titel „Ursachen, Folgen und Hilfen für Kinder psychisch Kranker"

Die zwei Einträge stehen temporär, weil beim Audit-12-Konsolidierungs-Schritt unklar war, ob es sich um zwei verschiedene Werke oder um eine redaktionell unterschiedlich zitierte Ausgabe handelt. Beide bleiben erhalten, bis die Auftraggeberin prüft:

1. Handelt es sich um zwei verschiedene Werke? Dann beide behalten, ggf. den Kohlhammer-Eintrag mit einem spezifischeren Titel versehen.
2. Oder ist der Kohlhammer-Band nicht existent (Zitationsfehler in der alten LITERATUR-Liste)? Dann den `plass-wiegandgrefe-2012-kohlhammer`-Eintrag entfernen und die Referenz in `LITERATUR_IDS` auf den Beltz-Eintrag umstellen.

Verortung: `TODO`-Kommentar direkt über beiden Einträgen in `sourcesContent.js`.

---

## Schema-Änderungen

Wenn in Zukunft ein Schema erweitert werden muss (z. B. ein neues Feld in `Source`, `Fachstelle` oder `GlossaryTerm`):

1. Den JSDoc-Typ oben in der jeweiligen Datei aktualisieren.
2. Alle bestehenden Einträge um das neue Feld ergänzen oder das Feld als optional markieren (`@property {string=} ...`).
3. Prüfen, ob Verbraucher-Code (Sections, Templates) das neue Feld konsumieren soll.
4. Den Leitfaden hier entsprechend ergänzen.

Das JSDoc-Pattern funktioniert, wenn alle neuen Felder konsistent an einer Stelle dokumentiert sind. Halbvolle Typen, die in der Realität nicht alle Felder beschreiben, schaden mehr als sie nützen.
