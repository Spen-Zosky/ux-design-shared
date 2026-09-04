import type { Meta, StoryObj } from '@storybook/react-vite';
import { HeaderLanguageSwitcher } from './language-switcher';

const meta: Meta<typeof HeaderLanguageSwitcher> = {
  title: 'Header/Language Switcher',
  component: HeaderLanguageSwitcher,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    language: { control: 'select', options: ['IT', 'EN'] },
    onToggleLanguage: { action: 'toggleLanguage' },
  },
};
export default meta;
type Story = StoryObj<typeof HeaderLanguageSwitcher>;

export const Italian: Story = {
  args: { language: 'IT' },
  parameters: {
    docs: {
      description: {
        story:
          'Questo è il toggle binario IT/EN realmente usato in produzione (dentro DashboardHeader). Non è la stessa cosa di I18n/LanguagePicker (select su 7 locale) — sono due componenti per due casi d\'uso distinti, non consolidati insieme di proposito (vedi spec § 2).',
      },
    },
  },
};
export const English: Story = { args: { language: 'EN' } };
