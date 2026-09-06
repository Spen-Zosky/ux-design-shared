import type { Meta, StoryObj } from '@storybook/react-vite';
import { MeshGradient, AuroraBackground } from './backgrounds';

const meta: Meta<typeof MeshGradient> = {
  title: 'Components/Backgrounds',
  component: MeshGradient,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof MeshGradient>;

export const Mesh: Story = {
  render: () => (
    <div className="relative h-[400px] flex items-center justify-center">
      <MeshGradient />
      <p className="relative text-3xl font-bold">Mesh gradient backdrop</p>
    </div>
  ),
};

export const MeshCustomColors: Story = {
  render: () => (
    <div className="relative h-[400px] flex items-center justify-center">
      <MeshGradient colors={['#fbbf24', '#ef4444', '#a855f7', '#3b82f6']} intensity={0.8} />
      {/*
        Lo scrim non e' decorazione: il testo sta su un gradiente dipinto, che
        una macchina non sa leggere — axe vede lo sfondo della pagina sotto e
        misura bianco su bianco (1,03). Un velo scuro dietro la scritta rende
        vero per lo strumento cio' che era gia' vero per l'occhio, ed e' la
        pratica corretta per qualunque testo posato su un'immagine.
      */}
      <p className="relative rounded-card bg-overlay/60 px-4 py-2 text-3xl font-bold text-white">
        Custom palette
      </p>
    </div>
  ),
};

export const Aurora: Story = {
  render: () => (
    <div className="relative h-[400px] flex items-center justify-center bg-neutral-900">
      <AuroraBackground />
      <p className="relative text-4xl font-bold text-white">Aurora animation</p>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Conic-gradient 18s rotate animation. Disabled by prefers-reduced-motion.',
      },
    },
  },
};
