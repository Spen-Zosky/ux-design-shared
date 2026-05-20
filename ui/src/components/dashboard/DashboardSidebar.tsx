'use client';

import * as React from 'react';
import { useEffect, type ReactNode } from 'react';
import { cn } from '../../lib/cn';

/**
 * DashboardSidebar — collapsible side navigation.
 * Spec: docs/07_sidebar_specification.md.
 *
 * The sidebar consumes a `groups` prop (each group has id, label, optional
 * aux label, and a list of nav items). The collapse state lives on
 * `body[data-sidebar="collapsed"]` and is mirrored on the shell grid via
 * inline `style="grid-template-columns:..."` with !important (Chrome quirk).
 *
 * To embed custom content (e.g. DBSupervisorSidebar) inside a group, pass a
 * `customGroup` slot. To replace the footer card, pass `footerSlot`.
 */

export interface NavItem {
  id: string;
  label: ReactNode;
  href: string;
  icon?: ReactNode;
  aux?: ReactNode;       // badge / dot / count
  active?: boolean;
}

export interface NavGroup {
  id: string;
  label: ReactNode;
  items?: ReadonlyArray<NavItem>;
  /** Render a custom <ul> body in place of `items` (e.g. DBSupervisorSidebar). */
  customContent?: ReactNode;
  /** Initial expanded state. Default true. */
  defaultExpanded?: boolean;
}

export interface DashboardSidebarProps {
  groups: ReadonlyArray<NavGroup>;
  /** Optional override for the build-info card at the bottom. */
  footerSlot?: ReactNode;
  className?: string;
}

const STORAGE_SIDEBAR = 'heuresys-sidebar';
const STORAGE_GROUPS = 'heuresys-sidebar-groups';

function applySidebarState(collapsed: boolean) {
  const body = document.body;
  const grid = document.querySelector<HTMLElement>('[data-shell="grid"]');
  if (collapsed) {
    body.setAttribute('data-sidebar', 'collapsed');
    if (grid) grid.style.setProperty('grid-template-columns', '72px 1fr', 'important');
  } else {
    body.removeAttribute('data-sidebar');
    if (grid) grid.style.setProperty('grid-template-columns', '260px 1fr', 'important');
  }
}

export function DashboardSidebar({ groups, footerSlot, className }: DashboardSidebarProps) {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const saved = window.localStorage.getItem(STORAGE_SIDEBAR);
    applySidebarState(saved === 'collapsed');
  }, []);

  function toggleSidebar() {
    const isCollapsed = document.body.getAttribute('data-sidebar') === 'collapsed';
    applySidebarState(!isCollapsed);
    window.localStorage.setItem(STORAGE_SIDEBAR, !isCollapsed ? 'collapsed' : 'expanded');
  }

  return (
    <aside
      aria-label="Navigazione principale"
      className={cn('min-h-0 overflow-hidden border-r border-border bg-sidebar text-sidebar-foreground', className)}
    >
      <div className="flex h-full min-h-0 flex-col">
        <div className="flex h-11 shrink-0 items-center justify-between border-b border-border px-3">
          <span className="sidebar-section-label text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
            Navigation
          </span>
          <button
            id="js-sidebar-toggle"
            type="button"
            aria-label="Comprimi/espandi sidebar"
            onClick={toggleSidebar}
            className="inline-flex h-8 w-8 items-center justify-center rounded-control text-muted-foreground transition hover:bg-accent hover:text-foreground"
          >
            <svg className="sidebar-icon-collapse h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
              <line x1="9" y1="3" x2="9" y2="21" />
              <polyline points="14 9 11 12 14 15" />
            </svg>
            <svg className="sidebar-icon-expand hidden h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
              <line x1="9" y1="3" x2="9" y2="21" />
              <polyline points="11 9 14 12 11 15" />
            </svg>
          </button>
        </div>

        <nav className="min-h-0 flex-1 overflow-y-auto px-2 py-3">
          {groups.map((group) => (
            <SidebarGroup key={group.id} group={group} />
          ))}
        </nav>

        {footerSlot ?? <DefaultSidebarFooter />}
      </div>
    </aside>
  );
}

function SidebarGroup({ group }: { group: NavGroup }) {
  const [expanded, setExpanded] = React.useState<boolean>(group.defaultExpanded ?? true);

  React.useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      const state = JSON.parse(window.localStorage.getItem(STORAGE_GROUPS) || '{}') as Record<string, boolean>;
      if (state[group.id] === false) setExpanded(false);
    } catch { /* noop */ }
  }, [group.id]);

  function toggle() {
    setExpanded((prev) => {
      const next = !prev;
      try {
        const state = JSON.parse(window.localStorage.getItem(STORAGE_GROUPS) || '{}') as Record<string, boolean>;
        state[group.id] = next;
        window.localStorage.setItem(STORAGE_GROUPS, JSON.stringify(state));
      } catch { /* noop */ }
      return next;
    });
  }

  return (
    <div className="sidebar-group mb-3" data-group={group.id}>
      <button
        type="button"
        data-group-toggle={group.id}
        aria-expanded={expanded}
        onClick={toggle}
        className="sidebar-group-toggle flex w-full items-center justify-between gap-2 rounded-control px-2 py-1 text-left text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground/70 transition hover:text-foreground"
      >
        <span>{group.label}</span>
        <svg data-group-chevron className="h-3 w-3 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>
      {group.customContent ? (
        <ul className="sidebar-group-content mt-0.5 space-y-0.5">{group.customContent}</ul>
      ) : (
        <ul className="sidebar-group-content mt-0.5 space-y-0.5">
          {(group.items ?? []).map((item) => (
            <li key={item.id}>
              <a
                href={item.href}
                aria-current={item.active ? 'page' : undefined}
                className={cn(
                  'nav-link flex items-center justify-between gap-2 rounded-control px-2 py-2 text-sm transition',
                  item.active
                    ? 'bg-accent text-foreground font-medium'
                    : 'text-muted-foreground hover:bg-accent hover:text-foreground'
                )}
              >
                <span className="flex min-w-0 items-center gap-2">
                  {item.icon && <span className="shrink-0">{item.icon}</span>}
                  <span className="nav-label truncate">{item.label}</span>
                </span>
                {item.aux && <span className="nav-aux">{item.aux}</span>}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function DefaultSidebarFooter() {
  return (
    <div className="sidebar-footer-card shrink-0 border-t border-border p-3">
      <div className="rounded-control border border-border bg-card p-2.5">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">Build</span>
          <span className="inline-flex h-1.5 w-1.5 rounded-full bg-success" aria-hidden="true" />
        </div>
        <div className="mt-1 font-mono text-[11px] text-foreground">v5.0.0-mvp3</div>
        <div className="font-mono text-[10px] text-muted-foreground">— · production</div>
      </div>
    </div>
  );
}

export default DashboardSidebar;
