# ADR-0003 — Footer composition

## Decision ID

UXIX-0003

## Status

Accepted

## Date

2026-05-20

## Decider

Joint (Product Owner Enzo + Development). Ratifies de-facto state — `DashboardFooter` primitive in `@heuresys/ui`, in production since S924.

## Context

The bundle `docs/08_footer_specification.md` defines the persistent 44px footer with two areas:

- **Left area (immutable)**: `© year` + `heuresys.com` link + 5 social icons (LinkedIn / GitHub / Discord / Facebook / X) icon-only with `aria-label` + `target="_blank"` + `rel="noopener noreferrer"`.
- **Right area (context-specific)**: build info, environment, tenant, last-refresh chips — varies per surface, slot-driven.

The S924 implementation initially shipped 4 social icons; this ADR ratifies the post-Tier-3 canonical = 5 icons (Discord added in `DEFAULT_SOCIALS` of `DashboardFooter.tsx`).

## Decision

Adopt the `DashboardFooter` from `@heuresys/ui` as canonical implementation.

Concrete:

```tsx
<DashboardFooter
  rightSlot={<>...</>}                            // optional context strip
  socials={[...]}                                  // override DEFAULT_SOCIALS
  websiteHref="https://www.heuresys.com"
/>
```

5 default socials (in canonical order, all rendering icon-only with bundle-mandated aria attributes):

1. LinkedIn
2. GitHub
3. Discord
4. Facebook
5. X (Twitter)

## Rationale

- In-production primitive consumed by 6+ surfaces (system-health canonical + 3 /showcase/footer variants + /showcase/shell + /showcase/sidebar + /showcase/primary-initial-page).
- 5-icon set matches the social presence Heuresys plans to seed for brand v1.0 launch (LinkedIn = enterprise, GitHub = engineering hiring channel, Discord = community ops, Facebook = legacy reach, X = real-time announcements).
- `rightSlot` flexibility covers every observed use case: minimal (login/landing), tenant dashboard (env + version + tenant + refresh), system-health (build + runtime + pool + tunnel pulse).
- Footer height = 44px (per UXIX-0001 shell contract, accommodates 44×44 Apple minimum touch targets for social icons).

## Consequences

### Code

None. `DashboardFooter` in production.

### Tokens

Footer height = 44px. Token-driven via `--border`, `--background`, `--muted-foreground`.

### Tests

`/showcase/footer` page renders 3 rightSlot variants (Minimal / TenantDashboard / SystemHealth). Visual regression should pin the immutable left area + variant right slots.

### Process

Future `rightSlot` additions (e.g., live tunnel pulse-dot, build channel chip) extend the catalog but cannot replace the immutable left composition.

## Showcase reference

- `/showcase/footer` — 3 live variants (commit `a967ca0`).

## Impacted files/components/tokens

- `D:\ux-design-shared\ui\src\components\dashboard\DashboardFooter.tsx` (canonical).
- `DEFAULT_SOCIALS` constant in same file (5-icon canonical order).

## Supersedes / Superseded by

N/A.
