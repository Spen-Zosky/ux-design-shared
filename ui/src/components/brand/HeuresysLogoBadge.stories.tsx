import type { Meta, StoryObj } from '@storybook/react-vite';
import { HeuresysLogoBadge } from './HeuresysLogoBadge';

const meta: Meta<typeof HeuresysLogoBadge> = {
  title: 'Brand/Logo Badge',
  component: HeuresysLogoBadge,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof HeuresysLogoBadge>;

export const Advanced: Story = {
  args: { children: 'advanced' },
  parameters: {
    docs: {
      description: {
        story: 'In tutti i 7 usi reali verificati (heuresys-advanced) il testo è sempre "advanced" — accetta testo libero ma questo è l\'unico valore mai osservato in produzione.',
      },
    },
  },
};

export const Beta: Story = {
  args: { children: 'beta' },
  parameters: {
    docs: { description: { story: 'Mai usato in produzione — il componente lo accetta (children libero), ma questo valore è solo menzionato in un commento, mai implementato.' } },
  },
};
