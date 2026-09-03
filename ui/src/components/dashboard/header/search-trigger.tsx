'use client';

import * as React from 'react';

export interface HeaderSearchTriggerProps {
  onOpenCommandPalette?: () => void;
  /** Testo del trigger. Default: "Cerca tenant, log, audit…". */
  placeholder?: string;
}

export function HeaderSearchTrigger({
  onOpenCommandPalette,
  placeholder = 'Cerca tenant, log, audit…',
}: HeaderSearchTriggerProps) {
  return (
    <button
      id="js-command-palette-trigger"
      type="button"
      aria-label="Apri command palette"
      onClick={onOpenCommandPalette}
      className="hidden md:inline-flex h-9 items-center gap-2 rounded-control border border-border bg-card px-3 text-sm text-muted-foreground transition hover:bg-accent hover:text-foreground hover:border-foreground/30"
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
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
      <span>{placeholder}</span>
      <kbd className="ml-2 rounded border border-border bg-background px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">
        ⌘ K
      </kbd>
    </button>
  );
}

export default HeaderSearchTrigger;
