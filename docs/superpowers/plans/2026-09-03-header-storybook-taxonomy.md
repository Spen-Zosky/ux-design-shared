# Header Storybook Taxonomy Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Estrarre da `DashboardHeader` un sotto-componente esportato per ciascun elemento visivo dell'header (hamburger, breadcrumb, search trigger, language switcher, theme toggle, user menu), dare a ciascuno una story Storybook sotto il gruppo `Header/` con nome parlante e Controls funzionanti; **inoltre** consolidare le 3 duplicazioni interne trovate (theme-toggle, breadcrumb, e chiarire — non fondere — il language-toggle), wireare hamburger (→ drawer mobile) e ⌘K (→ command palette reale), e colmare il gap "menu utente" (nuovo `HeaderUserMenu` con Profilo/Impostazioni/Logout/Cambio tenant). Tutto additivo: **zero prop pubbliche esistenti rimosse o rinominate**, i due consumer (`heuresys-advanced`, `heuresys-datastore`) continuano a funzionare senza modifiche fino a quando non adottano esplicitamente le nuove prop opzionali.

**Architecture:** Refactor "extract component" + consolidamento mirato, verificato fatto-per-fatto (non per intuizione):
- `ThemeProvider` del design system è **già montato** in entrambi i consumer (`heuresys-advanced/apps/web/src/providers/AppProviders.tsx:6`, `heuresys-datastore/apps/web/src/app/providers.tsx:4,42`) → il consolidamento theme-toggle è sicuro, zero rischio sui consumer.
- `BreadcrumbItem` (`ui/src/components/breadcrumbs.tsx:5-9`) è un superset di `HeaderBreadcrumb` → consolidabile senza perdita.
- `LanguagePicker` (select multi-locale, 7 lingue in `SUPPORTED_LOCALES`) e `HeaderLanguageSwitcher` (toggle binario IT/EN) sono pattern diversi per casi d'uso diversi → non si fondono, si documentano.
- Le nuove funzionalità (⌘K reale, drawer mobile, user menu) sono props **opzionali e additive** su `DashboardHeader` — nessun consumer è obbligato ad adottarle per continuare a funzionare.

Ogni task è verificato da `pnpm run typecheck` + lo smoke test Playwright esistente (`ui/e2e/storybook-smoke.spec.ts`, copre automaticamente ogni nuova story via `index.json`).

**Tech Stack:** React 19 + TypeScript, Storybook 10 (`@storybook/react-vite`), Tailwind 4, Radix UI (`@radix-ui/react-dropdown-menu`, `@radix-ui/react-dialog`, `@radix-ui/react-avatar` — già dipendenze del design system), Playwright.

**Spec:** `docs/superpowers/specs/2026-09-03-header-storybook-taxonomy.md`

## Global Constraints

- Nessuna prop pubblica esistente su `DashboardHeaderProps` viene rimossa o rinominata. Le nuove (`commandPaletteContent`, `mobileNav`, e le prop di `HeaderUserMenu`) sono tutte opzionali.
- `LanguagePicker` (`ui/src/components/i18n/language-picker.tsx`) non viene toccato — resta un componente distinto, non fuso con `HeaderLanguageSwitcher`.
- `GroupToggle`/duplicazione sidebar resta fuori scope (ciclo Sidebar separato).
- Ogni componente estratto vive in `ui/src/components/dashboard/header/<kebab-case>.tsx`, con la sua `.stories.tsx` accanto.
- Ogni story ha `title: 'Header/<Nome Parlante>'` esatto come da tabella nello spec.
- Dopo OGNI task: `pnpm run typecheck` deve uscire pulito prima di passare al task successivo.
- Commit dopo ogni task (piccoli, un commit per componente) sul branch dedicato creato al Task 0.
- Nessuna modifica a `heuresys-advanced` o `heuresys-datastore` in questo piano — solo al design system. L'adozione delle nuove prop nei consumer è registrata come voce "fuori scope" nello spec, per un ciclo separato con le sessioni che oggi lavorano su quei repository.

---

## File Structure

```
ui/src/components/dashboard/header/          (NUOVA cartella)
  menu-trigger.tsx                — HeaderMenuTrigger
  menu-trigger.stories.tsx
  breadcrumb-trail.tsx            — HeaderBreadcrumbTrail (+ type HeaderBreadcrumb = BreadcrumbItem[])
  breadcrumb-trail.stories.tsx
  search-trigger.tsx              — HeaderSearchTrigger
  search-trigger.stories.tsx
  language-switcher.tsx           — HeaderLanguageSwitcher
  language-switcher.stories.tsx
  theme-toggle-button.tsx         — HeaderThemeToggle (ora su useTheme())
  theme-toggle-button.stories.tsx
  user-identity-card.tsx          — HeaderUserIdentity (variante sola-lettura, non più default)
  user-identity-card.stories.tsx
  user-menu.tsx                   — HeaderUserMenu (NUOVO — sostituisce HeaderUserIdentity come default)
  user-menu.stories.tsx
  mobile-drawer.tsx               — HeaderMobileDrawer (NUOVO)
  mobile-drawer.stories.tsx
  index.ts                        — barrel locale

ui/src/components/dashboard/
  DashboardHeader.tsx              (MODIFICATO — compone tutti i pezzi sopra + wiring ⌘K/drawer)
  DashboardHeader.stories.tsx      (NUOVO — "Header/Dashboard Header (Complete)")
  PaletteDropdown.tsx              (invariato)
  PaletteDropdown.stories.tsx      (NUOVO — "Header/Palette Switcher")

ui/src/index.ts                    (MODIFICATO — nuovi export dei sotto-componenti)
```

---

## Task 0: Branch e barrel locale vuoto

**Files:**
- Create: `ui/src/components/dashboard/header/index.ts`

- [ ] **Step 1: Crea il branch dedicato**

```bash
cd D:/ux-design-shared
git checkout main
git pull --ff-only
git checkout -b refactor/header-storybook-taxonomy
```

Expected: `Switched to a new branch 'refactor/header-storybook-taxonomy'`

- [ ] **Step 2: Crea la cartella e il barrel locale (vuoto per ora)**

```typescript
// ui/src/components/dashboard/header/index.ts
export {};
```

- [ ] **Step 3: Verifica typecheck**

Run: `cd ui && pnpm run typecheck`
Expected: nessun errore.

- [ ] **Step 4: Commit**

```bash
git add ui/src/components/dashboard/header/index.ts
git commit -m "chore(ui): scaffold ui/src/components/dashboard/header/"
```

---

## Task 1: `HeaderMenuTrigger`

