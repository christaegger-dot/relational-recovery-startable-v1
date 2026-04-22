/**
 * Legal-Inhalte: Impressum + Datenschutzerklärung.
 *
 * Default-Entwurf auf Basis der technischen Fakten der Site. Platzhalter
 * mit **"(ZU ERSETZEN: ...)"** markieren redaktionelle Angaben, die vom
 * Betreiber eingesetzt werden müssen, bevor die Seite live gehen kann.
 *
 * Stand: April 2026 (nDSG in Kraft seit 1.9.2023). Sprache de-CH (ss
 * statt ß). Die DSE folgt den Mindestangaben nach Art. 19 nDSG und
 * nennt Datenübermittlungen ins Ausland transparent (Netlify-Hosting).
 */

export const LEGAL_STAND = 'April 2026';

export const IMPRESSUM_CONTENT = {
  eyebrow: 'Rechtliches',
  title: 'Impressum',
  lead:
    'Angaben gemäss schweizerischer Informationspflicht (UWG Art. 3 lit. s) und zur Transparenz über die inhaltliche Verantwortung des Fachportals.',
  sections: [
    {
      id: 'impressum-betreiber',
      heading: 'Betreiber und inhaltliche Verantwortung',
      paragraphs: [
        '**(ZU ERSETZEN: Name der verantwortlichen Person oder Organisation)**',
        '**(ZU ERSETZEN: Postadresse)**',
        '**(ZU ERSETZEN: E-Mail-Kontakt)**',
      ],
      note:
        'Die redaktionelle Verantwortung für die Inhalte dieses Fachportals liegt beim genannten Betreiber. Inhalte beruhen auf fachlicher Literatur, publizierten Leitlinien und klinischer Erfahrung aus der Erwachsenenpsychiatrie und im Beratungskontext im Kanton Zürich.',
    },
    {
      id: 'impressum-qualifikation',
      heading: 'Fachliche Qualifikation',
      paragraphs: [
        '**(ZU ERSETZEN: Berufsbezeichnung, z. B. "Fachperson Psychiatrische Pflege HF" oder "Psychologin FSP" — bei Berufsbezeichnungen unter Bundesgesetz die zugehörige Aufsichtsbehörde nennen, z. B. Kantonaler Gesundheitsdirektor, BAG, PsyKo)**',
      ],
    },
    {
      id: 'impressum-zweck',
      heading: 'Zweck und Rahmung',
      paragraphs: [
        'Dieses Fachportal stellt Arbeitshilfen, Trainingsfälle, klinisch orientierte Materialien und ein Fachstellenverzeichnis für Fachpersonen zusammen, die mit Familien mit psychisch belasteten Eltern arbeiten. Schwerpunkt ist der Kanton Zürich, ergänzt um schweizweite Hinweise.',
        'Die Seite ist ein Informationsdienst. Sie ersetzt weder fachliche Beurteilung noch individuelle Beratung, noch institutionelle Verfahren (Kindes- und Erwachsenenschutz, Kantonale Aufsichten). In akuten Situationen gelten die auf der Seite durchgehend sichtbaren Notfallnummern.',
      ],
    },
    {
      id: 'impressum-haftung',
      heading: 'Haftungshinweis',
      paragraphs: [
        'Die Inhalte werden mit fachlicher Sorgfalt erstellt und regelmässig überprüft. Eine Gewähr für Vollständigkeit, Aktualität und Eignung für eine konkrete Situation wird jedoch nicht übernommen. Nutzerinnen und Nutzer verantworten die fachliche Einschätzung im Einzelfall selbst.',
        'Externe Links verweisen auf Angebote Dritter (Fachstellen, Literatur, Video- und Audio-Angebote). Für deren Inhalte, Verfügbarkeit und Datenschutzpraktiken übernimmt der Betreiber dieser Seite keine Verantwortung. Links werden mit `rel="noopener noreferrer"` geöffnet, damit ihre Ziele keine Rückverbindung zur Ursprungsseite erhalten.',
      ],
    },
    {
      id: 'impressum-urheberrecht',
      heading: 'Urheberrecht',
      paragraphs: [
        'Texte, Grafiken, Layouts und druckbare Materialien (Handouts, Notfallplan-Vorlagen, Trainingsfälle) sind urheberrechtlich geschützt. Zitate für den eigenen fachlichen Gebrauch mit Quellennachweis sind willkommen. Weitergabe, Wiederveröffentlichung oder kommerzielle Nutzung bedarf der vorherigen Absprache mit dem Betreiber.',
        'Die druckbaren Handouts im Material-Tab dürfen Fachpersonen unverändert in ihrer Beratungstätigkeit an Patientinnen, Patienten und Angehörige weitergeben. Diese Weitergabe erfolgt im Rahmen des bestimmungsgemässen Gebrauchs und ist ausdrücklich erwünscht.',
      ],
    },
  ],
};

