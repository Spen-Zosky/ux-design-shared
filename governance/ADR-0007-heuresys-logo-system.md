# ADR-0007 — Heuresys logo system

## Decision ID

UXIX-0007

## Status

Accepted

## Date

2026-05-20

## Decider

Product Owner Enzo. Ratifies the wordmark already shipped to production via the post-S924 `HeuresysWordmark` from `@heuresys/ui`.

## Context

Brand identity v1 required choosing the canonical logo system: wordmark (full), mark (symbol-only), and the rendering scales (header 220×48, symbol 48 / 32 / 24, favicon source, dark surface variant). Four candidates were shipped to `/showcase/logo`:

| ID | Name | Thesis | Wordmark weight |
|----|------|--------|-----------------|
| A | Hex node | Hexagonal frame + 3-node constellation (skill / role / capability) | 700 bold, letter-spacing −0.5 |
| B | H ladder | Rounded square + custom H letterform with internal rungs | 500 medium |
| C | Constellation | Circle scaffold + triangle of nodes (people/role/capability) | 300 light, letter-spacing 1, lowercase |
| D | Y-accent (legacy port) | Lowercase "heuresys" wordmark; "y" highlighted in accent color | 700 bold, Exo 2, letter-spacing −0.5 |

Operating context anchoring the choice:

- The canonical `HeuresysWordmark` already lives in `@heuresys/ui/src/components/wordmark.tsx` (Phase 14.SH, post-S924). It implements **candidate D exactly**: lowercase "heures" + accent "y" + "s", Exo 2 700, `BRAND_BLUE` body + `BRAND_PURPLE` "y", letter-spacing −0.5.
- The wordmark is currently consumed by 6 surfaces (in heuresys-advanced post-Tier-3 commits):
  1. `/showcase/system-health` (canonical reference)
  2. `/showcase/header` (3 variants)
  3. `/showcase/shell` (live shell)
  4. `/showcase/sidebar` (live shell)
  5. `/showcase/primary-initial-page` (inside DashboardShell)
  6. `/showcase/login-page` (hero scale `xl`)
  7. `/showcase/landing-page` (nav scale `lg`)
- `HeuresysMark` (symbol-only "y" in `--accent` purple) lives in `@heuresys/ui/src/components/brand/HeuresysMark.tsx` and is consumed in `/showcase/landing-page` (dashboard-preview frame) and `/showcase/primary-initial-page` (welcome strip).
- Candidate D is **palette-adaptive** via `--logo-body` + `--logo-accent` CSS vars — the only candidate that reskins with palette switches; A/B/C are static SVG.
- Continuity: the legacy `evo.heuresys.com` brand already used the "y" purple accent against blue body. Candidate D is the direct port of that legacy identity, refined for v1.

Choosing A, B, or C would require:

1. Removing the in-production `HeuresysWordmark` from `@heuresys/ui` (or deprecating it).
2. Designing a new wordmark + symbol that visually pairs with A's hex frame / B's H letterform / C's constellation.
3. Re-rendering all 6 consumer surfaces.
4. Generating a new favicon set + social media kit (Twitter card image, OG image, LinkedIn banner) from the new mark.
5. Updating `/showcase/header`, `/showcase/shell`, `/showcase/sidebar` to demonstrate the new logo at collapsed sidebar 24×24 (where the mark dominates).

Estimated cost: ~12h refactor + design time, no business signal to motivate beyond aesthetic preference.

## Options considered

### Option D — Y-accent (legacy port) (chosen)

- Wordmark: lowercase "heuresys" in Exo 2 700, letter-spacing −0.5.
  - "heures" + "s" in `BRAND_BLUE` `hsl(221 83% 53%)` (hardcoded — "il logo è sempre quello").
  - "y" (middle letter) in `BRAND_PURPLE` `#a855f7` (hardcoded), `font-weight: 700` (matches body) in `variant="brand"`, `500` (lighter than body) in `variant="default"`/`relative`.
- Mark: the lowercase "y" alone in `--accent` purple, square aspect (used for favicon, loading spinner center, app icon, collapsed sidebar at 24×24).
- Palette-adaptive via `--logo-body` + `--logo-accent` (when used in `relative` variant). The `brand` variant overrides these with the hardcoded constants for surfaces that must stay identity-locked (login hero, landing nav, system-health header).
- 5 sizes: `sm` 16px, `md` 20px, `lg` 28px, `xl` 40px, `hero` 60px (+ arbitrary number).
- 3 variants: `default` (Inter+Exo 2 ink), `brand` (Exo 2 BRAND_BLUE/PURPLE hardcoded), `relative` (themed via CSS vars).
- **Pros**: zero refactor (in-production); continuity with legacy evo.heuresys.com brand recognition; semantic tie ("y" = a wildcard / pivot letter, fitting workforce-intelligence "human pivot" framing); palette-adaptive via the `relative` variant when an Accepted palette other than Blue Primary is selected; works at every scale (favicon 16×16 through hero 60px).
- **Cons**: less geometric / less "structural" than A's hex frame or B's H ladder. The mark is "just a letter", which some brand consultants would call "lazy"; counter-argument is that the wordmark's typographic distinction (Exo 2 + accent letter) is the brand signature, not a separate symbol.

### Option A — Hex node / Option B — H ladder / Option C — Constellation

