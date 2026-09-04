import type { ReactNode } from "react";
import { TONE } from "../../lib/tone-classes";

/**
 * Audit feed — ul divide-y of icon-wrapped events.
 * Spec: docs/16_system_health_admin_dashboard_patterns.md § 9.
 */

export type AuditTone = "success" | "warning" | "danger" | "info" | "palette-1" | "palette-2" | "palette-3";

export type AuditEvent = Readonly<{
  icon: ReactNode;
  tone: AuditTone;
  title: ReactNode;
  description?: ReactNode;
  meta?: ReactNode;        // mono line: timestamp · scope · actor
}>;

export type AuditFeedProps = Readonly<{
  events: ReadonlyArray<AuditEvent>;
  title?: string;
  subtitle?: string;
  onViewAll?: () => void;
}>;

export function AuditFeed({ events, title = "Audit feed",
                            subtitle = "RBAC changes · auth events · migrations · last 24h",
                            onViewAll }: AuditFeedProps) {
  return (
    <article className="rounded-card border border-border bg-card shadow-card lg:col-span-2">
      <div className="flex items-center justify-between border-b border-border px-5 py-3">
        <div>
          <h2 className="text-sm font-semibold text-foreground">{title}</h2>
          <p className="mt-0.5 text-xs text-muted-foreground">{subtitle}</p>
        </div>
        {onViewAll && (
          <button type="button" onClick={onViewAll} className="text-xs font-medium text-primary transition hover:underline">
            view all →
          </button>
        )}
      </div>
      {/* tabIndex+aria-label: the list is a scroll container, so it must be
          keyboard-reachable and named (axe scrollable-region-focusable, WCAG 2.1.1). */}
      <ul tabIndex={0} aria-label={title} className="max-h-[420px] divide-y divide-border/60 overflow-y-auto">
        {events.map((ev, i) => (
          <li key={i} className="px-5 py-3">
            <div className="flex items-start gap-3">
              {/* Pastiglia dell'icona: classi intere dal modulo dei toni, e
                  rampa ink perche' il segno grafico sta su una tinta dello
                  stesso tono (soglia 3:1, che il token pieno non regge per
                  success: 2,78:1 misurati). */}
              <span className={`mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${TONE[ev.tone].tint15} ${TONE[ev.tone].textOnTint}`}>
                {ev.icon}
              </span>
              <div className="min-w-0">
                <div className="text-sm text-foreground"><span className="font-medium">{ev.title}</span></div>
                {ev.description && <div className="mt-0.5 text-xs text-muted-foreground">{ev.description}</div>}
                {ev.meta && <div className="mt-1 flex items-center gap-2 font-mono text-[10px] text-muted-foreground">{ev.meta}</div>}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </article>
  );
}
