# ADR-0006 — Brand typography

## Decision ID

UXIX-0006

## Status

Accepted

## Date

2026-05-20

## Decider

Product Owner Enzo. Locks in the typography family already used by the canonical `HeuresysWordmark` and the default token stack.

## Context

Brand identity v1 required choosing the primary typography family for the dashboard, the marketing surfaces, and the wordmark. Two candidates were shipped to `/showcase/typography`:

| ID | Family | Stack | Thesis |
|----|--------|-------|--------|
| A | Exo 2 (current) | `'Exo 2', system-ui, -apple-system, Segoe UI, Roboto, sans-serif` | Geometric humanist sans. Strong KPI numerals. Already in tokens.css default. |
| B | Inter + IBM Plex Mono | `'Inter', system-ui, …` | Modern grotesque (Linear/Vercel/Stripe), de-facto SaaS sans. |

The 6-step modular scale (Display 48 / H1 32 / H2 24 / H3 18 / Body 14 / Caption 12) is identical for both candidates — the decision is about voice + family, not rhythm.

Operating context anchoring the choice:

- The canonical `HeuresysWordmark` (`@heuresys/ui/src/components/wordmark.tsx`) hardcodes `font-family: '"Exo 2", Inter, ui-sans-serif, system-ui, sans-serif'` — Exo 2 first, Inter as fallback. The wordmark's visual identity is built on Exo 2's geometric character.
- `UXIX-0012` (logo wordmark font stack, Accepted 2026-05-19) **already locked** the logo font to Exo 2: *"if UXIX-0006 picks a non-Exo-2 family, this row gets re-opened."* Choosing B (Inter) would force UXIX-0012 to re-open and the wordmark to be redesigned away from Exo 2.
- Post-Tier-3 commit `534d54e` wires Exo 2 live via `next/font/google` in `/showcase/typography` for a real-typeface preview (not system-stack fallback). Inter is wired too, side by side.
- Heuresys' brand identity wants distinction from Inter-heavy SaaS competitors (Linear, Vercel, Stripe), not parity.

## Options considered

### Option A — Exo 2 (chosen)

- Geometric humanist sans, designed by Natanael Gama, available on Google Fonts at weights 100..900.
- Already in `tokens.css` default (`--font-sans`).
- Already in `HeuresysWordmark` font-family stack.
- Webfont self-hosted via `next/font/google` (see `/showcase/typography` — uses subsets latin, weights 400/500/600/700, swap display).
- **Pros**: zero refactor; identity continuity with the wordmark canon (UXIX-0007 candidate D); restrained-but-distinctive character that doesn't read "generic SaaS Inter"; strong KPI numerals (oldstyle off) which Heuresys' dashboard-heavy UI relies on; ascender clarity intact at 12px caption size.
- **Cons**: less mainstream-familiar than Inter; some Cyrillic + CJK glyph coverage gaps if future internationalization beyond IT/EN is required (mitigable with subset add-ons; current scope IT/EN only).

### Option B — Inter + IBM Plex Mono

- Inter by Rasmus Andersson (de-facto SaaS body font).
- Plex Mono for KPI tabular numerics and code snippets.
- **Why rejected**:
  1. **UXIX-0012 cascade**: re-opens the logo wordmark font lock; the canonical `HeuresysWordmark` would need to be redesigned away from Exo 2. Cost: ~3h refactor in `@heuresys/ui/src/components/wordmark.tsx` + 6 consumer surfaces.
  2. **Identity dilution**: Inter is everywhere (Vercel, Stripe, Linear, Notion, GitHub). Heuresys wins zero recognition by adopting it — and loses the geometric character the wordmark relies on.
  3. **No business signal**: no user research surfaced a readability issue with Exo 2. Migrating fonts on aesthetic-only grounds without a downstream benefit is gold-plating.
  4. **Tokens.css ripple**: every line-height (already adjusted per Exo 2's metrics in TYPOGRAPHY_A — line-height 1.5 body) would need re-tuning for Inter's slightly different x-height.

## Decision

Adopt **Option A — Exo 2** as the canonical Heuresys body + display + wordmark family.

Concrete contract:

- `--font-sans` in `tokens.css` = `'Exo 2', system-ui, -apple-system, Segoe UI, Roboto, sans-serif`.
- 6-step modular scale per TYPOGRAPHY_A in `/showcase/typography`:
  - Display 48px / 1.1 / 700
  - H1 32px / 1.2 / 600
  - H2 24px / 1.3 / 600
  - H3 18px / 1.4 / 600
  - Body 14px / 1.5 / 400
  - Caption 12px / 1.4 / 500
- Webfont delivery via `next/font/google` (subsets latin, weights 400/500/600/700, display swap). Already wired in commit `534d54e` for the showcase.

UXIX-0012 (logo wordmark font stack, locked to Exo 2) is **confirmed** by this decision and stays Accepted.

## Rationale

- Cited as authority by the canonical wordmark — switching family forces a wordmark redesign that we explicitly want to avoid (see UXIX-0005, UXIX-0007 rationale).
- Strong KPI numerals serve the dashboard-heavy Heuresys product (positions / skills / coverage % / counts / trends all rendered as `tabular-nums`).
- Distinctive without being eccentric — Exo 2 reads "modern enterprise" without crossing into "Inter SaaS commodity".
- Free + Google Fonts hosted; zero licensing friction; latin subset is sufficient for IT + EN.

## Consequences

### Code

None (the family is already in place). Future `next/font` wire-ups in the root `apps/web/src/app/layout.tsx` and `apps/showcase/src/app/layout.tsx` are optional optimizations — currently the family is requested only per-page in `/showcase/typography`.

### Tokens

`--font-sans` confirmed. The 6-step scale will be migrated from inline `style={fontSize:…}` in `/showcase/typography` to `tokens.css` `--text-display` … `--text-caption` custom properties in a follow-up commit (not required by this ADR, recommended for ergonomics).

### Assets

None.

### Tests

Visual regression on `/showcase/typography` should pin a screenshot of the scale + body sample rendered in Exo 2; any future PR that ships a different family at the document level should fail this assertion.

### Process

Future ADR proposing a typography pivot must:

1. Cite this ADR in `Supersedes`.
2. Cite UXIX-0007 + UXIX-0012 simultaneously (logo + wordmark + typography are one decision tied at the brand-bone level).
3. Demonstrate side-by-side in `/showcase/typography` (rule #2 of the register).

## Showcase reference

- `/showcase/typography` — both candidates rendered side-by-side with the modular scale + KPI numerics sample. Live `next/font/google` previews (post-commit `534d54e`).
- Bundle source: `ux-design/heuresys_uxix_brand_identity_bundle_v1/docs/04_brand_typography_specification.md`.

## Impacted files/components/tokens

- `D:\ux-design-shared\ui\src\styles\tokens.css` (`--font-sans` confirmed = Exo 2 stack).
- `D:\ux-design-shared\ui\src\components\wordmark.tsx` (Exo 2 stack confirmed).
- `D:\heuresys-advanced\apps\web\src\app\showcase\typography\page.tsx` (next/font wire-up confirmed).

## Supersedes

N/A.

## Superseded by

N/A.
