// @ts-check
import js from "@eslint/js";
import tseslint from "typescript-eslint";

/*
 * Anti-regression theming guard for @heuresys/ui.
 *
 * The design system is TOKEN-BASED: dark mode is driven by the `.dark` CLASS
 * plus CSS-var tokens (bg-card / text-foreground / text-muted-foreground /
 * border-border / bg-accent ...). Theme-conditional styles MUST use the
 * class-based arbitrary variant `[.dark_&]:<util>` (which compiles to
 * `.dark <el> { ... }`), NEVER Tailwind's media-based `dark:` variant (which
 * keys off `prefers-color-scheme` and DESYNCS from the `.dark` class).
 *
 * This config bans, inside JS/TS string Literals AND template-literal static
 * chunks (TemplateElement) under src/components/**:
 *   (a) hardcoded non-token color utilities on the neutral palette
 *       (white/black/neutral/gray/grey/slate/zinc/stone)
 *   (b) media-based `dark:` variants
 *   (c) raw hex colors
 *
 * Genuinely intentional exceptions (black/white scrims & overlays, brand hex
 * in the wordmark/logo, decorative gradient palettes in pure-visual scenes)
 * are allowlisted file-by-file with a targeted
 *   // eslint-disable-next-line no-restricted-syntax -- intentional <reason>
 * so the rule keeps catching genuine regressions everywhere else.
 */

// (a) Hardcoded neutral-palette color utilities — e.g. bg-slate-100, text-gray-500/40.
//     Each `\\` in this JS string is ONE backslash in the resulting regex source.
const HARDCODED_NEUTRAL_UTIL =
  "(bg|text|border|ring|divide|from|to|via|placeholder|fill|stroke|caret|accent|outline|shadow|decoration)-(white|black|neutral|gray|grey|slate|zinc|stone)(-(50|[1-9]00|950))?(\\/[0-9]+)?";

// (b) Media-based dark: variant — `dark:` followed by a utility start or arbitrary-value bracket.
//     Note: the class-based `[.dark_&]:` arbitrary variant does NOT contain the
//     literal substring `dark:` so it is intentionally NOT matched.
const MEDIA_DARK_VARIANT = "(^|\\s|\")dark:[a-z\\[]";

// (c) Raw hex color literal.
const RAW_HEX = "#[0-9a-fA-F]{3,8}";

const TOKEN_GUIDANCE =
  "Use semantic tokens (bg-card / text-foreground / text-muted-foreground / border-border / bg-accent) and the class-based [.dark_&]: arbitrary variant instead of media-based dark:.";

const restrictedSyntax = [
  // (a) Literal
  {
    selector: `Literal[value=/${HARDCODED_NEUTRAL_UTIL}/]`,
    message: `Hardcoded neutral-palette color utility is banned. ${TOKEN_GUIDANCE}`,
  },
  // (a) TemplateElement
  {
    selector: `TemplateElement[value.raw=/${HARDCODED_NEUTRAL_UTIL}/]`,
    message: `Hardcoded neutral-palette color utility is banned (template literal). ${TOKEN_GUIDANCE}`,
  },
  // (b) Literal
  {
    selector: `Literal[value=/${MEDIA_DARK_VARIANT}/]`,
    message: `Media-based \`dark:\` variant is banned — it keys off prefers-color-scheme and desyncs from the .dark class. Use the class-based [.dark_&]:<util> arbitrary variant instead.`,
  },
  // (b) TemplateElement
  {
    selector: `TemplateElement[value.raw=/${MEDIA_DARK_VARIANT}/]`,
    message: `Media-based \`dark:\` variant is banned (template literal) — use the class-based [.dark_&]:<util> arbitrary variant instead.`,
  },
  // (c) Literal
  {
    selector: `Literal[value=/${RAW_HEX}/]`,
    message: `Raw hex color is banned. ${TOKEN_GUIDANCE}`,
  },
  // (c) TemplateElement
  {
    selector: `TemplateElement[value.raw=/${RAW_HEX}/]`,
    message: `Raw hex color is banned (template literal). ${TOKEN_GUIDANCE}`,
  },
];

export default tseslint.config(
  {
    // Global ignores — never lint build output, deps, stories or tests.
    ignores: [
      "dist/**",
      "node_modules/**",
      "**/*.stories.tsx",
      "**/*.test.*",
      "**/__tests__/**",
    ],
  },
  {
    files: ["src/components/**/*.{ts,tsx}"],
    // This guard intentionally runs ONLY the theming `no-restricted-syntax` rule.
    // The codebase carries pre-existing `// eslint-disable ... @typescript-eslint/*`
    // comments for rules this guard does NOT enable; without this they would be
    // flagged as "unused directive". Turn the report off so this guard stays
    // narrowly scoped to theming regressions and emits no unrelated noise.
    linterOptions: {
      reportUnusedDisableDirectives: "off",
    },
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
    },
    plugins: { "@typescript-eslint": tseslint.plugin },
    rules: {
      "no-restricted-syntax": ["error", ...restrictedSyntax],
    },
  }
);
