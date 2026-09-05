import type { Meta, StoryObj } from '@storybook/react-vite';
import { ThemeToggle } from './theme-toggle';
import { ThemeProvider } from './theme-provider';

const meta: Meta<typeof ThemeToggle> = {
  title: 'Components/ThemeToggle (autonomo)',
  component: ThemeToggle,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Toggle di tema **autonomo**, da usare fuori dal guscio di pagina: cicla chiaro → scuro → sistema e mostra l’etichetta dello stato. Non confonderlo con **Layout/Header/Theme Toggle (nel guscio)**, che è il pulsante icona montato dentro DashboardHeader: quello ha una sola icona, non espone l’opzione "sistema", e degrada a pulsante inerte quando manca il ThemeProvider invece di far cadere l’header.',
      },
    },
  },
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof ThemeToggle>;

export const Default: Story = {
  render: () => (
    <ThemeProvider defaultTheme="system">
      <div className="flex flex-col items-center gap-3">
        <ThemeToggle />
        <p className="text-xs text-neutral-500">Click to cycle: light → dark → system</p>
      </div>
    </ThemeProvider>
  ),
};
