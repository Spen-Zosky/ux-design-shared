import type { StorybookConfig } from "@storybook/react-vite";
import tailwindcss from "@tailwindcss/vite";

const config: StorybookConfig = {
  stories: [
    "../src/**/*.stories.@(ts|tsx|mdx)",
    "../src/**/*.mdx",
  ],
  addons: [
    // MISURATO il 2026-09-04: senza questo addon il `tags: ["autodocs"]`
    // dichiarato globalmente in preview.ts non produceva NULLA. L'indice
    // conteneva 380 voci, tutte di tipo "story" e nessuna di tipo "docs";
    // aprire `?id=<componente>--docs` rispondeva "Couldn't find story
    // matching". Da Storybook 8 la documentazione automatica vive in un addon
    // separato, e qui non era mai stato installato: il tag c'era, la pagina
    // no. Un design system che si crede documentato e non lo e'.
    "@storybook/addon-docs",
    "@storybook/addon-a11y",
    "@storybook/addon-themes",
    "msw-storybook-addon",
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  typescript: {
    reactDocgen: "react-docgen-typescript",
  },
  staticDirs: ["../public"],

  // Tailwind 4 non e' un plugin PostCSS auto-rilevato: va registrato nella
  // pipeline Vite, altrimenti `@import "tailwindcss"` resta un import CSS
  // qualunque. E' quello che accadeva fin qui: il CSS emesso da Storybook
  // conteneva `@layer theme{@theme default{...}}` NON compilato — il sorgente
  // grezzo di Tailwind inlinato da Vite — e di conseguenza zero utility. Non
  // mancavano solo `.bg-card` e `.text-danger`: mancavano `.flex` e `.p-4`.
  // Misurato sul CSS di storybook-static: 112 regole in tutto, nessuna utility,
  // nessun `@property --tw-*`. La vetrina del design system mostrava quindi i
  // componenti senza impaginazione ne' colori. (2026-08-26)
  async viteFinal(config) {
    config.plugins = [...(config.plugins ?? []), tailwindcss()];
    return config;
  },
};

export default config;
