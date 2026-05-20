'use client';

import * as React from 'react';
import { cn } from '../../lib/cn';

/**
 * TimeRangeSelector — controlled pill row for dashboard time-range selection.
 *
 * Renders an inline radiogroup of options (default 15m / 1h / 24h / 7d / 30d).
 * Active option uses `--accent` background; inactive uses `--muted-foreground`
 * with hover transition. Token-driven so palette/theme switches propagate.
 *
 * Source: extracted from apps/web/src/components/SystemHealthDashboard.tsx
 * (lines 180-186 of pre-promotion commit) per ADR-0013 R2.
 *
 * @example
 *   const [range, setRange] = useState("24h");
 *   <TimeRangeSelector value={range} onChange={setRange} />
 */

export interface TimeRangeOption {
  value: string;
  label: string;
}

export interface TimeRangeSelectorProps {
  /** Available options. Default: 15m / 1h / 24h / 7d / 30d. */
  options?: TimeRangeOption[];
  /** Currently selected option value. */
  value: string;
  /** Called when user picks an option. */
  onChange?: (value: string) => void;
  className?: string;
  /** Accessible label for the radiogroup. */
  ariaLabel?: string;
}

const DEFAULT_OPTIONS: TimeRangeOption[] = [
  { value: '15m', label: '15m' },
  { value: '1h', label: '1h' },
  { value: '24h', label: '24h' },
  { value: '7d', label: '7d' },
  { value: '30d', label: '30d' },
];

export function TimeRangeSelector({
  options = DEFAULT_OPTIONS,
  value,
  onChange,
  className,
  ariaLabel = 'Time range',
}: TimeRangeSelectorProps) {
  return (
    <div
      role="radiogroup"
      aria-label={ariaLabel}
      className={cn(
        'inline-flex items-center rounded-control border border-border bg-card p-0.5',
        className,
      )}
    >
      {options.map((opt) => {
        const active = opt.value === value;
        return (
          <button
            key={opt.value}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => onChange?.(opt.value)}
            className={cn(
              'rounded-md px-3 py-1.5 text-xs font-medium transition',
              active
                ? 'bg-accent text-foreground'
                : 'text-muted-foreground hover:text-foreground',
            )}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}

export default TimeRangeSelector;
