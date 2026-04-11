# QA-Bericht: Mobile- und Deep-Link-Prüfung der Network-Seite

**Autor:** Manus AI  
**Datum:** 11.04.2026

Die gezielte Nachprüfung der migrierten **Network-Seite** zeigt insgesamt ein solides mobiles Fundament im **375px-Viewport**, aber zugleich einen klaren Funktionsfehler bei den derzeitigen **internen Deep-Links**. Die mobile Darstellung des Heroes, des Fachstellenverzeichnisses und der Netzwerkkarte bleibt in den geprüften Zuständen lesbar und ohne auffälligen horizontalen Overflow. Filter, Suche und Karten-Linsen erscheinen in einer für kleine Viewports konsistenten, vertikal gut bedienbaren Struktur.[1] [2]

Kritisch ist dagegen die Verlinkungslogik der internen Sprungziele. Der direkte Einstieg über `#network` funktioniert, aber die Hero-Ziele `#network-map` und `#network-directory` sind mit der aktuellen Hash-Normalisierung nicht als belastbare Deep-Links nutzbar. Sowohl der Klick auf `#network-map` als auch der direkte Aufruf von `/#network-map` oder `/#network-directory` führen faktisch zurück in die Home-Ansicht, weil unbekannte Hashes auf `home` normalisiert werden.[3] [4]

| Prüfbereich | Ergebnis | Einordnung |
|---|---|---|
| Mobile 375px: Hero | Bestanden | Typografie, CTA-Zone und Grundlayout bleiben stabil. |
| Mobile 375px: Verzeichnis | Bestanden | Suche, Filter und Kartenfluss bleiben ohne sichtbaren Overflow nutzbar. |
| Mobile 375px: Netzwerkkarte | Bestanden | Mobile Kartenvariante und Linsen-Umschaltung bleiben verständlich. |
| Deep-Link `#network` | Bestanden | Network-Seite lädt direkt mit Verzeichnis und Karte im DOM. |
| Deep-Link `#network-map` | Nicht bestanden | Führt auf Home statt auf den Kartenabschnitt. |
| Deep-Link `#network-directory` | Nicht bestanden | Führt auf Home statt auf den Verzeichnisabschnitt. |
| Externe Fachstellen-Links | Überwiegend bestanden | Drei geprüfte Links liefern HTTP 200; ein PUK-Link ist im Browser erreichbar, aber per automatisiertem HTTP-Abruf blockiert. |

## Mobile 375px

Die mobile Prüfung bestätigt, dass die Migration des Seitentyps für den kleinen Viewport gestalterisch tragfähig ist. Im Hero bleibt die inhaltliche Hierarchie erhalten; im Verzeichnis wirken Suchfeld, Filterzustände und Trefferkarten konsistent gestapelt. Auch in der mobilen Netzwerkkarte bleibt die Umschaltung der Linsen klar erfassbar. Der aktive Zustand von **„Fachstellen“** ist unterscheidbar, und die sichtbaren Karten- sowie Auswertungsblöcke wirken in den erzeugten Artefakten weder abgeschnitten noch horizontal überdehnt.[1] [2]

Im Ergebnis spricht die 375px-Prüfung dafür, dass die **visuelle Migration** dieses Seitentyps erfolgreich ist. Aus QA-Sicht bleibt jedoch sinnvoll, die Interaktionsflächen zusätzlich noch auf realen iOS-Geräten stichprobenartig gegenzuprüfen, weil die aktuelle Prüfung auf Headless-/Browser-Artefakten beruht und keine echte Touch-Eingabe emuliert.[1]

## Deep-Link-Verhalten

Die App unterstützt aktuell einen stabilen Direkteinstieg über `#network`. Dieser Zustand lädt die gewünschte Seite korrekt, und sowohl `network-directory` als auch `network-map` sind vorhanden. Die weiterführenden Sprungziele innerhalb der Network-Seite verhalten sich jedoch nicht wie echte Abschnitts-Deep-Links.[3]

