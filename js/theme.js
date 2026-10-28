// ── Light / dark theme
// Loaded synchronously in every page's <head>, before the stylesheet, so the
// right theme is set before the first paint (no flash of the wrong theme).
//
//   • First visit: follows the operating-system preference (and keeps following
//     it live until the visitor picks a theme).
//   • An explicit choice from the toggle is saved in localStorage ("theme") and
//     reused on every page and later visits.
//   • Colours are tokens in css/style.css (:root and :root[data-theme="dark"]).
(function () {
  const KEY = 'theme';
  const root = document.documentElement;
  const systemDark = window.matchMedia ? window.matchMedia('(prefers-color-scheme: dark)') : null;
  const reduceMotion = window.matchMedia ? window.matchMedia('(prefers-reduced-motion: reduce)') : null;

  // localStorage can throw (private mode, blocked storage) — treat that as "no choice".
  function storedTheme() {
    try {
      const value = localStorage.getItem(KEY);
      return value === 'light' || value === 'dark' ? value : null;
    } catch (e) { return null; }
  }
  function systemTheme() { return systemDark && systemDark.matches ? 'dark' : 'light'; }

  function applyTheme(theme) {
    root.setAttribute('data-theme', theme);
    document.querySelectorAll('.theme-toggle').forEach(btn => {
      btn.setAttribute('aria-pressed', String(theme === 'dark'));
      btn.title = theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode';
    });
  }

  applyTheme(storedTheme() || systemTheme());

  // Follow OS changes while the visitor hasn't chosen a theme themselves.
  if (systemDark) {
    const onSystemChange = () => { if (!storedTheme()) applyTheme(systemTheme()); };
    if (systemDark.addEventListener) systemDark.addEventListener('change', onSystemChange);
    else if (systemDark.addListener) systemDark.addListener(onSystemChange);
  }

  // Keep other open tabs in step with a choice made here.
  window.addEventListener('storage', e => { if (e.key === KEY) applyTheme(storedTheme() || systemTheme()); });

  let switchTimer;
  document.addEventListener('DOMContentLoaded', () => {
    applyTheme(root.getAttribute('data-theme')); // sync the button state now that it exists
    document.querySelectorAll('.theme-toggle').forEach(btn => {
      btn.addEventListener('click', () => {
        const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        if (!(reduceMotion && reduceMotion.matches)) {
          root.classList.add('theme-switching');
          clearTimeout(switchTimer);
          switchTimer = setTimeout(() => root.classList.remove('theme-switching'), 350);
        }
        applyTheme(next);
        try { localStorage.setItem(KEY, next); } catch (e) { /* choice just won't persist */ }
      });
    });
  });
})();
