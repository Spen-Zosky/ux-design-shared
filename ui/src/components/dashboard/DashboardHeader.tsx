'use client';

import * as React from 'react';
import { useEffect } from 'react';
import { cn } from '../../lib/cn';
import { HeuresysWordmark } from '../wordmark';
import { PaletteDropdown } from './PaletteDropdown';

/**
 * DashboardHeader — full composition.
 * Spec: docs/06_header_specification.md (extended).
 *
 * Slots:
 *   left:        hamburger | logo | breadcrumb
 *   middle:      command palette trigger (⌘K)
 *   right:       language | palette dropdown | theme toggle | user identity card
 *
 * All sub-elements are rendered by this component but can be overridden via
 * `leftExtras` and `rightExtras` slots (rendered after the default content).
 */

export type HeaderBreadcrumb = ReadonlyArray<Readonly<{ label: string; href?: string }>>;

export interface UserIdentity {
  initials: string;
  username: string;
  role: string;
  /** Tailwind color token without the leading `text-` prefix. Default "warning". */
  roleTone?: string;
}

export interface DashboardHeaderProps {
  breadcrumb?: HeaderBreadcrumb;
  user?: UserIdentity;
  language?: 'IT' | 'EN';
  onToggleLanguage?: () => void;
  onOpenMenu?: () => void;
  onOpenCommandPalette?: () => void;
  className?: string;
  /** Override the default wordmark logo with a custom node (e.g. the canonical
   *  two-color SVG inline used in the SUPERUSER prototype). */
  logo?: React.ReactNode;
  /** Optional trailing badge next to the logo (e.g. "advanced" product chip). */
  logoBadge?: React.ReactNode;
  leftExtras?: React.ReactNode;
  rightExtras?: React.ReactNode;
}

const STORAGE_THEME = 'heuresys-theme';

function applyTheme(theme: 'light' | 'dark') {
  const html = document.documentElement;
  if (theme === 'dark') html.classList.add('dark');
  else html.classList.remove('dark');
}

export function DashboardHeader({
  breadcrumb,
  user,
  language = 'IT',
  onToggleLanguage,
  onOpenMenu,
  onOpenCommandPalette,
  className,
  logo,
  logoBadge,
  leftExtras,
  rightExtras,
}: DashboardHeaderProps) {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const saved = window.localStorage.getItem(STORAGE_THEME);
    if (saved === 'light' || saved === 'dark') applyTheme(saved);
  }, []);

  function toggleTheme() {
    const isDark = document.documentElement.classList.toggle('dark');
    window.localStorage.setItem(STORAGE_THEME, isDark ? 'dark' : 'light');
  }

  return (
    <header
      role="banner"
      className={cn(
        'z-30 flex h-16 items-center justify-between border-b border-border bg-background/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/75',
        className
      )}
    >
      <div className="flex min-w-0 items-center gap-3">
        <button
          type="button"
          aria-label="Apri menu contesto globale"
          onClick={onOpenMenu}
          className="inline-flex h-9 w-9 items-center justify-center rounded-control border border-border text-muted-foreground transition hover:bg-accent hover:text-foreground hover:border-foreground/30"
        >
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>

        <a href="/app" aria-label="Heuresys — pagina iniziale autenticata" className="flex items-center gap-2.5">
          {logo ?? <HeuresysWordmark variant="brand" size="md" />}
          {logoBadge}
        </a>

        {breadcrumb && breadcrumb.length > 0 && (
          <>
            <span className="text-muted-foreground/40">/</span>
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-muted-foreground">
              {breadcrumb.map((b, i) => {
                const isLast = i === breadcrumb.length - 1;
                return (
                  <span key={i} className="flex items-center gap-2">
                    {isLast ? <span className="font-medium text-foreground">{b.label}</span>
                            : <a href={b.href ?? '#'}>{b.label}</a>}
                    {!isLast && (
                      <svg className="h-3 w-3 opacity-50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <polyline points="9 18 15 12 9 6" />
                      </svg>
                    )}
                  </span>
                );
              })}
            </nav>
          </>
        )}

        {leftExtras}
      </div>

      <div className="flex items-center gap-2">
        <button
          id="js-command-palette-trigger"
          type="button"
          aria-label="Apri command palette"
          onClick={onOpenCommandPalette}
          className="hidden md:inline-flex h-9 items-center gap-2 rounded-control border border-border bg-card px-3 text-sm text-muted-foreground transition hover:bg-accent hover:text-foreground hover:border-foreground/30"
        >
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <span>Cerca tenant, log, audit…</span>
          <kbd className="ml-2 rounded border border-border bg-background px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">⌘ K</kbd>
        </button>

        <button
          type="button"
          aria-label="Cambia lingua tra italiano e inglese"
          onClick={onToggleLanguage}
          className="inline-flex h-9 items-center gap-2 rounded-control border border-border px-3 text-sm text-muted-foreground transition hover:bg-accent hover:text-foreground hover:border-foreground/30"
        >
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <circle cx="12" cy="12" r="10" />
            <line x1="2" y1="12" x2="22" y2="12" />
            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
          </svg>
          <span className="font-medium">{language}</span>
        </button>

        <PaletteDropdown />

        <button
          id="js-theme-toggle"
          type="button"
          aria-label="Alterna tema chiaro/scuro"
          onClick={toggleTheme}
          className="inline-flex h-9 w-9 items-center justify-center rounded-control border border-border text-muted-foreground transition hover:bg-accent hover:text-foreground hover:border-foreground/30"
        >
          <svg className="h-4 w-4 [.dark_&]:hidden" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
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
          <svg className="hidden h-4 w-4 [.dark_&]:block" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
          </svg>
        </button>

        {user && (
          <div className="ml-1 flex items-center gap-2 rounded-control border border-border bg-card px-2 py-1.5">
            <span className={`relative inline-flex h-7 w-7 items-center justify-center rounded-full bg-${user.roleTone ?? 'palette-3'}/20 text-xs font-semibold text-${user.roleTone ?? 'palette-3'}`}>
              {user.initials}
            </span>
            <div className="hidden flex-col leading-tight sm:flex">
              <span className="text-xs font-medium text-foreground">{user.username}</span>
              <span className={`font-mono text-[10px] uppercase tracking-wider text-${user.roleTone ?? 'warning'}`}>{user.role}</span>
            </div>
          </div>
        )}

        {rightExtras}
      </div>
    </header>
  );
}

export default DashboardHeader;