export const DATENSCHUTZ_CONTENT = {
  eyebrow: 'Rechtliches',
  title: 'Datenschutzerklärung',
  lead:
    'Diese Website verarbeitet bewusst so wenig Daten wie möglich. Es gibt keine Cookies, kein Analytics und keine externen Tracker. Dennoch entstehen beim blossen Aufrufen der Seite technische Daten (Server-Logs), und die Seite speichert Bedienzustände lokal im Browser. Diese Erklärung macht transparent, welche Daten warum und wo verarbeitet werden.',
  standNotice: `Stand: ${LEGAL_STAND}. Grundlage: Bundesgesetz über den Datenschutz (nDSG, in Kraft seit 1. September 2023).`,
  sections: [
    {
      id: 'datenschutz-verantwortlicher',
      heading: 'Verantwortlicher',
      paragraphs: [
        'Verantwortlich für die Datenbearbeitung im Zusammenhang mit dieser Website ist der im Impressum genannte Betreiber. Anfragen zu diesem Text oder zu Ihren Rechten nach Art. 25 ff. nDSG richten Sie bitte an die dort genannte E-Mail-Adresse.',
      ],
    },
    {
      id: 'datenschutz-lokaler-speicher',
      heading: 'Lokaler Speicher im Browser (localStorage)',
      paragraphs: [
        'Beim Aufrufen einzelner Bereiche (Toolbox, Vignetten, Lernmodule) speichert diese Website Bedienzustände lokal im Browser. Das sind zum Beispiel: die zuletzt gewählte Section, die beantworteten Quiz-Fragen, die ausgewählten Vignetten-Optionen, der gesetzte Suchbegriff im Netzwerk-Tab, und ob der Hinweis-Banner oben geschlossen wurde.',
        'Diese Daten liegen ausschliesslich in Ihrem Browser. Sie werden **nicht** an den Server oder an Dritte übertragen. Der Speicher-Schlüssel heisst `rr_app_state_v5` und enthält keine personenbezogenen Daten: keine Namen, keine Kontaktangaben, keine Eingabetexte.',
        'Sie können den lokalen Speicher jederzeit selbst löschen — in den Browser-Einstellungen unter "Websitedaten löschen" oder "Cookies und Daten für diese Seite entfernen". Ein sichtbarer Hinweis oben auf der Seite empfiehlt, auf gemeinsam genutzten Geräten nach der Nutzung zurückzusetzen.',
      ],
    },
    {
      id: 'datenschutz-hosting',
      heading: 'Hosting und Server-Logs',
      paragraphs: [
        'Die Website wird von der Netlify Inc. (US-amerikanisches Unternehmen mit Serverstandorten in den USA und innerhalb Europas) betrieben. Beim Aufrufen der Seite werden technisch notwendige Daten verarbeitet, die jeder Webserver automatisch erhält: IP-Adresse, Zeitpunkt der Anfrage, angeforderte Ressource, aufrufendes Gerät und übermittelte Browserkennung (User-Agent), verweisende Seite (Referer).',
        'Diese Daten dienen dem technischen Betrieb, der Fehlerdiagnose und dem Schutz vor missbräuchlicher Nutzung. Es erfolgt keine Profilbildung und kein Abgleich mit anderen Datenbeständen. Die Rechtsgrundlage ist das berechtigte Interesse am zuverlässigen und sicheren Betrieb der Website (Art. 31 Abs. 1 nDSG).',
        'Netlify kann als Auftragsbearbeiter im Sinne von Art. 9 nDSG Daten in Drittstaaten übermitteln, namentlich in die USA. Zwischen der Schweiz und den USA besteht seit dem 15. September 2024 das Swiss-U.S. Data Privacy Framework, das ein angemessenes Datenschutzniveau für zertifizierte Empfänger vorsieht. Netlify Inc. hat sich diesem Framework unterstellt. Weitere Informationen zur Datenbearbeitung bei Netlify: https://www.netlify.com/privacy/',
      ],
    },
    {
      id: 'datenschutz-kein-tracking',
      heading: 'Kein Tracking, keine Cookies, keine Analytics',
      paragraphs: [
        'Diese Website verwendet keine Cookies und setzt keine Tracking-Technologien ein. Es gibt kein Google Analytics, kein Plausible, kein Matomo, keine Meta- oder X-Pixels, keine A/B-Tests. Die Open-Graph-Vorschauen (Social-Media-Sharing) werden rein serverseitig aus statischen Meta-Tags erzeugt — es findet kein Drittanbieter-Aufruf aus dem Browser der Nutzenden statt.',
        'Schriftarten (Manrope, Source Serif 4) sind self-hosted — es werden keine Schriftdateien von Google Fonts oder ähnlichen Drittdiensten nachgeladen.',
      ],
    },
    {
      id: 'datenschutz-externe-links',
      heading: 'Externe Links zu Fachstellen und weiteren Angeboten',
      paragraphs: [
        'Die Website verlinkt ausgewählte Fachstellen (z. B. PUK Zürich, Pro Juventute, Dargebotene Hand), Literaturhinweise und unterstützende Medien. Sobald Sie einen externen Link anklicken, verlässt Ihr Browser diese Seite. Auf die dortige Datenverarbeitung haben wir keinen Einfluss. Wir empfehlen, auf der jeweiligen Zielseite die dortige Datenschutzerklärung zu konsultieren.',
        'Alle externen Links öffnen sich in einem neuen Tab (`target="_blank"`) mit `rel="noopener noreferrer"`. Das bedeutet: die Ziel-Site erhält keine JavaScript-Rückverbindung zu dieser Seite, und keinen Referer-Header, der diese Seite als Herkunft nennt. Externe Ziele erfahren nicht, dass Sie von diesem Fachportal kommen.',
      ],
    },
    {
      id: 'datenschutz-security-header',
      heading: 'Sicherheitsmassnahmen',
      paragraphs: [
        'Die Website wird ausschliesslich über HTTPS ausgeliefert (Strict-Transport-Security). Die Content-Security-Policy beschränkt, welche Ressourcen der Browser laden darf (nur von der eigenen Domain; keine Inline-Scripts). X-Frame-Options verhindert Einbettung per iframe. Cross-Origin-Opener-Policy isoliert den Browsing-Kontext. Permissions-Policy deaktiviert Kamera, Mikrofon, Geolocation und Interest-Cohort-APIs.',
      ],
    },
    {
      id: 'datenschutz-ihre-rechte',
      heading: 'Ihre Rechte nach nDSG',
      paragraphs: [
        'Sie haben nach dem Bundesgesetz über den Datenschutz das Recht auf **Auskunft** (Art. 25), **Berichtigung** (Art. 32), **Löschung** beziehungsweise **Einschränkung der Bearbeitung** und **Widerspruch** gegen bestimmte Bearbeitungen. Soweit eine betroffene Person im Geltungsbereich der DSGVO ansässig ist, stehen ihr ergänzend die dort vorgesehenen Rechte zu (insbesondere Art. 15 bis 22 DSGVO).',
        'Sie können sich jederzeit an die zuständige schweizerische Aufsichtsbehörde wenden: Eidgenössischer Datenschutz- und Öffentlichkeitsbeauftragter (EDÖB), Feldeggweg 1, 3003 Bern, https://www.edoeb.admin.ch',
        'Für die konkrete Ausübung Ihrer Rechte gegenüber dieser Website wenden Sie sich bitte an die im Impressum genannte Kontaktadresse.',
      ],
    },
    {
      id: 'datenschutz-aenderungen',
      heading: 'Änderungen dieser Erklärung',
      paragraphs: [
        'Technische Entwicklungen, rechtliche Änderungen oder inhaltliche Erweiterungen der Website können Anpassungen dieser Datenschutzerklärung erforderlich machen. Die jeweils aktuelle Fassung ist unter dem Footer-Link "Datenschutz" abrufbar und trägt das oben genannte Stand-Datum.',
      ],
    },
  ],
};
