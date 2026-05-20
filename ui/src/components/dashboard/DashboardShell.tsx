'use client';

import * as React from 'react';
import { cn } from '../../lib/cn';

/**
 * DashboardShell — canonical 3-row grid (header 64px / content 1fr / footer 44px)
 * with inner 2-column grid for sidebar + main.
 *
 * Spec: docs/07_sidebar_specification.md § "State management".
 *
 * The middle row uses an inner grid with `data-shell="grid"` so the sidebar
 * client component can mutate `grid-template-columns` inline (with !important)
 * for collapse/expand. The initial inline style is set here to avoid FOUC and
 * to work around a Chrome quirk on `transition: grid-template-columns`.
 *
 * Children prop receives [<sidebar>, <main>] as JSX or you can supply slots.
 */

export interface DashboardShellProps {
  header: React.ReactNode;
  sidebar: React.ReactNode;
  footer: React.ReactNode;
  children: React.ReactNode;
  /** Initial sidebar width in px. Default 260. */
  initialSidebarWidth?: number;
  className?: string;
}

export function DashboardShell({
  header,
  sidebar,
  footer,
  children,
  initialSidebarWidth = 260,
  className,
}: DashboardShellProps) {
  return (
    <div
      className={cn(
        'h-screen grid grid-rows-[64px_1fr_44px] overflow-hidden bg-background text-foreground',
        className
      )}
    >
      {header}

      <div
        data-shell="grid"
        className="grid min-h-0"
        style={{ gridTemplateColumns: `${initialSidebarWidth}px 1fr` }}
      >
        {sidebar}
        <main className="min-h-0 overflow-y-auto p-6">{children}</main>
      </div>

      {footer}
    </div>
  );
}

export default DashboardShell;
