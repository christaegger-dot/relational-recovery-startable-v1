# Audit 03 -- Juristische Validierung

Dieses Dokument ist die Übergabe an die menschliche juristische Validierung. Es enthält alle Stellen und Lücken, die vor einer Veröffentlichung von einer Rechtsberatung geprüft werden müssen.

---

## Teil A: Fragwürdige Stellen im bestehenden Content

### J1: "SPF (sorgerechtswahrend)"

**Aktueller Stand:**
`"Installation einer SPF (sorgerechtswahrend)"` -- learningContent.js, VIGNETTEN[0].options[1].label. Wird als korrekte Antwort in Vignette 1 (Depression) präsentiert.

**Was fragwürdig ist:**
- "SPF" wird als Abkürzung nicht aufgelöst (Sozialpädagogische Familienbegleitung)
- "Sorgerechtswahrend" ist kein juristischer Terminus des Schweizer Rechts
- Die Formulierung suggeriert, es gäbe auch "nicht-sorgerechtswahrende" Alternativen auf derselben Stufe

**Konkrete Frage an die Rechtsberatung:**
1. Ist die Bezeichnung "sorgerechtswahrend" für eine SPF juristisch korrekt, oder sollte stattdessen "freiwillige Massnahme ohne KESB-Beteiligung" o.ä. verwendet werden?
2. Kann eine SPF auch von der KESB angeordnet werden (Art. 307 Abs. 3 ZGB), und wenn ja, wie ändert das die Einordnung?
3. Wie sollte die Option in der Vignette korrekt benannt werden?

**Empfohlene Prüfstelle:** PUK-Rechtsdienst oder kjz Kanton Zürich.

**Outline für die Antwort:** Korrekter Fachterminus für SPF im Schweizer Kontext, Abgrenzung freiwillig vs. angeordnet, empfohlene Formulierung für die Vignetten-Option.

---

### J2: Art. 314c ZGB -- Anwendungsbereich für Klinikmitarbeitende

**Aktueller Stand:**
`"Gefährdungsmeldung an die KESB (Melderecht nach Art. 314c ZGB)"` -- learningContent.js, VIGNETTEN[1].options[0].label. Wird als korrekte Antwort in Vignette 2 (Psychose) präsentiert.

**Was fragwürdig ist:**
- Art. 314c Abs. 1 ZGB: Melderecht für Personen in amtlicher Tätigkeit
- Art. 314c Abs. 2 ZGB: Melderecht für Fachpersonen Medizin, Psychologie, Pflege, Betreuung, Erziehung, Bildung, Sozialberatung, Religion, Sport
- Art. 314d ZGB: **Meldepflicht** für bestimmte Fachpersonen (kantonale Regelung möglich)
- Die Vignette benennt nur "Melderecht nach Art. 314c" -- die Frage ist, ob für Klinikmitarbeitende in dieser Situation nicht Art. 314d (Meldepflicht) greift

**Konkrete Frage an die Rechtsberatung:**
1. Löst die Fallsituation (stationärer Psychiatrieaufenthalt eines Elternteils, Kind seit 24h ohne Nahrung wegen wahnhafter Befürchtungen) für die involvierten Fachpersonen ein Melderecht (Art. 314c) oder eine Meldepflicht (Art. 314d) aus?
2. Gilt im Kanton Zürich für Klinikmitarbeitende der PUK eine Meldepflicht nach kantonalem Recht?
3. Sollte die Vignette zwischen Melderecht und Meldepflicht differenzieren?

**Empfohlene Prüfstelle:** PUK-Rechtsdienst (kennt die internen Abläufe und kantonalen Regelungen).

**Outline für die Antwort:** Korrekte Rechtsgrundlage für PUK-Mitarbeitende, kantonale Besonderheiten ZH, empfohlene Formulierung für die Vignetten-Option.

---

### J3: Art. 314c als einzige Rechtsgrundlage im Projekt

**Aktueller Stand:**
`"Art. 314c ZGB beschreibt dabei das Melderecht, nicht die eigentliche Schutzmassnahme."` -- learningContent.js, VIGNETTEN[1].options[0].feedback.

**Was fragwürdig ist:**
- Die Aussage ist für sich korrekt
- Aber sie ist die **einzige** Rechtsgrundlage im gesamten Projekt
- Art. 307-310 (die eigentlichen Massnahmen) fehlen komplett
- Das erzeugt den Eindruck, Art. 314c sei die zentrale Rechtsgrundlage im Kindesschutz

**Konkrete Frage an die Rechtsberatung:**
1. Soll das Vignetten-Feedback um einen kurzen Hinweis auf die Stufenfolge Art. 307-310 ergänzt werden?
2. Wäre eine separate Übersicht "Was passiert nach einer Meldung?" empfehlenswert, und wenn ja, was muss sie zwingend enthalten?
3. Wie kann die Stufenfolge korrekt und gleichzeitig nicht bedrohlich dargestellt werden?

**Empfohlene Prüfstelle:** PUK-Rechtsdienst oder Anwält:in Familienrecht ZH.

**Outline für die Antwort:** Empfehlung zur Darstellung der Stufenfolge, Minimalanforderungen an die inhaltliche Korrektheit, juristische Validierung der Stub-Texte für L1.

