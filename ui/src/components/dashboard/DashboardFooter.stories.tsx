import type { Meta, StoryObj } from '@storybook/react-vite';
import { DashboardFooter, type SocialLink } from './DashboardFooter';

const meta: Meta<typeof DashboardFooter> = {
  title: 'Layout/Dashboard Footer',
  component: DashboardFooter,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof DashboardFooter>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Configurazione di default (zero props) — identica a come viene montato in produzione in entrambi i consumer (heuresys-datastore/apps/web/src/app/guscio.tsx:182). Le 5 icone social usano DEFAULT_SOCIALS con href="#" (link morti) perché nessun consumer verificato passa mai `socials`.',
      },
    },
  },
};

export const WithRightSlot: Story = {
  args: {
    rightSlot: <span className="text-xs text-muted-foreground">v5.0.0-mvp3 · build 2847</span>,
  },
  parameters: {
    docs: {
      description: { story: 'Pattern reale in heuresys-advanced: rightSlot con versione/build (es. layout.tsx:227-236).' },
    },
  },
};

const customSocials: readonly SocialLink[] = [
  { id: 'linkedin', href: 'https://linkedin.com/company/heuresys', label: 'LinkedIn' },
  { id: 'github', href: 'https://github.com/heuresys', label: 'GitHub' },
];

export const WithRealSocialLinks: Story = {
  args: { socials: customSocials },
  parameters: {
    docs: {
      description: {
        story:
          'Nessun consumer verificato usa questa combinazione oggi — dimostra che il problema (link morti) è risolvibile passando `socials` con href reali, non un limite del componente.',
      },
    },
  },
};
