# P0 Live-Check am 2026-04-11

## Direktaufrufe der zuvor kritischen Routen

- `#toolbox`: Die Live-Seite renderte sichtbar mit Header, Navigation, Notfallzugang und Toolbox-Inhalt. Kein leerer Root im initialen Direktaufruf beobachtet.
- `#grundlagen`: Die Live-Seite renderte ebenfalls mit vollständiger Shell, sichtbarer Navigation und Grundlagen-Inhalt. Kein leerer Root im initialen Direktaufruf beobachtet.

Vorläufige Einordnung: Der frühere P0-Befund "leerer Root bei Direkt-Hash-Aufrufen" ist für diese beiden direkten Live-Prüfungen derzeit **nicht reproduzierbar**.
- `#elearning`: Die Live-Seite renderte mit vollständiger Shell und sichtbarer Sektion. Kein leerer Root beobachtet.
- `#zaesur` (Evidenz): Die Live-Seite renderte mit vollständiger Shell und sichtbarer Sektion. Kein leerer Root beobachtet.

Damit war der frühere P0-Befund bei allen bislang erneut geprüften Direkt-Routen (`#toolbox`, `#grundlagen`, `#elearning`, `#zaesur`) im Live-System nicht reproduzierbar.
Der kritische Notfallpfad blieb im Live-System erreichbar: Der globale Notfallzugang führte in die Toolbox, und der Notfallinhalt war im aktuellen Zustand über den Suchtreffer `Sofort-Schritt 1` nachweisbar. Damit war der frühere P0-Befund "kritische Pfade nicht zuverlässig erreichbar" in dieser Live-Prüfung ebenfalls nicht reproduzierbar.
Zusätzlich wurde die produktive Print-URL `?print=toolbox#toolbox` direkt geprüft. Die extrahierten Inhalte entsprachen der isolierten Toolbox-Arbeitsansicht mit Überschrift "Relational Recovery · Toolbox Arbeitsansicht" sowie den kompakten Druckfeldern für Kurzlage, Triage, Krisenvorsorge und nächste Schritte. Der anschließende Versuch einer weiteren Browser-Abfrage schlug mit einem Page-Dead-Zustand fehl; der zuvor extrahierte Print-Inhalt lag jedoch bereits vor. Damit spricht auch die Live-Print-URL gegen einen weiterhin offenen P0 im Print-Renderpfad.
