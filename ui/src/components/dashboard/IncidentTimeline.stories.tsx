// ui/src/components/dashboard/IncidentTimeline.stories.tsx
import type { Meta, StoryObj } from '@storybook/react-vite';
import { IncidentTimeline } from './IncidentTimeline';

const meta: Meta<typeof IncidentTimeline> = {
  title: 'Components/IncidentTimeline',
  component: IncidentTimeline,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof IncidentTimeline>;

export const Default: Story = {
  args: {
    items: [
      { severity: 'P2', status: 'RESOLVED', title: 'DB pool exhaustion', meta: '14:20' },
      { severity: 'P3', status: 'ACKNOWLEDGED', title: 'Elevated latency /v1/tenants', meta: '15:05' },
    ],
  },
  parameters: {
    docs: { description: { story: 'Solo mock showcase, zero uso in produzione reale — nessun modulo incidenti reale è ancora collegato (dichiarato esplicitamente nel codice).' } },
  },
};
