// ui/src/components/dashboard/TimeRangeSelector.stories.tsx
import type { Meta, StoryObj } from '@storybook/react-vite';
import { TimeRangeSelector } from './TimeRangeSelector';

const meta: Meta<typeof TimeRangeSelector> = {
  title: 'Dashboard/TimeRangeSelector',
  component: TimeRangeSelector,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: { onChange: { action: 'change' } },
};
export default meta;
type Story = StoryObj<typeof TimeRangeSelector>;

export const Default: Story = {
  args: { value: '24h' },
  parameters: {
    docs: { description: { story: 'Options di default (15m/1h/24h/7d/30d). Un solo uso reale verificato, statico (nessun onChange cablato) — questa story lo rende interattivo.' } },
  },
};
