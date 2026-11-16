'use client';

import * as React from 'react';

export interface HeaderLanguageSwitcherProps {
  language?: 'IT' | 'EN';
  onToggleLanguage?: () => void;
  /** Nome accessibile del pulsante; deve cominciare con la sigla visibile (WCAG 2.5.3). */
  label?: (language: string) => string;
}

export function HeaderLanguageSwitcher({
  language = 'IT',
  onToggleLanguage,
  label = (lang) => `${lang} — cambia lingua tra italiano e inglese`,
}: HeaderLanguageSwitcherProps) {
  return (
    <button
      type="button"
      // WCAG 2.5.3 (Label in Name): il nome accessibile comincia con ciò che si vede, la sigla
      // della lingua, così chi comanda a voce può dire «IT» e il lettore di schermo legge lo stesso.
      aria-label={label(language)}
      onClick={onToggleLanguage}
      className="inline-flex h-9 items-center gap-2 rounded-control border border-border px-3 text-sm text-muted-foreground transition hover:bg-accent hover:text-foreground hover:border-foreground/30"
    >
      <svg
        className="h-4 w-4"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
      <span className="font-medium">{language}</span>
    </button>
  );
}

export default HeaderLanguageSwitcher;
