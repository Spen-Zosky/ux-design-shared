// ui/src/components/dashboard/LogStream.stories.tsx
import type { Meta, StoryObj } from '@storybook/react-vite';
import { LogStream } from './LogStream';

const meta: Meta<typeof LogStream> = {
  title: 'Dashboard/LogStream',
  component: LogStream,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
  argTypes: { onFilterChange: { action: 'filterChange' }, onPauseToggle: { action: 'pauseToggle' } },
};
export default meta;
type Story = StoryObj<typeof LogStream>;

export const Default: Story = {
  args: {
    connected: true,
    entries: [
      { timestamp: '16:41:02', level: 'info', source: 'srv', message: 'GET /v1/tenants 200 42ms' },
      { timestamp: '16:41:05', level: 'warn', source: 'db', message: 'Slow query detected (1.2s)' },
    ],
  },
  parameters: {
    docs: { description: { story: 'Solo mock showcase — dichiarato esplicitamente "no honest backend" nel codice di produzione (systemd/journalctl infra, non app data).' } },
  },
};
