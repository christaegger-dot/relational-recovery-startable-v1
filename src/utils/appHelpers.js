import {
  APP_STATE_VERSION,
  DEFAULT_COMPLETED,
  DEFAULT_QUIZ_STATE,
  DEFAULT_SCORE,
  DEFAULT_SELECTED_OPTION,
  TAB_ITEMS,
} from '../data/appShellContent';
import { ASSESSMENT_ITEMS, E_MODULES, VIGNETTEN } from '../data/learningContent';
import { NETWORK_FILTERS } from '../data/networkContent';

const VALID_ASSESSMENT_ITEM_IDS = new Set(ASSESSMENT_ITEMS.map((item) => item.id));
const ASSESSMENT_ITEM_WEIGHTS = new Map(ASSESSMENT_ITEMS.map((item) => [item.id, item.val]));
const VALID_MODULE_IDS = new Set(E_MODULES.map((module) => module.id));
const MODULE_BY_ID = new Map(E_MODULES.map((module) => [module.id, module]));
const VIGNETTE_OPTION_IDS = new Map(
  VIGNETTEN.map((vignette) => [vignette.id, new Set(vignette.options.map((option) => option.id))])
);
const TAB_ALIASES = {
  home: 'start',
  start: 'start',
  elearning: 'lernmodule',
  lernmodule: 'lernmodule',
  evidence: 'evidenz',
  evidenz: 'evidenz',
  network: 'netzwerk',
  netzwerk: 'netzwerk',
  zuerich: 'netzwerk',
  zaesur: 'evidenz',
  'network-map': 'netzwerk',
  'network-directory': 'netzwerk',
  'netzwerk-karte': 'netzwerk',
  'netzwerk-fachstellen': 'netzwerk',
};

export const safeParse = (key, fallback, validate) => {
  if (typeof window === 'undefined') return fallback;

  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return fallback;
    const parsed = JSON.parse(raw);
    return validate && !validate(parsed) ? fallback : parsed;
  } catch {
    return fallback;
  }
};

