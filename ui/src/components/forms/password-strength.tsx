'use client';

import * as React from 'react';
import zxcvbn from 'zxcvbn';
import { cn } from '../../lib/cn';

/**
 * PasswordStrengthMeter — uses zxcvbn for entropy scoring (0-4).
 * Shows visual bars + feedback suggestions.
 * (TIER 6)
 */
export function PasswordStrengthMeter({
  password,
  userInputs = [],
  className,
}: {
  password: string;
  userInputs?: string[];
  className?: string;
}) {
  const result = React.useMemo(() => {
    if (!password) return null;
    return zxcvbn(password, userInputs);
  }, [password, userInputs]);

  const score = result?.score ?? 0;
  const labels = ['Too weak', 'Weak', 'Fair', 'Good', 'Strong'];
  /**
   * Le barre e l'etichetta hanno bisogno di due colori diversi.
   *
   * Le barre sono decorative (`aria-hidden`) e possono restare vivide. La
   * scritta accanto no: con la stessa tinta piena il rosso dava 4,26 su fondo
   * chiaro e 4,30 su quello scuro, sotto la soglia AA in entrambi i temi.
   * Percio' l'etichetta usa la rampa `-ink`, che e' esattamente il gradino
   * costruito per il testo di un tono, e cambia col tema da sola.
   *
   * Prima era un solo elenco di `oklch()` scritti a mano, che duplicava i
   * token invece di usarli: il primo valore era il rosso vecchio, e la
   * correzione dei colori del 2026-09-06 non lo avrebbe mai raggiunto.
   */
  const barColors = [
    'var(--color-destructive)',
    'oklch(0.7 0.2 40)',
    'var(--color-warning)',
    'var(--color-success)',
    'var(--color-success)',
  ];
  const labelClasses = [
    'text-danger-ink',
    'text-warning-ink',
    'text-warning-ink',
    'text-success-ink',
    'text-success-ink',
  ];

  if (!password) return null;

  return (
    <div className={cn('flex flex-col gap-1', className)} aria-live="polite">
      <div className="flex gap-1">
        {[0, 1, 2, 3, 4].map((i) => (
          <span
            key={i}
            aria-hidden="true"
            className="h-1 flex-1 rounded-full transition-colors"
            style={{
              background: i <= score ? barColors[score] : 'var(--color-input)',
            }}
          />
        ))}
      </div>
      <div className="flex justify-between text-xs">
        <span className={cn('font-medium', labelClasses[score])}>
          {labels[score]}
        </span>
        {result?.feedback.warning ? (
          <span className="text-muted-fg">{result.feedback.warning}</span>
        ) : null}
      </div>
      {result?.feedback.suggestions.length ? (
        <ul className="text-xs text-muted-fg">
          {result.feedback.suggestions.map((s, i) => (
            <li key={i}>{s}</li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
