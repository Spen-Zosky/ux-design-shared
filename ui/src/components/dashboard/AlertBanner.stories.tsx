// ui/src/components/dashboard/AlertBanner.stories.tsx
import type { Meta, StoryObj } from '@storybook/react-vite';
import { AlertBanner } from './AlertBanner';

const meta: Meta<typeof AlertBanner> = {
  title: 'Dashboard/AlertBanner',
  component: AlertBanner,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['warning', 'danger', 'info', 'success'] },
    onDismiss: { action: 'dismiss' },
  },
};
export default meta;
type Story = StoryObj<typeof AlertBanner>;

export const Warning: Story = {
  args: {
    variant: 'warning',
    title: '1 active incident · GENESIS_DEMO',
    meta: 'P2 · degraded',
    details: 'started 16:35 · 8m ago',
    actions: [{ label: 'Acknowledge', onClick: () => {}, variant: 'primary' }, { label: 'View incident →', onClick: () => {} }],
  },
  parameters: {
    docs: {
      description: {
        story:
          'Zero uso in produzione reale — esplicitamente escluso ("no incident module shipped", SystemHealthLive.tsx:19-21). Questa story usa dati equivalenti al mock showcase, unica fonte disponibile.',
      },
    },
  },
};
