'use client';

import * as React from 'react';
import { cn } from '../../lib/cn';
import { HeuresysWordmark } from '../wordmark';
import { PaletteDropdown } from './PaletteDropdown';
import { CommandPalette, useGlobalCmdK } from '../command-palette';
import {
  HeaderMenuTrigger,
  HeaderBreadcrumbTrail,
  HeaderSearchTrigger,
  HeaderLanguageSwitcher,
  HeaderThemeToggle,
  HeaderUserIdentity,
  HeaderUserMenu,
  HeaderMobileDrawer,
  type HeaderBreadcrumb,
  type UserIdentity,
  type HeaderUserMenuTenant,
} from './header';

/**
 * DashboardHeader — full composition.
 * Spec: docs/06_header_specification.md (extended);
 * docs/superpowers/specs/2026-09-03-header-storybook-taxonomy.md (riorganizzazione + consolidamento).
 * Storybook: ogni sotto-elemento ha una story propria sotto il gruppo `Header/`.
 *
 * Slots:
 *   left:        hamburger (→ drawer mobile) | logo | breadcrumb
 *   middle:      command palette trigger (⌘K → CommandPalette reale)
 *   right:       language | palette dropdown | theme toggle | user menu
 *
 * All sub-elements are rendered by this component but can be overridden via
 * `leftExtras` and `rightExtras` slots (rendered after the default content).
 *
 * API pubblica invariata rispetto a prima del 2026-09-03 tranne 3 nuove prop
 * OPZIONALI additive: `commandPaletteContent`, `mobileNav`, `userMenu`.
 * Nessun consumer esistente deve cambiare nulla per continuare a funzionare.
 */

export type { HeaderBreadcrumb, UserIdentity };

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
  /** Contenuto della command palette (⌘K) — `CommandPalette.Group`/`CommandPalette.Item`.
   *  Se assente, la palette si apre comunque con un "Nessun comando configurato"
   *  invece di non aprirsi affatto (regressione rispetto al bottone morto di prima). */
  commandPaletteContent?: React.ReactNode;
  /** Contenuto del drawer mobile aperto dall'hamburger — tipicamente lo stesso
   *  nodo passato come `sidebar` a DashboardShell. Se assente, l'hamburger non
   *  apre nulla (comportamento identico a prima del 2026-09-03). */
  mobileNav?: React.ReactNode;
  /** Se presente, sostituisce la user identity statica con HeaderUserMenu
   *  (dropdown Profilo/Impostazioni/Logout/Cambio tenant). Richiede comunque `user`. */
  userMenu?: {
    tenants?: ReadonlyArray<HeaderUserMenuTenant>;
    onSelectTenant?: (id: string) => void;
    onNavigateProfile?: () => void;
    onNavigateSettings?: () => void;
    onLogout?: () => void;
  };
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
  commandPaletteContent,
  mobileNav,
  userMenu,
}: DashboardHeaderProps) {
  const [paletteOpen, setPaletteOpen] = React.useState(false);
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  function handleOpenMenu() {
    onOpenMenu?.();
    if (mobileNav) setDrawerOpen(true);
  }

  const handleOpenCommandPalette = React.useCallback(() => {
    onOpenCommandPalette?.();
    setPaletteOpen(true);
  }, [onOpenCommandPalette]);

  useGlobalCmdK(handleOpenCommandPalette);

  return (
    <header
      role="banner"
      className={cn(
        'z-30 flex h-16 items-center justify-between border-b border-border bg-background/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/75',
        className
      )}
    >
      <div className="flex min-w-0 items-center gap-3">
        <HeaderMenuTrigger onOpenMenu={handleOpenMenu} />

        <a href="/app" aria-label="Heuresys — pagina iniziale autenticata" className="flex items-center gap-2.5">
          {logo ?? <HeuresysWordmark variant="brand" size="md" />}
          {logoBadge}
        </a>

        <HeaderBreadcrumbTrail items={breadcrumb} />

        {leftExtras}
      </div>

      <div className="flex items-center gap-2">
        <HeaderSearchTrigger onOpenCommandPalette={handleOpenCommandPalette} />
        <HeaderLanguageSwitcher language={language} onToggleLanguage={onToggleLanguage} />
        <PaletteDropdown />
        <HeaderThemeToggle />

        {userMenu ? (
          <HeaderUserMenu
            user={user}
            tenants={userMenu.tenants}
            onSelectTenant={userMenu.onSelectTenant}
            onNavigateProfile={userMenu.onNavigateProfile}
            onNavigateSettings={userMenu.onNavigateSettings}
            onLogout={userMenu.onLogout}
          />
        ) : (
          <HeaderUserIdentity user={user} />
        )}

        {rightExtras}
      </div>

      <CommandPalette
        open={paletteOpen}
        onOpenChange={setPaletteOpen}
        placeholder="Cerca tenant, log, audit…"
        empty="Nessun comando configurato"
      >
        {commandPaletteContent}
      </CommandPalette>

      {mobileNav && (
        <HeaderMobileDrawer open={drawerOpen} onOpenChange={setDrawerOpen}>
          {mobileNav}
        </HeaderMobileDrawer>
      )}
    </header>
  );
}

export default DashboardHeader;
