'use client';

import * as React from 'react';
import type { ReactNode } from 'react';
import { cn } from '../../lib/cn';

/**
 * DashboardFooter — universal footer rule.
 * Spec: docs/08_footer_specification.md.
 *
 * Left area is FIXED across every Heuresys surface: © year · heuresys.com ·
 * 5 outlined social icons in canonical order (LinkedIn → GitHub → Discord →
 * Facebook → X).
 *
 * Right area is context-specific: build info on system-health, env on tenant
 * dashboards, empty on login/landing. Pass via `rightSlot`.
 */

export interface SocialLink {
  id: 'linkedin' | 'github' | 'discord' | 'facebook' | 'x';
  href: string;
  label: string;
}

export interface DashboardFooterProps {
  rightSlot?: ReactNode;
  /** Override the canonical 5 socials. Order is preserved. */
  socials?: ReadonlyArray<SocialLink>;
  websiteHref?: string;       // default https://www.heuresys.com
  className?: string;
}

const DEFAULT_SOCIALS: ReadonlyArray<SocialLink> = [
  { id: 'linkedin', href: '#', label: 'Open Heuresys on LinkedIn' },
  { id: 'github',   href: '#', label: 'Open Heuresys on GitHub' },
  { id: 'discord',  href: '#', label: 'Join Heuresys on Discord' },
  { id: 'facebook', href: '#', label: 'Open Heuresys on Facebook' },
  { id: 'x',        href: '#', label: 'Open Heuresys on X (Twitter)' },
];

export function DashboardFooter({
  rightSlot,
  socials = DEFAULT_SOCIALS,
  websiteHref = 'https://www.heuresys.com',
  className,
}: DashboardFooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      role="contentinfo"
      className={cn(
        'z-30 flex h-11 items-center justify-between border-t border-border bg-background px-4 text-xs text-muted-foreground',
        className
      )}
    >
      <div className="flex items-center gap-3">
        <span className="tabular-nums">© {currentYear}</span>
        <span aria-hidden="true" className="text-border">·</span>
        <a
          href={websiteHref}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Open Heuresys public website"
          className="font-medium text-muted-foreground transition hover:text-foreground hover:underline"
        >
          heuresys.com
        </a>
        <span aria-hidden="true" className="text-border">·</span>
        <div className="flex items-center gap-0.5">
          {socials.map((s) => (
            <SocialAnchor key={s.id} link={s} />
          ))}
        </div>
      </div>

      {rightSlot && (
        <div className="hidden items-center gap-3 font-mono text-[10px] md:flex">
          {rightSlot}
        </div>
      )}
    </footer>
  );
}

function SocialAnchor({ link }: { link: SocialLink }) {
  return (
    <a
      href={link.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={link.label}
      className="inline-flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground transition hover:bg-accent hover:text-foreground"
    >
      {renderIcon(link.id)}
    </a>
  );
}

function renderIcon(id: SocialLink['id']) {
  switch (id) {
    case 'linkedin':
      return (
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
          <rect x="2" y="9" width="4" height="12" />
          <circle cx="4" cy="4" r="2" />
        </svg>
      );
    case 'github':
      return (
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
        </svg>
      );
    case 'discord':
      return (
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M19.27 5.33A16.5 16.5 0 0 0 15 4l-.5 1.05a14.5 14.5 0 0 0-5 0L9 4a16.5 16.5 0 0 0-4.27 1.33C2.13 9.21 1.6 13.04 1.92 16.81c1.86 1.4 3.66 2.24 5.42 2.79c.4-.55.77-1.13 1.07-1.73a10.5 10.5 0 0 1-1.65-.78c.14-.1.27-.2.4-.3a11.6 11.6 0 0 0 9.55 0c.13.1.26.2.4.3c-.53.31-1.08.57-1.65.79c.3.6.66 1.18 1.07 1.73c1.77-.55 3.57-1.4 5.43-2.79c.32-3.77-.21-7.6-2.81-11.48z" />
          <circle cx="8.5" cy="13" r="1.5" />
          <circle cx="15.5" cy="13" r="1.5" />
        </svg>
      );
    case 'facebook':
      return (
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
        </svg>
      );
    case 'x':
      return (
        <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M18.244 2H21.5l-7.11 8.13L22.75 22h-6.54l-5.12-6.69L5.23 22H1.97l7.6-8.69L1.55 2h6.7l4.63 6.12L18.244 2Zm-1.14 17.91h1.8L7.27 3.98H5.34l11.764 15.93Z" />
        </svg>
      );
  }
}

export default DashboardFooter;
