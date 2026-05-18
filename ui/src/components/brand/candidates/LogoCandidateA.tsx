import type { SVGProps } from "react";

/**
 * UXIX-0007 candidate A — Hex node mark.
 *
 * Hexagonal frame with internal 3-node constellation (skill / role / capability
 * triangulation). Reads as structured, geometric, enterprise-confident. Strong
 * at small symbol scale.
 *
 * Wordmark: 700 (bold), letter-spacing −0.5.
 *
 * Raw SVG source: `@heuresys/ui/assets/brand/candidates/UXIX-0007-logo/heuresys-logo-A-{symbol,full}.svg`.
 * Uses `currentColor` for stroke + fill so the consumer controls color via CSS.
 */

export function LogoCandidateASymbol(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 48 48"
      role="img"
      aria-label="Heuresys candidate A — hex node mark"
      {...props}
    >
      <title>Heuresys candidate A — hex node mark</title>
      <path
        d="M24 4 L41.32 14 V34 L24 44 L6.68 34 V14 Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <circle cx="16" cy="18" r="2.5" fill="currentColor" />
      <circle cx="32" cy="18" r="2.5" fill="currentColor" />
      <circle cx="24" cy="32" r="2.5" fill="currentColor" />
      <path
        d="M16 18 L24 32 L32 18 M16 18 L32 18"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function LogoCandidateAFull(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 220 48"
      role="img"
      aria-label="Heuresys candidate A — hex node + wordmark"
      {...props}
    >
      <title>Heuresys candidate A — hex node + wordmark</title>
      <g>
        <path
          d="M24 4 L41.32 14 V34 L24 44 L6.68 34 V14 Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinejoin="round"
        />
        <circle cx="16" cy="18" r="2.5" fill="currentColor" />
        <circle cx="32" cy="18" r="2.5" fill="currentColor" />
        <circle cx="24" cy="32" r="2.5" fill="currentColor" />
        <path
          d="M16 18 L24 32 L32 18 M16 18 L32 18"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </g>
      <text
        x="56"
        y="32"
        fontFamily="'Exo 2', system-ui, -apple-system, 'Segoe UI', sans-serif"
        fontSize="24"
        fontWeight="700"
        letterSpacing="-0.5"
        fill="currentColor"
      >
        Heuresys
      </text>
    </svg>
  );
}
