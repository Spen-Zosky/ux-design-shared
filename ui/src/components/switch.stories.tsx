import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Switch } from './switch';

const meta: Meta<typeof Switch> = {
  title: 'Components/Switch',
  component: Switch,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof Switch>;

/**
 * Ogni Switch porta un nome accessibile.
 *
 * Il componente e' un passthrough su Radix e inoltra `aria-label` senza
 * ostacoli: un interruttore senza nome e' una demo scritta male, non un
 * difetto del componente. Ma la vetrina e' anche la documentazione, e mostrare
 * `<Switch />` nudo insegna il pattern che poi axe segnala nel consumer —
 * `button-name`, 10 occorrenze da questo solo file.
 */
export const Default: Story = { render: () => <Switch aria-label="Enable feature" /> };
export const Checked: Story = {
  render: () => <Switch defaultChecked aria-label="Enable feature" />,
};
export const Disabled: Story = {
  render: () => (
    <div className="flex gap-3">
      <Switch disabled aria-label="Unavailable, off" />
      <Switch disabled defaultChecked aria-label="Unavailable, on" />
    </div>
  ),
};

function SettingsPanel() {
  const [s, setS] = useState({
    notifications: true,
    autoSave: true,
    darkMode: false,
    telemetry: false,
  });
  return (
    <div className="space-y-3 w-[300px]">
      {[
        { key: 'notifications', label: 'Push notifications', desc: 'Receive alerts in real-time' },
        { key: 'autoSave', label: 'Auto-save drafts', desc: 'Saved every 30s' },
        { key: 'darkMode', label: 'Dark mode', desc: 'Override system preference' },
        { key: 'telemetry', label: 'Anonymous telemetry', desc: 'Help improve the product' },
      ].map(({ key, label, desc }) => (
        <div key={key} className="flex items-start justify-between gap-3 p-3 border rounded">
          <div>
            <p className="text-sm font-medium">{label}</p>
            <p className="text-xs text-muted-fg">{desc}</p>
          </div>
          <Switch
            checked={(s as Record<string, boolean>)[key]}
            onCheckedChange={(v) => setS((x) => ({ ...x, [key]: !!v }))}
            // Il testo accanto e' un <p>, non una <label>: visivamente
            // sufficiente, ma non associato all'interruttore.
            aria-label={label}
          />
        </div>
      ))}
    </div>
  );
}
export const SettingsRecipe: Story = {
  render: () => <SettingsPanel />,
  parameters: {
    docs: {
      description: {
        story: 'Recipe: pannello settings con 4 switch controlled, vedi animation thumb slide.',
      },
    },
  },
};
