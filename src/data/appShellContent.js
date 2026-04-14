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
import { RESOURCE_DATA } from './networkContent';
import { LITERATUR, MEDIA_BOOKS, MEDIA_DIGITAL, SUPPORT_OFFERS } from './evidenceContent';

/**
 * @typedef {('start'|'lernmodule'|'vignetten'|'glossar'|'grundlagen'|'evidenz'|'toolbox'|'netzwerk')} TabId
 */

/**
 * @typedef {('fachpersonen'|'angehoerige'|'beide')} PrimaryAudience
 */

/**
 * @typedef {Object} TabItem
 * @property {TabId} id - Stabile Tab-ID, auch als Hash-Route verwendet.
 * @property {string} label - Anzeigename in Navigation und Footer.
 * @property {React.ComponentType} icon - Lucide-React-Icon-Komponente.
 * @property {string} footerNote - Kurzer Beschreibungstext fuer den Footer.
 * @property {'primary'} priority - Aktuell sind alle Top-Level-Tabs 'primary'.
 * @property {PrimaryAudience} primaryAudience - Redaktionelles Metadatum aus
 *   Audit 02. Dokumentiert die primaere Zielgruppe eines Tabs. Wird aktuell
 *   nicht im Runtime-Code konsumiert, aber bei redaktionellen Entscheidungen
 *   aktiv verwendet, z.B. bei der Fachjargon-Schwelle in Audit 06 Block 5
 *   ('Desorganisation nur in Angehoerigen-Texten verwenden'). Bei neuen Tabs
 *   setzen, damit die Konvention lebendig bleibt. Option PA1 aus Audit 12:
 *   bewusst ohne Runtime-Integration, um die Seite nach Audit 10 release-fest
 *   nicht durch neue Design-Entscheidungen zu belasten.
 */

/** @type {TabItem[]} */
export const TAB_ITEMS = [
  { id: 'start', label: 'Start', icon: LayoutDashboard, footerNote: 'Dashboard und Orientierung', priority: 'primary', primaryAudience: 'beide' },
  {
    id: 'lernmodule',
    label: 'Lernmodule',
    icon: GraduationCap,
    footerNote: 'Kurzformate für Fachpraxis',
    priority: 'primary',
    primaryAudience: 'fachpersonen',
  },
  {
    id: 'vignetten',
    label: 'Training',
    icon: HeartHandshake,
    footerNote: 'Fallreflexion und Dialog',
    priority: 'primary',
    primaryAudience: 'fachpersonen',
  },
  {
    id: 'glossar',
    label: 'Glossar',
    icon: BookOpenText,
    footerNote: 'Begriffe, Konzepte und Sprache',
    priority: 'primary',
    primaryAudience: 'fachpersonen',
  },
  {
    id: 'grundlagen',
    label: 'Grundlagen',
    icon: CircleHelp,
    footerNote: 'FAQ, Einordnung und Orientierung',
    priority: 'primary',
    primaryAudience: 'angehoerige',
  },
  {
    id: 'evidenz',
    label: 'Evidenz',
    icon: Activity,
    footerNote: 'Grundlagen, Vertiefung, Materialien',
    priority: 'primary',
    primaryAudience: 'fachpersonen',
  },
  {
    id: 'toolbox',
    label: 'Toolbox',
    icon: ClipboardCheck,
    footerNote: 'Triage, Schutz, nächste Schritte',
    priority: 'primary',
    primaryAudience: 'fachpersonen',
  },
  {
    id: 'netzwerk',
    label: 'Netzwerk',
    icon: MapPin,
    footerNote: 'Hilfen, Stellen, Weitervermittlung',
    priority: 'primary',
    primaryAudience: 'beide',
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
export const NETWORK_RESOURCE_COUNT = RESOURCE_DATA.length;
export const HOME_REFERENCE_COUNT =
  LITERATUR.length + MEDIA_BOOKS.length + MEDIA_DIGITAL.length + SUPPORT_OFFERS.length;
