// ui/src/components/dashboard/ErrorRateBreakdown.stories.tsx
import type { Meta, StoryObj } from '@storybook/react-vite';
import { ErrorRateBreakdown } from './ErrorRateBreakdown';

const meta: Meta<typeof ErrorRateBreakdown> = {
  title: 'Dashboard/ErrorRateBreakdown',
  component: ErrorRateBreakdown,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
  argTypes: { onViewAll: { action: 'viewAll' } },
};
export default meta;
type Story = StoryObj<typeof ErrorRateBreakdown>;

export const Default: Story = {
  args: {
    overallRate: 4.1,
    overallUnit: '%',
    totalRequests: 128400,
    distribution: {
      '2xx': 118513,
      '3xx': 0,
      '4xx': 4624,
      '5xx': 5264,
    },
    endpoints: [
      {
        method: 'GET',
        path: '/v1/tenants',
        statusBadge: '5xx · 89',
        statusTone: 'danger',
        sparkline: [0.33, 0.5, 0.83, 1, 0.67, 1],
        sparklineTone: 'danger',
        delta: '▲ 412%',
        deltaTone: 'danger',
      },
      {
        method: 'POST',
        path: '/v1/auth/login',
        statusBadge: '401 · 34',
        statusTone: 'warning',
        sparkline: [0.5, 1, 0.5, 1, 1, 1],
        sparklineTone: 'warning',
      },
    ],
  },
  parameters: {
    docs: { description: { story: 'Agganciato a dati live in produzione (SystemHealthLive.tsx, route PLATFORM_ADMIN) — questi valori sono di esempio.' } },
  },
};
