import {
  Activity,
  BookOpenText,
  CircleHelp,
  ClipboardCheck,
  GraduationCap,
  HeartHandshake,
  LayoutDashboard,
  MapPin,
} from 'lucide-react';
import { E_MODULES, VIGNETTEN } from './learningContent';
import { LITERATUR_IDS, MEDIA_BOOKS, MEDIA_DIGITAL } from './evidenceContent';
import { FACHSTELLEN, SUPPORT_OFFER_IDS } from './fachstellenContent';

/**
 * @typedef {('start'|'lernmodule'|'vignetten'|'glossar'|'material'|'evidenz'|'toolbox'|'netzwerk')} TabId
 */

/**
 * @typedef {('fachperson')} FachpersonAudience
 * Default-Adressat des Portals: Fachpersonen in Erwachsenenpsychiatrie
 * und Beratungskontext. Sie-Anrede, Fach-Vokabular, klinische Rahmung,
 * Neutralitaet ohne therapeutische Direktive. Sieben von acht Tabs
 * tragen diese Markierung.
 */

/**
 * @typedef {('weitergabe')} WeitergabeAudience
 * Ausnahme-Adressat: Patient:innen und Angehoerige. Inhalte sind als
 * Handout-Material gerahmt, das Fachpersonen im Gespraech einsetzen oder
 * zur Weitergabe verlinken. Sprache zugaenglich, Anrede situativ (oft Du),
 * keine Fachsprache ohne Erklaerung. Aktuell traegt nur der Material-Tab
 * dieses Feld.
 */

/**
 * @typedef {FachpersonAudience | WeitergabeAudience} PrimaryAudience
 * Diskriminierte Union — jeder Tab muss genau einen der beiden Werte
 * tragen. Fehlende oder andere Werte sind ein Fehler.
 */

/**
 * @typedef {Object} TabItem
 * @property {TabId} id - Stabile Tab-ID, auch als Hash-Route verwendet.
 * @property {string} label - Anzeigename in Navigation und Footer.
 * @property {React.ComponentType} icon - Lucide-React-Icon-Komponente.
 * @property {string} footerNote - Kurzer Beschreibungstext fuer den Footer.
 * @property {'primary'} priority - Aktuell sind alle Top-Level-Tabs 'primary'.
 * @property {PrimaryAudience} primaryAudience - Pflichtfeld. Steuert die
 *   redaktionelle Hand fuer den gesamten Tab: Sprache, Anrede, Beispiele,
 *   Disclaimer-Tonalitaet. Siehe CLAUDE.md "Zielgruppen" fuer die
 *   Entscheidungslogik.
 * @property {string} [audienceBadge] - Optional. Sichtbarer Zielgruppen-
 *   Marker im Nav-Button (Desktop + Mobile). Aktuell ungenutzt — fuer
 *   kuenftige Sub-Adressat-Markierung pro Cluster reserviert (siehe
 *   Follow-Up "Material: Adressat-Marke pro Cluster").
 */

