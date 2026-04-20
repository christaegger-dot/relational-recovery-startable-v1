import { useCallback, useMemo } from 'react';
import { SAFETY_PLAN_TEMPLATE_FIELDS } from '../data/toolboxContent';
import { downloadTextFile } from './appHelpers';

export default function useDownloadHandlers(scoreRisk) {
  const handleDownloadCrisisPlan = useCallback(() => {
    const sections = SAFETY_PLAN_TEMPLATE_FIELDS.map(
      (field, index) => `${index + 1}. ${field.title}
Leitfrage: ${field.hint}
-
-
-
`
    ).join('\n');

    const template = `Krisenplan – Eltern im Beratungskontext

Bearbeitbare Textvorlage fuer Gespraech, Fallarbeit oder gemeinsame Krisenvorsorge.
Aktueller Assessment-Score: ${scoreRisk}
Hinweis: Diese Vorlage speichert nichts automatisch und ersetzt keine fachliche Absprache.

${sections}
Naechster gemeinsamer Schritt
Leitfrage: Was wird bis zum naechsten Kontakt konkret vereinbart?
-
-
`;
    downloadTextFile('krisenplan-vorlage.txt', template);
  }, [scoreRisk]);

  const handleDownloadConversationGuide = useCallback(() => {
    const template = `Gesprächsleitfaden für Fachpersonen

Einsatz: Erstgespräch, Verlaufsgespräch, Supervision
Aktueller Assessment-Score: ${scoreRisk}
Hinweis: Kurz halten, beobachtbar bleiben, nächste Schritte konkretisieren.

1. Elternrolle und Alltag
- Wie erleben Sie Ihre Rolle als Mutter oder Vater im Moment?
- Was gelingt im Alltag noch verlässlich?
- Wo ist es derzeit am fragilsten?

2. Versorgung und Sicherheit der Kinder
- Wer betreut die Kinder aktuell?
- Was ist heute und bis morgen verlässlich gesichert?
- Gibt es Anzeichen für Überforderung, Desorganisation oder Versorgungslücken?

3. Kindliche Wahrnehmung
- Was wissen die Kinder bereits?
- Worüber wurde offen gesprochen, worüber noch nicht?
- Gibt es Sorgen, Missverständnisse oder stille Mitverantwortung?

4. Netzwerk und Mitwissende
- Wer weiss Bescheid?
- Wer kann kurzfristig mittragen?
- Welche Fachstelle oder Bezugsperson sollte als Nächstes einbezogen werden?

5. Krisenvorsorge
- Gibt es Warnzeichen, eine Kontaktkette und einen Kinder-Schutzteil?
- Was sollte vor der nächsten Belastungsspitze schriftlich geklärt werden?

6. Nächster Schritt
- Was wird heute vereinbart?
- Wer macht was bis wann?
- Wann wird erneut Kontakt aufgenommen?
`;

    downloadTextFile('gespraechsleitfaden-fachpersonen.txt', template);
  }, [scoreRisk]);

  const handleDownloadNetworkMap = useCallback(() => {
    const template = `Netzwerkkarte - Arbeitsvorlage

Ziel: Tragende Kontakte, Fachstellen und Versorgungslücken sichtbar machen.

1. Kernfamilie
- Wer gehört zum engsten Familiensystem?
- Wer lebt im selben Haushalt?

2. Privates Umfeld
- Verwandte:
- Freundinnen/Freunde:
- Nachbarschaft:
- Weitere vertraute Personen:

3. Alltag und Betreuung
- Kita / Schule:
- Hort / Tagesstruktur:
- Freizeit / Vereine:
- Wer kann Übergaben oder kurzfristige Betreuung übernehmen?

4. Fachstellen
- Hausärztin / Hausarzt:
- Behandlungsteam:
- kjz / Familienberatung:
- Weitere Fachstellen:

5. Mitwissende
- Wer weiss über die aktuelle Belastung Bescheid?
- Wer darf im Krisenfall kontaktiert werden?

6. Versorgungslücken
- Wo fehlt aktuell Unterstützung?
- Welche Zeiten, Aufgaben oder Übergänge sind ungenügend abgesichert?

7. Nächster Schritt
- Welche Person oder Stelle wird als Nächstes konkret angefragt?
`;

    downloadTextFile('netzwerkkarte-vorlage.txt', template);
  }, []);

  const handleDownloadPsychoeducationGuide = useCallback(() => {
    const template = `Mit Kindern über die psychische Erkrankung eines Elternteils sprechen

Kurzhilfe für Fachpersonen

1. Vorbereitung
- Mit den Eltern klären, was das Kind bereits weiss.
- Ziele des Gesprächs festlegen: entlasten, orientieren, Missverständnisse reduzieren.
- Sprache einfach, konkret und altersgerecht halten.

2. Was im Gespräch meist hilft
- Die Erkrankung benennen, ohne das Kind zu überfordern.
- Klar sagen: Das Kind ist nicht schuld.
- Erklären, was sich im Alltag ändern kann und was gleich bleibt.
- Fragen zulassen und Unsicherheit aushalten.

3. Was eher vermieden werden sollte
- Zu viele Fachbegriffe
- Beschwichtigungen, die das Erleben des Kindes entwerten
- Loyalitätsdruck oder implizite Geheimhaltungsaufträge
- Übertragung von Erwachsenenverantwortung auf das Kind

4. Leitfragen
- Was macht dem Kind im Moment am meisten Sorgen?
- Was muss das Kind verstehen, um den Alltag besser einordnen zu können?
- Wer kann nach dem Gespräch weitere Fragen auffangen?

5. Abschluss
- Eine klare Kernaussage formulieren
- Nächsten Gesprächsanlass vereinbaren
- Mit Eltern und Netzwerk klären, wie offen weiter gesprochen werden soll
`;

    downloadTextFile('psychoedukation-mit-kindern-sprechen.txt', template);
  }, []);

  const handleDownloadProtectionChecklist = useCallback(() => {
    const template = `Schutzfaktoren-Check und Versorgungsübersicht

Einsatz: Fallreflexion, Verlaufsbeobachtung, Supervision
Aktueller Assessment-Score: ${scoreRisk}

1. Verlässliche Bezugspersonen
- Gibt es mindestens eine emotional erreichbare erwachsene Person?
- Ist klar, wer in Belastungsspitzen mitträgt?

2. Alltag und Routinen
- Sind Schlafen, Essen, Schule/Kita und Übergaben ausreichend stabil?
- Wo kippt die Struktur zuerst?

3. Sprache und Orientierung
- Wissen die Kinder altersgerecht, was los ist?
- Gibt es Worte für Krisen, Rückzug, Angst oder Klinikaufenthalte?

4. Entlastung und Netzwerk
- Welche private oder professionelle Unterstützung ist bereits aktiv?
- Wo fehlen noch konkrete Mitwissende oder Entlastungsangebote?

5. Krisenvorsorge
- Gibt es Warnzeichen, Kontaktkette, Kinderbetreuung und sichere Orte?
- Ist festgelegt, wer wann informiert wird?

6. Klinische Einordnung
- Was wirkt aktuell tragend?
- Was ist brüchig oder unklar?
- Was ist der nächste sinnvolle Schritt?
`;

    downloadTextFile('schutzfaktoren-check.txt', template);
  }, [scoreRisk]);

  const handleDownloadCompactCrisisSheet = useCallback(() => {
    const template = `Krisenplan kompakt

Kurzblatt für Gespräch, Mitgabe oder Supervision
Aktueller Assessment-Score: ${scoreRisk}

1. Warnzeichen
-

2. Sofortkontakt
-

3. Kinderbetreuung
-

4. Sicherer Ort / sichere Übergabe
-

5. Wer informiert wen
-

6. Nächster Schritt bis zum nächsten Kontakt
-
`;

    downloadTextFile('krisenplan-kompakt.txt', template);
  }, [scoreRisk]);

  const downloadResources = useMemo(
    () => [
      {
        title: 'Gesprächsleitfaden für Fachpersonen',
        description:
          'Kurzblatt für Erstgespräch, Verlaufsgespräch oder Supervision mit Fokus auf Elternrolle, Versorgung, Netzwerk und nächsten Schritt.',
        meta: ['TXT editierbar', 'Gespräch / Supervision'],
        actionLabel: 'Leitfaden herunterladen',
        onDownload: handleDownloadConversationGuide,
      },
      {
        title: 'Netzwerkkarte als Arbeitsvorlage',
        description:
          'Strukturierte Vorlage für private Kontakte, Alltagsstützen, Fachstellen, Mitwissende und Versorgungslücken.',
        meta: ['TXT editierbar', 'Vernetzung / Mapping'],
        actionLabel: 'Netzwerkkarte herunterladen',
        onDownload: handleDownloadNetworkMap,
      },
      {
        title: 'Psychoedukations-Hilfe',
        description:
          'Kurzhilfe für Fachpersonen zum Sprechen mit Kindern über die psychische Erkrankung eines Elternteils.',
        meta: ['TXT editierbar', 'Gespräch mit Kindern'],
        actionLabel: 'Kurzhilfe herunterladen',
        onDownload: handleDownloadPsychoeducationGuide,
      },
      {
        title: 'Schutzfaktoren-Check',
        description: 'Einseitige Versorgungsübersicht für Fallreflexion, Verlaufsbeobachtung und Supervision.',
        meta: ['TXT editierbar', 'Schutz / Verlauf'],
        actionLabel: 'Check herunterladen',
        onDownload: handleDownloadProtectionChecklist,
      },
      {
        title: 'Krisenplan kompakt',
        description: 'Reduzierte Kurzvorlage für Mitgabe, Besprechung oder schnelle gemeinsame Krisenvorsorge.',
        meta: ['TXT editierbar', 'Krise / Mitgabe'],
        actionLabel: 'Kurzvorlage herunterladen',
        onDownload: handleDownloadCompactCrisisSheet,
      },
    ],
    [
      handleDownloadConversationGuide,
      handleDownloadNetworkMap,
      handleDownloadPsychoeducationGuide,
      handleDownloadProtectionChecklist,
      handleDownloadCompactCrisisSheet,
    ]
  );

  return {
    handleDownloadCrisisPlan,
    handleDownloadConversationGuide,
    handleDownloadNetworkMap,
    handleDownloadPsychoeducationGuide,
    handleDownloadProtectionChecklist,
    handleDownloadCompactCrisisSheet,
    downloadResources,
  };
}
