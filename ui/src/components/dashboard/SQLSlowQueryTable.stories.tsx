// ui/src/components/dashboard/SQLSlowQueryTable.stories.tsx
import type { Meta, StoryObj } from '@storybook/react-vite';
import { SQLSlowQueryTable } from './SQLSlowQueryTable';

const meta: Meta<typeof SQLSlowQueryTable> = {
  title: 'Dashboard/SQLSlowQueryTable',
  component: SQLSlowQueryTable,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
  argTypes: { onOpenExplain: { action: 'openExplain' }, onResetStats: { action: 'resetStats' } },
};
export default meta;
type Story = StoryObj<typeof SQLSlowQueryTable>;

export const Default: Story = {
  args: {
    totalTracked: 42,
    rows: [
      {
        rank: 1,
        query: 'SELECT * FROM tenants WHERE...',
        tenant: 'all',
        tenantTone: 'muted',
        calls: 120,
        p95Ms: 1200,
        meanMs: 840,
        totalTimeBarPct: 54,
        totalTimeTone: 'warning',
        totalTimeLabel: '1.7 min',
        lastSeen: '3s ago',
      },
      {
        rank: 2,
        query: 'SELECT * FROM audit_log JOIN...',
        tenant: 'GENESIS_DEMO',
        tenantTone: 'palette-1',
        calls: 300,
        p95Ms: 980,
        meanMs: 620,
        totalTimeBarPct: 100,
        totalTimeTone: 'danger',
        totalTimeLabel: '3.1 min',
        lastSeen: '12s ago',
      },
    ],
  },
  parameters: {
    docs: { description: { story: 'Agganciato a dati live in produzione (SystemHealthLive.tsx, route PLATFORM_ADMIN).' } },
  },
};
