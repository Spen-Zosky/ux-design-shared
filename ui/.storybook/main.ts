import type { StorybookConfig } from "@storybook/react-vite";
import tailwindcss from "@tailwindcss/vite";

const config: StorybookConfig = {
  stories: [
    "../src/**/*.stories.@(ts|tsx|mdx)",
    "../src/**/*.mdx",
  ],
  addons: [
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
