/**
 * WCAG 2.5.3 (Label in Name) sul guscio: il nome accessibile di un controllo contiene il testo
 * che si vede. axe-core 4.14 controlla questa regola di serie (`label-content-name-mismatch`),
 * e su heuresys-advanced la segnalava su ogni pagina autenticata, per quattro elementi del
 * guscio: il collegamento del marchio, il pulsante di ricerca, il cambio lingua e il
 * collegamento al sito nel piè di pagina (censimento del lotto L7, 2026-11-04).
 *
 * jsdom non ha una disposizione grafica, quindi qui si controlla il nome accessibile per
 * forma: o il controllo non ha un aria-label (e il nome viene dal contenuto), oppure
 * l'aria-label comincia con il testo visibile.
 */
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

import { DashboardHeader } from '../dashboard/DashboardHeader';
import { DashboardFooter } from '../dashboard/DashboardFooter';

function nomeContieneIlVisibile(el: HTMLElement) {
  const label = el.getAttribute('aria-label');
  if (label === null) return true;
  const visibile = (el.textContent ?? '').replace(/\s+/g, ' ').trim().toLowerCase();
  return label.toLowerCase().startsWith(visibile);
}

describe('WCAG 2.5.3 — il guscio dice ciò che mostra', () => {
  it('il collegamento del marchio prende il nome dal contenuto, con la destinazione', () => {
    render(<DashboardHeader logoBadge={<span>advanced</span>} />);
    const link = screen.getByRole('link', { name: /heuresys.*advanced.*pagina iniziale/i });
    expect(link.getAttribute('aria-label')).toBeNull();
  });

  it('la destinazione del marchio si può tradurre', () => {
    render(<DashboardHeader homeLabel="home page" />);
    expect(screen.getByRole('link', { name: /heuresys.*home page/i })).toBeTruthy();
  });

  it('il pulsante di ricerca si chiama con il testo che mostra, e dichiara la scorciatoia', () => {
    const { container } = render(<DashboardHeader />);
    const btn = container.querySelector<HTMLButtonElement>('#js-command-palette-trigger')!;
    expect(nomeContieneIlVisibile(btn)).toBe(true);
    expect(btn.getAttribute('aria-keyshortcuts')).toMatch(/Meta\+K/);
    expect(screen.getByRole('button', { name: /cerca tenant, log, audit/i })).toBe(btn);
  });

  it('il cambio lingua comincia con la sigla visibile', () => {
    render(<DashboardHeader language="EN" />);
    const btn = screen.getByRole('button', { name: /^EN — cambia lingua/ });
    expect(nomeContieneIlVisibile(btn)).toBe(true);
  });

  it('il collegamento al sito comincia con «heuresys.com»', () => {
    render(<DashboardFooter />);
    const link = screen.getByRole('link', { name: /^heuresys\.com/ });
    expect(nomeContieneIlVisibile(link)).toBe(true);
  });
});
