# ADR-0004 — Sidebar collapse + tree state

## Decision ID

UXIX-0004

## Status

Accepted

## Date

2026-05-20

## Decider

Joint (Product Owner Enzo + Development). Ratifies de-facto state — `DashboardSidebar` primitive in `@heuresys/ui`, in production since S924.

## Context

The bundle `docs/07_sidebar_specification.md` defines two independent state levels:

1. **`sidebarCollapsed`** (width-level): 260px expanded ↔ 72px collapsed. Persisted to `localStorage` key `heuresys-sidebar`. Mutates `<body data-sidebar="collapsed">` and `[data-shell="grid"]` inline `grid-template-columns` with `!important` (Chrome quirk workaround).
2. **`treeGroups[id].open`** (group-level): per-group expand/collapse. Persisted to `localStorage` key `heuresys-sidebar-groups` as `{ groupId: boolean }` map.

Active route highlighted with `bg-accent` + 2px inset shadow in `--primary`. Items can carry `aux` slot (badge / pulse-dot / count). Groups can host `customContent` (e.g., DBSupervisorSidebar in system-health canonical).

## Decision

Adopt `DashboardSidebar` from `@heuresys/ui` as canonical implementation.

Concrete:

```tsx
<DashboardSidebar
  groups={[
    {
      id: "workforce",
      label: "Workforce",
      defaultExpanded: true,        // optional, default true
      items: [
        {
          id: "skills",
          label: "Skills",
          href: "/skills",
          icon: <Layers className="h-4 w-4 shrink-0" />,  // lucide
          aux: <span className="...">badge or pulse</span>,
          active: true,
        },
        ...
      ],
    },
    {
      id: "database",
      label: "Database",
      customContent: <DBSupervisorSidebar />,
    },
  ]}
  footerSlot={<DefaultBuildInfoCard />}   // optional override
/>
```

Internal toggle button (in sidebar header) handles `sidebarCollapsed` state. Per-group toggles (one per group label) handle `treeGroups[id].open`. Both persist independently.

## Rationale

- In-production primitive consumed by 4 surfaces in showcase (system-health canonical + /showcase/shell + /showcase/sidebar + /showcase/primary-initial-page) + apps/web authenticated layout for business routes.
- The two-state separation is non-negotiable per bundle: collapsing the sidebar must NOT close groups, and closing a group must NOT collapse the sidebar.
- localStorage persistence is per-browser (not per-user) — matches the bundle's "ergonomic memory" guidance without server-side state.
- 6-pattern aux slot taxonomy (neutral count / warning chip / danger chip / volume hint / info pulse / success pulse) documented in `/showcase/sidebar` table — extensible without breaking the API.
- Token-driven appearance (`--sidebar`, `--sidebar-foreground`, `--border`, `--accent`, `--primary` for active inset shadow).

## Consequences

### Code

None. `DashboardSidebar` in production.

### Tokens

Sidebar widths: expanded `260px`, collapsed `72px` (UXIX-0001 shell contract). Active item shadow color: `var(--primary)`.

### Tests

`/showcase/sidebar` page renders live sidebar inside mini DashboardShell — user can interactively toggle collapse + groups. Visual regression should pin: (a) expanded vs collapsed widths, (b) active route shadow, (c) 6 aux patterns rendering.

### Process

Future enhancements (mobile drawer overlay, search bar at sidebar top, multi-tenant switcher card in footer slot) extend not replace.

## Showcase reference

- `/showcase/sidebar` — live (commit `aac188b`).

## Impacted files/components/tokens

- `D:\ux-design-shared\ui\src\components\dashboard\DashboardSidebar.tsx` (canonical).
- `D:\ux-design-shared\ui\src\components\dashboard\DBSupervisorSidebar.tsx` (example `customContent` consumer).
- localStorage keys: `heuresys-sidebar` (collapse), `heuresys-sidebar-groups` (per-group state).

## Supersedes / Superseded by

N/A.
