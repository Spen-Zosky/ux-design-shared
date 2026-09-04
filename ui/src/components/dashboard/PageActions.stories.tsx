// ui/src/components/dashboard/PageActions.stories.tsx
import type { Meta, StoryObj } from '@storybook/react-vite';
import { PageActions } from './PageActions';

const meta: Meta<typeof PageActions> = {
  title: 'Dashboard/PageActions',
  component: PageActions,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: { onRefresh: { action: 'refresh' }, onExport: { action: 'export' } },
};
export default meta;
type Story = StoryObj<typeof PageActions>;

export const Default: Story = {
  args: {},
  parameters: {
    docs: { description: { story: 'Un solo punto d\'uso in tutto l\'ecosistema, nel mock showcase (SystemHealthDashboard.tsx) con handler no-op.' } },
  },
};
