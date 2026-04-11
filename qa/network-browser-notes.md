# Browser-QA-Notizen zur Network-Migration

## Stand 2026-04-11

Die korrekte dedizierte Network-Ansicht wird über `#network` geladen. Die frühere Annahme `#netzwerk` war falsch; das Hash-Routing normalisiert auf englische Tab-IDs.

Im ersten sichtbaren Desktop-Viewport wirkt der migrierte Hero-Bereich stabil. Sichtbar und plausibel sind insbesondere:

- der neue Network-Hero mit Statistik-Kacheln,
- die Sprunglinks `Zu den Fachstellen` und `Zur Netzwerkkarte`,
- das Fachstellenverzeichnis mit Filter-Chips und Suchfeld,
- die neue Network-Ansicht mit eigener Seitenstruktur statt monolithischer Altsektion.

Die Markdown-Extraktion bestätigt zudem, dass die neue Netzwerkkarte samt Linsen, Zählkarten und nachgelagerten Beschreibungskarten inhaltlich gerendert wird.

## Desktop-Prüfung: Directory-Bereich

Nach zwei Scroll-Schritten zeigt sich das migrierte Fachstellenverzeichnis im Desktop-Viewport als stabiler, zweispaltig organisierter Einstieg mit separatem Suchfeld rechts. Die neuen Filter-Chips sind lesbar, rhythmisch konsistent und klar vom Kartenraster getrennt.

Im Kartenraster bleiben die Fachstellenkarten sauber ausgerichtet. Tags, Titel, Copy und CTA-Zeilen wirken nicht kollabiert; es sind bislang keine Überläufe oder gebrochenen Kartenhöhen sichtbar. Der nächste Prüfschritt ist die eigentliche Netzwerkkarte weiter unten auf der Seite.

## Desktop-Prüfung: Übergang zur Arbeitskarte

Am Ende des Fachstellenrasters bleibt der Layout-Abschluss ruhig und ohne harte Brüche. Direkt darunter beginnt die Arbeitskarten-Sektion mit eigenständiger Einleitung und separater Einordnungsbox; der vertikale Übergang zwischen Directory und Kartenbereich wirkt sauber.

## Desktop-Prüfung: sichtbare Netzwerkkarte

Die migrierte Netzwerkkarte ist im Desktop-Viewport nun direkt sichtbar. Positiv auffällig sind:

- die Linsen-Umschalter oberhalb der Auswertungskarten,
- die klare Trennung zwischen Kartenbühne links, Lesart-/Kennzahlenbereich mittig und Leitfragenblock rechts,
- eine insgesamt ruhige Hierarchie ohne kollidierende Ränder oder abgeschnittene Inhalte.

Im sichtbaren Zustand scheint insbesondere die Desktop-Variante der Kartenbühne stabil zu rendern. Die Knotenbeschriftungen bleiben lesbar, und die Metrik-Karten für Privat, Alltag, Formal und Lücken schließen bündig an den Kartenbereich an.

## Mobile-375-Prüfung: Hero und Directory

Die automatisierte Mobile-Prüfung lief mit einem 375px-Viewport ohne horizontalen Overflow durch. Im Hero-Bereich bleibt die Typografie innerhalb der Kartenbreite, die obere Hinweisleiste ist vollständig lesbar, und der Einstieg in die Network-Seite wirkt trotz dichter Copy noch stabil.

Im Fachstellenverzeichnis erscheinen die Karten im mobilen Einzelspaltenfluss sauber gestapelt. Tags, Titel, Beschreibungstexte und CTA-Flächen bleiben sichtbar; die Buttons "Webseite öffnen" sind groß genug und nicht abgeschnitten. Aus dem automatisierten Interaktionstest ergab sich zudem, dass die Filterung von 16 sichtbaren Treffern auf 5 Treffer reagiert und die Suche nach "147" genau einen passenden Treffer ausgibt.

## Mobile-375-Prüfung: Netzwerkkarte

