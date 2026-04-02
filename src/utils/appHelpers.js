import { APP_STATE_VERSION, DEFAULT_COMPLETED, DEFAULT_QUIZ_STATE, DEFAULT_SCORE, DEFAULT_SELECTED_OPTION, NETWORK_FILTERS, TAB_ITEMS, VIGNETTEN } from '../data/content';

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
    window.localStorage.setItem(key, value);
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
      entry &&
      typeof entry === 'object' &&
      typeof entry.answerIdx === 'number' &&
      typeof entry.isCorrect === 'boolean'
  );

export const isValidResourceFilter = (value) =>
  typeof value === 'string' && NETWORK_FILTERS.some((filter) => filter.id === value);

export const normalizeHashToTab = (hashValue) => {
  const cleaned = String(hashValue || '').replace(/^#/, '');
  return TAB_ITEMS.some((item) => item.id === cleaned) ? cleaned : 'home';
};

export const getInitialTab = () => {
  if (typeof window === 'undefined') return 'home';
  return normalizeHashToTab(window.location.hash);
};

export const getDefaultAppState = () => ({
  activeTab: 'home',
  currentVignette: 0,
  selectedOption: DEFAULT_SELECTED_OPTION,
  searchTerm: '',
  activeResourceFilter: 'all',
  quizState: DEFAULT_QUIZ_STATE,
  showSafeNote: true,
  score: DEFAULT_SCORE,
  completedModules: DEFAULT_COMPLETED,
});

export const normalizeAppStateData = (value) => {
  const defaults = getDefaultAppState();
  const source = value && typeof value === 'object' ? value : {};

  return {
    activeTab: normalizeHashToTab(source.activeTab),
    currentVignette:
      Number.isInteger(source.currentVignette) && source.currentVignette >= 0 && source.currentVignette < VIGNETTEN.length
        ? source.currentVignette
        : defaults.currentVignette,
    selectedOption: isValidSelectedOption(source.selectedOption) ? source.selectedOption : defaults.selectedOption,
    searchTerm: typeof source.searchTerm === 'string' ? source.searchTerm : defaults.searchTerm,
    activeResourceFilter: isValidResourceFilter(source.activeResourceFilter)
      ? source.activeResourceFilter
      : defaults.activeResourceFilter,
    quizState: isValidQuizState(source.quizState) ? source.quizState : defaults.quizState,
    showSafeNote: typeof source.showSafeNote === 'boolean' ? source.showSafeNote : defaults.showSafeNote,
    score: isValidScore(source.score) ? source.score : defaults.score,
    completedModules: isValidCompleted(source.completedModules) ? source.completedModules : defaults.completedModules,
  };
};

export const isValidStoredAppState = (value) =>
  value &&
  typeof value === 'object' &&
  value.version === APP_STATE_VERSION &&
  typeof value.updatedAt === 'number' &&
  typeof value.sourceId === 'string' &&
  value.data &&
  typeof value.data === 'object';

export const getInitialAppState = (storageKey) => {
  const defaults = getDefaultAppState();

  if (typeof window === 'undefined') return defaults;

  const storedAppState = safeParse(storageKey, null, (value) => isValidStoredAppState(value));

  if (storedAppState?.data) {
    return normalizeAppStateData(storedAppState.data);
  }

  return {
    ...defaults,
    activeTab: normalizeHashToTab(window.location.hash),
  };
};

export const getPageHeadingId = (tab) => {
  switch (tab) {
    case 'home':
      return 'page-heading-home';
    case 'elearning':
      return 'page-heading-elearning';
    case 'vignetten':
      return 'page-heading-vignetten';
    case 'toolbox':
      return 'page-heading-toolbox';
    case 'zuerich':
      return 'page-heading-zuerich';
    case 'zaesur':
      return 'page-heading-zaesur';
    default:
      return 'page-heading-home';
  }
};


export const getRiskLabel = (risk) => {
  if (risk >= 7) return 'Hinweis auf Schutzabklärung';
  if (risk >= 3) return 'Hinweis auf vertiefte Begleitung';
  return 'Hinweis auf tragende Ressourcen';
};

export const getRiskTone = (risk) => {
  if (risk >= 7) return 'bg-red-500 text-white';
  if (risk >= 3) return 'bg-amber-500 text-slate-900';
  return 'bg-emerald-500 text-white';
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
