import { Activity, ClipboardCheck, GraduationCap, HeartHandshake, LayoutDashboard, MapPin } from 'lucide-react';

export const TAB_ITEMS = [
  { id: 'home', label: 'Start', icon: LayoutDashboard },
  { id: 'elearning', label: 'Lernmodule', icon: GraduationCap },
  { id: 'vignetten', label: 'Training', icon: HeartHandshake },
  { id: 'zaesur', label: 'Evidenz', icon: Activity },
  { id: 'toolbox', label: 'Toolbox', icon: ClipboardCheck },
  { id: 'zuerich', label: 'Netzwerk', icon: MapPin },
];

export const STORAGE_KEYS = {
  appState: 'rr_app_state_v3',
};

export const APP_STATE_VERSION = 1;
export const APP_BROADCAST_CHANNEL = 'rr_app_sync_v3';

export const DEFAULT_SCORE = { risk: 0, checked: [] };
export const DEFAULT_COMPLETED = [];
export const DEFAULT_SELECTED_OPTION = {};
export const DEFAULT_QUIZ_STATE = {};

export const E_MODULE_COUNT = 2;
export const VIGNETTE_COUNT = 2;
export const NETWORK_RESOURCE_COUNT = 16;
export const HOME_REFERENCE_COUNT = 7;