/** @type {TabItem[]} */
export const TAB_ITEMS = [
  // Jeder Tab traegt explizit `primaryAudience`. Sieben von acht sind
  // 'fachperson' (Default-Adressat: Erwachsenenpsychiatrie + Beratung).
  // Nur der Material-Tab ist 'weitergabe' — Handouts fuer Patient:innen
  // und Angehoerige, die Fachpersonen im Gespraech einsetzen oder
  // weitergeben. Entscheidungslogik fuer kuenftige Tabs in CLAUDE.md
  // "Zielgruppen".
  {
    id: 'start',
    label: 'Start',
    icon: LayoutDashboard,
    footerNote: 'Dashboard und Orientierung',
    priority: 'primary',
    primaryAudience: 'fachperson',
  },
  {
    id: 'lernmodule',
    label: 'Lernmodule',
    icon: GraduationCap,
    footerNote: 'Kurzformate für Fachpraxis',
    priority: 'primary',
    primaryAudience: 'fachperson',
  },
  {
    id: 'vignetten',
    label: 'Training',
    icon: HeartHandshake,
    footerNote: 'Fallreflexion und Dialog',
    priority: 'primary',
    primaryAudience: 'fachperson',
  },
  {
    id: 'glossar',
    label: 'Glossar',
    icon: BookOpenText,
    footerNote: 'Begriffe, Konzepte und Sprache',
    priority: 'primary',
    primaryAudience: 'fachperson',
  },
  {
    id: 'material',
    label: 'Material',
    icon: CircleHelp,
    footerNote: 'Handouts für Patient:innen und Angehörige',
    priority: 'primary',
    primaryAudience: 'weitergabe',
  },
  {
    id: 'evidenz',
    label: 'Evidenz',
    icon: Activity,
    footerNote: 'Kapitel, Vertiefung, Materialien',
    priority: 'primary',
    primaryAudience: 'fachperson',
  },
  {
    id: 'toolbox',
    label: 'Toolbox',
    icon: ClipboardCheck,
    footerNote: 'Triage, Schutz, nächste Schritte',
    priority: 'primary',
    primaryAudience: 'fachperson',
  },
  {
    id: 'netzwerk',
    label: 'Netzwerk',
    icon: MapPin,
    footerNote: 'Fachstellen und Weitervermittlung',
    priority: 'primary',
    primaryAudience: 'fachperson',
  },
];

// Dev-Guard: jeder TabItem muss ein gueltiges `primaryAudience` tragen.
// Laeuft nur im Dev-Build (Vite-Konstante DEV) und kostet in Production
// nichts. Verhindert, dass kuenftige Tab-Eintraege das Pflichtfeld
// vergessen — ohne ein eigenes Test-Framework dafuer aufzusetzen.
if (import.meta.env?.DEV) {
  const VALID_AUDIENCES = new Set(['fachperson', 'weitergabe']);
  for (const tab of TAB_ITEMS) {
    if (!VALID_AUDIENCES.has(tab.primaryAudience)) {
      console.error(
        `[appShellContent] TAB_ITEMS["${tab.id}"]: primaryAudience fehlt oder ist ungueltig ` +
          `(erwartet: 'fachperson' | 'weitergabe', erhalten: ${JSON.stringify(tab.primaryAudience)}). ` +
          `Siehe CLAUDE.md "Zielgruppen" fuer die Entscheidungslogik.`
      );
    }
  }
}

// Zwei unabhaengige Versionsachsen -- bewusst nicht synchron:
//
// 1. Die `_v5`-Suffixe an `STORAGE_KEYS.appState` und `APP_BROADCAST_CHANNEL`
//    bezeichnen die *Schluessel-Generation*. Bei jedem groesseren Schema-
//    Bruch wird der Suffix erhoeht, sodass alte localStorage-Eintraege nicht
//    mehr aufgegriffen werden (effektive Cache-Invalidierung). Aktuell v5.
//
// 2. `APP_STATE_VERSION` ist die *Daten-Version innerhalb* eines persistierten
//    State-Objekts. Sie steuert die Migrations-Logik in `AppStateContext`,
//    wenn ein State mit aelterer Versionsnummer geladen wird. Aktuell 2.
//
// Bei der naechsten Migration: ueberlegen, ob nur der Daten-Version
// hochzaehlen reicht (kompatible Erweiterung) oder ob zusaetzlich der
// Schluessel-Suffix springen muss (inkompatibler Bruch, der alte States
// nicht migrieren will).
export const STORAGE_KEYS = {
  appState: 'rr_app_state_v5',
};

export const APP_STATE_VERSION = 2;
export const APP_BROADCAST_CHANNEL = 'rr_app_sync_v5';

export const DEFAULT_SCORE = { risk: 0, checked: [] };
export const DEFAULT_COMPLETED = [];
export const DEFAULT_SELECTED_OPTION = {};
export const DEFAULT_QUIZ_STATE = {};

export const E_MODULE_COUNT = E_MODULES.length;
export const VIGNETTE_COUNT = VIGNETTEN.length;
export const NETWORK_RESOURCE_COUNT = FACHSTELLEN.length;
export const HOME_REFERENCE_COUNT =
  LITERATUR_IDS.length + MEDIA_BOOKS.length + MEDIA_DIGITAL.length + SUPPORT_OFFER_IDS.length;
