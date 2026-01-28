const STORAGE_KEY = 'onetv-theme';

export type ThemeMode = 'light' | 'dark';

export const getStoredTheme = (): ThemeMode => {
  if (typeof window === 'undefined') {
    return 'dark';
  }
  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (stored === 'light' || stored === 'dark') {
    return stored;
  }
  return 'dark';
}

export const setStoredTheme = (mode: ThemeMode) => {
  if (typeof window === 'undefined') {
    return;
  }
  window.localStorage.setItem(STORAGE_KEY, mode);
}

export const resolveTheme = (mode: ThemeMode): 'light' | 'dark' => {
  return mode;
}

export const applyThemeClass = (theme: 'light' | 'dark') => {
  if (typeof document === 'undefined') {
    return;
  }
  document.documentElement.dataset.theme = theme;
}
