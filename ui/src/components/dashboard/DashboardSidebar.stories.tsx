import type { Meta, StoryObj } from '@storybook/react-vite';
import { DashboardSidebar, type NavGroup } from './DashboardSidebar';
import { Button } from '../Button';

const meta: Meta<typeof DashboardSidebar> = {
  title: 'Layout/Dashboard Sidebar',
  component: DashboardSidebar,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof DashboardSidebar>;

const groups: NavGroup[] = [
  {
    id: 'archivio',
    label: 'Archivio',
    defaultExpanded: true,
    items: [
      { id: 'cataloghi', label: 'Cataloghi', href: '/cataloghi' },
      { id: 'cerca', label: 'Cerca', href: '/cerca' },
      { id: 'stato', label: 'Stato import', href: '/stato', aux: <span className="text-xs text-success">●</span> },
    ],
  },
  {
    id: 'modellazione',
    label: 'Modellazione',
    items: [
      { id: 'prototipi', label: 'Prototipi', href: '/prototipi' },
      { id: 'classi', label: 'Classi dimensionali', href: '/classi-dimensionali' },
    ],
  },
];

export const Default: Story = {
  args: { groups },
  parameters: {
    docs: {
      description: {
        story:
          'Struttura equivalente a heuresys-datastore/apps/web/src/app/guscio.tsx (3 gruppi, gerarchia a 2 livelli). Il DefaultSidebarFooter interno (versione + stato) è quello usato quando footerSlot non è passato.',
      },
    },
  },
};

export const WithFooterSlotLogout: Story = {
  args: {
    groups,
    footerSlot: (
      <div className="flex items-center justify-between px-2 py-2 text-xs">
        <span>mario.rossi@heuresys.com</span>
        <Button variant="ghost" size="sm">Esci</Button>
      </div>
    ),
  },
  parameters: {
    docs: {
      description: {
        story:
          'Pattern reale in heuresys-advanced: il logout non è dentro il componente, è markup locale del consumer passato via footerSlot (layout.tsx:210-221) — dimostrato qui per chiarezza, non è un default del componente.',
      },
    },
  },
};
