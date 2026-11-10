import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { AgentLauncher, AgentWindow } from './agent-window';

const meta: Meta<typeof AgentWindow> = {
  title: 'AI/AgentWindow',
  component: AgentWindow,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof AgentWindow>;

function Demo({ busy = false }: { busy?: boolean }) {
  const [aperta, setAperta] = React.useState(true);
  const [compressa, setCompressa] = React.useState(false);
  return (
    <div className="min-h-[720px] p-6">
      <p className="text-sm text-muted-fg">La pagina resta sotto la finestra, e si usa mentre è aperta.</p>
      <AgentLauncher label="Assistente" busyLabel="lavoro in corso" open={aperta} busy={busy} onToggle={() => setAperta((a) => !a)} />
      <AgentWindow
        labels={{ title: 'Assistente', close: 'Chiudi', toggleAside: 'Mostra o nascondi le attività', sideTitle: 'Pagine e proposte' }}
        open={aperta}
        onClose={() => setAperta(false)}
        aside={<p className="text-sm">Le tue conversazioni</p>}
        asideCollapsed={compressa}
        onToggleAside={() => setCompressa((c) => !c)}
        side={<p className="text-sm">Pagine in cui l’assistente ha lavorato</p>}
      >
        <p className="text-sm">La conversazione.</p>
      </AgentWindow>
    </div>
  );
}

export const Aperta: Story = { render: () => <Demo /> };
export const ConLavoroInCorso: Story = { render: () => <Demo busy /> };
