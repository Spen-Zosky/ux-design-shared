// ui/src/components/dashboard/AuditFeed.stories.tsx
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Shield, UserPlus, AlertTriangle } from 'lucide-react';
import { AuditFeed, type AuditEvent } from './AuditFeed';

const meta: Meta<typeof AuditFeed> = {
  title: 'Dashboard/AuditFeed',
  component: AuditFeed,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
  argTypes: { onViewAll: { action: 'viewAll' } },
};
export default meta;
type Story = StoryObj<typeof AuditFeed>;

const events: AuditEvent[] = [
  { icon: <Shield className="h-4 w-4" />, tone: 'success', title: 'RBAC mapping updated', description: 'auditor role → +2 permissions', meta: '2 min ago' },
  { icon: <UserPlus className="h-4 w-4" />, tone: 'info', title: 'New tenant onboarded', description: 'GENESIS_DEMO', meta: '1h ago' },
  { icon: <AlertTriangle className="h-4 w-4" />, tone: 'warning', title: 'Failed login burst', description: '5 attempts, blocked', meta: '3h ago' },
];

export const Default: Story = {
  args: { events },
  parameters: {
    docs: { description: { story: 'Reale in produzione (SystemHealthLive.tsx, dashboard/page.tsx, me/inbox/page.tsx) con dati dinamici da API — questi eventi sono di esempio.' } },
  },
};
export const Empty: Story = { args: { events: [] } };
