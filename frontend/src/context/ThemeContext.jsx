// ThemeContext.jsx
// Source of truth for the site's color themes. Berry Modern is the
// default/first-class theme; the previous dark theme is kept as a
// toggleable alternate. Tokens are written to `document.documentElement` so
// every component that already uses `var(--…)` roles re-themes automatically.
//
// Fixes from the previous version:
// - A stale/invalid value left in localStorage (e.g. from a theme that was
//   later removed) used to be trusted as-is: state got stuck on the bad
//   string forever, even though applyTheme() silently fell back to Berry
//   for the actual CSS variables — the visible theme and `theme`/`data-theme`
//   disagreed. The stored value is now validated against `themes` up front.
// - `toggleTheme` was hardcoded to flip only between 'dark' and 'berry'.
//   It now cycles through whatever keys `themes` actually has, so adding a
//   third theme doesn't require touching this function.
// - `set()` now guards the localStorage write the same way the initial read
//   already did, for SSR-safety.

import { createContext, useContext, useEffect, useState, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';

export const themes = {
  berry: {
    // SoftNet mockup — cream paper + magenta / pink / violet.
    '--primary-background-color': '#f5f1ea',
    '--secondary-background-color': '#ece6dc',
    '--text-color': '#000000',
    '--text-muted-color': 'rgba(0 0 0 / 0.62)',
    '--accent-color': '#ec4be6',
    '--highlight-color': '#fa4e8a',
    '--link-color': '#000000',
    '--border-color': '#000000',

    '--brand-magenta': '#ec4be6',
    '--brand-coral': '#fa4e8a',
    '--brand-indigo': '#462fd6',

    '--deep-charcoal': '#000000',
    '--muted-indigo': '#462fd6',
    '--magenta-glow': 'rgba(236 75 230 / 0.18)',
    '--coral-glow': 'rgba(250 78 138 / 0.14)',

    '--primary-bg': '#f5f1ea',
    '--secondary-bg': 'linear-gradient(135deg, #ec4be6, #462fd6)',

    '--nav-bg': '#f5f1ea',
    '--nav-bg-scrolled': '#f5f1ea',
    '--nav-border': 'rgba(0 0 0 / 0.12)',
    '--nav-text': '#000000',
    '--nav-text-muted': 'rgba(0 0 0 / 0.62)',
    '--nav-surface': 'rgba(0 0 0 / 0.06)',
    '--nav-surface-hover': 'rgba(0 0 0 / 0.10)',
    '--nav-text-scrolled': '#000000',
    '--nav-text-muted-scrolled': 'rgba(0 0 0 / 0.62)',
    '--nav-surface-scrolled': 'rgba(0 0 0 / 0.06)',
    '--nav-surface-hover-scrolled': 'rgba(0 0 0 / 0.10)',

    '--surface-color': 'rgba(0 0 0 / 0.06)',
    '--surface-hover': 'rgba(0 0 0 / 0.12)',
  },

  dark: {
    // The previous site palette, preserved exactly.
    '--primary-background-color': '#0c0826',
    '--secondary-background-color': '#161231',
    '--text-color': '#f7f3ea',
    '--text-muted-color': 'rgba(247 243 234 / 0.62)',
    '--accent-color': '#fb5178',
    '--highlight-color': '#de5ff1',
    '--link-color': '#9b8fe0',
    '--border-color': '#2a2440',

    '--brand-magenta': '#d946ef',
    '--brand-coral': '#fb5178',
    '--brand-indigo': '#4b32d6',

    '--deep-charcoal': '#0c0826',
    '--muted-indigo': '#161231',
    '--magenta-glow': '#29042f',
    '--coral-glow': '#2d010b',

    '--primary-bg':
      'radial-gradient(circle at 18% 20%, var(--magenta-glow), transparent 42%), radial-gradient(circle at 82% 78%, var(--coral-glow), transparent 42%), linear-gradient(135deg, var(--deep-charcoal), var(--muted-indigo) 80%)',
    '--secondary-bg':
      'radial-gradient(circle at 18% 20%, var(--magenta-glow), transparent 42%), radial-gradient(circle at 82% 78%, var(--coral-glow), transparent 42%), linear-gradient(135deg, var(--muted-indigo), var(--deep-charcoal) 80%)',

    '--nav-bg': 'transparent',
    '--nav-bg-scrolled': '#ffffff',
    '--nav-border': 'rgba(0 0 0 / 0.08)',
    '--nav-text': '#f7f3ea',
    '--nav-text-muted': 'rgba(247 243 234 / 0.62)',
    '--nav-surface': 'rgba(247 243 234 / 0.06)',
    '--nav-surface-hover': 'rgba(247 243 234 / 0.10)',
    '--nav-text-scrolled': '#0c0826',
    '--nav-text-muted-scrolled': 'rgba(12 8 38 / 0.62)',
    '--nav-surface-scrolled': 'rgba(12 8 38 / 0.06)',
    '--nav-surface-hover-scrolled': 'rgba(12 8 38 / 0.10)',

    '--surface-color': 'rgba(247 243 234 / 0.06)',
    '--surface-hover': 'rgba(247 243 234 / 0.12)',
  },
};

export const defaultTheme = 'berry';
const STORAGE_KEY = 'softnet:theme';

const applyTheme = (name) => {
  // Resolve to a real key before doing anything, so the CSS variables that
  // get applied and the data-theme attribute that gets set always agree —
  // previously an invalid `name` fell through to Berry's tokens but still
  // labelled the DOM with the invalid name.
  const key = themes[name] ? name : defaultTheme;
  const tokens = themes[key];
  const root = document.documentElement;
  Object.entries(tokens).forEach(([prop, value]) => {
    root.style.setProperty(prop, value);
  });
  root.setAttribute('data-theme', key);
};

const readStoredTheme = (fallback) => {
  if (typeof window === 'undefined') return fallback;
  const stored = window.localStorage.getItem(STORAGE_KEY);
  return themes[stored] ? stored : fallback;
};

const ThemeContext = createContext();

export const ThemeProvider = ({ children, defaultTheme: initial = defaultTheme }) => {
  const [theme, setTheme] = useState(() => readStoredTheme(initial));

  const set = useCallback((name) => {
    if (!themes[name]) return;
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(STORAGE_KEY, name);
    }
    setTheme(name);
  }, []);

  // Cycles through whatever themes actually exist instead of hardcoding
  // 'dark' / 'berry', so a third theme added to `themes` works here for free.
  const toggleTheme = useCallback(() => {
    const keys = Object.keys(themes);
    const nextIndex = (keys.indexOf(theme) + 1) % keys.length;
    set(keys[nextIndex]);
  }, [theme, set]);

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  const value = useMemo(() => ({ theme, setTheme: set, toggleTheme, themes }), [theme, set, toggleTheme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return ctx;
};

ThemeProvider.propTypes = {
  children: PropTypes.node.isRequired,
  defaultTheme: PropTypes.oneOf(Object.keys(themes)),
};