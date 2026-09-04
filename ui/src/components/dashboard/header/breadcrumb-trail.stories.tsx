import type { Meta, StoryObj } from '@storybook/react-vite';
import { HeaderBreadcrumbTrail, type HeaderBreadcrumb } from './breadcrumb-trail';

const meta: Meta<typeof HeaderBreadcrumbTrail> = {
  title: 'Layout/Header/Breadcrumb Trail',
  component: HeaderBreadcrumbTrail,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof HeaderBreadcrumbTrail>;

const sample: HeaderBreadcrumb = [
  { label: 'Datastore', href: '/datastore' },
  { label: 'Catalogo ATECO' },
];

export const Default: Story = {
  args: { items: sample },
};

export const WithClickHandler: Story = {
  args: {
    items: [
      { label: 'Datastore', onClick: () => console.log('nav: datastore') },
      { label: 'Catalogo ATECO' },
    ],
  },
  parameters: {
    docs: {
      description: {
        story:
          'Usa `onClick` invece di `href` — possibile da quando il tipo è stato consolidato su `BreadcrumbItem` (2026-09-03), che lo supporta nativamente.',
      },
    },
  },
};

export const Empty: Story = {
  render: () => (
    <div className="text-xs text-muted-foreground italic p-2">
      (nessun breadcrumb — il componente non renderizza nulla)
      <HeaderBreadcrumbTrail items={[]} />
    </div>
  ),
  parameters: {
    docs: { description: { story: 'Senza breadcrumb il componente non renderizza nulla (return null) — comportamento intenzionale, non un errore. Questo wrapper esiste solo per rendere la story visibile in Storybook.' } },
  },
};
