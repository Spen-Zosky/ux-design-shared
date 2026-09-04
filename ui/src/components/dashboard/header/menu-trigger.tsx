'use client';

import * as React from 'react';

export interface HeaderMenuTriggerProps {
  onOpenMenu?: () => void;
  /** aria-label del bottone. Default: "Apri menu contesto globale". */
  label?: string;
}

export function HeaderMenuTrigger({
  onOpenMenu,
  label = 'Apri menu contesto globale',
}: HeaderMenuTriggerProps) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onOpenMenu}
      className="inline-flex h-9 w-9 items-center justify-center rounded-control border border-border text-muted-foreground transition hover:bg-accent hover:text-foreground hover:border-foreground/30"
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
        <line x1="3" y1="6" x2="21" y2="6" />
        <line x1="3" y1="12" x2="21" y2="12" />
        <line x1="3" y1="18" x2="21" y2="18" />
      </svg>
    </button>
  );
}

export default HeaderMenuTrigger;
