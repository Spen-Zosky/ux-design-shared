import type { Meta, StoryObj } from '@storybook/react-vite';
import { ProgressBar, WorkInProgress, TopProgress } from './progress';
import { playEndSignal } from '../lib/end-signal';

const meta: Meta<typeof ProgressBar> = {
  title: 'Feedback/Attese che bloccano',
  component: ProgressBar,
};
export default meta;
type Story = StoryObj<typeof ProgressBar>;

export const Determinata: Story = { args: { value: 5, max: 8, label: 'Domini misurati' } };
export const Indeterminata: Story = { args: { label: 'Lettura in corso' } };

export const Riquadro: StoryObj<typeof WorkInProgress> = {
  render: () => (
    <WorkInProgress title="Giro dell'agente sulle unità" detail="Dominio 3 di 8 · circa due minuti" value={3} max={8} />
  ),
};

export const RiquadroSenzaMisura: StoryObj<typeof WorkInProgress> = {
  render: () => <WorkInProgress title="Applicazione delle decisioni" detail="La pagina si sblocca alla fine." />,
};

export const BarraInCima: StoryObj<typeof TopProgress> = {
  render: () => <TopProgress active delayMs={0} />,
};

export const SegnaleDiFine: Story = {
  render: () => (
    <button type="button" onClick={() => void playEndSignal()} className="rounded border px-3 py-1">
      Prova il segnale di fine
    </button>
  ),
};
