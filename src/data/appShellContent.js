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
 * @typedef {('start'|'lernmodule'|'vignetten'|'glossar'|'grundlagen'|'evidenz'|'toolbox'|'netzwerk')} TabId
 */

/**
 * @typedef {('angehoerige')} AngehoerigenAudience
 * Redaktionelles Metadatum fuer Ausnahme-Tabs. Seit Audience-Cut-Phase 2
 * ist Fachperson der Default — nur Tabs, die sich explizit an Angehoerige
 * richten, tragen das Feld `primaryAudience: 'angehoerige'`. Die fruehere
 * Dreiwertigkeit (fachpersonen | angehoerige | beide) ist aufgehoben,
 * weil "beide" und "fachpersonen" nach der Fokus-Entscheidung identisch
 * behandelt werden (Default-Adressat Fachperson).
 */

/**
 * @typedef {Object} TabItem
 * @property {TabId} id - Stabile Tab-ID, auch als Hash-Route verwendet.
 * @property {string} label - Anzeigename in Navigation und Footer.
 * @property {React.ComponentType} icon - Lucide-React-Icon-Komponente.
 * @property {string} footerNote - Kurzer Beschreibungstext fuer den Footer.
 * @property {'primary'} priority - Aktuell sind alle Top-Level-Tabs 'primary'.
 * @property {AngehoerigenAudience} [primaryAudience] - Optional. Nur gesetzt
 *   fuer Tabs, die sich primaer an Angehoerige richten. Fehlendes Feld
 *   bedeutet: Default-Adressat Fachperson. Kombiniert mit `audienceBadge`
 *   fuer sichtbare Nav-Markierung.
 * @property {string} [audienceBadge] - Optional. Sichtbarer Zielgruppen-
 *   Marker im Nav-Button (Desktop + Mobile). Aktuell nur Grundlagen.
 */

/** @type {TabItem[]} */
export const TAB_ITEMS = [
  // Default-Adressat aller Tabs ohne explizites primaryAudience-Feld:
  // Fachperson. Nur Tabs, die sich primaer an Angehoerige richten,
  // setzen das Feld — sie erhalten zusaetzlich einen sichtbaren
  // audienceBadge in der Nav.
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
    id: 'grundlagen',
    label: 'Grundlagen',
    icon: CircleHelp,
    footerNote: 'FAQ und Einordnung für Angehörige',
    priority: 'primary',
    primaryAudience: 'angehoerige',
    audienceBadge: 'Für Angehörige',
  },
  {
    id: 'evidenz',
    label: 'Evidenz',
    icon: Activity,
    footerNote: 'Grundlagen, Vertiefung, Materialien',
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
