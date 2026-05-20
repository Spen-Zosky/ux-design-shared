# Heuresys UX/IX Decision Register

Live register for all UX/IX, brand identity, page layout, asset, component and visual-system decisions of the `heuresys-advanced` platform.

Schema and rule mirror `ux-design/heuresys_uxix_brand_identity_bundle_v1/templates/DECISION_REGISTER.md`. Every row links to the corresponding `ADR-NNNN-<title>.md` file in this directory.

## Status values

| Status | Meaning |
|---|---|
| Proposed | Candidate(s) live in showcase; awaiting Product Owner choice |
| Accepted | Locked in; cited as authority by code, tokens, assets |
| Superseded | Replaced by a later decision; **never deleted** — link `Superseded by` |
| Rejected | Considered and not selected; kept for audit history |
| Needs Review | Was Accepted; new evidence suggests revisit |

## Rules

1. **No deletion**: superseded rows stay; `Superseded by` column points to the new decision ID.
2. **Showcase before Accepted**: aesthetic decisions (palette, typography, logo, motion) require at least 2 candidates live in a `/showcase/<area>` route before Product Owner can mark `Accepted`.
3. **One ADR per row**: every row has a `docs/design-decisions/ADR-NNNN-<slug>.md` file. The ADR holds the full rationale; this register is the index.
4. **Decision authority**: structural decisions (shell architecture, navigation model, page contracts) may be declared `Accepted` on creation when they inherit a non-negotiable invariant from `ux-design/heuresys_uxix_brand_identity_bundle_v1/`. Aesthetic decisions are always `Proposed` first.
5. **Commit traceability**: each register update lands in a commit prefixed `docs(brand):` with the ADR delta in the message body.

---

## Register

