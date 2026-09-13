import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { AgentPanel, type AgentPanelLabels } from './agent-panel';

const labels: AgentPanelLabels = {
  title: 'Assistente',
  description: 'Chiedi qualcosa sui dati di questa pagina. Le scritture chiedono la tua approvazione.',
  promptLabel: 'Domanda',
  promptPlaceholder: 'Quante unità organizzative esistono?',
  run: 'Chiedi',
  running: 'In corso…',
  stop: 'Ferma',
  streamTitle: 'Risposta',
  streamEmpty: 'Nessuna risposta ancora.',
  approvalTitle: 'Approvazione richiesta',
  approvalDesc: "L'assistente vuole eseguire una scrittura. Consenti o nega.",
  approvalTool: 'Strumento',
  approvalInput: 'Dati',
  allow: 'Consenti',
  deny: 'Nega',
  gatewayLabel: 'Gateway',
  contextLabel: 'Contesto',
};

const meta: Meta<typeof AgentPanel> = {
  title: 'AI/AgentPanel',
  component: AgentPanel,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof AgentPanel>;

/** Il pannello con stato proprio, come lo monta una pagina: il canale è finto. */
function Demo(props: Partial<React.ComponentProps<typeof AgentPanel>>) {
  const [prompt, setPrompt] = React.useState('');
  const [running, setRunning] = React.useState(false);
  const [lines, setLines] = React.useState<Array<{ id: number; kind: string; text: string }>>([]);
  const run = () => {
    setRunning(true);
    setLines((l) => [...l, { id: l.length + 1, kind: 'message', text: `{"prompt":"${prompt}"}` }]);
    setTimeout(() => {
      setLines((l) => [...l, { id: l.length + 1, kind: 'done', text: '{"ok":true}' }]);
      setRunning(false);
    }, 800);
  };
  return (
    <AgentPanel
      labels={labels}
      prompt={prompt}
      onPromptChange={setPrompt}
      running={running}
      onRun={run}
      onStop={() => setRunning(false)}
      lines={lines}
      {...props}
    />
  );
}

export const Vuoto: Story = { render: () => <Demo /> };

export const ConContesto: Story = {
  render: () => <Demo context="organization-units/OU-0042" gatewayUrl="http://localhost:8790" />,
};

export const ConApprovazione: Story = {
  render: () => (
    <Demo
      approval={{
        approvalId: 'a-1',
        tool: 'hrx_positions_upsert',
        input: { id: 'P-12', payload: { title: '[REDACTED]' } },
      }}
      onApproval={() => undefined}
      lines={[
        { id: 1, kind: 'message', text: '{"type":"assistant","text":"Aggiorno la posizione P-12."}' },
        { id: 2, kind: 'approval_required', text: '{"approvalId":"a-1"}' },
      ]}
    />
  ),
};

export const ConErrore: Story = {
  render: () => (
    <Demo
      notice={{ kind: 'err', text: 'Il gateway non risponde (http://localhost:8790).' }}
      lines={[{ id: 1, kind: 'error', text: '{"error":"ECONNREFUSED"}' }]}
    />
  ),
};