**Files:**
- Create: `ui/src/components/dashboard/header/menu-trigger.tsx`
- Create: `ui/src/components/dashboard/header/menu-trigger.stories.tsx`

**Interfaces:**
- Produces: `HeaderMenuTrigger({ onOpenMenu?: () => void; label?: string })`, estratto da `DashboardHeader.tsx:90-101`.

- [ ] **Step 1: Crea il componente**

```tsx
// ui/src/components/dashboard/header/menu-trigger.tsx
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
```

- [ ] **Step 2: Verifica typecheck**

Run: `cd ui && pnpm run typecheck`
Expected: nessun errore.

- [ ] **Step 3: Crea la story con Controls**

```tsx
// ui/src/components/dashboard/header/menu-trigger.stories.tsx
import type { Meta, StoryObj } from '@storybook/react-vite';
import { HeaderMenuTrigger } from './menu-trigger';

const meta: Meta<typeof HeaderMenuTrigger> = {
  title: 'Header/Menu Trigger',
  component: HeaderMenuTrigger,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    onOpenMenu: { action: 'openMenu' },
    label: { control: 'text' },
  },
};
export default meta;
type Story = StoryObj<typeof HeaderMenuTrigger>;

export const Default: Story = {
  args: { label: 'Apri menu contesto globale' },
};
```

- [ ] **Step 4: Verifica**

Run: `cd ui && pnpm exec playwright test -g "Header/Menu Trigger" --workers=1`
Expected: `1 passed`

- [ ] **Step 5: Commit**

```bash
git add ui/src/components/dashboard/header/menu-trigger.tsx ui/src/components/dashboard/header/menu-trigger.stories.tsx
git commit -m "feat(ui): estrae HeaderMenuTrigger da DashboardHeader"
```

---

## Task 2: `HeaderBreadcrumbTrail` (consolidato su `BreadcrumbItem`)

**Files:**
- Create: `ui/src/components/dashboard/header/breadcrumb-trail.tsx`
- Create: `ui/src/components/dashboard/header/breadcrumb-trail.stories.tsx`

**Interfaces:**
- Produces: `HeaderBreadcrumbTrail({ items?: HeaderBreadcrumb })`, dove `HeaderBreadcrumb = ReadonlyArray<BreadcrumbItem>` (importato da `../../breadcrumbs`, non ridefinito — questo È il consolidamento: un solo tipo sorgente, non due modelli paralleli). `DashboardHeader.tsx` ri-esporterà `HeaderBreadcrumb` (Task 8) per non rompere `ui/src/index.ts:371`.

- [ ] **Step 1: Crea il componente (markup identico a `DashboardHeader.tsx:108-128`, tipo consolidato)**

```tsx
// ui/src/components/dashboard/header/breadcrumb-trail.tsx
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
```

- [ ] **Step 2: Verifica typecheck**

Run: `cd ui && pnpm run typecheck`
Expected: nessun errore.

- [ ] **Step 3: Crea la story**

```tsx
// ui/src/components/dashboard/header/breadcrumb-trail.stories.tsx
import type { Meta, StoryObj } from '@storybook/react-vite';
import { HeaderBreadcrumbTrail, type HeaderBreadcrumb } from './breadcrumb-trail';

const meta: Meta<typeof HeaderBreadcrumbTrail> = {
  title: 'Header/Breadcrumb Trail',
  component: HeaderBreadcrumbTrail,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof HeaderBreadcrumbTrail>;

const sample: HeaderBreadcrumb = [
  { label: 'Datastore', href: '/datastore' },
  { label: 'Catalogo ATECO' },
];

export const Default: Story = {
  args: { items: sample },
};

export const WithClickHandler: Story = {
  args: {
    items: [
      { label: 'Datastore', onClick: () => console.log('nav: datastore') },
      { label: 'Catalogo ATECO' },
    ],
  },
  parameters: {
    docs: {
      description: {
        story:
          'Usa `onClick` invece di `href` — possibile da quando il tipo è stato consolidato su `BreadcrumbItem` (2026-09-03), che lo supporta nativamente.',
      },
    },
  },
};

export const Empty: Story = {
  args: { items: [] },
  parameters: {
    docs: { description: { story: 'Senza breadcrumb il componente non renderizza nulla (return null) — comportamento intenzionale, non un errore.' } },
  },
};
```

- [ ] **Step 4: Verifica**

Run: `cd ui && pnpm exec playwright test -g "Header/Breadcrumb Trail" --workers=1`
Expected: `3 passed`

- [ ] **Step 5: Commit**

```bash
git add ui/src/components/dashboard/header/breadcrumb-trail.tsx ui/src/components/dashboard/header/breadcrumb-trail.stories.tsx
git commit -m "feat(ui): estrae HeaderBreadcrumbTrail, consolida su BreadcrumbItem"
```

---

## Task 3: `HeaderSearchTrigger`

**Files:**
- Create: `ui/src/components/dashboard/header/search-trigger.tsx`
- Create: `ui/src/components/dashboard/header/search-trigger.stories.tsx`

**Interfaces:**
- Produces: `HeaderSearchTrigger({ onOpenCommandPalette?: () => void; placeholder?: string })`, estratto da `DashboardHeader.tsx:134-147`.

- [ ] **Step 1: Crea il componente**

```tsx
// ui/src/components/dashboard/header/search-trigger.tsx
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
```

- [ ] **Step 2: Verifica typecheck**

Run: `cd ui && pnpm run typecheck`
Expected: nessun errore.

- [ ] **Step 3: Crea la story**

```tsx
// ui/src/components/dashboard/header/search-trigger.stories.tsx
import type { Meta, StoryObj } from '@storybook/react-vite';
import { HeaderSearchTrigger } from './search-trigger';

const meta: Meta<typeof HeaderSearchTrigger> = {
  title: 'Header/Search Trigger',
  component: HeaderSearchTrigger,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    onOpenCommandPalette: { action: 'openCommandPalette' },
    placeholder: { control: 'text' },
  },
};
export default meta;
type Story = StoryObj<typeof HeaderSearchTrigger>;

export const Default: Story = {
  args: { placeholder: 'Cerca tenant, log, audit…' },
};

export const English: Story = {
  args: { placeholder: 'Search tenants, logs, audit…' },
};
```

- [ ] **Step 4: Verifica**

Run: `cd ui && pnpm exec playwright test -g "Header/Search Trigger" --workers=1`
Expected: `2 passed`

- [ ] **Step 5: Commit**

```bash
git add ui/src/components/dashboard/header/search-trigger.tsx ui/src/components/dashboard/header/search-trigger.stories.tsx
git commit -m "feat(ui): estrae HeaderSearchTrigger da DashboardHeader, placeholder configurabile"
```

