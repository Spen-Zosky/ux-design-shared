# Legacy Heuresys brand archive

Imported 2026-05-19 from `D:\evo.heuresys.com\services\app\public\brand\` (evo.heuresys.com legacy codebase). User-authorized for UI assets reuse per memory `brownfield_legacy_source_paths.md`.

## Files

| File | Purpose | Notes |
|------|---------|-------|
| `heuresys-wordmark.svg` | Full wordmark, blue body + purple "y" | viewBox `22 6 136 24`, Exo 2 700, body `hsl(221,83%,53%)` = `#3B82F6`, accent `#a855f7` |
| `heuresys-wordmark-monochrome-dark.svg` | Single-color white (for dark surfaces) | letter-spacing −1.17px |
| `heuresys-wordmark-monochrome-light.svg` | Single-color blue (for light surfaces) | letter-spacing −1.17px |
| `heuresys-mark.svg` | Just the "y" letterform | viewBox `0 0 32 32`, purple `#a855f7`, used as collapsed-sidebar symbol + favicon source |
| `favicon.svg` | Rounded dark-bg + purple "y" | viewBox `0 0 32 32`, bg `#0a0d18` (deep navy), y `#a855f7` |
| `og-image-template.svg` | Open Graph image template | for social share cards |

## Brand concept extracted

The legacy brand identity is a **lowercase wordmark with a single accent letter**:
- `heuresys` rendered in Exo 2 700, lowercase
- The middle letter "**y**" is rendered in a different color (purple) while the rest is in the primary blue
- The "y" alone becomes the symbol / mark / favicon
- The wordmark is the only branded asset; there is no separate symbol-only logo besides the "y" letter

This is a distinct concept from the three Session-1 candidates (A=hex node, B=H ladder, C=constellation), all of which use a separate geometric mark beside the wordmark. The legacy approach is **typographic** rather than **geometric**.

## How this archive is used

These files are **historical reference only** — they are not directly served by `apps/web`. They informed the authoring of **Candidate D** in `D:\ux-design-shared\ui\src\components\brand\candidates\LogoCandidateD.tsx` (Y-accent wordmark) and the corresponding `heuresys-logo-D-{symbol,full}.svg` raw files in `../candidates/UXIX-0007-logo/`.

If Candidate D is `Accepted` for UXIX-0007, these legacy files can either be:
1. Used directly as the production assets (faster path), or
2. Re-traced to match the new Heuresys design language (refined path).

Non-chosen legacy files remain here as audit history per Decision Register Rule 1 (no deletion).
