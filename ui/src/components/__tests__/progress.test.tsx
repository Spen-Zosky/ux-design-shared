import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import { axe } from 'jest-axe';
import { ProgressBar, WorkInProgress, TopProgress } from '../progress';
import { isEndSignalEnabled, setEndSignalEnabled, playEndSignal } from '../../lib/end-signal';

describe('ProgressBar', () => {
  it('determinata: espone valore e percentuale', () => {
    render(<ProgressBar value={3} max={8} label="Domini misurati" />);
    const bar = screen.getByRole('progressbar', { name: 'Domini misurati' });
    expect(bar).toHaveAttribute('aria-valuenow', '3');
    expect(bar).toHaveAttribute('aria-valuemax', '8');
    expect(screen.getByText('38%')).toBeInTheDocument();
  });
  it('indeterminata: niente valore, animazione presente', () => {
    const { container } = render(<ProgressBar label="In corso" />);
    const bar = screen.getByRole('progressbar', { name: 'In corso' });
    expect(bar).not.toHaveAttribute('aria-valuenow');
    expect(bar).toHaveAttribute('aria-busy', 'true');
    expect(container.querySelector('.heu-progress-indeterminate')).not.toBeNull();
  });
  it('accessibile', async () => {
    const { container } = render(<ProgressBar value={50} label="Metà" />);
    expect(await axe(container)).toHaveNoViolations();
  });
});

describe('WorkInProgress', () => {
  it('mostra titolo, dettaglio, orbita e barra', () => {
    const { container } = render(
      <WorkInProgress title="Giro dell'agente" detail="Unità: 3 di 8" value={3} max={8} />,
    );
    expect(screen.getByRole('status')).toHaveAttribute('aria-busy', 'true');
    expect(screen.getByText("Giro dell'agente", { selector: 'p' })).toBeInTheDocument();
    expect(screen.getByText('Unità: 3 di 8')).toBeInTheDocument();
    expect(container.querySelector('.heu-progress-orbit')).not.toBeNull();
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '3');
  });
});

describe('TopProgress', () => {
  afterEach(() => vi.useRealTimers());
  it('compare solo dopo il ritardo e sparisce alla fine', () => {
    vi.useFakeTimers();
    const { rerender } = render(<TopProgress active delayMs={250} />);
    expect(screen.queryByRole('progressbar')).toBeNull();
    act(() => vi.advanceTimersByTime(260));
    expect(screen.getByRole('progressbar', { name: 'Lavoro in corso' })).toBeInTheDocument();
    rerender(<TopProgress active={false} delayMs={250} />);
    expect(screen.queryByRole('progressbar')).toBeNull();
  });
});

describe('segnale di fine', () => {
  it('acceso per impostazione predefinita, si spegne e si riaccende', () => {
    localStorage.removeItem('heuresys-segnale-fine');
    expect(isEndSignalEnabled()).toBe(true);
    setEndSignalEnabled(false);
    expect(isEndSignalEnabled()).toBe(false);
    setEndSignalEnabled(true);
    expect(isEndSignalEnabled()).toBe(true);
  });
  it('spento non suona', async () => {
    setEndSignalEnabled(false);
    expect(await playEndSignal()).toBe(false);
    setEndSignalEnabled(true);
  });
  it('senza Web Audio non suona e non lancia', async () => {
    setEndSignalEnabled(true);
    expect(await playEndSignal()).toBe(false);
  });
});
