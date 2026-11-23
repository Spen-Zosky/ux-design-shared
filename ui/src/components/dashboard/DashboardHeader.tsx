'use client';

import * as React from 'react';
import { cn } from '../../lib/cn';
import { HeuresysWordmark } from '../wordmark';
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
 * Storybook: ogni sotto-elemento ha una story propria sotto `Layout/Header/`.
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

const DEFAULT_SEARCH_PLACEHOLDER = 'Cerca tenant, log, audit…';

/** Testi dell'header che il consumer può tradurre. Tutti opzionali: i default sono
 *  quelli storici, quindi chi non passa `labels` non vede nessun cambiamento. */
export interface DashboardHeaderLabels {
  /** aria-label dell'hamburger. Default "Apri menu contesto globale". */
  menu?: string;
  /** aria-label della navigazione a briciole. Default "Breadcrumb". */
  breadcrumb?: string;
  /** Nome accessibile del cambio lingua; comincia con la sigla visibile. */
  language?: (language: string) => string;
  /** aria-label del cambio tema. Default "Alterna tema chiaro/scuro". */
  theme?: string;
  /** Nome accessibile del menu utente. Default "Menu utente: <username>". */
  userMenu?: (username: string) => string;
  /** Segnaposto della command palette. Default "Cerca tenant, log, audit…". */
  commandPalettePlaceholder?: string;
  /** Testo del pulsante di ricerca nell'header (1.7.0). Se assente usa
   *  `commandPalettePlaceholder`, poi il default "Cerca tenant, log, audit…". */
  searchPlaceholder?: string;
  /** Testo della command palette vuota. Default "Nessun comando configurato". */
  commandPaletteEmpty?: string;
  /** Titolo del drawer mobile. Default "Menu di navigazione". */
  drawerTitle?: string;
  /** Testo di chiusura del drawer mobile. Default "Chiudi". */
  drawerClose?: string;
}

export interface DashboardHeaderProps {
  breadcrumb?: HeaderBreadcrumb;
  user?: UserIdentity;
  language?: 'IT' | 'EN';
  onToggleLanguage?: () => void;
  onOpenMenu?: () => void;
  onOpenCommandPalette?: () => void;
  className?: string;
  /** Testi traducibili dell'header (additivo, tutti opzionali). */
  labels?: DashboardHeaderLabels;
  /** Override the default wordmark logo with a custom node (e.g. the canonical
   *  two-color SVG inline used in the SUPERUSER prototype). */
  logo?: React.ReactNode;
  /** Optional trailing badge next to the logo (e.g. "advanced" product chip). */
  logoBadge?: React.ReactNode;
  /** Destinazione del collegamento del marchio, detta solo al lettore di schermo (testo
   *  nascosto alla vista). Il nome accessibile del collegamento è marchio + distintivo +
   *  questo testo. Default: "pagina iniziale". */
  homeLabel?: string;
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
  labels,
  logo,
  logoBadge,
  homeLabel = 'pagina iniziale',
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

  const searchPlaceholder =
    labels?.searchPlaceholder ?? labels?.commandPalettePlaceholder ?? DEFAULT_SEARCH_PLACEHOLDER;

  // Lingua e tema: nella barra e, sotto `sm`, nel cassetto. Due copie, quindi il tema
  // riceve id diversi. Il selettore di tavolozza non c'è più dalla 1.7.1.
  const preferences = (inDrawer: boolean) => {
    const lingua = (
      <HeaderLanguageSwitcher language={language} onToggleLanguage={onToggleLanguage} label={labels?.language} />
    );
    const tema = <HeaderThemeToggle label={labels?.theme} id={inDrawer ? 'js-theme-toggle-drawer' : undefined} />;
    return inDrawer ? (
      <>
        {lingua}
        {tema}
      </>
    ) : (
      <>
        {lingua}
        {tema}
      </>
    );
  };

  return (
    <header
      role="banner"
      className={cn(
        'z-30 flex h-16 min-w-0 items-center justify-between gap-2 border-b border-border bg-background/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/75',
        className
      )}
    >
      {/* A 390 px il gruppo di sinistra è quello che cede (min-w-0) e dentro cede solo il
          marchio, che taglia il proprio contenuto: niente overflow nascosto sul gruppo, che
          taglierebbe il contorno del fuoco dell'hamburger (WCAG 2.4.7). Il gruppo di destra
          tiene il menu utente, che non può sparire. */}
      <div className="flex min-w-0 shrink items-center gap-3">
        <HeaderMenuTrigger onOpenMenu={handleOpenMenu} label={labels?.menu} />

        {/* WCAG 2.5.3 (Label in Name): il collegamento prende il nome dal suo contenuto (il
            marchio, il distintivo, e la destinazione per chi non vede), invece di un aria-label
            che non conteneva il testo visibile. */}
        <a href="/app" className="flex min-w-0 shrink items-center gap-2.5 overflow-hidden">
          {logo ?? <HeuresysWordmark variant="brand" size="md" />}
          {logoBadge}
          <span className="sr-only">{homeLabel}</span>
        </a>

        <HeaderBreadcrumbTrail items={breadcrumb} label={labels?.breadcrumb} />

        {leftExtras}
      </div>

      <div className="flex shrink-0 items-center gap-2">
        <HeaderSearchTrigger onOpenCommandPalette={handleOpenCommandPalette} placeholder={searchPlaceholder} />
        {/* Con il cassetto (mobileNav) le preferenze sotto `sm` si spostano lì: nella barra
            di un telefono non c'è posto per lingua, tavolozza, tema e menu utente insieme. */}
        <div className={cn('flex items-center gap-2', mobileNav && 'max-sm:hidden')}>
          {preferences(false)}
        </div>

        {userMenu ? (
          <HeaderUserMenu
            user={user}
            tenants={userMenu.tenants}
            onSelectTenant={userMenu.onSelectTenant}
            onNavigateProfile={userMenu.onNavigateProfile}
            onNavigateSettings={userMenu.onNavigateSettings}
            onLogout={userMenu.onLogout}
            label={labels?.userMenu}
          />
        ) : (
          <HeaderUserIdentity user={user} />
        )}

        {rightExtras}
      </div>

      <CommandPalette
        open={paletteOpen}
        onOpenChange={setPaletteOpen}
        placeholder={labels?.commandPalettePlaceholder ?? DEFAULT_SEARCH_PLACEHOLDER}
        empty={labels?.commandPaletteEmpty ?? 'Nessun comando configurato'}
      >
        {commandPaletteContent}
      </CommandPalette>

      {mobileNav && (
        <HeaderMobileDrawer
          open={drawerOpen}
          onOpenChange={setDrawerOpen}
          title={labels?.drawerTitle}
          closeLabel={labels?.drawerClose}
        >
          {mobileNav}
          <div className="mt-6 flex items-center gap-2 border-t border-border pt-4 sm:hidden">
            {preferences(true)}
          </div>
        </HeaderMobileDrawer>
      )}
    </header>
  );
}

export default DashboardHeader;
