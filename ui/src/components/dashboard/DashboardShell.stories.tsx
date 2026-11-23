import type { Meta, StoryObj } from '@storybook/react-vite';
import { DashboardShell } from './DashboardShell';
import { DashboardHeader } from './DashboardHeader';
import { DashboardSidebar, type NavGroup } from './DashboardSidebar';
import { DashboardFooter } from './DashboardFooter';
import { ThemeProvider } from '../theme-provider';
import { HeuresysLogoBadge } from '../brand/HeuresysLogoBadge';

const meta: Meta<typeof DashboardShell> = {
  title: 'Layout/Dashboard Shell (Complete)',
  component: DashboardShell,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
  // Questa story monta DashboardHeader, che compone HeaderThemeToggle: chiama
  // useTheme() e lancia se montato fuori da un ThemeProvider. Nell'app reale il
  // provider avvolge la root (verificato in entrambi i consumer), ma Storybook
  // monta ogni story isolata. Stesso decorator già usato da
  // Layout/Header/Dashboard Header (Complete) e Layout/Header/Theme Toggle.
  decorators: [
    (Story) => (
      <ThemeProvider>
        <Story />
      </ThemeProvider>
    ),
  ],
};
export default meta;
type Story = StoryObj<typeof DashboardShell>;

const groups: NavGroup[] = [
  { id: 'main', label: 'Principale', defaultExpanded: true, items: [{ id: 'home', label: 'Dashboard', href: '/' }] },
];

export const Assembled: Story = {
  render: () => (
    <DashboardShell
      header={<DashboardHeader language="IT" user={{ initials: 'MR', username: 'Mario Rossi', role: 'admin' }} />}
      sidebar={<DashboardSidebar groups={groups} />}
      footer={<DashboardFooter />}
    >
      <div className="p-6">Contenuto pagina — popolato dal consumer.</div>
    </DashboardShell>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Il "contenitore Dashboard" che orchestra Header/Sidebar/Footer/children — puro layout a griglia, nessuna logica propria. Ogni slot è popolato qui con i sotto-componenti documentati sotto Layout/*, header compreso: dal 2026-09-04 vivono tutti sotto Layout/Header/, che prima era un gruppo separato di primo livello.',
      },
    },
  },
};

/**
 * Il guscio come lo monta un consumer vero, da guardare a 390 px: distintivo accanto al
 * marchio, nome utente lungo, menu utente, un extra a destra e un contenuto che si adatta.
 * La prova `e2e/shell-390.spec.ts` apre questa story a 390 e a 1440 px e controlla che
 * niente esca dalla larghezza della finestra.
 */
export const Telefono390: Story = {
  name: 'Telefono 390 px',
  render: () => (
    <DashboardShell
      header={
        <DashboardHeader
          language="IT"
          logoBadge={<HeuresysLogoBadge aria-hidden="true">advanced</HeuresysLogoBadge>}
          user={{ initials: 'MR', username: 'Mariangela Rossi-Bianchi', role: 'tenant admin' }}
          userMenu={{}}
          mobileNav={<nav aria-label="Navigazione"><a href="/">Dashboard</a></nav>}
          rightExtras={<span className="rounded-control border border-border px-2 py-1 text-xs">Bozza</span>}
        />
      }
      sidebar={<DashboardSidebar groups={groups} />}
      footer={<DashboardFooter />}
    >
      <main>
        <h1 className="text-xl font-semibold">Faldone della persona</h1>
        <p>Contenuto pagina — popolato dal consumer.</p>
      </main>
    </DashboardShell>
  ),
};
