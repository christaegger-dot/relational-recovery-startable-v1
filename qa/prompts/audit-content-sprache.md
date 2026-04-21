# Audit-Prompt — Content-Qualität + Sprache

**Einsatz:** Vor grösseren Content-Freigaben; wenn neue Tabs/Cluster dazukommen;
nach inhaltlichen Nachträgen.

**Was es findet:** Anrede-Brüche zwischen Audiences, unerklärter Fachjargon,
tote Links, Stigma-Risiken, fehlende Quellentransparenz, Schweiz-Orthografie-
Abweichungen.

**Bauzeit-Hinweis:** Dieser Audit ist das natürliche Werkzeug zur Pflege des
`primaryAudience`-Frameworks (`fachperson` vs. `weitergabe`) aus `CLAUDE.md`.
Mischadressaten innerhalb eines Tabs sind die häufigste Defektklasse.

---

```
# Audit: Content-Qualitaet und Sprache

## Kontext

Du pruefst die Textinhalte des Relational-Recovery-Fachportals auf
sprachliche Qualitaet, Konsistenz und inhaltliche Substanz. Das Projekt
richtet sich an zwei Zielgruppen:

- **Fachpersonen** in Erwachsenenpsychiatrie + Beratung (Tabs: Start,
  Lernmodule, Vignetten, Glossar, Evidenz, Toolbox, Netzwerk).
- **Weitergabe an Patient:innen + Angehoerige** (Tab: Material) — die
  Fachperson haelt das Material in der Hand und gibt es an Betroffene
  weiter.

Die Sprache ist Deutsch mit **Schweizer Orthografie (`ss` statt `ß`,
verbindlich)**. Fachsprachlich warm-professionell, nicht behoerdlich, nicht
klinisch-kalt.

**Entscheidungslogik fuer Audience-Brueche**: siehe `CLAUDE.md`, Abschnitt
"Zielgruppen". Mischadressaten innerhalb eines Tabs sind die haeufigste
Defektklasse (historisches Beispiel: Netzwerk-Tab, Issue #118).

## Constraints

- Arbeitsbranch: der aktuelle Session-Branch.
- Bericht: `qa/audit-<nnn>-content-sprache.md` (naechste freie Nummer ab 15).
- Keine Code-Aenderungen, nur Content-Dateien unter `src/data/`.
- Fachliche Aussagen werden nur auf *Formulierung* geprueft. Inhaltliche
  Korrektheit wird als "zu validieren" markiert, nicht als Fakt behandelt —
  KESB-, Kindesschutz- und medizinische Aussagen brauchen menschliche Freigabe.
- Notfallnummern (144, AERZTEFON, 147) sind unveraenderlich.

## Phase 1 — Inventur (read-only)

### 1.1 Content-Inventar

Alle Content-Module in `src/data/` auflisten:
`appShellContent.js`, `evidenceContent.js`, `fachstellenContent.js`,
`glossaryContent.js`, `learningContent.js`, `materialContent.js`,
`networkContent.js`, `routeMeta.js`, `sourcesContent.js`, `toolboxContent.js`.

Pro Datei: Zeilenzahl, adressierter Tab, adressierte Zielgruppe
(`primaryAudience`-Pflichtfeld aus `TAB_ITEMS`).

### 1.2 Audience-Konsistenz (Pflicht-Check)

Pro Tab die jeweilige Content-Datei nach Anrede-Bruechen durchsuchen:
- Fachperson-Tabs: kein direktes "Du", kein "Dein". Erwartet: Sie,
  unpersoenlich, Passiv, Beobachtungsform ("der/des Betroffenen").
- Weitergabe-Tab (`materialContent.js`): direkte Ansprache an Patient:innen
  oder Angehoerige zulaessig, aber pro Handout eindeutig (nicht mischen
  innerhalb EINES Handouts).
- Cluster im Material-Tab: Jeder Cluster hat `audience: 'angehoerige'` oder
  `'eltern'`. Pruefen, ob Anrede mit dem Cluster-Marker uebereinstimmt.

Jeder Bruch: Quelldatei, Zeile, woertliches Zitat, vorgeschlagene
Umformulierung.

### 1.3 Fachjargon-Audit

Pro Tab Begriffsliste extrahieren (Begriffe, die ohne Erklaerung
verwendet werden). Kreuztabelle:

| Begriff | Tab | Im Glossar? | Adressat versteht ohne Kontext? |
|---|---|---|---|

Spezialfall: Fachbegriffe im Material-Tab sollten immer in Klammern
erklaert werden (z.B. "Parentifizierung (wenn Kinder Erwachsenen-Rollen
uebernehmen)").

### 1.4 Sprachliche Qualitaet

Stichprobe von 5 laengeren Textbloecken pro Tab:
- Durchschnittliche Satzlaenge (Ziel: 10-18 Woerter).
- Passiv-Anteil in Prozent.
- Nominalstil-Dichte (schwere "-ung"-Nominalisierungen).
- Floskel-Dichte ("ganzheitlich", "nachhaltig", "im Sinne von",
  "im Rahmen von").
- Tonalitaet: warm-fachlich vs. klinisch vs. behoerdlich.

### 1.5 Schweizer Orthografie

`grep -r "ß" src/data/` — jeder Treffer ist ein Defekt (ausser Zitaten aus
historischen Quellen, dann explizit markieren).
Weitere CH-Marker: "Velo" statt "Fahrrad", "parkieren" statt "parken" (nur
relevant, wenn solche Begriffe vorkommen).

### 1.6 Quellen-Check

- `src/data/sourcesContent.js` + `src/data/evidenceContent.js`: werden
  Claims mit Quellen belegt?
- Empirische Daten: Quelle nicht aelter als 10 Jahre (Ausnahme: klassische
  Basiswerke, dann markieren).
- Verifizierbare Claims ohne Quelle: flaggen.

### 1.7 Link-Rot

Alle externen Links extrahieren (`http://`/`https://`) aus den
Content-Modulen. Status pruefen (HEAD-Request in einem kleinen Node-Script
oder mit `curl -s -I -o /dev/null -w "%{http_code}" <url>`). Fuer das
Relational-Recovery-Projekt existiert bereits `qa/link-check-results.txt`
und `qa/link_check_urls.txt` als Pattern — daran anlehnen.