| Decision ID | Date | Category | Title | Status | Final Decision | Showcase Reference | Supersedes | Superseded By | Impacted Areas |
|---|---:|---|---|---|---|---|---|---|---|
| UXIX-0001 | 2026-05-18 | Shell | Dashboard shell architecture | Accepted | CSS grid `rows-[64px_1fr_44px]`, body cols `[280px_1fr]` expanded / `[72px_1fr]` collapsed, Header+Footer fixed across collapse. | `/showcase/shell` (pending Phase 5) | — | — | `DashboardShell`, `Header`, `Sidebar`, `Footer`, tokens.css |
| UXIX-0002 | 2026-05-20 | Header | Header mandatory composition | **Accepted** | `DashboardHeader` from `@heuresys/ui`: left hamburger + `HeuresysWordmark` + optional breadcrumb; right IT/EN + `PaletteDropdown` + `ThemeToggle` + user identity card with `roleTone`. Slot-driven (`logo`, `logoBadge`, `leftExtras`, `rightExtras`). | `/showcase/header` (3 variants) | — | — | `DashboardHeader`, `HeuresysWordmark`, `HeuresysLogoBadge` |
| UXIX-0003 | 2026-05-20 | Footer | Footer composition | **Accepted** | `DashboardFooter` from `@heuresys/ui`: left immutable © + heuresys.com link + 5 social icons (LinkedIn/GitHub/Discord/Facebook/X) with `aria-label` + `target="_blank"` + `rel="noopener noreferrer"`; right context-specific via `rightSlot` prop. | `/showcase/footer` (3 variants) | — | — | `DashboardFooter`, `DEFAULT_SOCIALS` |
| UXIX-0004 | 2026-05-20 | Sidebar | Sidebar collapse + tree state | **Accepted** | `DashboardSidebar` from `@heuresys/ui`: two independent state levels (`sidebarCollapsed` width 260↔72 + per-group `defaultExpanded`). localStorage keys `heuresys-sidebar` + `heuresys-sidebar-groups`. 6-pattern aux slot taxonomy. `customContent` for non-list groups (e.g. `DBSupervisorSidebar`). | `/showcase/sidebar` | — | — | `DashboardSidebar`, navigation registry, localStorage |
| UXIX-0005 | 2026-05-20 | Palette | Brand primary palette | **Accepted** | **A · Blue Primary**. Primary `hsl(221 83% 53%)` + cyan/purple/yellow accents. Ratifies the post-S924 `PaletteDropdown` `Default · balanced` preset and matches the hardcoded `BRAND_BLUE` of `HeuresysWordmark`. | `/showcase/palettes` | — | — | tokens.css, PaletteDropdown, all chart components |
| UXIX-0011 | 2026-05-19 | Style | No-gradient rule | Accepted | Heuresys brand v1 forbids any gradient (CSS linear/radial, Tailwind bg-gradient-*, SVG linearGradient/radialGradient) on any surface, theme, palette, or page type. Depth comes from elevation tokens (shadows + borders) only. | `/showcase/palettes` (rule banner) | — | — | All `apps/web/src/app/**`, `D:\ux-design-shared\ui\src\**` |
| UXIX-0012 | 2026-05-19 | Logo | Logo wordmark font stack | Accepted | Logo wordmark uses `'Exo 2', system-ui, -apple-system, 'Segoe UI', sans-serif` to align with the body typography candidate A default. Locked even before UXIX-0006 (typography) is Accepted — if UXIX-0006 picks a non-Exo-2 family, this row gets re-opened. | `/showcase/logo` | — | — | `LogoCandidate{A,B,C}.tsx`, raw SVG sources in `ui/src/assets/brand/candidates/UXIX-0007-logo/` |
| UXIX-0006 | 2026-05-20 | Typography | Brand typography | **Accepted** | **A · Exo 2**. Geometric humanist sans. 6-step modular scale (48/32/24/18/14/12). next/font/google self-hosted, latin subset, weights 400/500/600/700, display swap. Confirms UXIX-0012. | `/showcase/typography` | — | — | tokens.css `--font-sans`, wordmark.tsx |
| UXIX-0007 | 2026-05-20 | Logo | Heuresys logo system | **Accepted** | **D · Y-accent (legacy port)**. Wordmark = lowercase "heuresys" Exo 2 700, BRAND_BLUE body + BRAND_PURPLE "y", letter-spacing −0.5. Mark = the "y" alone in `--accent`. Palette-adaptive via `--logo-body`/`--logo-accent` (`relative` variant); brand-locked via hardcoded constants (`brand` variant). | `/showcase/logo` | — | — | `HeuresysWordmark`, `HeuresysMark`, favicon set (TODO), social kit (TODO) |
| UXIX-0008 | 2026-05-18 | Icons | Status icon mapping | Accepted | Lucide React outline (currentColor); `StatusIcon` component maps `StatusTone = neutral\|info\|success\|warning\|danger\|disabled` to `--color-icon-*` semantic tokens. | `/showcase/icons` (pending Phase 5) | — | — | `StatusIcon`, tokens.css |
| UXIX-0009 | 2026-05-18 | Navigation | Module + page registries | Accepted | Centralized `dashboard-modules.registry.ts` + `dashboard-pages.registry.ts`. Bundle pattern. Permission/tenant flag filtering at registry level. | n/a (code-level) | — | — | `apps/web/src/navigation/*` |
| UXIX-0010 | 2026-05-18 | A11y | Quality gates | Accepted | Combine `ACCEPTANCE_CRITERIA.md` (8 gates) + `VISUAL_QA_CHECKLIST.md` (54 items) + `ACCESSIBILITY_CHECKLIST.md` (17 items) + axe-core zero-critical. All must pass before brand v1 tag. | n/a (process) | — | — | `apps/web/tests/e2e/a11y.spec.ts`, Visual QA tooling |

---

## Index — ADR files

- [ADR-0001 — Shell architecture confirm](./ADR-0001-shell-architecture-confirm.md) (UXIX-0001, Accepted)
- [ADR-0002 — Header mandatory composition](./ADR-0002-header-mandatory-composition.md) (UXIX-0002, **Accepted** 2026-05-20)
- [ADR-0003 — Footer composition](./ADR-0003-footer-composition.md) (UXIX-0003, **Accepted** 2026-05-20)
- [ADR-0004 — Sidebar collapse + tree state](./ADR-0004-sidebar-collapse-tree-state.md) (UXIX-0004, **Accepted** 2026-05-20)
- [ADR-0005 — Brand primary palette](./ADR-0005-brand-primary-palette.md) (UXIX-0005, **Accepted** 2026-05-20)
- [ADR-0006 — Brand typography](./ADR-0006-brand-typography.md) (UXIX-0006, **Accepted** 2026-05-20)
- [ADR-0007 — Heuresys logo system](./ADR-0007-heuresys-logo-system.md) (UXIX-0007, **Accepted** 2026-05-20)
- ADR-0008 — Status icon mapping (UXIX-0008, Accepted) — *pending*
- ADR-0009 — Module + page registries (UXIX-0009, Accepted) — *pending*
- ADR-0010 — A11y + quality gates (UXIX-0010, Accepted) — *pending*
- ADR-0011 — No-gradient rule (UXIX-0011, Accepted) — *pending*
- ADR-0012 — Logo wordmark font stack (UXIX-0012, Accepted) — *pending*

ADR files are added incrementally per deliverable in the session backlog. A row in the register without an ADR file is not yet ratified — must be marked `pending` until the file lands.
