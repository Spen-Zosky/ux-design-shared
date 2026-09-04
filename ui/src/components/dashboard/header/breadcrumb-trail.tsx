'use client';

import * as React from 'react';
import type { BreadcrumbItem } from '../../breadcrumbs';

/** Alias pubblico: stesso tipo di `BreadcrumbItem[]` di `../../breadcrumbs`.
 *  Prima di questo consolidamento (2026-09-03) esisteva un secondo tipo
 *  `{label; href?}` senza `onClick`, ridondante — vedi
 *  docs/superpowers/specs/2026-09-03-header-storybook-taxonomy.md § 3. */
export type HeaderBreadcrumb = ReadonlyArray<BreadcrumbItem>;

export interface HeaderBreadcrumbTrailProps {
  items?: HeaderBreadcrumb;
}

export function HeaderBreadcrumbTrail({ items }: HeaderBreadcrumbTrailProps) {
  if (!items || items.length === 0) return null;

  return (
    <>
      <span className="text-muted-foreground/40">/</span>
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-muted-foreground">
        {items.map((b, i) => {
          const isLast = i === items.length - 1;
          return (
            <span key={i} className="flex items-center gap-2">
              {isLast ? (
                <span className="font-medium text-foreground">{b.label}</span>
              ) : b.onClick ? (
                <button type="button" onClick={b.onClick} className="hover:text-foreground">
                  {b.label}
                </button>
              ) : (
                <a href={b.href ?? '#'}>{b.label}</a>
              )}
              {!isLast && (
                <svg
                  className="h-3 w-3 opacity-50"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              )}
            </span>
          );
        })}
      </nav>
    </>
  );
}

export default HeaderBreadcrumbTrail;
