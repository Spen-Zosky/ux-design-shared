# ADR-0002 — Header mandatory composition

## Decision ID

UXIX-0002

## Status

Accepted

## Date

2026-05-20

## Decider

Joint (Product Owner Enzo + Development). Ratifies de-facto state — the `DashboardHeader` primitive in `@heuresys/ui` has been the canonical implementation since S924 and is consumed by 6+ surfaces in production.

## Context

The bundle `docs/06_header_specification.md` defines the persistent 64px header with two clusters:

- **Left cluster**: hamburger (sidebar toggle) + Heuresys wordmark + optional breadcrumb.
- **Right cluster**: language switcher (IT/EN) + palette 4-box + theme toggle + user identity card.

Three composition options were considered:

| ID | Description | Status |
|----|-------------|--------|
| A | Bundle-mandated composition (chosen) | Accepted |
| B | Minimal header (logo + user only) | Rejected — loses language/palette/theme controls |
| C | Inverted layout (logo right, controls left) | Rejected — violates left-identity / right-personal pattern across SaaS UX |

## Decision

Adopt **Option A — bundle composition** as canonical, implemented by `DashboardHeader` from `@heuresys/ui` (`src/components/dashboard/DashboardHeader.tsx`).

Concrete slots:

```tsx
<DashboardHeader
  breadcrumb={[{ label, href? }, ...]}        // optional
  user={{ initials, username, role, roleTone }} // role pill
  language="IT" | "EN"
  onToggleLanguage={() => void}
  onOpenMenu={() => void}                     // hamburger
  onOpenCommandPalette={() => void}           // ⌘K
  logo={<HeuresysWordmark variant="brand" />}  // override default
  logoBadge={<HeuresysLogoBadge>advanced</HeuresysLogoBadge>}
/>
```

Default `PaletteDropdown` + theme toggle render in the right cluster automatically.

## Rationale

- The component is already shipped in `@heuresys/ui` (production-tested in 6 surfaces: system-health canonical + 3 /showcase/header variants + /showcase/shell + /showcase/sidebar + /showcase/primary-initial-page).
- Slot architecture (logo + logoBadge + leftExtras + rightExtras) is flexible enough for all observed brand v1 use cases without violating the bundle contract.
- Token-driven (uses `--background`, `--card`, `--border`, `--muted-foreground`, `--accent` via `@heuresys/ui` defaults) so palette + theme switches propagate.

## Consequences

### Code

None. `DashboardHeader` already in production.

### Tokens

Header height = 64px (per UXIX-0001 shell contract).

### Tests

`/showcase/header` page renders 3 variants (Standard / WithBreadcrumb / SUPERUSER warning) — visual regression on these 3 should pin the contract.

### Process

Future variants (mobile collapsed header, marketing public landing header) must extend not replace the primitive — see `apps/web/src/app/showcase/landing-page/page.tsx` for the public-landing variant pattern (no DashboardHeader, free composition).

## Showcase reference

- `/showcase/header` — 3 live variants (commit `910e946`).

## Impacted files/components/tokens

- `D:\ux-design-shared\ui\src\components\dashboard\DashboardHeader.tsx` (canonical).
- `D:\ux-design-shared\ui\src\components\wordmark.tsx` (logo slot default).
- `D:\ux-design-shared\ui\src\components\brand\HeuresysLogoBadge.tsx` (logoBadge slot).

## Supersedes / Superseded by

N/A.
