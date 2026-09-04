import type { ReactNode } from "react";

/**
 * StatusPill — canonical token-driven status badge ("Status / health indicator").
 * Semantic tones map to design tokens so palette/theme switches re-skin automatically.
 * Promoted into @heuresys/ui from the heuresys-advanced apps (QW-E5 de-dup): it was an
 * identical copy in apps/web + apps/showcase. The tone type is exported as `StatusPillTone`
 * to avoid colliding with the `StatusTone` already exported by StatusIcon.
 */
export type StatusPillTone = "success" | "warning" | "danger" | "info" | "neutral";

// AA-compliant, token-driven translucent chips. Status tones are SEMANTIC (fixed), not
// palette-driven — the PaletteDropdown reskins only --palette-1..4.
// IMPORTANT: do NOT use Tailwind `dark:` variants here — consumers toggle dark mode via the
// `.dark` CLASS (ThemeProvider + CSS-var tokens), but Tailwind 4's default `dark:` variant is
// `@media (prefers-color-scheme: dark)` (NOT class-based), so `dark:` utilities fire off the OS
// scheme regardless of the app theme and break the other theme (heuresys S952: a `dark:`-based
// fix rendered light-green text on near-white in light mode → ratio 1.22). That incident is why
// text color here is never the semantic token directly: bg-X/10 (a 10%-tint chip over --card)
// needs more contrast than the full token provides on light mode's white card (e.g. success
// #16A34A over the composite bg measures 2.95:1, well under the 4.5:1 AA floor for text this
// small). Each tone therefore has a dedicated "-ink" token — the -800 step of the same hue in
// light, and the already-AA semantic value in dark (see theme-heuresys.css) — verified >=4.5:1
// in both themes with .superpowers/sdd/2026-09-03-architectural-decisions-components/verify-contrast.mjs.
const TONE_CLASS: Record<StatusPillTone, string> = {
  success: "border-success/30 bg-success/10 text-success-ink",
  warning: "border-warning/30 bg-warning/10 text-warning-ink",
  danger: "border-danger/30 bg-danger/10 text-danger-ink",
  info: "border-info/30 bg-info/10 text-info-ink",
  neutral: "border-border bg-muted text-muted-foreground",
};

/** Heuristic mapping of common backend status/severity strings → a tone. */
export function statusTone(value: string | null | undefined): StatusPillTone {
  const v = (value ?? "").toUpperCase();
  if (["ACTIVE", "FILLED", "APPROVED", "COMPLETED", "DONE", "SUCCESS", "PUBLISHED", "ENABLED", "RESOLVED", "PASSED"].includes(v)) return "success";
  if (["OPEN", "PENDING", "PROPOSED", "DRAFT", "IN_PROGRESS", "RUNNING", "QUEUED", "SCHEDULED", "INFO"].includes(v)) return "info";
  if (["AT_RISK", "AT RISK", "WARNING", "HIGH", "MEDIUM", "REVIEW", "PARTIAL", "DEGRADED", "STALE"].includes(v)) return "warning";
  if (["INACTIVE", "SUSPENDED", "CRITICAL", "FAILED", "ERROR", "REJECTED", "BLOCKED", "EXPIRED", "REVOKED"].includes(v)) return "danger";
  return "neutral";
}

export function StatusPill({
  tone,
  children,
  className = "",
}: {
  tone: StatusPillTone;
  children: ReactNode;
  className?: string;
}) {
  return (
    <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide ${TONE_CLASS[tone]} ${className}`}>
      {children}
    </span>
  );
}

/** Convenience: render a status string as a toned pill. */
export function StatusBadge({ value, className }: { value: string | null | undefined; className?: string }) {
  if (!value) return <span className="text-muted-foreground">—</span>;
  return <StatusPill tone={statusTone(value)} className={className}>{value}</StatusPill>;
}
