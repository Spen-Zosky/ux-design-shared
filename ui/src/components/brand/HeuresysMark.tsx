'use client';

import * as React from 'react';
import { cn } from '../../lib/cn';

/**
 * HeuresysMark — the symbol-only variant of the Heuresys wordmark.
 *
 * Renders just the lowercase "y" in `var(--accent)` (purple) at a square aspect
 * ratio. Used for: favicon source, collapsed sidebar, loading spinner center,
 * app icon. See `wordmark.tsx` for the full wordmark.
 *
 * Spec: docs/10_graphic_assets_and_icon_system.md § Default brand logo.
 */

export interface HeuresysMarkProps extends React.SVGAttributes<SVGSVGElement> {
  size?: number;
  /** Override the "y" color. Defaults to `var(--accent)`. */
  color?: string;
}

export function HeuresysMark({
  size = 32,
  color = 'var(--accent)',
  className,
  ...rest
}: HeuresysMarkProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
      width={size}
      height={size}
      role="img"
      aria-label="Heuresys mark"
      className={cn(className)}
      {...rest}
    >
      <defs>
        <style>
          {`.hm-y{font-family:'Exo 2',Inter,system-ui,sans-serif;font-weight:700;font-size:32px;letter-spacing:0;fill:${color};}`}
        </style>
      </defs>
      <text x="16" y="26" textAnchor="middle" className="hm-y">y</text>
    </svg>
  );
}

export default HeuresysMark;
