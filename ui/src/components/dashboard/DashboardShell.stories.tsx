import type { Meta, StoryObj } from '@storybook/react-vite';
import { DashboardShell } from './DashboardShell';
import { DashboardHeader } from './DashboardHeader';
import { DashboardSidebar, type NavGroup } from './DashboardSidebar';
import { DashboardFooter } from './DashboardFooter';
import { ThemeProvider } from '../theme-provider';

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
