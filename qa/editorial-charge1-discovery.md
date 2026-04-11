# Editorial Charge 1 – Discovery für Phase 1 und 2

## Zielbild

Die erste Editorial-Migrationscharge soll das generische `EditorialPageTemplate` als **saubere Basiskomponente** stabilisieren, ohne bereits weitere Consumer-Typen umfassend umzubauen. Im Fokus stehen daher nur jene Reststellen, die aktuell noch **Tailwind-Utilities**, **Inline-Styles** oder **fehlende semantische Editorial-Primitives** im Template selbst sichtbar machen.

## Lokalisierte Altstellen im `EditorialPageTemplate`

| Datei | Stelle | Befund | Risiko | Empfohlene Systemlösung |
|---|---|---|---|---|
| `src/templates/EditorialPageTemplate.jsx` | `h2` in `ContentSection` | `ui-hero__title` wird mit Inline-Style `fontSize: clamp(1.85rem, 3vw, 3rem)` überschrieben | Titelgrössenlogik liegt im Rendercode statt im System | Bestehende Klasse `ui-section-title` auf Editorial-H2 anwenden |
| `src/templates/EditorialPageTemplate.jsx` | Card-CTA-Wrapper | `div className="mt-5"` für `actionLabel` | Tailwind-Rest im generischen Template | Neue semantische Klasse für Card-CTA-Abstand und Präsentation |
| `src/templates/EditorialPageTemplate.jsx` | Interaktive Cards | `className="text-left transition-transform duration-200 hover:-translate-y-0.5"` im Template | Interaktionsstil bleibt als Utility-String im Template verankert | Neue semantische Editorial-Card-Variante oder Utility-Kapselung |
| `src/templates/EditorialPageTemplate.jsx` | Section-Header-Layout | Mischung aus `ui-hero__title` und editorialem H2-Massstab | Header-Semantik ist korrekt, aber nicht systemisch standardisiert | Editorial-Header konsequent auf `ui-section-title` ausrichten |

## Referenzabgleich mit `HomeLandingTemplate`

`HomeLandingTemplate.jsx` bringt **keine zusätzlichen Template-Altlasten** ein, sondern bestätigt den Bedarf an genau drei wiederverwendbaren Mustern: editorialer Abschnittstitel, card-interne CTA-Präsentation und interaktive Card-Hervorhebung. Die Landingpage nutzt das Template bereits sauber datengetrieben; der Nachzug wird deshalb voraussichtlich vor allem aus einem **Nicht-mehr-Brauchen von Sonderlogik** bestehen, nicht aus zusätzlichen Strukturänderungen.

## Bereits vorhandene Primitive, die direkt genutzt werden können

| Primitive | Quelle | Einschätzung für Charge 1 |
|---|---|---|
| `ui-section-title` | `src/styles/primitives.css` | Bereits passend für Editorial-H2, sollte jetzt im Template statt Inline-Fontsize verwendet werden |
| `ui-section-title--compact` | `src/styles/primitives.css` | Noch nicht zwingend für Charge 1 nötig, aber als bestehende Reserve für spätere Spezialfälle relevant |
| `ui-button-row` | `src/styles/primitives.css` | Bereits geeignet für Section-Actions |
| `ui-card__title`, `ui-card__copy`, `ui-fact-card__meta` | `src/styles/primitives.css` | Solide vorhanden; der fehlende Teil ist vor allem der CTA-Abschluss in Cards |
| `Section` mit `tight`, `compact`, `wide` | `src/components/ui/Section.jsx` | Für die erste Charge ausreichend; neue Section-Spacing-Variante ist aktuell nicht zwingend |

## Empfohlene zusätzliche Editorial-Primitives

| Priorität | Neue oder geschärfte Primitive | Zweck | Warum in Charge 1 sinnvoll |
|---|---|---|---|
| Hoch | `ui-editorial-card__action` | Semantischer Abstand und Abschlussbereich für Card-CTAs | Ersetzt `mt-5` im generischen Template direkt |
| Hoch | `ui-card--editorial-link` | Kapselt Textausrichtung und dezente Hover-Bewegung interaktiver Editorial-Cards | Entfernt den verbliebenen Utility-String aus dem Template |
| Mittel | `ui-section-title` im Editorial-Kontext verbindlich verwenden | Keine neue CSS-Regel nötig, aber neue Systemkonvention | Eliminiert die Inline-H2-Grösse im Template ohne zusätzlichen Sondercode |
| Optional | `ui-editorial-section__header` oder ähnliche Header-Hilfsklasse | Nur falls bei Umsetzung zusätzlicher Header-Abstand auffällt | Für Charge 1 vorerst eher Beobachtung als Muss |

## Fazit für die erste Umsetzungsrunde

Die eigentliche erste Code-Charge kann bewusst klein bleiben. Nach aktuellem Stand sind **nur zwei echte neue CSS-Bausteine** wahrscheinlich erforderlich, während die Überschriftengrösse bereits durch ein vorhandenes Primitive (`ui-section-title`) sauber übernommen werden kann. Eine neue Section-Spacing-Variante ist nach Prüfung der vorhandenen `Section`-API derzeit **nicht erforderlich**.

## Direkte nächste Umsetzung

Die kompakte Umsetzungscharge sollte daher in dieser Reihenfolge erfolgen:

| Reihenfolge | Änderung |
|---|---|
| 1 | `EditorialPageTemplate.jsx`: `ui-hero__title` + Inline-Style auf `ui-hero__title ui-section-title` umstellen |
| 2 | `EditorialPageTemplate.jsx`: `mt-5` durch `ui-editorial-card__action` ersetzen |
| 3 | `EditorialPageTemplate.jsx`: interaktive Card-Utility-Kette durch `ui-card--editorial-link` ersetzen |
| 4 | `src/styles/primitives.css`: die zwei neuen Klassen ergänzen und auf bestehende Motion-/Spacing-Logik abstimmen |
| 5 | `HomeLandingTemplate.jsx`: nach dem Template-Fix nur noch auf unbeabsichtigte Sonderfälle prüfen |
