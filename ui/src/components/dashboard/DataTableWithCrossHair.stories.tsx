import type { Meta, StoryObj } from '@storybook/react-vite';
import { DataTableWithCrossHair } from './DataTableWithCrossHair';

const meta: Meta<typeof DataTableWithCrossHair> = {
  title: 'Dashboard/DataTableWithCrossHair',
  component: DataTableWithCrossHair,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof DataTableWithCrossHair>;

export const RawHtmlTable: Story = {
  render: () => (
    <DataTableWithCrossHair caption="Posizioni aperte">
      <thead>
        <tr><th className="text-left p-2">ID</th><th className="text-left p-2">Titolo</th><th className="text-left p-2">Stato</th></tr>
      </thead>
      <tbody>
        <tr><td className="p-2">POS-1042</td><td className="p-2">Senior Backend Engineer</td><td className="p-2">Aperta</td></tr>
        <tr><td className="p-2">POS-1043</td><td className="p-2">Product Designer</td><td className="p-2">In revisione</td></tr>
      </tbody>
    </DataTableWithCrossHair>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Pattern verificato come REALMENTE usato in produzione (2026-09-03): frammenti HTML grezzi (<thead>/<tbody>) passati come children — il componente stesso renderizza già il <table> che li avvolge — non il componente DataTable (TanStack) annidato al suo interno. Nota di governance: il commento nel codice sorgente di questo componente dice che i due sono alternativi; il contratto ufficiale del design system (heuresys-advanced/docs/architecture/brand-component-contract.md:22, repo esterno) dice che andrebbero annidati — nessun consumer verificato (data-table-panel.tsx, showcase/tables/page.tsx, entrambi in heuresys-advanced) segue quest\'ultimo pattern. Questa story documenta la realtà, non entrambe le versioni della doc.',
      },
    },
  },
};
