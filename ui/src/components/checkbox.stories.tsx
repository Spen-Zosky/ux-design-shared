import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Checkbox } from './checkbox';

const meta: Meta<typeof Checkbox> = {
  title: 'Components/Checkbox',
  component: Checkbox,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof Checkbox>;

/**
 * Le due story isolate portano `aria-label` perche' non hanno una <label>
 * attorno: le altre di questo file la usano, ed e' il pattern da imitare. Un
 * checkbox senza nome e' la regola `button-name` di axe — Radix rende un
 * `<button role="checkbox">`, quindi la regola e' quella dei bottoni.
 *
 * Gli apici inversi sono obbligatori: Storybook rende questo commento come
 * markdown nella pagina di documentazione, e un tag nudo scritto qui diventa
 * un elemento vero e vuoto la' dentro. Scritto senza, ha prodotto da solo le
 * uniche quattro violazioni `critical` rimaste dopo la prima correzione.
 */
export const Default: Story = { render: () => <Checkbox aria-label="Accept terms" /> };

export const Checked: Story = {
  render: () => <Checkbox defaultChecked aria-label="Accept terms" />,
};

export const Disabled: Story = {
  render: () => (
    <div className="flex flex-col gap-2">
      <label className="flex items-center gap-2 text-sm">
        <Checkbox disabled /> Disabled unchecked
      </label>
      <label className="flex items-center gap-2 text-sm">
        <Checkbox disabled defaultChecked /> Disabled checked
      </label>
    </div>
  ),
};

export const WithLabel: Story = {
  render: () => (
    <label className="flex items-center gap-2 text-sm">
      <Checkbox /> Accept terms and conditions
    </label>
  ),
};

function Group() {
  const [checked, setChecked] = useState({
    p1: true,
    p2: false,
    p3: true,
  } as Record<string, boolean>);
  return (
    <div className="space-y-2">
      {Object.entries(checked).map(([key, val]) => (
        <label key={key} className="flex items-center gap-2 text-sm">
          <Checkbox
            checked={val}
            onCheckedChange={(c) => setChecked((s) => ({ ...s, [key]: !!c }))}
          />
          {key.toUpperCase()}: Multi-tenant principle {key.slice(1)}
        </label>
      ))}
      <p className="text-xs text-neutral-500">
        Selected:{' '}
        {Object.entries(checked)
          .filter(([_, v]) => v)
          .map(([k]) => k)
          .join(', ') || 'none'}
      </p>
    </div>
  );
}
export const ControlledGroup: Story = { render: () => <Group /> };
