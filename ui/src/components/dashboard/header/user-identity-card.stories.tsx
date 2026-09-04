import type { Meta, StoryObj } from '@storybook/react-vite';
import { HeaderUserIdentity } from './user-identity-card';

const meta: Meta<typeof HeaderUserIdentity> = {
  title: 'Header/User Identity (read-only)',
  component: HeaderUserIdentity,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof HeaderUserIdentity>;

export const Default: Story = {
  args: {
    user: { initials: 'MR', username: 'Mario Rossi', role: 'admin', roleTone: 'palette-3' },
  },
  parameters: {
    docs: {
      description: {
        story:
          'Variante sola-lettura, senza dropdown. Nell\'header di produzione (Header/Dashboard Header (Complete)) è HeaderUserMenu — con Profilo/Impostazioni/Logout/Cambio tenant — a essere montato di default, non questo componente.',
      },
    },
  },
};
