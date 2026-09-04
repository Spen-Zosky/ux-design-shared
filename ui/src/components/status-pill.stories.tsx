// ui/src/components/status-pill.stories.tsx
import type { Meta, StoryObj } from '@storybook/react-vite';
import { StatusPill, StatusBadge } from './status-pill';

const meta: Meta<typeof StatusPill> = {
  title: 'Components/StatusPill',
  component: StatusPill,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    tone: { control: 'select', options: ['success', 'warning', 'danger', 'info', 'neutral'] },
  },
};
export default meta;
type Story = StoryObj<typeof StatusPill>;

export const AllTones: Story = {
  render: () => (
    <div className="flex gap-2">
      <StatusPill tone="success">Active</StatusPill>
      <StatusPill tone="warning">Pending</StatusPill>
      <StatusPill tone="danger">Failed</StatusPill>
      <StatusPill tone="info">Info</StatusPill>
      <StatusPill tone="neutral">Neutral</StatusPill>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Il componente più usato di tutto il design system (57 file che referenziano StatusPill/StatusBadge in heuresys-advanced — esclusi node_modules, il bundle ux-design, story e test — di cui 37 li renderizzano davvero, più 1 file in heuresys-datastore; verificato 2026-09-03). Non era ancora nel contratto ufficiale dei componenti canonici: la promozione è proposta in questo ciclo, l\'aggiornamento del contratto (brand-component-contract.md, in heuresys-advanced, repo esterno) è tracciato a parte. Dal 2026-09-03 usa design token invece di colori Tailwind hardcoded.',
      },
    },
  },
};

export const AutoTone_StatusBadge: Story = {
  render: () => (
    <div className="flex gap-2">
      <StatusBadge value="ACTIVE" />
      <StatusBadge value="PENDING" />
      <StatusBadge value="unrecognized-value" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'StatusBadge = StatusPill + statusTone(value) automatico. statusTone() riconosce 37 stringhe note (10+9+9+9, tra ACTIVE/FILLED/APPROVED/...) — un valore non riconosciuto ("unrecognized-value") ricade silenziosamente su tone="neutral". Nei consumer reali, valori come "difficulty"/"readiness" non sono coperti dalle liste note: l\'esito dipende dal valore concreto, non cade sempre su neutral — un "difficulty" nullo cade nella guardia falsy di StatusBadge e rende un trattino "—", non una pill; "readinessLevel" è stringa libera da DB senza enum, e valori plausibili come HIGH/MEDIUM/REVIEW mappano su warning.',
      },
    },
  },
};

export const RelatedComponents: Story = {
  render: () => <p className="text-sm text-muted-foreground max-w-md">Vedi anche: Components/StatusIcon (wrapper colore per icone lucide, non testuale) e Components/Badge (varianti CVA generiche, non status-specifiche). Tre primitivi distinti per "badge colorato", ciascuno con un proprio caso d'uso — non duplicati da unificare.</p>,
  parameters: { docs: { description: { story: 'Nota di orientamento tra i 3 primitivi simili del design system.' } } },
};