Pro 4xx/5xx: Quelldatei, Link-Text, Ziel-URL, HTTP-Status, Vorschlag.

### 1.8 Stigma- und Sensibilitaets-Check

Suchlisten:
- Stigmatisierende Formulierungen ("leidet an", "ist psychisch krank",
  "die Kranke"). Bevorzugt: "ist betroffen von", "lebt mit".
- KESB/Kindesschutz/Zwangsmassnahmen: emotional neutrale, faktenorientierte
  Sprache. Siehe `qa/juristische-faktenbasis-kindesschutz.md` und
  `qa/audit-03-kesb-sensibilitaet.md` als Referenz.
- Opferperspektive vs. Ressourcenorientierung: wird das Kind nur als
  "Gefaehrdetes" dargestellt oder auch als Akteur mit Bewaeltigungsstrategien?

### 1.9 Gesamtbild

Tabelle:
- Audience-Brueche pro Tab.
- Unerklaerte Fachbegriffe.
- Passiv-Anteil pro Tab (Stichprobe).
- Floskeldichte.
- `ß`-Treffer.
- Fehlende Quellen, veraltete Quellen.
- 4xx/5xx-Links.
- Stigma-Flags.

**STOPP.** Fasse Phase 1 in 5-10 Zeilen zusammen und warte auf Freigabe.

## Phase 2 — Diagnose

Pro Befund: konkreter Aenderungsvorschlag, Schwere, Aufwand. Gruppierung:
- **Sofort-Fix (Formulierung)**: z.B. `ß` → `ss`, Anrede-Bruch umformulieren,
  tote Links ersetzen.
- **Redaktionelles Ticket**: laengere Umformulierungen, fachliche Claims.
- **Fachliche Freigabe noetig**: medizinische/juristische Aussagen.
- **Akzeptiert**: bewusste Stil-Entscheidung.

**STOPP.** Warte auf Freigabe fuer Phase 3.

## Phase 3 — Umsetzung

Pro Aenderung ein Commit. Commit-Pattern: `audit(content): <was>`.
Inhaltliche Substanz bleibt unveraendert — nur Formulierung. Bei Zweifel
in Phase 2-Triage verschieben, nicht hier entscheiden.

## Phase 4 — Verifikation

- `grep -r "ß" src/data/` ist leer.
- Anrede-Stichprobe pro Tab konsistent.
- Link-Check erneut, 0 neue Failures.
- Sprachliche Metriken vorher/nachher im Bericht.
```
