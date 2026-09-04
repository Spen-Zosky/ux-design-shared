import type { Meta, StoryObj } from '@storybook/react-vite';
import { HeaderMenuTrigger } from './menu-trigger';

const meta: Meta<typeof HeaderMenuTrigger> = {
  title: 'Header/Menu Trigger',
  component: HeaderMenuTrigger,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    onOpenMenu: { action: 'openMenu' },
    label: { control: 'text' },
  },
};
export default meta;
type Story = StoryObj<typeof HeaderMenuTrigger>;

export const Default: Story = {
  args: { label: 'Apri menu contesto globale' },
};