- All 3 are geometric mark + wordmark combinations.
- **Why rejected**:
  1. **Replacement cost**: removing the in-production `HeuresysWordmark` and `HeuresysMark` from `@heuresys/ui`, redesigning a new mark + wordmark, regenerating the favicon set, updating 6 consumer surfaces, retesting at every scale (header 220×48, sidebar 24×24, favicon 16×16, social 1200×630). ~12h.
  2. **Loss of legacy continuity**: evo.heuresys.com users would not recognize the new brand. Heuresys v1 is positioned as evolution of evo.heuresys.com, not a rebrand.
  3. **No business signal**: no user research surfaced confusion or weak recognition with the Y-accent wordmark. Switching to a geometric mark is aesthetic gold-plating.
  4. **Mark fragility at 24×24**: hex node (A) loses interior nodes at 24×24; H ladder (B) loses rung detail; constellation (C) loses triangle clarity. The Y-accent mark (D) is the most resilient at small scales — a single bold letter survives down to 16×16 favicon.

## Decision

Adopt **Option D — Y-accent (legacy port)** as the canonical Heuresys logo system v1.

Concrete:

- `HeuresysWordmark` component (in `@heuresys/ui`, current implementation) is the **canonical full wordmark**.
- `HeuresysMark` component (in `@heuresys/ui`, current implementation) is the **canonical symbol** (favicon source, collapsed sidebar, loading spinner center).
- Raw SVG sources stay in `@heuresys/ui/src/assets/brand/candidates/UXIX-0007-logo/D-y-accent/` (legacy candidates B & C SVG sources stay under `candidates/` for historical record per register rule #1).
- Three brand variants:
  - `variant="default"`: Exo 2 body, ink color (`var(--ink)`), used in non-brand contexts.
  - `variant="brand"`: Exo 2 body + `BRAND_BLUE`/`BRAND_PURPLE` hardcoded — used for **login hero, landing nav, system-health header, every primary surface where the wordmark must stay identity-locked**.
  - `variant="relative"`: Exo 2 body + `--logo-body` + `--logo-accent` CSS vars — used for tenant-themed surfaces if a future tenant override is shipped.

## Rationale

- Continuity with legacy evo.heuresys.com brand recognition.
- Palette-coherent with UXIX-0005 (Blue Primary): `BRAND_BLUE` of the wordmark = `--palette-1` of the body palette.
- Typography-coherent with UXIX-0006 + UXIX-0012 (Exo 2): wordmark and body share the same family at the same weight.
- Mark resilience at small scales (single bold letter — works at favicon 16×16).
- Zero codebase refactor.
- Semantic: "y" is the inflection letter in "heuresys" — the brand's pivot is workforce intelligence, the wordmark's pivot is the "y". A useful coincidence.

## Consequences

### Code

None. `HeuresysWordmark` + `HeuresysMark` already in production.

### Tokens

`--logo-body` and `--logo-accent` confirmed as the palette-adaptive CSS vars (used only by `variant="relative"`). The hardcoded `BRAND_BLUE`/`BRAND_PURPLE` constants in `wordmark.tsx` are protected by the "il logo è sempre quello" rule and **must not be removed** in any future refactor.

### Assets

- Favicon set should be generated **from `HeuresysMark`** (the "y" alone) at 16/32/48/64/180/192/512 px, plus a 256×256 source PNG for store listings (App Store / Play Store / etc.). Outstanding TODO — not a blocker for brand v1 closure but should be added to the Tier 7 a11y / QA / asset checklist.
- Social media kit (OG image 1200×630, Twitter card, LinkedIn banner) should be generated from `HeuresysWordmark` at hero scale on `bg-foreground` (inverse-contrast) — same pattern used by `/showcase/landing-page` hero. Outstanding TODO.
- Both asset bundles live under `@heuresys/ui/src/assets/brand/logo/` once generated, **not** under `candidates/`.

### Tests

- Visual regression on the wordmark rendered at every consumed size (`sm`, `md`, `lg`, `xl`, `hero`, plus arbitrary 24px / 40px) should pin SVG output bytes — any drift fails the test.
- Visual regression on the mark at 16 / 24 / 32 / 48 / 64 / 180 / 192 / 512 px should pin SVG output bytes.

### Process

Future ADR proposing logo redesign must:

1. Cite this ADR in `Supersedes`.
2. Cite UXIX-0005 + UXIX-0006 + UXIX-0012 simultaneously.
3. Demonstrate side-by-side in `/showcase/logo` against the current Y-accent.
4. Provide replacement designs for: favicon set (all 7 sizes), social kit (3 images), all 6 in-production consumer surfaces.

## Showcase reference

- `/showcase/logo` — all 4 candidates rendered at full + symbol + 3 sidebar scales × light + dark surfaces.
- The Y-accent (D) card uses `LogoCandidateDFull` + `LogoCandidateDSymbol` from `@heuresys/ui/brand/candidates/`. These are functionally equivalent to the canonical `HeuresysWordmark` + `HeuresysMark` and may be deprecated in favor of the canonical components in a follow-up commit (the candidates folder stays as historical record).

## Impacted files/components/tokens

- `D:\ux-design-shared\ui\src\components\wordmark.tsx` (canonical `HeuresysWordmark`, confirmed).
- `D:\ux-design-shared\ui\src\components\brand\HeuresysMark.tsx` (canonical symbol "y", confirmed).
- `D:\ux-design-shared\ui\src\components\brand\candidates\LogoCandidateD.tsx` (legacy candidate, equivalent to canonical, stays for historical record).
- `D:\ux-design-shared\ui\src\assets\brand\candidates\UXIX-0007-logo\` (raw SVG sources).
- Future: favicon set + social kit assets under `D:\ux-design-shared\ui\src\assets\brand\logo\` (TODO post-ADR).

## Supersedes

N/A.

## Superseded by

N/A.
