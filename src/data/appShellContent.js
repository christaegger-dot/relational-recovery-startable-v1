import { Activity, BookOpenText, CircleHelp, ClipboardCheck, GraduationCap, HeartHandshake, LayoutDashboard, MapPin } from 'lucide-react';
import { E_MODULES, VIGNETTEN } from './learningContent';
import { RESOURCE_DATA } from './networkContent';
import { LITERATUR } from './evidenceContent';

export const TAB_ITEMS = [
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
    footerNote: 'FAQ, Einordnung und Orientierung',
    priority: 'primary',
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
    footerNote: 'Hilfen, Stellen, Weitervermittlung',
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
export const NETWORK_RESOURCE_COUNT = RESOURCE_DATA.length;
export const HOME_REFERENCE_COUNT = LITERATUR.length;
