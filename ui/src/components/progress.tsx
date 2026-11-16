import * as React from 'react';
import { cn } from '../lib/cn';

/**
 * Attese che bloccano: la barra di avanzamento, il riquadro «lavoro in corso» e la barra in cima
 * alla pagina (regola di piattaforma di Enzo del 2026-11-16: ogni lavoro in corso che blocca fino
 * alla sua conclusione mostra un'animazione evidente e, quando l'avanzamento si può misurare, una
 * barra di avanzamento moderna).
 *
 * Le animazioni stanno in `styles/globals.css` (classi `heu-progress-*`), così non dipendono dalla
 * scansione delle classi del consumer. Con `prefers-reduced-motion: reduce` la barra indeterminata
 * diventa una striscia ferma a righe e il testo resta: l'attesa si vede anche senza movimento.
 */

export interface ProgressBarProps {
  /** Valore raggiunto; se manca la barra è indeterminata. */
  value?: number | null;
  /** Valore che vuol dire «finito». */
  max?: number;
  /** Nome accessibile e testo sopra la barra. */
  label?: string;
  /** Mostra la percentuale a destra dell'etichetta (solo se determinata). */
  showValue?: boolean;
  /** L'etichetta resta come nome accessibile ma non si vede (quando il titolo è già scritto sopra). */
  hideLabel?: boolean;
  size?: 'sm' | 'md' | 'lg';
  tone?: 'primary' | 'success' | 'warning' | 'danger';
  className?: string;
}

const altezza = { sm: 'h-1', md: 'h-2', lg: 'h-3' } as const;

export function ProgressBar({
  value,
  max = 100,
  label,
  showValue = true,
  hideLabel = false,
  size = 'md',
  tone = 'primary',
  className,
}: ProgressBarProps) {
  const determinata = typeof value === 'number' && Number.isFinite(value) && max > 0;
  const pct = determinata ? Math.max(0, Math.min(100, (value / max) * 100)) : null;
  return (
    <div className={cn('w-full', className)}>
      {label || (showValue && pct !== null) ? (
        <div className="mb-1 flex items-baseline justify-between gap-3 text-sm">
          {label ? <span className={hideLabel ? 'sr-only' : 'text-foreground'}>{label}</span> : <span />}
          {showValue && pct !== null ? (
            <span className="tabular-nums text-muted-fg">{Math.round(pct)}%</span>
          ) : null}
        </div>
      ) : null}
      <div
        role="progressbar"
        aria-label={label}
        aria-valuemin={determinata ? 0 : undefined}
        aria-valuemax={determinata ? max : undefined}
        aria-valuenow={determinata ? value : undefined}
        aria-busy={pct === null || pct < 100 ? true : undefined}
        data-tone={tone}
        className={cn('heu-progress-track relative w-full overflow-hidden rounded-full', altezza[size])}
      >
        {pct !== null ? (
          <div className="heu-progress-fill h-full rounded-full" style={{ width: `${pct}%` }} />
        ) : (
          <div className="heu-progress-indeterminate h-full rounded-full" />
        )}
      </div>
    </div>
  );
}

export interface WorkInProgressProps {
  /** Che cosa sta succedendo, in una riga: «Giro dell'agente sulle unità». */
  title: string;
  /** Dettaglio facoltativo: il passo in corso, il tempo stimato, che cosa succede alla fine. */
  detail?: React.ReactNode;
  /** Avanzamento misurabile; se manca il riquadro mostra solo l'animazione. */
  value?: number | null;
  max?: number;
  /** `block` occupa il suo posto nella pagina; `overlay` copre il contenitore (che deve essere `relative`). */
  variant?: 'block' | 'overlay';
  className?: string;
  children?: React.ReactNode;
}

/** Il riquadro di un lavoro che blocca: animazione evidente, titolo, dettaglio e, se c'è, la barra. */
export function WorkInProgress({
  title,
  detail,
  value,
  max = 100,
  variant = 'block',
  className,
  children,
}: WorkInProgressProps) {
  const riquadro = (
    <div
      role="status"
      aria-live="polite"
      aria-busy="true"
      className={cn(
        'flex w-full max-w-md flex-col items-center gap-4 rounded-xl border border-border bg-card p-6 text-center shadow-lg',
        variant === 'block' && 'mx-auto',
        className,
      )}
    >
      <span className="heu-progress-orbit" aria-hidden="true">
        <span />
        <span />
        <span />
      </span>
      <div className="space-y-1">
        <p className="text-base font-medium text-foreground">{title}</p>
        {detail ? <div className="text-sm text-muted-fg">{detail}</div> : null}
      </div>
      <ProgressBar value={value ?? null} max={max} label={title} hideLabel showValue />
      {children}
    </div>
  );
  if (variant === 'overlay') {
    return (
      <div className="absolute inset-0 z-40 flex items-center justify-center bg-background/70 p-4 backdrop-blur-sm">
        {riquadro}
      </div>
    );
  }
  return riquadro;
}

export interface TopProgressProps {
  /** Vero mentre c'è almeno un lavoro che blocca. */
  active: boolean;
  /** Millisecondi prima di mostrarsi, perché un'attesa brevissima non lampeggi. */
  delayMs?: number;
  /** Nome accessibile. */
  label?: string;
  className?: string;
}

/** La barra sottile in cima alla pagina, indeterminata, per ogni attesa che blocca. */
export function TopProgress({ active, delayMs = 250, label = 'Lavoro in corso', className }: TopProgressProps) {
  const [visibile, setVisibile] = React.useState(false);
  React.useEffect(() => {
    if (!active) {
      setVisibile(false);
      return;
    }
    const t = setTimeout(() => setVisibile(true), delayMs);
    return () => clearTimeout(t);
  }, [active, delayMs]);
  if (!visibile) return null;
  return (
    <div
      role="progressbar"
      aria-label={label}
      aria-busy="true"
      className={cn('heu-progress-top fixed inset-x-0 top-0 z-[100] h-1 overflow-hidden', className)}
    >
      <div className="heu-progress-indeterminate h-full" />
    </div>
  );
}
