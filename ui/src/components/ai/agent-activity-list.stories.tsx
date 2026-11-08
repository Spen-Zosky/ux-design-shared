import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { AgentActivityList, type AgentActivityListLabels } from './agent-activity-list';

const labels: AgentActivityListLabels = {
  title: 'Le tue attività con l’assistente',
  empty: 'Nessuna conversazione ancora.',
  resume: 'Riprendi',
  newConversation: 'Nuova conversazione',
  statusLabels: {
    IN_CORSO: 'In corso',
    IN_ATTESA: 'Aspetta te',
    FATTA: 'Fatta',
    FALLITA: 'Fallita',
    INTERROTTA: 'Interrotta',
  },
  pending: (n) => (n === 1 ? '1 proposta aspetta te' : `${n} proposte aspettano te`),
};

const meta: Meta<typeof AgentActivityList> = {
  title: 'AI/AgentActivityList',
  component: AgentActivityList,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof AgentActivityList>;

function Demo({ vuota = false }: { vuota?: boolean }) {
  const [scelta, setScelta] = React.useState<string | null>('c1');
  const items = vuota
    ? []
    : [
        { id: 'c1', title: 'Chi del mio gruppo è in ferie ad agosto?', status: 'IN_ATTESA' as const, pendingProposals: 1, updatedText: 'oggi 10:12' },
        { id: 'c2', title: 'Riassumi le posizioni scoperte dell’unità', status: 'INTERROTTA' as const, updatedText: 'ieri 18:40' },
        { id: 'c3', title: 'Prepara la nota per la revisione', status: 'FATTA' as const, updatedText: '3 nov' },
      ];
  return <AgentActivityList labels={labels} items={items} selectedId={scelta} onSelect={setScelta} onNew={() => setScelta(null)} />;
}

export const ConConversazioni: Story = { render: () => <Demo /> };
export const Vuota: Story = { render: () => <Demo vuota /> };
