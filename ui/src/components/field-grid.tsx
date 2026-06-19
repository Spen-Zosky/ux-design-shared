import type { ReactNode } from "react";

/**
 * FieldGrid — canonical detail-page field list ("Detail panel" → Card composition + PageHeader).
 * Renders a token-styled definition grid for detail pages. Composition primitive consumed by
 * detail pages. Promoted into @heuresys/ui from the heuresys-advanced apps (QW de-dup follow-up
 * to QW-E5): it was an identical copy in apps/web + apps/showcase. Pure render (no hooks/handlers)
 * → no "use client" needed, server-component compatible.
 */
export interface DetailField {
  label: string;
  value: ReactNode;
  /** Render the value monospace (ids, codes). */
  mono?: boolean;
  /** testid attached to the value cell. */
  testId?: string;
}

export function FieldGrid({
  fields,
  testId,
  className = "",
}: {
  fields: DetailField[];
  testId?: string;
  className?: string;
}) {
  return (
    <dl data-testid={testId} className={`grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2 ${className}`}>
      {fields.map((f, i) => (
        <div key={i} className="flex flex-col gap-0.5">
          <dt className="text-[11px] uppercase tracking-wide text-muted-foreground">{f.label}</dt>
          <dd data-testid={f.testId} className={f.mono ? "break-all font-mono text-xs text-foreground" : "text-sm text-foreground"}>
            {f.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}
