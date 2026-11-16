import * as React from 'react';
import { cn } from '../lib/cn';

export function Skeleton({
  className,
  label = 'Loading',
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  /** Nome accessibile dello stato di caricamento. Default "Loading". */
  label?: string;
}) {
  return (
    <div
      role="status"
      aria-label={label}
      className={cn('animate-pulse rounded-md bg-muted', className)}
      {...props}
    />
  );
}

export function Spinner({
  className,
  label = 'Loading',
}: {
  className?: string;
  /** Testo di caricamento letto dai lettori di schermo. Default "Loading". */
  label?: string;
}) {
  return (
    <div role="status" aria-label={label}>
      <svg
        className={cn('h-5 w-5 animate-spin text-muted-fg', className)}
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeOpacity="0.25" strokeWidth="4" />
        <path
          d="M22 12a10 10 0 0 1-10 10"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
        />
      </svg>
      <span className="sr-only">{label}</span>
    </div>
  );
}
