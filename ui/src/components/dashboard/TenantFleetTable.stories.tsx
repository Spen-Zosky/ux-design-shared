// ui/src/components/dashboard/TenantFleetTable.stories.tsx
import type { Meta, StoryObj } from '@storybook/react-vite';
import { TenantFleetTable } from './TenantFleetTable';

const meta: Meta<typeof TenantFleetTable> = {
  title: 'Components/TenantFleetTable',
  component: TenantFleetTable,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
  argTypes: { onOpenDetail: { action: 'openDetail' }, onSearch: { action: 'search' }, onOpenFilters: { action: 'openFilters' } },
};
export default meta;
type Story = StoryObj<typeof TenantFleetTable>;

export const Default: Story = {
  args: {
    rows: [
      {
        code: 'RTL_BANK_REFERENCE',
        initials: 'RB',
        initialsTone: 'palette-1',
        tenantId: '01HQF7A9…XNB3K',
        status: 'healthy',
        users: 240,
        tables: 38,
        errors1h: 0,
        lastActivity: '2m ago',
        poolUtilPct: 42,
      },
      {
        code: 'GENESIS_DEMO',
        initials: 'GD',
        initialsTone: 'warning',
        tenantId: '01HR2K3F…7P1QZ',
        status: 'degraded',
        users: 12,
        tables: 9,
        errors1h: 4,
        lastActivity: '38s ago',
        poolUtilPct: 78,
      },
    ],
  },
  parameters: {
    docs: { description: { story: 'Un solo punto d\'uso, mock showcase con 4 tenant hardcoded — nessun uso in produzione reale verificato.' } },
  },
};