---

## Teil B: Inhaltliche Lücken, die juristische Validierung brauchen

### L1: Stufenfolge der Massnahmen (Art. 307-310 ZGB)

**Vorgesehener Ort:** toolboxContent.js, neues Export `CHILD_PROTECTION_MEASURES_STUB`

**Inhaltliches Outline (Stichpunkte):**
1. Ermahnung und Weisung (Art. 307 Abs. 3) -- KESB kann Eltern ermahnen oder Weisungen erteilen (z.B. Erziehungsberatung). Sorgerecht bleibt.
2. Beistandschaft (Art. 308) -- Häufigste Massnahme. Ein Beistand unterstützt in bestimmten Bereichen. Sorgerecht bleibt bei Eltern.
3. Aufhebung Aufenthaltsbestimmungsrecht (Art. 310) -- Kind wird fremdplatziert, Eltern behalten Sorgerecht.
4. Sorgerechtsentzug (Art. 311/312) -- Schwerste Massnahme, nur bei Aussichtslosigkeit. In der Praxis selten.

**Relevante Quellen:** ZGB Art. 307, 308, 310, 311, 312

**Fragen an die Rechtsberatung:**
- Ist diese Stufenfolge korrekt und vollständig?
- Stimmt die Aussage "häufigste Massnahme" für Beistandschaft (empirisch)?
- Welche Nuancen fehlen, die für betroffene Eltern relevant wären?
- Kann die Darstellung so vereinfacht werden, oder braucht es Einschränkungen?

**Geschätzter Wortumfang:** ~150-200 Wörter

---

### L2: Beistandschaft als unterstützende (nicht punitive) Massnahme

**Vorgesehener Ort:** glossaryContent.js, neuer Glossareintrag + toolboxContent.js, Ergänzung CHILD_PROTECTION_THRESHOLDS

**Inhaltliches Outline:**
- Definition: Erziehungsbeistandschaft (Art. 308 ZGB) als häufigste KESB-Massnahme
- Kern: Ein Beistand unterstützt die Familie in bestimmten Bereichen. Das Sorgerecht bleibt bei den Eltern.
- Abgrenzung: Beistandschaft ist keine Bestrafung und kein Vorzeichen für Fremdplatzierung
- Praxisbezug: Was macht ein Beistand konkret? (Beratung, Begleitung, Vermittlung)

**Relevante Quellen:** ZGB Art. 308

**Fragen an die Rechtsberatung:**
- Ist die Darstellung korrekt, dass das Sorgerecht bei einer Beistandschaft unberührt bleibt?
- Gibt es Varianten der Beistandschaft (Erziehungsbeistandschaft, Vertretungsbeistandschaft etc.), die differenziert werden müssen?
- Darf man sagen "häufigste Massnahme", oder braucht es eine Quelle?

**Geschätzter Wortumfang:** ~80 Wörter (Glossar) + 1-2 Sätze (Toolbox)

---

### L3: Rechte der Betroffenen (4 neue FAQ-Fragen)

**Vorgesehener Ort:** toolboxContent.js, Erweiterung RIGHTS_FAQ

**Inhaltliches Outline:**

**FAQ: "Kann ich mich selbst an die KESB wenden?"**
- Ja, Selbstmeldung ist möglich und wird als präventive Option genutzt
- Die KESB prüft dann, ob und welche Unterstützung sinnvoll ist
- Quelle: ZGB Art. 314 Abs. 1 (Offizialmaxime), allgemeine Verfahrensgrundsätze

**FAQ: "Habe ich Recht auf Akteneinsicht?"**
- Ja, Betroffene haben grundsätzlich Recht auf Einsicht in ihre KESB-Akten
- Quelle: ZGB Art. 449b

**FAQ: "Kann ich gegen einen KESB-Entscheid vorgehen?"**
- Ja, KESB-Entscheide können innert 30 Tagen (kantonale Frist prüfen!) beim zuständigen Gericht angefochten werden
- Quelle: ZGB Art. 450

**FAQ: "Habe ich Anspruch auf Rechtsbeistand?"**
- Bei Bedürftigkeit besteht Anspruch auf unentgeltliche Rechtspflege
- Quelle: BV Art. 29 Abs. 3, kantonale Verfahrensordnung

**Fragen an die Rechtsberatung:**
- Sind die Antwort-Outlines korrekt?
- Stimmt die 30-Tage-Frist für den Kanton Zürich?
- Gibt es Einschränkungen bei der Akteneinsicht, die erwähnt werden müssen?
- Ist die Formulierung "Selbstmeldung" gebräuchlich und korrekt?

**Geschätzter Wortumfang:** ~200 Wörter (4 × ~50 Wörter)

---

## Nächste Schritte

1. Dieses Dokument an die PUK-Rechtsberatung oder eine Familienrechts-Anwältin übergeben
2. Pro Stelle/Lücke die Antwort dokumentieren (kann direkt in dieses Dokument eingetragen werden)
3. Nach Validierung: Stubs in den Daten-Dateien durch validierten Inhalt ersetzen
4. Erneuter Review der Reformulierungen R1-R5 im Licht der juristischen Rückmeldungen
