// ui/src/components/field-grid.stories.tsx
import type { Meta, StoryObj } from '@storybook/react-vite';
import { FieldGrid, type DetailField } from './field-grid';
import { StatusBadge } from './status-pill';

const meta: Meta<typeof FieldGrid> = {
  title: 'Components/FieldGrid',
  component: FieldGrid,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof FieldGrid>;

const fields: DetailField[] = [
  { label: 'ID', value: 'POS-1042', mono: true },
  { label: 'Nome', value: 'Senior Backend Engineer' },
  { label: 'Stato', value: <StatusBadge value="active" /> },
  { label: 'Creato il', value: '2026-08-12' },
];

export const Default: Story = {
  args: { fields },
  parameters: {
    docs: { description: { story: 'Pattern reale: composizione con StatusBadge per il campo "Stato" (heuresys-advanced/apps/web/src/app/(authenticated)/positions/[positionId]/page.tsx).' } },
  },
};
