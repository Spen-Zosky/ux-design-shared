import type { Meta, StoryObj } from '@storybook/react-vite';
import * as React from 'react';
import { HeaderMobileDrawer } from './mobile-drawer';
import { Button } from '../../Button';

const meta: Meta<typeof HeaderMobileDrawer> = {
  title: 'Header/Mobile Drawer',
  component: HeaderMobileDrawer,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof HeaderMobileDrawer>;

function DrawerDemo() {
  const [open, setOpen] = React.useState(false);
  return (
    <div className="p-6">
      <Button onClick={() => setOpen(true)}>Apri drawer</Button>
      <HeaderMobileDrawer open={open} onOpenChange={setOpen}>
        <nav className="flex flex-col gap-1 text-sm">
          <a href="#" className="rounded px-2 py-1.5 hover:bg-accent">Dashboard</a>
          <a href="#" className="rounded px-2 py-1.5 hover:bg-accent">Tenant</a>
          <a href="#" className="rounded px-2 py-1.5 hover:bg-accent">Log &amp; Audit</a>
          <a href="#" className="rounded px-2 py-1.5 hover:bg-accent">Impostazioni</a>
        </nav>
      </HeaderMobileDrawer>
    </div>
  );
}

export const Default: Story = {
  render: () => <DrawerDemo />,
  parameters: {
    docs: {
      description: {
        story:
          'Componente controllato (open/onOpenChange), collegato all\'hamburger di DashboardHeader (Header/Dashboard Header (Complete)). Il contenuto qui è un esempio minimo — in produzione il consumer passa lo stesso nodo React già usato per la sidebar desktop.',
      },
    },
  },
};
