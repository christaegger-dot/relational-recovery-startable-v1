# Toolbox-Druckfix – Verifikation vom 2026-04-11

## Ausgangslage

Auf dem iPhone wurde im iOS-Druckdialog weiterhin die normale Toolbox-Screen-Ansicht statt einer isolierten Arbeitsansicht angezeigt. Der Fehler war zunächst doppelt gelagert: Erstens war der zuvor geprüfte Netlify-Live-Stand noch nicht auf dem korrigierten Code. Zweitens zeigte die nachgezogene isolierte Drucklogik lokal zunächst auf einen falschen DOM-Selektor.

## Technische Ursache

| Ebene | Befund | Wirkung |
|---|---|---|
| Live-Auslieferung | `eltern-a.netlify.app` lieferte zunächst noch den älteren Stand aus. | iPhone-Tests konnten den Fix noch nicht sehen. |
| Druckvorlage | Für die Toolbox wurde eine dedizierte `printView` ergänzt. | Der Druckpfad kann nun eine echte Arbeitsansicht statt der Screen-Oberfläche rendern. |
| Isolierter Druckpfad | Der zuerst verwendete Selektor `#toolbox-materials .print-only` griff nicht, weil die Print-Ansicht tatsächlich unter `#toolbox-next-steps .print-only` gerendert wird. | Die isolierte Druckansicht wurde lokal zunächst nicht gefunden. |

## Implementierter Fix

Der Fix besteht jetzt aus drei abgestimmten Teilen. In `src/sections/ToolboxSection.jsx` wurde eine dedizierte `printView` für die Arbeitsansicht ergänzt. In `src/App.jsx` wurde der direkte Druckpfad auf eine isolierte Druckansicht umgestellt. Anschliessend wurde der Selektor auf den tatsächlich gerenderten Knoten `#toolbox-next-steps .print-only` korrigiert.

## Technische Verifikation

| Prüfschritt | Ergebnis |
|---|---|
| Produktionsbuild lokal | Erfolgreich gebaut. |
| DOM-Prüfung lokal | Genau ein `.print-only`-Knoten vorhanden. |
| Container-Prüfung lokal | Die Druckansicht hängt unter `section#toolbox-next-steps`. |
| Skriptgesteuerter Drucktest lokal | Das erzeugte Druckfenster enthält die Überschrift `Relational Recovery · Toolbox Arbeitsansicht`; Hero und Screen-Buttons sind darin nicht enthalten. |
| Remote-Push | Finaler Fix nach `main` gepusht, Commit `32d22af`. |
| Live-HTTP-Prüfung | Netlify liefert inzwischen `assets/index-jloVWx8T.js` und `assets/index-reRnyrTb.css` aus; damit entspricht der Live-Stand dem final geprüften Build. |

## Aktueller Bewertungsstand

Der Fix ist lokal technisch belastbar verifiziert und liegt nun auf `main`. Zusätzlich bestätigt die HTTP-Prüfung, dass der Live-Stand inzwischen die neuen Asset-Dateien ausliefert. Der verbleibende offene Punkt ist ausschliesslich die reale Endprüfung im iPhone-Druckdialog nach dem ausgerollten Deploy.

## Nächster Nutzercheck

Bitte den iPhone-Test noch einmal direkt auf dem aktuellen Live-Stand durchführen. Erwarteter Zielzustand: Nach `Arbeitsansicht drucken` darf im iOS-Druckdialog nicht mehr die normale Toolbox-Seite erscheinen, sondern nur noch die isolierte Arbeitsansicht mit Formular-/Protokollcharakter.
