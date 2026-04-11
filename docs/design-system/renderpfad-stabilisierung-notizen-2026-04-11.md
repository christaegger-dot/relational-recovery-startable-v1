## Live-Reproduktion 2026-04-11

Direkter Aufruf von `https://eltern-a.netlify.app/#toolbox` reproduziert erneut eine vollständig blanke Ansicht. Im Browser-Status zeigt sich:

| Feld | Befund |
|---|---|
| Hash | `#toolbox` |
| Titel | `Relational Recovery` |
| `#root` vorhanden | ja |
| `#root.childElementCount` | `0` |
| `header` im DOM | `0` |
| `main` im DOM | `0` |
| `footer` im DOM | `0` |
| `localStorage[rr_app_state_v4]` | vorhanden, formal valide |
| Persistierter `activeTab` | `toolbox` |

Zwischenbefund: Der Hash stimmt mit dem persistierten `activeTab` ueberein. Damit ist eine blosse Hash-Fehlzuordnung als Primaerursache aktuell unwahrscheinlich. Das Muster spricht weiterhin fuer einen fruehen Render-Abbruch oberhalb der eigentlichen Shell-Ausgabe.

## Lokale Produktions-Preview 2026-04-11

Die frische Produktions-Preview auf dem lokal gebauten Stand rendert grundsaetzlich korrekt. Wichtige Befunde:

| Prueffeld | Befund |
|---|---|
| Erste exponierte Preview | temporaer nicht erreichbar, weil `vite preview` wegen belegter Ports automatisch auf `4176` statt `4177` gestartet wurde |
| Tatsaechlich laufende Preview | `http://localhost:4176/` |
| Direktaufruf der exponierten Preview mit `#toolbox` | Shell und Inhalt rendern sichtbar |
| Beobachtete Route nach dem Laden | Browser zeigt `#glossar` statt angeforderter `#toolbox` |

Zwischenbefund: Der Fehler ist nicht einfach ein genereller Produktions-Build-Crash. Die lokale Produktionsausgabe rendert die App-Shell stabil, zeigt aber eine auffaellige Hash-Umlenkung bzw. Initialzustands-Ueberschreibung. Zusammen mit `getInitialAppState()` verdichtet sich der Verdacht, dass persistierter Zustand oder nachgelagerte Hash-Synchronisation den Direktaufruf nicht deterministisch respektiert.

## Kausalkette der aktuellen Eingrenzung

Weitere Reproduktion auf der lokalen Produktions-Preview zeigt:

| Beobachtung | Bedeutung |
|---|---|
| Angeforderte URL war `#toolbox`, tatsaechlich sichtbare Route nach dem Laden jedoch `#glossar` | Der Initialzustand respektiert den Direkt-Hash nicht deterministisch, sondern uebernimmt einen bereits persistierten `activeTab` |
| In der Preview wurde der Chunk `GlossarSection-*.js` geladen | Die lokal gebaute Produktionsausgabe kann Lazy-Chunks korrekt nachladen |
| Die Live-Instanz hatte zuvor einen persistierten `activeTab: toolbox` bei leerem Root | Wenn der persistierte Tab auf einen problematischen Bereich zeigt, kann der Direktaufruf jeder URL in denselben fruehen Fehlerpfad laufen |

Verdichtete Diagnose: `getInitialAppState()` bevorzugt aktuell persistierte Zustandsdaten vor `window.location.hash`. Dadurch wird der gewuenschte Direktaufruf ueberschrieben. Wenn der persistierte Ziel-Tab seinerseits einen Laufzeit- oder Asset-Fehler ausloest, kollabiert die gesamte App ohne Error Boundary zu einem leeren Root. Die naechste Umsetzung sollte daher mindestens den Direkt-Hash priorisieren und den initialen Tab resilient gegen fehlerhafte Persistenz machen.

## Validierung nach Initialzustands-Korrektur

Der Direkt-Hash wird in der lokalen Produktions-Preview nun korrekt respektiert: Der Aufruf `#toolbox` bleibt auf `#toolbox` und wird nicht mehr auf einen persistierten Tab umgebogen. Damit ist der erste Stabilisierungsschritt wirksam.

Gleichzeitig bleibt ein zweiter Fehlerpfad sichtbar:

| Prueffeld | Befund |
|---|---|
| Route in der URL | bleibt auf `#toolbox` |
| Gerenderte Shell | Header und Footer sichtbar |
| Eigentliche Seiteninhalte | Toolbox-Hauptinhalt fehlt weiterhin sichtbar |
| Browser-Konsole | mehrere `404`-Fehler fuer nachgeladene Ressourcen |

Zwischenfazit: Die Initialzustandslogik war ein zentraler Fehlerverstaerker, aber nicht die einzige Ursache. Nach ihrer Korrektur bleibt fuer den konkreten Toolbox-Pfad ein Asset- oder Chunk-Ladeproblem bestehen, das jetzt gezielt als naechster technischer Engpass untersucht werden muss.