---

## Task 4: `HeaderLanguageSwitcher`

**Files:**
- Create: `ui/src/components/dashboard/header/language-switcher.tsx`
- Create: `ui/src/components/dashboard/header/language-switcher.stories.tsx`

**Interfaces:**
- Produces: `HeaderLanguageSwitcher({ language?: 'IT' | 'EN'; onToggleLanguage?: () => void })`, estratto da `DashboardHeader.tsx:149-161`.
- **Decisione esplicita (spec § 2)**: NON si fonde con `LanguagePicker` (`ui/src/components/i18n/language-picker.tsx`, select su 7 locale in `SUPPORTED_LOCALES`) — sono due componenti per due casi d'uso. La story lo dichiara.

- [ ] **Step 1: Crea il componente**

```tsx
// ui/src/components/dashboard/header/language-switcher.tsx
'use client';

import * as React from 'react';

export interface HeaderLanguageSwitcherProps {
  language?: 'IT' | 'EN';
  onToggleLanguage?: () => void;
}

export function HeaderLanguageSwitcher({
  language = 'IT',
  onToggleLanguage,
}: HeaderLanguageSwitcherProps) {
  return (
    <button
      type="button"
      aria-label="Cambia lingua tra italiano e inglese"
      onClick={onToggleLanguage}
      className="inline-flex h-9 items-center gap-2 rounded-control border border-border px-3 text-sm text-muted-foreground transition hover:bg-accent hover:text-foreground hover:border-foreground/30"
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
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
      <span className="font-medium">{language}</span>
    </button>
  );
}

export default HeaderLanguageSwitcher;
```

- [ ] **Step 2: Verifica typecheck**

Run: `cd ui && pnpm run typecheck`
Expected: nessun errore.

- [ ] **Step 3: Crea la story, con nota esplicita sulla non-fusione con LanguagePicker**

```tsx
// ui/src/components/dashboard/header/language-switcher.stories.tsx
import type { Meta, StoryObj } from '@storybook/react-vite';
import { HeaderLanguageSwitcher } from './language-switcher';

const meta: Meta<typeof HeaderLanguageSwitcher> = {
  title: 'Header/Language Switcher',
  component: HeaderLanguageSwitcher,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    language: { control: 'select', options: ['IT', 'EN'] },
    onToggleLanguage: { action: 'toggleLanguage' },
  },
};
export default meta;
type Story = StoryObj<typeof HeaderLanguageSwitcher>;

export const Italian: Story = {
  args: { language: 'IT' },
  parameters: {
    docs: {
      description: {
        story:
          'Questo è il toggle binario IT/EN realmente usato in produzione (dentro DashboardHeader). Non è la stessa cosa di I18n/LanguagePicker (select su 7 locale) — sono due componenti per due casi d\'uso distinti, non consolidati insieme di proposito (vedi spec § 2).',
      },
    },
  },
};
export const English: Story = { args: { language: 'EN' } };
```

- [ ] **Step 4: Verifica**

Run: `cd ui && pnpm exec playwright test -g "Header/Language Switcher" --workers=1`
Expected: `2 passed`

- [ ] **Step 5: Commit**

```bash
git add ui/src/components/dashboard/header/language-switcher.tsx ui/src/components/dashboard/header/language-switcher.stories.tsx
git commit -m "feat(ui): estrae HeaderLanguageSwitcher, documenta la non-fusione con LanguagePicker"
```

---

## Task 5: `HeaderThemeToggle` (consolidato su `useTheme()`)

**Files:**
- Create: `ui/src/components/dashboard/header/theme-toggle-button.tsx`
- Create: `ui/src/components/dashboard/header/theme-toggle-button.stories.tsx`

**Interfaces:**
- Produces: `HeaderThemeToggle()` (zero-arg — legge/scrive lo stato tramite `useTheme()`).
- Consumes: `useTheme` da `../../theme-provider` (`ui/src/components/theme-provider.tsx:76-82`).
- **Consolidamento (spec § 1)**: sostituisce la logica `classList.toggle('dark')` + `localStorage['heuresys-theme']` diretta di `DashboardHeader.tsx:49-55,70-79,165-186` con `useTheme()`/`setTheme()` — stessa chiave localStorage dietro le quinte (`theme-provider.tsx:16`), ma passando dal context invece di bypassarlo, eliminando il disallineamento di stato descritto nello spec.
- **Precondizione verificata**: `ThemeProvider` è già montato in entrambi i consumer — questo componente **richiede** di essere renderizzato dentro un `<ThemeProvider>` (altrimenti `useTheme()` lancia, per design — vedi `theme-provider.tsx:78-80`). Se in futuro un terzo consumer monta `DashboardHeader` senza `ThemeProvider`, l'app crasha a runtime con un errore esplicito ("useTheme must be used within ThemeProvider") invece di comportarsi in modo silenziosamente diverso — comportamento preferibile a un fallimento silenzioso.

- [ ] **Step 1: Crea il componente**

```tsx
// ui/src/components/dashboard/header/theme-toggle-button.tsx
'use client';

import * as React from 'react';
import { useTheme } from '../../theme-provider';

export function HeaderThemeToggle() {
  const { resolved, setTheme } = useTheme();
  const isDark = resolved === 'dark';

  function toggle() {
    setTheme(isDark ? 'light' : 'dark');
  }

  return (
    <button
      id="js-theme-toggle"
      type="button"
      aria-label="Alterna tema chiaro/scuro"
      onClick={toggle}
      className="inline-flex h-9 w-9 items-center justify-center rounded-control border border-border text-muted-foreground transition hover:bg-accent hover:text-foreground hover:border-foreground/30"
    >
      {isDark ? (
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
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      ) : (
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
      )}
    </button>
  );
}

export default HeaderThemeToggle;
```

- [ ] **Step 2: Verifica typecheck**

Run: `cd ui && pnpm run typecheck`
Expected: nessun errore.

- [ ] **Step 3: Crea la story — DEVE avvolgere con `ThemeProvider` (decorator), altrimenti `useTheme()` lancia**

