import type { Meta, StoryObj } from '@storybook/react-vite';
import { HeaderSearchTrigger } from './search-trigger';

const meta: Meta<typeof HeaderSearchTrigger> = {
  title: 'Layout/Header/Search Trigger',
  component: HeaderSearchTrigger,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    onOpenCommandPalette: { action: 'openCommandPalette' },
    placeholder: { control: 'text' },
  },
};
export default meta;
type Story = StoryObj<typeof HeaderSearchTrigger>;

export const Default: Story = {
  args: { placeholder: 'Cerca tenant, log, audit…' },
};

export const English: Story = {
  args: { placeholder: 'Search tenants, logs, audit…' },
};