## DOM-Diagnose des verbleibenden Toolbox-Fehlers

Die lokale Validierung nach der Initialzustands-Korrektur zeigt fuer `#toolbox` keinen bloss unsichtbaren, sondern einen echten Ausfall des Hauptinhalts.

| Diagnosepunkt | Befund |
|---|---|
| `location.hash` | `#toolbox` |
| `main`-Element | nicht vorhanden |
| `#toolbox-heading` | nicht vorhanden |
| Toolbox-bezogene Textelemente im DOM | keine Treffer |
| Geladene Assets laut Performance | `index`, CSS, `ToolboxSection`, `GlossarSection`, `closingModel`, `circle-check` vorhanden |

Einordnung: Der Direkt-Hash wird jetzt korrekt gehalten und der Toolbox-Chunk wird geladen. Trotzdem rendert die App nach Header/Footer keinen `main`-Bereich. Damit verlagert sich die Ursache vom Initialzustand auf einen spaeteren Renderabbruch in der App-Shell oder innerhalb der Toolbox-Ausgabe selbst.

## Frische Preview auf neuem Port: Validierungsstand

Die Validierung auf einer frisch gestarteten Produktions-Preview ohne Alt-Cache zeigt folgenden Zwischenstand:

| Prueffeld | Befund |
|---|---|
| Aufgerufene Route | `#toolbox` |
| Geladene Haupt-Assets | aktueller Build (`index-GxRcvdLm.js`, `ToolboxSection-DS6O83tl.js`, `closingModel-B-vPD2xC.js`, `circle-check-Cw6TmbE5.js`) |
| Root-Knoten | weiterhin leer (`rootHtmlLength = 0`) |
| Browser-Konsole | kein zusaetzlicher sichtbarer Laufzeitfehler im aktuellen Ausschnitt |
| Sichtbarer Zustand | weiterhin blanke Seite |

Schlussfolgerung: Die vorherige Hash-Stabilisierung greift und die Preview laedt jetzt den aktuellen Build. Der verbleibende Ausfall ist damit kein Cache- oder Stale-Build-Problem mehr, sondern ein echter Initialisierungs- oder Laufzeitabbruch im aktuellen JavaScript-Pfad vor dem Commit in `#root`.

## Validierung nach Hero-Stabilisierung und Cache-Busting

Der Produktions-Build nach der Hero-Anpassung lief erfolgreich durch. Auf derselben frischen Preview war zunächst weiterhin ein leerer `#root` sichtbar; im Browser wurde dabei jedoch noch ein älterer Hauptbundle-Name geladen, der nicht zu `dist/index.html` passte.

Ein erneuter Direktaufruf der Preview mit Cache-Busting-Parameter (`?v=20260411-renderfix#toolbox`) zeigt nun einen vollständig gerenderten Toolbox-Pfad. Sichtbar und interaktiv sind insbesondere Shell, Primärnavigation, Hero, Assessment, Triage-Buttons, Praxisblock-Filter und der nachgelagerte Inhaltsbereich.

| Prüffeld | Befund |
|---|---|
| Route | `#toolbox` bleibt erhalten |
| `#root` | gefüllt, App rendert sichtbar |
| Shell | Header, Navigation und Footer vorhanden |
| Hauptinhalt | Toolbox-Layout wird vollständig angezeigt |
| Wahrscheinlichste Einordnung | vorheriger Blankzustand lokal zuletzt durch veraltetes oder zwischengespeichertes HTML/Asset-Material mitverursacht |

Zwischenfazit: Der Renderpfad ist im aktuellen lokalen Build nach der Hash-Korrektur und der Hero-Härtung grundsätzlich funktionsfähig. Für die Abschlussvalidierung sollten jetzt weitere Direktaufrufe auf mehreren Routen sowie anschließend die Live-Auslieferung geprüft werden.

## Routeübergreifende Direkt-Hash-Validierung auf frischer Preview

Nach der lokalen Stabilisierung wurde die frische Produktions-Preview mit Cache-Busting erneut direkt auf mehrere Kernrouten geöffnet.

| Route | Ergebnis |
|---|---|
| `#toolbox` | rendert vollständig mit Hero, Assessment, Triage und Folgeblöcken |
| `#grundlagen` | rendert vollständig mit Shell, Hero, FAQ-Cluster und Such-/Navigationsbereichen |

Einordnung: Im aktuellen lokalen Build ist der Renderpfad damit nicht nur für die zuvor kritische Toolbox-Route, sondern auch für mindestens eine weitere Sekundärroute stabil reproduzierbar. Der frühere Blankzustand ist auf diesem Stand nicht mehr als persistenter Laufzeitabbruch nachstellbar, sofern die Preview den aktuellen Artefaktstand lädt.