```tsx
// ui/src/components/dashboard/header/theme-toggle-button.stories.tsx
import type { Meta, StoryObj } from '@storybook/react-vite';
import { HeaderThemeToggle } from './theme-toggle-button';
import { ThemeProvider } from '../../theme-provider';

const meta: Meta<typeof HeaderThemeToggle> = {
  title: 'Header/Theme Toggle',
  component: HeaderThemeToggle,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <ThemeProvider>
        <Story />
      </ThemeProvider>
    ),
  ],
};
export default meta;
type Story = StoryObj<typeof HeaderThemeToggle>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Nessun Control esposto: il tema è gestito da ThemeProvider/useTheme() (context React), non da una prop diretta. Dal 2026-09-03 non manipola più classList/localStorage direttamente — elimina il disallineamento di stato che esisteva quando header e ThemeProvider agivano indipendentemente sullo stesso localStorage. Clicca il bottone nel canvas per vedere il toggle reale.',
      },
    },
  },
};
```

- [ ] **Step 4: Verifica**

Run: `cd ui && pnpm exec playwright test -g "Header/Theme Toggle" --workers=1`
Expected: `1 passed`. Se fallisce con "useTheme must be used within ThemeProvider", il decorator nello Step 3 non è stato applicato correttamente — verificare che `decorators` sia nel `meta`, non nella singola story.

- [ ] **Step 5: Commit**

```bash
git add ui/src/components/dashboard/header/theme-toggle-button.tsx ui/src/components/dashboard/header/theme-toggle-button.stories.tsx
git commit -m "feat(ui): estrae HeaderThemeToggle, consolida su ThemeProvider/useTheme()"
```

---

## Task 6: `HeaderUserIdentity` (variante sola-lettura)

**Files:**
- Create: `ui/src/components/dashboard/header/user-identity-card.tsx`
- Create: `ui/src/components/dashboard/header/user-identity-card.stories.tsx`

**Interfaces:**
- Produces: `HeaderUserIdentity({ user?: UserIdentity })`, estratto da `DashboardHeader.tsx:188-198`. Il tipo `UserIdentity` (oggi in `DashboardHeader.tsx:24-30`) si sposta qui.
- **Nota di scope**: dal Task 8 in poi, `DashboardHeader` monta di default `HeaderUserMenu` (Task 7-bis), non più questo componente. `HeaderUserIdentity` resta nel design system come variante sola-lettura per contesti dove un dropdown non serve (spec § 6) — non è codice morto, è un'alternativa deliberata.

- [ ] **Step 1: Crea il componente**

```tsx
// ui/src/components/dashboard/header/user-identity-card.tsx
'use client';

import * as React from 'react';

export interface UserIdentity {
  initials: string;
  username: string;
  role: string;
  /** Tailwind color token without the leading `text-` prefix. Default "warning". */
  roleTone?: string;
}

export interface HeaderUserIdentityProps {
  user?: UserIdentity;
}

export function HeaderUserIdentity({ user }: HeaderUserIdentityProps) {
  if (!user) return null;

  return (
    <div className="ml-1 flex items-center gap-2 rounded-control border border-border bg-card px-2 py-1.5">
      <span
        className={`relative inline-flex h-7 w-7 items-center justify-center rounded-full bg-${user.roleTone ?? 'palette-3'}/20 text-xs font-semibold text-${user.roleTone ?? 'palette-3'}`}
      >
        {user.initials}
      </span>
      <div className="hidden flex-col leading-tight sm:flex">
        <span className="text-xs font-medium text-foreground">{user.username}</span>
        <span
          className={`font-mono text-[10px] uppercase tracking-wider text-${user.roleTone ?? 'warning'}`}
        >
          {user.role}
        </span>
      </div>
    </div>
  );
}

export default HeaderUserIdentity;
```

- [ ] **Step 2: Verifica typecheck**

Run: `cd ui && pnpm run typecheck`
Expected: nessun errore.

- [ ] **Step 3: Crea la story**

```tsx
// ui/src/components/dashboard/header/user-identity-card.stories.tsx
import type { Meta, StoryObj } from '@storybook/react-vite';
import { HeaderUserIdentity } from './user-identity-card';

const meta: Meta<typeof HeaderUserIdentity> = {
  title: 'Header/User Identity (read-only)',
  component: HeaderUserIdentity,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof HeaderUserIdentity>;

export const Default: Story = {
  args: {
    user: { initials: 'MR', username: 'Mario Rossi', role: 'admin', roleTone: 'palette-3' },
  },
  parameters: {
    docs: {
      description: {
        story:
          'Variante sola-lettura, senza dropdown. Nell\'header di produzione (Header/Dashboard Header (Complete)) è HeaderUserMenu — con Profilo/Impostazioni/Logout/Cambio tenant — a essere montato di default, non questo componente.',
      },
    },
  },
};
```

- [ ] **Step 4: Verifica**

Run: `cd ui && pnpm exec playwright test -g "Header/User Identity" --workers=1`
Expected: `1 passed`

- [ ] **Step 5: Commit**

```bash
git add ui/src/components/dashboard/header/user-identity-card.tsx ui/src/components/dashboard/header/user-identity-card.stories.tsx
git commit -m "feat(ui): estrae HeaderUserIdentity (variante sola-lettura)"
```

---

## Task 7: `HeaderUserMenu` (NUOVO — colma il gap "menu utente")

**Files:**
- Create: `ui/src/components/dashboard/header/user-menu.tsx`
- Create: `ui/src/components/dashboard/header/user-menu.stories.tsx`

**Interfaces:**
- Consumes: `UserIdentity` (Task 6), `DropdownMenu`/`DropdownMenuTrigger`/`DropdownMenuContent`/`DropdownMenuItem`/`DropdownMenuSeparator`/`DropdownMenuLabel` da `../../dropdown-menu`, `Avatar`/`AvatarFallback` da `../../avatar`.
- Produces: `HeaderUserMenu({ user?: UserIdentity; tenants?: ReadonlyArray<{id: string; name: string}>; onSelectTenant?: (id: string) => void; onNavigateProfile?: () => void; onNavigateSettings?: () => void; onLogout?: () => void })`.
- **Decisione di Enzo (spec § 6)**: 4 voci — Profilo, Impostazioni, Logout, Cambio tenant/organizzazione. "Cambio tenant" appare solo se `tenants` ha ≥2 elementi.

- [ ] **Step 1: Crea il componente**

