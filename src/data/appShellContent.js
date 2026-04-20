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
 * @typedef {('weitergabe')} WeitergabeAudience
 * Redaktionelles Metadatum fuer Ausnahme-Tabs. Seit Audience-Cut-Phase 2
 * ist Fachperson der Default — nur der Material-Tab traegt das Feld
 * `primaryAudience: 'weitergabe'`, weil seine Inhalte als Handout-Material
 * an Patient:innen und Angehoerige gedacht sind (Fachperson nutzt sie im
 * Gespraech oder gibt sie weiter). Das Nav-Label "Material" traegt das
 * Zielgruppen-Signal selbst, deshalb ist der frueher zusaetzlich gesetzte
 * audienceBadge hier entfallen.
 */

/**
 * @typedef {Object} TabItem
 * @property {TabId} id - Stabile Tab-ID, auch als Hash-Route verwendet.
 * @property {string} label - Anzeigename in Navigation und Footer.
 * @property {React.ComponentType} icon - Lucide-React-Icon-Komponente.
 * @property {string} footerNote - Kurzer Beschreibungstext fuer den Footer.
 * @property {'primary'} priority - Aktuell sind alle Top-Level-Tabs 'primary'.
 * @property {WeitergabeAudience} [primaryAudience] - Optional. Nur gesetzt
 *   fuer Tabs, deren Inhalte als Material zur Weitergabe an Patient:innen
 *   und Angehoerige gedacht sind. Fehlendes Feld bedeutet: Default-Adressat
 *   Fachperson.
 * @property {string} [audienceBadge] - Optional. Sichtbarer Zielgruppen-
 *   Marker im Nav-Button (Desktop + Mobile). Aktuell ungenutzt — fuer
 *   kuenftige Sub-Adressat-Markierung pro Cluster reserviert (siehe
 *   Follow-Up "Material: Adressat-Marke pro Cluster").
 */

/** @type {TabItem[]} */
export const TAB_ITEMS = [
  // Default-Adressat aller Tabs ohne explizites primaryAudience-Feld:
  // Fachperson. Nur der Material-Tab traegt `primaryAudience: 'weitergabe'`,
  // weil seine Inhalte als Handout-Material an Patient:innen und Angehoerige
  // gedacht sind. Das Nav-Label "Material" traegt das Zielgruppen-Signal
  // selbst, deshalb ist dort aktuell kein zusaetzlicher audienceBadge gesetzt.
  { id: 'start', label: 'Start', icon: LayoutDashboard, footerNote: 'Dashboard und Orientierung', priority: 'primary' },
  {
    id: 'lernmodule',
    label: 'Lernmodule',
    icon: GraduationCap,
    footerNote: 'Kurzformate für Fachpraxis',
    priority: 'primary',
  },
  {
    id: 'vignetten',
    label: 'Training',
    icon: HeartHandshake,
    footerNote: 'Fallreflexion und Dialog',
    priority: 'primary',
  },
  {
    id: 'glossar',
    label: 'Glossar',
    icon: BookOpenText,
    footerNote: 'Begriffe, Konzepte und Sprache',
    priority: 'primary',
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
  },
  {
    id: 'toolbox',
    label: 'Toolbox',
    icon: ClipboardCheck,
    footerNote: 'Triage, Schutz, nächste Schritte',
    priority: 'primary',
  },
  {
    id: 'netzwerk',
    label: 'Netzwerk',
    icon: MapPin,
    footerNote: 'Fachstellen und Weitervermittlung',
    priority: 'primary',
  },
];

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
