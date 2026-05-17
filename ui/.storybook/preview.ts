import type { Preview } from "@storybook/react";
import { withThemeByClassName } from "@storybook/addon-themes";
import { initialize, mswLoader } from "msw-storybook-addon";
import "../src/styles/globals.css";

// Use a page-relative SW URL so MSW works both at the root in dev
// (http://localhost:6006/) and under a subpath in deploy
// (https://spen-zosky.github.io/ux-design-shared/). Without this the SW
// would default to /mockServiceWorker.js, which doesn't exist on Pages.
initialize({
  onUnhandledRequest: "bypass",
  serviceWorker: { url: "./mockServiceWorker.js" },
});

const preview: Preview = {
  parameters: {
    backgrounds: {
      default: "light",
      values: [
        { name: "light", value: "#ffffff" },
        { name: "dark", value: "#0a0a0a" },
        { name: "paper", value: "#fafaf7" },
      ],
    },
    controls: {
      matchers: { color: /(background|color)$/i, date: /Date$/i },
      expanded: true,
    },
    a11y: {
      config: { rules: [] },
    },
    options: {
      storySort: {
        order: ["Welcome", "Foundations", "Components", ["*", "All"], "Recipes", "*"],
      },
    },
    layout: "padded",
  },
  loaders: [mswLoader],
  decorators: [
    withThemeByClassName({
      themes: { light: "", dark: "dark" },
      defaultTheme: "light",
    }),
  ],
  tags: ["autodocs"],
};

export default preview;