```tsx
// ui/src/components/dashboard/header/user-menu.tsx
'use client';

import * as React from 'react';
import { User, Settings, LogOut, Building2 } from 'lucide-react';
import { Avatar, AvatarFallback } from '../../avatar';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from '../../dropdown-menu';
import type { UserIdentity } from './user-identity-card';

export interface HeaderUserMenuTenant {
  id: string;
  name: string;
}

export interface HeaderUserMenuProps {
  user?: UserIdentity;
  /** Se assente o con meno di 2 elementi, la voce "Cambia organizzazione" non compare. */
  tenants?: ReadonlyArray<HeaderUserMenuTenant>;
  onSelectTenant?: (id: string) => void;
  onNavigateProfile?: () => void;
  onNavigateSettings?: () => void;
  onLogout?: () => void;
}

export function HeaderUserMenu({
  user,
  tenants,
  onSelectTenant,
  onNavigateProfile,
  onNavigateSettings,
  onLogout,
}: HeaderUserMenuProps) {
  if (!user) return null;

  const showTenantSwitch = (tenants?.length ?? 0) >= 2;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          aria-label={`Menu utente: ${user.username}`}
          className="ml-1 flex items-center gap-2 rounded-control border border-border bg-card px-2 py-1.5 transition hover:bg-accent hover:border-foreground/30"
        >
          <Avatar className="h-7 w-7">
            <AvatarFallback
              className={`text-xs font-semibold bg-${user.roleTone ?? 'palette-3'}/20 text-${user.roleTone ?? 'palette-3'}`}
            >
              {user.initials}
            </AvatarFallback>
          </Avatar>
          <div className="hidden flex-col leading-tight text-left sm:flex">
            <span className="text-xs font-medium text-foreground">{user.username}</span>
            <span
              className={`font-mono text-[10px] uppercase tracking-wider text-${user.roleTone ?? 'warning'}`}
            >
              {user.role}
            </span>
          </div>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>{user.username}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onSelect={onNavigateProfile}>
          <User className="mr-2 h-4 w-4" aria-hidden="true" />
          Profilo
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={onNavigateSettings}>
          <Settings className="mr-2 h-4 w-4" aria-hidden="true" />
          Impostazioni
        </DropdownMenuItem>
        {showTenantSwitch && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuLabel>Cambia organizzazione</DropdownMenuLabel>
            {tenants!.map((t) => (
              <DropdownMenuItem key={t.id} onSelect={() => onSelectTenant?.(t.id)}>
                <Building2 className="mr-2 h-4 w-4" aria-hidden="true" />
                {t.name}
              </DropdownMenuItem>
            ))}
          </>
        )}
        <DropdownMenuSeparator />
        <DropdownMenuItem onSelect={onLogout}>
          <LogOut className="mr-2 h-4 w-4" aria-hidden="true" />
          Esci
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default HeaderUserMenu;
```

- [ ] **Step 2: Verifica typecheck**

Run: `cd ui && pnpm run typecheck`
Expected: nessun errore.

- [ ] **Step 3: Crea la story**

```tsx
// ui/src/components/dashboard/header/user-menu.stories.tsx
import type { Meta, StoryObj } from '@storybook/react-vite';
import { HeaderUserMenu } from './user-menu';

const meta: Meta<typeof HeaderUserMenu> = {
  title: 'Header/User Menu',
  component: HeaderUserMenu,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    onNavigateProfile: { action: 'navigateProfile' },
    onNavigateSettings: { action: 'navigateSettings' },
    onLogout: { action: 'logout' },
    onSelectTenant: { action: 'selectTenant' },
  },
};
export default meta;
type Story = StoryObj<typeof HeaderUserMenu>;

export const SingleTenant: Story = {
  args: {
    user: { initials: 'MR', username: 'Mario Rossi', role: 'admin', roleTone: 'palette-3' },
  },
  parameters: {
    docs: {
      description: {
        story: 'Senza `tenants` (o con un solo tenant), la voce "Cambia organizzazione" non compare — clicca l\'avatar per aprire il menu.',
      },
    },
  },
};

export const MultiTenant: Story = {
  args: {
    user: { initials: 'LB', username: 'Lucia Bianchi', role: 'auditor' },
    tenants: [
      { id: 't1', name: 'Heuresys Italia' },
      { id: 't2', name: 'Heuresys DACH' },
      { id: 't3', name: 'Heuresys Iberia' },
    ],
  },
  parameters: {
    docs: {
      description: { story: 'Con ≥2 tenant, "Cambia organizzazione" compare con l\'elenco — colma il gap "TenantSwitcher" rilevato nell\'indagine (nessun componente dedicato esisteva nel design system).' },
    },
  },
};
```

- [ ] **Step 4: Verifica**

Run: `cd ui && pnpm exec playwright test -g "Header/User Menu" --workers=1`
Expected: `2 passed`

- [ ] **Step 5: Commit**

```bash
git add ui/src/components/dashboard/header/user-menu.tsx ui/src/components/dashboard/header/user-menu.stories.tsx
git commit -m "feat(ui): nuovo HeaderUserMenu (Profilo/Impostazioni/Logout/Cambio tenant)"
```

---

## Task 8: `HeaderMobileDrawer` (NUOVO — wiring dell'hamburger)

**Files:**
- Create: `ui/src/components/dashboard/header/mobile-drawer.tsx`
- Create: `ui/src/components/dashboard/header/mobile-drawer.stories.tsx`

