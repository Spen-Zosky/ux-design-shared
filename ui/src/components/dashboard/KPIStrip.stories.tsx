import type { Meta, StoryObj } from '@storybook/react-vite';
import { KPIStrip, type KpiCardData } from './KPIStrip';

const meta: Meta<typeof KPIStrip> = {
  title: 'Dashboard/KPIStrip',
  component: KPIStrip,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof KPIStrip>;

const items: KpiCardData[] = [
  { label: 'API uptime · 24h', value: '99.97', unit: '%', iconTone: 'success', sparkline: [0.9, 0.95, 0.97, 0.99, 0.98, 1] },
  { label: 'DB pool · pg 16', value: '18', unit: '/50', iconTone: 'info' },
  { label: 'Active tenants', value: '4', unit: '/4', iconTone: 'palette-3' },
];

export const Default: Story = {
  args: { items },
  parameters: {
    docs: {
      description: {
        story:
          'Griglia responsive di 2-5 card (11 usi reali in produzione, l\'11° componente più adottato del design system). Distinzione ufficiale da Components/StatsCard (già documentato con la propria story): StatsCard è per UNA metrica singola con count-up animato e trend badge; KPIStrip è per una RIGA di 2-5 metriche senza animazione ma con `body` slot libero e footer configurabile per riga. Non sono duplicati — sono varianti complementari (brand-component-contract.md:20-21).',
      },
    },
  },
};
