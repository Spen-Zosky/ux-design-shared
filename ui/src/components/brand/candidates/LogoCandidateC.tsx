import type { SVGProps } from "react";

/**
 * UXIX-0007 candidate C — Triangle constellation mark.
 *
 * Circle scaffold + three nodes forming a triangle. People / role / capability
 * triangulation. Lightest of the three, more editorial, leans into "workforce
 * intelligence" positioning.
 *
 * Wordmark: 300 (light), letter-spacing +1, all-lowercase.
 *
 * Raw SVG source: `@heuresys/ui/assets/brand/candidates/UXIX-0007-logo/heuresys-logo-C-{symbol,full}.svg`.
 */

export function LogoCandidateCSymbol(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 48 48"
      role="img"
      aria-label="Heuresys candidate C — triangle constellation mark"
      {...props}
    >
      <title>Heuresys candidate C — triangle constellation mark</title>
      <circle cx="24" cy="24" r="20" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.4" />
      <circle cx="24" cy="12" r="4" fill="currentColor" />
      <circle cx="13" cy="32" r="4" fill="currentColor" />
      <circle cx="35" cy="32" r="4" fill="currentColor" />
      <line x1="24" y1="12" x2="13" y2="32" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line x1="24" y1="12" x2="35" y2="32" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line x1="13" y1="32" x2="35" y2="32" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function LogoCandidateCFull(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 220 48"
      role="img"
      aria-label="Heuresys candidate C — triangle constellation + wordmark"
      {...props}
    >
      <title>Heuresys candidate C — triangle constellation + wordmark</title>
      <g>
        <circle cx="24" cy="24" r="20" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.4" />
        <circle cx="24" cy="12" r="4" fill="currentColor" />
        <circle cx="13" cy="32" r="4" fill="currentColor" />
        <circle cx="35" cy="32" r="4" fill="currentColor" />
        <line x1="24" y1="12" x2="13" y2="32" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <line x1="24" y1="12" x2="35" y2="32" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <line x1="13" y1="32" x2="35" y2="32" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </g>
      <text
        x="56"
        y="32"
        fontFamily="system-ui, -apple-system, 'Segoe UI', sans-serif"
        fontSize="22"
        fontWeight="300"
        letterSpacing="1"
        fill="currentColor"
      >
        heuresys
      </text>
    </svg>
  );
}
