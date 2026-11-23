import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { CardTitle } from '../Card';
import { Spinner, Skeleton } from '../skeleton';
import { StatusPill } from '../status-pill';
import { DashboardFooter } from '../dashboard/DashboardFooter';
import { DashboardSidebar } from '../dashboard/DashboardSidebar';
import { DashboardShell } from '../dashboard/DashboardShell';
import { DashboardHeader } from '../dashboard/DashboardHeader';

describe('etichette traducibili e difetti del giudizio 2026-11-16', () => {
  it('CardTitle: h3 per default, il livello si passa con as', () => {
    const { container } = render(
      <>
        <CardTitle>a</CardTitle>
        <CardTitle as="h2">b</CardTitle>
      </>
    );
    expect(container.querySelectorAll('h3')).toHaveLength(1);
    expect(container.querySelectorAll('h2')).toHaveLength(1);
  });

  it('Spinner e Skeleton: «Loading» di default, traducibile', () => {
    const { rerender } = render(<Spinner />);
    expect(screen.getByRole('status').getAttribute('aria-label')).toBe('Loading');
    rerender(<Spinner label="Caricamento" />);
    expect(screen.getByText('Caricamento')).toBeTruthy();
    rerender(<Skeleton label="Caricamento" />);
    expect(screen.getByRole('status').getAttribute('aria-label')).toBe('Caricamento');
  });

  it('footer: websiteLabel sostituisce il nome accessibile', () => {
    render(<DashboardFooter websiteLabel="heuresys.com — sito pubblico (nuova scheda)" />);
    expect(screen.getByRole('link', { name: /sito pubblico/ })).toBeTruthy();
  });

  it('sidebar: titolo e aria-label traducibili, niente 10px', () => {
    const { container } = render(
      <DashboardSidebar groups={[]} title="Navigazione" ariaLabel="Menu" toggleLabel="Comprimi" />
    );
    expect(screen.getByText('Navigazione')).toBeTruthy();
    expect(container.querySelector('aside')?.getAttribute('aria-label')).toBe('Menu');
    expect(container.innerHTML).not.toContain('text-[10px]');
  });

  it('StatusPill usa almeno text-xs', () => {
    const { container } = render(<StatusPill tone="success">ok</StatusPill>);
    expect(container.innerHTML).not.toContain('text-[10px]');
    expect(container.innerHTML).toContain('text-xs');
  });

  it('header: labels traducono hamburger e breadcrumb', () => {
    render(
      <DashboardHeader
        breadcrumb={[{ label: 'A', href: '/a' }, { label: 'B' }]}
        labels={{ menu: 'Open menu', breadcrumb: 'Trail', theme: 'Theme' }}
      />
    );
    expect(screen.getByRole('button', { name: 'Open menu' })).toBeTruthy();
    expect(screen.getByRole('navigation', { name: 'Trail' })).toBeTruthy();
    expect(screen.getByRole('button', { name: 'Theme' })).toBeTruthy();
  });

  it('shell: sotto md la sidebar sparisce; il contenuto non è più una region (1.7.0)', () => {
    const { container } = render(
      <DashboardShell header={<header />} sidebar={<aside />} footer={<footer />} contentLabel="Contenuto pagina">
        x
      </DashboardShell>
    );
    const grid = container.querySelector('[data-shell="grid"]') as HTMLElement;
    expect(grid.className).toContain('max-md:grid-cols-[minmax(0,1fr)]');
    expect(grid.className).toContain('max-md:[&>aside]:hidden');
    expect(grid.style.getPropertyValue('--sidebar-w')).toBe('260px');
    // 1.7.0: la region conteneva il <main> della pagina (K03 del giro forense 2026-11-23).
    expect(screen.queryByRole('region')).toBeNull();
  });
});
