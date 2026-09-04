"use client";

import type { ReactNode } from "react";

/**
 * Persistent alert banner with CTAs.
 * Spec: docs/13_best_practices_for_modern_saas_ui.md § "Alert banners".
 *
 * Variants: warning (default) / danger / info / success.
 * Always includes ≥1 CTA; dismiss is optional.
 */

export type AlertVariant = "warning" | "danger" | "info" | "success";

/**
 * Classi per variante, scritte per intero.
 *
 * Due correzioni rispetto alla versione precedente (2026-09-04):
 *
 * - `action` e' nuovo. Il bottone primario componeva le proprie classi a
 *   runtime — `border-${variant}/40 bg-${variant}/10 text-${variant}` — e
 *   Tailwind, che genera le utility scandendo il testo dei sorgenti, non ne
 *   produceva nessuna: il bottone restava senza bordo e senza fondo.
 * - `iconColor` passa dal token pieno alla rampa ink. L'icona siede su una
 *   tinta al 15% dello stesso tono, e li' il token pieno misura 2,78:1 per
 *   `success` — sotto la soglia di 3:1 che WCAG chiede agli elementi grafici.
 *   L'ink porta tutte e quattro le varianti sopra 5,7:1.
 */
const VARIANT_STYLES: Record<
  AlertVariant,
  { border: string; bg: string; iconBg: string; iconColor: string; action: string }
> = {
  warning: { border: "border-l-warning border-y-warning/30 border-r-warning/30", bg: "bg-warning/5",
             iconBg: "bg-warning/15", iconColor: "text-warning-ink",
             action: "border-warning/40 bg-warning/10 text-warning-ink hover:bg-warning/20" },
  danger:  { border: "border-l-danger border-y-danger/30 border-r-danger/30",   bg: "bg-danger/5",
             iconBg: "bg-danger/15",  iconColor: "text-danger-ink",
             action: "border-danger/40 bg-danger/10 text-danger-ink hover:bg-danger/20" },
  info:    { border: "border-l-info border-y-info/30 border-r-info/30",         bg: "bg-info/5",
             iconBg: "bg-info/15",    iconColor: "text-info-ink",
             action: "border-info/40 bg-info/10 text-info-ink hover:bg-info/20" },
  success: { border: "border-l-success border-y-success/30 border-r-success/30",bg: "bg-success/5",
             iconBg: "bg-success/15", iconColor: "text-success-ink",
             action: "border-success/40 bg-success/10 text-success-ink hover:bg-success/20" },
};

export type AlertAction = Readonly<{
  label: string;
  onClick: () => void;
  variant?: "primary" | "ghost";
}>;

export type AlertBannerProps = Readonly<{
  variant?: AlertVariant;
  icon?: ReactNode;
  title: ReactNode;
  meta?: ReactNode;
  details?: ReactNode;
  actions?: ReadonlyArray<AlertAction>;
  onDismiss?: () => void;
}>;

export function AlertBanner({ variant = "warning", icon, title, meta, details, actions, onDismiss }: AlertBannerProps) {
  const s = VARIANT_STYLES[variant];
  return (
    <div role="alert" aria-live="polite"
         className={`flex items-start gap-3 rounded-card border-l-4 border-y border-r ${s.border} ${s.bg} px-4 py-3 shadow-card`}>
      <span className={`mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${s.iconBg} ${s.iconColor}`}>
        {icon ?? (
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
            <line x1="12" y1="9" x2="12" y2="13" />
            <line x1="12" y1="17" x2="12.01" y2="17" />
          </svg>
        )}
      </span>
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <span className="text-sm font-semibold text-foreground">{title}</span>
          {meta}
        </div>
        {details && <div className="mt-1 flex items-center gap-2 font-mono text-[10px] text-muted-foreground">{details}</div>}
      </div>
      {(actions || onDismiss) && (
        <div className="flex shrink-0 items-center gap-2">
          {actions?.map((a, i) => (
            <button key={i} type="button" onClick={a.onClick}
                    className={a.variant === "primary"
                      ? `inline-flex h-8 items-center gap-1.5 rounded-control border px-3 text-xs font-medium transition ${s.action}`
                      : "inline-flex h-8 items-center gap-1.5 rounded-control border border-border bg-card px-3 text-xs font-medium text-muted-foreground transition hover:bg-accent hover:text-foreground hover:border-foreground/30"}>
              {a.label}
            </button>
          ))}
          {onDismiss && (
            <button type="button" aria-label="Chiudi banner" onClick={onDismiss}
                    className="inline-flex h-8 w-8 items-center justify-center rounded-control text-muted-foreground transition hover:bg-accent hover:text-foreground">
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          )}
        </div>
      )}
    </div>
  );
}