**Interfaces:**
- Consumes: `Dialog`/`DialogContent`/`DialogTitle` da `../../dialog` (già esistenti, usati anche da `CommandPalette` — vedi `ui/src/components/command-palette.tsx:6,52` per il pattern `showCloseButton={false}` con `DialogTitle` `sr-only`, stesso fix di accessibilità applicato lì il 2026-09-03).
- Produces: `HeaderMobileDrawer({ open: boolean; onOpenChange: (open: boolean) => void; children: React.ReactNode })`. `children` è il contenuto di navigazione (tipicamente lo stesso nodo che il consumer passa a `DashboardShell`'s `sidebar` — decisione spec § 5: nessuna prop duplicata, il consumer riusa lo stesso `React.ReactNode`).

- [ ] **Step 1: Crea il componente**

```tsx
// ui/src/components/dashboard/header/mobile-drawer.tsx
'use client';

import * as React from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import { Dialog, DialogTitle } from '../../dialog';
import { cn } from '../../../lib/cn';

export interface HeaderMobileDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
}

/**
 * Drawer di navigazione mobile, aperto dall'hamburger dell'header.
 * A differenza di DialogContent (centrato), questo slide da sinistra e
 * occupa l'altezza intera — pattern drawer, non modale centrata.
 */
export function HeaderMobileDrawer({ open, onOpenChange, children }: HeaderMobileDrawerProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-overlay/60 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <DialogPrimitive.Content
          className={cn(
            'fixed inset-y-0 left-0 z-50 h-full w-72 max-w-[85vw] overflow-y-auto border-r border-border bg-background p-4 shadow-lg',
            'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left'
          )}
        >
          <DialogTitle className="sr-only">Menu di navigazione</DialogTitle>
          <DialogPrimitive.Close className="absolute right-3 top-3 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring">
            <X className="h-4 w-4" aria-hidden="true" />
            <span className="sr-only">Chiudi</span>
          </DialogPrimitive.Close>
          <div className="mt-8">{children}</div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </Dialog>
  );
}

export default HeaderMobileDrawer;
```

- [ ] **Step 2: Verifica typecheck**

Run: `cd ui && pnpm run typecheck`
Expected: nessun errore.

- [ ] **Step 3: Crea la story (componente controllato: serve stato locale nel render)**

```tsx
// ui/src/components/dashboard/header/mobile-drawer.stories.tsx
import type { Meta, StoryObj } from '@storybook/react-vite';
import * as React from 'react';
import { HeaderMobileDrawer } from './mobile-drawer';
import { Button } from '../../Button';

const meta: Meta<typeof HeaderMobileDrawer> = {
  title: 'Header/Mobile Drawer',
  component: HeaderMobileDrawer,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof HeaderMobileDrawer>;

function DrawerDemo() {
  const [open, setOpen] = React.useState(false);
  return (
    <div className="p-6">
      <Button onClick={() => setOpen(true)}>Apri drawer</Button>
      <HeaderMobileDrawer open={open} onOpenChange={setOpen}>
        <nav className="flex flex-col gap-1 text-sm">
          <a href="#" className="rounded px-2 py-1.5 hover:bg-accent">Dashboard</a>
          <a href="#" className="rounded px-2 py-1.5 hover:bg-accent">Tenant</a>
          <a href="#" className="rounded px-2 py-1.5 hover:bg-accent">Log &amp; Audit</a>
          <a href="#" className="rounded px-2 py-1.5 hover:bg-accent">Impostazioni</a>
        </nav>
      </HeaderMobileDrawer>
    </div>
  );
}

export const Default: Story = {
  render: () => <DrawerDemo />,
  parameters: {
    docs: {
      description: {
        story:
          'Componente controllato (open/onOpenChange), collegato all\'hamburger di DashboardHeader (Header/Dashboard Header (Complete)). Il contenuto qui è un esempio minimo — in produzione il consumer passa lo stesso nodo React già usato per la sidebar desktop.',
      },
    },
  },
};
```

- [ ] **Step 4: Verifica**

Run: `cd ui && pnpm exec playwright test -g "Header/Mobile Drawer" --workers=1`
Expected: `1 passed`

- [ ] **Step 5: Commit**

```bash
git add ui/src/components/dashboard/header/mobile-drawer.tsx ui/src/components/dashboard/header/mobile-drawer.stories.tsx
git commit -m "feat(ui): nuovo HeaderMobileDrawer, wiring dell'hamburger"
```

---

## Task 9: Barrel locale + story per `PaletteDropdown`

**Files:**
- Modify: `ui/src/components/dashboard/header/index.ts`
- Create: `ui/src/components/dashboard/PaletteDropdown.stories.tsx`

- [ ] **Step 1: Popola il barrel locale**

```typescript
// ui/src/components/dashboard/header/index.ts
export { HeaderMenuTrigger, type HeaderMenuTriggerProps } from './menu-trigger';
export {
  HeaderBreadcrumbTrail,
  type HeaderBreadcrumbTrailProps,
  type HeaderBreadcrumb,
} from './breadcrumb-trail';
export { HeaderSearchTrigger, type HeaderSearchTriggerProps } from './search-trigger';
export {
  HeaderLanguageSwitcher,
  type HeaderLanguageSwitcherProps,
} from './language-switcher';
export { HeaderThemeToggle } from './theme-toggle-button';
export {
  HeaderUserIdentity,
  type HeaderUserIdentityProps,
  type UserIdentity,
} from './user-identity-card';
export {
  HeaderUserMenu,
  type HeaderUserMenuProps,
  type HeaderUserMenuTenant,
} from './user-menu';
export { HeaderMobileDrawer, type HeaderMobileDrawerProps } from './mobile-drawer';
```

- [ ] **Step 2: Verifica typecheck**

Run: `cd ui && pnpm run typecheck`
Expected: nessun errore.

- [ ] **Step 3: Crea la story per `PaletteDropdown`**

```tsx
// ui/src/components/dashboard/PaletteDropdown.stories.tsx
import type { Meta, StoryObj } from '@storybook/react-vite';
import { PaletteDropdown } from './PaletteDropdown';

const meta: Meta<typeof PaletteDropdown> = {
  title: 'Header/Palette Switcher',
  component: PaletteDropdown,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof PaletteDropdown>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Nessun Control esposto: il componente non accetta props (stato e i 4 preset colore sono interamente interni, persistiti in localStorage("heuresys-palette")). Clicca il trigger nel canvas per aprire il menu e cambiare palette.',
      },
    },
  },
};
```

- [ ] **Step 4: Verifica**

Run: `cd ui && pnpm exec playwright test -g "Header/Palette Switcher" --workers=1`
Expected: `1 passed`

- [ ] **Step 5: Commit**

```bash
git add ui/src/components/dashboard/header/index.ts ui/src/components/dashboard/PaletteDropdown.stories.tsx
git commit -m "feat(ui): barrel header/ completo + story per PaletteDropdown"
```

---

## Task 10: Riscrivere `DashboardHeader.tsx` — composizione + wiring ⌘K/drawer + HeaderUserMenu

**Files:**
- Modify: `ui/src/components/dashboard/DashboardHeader.tsx` (riscrittura completa del corpo)

**Interfaces:**
- Consumes: tutti i componenti dei Task 1-9 da `./header`, `CommandPalette` da `../command-palette` (già esistente).
- Produces: `DashboardHeader`, `DashboardHeaderProps` — **estesa** con 3 nuove prop opzionali additive: `commandPaletteContent?: React.ReactNode`, `mobileNav?: React.ReactNode`, `userMenu?: { tenants?; onSelectTenant?; onNavigateProfile?; onNavigateSettings?; onLogout? }`. `HeaderBreadcrumb` e `UserIdentity` ri-esportati (Task 2, Task 6).

- [ ] **Step 1: Riscrivi il file per intero**

```tsx
// ui/src/components/dashboard/DashboardHeader.tsx
'use client';

import * as React from 'react';
import { cn } from '../../lib/cn';
import { HeuresysWordmark } from '../wordmark';
import { PaletteDropdown } from './PaletteDropdown';
import { CommandPalette } from '../command-palette';
import {
  HeaderMenuTrigger,
  HeaderBreadcrumbTrail,
  HeaderSearchTrigger,
  HeaderLanguageSwitcher,
  HeaderThemeToggle,
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
  logo?: React.ReactNode;
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

  function handleOpenCommandPalette() {
    onOpenCommandPalette?.();
    setPaletteOpen(true);
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
        ) : user ? (
          <div className="ml-1 flex items-center gap-2 rounded-control border border-border bg-card px-2 py-1.5">
            <span
              className={`relative inline-flex h-7 w-7 items-center justify-center rounded-full bg-${user.roleTone ?? 'palette-3'}/20 text-xs font-semibold text-${user.roleTone ?? 'palette-3'}`}
            >
              {user.initials}
            </span>
            <div className="hidden flex-col leading-tight sm:flex">
              <span className="text-xs font-medium text-foreground">{user.username}</span>
              <span
                className={`font-mono text-[10px] uppercase tracking-wider text-${user.roleTone ?? 'warning'}`}
              >
                {user.role}
              </span>
            </div>
          </div>
        ) : null}

        {rightExtras}
      </div>

      <CommandPalette open={paletteOpen} onOpenChange={setPaletteOpen} placeholder="Cerca tenant, log, audit…">
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
```

**Nota sulla scelta `userMenu ? <HeaderUserMenu> : user ? <card statica> : null`**: mantiene il comportamento visivo di oggi (card statica) per i consumer che passano solo `user` senza `userMenu` — zero regressione. Un consumer che vuole il dropdown aggiunge `userMenu={{}}` (anche vuoto: attiva `HeaderUserMenu` con tutte le azioni no-op finché non vengono cablate).

- [ ] **Step 2: Verifica typecheck**

Run: `cd ui && pnpm run typecheck`
Expected: nessun errore.

- [ ] **Step 3: Verifica build completa**

Run: `cd ui && pnpm run build`
Expected: build pulita.

- [ ] **Step 4: Commit**

```bash
git add ui/src/components/dashboard/DashboardHeader.tsx
git commit -m "refactor(ui): DashboardHeader compone Header/*, wiring reale di menu K e hamburger, HeaderUserMenu opzionale"
```

---

## Task 11: Story `Header/Dashboard Header (Complete)`

**Files:**
- Create: `ui/src/components/dashboard/DashboardHeader.stories.tsx`

- [ ] **Step 1: Crea la story, incluse le varianti "consolidata" (drawer+⌘K+userMenu attivi) e "legacy" (comportamento pre-2026-09-03)**

```tsx
// ui/src/components/dashboard/DashboardHeader.stories.tsx
import type { Meta, StoryObj } from '@storybook/react-vite';
import { DashboardHeader } from './DashboardHeader';
import { CommandPalette } from '../command-palette';
import { Home, Users } from 'lucide-react';

const meta: Meta<typeof DashboardHeader> = {
  title: 'Header/Dashboard Header (Complete)',
  component: DashboardHeader,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
  argTypes: {
    language: { control: 'select', options: ['IT', 'EN'] },
    onToggleLanguage: { action: 'toggleLanguage' },
    onOpenMenu: { action: 'openMenu' },
    onOpenCommandPalette: { action: 'openCommandPalette' },
  },
};
export default meta;
type Story = StoryObj<typeof DashboardHeader>;

export const Legacy: Story = {
  args: {
    language: 'IT',
    breadcrumb: [{ label: 'Datastore', href: '/datastore' }, { label: 'Catalogo ATECO' }],
    user: { initials: 'MR', username: 'Mario Rossi', role: 'admin', roleTone: 'palette-3' },
  },
  parameters: {
    docs: {
      description: {
        story:
          'Configurazione equivalente a com\'era prima del 2026-09-03: nessuna delle 3 nuove prop passata → hamburger e ⌘K restano visivamente presenti ma non aprono nulla, user identity è la card statica (non il dropdown). Nessuna regressione rispetto al comportamento di produzione attuale.',
      },
    },
  },
};

export const Consolidated: Story = {
  args: {
    language: 'IT',
    breadcrumb: [{ label: 'Datastore', href: '/datastore' }, { label: 'Catalogo ATECO' }],
    user: { initials: 'MR', username: 'Mario Rossi', role: 'admin', roleTone: 'palette-3' },
    userMenu: {
      onNavigateProfile: () => console.log('nav: profilo'),
      onNavigateSettings: () => console.log('nav: impostazioni'),
      onLogout: () => console.log('logout'),
    },
    mobileNav: (
      <nav className="flex flex-col gap-1 text-sm">
        <a href="#" className="rounded px-2 py-1.5 hover:bg-accent">Dashboard</a>
        <a href="#" className="rounded px-2 py-1.5 hover:bg-accent">Tenant</a>
      </nav>
    ),
    commandPaletteContent: (
      <CommandPalette.Group heading="Navigate">
        <CommandPalette.Item onSelect={() => console.log('go: dashboard')}>
          <Home className="mr-2 h-4 w-4" /> Dashboard
        </CommandPalette.Item>
        <CommandPalette.Item onSelect={() => console.log('go: employees')}>
          <Users className="mr-2 h-4 w-4" /> Employees
        </CommandPalette.Item>
      </CommandPalette.Group>
    ),
  },
  parameters: {
    docs: {
      description: {
        story:
          'Con le 3 nuove prop opzionali attive: clicca l\'hamburger per il drawer mobile, ⌘K (o il trigger) per la command palette reale con comandi, l\'avatar per il menu utente con dropdown.',
      },
    },
  },
};

export const NoBreadcrumbNoUser: Story = {
  args: { language: 'EN' },
  parameters: {
    docs: {
      description: { story: 'Configurazione minima (equivalente a heuresys-advanced in produzione: nessun breadcrumb, nessun userMenu).' },
    },
  },
};
```

- [ ] **Step 2: Verifica**

Run: `cd ui && pnpm exec playwright test -g "Header/Dashboard Header" --workers=1`
Expected: `3 passed`

- [ ] **Step 3: Verifica visiva manuale — nessuna regressione sulla variante Legacy**

```bash
cd ui && pnpm run storybook
```

Aprire `http://localhost:6006/?path=/story/header-dashboard-header-complete--legacy`, confrontare visivamente con lo screenshot originale fornito da Enzo — deve essere pixel-identico (stesso markup della card utente statica, stesso comportamento hamburger/⌘K "presenti ma inerti").

- [ ] **Step 4: Commit**

```bash
git add ui/src/components/dashboard/DashboardHeader.stories.tsx
git commit -m "feat(ui): story Header/Dashboard Header (Complete) — Legacy + Consolidated"
```

---

## Task 12: Esporre i nuovi sotto-componenti dal barrel principale

**Files:**
- Modify: `ui/src/index.ts:368-373` (blocco `DashboardHeader`)

- [ ] **Step 1: Sostituisci il blocco (righe 368-373)**

Da:
```typescript
export {
  DashboardHeader,
  type DashboardHeaderProps,
  type HeaderBreadcrumb,
  type UserIdentity,
} from './components/dashboard/DashboardHeader';
```

A:
```typescript
export {
  DashboardHeader,
  type DashboardHeaderProps,
  type HeaderBreadcrumb,
  type UserIdentity,
} from './components/dashboard/DashboardHeader';
export {
  HeaderMenuTrigger,
  type HeaderMenuTriggerProps,
  HeaderBreadcrumbTrail,
  type HeaderBreadcrumbTrailProps,
  HeaderSearchTrigger,
  type HeaderSearchTriggerProps,
  HeaderLanguageSwitcher,
  type HeaderLanguageSwitcherProps,
  HeaderThemeToggle,
  HeaderUserIdentity,
  type HeaderUserIdentityProps,
  HeaderUserMenu,
  type HeaderUserMenuProps,
  type HeaderUserMenuTenant,
  HeaderMobileDrawer,
  type HeaderMobileDrawerProps,
} from './components/dashboard/header';
```

Nota: `HeaderBreadcrumb`/`UserIdentity` restano esportati una sola volta (dal blocco `DashboardHeader`) — non ripeterli nel blocco nuovo, TypeScript segnalerebbe un duplicate export.

- [ ] **Step 2: Verifica typecheck**

Run: `cd ui && pnpm run typecheck`
Expected: nessun errore.

- [ ] **Step 3: Verifica build completa**

Run: `cd ui && pnpm run build`
Expected: build pulita.

- [ ] **Step 4: Commit**

```bash
git add ui/src/index.ts
git commit -m "feat(ui): esporta i sotto-componenti Header/* dal barrel principale"
```

---

## Task 13: Verifica finale end-to-end

**Files:** nessuno (solo verifica).

- [ ] **Step 1: Typecheck completo**

Run: `cd ui && pnpm run typecheck`
Expected: nessun errore.

- [ ] **Step 2: Unit test esistenti (Vitest)**

Run: `cd ui && pnpm run test`
Expected: tutti verdi, nessuna regressione.

- [ ] **Step 3: Build**

Run: `cd ui && pnpm run build`
Expected: build pulita.

- [ ] **Step 4: Smoke test Playwright — l'intera suite**

Run: `cd ui && pnpm run test:e2e`
Expected: le 332 story precedenti a questo piano + le nuove story del gruppo `Header/` (11 titoli: Dashboard Header (Complete) con 3 story, Menu Trigger, Breadcrumb Trail con 3 story, Search Trigger con 2, Language Switcher con 2, Theme Toggle, Palette Switcher, User Identity (read-only), User Menu con 2, Mobile Drawer) passano, `0 failed`. Se un numero diverso da quello atteso appare, indagare prima di procedere — non assumere flakiness senza riverificare isolatamente.

- [ ] **Step 5: Verifica manuale della sidebar Storybook**

```bash
cd ui && pnpm run storybook
```

Aprire `http://localhost:6006`, confermare che il gruppo **"Header"** compare con tutte le voci attese, ciascuna con nome parlante, e che i Controls funzionano dove previsto. Aprire specificamente `Header/Dashboard Header (Complete)` → `Consolidated`, cliccare hamburger (drawer si apre da sinistra), ⌘K (command palette si apre con 2 comandi), avatar (dropdown con 4 voci si apre).

---

## Task 14: Commit finale, push, PR

**Files:** nessuno.

- [ ] **Step 1: Verifica stato pulito**

Run: `cd D:/ux-design-shared && git status`
Expected: `nothing to commit, working tree clean`.

- [ ] **Step 2: Push del branch**

Run: `git push -u origin refactor/header-storybook-taxonomy`

- [ ] **Step 3: Apri la PR**

```bash
gh pr create --title "feat(ui): riorganizza Header in Storybook, consolida theme/breadcrumb, colma i gap (UserMenu, wiring hamburger/⌘K)" --base main --head refactor/header-storybook-taxonomy --body-file <file — vedi contenuti minimi sotto>
```

Il body deve citare: lo spec (`docs/superpowers/specs/2026-09-03-header-storybook-taxonomy.md`), l'elenco dei 5 punti consolidati/colmati (theme-toggle, breadcrumb, ⌘K, hamburger, user-menu) con la garanzia esplicita "zero prop rimosse, la variante `Legacy` della story dimostra che il comportamento pre-esistente è invariato finché i consumer non adottano le nuove prop opzionali", e la sezione "Fuori scope" aggiornata (group-toggle sidebar, adozione lato consumer delle nuove prop, NotificationCenter, codice morto in heuresys-advanced, webapp drag-and-drop).

- [ ] **Step 4: Attendere revisione di Enzo prima del merge** — componente production-critical, due consumer, nessun check CI configurato sulle PR di questo repo (gap già noto). Non mergere senza conferma esplicita.

---

## Self-Review (eseguita in fase di scrittura del piano esteso)

**1. Spec coverage**: tutti e 6 i punti dello spec § "Estensione decisa da Enzo" hanno un task dedicato: theme-toggle → Task 5, language-toggle (documentazione, non fusione) → Task 4, breadcrumb → Task 2, ⌘K → Task 10, hamburger → Task 8+10, UserMenu → Task 7. Group-toggle resta esplicitamente fuori scope (nota nei Global Constraints).

**2. Placeholder scan**: nessun `TBD`/`TODO` — ogni step ha codice completo o comando+output atteso. La nota "vedi contenuti minimi sotto" al Task 14 Step 3 non è un placeholder di codice, è un rimando testuale già esplicitato nella riga successiva.

**3. Type consistency**: `HeaderBreadcrumb` (Task 2, ora alias di `BreadcrumbItem[]`) → ri-esportato identico da `DashboardHeader.tsx` (Task 10). `UserIdentity` (Task 6) → usato da `HeaderUserMenu` (Task 7) e ri-esportato da `DashboardHeader.tsx` (Task 10) con lo stesso nome. `HeaderUserMenuTenant` definito in Task 7, usato in `DashboardHeaderProps.userMenu.tenants` (Task 10) e nel barrel principale (Task 12) — stesso nome ovunque. `commandPaletteContent`/`mobileNav`/`userMenu` (Task 10) coerenti con gli argomenti usati nella story Task 11.

**4. Verifica incrociata coi due report Explore**: ogni decisione tecnica (ThemeProvider già montato, BreadcrumbItem superset, LanguagePicker multi-locale) è citata con file:riga dai report del 2026-09-03, non assunta.
