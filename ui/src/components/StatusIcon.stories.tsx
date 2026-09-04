// ui/src/components/StatusIcon.stories.tsx
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Wifi, Database, ShieldCheck } from 'lucide-react';
import { StatusIcon } from './StatusIcon';

const meta: Meta<typeof StatusIcon> = {
  title: 'Components/StatusIcon',
  component: StatusIcon,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    tone: { control: 'select', options: ['neutral', 'info', 'success', 'warning', 'danger', 'disabled'] },
    size: { control: { type: 'number', min: 12, max: 48 } },
  },
};
export default meta;
type Story = StoryObj<typeof StatusIcon>;

export const Success: Story = {
  args: { icon: ShieldCheck, tone: 'success' },
  parameters: {
    docs: { description: { story: 'Nessun uso in pagine prodotto reali — l\'unico impiego verificato è la pagina demo /showcase/icons di heuresys-advanced, essa stessa vetrina del design system. Questa story ne prende il posto come riferimento.' } },
  },
};
export const Warning: Story = { args: { icon: Wifi, tone: 'warning' } };
export const Danger: Story = { args: { icon: Database, tone: 'danger' } };