Die Ursache liegt in der Hash-Verarbeitung der App. `normalizeHashToTab()` akzeptiert nur bekannte Tab-IDs beziehungsweise definierte Aliaswerte; unbekannte Hashes fallen auf `home` zurück. Gleichzeitig reagiert der globale `hashchange`-Handler auf jeden Hashwechsel und setzt den aktiven Tab anhand genau dieser Normalisierung. Dadurch kippt ein Hash wie `#network-map` oder `#network-directory` beim Klick aus dem Hero oder beim direkten URL-Aufruf in die Home-Ansicht zurück.[3] [4]

> `return TAB_ITEMS.some((item) => item.id === aliased) ? aliased : 'home';`  
> — `src/utils/appHelpers.js`[3]

> `const nextTab = normalizeHashToTab(window.location.hash); ... setActiveTab((prev) => (prev === nextTab ? prev : nextTab));`  
> — `src/App.jsx`[4]

| Deep-Link-Szenario | Beobachtetes Ergebnis | Bewertung |
|---|---|---|
| `/#network` | Network-Seite lädt korrekt | Bestanden |
| Klick auf Hero-Link `#network-map` | Hash endet bei `#home`, Network-DOM verschwindet | Fehler |
| Direkter Aufruf `/#network-map` | Home-Ansicht statt Kartenabschnitt | Fehler |
| Direkter Aufruf `/#network-directory` | Home-Ansicht statt Verzeichnisabschnitt | Fehler |

## Externe Fachstellen-Links

Die geprüften externen Zielseiten wirken insgesamt nutzbar. Für **AERZTEFON**, **147** und **Selbsthilfe Zürich** ergab der technische Abruf einen HTTP-Status **200**. Die PUK-Zielseite „Informationen für Angehörige“ reagiert im automatisierten HTTP-Test mit **403**, lädt jedoch im normalen Browser sichtbar korrekt und zeigt die erwartete Inhaltsseite. Das deutet auf eine Schutzmaßnahme gegen automatisierte Requests hin, nicht auf einen für Endnutzer defekten Ziel-Link.[5] [6]

| Geprüfter Link | Technischer Befund | Nutzerbefund | Bewertung |
|---|---|---|---|
| `https://www.aerztefon.ch/` | HTTP 200 | unauffällig | Bestanden |
| `https://www.147.ch/de/beratung/dein-kontakt-zu-uns/` | HTTP 200 | unauffällig | Bestanden |
| `https://www.selbsthilfezuerich.ch/shzh/de.html` | HTTP 200 | unauffällig | Bestanden |
| `https://www.pukzh.ch/patienten-angehoerige/informationen-fuer-angehoerige/` | HTTP 403 im Bot-Abruf | lädt im Browser korrekt | Nutzerseitig bestanden, technisch auffällig |

## Empfehlung

Der **nächste fachlich sinnvolle Schritt** ist keine weitere visuelle Migration, sondern eine **gezielte Korrektur der Hash-/Anchor-Logik** der Network-Seite. Ziel sollte sein, dass `#network` weiterhin den Tab öffnet, während Abschnittsziele wie `#network-directory` und `#network-map` entweder als zulässige Deep-Links behandelt oder nach dem Tab-Wechsel sauber per In-Page-Scroll aufgelöst werden. Erst danach ist die Network-Seite aus Navigationssicht wirklich produktionsreif.[3] [4]

## Referenzen

[1]: file:///home/ubuntu/rr-live-fix/qa/mobile-artifacts/mobile-network-qa-result.json "Automatisierte Mobile-375-QA-Ergebnisse"
[2]: file:///home/ubuntu/rr-live-fix/qa/network-browser-notes.md "Konsolidierte Browser- und Mobile-QA-Notizen"
[3]: file:///home/ubuntu/rr-live-fix/src/utils/appHelpers.js "Hash-Normalisierung in appHelpers.js"
[4]: file:///home/ubuntu/rr-live-fix/src/App.jsx "Hashchange-Handling in App.jsx"
[5]: file:///home/ubuntu/rr-live-fix/qa/link-check-results.txt "Externe Link-Checks per HTTP"
[6]: https://www.pukzh.ch/patienten-angehoerige/informationen-fuer-angehoerige/ "Informationen für Angehörige - Psychiatrische Universitätsklinik Zürich"
