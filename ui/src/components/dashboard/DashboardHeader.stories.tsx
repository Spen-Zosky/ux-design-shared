import type { Meta, StoryObj } from '@storybook/react-vite';
import { DashboardHeader } from './DashboardHeader';
import { CommandPalette } from '../command-palette';
import { ThemeProvider } from '../theme-provider';
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
  // DashboardHeader compone HeaderThemeToggle (Task 10), che chiama useTheme()
  // e lancia se montato fuori da un ThemeProvider — a differenza dell'app reale
  // (dove ThemeProvider avvolge la root), Storybook monta ogni story isolata.
  // Stesso pattern già usato da Header/Theme Toggle
  // (src/components/dashboard/header/theme-toggle-button.stories.tsx).
  decorators: [
    (Story) => (
      <ThemeProvider>
        <Story />
      </ThemeProvider>
    ),
  ],
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
