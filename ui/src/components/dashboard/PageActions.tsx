'use client';

import * as React from 'react';
import { cn } from '../../lib/cn';

/**
 * PageActions — Refresh + Export button pair rendered in dashboard page headers.
 *
 * Refresh: outlined secondary, hover lifts to accent. Export: solid primary
 * with download glyph. Both buttons are token-driven (`--border`, `--card`,
 * `--accent`, `--primary`, `--background`). Either action can be omitted.
 *
 * Source: extracted from apps/web/src/components/SystemHealthDashboard.tsx
 * (lines 188-212 of pre-promotion commit) per ADR-0013 R2.
 */

export interface PageActionsProps {
  /** If provided, shows the Refresh button wired to this handler. */
  onRefresh?: () => void;
  /** If provided, shows the Export button wired to this handler. */
  onExport?: () => void;
  /** Refresh button label. Default: "Aggiorna". */
  refreshLabel?: string;
  /** Export button label. Default: "Export report". */
  exportLabel?: string;
  className?: string;
}

function RefreshGlyph() {
  return (
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
      <polyline points="23 4 23 10 17 10" />
      <polyline points="1 20 1 14 7 14" />
      <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
    </svg>
  );
}

function ExportGlyph() {
  return (
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
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  );
}

export function PageActions({
  onRefresh,
  onExport,
  refreshLabel = 'Aggiorna',
  exportLabel = 'Export report',
  className,
}: PageActionsProps) {
  return (
    <div className={cn('flex items-center gap-2', className)}>
      {onRefresh !== undefined ? (
        <button
          type="button"
          aria-label={refreshLabel}
          onClick={onRefresh}
          className="inline-flex h-9 items-center gap-2 rounded-control border border-border bg-card px-3 text-sm text-muted-foreground transition hover:bg-accent hover:text-foreground hover:border-foreground/30"
        >
          <RefreshGlyph />
          {refreshLabel}
        </button>
      ) : null}
      {onExport !== undefined ? (
        <button
          type="button"
          onClick={onExport}
          className="inline-flex h-9 items-center gap-2 rounded-control bg-primary px-3 text-sm font-medium text-background transition hover:opacity-90"
          style={{ color: 'var(--background)' }}
        >
          <ExportGlyph />
          {exportLabel}
        </button>
      ) : null}
    </div>
  );
}

export default PageActions;
