/**
 * Giro forense di heuresys-advanced del 2026-11-23, classi K03, K04, K05 e i titoli fissi
 * trovati nella revisione di K13. jsdom non ha layout: la larghezza a 390 px si prova in
 * `e2e/shell-390.spec.ts`; qui si fissano la forma del DOM e le classi che la producono.
 */
import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';

import { DashboardShell } from '../dashboard/DashboardShell';
import { DashboardHeader } from '../dashboard/DashboardHeader';
import { PaletteDropdown } from '../dashboard/PaletteDropdown';
import { EmptyState, ErrorState } from '../empty-state';
import { KanbanBoard } from '../collab/kanban-board';
import { AgentPanel, type AgentPanelLabels } from '../ai/agent-panel';

function guscio(props: Partial<React.ComponentProps<typeof DashboardShell>> = {}, figli: React.ReactNode = <main>x</main>) {
  return render(
    <DashboardShell header={<header />} sidebar={<aside />} footer={<footer />} {...props}>
      {figli}
    </DashboardShell>
  );
}

describe('K03 — landmark del guscio', () => {
  it('per default il main della pagina non sta dentro un altro landmark', () => {
    const { container } = guscio({ contentLabel: 'Contenuto' });
    expect(container.querySelector('[role="region"]')).toBeNull();
    const main = container.querySelector('main') as HTMLElement;
    expect(main.parentElement?.closest('main,[role],section[aria-label],section[aria-labelledby]')).toBeNull();
    // Resta scorrevole da tastiera.
    expect(container.querySelector('[data-shell="content"]')?.getAttribute('tabindex')).toBe('0');
  });

  it('con contentLandmark="main" il guscio dà il main, con il suo nome', () => {
    const { container } = guscio({ contentLandmark: 'main', contentLabel: 'Contenuto' }, <p>x</p>);
    expect(container.querySelectorAll('main')).toHaveLength(1);
    expect(screen.getByRole('main', { name: 'Contenuto' }).getAttribute('tabindex')).toBe('0');
  });
});

describe('K04 — guscio a 390 px', () => {
  it('la griglia esterna dichiara la sua colonna, che può scendere sotto il contenuto minimo', () => {
    const { container } = guscio();
    const esterna = container.firstElementChild as HTMLElement;
    expect(esterna.className).toContain('grid-cols-[minmax(0,1fr)]');
    expect(esterna.className).toContain('min-w-0');
  });

  it('header: a sinistra cede, a destra tiene; con il cassetto le preferenze escono sotto sm', () => {
    const { container } = render(
      <DashboardHeader user={{ initials: 'MR', username: 'Mario Rossi', role: 'admin' }} mobileNav={<nav />} />
    );
    const header = container.querySelector('header') as HTMLElement;
    const sinistra = header.children[0] as HTMLElement;
    const destra = header.children[1] as HTMLElement;
    expect(header.className).toContain('min-w-0');
    expect(sinistra.className).toContain('min-w-0');
    // Il gruppo non taglia (taglierebbe il fuoco dell'hamburger): cede solo il marchio.
    expect(sinistra.className).not.toContain('overflow-hidden');
    expect(sinistra.querySelector('a')?.className).toContain('overflow-hidden');
    expect(sinistra.querySelector('button')?.className).toContain('shrink-0');
    expect(destra.className).toContain('shrink-0');
    const preferenze = container.querySelector('#js-palette-trigger')!.closest('.max-sm\\:hidden');
    expect(preferenze).toBeTruthy();
    expect(preferenze?.querySelector('#js-theme-toggle')).toBeTruthy();
  });

  it('header senza cassetto: le preferenze restano visibili, non c’è dove spostarle', () => {
    const { container } = render(<DashboardHeader />);
    expect(container.querySelector('#js-palette-trigger')!.closest('.max-sm\\:hidden')).toBeNull();
  });
});

