import type { SVGProps } from "react";

/**
 * UXIX-0007 candidate D — Y-accent wordmark (legacy port).
 *
 * Inherited from the evo.heuresys.com legacy brand identity:
 * `heuresys` lowercase wordmark in Exo 2 700, with the middle "y" rendered
 * in a contrast accent color while the rest is in the primary blue. The
 * standalone mark is the "y" letterform alone — typographic, not geometric.
 *
 * Two palette behaviours:
 * - Default (no className override): hardcoded legacy colors blue #3B82F6
 *   + purple #A855F7 — brand-direct, palette-independent.
 * - Adaptive: wrap with className that sets `color` for the body letters
 *   (currentColor) and `--logo-accent` CSS var for the "y" (e.g.
 *   `style={{ "--logo-accent": "var(--palette-2)" }} className="text-[var(--palette-1)]"`).
 *   This allows the logo to follow the active palette when theme switches.
 *
 * Legacy assets archived in `D:\ux-design-shared\ui\src\assets\brand\legacy\`.
 * Raw SVG twins in `../../assets/brand/candidates/UXIX-0007-logo/heuresys-logo-D-{symbol,full}.svg`.
 */

const LEGACY_BLUE = "#3B82F6";
const LEGACY_PURPLE = "#A855F7";

export function LogoCandidateDSymbol(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 48 48"
      role="img"
      aria-label="Heuresys candidate D — Y-accent mark"
      {...props}
    >
      <title>Heuresys candidate D — Y-accent mark (legacy port)</title>
      <text
        x="24"
        y="38"
        textAnchor="middle"
        fontFamily="'Exo 2', system-ui, -apple-system, 'Segoe UI', sans-serif"
        fontSize="44"
        fontWeight="700"
        letterSpacing="0"
        fill={`var(--logo-accent, ${LEGACY_PURPLE})`}
      >
        y
      </text>
    </svg>
  );
}

export function LogoCandidateDFull(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 220 48"
      role="img"
      aria-label="Heuresys candidate D — Y-accent wordmark"
      {...props}
    >
      <title>Heuresys candidate D — Y-accent wordmark (legacy port)</title>
      <text
        x="110"
        y="34"
        textAnchor="middle"
        fontFamily="'Exo 2', system-ui, -apple-system, 'Segoe UI', sans-serif"
        fontSize="34"
        fontWeight="700"
        letterSpacing="-0.5"
      >
        <tspan fill={`var(--logo-body, ${LEGACY_BLUE})`}>heures</tspan>
        <tspan fill={`var(--logo-accent, ${LEGACY_PURPLE})`}>y</tspan>
        <tspan fill={`var(--logo-body, ${LEGACY_BLUE})`}>s</tspan>
      </text>
    </svg>
  );
}