export const safeLocalStorageSet = (key, value) => {
  if (typeof window === 'undefined') return false;

  try {
    window.localStorage.setItem(key, typeof value === 'string' ? value : JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
};

export const isValidScore = (value) => {
  return (
    value &&
    typeof value === 'object' &&
    typeof value.risk === 'number' &&
    !Number.isNaN(value.risk) &&
    Array.isArray(value.checked) &&
    value.checked.every((entry) => typeof entry === 'string')
  );
};

export const isValidCompleted = (value) => Array.isArray(value) && value.every((entry) => typeof entry === 'string');

export const isValidSelectedOption = (value) =>
  value &&
  typeof value === 'object' &&
  !Array.isArray(value) &&
  Object.values(value).every((entry) => typeof entry === 'string');

export const isValidQuizState = (value) =>
  value &&
  typeof value === 'object' &&
  !Array.isArray(value) &&
  Object.values(value).every(
    (entry) =>
      entry && typeof entry === 'object' && typeof entry.answerIdx === 'number' && typeof entry.isCorrect === 'boolean'
  );

export const isValidResourceFilter = (value) =>
  typeof value === 'string' && NETWORK_FILTERS.some((filter) => filter.id === value);

export const normalizeHashToTab = (hashValue) => {
  const cleaned = String(hashValue || '')
    .replace(/^#/, '')
    .trim()
    .toLowerCase();
  const aliased = TAB_ALIASES[cleaned] ?? cleaned;
  return TAB_ITEMS.some((item) => item.id === aliased) ? aliased : 'start';
};

const normalizeTabId = (value) => normalizeHashToTab(String(value || '').replace(/^#/, ''));

export const getDefaultAppState = () => ({
  activeTab: 'start',
  currentVignette: 0,
  selectedOption: DEFAULT_SELECTED_OPTION,
  searchTerm: '',
  activeResourceFilter: 'all',
  quizState: DEFAULT_QUIZ_STATE,
  showSafeNote: true,
  score: DEFAULT_SCORE,
  completedModules: DEFAULT_COMPLETED,
});

const normalizeScore = (value) => {
  if (!isValidScore(value)) return DEFAULT_SCORE;

  const checked = [...new Set(value.checked.filter((entry) => VALID_ASSESSMENT_ITEM_IDS.has(entry)))];
  const risk = checked.reduce((sum, entry) => sum + (ASSESSMENT_ITEM_WEIGHTS.get(entry) ?? 0), 0);

  return { risk, checked };
};

const normalizeCompletedModules = (value) => {
  if (!isValidCompleted(value)) return DEFAULT_COMPLETED;

  return [...new Set(value.filter((entry) => VALID_MODULE_IDS.has(entry)))];
};

const normalizeSelectedOptionData = (value) => {
  if (!isValidSelectedOption(value)) return DEFAULT_SELECTED_OPTION;

  return Object.fromEntries(
    Object.entries(value).filter(([vignetteId, optionId]) => VIGNETTE_OPTION_IDS.get(vignetteId)?.has(optionId))
  );
};

const normalizeQuizStateData = (value) => {
  if (!isValidQuizState(value)) return DEFAULT_QUIZ_STATE;

  return Object.fromEntries(
    Object.entries(value).flatMap(([moduleId, entry]) => {
      const module = MODULE_BY_ID.get(moduleId);
      if (!module) return [];
      if (!Number.isInteger(entry.answerIdx) || entry.answerIdx < 0 || entry.answerIdx >= module.quizOptions.length)
        return [];

      return [[moduleId, { answerIdx: entry.answerIdx, isCorrect: entry.answerIdx === module.correctQuizIdx }]];
    })
  );
};

export const normalizeAppStateData = (value) => {
  const defaults = getDefaultAppState();
  const source = value && typeof value === 'object' ? value : {};

  return {
    activeTab: normalizeTabId(source.activeTab),
    currentVignette:
      Number.isInteger(source.currentVignette) &&
      source.currentVignette >= 0 &&
      source.currentVignette < VIGNETTEN.length
        ? source.currentVignette
        : defaults.currentVignette,
    selectedOption: normalizeSelectedOptionData(source.selectedOption),
    searchTerm: typeof source.searchTerm === 'string' ? source.searchTerm.trim() : defaults.searchTerm,
    activeResourceFilter: isValidResourceFilter(source.activeResourceFilter)
      ? source.activeResourceFilter
      : defaults.activeResourceFilter,
    quizState: normalizeQuizStateData(source.quizState),
    showSafeNote: typeof source.showSafeNote === 'boolean' ? source.showSafeNote : defaults.showSafeNote,
    score: normalizeScore(source.score),
    completedModules: normalizeCompletedModules(source.completedModules),
  };
};

export const isValidStoredAppState = (value) =>
  value &&
  typeof value === 'object' &&
  typeof value.version === 'number' &&
  value.version === APP_STATE_VERSION &&
  typeof value.updatedAt === 'number' &&
  typeof value.sourceId === 'string' &&
  value.data &&
  typeof value.data === 'object';

export const getInitialAppState = (storageKey) => {
  const defaults = getDefaultAppState();

  if (typeof window === 'undefined') return defaults;

  const rawHash = String(window.location.hash || '').replace(/^#/, '');
  const rawHashLower = rawHash.toLowerCase();
  const normalizedHash = normalizeHashToTab(rawHashLower);
  const requestedTab =
    rawHash && normalizedHash !== 'start'
      ? normalizedHash
      : TAB_ITEMS.some((item) => item.id === rawHashLower)
        ? rawHashLower
        : null;
  const storedAppState = safeParse(storageKey, null, (value) => isValidStoredAppState(value));

  if (storedAppState?.data) {
    const normalizedStoredState = normalizeAppStateData(storedAppState.data);
    return requestedTab
      ? {
          ...normalizedStoredState,
          activeTab: requestedTab,
        }
      : normalizedStoredState;
  }

  return {
    ...defaults,
    activeTab: requestedTab ?? normalizeHashToTab(window.location.hash),
  };
};

const PAGE_HEADING_IDS = {
  start: 'page-heading-start',
  lernmodule: 'page-heading-lernmodule',
  vignetten: 'page-heading-vignetten',
  toolbox: 'page-heading-toolbox',
  netzwerk: 'page-heading-netzwerk',
  evidenz: 'page-heading-evidenz',
  glossar: 'page-heading-glossar',
  grundlagen: 'page-heading-grundlagen',
};

export const getPageHeadingId = (tab) => PAGE_HEADING_IDS[tab] ?? 'page-heading-start';

export const getRiskLabel = (risk) => {
  if (risk >= 7) return 'Hinweis auf Schutzabklärung';
  if (risk >= 3) return 'Hinweis auf vertiefte Begleitung';
  return 'Hinweis auf tragende Ressourcen';
};

export const getRiskTone = (risk) => {
  if (risk >= 7) return 'bg-red-500 text-white';
  if (risk >= 3) return 'bg-amber-500 text-slate-900';
  // Audit 13 / F1: emerald-500 auf weiss ergab 2.47:1 Kontrast (unter WCAG AA
  // 4.5:1 fuer normalen Text). emerald-700 (#047857) bringt 5.30:1 und erhaelt
  // die visuelle Semantik 'tragende Ressourcen' (gruen fuer OK/unterstuetzend).
  return 'bg-emerald-700 text-white';
};

export const downloadTextFile = (filename, content) => {
  if (typeof window === 'undefined') return;

  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
};
