import type { Meta, StoryObj } from '@storybook/react-vite';
import { HeuresysMark } from './HeuresysMark';

const meta: Meta<typeof HeuresysMark> = {
  title: 'Brand/Mark (symbol only)',
  component: HeuresysMark,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    size: { control: { type: 'number', min: 16, max: 128, step: 8 } },
    color: { control: 'color' },
  },
};
export default meta;
type Story = StoryObj<typeof HeuresysMark>;

export const Default: Story = {
  args: { size: 32 },
  parameters: {
    docs: {
      description: {
        story:
          'Variante solo-simbolo del logo (la "y") — a differenza di Brand/Wordmark (testo completo, colori hardcoded per riconoscibilità cross-tema), questo è theme-dependent (var(--accent) di default) e pensato per contesti compatti: favicon, sidebar collassata, avatar, loading spinner.',
      },
    },
  },
};

export const Large: Story = { args: { size: 64 } };
