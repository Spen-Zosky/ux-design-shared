'use client';

import * as React from 'react';
import { useThemeOptional } from '../../theme-provider';

export function HeaderThemeToggle() {
  // Volutamente la variante opzionale: senza ThemeProvider questo pulsante
  // diventa inerte, invece di abbattere l'header che lo contiene e con esso
  // l'intera pagina. Vedi il commento su useThemeOptional.
  const theme = useThemeOptional();
  const isDark = theme?.resolved === 'dark';
  const disabled = theme === null;

  function toggle() {
    theme?.setTheme(isDark ? 'light' : 'dark');
  }

  return (
    <button
      id="js-theme-toggle"
      type="button"
      aria-label="Alterna tema chiaro/scuro"
      disabled={disabled}
      title={disabled ? 'Tema non disponibile: manca ThemeProvider' : undefined}
      onClick={toggle}
      className="inline-flex h-9 w-9 items-center justify-center rounded-control border border-border text-muted-foreground transition hover:bg-accent hover:text-foreground hover:border-foreground/30 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-transparent disabled:hover:text-muted-foreground disabled:hover:border-border"
    >
      <svg
        className="h-4 w-4 [.dark_&]:hidden"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="5" />
        <line x1="12" y1="1" x2="12" y2="3" />
        <line x1="12" y1="21" x2="12" y2="23" />
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
        <line x1="1" y1="12" x2="3" y2="12" />
        <line x1="21" y1="12" x2="23" y2="12" />
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
      </svg>
      <svg
        className="hidden h-4 w-4 [.dark_&]:block"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
      </svg>
    </button>
  );
}

export default HeaderThemeToggle;
