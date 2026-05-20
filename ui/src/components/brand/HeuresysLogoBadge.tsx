'use client';

import * as React from 'react';
import { cn } from '../../lib/cn';

/**
 * HeuresysLogoBadge — the small uppercase suffix tag rendered next to the
 * Heuresys wordmark in product surfaces (e.g. "advanced", "beta", "enterprise").
 *
 * Bordered, uppercase, tracking-wider, `text-muted-foreground` so it stays
 * subordinate to the wordmark. Token-driven (`--border`, `--card`,
 * `--muted-foreground`) so palette/theme switches propagate.
 *
 * Source: extracted from apps/web/src/components/SystemHealthDashboard.tsx
 * per ADR-0013 R2.
 */

export interface HeuresysLogoBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
}

export function HeuresysLogoBadge({ children, className, ...rest }: HeuresysLogoBadgeProps) {
  return (
    <span
      className={cn(
        'rounded-md border border-border bg-card px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wider text-muted-foreground',
        className,
      )}
      {...rest}
    >
      {children}
    </span>
  );
}

export default HeuresysLogoBadge;