Die mobile Kartenvariante bleibt im 375px-Viewport stabil und ohne horizontalen Overflow. Die Linsen werden als klar getrennte, vollbreite Buttons untereinander dargestellt; der aktive Zustand von "Fachstellen" ist farblich erkennbar. In der sichtbaren Kartenansicht bleiben Zentrum, mindestens ein Fachstellen-Knoten sowie die Karte "Aktive Lesart" gleichzeitig verständlich lesbar.

Die nachgelagerte Auswertungszone mit Kennzahlenkarten zu Privat, Alltag, Formal und Lücken bleibt ebenfalls im mobilen Einzelspalten-/Zweispaltenfluss konsistent. Typografische Hierarchie, Innenabstände und Kartenränder wirken insgesamt intakt; es zeigen sich in den geprüften Zuständen keine abgeschnittenen Container oder überlaufenden Texte.

## Deep-Link- und externe Link-QA

Die direkte Vorschau-URL mit `#network` lädt die Network-Seite korrekt; Fachstellenverzeichnis und Netzwerkkarte sind im DOM vorhanden. Die internen Hero-Aktionen mit den Zielen `#network-map` und `#network-directory` sind in der aktuellen App-Logik jedoch **keine stabilen Deep-Links**: Nach dem Klick auf `#network-map` springt die Anwendung auf `#home` zurück, und sowohl Verzeichnis als auch Karte verschwinden aus dem DOM. Auch ein direkter Aufruf von `/#network-map` oder `/#network-directory` landet faktisch auf der Home-Ansicht statt auf den gewünschten Network-Abschnitten.

Für ausgewählte externe Fachstellen-Links ergab die technische Prüfung ein gemischtes, aber aus Nutzersicht überwiegend positives Bild. `https://www.aerztefon.ch/`, `https://www.147.ch/de/beratung/dein-kontakt-zu-uns/` und `https://www.selbsthilfezuerich.ch/shzh/de.html` antworten im HTTP-Test mit Status 200. Die PUK-Zielseite `https://www.pukzh.ch/patienten-angehoerige/informationen-fuer-angehoerige/` liefert im automatisierten HTTP-Abruf zwar 403, lädt im realen Browser jedoch regulär und zeigt die erwartete Inhaltsseite „Informationen für Angehörige“. Das spricht für Bot-/Anti-Scraping-Schutz auf HTTP-Ebene, nicht für einen nutzerseitig defekten Link.

## Re-QA nach Hash-/Anchor-Fix

Die Live-Vorschau mit direktem Aufruf von `#network-map` lädt nun nicht mehr auf der Home-Ansicht, sondern direkt auf dem **Network-Tab**. Im initialen Browserzustand sind bereits die Hero-Links, Filter, Suche und die Karten-Linsen sichtbar, was zeigt, dass die Network-Seite selbst korrekt geöffnet wird.

Der anschließende Klick auf **„Zur Netzwerkkarte“** funktioniert nun als In-Page-Navigation: Die Ansicht springt in den Kartenabschnitt, der Browser verbleibt auf `#network-map`, und die Netzwerkkarte mit Linsenleiste sowie den zugehörigen Leitfragen ist sichtbar. Damit ist das zuvor beobachtete Zurückfallen auf `#home` im Live-Browser behoben.

Ergänzend wurde `#network-directory` direkt in der Live-Vorschau geöffnet. Die Anwendung bleibt dabei auf dem **Network-Tab** und landet im Bereich des Fachstellenverzeichnisses; Suche, Filterchips und Karten mit externen Links sind unmittelbar sichtbar. Damit funktioniert der Abschnittsanker für das Directory als echter Deep-Link.

Auch `#network` wurde nach dem Fix erneut geprüft. Der Basishash öffnet weiterhin zuverlässig den **Network-Tab** selbst und kollidiert nicht mit der neuen Abschnittsanker-Logik. Die Korrektur erhält damit das bisherige Tab-Verhalten und erweitert es um stabile Abschnittsziele.
