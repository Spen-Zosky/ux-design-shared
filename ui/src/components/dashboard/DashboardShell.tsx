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
  /**
   * Landmark dell'area del contenuto. Default `none` (dalla 1.7.0): un `<div>` senza ruolo,
   * focalizzabile per lo scorrimento da tastiera, e ogni pagina apre il proprio `<main>`.
   * Con `main` il guscio rende lui il `<main>` (contratto di ADR-0001) e le pagine non ne
   * aprono un secondo. Fino alla 1.6.0 era una `region` con nome, che conteneva il `<main>`
   * della pagina: axe `landmark-main-is-top-level` e `landmark-unique` su ogni pagina.
   */
  contentLandmark?: 'none' | 'main';
  /** Nome accessibile del `<main>` del guscio, usato solo con `contentLandmark="main"`. */
  contentLabel?: string;
}

export function DashboardShell({
  header,
  sidebar,
  footer,
  children,
  initialSidebarWidth = 260,
  className,
  contentLandmark = 'none',
  contentLabel,
}: DashboardShellProps) {
  const contentClass = 'min-h-0 min-w-0 overflow-y-auto p-4 md:p-6';
  return (
    <div
      // grid-cols-[minmax(0,1fr)]: senza colonne dichiarate l'unica colonna implicita prende
      // la larghezza minima dell'header, e a 390 px la pagina intera usciva a destra.
      className={cn(
        'h-screen grid min-w-0 grid-cols-[minmax(0,1fr)] grid-rows-[64px_1fr_44px] overflow-hidden bg-background text-foreground',
        className
      )}
    >
      {header}

      <div
        data-shell="grid"
        className="grid min-h-0 min-w-0 grid-cols-[var(--sidebar-w)_minmax(0,1fr)] max-md:grid-cols-[minmax(0,1fr)] max-md:[&>aside]:hidden"
        style={{ '--sidebar-w': `${initialSidebarWidth}px` } as React.CSSProperties}
      >
        {sidebar}
        {/* Default: un <div> senza ruolo, perché ogni pagina rende il proprio <main> e un
            landmark qui lo conterrebbe (axe landmark-main-is-top-level, landmark-unique, e
            landmark-banner-is-top-level per l'header di una pagina senza <main>).
            tabIndex={0} lo tiene scorrevole da tastiera (axe scrollable-region-focusable,
            WCAG 2.1.1). Con contentLandmark="main" il <main> lo dà il guscio. */}
        {contentLandmark === 'main' ? (
          <main tabIndex={0} aria-label={contentLabel} className={contentClass}>
            {children}
          </main>
        ) : (
          <div tabIndex={0} data-shell="content" className={contentClass}>
            {children}
          </div>
        )}
      </div>

      {footer}
    </div>
  );
}

export default DashboardShell;
