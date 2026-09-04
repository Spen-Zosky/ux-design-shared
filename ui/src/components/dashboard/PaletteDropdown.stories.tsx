import type { Meta, StoryObj } from '@storybook/react-vite';
import { PaletteDropdown } from './PaletteDropdown';

const meta: Meta<typeof PaletteDropdown> = {
  title: 'Header/Palette Switcher',
  component: PaletteDropdown,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof PaletteDropdown>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Nessun Control esposto: il componente non accetta props (stato e i 4 preset colore sono interamente interni, persistiti in localStorage("heuresys-palette")). Clicca il trigger nel canvas per aprire il menu e cambiare palette.',
      },
    },
  },
};
