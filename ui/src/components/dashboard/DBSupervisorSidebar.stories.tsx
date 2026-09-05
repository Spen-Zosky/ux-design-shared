// ui/src/components/dashboard/DBSupervisorSidebar.stories.tsx
import type { Meta, StoryObj } from '@storybook/react-vite';
import { DBSupervisorSidebar } from './DBSupervisorSidebar';

const meta: Meta<typeof DBSupervisorSidebar> = {
  title: 'Dashboard/DB Supervisor Nav Item',
  component: DBSupervisorSidebar,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof DBSupervisorSidebar>;

export const Default: Story = {
  render: () => (
    <ul className="w-64 border border-border rounded-card">
      <DBSupervisorSidebar />
    </ul>
  ),
  parameters: {
    docs: { description: { story: 'Zero props (dati interni hardcoded, DB_SUBITEMS). Un solo punto d\'uso in tutto l\'ecosistema, nel mock showcase come customContent di un gruppo sidebar — non un pattern di produzione.' } },
  },
};
