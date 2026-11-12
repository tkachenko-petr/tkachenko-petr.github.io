export type Theme = 'dark' | 'light'

// index.html restores the preference before React or styles are loaded.
export function getInitialTheme(): Theme {
  return document.documentElement.dataset.theme === 'light' ? 'light' : 'dark'
}

export function applyTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme
  document.querySelector('meta[name="theme-color"]')?.setAttribute(
    'content', theme === 'light' ? '#E8EBF0' : '#070A12',
  )

  try {
    localStorage.setItem('portfolio-theme', theme)
  } catch {
    // The switch still works for this visit when browser storage is unavailable.
  }
}
