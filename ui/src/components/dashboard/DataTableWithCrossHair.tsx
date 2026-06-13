"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { attachCrossHair } from "../../lib/table-cursor";

/**
 * Data table with optional cross-hair affordance.
 * Spec: docs/13_best_practices_for_modern_saas_ui.md § "Table cross-hair pattern".
 *
 * When enableCrossHair=true, attaches mouseenter/leave handlers on every
 * <th> and <td> to highlight column + cell intersection. Row hover is
 * handled by global CSS rule on tbody tr:hover.
 *
 * For tables in @heuresys/ui consider data-table.tsx (TanStack) instead;
 * this component is for the brand bundle showcase / raw HTML scenarios.
 */

export type DataTableWithCrossHairProps = Readonly<{
  caption?: ReactNode;
  enableCrossHair?: boolean;
  children: ReactNode;
  className?: string;
}>;

export function DataTableWithCrossHair({
  caption,
  enableCrossHair = true,
  children,
  className,
}: DataTableWithCrossHairProps) {
  const tableRef = useRef<HTMLTableElement>(null);

  useEffect(() => {
    if (!enableCrossHair || !tableRef.current) return;
    const unbind = attachCrossHair(tableRef.current);
    return unbind;
  }, [enableCrossHair]);

  // a11y (D-27): the horizontally-scrollable wrapper must be keyboard-focusable
  // with an accessible name, or axe `scrollable-region-focusable` (serious) fires
  // whenever the table overflows (e.g. a 5-column table on a Pixel 7 / 412px viewport).
  // tabIndex=0 makes it reachable; role=region + aria-label name the landmark
  // (reusing the caption when it is a plain string, else a generic fallback).
  const regionLabel = typeof caption === "string" && caption.trim() ? caption : "Data table";
  return (
    <div className="overflow-x-auto" tabIndex={0} role="region" aria-label={regionLabel}>
      <table ref={tableRef} className={`w-full text-sm ${className ?? ""}`.trim()}>
        {caption && <caption className="sr-only">{caption}</caption>}
        {children}
      </table>
    </div>
  );
}
