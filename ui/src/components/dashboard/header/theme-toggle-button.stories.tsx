import type { Meta, StoryObj } from '@storybook/react-vite';
import { HeaderThemeToggle } from './theme-toggle-button';
import { ThemeProvider } from '../../theme-provider';

const meta: Meta<typeof HeaderThemeToggle> = {
  title: 'Header/Theme Toggle',
  component: HeaderThemeToggle,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <ThemeProvider>
        <Story />
      </ThemeProvider>
    ),
  ],
};
export default meta;
type Story = StoryObj<typeof HeaderThemeToggle>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Nessun Control esposto: il tema è gestito da ThemeProvider/useTheme() (context React), non da una prop diretta. Dal 2026-09-03 non manipola più classList/localStorage direttamente — elimina il disallineamento di stato che esisteva quando header e ThemeProvider agivano indipendentemente sullo stesso localStorage. Clicca il bottone nel canvas per vedere il toggle reale.',
      },
    },
  },
};