describe('K05 — testi traducibili', () => {
  it('il pulsante della ricerca usa il segnaposto tradotto della palette', () => {
    render(<DashboardHeader labels={{ commandPalettePlaceholder: 'Search people, pages…' }} />);
    expect(screen.getByRole('button', { name: /Search people, pages…/ })).toBeTruthy();
    expect(screen.queryByText('Cerca tenant, log, audit…')).toBeNull();
  });

  it('searchPlaceholder vince sul segnaposto della palette', () => {
    render(<DashboardHeader labels={{ commandPalettePlaceholder: 'A', searchPlaceholder: 'Search' }} />);
    expect(screen.getByRole('button', { name: /^Search/ })).toBeTruthy();
  });

  it('tavolozza: etichette dal consumer, default storici senza', () => {
    const { rerender } = render(<PaletteDropdown />);
    expect(screen.getByRole('button', { name: 'Cambia palette accent (apri menu)' })).toBeTruthy();
    rerender(<PaletteDropdown label="Change accent palette" listLabel="Palettes" heading="Accent" />);
    expect(screen.getByRole('button', { name: 'Change accent palette' })).toBeTruthy();
    expect(document.getElementById('js-palette-menu')?.getAttribute('aria-label')).toBe('Palettes');
    expect(document.getElementById('js-palette-menu')?.textContent).toContain('Accent');
  });

  it('header: labels.palette arriva alla tavolozza', () => {
    render(<DashboardHeader labels={{ palette: 'Change accent palette' }} />);
    expect(screen.getByRole('button', { name: 'Change accent palette' })).toBeTruthy();
  });
});

describe('titoli con livello configurabile (revisione K13)', () => {
  it('EmptyState ed ErrorState: h3 per default, headingLevel lo cambia', () => {
    const { container } = render(
      <>
        <EmptyState title="a" />
        <EmptyState title="b" headingLevel="h2" />
        <ErrorState title="c" headingLevel="h2" />
      </>
    );
    expect(container.querySelectorAll('h3')).toHaveLength(1);
    expect(container.querySelectorAll('h2')).toHaveLength(2);
  });

  it('KanbanBoard: columnHeadingLevel sui titoli delle colonne', () => {
    const colonne = [{ id: 'c1', title: 'Da fare', cards: [] }];
    const { container, rerender } = render(<KanbanBoard columns={colonne} onChange={() => {}} />);
    expect(container.querySelector('h3')?.textContent).toContain('Da fare');
    rerender(<KanbanBoard columns={colonne} onChange={() => {}} columnHeadingLevel="h2" />);
    expect(container.querySelector('h3')).toBeNull();
    expect(container.querySelector('h2')?.textContent).toContain('Da fare');
  });

  it('AgentPanel: headingLevel sui titoli delle schede', () => {
    const labels = new Proxy({}, { get: (_t, k) => (typeof k === 'string' ? k : '') }) as unknown as AgentPanelLabels;
    const base = {
      labels,
      prompt: '',
      onPromptChange: () => {},
      running: false,
      onRun: () => {},
      onStop: () => {},
      lines: [],
    };
    const { container, rerender } = render(<AgentPanel {...base} />);
    const h3 = container.querySelectorAll('h3').length;
    expect(h3).toBeGreaterThan(0);
    rerender(<AgentPanel {...base} headingLevel="h2" />);
    expect(container.querySelectorAll('h3')).toHaveLength(0);
    expect(container.querySelectorAll('h2')).toHaveLength(h3);
  });
});

describe('tavolozza: una sola scelta per la pagina (revisione della PR #16)', () => {
  it('scelta in un\'istanza, l\'altra la segna subito', () => {
    render(
      <>
        <PaletteDropdown />
        <PaletteDropdown idPrefix="js-palette-drawer" align="start" />
      </>
    );
    const cassetto = document.getElementById('js-palette-drawer-menu') as HTMLElement;
    fireEvent.click(cassetto.querySelectorAll('[role="option"]')[2] as HTMLElement);
    const barra = document.getElementById('js-palette-menu') as HTMLElement;
    const selezione = (menu: HTMLElement) =>
      Array.from(menu.querySelectorAll('[role="option"]')).map((o) => o.getAttribute('aria-selected'));
    expect(selezione(barra)).toEqual(['false', 'false', 'true', 'false']);
    expect(selezione(cassetto)).toEqual(['false', 'false', 'true', 'false']);
  });
});
