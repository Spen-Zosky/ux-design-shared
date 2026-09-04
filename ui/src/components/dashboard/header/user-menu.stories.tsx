import type { Meta, StoryObj } from '@storybook/react-vite';
import { HeaderUserMenu } from './user-menu';

const meta: Meta<typeof HeaderUserMenu> = {
  title: 'Layout/Header/User Menu',
  component: HeaderUserMenu,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    onNavigateProfile: { action: 'navigateProfile' },
    onNavigateSettings: { action: 'navigateSettings' },
    onLogout: { action: 'logout' },
    onSelectTenant: { action: 'selectTenant' },
  },
};
export default meta;
type Story = StoryObj<typeof HeaderUserMenu>;

export const SingleTenant: Story = {
  args: {
    user: { initials: 'MR', username: 'Mario Rossi', role: 'admin', roleTone: 'palette-3' },
  },
  parameters: {
    docs: {
      description: {
        story: 'Senza `tenants` (o con un solo tenant), la voce "Cambia organizzazione" non compare — clicca l\'avatar per aprire il menu.',
      },
    },
  },
};

export const MultiTenant: Story = {
  args: {
    user: { initials: 'LB', username: 'Lucia Bianchi', role: 'auditor' },
    tenants: [
      { id: 't1', name: 'Heuresys Italia' },
      { id: 't2', name: 'Heuresys DACH' },
      { id: 't3', name: 'Heuresys Iberia' },
    ],
  },
  parameters: {
    docs: {
      description: { story: 'Con ≥2 tenant, "Cambia organizzazione" compare con l\'elenco — colma il gap "TenantSwitcher" rilevato nell\'indagine (nessun componente dedicato esisteva nel design system).' },
    },
  },
};
