import { Activity, BookOpenText, ClipboardCheck, CircleHelp, GraduationCap, HeartHandshake, LayoutDashboard, MapPin } from 'lucide-react';

export const TAB_ITEMS = [
  { id: 'home', label: 'Start', icon: LayoutDashboard, footerNote: 'Dashboard und Orientierung', priority: 'primary' },
  {
    id: 'elearning',
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
    id: 'zaesur',
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
    id: 'zuerich',
    label: 'Netzwerk',
    icon: MapPin,
    footerNote: 'Hilfen, Stellen, Weitervermittlung',
    priority: 'primary',
  },
];

export const STORAGE_KEYS = {
  appState: 'rr_app_state_v4',
};

export const APP_STATE_VERSION = 1;
export const APP_BROADCAST_CHANNEL = 'rr_app_sync_v4';

export const DEFAULT_SCORE = { risk: 0, checked: [] };
export const DEFAULT_COMPLETED = [];
export const DEFAULT_SELECTED_OPTION = {};
export const DEFAULT_QUIZ_STATE = {};

export const E_MODULE_COUNT = 2;
export const VIGNETTE_COUNT = 2;
export const NETWORK_RESOURCE_COUNT = 16;
export const HOME_REFERENCE_COUNT = 7;
