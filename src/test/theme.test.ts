import { applyThemeClass, getStoredTheme, setStoredTheme } from '../utils/theme'

describe('theme utilities', () => {
  beforeEach(() => {
    window.localStorage.clear();
    document.documentElement.dataset.theme = '';
  })

  it('stores and applies a light theme', () => {
    setStoredTheme('light');

    expect(getStoredTheme()).toBe('light');

    applyThemeClass('light');
    expect(document.documentElement.dataset.theme).toBe('light');
  })
})