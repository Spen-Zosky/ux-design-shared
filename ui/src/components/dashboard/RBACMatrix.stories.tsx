import type { Meta, StoryObj } from '@storybook/react-vite';
import { RBACMatrix } from './RBACMatrix';

const meta: Meta<typeof RBACMatrix> = {
  title: 'Dashboard/RBACMatrix (Production Report)',
  component: RBACMatrix,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
  argTypes: { onExportCsv: { action: 'exportCsv' }, onViewFull: { action: 'viewFull' } },
};
export default meta;
type Story = StoryObj<typeof RBACMatrix>;

export const Default: Story = {
  args: {
    roles: [
      { code: 'admin', tone: 'palette-1' },
      { code: 'auditor', tone: 'palette-2' },
      { code: 'viewer', tone: 'muted-foreground' },
    ],
    rows: [
      {
        permission: 'tenants:read',
        description: 'Read tenant records',
        states: ['granted', 'granted', 'granted'],
      },
      {
        permission: 'tenants:write',
        description: 'Create or modify tenant records',
        states: ['granted', 'denied', 'denied'],
      },
      {
        permission: 'audit:export',
        description: 'Export audit log entries',
        states: ['granted', 'scoped', 'denied'],
        scopeTitles: [undefined, 'own tenant only', undefined],
      },
    ],
    totalMappings: 388,
    totalRoles: 3,
    totalPermissions: 3,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Report di sola lettura con celle tri-state (granted/scoped/denied) ed export CSV, agganciato a dati live in produzione (SystemHealthLive.tsx, route PLATFORM_ADMIN). Il tri-state è una capacità del componente: l\'endpoint attuale produce solo granted/denied (existence-only), "scoped" non è derivabile dai dati live di oggi ed è mostrato qui a scopo dimostrativo. NON è lo stesso componente di Dashboard/RbacMatrix (Interactive Editor) (nomi quasi identici, scopi diversi: quello è un editor per assegnare permessi, questo è un report per monitorarli). Vedi entrambe le story per la distinzione.',
      },
    },
  },
};
