# ADR-0005 — Brand primary palette

## Decision ID

UXIX-0005

## Status

Accepted

## Date

2026-05-20

## Decider

Product Owner Enzo. Ratifies the de-facto default palette already in production via the post-S924 `PaletteDropdown` brand default + the canonical `HeuresysWordmark` hardcoded blue.

## Context

Brand identity v1 required choosing the primary palette that drives `--color-primary`, the 4-box accent `--palette-1..4`, and the semantic state colors (`--color-info`, `--color-success`, `--color-warning`, `--color-destructive`). Five candidates were shipped to `/showcase/palettes`:

| ID | Name | Primary | Thesis |
|----|------|---------|--------|
| A | Blue Primary (default) | `#2563EB` | Confidence + clarity, enterprise-trustworthy, low-risk first impression |
| B | Studio Slate | `#0F766E` | Editorial, calmer, modern-restrained — long-reading contexts |
| C | Choco & Coffee | `#3E2723` | Warm monochromatic — tactile, hand-crafted feel |
| D | Cognac & Oatmeal | `#A0522D` | Heritage warmth — expensive without being loud |
| E | Onyx & Champagne | `#14110F` | Luxury restraint — Chanel/SL editorial template |

Operating context that anchors the choice:

- The canonical `HeuresysWordmark` (in `@heuresys/ui/src/components/wordmark.tsx`, Phase 14.SH) hardcodes `BRAND_BLUE = "hsl(221 83% 53%)"` and `BRAND_PURPLE = "#a855f7"` under the explicit rule "il logo è sempre quello" — the wordmark must read identically across every theme, palette, surface.
- Post-S924, `PaletteDropdown` from `@heuresys/ui` ships 4 presets (`Default · balanced`, `Cool ocean`, `Warm sunset`, `Brand mono`) with `Default · balanced` set as the boot-time default. That preset uses `hsl(222 80% 50%)` for `--palette-1`, materially identical to candidate A's `hsl(221 83% 53%)`.
- The post-Tier-3 showcase (commits `534d54e` ← `1863215`) rebuilt all 17 non-canonical pages to consume design tokens. Charts, dashboard-cards, tables, primary-initial-page, login-page, landing-page, forms now respond to palette switches at runtime.

Candidate B / C / D / E would require the wordmark's `BRAND_BLUE` constant to either (a) shift to a different hue, breaking "il logo è sempre quello", or (b) stay blue while the body palette goes teal/brown/onyx, producing a stridence between brand mark and brand surface. Both are architectural regressions.

## Options considered

### Option A — Blue Primary (chosen)

- Primary: `hsl(221 83% 53%)` (= `#2563EB`).
- Accents: `#06B6D4` cyan, `#7C3AED` purple, `#F59E0B` yellow.
- Semantic: Info `#2563EB`, Success `#16A34A`, Warning `#F59E0B`, Destructive `#DC2626`.
- Already the boot-time default of `PaletteDropdown` (`Default · balanced` preset, var `222 80% 50%`).
- Already hardcoded inside `HeuresysWordmark` as `BRAND_BLUE`.
- **Pros**: zero refactor, internally consistent with wordmark canon, enterprise-trustworthy default for B2B HRMS positioning, matches the historical Heuresys legacy primary blue (continuity with `evo.heuresys.com`).
- **Cons**: less editorial / less distinctive than B (Slate) or E (Onyx). The 5-candidate showcase exists precisely because Blue Primary is the "safe" choice — having alternatives was the bundle's explicit ask to widen the optionspace before locking.

### Option B — Studio Slate

- Primary teal `#0F766E`, plum + ochre + cyan accents.
- **Why rejected**: would require the wordmark's `BRAND_BLUE` to shift to deep teal, contradicting the "il logo è sempre quello" rule already shipped to production in 18+ surfaces (system-health canonical, showcase chrome, login, landing). Cascade-refactor cost ~6h with no business signal to motivate the pivot.

### Option C — Choco & Coffee / Option D — Cognac & Oatmeal / Option E — Onyx & Champagne

