'use client';

import * as React from 'react';
import { cn } from '../lib/cn';

/**
 * StatusIcon — discriminated-tone wrapper for any lucide-react icon component.
 *
 * Maps a semantic `tone` to a token-driven foreground color
 * (`--muted-foreground`, `--info`, `--success`, `--warning`, `--danger`).
 * Use for status indicators, alerts, validation feedback. Per ADR-0008
 * (lucide outline) and ADR-0013 R2 (portability invariant).
 *
 * Source: ux-design/heuresys_uxix_brand_identity_bundle_v1/docs/10_graphic_assets_and_icon_system.md
 * § Status icon semantic tones.
 *
 * @example
 *   import { CheckCircle } from "lucide-react";
 *   <StatusIcon icon={CheckCircle} tone="success" />
 */

export type StatusTone =
  | 'neutral'
  | 'info'
  | 'success'
  | 'warning'
  | 'danger'
  | 'disabled';

const TONE_CLASS: Record<StatusTone, string> = {
  neutral: 'text-muted-foreground',
  info: 'text-info',
  success: 'text-success',
  warning: 'text-warning',
  danger: 'text-danger',
  disabled: 'text-muted-foreground/40',
};

export interface StatusIconProps {
  /** The lucide-react icon component to render (e.g. `CheckCircle`). */
  icon: React.ComponentType<{ className?: string; size?: number }>;
  /** Semantic tone. Default: "neutral". */
  tone?: StatusTone;
  /** Pixel size. Default: 20. */
  size?: number;
  className?: string;
}

export function StatusIcon({
  icon: Icon,
  tone = 'neutral',
  size = 20,
  className,
}: StatusIconProps) {
  return <Icon size={size} className={cn(TONE_CLASS[tone], className)} />;
}

export default StatusIcon;
