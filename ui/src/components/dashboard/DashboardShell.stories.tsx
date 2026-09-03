import type { Meta, StoryObj } from '@storybook/react-vite';
import { DashboardShell } from './DashboardShell';
import { DashboardHeader } from './DashboardHeader';
import { DashboardSidebar, type NavGroup } from './DashboardSidebar';
import { DashboardFooter } from './DashboardFooter';

const meta: Meta<typeof DashboardShell> = {
  title: 'Layout/Dashboard Shell (Complete)',
  component: DashboardShell,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
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
          'Il "contenitore Dashboard" che orchestra Header/Sidebar/Footer/children — puro layout a griglia, nessuna logica propria. Ogni slot è popolato qui con i sotto-componenti già documentati sotto Header/ e Layout/*.',
      },
    },
  },
};
