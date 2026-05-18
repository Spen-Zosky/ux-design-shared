import type { SVGProps } from "react";

/**
 * UXIX-0007 candidate B — H ladder mark.
 *
 * Rounded square + custom H letterform with internal rungs implying skill-
 * progression. Direct semantic tie (H = Heuresys = HRMS) and ladder = career
 * path / learning steps.
 *
 * Wordmark: 500 (medium).
 *
 * Raw SVG source: `@heuresys/ui/assets/brand/candidates/UXIX-0007-logo/heuresys-logo-B-{symbol,full}.svg`.
 */

export function LogoCandidateBSymbol(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 48 48"
      role="img"
      aria-label="Heuresys candidate B — H ladder mark"
      {...props}
    >
      <title>Heuresys candidate B — H ladder mark</title>
      <rect x="6" y="6" width="36" height="36" rx="8" fill="none" stroke="currentColor" strokeWidth="3" />
      <line x1="16" y1="14" x2="16" y2="34" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <line x1="32" y1="14" x2="32" y2="34" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <line x1="16" y1="19" x2="32" y2="19" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="16" y1="24" x2="32" y2="24" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="16" y1="29" x2="32" y2="29" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

export function LogoCandidateBFull(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 220 48"
      role="img"
      aria-label="Heuresys candidate B — H ladder + wordmark"
      {...props}
    >
      <title>Heuresys candidate B — H ladder + wordmark</title>
      <g>
        <rect x="6" y="6" width="36" height="36" rx="8" fill="none" stroke="currentColor" strokeWidth="3" />
        <line x1="16" y1="14" x2="16" y2="34" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        <line x1="32" y1="14" x2="32" y2="34" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        <line x1="16" y1="19" x2="32" y2="19" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="16" y1="24" x2="32" y2="24" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="16" y1="29" x2="32" y2="29" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      </g>
      <text
        x="56"
        y="32"
        fontFamily="system-ui, -apple-system, 'Segoe UI', sans-serif"
        fontSize="24"
        fontWeight="500"
        fill="currentColor"
      >
        Heuresys
      </text>
    </svg>
  );
}