- Warm-monochromatic / heritage-warmth / luxury-restraint thesis.
- **Why rejected**: stridence between brown/onyx body and the wordmark's hardcoded `BRAND_BLUE` is unavoidable. To honor these palettes the wordmark would need to be redesigned away from the canonical "heuresys" Exo 2 700 with blue body + purple "y" — collapsing UXIX-0007 and UXIX-0006 in the process. The audit `docs/SHOWCASE_AUDIT_2026-05-20.md` estimated ~8h cascading refactor; we'd also lose the heritage signal from the legacy `evo.heuresys.com` brand which is itself blue/purple.

## Decision

Adopt **Option A — Blue Primary** as the canonical Heuresys palette v1.

Concrete token values (already present in `@heuresys/ui/src/styles/tokens.css` post-S924, ratified here):

- `--color-primary: hsl(221 83% 53%)` (light) / `hsl(221 70% 60%)` (dark)
- `--palette-1` HSL = `222 80% 50%` (matches PaletteDropdown `Default · balanced`)
- `--palette-2` HSL = `188 75% 45%` (cyan)
- `--palette-3` HSL = `262 65% 60%` (purple)
- `--palette-4` HSL = `38 90% 55%` (yellow)
- `--color-info`, `--color-success`, `--color-warning`, `--color-destructive` per tokens.css default

The `PaletteDropdown` 4-preset listbox remains available so end-users can switch to `Cool ocean`, `Warm sunset`, or `Brand mono` for personal preference — but **default = Blue Primary** is the brand authority. The 5-candidate `/showcase/palettes` page stays in place as historical record per rule #1 (no deletion).

## Rationale

- Consistency with the in-production `HeuresysWordmark` (cited in 6 surfaces at the time of this ADR).
- Continuity with the legacy `evo.heuresys.com` brand — Heuresys has read as "blue + purple accent" for the brand's prior incarnation; v1 ratifies and refines rather than pivots.
- Enterprise B2B HRMS positioning is well-served by trust + clarity; warm-monochromatic palettes (C/D) read "boutique" or "consumer".
- Zero codebase refactor; remediation reserved for `UXIX-0006` and `UXIX-0007` is also zero by this decision.

## Consequences

### Code

None. `--color-primary` and `--palette-1..4` already serve the chosen values via tokens.css. All 18 showcase pages already consume these tokens (post-Tier-3).

### Tokens

The `Default · balanced` preset in `PaletteDropdown.tsx` is the canonical mapping. Tokens.css default values are validated against this row.

### Assets

None directly. Logo decisions live in UXIX-0007.

### Tests

A future palette-stability test should assert that `getComputedStyle(document.documentElement).getPropertyValue('--palette-1')` matches `222 80% 50%` on first paint with no `localStorage.heuresys-palette` set.

### Process

Should a future ADR propose pivoting from Blue Primary (e.g. towards Slate teal for a rebrand), it must:

1. Cite this ADR in its `Supersedes` field.
2. Provide an updated `HeuresysWordmark` design — the wordmark cannot diverge from the body palette.
3. Submit a fresh `/showcase/palettes` round so Product Owner sees side-by-side rendering.

## Showcase reference

- `/showcase/palettes` — 5 candidates rendered side-by-side with identical UI fixtures. Candidate A's card is the one rendered as the default body palette on every other showcase page.
- Bundle source of truth: `ux-design/heuresys_uxix_brand_identity_bundle_v1/docs/05_brand_palette_specification.md` (if/when bundle ratification of A is added).

## Impacted files/components/tokens

- `D:\ux-design-shared\ui\src\styles\tokens.css` (current defaults match A — confirmed).
- `D:\ux-design-shared\ui\src\components\dashboard\PaletteDropdown.tsx` (default preset confirmed = candidate A).
- `D:\ux-design-shared\ui\src\components\wordmark.tsx` (`BRAND_BLUE` HSL aligned with candidate A — confirmed).
- All 18 showcase pages post-Tier-3 (consumers, no code change).

## Supersedes

N/A (genesis decision for this register row; supersedes the prior "5-candidate `PaletteProvider` legacy" implementation retired in heuresys-advanced commit `252ddfd`).

## Superseded by

N/A.
